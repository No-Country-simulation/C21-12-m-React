import { PrismaClient } from '@prisma/client';
import { Proyecto } from '../../domain/entities/Project';

const prisma = new PrismaClient();

export class PrismaProyectoRepository {
  async create(proyecto: Proyecto): Promise<Proyecto> {
    const createdProyecto = await prisma.proyecto.create({
      data: {
        clienteId: proyecto.clienteId,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        valor: proyecto.valor,
        estado: proyecto.estado,
        fechaInicio: proyecto.fechaInicio,
        fechaCierreEstimada: proyecto.fechaCierreEstimada,
        responsableId: proyecto.responsableId,
      },
      include: {
        responsable: true,
        cliente: true, 
      },
    });

    return new Proyecto(
      createdProyecto.id,
      createdProyecto.clienteId,
      createdProyecto.nombre,
      createdProyecto.descripcion,
      createdProyecto.valor,
      createdProyecto.estado,
      createdProyecto.fechaInicio,
      createdProyecto.fechaCierreEstimada,
      createdProyecto.responsableId
    );
  }

  // Obtener todos los proyectos
  async findAll(): Promise<Proyecto[]> {
    const proyectos = await prisma.proyecto.findMany({
      include: {
        responsable: true,
        cliente: true, 
      },
    });

    return proyectos.map((proyecto) => 
      new Proyecto(
        proyecto.id,
        proyecto.clienteId,
        proyecto.nombre,
        proyecto.descripcion,
        proyecto.valor,
        proyecto.estado,
        proyecto.fechaInicio,
        proyecto.fechaCierreEstimada,
        proyecto.responsableId
      )
    );
  }

  // Obtener un proyecto por ID
  async findById(id: number): Promise<Proyecto | null> {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id },
      include: {
        responsable: true,
        cliente: true,
      },
    });

    if (!proyecto) {
      return null;
    }

    return new Proyecto(
      proyecto.id,
      proyecto.clienteId,
      proyecto.nombre,
      proyecto.descripcion,
      proyecto.valor,
      proyecto.estado,
      proyecto.fechaInicio,
      proyecto.fechaCierreEstimada,
      proyecto.responsableId
    );
  }

  // Actualizar un proyecto
  async update(proyecto: Proyecto): Promise<Proyecto | null> {
    const updatedProyecto = await prisma.proyecto.update({
      where: { id: proyecto.id },
      data: {
        clienteId: proyecto.clienteId,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        valor: proyecto.valor,
        estado: proyecto.estado,
        fechaInicio: proyecto.fechaInicio,
        fechaCierreEstimada: proyecto.fechaCierreEstimada,
        responsableId: proyecto.responsableId,
      },
      include: {
        responsable: true,
        cliente: true,
      },
    });

    if (!updatedProyecto) {
      return null;
    }

    return new Proyecto(
      updatedProyecto.id,
      updatedProyecto.clienteId,
      updatedProyecto.nombre,
      updatedProyecto.descripcion,
      updatedProyecto.valor,
      updatedProyecto.estado,
      updatedProyecto.fechaInicio,
      updatedProyecto.fechaCierreEstimada,
      updatedProyecto.responsableId
    );
  }

  // Eliminar un proyecto
  async delete(id: number): Promise<void> {
    await prisma.proyecto.delete({
      where: { id },
    });
  }
}
