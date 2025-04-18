'use client'

import { useState, useEffect, useRef } from 'react';
import styles from '@/components/home/AnimatedRole.module.scss';

const ANIM_INTERVAL = 2250;
const WIPE_ANIM_DURATION = 500;

export default function AnimatedRole() {
  const roles = ['Engineers', 'Designers', 'Activists', 'Humanitarians'];
  const [roleIndex, setRoleIndex] = useState(0);
  const textRef = useRef<HTMLElement>(null);
  const wipeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (textRef?.current && wipeRef?.current) {
      textRef.current.style.setProperty('--width', `${textRef.current.clientWidth}`);
      wipeRef.current.animate(
        [
          { transform: 'skew(-20deg) scaleX(0)', transformOrigin: 'left' },
          {
            transform: 'skew(-20deg) scaleX(1)',
            transformOrigin: 'left',
          },
          {
            transform: 'skew(-20deg) scaleX(1)',
            transformOrigin: 'right',
          },
          { transform: 'skew(-20deg) scaleX(0)', transformOrigin: 'right' },
        ],
        {
          duration: WIPE_ANIM_DURATION,
          delay: ANIM_INTERVAL - WIPE_ANIM_DURATION / 2,
          easing: 'ease-in-out',
        },
      );
    }
  }, [roleIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
    }, ANIM_INTERVAL);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span ref={textRef} className={styles.role_name}>
      {roles[roleIndex]}
      <span ref={wipeRef} className={styles.wipe_anim}></span>
    </span>
  );
};
