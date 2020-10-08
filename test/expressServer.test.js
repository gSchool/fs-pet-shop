'use strict';

const rewire = require('rewire');
const request = require('supertest');
const fs = require('fs');

// Set the port to a different number so that it does not conflict with the
// other test files.
process.env.PORT = 3003;
const app = rewire('../expressServer');

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

describe('pets expressServer', () => {
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
        age: 5,
        kind: 'snake',
        name: 'Buttons'
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



  describe('GET /pets', () => {
    it('should return an array of pets', (done) => {
      request(app)
        .get('/pets')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [{
          age: 7,
          kind: 'rainbow',
          name: 'fido'
        }, {
          age: 5,
          kind: 'snake',
          name: 'Buttons'
        }], done);
    });
  });

  describe('GET /pets/:id', () => {
    it('should return a pet at index 0', (done) => {
      request(app)
        .get('/pets/0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          age: 7,
          kind: 'rainbow',
          name: 'fido'
        }, done);
    });

    it('should return a pet at index 1', (done) => {
      request(app)
        .get('/pets/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          age: 5,
          kind: 'snake',
          name: 'Buttons'
        }, done);
    });

    it('shouldn\'t return a pet at index 2', (done) => {
      request(app)
        .get('/pets/2')
        .expect('Content-Type', /text\/plain/)
        .expect('Content-Type', /text\/plain/)
.expect(404, 'Not Found', done);
    });

    it('shouldn\'t return a pet at index -1', (done) => {
      request(app)
        .get('/pets/-1')
        .expect('Content-Type', /text\/plain/)
        .expect('Content-Type', /text\/plain/)
.expect(404, 'Not Found', done);
    });
  });
});
