'use client';

import { useEffect, useRef } from 'react';
import { useMusicStore } from '@/store/musicStore';
import type { VisualizerProps } from '@/types/components';

export default function Visualizer({}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { sound, isPlaying, currentTrack } = useMusicStore();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 5 + 2,
        speedY: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1
      };
    };

    const render = () => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 显示当前播放状态
      if (!currentTrack) {
        ctx.fillStyle = '#475569';
        ctx.font = '20px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('等待播放...', canvas.width / 2, canvas.height / 2);
      }

      if (isPlaying) {
        if (Math.random() < 0.1) {
          particles.push(createParticle());
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.y -= p.speedY;
          p.opacity -= 0.005;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(')', `, ${p.opacity})`);
          ctx.fill();

          if (p.y + p.size < 0 || p.opacity <= 0) {
            particles.splice(i, 1);
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, currentTrack]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-[400px] rounded-lg bg-slate-800"
    />
  );
} 