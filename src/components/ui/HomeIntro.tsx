'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Button } from '@/components/ui/Button'

interface HomeIntroProps {
  heroImageUrl?: string
}

const containerVariants = staggerContainer(0.2, false)
const itemVariants = fadeInUp()

export function HomeIntro({ heroImageUrl }: HomeIntroProps) {
  return (
    <section
      className='flex flex-col'
      style={{
        backgroundImage:
          'linear-gradient(in oklab 180deg, oklab(100% 0 0) 25%, oklab(96.4% -0.004 -0.014) 60%, oklab(92.7% -0.010 -0.027) 100%)',
      }}
    >
      {/* Text content */}
      <motion.div
        className='flex shrink-0 flex-col items-center px-8 pt-12 md:px-16 md:pt-20'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.p
          variants={itemVariants}
          className='mb-6 font-mono text-[11px] tracking-[0.12em] text-blue-500 uppercase'
        >
          501(c)(3) nonprofit · est. 2014
        </motion.p>

        <h1 className='flex flex-col items-center'>
          <motion.span
            variants={itemVariants}
            className='max-w-[820px] text-center font-serif text-[40px] leading-[46px] font-light tracking-[-0.02em] text-black sm:text-[52px] sm:leading-[60px] lg:text-[64px] lg:leading-[72px] xl:text-[76px] xl:leading-[84px]'
          >
            Code &amp; community
          </motion.span>
          <motion.span
            variants={itemVariants}
            className='max-w-[820px] text-center font-serif text-[40px] leading-[46px] font-light tracking-[-0.02em] text-blue-500 italic sm:text-[52px] sm:leading-[60px] lg:text-[64px] lg:leading-[72px] xl:text-[76px] xl:leading-[84px]'
          >
            for the common good
          </motion.span>
        </h1>

        <motion.p
          variants={itemVariants}
          className='mt-6 max-w-[560px] text-center font-sans text-lg leading-7 text-[#4a5568]'
        >
          Student teams building free software for nonprofits. Connecting
          technical skills with community need.
        </motion.p>

        <motion.div variants={itemVariants} className='mt-9 flex gap-3'>
          <Link href='/get-involved/nonprofits'>
            <Button>Partner with us</Button>
          </Link>
          <Link href='/get-involved/students'>
            <Button variant='outline'>Start a chapter</Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Fixed gap between buttons and image */}
      <div className='h-8 shrink-0' />

      {heroImageUrl && (
        <motion.div
          className='w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.6 } }}
        >
          <Image
            width={1505}
            height={543}
            className='block h-auto w-full'
            style={{
              filter: 'drop-shadow(10px -2px 4px rgba(36, 126, 128, 0.15))',
            }}
            src={heroImageUrl}
            alt='A group photo of Hack4Impact students'
            priority
            sizes='100vw'
          />
        </motion.div>
      )}
    </section>
  )
}
