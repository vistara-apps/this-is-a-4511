import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Users, MessageCircle, Heart, Share2, Plus, ArrowLeft } from 'lucide-react'

const CommunityDetail = () => {
  const { id } = useParams()
  const { communities, posts, addPost, currentUser } = useApp()
  const [showCreatePost, setShowCreatePost] = useState(false)

  const community = communities.find(c => c.communityId === id)
  const communityPosts = posts.filter(p => p.communityId === id)

  if (!community) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-white">Community not found</h2>
        <Link to="/communities" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
          ← Back to Communities
        </Link>
      </div>
    )
  }

  const handleCreatePost = (postData) => {
    addPost({
      ...postData,
      communityId: id,
      authorUserId: currentUser?.userId || '1',
      authorName: currentUser?.username || 'Anonymous'
    })
    setShowCreatePost(false)
  }

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-start justify-between mb-4">
          <Link 
            to="/communities"
            className="flex items-center text-white/70 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Communities
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h1 className="text-2xl font-bold text-white mr-3">{community.name}</h1>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                {community.topic}
              </span>
            </div>
            <p className="text-white/70 mb-4">{community.description}</p>
            <div className="flex items-center text-white/60">
              <Users className="w-4 h-4 mr-2" />
              {community.memberCount} members
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20">
              Join Community
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Recent Discussions</h2>
        
        {communityPosts.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
            <MessageCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No posts yet</h3>
            <p className="text-white/60 mb-4">Be the first to start a discussion in this community!</p>
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create First Post
            </button>
          </div>
        ) : (
          communityPosts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          communityName={community.name}
        />
      )}
    </div>
  )
}

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const timeAgo = (date) => {
    const now = new Date()
    const diff = now - new Date(date)
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium text-sm">
            {post.authorName.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-white font-medium">{post.authorName}</h4>
            <span className="text-white/40 text-sm">•</span>
            <span className="text-white/60 text-sm">{timeAgo(post.createdAt)}</span>
          </div>
          
          <h3 className="text-white font-semibold text-lg mb-2">{post.title}</h3>
          <p className="text-white/80 mb-4 leading-relaxed">{post.content}</p>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                liked ? 'text-red-400' : 'text-white/60 hover:text-red-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const CreatePostModal = ({ onClose, onSubmit, communityName }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-textPrimary">Create New Post</h2>
            <p className="text-textSecondary text-sm">Posting in {communityName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Post Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="What's your post about?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Content
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
              placeholder="Share your thoughts, ask questions, or start a discussion..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommunityDetail