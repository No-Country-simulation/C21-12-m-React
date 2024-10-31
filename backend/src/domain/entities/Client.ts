// src/domain/entities/Client.ts

import { Prioridad } from "@prisma/client";

export class Client {
  static descripcion: any;
  constructor(
    public id: number,
    public nombre: string,
    public estado: 'CONTACTO' | 'REUNION' | 'PROPUESTA' |'NEGOCIACION',
    public prioridad: Prioridad,
    public valor_estimado: number | null,
    public encargadoId: string | null, 
    public origen: string,
    public email: string,
    public telefono: string,
    public ultimo_contacto: Date | null,
    public expected_close: Date | null,
    public descripcion?: string,
    public managerNombre?: string,
    public managerAvatar?: string
  ) {}
}
