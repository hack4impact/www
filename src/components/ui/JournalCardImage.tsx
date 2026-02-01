'use client'

import { useState } from 'react'
import { PaperTexture } from '@paper-design/shaders-react'

export function JournalCardImage({ src }: { src: string }) {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {/* 1. Pre-load the image in the background */}
      <img
        src={src}
        alt=''
        className='hidden'
        onLoad={() => setIsReady(true)}
      />

      {/* 2. Render shader only when pixels are ready */}
      {isReady && (
        <PaperTexture
          image={src}
          scale={1}
          // Using object-cover here ensures the shader canvas
          // scales to fill the parent without distortion
          className='absolute inset-0 h-full w-full object-cover'
        />
      )}

      {/* 3. Placeholder to prevent layout shift */}
      {!isReady && (
        <div className='absolute inset-0 h-full w-full animate-pulse bg-gray-100' />
      )}
    </div>
  )
}
