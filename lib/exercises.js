var _ = require('lodash')

function Exercises(name, calories) {
  this.name     = name;
  this.calories = calories;
}

Exercises.prototype.store = function () {
  var exercisesJSON = localStorage.getItem('exercises');
  if (!exercisesJSON) {
    exercisesJSON = '[]'
  };
  var exercises = JSON.parse(exercisesJSON);
  exercises.push({name: this.name, calories: this.calories});
  exercisesJSON = JSON.stringify(exercises);
  localStorage.setItem('exercises', exercisesJSON);
};

Exercises.prototype.delete = function () {
    var exercisesJSON = localStorage.getItem('exercises');
    var exercises = JSON.parse(exercisesJSON);
    _.remove(exercises, (element) => {
      return element.name === this.name;
    });
    exercisesJSON = JSON.stringify(exercises);
    localStorage.setItem('exercises', exercisesJSON);
}


Exercises.prototype.edit = function (oldName, oldCalories) {
  var exercisesJSON = localStorage.getItem('exercises');
  var exercises = JSON.parse(exercisesJSON);
  var newindex = ''
  _.forEach(exercises, function(exercise, index){
    if ( exercise.name === oldName){
      return newindex = index
    }
  });
  exercises[newindex] = {name: this.name, calories: this.calories}
  exercisesJSON = JSON.stringify(exercises);
  localStorage.setItem('exercises', exercisesJSON);
};

module.exports = Exercises;
