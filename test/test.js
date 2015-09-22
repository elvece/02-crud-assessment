var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../server/app');
var Exercise = require("../server/models/exercise");

var should = chai.should();
// var expect = chai.expect;
chai.use(chaiHttp);

// sample!
// describe('Compare Numbers', function() {
//   it('1 should equal 1', function() {
//     expect(1).to.equal(1);
//   });
// });


describe('Exercises', function() {
  it('should list ALL exercises on /exercises GET');
  it('should list a SINGLE exercise on /exercise/<id> GET');
  it('should add a SINGLE exercise on /exercises POST');
  it('should update a SINGLE exercise on /exercise/<id> PUT');
  it('should delete a SINGLE exercise on /exercise/<id> DELETE');
});
