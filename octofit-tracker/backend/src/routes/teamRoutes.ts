import { Router } from 'express';
import { addMemberToTeam, createTeam, listTeams } from '../controllers/teamController';

const teamRouter = Router();

teamRouter.get('/', listTeams);
teamRouter.post('/', createTeam);
teamRouter.post('/:teamId/members/:userId', addMemberToTeam);

export default teamRouter;