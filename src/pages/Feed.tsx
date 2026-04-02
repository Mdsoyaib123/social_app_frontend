import React from 'react';

const Feed = () => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] font-['Poppins']">
      {/* Background Shapes (kept for consistency with Login/Register) */}
      <div className="absolute top-0 left-0 z-0 opacity-30">
        <img src="/assets/images/shape1.svg" alt="" className="w-40" />
      </div>

      {/* Main Layout */}
      <div className="_layout _layout_main_wrapper">
        {/* Desktop Top Navigation */}
        <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-9" />
              </div>

              {/* Search */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-100 border border-transparent focus:border-purple-400 rounded-full py-2.5 pl-11 text-sm focus:outline-none"
                  />
                  <div className="absolute left-4 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center gap-6">
                <a href="#" className="relative text-gray-600 hover:text-purple-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1v-5m10-10l2 2m-2-2v10a1 1 0 01-1 1v-5m-6 0a1 1 0 001-1v5" />
                  </svg>
                </a>

                <a href="#" className="relative text-gray-600 hover:text-purple-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9-5.197V8.5m.002 3.5L12 14l-2.998 2.5" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">6</span>
                </a>

                <a href="#" className="relative text-gray-600 hover:text-purple-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 01-2-2z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">2</span>
                </a>

                {/* Profile */}
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src="/assets/images/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Dylan Field</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="pt-20 pb-20 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Explore */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
                <h4 className="font-semibold text-lg mb-5">Explore</h4>
                <ul className="space-y-5">
                  <li><a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">Learning</a></li>
                  <li><a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">Insights</a></li>
                  <li><a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">Find Friends</a></li>
                  <li><a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">Groups</a></li>
                  <li><a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600">Bookmarks</a></li>
                </ul>
              </div>
            </div>

            {/* Main Feed Area */}
            <div className="lg:col-span-6">
              {/* Story Section */}
              <div className="bg-white rounded-2xl shadow p-5 mb-6 overflow-x-auto">
                <div className="flex gap-4">
                  {/* Your Story */}
                  <div className="flex-shrink-0 text-center">
                    <div className="relative">
                      <img src="/assets/images/card_ppl1.png" alt="Your Story" className="w-16 h-16 rounded-full object-cover border-2 border-purple-500" />
                      <div className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">+</div>
                    </div>
                    <p className="text-xs mt-1 text-gray-600">Your Story</p>
                  </div>

                  {/* Other Stories */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 text-center">
                      <div className="relative">
                        <img src={`/assets/images/card_ppl${(i % 4) + 2}.png`} alt="Story" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" />
                      </div>
                      <p className="text-xs mt-1 text-gray-600">Ryan...</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Post Box */}
              <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <div className="flex items-start gap-4">
                  <img src="/assets/images/txt_img.png" alt="Profile" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <textarea
                      className="w-full border border-gray-200 focus:border-purple-400 rounded-2xl px-5 py-4 text-sm resize-none focus:outline-none"
                      rows={3}
                      placeholder="Write something..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 border-t pt-4">
                  <div className="flex gap-6 text-gray-600">
                    <button className="flex items-center gap-2 hover:text-purple-600">
                      <span>📷</span> Photo
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-600">
                      <span>🎥</span> Video
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-600">
                      <span>📅</span> Event
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-600">
                      <span>📝</span> Article
                    </button>
                  </div>
                  <button className="bg-purple-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition">
                    Post
                  </button>
                </div>
              </div>

              {/* Sample Post */}
              <div className="bg-white rounded-2xl shadow mb-6 overflow-hidden">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/assets/images/post_img.png" alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium">Karim Saif</p>
                      <p className="text-xs text-gray-500">5 minutes ago • Public</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
                </div>

                <div className="px-6 pb-4">
                  <p className="text-gray-800">-Healthy Tracking App</p>
                </div>

                <img src="/assets/images/timeline_img.png" alt="Post" className="w-full" />

                <div className="px-6 py-4 flex items-center justify-between text-sm border-t">
                  <div className="flex items-center gap-1 text-gray-500">
                    ❤️👍 198
                  </div>
                  <div className="flex gap-6 text-gray-500">
                    <span>12 Comments</span>
                    <span>122 Shares</span>
                  </div>
                </div>

                {/* Reactions */}
                <div className="border-t flex text-center">
                  <button className="flex-1 py-3 hover:bg-gray-50 text-purple-600 font-medium">Like</button>
                  <button className="flex-1 py-3 hover:bg-gray-50">Comment</button>
                  <button className="flex-1 py-3 hover:bg-gray-50">Share</button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
                <div className="flex justify-between mb-5">
                  <h4 className="font-semibold">You Might Like</h4>
                  <a href="#" className="text-purple-600 text-sm">See All</a>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src="/assets/images/Avatar.png" alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium text-sm">Radovan SkillArena</p>
                        <p className="text-xs text-gray-500">Founder & CEO at Trophy</p>
                      </div>
                    </div>
                    <button className="text-xs bg-purple-100 text-purple-700 px-4 py-1 rounded-full">Follow</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-50">
          <div className="flex justify-around py-3 text-xs">
            <a href="#" className="flex flex-col items-center text-purple-600">
              <span className="text-2xl">🏠</span>
              <span>Home</span>
            </a>
            <a href="#" className="flex flex-col items-center text-gray-500">
              <span className="text-2xl">👥</span>
              <span>Friends</span>
            </a>
            <a href="#" className="flex flex-col items-center text-gray-500 relative">
              <span className="text-2xl">💬</span>
              <span>Chat</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </a>
            <a href="#" className="flex flex-col items-center text-gray-500">
              <span className="text-2xl">📅</span>
              <span>Events</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;