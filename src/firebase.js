import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAhY9njB8Vo7Zhj7WO2MMWoJ4Bymy2xtXQ",
    authDomain: "mapchatjs.firebaseapp.com",
    projectId: "mapchatjs",
    storageBucket: "mapchatjs.appspot.com",
    messagingSenderId: "590394273202",
    appId: "1:590394273202:web:2772497ef045b4e96bc8ab",
    measurementId: "G-65L4EK5GYD"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();