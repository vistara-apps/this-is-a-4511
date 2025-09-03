import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Search, Users, Plus, TrendingUp, Filter } from 'lucide-react'

const Communities = () => {
  const { communities, joinCommunity } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const topics = ['all', 'AI', 'FinTech', 'EdTech', 'HealthTech', 'Sustainability', 'Gaming']

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = selectedTopic === 'all' || community.topic === selectedTopic
    return matchesSearch && matchesTopic
  })

  const handleJoinCommunity = (communityId) => {
    joinCommunity(communityId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Communities</h1>
          <p className="text-white/70">Discover and join communities that match your interests</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Community
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Topic Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white/60" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {topics.map(topic => (
                <option key={topic} value={topic} className="bg-gray-800">
                  {topic === 'all' ? 'All Topics' : topic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Communities */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Featured Communities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div
              key={community.communityId}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{community.name}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{community.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white/60 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {community.memberCount} members
                </div>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                  {community.topic}
                </span>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/community/${community.communityId}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View Community
                </Link>
                <button
                  onClick={() => handleJoinCommunity(community.communityId)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm border border-white/20"
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <CreateCommunityModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}

const CreateCommunityModal = ({ onClose }) => {
  const { setCommunities } = useApp()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    topic: 'AI'
  })

  const topics = ['AI', 'FinTech', 'EdTech', 'HealthTech', 'Sustainability', 'Gaming']

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newCommunity = {
      communityId: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      topic: formData.topic,
      createdAt: new Date(),
      ownerUserId: '1',
      memberCount: 1
    }

    setCommunities(prev => [newCommunity, ...prev])
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-textPrimary">Create New Community</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Community Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., AI in Healthcare"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
              placeholder="Describe what your community is about..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Topic
            </label>
            <select
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
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
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Communities