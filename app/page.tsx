"use client";

import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Trophy,
  Medal,
  CodeXml,
  Loader2,
} from "lucide-react";
import * as motion from "framer-motion/client";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/marquee";
import { Project } from "./api/infra/domain/Project";
import { useEffect, useState } from "react";

const SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "GraphQL",
  "Docker",
  "Java",
  "Spring Boot",
  "Go lang",
];

export default function Home() {
  const [FEATURED_PROJECTS, setFEATURED_PROJECTS] = useState<Project[]>([]);

  async function getProjectsFeatured() {
    const response = await fetch("/api/projects");
    const projects = await response.json();
    setFEATURED_PROJECTS(
      projects.filter((project: Project) => project.is_featured),
    );
  }

  useEffect(() => {
    getProjectsFeatured();
  }, []);

  return (
    <div className="flex flex-col gap-16 md:gap-32 mb-16 md:mb-24 overflow-hidden">
      {/* HERO SECTION */}
      <section className="container mx-auto px-4 pt-16 md:pt-8 pb-16 max-w-5xl flex flex-col items-center justify-center text-center gap-6 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background blur-2xl opacity-50"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm border-primary/50 text-primary uppercase tracking-widest bg-primary/5"
          >
            Engenheiro Fullstack
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-balance max-w-4xl bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground to-foreground/70"
        >
          Projetando e{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-yellow-400 to-primary">
            desenvolvendo{" "}
          </span>
          soluções{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-yellow-400 to-primary">
            escaláveis
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-2xl text-muted-foreground text-balance max-w-2xl leading-relaxed mt-4"
        >
          Olá, eu sou{" "}
          <strong className="text-foreground font-semibold">
            Gabryel Araújo
          </strong>
          . Construo soluções escaláveis, rápidas e absurdamente incríveis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-medium shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all"
            asChild
          >
            <Link href="/projects">
              Ver Projetos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg border-primary/20 hover:bg-primary/5"
            asChild
          >
            <Link href="#contact">Entrar em Contato</Link>
          </Button>
        </motion.div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="border-y border-border/30 bg-muted/10 py-8 relative">
        <div className="absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background to-transparent z-10" />
        <Marquee direction="left" speed={30} className="py-2">
          {SKILLS.map((skill, i) => (
            <div key={i} className="flex items-center gap-3 px-8">
              <CodeXml className="h-8 w-8 text-primary opacity-50" />
              <span className="text-3xl font-black text-foreground/20 uppercase tracking-wider">
                {skill}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <Section
        id="projects"
        title="Trabalhos em Destaque"
        subtitle="Soluções de alto nível construídas para impactar."
      >
        {FEATURED_PROJECTS.length === 0 && (
          <div className="flex items-center justify-center w-full">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURED_PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button
            variant="ghost"
            className="hover:bg-primary/5 hover:text-primary transition-colors"
            asChild
          >
            <Link href="/projects">
              Ver todos os projetos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* ABOUT SECTION */}
      <Section
        id="about"
        title="Sobre a Jornada"
        subtitle="Construindo o futuro passo a passo."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Sou um engenheiro fullstack com experiência em liderar o
              desenvolvimento de plataformas escaláveis. Meu foco sempre foi
              entregar uma arquitetura sólida aliada a uma experiência de
              usuário premium e inesquecível no front-end.
            </p>
            <p>
              Acredito que o código não deve apenas funcionar, mas deve ser{" "}
              <strong className="text-primary font-medium">
                limpo, testável e estético
              </strong>
              . Do backend ao UI, trato cada projeto como uma peça de arte
              digital.
            </p>
          </div>
          <div className="bg-linear-to-br from-primary/10 to-background border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 text-primary/10 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
              <Trophy className="h-48 w-48" />
            </div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 text-foreground">
              Certificações
            </h3>
            <p className="text-muted-foreground mb-6 relative z-10">
              Reconhecimentos e formações que atestam a qualidade e profundidade
              do meu conhecimento técnico.
            </p>
            <Button
              variant="secondary"
              className="relative z-10 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
              asChild
            >
              <Link href="/certificates">
                <Medal className="mr-2 h-4 w-4" />
                Explorar Certificados
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact" className="py-24">
        <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-background/50 backdrop-blur">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background -z-10" />
          <div className="p-10 md:p-20 text-center max-w-3xl mx-auto space-y-8 relative z-10">
            <h3 className="text-4xl md:text-5xl font-black">
              Vamos construir o extraordinário?
            </h3>
            <p className="text-muted-foreground text-xl">
              Pronto para levar a sua ideia para o próximo nível com um design
              incrível e tecnologia de ponta.
            </p>
            <Button
              size="lg"
              className="mt-8 h-16 px-12 text-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              asChild
            >
              <a href="mailto:placeholder@email.com?subject=Contato via portfólio">
                <Mail className="mr-3 h-6 w-6" />
                Iniciar Projeto
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
