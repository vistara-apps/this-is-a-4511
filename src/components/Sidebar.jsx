import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { 
  LayoutDashboard, 
  Users, 
  Brain, 
  Handshake, 
  MessageCircle, 
  User,
  TrendingUp
} from 'lucide-react'

const Sidebar = () => {
  const { isAuthenticated } = useApp()
  const location = useLocation()

  if (!isAuthenticated) return null

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Communities', href: '/communities', icon: Users },
    { name: 'AI Tools', href: '/ai-tools', icon: Brain },
    { name: 'Collaboration', href: '/collaboration', icon: Handshake },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex-1 flex flex-col min-h-0 bg-white/10 backdrop-blur-md border-r border-white/20">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 flex-shrink-0 h-5 w-5
                      ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}
                    `}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Quick Stats */}
          <div className="px-2 mt-6">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium text-sm mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Communities Joined</span>
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Posts Created</span>
                  <span className="text-white text-sm font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Ideas Generated</span>
                  <span className="text-white text-sm font-medium">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar