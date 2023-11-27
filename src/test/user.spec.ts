
process.env.NODE_ENV = 'test';
import { Server } from '../server';
import { UserModel } from '../models/users';
//import { IUser} from '../types/user';
//import mongoose from 'mongoose';
import { config } from '../config';
import { describe, it, before, after } from 'mocha';
import { Container } from 'typedi';
import axios from 'axios';
//Require the dev-dependencies
const chai = require('chai');
const sinon = require('sinon');
import jwt from 'jsonwebtoken';
const chaiaspromised = require('chai-as-promised');
const expect = chai.expect;

chai.use(chaiaspromised);
const user = {
  id: 1,
  username: 'Raj',
  email: 'Raj@gmail.com',
  password: '$2b$10$P0SH1FnHFiOL5mITqVFwpOOMfD9U2AgOF5sWpeOBDpBPbnVtj2qe.',
  role: 'Admin'
}

const token = jwt.sign({ user: user }, config.jwtSecret, { expiresIn: '1h' });


describe('/User', () => {

  let server;
  before(async () => {
    server = new Server();
    server.startServer();
    const findById = sinon.stub(UserModel, 'findById')
    findById.returns(user);
    const findOne = sinon.stub(UserModel, 'findOne')
    findOne.returns(user);    
    const create = sinon.stub(UserModel, 'create')
    create.returns(user);        
    Container.set('userModel', UserModel);
  });

  after(async () => {
    server.stopServer();
  })

  it('it should be fulfilled and return user details', async () => {
    const header = { 'x-auth-token': token };
    return expect(axios.get('http://localhost:5000/api/user',
      { headers: header })).to.be.fulfilled
      .then(response => {
        expect(response).not.to.be.null
        expect(response.data.username).to.be.equal(user.username)
      })
  });


  it('it should be fulfilled and return current logged in user, based on token', async () => {
    const header = { 'x-auth-token': token };
    return expect(axios.get('http://localhost:5000/api/user/me',
      { headers: header })).to.be.fulfilled
      .then(response => {
        expect(response).not.to.be.null        
        expect(response.data.user.username).to.be.equal(user.username)
      })
  });

  it('it should be authenticate user and return token', async () => {
    const header = { 'x-auth-token': token };
    return expect(axios.post('http://localhost:5000/api/user/login', { username : 'Raj', email: 'raj@gmail.com', password: '1234' },
      { headers: header })).to.be.fulfilled
      .then(response => {        
        expect(response.data).not.to.be.null
      })
  });

  it('it should be rejected, when exxisting user try to register', async () => {
    const header = { 'x-auth-token': token };
    return expect(axios.post('http://localhost:5000/api/user', { username : 'Raj', email: 'raj@gmail.com', password: '1234' },
      { headers: header })).to.be.rejected
      .then(error => {        
        expect(error).not.to.be.null
        expect(error.response.data.error.statusCode).equal(409)
      })
  });
});
