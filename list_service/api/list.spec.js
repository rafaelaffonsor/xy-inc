var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('List API', () => {

  //  Our running app (rebuilt for each test) and our repo, which
  //  we can mock for each test.
  var app = null;
  var testPoi = [{
      name: 'Lanchonete',
      coord_x: 27,
      coord_y: 12
    }, {
      name: 'Pizzaria',
      coord_x: 20,
      coord_y: 18
    }
  ];
  var testRepo = {
    getPois: () => {
      return Promise.resolve(testPoi);
    }
  };

  beforeEach(() => {
    return server.start({
      port: 1234,
      repository: testRepo
    }).then(function (svr) {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all pois', (done) => {

    request(app)
      .get('/pois')
      .expect(function(res) {
        res.body.should.containEql({
          name: 'Lanchonete',
          coord_x: 27,
          coord_y: 12
        });
        res.body.should.containEql({
          name: 'Pizzaria',
          coord_x: 20,
          coord_y: 18
          });
        })
      .expect(200, done);

  });

});
