'use client'

import { Collapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'
import type { FAQ } from '@/lib/types/contentful'

interface FAQListProps {
  heading?: string
  items: FAQ[]
  accentColor?: string
}

export function FAQList({
  heading = 'Common questions',
  items,
  accentColor = 'text-blue-500',
}: FAQListProps) {
  return (
    <section className='border-border-subtle border-t px-8 py-16 md:px-16 md:py-20'>
      <div className='mx-auto max-w-[1312px]'>
        <p
          className={cn(
            'mb-12 font-mono text-[11px] tracking-[0.12em] uppercase',
            accentColor,
          )}
        >
          {heading}
        </p>
        {items.map((faq, i) => (
          <Collapsible.Root key={faq.question}>
            <div className='border-border-subtle border-t'>
              <Collapsible.Trigger className='group flex w-full cursor-pointer items-start gap-8 py-7 text-left'>
                <span
                  className={cn(
                    'w-7 shrink-0 font-mono text-[11px] leading-[27px] tracking-[0.05em]',
                    accentColor,
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='flex-1 font-serif text-[19px] leading-[27px] text-black'>
                  {faq.question}
                </span>
                <span
                  className={cn(
                    'shrink-0 font-mono text-[20px] leading-[27px] transition-transform duration-200 group-data-[panel-open]:rotate-45',
                    accentColor,
                  )}
                >
                  +
                </span>
              </Collapsible.Trigger>
              <Collapsible.Panel className='[height:var(--collapsible-panel-height,0px)] overflow-hidden [transition:height_200ms_ease]'>
                <p className='pb-7 pl-[60px] font-sans text-[14px] leading-[22px] text-gray-500'>
                  {faq.answer}
                </p>
              </Collapsible.Panel>
            </div>
          </Collapsible.Root>
        ))}
      </div>
    </section>
  )
}
