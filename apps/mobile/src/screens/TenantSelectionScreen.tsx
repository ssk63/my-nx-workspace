import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTenant } from '../contexts/TenantContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { DEFAULT_THEME, API_URL } from '../config';

const TenantSelectionScreen = () => {
  const { tenants, setTenant, loading } = useTenant();
  const { setTheme } = useTheme();
  const { token } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [themeLoading, setThemeLoading] = useState(false);
  const [themeError, setThemeError] = useState<string | null>(null);

  const fetchAndSetTheme = useCallback(async (tenantSlug: string, token: string) => {
    setThemeLoading(true);
    setThemeError(null);
    try {
      const res = await fetch(`${API_URL}/themes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-tenant-slug': tenantSlug,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch theme');
      }
      const theme = await res.json();
      setTheme(theme);
    } catch (err) {
      setThemeError('Unable to load theme for this organization. Using default theme.');
      setTheme(DEFAULT_THEME);
    } finally {
      setThemeLoading(false);
    }
  }, [setTheme]);

  useEffect(() => {
    if (!loading && tenants.length === 1 && token) {
      setTenant(tenants[0]);
      fetchAndSetTheme(tenants[0].slug, token).then(() => {
        navigation.navigate('Home');
      });
    }
  }, [loading, tenants, token, setTenant, fetchAndSetTheme, navigation]);

  if (loading || themeLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        {themeLoading && <Text style={{ marginTop: 16 }}>Loading theme...</Text>}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Organization</Text>
      {themeError && <Text style={{ color: 'red', marginBottom: 12 }}>{themeError}</Text>}
      <FlatList
        data={tenants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tenantBtn} onPress={async () => {
            if (!token) return;
            await setTenant(item);
            await fetchAndSetTheme(item.slug, token);
            if (!themeError) navigation.navigate('Home');
          }}>
            <Text style={styles.tenantName}>{item.name}</Text>
            <Text style={styles.tenantSlug}>{item.slug}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  tenantBtn: { padding: 16, backgroundColor: '#eee', borderRadius: 8, marginBottom: 12, width: 250 },
  tenantName: { fontSize: 18, fontWeight: 'bold' },
  tenantSlug: { fontSize: 14, color: '#888' },
});

export default TenantSelectionScreen; 