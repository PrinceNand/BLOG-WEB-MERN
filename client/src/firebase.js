// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-learn-57762.firebaseapp.com",
  projectId: "mern-auth-learn-57762",
  storageBucket: "mern-auth-learn-57762.appspot.com",
  messagingSenderId: "133259629839",
  appId: "1:133259629839:web:c4e0b779c5ebb0c0dfda7a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
