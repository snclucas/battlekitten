var should = require("should");
var request = require("supertest");
var assert = require('assert');

describe('API routes', function() {
  var url = 'http://htpl.us';
  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().
  before(function(done) {
    // In our tests we use the test db

    done();
  });

  describe('Posts', function() {

    it('GET /posts - get list of posts (incorrect auth token), should return 401 (Unauthorized)', function(done) {
      var options = {
      };
      request(url)
      .get('/api/posts')
      .set('Authorization', 'Bearer ' + process.env.TESTUSER_TOKEN+'d')
      .set('Accept', 'application/json')
      .expect(401)
        .send(options)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          // this is should.js syntax, very clear
         // res.should.have.status(400);
          done();
        });
    });
    
    it('GET /posts - get list of posts, should return 200', function(done) {
      var options = {
      };
      request(url)
      .get('/api/posts')
      .set('Authorization', 'Bearer ' + process.env.TESTUSER_TOKEN)
      .set('Accept', 'application/json')
      .expect(200)
        .send(options)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.should.have.status(400);
          done();
        });
    });
    
  });
  
  
  
});