/**
 * Collaboration service for handling collaboration-related operations
 * This service provides methods for creating, retrieving, updating, and deleting collaboration opportunities
 */

import api from './api';

// Collaboration endpoints
const COLLABORATION_ENDPOINTS = {
  GET_ALL: '/collaborations',
  GET_BY_ID: (id) => `/collaborations/${id}`,
  CREATE: '/collaborations',
  UPDATE: (id) => `/collaborations/${id}`,
  DELETE: (id) => `/collaborations/${id}`,
  APPLY: (id) => `/collaborations/${id}/apply`,
  GET_APPLICATIONS: (id) => `/collaborations/${id}/applications`,
  SEARCH: '/collaborations/search',
  GET_BY_USER: (userId) => `/users/${userId}/collaborations`,
  GET_BY_SKILL: (skill) => `/collaborations/skills/${skill}`,
  GET_TRENDING: '/collaborations/trending',
  GET_RECOMMENDED: '/collaborations/recommended',
};

/**
 * Gets all collaboration opportunities
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of collaboration opportunities
 */
export const getAllCollaborations = async (params = {}) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.GET_ALL, { params });
  } catch (error) {
    console.error('Failed to get collaboration opportunities:', error);
    throw error;
  }
};

/**
 * Gets a collaboration opportunity by ID
 * @param {string} id - Collaboration opportunity ID
 * @returns {Promise<Object>} - Collaboration opportunity data
 */
export const getCollaborationById = async (id) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.GET_BY_ID(id));
  } catch (error) {
    console.error(`Failed to get collaboration opportunity with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new collaboration opportunity
 * @param {Object} collaborationData - Collaboration opportunity data (title, description, skillsRequired)
 * @returns {Promise<Object>} - Created collaboration opportunity data
 */
export const createCollaboration = async (collaborationData) => {
  try {
    return await api.post(COLLABORATION_ENDPOINTS.CREATE, collaborationData);
  } catch (error) {
    console.error('Failed to create collaboration opportunity:', error);
    throw error;
  }
};

/**
 * Updates a collaboration opportunity
 * @param {string} id - Collaboration opportunity ID
 * @param {Object} collaborationData - Updated collaboration opportunity data
 * @returns {Promise<Object>} - Updated collaboration opportunity data
 */
export const updateCollaboration = async (id, collaborationData) => {
  try {
    return await api.put(COLLABORATION_ENDPOINTS.UPDATE(id), collaborationData);
  } catch (error) {
    console.error(`Failed to update collaboration opportunity with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a collaboration opportunity
 * @param {string} id - Collaboration opportunity ID
 * @returns {Promise<void>}
 */
export const deleteCollaboration = async (id) => {
  try {
    return await api.delete(COLLABORATION_ENDPOINTS.DELETE(id));
  } catch (error) {
    console.error(`Failed to delete collaboration opportunity with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Applies to a collaboration opportunity
 * @param {string} id - Collaboration opportunity ID
 * @param {Object} applicationData - Application data (message, resume, etc.)
 * @returns {Promise<Object>} - Application data
 */
export const applyToCollaboration = async (id, applicationData = {}) => {
  try {
    return await api.post(COLLABORATION_ENDPOINTS.APPLY(id), applicationData);
  } catch (error) {
    console.error(`Failed to apply to collaboration opportunity with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Gets applications for a collaboration opportunity
 * @param {string} id - Collaboration opportunity ID
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of applications
 */
export const getCollaborationApplications = async (id, params = {}) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.GET_APPLICATIONS(id), { params });
  } catch (error) {
    console.error(`Failed to get applications for collaboration opportunity with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Searches collaboration opportunities
 * @param {string} query - Search query
 * @param {Object} params - Additional query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of matching collaboration opportunities
 */
export const searchCollaborations = async (query, params = {}) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.SEARCH, { 
      params: { query, ...params } 
    });
  } catch (error) {
    console.error(`Failed to search collaboration opportunities with query "${query}":`, error);
    throw error;
  }
};

/**
 * Gets collaboration opportunities by user
 * @param {string} userId - User ID
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of collaboration opportunities by the specified user
 */
export const getCollaborationsByUser = async (userId, params = {}) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.GET_BY_USER(userId), { params });
  } catch (error) {
    console.error(`Failed to get collaboration opportunities by user with ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Gets collaboration opportunities by skill
 * @param {string} skill - Skill name
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of collaboration opportunities requiring the specified skill
 */
export const getCollaborationsBySkill = async (skill, params = {}) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.GET_BY_SKILL(skill), { params });
  } catch (error) {
    console.error(`Failed to get collaboration opportunities with skill "${skill}":`, error);
    throw error;
  }
};

/**
 * Gets trending collaboration opportunities
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of trending collaboration opportunities
 */
export const getTrendingCollaborations = async (params = {}) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.GET_TRENDING, { params });
  } catch (error) {
    console.error('Failed to get trending collaboration opportunities:', error);
    throw error;
  }
};

/**
 * Gets recommended collaboration opportunities for the current user
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of recommended collaboration opportunities
 */
export const getRecommendedCollaborations = async (params = {}) => {
  try {
    return await api.get(COLLABORATION_ENDPOINTS.GET_RECOMMENDED, { params });
  } catch (error) {
    console.error('Failed to get recommended collaboration opportunities:', error);
    throw error;
  }
};

// For development/demo purposes - simulates collaboration operations without a backend
export const simulateCollaboration = {
  // Get all collaboration opportunities from localStorage or return sample data
  getAllCollaborations: () => {
    try {
      const collaborationsJson = localStorage.getItem('collaborations');
      if (collaborationsJson) {
        return JSON.parse(collaborationsJson);
      }
      
      // Return sample data if no collaborations in localStorage
      const sampleCollaborations = [
        {
          opportunityId: '1',
          creatorUserId: '1',
          creatorName: 'Alex Kim',
          title: 'Co-founder needed for EdTech startup',
          description: 'Building an AI-powered learning platform. Need someone with business development experience.',
          skillsRequired: ['Business Development', 'Marketing', 'Sales'],
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 7
        },
        {
          opportunityId: '2',
          creatorUserId: '2',
          creatorName: 'Emma Thompson',
          title: 'Frontend developer for HealthTech app',
          description: 'Looking for a React/React Native developer to help build a mental health tracking app.',
          skillsRequired: ['React', 'React Native', 'UI/UX Design'],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          applicants: 12
        }
      ];
      
      localStorage.setItem('collaborations', JSON.stringify(sampleCollaborations));
      return sampleCollaborations;
    } catch (error) {
      console.error('Failed to get collaboration opportunities from localStorage:', error);
      return [];
    }
  },
  
  // Create a new collaboration opportunity
  createCollaboration: (collaborationData) => {
    try {
      const collaborationsJson = localStorage.getItem('collaborations');
      const collaborations = collaborationsJson ? JSON.parse(collaborationsJson) : [];
      
      // Get current user
      const currentUserJson = localStorage.getItem('currentUser');
      const currentUser = currentUserJson ? JSON.parse(currentUserJson) : { userId: 'current', username: 'Anonymous' };
      
      const newCollaboration = {
        ...collaborationData,
        opportunityId: Date.now().toString(),
        creatorUserId: currentUser.userId,
        creatorName: currentUser.username,
        createdAt: new Date().toISOString(),
        applicants: 0
      };
      
      const updatedCollaborations = [newCollaboration, ...collaborations];
      localStorage.setItem('collaborations', JSON.stringify(updatedCollaborations));
      
      return newCollaboration;
    } catch (error) {
      console.error('Failed to create collaboration opportunity in localStorage:', error);
      throw error;
    }
  },
  
  // Apply to a collaboration opportunity
  applyToCollaboration: (id) => {
    try {
      const collaborationsJson = localStorage.getItem('collaborations');
      if (!collaborationsJson) throw new Error('No collaboration opportunities found');
      
      const collaborations = JSON.parse(collaborationsJson);
      const updatedCollaborations = collaborations.map(collab => 
        collab.opportunityId === id 
          ? { ...collab, applicants: collab.applicants + 1 }
          : collab
      );
      
      localStorage.setItem('collaborations', JSON.stringify(updatedCollaborations));
      return updatedCollaborations.find(collab => collab.opportunityId === id);
    } catch (error) {
      console.error(`Failed to apply to collaboration opportunity with ID ${id} in localStorage:`, error);
      throw error;
    }
  },
  
  // Search collaboration opportunities
  searchCollaborations: (query) => {
    try {
      const collaborationsJson = localStorage.getItem('collaborations');
      if (!collaborationsJson) return [];
      
      const collaborations = JSON.parse(collaborationsJson);
      return collaborations.filter(collab => 
        collab.title.toLowerCase().includes(query.toLowerCase()) ||
        collab.description.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error(`Failed to search collaboration opportunities with query "${query}" in localStorage:`, error);
      return [];
    }
  },
  
  // Filter collaboration opportunities by skill
  filterBySkill: (skill) => {
    try {
      const collaborationsJson = localStorage.getItem('collaborations');
      if (!collaborationsJson) return [];
      
      const collaborations = JSON.parse(collaborationsJson);
      return collaborations.filter(collab => 
        collab.skillsRequired.some(s => 
          s.toLowerCase().includes(skill.toLowerCase())
        )
      );
    } catch (error) {
      console.error(`Failed to filter collaboration opportunities by skill "${skill}" in localStorage:`, error);
      return [];
    }
  }
};

const collaborationService = {
  getAllCollaborations,
  getCollaborationById,
  createCollaboration,
  updateCollaboration,
  deleteCollaboration,
  applyToCollaboration,
  getCollaborationApplications,
  searchCollaborations,
  getCollaborationsByUser,
  getCollaborationsBySkill,
  getTrendingCollaborations,
  getRecommendedCollaborations,
  simulateCollaboration
};

export default collaborationService;

