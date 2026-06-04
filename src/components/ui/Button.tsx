'use client'

import { Button as BaseButton } from '@base-ui/react/button'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ComponentProps<typeof BaseButton> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
  secondary:
    'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800',
  outline:
    'border border-black text-black hover:bg-black hover:text-white active:bg-black',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-7 py-3 text-[13px]',
  lg: 'px-8 py-3.5 text-[15px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        'inline-flex items-center justify-center rounded-md font-mono tracking-[0.02em] transition-colors disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
