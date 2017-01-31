function Snacks(name, calories) {
  this.name = name;
  this.calories = calories;
}

Snacks.prototype.store = function () {
  var snacksJSON = localStorage.getItem('snacks')
  if (!snacksJSON) {
    snacksJSON = '[]'
  };
  var snacks = JSON.parse(snacksJSON);
  snacks.push({name: this.name, calories: this.calories});
  snacksJSON = JSON.stringify(snacks);
  localStorage.setItem('snacks', snacksJSON);
};

Snacks.prototype.delete = function () {
  var snacksJSON = localStorage.getItem('snacks');
  var snacks = JSON.parse(snacksJSON);
  _.remove(snacks, (element) => {
    return element.name === this.name;
  });
  snacksJSON = JSON.stringify(snacks);
  localStorage.setItem('snacks', snacksJSON);
};

Snacks.prototype.edit = function (oldName, oldCalories) {
  var snacksJSON = localStorage.getItem('snacks');
  var snacks = JSON.parse(snacksJSON);
  var newindex = ''
  _.forEach(snacks, function(snacks, index){
    if ( snacks.name === oldName){
      return newindex = index
    }
  });
  snacks[newindex] = {name: this.name, calories: this.calories}
  snacksJSON = JSON.stringify(snacks);
  localStorage.setItem('snacks', snacksJSON);
};


module.exports = Snacks;