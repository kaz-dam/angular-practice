var router = require('express').Router();
var four0four = require('./utils/404')();
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/people';

router.get('/people', getPeople);
router.post('/setPeople', setPeople);
router.get('/movies', getMovies);
router.post('/updateMember', updateMember);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
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

function getMovies(req, res, next) {
  var movies = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var items = db.collection('movies').find();
    items.forEach(function(doc, err) {
      assert.equal(null, err);
      movies.push(doc);
    }, function() {
      db.close();
      res.status(200).send(movies);
    });
  });
}

function setPeople(req, res, next) {
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
}

function getPerson(req, res, next) {
  var id = +req.params.id;
  // TODO rewrite this lineˇˇˇˇ
  var person = data.people.filter(function(p) {
    return p.id === id;
  })[0];

  if (person) {
    res.status(200).send(person);
  } else {
    four0four.send404(req, res, 'person ' + id + ' not found');
  }
}

function updateMember(req, res, next) {
  var memberId = req.body.id,
      movies = req.body.movies;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('members').updateOne({"_id": ObjectID(memberId)}, {$set: {"rentedMovies": movies}}, function(err, result) {
      assert.equal(null, err);
      console.log('Document updated');
      db.close();
    });

    res.status(200).end();
  });
}
