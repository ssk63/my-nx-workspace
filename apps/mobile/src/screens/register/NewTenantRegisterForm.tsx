import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../config';

interface Props {
  onBack: () => void;
  onSuccess?: () => void;
}

const NewTenantRegisterForm: React.FC<Props> = ({ onBack, onSuccess }) => {
  const { theme } = useTheme();
  const [tenantName, setTenantName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requestedRole, setRequestedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successAnim] = useState(new Animated.Value(0));

  const clearForm = () => {
    setTenantName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRequestedRole('');
  };

  const handleRegister = async () => {
    setError(null);
    setSuccess(false);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!tenantName) {
      setError('Tenant name is required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tenants/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName,
          user: {
            firstName,
            lastName,
            email,
            password,
            requestedRole: requestedRole || undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setError('Email already in use.');
        } else if (res.status === 400 && data?.error?.[0]?.message) {
          setError(data.error[0].message);
        } else if (data?.error) {
          setError(data.error);
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        setSuccess(true);
        clearForm();
        Animated.timing(successAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(successAnim, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }).start(() => {
              if (onSuccess) onSuccess();
            });
          }, 2000);
        });
      }
    } catch (e) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={[styles.title, { color: theme.textColor }]}>Create a New Tenant</Text>
      {error && <Text style={[styles.errorText, { color: theme.errorColor }]}>{error}</Text>}
      {success && (
        <Animated.View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          opacity: successAnim,
          transform: [{ scale: successAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }],
        }}>
          <Ionicons name="checkmark-circle" size={22} color={theme.successColor || 'green'} />
          <Text style={{ color: theme.successColor, marginLeft: 8 }}>Tenant created! Please check your email.</Text>
        </Animated.View>
      )}
      <TextInput style={[styles.input, { borderColor: theme.primaryColor }]} placeholder="Tenant Name" value={tenantName} onChangeText={setTenantName} editable={!loading} />
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
      <TextInput style={[styles.input, { borderColor: theme.primaryColor }]} placeholder="Requested Role (optional)" value={requestedRole} onChangeText={setRequestedRole} editable={!loading} />
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

export default NewTenantRegisterForm; 