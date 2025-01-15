import { create } from 'zustand';
import { Howl } from 'howler';
import type { Track } from '@/types/music';

interface MusicStore {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  sound: Howl | null;
  currentIndex: number;
  setCurrentTrack: (track: Track) => void;
  setPlaylist: (tracks: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  currentTrack: null,
  playlist: [],
  isPlaying: false,
  sound: null,
  currentIndex: -1,

  setCurrentTrack: (track) => {
    const { sound } = get();
    if (sound) {
      sound.unload();
    }

    const newSound = new Howl({
      src: [track.audioUrl],
      html5: true,
      onend: () => {
        get().nextTrack();
      }
    });

    const currentIndex = get().playlist.findIndex(t => t.id === track.id);
    set({ currentTrack: track, sound: newSound, currentIndex, isPlaying: true });
    newSound.play();
  },

  setPlaylist: (tracks) => set({ playlist: tracks }),

  togglePlay: () => {
    const { sound, isPlaying } = get();
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      set({ isPlaying: !isPlaying });
    }
  },

  nextTrack: () => {
    const { playlist, currentIndex } = get();
    if (currentIndex < playlist.length - 1) {
      const nextTrack = playlist[currentIndex + 1];
      get().setCurrentTrack(nextTrack);
    }
  },

  previousTrack: () => {
    const { playlist, currentIndex } = get();
    if (currentIndex > 0) {
      const previousTrack = playlist[currentIndex - 1];
      get().setCurrentTrack(previousTrack);
    }
  },
})); 