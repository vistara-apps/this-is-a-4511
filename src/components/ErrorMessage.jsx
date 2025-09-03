import React from 'react';
import { AlertTriangle, XCircle, Info, CheckCircle, X } from 'lucide-react';

/**
 * Error message component with different variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Variant of the error message (error, warning, info, success)
 * @param {string} props.title - Title of the error message
 * @param {string} props.message - Error message content
 * @param {Function} props.onDismiss - Function to call when the error message is dismissed
 * @param {boolean} props.dismissible - Whether the error message can be dismissed
 * @returns {JSX.Element} Error message component
 */
const ErrorMessage = ({ 
  variant = 'error', 
  title, 
  message, 
  onDismiss, 
  dismissible = true 
}) => {
  // Variant classes
  const variantClasses = {
    error: {
      container: 'bg-red-50 border-red-200 text-red-700',
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      title: 'text-red-800',
      message: 'text-red-600',
      button: 'text-red-500 hover:bg-red-100'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      title: 'text-yellow-800',
      message: 'text-yellow-600',
      button: 'text-yellow-500 hover:bg-yellow-100'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-700',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: 'text-blue-800',
      message: 'text-blue-600',
      button: 'text-blue-500 hover:bg-blue-100'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-700',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: 'text-green-800',
      message: 'text-green-600',
      button: 'text-green-500 hover:bg-green-100'
    }
  };

  // Get classes for the current variant
  const classes = variantClasses[variant] || variantClasses.error;

  return (
    <div className={`p-4 rounded-lg border ${classes.container} relative`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {classes.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${classes.title} mb-1`}>
              {title}
            </h3>
          )}
          {message && (
            <div className={`text-sm ${classes.message}`}>
              {typeof message === 'string' ? message : JSON.stringify(message)}
            </div>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center ${classes.button}`}
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

