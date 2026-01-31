import Image from "next/image";
import { type ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface CardGridItem {
  icon?: string | ReactNode;
  title: string;
  description: string;
}

interface CardGridProps {
  heading: string;
  items: CardGridItem[];
  columns?: 3 | 4;
  description?: string;
  className?: string;
}

export function CardGrid({
  heading,
  items,
  columns = 3,
  description,
  className = "",
}: CardGridProps) {
  const gridCols =
    columns === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 lg:grid-cols-3";

  return (
    <section className={`px-8 md:px-12 py-16 md:py-24 ${className}`}>
      <h2
        className={`font-sans text-center ${
          description
            ? "text-2xl md:text-3xl mb-4"
            : "text-3xl mb-12"
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p className="font-serif text-gray-600 text-center max-w-2xl mx-auto mb-12">
          {description}
        </p>
      )}
      <div className={`grid ${gridCols} gap-8`}>
        {items.map((item) => (
          <Card
            key={item.title}
            icon={
              item.icon
                ? typeof item.icon === "string"
                  ? <Image src={item.icon} alt="" width={45} height={45} />
                  : item.icon
                : undefined
            }
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
