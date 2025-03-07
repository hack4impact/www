import { useEffect, useRef } from 'react';
import styles from './Hover.module.scss';

export default function Hover({ color }: Props) {
  const container = useRef(null);

  useEffect(() => {
    function mouseMoveEvent(e) {
      const { x } = container.current.getBoundingClientRect();
      container.current.style.setProperty('--px', e.clientX - x);
      color && container.current.style.setProperty('--color', color);
    }
    container.current.addEventListener('mousemove', mouseMoveEvent);

    return () => {
      container.current.removeEventListener('mousemove', mouseMoveEvent);
    };
  }, []);

  return <div ref={container} className={styles.hover}></div>;
}
