// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf1bfU3tOvsWO5xde1pBh2eI_dumt_plc",
  authDomain: "reactnative-romis.firebaseapp.com",
  projectId: "reactnative-romis",
  storageBucket: "reactnative-romis.appspot.com",
  messagingSenderId: "958031586377",
  appId: "1:958031586377:web:fa68098a1f2b18a75e0b98",
  measurementId: "G-3TYELN0PH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
