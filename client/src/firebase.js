// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8MrHl3TPhGRE2-NlryHLqqUV__p8KiNA",
    authDomain: "chatapp-b070f.firebaseapp.com",
    projectId: "chatapp-b070f",
    storageBucket: "chatapp-b070f.appspot.com",
    messagingSenderId: "297509084728",
    appId: "1:297509084728:web:e59b0f17ad1e6436a7d0cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)