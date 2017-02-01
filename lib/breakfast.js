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

Breakfast.prototype.delete = function () {
  var breakfastsJSON = localStorage.getItem('breakfast');
  var breakfasts = JSON.parse(breakfastsJSON);
  _.remove(breakfasts, (element) => {
    return element.name === this.name;
  });
  breakfastsJSON = JSON.stringify(breakfasts);
  localStorage.setItem('breakfast', breakfastsJSON);
};

Breakfast.prototype.edit = function (oldName, oldCalories) {
  var breakfastsJSON = localStorage.getItem('breakfast');
  var breakfasts = JSON.parse(breakfastsJSON);
  var newindex = ''
  _.forEach(breakfasts, function(breakfast, index){
    if ( breakfast.name === oldName){
      return newindex = index
    }
  });
  breakfasts[newindex] = {name: this.name, calories: this.calories}
  breakfastsJSON = JSON.stringify(breakfasts);
  localStorage.setItem('breakfast', breakfastsJSON);
};


module.exports = Breakfast;
