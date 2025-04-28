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

// Helper function to debug cookies
function logCookies() {
  console.log('Current cookies:', document.cookie);
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  console.log('Parsed cookies:', cookies);
  const jwtCookie = cookies.find(cookie => cookie.startsWith('jwttoken='));
  console.log('JWT cookie found:', jwtCookie || 'Not found');
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
      const response = await axios.post('http://localhost:3030/api/users/login', {
        username,
        password
      });
      
      console.log('Backend login response:', response.data);
      
      if (response.status === 200) {
        // Store the token in cookies
        if (response.data.token) {
          // Set the token as a cookie
          document.cookie = `jwttoken=${response.data.token}; path=/; max-age=36000; SameSite=Lax`;
          console.log('JWT token saved to cookies');
          logCookies(); // Debug cookies
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
      
      // Now call our backend to create/login the user and generate JWT
      try {
        const user = result.user;
        const response = await axios.post('https://www.townmanor.ai/api/api/users/google-login', {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid
        });
        
        if (response.status === 200) {
          console.log('Backend Google authentication successful');
          // Set the token as a cookie if it exists in the response
          if (response.data.token) {
            document.cookie = `jwttoken=${response.data.token}; path=/; max-age=36000; SameSite=Lax`;
            console.log('JWT token saved to cookies');
            logCookies(); // Debug cookies
          } else {
            console.warn('No token found in Google login response');
          }
        } else {
          console.error('Backend Google authentication failed:', response);
          throw new Error('Google sign-in verification failed');
        }
      } catch (backendError) {
        console.error('Backend error during Google authentication:', backendError);
        throw new Error(backendError.response?.data?.message || 'Failed to authenticate with the server');
      }
      
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

  // Setup Phone Authentication
  const setupPhoneAuth = async (phoneNumber) => {
    try {
      console.log('Setting up phone auth for:', phoneNumber);
      
      // Check if we already have a recaptcha verifier
      if (window.recaptchaVerifier) {
        console.log('Using existing recaptcha verifier');
        return window.recaptchaVerifier;
      }
      
      // Create a new recaptcha verifier
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          // Reset the verifier
          window.recaptchaVerifier = null;
        }
      });
      
      console.log('Created new recaptcha verifier');
      
      // Render the verifier
      await window.recaptchaVerifier.render();
      console.log('Rendered recaptcha verifier');
      
      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      console.log('Verification code sent successfully');
      
      return confirmationResult;
    } catch (error) {
      console.error('Error setting up phone auth:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/invalid-phone-number') {
        throw new Error('Invalid phone number format. Please include country code (e.g., +91)');
      } else if (error.code === 'auth/quota-exceeded') {
        throw new Error('Too many attempts. Please try again later');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('This phone number has been disabled');
      } else if (error.message.includes('appVerificationDisabledForTesting')) {
        // This is a development/testing error
        console.warn('Phone auth testing mode error. This is expected in development.');
        // For development/testing, you might want to return a mock confirmation result
        return {
          verificationId: 'mock-verification-id',
          confirm: async (code) => {
            console.log('Mock confirmation with code:', code);
            // Return a mock user for testing
            return {
              user: {
                uid: 'mock-user-id',
                phoneNumber: phoneNumber
              }
            };
          }
        };
      }
      
      // Generic error
      throw new Error('Failed to send verification code. Please try again later.');
    }
  };

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
      // Clear the JWT token cookie more thoroughly
      document.cookie = 'jwttoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      document.cookie = 'jwttoken=; path=/api; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      document.cookie = 'jwttoken=; domain=.townmanor.ai; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      
      console.log('JWT cookie cleared');
      logCookies(); // Debug cookies after clearing
      
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
      
      // Check if we have a JWT token cookie
      logCookies();
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