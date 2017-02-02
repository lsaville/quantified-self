function Dinner(name, calories) {
  this.name = name;
  this.calories = calories;
}

Dinner.prototype.store = function (date) {
  var dayJSON = localStorage.getItem(date)
  var day = JSON.parse(dayJSON);
  day.dinner.push({name: this.name, calories: this.calories});
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Dinner.prototype.delete = function (date) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  _.remove(day.dinner, (element) => {
    return element.name === this.name;
  });
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Dinner.prototype.edit = function (date, oldName, oldCalories) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  var newindex = ''
  _.forEach(day.dinner, function(dinner, index){
    if ( dinner.name === oldName){
      return newindex = index
    }
  });
  day.dinner[newindex] = {name: this.name, calories: this.calories}
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};


module.exports = Dinner;
