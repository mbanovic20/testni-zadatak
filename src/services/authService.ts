import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Funkcija za registraciju
export const registerUser = async (email: string, firstName: string, lastName: string, password: string) => {
  try {
    const response = await api.post('/auth/register', {
      email,
      firstName,
      lastName,
      password,
    });

    const { token, user } = response.data;

    // Pohranjivanje tokena i korisničkih podataka u AsyncStorage
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('email', user.email);
    await AsyncStorage.setItem('firstName', user.firstName);
    await AsyncStorage.setItem('lastName', user.lastName);

    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log((error as any).response.data);  // Dodatni log za prikaz greške
    } else {
      console.log(error);
    }
    const errorMessage = axios.isAxiosError(error) && error.response ? (error as any).response.data?.message : (error as any).message;
    throw new Error('Registration failed: ' + errorMessage);
  }
};

// Funkcija za login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    const { token, user } = response.data;

    // Pohranjivanje tokena i korisničkih podataka u AsyncStorage
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('email', user.email);
    await AsyncStorage.setItem('firstName', user.firstName);
    await AsyncStorage.setItem('lastName', user.lastName);

    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);  // Dodatni log za prikaz greške
      throw new Error('Login failed: ' + (error.response.data?.message || error.message));
    } else {
      console.log(error);
      throw new Error('Login failed: ' + (error as Error).message);
    }
  }
};
