import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Client } from '../../domain/entities/Client';
import { PrismaClientRepository } from '../../repositories/client/prisma.client.repository';

const clientRepository = new PrismaClientRepository();
const prisma = new PrismaClient();

export const createClient = async (req: Request, res: Response) => {
  try {
    const { nombre, estado, prioridad, valor_estimado, encargado, origen, email, telefono, ultimo_contacto, expected_close } = req.body;

    const client = new Client(
      0, // ID se autogenera
      nombre,
      estado,
      prioridad,
      valor_estimado,
      encargado,
      origen,
      email,
      telefono,
      ultimo_contacto ? new Date(ultimo_contacto) : null,
      expected_close ? new Date(expected_close) : null
    );

    const createdClient = await clientRepository.create(client);
    res.status(201).json(createdClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Error creating client' });
  }
};

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientRepository.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Error fetching clients' });
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
    res.status(500).json({ error: 'Error fetching client' });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, estado, prioridad, valor_estimado, encargado, origen, email, telefono, ultimo_contacto, expected_close } = req.body;

    const clientToUpdate = new Client(
      Number(id),
      nombre,
      estado,
      prioridad,
      valor_estimado,
      encargado,
      origen,
      email,
      telefono,
      ultimo_contacto ? new Date(ultimo_contacto) : null,
      expected_close ? new Date(expected_close) : null
    );

    const updatedClient = await clientRepository.update(clientToUpdate);

    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Error updating client' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await clientRepository.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Error deleting client' });
  }
};