var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/people';

module.exports = function(req, res, next) {
	var people = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var items = db.collection('members').find();
    items.forEach(function(doc, err) {
      assert.equal(null, err);
      people.push(doc);
    }, function() {
      db.close();
      res.status(200).send(people);
    });
  });
}