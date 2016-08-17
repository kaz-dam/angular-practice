var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/people';

module.exports = function(req, res, next) {
	var clickedMovieId = req.body.id;
  	var rented = req.body.rented;
  	var updatedItems = [];

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    // console.log(clickedMovieId.length);
    if (typeof(clickedMovieId) === 'object') {
      clickedMovieId.forEach(function(id, index) {
        db.collection('movies').updateOne({"_id": ObjectID(id)}, {$set: {"rented": rented}}, function(err, result) {
          assert.equal(null, err);
          console.log(id + ' inside updateOne');
          db.collection('movies').findOne({"_id": ObjectID(id)}, function(err, item) {
            assert.equal(null, err);
            console.log(id + ' inside findOne');
            updatedItems.push(item);
            // console.log(updatedItems);
            if (clickedMovieId.length - 1 === index) {
              db.close();
              console.log('Fields updated');
              res.status(200).end();
            }
          });
        });
      });
    } else {
      db.collection('movies').updateOne({"_id": ObjectID(clickedMovieId)}, {$set: {"rented": rented}}, function(err, result) {
        assert.equal(null, err);
        db.collection('movies').findOne({"_id": ObjectID(clickedMovieId)}, function(err, item) {
          db.close();
          console.log('single request');
          res.status(200).send(item);
        });
        console.log('Field updated');
      });
    }
  });
}