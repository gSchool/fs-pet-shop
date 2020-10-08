'use strict';

const request = require('supertest');
const rewire = require('rewire');
const fs = require('fs');

// Set the port to a different number so that it does not conflict with the
// other test files.
process.env.PORT = 3006;
const app = rewire('../restfulExpressServer');
const copyFile = function(source, target, cb) {
  let cbCalled = false;
  const rd = fs.createReadStream(source);
  const wr = fs.createWriteStream(target);
  const done = function(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  };

  rd.on('error', (err) => {
    done(err);
  });

  wr.on('error', (err) => {
    done(err);
  });

  wr.on('close', (_ex) => {
    done();
  });

  rd.pipe(wr);
};

describe('pets bonus restfulExpressServer', () => {
  beforeEach((done) => {
    copyFile('pets.json', 'pets.json.old', (err) => {
      if (err) {
        return done(err);
      }

      const petsArr = [{
        age: 7,
        kind: 'rainbow',
        name: 'fido'
      }, {
        age: 4,
        kind: 'duck',
        name: 'Bob'
      }];

      fs.writeFile('pets.json', JSON.stringify(petsArr), done);
      app.__set__({
        'fs': {
          readFile: function(path, encoding, cb){
            if(/pets.json$/.test(path)) return cb(null,JSON.stringify(petsArr));
            cb(new Error('File does not exist'));
          },
          writeFile: function(path, data, cb){
            if(/pets.json$/.test(path)){
              petsArr = JSON.parse(data);
              return cb(null);
            }
            return cb(new Error('File does not exist'));
          }
        }
      });
    });
  });

  afterEach((done) => {
    copyFile('pets.json.old', 'pets.json', (err) => {
      if (err) {
        return done(err);
      }

      fs.unlink('pets.json.old', done);
    });
  });

  describe('catch all route handler', () => {
    it('should return a 404 when requesting the root route', (done) => {
      request(app)
        .get('/')
        .set('Authorization', 'Basic YWRtaW46bWVvd21peA==')
        .expect('Content-Type', /text\/plain/)
        .expect(404, 'Not Found', done);
    });

    it('should return a 404 when resource doesn\'t exist', (done) => {
      request(app)
        .get('/blah')
        .set('Authorization', 'Basic YWRtaW46bWVvd21peA==')
        .expect('Content-Type', /text\/plain/)
        .expect(404, 'Not Found', done);
    });
  });

  describe('Support Basic Authentication', () => {
    it('Responds with a 401 for all unauthorized requests', (done) => {
      request(app)
        .get('/pets')
        .expect('Content-Type', /text\/plain/)
        .expect('WWW-Authenticate', /Basic realm="Required"/)
        .expect(401, 'Unauthorized', done);
    });

    it('Responds with a 200 for all authorized requests', (done) => {
      request(app)
        .get('/pets')
        .set('Authorization', 'Basic YWRtaW46bWVvd21peA==')
        .expect('Content-type', /json/)
        .expect(200, [{
          age: 7,
          kind: 'rainbow',
          name: 'fido'
        }, {
          age: 4,
          kind: 'duck',
          name: 'Bob'
        }], done);
    });
  });
});
