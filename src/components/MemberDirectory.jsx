import React, { useState } from 'react';
import { Users, Search, MessageCircle, UserPlus, Filter, X } from 'lucide-react';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

/**
 * Member directory component for community members
 * @param {Object} props - Component props
 * @param {Array} props.members - List of members to display
 * @param {Function} props.onMessageMember - Function to call when a member is messaged
 * @param {Function} props.onFollowMember - Function to call when a member is followed
 * @param {boolean} props.isLoading - Whether the members are loading
 * @param {string} props.error - Error message to display
 * @returns {JSX.Element} Member directory component
 */
const MemberDirectory = ({ 
  members = [], 
  onMessageMember, 
  onFollowMember,
  isLoading = false,
  error = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');

  // All available skills from members
  const allSkills = [...new Set(members.flatMap(member => member.skills || []))];
  
  // All available roles
  const roles = ['all', 'member', 'moderator', 'admin', 'owner'];

  // Filter members based on search term, selected skills, and role
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.bio && member.bio.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.every(skill => member.skills && member.skills.includes(skill));
    
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    
    return matchesSearch && matchesSkills && matchesRole;
  });

  // Toggle skill selection
  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setSelectedRole('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Member Directory
        </h2>
        
        {/* Search and filters */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Role filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white/60" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role} value={role} className="bg-gray-800">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Skills filter */}
            <div className="flex flex-wrap gap-2">
              {allSkills.slice(0, 5).map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`
                    px-3 py-1 text-xs rounded-full border transition-colors
                    ${selectedSkills.includes(skill)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/10 text-white/80 border-white/20 hover:border-blue-500'
                    }
                  `}
                >
                  {skill}
                </button>
              ))}
              
              {allSkills.length > 5 && (
                <button className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/20 hover:border-blue-500">
                  +{allSkills.length - 5} more
                </button>
              )}
            </div>
            
            {/* Clear filters */}
            {(searchTerm || selectedSkills.length > 0 || selectedRole !== 'all') && (
              <button
                onClick={clearFilters}
                className="ml-auto px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/20 hover:border-red-500 flex items-center"
              >
                <X className="w-3 h-3 mr-1" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Members list */}
      {isLoading ? (
        <div className="py-12 flex justify-center">
          <LoadingIndicator text="Loading members..." />
        </div>
      ) : error ? (
        <ErrorMessage
          variant="error"
          message={error}
        />
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
          <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">No members found</h3>
          <p className="text-white/60">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.userId} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  {member.profilePictureUrl ? (
                    <img
                      src={member.profilePictureUrl}
                      alt={member.username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        {member.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {member.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold">{member.username}</h3>
                    {member.role && member.role !== 'member' && (
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        {member.role}
                      </span>
                    )}
                  </div>
                  
                  {member.bio && (
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{member.bio}</p>
                  )}
                  
                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 bg-white/10 text-white/80 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/10 text-white/80 rounded-full text-xs">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onMessageMember(member.userId)}
                      className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1" />
                      Message
                    </button>
                    <button
                      onClick={() => onFollowMember(member.userId)}
                      className="flex-1 px-3 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm flex items-center justify-center border border-white/20"
                    >
                      <UserPlus className="w-3.5 h-3.5 mr-1" />
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberDirectory;

