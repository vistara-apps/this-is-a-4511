import React, { useState } from 'react';
import { CreditCard, Star, Shield, Check, ArrowRight, Zap } from 'lucide-react';
import useSubscription from '../hooks/useSubscription';
import useAuth from '../hooks/useAuth';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import SubscriptionModal from '../components/SubscriptionModal';

/**
 * Subscription page component for managing user subscriptions
 * @returns {JSX.Element} Subscription page component
 */
const Subscription = () => {
  const { subscription, plans, isLoading, error } = useSubscription();
  const { currentUser, isAuthenticated } = useAuth();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Handle upgrade button click
  const handleUpgradeClick = () => {
    setShowSubscriptionModal(true);
  };

  // If loading, show loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingIndicator text="Loading subscription information..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Subscription</h1>
            <p className="text-white/70">Manage your subscription and billing information</p>
          </div>
          <button
            onClick={handleUpgradeClick}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Star className="w-4 h-4 mr-2" />
            {subscription?.tier === 'basic' ? 'Upgrade Plan' : 'Manage Subscription'}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <ErrorMessage
          variant="error"
          title="Subscription Error"
          message={error}
        />
      )}

      {/* Current subscription */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4">Current Plan</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">
                  {subscription?.tier === 'basic' ? 'Basic Plan' : 
                   subscription?.tier === 'pro' ? 'Pro Plan' : 'Guild Plan'}
                </h3>
                <p className="text-white/70 text-sm">
                  {subscription?.tier === 'basic' ? 'Free' : 
                   subscription?.tier === 'pro' ? '$5/month' : '$15/month'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            {subscription?.active && subscription?.renewalDate && subscription?.tier !== 'basic' && (
              <p className="text-white/70 text-sm">
                Next billing date: {new Date(subscription.renewalDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-white font-medium mb-3">Features Included:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {subscription?.features?.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
              <span className="text-white/80">{feature}</span>
            </div>
          ))}
        </div>

        {subscription?.tier === 'basic' && (
          <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-start">
              <Zap className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <h4 className="text-white font-medium mb-1">Upgrade to unlock premium features</h4>
                <p className="text-white/70 text-sm mb-3">
                  Get access to advanced AI tools, unlimited communities, and exclusive networking opportunities.
                </p>
                <button
                  onClick={handleUpgradeClick}
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                >
                  View upgrade options
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment information (only for paid plans) */}
      {subscription?.tier !== 'basic' && (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Payment Information</h2>
          
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Visa ending in 4242</h3>
                <p className="text-white/70 text-sm">Expires 12/25</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-white/70 mb-4">
            <Shield className="w-4 h-4 mr-2 text-white/50" />
            Your payment information is secure and encrypted
          </div>
          
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              Update Payment Method
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              View Billing History
            </button>
          </div>
        </div>
      )}

      {/* Subscription modal */}
      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </div>
  );
};

export default Subscription;

