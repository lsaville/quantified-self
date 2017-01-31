function Dinner(name, calories) {
  this.name = name;
  this.calories = calories;
}

Dinner.prototype.store = function () {
  var dinnersJSON = localStorage.getItem('dinner')
  if (!dinnersJSON) {
    dinnersJSON = '[]'
  };
  var dinners = JSON.parse(dinnersJSON);
  dinners.push({name: this.name, calories: this.calories});
  dinnersJSON = JSON.stringify(dinners);
  localStorage.setItem('dinner', dinnersJSON);
};

Dinner.prototype.delete = function () {
  var dinnersJSON = localStorage.getItem('dinner');
  var dinners = JSON.parse(dinnersJSON);
  _.remove(dinners, (element) => {
    return element.name === this.name;
  });
  dinnersJSON = JSON.stringify(dinners);
  localStorage.setItem('dinner', dinnersJSON);
};

Dinner.prototype.edit = function (oldName, oldCalories) {
  var dinnersJSON = localStorage.getItem('dinner');
  var dinners = JSON.parse(dinnersJSON);
  var newindex = ''
  _.forEach(dinners, function(dinner, index){
    if ( dinner.name === oldName){
      return newindex = index
    }
  });
  dinners[newindex] = {name: this.name, calories: this.calories}
  dinnersJSON = JSON.stringify(dinners);
  localStorage.setItem('dinner', dinnersJSON);
};


module.exports = Dinner;