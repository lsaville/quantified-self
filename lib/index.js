
  // var someFood = new Food();

var $ = require('jquery');

// exercise vars
var Exercise = require('../exercise');
// var addExerciseButton = $('.add-exercise');

// food vars
var Food = require('./foods');
// var addFoodButton = $('.add-food');

// Shared variabls
var addNameCaloriesButton = $('.add-name-and-calories');

// exercise table

(function tableInitialize () {
  exercisesJSON = localStorage.getItem('exercises');
  var exercises = JSON.parse(exercisesJSON);
  if (exercises !== null) {
    for (var i = 0; i < exercises.length; i++) {
      addToTable(exercises[i].name, exercises[i].calories, 'exercise');
    }
  };
})();

// food table

(function FoodTableInitialize () {
  foodsJSON = localStorage.getItem('foods');
  var foods = JSON.parse(foodsJSON);
  if (foods !== null) {
    for (var i = 0; i < foods.length; i++) {
      addToTable(foods[i].name, foods[i].calories, 'food');
    };
  };
})();

// Add and delete table functions for both tables

function addToTable(name, calories, table) {
  var table = table
  var row = '<tr><td>' +name+ '</td><td>' +calories+ '</td><td><a href="#" class="delete-'+table+' material-icons">delete</a></td></tr>'
  $('.'+table+'s > tbody').prepend(row);
};

addNameCaloriesButton.on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val();
  var calories = $('input[name=calories]').val();
  if ($(".exercises")[0]){
    var exercise = new Exercise(name, calories);
    exercise.store();
    addToTable(name, calories, 'exercise');
  } else if ($(".foods")[0]){
    var food = new Food(name, calories);
    food.store();
    addToTable(name, calories, 'food');
  };
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});

function deleteRow (row) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  if ($(".exercises")[0]){
    var exercise  = new Exercise(name, calories);
    exercise.delete();
  } else if ($(".foods")[0]){
    var food  = new Food(name, calories);
    food.delete();
  };
  doomedRow.remove();
};


// exercise stuff

$('.exercises').on('click', '.delete-exercise', function (event) {
  event.preventDefault();
  deleteRow(this);
});

// food stuff

$('.foods').on('click', '.delete-food', function (event) {
  event.preventDefault();
  deleteRow(this);
});

// function deleteFoodRow (row) {
//   var doomedRow = $(row).parents('tr')
//   var name      = doomedRow.children('td')[0].innerHTML;
//   var calories  = doomedRow.children('td')[1].innerHTML;
//   var food  = new Food(name, calories);

//   food.delete();
//   doomedRow.remove();
// };

// addFoodButton.on('click', function (event) {
//   event.preventDefault();
//   var name = $('input[name=name]').val();
//   var calories = $('input[name=calories]').val();
//   var food = new Food(name, calories);
//   food.store();
//   addToTable(name, calories, 'food');
//   $('input[name=name]').val('');
//   $('input[name=calories]').val('');
// });


