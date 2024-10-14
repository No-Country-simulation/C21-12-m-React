import { Request, Response } from 'express';
import { PrismaActivitieRepository } from '../../repositories/activitie/activitie.repository.impl';
import { Activitie } from '../../domain/entities/activitie';
import { validateActivitieData } from '../validator/activitie.validator';

const activitieRepository = new PrismaActivitieRepository();

class ActivitieService {
  static async createActivitie(data: any): Promise<Activitie> {
    const { clienteId, proyectoId, fecha, tipo, descripcion, responsableId } = data;

    // Formatear el tipo a mayúsculas y reemplazar espacios por guiones bajos
    const tipoFormatted = tipo.toUpperCase().replace(' ', '_');

    return new Activitie(
      0, // Asumiendo que este será el ID autogenerado por la base de datos
      clienteId,
      proyectoId,
      new Date(fecha),
      tipoFormatted,
      descripcion,
      responsableId
    );
  }
}

export const createActivitie = async (req: Request, res: Response) => {
  try {
    // Validar los datos de la actividad
    const { error } = validateActivitieData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Crear la actividad usando el servicio
    const activitie = await ActivitieService.createActivitie(req.body);
    const createdActivitie = await activitieRepository.create(activitie);

    // Formatear el tipo en la respuesta
    const response = {
      ...createdActivitie,
      tipo: createdActivitie.tipo.replace('_', ' ').toLowerCase(),
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating activitie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await activitieRepository.findAll();
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getActivitieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activitie = await activitieRepository.findById(Number(id));

    if (!activitie) {
      return res.status(404).json({ error: 'Activitie not found' });
    }

    res.status(200).json(activitie);
  } catch (error) {
    console.error('Error fetching activitie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateActivitie = async (req: Request, res: Response) => {
  try {
    // Validar los datos de la actividad
    const { error } = validateActivitieData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { id } = req.params;
    const activitieToUpdate = await ActivitieService.createActivitie({ ...req.body, id: Number(id) });

    const updatedActivitie = await activitieRepository.update(activitieToUpdate);

    if (!updatedActivitie) {
      return res.status(404).json({ error: 'Activitie not found' });
    }

    res.status(200).json(updatedActivitie);
  } catch (error) {
    console.error('Error updating activitie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteActivitie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await activitieRepository.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting activitie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
