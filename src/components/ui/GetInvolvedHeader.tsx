'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface GetInvolvedHeaderProps {
  label: string
  heading: string
  description: string
  buttonText?: string
  buttonHref?: string
  /** Tailwind text color class applied to the label and decorative watermark */
  accentColor?: string
  /** oklab color string for the top-right radial gradient */
  gradientOklab?: string
  /** When provided, replaces the watermark text with a photo on the right */
  image?: string
  alt?: string
  /** Extra classes applied to the Next.js Image (e.g. 'scale-110 origin-bottom') */
  imageClassName?: string
}

const containerVariants = staggerContainer(0.12, false)
const itemVariants = fadeInUp()

export function GetInvolvedHeader({
  label,
  heading,
  description,
  buttonText,
  buttonHref,
  accentColor = 'text-blue-600',
  gradientOklab = '96.5% -0.005 -0.022',
  image,
  alt,
  imageClassName,
}: GetInvolvedHeaderProps) {
  return (
    <section
      className='relative overflow-hidden border-b border-border-subtle'
      style={{
        backgroundImage: `radial-gradient(circle farthest-corner at 100% 0% in oklab, oklab(${gradientOklab}) 0%, oklab(100% 0 0 / 0%) 60%)`,
      }}
    >
      {/*
        Vertical padding lives on the text column, not the section, so the
        image column can reach flush to the section's bottom edge.
      */}
      <div
        className={cn(
          'relative mx-auto max-w-[1312px] px-8 md:px-16',
          image ? 'grid md:grid-cols-2 md:gap-16' : 'pt-14 pb-14',
        )}
      >
        {/* Animated text content */}
        <motion.div
          className={cn(image && 'pt-14 pb-14')}
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.p
            variants={itemVariants}
            className={cn('mb-5 font-mono text-[11px] tracking-[0.12em] uppercase', accentColor)}
          >
            Get Involved · {label}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className='mb-4 font-serif text-[40px] leading-[48px] font-light tracking-[-0.02em] text-black'
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className='max-w-2xl font-sans text-base leading-6 text-text-muted'
          >
            {description}
          </motion.p>
          {buttonText && buttonHref && (
            <motion.div variants={itemVariants} className='mt-8'>
              <Link href={buttonHref}>
                <Button>{buttonText}</Button>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Right side: image or watermark */}
        {image ? (
          <motion.div
            className='relative hidden h-full md:block'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.3 } }}
          >
            <Image
              fill
              src={image}
              alt={alt ?? ''}
              className={cn('object-contain object-bottom', imageClassName)}
              sizes='(max-width: 1312px) 50vw, 656px'
              priority
            />
          </motion.div>
        ) : (
          <div
            className='pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 select-none md:block'
            aria-hidden='true'
          >
            <span
              className={cn(
                'font-serif text-[100px] leading-none font-light tracking-[-0.02em] opacity-[0.12]',
                accentColor,
              )}
            >
              {label}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
