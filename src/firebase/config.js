import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAkxYGS43aVpPP87mS2VGYQmSKwWwFVr_k",
  authDomain: "mymoney-d8f5b.firebaseapp.com",
  projectId: "mymoney-d8f5b",
  storageBucket: "mymoney-d8f5b.appspot.com",
  messagingSenderId: "898200672417",
  appId: "1:898200672417:web:9df5c22d6c064161ba78e0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;
export { projectFirestore, projectAuth, timestamp };
