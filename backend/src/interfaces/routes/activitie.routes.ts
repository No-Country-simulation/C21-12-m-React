import { Router } from 'express';
import { createActivitie, getAllActivities,getActivitieById, updateActivitie,deleteActivitie} from '../../infrastructure/controllers/activitie.controller';

const router = Router();

router.post('/activitie', createActivitie);
router.get('/activitie', getAllActivities);
router.get('/activitie/:id',getActivitieById );
router.put('/activitie/:id', updateActivitie);
router.delete('/activitie/:id',deleteActivitie );

export default router;