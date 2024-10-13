import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import clientRoutes from './interfaces/routes/client.routes';
import managerRoutes from './interfaces/routes/manage.routes';
import projectRoutes from './interfaces/routes/project.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json());

// Rutas
app.use('/api/v1', clientRoutes);
app.use('/api/v1', managerRoutes);
app.use('/api/v1', projectRoutes);
app.use('/api/v1/managers', managerRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello, backend is running!');
});

// Middleware para manejo de errores 404 (Ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An error occurred!',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
