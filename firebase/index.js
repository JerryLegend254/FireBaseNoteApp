// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc
} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCReiZpIqgDRQ_EAxPnx21-vo64FRDpB2g",
  authDomain: "notesapp-f13b4.firebaseapp.com",
  projectId: "notesapp-f13b4",
  storageBucket: "notesapp-f13b4.appspot.com",
  messagingSenderId: "925898313568",
  appId: "1:925898313568:web:9c0acfd9cd9f1d54599805",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { collection, addDoc, db, getDocs, query, where, onSnapshot, serverTimestamp, deleteDoc, doc, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, signOut, updateProfile};
