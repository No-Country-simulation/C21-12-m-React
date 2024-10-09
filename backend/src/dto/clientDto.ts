// src/dto/ClientDTO.ts
export class ClientDTO {
    id: number;
    nombre: string;
    estado: string;
    prioridad: string;
    valor_estimado: number;
    encargado: string;
    origen: string;
    email: string;
    telefono: string;
    ultimo_contacto: Date;
    expected_close: Date;
  
    constructor(data: any) {
      this.id = data.id;
      this.nombre = data.nombre;
      this.estado = data.estado;
      this.prioridad = data.prioridad;
      this.valor_estimado = data.valor_estimado;
      this.encargado = data.encargado;
      this.origen = data.origen;
      this.email = data.email;
      this.telefono = data.telefono;
      this.ultimo_contacto = data.ultimo_contacto;
      this.expected_close = data.expected_close;
    }
  }
  