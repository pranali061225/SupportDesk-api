import { Router } from 'express';
import { userRouter } from './api/user';
import { requestRouter } from './api/request';
const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/request', requestRouter);

export { appRouter };
export default appRouter;
