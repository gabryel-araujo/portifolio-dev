import { login } from "./actions";
import { Button } from "@/components/ui/button";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background blur-2xl opacity-50"></div>

      <div className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-primary via-yellow-400 to-primary">
            Acesso Restrito
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Área exclusiva para administração do portfólio.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@exemplo.com"
              className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          {sp?.error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl border border-destructive/20 text-center">
              {sp.error}
            </div>
          )}

          <Button
            formAction={login}
            className="w-full h-12 text-md font-bold rounded-xl mt-4"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Voltar para o Portfólio
          </a>
        </div>
      </div>
    </div>
  );
}
