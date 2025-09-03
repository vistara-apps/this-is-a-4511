import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { TrendingUp, Users, MessageCircle, Brain, Plus, ArrowRight } from 'lucide-react'

const Dashboard = () => {
  const { currentUser, communities, posts, collaborations } = useApp()

  const quickActions = [
    {
      icon: Plus,
      title: 'Create Post',
      description: 'Share your thoughts with a community',
      link: '/communities',
      color: 'bg-blue-500'
    },
    {
      icon: Brain,
      title: 'Generate Ideas',
      description: 'Use AI to brainstorm startup concepts',
      link: '/ai-tools',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Find Collaborators',
      description: 'Connect with potential co-founders',
      link: '/collaboration',
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      title: 'Join Discussion',
      description: 'Participate in community conversations',
      link: '/communities',
      color: 'bg-orange-500'
    }
  ]

  const recentActivity = [
    {
      type: 'post',
      title: 'New post in AI in Healthcare',
      description: 'AI-powered diagnostics: The future is here',
      time: '2 hours ago',
      author: 'Sarah Chen'
    },
    {
      type: 'collaboration',
      title: 'New collaboration opportunity',
      description: 'Co-founder needed for EdTech startup',
      time: '4 hours ago',
      author: 'Alex Kim'
    },
    {
      type: 'community',
      title: 'You joined FinTech for Gen Z',
      description: 'Welcome to the community!',
      time: '1 day ago',
      author: 'System'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {currentUser?.username || 'Student'}! 👋
            </h1>
            <p className="text-white/70">
              Ready to connect, learn, and innovate today?
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/ai-tools"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Ideas
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-white text-xl font-semibold">{communities.length}</p>
              <p className="text-white/60 text-sm">Communities Joined</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center">
            <div className="p-2 bg-green-500 rounded-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-white text-xl font-semibold">{posts.length}</p>
              <p className="text-white/60 text-sm">Posts Created</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-white text-xl font-semibold">8</p>
              <p className="text-white/60 text-sm">Ideas Generated</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center">
            <div className="p-2 bg-orange-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-white text-xl font-semibold">142</p>
              <p className="text-white/60 text-sm">Reputation Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-colors group"
            >
              <div className={`p-3 ${action.color} rounded-lg inline-block mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-medium mb-1">{action.title}</h3>
              <p className="text-white/60 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Trending Communities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{activity.title}</h4>
                  <p className="text-white/60 text-sm">{activity.description}</p>
                  <p className="text-white/40 text-xs mt-1">{activity.time} • by {activity.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Communities */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Trending Communities</h2>
          <div className="space-y-4">
            {communities.slice(0, 3).map((community) => (
              <Link
                key={community.communityId}
                to={`/community/${community.communityId}`}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div>
                  <h4 className="text-white font-medium">{community.name}</h4>
                  <p className="text-white/60 text-sm">{community.memberCount} members</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60" />
              </Link>
            ))}
          </div>
          <Link
            to="/communities"
            className="block text-center text-blue-400 hover:text-blue-300 text-sm mt-4"
          >
            View all communities →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard