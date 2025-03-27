import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthForm from '../components/AuthForm';

const ProfileScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const checkAuthentication = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const email = await AsyncStorage.getItem('email');
        setUserEmail(email);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'email', 'firstName', 'lastName']);
      setIsAuthenticated(false);
      setUserEmail(null);
      setIsLogin(true);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleLogin = () => setIsLogin(prev => !prev);

  if (isAuthenticated) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-6">
        <Text className="mb-4 p-4 text-gold font-bold text-lg">
          Pozdrav, {userEmail}
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-gold py-btn-y px-btn-x rounded-btn items-center justify-center"
        >
          <Text className="text-black font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <AuthForm isLogin={isLogin} toggleLogin={toggleLogin} onLoginSuccess={checkAuthentication} />
    </View>
  );
};

export default ProfileScreen;