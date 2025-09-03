/**
 * Subscription service for handling subscription-related operations
 * This service provides methods for managing user subscriptions, payments, and feature access
 */

import api from './api';

// Subscription endpoints
const SUBSCRIPTION_ENDPOINTS = {
  GET_PLANS: '/subscriptions/plans',
  GET_CURRENT: '/subscriptions/current',
  SUBSCRIBE: '/subscriptions/subscribe',
  CANCEL: '/subscriptions/cancel',
  UPDATE: '/subscriptions/update',
  GET_INVOICES: '/subscriptions/invoices',
  GET_PAYMENT_METHODS: '/subscriptions/payment-methods',
  ADD_PAYMENT_METHOD: '/subscriptions/payment-methods',
  REMOVE_PAYMENT_METHOD: (id) => `/subscriptions/payment-methods/${id}`,
};

// Subscription tiers and their features
export const SUBSCRIPTION_TIERS = {
  BASIC: 'basic',
  PRO: 'pro',
  GUILD: 'guild'
};

// Features available in each subscription tier
export const SUBSCRIPTION_FEATURES = {
  [SUBSCRIPTION_TIERS.BASIC]: {
    name: 'Basic',
    price: 0,
    description: 'Free access to core features',
    features: [
      'Join up to 5 communities',
      'Create 1 community',
      'Basic AI idea generation (3 per day)',
      'Standard collaboration finder'
    ],
    limitations: [
      'Limited AI tools',
      'No advanced analytics',
      'No priority access to events'
    ]
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    name: 'Pro',
    price: 5,
    description: 'Enhanced features for serious students',
    features: [
      'Join unlimited communities',
      'Create up to 3 communities',
      'Advanced AI tools (unlimited ideas)',
      'Enhanced collaboration finder',
      'Priority support',
      'Community analytics'
    ],
    limitations: [
      'No mastermind access',
      'Limited co-founder matching'
    ]
  },
  [SUBSCRIPTION_TIERS.GUILD]: {
    name: 'Guild',
    price: 15,
    description: 'Premium features for startup founders',
    features: [
      'All Pro features',
      'Create unlimited communities',
      'Premium AI tools with business plan generation',
      'Exclusive mastermind groups',
      'Advanced co-founder matching',
      'Investor network access',
      'Personalized startup mentoring'
    ],
    limitations: []
  }
};

/**
 * Gets available subscription plans
 * @returns {Promise<Array>} - List of subscription plans
 */
export const getSubscriptionPlans = async () => {
  try {
    return await api.get(SUBSCRIPTION_ENDPOINTS.GET_PLANS);
  } catch (error) {
    console.error('Failed to get subscription plans:', error);
    throw error;
  }
};

/**
 * Gets the current user's subscription
 * @returns {Promise<Object>} - Current subscription data
 */
export const getCurrentSubscription = async () => {
  try {
    return await api.get(SUBSCRIPTION_ENDPOINTS.GET_CURRENT);
  } catch (error) {
    console.error('Failed to get current subscription:', error);
    throw error;
  }
};

/**
 * Subscribes to a plan
 * @param {Object} subscriptionData - Subscription data (planId, paymentMethodId)
 * @returns {Promise<Object>} - New subscription data
 */
export const subscribe = async (subscriptionData) => {
  try {
    return await api.post(SUBSCRIPTION_ENDPOINTS.SUBSCRIBE, subscriptionData);
  } catch (error) {
    console.error('Failed to subscribe:', error);
    throw error;
  }
};

/**
 * Cancels the current subscription
 * @param {Object} cancellationData - Cancellation data (reason, feedback)
 * @returns {Promise<Object>} - Cancellation confirmation
 */
export const cancelSubscription = async (cancellationData = {}) => {
  try {
    return await api.post(SUBSCRIPTION_ENDPOINTS.CANCEL, cancellationData);
  } catch (error) {
    console.error('Failed to cancel subscription:', error);
    throw error;
  }
};

/**
 * Updates the current subscription
 * @param {Object} updateData - Update data (planId, etc.)
 * @returns {Promise<Object>} - Updated subscription data
 */
export const updateSubscription = async (updateData) => {
  try {
    return await api.put(SUBSCRIPTION_ENDPOINTS.UPDATE, updateData);
  } catch (error) {
    console.error('Failed to update subscription:', error);
    throw error;
  }
};

/**
 * Gets the user's invoices
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of invoices
 */
export const getInvoices = async (params = {}) => {
  try {
    return await api.get(SUBSCRIPTION_ENDPOINTS.GET_INVOICES, { params });
  } catch (error) {
    console.error('Failed to get invoices:', error);
    throw error;
  }
};

/**
 * Gets the user's payment methods
 * @returns {Promise<Array>} - List of payment methods
 */
export const getPaymentMethods = async () => {
  try {
    return await api.get(SUBSCRIPTION_ENDPOINTS.GET_PAYMENT_METHODS);
  } catch (error) {
    console.error('Failed to get payment methods:', error);
    throw error;
  }
};

/**
 * Adds a payment method
 * @param {Object} paymentMethodData - Payment method data
 * @returns {Promise<Object>} - Added payment method data
 */
export const addPaymentMethod = async (paymentMethodData) => {
  try {
    return await api.post(SUBSCRIPTION_ENDPOINTS.ADD_PAYMENT_METHOD, paymentMethodData);
  } catch (error) {
    console.error('Failed to add payment method:', error);
    throw error;
  }
};

/**
 * Removes a payment method
 * @param {string} id - Payment method ID
 * @returns {Promise<void>}
 */
export const removePaymentMethod = async (id) => {
  try {
    return await api.delete(SUBSCRIPTION_ENDPOINTS.REMOVE_PAYMENT_METHOD(id));
  } catch (error) {
    console.error(`Failed to remove payment method with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Checks if a feature is available in the user's subscription tier
 * @param {string} feature - Feature to check
 * @param {string} userTier - User's subscription tier
 * @returns {boolean} - True if the feature is available
 */
export const hasFeatureAccess = (feature, userTier = SUBSCRIPTION_TIERS.BASIC) => {
  // Define feature access by tier
  const featureAccess = {
    // Community features
    'create_community': [SUBSCRIPTION_TIERS.BASIC, SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.GUILD],
    'unlimited_communities': [SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.GUILD],
    'community_analytics': [SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.GUILD],
    
    // AI features
    'basic_ai': [SUBSCRIPTION_TIERS.BASIC, SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.GUILD],
    'advanced_ai': [SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.GUILD],
    'business_plan_generation': [SUBSCRIPTION_TIERS.GUILD],
    
    // Collaboration features
    'basic_collaboration': [SUBSCRIPTION_TIERS.BASIC, SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.GUILD],
    'enhanced_collaboration': [SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.GUILD],
    'cofounder_matching': [SUBSCRIPTION_TIERS.GUILD],
    
    // Exclusive features
    'mastermind_access': [SUBSCRIPTION_TIERS.GUILD],
    'investor_network': [SUBSCRIPTION_TIERS.GUILD],
    'startup_mentoring': [SUBSCRIPTION_TIERS.GUILD]
  };
  
  // Check if the feature exists and if the user's tier has access
  return featureAccess[feature]?.includes(userTier) || false;
};

/**
 * Gets the community creation limit for a subscription tier
 * @param {string} tier - Subscription tier
 * @returns {number} - Number of communities the user can create
 */
export const getCommunityCreationLimit = (tier = SUBSCRIPTION_TIERS.BASIC) => {
  const limits = {
    [SUBSCRIPTION_TIERS.BASIC]: 1,
    [SUBSCRIPTION_TIERS.PRO]: 3,
    [SUBSCRIPTION_TIERS.GUILD]: Infinity
  };
  
  return limits[tier] || 0;
};

/**
 * Gets the AI idea generation limit for a subscription tier
 * @param {string} tier - Subscription tier
 * @returns {number} - Number of AI ideas the user can generate per day
 */
export const getAIGenerationLimit = (tier = SUBSCRIPTION_TIERS.BASIC) => {
  const limits = {
    [SUBSCRIPTION_TIERS.BASIC]: 3,
    [SUBSCRIPTION_TIERS.PRO]: Infinity,
    [SUBSCRIPTION_TIERS.GUILD]: Infinity
  };
  
  return limits[tier] || 0;
};

// For development/demo purposes - simulates subscription operations without a backend
export const simulateSubscription = {
  // Get the current user's subscription from localStorage
  getCurrentSubscription: () => {
    try {
      const currentUserJson = localStorage.getItem('currentUser');
      if (!currentUserJson) return { tier: SUBSCRIPTION_TIERS.BASIC };
      
      const currentUser = JSON.parse(currentUserJson);
      return { 
        tier: currentUser.subscription || SUBSCRIPTION_TIERS.BASIC,
        active: true,
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        features: SUBSCRIPTION_FEATURES[currentUser.subscription || SUBSCRIPTION_TIERS.BASIC].features
      };
    } catch (error) {
      console.error('Failed to get current subscription from localStorage:', error);
      return { tier: SUBSCRIPTION_TIERS.BASIC };
    }
  },
  
  // Update the user's subscription
  updateSubscription: (tier) => {
    try {
      const currentUserJson = localStorage.getItem('currentUser');
      if (!currentUserJson) throw new Error('User not authenticated');
      
      const currentUser = JSON.parse(currentUserJson);
      const updatedUser = { ...currentUser, subscription: tier };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      return { 
        tier,
        active: true,
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        features: SUBSCRIPTION_FEATURES[tier].features
      };
    } catch (error) {
      console.error('Failed to update subscription in localStorage:', error);
      throw error;
    }
  },
  
  // Get all subscription plans
  getSubscriptionPlans: () => {
    return Object.entries(SUBSCRIPTION_FEATURES).map(([tier, details]) => ({
      id: tier,
      name: details.name,
      price: details.price,
      description: details.description,
      features: details.features,
      limitations: details.limitations
    }));
  },
  
  // Check if a feature is available in the user's subscription tier
  hasFeatureAccess: (feature) => {
    try {
      const currentUserJson = localStorage.getItem('currentUser');
      if (!currentUserJson) return hasFeatureAccess(feature, SUBSCRIPTION_TIERS.BASIC);
      
      const currentUser = JSON.parse(currentUserJson);
      return hasFeatureAccess(feature, currentUser.subscription || SUBSCRIPTION_TIERS.BASIC);
    } catch (error) {
      console.error(`Failed to check feature access for "${feature}" in localStorage:`, error);
      return hasFeatureAccess(feature, SUBSCRIPTION_TIERS.BASIC);
    }
  }
};

const subscriptionService = {
  getSubscriptionPlans,
  getCurrentSubscription,
  subscribe,
  cancelSubscription,
  updateSubscription,
  getInvoices,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  hasFeatureAccess,
  getCommunityCreationLimit,
  getAIGenerationLimit,
  SUBSCRIPTION_TIERS,
  SUBSCRIPTION_FEATURES,
  simulateSubscription
};

export default subscriptionService;

