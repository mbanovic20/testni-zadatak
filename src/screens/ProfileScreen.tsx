import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthForm from '../components/AuthForm';  // Komponenta za login/registraciju

const ProfileScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // Ako token postoji, korisnik je prijavljen
      const email = await AsyncStorage.getItem('email');
      setUserEmail(email);  // Dohvatimo email korisnika
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    setIsAuthenticated(false);  // Postavljamo isAuthenticated na false
    setUserEmail(null);  // Brišemo email
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
        <AuthForm isLogin={true} onLogin={checkAuthentication} />
      </View>
    );
  }
};

export default ProfileScreen;
