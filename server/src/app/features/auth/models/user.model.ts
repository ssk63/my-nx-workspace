export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  resetToken?: string | null;
  resetTokenExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
} 