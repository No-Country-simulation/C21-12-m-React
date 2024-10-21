import { PrismaClient } from '@prisma/client';
import { ManagerRepository } from '../../domain/ports/manager.repository';
import { Encargado } from '../../domain/entities/Manager';
import { fakerES_MX as faker } from '@faker-js/faker';

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

export class ManagerRepositoryImpl implements ManagerRepository {
  public async getEncargados(): Promise<Encargado[]> {
    // Verificar si ya existen managers en la base de datos
    const existingManagers = await prisma.encargado.findMany();
    
    // Si ya hay 10 managers, retornarlos
    if (existingManagers.length >= 10) {
      return existingManagers.map(encargado => new Encargado(encargado.id, encargado.nombre, encargado.avatar));
    }

    // Generar 10 managers con Faker solo si no existen
    const managers: Encargado[] = Array.from({ length: 10 }).map(() => {
      return new Encargado(
        faker.string.uuid(),   // Generar un UUID
        faker.person.fullName(), // Generar un nombre completo
        faker.image.avatar()    // Generar un avatar
      );
    });

    // Guardar los managers en la base de datos
    for (const manager of managers) {
      await prisma.encargado.create({
        data: {
          id: manager.id,       // El UUID generado por Faker
          nombre: manager.name, // El nombre generado por Faker
          avatar: manager.imageUrl, // El avatar generado por Faker
        },
      });
    }

    // Retornar los managers generados
    return managers;
  }
}
