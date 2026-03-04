import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  title?: string;
  subtitle?: string;
}

export function Section({
  id,
  title,
  subtitle,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "container mx-auto max-w-5xl px-4 py-16 md:py-24 space-y-8",
        className,
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="space-y-4">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
