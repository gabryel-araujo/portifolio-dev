"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Certifieds } from "@/app/api/infra/domain/Certifieds";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certifieds[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchCertificates() {
    setLoading(true);
    const res = await fetch("/api/certificates");
    const data = await res.json();
    setCertificates(data);
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Tem certeza que deseja excluir o certificado "${title}"?`))
      return;

    await fetch(`/api/certificates/${id}`, { method: "DELETE" });
    fetchCertificates();
  }

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Certificados</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gerencie todos os seus certificados e cursos.
          </p>
        </div>
        <Link href="/admin/certificates/new">
          <Button className="gap-2 rounded-xl">
            <Plus size={16} /> Novo Certificado
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Nenhum certificado encontrado.
          </p>
          <Link href="/admin/certificates/new">
            <Button className="mt-4 gap-2 rounded-xl">
              <Plus size={16} /> Adicionar Primeiro Certificado
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
                  Emissor
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground hidden sm:table-cell">
                  Data
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr
                  key={cert.id}
                  className="border-b border-border/20 hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold">{cert.title}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-muted-foreground">
                      {cert.date
                        ? new Date(cert.date).toLocaleDateString("pt-BR")
                        : "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                        onClick={() =>
                          router.push(`/admin/certificates/edit/${cert.id}`)
                        }
                      >
                        <Pencil size={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(cert.id, cert.title)}
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
