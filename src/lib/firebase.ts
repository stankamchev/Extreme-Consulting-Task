import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBovzNtiJ4OtNQgdUP_FlBGazMJ_V5lhqY",
  authDomain: "extreme-consulting-proj.firebaseapp.com",
  projectId: "extreme-consulting-proj",
  storageBucket: "extreme-consulting-proj.appspot.com",
  messagingSenderId: "55114025097",
  appId: "1:55114025097:web:f81e89b1567f1c4f975e58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
