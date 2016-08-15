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
    console.log(clickedMovieId);
    if (typeof(clickedMovieId) === 'object') {
      for (var i = 0; i < clickedMovieId.length; i++) {
        db.collection('movies').updateOne({"_id": ObjectID(clickedMovieId[i])}, {$set: {"rented": rented}}, function(err, result) {
          assert.equal(null, err);
          // console.log(clickedMovieId[i]);
          db.collection('movies').findOne({"_id": ObjectID(clickedMovieId[i])}, function(err, item) {
            // console.log(clickedMovieId[i]);
            updatedItems.push(item);
            db.close();
          });
        });
      }
      console.log(updatedItems);
      res.status(200).send(updatedItems);
      console.log('Fields updated');
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