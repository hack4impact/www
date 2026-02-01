'use client'

import { Button as BaseButton } from '@base-ui/react/button'
import { ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ComponentProps<typeof BaseButton> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-green-300 text-black hover:bg-green-400 active:bg-green-500',
  secondary:
    'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800',
  outline:
    'border border-green-300 text-green-300 hover:bg-green-50 active:bg-green-100',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={`inline-flex items-center justify-center font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
