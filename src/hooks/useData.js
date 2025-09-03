import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching with loading, error, and caching
 * @param {Function} fetchFunction - Function to fetch data
 * @param {Array} dependencies - Dependencies for useEffect
 * @param {Object} options - Additional options (initialData, cacheKey, cacheDuration)
 * @returns {Object} Data, loading state, error, and refetch function
 */
const useData = (fetchFunction, dependencies = [], options = {}) => {
  const { 
    initialData = null, 
    cacheKey = null, 
    cacheDuration = 5 * 60 * 1000 // 5 minutes default cache duration
  } = options;
  
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  // Check if data is in cache
  const getCachedData = useCallback(() => {
    if (!cacheKey) return null;
    
    try {
      const cachedItem = localStorage.getItem(`cache_${cacheKey}`);
      if (!cachedItem) return null;
      
      const { data: cachedData, timestamp } = JSON.parse(cachedItem);
      const isExpired = Date.now() - timestamp > cacheDuration;
      
      if (isExpired) {
        localStorage.removeItem(`cache_${cacheKey}`);
        return null;
      }
      
      return cachedData;
    } catch (error) {
      console.error('Failed to get cached data:', error);
      return null;
    }
  }, [cacheKey, cacheDuration]);

  // Cache data
  const cacheData = useCallback((data) => {
    if (!cacheKey) return;
    
    try {
      const cacheItem = {
        data,
        timestamp: Date.now()
      };
      
      localStorage.setItem(`cache_${cacheKey}`, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Failed to cache data:', error);
    }
  }, [cacheKey]);

  // Fetch data
  const fetchData = useCallback(async () => {
    // Check if we have cached data
    const cachedData = getCachedData();
    if (cachedData) {
      setData(cachedData);
      setIsLoading(false);
      setLastFetched(Date.now());
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
      cacheData(result);
      setLastFetched(Date.now());
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError(err.message || 'Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, getCachedData, cacheData]);

  // Refetch data
  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
      cacheData(result);
      setLastFetched(Date.now());
      return result;
    } catch (err) {
      console.error('Failed to refetch data:', err);
      setError(err.message || 'Failed to fetch data. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, cacheData]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);

  return { data, isLoading, error, refetch, lastFetched };
};

export default useData;

