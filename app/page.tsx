'use client'

import { useState } from 'react';
import Timer from '@/components/Timer';
import Countdown from '@/components/Countdown';

export default function Home() {
  const [activeTab, setActiveTab] = useState('timer');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white text-center">计时器小工具</h1>
        <div className="flex justify-center mb-6 sm:mb-8">
          <button 
            className={`px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-l-lg transition-colors duration-300 ${
              activeTab === 'timer' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('timer')}
            type="button"
          >
            正向计时器
          </button>
          <button 
            className={`px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-r-lg transition-colors duration-300 ${
              activeTab === 'countdown' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('countdown')}
            type="button"
          >
            倒计时
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {activeTab === 'timer' ? <Timer /> : <Countdown />}
        </div>
      </div>
    </div>
  );
}
