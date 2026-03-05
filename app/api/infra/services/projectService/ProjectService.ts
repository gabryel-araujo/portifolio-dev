//classe projeto que ira receber os dados do projeto

import {
  Project,
  CreateProjectDTO,
  UpdateProjectDTO,
} from "@/app/api/infra/domain/Project";
import { CrudService } from "../crudService/CrudService";

export class ProjectService extends CrudService<
  Project,
  CreateProjectDTO,
  UpdateProjectDTO
> {
  constructor() {
    super("projects");
  }
}
