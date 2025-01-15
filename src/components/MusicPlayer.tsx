'use client';

import { useState, useEffect } from 'react';
import { useMusicStore } from '@/store/musicStore';
import Image from 'next/image';
import type { MusicPlayerProps } from '@/types/components';

export default function MusicPlayer({}: MusicPlayerProps) {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    previousTrack,
    sound 
  } = useMusicStore();
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (sound) {
      sound.volume(volume / 100);
    }
  }, [volume, sound]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sound && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(sound.seek() as number);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sound, isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="bg-slate-800 border-t border-slate-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 当前播放信息 */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 bg-slate-700 rounded-lg overflow-hidden">
            {currentTrack?.coverImage && (
              <Image 
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">
              {currentTrack?.title || '未播放'}
            </h3>
            <p className="text-slate-400 text-sm">
              {currentTrack?.artist || '未知艺术家'}
            </p>
          </div>
        </div>

        {/* 播放控制 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button 
              className="text-white hover:text-blue-400"
              onClick={previousTrack}
            >
              上一曲
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
              onClick={togglePlay}
            >
              {isPlaying ? '暂停' : '播放'}
            </button>
            <button 
              className="text-white hover:text-blue-400"
              onClick={nextTrack}
            >
              下一曲
            </button>
          </div>
          {sound && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(sound.duration())}</span>
            </div>
          )}
        </div>

        {/* 音量控制 */}
        <div className="flex items-center gap-2">
          <button className="text-white">音量</button>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
} 