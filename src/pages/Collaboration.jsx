import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { HelpingHand, Plus, MapPin, Clock, Users, Star, Filter, Search } from 'lucide-react'

const Collaboration = () => {
  const { collaborations, addCollaboration } = useApp()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const skillCategories = ['All', 'Frontend', 'Backend', 'Design', 'Marketing', 'Business', 'Data Science']

  const filteredCollaborations = collaborations.filter(collab => {
    const matchesSearch = collab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collab.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || collab.skillsRequired.some(skill => 
      skill.toLowerCase().includes(filter.toLowerCase())
    )
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <HelpingHand className="w-8 h-8 text-green-400 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-white">Collaboration Hub</h1>
              <p className="text-white/70">Find co-founders and team members for your next venture</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post Opportunity
          </button>
        </div>
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
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Skill Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white/60" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {skillCategories.map(category => (
                <option key={category} value={category.toLowerCase()} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center">
            <div className="p-2 bg-green-500 rounded-lg">
              <HelpingHand className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-white text-xl font-semibold">{collaborations.length}</p>
              <p className="text-white/60 text-sm">Active Opportunities</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-white text-xl font-semibold">1.2K</p>
              <p className="text-white/60 text-sm">Students Looking</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-white text-xl font-semibold">89%</p>
              <p className="text-white/60 text-sm">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration Opportunities */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Latest Opportunities</h2>
        
        {filteredCollaborations.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
            <HelpingHand className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No opportunities found</h3>
            <p className="text-white/60 mb-4">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Be the first to post a collaboration opportunity!'
              }
            </p>
            {!searchTerm && filter === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Post First Opportunity
              </button>
            )}
          </div>
        ) : (
          filteredCollaborations.map((collaboration) => (
            <CollaborationCard key={collaboration.opportunityId} collaboration={collaboration} />
          ))
        )}
      </div>

      {/* Create Collaboration Modal */}
      {showCreateModal && (
        <CreateCollaborationModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={(data) => {
            addCollaboration(data)
            setShowCreateModal(false)
          }}
        />
      )}
    </div>
  )
}

const CollaborationCard = ({ collaboration }) => {
  const [applied, setApplied] = useState(false)

  const timeAgo = (date) => {
    const now = new Date()
    const diff = now - new Date(date)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  const handleApply = () => {
    setApplied(true)
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium">
                {collaboration.creatorName.charAt(0).toUpperCase()}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-white font-semibold text-lg">{collaboration.title}</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                  Active
                </span>
              </div>
              <p className="text-white/60 text-sm mb-2">by {collaboration.creatorName}</p>
              <p className="text-white/80 mb-4">{collaboration.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {collaboration.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-6 text-white/60 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {timeAgo(collaboration.createdAt)}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {collaboration.applicants} applicants
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-6 py-2 rounded-lg transition-colors font-medium ${
              applied
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {applied ? 'Applied ✓' : 'Apply'}
          </button>
          <button className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20">
            Message
          </button>
        </div>
      </div>
    </div>
  )
}

const CreateCollaborationModal = ({ onClose, onSubmit }) => {
  const { currentUser } = useApp()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsRequired: []
  })

  const availableSkills = [
    'Frontend Development', 'Backend Development', 'UI/UX Design', 'Mobile Development',
    'Data Science', 'Machine Learning', 'Marketing', 'Business Development',
    'Product Management', 'Sales', 'Graphic Design', 'Content Writing'
  ]

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.includes(skill)
        ? prev.skillsRequired.filter(s => s !== skill)
        : [...prev.skillsRequired, skill]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      creatorName: currentUser?.username || 'Anonymous'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-textPrimary">Post Collaboration Opportunity</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Opportunity Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Co-founder needed for EdTech startup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
              placeholder="Describe your project, what you're looking for, and what you can offer..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">
              Required Skills
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`
                    px-3 py-1 text-xs rounded-full border transition-colors text-left
                    ${formData.skillsRequired.includes(skill)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-50 text-textSecondary border-gray-200 hover:border-green-500'
                    }
                  `}
                >
                  {skill}
                </button>
              ))}
            </div>
            <p className="text-textSecondary text-xs mt-1">
              Selected: {formData.skillsRequired.length} skills
            </p>
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Post Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Collaboration
