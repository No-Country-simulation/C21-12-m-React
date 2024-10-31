import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Client } from '../../domain/entities/Client';
import { PrismaClientRepository } from '../../repositories/client/prisma.client.repository';
import { validateClientData } from '../validator/client.validator';

const clientRepository = new PrismaClientRepository();
const prisma = new PrismaClient();

class ClientService {
  static async createClient(data: any): Promise<Client> {
    const { nombre, estado, prioridad, valor_estimado, encargadoId, origen, email, telefono, ultimo_contacto, expected_close,descripcion } = data;

    const encargadoExists = await prisma.encargado.findUnique({
      where: { id: encargadoId },
    });
  
    if (!encargadoExists) {
      throw new Error('El ID del encargado no es válido.');
    }
  
    const estadoFormatted = estado.toUpperCase().replace(' ', '_');
    const prioridadFormatted = prioridad.toUpperCase().replace(' ', '_');

    return new Client(
      0,
      nombre,
      estadoFormatted,
      prioridadFormatted,
      valor_estimado,
      encargadoId,
      origen,
      email,
      telefono,
      ultimo_contacto ? new Date(ultimo_contacto) : null,
      expected_close ? new Date(expected_close) : null,
      descripcion
    );
  }
}

export const createClient = async (req: Request, res: Response) => {
  try {
    const { error } = validateClientData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    
    const client = await ClientService.createClient(req.body);
    
    
    const createdClient = await clientRepository.create(client);

    
    const response = {
      ...createdClient,
      estado: createdClient.estado.replace('_', ' ').toLowerCase(),
      prioridad: createdClient.prioridad.toLowerCase(),
    };

    res.status(201).json(response);
  } catch (error) {
   
    if (error.message === 'El ID del encargado no es válido.') {
      return res.status(400).json({ error: error.message });
    }
    
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const searchClients = async (req: Request, res: Response) => {
  try {
    const { nombre, estado, prioridad } = req.query;

    const filters: any = {};
    if (nombre) filters.nombre = { contains: String(nombre), mode: 'insensitive' };
    if (estado) filters.estado = { equals: String(estado).toUpperCase().replace(' ', '_') };
    if (prioridad) filters.prioridad = { equals: String(prioridad).toUpperCase().replace(' ', '_') };

    const clients = await prisma.cliente.findMany({
      where: filters,
      include: {
        encargado: true, 
      }
    });

    res.status(200).json(clients);
  } catch (error) {
    console.error('Error searching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientRepository.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await clientRepository.findById(Number(id));

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateClient = async (req: Request, res: Response) => {
  try {
    // Valida solo los campos presentes en `req.body`
    const { error } = validateClientData(req.body, true);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { id } = req.params;

    // Actualiza solo los campos proporcionados en `req.body`
    const updatedClient = await clientRepository.update({ ...req.body, id: Number(id) });

    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await clientRepository.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const deleteMultiClient = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body; // Extraer los IDs del cuerpo de la petición

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Se requiere un array de IDs' });
    }

    // Llamar al repositorio para eliminar los clientes
    await clientRepository.deleteMany(ids);

    return res.status(200).json({ message: 'Clientes eliminados exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error eliminando los clientes' });
  }
};
