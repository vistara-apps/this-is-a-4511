/**
 * Authentication service for handling user authentication
 * This service provides methods for user registration, login, logout, and password recovery
 */

import api from './api';

// Auth endpoints
const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  GET_CURRENT_USER: '/auth/me',
};

/**
 * Handles user registration
 * @param {Object} userData - User registration data (username, email, password)
 * @returns {Promise<Object>} - Registration response with user data and token
 */
export const register = async (userData) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

/**
 * Handles user login
 * @param {Object} credentials - User login credentials (email, password)
 * @returns {Promise<Object>} - Login response with user data and token
 */
export const login = async (credentials) => {
  try {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, credentials);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Handles user logout
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post(AUTH_ENDPOINTS.LOGOUT);
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Logout failed:', error);
    // Still remove token even if API call fails
    localStorage.removeItem('authToken');
    throw error;
  }
};

/**
 * Checks if user is authenticated
 * @returns {boolean} - True if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

/**
 * Gets current authenticated user
 * @returns {Promise<Object>} - Current user data
 */
export const getCurrentUser = async () => {
  try {
    return await api.get(AUTH_ENDPOINTS.GET_CURRENT_USER);
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw error;
  }
};

/**
 * Initiates password recovery process
 * @param {string} email - User email
 * @returns {Promise<Object>} - Response data
 */
export const forgotPassword = async (email) => {
  try {
    return await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  } catch (error) {
    console.error('Password recovery request failed:', error);
    throw error;
  }
};

/**
 * Resets user password
 * @param {Object} resetData - Password reset data (token, new password)
 * @returns {Promise<Object>} - Response data
 */
export const resetPassword = async (resetData) => {
  try {
    return await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, resetData);
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
};

/**
 * Verifies user email
 * @param {string} token - Email verification token
 * @returns {Promise<Object>} - Response data
 */
export const verifyEmail = async (token) => {
  try {
    return await api.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token });
  } catch (error) {
    console.error('Email verification failed:', error);
    throw error;
  }
};

/**
 * Updates user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user data
 */
export const updateProfile = async (userData) => {
  try {
    return await api.put('/users/profile', userData);
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
};

// For development/demo purposes - simulates authentication without a backend
export const simulateAuth = {
  login: (credentials) => {
    const { email, password } = credentials;
    
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Create a mock token
    const token = `mock_token_${Date.now()}`;
    localStorage.setItem('authToken', token);
    
    // Create a mock user
    const user = {
      userId: Date.now().toString(),
      username: email.split('@')[0],
      email,
      interests: [],
      bio: '',
      profilePictureUrl: '',
      createdAt: new Date(),
      subscription: 'basic' // Default to basic tier
    };
    
    // Store user in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return { user, token };
  },
  
  register: (userData) => {
    const { username, email, password, interests } = userData;
    
    // Simple validation
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }
    
    // Create a mock token
    const token = `mock_token_${Date.now()}`;
    localStorage.setItem('authToken', token);
    
    // Create a mock user
    const user = {
      userId: Date.now().toString(),
      username,
      email,
      interests: interests || [],
      bio: '',
      profilePictureUrl: '',
      createdAt: new Date(),
      subscription: 'basic' // Default to basic tier
    };
    
    // Store user in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return { user, token };
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },
  
  getCurrentUser: () => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Failed to parse current user from localStorage:', error);
      return null;
    }
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
  
  updateProfile: (userData) => {
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) throw new Error('User not authenticated');
    
    try {
      const currentUser = JSON.parse(currentUserJson);
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }
};

const authService = {
  register,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateProfile,
  simulateAuth
};

export default authService;

