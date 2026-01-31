interface Stat {
  label: string;
  value: string | number;
}

interface StatBarProps {
  stats: Stat[];
  heading?: string;
}

export function StatBar({ stats, heading }: StatBarProps) {
  return (
    <section className="px-8 md:px-12 py-16 md:py-24">
      {heading && (
        <h2 className="text-3xl font-sans mb-12 text-center">{heading}</h2>
      )}
      <div
        className={`grid grid-cols-2 lg:grid-cols-${stats.length} gap-8 max-w-4xl mx-auto text-center`}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl md:text-5xl font-sans">{stat.value}</p>
            <p className="mt-2 font-serif text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
