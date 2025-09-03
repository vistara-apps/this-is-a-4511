import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if user is already authenticated
        if (authService.isAuthenticated()) {
          // For development/demo purposes, use the simulate method
          const user = authService.simulateAuth.getCurrentUser();
          
          if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error('Failed to initialize authentication:', err);
        setError('Failed to initialize authentication. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/demo purposes, use the simulate method
      const { user } = authService.simulateAuth.login(credentials);
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials and try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/demo purposes, use the simulate method
      const { user } = authService.simulateAuth.register(userData);
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/demo purposes, use the simulate method
      authService.simulateAuth.logout();
      
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err.message || 'Logout failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      // For development/demo purposes, use the simulate method
      const updatedUser = authService.simulateAuth.updateProfile(userData);
      
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Profile update failed:', err);
      setError(err.message || 'Profile update failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

