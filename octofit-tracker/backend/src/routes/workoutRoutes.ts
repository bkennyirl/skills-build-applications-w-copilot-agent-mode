import { Router } from 'express';
import {
  createWorkout,
  getWorkoutSuggestions,
  listWorkouts
} from '../controllers/workoutController';

const workoutRouter = Router();

workoutRouter.get('/', listWorkouts);
workoutRouter.post('/', createWorkout);
workoutRouter.get('/suggestions/:userId', getWorkoutSuggestions);

export default workoutRouter;