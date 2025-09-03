import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Brain, HelpingHand, MessageCircle, Star, TrendingUp } from 'lucide-react'
import AuthModal from '../components/AuthModal'

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)

  const features = [
    {
      icon: Users,
      title: 'Interest-Based Communities',
      description: 'Join niche communities focused on your academic and career interests'
    },
    {
      icon: MessageCircle,
      title: 'Knowledge Exchange',
      description: 'Connect with peers, ask questions, and share insights in your field'
    },
    {
      icon: Brain,
      title: 'AI Idea Generator',
      description: 'Leverage AI to brainstorm and validate your startup concepts'
    },
    {
      icon: HelpingHand,
      title: 'Find Collaborators',
      description: 'Connect with co-founders and team members for your next venture'
    }
  ]

  const stats = [
    { label: 'Active Students', value: '10K+' },
    { label: 'Communities', value: '500+' },
    { label: 'Ideas Generated', value: '25K+' },
    { label: 'Collaborations', value: '1.2K+' }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CS Student, Stanford',
      content: 'Found my co-founder through NicheConnect. Our AI healthcare startup just raised $2M!',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Business Student, MIT',
      content: 'The AI idea generator helped me refine my FinTech concept. Now we have 10K users!',
      avatar: '👨‍💼'
    },
    {
      name: 'Emma Thompson',
      role: 'Design Student, RISD',
      content: 'Connected with amazing peers in the EdTech community. Learned so much!',
      avatar: '👩‍🎨'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Build, Connect, and
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {' '}Innovate
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Join the premier platform for students to create niche communities, 
                share knowledge, and leverage AI for startup success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <Link
                  to="/communities"
                  className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition-colors font-medium backdrop-blur-sm border border-white/20"
                >
                  Explore Communities
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="relative mt-16 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-effect rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <h3 className="font-semibold">Market Analysis</h3>
                    <p className="text-sm text-white/60">AI-powered insights</p>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-purple-400 mr-3" />
                  <div>
                    <h3 className="font-semibold">Community Hub</h3>
                    <p className="text-sm text-white/60">Connect & collaborate</p>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-green-400 mr-3" />
                  <div>
                    <h3 className="font-semibold">Idea Generator</h3>
                    <p className="text-sm text-white/60">AI-powered creativity</p>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              From idea generation to finding the perfect team, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/80 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join thousands of students already building the future.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            Join NicheConnect Today
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </>
  )
}

export default HomePage
