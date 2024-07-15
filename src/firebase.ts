// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'x-next-429220.firebaseapp.com',
  projectId: 'x-next-429220',
  storageBucket: 'x-next-429220.appspot.com',
  messagingSenderId: '437112008954',
  appId: '1:437112008954:web:fe61d29bb15fba5ca4d943',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
