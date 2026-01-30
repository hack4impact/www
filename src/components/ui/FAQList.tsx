interface FAQ {
  question: string;
  answer: string;
}

interface FAQListProps {
  heading?: string;
  items: FAQ[];
}

export function FAQList({ heading = "Common questions", items }: FAQListProps) {
  return (
    <section className="px-8 md:px-12 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
        {heading}
      </h2>
      <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-gray-200">
        {items.map((faq) => (
          <div key={faq.question} className="py-6">
            <h3 className="font-sans text-lg mb-2">{faq.question}</h3>
            <p className="font-serif text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
