"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // Para o seu portfólio, como você terá apenas 1 admin, usamos email/senha simples
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Retornar a string do erro de forma simples em vez de redirecionar imediatamente,
    // ou você pode lançar erro/redirecionar com parametro ?error=
    redirect("/login?error=Credenciais inválidas");
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/admin?error=Erro ao sair da conta");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
