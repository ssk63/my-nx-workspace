import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Extend User type to include avatarUrl
interface UserWithAvatar {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export const ProfileScreen: React.FC = () => {
  const { user, logout, updateProfile, loading, error } = useAuth();
  const { theme } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [avatar, setAvatar] = useState((user as any)?.avatarUrl || '');
  const [localLoading, setLocalLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setLocalLoading(true);
    await updateProfile({ firstName, lastName, avatarUrl: avatar });
    setEditMode(false);
    setLocalLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (!user) return null;

  if (editMode) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
          <View style={{ padding: 20 }}>
            <TouchableOpacity onPress={pickAvatar} style={{ alignItems: 'center', marginTop: 40, marginBottom: 32 }} activeOpacity={0.8}>
              <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: avatar ? undefined : theme.primaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
                borderWidth: 3,
                borderColor: '#fff',
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowRadius: 8,
                elevation: 6,
                position: 'relative',
              }}>
                {avatar ? (
                  <Image source={{ uri: avatar }} style={{ width: 94, height: 94, borderRadius: 47 }} />
                ) : (
                  <Text style={{ color: '#fff', fontSize: 40, fontWeight: 'bold', textAlign: 'center', lineHeight: 100 }}>{user.firstName[0]}{user.lastName[0]}</Text>
                )}
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 4,
                  borderWidth: 2,
                  borderColor: theme.primaryColor,
                  shadowColor: '#000',
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ color: theme.primaryColor, fontWeight: 'bold', fontSize: 16 }}>✎</Text>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: theme.textColor }}>Edit Profile</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              style={{ height: 50, borderWidth: 1, borderColor: theme.primaryColor, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 }}
              placeholder="First Name"
              placeholderTextColor={theme.textColor + '80'}
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              style={{ height: 50, borderWidth: 1, borderColor: theme.primaryColor, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 }}
              placeholder="Last Name"
              placeholderTextColor={theme.textColor + '80'}
            />
            <TouchableOpacity
              onPress={handleSave}
              style={{ height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: theme.primaryColor }}
              disabled={loading || localLoading}
            >
              {(loading || localLoading) ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Save</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditMode(false)}
              style={{ height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#f7f7fa' }}
              disabled={loading || localLoading}
            >
              <Text style={{ color: '#333', fontSize: 16, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // View mode (non-edit) - match login/register look
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
        <View style={{ padding: 20, alignItems: 'center' }}>
          <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 32 }}>
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: avatar ? undefined : theme.primaryColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
              borderWidth: 3,
              borderColor: '#fff',
              shadowColor: '#000',
              shadowOpacity: 0.12,
              shadowRadius: 8,
              elevation: 6,
            }}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={{ width: 94, height: 94, borderRadius: 47 }} />
              ) : (
                <Text style={{ color: '#fff', fontSize: 40, fontWeight: 'bold', textAlign: 'center', lineHeight: 100 }}>{user.firstName[0]}{user.lastName[0]}</Text>
              )}
            </View>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: theme.textColor }}>Profile</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#222', textAlign: 'center' }}>{user.firstName} {user.lastName}</Text>
          <Text style={{ fontSize: 15, color: '#666', marginBottom: 16, textAlign: 'center' }}>{user.email}</Text>
          <TouchableOpacity onPress={() => setEditMode(true)}
            style={{ height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: theme.primaryColor, width: '100%' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#d32f2f', width: '100%' }} onPress={logout}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Logout</Text>
          </TouchableOpacity>
          {success && <Text style={{ color: 'green', marginTop: 16, textAlign: 'center' }}>Profile updated!</Text>}
          {error && <Text style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7fa' },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarWrapper: { marginBottom: 12, position: 'relative' },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { color: '#fff', fontSize: 32, fontWeight: 'bold', textAlign: 'center', lineHeight: 80 },
  editAvatarIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#007AFF', borderRadius: 12, padding: 4, borderWidth: 2, borderColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#222' },
  inputGroup: { width: '100%', marginBottom: 12 },
  label: { fontSize: 14, color: '#888', marginBottom: 4, marginLeft: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    backgroundColor: '#fafbfc',
    width: '100%',
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 12, marginBottom: 8 },
  button: { flex: 1, marginHorizontal: 4, padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  editTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
  },
  avatarEditWrapper: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEdit: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  saveButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#222' },
  email: { fontSize: 15, color: '#666', marginBottom: 16 },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', marginTop: 10 },
  logoutButton: {
    backgroundColor: '#d32f2f',
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
  },
  editButton: { backgroundColor: '#f0f0f0', marginTop: 10, marginBottom: 10 },
}); 