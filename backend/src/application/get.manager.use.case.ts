import { ManagerRepository } from '../domain/ports/manager.repository';
import { Manager } from '../domain/entities/Manager';

export class GetManagersUseCase {
  constructor(private readonly managerRepository: ManagerRepository) {}

  public async execute(): Promise<Manager[]> {
    return await this.managerRepository.getEncargados();
  }
}
