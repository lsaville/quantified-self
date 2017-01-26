function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

Food.prototype.store = function () {
  var foodsJSON = localStorage.getItem('foods')
  if (!foodsJSON) {
    foodsJSON = '[]'
  };
  var foods = JSON.parse(foodsJSON);
  foods.push({name: this.name, calories: this.calories});
  foodsJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodsJSON);
};

Food.prototype.delete = function () {
  var foodsJSON = localStorage.getItem('foods');
  var foods = JSON.parse(foodsJSON);
  _.remove(foods, (element) => {
    return element.name === this.name;
  });
  foodsJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodsJSON);
};

module.exports = Food;

