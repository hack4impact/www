'use client'

import { Collapsible } from '@base-ui/react/collapsible'
import type { FAQ } from '@/lib/types/contentful'

interface FAQListProps {
  heading?: string
  items: FAQ[]
}

export function FAQList({ heading = 'Common questions', items }: FAQListProps) {
  return (
    <section className='border-t border-[#e8e8e8] px-8 py-16 md:px-16 md:py-20'>
      <div className='mx-auto max-w-[1312px]'>
        <p className='mb-12 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-500'>
          {heading}
        </p>
        {items.map((faq, i) => (
          <Collapsible.Root key={faq.question}>
            <div className='border-t border-[#e8e8e8]'>
              <Collapsible.Trigger className='group flex w-full cursor-pointer items-start gap-8 py-7 text-left'>
                <span className='w-7 shrink-0 font-mono text-[11px] leading-[27px] tracking-[0.05em] text-blue-500'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='flex-1 font-serif text-[19px] leading-[27px] text-[#111111]'>
                  {faq.question}
                </span>
                <span className='shrink-0 font-mono text-[20px] leading-[27px] text-blue-500 transition-transform duration-200 group-data-[panel-open]:rotate-45'>
                  +
                </span>
              </Collapsible.Trigger>
              <Collapsible.Panel
                style={{
                  overflow: 'hidden',
                  height: 'var(--collapsible-panel-height)',
                  transition: 'height 200ms ease',
                }}
              >
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
