// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnKXrSAiPckZbmMONrhD3Ugx-sFPeYew4",
  authDomain: "todo-404f6.firebaseapp.com",
  projectId: "todo-404f6",
  storageBucket: "todo-404f6.appspot.com",
  messagingSenderId: "1006356759694",
  appId: "1:1006356759694:web:10c50c652b619ff324f5df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth }