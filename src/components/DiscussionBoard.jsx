import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Share, MoreHorizontal, Send } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

/**
 * Discussion board component for community discussions
 * @param {Object} props - Component props
 * @param {Array} props.posts - List of posts to display
 * @param {Function} props.onAddPost - Function to call when a post is added
 * @param {Function} props.onLikePost - Function to call when a post is liked
 * @param {Function} props.onAddComment - Function to call when a comment is added
 * @param {boolean} props.isLoading - Whether the posts are loading
 * @param {string} props.error - Error message to display
 * @returns {JSX.Element} Discussion board component
 */
const DiscussionBoard = ({ 
  posts = [], 
  onAddPost, 
  onLikePost, 
  onAddComment,
  isLoading = false,
  error = null
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Handle post submission
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setSubmitError('You must be logged in to create a post');
      return;
    }
    
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setSubmitError('Title and content are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const newPost = {
        title: newPostTitle,
        content: newPostContent,
        authorUserId: currentUser.userId,
        authorName: currentUser.username
      };
      
      await onAddPost(newPost);
      
      // Clear form
      setNewPostTitle('');
      setNewPostContent('');
    } catch (err) {
      console.error('Failed to create post:', err);
      setSubmitError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle post like
  const handleLikePost = async (postId) => {
    if (!isAuthenticated) {
      setSubmitError('You must be logged in to like a post');
      return;
    }
    
    try {
      await onLikePost(postId);
    } catch (err) {
      console.error('Failed to like post:', err);
      setSubmitError('Failed to like post. Please try again.');
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (postId) => {
    if (!isAuthenticated) {
      setSubmitError('You must be logged in to comment');
      return;
    }
    
    if (!commentText.trim()) {
      setSubmitError('Comment cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const newComment = {
        content: commentText,
        authorUserId: currentUser.userId,
        authorName: currentUser.username
      };
      
      await onAddComment(postId, newComment);
      
      // Clear form
      setCommentText('');
    } catch (err) {
      console.error('Failed to add comment:', err);
      setSubmitError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 24 * 60) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 7 * 24 * 60) return `${Math.floor(diffInMinutes / (60 * 24))}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Create post form */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Create Post
        </h2>
        
        {submitError && (
          <ErrorMessage
            variant="error"
            message={submitError}
            onDismiss={() => setSubmitError(null)}
            className="mb-4"
          />
        )}
        
        <form onSubmit={handleSubmitPost}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Post title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !newPostTitle.trim() || !newPostContent.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <LoadingIndicator variant="spinner" size="sm" color="white" text="" />
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Discussion</h2>
        
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <LoadingIndicator text="Loading posts..." />
          </div>
        ) : error ? (
          <ErrorMessage
            variant="error"
            message={error}
          />
        ) : posts.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
            <MessageCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No posts yet</h3>
            <p className="text-white/60">
              Be the first to start a discussion in this community!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.postId} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium">
                    {post.authorName.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">{post.title}</h3>
                  <p className="text-white/60 text-sm mb-2">
                    Posted by {post.authorName} • {formatDate(post.createdAt)}
                  </p>
                  <p className="text-white/90 mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikePost(post.postId)}
                      className="flex items-center text-white/60 hover:text-white transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setExpandedPost(expandedPost === post.postId ? null : post.postId)}
                      className="flex items-center text-white/60 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center text-white/60 hover:text-white transition-colors">
                      <Share className="w-4 h-4 mr-1" />
                      <span>Share</span>
                    </button>
                    <button className="ml-auto text-white/60 hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Comments section */}
              {expandedPost === post.postId && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-white font-medium mb-3">Comments</h4>
                  
                  {/* Comment form */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {currentUser?.username?.charAt(0).toUpperCase() || 'G'}
                      </span>
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pr-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSubmitComment(post.postId)}
                        disabled={isSubmitting || !commentText.trim()}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Sample comments (in a real app, these would be fetched from the API) */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">J</span>
                      </div>
                      <div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-white/90 text-sm">Great post! I've been thinking about this topic a lot lately.</p>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-white/60">
                          <span className="font-medium">Jane Doe</span>
                          <span className="mx-1">•</span>
                          <span>2h ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">M</span>
                      </div>
                      <div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-white/90 text-sm">I'd love to collaborate on this if you're interested!</p>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-white/60">
                          <span className="font-medium">Mike Smith</span>
                          <span className="mx-1">•</span>
                          <span>1h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiscussionBoard;

