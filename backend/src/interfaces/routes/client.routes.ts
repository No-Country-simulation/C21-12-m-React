import { Router } from 'express';
import { createClient, getAllClients, getClientById, updateClient, deleteClient } from '../../infrastructure/controllers/client.controller';

const router = Router();

router.post('/clients', createClient);
router.get('/clients', getAllClients);
router.get('/clients/:id', getClientById);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

export default router;