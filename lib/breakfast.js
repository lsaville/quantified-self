function Breakfast(name, calories) {
  this.name = name;
  this.calories = calories;
}

Breakfast.prototype.store = function (date) {
  var dayJSON = localStorage.getItem(date)
  var day = JSON.parse(dayJSON);
  day.breakfast.push({name: this.name, calories: this.calories});
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Breakfast.prototype.delete = function (date) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  _.remove(day.breakfast, (element) => {
    return element.name === this.name;
  });
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Breakfast.prototype.edit = function (date, oldName, oldCalories) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  var newindex = ''
  _.forEach(day.breakfast, function(breakfast, index){
    if ( breakfast.name === oldName){
      return newindex = index
    }
  });
  day.breakfast[newindex] = {name: this.name, calories: this.calories}
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};


module.exports = Breakfast;
