/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import type { Howl } from 'howler';
import type { Track } from './music';

declare global {
  interface Window {
    currentSound?: Howl;
  }

  namespace NodeJS {
    interface ProcessEnv {
      readonly NEXT_PUBLIC_SUPABASE_URL: string;
      readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      readonly DATABASE_URL: string;
    }
  }
}

export {}; 