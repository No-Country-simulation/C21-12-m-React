// src/domain/entities/Client.ts

export class Client {
  constructor(
    public id: number,
    public nombre: string,
    public estado: string,
    public prioridad: string,
    public valor_estimado: number | null,
    public managerId: string | null, // Cambiado de encargado a managerId
    public origen: string,
    public email: string,
    public telefono: string,
    public ultimo_contacto: Date | null,
    public expected_close: Date | null,
  ) {}
}
