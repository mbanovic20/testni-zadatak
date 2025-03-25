import React, { useState } from 'react';
import { TextInput, Button, Text, View, TouchableOpacity } from 'react-native';
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

      // kad je sve prošlo → pozovi roditelja da provjeri autentikaciju
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
    <View>
      {!isLogin && (
        <>
          <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} />
          <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        </>
      )}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit} />

      <TouchableOpacity onPress={toggleLogin}>
        <Text style={{ color: 'blue', marginTop: 10, textAlign: 'center' }}>
          {isLogin ? "Don't have an account? Register now" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;
