import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, backend is running!');
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.json(newUser);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
