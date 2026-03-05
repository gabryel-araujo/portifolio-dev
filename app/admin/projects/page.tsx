"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project } from "@/app/api/infra/domain/Project";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Star, Loader2 } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchProjects() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Tem certeza que deseja excluir o projeto "${title}"?`))
      return;

    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Projetos</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie todos os projetos do seu portfólio.
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="gap-2 rounded-xl">
            <Plus size={16} /> Novo Projeto
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Nenhum projeto encontrado.
          </p>
          <Link href="/admin/projects/new">
            <Button className="mt-4 gap-2 rounded-xl">
              <Plus size={16} /> Criar Primeiro Projeto
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border border-border/40 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Título
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">
                  Tags
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-muted-foreground hidden sm:table-cell">
                  Destaque
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-border/20 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{project.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
                        {project.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center hidden sm:table-cell">
                    {project.is_featured && (
                      <Star
                        size={16}
                        className="text-primary inline-block fill-primary"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                        onClick={() =>
                          router.push(`/admin/projects/edit/${project.id}`)
                        }
                      >
                        <Pencil size={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(project.id, project.title)}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
