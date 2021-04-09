import express, { Application, request } from "express";
import chaiHttp from "chai-http";
import chai, { expect } from "chai"

let app: Application;
before(() => {
    app = express();
    chai.use(chaiHttp);
})

describe('Pruebas en listado de productos api/products?',  () => {
    it('Status 200', (done) => {
        chai.request('/api')
        .get('/products?page=1&perPage=5&order=asc')
        .end((req, res) => {
            console.log(res);
            expect(res).to.have.status(200);
            done();
        });
    })
})