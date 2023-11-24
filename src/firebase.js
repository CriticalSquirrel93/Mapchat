import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCwzsTIBBd48KlI1IG7hjSuiTQqshaBmV4",
    authDomain: "mapchat-ef869.firebaseapp.com",
    databaseURL: "https://mapchat-ef869-default-rtdb.firebaseio.com",
    projectId: "mapchat-ef869",
    storageBucket: "mapchat-ef869.appspot.com",
    messagingSenderId: "233501723438",
    appId: "1:233501723438:web:5b23fa135663362db808bf",
    measurementId: "G-7XG223B24F"
};

export const app = initializeApp(firebaseConfig);
export const rdb = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();