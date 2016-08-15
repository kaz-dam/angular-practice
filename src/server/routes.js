var router = require('express').Router();
var four0four = require('./utils/404')();

var getMovies = require('./api/getMovies');
var getPeople = require('./api/getPeople');
var movieRented = require('./api/movieRented');
var setPeople = require('./api/setPeople');
var updateMember = require('./api/updateMember');

router.get('/people', getPeople);
router.post('/setPeople', setPeople);
router.get('/movies', getMovies);
router.post('/updateMember', updateMember);
router.post('/movieRented', movieRented);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;