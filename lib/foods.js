function Food(food, calories) {
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

Food.prototyp.delete = function () {
  var foodsJSON = localStorage.getItem('foods');
  var foods = JSON.parse(foodsJSON);
  _.remove(foods, (element) => {
    return element.name === this.name;
  });
  foodsJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodsJSON);
}

module.exports = Food;


var nameInput = document.getElementById('name-field');
var caloriesInput = document.getElementById('calories-field');
var submitFoodButton = document.getElementById('food-submit');
var manageFoodsTable = document.getElementById('manage-foods-table');

submitFoodButton.addEventListener('click', function(event){
	event.preventDefault();
  var foodName = nameInput.value;
  var calories = caloriesInput.value;
  submitFood(foodName,calories);
});

function submitFood(food, calories){
  var newRow = manageFoodsTable.insertRow(1);
  var foodNameCell = document.createElement('td');
  foodNameCell.innerText = food;
  var caloriesCell = document.createElement('td');
  caloriesCell.innerText = calories;
  var row = foodNameCell + caloriesCell
  console.log(row, caloriesCell)
  newRow.appendChild(caloriesCell);
  newRow.appendChild(row);
};


 // var newRow = manageFoodsTable.insertRow(1);
 // newRow.appendChild(row);
