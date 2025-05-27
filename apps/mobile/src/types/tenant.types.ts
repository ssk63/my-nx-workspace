import type { Theme } from './theme.types';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  theme?: Partial<Theme>;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    errorColor: string;
    successColor: string;
    warningColor: string;
    infoColor: string;
    borderColor: string;
    logo?: string;
  };
  features: {
    [key: string]: boolean;
  };
  config: {
    [key: string]: any;
  };
}

export interface TenantConfig {
  id: string;
  tenantId: string;
  key: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
} 