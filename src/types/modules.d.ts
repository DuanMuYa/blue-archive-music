declare module '@supabase/supabase-js' {
  export * from '@supabase/supabase-js';
  export { createClient } from '@supabase/supabase-js';
}

declare module 'howler' {
  export interface HowlOptions {
    src: string[];
    html5?: boolean;
    loop?: boolean;
    preload?: boolean;
    volume?: number;
    onend?: () => void;
    onload?: () => void;
    onloaderror?: (id: number, error: any) => void;
    onplay?: () => void;
    onpause?: () => void;
  }

  export class Howl {
    constructor(options: HowlOptions);
    play(): number;
    pause(): this;
    stop(): this;
    unload(): this;
    volume(vol?: number): number | this;
    playing(): boolean;
    duration(): number;
    seek(time?: number): number | this;
    state(): string;
  }
}

declare module 'zustand/vanilla' {
  export * from 'zustand/vanilla';
}

declare module 'tailwindcss/types' {
  export interface Config {
    content: string[];
    theme: {
      extend: Record<string, unknown>;
    };
    plugins: unknown[];
  }
} 