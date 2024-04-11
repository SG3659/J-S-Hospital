// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "doctor-application-e6c5b.firebaseapp.com",
  projectId: "doctor-application-e6c5b",
  storageBucket: "doctor-application-e6c5b.appspot.com",
  messagingSenderId: "898876089499",
  appId: "1:898876089499:web:70ff402372c344c5d9d23e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
