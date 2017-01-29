function Snacks(name, calories) {
  this.name = name;
  this.calories = calories;
}

Snacks.prototype.store = function () {
  var snackssJSON = localStorage.getItem('snacks')
  if (!snackssJSON) {
    snackssJSON = '[]'
  };
  var snackss = JSON.parse(snackssJSON);
  snackss.push({name: this.name, calories: this.calories});
  snackssJSON = JSON.stringify(snackss);
  localStorage.setItem('snacks', snackssJSON);
};

Snacks.prototype.delete = function () {
  var snackssJSON = localStorage.getItem('snacks');
  var snackss = JSON.parse(snackssJSON);
  _.remove(snackss, (element) => {
    return element.name === this.name;
  });
  snackssJSON = JSON.stringify(snackss);
  localStorage.setItem('snacks', snackssJSON);
};

Snacks.prototype.edit = function (oldName, oldCalories) {
  var snackssJSON = localStorage.getItem('snacks');
  var snackss = JSON.parse(snackssJSON);
  var newindex = ''
  _.forEach(snackss, function(snacks, index){
    if ( snacks.name === oldName){
      return newindex = index
    }
  });
  snackss[newindex] = {name: this.name, calories: this.calories}
  snackssJSON = JSON.stringify(snackss);
  localStorage.setItem('snacks', snackssJSON);
};


module.exports = Snacks;