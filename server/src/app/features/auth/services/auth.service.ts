import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '../../../db';
import { users } from '../../../db/schemas/users.schema';
import { sendPasswordResetEmail } from '../../../services/email.service';
import { eq, and, gt } from 'drizzle-orm';
import { CreateUserDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, AuthResponse } from '../models/user.model';

const JWT_SECRET = process.env['JWT_SECRET'] || 'changeme';

export async function register(data: CreateUserDto): Promise<AuthResponse> {
  try {
    if (!data.name || !data.email || !data.password) {
      throw new Error('Missing required fields');
    }

    const existing = await db.select().from(users).where(eq(users.email, data.email));
    if (existing.length > 0) {
      return { status: 409, message: 'Email already registered' };
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const [newUser] = await db.insert(users).values({ 
      name: data.name, 
      email: data.email, 
      password: hashed 
    }).returning();

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });
    
    return { 
      status: 201, 
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    };
  } catch (error) {
    throw error;
  }
}

export async function login(data: LoginDto): Promise<AuthResponse> {
  try {
    const user = (await db.select().from(users).where(eq(users.email, data.email)))[0];
    
    if (!user) {
      return { status: 401, message: 'Invalid credentials' };
    }
    
    const valid = await bcrypt.compare(data.password, user.password);
    
    if (!valid) {
      return { status: 401, message: 'Invalid credentials' };
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    
    return { 
      status: 200, 
      token, 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    throw error;
  }
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