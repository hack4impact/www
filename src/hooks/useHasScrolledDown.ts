'use client'

import { useState, useEffect } from 'react';

export function useHasScrolledDown() {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  const onScroll = (e: Event) => {
    setHasScrolledDown((e.target as Document).documentElement.scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  return hasScrolledDown;
};
