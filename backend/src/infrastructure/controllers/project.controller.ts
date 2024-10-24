import { Request, Response } from 'express';
import { PrismaProyectoRepository } from '../../repositories/project/project.repository.impl';
import { Proyecto } from '../../domain/entities/Project';
import { validateProjectData } from '../validator/project.validator';

const proyectoRepository = new PrismaProyectoRepository();

class ProjectService {
  static async createProject(data: any): Promise<Proyecto> {
    const { clienteId, nombre, descripcion, valor, estado, fechaInicio, fechaCierreEstimada, responsableId } = data;

    // Formatear el estado a mayúsculas y reemplazar espacios por guiones bajos
    const estadoFormatted = estado.toUpperCase().replace(' ', '_');

    return new Proyecto(
      0,
      clienteId,
      nombre,
      descripcion,
      valor,
      estadoFormatted,
      new Date(fechaInicio),
      new Date(fechaCierreEstimada),
      responsableId
    );
  }
}

export const createProyecto = async (req: Request, res: Response) => {
  try {
    // Validar los datos del proyecto
    const { error } = validateProjectData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Crear el proyecto usando el servicio
    const proyecto = await ProjectService.createProject(req.body);
    const createdProyecto = await proyectoRepository.create(proyecto);

    // Formatear el estado en la respuesta
    const response = {
      ...createdProyecto,
      estado: createdProyecto.estado.replace('_', ' ').toLowerCase(),
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await proyectoRepository.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await proyectoRepository.findById(Number(id));

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    // Validar los datos del proyecto
    const { error } = validateProjectData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { id } = req.params;
    const projectToUpdate = await ProjectService.createProject({ ...req.body, id: Number(id) });

    const updatedProject = await proyectoRepository.update(projectToUpdate);

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await proyectoRepository.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
