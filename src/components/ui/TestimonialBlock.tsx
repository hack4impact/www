'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface Testimonial {
  quote: string
  name: string
  title?: string
}

interface TestimonialBlockProps {
  testimonials: Testimonial[]
  accentColor?: string
}

const containerVariants = staggerContainer(0.15, false)
const itemVariants = fadeInUp()

export function TestimonialBlock({
  testimonials,
  accentColor = 'text-blue-500',
}: TestimonialBlockProps) {
  const single = testimonials.length === 1

  return (
    <section className='border-border-subtle border-t px-8 py-16 md:px-12 md:py-24'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.p
          variants={itemVariants}
          className={`mb-10 font-mono text-[11px] tracking-[0.12em] uppercase ${accentColor}`}
        >
          In their words
        </motion.p>

        <div
          className={
            single
              ? 'max-w-[680px]'
              : 'grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12'
          }
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={itemVariants} className='flex flex-col'>
              <blockquote className='font-serif text-[26px] leading-[36px] font-light tracking-[-0.01em] text-black italic'>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className='border-border-subtle mt-8 border-t pt-6'>
                <p className='font-sans text-[15px] font-medium leading-[18px] text-black'>
                  {t.name}
                </p>
                {t.title && (
                  <p className='mt-1 font-mono text-[11px] leading-[14px] tracking-[0.06em] text-gray-500'>
                    {t.title}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
