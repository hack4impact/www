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
  primary:
    'bg-blue-500 text-white hover:bg-green-300 hover:text-black active:bg-blue-500',
  secondary:
    'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800',
  outline:
    'border border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
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
        'inline-flex items-center justify-center rounded font-mono font-medium transition-colors focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50',
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
