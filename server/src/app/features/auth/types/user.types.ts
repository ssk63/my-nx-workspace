export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenants: UserTenant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTenant {
  id: string;
  tenantId: string;
  role: string;
  isDefault: boolean;
}

export interface AuthResponse {
  status: number;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantId: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
} 