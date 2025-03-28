import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import * as Google from 'expo-auth-session';
import { signInWithGoogle } from '../services/authService';
import firebase from 'firebase/compat/app';

type Props = {
  onLoginSuccess: () => void;
};

const GoogleLogin = ({ onLoginSuccess }: Props) => {
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId: '679614658344-cr5epercm55j7gebl35ddt0ktdj23i0o.apps.googleusercontent.com',
      redirectUri: 'https://auth.expo.io/@mbanovic20/testni-zadatak',
    },
    discovery
  );

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (response?.type === 'success') {
      signInWithGoogle(response)
        .then((result) => {
          if (result) {
            const { user } = result;
            setUser(user);
            onLoginSuccess();
          }
        })
        .catch((error) => {
          console.error('Google login failed:', error);
          Alert.alert('Login Failed', 'An error occurred during Google login.');
        });
    }
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={handleGoogleLogin}
        disabled={!request}
        style={{
          backgroundColor: 'white',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
          {user ? `Welcome ${user.email}` : 'Login with Google'}
        </Text>
      </TouchableOpacity>

      {user && (
        <TouchableOpacity
          onPress={() => {
            firebase.auth().signOut().then(() => {
              setUser(null);
              Alert.alert('Logged out', 'You have been logged out.');
            });
          }}
          style={{
            backgroundColor: '#FFD700',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Logout</Text>
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

export default GoogleLogin;
