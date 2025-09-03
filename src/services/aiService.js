/**
 * AI service for handling AI-related operations
 * This service provides methods for generating startup ideas, refining ideas, and other AI-powered features
 */

import api from './api';

// AI endpoints
const AI_ENDPOINTS = {
  GENERATE_IDEAS: '/ai/generate-ideas',
  REFINE_IDEA: '/ai/refine-idea',
  VALIDATE_IDEA: '/ai/validate-idea',
  GENERATE_BUSINESS_PLAN: '/ai/generate-business-plan',
  GENERATE_PITCH: '/ai/generate-pitch',
  ANALYZE_MARKET: '/ai/analyze-market',
};

/**
 * Generates startup ideas based on user inputs
 * @param {Object} params - Idea generation parameters (interests, skills, problemStatement)
 * @returns {Promise<Array>} - List of generated ideas
 */
export const generateIdeas = async (params) => {
  try {
    return await api.post(AI_ENDPOINTS.GENERATE_IDEAS, params);
  } catch (error) {
    console.error('Failed to generate ideas:', error);
    throw error;
  }
};

/**
 * Refines a startup idea with AI suggestions
 * @param {Object} ideaData - Idea data to refine
 * @returns {Promise<Object>} - Refined idea data
 */
export const refineIdea = async (ideaData) => {
  try {
    return await api.post(AI_ENDPOINTS.REFINE_IDEA, ideaData);
  } catch (error) {
    console.error('Failed to refine idea:', error);
    throw error;
  }
};

/**
 * Validates a startup idea with market analysis and feedback
 * @param {Object} ideaData - Idea data to validate
 * @returns {Promise<Object>} - Validation results
 */
export const validateIdea = async (ideaData) => {
  try {
    return await api.post(AI_ENDPOINTS.VALIDATE_IDEA, ideaData);
  } catch (error) {
    console.error('Failed to validate idea:', error);
    throw error;
  }
};

/**
 * Generates a business plan for a startup idea
 * @param {Object} ideaData - Idea data to generate a business plan for
 * @returns {Promise<Object>} - Generated business plan
 */
export const generateBusinessPlan = async (ideaData) => {
  try {
    return await api.post(AI_ENDPOINTS.GENERATE_BUSINESS_PLAN, ideaData);
  } catch (error) {
    console.error('Failed to generate business plan:', error);
    throw error;
  }
};

/**
 * Generates a pitch for a startup idea
 * @param {Object} ideaData - Idea data to generate a pitch for
 * @returns {Promise<Object>} - Generated pitch
 */
export const generatePitch = async (ideaData) => {
  try {
    return await api.post(AI_ENDPOINTS.GENERATE_PITCH, ideaData);
  } catch (error) {
    console.error('Failed to generate pitch:', error);
    throw error;
  }
};

/**
 * Analyzes the market for a startup idea
 * @param {Object} ideaData - Idea data to analyze the market for
 * @returns {Promise<Object>} - Market analysis results
 */
export const analyzeMarket = async (ideaData) => {
  try {
    return await api.post(AI_ENDPOINTS.ANALYZE_MARKET, ideaData);
  } catch (error) {
    console.error('Failed to analyze market:', error);
    throw error;
  }
};

// For development/demo purposes - simulates AI operations without a backend
export const simulateAI = {
  // Sample AI-generated ideas
  sampleIdeas: [
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
  ],
  
  // Generate startup ideas based on user inputs
  generateIdeas: (params) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Generate ideas based on user inputs
        const { interests, skills, problemStatement } = params;
        
        // Filter sample ideas based on interests and skills
        let filteredIdeas = [...simulateAI.sampleIdeas];
        
        // If interests are provided, prioritize ideas that match
        if (interests) {
          const interestTerms = interests.toLowerCase().split(',').map(term => term.trim());
          filteredIdeas = filteredIdeas.map(idea => {
            // Calculate a relevance score based on how many interest terms match
            const relevanceScore = interestTerms.reduce((score, term) => {
              if (idea.market.toLowerCase().includes(term) || 
                  idea.description.toLowerCase().includes(term) ||
                  idea.title.toLowerCase().includes(term)) {
                return score + 1;
              }
              return score;
            }, 0);
            
            return { ...idea, relevanceScore };
          }).sort((a, b) => b.relevanceScore - a.relevanceScore);
        }
        
        // If a problem statement is provided, generate a custom idea
        if (problemStatement && problemStatement.length > 10) {
          const customIdea = {
            id: Date.now(),
            title: `Solution for: ${problemStatement.substring(0, 30)}...`,
            description: `A custom solution addressing the problem: "${problemStatement}"`,
            market: interests ? interests.split(',')[0] : "General",
            viability: "Medium",
            competition: "Unknown",
            nextSteps: [
              "Conduct market research",
              "Validate problem with potential users",
              "Create prototype solution"
            ]
          };
          
          filteredIdeas.unshift(customIdea);
        }
        
        // Add some randomness to make it feel more dynamic
        filteredIdeas = filteredIdeas.map(idea => ({
          ...idea,
          id: Date.now() + Math.floor(Math.random() * 1000)
        }));
        
        resolve(filteredIdeas);
      }, 1500); // Simulate 1.5s API delay
    });
  },
  
  // Refine a startup idea with AI suggestions
  refineIdea: (ideaData) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Add AI refinements to the idea
        const refinedIdea = {
          ...ideaData,
          description: ideaData.description + " The AI suggests focusing on mobile-first design and integrating with existing university systems for better adoption.",
          nextSteps: [
            ...(ideaData.nextSteps || []),
            "Conduct user interviews with target demographic",
            "Research potential university partnerships",
            "Develop go-to-market strategy"
          ],
          marketInsights: [
            "The global EdTech market is projected to reach $404B by 2025",
            "Students spend an average of 3 hours daily on mobile devices",
            "83% of students use digital tools for studying"
          ],
          competitiveAnalysis: [
            "Current solutions lack personalization features",
            "Opportunity to integrate with existing learning management systems",
            "Focus on peer-to-peer learning could be a differentiator"
          ]
        };
        
        resolve(refinedIdea);
      }, 1500); // Simulate 1.5s API delay
    });
  },
  
  // Validate a startup idea with market analysis and feedback
  validateIdea: (ideaData) => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Generate validation results
        const validationResults = {
          idea: ideaData,
          validationScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
          strengths: [
            "Addresses a clear market need",
            "Leverages current technology trends",
            "Scalable business model"
          ],
          weaknesses: [
            "Competitive market landscape",
            "Potential user acquisition challenges",
            "May require significant initial investment"
          ],
          opportunities: [
            "Partnership with educational institutions",
            "Integration with existing learning platforms",
            "International expansion potential"
          ],
          threats: [
            "Established competitors with market share",
            "Rapidly evolving technology landscape",
            "Changing regulatory environment"
          ],
          recommendations: [
            "Focus on a specific niche initially",
            "Develop a minimum viable product for early testing",
            "Seek feedback from potential users before full development"
          ]
        };
        
        resolve(validationResults);
      }, 2000); // Simulate 2s API delay
    });
  }
};

const aiService = {
  generateIdeas,
  refineIdea,
  validateIdea,
  generateBusinessPlan,
  generatePitch,
  analyzeMarket,
  simulateAI
};

export default aiService;

