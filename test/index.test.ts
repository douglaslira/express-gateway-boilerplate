import { WELCOME } from './../config/contants';
import { expect } from 'chai';
import app from '../src/app';
import { agent as request } from 'supertest';

describe("INDEX Test", () => {
    
    it('should GET /index', async function () {
        const res = await request(app).get('/');
        expect(res.status).to.equals(200);
        expect(res.text).to.equals(WELCOME);
    });

});