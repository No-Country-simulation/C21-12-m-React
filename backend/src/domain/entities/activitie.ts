export class Activitie {
  id: number;
  clienteId: number;
  proyectoId?: number | null;
  fecha: Date;
  tipo: 'LLAMADA' | 'REUNION' | 'EMAIL' | 'OTRO';
  descripcion: string;
  responsableId: string;

  constructor(
    id: number,
    clienteId: number,
    proyectoId: number | null,
    fecha: Date,
    tipo: 'LLAMADA' | 'REUNION' | 'EMAIL' | 'OTRO',
    descripcion: string,
    responsableId: string
  ) {
    this.id = id;
    this.clienteId = clienteId;
    this.proyectoId = proyectoId;
    this.fecha = fecha;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.responsableId = responsableId;
  }
}
