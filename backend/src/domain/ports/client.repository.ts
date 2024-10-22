

import { Client } from '../entities/Client';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | null>;
  update(client: Client): Promise<Client>;
  delete(id: number): Promise<void>;
  deleteMany(ids: number[]): Promise<void>;
}