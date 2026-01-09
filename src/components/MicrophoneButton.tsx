import React from 'react';
import { Mic } from 'lucide-react';
interface MicrophoneButtonProps {
  status: 'idle' | 'recording' | 'analyzing';
  onClick: () => void;
  disabled?: boolean;
}
export function MicrophoneButton({
  status,
  onClick,
  disabled
}: MicrophoneButtonProps) {
  const isRecording = status === 'recording';
  const isAnalyzing = status === 'analyzing';
  return <div className="relative flex items-center justify-center">
      {/* Pulsing Rings Animation */}
      {isRecording && <>
          <div className="absolute w-full h-full rounded-full bg-red-500/20 animate-ping" />
          <div className="absolute w-[120%] h-[120%] rounded-full bg-red-500/10 animate-pulse" />
        </>}

      <button onClick={onClick} disabled={disabled || isAnalyzing} className={`
          relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg border-4
          ${isRecording ? 'bg-white border-red-500 text-red-500 scale-105' : isAnalyzing ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' : 'bg-white border-primary text-primary hover:bg-primary/5 hover:scale-105 active:scale-95'}
          focus:outline-none focus:ring-4 focus:ring-primary/30 focus:ring-offset-4
        `} aria-label={isRecording ? 'Stop recording' : 'Start recording'}>
        <Mic className={`
            w-20 h-20 md:w-24 md:h-24 transition-colors duration-300
            ${isRecording ? 'animate-pulse' : ''}
          `} strokeWidth={1.5} />

        {isAnalyzing && <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />}
      </button>
    </div>;
}