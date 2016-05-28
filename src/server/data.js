var peopleJson = require('./people.json');

module.exports = {
  people: getPeople(),
  setPeople: setPeople(data)
};

function getPeople() {
  return peopleJson.people;
}

function setPeople(data) {
  peopleJson.people.push(data);
}
