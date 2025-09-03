import React, { useState } from 'react'
import { Brain, Lightbulb, Target, TrendingUp, Sparkles, RefreshCw } from 'lucide-react'

const AITools = () => {
  const [ideaForm, setIdeaForm] = useState({
    interests: '',
    skills: '',
    problemStatement: ''
  })
  const [generatedIdeas, setGeneratedIdeas] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState(null)

  // Sample AI-generated ideas for demo purposes
  const sampleIdeas = [
    {
      id: 1,
      title: "AI-Powered Study Buddy",
      description: "An AI tutor that adapts to individual learning styles and provides personalized study plans for students.",
      market: "EdTech",
      viability: "High",
      competition: "Medium",
      nextSteps: ["Create MVP with basic AI features", "Test with 50 students", "Gather feedback and iterate"]
    },
    {
      id: 2,
      title: "Sustainable Fashion Marketplace",
      description: "A platform connecting eco-conscious consumers with sustainable fashion brands and second-hand sellers.",
      market: "E-commerce/Sustainability",
      viability: "Medium",
      competition: "High",
      nextSteps: ["Research sustainable fashion brands", "Develop marketplace prototype", "Build community of early adopters"]
    },
    {
      id: 3,
      title: "Mental Health Check-in App",
      description: "A daily mental health tracking app with AI-powered insights and connection to peer support networks.",
      market: "HealthTech",
      viability: "High",
      competition: "Medium",
      nextSteps: ["Design user-friendly interface", "Implement basic tracking features", "Partner with mental health professionals"]
    }
  ]

  const handleGenerateIdeas = async (e) => {
    e.preventDefault()
    setIsGenerating(true)
    
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedIdeas(sampleIdeas)
      setIsGenerating(false)
    }, 2000)
  }

  const handleRefineIdea = (idea) => {
    setSelectedIdea(idea)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-4">
          <Brain className="w-8 h-8 text-blue-400 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-white">AI Startup Tools</h1>
            <p className="text-white/70">Transform your ideas into actionable startup concepts</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Idea Generator Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 sticky top-24">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Ideas
            </h2>

            <form onSubmit={handleGenerateIdeas} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Your Interests
                </label>
                <input
                  type="text"
                  value={ideaForm.interests}
                  onChange={(e) => setIdeaForm(prev => ({ ...prev, interests: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AI, Sustainability, Education"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Your Skills
                </label>
                <input
                  type="text"
                  value={ideaForm.skills}
                  onChange={(e) => setIdeaForm(prev => ({ ...prev, skills: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Programming, Design, Marketing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Problem Statement (Optional)
                </label>
                <textarea
                  value={ideaForm.problemStatement}
                  onChange={(e) => setIdeaForm(prev => ({ ...prev, problemStatement: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  placeholder="What problem do you want to solve?"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Ideas
                  </>
                )}
              </button>
            </form>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-white font-medium mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Pro Tips
              </h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Be specific about your interests</li>
                <li>• List both technical and soft skills</li>
                <li>• Think about problems you've experienced</li>
                <li>• Consider market size and demand</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Generated Ideas */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Generated Ideas
              {generatedIdeas.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  {generatedIdeas.length} ideas
                </span>
              )}
            </h2>

            {generatedIdeas.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
                <Brain className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Ready to Generate Ideas?</h3>
                <p className="text-white/60">
                  Fill out the form on the left to get AI-powered startup ideas tailored to your interests and skills.
                </p>
              </div>
            ) : (
              generatedIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onRefine={() => handleRefineIdea(idea)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Idea Refinement Modal */}
      {selectedIdea && (
        <IdeaRefinementModal
          idea={selectedIdea}
          onClose={() => setSelectedIdea(null)}
        />
      )}
    </div>
  )
}

const IdeaCard = ({ idea, onRefine }) => {
  const getViabilityColor = (viability) => {
    switch (viability.toLowerCase()) {
      case 'high': return 'text-green-400 bg-green-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'low': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getCompetitionColor = (competition) => {
    switch (competition.toLowerCase()) {
      case 'low': return 'text-green-400 bg-green-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'high': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">{idea.title}</h3>
          <p className="text-white/80 mb-4">{idea.description}</p>
        </div>
        <button
          onClick={onRefine}
          className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Refine
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">Market:</span>
          <span className="text-white text-sm font-medium">{idea.market}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">Viability:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getViabilityColor(idea.viability)}`}>
            {idea.viability}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm">Competition:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(idea.competition)}`}>
            {idea.competition}
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <h4 className="text-white font-medium text-sm mb-2">Next Steps:</h4>
        <ul className="space-y-1">
          {idea.nextSteps.slice(0, 2).map((step, index) => (
            <li key={index} className="text-white/70 text-sm flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const IdeaRefinementModal = ({ idea, onClose }) => {
  const [refinedIdea, setRefinedIdea] = useState(idea)
  const [isRefining, setIsRefining] = useState(false)

  const handleRefine = () => {
    setIsRefining(true)
    
    // Simulate AI refinement
    setTimeout(() => {
      setRefinedIdea(prev => ({
        ...prev,
        description: prev.description + " The AI suggests focusing on mobile-first design and integrating with existing university systems for better adoption.",
        nextSteps: [
          ...prev.nextSteps,
          "Conduct user interviews with target demographic",
          "Research potential university partnerships",
          "Develop go-to-market strategy"
        ]
      }))
      setIsRefining(false)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-textPrimary">Refine Your Idea</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-2">{refinedIdea.title}</h3>
            <p className="text-textSecondary">{refinedIdea.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-textSecondary mb-1">Market</div>
              <div className="font-medium">{refinedIdea.market}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-textSecondary mb-1">Viability</div>
              <div className="font-medium">{refinedIdea.viability}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-textSecondary mb-1">Competition</div>
              <div className="font-medium">{refinedIdea.competition}</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-textPrimary mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Action Plan
            </h4>
            <div className="space-y-2">
              {refinedIdea.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-textSecondary">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleRefine}
              disabled={isRefining}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isRefining ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Refining...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Get AI Insights
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AITools