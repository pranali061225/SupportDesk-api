import  { Service, Inject} from 'typedi';
// import { IUser, IUserInput, IUserService } from '../types/user';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import { Logger } from 'winston';
//import { RequestModel } from '../models/request';
import mongoose from 'mongoose';
/* User service */
@Service()
export class RequestService {
    //private requestModel;
    constructor(     
         @Inject('requestModel')
         private requestModel: mongoose.Model<mongoose.Document>,           
        @Inject('logger') private logger: Logger        
    ) {         
        //this.requestModel = Container.get('requestModel');        
    }

    /* Get request from id*/
    public async getRequestyId(id: string) {
        try {
            const request = await this.requestModel.findById(id);
            return request;
        } catch (error) {
            throw createError(httpStatus.NOT_FOUND, `Request ${id} doesn't exist`);
        }
    }

    public async getRequests(filter: any) {
        try {
            const requests = await this.requestModel.find(filter);
            return requests;
        } catch (error) {
            throw createError(httpStatus.NOT_FOUND, ``);
        }
    }
    /* Register request */
    public async saveRequest(requestInput: any) {
        try {
            const requestRecord = await this.requestModel.create(requestInput);
            this.logger.info('Request created successfully');
            return requestRecord;
        } catch (error) {
            console.log(error);
            this.logger.error(`Error create request: ${error}`);
            throw createError(
                httpStatus.BAD_REQUEST,
                `CreateRequest: Error`,
            );
        }
    }
}
