// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics"; 

//import firebase from 'firebase/app'
import * as firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2DItTK_8AXJCPTSHSKmGeKrpjqqT-v-I",
  authDomain: "codify-c40d3.firebaseapp.com",
  projectId: "codify-c40d3",
  storageBucket: "codify-c40d3.appspot.com",
  messagingSenderId: "880876861356",
  appId: "1:880876861356:web:949383f5cea23a0e486c09",
  measurementId: "G-EJ9P3YV4PB"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase;