import { Router } from 'express';
import { createClient, getAllClients, getClientById, updateClient, deleteClient,searchClients, deleteMultiClient} from '../../infrastructure/controllers/client.controller';

const router = Router();

router.post('/clients', createClient);
router.get('/clients', getAllClients);
router.get('/clients/search', searchClients);
router.get('/clients/:id', getClientById);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);
router.delete('/clients/multi/delete', deleteMultiClient);

export default router;