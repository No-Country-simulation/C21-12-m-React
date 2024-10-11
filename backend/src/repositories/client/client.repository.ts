// src/repositories/client/ClientRepository.ts

import { Client } from '../../domain/entities/Client';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | null>;
  update(client: Client): Promise<Client>;
  delete(id: number): Promise<void>;
}