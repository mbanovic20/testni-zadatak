import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithCredential, UserCredential, User } from 'firebase/auth';

interface GoogleLoginProps {
  onLoginSuccess: (user: User) => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onLoginSuccess }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '679614658344-cr5epercm55j7gebl35ddt0ktdj23i0o.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@matejbanovic/testni-zadatak'
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential: UserCredential) => {
          const user = userCredential.user;
          setUser(user);
          onLoginSuccess(user);
        })
        .catch((error) => {
          console.error('Firebase login error:', error);
          Alert.alert('Login Failed', 'There was an error during Google login');
        });
    }
  }, [response]);

  // Pokrenite Google login
  const handleGoogleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Login Failed', 'There was an error during Google login');
    }
  };

  return (
    <React.Fragment>
  <TouchableOpacity
    onPress={handleGoogleLogin}
    disabled={!request}
    style={{
      backgroundColor: '#FFD700',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,  // Equivalent to "mb-4"
    }}
  >
    <Text
      style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      }}
    >
      {user ? `Welcome ${user.displayName}` : 'Login with Google'}
    </Text>
  </TouchableOpacity>

  {user && (
    <TouchableOpacity
      onPress={() => auth.signOut()}
      style={{
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        Logout
      </Text>
    </TouchableOpacity>
  )}
</React.Fragment>

  );
};

export default GoogleLogin;