import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { X, User, Mail, Lock } from 'lucide-react'

const AuthModal = ({ onClose, onSuccess }) => {
  const { login } = useApp()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    interests: []
  })

  const interests = [
    'AI & Machine Learning',
    'FinTech',
    'EdTech',
    'HealthTech',
    'Sustainability',
    'E-commerce',
    'Gaming',
    'Social Impact',
    'Blockchain',
    'IoT'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulate authentication
    const userData = {
      userId: Date.now().toString(),
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      interests: formData.interests,
      bio: '',
      profilePictureUrl: '',
      createdAt: new Date()
    }

    login(userData)
    onSuccess()
  }

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-textPrimary">
            {isLogin ? 'Welcome Back' : 'Join NicheConnect'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-4 h-4" />
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Choose a username"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-4 h-4" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your.email@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary w-4 h-4" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">
                Select Your Interests (optional)
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`
                      px-3 py-1 text-xs rounded-full border transition-colors
                      ${formData.interests.includes(interest)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-gray-50 text-textSecondary border-gray-200 hover:border-primary'
                      }
                    `}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal