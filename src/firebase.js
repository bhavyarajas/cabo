// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoMPTNoM0c3gL9HY7Cc0A2sRaPCTZ1xzM",
  authDomain: "cabo-a9ec8.firebaseapp.com",
  databaseURL: "https://cabo-a9ec8-default-rtdb.firebaseio.com",
  projectId: "cabo-a9ec8",
  storageBucket: "cabo-a9ec8.firebasestorage.app",
  messagingSenderId: "688495967021",
  appId: "1:688495967021:web:1db3953cccf229a87771a4",
  measurementId: "G-ZCG3F5DHNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

// Export the database instance
export { db };