import React, { Component } from 'react';

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the entire application
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Update state when an error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Log error details
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  // Reset error state
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;
    
    // If there's an error, render the fallback UI or the default error UI
    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return typeof fallback === 'function' 
          ? fallback({ error, errorInfo, reset: this.handleReset })
          : fallback;
      }
      
      // Default error UI
      return (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-4">
            We're sorry, but an error occurred while rendering this component.
          </p>
          {process.env.NODE_ENV !== 'production' && error && (
            <div className="mb-4 text-left">
              <p className="font-medium text-red-700 mb-1">Error details:</p>
              <pre className="bg-red-100 p-3 rounded text-sm text-red-800 overflow-auto max-h-40">
                {error.toString()}
                {errorInfo && errorInfo.componentStack}
              </pre>
            </div>
          )}
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    
    // If there's no error, render the children
    return children;
  }
}

export default ErrorBoundary;

