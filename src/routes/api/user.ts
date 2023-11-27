import { Router, Response } from 'express';
import { RequestUser } from '../../types/user';
import { UserService } from '../../services/userService';
import { Container } from 'typedi';
import handler from 'express-async-handler';
import { middleware } from '../../middleware';
//import { UserSignupDto } from '../../types/user';

const userRouter = Router();
//const { validation } = middleware;

// @GET '/auth'
// @DEST Get user authenticated

userRouter.get(
  '/',
  middleware.userAuth,
  //middleware.checkObjectId,
  handler(async (req: any, res: any) => {  
    // user.req always get from middleware    
    const userService = Container.get(UserService);
    const user = await userService.getUser(req.user.id);    
    return res.status(200).json(user);
  }),
);

userRouter.get(
  '/me',
  middleware.userAuth,
  handler(async (req: any, res: any) => {    
    return res.status(200).json({ user: req.user , msg: 'hellow world'});
  }),
);

// @POST '/auth'
// @DES Login user
userRouter.post(
  '/login',
  //validation(UserSigninDto),
  handler(
    async (req: RequestUser, res: Response): Promise<void> => {
      try {
        const userService = Container.get(UserService);
        const token = await userService.loginUser(req.body);
        res.json({ token });  
      } catch (error) {
        console.log(error);
      }      
    },
  ),
);

// @POST '/auth/users'
// @DES Register user
userRouter.post(
  '/',
  //validation(UserSignupDto),
  handler(
    async (req: RequestUser, res: Response): Promise<void> => {
      const userService = Container.get(UserService);
      const token = await userService.registerUser(req.body);
      res.json({ token });
    },
  ),
);

export { userRouter };
export default userRouter;
