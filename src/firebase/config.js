import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN49wFkc4wg1-JjlqlQzSgfwAp1guUD1o",
  authDomain: "travel-app-ab21b.firebaseapp.com",
  projectId: "travel-app-ab21b",
  storageBucket: "travel-app-ab21b.firebasestorage.app",
  messagingSenderId: "241292943054",
  appId: "1:241292943054:web:aa37c067a7d6c8fca0fa9f",
  measurementId: "G-ZD4335S62B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase initialized successfully');

export { app, analytics, auth, db }; 