// clientDTO.js

export class ClientDTO {
    constructor(data) {
      
      this.nombre = data.nombre;
      this.estado = data.estado;
      this.prioridad = data.prioridad;
      this.valor_estimado = data.valorEstimado || null;
      this.encargadoId = data.encargadoId;
      this.origen = data.origen;
      this.email = data.email;
      this.telefono = data.telefono;
      this.ultimo_contacto = data.ultimoContacto || null;
      this.expected_close = data.expectedClose || null;
    }
  }
  