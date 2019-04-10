'use strict';
/*'THIS IS A CUSTOM TEMPLATE'*/
var chai = require('chai');
var urljoin = require('url-join');

var request = require('request');
var expect = chai.expect;

describe('/user', function() {
  describe('get', function() {
    it('should respond with 200 OK and some description', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/user')),
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Longitude': 'DATA GOES HERE',
          'X-Token': 'sadfg'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });
  it('should respond with 200 OK and some other description', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/user')),
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Longitude': 'DATA GOES HERE',
          'X-Token': 'qwerty'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 400 NOT OK', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/user')),
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Longitude': 'DATA GOES HERE',
          'X-Token': 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(400);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

    it('should respond with 500 SERVER ERROR', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/user')),
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Longitude': 'DATA GOES HERE',
          'X-Token': 'DATA GOES HERE'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(500);

        expect(body).to.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
