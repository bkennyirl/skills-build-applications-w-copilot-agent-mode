import { Router } from 'express';
import { createUser, getUserById, listUsers } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', listUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);

export default userRouter;