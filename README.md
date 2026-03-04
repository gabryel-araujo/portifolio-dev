# Portfólio Dev (Gabryel Araújo)

Bem-vindo ao repositório do seu novo portfólio, construído utilizando Next.js App Router, Tailwind CSS, shadcn/ui e TypeScript. O projeto está configurado para excelente performance (Core Web Vitals), SEO e acessibilidade (Dark Mode padrão).

## 🚀 Como Rodar Localmente

Certifique-se de ter o Node.js e o **pnpm** instalados.

1. Instale as dependências:

   ```bash
   pnpm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📝 Como Editar o Conteúdo (MDX)

O portfólio não precisa de um banco de dados para os projetos e blog posts. Todo o conteúdo é gerenciado através de arquivos `.mdx`.

- **Projetos:** Vá em `/content/projects/`. Crie ou edite arquivos `.mdx`. Cada arquivo deve conter um "frontmatter" (as linhas entre os `---` no topo) com as propriedades: `title`, `description`, `date` (YYYY-MM-DD), `tags` (array), `githubUrl` (opcional), `demoUrl` (opcional) e `highlight` (opcional).

- **Blog:** O diretório `/content/blog/` está preparado, e as rotas `/blog` também, para futuras expansões (caso decida publicar artigos).

- **Home:** O conteúdo da Home (ex: About, Experience, Hero) está definido estaticamente no arquivo `app/page.tsx`. Basta alterá-lo com seus textos definitivos trocando os placeholders.

## 🎨 Personalização de Estilo e Tema

- Usamos `next-themes` para gerenciar as cores. O Dark Mode é o padrão.
- Para alterar cores ou tipografia, edite `app/globals.css`.
- É possível criar novos componentes do shadcn/ui localmente pela CLI (`pnpm dlx shadcn@latest add [componente]`).

## ✅ Todo (Próximos Passos de Iteração)

1. Substituir os Textos Placeholder na `app/page.tsx` (Bio curta, links sociais, experiências anteriores).
2. Deletar (ou editar) os arquivos mock. Deletar `barber-saas.mdx` e `openclaw.mdx` depois de criar os originais.
3. Adicionar uma OpenGraph Image (`og-image.jpg`) real na pasta `/public` com as dimensões recomendadas (1200x630).
4. Adicionar Favicon definitivo (`favicon.ico`) na pasta `/public`.
5. Substituir as URIs de contato do seu Github, LinkedIn e Email nas views (`Header`, `Footer` e `Home`).
6. Fazer o deploy do projeto conectando esse repo com a Vercel. Nada mais é necessário, o Next fará a build automática.

Feito com 💙 para o dev do futuro.
