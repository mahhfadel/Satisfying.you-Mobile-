import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCuyyQydmJG6ZYMy8vruinhFoJa0t4_wy4",
    authDomain: "mobile-satisfyingyou-1563556.firebaseapp.com",
    databaseURL: "https://mobile-satisfyingyou-1563556-default-rtdb.firebaseio.com",
    projectId: "mobile-satisfyingyou-1563556",
    storageBucket: "mobile-satisfyingyou-1563556.firebasestorage.app",
    messagingSenderId: "477219663662",
    appId: "1:477219663662:web:51b570e84381f4ec2d54bf"
  };

const app = initializeApp(firebaseConfig);

const auth_mod = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

const db = getFirestore(app);

// Inicializando o Firebase Storage
const storage = getStorage(app);

// Exportando as instâncias
export { auth_mod, db, storage };