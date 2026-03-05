"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NewProjectPage() {
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
      slug:
        (form.get("slug") as string) ||
        (form.get("title") as string)
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      description: form.get("description") as string,
      content: form.get("content") as string,
      tags: (form.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github_url: form.get("github_url") as string,
      demo_url: form.get("demo_url") as string,
      is_featured: form.get("is_featured") === "on",
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Falha ao criar projeto");
      router.push("/admin/projects");
    } catch {
      setError(
        "Erro ao salvar o projeto. Verifique os campos e tente novamente.",
      );
      setSaving(false);
    }
  }

  return (
    <div className="p-8 md:p-12 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" size="sm" className="rounded-xl gap-2">
            <ArrowLeft size={16} /> Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black">Novo Projeto</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Preencha os campos para adicionar um novo projeto ao portfólio.
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
            placeholder="Ex: Meu Projeto Incrível"
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            placeholder="meu-projeto-incrivel (gerado automaticamente se vazio)"
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="description">
            Descrição *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="Uma breve descrição do projeto..."
            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="content">
            Conteúdo (Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            placeholder="Conteúdo detalhado do projeto em Markdown..."
            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="tags">
            Tags *
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            required
            placeholder="Next.js, TypeScript, Supabase (separadas por vírgula)"
            className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="github_url">
              GitHub URL
            </label>
            <input
              id="github_url"
              name="github_url"
              type="url"
              placeholder="https://github.com/..."
              className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="demo_url">
              Demo URL
            </label>
            <input
              id="demo_url"
              name="demo_url"
              type="url"
              placeholder="https://meu-projeto.vercel.app"
              className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="is_featured"
            name="is_featured"
            type="checkbox"
            className="h-5 w-5 rounded-md border-input accent-primary"
          />
          <label className="text-sm font-medium" htmlFor="is_featured">
            Destacar este projeto na página inicial
          </label>
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
          {saving ? "Salvando..." : "Salvar Projeto"}
        </Button>
      </form>
    </div>
  );
}
