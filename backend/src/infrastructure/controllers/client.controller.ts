import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Client } from '../../domain/entities/Client';
import { PrismaClientRepository } from '../../repositories/client/prisma.client.repository';
import { validateClientData } from '../validator/client.validator';

const clientRepository = new PrismaClientRepository();
const prisma = new PrismaClient();

class ClientService {
  static async createClient(data: any): Promise<Client> {
    const { nombre, estado, prioridad, valor_estimado, managerId, origen, email, telefono, ultimo_contacto, expected_close } = data;

    
    const estadoFormatted = estado.toUpperCase().replace(' ', '_');
    const prioridadFormatted = prioridad.toUpperCase().replace(' ', '_');

    return new Client(
      0, 
      nombre,
      estadoFormatted,
      prioridadFormatted,
      valor_estimado,
      managerId,
      origen,
      email,
      telefono,
      ultimo_contacto ? new Date(ultimo_contacto) : null,
      expected_close ? new Date(expected_close) : null
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
    console.error('Error creating client:', error);
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
    const { error } = validateClientData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { id } = req.params;
    const clientToUpdate = await ClientService.createClient({ ...req.body, id: Number(id) });

    const updatedClient = await clientRepository.update(clientToUpdate);

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
