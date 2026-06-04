'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
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
  /** Extra classes applied to the text content column (e.g. custom vertical padding) */
  contentClassName?: string
}

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
  contentClassName,
}: GetInvolvedHeaderProps) {
  return (
    <section
      className='border-border-subtle relative overflow-hidden border-b'
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
          'relative mx-auto px-8 md:px-16',
          image ? 'grid md:grid-cols-2 md:gap-16' : 'pt-14 pb-14',
        )}
      >
        {/* Text content */}
        <div className={cn(image && 'pt-14 pb-14', contentClassName)}>
          <p
            className={cn(
              'mb-5 font-mono text-[11px] tracking-[0.12em] uppercase',
              accentColor,
            )}
          >
            Get Involved · {label}
          </p>
          <h1 className='mb-4 font-serif text-[40px] leading-[48px] font-light tracking-[-0.02em] text-black'>
            {heading}
          </h1>
          <p className='text-text-muted max-w-2xl font-sans text-base leading-6'>
            {description}
          </p>
          {buttonText && buttonHref && (
            <div className='mt-8'>
              <Link href={buttonHref}>
                <Button>{buttonText}</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right side: image or watermark */}
        {image ? (
          <motion.div
            className='hidden h-full md:block'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.3 } }}
          >
            {/*
              Wrap in a relative div with a right margin so the fill image
              doesn't reach the section edge — fill ignores parent padding.
            */}
            <div className='relative h-full mr-8 md:mr-16'>
              <Image
                fill
                src={image}
                alt={alt ?? ''}
                className={cn('object-contain object-bottom', imageClassName)}
                sizes='50vw'
                priority
              />
            </div>
          </motion.div>
        ) : (
          /*
            Constrain to the right half of the container so the watermark
            stays in position regardless of how wide the section gets.
          */
          <div
            className='pointer-events-none absolute inset-y-0 left-1/2 right-0 hidden select-none overflow-hidden md:flex md:items-center md:justify-end md:pr-8 lg:pr-16'
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
