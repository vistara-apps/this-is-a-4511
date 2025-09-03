/**
 * Base API service for handling HTTP requests
 * This service provides a foundation for all API calls in the application
 */

// Base API URL - would be replaced with actual backend URL in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.nicheconnect.example';

/**
 * Handles API requests with proper error handling
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Request options (method, headers, body)
 * @returns {Promise<any>} - Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare request options
    const requestOptions = {
      method: options.method || 'GET',
      headers,
      ...options,
    };

    // Convert body to JSON string if it exists and is not already a string
    if (requestOptions.body && typeof requestOptions.body !== 'string') {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }

    // Make the request
    const response = await fetch(url, requestOptions);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
        message: errorData.message || `API error: ${response.status} ${response.statusText}`
      };
    }

    // Parse JSON response if content exists
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  post: (endpoint, data, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'POST', body: data }),

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  put: (endpoint, data, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'PUT', body: data }),

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  patch: (endpoint, data, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'PATCH', body: data }),

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Additional request options
   * @returns {Promise<any>} - Response data
   */
  delete: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

export default api;

