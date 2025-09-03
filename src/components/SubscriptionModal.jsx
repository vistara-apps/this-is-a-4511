import React, { useState } from 'react';
import { X, Check, CreditCard, Shield, Star } from 'lucide-react';
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_FEATURES } from '../services/subscriptionService';
import useSubscription from '../hooks/useSubscription';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

/**
 * Subscription modal component for managing user subscriptions
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @returns {JSX.Element} Subscription modal component
 */
const SubscriptionModal = ({ onClose }) => {
  const { subscription, updateSubscription, isLoading, error } = useSubscription();
  const [selectedTier, setSelectedTier] = useState(subscription?.tier || SUBSCRIPTION_TIERS.BASIC);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  // Handle tier selection
  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
  };

  // Handle payment form submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (selectedTier === SUBSCRIPTION_TIERS.BASIC) {
      // Free tier doesn't need payment
      handleSubscriptionUpdate();
      return;
    }
    
    if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      setPaymentError('Please fill in all payment details');
      return;
    }
    
    try {
      setProcessingPayment(true);
      setPaymentError(null);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update subscription
      await handleSubscriptionUpdate();
      
      setSubscriptionSuccess(true);
    } catch (err) {
      console.error('Payment processing failed:', err);
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  // Handle subscription update
  const handleSubscriptionUpdate = async () => {
    try {
      await updateSubscription(selectedTier);
    } catch (err) {
      console.error('Subscription update failed:', err);
      setPaymentError('Failed to update subscription. Please try again.');
      throw err;
    }
  };

  // Handle continue to payment
  const handleContinueToPayment = () => {
    if (selectedTier === SUBSCRIPTION_TIERS.BASIC) {
      // Free tier doesn't need payment
      handleSubscriptionUpdate();
      setSubscriptionSuccess(true);
      return;
    }
    
    setPaymentStep(true);
  };

  // Handle back to plan selection
  const handleBackToPlanSelection = () => {
    setPaymentStep(false);
    setPaymentError(null);
  };

  // Render subscription success
  if (subscriptionSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Subscription Updated!</h2>
            <p className="text-gray-600 mb-6">
              {selectedTier === SUBSCRIPTION_TIERS.BASIC
                ? 'You are now on the Basic plan. You can upgrade anytime.'
                : `You are now subscribed to the ${SUBSCRIPTION_FEATURES[selectedTier].name} plan. Enjoy your new features!`
              }
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render payment form
  if (paymentStep) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {SUBSCRIPTION_FEATURES[selectedTier].name} Plan
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {SUBSCRIPTION_FEATURES[selectedTier].description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${SUBSCRIPTION_FEATURES[selectedTier].price}
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </p>
                  <button
                    onClick={handleBackToPlanSelection}
                    className="text-sm text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              {paymentError && (
                <ErrorMessage
                  variant="error"
                  message={paymentError}
                  onDismiss={() => setPaymentError(null)}
                />
              )}
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={paymentDetails.cardName}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-600 mb-6">
                <Shield className="w-4 h-4 mr-2 text-gray-500" />
                Your payment information is secure and encrypted
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleBackToPlanSelection}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={processingPayment}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <LoadingIndicator variant="spinner" size="sm" color="white" text="" />
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay ${SUBSCRIPTION_FEATURES[selectedTier].price}/month
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render plan selection
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Choose Your Plan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <ErrorMessage
              variant="error"
              message={error}
              className="mb-6"
            />
          )}

          {isLoading ? (
            <div className="py-12">
              <LoadingIndicator text="Loading subscription plans..." />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Basic Plan */}
                <div 
                  className={`border rounded-xl p-6 ${
                    selectedTier === SUBSCRIPTION_TIERS.BASIC 
                      ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                      : 'border-gray-200 hover:border-primary'
                  } transition-all cursor-pointer`}
                  onClick={() => handleSelectTier(SUBSCRIPTION_TIERS.BASIC)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Basic</h3>
                      <p className="text-gray-600">Free</p>
                    </div>
                    {selectedTier === SUBSCRIPTION_TIERS.BASIC && (
                      <div className="bg-primary text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.BASIC].description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.BASIC].features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.BASIC].limitations.length > 0 && (
                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <p className="text-xs text-gray-500 font-medium mb-2">Limitations:</p>
                      <ul className="space-y-1">
                        {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.BASIC].limitations.map((limitation, index) => (
                          <li key={index} className="text-xs text-gray-500 flex items-start">
                            <span className="text-gray-400 mr-1">•</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Pro Plan */}
                <div 
                  className={`border rounded-xl p-6 ${
                    selectedTier === SUBSCRIPTION_TIERS.PRO 
                      ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                      : 'border-gray-200 hover:border-primary'
                  } transition-all cursor-pointer`}
                  onClick={() => handleSelectTier(SUBSCRIPTION_TIERS.PRO)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
                      <p className="text-gray-600">
                        <span className="text-lg font-medium">${SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.PRO].price}</span>
                        <span className="text-sm">/month</span>
                      </p>
                    </div>
                    {selectedTier === SUBSCRIPTION_TIERS.PRO && (
                      <div className="bg-primary text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.PRO].description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.PRO].features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.PRO].limitations.length > 0 && (
                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <p className="text-xs text-gray-500 font-medium mb-2">Limitations:</p>
                      <ul className="space-y-1">
                        {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.PRO].limitations.map((limitation, index) => (
                          <li key={index} className="text-xs text-gray-500 flex items-start">
                            <span className="text-gray-400 mr-1">•</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Guild Plan */}
                <div 
                  className={`border rounded-xl p-6 ${
                    selectedTier === SUBSCRIPTION_TIERS.GUILD 
                      ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                      : 'border-gray-200 hover:border-primary'
                  } transition-all cursor-pointer relative overflow-hidden`}
                  onClick={() => handleSelectTier(SUBSCRIPTION_TIERS.GUILD)}
                >
                  <div className="absolute -right-8 -top-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-1 px-10 transform rotate-45 text-xs font-medium">
                    Popular
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Guild</h3>
                      <p className="text-gray-600">
                        <span className="text-lg font-medium">${SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.GUILD].price}</span>
                        <span className="text-sm">/month</span>
                      </p>
                    </div>
                    {selectedTier === SUBSCRIPTION_TIERS.GUILD && (
                      <div className="bg-primary text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.GUILD].description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.GUILD].features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContinueToPayment}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  {selectedTier === subscription?.tier ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Confirm Selection
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Continue
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;

