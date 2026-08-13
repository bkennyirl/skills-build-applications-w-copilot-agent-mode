import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/', getLeaderboard);

export default leaderboardRouter;