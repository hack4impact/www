import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface SplitHeroProps {
  heading: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  image?: { src: string; alt: string } | null;
  gradient?: string;
}

export function SplitHero({
  heading,
  description,
  buttonText,
  buttonHref,
  image,
  gradient,
}: SplitHeroProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
      {image ? (
        <div className="min-h-80 md:min-h-0 aspect-[3/4] md:aspect-auto relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={`min-h-80 md:min-h-0 bg-gradient-to-br ${gradient ?? "from-gray-100 to-gray-200"}`}
        />
      )}

      <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
        <h1 className="font-sans text-3xl md:text-4xl">{heading}</h1>
        {description && (
          <p className="mt-4 text-base md:text-lg font-serif text-gray-600">
            {description}
          </p>
        )}
        {buttonText && buttonHref && (
          <div className="mt-6">
            <Link href={buttonHref}>
              <Button>{buttonText}</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
