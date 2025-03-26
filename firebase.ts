import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const auth: Auth = getAuth(app);

export { auth };