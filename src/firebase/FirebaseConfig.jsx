import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBJaBT4f3tu9XF97f1ePyC9Y6aE91JbJc",
  authDomain: "my-shop-895d6.firebaseapp.com",
  projectId: "my-shop-895d6",
  storageBucket: "my-shop-895d6.appspot.com",
  messagingSenderId: "317220650127",
  appId: "1:317220650127:web:fa41ef40b5d4d59c8944fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB, auth } ;