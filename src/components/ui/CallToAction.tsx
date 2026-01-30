import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CallToActionProps {
  heading: string;
  buttonText: string;
  href: string;
  color?: string;
  id?: string;
}

export function CallToAction({
  heading,
  buttonText,
  href,
  color = "bg-blue-100",
  id,
}: CallToActionProps) {
  return (
    <section id={id} className={`${color} px-8 md:px-12 py-16 md:py-24 scroll-mt-8`}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-sans mb-6">{heading}</h2>
        <Link href={href}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
}
