import { ReactNode } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface NumberedStepsProps {
  heading: string;
  steps: Step[];
  id?: string;
  aside?: ReactNode;
  headingClassName?: string;
}

function StepsList({ steps, stretch }: { steps: Step[]; stretch?: boolean }) {
  return (
    <div
      className={`flex flex-col divide-y divide-gray-200 border-t border-gray-200${
        stretch ? " justify-between h-full" : ""
      }`}
    >
      {steps.map((step) => (
        <div
          key={step.number}
          className={`relative${
            stretch
              ? " flex-1 flex flex-col justify-center py-4"
              : " py-6"
          }`}
        >
          <span
            className={`absolute right-0 font-mono text-gray-400${
              stretch ? " top-4" : " top-6"
            }`}
          >
            {step.number}
          </span>
          <h3 className="text-lg font-sans mb-1">{step.title}</h3>
          <p className="font-serif text-gray-600 pr-12">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

export function NumberedSteps({ heading, steps, id, aside, headingClassName }: NumberedStepsProps) {
  return (
    <section
      id={id}
      className={`px-8 md:px-12 py-16 md:py-24${id ? " scroll-mt-8" : ""}`}
    >
      <h2 className={`text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center ${headingClassName ?? ""}`}>
        {heading}
      </h2>
      {aside ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {aside}
          <StepsList steps={steps} stretch />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <StepsList steps={steps} />
        </div>
      )}
    </section>
  );
}
