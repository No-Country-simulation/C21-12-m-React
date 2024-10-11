import { PrismaClient } from '@prisma/client';
import { ManagerRepository } from '../../domain/ports/manager.repository';
import { Manager } from '../../domain/entities/Manager';
import { fakerES_MX as faker } from '@faker-js/faker';

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();

// Implementación del repositorio usando Faker y Prisma
export class ManagerRepositoryImpl implements ManagerRepository {
  public async getEncargados(): Promise<Manager[]> {
    // Generar 10 managers con Faker
    const managers: Manager[] = Array.from({ length: 10 }).map(() => {
      return new Manager(
        faker.string.uuid(),   // Generar un UUID
        faker.person.fullName(), // Generar un nombre completo
        faker.image.avatar()    // Generar un avatar
      );
    });

    // Guardar los managers en la base de datos
    for (const manager of managers) {
      await prisma.manager.create({
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
