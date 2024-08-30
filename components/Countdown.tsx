'use client'

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      alert('倒计时结束！');
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startStop = () => {
    if (!isRunning && time === 0) {
      const seconds = Number.parseInt(inputTime) * 60;
      if (Number.isNaN(seconds) || seconds <= 0) {
        alert('请输入有效的分钟数！');
        return;
      }
      setTime(seconds);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setInputTime('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 shadow-md flex flex-col items-center">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white text-center w-full">
        {formatTime(time)}
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="输入分钟数"
          disabled={isRunning}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32 text-gray-800 mb-2 sm:mb-0"
        />
        <button 
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto"
          onClick={startStop}
          type="button"
        >
          {isRunning ? '暂停' : '开始'}
        </button>
        <button 
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 w-full sm:w-auto"
          onClick={reset}
          type="button"
        >
          重置
        </button>
      </div>
    </div>
  );
}
