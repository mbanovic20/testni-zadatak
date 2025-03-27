import React, { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { registerUser, loginUser } from '../services/authService';
import GoogleLogin from './GoogleLogin';

type Props = {
  isLogin: boolean;
  toggleLogin: () => void;
  onLoginSuccess: () => void;
};

const AuthForm = ({ isLogin, toggleLogin, onLoginSuccess }: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { email, password, firstName, lastName } = formData;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    if (!isLogin && (!firstName || !lastName)) {
      return 'First name and last name are required.';
    }

    return '';
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { email, password, firstName, lastName } = formData;

      const result = isLogin
        ? await loginUser(email, password)
        : await registerUser(email, firstName, lastName, password);

      if (!result) {
        throw new Error('Failed to authenticate. Please try again.');
      }

      const { token, user } = result;
      onLoginSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <View className="p-6 bg-black shadow-md w-full h-full justify-center">
      {!isLogin && (
        <>
          <TextInput
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
            className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
            placeholderTextColor="#A9A9A9"
          />
          <TextInput
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
            className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
            placeholderTextColor="#A9A9A9"
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        autoCapitalize="none"
        className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry
        className="mb-4 p-4 border border-gray-300 rounded-lg text-white placeholder-white"
        placeholderTextColor="#A9A9A9"
      />

      {error && <Text className="text-red-500 text-sm mb-4">{error}</Text>}

      <TouchableOpacity
        onPress={handleSubmit}
        className="mb-4 p-4 bg-gold rounded-full justify-center items-center"
      >
        <Text className="text-black font-bold text-lg">
          {isLogin ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>

      <GoogleLogin onLoginSuccess={onLoginSuccess} />

      <TouchableOpacity onPress={toggleLogin} className="mt-4">
        <Text className="text-center text-white">
          {isLogin
            ? "Don't have an account? Register now"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;