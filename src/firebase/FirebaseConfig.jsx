import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoccMGUDFP0t5O3c1Pom_FJ87Ju81bkg8",
  authDomain: "myshop-5c013.firebaseapp.com",
  projectId: "myshop-5c013",
  storageBucket: "myshop-5c013.appspot.com",
  messagingSenderId: "174247888660",
  appId: "1:174247888660:web:ba0440da2edf2c9dbf6401"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB, auth } ;