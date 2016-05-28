var peopleJson = require('./people.json');

module.exports = {
  people: getPeople(),
  setPeople: setPeople
};

function getPeople() {
  return peopleJson.people;
}

function setPeople() {
  console.log(data);
  peopleJson.people.push(data);
}
