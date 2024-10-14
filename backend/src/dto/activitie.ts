import { TipoActividad } from "@prisma/client";

// DTO para crear una actividad
export interface CreateActivitieDTO {
    clienteId: number;
    proyectoId?: number | null;
    fecha: Date;
    tipo: TipoActividad;
    descripcion: string;
    responsableId: string;
  }
  
  // DTO para actualizar una actividad
  export interface UpdateActivitieDTO {
    clienteId?: number;
    proyectoId?: number | null;
    fecha?: Date;
    tipo?: TipoActividad;
    descripcion?: string;
    responsableId?: string;
  }
  