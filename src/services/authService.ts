import api from './api';

export const registerUser = async (email: string, firstName: string, lastName: string, password: string) => {
  try {
    const response = await api.post('/auth/register', {
      email,
      firstName,
      lastName,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
