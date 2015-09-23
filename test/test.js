process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server/app');
var Exercise = require('../server/models/exercise');

var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);


describe('Exercises', function() {

  Exercise.collection.drop();

  beforeEach(function(done){
    var newExercise = new Exercise ({
      name: '99 bottles',
      description: 'print 99 bottles of beer on the wall with code',
      tags: ['javascript, functions']
    });
    newExercise.save(function(err){
      done();
    });
  });

  afterEach(function(done){
    Exercise.collection.drop();
    done();
  });

  it('should list ALL exercises on /exercises GET', function(done){
    chai.request(server)
    .get('/exercises')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('description');
      res.body[0].should.have.property('tags');
      res.body[0].tags.should.be.a('array');
      res.body[0].name.should.equal('99 bottles');
      res.body[0].description.should.equal('print 99 bottles of beer on the wall with code');
      expect(res.body[0].tags).to.have.members(['javascript, functions']);
      done();
    });
  });

  it('should list a SINGLE exercise on /exercise/<id> GET', function(done){
    var testExercise = new Exercise ({
      name: 'crud',
      description: 'a crud app',
      tags: ['javascript, server']
    });
    testExercise.save(function(err, data){
      chai.request(server)
      .get('/exercise/'+data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('tags');
        res.body.name.should.equal('crud');
        res.body.description.should.equal('a crud app');
        res.body._id.should.equal(data.id);
        res.body.tags.should.be.a('array');
        expect(res.body.tags).to.have.members(['javascript, server']);
        done();
      });
    });
  });

  it('should add a SINGLE exercise on /exercises POST', function(done){
    chai.request(server)
    .post('/exercises')
    .send({'name': 'Chess', 'description': 'a game of kings', 'tags': 'strategy, board game'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('Success');
      res.body.Success.should.be.a('object');
      res.body.Success.should.have.property('name');
      res.body.Success.should.have.property('description');
      res.body.Success.should.have.property('tags');
      res.body.Success.should.have.property('_id');
      res.body.Success.name.should.equal('Chess');
      res.body.Success.description.should.equal('a game of kings');
      res.body.Success.tags.should.be.a('array');
      expect(res.body.Success.tags).to.have.members(['strategy, board game']);
      done();
    });
  });

  it('should update a SINGLE exercise on /exercise/<id> PUT', function(done){
    chai.request(server)
    //need to get exercise added in beforeEach hook
    .get('/exercises')
    .end(function(err, res){
      chai.request(server)
      .put('/exercise/'+res.body[0]._id)
      .send({'name': '99 bottles of beer'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('Updated');
        res.body.Updated.should.be.a('object');
        res.body.Updated.should.have.property('name');
        res.body.Updated.should.have.property('description');
        res.body.Updated.should.have.property('tags');
        res.body.Updated.should.have.property('_id');
        res.body.Updated.name.should.equal('99 bottles of beer');
        res.body.Updated.description.should.equal('print 99 bottles of beer on the wall with code');
        res.body.Updated.tags.should.be.a('array');
        expect(res.body.Updated.tags).to.have.members(['javascript, functions']);
        done();
      });
    });
  });

  it('should delete a SINGLE exercise on /exercise/<id> DELETE', function(done){
    chai.request(server)
    .get('/exercises')
    .end(function(err, res){
      chai.request(server)
      .delete('/exercise/'+res.body[0]._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('Removed');
        res.body.Removed.should.be.a('object');
        res.body.Removed.should.have.property('name');
        res.body.Removed.should.have.property('_id');
        res.body.Removed.name.should.equal('99 bottles');
        done();
      });
    });
  });
});


