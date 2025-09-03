/**
 * Message service for handling messaging-related operations
 * This service provides methods for sending, receiving, and managing messages
 */

import api from './api';

// Message endpoints
const MESSAGE_ENDPOINTS = {
  GET_CONVERSATIONS: '/messages/conversations',
  GET_CONVERSATION: (userId) => `/messages/conversations/${userId}`,
  GET_MESSAGES: (conversationId) => `/messages/conversations/${conversationId}/messages`,
  SEND_MESSAGE: '/messages',
  DELETE_MESSAGE: (id) => `/messages/${id}`,
  MARK_AS_READ: (id) => `/messages/${id}/read`,
  GET_UNREAD_COUNT: '/messages/unread/count',
};

/**
 * Gets all conversations for the current user
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of conversations
 */
export const getConversations = async (params = {}) => {
  try {
    return await api.get(MESSAGE_ENDPOINTS.GET_CONVERSATIONS, { params });
  } catch (error) {
    console.error('Failed to get conversations:', error);
    throw error;
  }
};

/**
 * Gets a conversation with a specific user
 * @param {string} userId - User ID of the conversation partner
 * @returns {Promise<Object>} - Conversation data
 */
export const getConversation = async (userId) => {
  try {
    return await api.get(MESSAGE_ENDPOINTS.GET_CONVERSATION(userId));
  } catch (error) {
    console.error(`Failed to get conversation with user ID ${userId}:`, error);
    throw error;
  }
};

/**
 * Gets messages for a conversation
 * @param {string} conversationId - Conversation ID
 * @param {Object} params - Query parameters (page, limit, etc.)
 * @returns {Promise<Array>} - List of messages
 */
export const getMessages = async (conversationId, params = {}) => {
  try {
    return await api.get(MESSAGE_ENDPOINTS.GET_MESSAGES(conversationId), { params });
  } catch (error) {
    console.error(`Failed to get messages for conversation with ID ${conversationId}:`, error);
    throw error;
  }
};

/**
 * Sends a message
 * @param {Object} messageData - Message data (receiverId, content)
 * @returns {Promise<Object>} - Sent message data
 */
export const sendMessage = async (messageData) => {
  try {
    return await api.post(MESSAGE_ENDPOINTS.SEND_MESSAGE, messageData);
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};

/**
 * Deletes a message
 * @param {string} id - Message ID
 * @returns {Promise<void>}
 */
export const deleteMessage = async (id) => {
  try {
    return await api.delete(MESSAGE_ENDPOINTS.DELETE_MESSAGE(id));
  } catch (error) {
    console.error(`Failed to delete message with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Marks a message as read
 * @param {string} id - Message ID
 * @returns {Promise<Object>} - Updated message data
 */
export const markAsRead = async (id) => {
  try {
    return await api.put(MESSAGE_ENDPOINTS.MARK_AS_READ(id));
  } catch (error) {
    console.error(`Failed to mark message with ID ${id} as read:`, error);
    throw error;
  }
};

/**
 * Gets the count of unread messages
 * @returns {Promise<number>} - Count of unread messages
 */
export const getUnreadCount = async () => {
  try {
    const response = await api.get(MESSAGE_ENDPOINTS.GET_UNREAD_COUNT);
    return response.count;
  } catch (error) {
    console.error('Failed to get unread message count:', error);
    throw error;
  }
};

// WebSocket connection for real-time messaging
let socket = null;
let messageHandlers = [];

/**
 * Initializes WebSocket connection for real-time messaging
 * @param {string} token - Authentication token
 * @returns {WebSocket} - WebSocket connection
 */
export const initializeWebSocket = (token) => {
  // Close existing connection if any
  if (socket) {
    socket.close();
  }

  // Create new WebSocket connection
  const wsUrl = import.meta.env.VITE_WS_URL || 'wss://api.nicheconnect.example/ws';
  socket = new WebSocket(`${wsUrl}?token=${token}`);

  // Set up event handlers
  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      // Notify all message handlers
      messageHandlers.forEach(handler => handler(data));
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
    
    // Attempt to reconnect after a delay
    setTimeout(() => {
      if (localStorage.getItem('authToken')) {
        initializeWebSocket(localStorage.getItem('authToken'));
      }
    }, 5000);
  };

  return socket;
};

/**
 * Adds a message handler for WebSocket messages
 * @param {Function} handler - Message handler function
 */
export const addMessageHandler = (handler) => {
  messageHandlers.push(handler);
};

/**
 * Removes a message handler
 * @param {Function} handler - Message handler function to remove
 */
export const removeMessageHandler = (handler) => {
  messageHandlers = messageHandlers.filter(h => h !== handler);
};

/**
 * Sends a message via WebSocket
 * @param {Object} message - Message to send
 */
export const sendWebSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket connection not open');
  }
};

/**
 * Closes WebSocket connection
 */
export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

// For development/demo purposes - simulates messaging without a backend
export const simulateMessage = {
  // Sample conversations
  conversations: [
    {
      id: '1',
      name: 'Sarah Chen',
      lastMessage: 'Hey! I saw your post about the AI healthcare project. Would love to discuss!',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      unread: 2,
      avatar: '👩‍💻',
      online: true
    },
    {
      id: '2',
      name: 'Alex Kim',
      lastMessage: 'Thanks for applying to our EdTech opportunity. Let\'s set up a call!',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      unread: 0,
      avatar: '👨‍💼',
      online: false
    },
    {
      id: '3',
      name: 'Emma Thompson',
      lastMessage: 'The AI idea generator suggestions were amazing! Which one are you leaning towards?',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      unread: 1,
      avatar: '👩‍🎨',
      online: true
    },
    {
      id: '4',
      name: 'Marcus Rodriguez',
      lastMessage: 'Great meeting you at the FinTech community event today!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      unread: 0,
      avatar: '👨‍💻',
      online: false
    }
  ],
  
  // Sample messages for each conversation
  messages: {
    '1': [
      {
        id: '1',
        senderId: '1',
        senderName: 'Sarah Chen',
        content: 'Hey! I saw your post about the AI healthcare project. Would love to discuss!',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        isOwn: false
      },
      {
        id: '2',
        senderId: 'current',
        senderName: 'You',
        content: 'Hi Sarah! Thanks for reaching out. I\'d love to hear your thoughts on the project.',
        timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
        isOwn: true
      },
      {
        id: '3',
        senderId: '1',
        senderName: 'Sarah Chen',
        content: 'I have some experience with medical AI from my internship at Stanford Hospital. The diagnostic accuracy improvements could be game-changing!',
        timestamp: new Date().toISOString(),
        isOwn: false
      }
    ],
    '2': [
      {
        id: '1',
        senderId: '2',
        senderName: 'Alex Kim',
        content: 'Thanks for applying to our EdTech opportunity. Let\'s set up a call!',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        isOwn: false
      }
    ]
  },
  
  // Get all conversations
  getConversations: () => {
    try {
      const conversationsJson = localStorage.getItem('conversations');
      if (conversationsJson) {
        return JSON.parse(conversationsJson);
      }
      
      // Store sample conversations in localStorage
      localStorage.setItem('conversations', JSON.stringify(simulateMessage.conversations));
      return simulateMessage.conversations;
    } catch (error) {
      console.error('Failed to get conversations from localStorage:', error);
      return [];
    }
  },
  
  // Get messages for a conversation
  getMessages: (conversationId) => {
    try {
      const messagesKey = `messages_${conversationId}`;
      const messagesJson = localStorage.getItem(messagesKey);
      
      if (messagesJson) {
        return JSON.parse(messagesJson);
      }
      
      // Return sample messages if available, otherwise empty array
      const sampleMessages = simulateMessage.messages[conversationId] || [];
      
      // Store in localStorage
      localStorage.setItem(messagesKey, JSON.stringify(sampleMessages));
      return sampleMessages;
    } catch (error) {
      console.error(`Failed to get messages for conversation with ID ${conversationId} from localStorage:`, error);
      return [];
    }
  },
  
  // Send a message
  sendMessage: (conversationId, messageContent) => {
    try {
      // Get current user
      const currentUserJson = localStorage.getItem('currentUser');
      const currentUser = currentUserJson ? JSON.parse(currentUserJson) : { userId: 'current', username: 'You' };
      
      // Create new message
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser.userId,
        senderName: currentUser.username,
        content: messageContent,
        timestamp: new Date().toISOString(),
        isOwn: true
      };
      
      // Get existing messages
      const messagesKey = `messages_${conversationId}`;
      const messagesJson = localStorage.getItem(messagesKey);
      const messages = messagesJson ? JSON.parse(messagesJson) : [];
      
      // Add new message
      const updatedMessages = [...messages, newMessage];
      localStorage.setItem(messagesKey, JSON.stringify(updatedMessages));
      
      // Update conversation last message
      const conversationsJson = localStorage.getItem('conversations');
      if (conversationsJson) {
        const conversations = JSON.parse(conversationsJson);
        const updatedConversations = conversations.map(conv => 
          conv.id === conversationId
            ? { 
                ...conv, 
                lastMessage: messageContent,
                timestamp: new Date().toISOString(),
                unread: 0
              }
            : conv
        );
        
        localStorage.setItem('conversations', JSON.stringify(updatedConversations));
      }
      
      return newMessage;
    } catch (error) {
      console.error(`Failed to send message to conversation with ID ${conversationId} in localStorage:`, error);
      throw error;
    }
  },
  
  // Mark conversation as read
  markAsRead: (conversationId) => {
    try {
      const conversationsJson = localStorage.getItem('conversations');
      if (!conversationsJson) return;
      
      const conversations = JSON.parse(conversationsJson);
      const updatedConversations = conversations.map(conv => 
        conv.id === conversationId
          ? { ...conv, unread: 0 }
          : conv
      );
      
      localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    } catch (error) {
      console.error(`Failed to mark conversation with ID ${conversationId} as read in localStorage:`, error);
    }
  },
  
  // Get unread message count
  getUnreadCount: () => {
    try {
      const conversationsJson = localStorage.getItem('conversations');
      if (!conversationsJson) return 0;
      
      const conversations = JSON.parse(conversationsJson);
      return conversations.reduce((total, conv) => total + conv.unread, 0);
    } catch (error) {
      console.error('Failed to get unread message count from localStorage:', error);
      return 0;
    }
  }
};

const messageService = {
  getConversations,
  getConversation,
  getMessages,
  sendMessage,
  deleteMessage,
  markAsRead,
  getUnreadCount,
  initializeWebSocket,
  addMessageHandler,
  removeMessageHandler,
  sendWebSocketMessage,
  closeWebSocket,
  simulateMessage
};

export default messageService;

