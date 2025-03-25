import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthForm from '../components/AuthForm';

const ProfileScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true); // login/register prebacivanje

  // Kad god se komponenta mounta ILI se dogodi login, provjeri stanje
  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const email = await AsyncStorage.getItem('email');
      setUserEmail(email);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['token', 'email', 'firstName', 'lastName']);
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsLogin(true); // resetiraj na login nakon logouta
  };

  const toggleLogin = () => {
    setIsLogin(prev => !prev);
  };

  if (isAuthenticated) {
    return (
      <View>
        <Text>Pozdrav, {userEmail}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <View>
      <AuthForm isLogin={isLogin} toggleLogin={toggleLogin} onLoginSuccess={checkAuthentication} />
    </View>
  );
};

export default ProfileScreen;