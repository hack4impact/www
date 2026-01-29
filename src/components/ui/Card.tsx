import { ReactNode } from "react";

interface CardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function Card({ icon, title, description, className = "" }: CardProps) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-sans mb-2">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  );
}
