'use client'

import { motion } from 'framer-motion'

interface PageIntroProps {
  heading: string
  description: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function PageIntro({ heading, description }: PageIntroProps) {
  return (
    <motion.section
      className='px-8 md:px-12 pt-16 md:pt-24 pb-8 md:pb-12'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.h1
        className='text-3xl md:text-4xl font-serif mb-4 text-center'
        variants={itemVariants}
      >
        {heading}
      </motion.h1>
      <motion.p
        className='font-sans text-gray-600 text-center max-w-2xl mx-auto'
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.section>
  )
}
