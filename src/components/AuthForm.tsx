import React, { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { registerUser, loginUser } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  isLogin: boolean;
  toggleLogin: () => void;
  onLoginSuccess: () => void;
};

const AuthForm = ({ isLogin, toggleLogin, onLoginSuccess }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const { token, user } = await loginUser(email, password);
        await AsyncStorage.multiSet([
          ['token', token],
          ['email', user.email],
          ['firstName', user.firstName],
          ['lastName', user.lastName],
        ]);
      } else {
        const { token, user } = await registerUser(email, firstName, lastName, password);
        await AsyncStorage.multiSet([
          ['token', token],
          ['email', user.email],
          ['firstName', user.firstName],
          ['lastName', user.lastName],
        ]);
      }

      onLoginSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Došlo je do greške.');
      }
    }
  };

  return (
    <View className="p-6 bg-black shadow-md w-full h-full justify-center">
      {!isLogin && (
        <>
          <TextInput 
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
            placeholderTextColor="#A9A9A9"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
            placeholderTextColor="#A9A9A9"
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
        placeholderTextColor="#A9A9A9"
      />

      {error ? <Text className="text-red-500 text-sm mb-4">{error}</Text> : null}

      <TouchableOpacity 
        onPress={handleSubmit}
        className="mb-4 p-4 bg-yellow-500 rounded-full"
        style={{
          backgroundColor: '#FFD700',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text className="color-white font-bold text-lg">
          {isLogin ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleSubmit}
        className="mb-4 p-4 bg-yellow-500 rounded-full"
        style={{
          backgroundColor: '#FFD700',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text className="color-white font-bold text-lg">
          Login with 
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleLogin} className="mt-4">
        <Text className="text-center color-white">
          {isLogin ? "Don't have an account? Register now" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;
