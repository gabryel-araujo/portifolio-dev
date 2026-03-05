import { ProjectService } from "@/app/api/infra/services/projectService/ProjectService";

const projectService = new ProjectService();

type Ctx = { params: Promise<{ id: string }> };

export const GET = async (req: Request, contexto: Ctx) => {
  const { id } = await contexto.params;

  const data = await projectService.findById(id);
  return Response.json(data, { status: 200 });
};

export const PUT = async (req: Request, contexto: Ctx) => {
  const { id } = await contexto.params;
  const data = await projectService.update(id, JSON.parse(await req.text()));
  return Response.json(data, { status: 200 });
};

export const DELETE = async (req: Request, contexto: Ctx) => {
  const { id } = await contexto.params;
  const data = await projectService.delete(id);
  return Response.json(data, { status: 200 });
};
