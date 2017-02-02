function Lunch(name, calories) {
  this.name = name;
  this.calories = calories;
}

Lunch.prototype.store = function (date) {
  var dayJSON = localStorage.getItem(date)
  var day = JSON.parse(dayJSON);
  day.lunch.push({name: this.name, calories: this.calories});
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Lunch.prototype.delete = function (date) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  _.remove(day.lunch, (element) => {
    return element.name === this.name;
  });
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Lunch.prototype.edit = function (date, oldName, oldCalories) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  var newindex = ''
  _.forEach(day.lunch, function(lunch, index){
    if ( lunch.name === oldName){
      return newindex = index
    }
  });
  day.lunch[newindex] = {name: this.name, calories: this.calories}
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};


module.exports = Lunch;
