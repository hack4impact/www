'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface HomeIntroProps {
  heroImageUrl?: string
}

const containerVariants = staggerContainer(0.2, false)
const itemVariants = fadeInUp()

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.6,
    },
  },
}

export function HomeIntro({ heroImageUrl }: HomeIntroProps) {
  return (
    <section className='relative pb-32'>
      {/* Gradient background */}
      <div className='absolute inset-0 bottom-1/3 bg-gradient-to-b from-blue-100 via-blue-100 via-60% to-green-50' />

      {/* Content */}
      <motion.div
        className='relative px-8 pt-24 text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <h1 className='flex flex-col'>
          <motion.span variants={itemVariants} className='font-serif text-5xl'>
            Code &amp; community
          </motion.span>
          <motion.span variants={itemVariants} className='font-serif text-5xl'>
            for the common good
          </motion.span>
        </h1>
        <motion.p
          className='mx-auto mt-4 max-w-2xl text-base md:text-lg'
          variants={itemVariants}
        >
          Committed to supporting nonprofits and social good initiatives, Hack
          for Impact educates and connects student volunteers, in search of
          real-world experience, with nonprofit partners that address crucial
          community needs.
        </motion.p>
        <motion.div className='mt-6' variants={itemVariants}>
          <Link href='/get-involved/nonprofits'>
            <Button>Partner with us!</Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Gradient block below hero */}
      <motion.div
        className='relative mt-8 flex justify-center px-8'
        variants={imageVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='relative aspect-[8/5] w-full max-w-[800px] overflow-hidden bg-gradient-to-br from-blue-200 to-green-100'>
          {heroImageUrl && (
            <Image
              fill
              className='scale-110 object-contain object-bottom'
              src={heroImageUrl}
              alt='A group photo of students from the UPenn chapter'
              priority
            />
          )}
        </div>
      </motion.div>
    </section>
  )
}
