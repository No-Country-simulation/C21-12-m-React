export class ClientDTO {
  id: number;
  nombre: string;
  estado: 'CONTACTO_INICIAL' | 'EN_PROGRESO' | 'CERRADO'; // Updated to enum type
  prioridad: 'ALTA'|'MEDIA' |'BAJA';
  valor_estimado: number | null;
  managerId: string | null;
  managerNombre: string | null;
  managerAvatar: string | null;
  origen: string;
  email: string;
  telefono: string;
  ultimo_contacto: Date | null;
  expected_close: Date | null;

  constructor(data: any) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.estado = data.estado as 'CONTACTO_INICIAL' | 'EN_PROGRESO' | 'CERRADO'; // Ensure type casting
    this.prioridad = data.prioridad as 'ALTA' | 'MEDIA' | 'BAJA';
    this.valor_estimado = data.valor_estimado;
    this.managerId = data.managerId; // ID del Manager
    this.managerNombre = data.manager?.nombre || null; // Nombre del Manager
    this.managerAvatar = data.manager?.avatar || null; // Avatar del Manager
    this.origen = data.origen;
    this.email = data.email;
    this.telefono = data.telefono;
    this.ultimo_contacto = data.ultimo_contacto;
    this.expected_close = data.expected_close;
    
  }
}
