import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { MessageCircle, Search, Send, MoreVertical, Phone, Video } from 'lucide-react'

const Messages = () => {
  const { currentUser } = useApp()
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample conversations
  const conversations = [
    {
      id: '1',
      name: 'Sarah Chen',
      lastMessage: 'Hey! I saw your post about the AI healthcare project. Would love to discuss!',
      timestamp: '2m ago',
      unread: 2,
      avatar: '👩‍💻',
      online: true
    },
    {
      id: '2',
      name: 'Alex Kim',
      lastMessage: 'Thanks for applying to our EdTech opportunity. Let\'s set up a call!',
      timestamp: '1h ago',
      unread: 0,
      avatar: '👨‍💼',
      online: false
    },
    {
      id: '3',
      name: 'Emma Thompson',
      lastMessage: 'The AI idea generator suggestions were amazing! Which one are you leaning towards?',
      timestamp: '3h ago',
      unread: 1,
      avatar: '👩‍🎨',
      online: true
    },
    {
      id: '4',
      name: 'Marcus Rodriguez',
      lastMessage: 'Great meeting you at the FinTech community event today!',
      timestamp: '1d ago',
      unread: 0,
      avatar: '👨‍💻',
      online: false
    }
  ]

  // Sample messages for selected chat
  const chatMessages = {
    '1': [
      {
        id: '1',
        senderId: '1',
        senderName: 'Sarah Chen',
        content: 'Hey! I saw your post about the AI healthcare project. Would love to discuss!',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        isOwn: false
      },
      {
        id: '2',
        senderId: currentUser?.userId || 'current',
        senderName: currentUser?.username || 'You',
        content: 'Hi Sarah! Thanks for reaching out. I\'d love to hear your thoughts on the project.',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        isOwn: true
      },
      {
        id: '3',
        senderId: '1',
        senderName: 'Sarah Chen',
        content: 'I have some experience with medical AI from my internship at Stanford Hospital. The diagnostic accuracy improvements could be game-changing!',
        timestamp: new Date(),
        isOwn: false
      }
    ],
    '2': [
      {
        id: '1',
        senderId: '2',
        senderName: 'Alex Kim',
        content: 'Thanks for applying to our EdTech opportunity. Let\'s set up a call!',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isOwn: false
      }
    ]
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (messageText.trim() && selectedChat) {
      // Add message logic here
      setMessageText('')
    }
  }

  const formatTime = (date) => {
    const now = new Date()
    const messageDate = new Date(date)
    const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 24 * 60) return `${Math.floor(diffInMinutes / 60)}h ago`
    return messageDate.toLocaleDateString()
  }

  return (
    <div className="h-[calc(100vh-12rem)] bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 border-r border-white/20 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/20">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Messages
            </h2>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`
                  p-4 border-b border-white/10 cursor-pointer transition-colors hover:bg-white/5
                  ${selectedChat === conversation.id ? 'bg-white/10' : ''}
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-lg">{conversation.avatar}</span>
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white/20"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium truncate">{conversation.name}</h4>
                      <span className="text-white/60 text-xs">{conversation.timestamp}</span>
                    </div>
                    <p className="text-white/70 text-sm truncate">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{conversation.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-lg">
                        {conversations.find(c => c.id === selectedChat)?.avatar}
                      </span>
                    </div>
                    {conversations.find(c => c.id === selectedChat)?.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white/20"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {conversations.find(c => c.id === selectedChat)?.name}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {conversations.find(c => c.id === selectedChat)?.online ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(chatMessages[selectedChat] || []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                      ${message.isOwn 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/20 text-white'
                      }
                    `}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-white/60'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/20">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Select a conversation</h3>
                <p className="text-white/60">Choose from your existing conversations or start a new one</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Chat View */}
        {selectedChat && (
          <div className="md:hidden fixed inset-0 bg-white/10 backdrop-blur-md z-50">
            {/* Mobile chat content would go here */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages