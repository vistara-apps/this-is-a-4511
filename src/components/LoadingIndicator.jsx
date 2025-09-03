import React from 'react';

/**
 * Loading indicator component with different variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Variant of the loading indicator (spinner, dots, pulse, skeleton)
 * @param {string} props.size - Size of the loading indicator (sm, md, lg)
 * @param {string} props.color - Color of the loading indicator
 * @param {string} props.text - Text to display with the loading indicator
 * @param {boolean} props.fullScreen - Whether to display the loading indicator full screen
 * @returns {JSX.Element} Loading indicator component
 */
const LoadingIndicator = ({ 
  variant = 'spinner', 
  size = 'md', 
  color = 'primary',
  text = 'Loading...',
  fullScreen = false
}) => {
  // Size classes
  const sizeClasses = {
    sm: {
      spinner: 'w-4 h-4',
      dots: 'space-x-1',
      dot: 'w-1.5 h-1.5',
      pulse: 'w-6 h-6',
      skeleton: 'h-4'
    },
    md: {
      spinner: 'w-8 h-8',
      dots: 'space-x-2',
      dot: 'w-2.5 h-2.5',
      pulse: 'w-12 h-12',
      skeleton: 'h-6'
    },
    lg: {
      spinner: 'w-12 h-12',
      dots: 'space-x-3',
      dot: 'w-3.5 h-3.5',
      pulse: 'w-16 h-16',
      skeleton: 'h-8'
    }
  };

  // Color classes
  const colorClasses = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-400',
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500'
  };

  // Render spinner variant
  const renderSpinner = () => (
    <div className={`animate-spin ${sizeClasses[size].spinner} ${colorClasses[color]}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  // Render dots variant
  const renderDots = () => (
    <div className={`flex ${sizeClasses[size].dots}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size].dot} rounded-full ${colorClasses[color]} animate-pulse`}
          style={{ animationDelay: `${i * 0.15}s` }}
        ></div>
      ))}
    </div>
  );

  // Render pulse variant
  const renderPulse = () => (
    <div className={`${sizeClasses[size].pulse} ${colorClasses[color]} animate-pulse rounded-full border-2 border-current flex items-center justify-center`}>
      <div className="w-2/3 h-2/3 rounded-full border-2 border-current"></div>
    </div>
  );

  // Render skeleton variant
  const renderSkeleton = () => (
    <div className={`w-full ${sizeClasses[size].skeleton} bg-gray-200 animate-pulse rounded`}></div>
  );

  // Render loading indicator based on variant
  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  // If fullScreen, render in a full screen container
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        {renderLoadingIndicator()}
        {text && <p className="mt-4 text-white font-medium">{text}</p>}
      </div>
    );
  }

  // Otherwise, render inline
  return (
    <div className="flex flex-col items-center justify-center">
      {renderLoadingIndicator()}
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingIndicator;

