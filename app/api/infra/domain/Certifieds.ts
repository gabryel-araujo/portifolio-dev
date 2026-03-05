export interface Certifieds {
  id: string;
  createdAt: string;
  title: string;
  issuer: string;
  date: Date;
  credentialUrl: string;
  imageUrl: string;
}

export type CreateCertifiedsDTO = Omit<Certifieds, "id" | "createdAt">;
export type UpdateCertifiedsDTO = Partial<CreateCertifiedsDTO>;
