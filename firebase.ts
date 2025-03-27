import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCYinyaT17Qvii9CNXyD3UfSJTFjLGXN0g",
  authDomain: "testni-zadatak-croativa-4bc77.firebaseapp.com",
  projectId: "testni-zadatak-croativa-4bc77",
  storageBucket: "testni-zadatak-croativa-4bc77.firebasestorage.app",
  messagingSenderId: "679614658344",
  appId: "1:679614658344:web:ea7da1c0efc36036a1c21d",
  measurementId: "G-XTJK5WZZ5C"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

AsyncStorage.setItem('firebaseAuthPersistence', 'LOCAL')
  .then(() => {
    console.log("Firebase authentication persistence set to LOCAL using AsyncStorage.");
  })
  .catch((error) => {
    console.error('Error setting persistence with AsyncStorage:', error);
  });

export { auth };
