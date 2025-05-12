
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

// Export the User type so it can be used in other files
export type User = FirebaseUser;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgO6tfz1DQ74mWyOcW9oE3SfE2iiqfq1Y",
  authDomain: "online-learning-6995b.firebaseapp.com",
  projectId: "online-learning-6995b",
  storageBucket: "online-learning-6995b.firebasestorage.app",
  messagingSenderId: "477620798270",
  appId: "1:477620798270:web:e1e95966a1205d7552226f",
  measurementId: "G-CWEW82Z4S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication functions
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export { auth, onAuthStateChanged };
