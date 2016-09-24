var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/people';

module.exports = function(req, res, next) {
	var newData = req.body,
  	currentDate = new Date().toDateString();

  	newData.registered = currentDate;
  	newData.rentedMovies = [];
  
 	mongo.connect(url, function(err, db) {
    	assert.equal(null, err);
    	db.collection('members').insertOne(newData, function(err, result) {
      		assert.equal(null, err);
      		console.log('New user inserted');
      		db.close();
    	});
  	});
  	res.status(200).redirect('/');
};