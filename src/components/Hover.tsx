'use client'

import { useEffect, useRef } from 'react';
import styles from './Hover.module.scss';

interface Props {
  color?: string;
}

export default function Hover({ color }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!container.current) return;

    const currentContainer = container.current;

    function mouseMoveEvent(e: MouseEvent) {
      const { x } = currentContainer.getBoundingClientRect();
      currentContainer.style.setProperty('--px', `${e.clientX - x}`);
      color && currentContainer.style.setProperty('--color', color);
    }
    currentContainer.addEventListener('mousemove', mouseMoveEvent);

    return () => {
      currentContainer.removeEventListener('mousemove', mouseMoveEvent);
    };
  }, [color]);

  return <div ref={container} className={styles.hover}></div>;
};
