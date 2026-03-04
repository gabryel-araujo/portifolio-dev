import { Metadata } from "next";

export function constructMetadata({
  title = "Gabryel Araújo | Fullstack Developer",
  description = "Portfólio de Gabryel Araújo, Engenheiro Fullstack focado em Next.js e Node.js.",
  image = "/og-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@gabryelaraujo",
    },
    icons,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
