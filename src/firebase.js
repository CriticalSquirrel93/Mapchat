import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCRMRrrljsnlSomprrQp1v4CCBgmJ6MpYo",
    authDomain: "djangodemo-b19ea.firebaseapp.com",
    databaseURL: "https://djangodemo-b19ea-default-rtdb.firebaseio.com",
    projectId: "djangodemo-b19ea",
    storageBucket: "djangodemo-b19ea.appspot.com",
    messagingSenderId: "322473729426",
    appId: "1:322473729426:web:ec8f8a309f3aea4b90354b",
    measurementId: "G-7JC5G7F1X8"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();