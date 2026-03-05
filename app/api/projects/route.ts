import { ProjectService } from "@/app/api/infra/services/projectService/ProjectService";

const projectService = new ProjectService();

export const GET = async () => {
  const data = await projectService.findAll();
  return Response.json(data, { status: 200 });
};

export const POST = async (req: Request) => {
  const data = await projectService.create(JSON.parse(await req.text()));
  return Response.json(data, { status: 201 });
};
