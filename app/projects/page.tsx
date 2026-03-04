import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Projetos | Gabryel Araújo",
  description: "Trabalhos, cases e projetos open-source.",
};

const MOCK_PROJECTS = [
  {
    title: "Project Alpha",
    description:
      "Sistema financeiro de alta escalabilidade. (Mock via Supabase em breve)",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    slug: "project-alpha",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    title: "Golden Dashboard",
    description:
      "Analytics em tempo real com UI premium. (Mock via Supabase em breve)",
    tags: ["React", "PostgreSQL", "Charts"],
    slug: "golden-dashboard",
    githubUrl: "https://github.com",
  },
  {
    title: "E-commerce Luxury",
    description:
      "Plataforma de vendas focada em conversão. (Mock via Supabase em breve)",
    tags: ["Next.js", "Stripe", "Framer Motion"],
    slug: "ecommerce-luxury",
    demoUrl: "https://demo.com",
  },
];

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const displayProjects = error || !projects?.length ? MOCK_PROJECTS : projects;

  return (
    <div className="mb-24">
      <Section
        id="all-projects"
        title="Todos os Projetos"
        subtitle="Uma coleção dos meus trabalhos recentes e projetos abertos."
        className="pt-24 md:pt-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project: any) => (
            <div
              key={project.slug}
              className="group transition-all hover:-translate-y-1 duration-300"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
