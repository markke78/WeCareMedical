// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS9nLcJyoLcNH_4BpuV1nK0v3lqdwN_os",
  authDomain: "cstp2107-wecare.firebaseapp.com",
  projectId: "cstp2107-wecare",
  storageBucket: "cstp2107-wecare.appspot.com",
  messagingSenderId: "779900322667",
  appId: "1:779900322667:web:6002731a751e9017ba022e"
};

// Initialize Firebase
const adminAccountId = 'VGYHycwkzES0GJwNUIKHm0OtRuH2';
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore(app);
export { adminAccountId, app, firestore, auth, googleProvider, facebookProvider, storage, db };