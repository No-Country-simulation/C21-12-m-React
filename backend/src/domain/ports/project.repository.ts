import { Proyecto } from '../entities/Project';

export interface ProyectoRepository {
  create(proyecto: Proyecto): Promise<Proyecto>;
}
