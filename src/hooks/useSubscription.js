import { useState, useEffect, useCallback } from 'react';
import subscriptionService from '../services/subscriptionService';
import useAuth from './useAuth';

/**
 * Custom hook for subscription functionality
 * @returns {Object} Subscription state and methods
 */
const useSubscription = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize subscription
  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      setSubscription({ tier: subscriptionService.SUBSCRIPTION_TIERS.BASIC });
      return;
    }

    const initializeSubscription = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // For development/demo purposes, use the simulate method
        const subscriptionData = subscriptionService.simulateSubscription.getCurrentSubscription();
        setSubscription(subscriptionData);
        
        const plansData = subscriptionService.simulateSubscription.getSubscriptionPlans();
        setPlans(plansData);
      } catch (err) {
        console.error('Failed to initialize subscription:', err);
        setError('Failed to load subscription information. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeSubscription();
  }, [isAuthenticated, currentUser]);

  // Update subscription
  const updateSubscription = useCallback(async (tier) => {
    if (!isAuthenticated || !currentUser) {
      throw new Error('You must be logged in to update your subscription');
    }

    try {
      setIsLoading(true);
      setError(null);

      // For development/demo purposes, use the simulate method
      const updatedSubscription = subscriptionService.simulateSubscription.updateSubscription(tier);
      setSubscription(updatedSubscription);
      
      return updatedSubscription;
    } catch (err) {
      console.error('Failed to update subscription:', err);
      setError('Failed to update subscription. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, currentUser]);

  // Check if a feature is available in the current subscription
  const hasFeatureAccess = useCallback((feature) => {
    if (!subscription) return false;
    
    // For development/demo purposes, use the simulate method
    return subscriptionService.simulateSubscription.hasFeatureAccess(feature);
  }, [subscription]);

  // Get community creation limit for current subscription
  const getCommunityCreationLimit = useCallback(() => {
    if (!subscription) return 0;
    
    return subscriptionService.getCommunityCreationLimit(subscription.tier);
  }, [subscription]);

  // Get AI idea generation limit for current subscription
  const getAIGenerationLimit = useCallback(() => {
    if (!subscription) return 0;
    
    return subscriptionService.getAIGenerationLimit(subscription.tier);
  }, [subscription]);

  return {
    subscription,
    plans,
    isLoading,
    error,
    updateSubscription,
    hasFeatureAccess,
    getCommunityCreationLimit,
    getAIGenerationLimit
  };
};

export default useSubscription;

