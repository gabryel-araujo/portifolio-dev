"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NewCertificatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const body = {
      title: form.get("title") as string,
      issuer: form.get("issuer") as string,
      date: form.get("date") as string,
      credentialUrl: form.get("credentialUrl") as string,
      imageUrl: form.get("imageUrl") as string,
    };

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Falha ao criar certificado");
      router.push("/admin/certificates");
    } catch {
      setError(
        "Erro ao salvar o certificado. Verifique os campos e tente novamente.",
      );
      setSaving(false);
    }
  }

  return (
    <div className="p-8 md:p-12 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/certificates">
          <Button variant="ghost" size="sm" className="rounded-xl gap-2">
            <ArrowLeft size={16} /> Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black">Novo Certificado</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Preencha os campos para adicionar um novo certificado.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">
            Título *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Ex: AWS Certified Developer"
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="issuer">
            Emissor *
          </label>
          <input
            id="issuer"
            name="issuer"
            type="text"
            required
            placeholder="Ex: Amazon Web Services"
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="date">
            Data de Emissão *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="credentialUrl">
            URL da Credencial
          </label>
          <input
            id="credentialUrl"
            name="credentialUrl"
            type="url"
            placeholder="https://www.credential.net/..."
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="imageUrl">
            URL da Imagem
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://..."
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl border border-destructive/20">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={saving}
          className="w-full h-12 text-md font-bold rounded-xl gap-2"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {saving ? "Salvando..." : "Salvar Certificado"}
        </Button>
      </form>
    </div>
  );
}
