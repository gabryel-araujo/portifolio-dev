import { CertifiesService } from "@/app/api/infra/services/certifiesService/CertifiesService";

const certifiesService = new CertifiesService();

export const GET = async () => {
  const data = await certifiesService.findAll();
  return Response.json(data, { status: 200 });
};

export const POST = async (req: Request) => {
  const data = await certifiesService.create(JSON.parse(await req.text()));
  return Response.json(data, { status: 201 });
};
