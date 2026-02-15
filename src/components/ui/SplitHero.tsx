'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface SplitHeroProps {
  heading: string
  description?: string
  buttonText?: string
  buttonHref?: string
  gradient?: string
  image?: string
  alt?: string
  imageClassName?: string
}

const containerVariants = staggerContainer(0.1, false)
const itemVariants = fadeInUp()

export function SplitHero({
  heading,
  description,
  buttonText,
  buttonHref,
  gradient = 'from-gray-100 to-gray-200',
  image,
  alt,
  imageClassName,
}: SplitHeroProps) {
  return (
    <section className='grid min-h-[70vh] grid-cols-1 md:grid-cols-2'>
      <div
        className={`relative min-h-80 bg-gradient-to-br md:min-h-0 ${gradient}`}
      >
        {image && (
          <Image
            fill
            className={imageClassName || 'object-cover'}
            src={image}
            alt={alt || 'Side banner image for hero section'}
            priority
          />
        )}
      </div>

      <motion.div
        className='flex flex-col items-start justify-center bg-[#FCF9F2] p-8 md:p-12'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.h1 className='font-sans text-3xl md:text-4xl' variants={itemVariants}>
          {heading}
        </motion.h1>
        {description && (
          <motion.p
            className='mt-4 font-serif text-base text-gray-600 md:text-lg'
            variants={itemVariants}
          >
            {description}
          </motion.p>
        )}
        {buttonText && buttonHref && (
          <motion.div className='mt-6' variants={itemVariants}>
            <Link href={buttonHref}>
              <Button>{buttonText}</Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
