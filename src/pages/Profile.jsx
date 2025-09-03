import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { User, Edit3, Save, X, MapPin, Calendar, Globe, Briefcase } from 'lucide-react'

const Profile = () => {
  const { currentUser } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    bio: currentUser?.bio || '',
    location: 'San Francisco, CA',
    university: 'Stanford University',
    major: 'Computer Science',
    year: 'Junior',
    website: '',
    skills: currentUser?.interests || [],
    projects: []
  })

  const skills = [
    'JavaScript', 'React', 'Python', 'Machine Learning', 'UI/UX Design',
    'Product Management', 'Data Science', 'Blockchain', 'Mobile Development',
    'Marketing', 'Business Development', 'Content Writing'
  ]

  const sampleProjects = [
    {
      id: '1',
      title: 'AI Study Assistant',
      description: 'A machine learning-powered study tool that adapts to individual learning patterns',
      tech: ['Python', 'TensorFlow', 'React'],
      status: 'In Development'
    },
    {
      id: '2',
      title: 'Campus Sustainability App',
      description: 'Mobile app to track and gamify sustainable practices on university campuses',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      status: 'Completed'
    }
  ]

  const handleSave = (e) => {
    e.preventDefault()
    // Save logic here
    setIsEditing(false)
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const userStats = [
    { label: 'Communities Joined', value: '3' },
    { label: 'Posts Created', value: '12' },
    { label: 'Ideas Generated', value: '8' },
    { label: 'Collaborations', value: '2' }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">
                {(currentUser?.username || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{formData.username}</h1>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  Active
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-3">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {formData.major} • {formData.year}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {formData.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
              
              <p className="text-white/80 max-w-2xl">
                {formData.bio || 'Passionate student entrepreneur focused on building the future through technology and innovation.'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/70 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills & Interests */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Skills & Interests</h2>
            
            {isEditing ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`
                      px-3 py-1 text-sm rounded-full border transition-colors text-left
                      ${formData.skills.includes(skill)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white/10 text-white/70 border-white/20 hover:border-blue-500'
                      }
                    `}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Projects */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Projects</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm">+ Add Project</button>
            </div>
            
            <div className="space-y-4">
              {sampleProjects.map((project) => (
                <div key={project.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium">{project.title}</h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                      }
                    `}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Edit Form */}
          {isEditing && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Edit Information</h3>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">University</label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://your-portfolio.com"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                View My Communities
              </a>
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                My Collaboration Posts
              </a>
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                Generated Ideas History
              </a>
              <a href="#" className="block text-blue-400 hover:text-blue-300 transition-colors">
                Account Settings
              </a>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-white text-xs">Early Adopter</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl mb-1">💡</div>
                <div className="text-white text-xs">Idea Generator</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl mb-1">🤝</div>
                <div className="text-white text-xs">Team Player</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl mb-1">📚</div>
                <div className="text-white text-xs">Knowledge Sharer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile