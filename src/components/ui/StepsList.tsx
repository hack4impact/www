import type { ProcessStep } from '@/lib/types/contentful'

interface StepsListProps {
  steps: ProcessStep[]
  numbered?: boolean
  stretch?: boolean
}

export function StepsList({
  steps,
  numbered = true,
  stretch = false,
}: StepsListProps) {
  return (
    <div
      className={`flex flex-col divide-y divide-gray-200 border-t border-gray-200${
        stretch ? ' justify-between h-full' : ''
      }`}
    >
      {steps.map((step, i) => (
        <div
          key={step.name}
          className={`relative${
            stretch ? ' flex-1 flex flex-col justify-center py-4' : ' py-6'
          }`}
        >
          {numbered && (
            <span
              className={`absolute right-0 font-mono text-gray-400${
                stretch ? ' top-4' : ' top-6'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className='text-lg font-sans mb-1'>{step.name}</h3>
          <p className={`font-serif text-gray-600${numbered ? ' pr-12' : ''}`}>
            {step.description}
          </p>
        </div>
      ))}
    </div>
  )
}
