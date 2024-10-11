// src/domain/entities/Client.ts

import { EstadoProyecto, Prioridad } from "@prisma/client";

export class Client {
  constructor(
    public id: number,
    public nombre: string,
    public estado: 'CONTACTO_INICIAL' | 'EN_PROGRESO' | 'CERRADO',
    public prioridad: Prioridad,
    public valor_estimado: number | null,
    public managerId: string | null, 
    public origen: string,
    public email: string,
    public telefono: string,
    public ultimo_contacto: Date | null,
    public expected_close: Date | null,
    public managerNombre?: string, // Manager's name
    public managerAvatar?: string // Manager's avatar
  ) {}
}
