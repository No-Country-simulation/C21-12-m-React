import { PrismaClient } from '@prisma/client';
import { Activitie } from '../../domain/entities/activitie';

const prisma = new PrismaClient();

export class PrismaActivitieRepository {
  // Crear una nueva actividad
  async create(activitie: Activitie): Promise<Activitie> {
    const createdActivitie = await prisma.actividad.create({
      data: {
        clienteId: activitie.clienteId,
        proyectoId: activitie.proyectoId,
        fecha: activitie.fecha,
        tipo: activitie.tipo,
        descripcion: activitie.descripcion,
        responsableId: activitie.responsableId,
      },
      include: {
        responsable: true,
        cliente: true,
        proyecto: true,
      },
    });

    return new Activitie(
      createdActivitie.id,
      createdActivitie.clienteId,
      createdActivitie.proyectoId,
      createdActivitie.fecha,
      createdActivitie.tipo,
      createdActivitie.descripcion,
      createdActivitie.responsableId
    );
  }

  // Obtener todas las actividades
  async findAll(): Promise<Activitie[]> {
    const activities = await prisma.actividad.findMany({
      include: {
        responsable: true,
        cliente: true,
        proyecto: true,
      },
    });

    return activities.map((activitie) =>
      new Activitie(
        activitie.id,
        activitie.clienteId,
        activitie.proyectoId,
        activitie.fecha,
        activitie.tipo,
        activitie.descripcion,
        activitie.responsableId
      )
    );
  }

  // Obtener una actividad por ID
  async findById(id: number): Promise<Activitie | null> {
    const activitie = await prisma.actividad.findUnique({
      where: { id },
      include: {
        responsable: true,
        cliente: true,
        proyecto: true,
      },
    });

    if (!activitie) {
      return null;
    }

    return new Activitie(
      activitie.id,
      activitie.clienteId,
      activitie.proyectoId,
      activitie.fecha,
      activitie.tipo,
      activitie.descripcion,
      activitie.responsableId
    );
  }

  // Actualizar una actividad
  async update(activitie: Activitie): Promise<Activitie | null> {
    const updatedActivitie = await prisma.actividad.update({
      where: { id: activitie.id },
      data: {
        clienteId: activitie.clienteId,
        proyectoId: activitie.proyectoId,
        fecha: activitie.fecha,
        tipo: activitie.tipo,
        descripcion: activitie.descripcion,
        responsableId: activitie.responsableId,
      },
      include: {
        responsable: true,
        cliente: true,
        proyecto: true,
      },
    });

    if (!updatedActivitie) {
      return null;
    }

    return new Activitie(
      updatedActivitie.id,
      updatedActivitie.clienteId,
      updatedActivitie.proyectoId,
      updatedActivitie.fecha,
      updatedActivitie.tipo,
      updatedActivitie.descripcion,
      updatedActivitie.responsableId
    );
  }

  // Eliminar una actividad
  async delete(id: number): Promise<void> {
    await prisma.actividad.delete({
      where: { id },
    });
  }
}
