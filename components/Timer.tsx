'use client'

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // 需要安装 uuid 包

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<{ id: string; time: number }[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, { id: uuidv4(), time }]);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 shadow-md flex flex-col items-center">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white text-center w-full">
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button 
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={startStop}
          type="button"
        >
          {isRunning ? '暂停' : '开始'}
        </button>
        <button 
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={lap} 
          disabled={!isRunning}
          type="button"
        >
          计次
        </button>
        <button 
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
          onClick={reset}
          type="button"
        >
          重置
        </button>
      </div>
      {laps.length > 0 && (
        <div className="text-left mt-4 sm:mt-6 w-full">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">计次记录:</h3>
          <ul className="space-y-1 text-sm sm:text-base text-gray-300">
            {laps.map((lap) => (
              <li key={lap.id}>第 {laps.indexOf(lap) + 1} 次: {formatTime(lap.time)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
