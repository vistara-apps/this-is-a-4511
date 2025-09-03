import React, { useState } from 'react';
import { Library, Search, Filter, Download, ExternalLink, FileText, Image, Video, File, Plus, X } from 'lucide-react';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

/**
 * Resource library component for community resources
 * @param {Object} props - Component props
 * @param {Array} props.resources - List of resources to display
 * @param {Function} props.onAddResource - Function to call when a resource is added
 * @param {boolean} props.isLoading - Whether the resources are loading
 * @param {string} props.error - Error message to display
 * @returns {JSX.Element} Resource library component
 */
const ResourceLibrary = ({ 
  resources = [], 
  onAddResource,
  isLoading = false,
  error = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);

  // All available resource types
  const resourceTypes = ['all', 'document', 'image', 'video', 'link', 'other'];
  
  // All available tags from resources
  const allTags = [...new Set(resources.flatMap(resource => resource.tags || []))];

  // Filter resources based on search term, selected type, and tags
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => resource.tags && resource.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesTags;
  });

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedTags([]);
  };

  // Get icon for resource type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-red-400" />;
      case 'link':
        return <ExternalLink className="w-6 h-6 text-purple-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Library className="w-5 h-5 mr-2" />
            Resource Library
          </h2>
          
          <button
            onClick={() => setShowAddResourceModal(true)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </button>
        </div>
        
        {/* Search and filters */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Type filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white/60" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type} className="bg-gray-800">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Tags filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 5).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-3 py-1 text-xs rounded-full border transition-colors
                    ${selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/10 text-white/80 border-white/20 hover:border-blue-500'
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
              
              {allTags.length > 5 && (
                <button className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/20 hover:border-blue-500">
                  +{allTags.length - 5} more
                </button>
              )}
            </div>
            
            {/* Clear filters */}
            {(searchTerm || selectedType !== 'all' || selectedTags.length > 0) && (
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

      {/* Resources list */}
      {isLoading ? (
        <div className="py-12 flex justify-center">
          <LoadingIndicator text="Loading resources..." />
        </div>
      ) : error ? (
        <ErrorMessage
          variant="error"
          message={error}
        />
      ) : filteredResources.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
          <Library className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">No resources found</h3>
          <p className="text-white/60 mb-4">
            {searchTerm || selectedType !== 'all' || selectedTags.length > 0
              ? 'Try adjusting your search or filters'
              : 'Be the first to add a resource to this community!'
            }
          </p>
          {!searchTerm && selectedType === 'all' && selectedTags.length === 0 && (
            <button
              onClick={() => setShowAddResourceModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.resourceId} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  {getResourceIcon(resource.type)}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{resource.title}</h3>
                  
                  {resource.description && (
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{resource.description}</p>
                  )}
                  
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-0.5 bg-white/10 text-white/80 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/10 text-white/80 rounded-full text-xs">
                          +{resource.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Added by {resource.uploaderName}</span>
                    <span>{new Date(resource.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm flex items-center border border-white/20"
                >
                  {resource.type === 'link' ? (
                    <>
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Visit Link
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddResourceModal && (
        <AddResourceModal
          onClose={() => setShowAddResourceModal(false)}
          onAddResource={onAddResource}
        />
      )}
    </div>
  );
};

/**
 * Add resource modal component
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {Function} props.onAddResource - Function to call when a resource is added
 * @returns {JSX.Element} Add resource modal component
 */
const AddResourceModal = ({ onClose, onAddResource }) => {
  const [resourceData, setResourceData] = useState({
    title: '',
    description: '',
    type: 'link',
    url: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Resource types
  const resourceTypes = [
    { value: 'link', label: 'Link', icon: <ExternalLink className="w-4 h-4" /> },
    { value: 'document', label: 'Document', icon: <FileText className="w-4 h-4" /> },
    { value: 'image', label: 'Image', icon: <Image className="w-4 h-4" /> },
    { value: 'video', label: 'Video', icon: <Video className="w-4 h-4" /> },
    { value: 'other', label: 'Other', icon: <File className="w-4 h-4" /> }
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resourceData.title.trim() || !resourceData.url.trim()) {
      setError('Title and URL are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await onAddResource(resourceData);
      onClose();
    } catch (err) {
      console.error('Failed to add resource:', err);
      setError('Failed to add resource. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add tag
  const addTag = () => {
    if (!tagInput.trim()) return;
    
    if (!resourceData.tags.includes(tagInput.trim())) {
      setResourceData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
    }
    
    setTagInput('');
  };

  // Remove tag
  const removeTag = (tag) => {
    setResourceData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  // Handle tag input keydown
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add Resource</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <ErrorMessage
              variant="error"
              message={error}
              onDismiss={() => setError(null)}
            />
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={resourceData.title}
              onChange={(e) => setResourceData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Resource title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={resourceData.description}
              onChange={(e) => setResourceData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              placeholder="Brief description of the resource"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resource Type
            </label>
            <div className="grid grid-cols-5 gap-2">
              {resourceTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setResourceData(prev => ({ ...prev, type: type.value }))}
                  className={`
                    p-2 rounded-lg border flex flex-col items-center justify-center text-xs
                    ${resourceData.type === type.value
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-blue-300'
                    }
                  `}
                >
                  <div className={`mb-1 ${resourceData.type === type.value ? 'text-blue-500' : 'text-gray-500'}`}>
                    {type.icon}
                  </div>
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL / Link *
            </label>
            <input
              type="text"
              required
              value={resourceData.url}
              onChange={(e) => setResourceData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/resource"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add tags (press Enter)"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            
            {resourceData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {resourceData.tags.map(tag => (
                  <div key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !resourceData.title.trim() || !resourceData.url.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <LoadingIndicator variant="spinner" size="sm" color="white" text="" />
              ) : (
                'Add Resource'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceLibrary;

