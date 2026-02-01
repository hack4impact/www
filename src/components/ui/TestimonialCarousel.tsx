'use client'

import { useState } from 'react'

interface Testimonial {
  gradient?: string
  quote: string
  name: string
  title: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

const defaultGradients = [
  'from-green-100 to-green-300',
  'from-blue-100 to-blue-300',
  'from-purple-100 to-purple-300',
]

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0)

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  const current = testimonials[index]
  const gradient =
    current.gradient ?? defaultGradients[index % defaultGradients.length]

  return (
    <section className='px-8 md:px-12 py-16 md:py-24'>
      <div className='max-w-4xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center'>
          <div className='relative aspect-[4/3] w-full max-w-sm mx-auto md:mx-0'>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          </div>

          <div>
            <blockquote className='font-sans text-xl md:text-2xl'>
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className='mt-6'>
              <p className='font-sans text-base'>{current.name}</p>
              <p className='font-serif text-sm text-gray-600'>
                {current.title}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className='mt-8 flex items-center gap-3 w-full'>
          <button
            onClick={prev}
            aria-label='Previous testimonial'
            className='text-gray-400 hover:text-gray-900 transition-colors'
          >
            &#8592;
          </button>
          <div className='flex-1 flex gap-1.5'>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i === index ? 'bg-green-300' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label='Next testimonial'
            className='text-gray-400 hover:text-gray-900 transition-colors'
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  )
}
