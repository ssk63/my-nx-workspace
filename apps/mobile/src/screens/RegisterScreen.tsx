import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation.types';
import { useTheme } from '../contexts/ThemeContext';
import ExistingTenantRegisterForm from './register/ExistingTenantRegisterForm';
import NewTenantRegisterForm from './register/NewTenantRegisterForm';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC = () => {
  const [mode, setMode] = useState<'existing' | 'new' | null>(null);
  const { theme } = useTheme();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegisterSuccess = () => {
    navigation.navigate('TenantSelection');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          {!mode && (
            <>
              <Text style={[styles.title, { color: theme.textColor }]}>Register</Text>
              <TouchableOpacity style={styles.button} onPress={() => setMode('existing')}>
                <Text style={styles.buttonText}>Register for an Existing Tenant</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setMode('new')}>
                <Text style={styles.buttonText}>Create a New Tenant</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.loginText, { color: theme.primaryColor }]}>Already have an account? Login</Text>
              </TouchableOpacity>
            </>
          )}
          {mode === 'existing' && <ExistingTenantRegisterForm onBack={() => setMode(null)} onSuccess={handleRegisterSuccess} />}
          {mode === 'new' && <NewTenantRegisterForm onBack={() => setMode(null)} onSuccess={handleRegisterSuccess} />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
}); 