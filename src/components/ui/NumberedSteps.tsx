interface Step {
  number: string;
  title: string;
  description: string;
}

interface NumberedStepsProps {
  heading: string;
  steps: Step[];
  id?: string;
}

export function NumberedSteps({ heading, steps, id }: NumberedStepsProps) {
  return (
    <section
      id={id}
      className={`px-8 md:px-12 py-16 md:py-24${id ? " scroll-mt-8" : ""}`}
    >
      <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
        {heading}
      </h2>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
          {steps.map((step) => (
            <div key={step.number} className="py-6 relative">
              <span className="absolute top-6 right-0 font-mono text-gray-400">
                {step.number}
              </span>
              <h3 className="text-lg font-sans mb-1">{step.title}</h3>
              <p className="font-serif text-gray-600 pr-12">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
