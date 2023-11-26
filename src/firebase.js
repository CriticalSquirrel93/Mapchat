import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut, updateProfile,
} from 'firebase/auth';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where, addDoc,
} from "firebase/firestore";
import { getDatabase, ref, update, set} from 'firebase/database';

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

const app = initializeApp(firebaseConfig);
const rdb = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();




const signInWithGoogle = async () => {
    try {
        const res = await signInWithGoogle(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // TODO : Ensure all users have valid account values. If not, provide default values.
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Add user data to the 'Users' node
        await set(ref(rdb, "Data/Users/" + user.uid + "/" ), {
            uid: user.uid,
            displayName: name,
            authProvider: "local",
            email: user.email,
        });

        // Add settings data to the 'Settings' node
        await update(ref(rdb, "Data/Users/" + user.uid + "/Settings"), {
            dark: true,
            location: false,
            business: false,
            display: false,
        });

        // Update the username in the firebase db.
        updateProfile(user, {
            displayName: name,
        }).then(() => {
            // Update the username in the Data/Usernames/ node
            update(ref(rdb, 'Data/Usernames/'), {
                [user.uid]: name,
            });
        }).catch((error) => {
            alert(error);
        });

        return sendEmailVerification(res.user);
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

const sendEmailVerificationEmail = async (user) => {
    try {
        await sendEmailVerification(user);
        alert("Verification email sent!");
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

const logoutFirebase = () => {
    signOut(auth).then(r => {
        console.log("Logged out successfully");
    });
}

export {
    auth,
    db,
    rdb,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    sendEmailVerificationEmail,
    logoutFirebase
}