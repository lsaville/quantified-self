function Lunch(name, calories) {
  this.name = name;
  this.calories = calories;
}

Lunch.prototype.store = function () {
  var lunchsJSON = localStorage.getItem('lunch')
  if (!lunchsJSON) {
    lunchsJSON = '[]'
  };
  var lunchs = JSON.parse(lunchsJSON);
  lunchs.push({name: this.name, calories: this.calories});
  lunchsJSON = JSON.stringify(lunchs);
  localStorage.setItem('lunch', lunchsJSON);
};

Lunch.prototype.delete = function () {
  var lunchsJSON = localStorage.getItem('lunch');
  var lunchs = JSON.parse(lunchsJSON);
  _.remove(lunchs, (element) => {
    return element.name === this.name;
  });
  lunchsJSON = JSON.stringify(lunchs);
  localStorage.setItem('lunch', lunchsJSON);
};

Lunch.prototype.edit = function (oldName, oldCalories) {
  var lunchsJSON = localStorage.getItem('lunch');
  var lunchs = JSON.parse(lunchsJSON);
  var newindex = ''
  _.forEach(lunchs, function(lunch, index){
    if ( lunch.name === oldName){
      return newindex = index
    }
  });
  lunchs[newindex] = {name: this.name, calories: this.calories}
  lunchsJSON = JSON.stringify(lunchs);
  localStorage.setItem('lunch', lunchsJSON);
};


module.exports = Lunch;