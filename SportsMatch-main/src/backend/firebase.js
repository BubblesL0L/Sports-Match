// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdc-mlq0Kl-SYehq71x9a5MIR_uItkET4",
  authDomain: "sportsmatch-bc515.firebaseapp.com",
  projectId: "sportsmatch-bc515",
  storageBucket: "sportsmatch-bc515.appspot.com",
  messagingSenderId: "45360601662",
  appId: "1:45360601662:web:693dc988225dcb1ec1cf6f",
  measurementId: "G-QTEZ8TY4QM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
