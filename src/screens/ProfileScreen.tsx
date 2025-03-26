import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthForm from '../components/AuthForm';

const ProfileScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

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
    setIsLogin(true);
  };

  const toggleLogin = () => {
    setIsLogin(prev => !prev);
  };

  if (isAuthenticated) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-6">
        <Text className="mb-4 p-4 text-white font-bold text-lg">
          Pozdrav, {userEmail}
        </Text>
  
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#FFD700',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text className='color-white font-bold text-lg'>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }  

  return (
    <View className='flex-1 justify-center items-center'>
      <AuthForm isLogin={isLogin} toggleLogin={toggleLogin} onLoginSuccess={checkAuthentication} />
    </View>
  );
};

export default ProfileScreen;