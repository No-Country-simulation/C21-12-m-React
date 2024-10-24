
export class Proyecto {
    constructor(
      public id: number,
      public clienteId: number,
      public nombre: string,
      public descripcion: string,
      public valor: number,
      public estado: 'PAUSADO' |'ACTIVO' | 'COMPLETO' |'CERRADO' ,
      public fechaInicio: Date,
      public fechaCierreEstimada: Date,
      public responsableId: string
    ) {}
  }
  