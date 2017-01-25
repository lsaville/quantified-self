// function Food(food, calories) {
//   this.name = name;
//   this.calories = calories;
// }

// Food.prototype.edit = function () {
//   //Some cool storage stuff here
// };

// module.exports = Food;


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
	var tr = manageFoodsTable.insertRow(1);
  var newRow = document.createElement('tr');
  var foodNameCell = document.createElement('td');
  foodNameCell.innerText = food;
  var caloriesCell = document.createElement('td');
  caloriesCell.innerText = calories;
  manageFoodsTable.appendChild(newRow);
  tr.appendChild(foodNameCell);
  tr.appendChild(caloriesCell);
  console.log(food, calories);
};

