import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@/components/tag";
import { Button } from "@/components/ui/button";

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  slug: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  demoUrl,
  slug,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md hover:border-foreground/20">
      <CardHeader>
        <CardTitle className="line-clamp-1">
          <Link href={`/projects/${slug}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source
            </a>
          </Button>
        )}
        {demoUrl && (
          <Button size="sm" asChild>
            <a href={demoUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
