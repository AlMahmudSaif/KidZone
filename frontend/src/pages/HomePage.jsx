// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  const { user, isKidMode } = useAuth()
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // 🔹 Kid Mode UI
  if (isKidMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

        <div className="text-center text-white relative z-10 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight">
            🎉 Welcome to <span className="text-yellow-300">KidZone!</span> 🎉
          </h1>
          <p className="text-lg md:text-xl mb-10 text-cyan-100 font-medium">
            Learn, play, and grow with your favorite creators!
          </p>
          <Link
            to="/kid"
            className="bg-gradient-to-r from-yellow-300 to-cyan-300 text-blue-900 px-10 py-3 rounded-full text-xl font-extrabold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Start Learning!
          </Link>
        </div>
      </div>
    )
  }

  // 🔹 Default HomePage (non-kid mode)
  return (
    <div
      className={`min-h-screen flex flex-col text-white relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-blue-900 via-cyan-800 to-blue-900'
          : 'bg-gradient-to-b from-cyan-100 via-blue-100 to-cyan-50 text-gray-900'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent)] pointer-events-none"></div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-5 right-5 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all ${
          theme === 'dark'
            ? 'bg-white/10 text-cyan-200 hover:bg-white/20'
            : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
        }`}
      >
        {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center flex-1">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Welcome to{' '}
          <span
            className={`${
              theme === 'dark' ? 'text-cyan-300' : 'text-blue-600'
            }`}
          >
            KidZone
          </span>
        </h1>
        <p
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-white/90' : 'text-gray-700'
          }`}
        >
          A safe and joyful learning platform for kids — where parents guide, and creators inspire.
        </p>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Parent Section */}
          <div
            className={`rounded-3xl p-8 md:p-10 shadow-lg transition-all duration-300 border ${
              theme === 'dark'
                ? 'bg-white/10 border-white/10 backdrop-blur-xl hover:shadow-cyan-400/30 hover:-translate-y-2'
                : 'bg-white border-gray-200 hover:shadow-xl hover:-translate-y-2'
            }`}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
            </div>
            <h2
              className={`text-2xl font-bold mb-3 ${
                theme === 'dark' ? 'text-cyan-100' : 'text-blue-800'
              }`}
            >
              For Parents
            </h2>
            <p
              className={`text-base mb-7 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}
            >
              Create a safe environment for your kids. Manage subscriptions and control what your children learn.
            </p>
            <div className="space-y-3">
              <Link
                to="/register?role=parent"
                className="block w-full bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-blue-900 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all"
              >
                Register as Parent
              </Link>
              <Link
                to="/login?role=parent"
                className={`block w-full border py-3 rounded-lg font-semibold transition-colors ${
                  theme === 'dark'
                    ? 'border-cyan-400 text-white hover:bg-white/10'
                    : 'border-blue-400 text-blue-700 hover:bg-blue-50'
                }`}
              >
                Login as Parent
              </Link>
            </div>
          </div>

          {/* Creator Section */}
          <div
            className={`rounded-3xl p-8 md:p-10 shadow-lg transition-all duration-300 border ${
              theme === 'dark'
                ? 'bg-white/10 border-white/10 backdrop-blur-xl hover:shadow-cyan-400/30 hover:-translate-y-2'
                : 'bg-white border-gray-200 hover:shadow-xl hover:-translate-y-2'
            }`}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <span className="text-3xl">🎬</span>
            </div>
            <h2
              className={`text-2xl font-bold mb-3 ${
                theme === 'dark' ? 'text-cyan-100' : 'text-blue-800'
              }`}
            >
              For Creators
            </h2>
            <p
              className={`text-base mb-7 ${
                theme === 'dark' ? 'text-white/80' : 'text-gray-700'
              }`}
            >
              Share inspiring educational content with young minds. Build your presence and help kids learn creatively.
            </p>
            <div className="space-y-3">
              <Link
                to="/register?role=creator"
                className="block w-full bg-gradient-to-r from-pink-400 to-yellow-300 hover:from-pink-300 hover:to-yellow-200 text-blue-900 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all"
              >
                Register as Creator
              </Link>
              <Link
                to="/login?role=creator"
                className={`block w-full border py-3 rounded-lg font-semibold transition-colors ${
                  theme === 'dark'
                    ? 'border-yellow-300 text-white hover:bg-white/10'
                    : 'border-yellow-400 text-blue-700 hover:bg-yellow-50'
                }`}
              >
                Login as Creator
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: '🔒',
              title: 'Safe Environment',
              desc: 'Parents have full control over what their kids can watch and learn.',
            },
            {
              icon: '🎓',
              title: 'Quality Content',
              desc: 'Curated videos from verified creators ensure educational value.',
            },
            {
              icon: '👶',
              title: 'Kid-Friendly',
              desc: 'Simple, colorful, and easy-to-navigate interface built for young learners.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`text-center rounded-3xl p-8 hover:scale-105 transition-transform duration-300 shadow-lg ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 backdrop-blur-md hover:shadow-cyan-400/20'
                  : 'bg-white border border-gray-200 hover:shadow-lg'
              }`}
            >
              <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-cyan-100' : 'text-blue-800'
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                }`}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Section */}
      <div className={`border-t py-8 ${
        theme === 'dark' 
          ? 'bg-blue-900/40 border-cyan-400/20' 
          : 'bg-blue-50 border-gray-200'
      }`}>
        <div className="container mx-auto px-6">
          <div className={`text-center p-6 rounded-2xl max-w-md mx-auto ${
            theme === 'dark' 
              ? 'bg-white/10 backdrop-blur-md border border-white/10' 
              : 'bg-white/80 backdrop-blur-sm border border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-cyan-200' : 'text-blue-700'
            }`}>
              Developed by
            </h3>
            <p className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Al Mahmud Saif
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://github.com/AlMahmudSaif" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-blue-100 hover:bg-blue-200 text-gray-700'
                }`}
                title="GitHub Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/al-mahmud-saif/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-blue-100 hover:bg-blue-200 text-gray-700'
                }`}
                title="LinkedIn Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`border-t text-center py-5 text-xs md:text-sm ${
          theme === 'dark'
            ? 'bg-blue-900/40 border-cyan-400/20 text-white/80'
            : 'bg-blue-50 border-gray-200 text-gray-600'
        }`}
      >
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-cyan-400">KidZone</span>. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default HomePage