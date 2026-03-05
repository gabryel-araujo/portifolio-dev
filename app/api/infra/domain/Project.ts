export interface Project {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  github_url: string;
  demo_url: string;
  is_featured: boolean;
}

export type CreateProjectDTO = Omit<Project, "id" | "created_at">;
export type UpdateProjectDTO = Partial<CreateProjectDTO>;
