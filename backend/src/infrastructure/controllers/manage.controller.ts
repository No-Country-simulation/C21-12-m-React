import { Request, Response } from 'express';
import { GetManagersUseCase } from '../../application/get.manager.use.case';
import { ManagerRepositoryImpl } from '../../repositories/manager/manager.repository.impl';

export class ManagerController {
  private getManagersUseCase: GetManagersUseCase;

  constructor() {
    const managerRepository = new ManagerRepositoryImpl();
    this.getManagersUseCase = new GetManagersUseCase(managerRepository);
  }

  public async getManagers(req: Request, res: Response): Promise<void> {
    try {
      const managers = await this.getManagersUseCase.execute();
      res.status(200).json(managers);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los encargados' });
    }
  }
}
