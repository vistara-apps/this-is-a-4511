import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [communities, setCommunities] = useState([])
  const [posts, setPosts] = useState([])
  const [messages, setMessages] = useState([])
  const [collaborations, setCollaborations] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize with sample data
  useEffect(() => {
    // Sample communities
    const sampleCommunities = [
      {
        communityId: '1',
        name: 'AI in Healthcare',
        description: 'Exploring the intersection of artificial intelligence and healthcare innovation',
        topic: 'AI',
        createdAt: new Date(),
        ownerUserId: '1',
        memberCount: 245
      },
      {
        communityId: '2',
        name: 'FinTech for Gen Z',
        description: 'Building financial solutions for the next generation',
        topic: 'FinTech',
        createdAt: new Date(),
        ownerUserId: '2',
        memberCount: 189
      },
      {
        communityId: '3',
        name: 'EdTech Innovations',
        description: 'Revolutionizing education through technology',
        topic: 'EdTech',
        createdAt: new Date(),
        ownerUserId: '3',
        memberCount: 312
      }
    ]

    // Sample posts
    const samplePosts = [
      {
        postId: '1',
        communityId: '1',
        authorUserId: '1',
        authorName: 'Sarah Chen',
        title: 'AI-powered diagnostics: The future is here',
        content: 'Just attended an amazing conference on AI diagnostics. The potential for early disease detection is incredible...',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 23,
        comments: 8
      },
      {
        postId: '2',
        communityId: '2',
        authorUserId: '2',
        authorName: 'Marcus Rodriguez',
        title: 'Building a micro-investment app',
        content: 'Working on an app that helps students invest spare change. Looking for feedback on the UX design...',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 15,
        comments: 12
      }
    ]

    // Sample collaborations
    const sampleCollaborations = [
      {
        opportunityId: '1',
        creatorUserId: '1',
        creatorName: 'Alex Kim',
        title: 'Co-founder needed for EdTech startup',
        description: 'Building an AI-powered learning platform. Need someone with business development experience.',
        skillsRequired: ['Business Development', 'Marketing', 'Sales'],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        applicants: 7
      },
      {
        opportunityId: '2',
        creatorUserId: '2',
        creatorName: 'Emma Thompson',
        title: 'Frontend developer for HealthTech app',
        description: 'Looking for a React/React Native developer to help build a mental health tracking app.',
        skillsRequired: ['React', 'React Native', 'UI/UX Design'],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        applicants: 12
      }
    ]

    setCommunities(sampleCommunities)
    setPosts(samplePosts)
    setCollaborations(sampleCollaborations)
  }, [])

  const login = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  const addPost = (post) => {
    const newPost = {
      ...post,
      postId: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      comments: 0
    }
    setPosts(prev => [newPost, ...prev])
  }

  const addCollaboration = (collaboration) => {
    const newCollab = {
      ...collaboration,
      opportunityId: Date.now().toString(),
      createdAt: new Date(),
      applicants: 0
    }
    setCollaborations(prev => [newCollab, ...prev])
  }

  const joinCommunity = (communityId) => {
    setCommunities(prev => 
      prev.map(community => 
        community.communityId === communityId 
          ? { ...community, memberCount: community.memberCount + 1 }
          : community
      )
    )
  }

  const value = {
    currentUser,
    communities,
    posts,
    messages,
    collaborations,
    isAuthenticated,
    login,
    logout,
    addPost,
    addCollaboration,
    joinCommunity,
    setCommunities,
    setPosts,
    setMessages
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}