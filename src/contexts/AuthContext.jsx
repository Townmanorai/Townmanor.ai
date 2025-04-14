import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import axios from 'axios';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  // Set up persistence on component mount
  useEffect(() => {
    const setupPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        console.log('Firebase persistence set to local');
      } catch (error) {
        console.error('Error setting persistence:', error);
      }
    };
    
    setupPersistence();
  }, []);

  // Sign up function
  async function signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error.message);
      throw error;
    }
  }

  // Login function with username
  const login = async (username, password) => {
    try {
      console.log('Attempting login with username:', username);
      
      // First authenticate with the backend
      const response = await axios.post('https://www.townmanor.ai/api/api/users/login', {
        username,
        password
      });
      
      console.log('Backend login response:', response.data);
      
      if (response.status === 200) {
        // Store the token in cookies
        if (response.data.token) {
          document.cookie = `jwttoken=${response.data.token}; path=/; secure; samesite=strict`;
          console.log('JWT token saved to cookies');
        } else {
          console.warn('No token found in login response');
        }
        
        // Try to authenticate with Firebase if email is available
        if (response.data.email) {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, response.data.email, password);
            return userCredential.user;
          } catch (firebaseError) {
            console.warn('Firebase authentication failed, but backend login succeeded:', firebaseError);
            // Return a mock user object since backend login succeeded
            return {
              username: response.data.username,
              email: response.data.email,
              uid: response.data.id || 'backend-user'
            };
          }
        } else {
          // Return a mock user object since backend login succeeded
          return {
            username: response.data.username,
            uid: response.data.id || 'backend-user'
          };
        }
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Google Sign In
  async function signInWithGoogle() {
    try {
      // Create a Google provider with custom parameters
      const provider = new GoogleAuthProvider();
      
      // Add scopes if needed
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      
      // Set custom parameters
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      console.log('Attempting Google sign in...');
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in successful:', result);
      return result;
    } catch (error) {
      console.error('Error during Google sign in:', error);
      
      // Provide more specific error messages
      if (error.code === 'auth/popup-blocked') {
        toast.error('Pop-up was blocked by your browser. Please allow pop-ups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/configuration-not-found') {
        toast.error('Firebase configuration error. Please contact support.');
      } else {
        toast.error(error.message || 'Failed to sign in with Google');
      }
      
      throw error;
    }
  }

  // Phone Authentication Setup
  async function setupPhoneAuth(phoneNumber) {
    try {
      // Clear any existing verifier
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }

      // Create a new verifier
      const verifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('reCAPTCHA verified');
        }
      }, auth);

      // Render the verifier
      verifier.render();
      setRecaptchaVerifier(verifier);

      // Send verification code
      return signInWithPhoneNumber(auth, phoneNumber, verifier);
    } catch (error) {
      console.error('Error setting up phone auth:', error);
      toast.error(error.message);
      throw error;
    }
  }

  // Verify Phone Code
  async function verifyPhoneCode(confirmationResult, code) {
    try {
      const result = await confirmationResult.confirm(code);
      return result;
    } catch (error) {
      console.error('Error verifying phone code:', error);
      toast.error(error.message);
      throw error;
    }
  }

  // Logout function
  async function logout() {
    try {
      // Clear the JWT token cookie
      document.cookie = 'jwttoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Sign out from Firebase
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error(error.message);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth State Changed:', user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    setupPhoneAuth,
    verifyPhoneCode
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 