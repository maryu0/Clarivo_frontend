import React, { useEffect, useState } from 'react';
import { Mic, Square, Pause, Play, Save, RefreshCw } from 'lucide-react';
import { WaveformVisualizer } from '../components/WaveformVisualizer';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { useNavigate } from 'react-router-dom';
export function RecordingScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
        // Simulate fluctuating confidence
        setConfidence(prev => {
          const change = (Math.random() - 0.5) * 10;
          const newVal = Math.max(0, Math.min(100, prev + change));
          return newVal;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const handleStop = () => {
    setIsRecording(false);
    navigate('/results');
  };
  return <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col justify-center animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
          Session in Progress
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Emma Thompson</h1>
        <p className="text-gray-500 mt-1">
          Target: Rhotacism Correction (/r/ sounds)
        </p>
      </div>

      {/* Main Visualization Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8 relative">
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-2 bg-gray-900/5 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm font-mono font-medium text-gray-700">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
                Live Waveform
              </h3>
              <WaveformVisualizer isRecording={isRecording} />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Real-time Feedback
              </h3>
              <p className="text-lg font-medium text-gray-900">
                {isRecording ? 'Good tongue placement detected. Maintain airflow.' : 'Press record to begin analysis.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l border-gray-100 pl-8">
            <ConfidenceMeter score={isRecording ? Math.round(confidence) : 0} size={160} label="Pronunciation Score" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6">
        {!isRecording && duration === 0 ? <button onClick={() => {
        setIsRecording(true);
        setConfidence(75);
      }} className="group relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Mic className="h-8 w-8 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Rec
            </span>
          </button> : <>
            <button onClick={() => setIsRecording(!isRecording)} className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
              {isRecording ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </button>

            <button onClick={handleStop} className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Square className="h-8 w-8 mb-1 fill-current" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Stop
              </span>
            </button>

            <button onClick={() => {
          setIsRecording(false);
          setDuration(0);
          setConfidence(0);
        }} className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
              <RefreshCw className="h-6 w-6" />
            </button>
          </>}
      </div>
    </div>;
}