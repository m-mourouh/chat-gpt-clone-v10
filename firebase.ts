import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "chat-gpt-v10.firebaseapp.com",
  projectId: "chat-gpt-v10",
  storageBucket: "chat-gpt-v10.appspot.com",
  messagingSenderId: "895735925831",
  appId: "1:895735925831:web:38d0b4c5b3a70f9a3f7562",
  measurementId: "G-SXWSSTT6VP",
};

// singleton instance design pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
