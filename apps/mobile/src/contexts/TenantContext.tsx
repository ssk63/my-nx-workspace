import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL, STORAGE_KEYS } from '../config';
import type { Tenant } from '../types/tenant.types';

interface TenantContextType {
  tenant: Tenant | null;
  tenants: Tenant[];
  setTenant: (tenant: Tenant | null) => void;
  setTenants: (tenants: Tenant[]) => void;
  fetchTenants: (token?: string) => Promise<void>;
  loading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenantState] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTenant = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_TENANT);
      if (stored) setTenantState(JSON.parse(stored));
      setLoading(false);
    };
    loadTenant();
  }, []);

  const setTenant = async (t: Tenant | null) => {
    setTenantState(t);
    if (t) await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_TENANT, JSON.stringify(t));
    else await AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_TENANT);
  };

  const fetchTenants = async (token?: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/tenants`, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
      setTenants(res.data);
    } catch {
      // Silently fail - tenants will remain empty
    }
    setLoading(false);
  };

  return (
    <TenantContext.Provider value={{ tenant, tenants, setTenant, setTenants, fetchTenants, loading }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenant must be used within TenantProvider');
  return ctx;
}; 