import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAPsVFspf77DVmmUE9fK0e6GHefCTADsg8",
  authDomain: "countdown-e3602.firebaseapp.com",
  projectId: "countdown-e3602",
  storageBucket: "countdown-e3602.appspot.com",
  messagingSenderId: "474253505386",
  appId: "1:474253505386:web:ce46aca0abaebf61fceb13",
  measurementId: "G-EJFRPQR9FX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
firebase.analytics();

export default db;
