import { ReactNode } from "react";
import { logout } from "../login/actions";
import Link from "next/link";
import { LogOut, LayoutDashboard, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Sidebar Administrativa */}
      <aside className="w-64 border-r border-border/40 bg-card/30 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-border/40">
          <Link
            href="/admin"
            className="text-xl font-black bg-clip-text text-transparent bg-linear-to-r from-primary via-yellow-400 to-primary"
          >
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium"
          >
            <Briefcase size={20} />
            Projetos
          </Link>
          <Link
            href="/admin/certificates"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium"
          >
            <Award size={20} />
            Certificados
          </Link>
        </nav>

        <div className="p-4 border-t border-border/40">
          <form action={logout}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-12"
            >
              <LogOut size={20} />
              Sair
            </Button>
          </form>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto w-full">{children}</main>
    </div>
  );
}
