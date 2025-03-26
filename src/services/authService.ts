import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const registerUser = async (email: string, firstName: string, lastName: string, password: string) => {
  try {
    const response = await api.post('/auth/register', {
      email,
      firstName,
      lastName,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('email', user.email);
    await AsyncStorage.setItem('firstName', user.firstName);
    await AsyncStorage.setItem('lastName', user.lastName);

    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log((error as any).response.data);
    } else {
      console.log(error);
    }
    const errorMessage = axios.isAxiosError(error) && error.response ? (error as any).response.data?.error : (error as any).message;
    throw new Error('Registration failed: ' + errorMessage);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('email', user.email);
    await AsyncStorage.setItem('firstName', user.firstName);
    await AsyncStorage.setItem('lastName', user.lastName);

    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
      throw new Error('Login failed: ' + (error.response.data?.error || error.message));
    } else {
      console.log(error);
      throw new Error('Login failed: ' + (error as Error).message);
    }
  }
};
