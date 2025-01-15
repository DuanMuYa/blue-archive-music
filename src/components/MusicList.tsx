'use client';

import { useEffect } from 'react';
import { useMusicStore } from '@/store/musicStore';
import type { Track } from '@/types/music';
import type { MusicListProps } from '@/types/components';
import { supabase } from '@/lib/supabase';

export default function MusicList({}: MusicListProps) {
  const { playlist, setPlaylist, setCurrentTrack, currentTrack } = useMusicStore();

  useEffect(() => {
    async function fetchTracks() {
      try {
        const { data, error } = await supabase
          .from('tracks')
          .select('*')
          .order('title', { ascending: true });
        
        if (error) throw error;
        if (data) {
          setPlaylist(data as Track[]);
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    }

    fetchTracks();
  }, [setPlaylist]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">播放列表</h2>
      
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {playlist.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            暂无音乐
          </div>
        ) : (
          playlist.map((track) => (
            <div 
              key={track.id}
              className={`flex items-center justify-between p-2 hover:bg-slate-700 rounded-lg cursor-pointer ${
                currentTrack?.id === track.id ? 'bg-slate-700' : ''
              }`}
              onClick={() => setCurrentTrack(track)}
            >
              <div>
                <h3 className="font-medium">{track.title}</h3>
                <p className="text-sm text-slate-400">
                  {track.artist || '未知艺术家'} · {track.category}
                </p>
              </div>
              <span className="text-slate-400">
                {formatDuration(track.duration)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 