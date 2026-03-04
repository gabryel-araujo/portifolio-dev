import { Trophy, ExternalLink, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

import { Section } from "@/components/section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificados | Gabryel Araújo",
  description: "Formações, diplomas e certificações profissionais.",
};

// Fallback mock caso a tabela do supabase não exista ou não tenha dados ainda
const MOCK_CERTIFICATES = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023-09-15",
    credential_url: "https://aws.amazon.com",
  },
  {
    id: 2,
    title: "Frontend Masters - Advanced Advanced Next.js",
    issuer: "Frontend Masters",
    date: "2023-05-10",
    credential_url: "https://frontendmasters.com",
  },
];

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: certificates, error } = await supabase
    .from("certificates")
    .select("*")
    .order("date", { ascending: false });

  const displayCertificates =
    error || !certificates?.length ? MOCK_CERTIFICATES : certificates;

  return (
    <div className="mb-24">
      <Section
        id="certificates"
        title="Certificações"
        subtitle="O aprendizado não para. Histórico de especializações e credenciais."
        className="pt-24 md:pt-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCertificates.map((cert) => (
            <Card
              key={cert.id}
              className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] border-border/40"
            >
              <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="line-clamp-2 text-xl">
                  {cert.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium">
                  {cert.issuer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground bg-muted/30 w-fit px-3 py-1 rounded-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  {cert.date}
                </div>
              </CardContent>
              <CardFooter>
                {cert.credential_url && (
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver Credencial
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
