/**
 * Post service for handling post-related operations
 * This service provides methods for creating, retrieving, updating, and deleting posts
 */

import api from './api';

// Post endpoints
const POST_ENDPOINTS = {
  GET_ALL: '/posts',
  GET_BY_ID: (id) => `/posts/${id}`,
  CREATE: '/posts',
  UPDATE: (id) => `/posts/${id}`,
  DELETE: (id) => `/posts/${id}`,
  LIKE: (id) => `/posts/${id}/like`,
  UNLIKE: (id) => `/posts/${id}/unlike`,
  GET_COMMENTS: (id) => `/posts/${id}/comments`,
  ADD_COMMENT: (id) => `/posts/${id}/comments`,
  DELETE_COMMENT: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,
  SEARCH: '/posts/search',
  GET_BY_USER: (userId) => `/users/${userId}/posts`,
  GET_FEED: '/posts/feed',
  GET_TRENDING: '/posts/trending',
};

/**
 * Gets all posts
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of posts
 */
export const getAllPosts = async (params = {}) => {
  try {
    return await api.get(POST_ENDPOINTS.GET_ALL, { params });
  } catch (error) {
    console.error('Failed to get posts:', error);
    throw error;
  }
};

/**
 * Gets a post by ID
 * @param {string} id - Post ID
 * @returns {Promise<Object>} - Post data
 */
export const getPostById = async (id) => {
  try {
    return await api.get(POST_ENDPOINTS.GET_BY_ID(id));
  } catch (error) {
    console.error(`Failed to get post with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new post
 * @param {Object} postData - Post data (title, content, communityId)
 * @returns {Promise<Object>} - Created post data
 */
export const createPost = async (postData) => {
  try {
    return await api.post(POST_ENDPOINTS.CREATE, postData);
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
};

/**
 * Updates a post
 * @param {string} id - Post ID
 * @param {Object} postData - Updated post data
 * @returns {Promise<Object>} - Updated post data
 */
export const updatePost = async (id, postData) => {
  try {
    return await api.put(POST_ENDPOINTS.UPDATE(id), postData);
  } catch (error) {
    console.error(`Failed to update post with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a post
 * @param {string} id - Post ID
 * @returns {Promise<void>}
 */
export const deletePost = async (id) => {
  try {
    return await api.delete(POST_ENDPOINTS.DELETE(id));
  } catch (error) {
    console.error(`Failed to delete post with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Likes a post
 * @param {string} id - Post ID
 * @returns {Promise<Object>} - Updated post data
 */
export const likePost = async (id) => {
  try {
    return await api.post(POST_ENDPOINTS.LIKE(id));
  } catch (error) {
    console.error(`Failed to like post with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Unlikes a post
 * @param {string} id - Post ID
 * @returns {Promise<Object>} - Updated post data
 */
export const unlikePost = async (id) => {
  try {
    return await api.post(POST_ENDPOINTS.UNLIKE(id));
  } catch (error) {
    console.error(`Failed to unlike post with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Gets comments for a post
 * @param {string} id - Post ID
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of comments
 */
export const getPostComments = async (id, params = {}) => {
  try {
    return await api.get(POST_ENDPOINTS.GET_COMMENTS(id), { params });
  } catch (error) {
    console.error(`Failed to get comments for post with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Adds a comment to a post
 * @param {string} postId - Post ID
 * @param {Object} commentData - Comment data (content)
 * @returns {Promise<Object>} - Created comment data
 */
export const addPostComment = async (postId, commentData) => {
  try {
    return await api.post(POST_ENDPOINTS.ADD_COMMENT(postId), commentData);
  } catch (error) {
    console.error(`Failed to add comment to post with ID ${postId}:`, error);
    throw error;
  }
};

/**
 * Deletes a comment from a post
 * @param {string} postId - Post ID
 * @param {string} commentId - Comment ID
 * @returns {Promise<void>}
 */
export const deletePostComment = async (postId, commentId) => {
  try {
    return await api.delete(POST_ENDPOINTS.DELETE_COMMENT(postId, commentId));
  } catch (error) {
    console.error(`Failed to delete comment with ID ${commentId} from post with ID ${postId}:`, error);
    throw error;
  }
};

/**
 * Searches posts
 * @param {string} query - Search query
 * @param {Object} params - Additional query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of matching posts
 */
export const searchPosts = async (query, params = {}) => {
  try {
    return await api.get(POST_ENDPOINTS.SEARCH, { 
      params: { query, ...params } 
    });
  } catch (error) {
    console.error(`Failed to search posts with query "${query}":`, error);
    throw error;
  }
};

/**
 * Gets posts by user
 * @param {string} userId - User ID
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of posts by the specified user
 */
export const getPostsByUser = async (userId, params = {}) => {
  try {
    return await api.get(POST_ENDPOINTS.GET_BY_USER(userId), { params });
  } catch (error) {
    console.error(`Failed to get posts by user with ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Gets the current user's feed
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of posts for the user's feed
 */
export const getFeed = async (params = {}) => {
  try {
    return await api.get(POST_ENDPOINTS.GET_FEED, { params });
  } catch (error) {
    console.error('Failed to get feed:', error);
    throw error;
  }
};

/**
 * Gets trending posts
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of trending posts
 */
export const getTrendingPosts = async (params = {}) => {
  try {
    return await api.get(POST_ENDPOINTS.GET_TRENDING, { params });
  } catch (error) {
    console.error('Failed to get trending posts:', error);
    throw error;
  }
};

// For development/demo purposes - simulates post operations without a backend
export const simulatePost = {
  // Get all posts from localStorage or return sample data
  getAllPosts: () => {
    try {
      const postsJson = localStorage.getItem('posts');
      if (postsJson) {
        return JSON.parse(postsJson);
      }
      
      // Return sample data if no posts in localStorage
      const samplePosts = [
        {
          postId: '1',
          communityId: '1',
          authorUserId: '1',
          authorName: 'Sarah Chen',
          title: 'AI-powered diagnostics: The future is here',
          content: 'Just attended an amazing conference on AI diagnostics. The potential for early disease detection is incredible...',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 23,
          comments: 8
        },
        {
          postId: '2',
          communityId: '2',
          authorUserId: '2',
          authorName: 'Marcus Rodriguez',
          title: 'Building a micro-investment app',
          content: 'Working on an app that helps students invest spare change. Looking for feedback on the UX design...',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          likes: 15,
          comments: 12
        }
      ];
      
      localStorage.setItem('posts', JSON.stringify(samplePosts));
      return samplePosts;
    } catch (error) {
      console.error('Failed to get posts from localStorage:', error);
      return [];
    }
  },
  
  // Get posts by community ID
  getPostsByCommunity: (communityId) => {
    try {
      const postsJson = localStorage.getItem('posts');
      if (!postsJson) return [];
      
      const posts = JSON.parse(postsJson);
      return posts.filter(post => post.communityId === communityId);
    } catch (error) {
      console.error(`Failed to get posts for community with ID ${communityId} from localStorage:`, error);
      return [];
    }
  },
  
  // Create a new post
  createPost: (postData) => {
    try {
      const postsJson = localStorage.getItem('posts');
      const posts = postsJson ? JSON.parse(postsJson) : [];
      
      const newPost = {
        ...postData,
        postId: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      
      const updatedPosts = [newPost, ...posts];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      return newPost;
    } catch (error) {
      console.error('Failed to create post in localStorage:', error);
      throw error;
    }
  },
  
  // Like a post
  likePost: (id) => {
    try {
      const postsJson = localStorage.getItem('posts');
      if (!postsJson) throw new Error('No posts found');
      
      const posts = JSON.parse(postsJson);
      const updatedPosts = posts.map(post => 
        post.postId === id 
          ? { ...post, likes: post.likes + 1 }
          : post
      );
      
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      return updatedPosts.find(post => post.postId === id);
    } catch (error) {
      console.error(`Failed to like post with ID ${id} in localStorage:`, error);
      throw error;
    }
  },
  
  // Add a comment to a post
  addComment: (postId, commentData) => {
    try {
      const postsJson = localStorage.getItem('posts');
      if (!postsJson) throw new Error('No posts found');
      
      const posts = JSON.parse(postsJson);
      const updatedPosts = posts.map(post => 
        post.postId === postId 
          ? { ...post, comments: post.comments + 1 }
          : post
      );
      
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      // In a real implementation, we would also store the comment itself
      return {
        commentId: Date.now().toString(),
        postId,
        ...commentData,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Failed to add comment to post with ID ${postId} in localStorage:`, error);
      throw error;
    }
  }
};

const postService = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getPostComments,
  addPostComment,
  deletePostComment,
  searchPosts,
  getPostsByUser,
  getFeed,
  getTrendingPosts,
  simulatePost
};

export default postService;

