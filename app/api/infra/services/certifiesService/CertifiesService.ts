import {
  Certifieds,
  CreateCertifiedsDTO,
  UpdateCertifiedsDTO,
} from "@/app/api/infra/domain/Certifieds";
import { CrudService } from "../crudService/CrudService";

export class CertifiesService extends CrudService<
  Certifieds,
  CreateCertifiedsDTO,
  UpdateCertifiedsDTO
> {
  constructor() {
    super("certificates");
  }

  read(): Promise<Certifieds[]> {
    return super.findAll();
  }
}
