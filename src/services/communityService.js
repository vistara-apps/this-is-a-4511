/**
 * Community service for handling community-related operations
 * This service provides methods for creating, retrieving, updating, and deleting communities
 */

import api from './api';

// Community endpoints
const COMMUNITY_ENDPOINTS = {
  GET_ALL: '/communities',
  GET_BY_ID: (id) => `/communities/${id}`,
  CREATE: '/communities',
  UPDATE: (id) => `/communities/${id}`,
  DELETE: (id) => `/communities/${id}`,
  JOIN: (id) => `/communities/${id}/join`,
  LEAVE: (id) => `/communities/${id}/leave`,
  GET_MEMBERS: (id) => `/communities/${id}/members`,
  GET_POSTS: (id) => `/communities/${id}/posts`,
  CREATE_POST: (id) => `/communities/${id}/posts`,
  SEARCH: '/communities/search',
  GET_BY_TOPIC: (topic) => `/communities/topic/${topic}`,
  GET_TRENDING: '/communities/trending',
  GET_RECOMMENDED: '/communities/recommended',
};

/**
 * Gets all communities
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of communities
 */
export const getAllCommunities = async (params = {}) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.GET_ALL, { params });
  } catch (error) {
    console.error('Failed to get communities:', error);
    throw error;
  }
};

/**
 * Gets a community by ID
 * @param {string} id - Community ID
 * @returns {Promise<Object>} - Community data
 */
export const getCommunityById = async (id) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.GET_BY_ID(id));
  } catch (error) {
    console.error(`Failed to get community with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new community
 * @param {Object} communityData - Community data (name, description, topic)
 * @returns {Promise<Object>} - Created community data
 */
export const createCommunity = async (communityData) => {
  try {
    return await api.post(COMMUNITY_ENDPOINTS.CREATE, communityData);
  } catch (error) {
    console.error('Failed to create community:', error);
    throw error;
  }
};

/**
 * Updates a community
 * @param {string} id - Community ID
 * @param {Object} communityData - Updated community data
 * @returns {Promise<Object>} - Updated community data
 */
export const updateCommunity = async (id, communityData) => {
  try {
    return await api.put(COMMUNITY_ENDPOINTS.UPDATE(id), communityData);
  } catch (error) {
    console.error(`Failed to update community with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a community
 * @param {string} id - Community ID
 * @returns {Promise<void>}
 */
export const deleteCommunity = async (id) => {
  try {
    return await api.delete(COMMUNITY_ENDPOINTS.DELETE(id));
  } catch (error) {
    console.error(`Failed to delete community with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Joins a community
 * @param {string} id - Community ID
 * @returns {Promise<Object>} - Updated community data
 */
export const joinCommunity = async (id) => {
  try {
    return await api.post(COMMUNITY_ENDPOINTS.JOIN(id));
  } catch (error) {
    console.error(`Failed to join community with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Leaves a community
 * @param {string} id - Community ID
 * @returns {Promise<Object>} - Updated community data
 */
export const leaveCommunity = async (id) => {
  try {
    return await api.post(COMMUNITY_ENDPOINTS.LEAVE(id));
  } catch (error) {
    console.error(`Failed to leave community with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Gets community members
 * @param {string} id - Community ID
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of community members
 */
export const getCommunityMembers = async (id, params = {}) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.GET_MEMBERS(id), { params });
  } catch (error) {
    console.error(`Failed to get members for community with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Gets community posts
 * @param {string} id - Community ID
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of community posts
 */
export const getCommunityPosts = async (id, params = {}) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.GET_POSTS(id), { params });
  } catch (error) {
    console.error(`Failed to get posts for community with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a post in a community
 * @param {string} communityId - Community ID
 * @param {Object} postData - Post data (title, content)
 * @returns {Promise<Object>} - Created post data
 */
export const createCommunityPost = async (communityId, postData) => {
  try {
    return await api.post(COMMUNITY_ENDPOINTS.CREATE_POST(communityId), postData);
  } catch (error) {
    console.error(`Failed to create post in community with ID ${communityId}:`, error);
    throw error;
  }
};

/**
 * Searches communities
 * @param {string} query - Search query
 * @param {Object} params - Additional query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of matching communities
 */
export const searchCommunities = async (query, params = {}) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.SEARCH, { 
      params: { query, ...params } 
    });
  } catch (error) {
    console.error(`Failed to search communities with query "${query}":`, error);
    throw error;
  }
};

/**
 * Gets communities by topic
 * @param {string} topic - Topic name
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of communities with the specified topic
 */
export const getCommunitiesByTopic = async (topic, params = {}) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.GET_BY_TOPIC(topic), { params });
  } catch (error) {
    console.error(`Failed to get communities with topic "${topic}":`, error);
    throw error;
  }
};

/**
 * Gets trending communities
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of trending communities
 */
export const getTrendingCommunities = async (params = {}) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.GET_TRENDING, { params });
  } catch (error) {
    console.error('Failed to get trending communities:', error);
    throw error;
  }
};

/**
 * Gets recommended communities for the current user
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of recommended communities
 */
export const getRecommendedCommunities = async (params = {}) => {
  try {
    return await api.get(COMMUNITY_ENDPOINTS.GET_RECOMMENDED, { params });
  } catch (error) {
    console.error('Failed to get recommended communities:', error);
    throw error;
  }
};

// For development/demo purposes - simulates community operations without a backend
export const simulateCommunity = {
  // Get all communities from localStorage or return sample data
  getAllCommunities: () => {
    try {
      const communitiesJson = localStorage.getItem('communities');
      if (communitiesJson) {
        return JSON.parse(communitiesJson);
      }
      
      // Return sample data if no communities in localStorage
      const sampleCommunities = [
        {
          communityId: '1',
          name: 'AI in Healthcare',
          description: 'Exploring the intersection of artificial intelligence and healthcare innovation',
          topic: 'AI',
          createdAt: new Date().toISOString(),
          ownerUserId: '1',
          memberCount: 245
        },
        {
          communityId: '2',
          name: 'FinTech for Gen Z',
          description: 'Building financial solutions for the next generation',
          topic: 'FinTech',
          createdAt: new Date().toISOString(),
          ownerUserId: '2',
          memberCount: 189
        },
        {
          communityId: '3',
          name: 'EdTech Innovations',
          description: 'Revolutionizing education through technology',
          topic: 'EdTech',
          createdAt: new Date().toISOString(),
          ownerUserId: '3',
          memberCount: 312
        }
      ];
      
      localStorage.setItem('communities', JSON.stringify(sampleCommunities));
      return sampleCommunities;
    } catch (error) {
      console.error('Failed to get communities from localStorage:', error);
      return [];
    }
  },
  
  // Get a community by ID
  getCommunityById: (id) => {
    try {
      const communitiesJson = localStorage.getItem('communities');
      if (!communitiesJson) return null;
      
      const communities = JSON.parse(communitiesJson);
      return communities.find(community => community.communityId === id) || null;
    } catch (error) {
      console.error(`Failed to get community with ID ${id} from localStorage:`, error);
      return null;
    }
  },
  
  // Create a new community
  createCommunity: (communityData) => {
    try {
      const communitiesJson = localStorage.getItem('communities');
      const communities = communitiesJson ? JSON.parse(communitiesJson) : [];
      
      const newCommunity = {
        ...communityData,
        communityId: Date.now().toString(),
        createdAt: new Date().toISOString(),
        memberCount: 1
      };
      
      const updatedCommunities = [newCommunity, ...communities];
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      
      return newCommunity;
    } catch (error) {
      console.error('Failed to create community in localStorage:', error);
      throw error;
    }
  },
  
  // Join a community
  joinCommunity: (id) => {
    try {
      const communitiesJson = localStorage.getItem('communities');
      if (!communitiesJson) throw new Error('No communities found');
      
      const communities = JSON.parse(communitiesJson);
      const updatedCommunities = communities.map(community => 
        community.communityId === id 
          ? { ...community, memberCount: community.memberCount + 1 }
          : community
      );
      
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      return updatedCommunities.find(community => community.communityId === id);
    } catch (error) {
      console.error(`Failed to join community with ID ${id} in localStorage:`, error);
      throw error;
    }
  },
  
  // Search communities
  searchCommunities: (query) => {
    try {
      const communitiesJson = localStorage.getItem('communities');
      if (!communitiesJson) return [];
      
      const communities = JSON.parse(communitiesJson);
      return communities.filter(community => 
        community.name.toLowerCase().includes(query.toLowerCase()) ||
        community.description.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error(`Failed to search communities with query "${query}" in localStorage:`, error);
      return [];
    }
  },
  
  // Get communities by topic
  getCommunitiesByTopic: (topic) => {
    try {
      const communitiesJson = localStorage.getItem('communities');
      if (!communitiesJson) return [];
      
      const communities = JSON.parse(communitiesJson);
      return communities.filter(community => 
        community.topic.toLowerCase() === topic.toLowerCase()
      );
    } catch (error) {
      console.error(`Failed to get communities with topic "${topic}" from localStorage:`, error);
      return [];
    }
  }
};

const communityService = {
  getAllCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
  getCommunityMembers,
  getCommunityPosts,
  createCommunityPost,
  searchCommunities,
  getCommunitiesByTopic,
  getTrendingCommunities,
  getRecommendedCommunities,
  simulateCommunity
};

export default communityService;

