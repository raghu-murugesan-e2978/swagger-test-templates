'use strict';
/*'THIS IS A CUSTOM TEMPLATE'*/
var chai = require('chai');
var urljoin = require('url-join');

var request = require('request');

chai.should();

describe('/', function() {
  describe('get', function() {
    it('should respond with 200 \'OK\'\n\\/\"This description is extra long for a simple length toggle test!\" It needs to contain at least 80 characters', function(done) {
      request({
        url: String(urljoin(process.env.swagger_host, '/')),
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        res.statusCode.should.equal(200);

        body.should.equal(null); // non-json response or no schema
        done();
      });
    });

  });

});
