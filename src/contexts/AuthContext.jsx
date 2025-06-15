import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

console.log('AuthContext: Firebase auth imported successfully');

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider: Initializing with loading state:', loading);

  function signup(email, password) {
    console.log('Attempting to sign up user:', email);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signup successful:', userCredential.user);
        return userCredential;
      })
      .catch((error) => {
        console.error('Signup error:', error);
        throw error;
      });
  }

  function login(email, password) {
    console.log('Attempting to login user:', email);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential.user);
        return userCredential;
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  }

  function logout() {
    console.log('Attempting to logout user');
    return signOut(auth)
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.error('Logout error:', error);
        throw error;
      });
  }

  function updateUserProfile(profile) {
    console.log('Updating user profile:', profile);
    return updateProfile(auth.currentUser, profile)
      .then(() => {
        console.log('Profile update successful');
      })
      .catch((error) => {
        console.error('Profile update error:', error);
        throw error;
      });
  }

  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'No user');
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 