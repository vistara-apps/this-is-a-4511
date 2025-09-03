import { useState, useEffect, useCallback } from 'react';
import messageService from '../services/messageService';
import useAuth from './useAuth';

/**
 * Custom hook for real-time messaging functionality
 * @returns {Object} Messaging state and methods
 */
const useMessaging = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize messaging
  useEffect(() => {
    if (!isAuthenticated || !currentUser) return;

    const initializeMessaging = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // For development/demo purposes, use the simulate method
        const conversationsData = messageService.simulateMessage.getConversations();
        setConversations(conversationsData);
        
        const unreadCountData = messageService.simulateMessage.getUnreadCount();
        setUnreadCount(unreadCountData);
      } catch (err) {
        console.error('Failed to initialize messaging:', err);
        setError('Failed to load conversations. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeMessaging();
  }, [isAuthenticated, currentUser]);

  // Load messages for active conversation
  useEffect(() => {
    if (!activeConversation) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // For development/demo purposes, use the simulate method
        const messagesData = messageService.simulateMessage.getMessages(activeConversation);
        setMessages(messagesData);
        
        // Mark conversation as read
        messageService.simulateMessage.markAsRead(activeConversation);
        
        // Update conversations to reflect read status
        setConversations(prev => 
          prev.map(conv => 
            conv.id === activeConversation 
              ? { ...conv, unread: 0 } 
              : conv
          )
        );
        
        // Update unread count
        setUnreadCount(messageService.simulateMessage.getUnreadCount());
      } catch (err) {
        console.error('Failed to load messages:', err);
        setError('Failed to load messages. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [activeConversation]);

  // Send a message
  const sendMessage = useCallback(async (conversationId, content) => {
    if (!isAuthenticated || !currentUser) {
      throw new Error('You must be logged in to send messages');
    }

    if (!content.trim()) {
      throw new Error('Message cannot be empty');
    }

    try {
      setError(null);

      // For development/demo purposes, use the simulate method
      const newMessage = messageService.simulateMessage.sendMessage(conversationId, content);
      
      // Update messages
      setMessages(prev => [...prev, newMessage]);
      
      // Update conversation last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId
            ? { 
                ...conv, 
                lastMessage: content,
                timestamp: '1m ago'
              }
            : conv
        )
      );
      
      return newMessage;
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again.');
      throw err;
    }
  }, [isAuthenticated, currentUser]);

  // Set active conversation
  const selectConversation = useCallback((conversationId) => {
    setActiveConversation(conversationId);
  }, []);

  return {
    conversations,
    activeConversation,
    messages,
    unreadCount,
    isLoading,
    error,
    sendMessage,
    selectConversation
  };
};

export default useMessaging;

