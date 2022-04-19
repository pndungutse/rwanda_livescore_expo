// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhhTwUiHHNJahh82uP9KTxwgttYCzgCUg",
  authDomain: "rplivescore.firebaseapp.com",
  projectId: "rplivescore",
  storageBucket: "rplivescore.appspot.com",
  messagingSenderId: "571681542061",
  appId: "1:571681542061:web:a51d9be84cbe6ade2adb24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage, app };