declare module 'zustand' {
  import type { StateCreator as ZustandStateCreator } from 'zustand/vanilla';
  
  export type StateCreator<T> = ZustandStateCreator<T>;
  
  export function create<T>(
    stateCreator: StateCreator<T>
  ): (selector?: (state: T) => unknown) => T;
}

declare module 'zustand/vanilla' {
  export type StateCreator<T> = (
    set: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void,
    get: () => T,
    api: {
      setState: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void;
      getState: () => T;
      subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    }
  ) => T;
} 