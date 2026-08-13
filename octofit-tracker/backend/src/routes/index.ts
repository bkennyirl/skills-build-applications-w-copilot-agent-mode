import { Router } from 'express';
import { getHealth } from '../controllers/healthController';
import activityRouter from './activityRoutes';
import leaderboardRouter from './leaderboardRoutes';
import teamRouter from './teamRoutes';
import userRouter from './userRoutes';
import workoutRouter from './workoutRoutes';

const apiRouter = Router();

apiRouter.get('/health', getHealth);
apiRouter.use('/users', userRouter);
apiRouter.use('/teams', teamRouter);
apiRouter.use('/activities', activityRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutRouter);

export default apiRouter;