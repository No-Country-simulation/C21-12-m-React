export class Encargado {
    constructor(
      private _id: string,
      private _name: string,
      private _imageUrl: string
    ) {}
  

  
    public get id(): string {
      return this._id;
    }
  
    public get name(): string {
      return this._name;
    }
  
    public set name(newName: string) {
      if (newName.length === 0) {
        throw new Error('El nombre no puede estar vacío');
      }
      this._name = newName;
    }
  
    public get imageUrl(): string {
      return this._imageUrl;
    }
  
    public set imageUrl(newUrl: string) {
      if (!newUrl.startsWith('http')) {
        throw new Error('La URL de la imagen no es válida');
      }
      this._imageUrl = newUrl;
    }
  }
  