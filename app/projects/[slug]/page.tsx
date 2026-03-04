import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const paramsValue = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", paramsValue.slug)
    .single();

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: `${project.title} | Gabryel Araújo`,
    description: project.description,
  };
}

// Fallback visual mock if Supabase fails or doesn't have the project
const getMockProject = (slug: string) => ({
  title: "Project Alpha",
  description:
    "Mock de visualização. Configure o banco Supabase com a tabela projects para exibir o conteúdo dinamicamente.",
  date: "2024-01-01",
  tags: ["Supabase", "React", "Tailwind"],
  githubUrl: "https://github.com",
  demoUrl: "https://demo.com",
  content: `## Visão Geral\n\nEste é um texto renderizado utilizando **react-markdown**.\n\nAbaixo você verá a estrutura de uma tabela.\n\n| Stack | Uso |\n|---|---|\n| React | UI |\n| Supabase | Backend |\n\nLembre-se de adicionar projetos na tabela \`projects\` para eles aparecerem aqui.`,
});

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const paramsValue = await params;

  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", paramsValue.slug)
    .single();

  const displayProject =
    error || !project ? getMockProject(paramsValue.slug) : project;

  const formattedDate = displayProject.date
    ? format(parseISO(displayProject.date), "MMMM 'de' yyyy", { locale: ptBR })
    : "";

  return (
    <article className="container mx-auto px-4 py-32 max-w-4xl mb-16 border border-primary/10 rounded-3xl bg-background/50 backdrop-blur shadow-2xl mt-12">
      <div className="space-y-8 p-4 md:p-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-8 -ml-3 text-muted-foreground hover:text-primary"
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para projetos
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-primary">
            {formattedDate && (
              <time
                dateTime={displayProject.date}
                className="capitalize font-medium"
              >
                {formattedDate}
              </time>
            )}
            {displayProject.tags?.map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-normal border-primary/30 text-primary"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-400 to-primary">
            {displayProject.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {displayProject.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-primary/20">
          {displayProject.githubUrl && (
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
              asChild
            >
              <a
                href={displayProject.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Repositório
              </a>
            </Button>
          )}
          {displayProject.demoUrl && (
            <Button
              className="shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              asChild
            >
              <a href={displayProject.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>

        <div
          className="prose prose-neutral dark:prose-invert prose-lg max-w-none pt-12 border-t border-primary/20 
          prose-headings:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted/30 prose-pre:border prose-pre:border-primary/20"
        >
          <ReactMarkdown>{displayProject.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
