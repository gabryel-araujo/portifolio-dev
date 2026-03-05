import { CertifiesService } from "@/app/api/infra/services/certifiesService/CertifiesService";

const certifiesService = new CertifiesService();

type Ctx = { params: Promise<{ id: string }> };

export const GET = async (req: Request, contexto: Ctx) => {
  const { id } = await contexto.params;

  const data = await certifiesService.findById(id);
  return Response.json(data, { status: 200 });
};

export const PUT = async (req: Request, contexto: Ctx) => {
  const { id } = await contexto.params;
  const data = await certifiesService.update(id, JSON.parse(await req.text()));
  return Response.json(data, { status: 200 });
};

export const DELETE = async (req: Request, contexto: Ctx) => {
  const { id } = await contexto.params;
  const data = await certifiesService.delete(id);
  return Response.json(data, { status: 200 });
};
