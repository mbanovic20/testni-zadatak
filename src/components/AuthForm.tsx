import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { registerUser, loginUser } from '../services/authService';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootTabParamList } from '../navigation/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthForm = ({ isLogin, onLogin }: { isLogin: boolean, onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const loginData = await loginUser(email, password);
        const { token, user } = loginData;

        // Spremamo podatke u AsyncStorage
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', user.email);
        await AsyncStorage.setItem('firstName', user.firstName);
        await AsyncStorage.setItem('lastName', user.lastName);

        onLogin();

        navigation.navigate('Profile');
      } else {
        const registerData = await registerUser(email, firstName, lastName, password);
        const { token, user } = registerData;

        // Spremamo podatke u AsyncStorage
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', user.email);
        await AsyncStorage.setItem('firstName', user.firstName);
        await AsyncStorage.setItem('lastName', user.lastName);

        // Pozivamo callback funkciju onLogin koja pokreće provjeru prijave u ProfileScreen
        onLogin();  // Pozivamo provjeru prijave

        navigation.navigate('Profile');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
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
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {error && <Text>{error}</Text>}
      <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit} />
    </View>
  );
};

export default AuthForm;
