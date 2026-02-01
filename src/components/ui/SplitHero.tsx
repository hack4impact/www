import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

interface SplitHeroProps {
  heading: string
  description?: string
  buttonText?: string
  buttonHref?: string
  gradient?: string
  image?: string
  alt?: string
}

export function SplitHero({
  heading,
  description,
  buttonText,
  buttonHref,
  gradient = 'from-gray-100 to-gray-200',
  image,
  alt,
}: SplitHeroProps) {
  return (
    <section className='grid min-h-[70vh] grid-cols-1 md:grid-cols-2'>
      <div
        className={`relative min-h-80 bg-gradient-to-br md:min-h-0 ${gradient}`}
      >
        {image && (
          <Image
            fill
            className='object-cover'
            src={image}
            alt={alt || 'Side banner image for hero section'}
          />
        )}
      </div>

      <div className='flex flex-col items-start justify-center bg-[#FCF9F2] p-8 md:p-12'>
        <h1 className='font-sans text-3xl md:text-4xl'>{heading}</h1>
        {description && (
          <p className='mt-4 font-serif text-base text-gray-600 md:text-lg'>
            {description}
          </p>
        )}
        {buttonText && buttonHref && (
          <div className='mt-6'>
            <Link href={buttonHref}>
              <Button>{buttonText}</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
