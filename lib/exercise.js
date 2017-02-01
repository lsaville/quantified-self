function Exercise(name, calories) {
  this.name = name;
  this.calories = calories;
}

Exercise.prototype.store = function (date) {
  var dayJSON = localStorage.getItem(date)
  var day = JSON.parse(dayJSON);
  day.exercise.push({name: this.name, calories: this.calories});
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Exercise.prototype.delete = function (date) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  _.remove(day.exercise, (element) => {
    return element.name === this.name;
  });
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Exercise.prototype.edit = function (date, oldName, oldCalories) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  var newindex = ''
  _.forEach(day.exercise, function(exercise, index){
    if ( exercise.name === oldName){
      return newindex = index
    }
  });
  day.exercise[newindex] = {name: this.name, calories: this.calories}
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};


module.exports = Exercise;
