import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTenant } from './TenantContext';
import { API_URL, STORAGE_KEYS } from '../config';
import type { User } from '../types/user.types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setTenant, setTenants } = useTenant();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const t = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (t) setToken(t);
    };
    load();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.data.token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.data.user));
      setTenants(res.data.user.tenants || []);
      setTenant(null);
      return true;
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { ...data });
      setToken(res.data.token);
      setUser(res.data.user);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.data.token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.data.user));
      setTenants(res.data.user.tenants || []);
      setTenant(null);
      return true;
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    setTenant(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, clearError: () => setError(null) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 