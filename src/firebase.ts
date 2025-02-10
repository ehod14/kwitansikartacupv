import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdFWkg_uK9Uy56Rg-RlbpBFdzCcJ-h14I",
  authDomain: "kwitansi-25d03.firebaseapp.com",
  databaseURL: "https://kwitansi-25d03-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kwitansi-25d03",
  storageBucket: "kwitansi-25d03.firebasestorage.app",
  messagingSenderId: "499276472486",
  appId: "1:499276472486:web:9f2cea43f26a3c75a7d467",
  measurementId: "G-HJG5STCT5T"
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const database = getDatabase(app);
export const storage = getStorage(app);
