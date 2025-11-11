import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { kidService } from '../services/kidService'
import { likeService } from '../services/likeService'
import KidModePinModal from '../components/KidModePinModal'

const KidPage = () => {
  const { user, isKidMode } = useAuth()
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [showExitModal, setShowExitModal] = useState(false)
  const [likingInProgress, setLikingInProgress] = useState(new Set())
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    if (isKidMode) {
      fetchKidContent()
    }
  }, [isKidMode])

  const fetchKidContent = async () => {
    try {
      const response = await kidService.getContent()
      setContent(response.content)
      console.log('Fetched kid content:', response.content)
    } catch (error) {
      console.error('Error fetching kid content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (contentId) => {
    if (likingInProgress.has(contentId)) {
      console.log('Like action already in progress for:', contentId)
      return
    }

    setLikingInProgress(prev => new Set(prev).add(contentId))

    const contentItem = content.find(item => item._id === contentId)
    const isCurrentlyLiked = contentItem?.isLiked || false
    const currentLikesCount = contentItem?.likesCount || 0

    try {
      setContent(prevContent =>
        prevContent.map(item =>
          item._id === contentId
            ? {
                ...item,
                isLiked: !isCurrentlyLiked,
                likesCount: isCurrentlyLiked
                  ? Math.max(0, item.likesCount - 1)
                  : item.likesCount + 1
              }
            : item
        )
      )

      if (isCurrentlyLiked) {
        await likeService.unlikeContent(contentId)
      } else {
        await likeService.likeContent(contentId)
      }

      console.log(`Successfully ${isCurrentlyLiked ? 'unliked' : 'liked'} content:`, contentId)
      await fetchKidContent()
    } catch (error) {
      console.error('Error updating like:', error)
      setContent(prevContent =>
        prevContent.map(item =>
          item._id === contentId
            ? {
                ...item,
                isLiked: isCurrentlyLiked,
                likesCount: currentLikesCount
              }
            : item
        )
      )

      if (error.response?.status === 409) {
        alert('Please wait a moment before trying again.')
      } else if (error.response?.status === 400) {
        alert('Unable to like this content. Please refresh the page.')
      } else {
        alert('Failed to update like. Please try again.')
      }
    } finally {
      setLikingInProgress(prev => {
        const newSet = new Set(prev)
        newSet.delete(contentId)
        return newSet
      })
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60)
      return `${minutes}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  if (!isKidMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 via-green-300 to-yellow-300 flex items-center justify-center relative overflow-hidden">
        {/* Friendly background elements */}
        <div className="absolute top-10 left-10 text-5xl">🐻</div>
        <div className="absolute bottom-20 right-20 text-4xl">🦊</div>
        <div className="absolute top-32 right-32 text-3xl">🐰</div>
        
        <div className="text-center text-white relative z-10">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome to KidZone! 🎉</h1>
          <p className="text-xl mb-6">Please enter Kid Mode to see fun content!</p>
          <div className="w-24 h-2 bg-yellow-400 rounded-full mx-auto shadow-lg"></div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 flex items-center justify-center relative overflow-hidden">
        <div className="text-gray-700 text-2xl font-bold relative z-10 flex items-center space-x-4">
          <div className="animate-bounce text-4xl">🎨</div>
          <span>Getting everything ready... ✨</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 relative overflow-hidden">
      {/* Friendly background elements */}
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400"></div>
      <div className="absolute top-5 left-5 text-2xl">🐶</div>
      <div className="absolute top-10 right-10 text-2xl">🐱</div>
      <div className="absolute bottom-5 left-20 text-3xl">🐯</div>
      <div className="absolute bottom-10 right-5 text-2xl">🐼</div>

      {/* 🎨 Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-md border-b border-gray-200 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎨</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  KidZone Fun
                </h1>
                <p className="text-sm text-gray-600">Let's learn and play! 🎈</p>
              </div>
            </div>
            <button
              onClick={() => setShowExitModal(true)}
              className="bg-gradient-to-r from-red-400 to-orange-400 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg border-2 border-white"
            >
              Exit Kid Mode
            </button>
          </div>
        </div>
      </div>

      {/* 📺 News Feed */}
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        {content.length > 0 ? (
          <div className="space-y-6">
            {content.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden post-card hover:shadow-xl transition-all duration-300"
                style={{borderLeft: '6px solid #4ADE80'}}
              >
                {/* 👤 Post Header */}
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {item.creator?.username?.charAt(0).toUpperCase() || '🎬'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {item.creator?.username || 'Unknown Creator'}
                      </h3>
                      <p className="text-sm text-gray-600">{formatTime(item.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* 🎨 Post Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed text-base">
                      {item.description}
                    </p>
                  )}

                  {/* 🎬 Media */}
                  <div className="rounded-xl overflow-hidden mb-4 bg-gray-50 p-1 border-2 border-gray-200">
                    {item.type === 'video' ? (
                      <video
                        src={item.mediaUrl}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg bg-black"
                        controls
                        poster={item.thumbnailUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg bg-black cursor-pointer hover:opacity-95 transition-opacity"
                        onClick={() => setSelectedImage(item.mediaUrl)}
                      />
                    )}
                  </div>

                  {/* ❤️ Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                        <span className="text-red-500 text-base">❤️</span>
                        <span className="font-bold text-gray-800">
                          {item.likesCount} {item.likesCount === 1 ? 'like' : 'likes'}
                        </span>
                      </span>
                      <span className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* 🔘 Like Button */}
                  <div className="flex border-t border-gray-100 pt-4">
                    <button
                      onClick={() => handleLike(item._id)}
                      disabled={likingInProgress.has(item._id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-300 ${
                        item.isLiked
                          ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-md'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300'
                      } ${likingInProgress.has(item._id) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                      <span
                        className={`text-xl transition-all duration-300 ${
                          item.isLiked ? 'scale-110' : ''
                        }`}
                      >
                        {likingInProgress.has(item._id)
                          ? '⏳'
                          : item.isLiked
                          ? '❤️'
                          : '🤍'}
                      </span>
                      <span
                        className={`font-bold ${
                          item.isLiked ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {likingInProgress.has(item._id)
                          ? 'Loading...'
                          : item.isLiked
                          ? 'Liked!'
                          : 'Like this!'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 💤 Empty State
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 text-center">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No videos to watch right now</h2>
            <p className="text-gray-600 text-base mb-6">
              Ask your parent to subscribe to some awesome creators!
            </p>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mx-auto"></div>
            <div className="mt-6 text-3xl space-x-3">
              <span>🎵</span>
              <span>📚</span>
              <span>🎬</span>
              <span>🎨</span>
            </div>
          </div>
        )}
      </div>

      {/* 🔒 Exit Modal */}
      <KidModePinModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        mode="exit"
      />

      {/* 🖼️ Fullscreen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-white text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-all duration-300 text-lg border border-gray-300"
            >
              ✖ Close
            </button>
            <img
              src={selectedImage}
              alt="Full view"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Bottom decorative border */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400"></div>
    </div>
  )
}

export default KidPage