import { API_URL } from '../config';
import { Tenant } from '../types/tenant.types';

export class TenantService {
  static async getTenants(): Promise<Tenant[]> {
    const response = await fetch(`${API_URL}/tenants`);
    if (!response.ok) {
      throw new Error('Failed to fetch tenants');
    }
    return response.json();
  }

  static async getTenantById(id: string): Promise<Tenant> {
    const response = await fetch(`${API_URL}/tenants/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tenant');
    }
    return response.json();
  }

  static async getTenantConfig(tenantId: string, key: string): Promise<any> {
    const response = await fetch(`${API_URL}/tenants/${tenantId}/config/${key}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tenant config');
    }
    const data = await response.json();
    return data.value;
  }

  static async getTenantConfigs(tenantId: string, keys: string[]): Promise<Record<string, any>> {
    const response = await fetch(
      `${API_URL}/tenants/${tenantId}/configs?keys=${keys.join(',')}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch tenant configs');
    }
    return response.json();
  }
} 