export class ProyectoDTO {
    id: number;
    clienteId: number;
    nombre: string;
    descripcion: string;
    valor: number;
    estado: 'PAUSADO' |'ACTIVO' |'COMPLETO'| 'CERRADO';
    fechaInicio: Date;
    fechaCierreEstimada: Date;
    responsableId: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.clienteId = data.clienteId;
      this.nombre = data.nombre;
      this.descripcion = data.descripcion;
      this.valor = data.valor;
      this.estado = data.estado as 'PAUSADO' | 'ACTIVO' | 'COMPLETO'| 'CERRADO';
      this.fechaInicio = new Date(data.fechaInicio);
      this.fechaCierreEstimada = new Date(data.fechaCierreEstimada);
      this.responsableId = data.responsableId;
    }
  }
  