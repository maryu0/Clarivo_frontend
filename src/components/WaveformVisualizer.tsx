import React, { useEffect, useRef } from 'react';
interface WaveformVisualizerProps {
  isRecording: boolean;
  color?: string;
}
export function WaveformVisualizer({
  isRecording,
  color = '#3B82F6'
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    let offset = 0;
    const draw = () => {
      if (!ctx) return;
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      // Draw line
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      const centerY = rect.height / 2;
      for (let x = 0; x < rect.width; x++) {
        // Create a wave effect
        // If recording, use random noise + sine wave
        // If not recording, flat line
        let y = centerY;
        if (isRecording) {
          const frequency = 0.05;
          const amplitude = rect.height * 0.3;
          const noise = Math.random() * 10;
          y = centerY + Math.sin((x + offset) * frequency) * amplitude * Math.sin((x + offset) * 0.01) + (Math.random() - 0.5) * 10;
        } else {
          y = centerY;
        }
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      if (isRecording) {
        offset += 5;
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, color]);
  return <div className="w-full h-32 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      {!isRecording && <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          Ready to record...
        </div>}
    </div>;
}