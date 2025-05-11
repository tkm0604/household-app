// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhyMZKvoUgpXR88SQT4kT6JeFtR_uKEkc",
  authDomain: "householdtypescript-5f450.firebaseapp.com",
  projectId: "householdtypescript-5f450",
  storageBucket: "householdtypescript-5f450.firebasestorage.app",
  messagingSenderId: "634559278898",
  appId: "1:634559278898:web:fc0911432f485ef343f12b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };