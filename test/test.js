var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server/app');
var Exercise = require('../server/models/exercise');

var should = chai.should();
var expect = chai.expect;
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

  it('should add a SINGLE exercise on /exercises POST', function(done){
    chai.request(server)
    .post('/exercises')
    .send({'name': 'Chess', 'description': 'a game of kings', 'tags': 'strategy, board game'})
    .end(function(err, res){
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('Success');
      res.body.Success.should.be.a('object');
      res.body.Success.should.have.property('name');
      res.body.Success.should.have.property('description');
      res.body.Success.should.have.property('tags');
      res.body.Success.tags.should.be.a('array');
      res.body.Success.should.have.property('_id');
      res.body.Success.name.should.equal('Chess');
      res.body.Success.description.should.equal('a game of kings');
      expect(res.body.Success.tags).to.have.members(['strategy, board game']);
      done();
    });
  });

  it('should update a SINGLE exercise on /exercise/<id> PUT');

  it('should delete a SINGLE exercise on /exercise/<id> DELETE');
});


