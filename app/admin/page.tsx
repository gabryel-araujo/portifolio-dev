import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Briefcase, Award, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Contadores reais
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: certificateCount } = await supabase
    .from("certificates")
    .select("*", { count: "exact", head: true });

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-black mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta,{" "}
          <strong className="text-foreground">{user?.email}</strong>. Gerencie
          todo o conteúdo do seu portfólio por aqui.
        </p>
      </header>

      {/* Cards de contagem */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projetos */}
        <div className="bg-card border border-border/40 rounded-2xl p-6 space-y-4 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <span className="text-4xl font-black text-foreground">
              {projectCount ?? 0}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Projetos</h3>
            <p className="text-sm text-muted-foreground">
              Total de projetos publicados no portfólio.
            </p>
          </div>
          <div className="flex gap-2 pt-2">
            <Link href="/admin/projects">
              <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                Ver todos <ArrowRight size={14} />
              </Button>
            </Link>
            <Link href="/admin/projects/new">
              <Button size="sm" className="gap-2 rounded-lg">
                <Plus size={14} /> Novo
              </Button>
            </Link>
          </div>
        </div>

        {/* Certificados */}
        <div className="bg-card border border-border/40 rounded-2xl p-6 space-y-4 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <span className="text-4xl font-black text-foreground">
              {certificateCount ?? 0}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Certificados</h3>
            <p className="text-sm text-muted-foreground">
              Total de certificados cadastrados.
            </p>
          </div>
          <div className="flex gap-2 pt-2">
            <Link href="/admin/certificates">
              <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                Ver todos <ArrowRight size={14} />
              </Button>
            </Link>
            <Link href="/admin/certificates/new">
              <Button size="sm" className="gap-2 rounded-lg">
                <Plus size={14} /> Novo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
