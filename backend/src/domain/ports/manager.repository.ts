import { Manager } from '../../domain/entities/Manager';


export interface ManagerRepository {
  getEncargados(): Promise<Manager[]>;  
}
