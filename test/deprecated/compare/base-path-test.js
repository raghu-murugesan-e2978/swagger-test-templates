'use strict';
/*'THIS IS A CUSTOM TEMPLATE'*/
var chai = require('chai');
var urljoin = require('url-join');

var request = require('request');
var expect = chai.expect;

require('dotenv').load();

describe('/', function() {
  describe('head', function() {
    it('should respond with 200 OK', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/')),
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json',
          accessToken: process.env.KEY_2
        }
      },
      function(error, res) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);
        done();
      });
    });

  });

});
