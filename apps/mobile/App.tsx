import React from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { TenantProvider } from './src/contexts/TenantContext';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <TenantProvider>
        <AuthProvider>
          <RootNavigator />
          <StatusBar style={'dark-content' as StatusBarStyle} />
        </AuthProvider>
      </TenantProvider>
    </ThemeProvider>
  );
}

