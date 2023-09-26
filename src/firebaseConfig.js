// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUJplq410bI0Yhg4Xa2qucx3FTbjgXKPk",
  authDomain: "crud-application-f4d4f.firebaseapp.com",
  projectId: "crud-application-f4d4f",
  storageBucket: "crud-application-f4d4f.appspot.com",
  messagingSenderId: "433506697695",
  appId: "1:433506697695:web:c6dd7222a63a84a817c46a",
  measurementId: "G-FSGV72CETB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
