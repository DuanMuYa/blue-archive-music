'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { MusicPlayerProps } from '@/components/MusicPlayer';
import type { MusicListProps } from '@/components/MusicList';
import type { VisualizerProps } from '@/components/Visualizer';

const MusicPlayer = dynamic<MusicPlayerProps>(
  () => import('@/components/MusicPlayer').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="p-4 text-center">加载中...</div>
  }
);

const MusicList = dynamic<MusicListProps>(
  () => import('@/components/MusicList').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="p-4 text-center">加载中...</div>
  }
);

const Visualizer = dynamic<VisualizerProps>(
  () => import('@/components/Visualizer').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="p-4 text-center">加载中...</div>
  }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">基沃托斯音乐盒</h1>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Visualizer />
          </div>
          
          <div className="lg:col-span-4">
            <MusicList />
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0">
        <MusicPlayer />
      </div>
    </div>
  );
} 