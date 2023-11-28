import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwxWyPfBYgxObNLIU-3BzfjjcAwZavIZ0",
  authDomain: "lemart-todo-app.firebaseapp.com",
  projectId: "lemart-todo-app",
  storageBucket: "lemart-todo-app.appspot.com",
  messagingSenderId: "27284629627",
  appId: "1:27284629627:web:87915433d6567836d89ade",
  measurementId: "G-2VSPLRQ2BD",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const analytics = getAnalytics(FIREBASE_APP);
