'use client'

import styles from '@/components/AnimatedSpring.module.scss';
import { motion } from 'framer-motion';


export default function AnimatedSpring() {
  return (
    <motion.div
      className={styles.mission}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, scale: 0 },
        show: {
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 0.6,
          },
        },
      }}>
      <p>
        To empower engineers, designers, activists, and humanitarians to create{' '}
        <strong>lasting and impactful social change</strong>, fostering the wider adoption of
        software as a tool for social good.
      </p>
    </motion.div>
  )
}
