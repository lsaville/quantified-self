function Breakfast(name, calories) {
  this.name = name;
  this.calories = calories;
}

Breakfast.prototype.store = function () {
  var breakfastsJSON = localStorage.getItem('breakfast')
  if (!breakfastsJSON) {
    breakfastsJSON = '[]'
  };
  var breakfasts = JSON.parse(breakfastsJSON);
  breakfasts.push({name: this.name, calories: this.calories});
  breakfastsJSON = JSON.stringify(breakfasts);
  localStorage.setItem('breakfast', breakfastsJSON);
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