import express from 'express';
import clientRoutes from './interfaces/routes/client.routes'; // Importa las rutas de clientes

const app = express();
app.use(express.json());

// Rutas
app.use('/api/v1', clientRoutes); // Define el endpoint para los clientes

app.get('/', (req, res) => {
  res.send('Hello, backend is running!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
