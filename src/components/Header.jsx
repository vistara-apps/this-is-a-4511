import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Search, Bell, User, Menu, X } from 'lucide-react'
import AuthModal from './AuthModal'

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useApp()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NC</span>
              </div>
              <span className="text-white font-semibold text-xl hidden sm:block">
                NicheConnect
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            {isAuthenticated && (
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search communities, posts..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="hidden sm:block">{currentUser?.username || 'User'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 text-white/80 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && isAuthenticated && (
          <div className="lg:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-2 space-y-2">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/communities"
                className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Communities
              </Link>
              <Link
                to="/ai-tools"
                className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Tools
              </Link>
              <Link
                to="/collaboration"
                className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collaboration
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  )
}

export default Header