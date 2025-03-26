import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithCredential, UserCredential, User } from 'firebase/auth'; // Firebase GoogleAuthProvider

interface GoogleLoginProps {
  onLoginSuccess: (user: User) => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onLoginSuccess }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '679614658344-cr5epercm55j7gebl35ddt0ktdj23i0o.apps.googleusercontent.com',
  });

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential: UserCredential) => {
          const user = userCredential.user;
          setUser(user);  // Pohranite korisničke podatke
          onLoginSuccess(user);  // Pozovite onLoginSuccess
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
      <Button
        title={user ? `Welcome ${user.displayName}` : 'Login with Google'}
        onPress={handleGoogleLogin}
        disabled={!request}
      />
      {user && <Button title="Logout" onPress={() => auth.signOut()} />}
    </React.Fragment>
  );
};

export default GoogleLogin;