import { Router } from 'express';
import { createProyecto, getAllProjects} from '../../infrastructure/controllers/project.controller';

const router = Router();

router.post('/projects', createProyecto);
router.get('/projects', getAllProjects)

export default router;