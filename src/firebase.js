import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDFMNdKVCh5WiiH6yJE1OrVz5P-TKSQw18",
    authDomain: "townmanor-a3f33.firebaseapp.com",
    projectId: "townmanor-a3f33",
    storageBucket: "townmanor-a3f33.firebasestorage.app",
    messagingSenderId: "819434635798",
    appId: "1:819434635798:web:8af856257a17dd5ba2ab37",
    measurementId: "G-VLDQDWBS81"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Enable persistence to keep the user signed in
// Using the proper setPersistence method with browserLocalPersistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting auth persistence:', error);
});

export { auth };