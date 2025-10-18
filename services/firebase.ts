import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA27qqn90L4cs21nnlk9v3Erf6Svo82lQY",
    authDomain: "doot-inc.firebaseapp.com",
    projectId: "doot-inc",
    storageBucket: "doot-inc.appspot.com",
    messagingSenderId: "361145205770",
    appId: "1:361145205770:web:728036d27c84429b05cbf3",
    measurementId: "G-E0DLQJPS1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
