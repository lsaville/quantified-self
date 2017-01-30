function Exercise(name, calories) {
  this.name = name;
  this.calories = calories;
}

Exercise.prototype.store = function () {
  var exerciseJSON = localStorage.getItem('exercise')
  if (!exerciseJSON) {
    exerciseJSON = '[]'
  };
  var exercise = JSON.parse(exerciseJSON);
  exercise.push({name: this.name, calories: this.calories});
  exerciseJSON = JSON.stringify(exercise);
  localStorage.setItem('exercise', exerciseJSON);
};

Exercise.prototype.delete = function () {
  var exerciseJSON = localStorage.getItem('exercise');
  var exercise = JSON.parse(exerciseJSON);
  _.remove(exercise, (element) => {
    return element.name === this.name;
  });
  exerciseJSON = JSON.stringify(exercise);
  localStorage.setItem('exercise', exerciseJSON);
};

Exercise.prototype.edit = function (oldName, oldCalories) {
  var exerciseJSON = localStorage.getItem('exercise');
  var exercise = JSON.parse(exerciseJSON);
  var newindex = ''
  _.forEach(exercise, function(exercise, index){
    if ( exercise.name === oldName){
      return newindex = index
    }
  });
  exercise[newindex] = {name: this.name, calories: this.calories}
  exerciseJSON = JSON.stringify(exercise);
  localStorage.setItem('exercise', exerciseJSON);
};


module.exports = Exercise;