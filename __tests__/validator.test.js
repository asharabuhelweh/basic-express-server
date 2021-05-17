
'use strict';

const server = require("../src/server");

const supertest = require('supertest')

const fakeServer = supertest(server.app);

describe('test queries', () => {

  it('the name in the query is not available', async() => {
      let result = await fakeServer.get('/person');
      expect(result.status).toEqual(500);
  });

  it("there is a name in query string", async() => {
      let query = "ashar"
      let result = await fakeServer.get(`/person?name=${query}`);
      expect(result.status).toEqual(200);
  });
})