import { Section } from "@/components/section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Gabryel Araújo",
  description: "Artigos sobre programação e tech.",
};

export default function BlogPage() {
  return (
    <div className="mb-24">
      <Section
        id="blog"
        title="Blog"
        subtitle="Em breve novos artigos sobre Next.js, arquitetura de software e carreira."
        className="pt-24 md:pt-32"
      >
        <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 border border-border/40 rounded-2xl h-64">
          <h3 className="text-xl font-medium mb-2">Nenhum post publicado</h3>
          <p className="text-muted-foreground">
            Estou preparando alguns conteúdos interessantes. Volte em breve!
          </p>
        </div>
      </Section>
    </div>
  );
}
