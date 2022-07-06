import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyC8KvayQ6ea_i5z3vN6MPDAVw-vNrLfL50",
  authDomain: "reiss-12c19.firebaseapp.com",
  projectId: "reiss-12c19",
  storageBucket: "reiss-12c19.appspot.com",
  messagingSenderId: "957286502034",
  appId: "1:957286502034:web:94aa180b75b57687da604b",
  measurementId: "G-RL33Q86SGZ",
});

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const cloudFunctions = getFunctions(firebaseApp);
export const storage = getStorage(firebaseApp);
