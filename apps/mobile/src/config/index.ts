import type { Theme } from '../types/theme.types';

export const API_URL = 'http://localhost:3000/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  SELECTED_TENANT: '@selected_tenant',
} as const;

export const DEFAULT_THEME: Theme = {
  primaryColor: '#007AFF',
  secondaryColor: '#5856D6',
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  errorColor: '#FF3B30',
  successColor: '#34C759',
  warningColor: '#FF9500',
  infoColor: '#5856D6',
  borderColor: '#E5E5EA',
}; 