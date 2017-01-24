	// var Food = require('./foods');

	// var someFood = new Food();

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
  var newRow = document.createElement('tr');
  var foodNameCell = document.createElement('td');
  foodNameCell.innerText = food;
  var caloriesCell = document.createElement('td');
  caloriesCell.innerText = calories;
  manageFoodsTable.appendChild(newRow);
  newRow.appendChild(foodNameCell);
  newRow.appendChild(caloriesCell);
  console.log(food, calories);
};

