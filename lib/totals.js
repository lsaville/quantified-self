function Totals(name, calories) {
  this.name = name;
  this.calories = calories;
}

Totals.prototype.store = function () {
  var totalsJSON = localStorage.getItem('totals')
  if (!totalsJSON) {
    totalsJSON = '[]'
  };
  var totals = JSON.parse(totalsJSON);
  totals.push({name: this.name, calories: this.calories});
  totalsJSON = JSON.stringify(totals);
  localStorage.setItem('totals', totalsJSON);
};

module.exports = Totals;
