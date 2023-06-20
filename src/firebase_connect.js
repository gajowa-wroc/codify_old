import { initializeApp } from "firebase/app";
//////import { getAnalytics } from "firebase/analytics"; 
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";  //realtime db


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librari
const firebaseConfig = {
  apiKey: "AIzaSyC2DItTK_8AXJCPTSHSKmGeKrpjqqT-v-I",
  authDomain: "codify-c40d3.firebaseapp.com",
  databaseURL: "https://codify-c40d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codify-c40d3",
  storageBucket: "codify-c40d3.appspot.com",
  messagingSenderId: "880876861356",
  appId: "1:880876861356:web:949383f5cea23a0e486c09",
  measurementId: "G-EJ9P3YV4PB"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const database = getDatabase(app); //realtime db
//const analytics = getAnalytics(app);
