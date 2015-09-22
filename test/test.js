var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server/app');
var Exercise = require('../server/models/exercise');

var should = chai.should();
// var expect = chai.expect;
chai.use(chaiHttp);


describe('Exercises', function() {
  it('should list ALL exercises on /exercises GET', function(done){
    chai.request(server)
    .get('/exercises')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });




  it('should list a SINGLE exercise on /exercise/<id> GET');
  it('should add a SINGLE exercise on /exercises POST');
  it('should update a SINGLE exercise on /exercise/<id> PUT');
  it('should delete a SINGLE exercise on /exercise/<id> DELETE');
});


