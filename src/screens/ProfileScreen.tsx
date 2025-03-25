import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthForm from '../components/AuthForm';

const ProfileScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true); 
        const email = await AsyncStorage.getItem('email');
        setUserEmail(email);
      }
    };
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  if (isAuthenticated) {
    return (
      <View>
        {userEmail && <Text>Pozdrav, {userEmail}</Text>}
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  } else {
    return (
      <View>
        <AuthForm isLogin={isLogin} />
        <Button title={isLogin ? 'Switch to Register' : 'Switch to Login'} onPress={() => setIsLogin(!isLogin)} />
      </View>
    );
  }
};

export default ProfileScreen;
