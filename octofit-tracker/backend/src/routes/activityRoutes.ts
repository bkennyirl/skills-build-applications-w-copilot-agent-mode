import { Router } from 'express';
import { listActivities, logActivity } from '../controllers/activityController';

const activityRouter = Router();

activityRouter.get('/', listActivities);
activityRouter.post('/', logActivity);

export default activityRouter;