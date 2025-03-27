import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
    handleApiError(error, 'Registration failed.');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    await storeUserData(token, user);

    return { token, user };
  } catch (error) {
    handleApiError(error, 'Login failed.');
  }
};
