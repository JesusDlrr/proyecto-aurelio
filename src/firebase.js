// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZiHcqgMbufIUdkz0TGY5QwjduowP7U5M",
    authDomain: "quick-respaldo.firebaseapp.com",
    projectId: "quick-respaldo",
    storageBucket: "quick-respaldo.appspot.com",
    messagingSenderId: "378491295358",
    appId: "1:378491295358:web:89aa5ae43080540e002a2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const fs = getStorage(app);
// export const collectionRef = doc(firestore, "publicaciones");