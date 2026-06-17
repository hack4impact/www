'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { Easing, HTMLMotionProps, Transition, motion } from 'framer-motion'
import { TEXT_CLASS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface CollapsibleProps {
  title: string
  content: ReactNode
  i: number
  color: string
}
const ease: Easing = [0.4, 0, 0.2, 1]
const transition: Transition = { duration: 0.2, ease }

export function Collapsible({ title, content, i, color }: CollapsibleProps) {
  const [open, setOpen] = useState(false)

  return (
    <BaseCollapsible.Root open={open} onOpenChange={setOpen}>
      <div className='border-separator border-t'>
        <BaseCollapsible.Trigger className='flex w-full cursor-pointer items-start gap-8 py-7 text-left'>
          <span
            className={cn(
              'w-7 shrink-0 font-mono text-[11px] leading-[27px] tracking-[0.05em]',
              TEXT_CLASS[color],
            )}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className='text-inverse flex-1 font-serif text-[19px] leading-[27px]'>
            {title}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={transition}
            className={cn(
              'shrink-0 font-mono text-[20px] leading-[27px]',
              TEXT_CLASS[color],
            )}
          >
            +
          </motion.span>
        </BaseCollapsible.Trigger>
        <BaseCollapsible.Panel
          keepMounted
          hidden={undefined}
          render={(props, state) => (
            <motion.div
              {...(props as HTMLMotionProps<'div'>)}
              style={{ ...props.style, overflow: 'hidden' }}
              initial={false}
              animate={{
                height: state.open ? 'auto' : 0,
                opacity: state.open ? 1 : 0,
              }}
              transition={transition}
            />
          )}
        >
          <div className='text-gray-3 pb-7 pl-[60px] font-sans text-[14px] leading-[22px]'>
            {content}
          </div>
        </BaseCollapsible.Panel>
      </div>
    </BaseCollapsible.Root>
  )
}
