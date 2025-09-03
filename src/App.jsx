import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Communities from './pages/Communities'
import CommunityDetail from './pages/CommunityDetail'
import AITools from './pages/AITools'
import Collaboration from './pages/Collaboration'
import Messages from './pages/Messages'
import Profile from './pages/Profile'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen gradient-bg">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </div>
    </AppProvider>
  )
}

export default App