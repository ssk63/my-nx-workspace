import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTenant } from '../contexts/TenantContext';

export const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { tenant } = useTenant();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Tenant Settings
        </Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: theme.textColor }]}>
            Tenant Name
          </Text>
          <Text style={[styles.settingValue, { color: theme.textColor }]}>
            {tenant?.name}
          </Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: theme.textColor }]}>
            Tenant ID
          </Text>
          <Text style={[styles.settingValue, { color: theme.textColor }]}>
            {tenant?.id}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
  },
}); 