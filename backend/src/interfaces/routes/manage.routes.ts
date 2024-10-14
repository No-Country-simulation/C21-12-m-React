import { Router } from 'express';
import { ManagerController } from '../../infrastructure/controllers/manage.controller';

const router = Router();
const managerController = new ManagerController();

// Ruta para obtener la lista de managers
router.get('/', (req, res) => managerController.getManagers(req, res));

export default router;
