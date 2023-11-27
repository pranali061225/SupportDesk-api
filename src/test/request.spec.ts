
process.env.NODE_ENV = 'test';
import { Server } from '../server';
import { config } from '../config';
import { describe, it, before, after } from 'mocha';
import { Container } from 'typedi';
import axios from 'axios';
import { RequestModel } from '../models/request';

//Require the dev-dependencies
const chai = require('chai');
const sinon = require('sinon');
import jwt from 'jsonwebtoken';
const chaiaspromised = require('chai-as-promised');
const expect = chai.expect;

const request = {};
const requests = [];
chai.use(chaiaspromised);

const token = jwt.sign({ request: request }, config.jwtSecret, { expiresIn: '1h' });

describe('/Request', () => {

    let server;
    before(async () => {
        server = new Server();
        server.startServer();
        const find = sinon.stub(RequestModel, 'find')
        find.returns(requests);
        const create = sinon.stub(RequestModel, 'create')
        create.returns(request);
        Container.set('requestModel', RequestModel);
    });

    after(async () => {
        server.stopServer();
    })


    it('it should be fulfilled and return list of all request', async () => {
        const header = { 'x-auth-token': token };
        return expect(axios.get('http://localhost:5000/api/request',
            { headers: header })).to.be.fulfilled
            .then(response => {
                expect(response).not.to.be.null
                expect(response.data).to.be.an('array')
            })
    });

    it('it should be fulfilled and return request details', async () => {
        const header = { 'x-auth-token': token };
        return expect(axios.get('http://localhost:5000/api/request/1',
            { headers: header })).to.be.fulfilled
            .then(response => {
                expect(response).not.to.be.null
                expect(response.data).not.to.be.null
            })
    });

    it('it should be fulfilled and create new request', async () => {
        const header = { 'x-auth-token': token };
        return expect(axios.post('http://localhost:5000/api/request', {},
            { headers: header })).to.be.fulfilled
            .then(response => {
                expect(response).not.to.be.null
                expect(response.data).to.be.an('Object')
            })
    });
});
