import { Encargado } from '../../domain/entities/Manager';


export interface ManagerRepository {
  getEncargados(): Promise<Encargado[]>;  
}
