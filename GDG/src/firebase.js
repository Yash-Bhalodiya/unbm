// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDj8AEA0EkkbVsMt8DMWJtLJQoBMSqq8gs",
  authDomain: "unbm-c2ff4.firebaseapp.com",
  projectId: "unbm-c2ff4",
  storageBucket: "unbm-c2ff4.appspot.com", // 👈 fix domain typo from .app to .appspot.com
  messagingSenderId: "1095667171996",
  appId: "1:1095667171996:web:9d6c808063e0343cac2359",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth module for use in signup/login
export const auth = getAuth(app);
