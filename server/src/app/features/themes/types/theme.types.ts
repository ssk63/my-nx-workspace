export interface ThemeColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
}

export interface ThemeLogo {
  primary: string;
  dark?: string;
  light?: string;
}

export interface Theme {
  id: string;
  tenantId: string;
  colors: ThemeColors;
  logo: ThemeLogo;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateThemeDto {
  colors: ThemeColors;
  logo: ThemeLogo;
}

export interface ThemeServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 