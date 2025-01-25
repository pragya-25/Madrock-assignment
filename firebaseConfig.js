// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA33F5T_h6c5ukoKzDgxuv-jsF_1Uceb2s",
  authDomain: "assignment-12a2f.firebaseapp.com",
  projectId: "assignment-12a2f",
  storageBucket: "assignment-12a2f.firebasestorage.app",
  messagingSenderId: "166184875467",
  appId: "1:166184875467:web:0993fdacaae5775379b24e",
  measurementId: "G-WPQYZMBYNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);