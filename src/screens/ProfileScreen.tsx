import React, { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthForm from '../components/AuthForm';  // Komponenta za login/registraciju

const ProfileScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      setIsAuthenticated(!!token);
      if (token) {
        AsyncStorage.getItem('email').then((email) => {
          setUserEmail(email);
        });
      }
    });
  }, []);

  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('firstName');
    AsyncStorage.removeItem('lastName');
    setIsAuthenticated(false);
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