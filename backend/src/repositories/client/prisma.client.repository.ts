import { PrismaClient } from '@prisma/client';
import { ClientRepository } from '../../domain/ports/client.repository';
import { ClientDTO } from '../../dto/clientDto';
import { Client } from '../../domain/entities/Client';

const prisma = new PrismaClient();

export class PrismaClientRepository implements ClientRepository {
  // Método para crear un cliente
  async create(client: Client): Promise<Client> {
    const createdClient = await prisma.cliente.create({
      data: {
        nombre: client.nombre,
        estado: client.estado,
        prioridad: client.prioridad,
        valorEstimado: client.valor_estimado, 
        encargadoId: client.encargadoId,
        origen: client.origen,
        email: client.email,
        telefono: client.telefono,
        ultimoContacto: client.ultimo_contacto,
        fechaCierreEstimada: client.expected_close, 
      },
      include: {
        encargado: true, 
      },
    });

    // Retornar como Client entity
    return new Client(
      createdClient.id,
      createdClient.nombre,
      createdClient.estado,
      createdClient.prioridad,
      createdClient.valorEstimado,
      createdClient.encargadoId,
      createdClient.origen,
      createdClient.email,
      createdClient.telefono,
      createdClient.ultimoContacto,
      createdClient.fechaCierreEstimada,
      createdClient.encargado?.nombre, 
      createdClient.encargado?.avatar
    );
  }

  // Método para obtener todos los clientes
  async findAll(): Promise<Client[]> {
    const clients = await prisma.cliente.findMany({
      include: {
        encargado: true, 
      },
    });
  
    // Mapear todos los clientes obtenidos a Client entity e incluir los datos del encargado
    return clients.map(client => new Client(
      client.id,
      client.nombre,
      client.estado,
      client.prioridad,
      client.valorEstimado,
      client.encargadoId,
      client.origen,
      client.email,
      client.telefono,
      client.ultimoContacto,
      client.fechaCierreEstimada,
      client.encargado?.nombre, 
      client.encargado?.avatar
    ));
  }
  

  // Método para obtener un cliente por su ID
  async findById(id: number): Promise<Client | null> {
    const client = await prisma.cliente.findUnique({
      where: { id },
      include: {
        encargado: true, 
      },
    });

    if (!client) return null;

    // Crear una instancia de Client utilizando los datos obtenidos
    return new Client(
      client.id,
      client.nombre,
      client.estado,
      client.prioridad,
      client.valorEstimado,
      client.encargadoId,
      client.origen,
      client.email,
      client.telefono,
      client.ultimoContacto,
      client.fechaCierreEstimada
    );
  }


async update(client: Partial<Client>): Promise<Client> {
  const dataToUpdate = Object.fromEntries(
    Object.entries({
      nombre: client.nombre,
      estado: client.estado,
      prioridad: client.prioridad ? client.prioridad.toUpperCase() : undefined,
      valor_estimado: client.valor_estimado,
      encargadoId: client.encargadoId,
      origen: client.origen,
      email: client.email,
      telefono: client.telefono,
      ultimo_contacto: client.ultimo_contacto,
      fechaCierreEstimada: client.expected_close,
    }).filter(([_, value]) => value !== undefined)
  );

  // Realizar la actualización en la base de datos
  const updatedClient = await prisma.cliente.update({
    where: { id: client.id },
    data: dataToUpdate,
    include: { encargado: true },
  });
  
  // Mapear el resultado al tipo Client
  return {
    id: updatedClient.id,
    nombre: updatedClient.nombre,
    estado: updatedClient.estado,
    prioridad: updatedClient.prioridad,
    valor_estimado: updatedClient.valorEstimado,
    encargadoId: updatedClient.encargadoId,
    origen: updatedClient.origen,
    email: updatedClient.email,
    telefono: updatedClient.telefono,
    ultimo_contacto: updatedClient.ultimoContacto,
    expected_close: updatedClient.fechaCierreEstimada
    
  };
}




  // Método para eliminar un cliente
  async delete(id: number): Promise<void> {
    // Borrar el cliente por su ID
    await prisma.cliente.delete({
      where: { id },
    });
  }
  // Método para eliminar múltiples clientes
async deleteMany(ids: number[]): Promise<void> {
  await prisma.cliente.deleteMany({
    where: {
      id: {
        in: ids, 
      },
    },
  });
}

}

