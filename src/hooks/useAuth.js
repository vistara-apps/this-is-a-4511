import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Custom hook for authentication functionality
 * Provides access to authentication state and methods
 * @returns {Object} Authentication state and methods
 */
const useAuth = () => {
  const auth = useAuthContext();
  return auth;
};

export default useAuth;

