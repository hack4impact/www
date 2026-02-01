interface PageIntroProps {
  heading: string
  description: string
}

export function PageIntro({ heading, description }: PageIntroProps) {
  return (
    <section className='px-8 md:px-12 pt-16 md:pt-24 pb-8 md:pb-12'>
      <h1 className='text-3xl md:text-4xl font-serif mb-4 text-center'>
        {heading}
      </h1>
      <p className='font-sans text-gray-600 text-center max-w-2xl mx-auto'>
        {description}
      </p>
    </section>
  )
}
