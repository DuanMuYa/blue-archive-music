/// <reference types="next" />
/// <reference types="next/navigation" />
/// <reference types="next/image-types/global" />

import type { ComponentType } from 'react';

declare module 'next/dynamic' {
  type LoaderComponent<P = {}> = Promise<ComponentType<P> | { default: ComponentType<P> }>;

  export default function dynamic<P = {}>(
    loader: () => LoaderComponent<P>,
    options?: {
      loading?: ComponentType;
      ssr?: boolean;
      suspense?: boolean;
    }
  ): ComponentType<P>;
}

declare module 'next/image' {
  import type { ImageProps } from 'next/dist/client/image';
  const Image: ComponentType<ImageProps>;
  export default Image;
} 