import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import firebase from './firebase';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const storeUserData = async (token: string, user: { email: string; firstName: string; lastName: string }) => {
  try {
    await AsyncStorage.multiSet([
      ['token', token],
      ['email', user.email],
      ['firstName', user.firstName],
      ['lastName', user.lastName],
    ]);
  } catch (error) {
    console.error('Error storing user data:', error);
    throw new Error('Failed to store user data.');
  }
};

const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response) {
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data?.error || defaultMessage);
  } else {
    console.error('Unexpected Error:', error);
    throw new Error(defaultMessage);
  }
};

export const registerUser = async (email: string, firstName: string, lastName: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { email, firstName, lastName, password });
    const { token, user } = response.data;

    await storeUserData(token, user);

    return { token, user };
  } catch (error) {
    return Promise.reject(handleApiError(error, 'Registration failed.'));
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    await storeUserData(token, user);

    return { token, user };
  } catch (error) {
    return Promise.reject(handleApiError(error, 'Login failed.'));
  }
};

export const signInWithGoogle = async (response: any) => {
  try {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const auth = getAuth(firebase);
      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      const token = await user.getIdToken();

      await storeUserData(token, {
        email: user.email ?? '',
        firstName: user.displayName?.split(' ')[0] ?? '',
        lastName: user.displayName?.split(' ')[1] ?? '',
      });

      return { token, user: userCredential.user };
    }
    return null;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw new Error('Google login failed.');
  }
};
