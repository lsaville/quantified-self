var _ = require('lodash')

function Exercise(name, calories) {
  this.name     = name;
  this.calories = calories;
}

Exercise.prototype.store = function () {
  var exercisesJSON = localStorage.getItem('exercises');
  if (!exercisesJSON) {
    exercisesJSON = '[]'
  };
  var exercises = JSON.parse(exercisesJSON);
  exercises.push({name: this.name, calories: this.calories});
  exercisesJSON = JSON.stringify(exercises);
  localStorage.setItem('exercises', exercisesJSON);
};

Exercise.prototype.delete = function () {
    var exercisesJSON = localStorage.getItem('exercises');
    var exercises = JSON.parse(exercisesJSON);
    _.remove(exercises, (element) => {
      return element.name === this.name;
    });
    exercisesJSON = JSON.stringify(exercises);
    localStorage.setItem('exercises', exercisesJSON);
}

module.exports = Exercise;
