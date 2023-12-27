import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCciPcYbqaTg5yHzx2LgS5xsvtPziWbxJ8",
  authDomain: "chinazaapp.firebaseapp.com",
  projectId: "chinazaapp",
  storageBucket: "chinazaapp.appspot.com",
  messagingSenderId: "344949492708",
  appId: "1:344949492708:web:6d5fcea9ef2271d750d5f1"
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()