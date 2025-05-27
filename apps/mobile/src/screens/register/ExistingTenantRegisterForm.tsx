import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../config';

interface Props {
  onBack: () => void;
  onSuccess?: () => void;
}

const ExistingTenantRegisterForm: React.FC<Props> = ({ onBack, onSuccess }) => {
  const { theme } = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tenantCode, setTenantCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    setError(null);
    setSuccess(false);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!tenantCode) {
      setError('Tenant code is required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          tenantId: tenantCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        setSuccess(true);
        if (onSuccess) onSuccess();
      }
    } catch (e) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <View>
      <Text style={[styles.title, { color: theme.textColor }]}>Register for Existing Tenant</Text>
      {error && <Text style={[styles.errorText, { color: theme.errorColor }]}>{error}</Text>}
      {success && <Text style={{ color: theme.successColor }}>Registration successful! Please check your email.</Text>}
      <TextInput style={[styles.input, { borderColor: theme.primaryColor }]} placeholder="First Name" value={firstName} onChangeText={setFirstName} editable={!loading} />
      <TextInput style={[styles.input, { borderColor: theme.primaryColor }]} placeholder="Last Name" value={lastName} onChangeText={setLastName} editable={!loading} />
      <TextInput style={[styles.input, { borderColor: theme.primaryColor }]} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" editable={!loading} />
      <View style={{ position: 'relative' }}>
        <TextInput
          style={[styles.input, { borderColor: theme.primaryColor }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          textContentType="newPassword"
          autoComplete="password-new"
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={{ position: 'relative' }}>
        <TextInput
          style={[styles.input, { borderColor: theme.primaryColor }]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          textContentType="newPassword"
          autoComplete="password-new"
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword((prev) => !prev)}
        >
          <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
        </TouchableOpacity>
      </View>
      <TextInput style={[styles.input, { borderColor: theme.primaryColor }]} placeholder="Tenant Code" value={tenantCode} onChangeText={setTenantCode} editable={!loading} />
      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.backLink} onPress={onBack} disabled={loading}>
        <Text style={[styles.backText, { color: theme.primaryColor }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { height: 50, borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
  button: { height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#007AFF' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  errorText: { fontSize: 14, marginBottom: 15, textAlign: 'center' },
  backLink: { marginTop: 20, alignItems: 'center' },
  backText: { fontSize: 14 },
  eyeIcon: { position: 'absolute', right: 15, top: 13 },
});

export default ExistingTenantRegisterForm; 