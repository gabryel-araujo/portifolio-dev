export interface Project {
  id: string;
  createdAt: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  is_featured: boolean;
}

export type CreateProjectDTO = Omit<Project, "id" | "createdAt">;
export type UpdateProjectDTO = Partial<CreateProjectDTO>;
