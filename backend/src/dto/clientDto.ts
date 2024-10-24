export class ClientDTO {
  id: number;
  nombre: string;
  estado: 'CONTACTO' | 'REUNION' | 'PROPUESTA' | 'NEGOCIACION';
  prioridad: 'ALTA'|'MEDIA' |'BAJA';
  valor_estimado: number | null;
  encargadoId: string | null;
  encargadoNombre: string | null;
  encargadoAvatar: string | null;
  origen: string;
  email: string;
  telefono: string;
  ultimo_contacto: Date | null;
  expected_close: Date | null;

  constructor(data: any) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.estado = data.estado as 'CONTACTO' | 'REUNION' | 'PROPUESTA'| 'NEGOCIACION'; // Ensure type casting
    this.prioridad = data.prioridad as 'ALTA' | 'MEDIA' | 'BAJA';
    this.valor_estimado = data.valor_estimado;
    this.encargadoId = data.encargadoId; 
    this.encargadoNombre = data.encargado?.nombre || null;
    this.encargadoAvatar = data.encargado?.avatar || null; 
    this.origen = data.origen;
    this.email = data.email;
    this.telefono = data.telefono;
    this.ultimo_contacto = data.ultimo_contacto;
    this.expected_close = data.expected_close;
    
  }
}
