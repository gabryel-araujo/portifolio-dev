import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold tracking-tighter"
        >
          <span>Gabryel Araújo</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/#about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="transition-colors hover:text-primary text-foreground/80 font-medium"
          >
            Projetos
          </Link>
          <Link
            href="/certificates"
            className="transition-colors hover:text-primary text-foreground/80 font-medium flex items-center gap-1"
          >
            Certificados
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-primary text-foreground/80 font-medium"
          >
            Contato
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
