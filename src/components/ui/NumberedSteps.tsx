import { ReactNode } from "react";
import type { ProcessStep } from "@/lib/types/contentful";

interface NumberedStepsProps {
  heading: string;
  steps: ProcessStep[];
  /** Show step numbers (01, 02, ...) in the top-right corner */
  numbered?: boolean;
  id?: string;
  aside?: ReactNode;
  headingClassName?: string;
}

function StepsList({
  steps,
  numbered,
  stretch,
}: {
  steps: ProcessStep[];
  numbered: boolean;
  stretch?: boolean;
}) {
  return (
    <div
      className={`flex flex-col divide-y divide-gray-200 border-t border-gray-200${
        stretch ? " justify-between h-full" : ""
      }`}
    >
      {steps.map((step, i) => (
        <div
          key={step.name}
          className={`relative${
            stretch
              ? " flex-1 flex flex-col justify-center py-4"
              : " py-6"
          }`}
        >
          {numbered && (
            <span
              className={`absolute right-0 font-mono text-gray-400${
                stretch ? " top-4" : " top-6"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <h3 className="text-lg font-sans mb-1">{step.name}</h3>
          <p className={`font-serif text-gray-600${numbered ? " pr-12" : ""}`}>
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function NumberedSteps({
  heading,
  steps,
  numbered = true,
  id,
  aside,
  headingClassName,
}: NumberedStepsProps) {
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
          <StepsList steps={steps} numbered={numbered} stretch />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <StepsList steps={steps} numbered={numbered} />
        </div>
      )}
    </section>
  );
}
