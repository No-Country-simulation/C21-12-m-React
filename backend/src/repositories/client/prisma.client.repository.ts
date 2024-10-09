import { PrismaClient } from '@prisma/client';
import { ClientRepository } from './client.repository';
import { ClientDTO } from '../../dto/clientDto';
import { Client } from '../../domain/entities/Client';

const prisma = new PrismaClient();

export class PrismaClientRepository implements ClientRepository {
  async create(client: Client): Promise<Client> {
    const createdClient = await prisma.client.create({
      data: {
        nombre: client.nombre,
        estado: client.estado,
        prioridad: client.prioridad,
        valor_estimado: client.valor_estimado,
        encargado: client.encargado,
        origen: client.origen,
        email: client.email,
        telefono: client.telefono,
        ultimo_contacto: client.ultimo_contacto,
        expected_close: client.expected_close,
      },
    });

    return new ClientDTO(createdClient);
  }

  async findAll(): Promise<Client[]> {
    const clients = await prisma.client.findMany();
    return clients.map(client => new ClientDTO(client));
  }

  async findById(id: number): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) return null;

    return new Client(
      client.id,
      client.nombre,
      client.estado,
      client.prioridad,
      client.valor_estimado,
      client.encargado,
      client.origen,
      client.email,
      client.telefono,
      client.ultimo_contacto,
      client.expected_close
    );
  }

  async update(client: Client): Promise<Client> {
    const updatedClient = await prisma.client.update({
      where: { id: client.id },
      data: {
        nombre: client.nombre,
        estado: client.estado,
        prioridad: client.prioridad,
        valor_estimado: client.valor_estimado,
        encargado: client.encargado,
        origen: client.origen,
        email: client.email,
        telefono: client.telefono,
        ultimo_contacto: client.ultimo_contacto,
        expected_close: client.expected_close,
      },
    });

    return new Client(
      updatedClient.id,
      updatedClient.nombre,
      updatedClient.estado,
      updatedClient.prioridad,
      updatedClient.valor_estimado,
      updatedClient.encargado,
      updatedClient.origen,
      updatedClient.email,
      updatedClient.telefono,
      updatedClient.ultimo_contacto,
      updatedClient.expected_close
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.client.delete({
      where: { id },
    });
  }
}
