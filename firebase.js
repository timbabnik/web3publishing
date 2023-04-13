// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM8pxNJZXZY8dISd7hDKayOBIWJ9O-0BM",
  authDomain: "web3-publishing.firebaseapp.com",
  projectId: "web3-publishing",
  storageBucket: "web3-publishing.appspot.com",
  messagingSenderId: "375073599952",
  appId: "1:375073599952:web:97d1d20acabb21279b89d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();