import { PrismaClient } from '@prisma/client';
import { ClientRepository } from '../../domain/ports/client.repository';
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
        managerId: client.managerId, // Asignación del encargado mediante managerId
        origen: client.origen,
        email: client.email,
        telefono: client.telefono,
        ultimo_contacto: client.ultimo_contacto,
        expected_close: client.expected_close,
      },
      include: {
        manager: true, // Incluir el manager relacionado
      },
    });

    return new ClientDTO(createdClient); // Retorno del DTO con los datos completos, incluido el manager
  }

  async findAll(): Promise<Client[]> {
    const clients = await prisma.client.findMany({
      include: {
        manager: true, // Incluir el manager relacionado en cada cliente
      },
    });
    
    // Mapear todos los clientes obtenidos a ClientDTO
    return clients.map(client => new ClientDTO(client));
  }

  async findById(id: number): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        manager: true, // Incluir el manager relacionado
      },
    });

    if (!client) return null;

    // Crear una instancia de Client utilizando los datos obtenidos
    return new Client(
      client.id,
      client.nombre,
      client.estado,
      client.prioridad,
      client.valor_estimado,
      client.managerId, // managerId en lugar de encargado
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
        managerId: client.managerId, // Actualización del managerId
        origen: client.origen,
        email: client.email,
        telefono: client.telefono,
        ultimo_contacto: client.ultimo_contacto,
        expected_close: client.expected_close,
      },
      include: {
        manager: true, // Incluir el manager relacionado
      },
    });

    // Crear una instancia de Client actualizada
    return new Client(
      updatedClient.id,
      updatedClient.nombre,
      updatedClient.estado,
      updatedClient.prioridad,
      updatedClient.valor_estimado,
      updatedClient.managerId,
      updatedClient.origen,
      updatedClient.email,
      updatedClient.telefono,
      updatedClient.ultimo_contacto,
      updatedClient.expected_close
    );
  }

  async delete(id: number): Promise<void> {
    // Borrar el cliente por su ID
    await prisma.client.delete({
      where: { id },
    });
  }
}
