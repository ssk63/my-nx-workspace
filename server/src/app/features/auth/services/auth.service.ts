import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '../../../db';
import { users, userTenants, ROLES } from '../../../db/schemas/auth.schema';
import { sendPasswordResetEmail } from './email.service';
import { eq, and, gt } from 'drizzle-orm';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto, AuthResponse, User } from '../types/user.types';

const JWT_SECRET = process.env['JWT_SECRET'] || 'changeme';
const JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'] || 'refresh_me';

export async function register(data: RegisterDto): Promise<AuthResponse> {
  if (!data.email || !data.password || !data.firstName || !data.lastName || !data.tenantId) {
    throw new Error('Missing required fields');
  }

  const existing = await db.select().from(users).where(eq(users.email, data.email));
  if (existing.length > 0) {
    return { status: 409, message: 'Email already registered' };
  }

  const hashed = await bcrypt.hash(data.password, 10);
  
  // Create user
  const [newUser] = await db.insert(users).values({ 
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email, 
    password: hashed,
    role: ROLES.MEMBER
  }).returning();

  // Create user-tenant relationship
  await db.insert(userTenants).values({
    userId: newUser.id,
    tenantId: data.tenantId,
    role: ROLES.MEMBER,
    isDefault: true
  });

  // Get user with tenants
  const userWithTenants = await getUserWithTenants(newUser.id);

  const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });
  const refreshToken = jwt.sign({ userId: newUser.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
  return { 
    status: 201, 
    message: 'User registered successfully',
    token,
    refreshToken,
    user: userWithTenants
  };
}

export async function login(data: LoginDto): Promise<AuthResponse> {
  const user = (await db.select().from(users).where(eq(users.email, data.email)))[0];
  
  if (!user) {
    return { status: 401, message: 'Invalid credentials' };
  }
  
  const valid = await bcrypt.compare(data.password, user.password);
  
  if (!valid) {
    return { status: 401, message: 'Invalid credentials' };
  }

  // Get user with tenants
  const userWithTenants = await getUserWithTenants(user.id);
  
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
  return { 
    status: 200, 
    token, 
    refreshToken,
    message: 'Login successful',
    user: userWithTenants
  };
}

export async function forgotPassword(data: ForgotPasswordDto): Promise<AuthResponse> {
  const user = (await db.select().from(users).where(eq(users.email, data.email)))[0];
  if (!user) {
    return { status: 200, message: 'If this email exists, a reset link will be sent.' };
  }
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpires = new Date(Date.now() + 3600000);
  await db.update(users)
    .set({ resetToken, resetTokenExpires })
    .where(eq(users.id, user.id));
  const emailSent = await sendPasswordResetEmail(data.email, resetToken);
  if (!emailSent) {
    return { status: 500, message: 'Error sending reset email' };
  }
  return { status: 200, message: 'If this email exists, a reset link will be sent.' };
}

export async function resetPassword(data: ResetPasswordDto): Promise<AuthResponse> {
  const user = (await db.select().from(users)
    .where(and(eq(users.resetToken, data.token), gt(users.resetTokenExpires, new Date()))))[0];
  if (!user) {
    return { status: 400, message: 'Invalid or expired reset token' };
  }
  const hashed = await bcrypt.hash(data.password, 10);
  await db.update(users)
    .set({ password: hashed, resetToken: null, resetTokenExpires: null })
    .where(eq(users.id, user.id));
  return { status: 200, message: 'Password has been reset successfully' };
}

export async function refreshToken(token: string): Promise<AuthResponse> {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
    const user = (await db.select().from(users).where(eq(users.id, decoded.userId)))[0];

    if (!user) {
      return { status: 401, message: 'Invalid refresh token' };
    }

    const userWithTenants = await getUserWithTenants(user.id);
    const newToken = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    const newRefreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return {
      status: 200,
      message: 'Token refreshed successfully',
      token: newToken,
      refreshToken: newRefreshToken,
      user: userWithTenants
    };
  } catch (error) {
    return { status: 401, message: 'Invalid refresh token' };
  }
}

async function getUserWithTenants(userId: string): Promise<User> {
  const user = (await db.select().from(users).where(eq(users.id, userId)))[0];
  const userTenantRelations = await db.select().from(userTenants).where(eq(userTenants.userId, userId));

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    tenants: userTenantRelations.map(ut => ({
      id: ut.id,
      tenantId: ut.tenantId,
      role: ut.role,
      isDefault: ut.isDefault
    })),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
} 