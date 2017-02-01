function Snacks(name, calories) {
  this.name = name;
  this.calories = calories;
}

Snacks.prototype.store = function (date) {
  var dayJSON = localStorage.getItem(date)
  var day = JSON.parse(dayJSON);
  day.snacks.push({name: this.name, calories: this.calories});
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Snacks.prototype.delete = function (date) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  _.remove(day.snacks, (element) => {
    return element.name === this.name;
  });
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};

Snacks.prototype.edit = function (date, oldName, oldCalories) {
  var dayJSON = localStorage.getItem(date);
  var day = JSON.parse(dayJSON);
  var newindex = ''
  _.forEach(day.snacks, function(snacks, index){
    if ( snacks.name === oldName){
      return newindex = index
    }
  });
  day.snacks[newindex] = {name: this.name, calories: this.calories}
  dayJSON = JSON.stringify(day);
  localStorage.setItem(date, dayJSON);
};


module.exports = Snacks;
