import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTenant } from '../contexts/TenantContext';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../config';

export const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { tenant, setTenant } = useTenant();
  const { token } = useAuth();
  const [name, setName] = useState(tenant?.name || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = tenant?.role === 'admin'; // adjust as needed

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/tenants/${tenant?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.message || 'Failed to update tenant');
      } else {
        const updated = await res.json();
        setTenant({ ...tenant!, name: updated.name });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={[styles.title, { color: theme.textColor }]}>Tenant Settings</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.primaryColor }]}
            value={name}
            onChangeText={setName}
            editable={isAdmin}
            placeholder="Tenant Name"
            placeholderTextColor={theme.textColor + '80'}
          />
          <TextInput
            style={[styles.input, { borderColor: theme.primaryColor }]}
            value={tenant?.id || ''}
            editable={false}
            placeholder="Tenant ID"
            placeholderTextColor={theme.textColor + '80'}
          />
          {/* Advanced settings fields can go here */}
          {isAdmin && (
            <>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled, { backgroundColor: theme.primaryColor }]}
                onPress={handleSave}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setName(tenant?.name || '')}
                disabled={loading}
              >
                <Text style={[styles.buttonText, { color: '#333' }]}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {success && <Text style={{ color: 'green', marginTop: 16, textAlign: 'center' }}>Tenant updated!</Text>}
          {error && <Text style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafbfc',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton: { backgroundColor: '#f0f0f0' },
}); 