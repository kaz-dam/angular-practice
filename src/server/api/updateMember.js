var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/people';

module.exports = function(req, res, next) {
	var memberId = req.body.id,
      	movies = req.body.movies;

  	mongo.connect(url, function(err, db) {
    	assert.equal(null, err);
    	db.collection('members')
        .updateOne({'_id': new ObjectID(memberId)},
          {$set: {'rentedMovies': movies}}, function(err, result) {
        		assert.equal(null, err);
        		console.log('Document updated');
        		db.close();
    	});
    	res.status(200).end();
  	});
};