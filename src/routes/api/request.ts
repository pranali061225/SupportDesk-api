import { Router, Response } from 'express';
import { RequestService } from '../../services/requestService';
import { Container } from 'typedi';
import handler from 'express-async-handler';
//import { middleware } from '../../middleware';
// import { requestSigninDto, requestSignupDto } from '../../types/request';

const requestRouter = Router();
//const { validation } = middleware;

// @GET '/auth'
// @DEST Get request authenticated

requestRouter.get(
  '/',
  //middleware.requestAuth,
  //middleware.checkObjectId,
  handler(async (req: any, res: Response) => {
    // request.req always get from middleware
    const requestService = Container.get(RequestService);    
    const request = await requestService.getRequests(req.params);
    res.json(request);
  }),
);

requestRouter.get(
  '/:id',
  //middleware.requestAuth,
  handler(async (req: any, res: any) => {
    const requestService = Container.get(RequestService);
    const requests = await requestService.getRequests(req.params.id);    
    return res.status(200).json(requests);
  }),
);

requestRouter.post(
  '/',  
  handler(
    async (req: any, res: Response): Promise<void> => {
      const requestService = Container.get(RequestService);
      const token = await requestService.saveRequest(req.body);
      res.json({ token });
    },
  ),
);

export { requestRouter };
export default requestRouter;
