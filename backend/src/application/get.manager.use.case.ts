import { ManagerRepository } from '../domain/ports/manager.repository';
import { Encargado } from '../domain/entities/Manager';

export class GetManagersUseCase {
  constructor(private readonly managerRepository: ManagerRepository) {}

  public async execute(): Promise<Encargado[]> {
    return await this.managerRepository.getEncargados();
  }
}
