
  // var someFood = new Food();

var $ = require('jquery');

// exercise vars
var Exercise = require('../exercise');
var addExerciseButton = $('.add-exercise');

// food vars
var Food = require('./foods');
var addFoodButton = $('.add-food');

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

function addToTable(name, calories, table) {
  var table = table
  var row = '<tr><td>' +name+ '</td><td>' +calories+ '</td><td><a href="#" class="delete-'+table+' material-icons">delete</a></td></tr>'
  $('.'+table+'s > tbody').prepend(row);
};


// exercise stuff

$('.exercises').on('click', '.delete-exercise', function (event) {
  event.preventDefault();
  deleteExerciseRow(this);
});

function deleteExerciseRow (row) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  var exercise  = new Exercise(name, calories);

  exercise.delete();
  doomedRow.remove();
};

addExerciseButton.on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val();
  var calories = $('input[name=calories]').val();
  var exercise = new Exercise(name, calories);
  exercise.store();
  addToTable(name, calories, 'exercise');
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});

// function addToTable(name, calories) {
//   var row = '<tr><td>' +name+ '</td><td>' +calories+ '</td><td><a href="#" class="delete-exercise material-icons">delete</a></td></tr>'
//   $('.exercises > tbody').prepend(row);
// };



// food stuff

$('.foods').on('click', '.delete-food', function (event) {
  event.preventDefault();
  deleteFoodRow(this);
});

function deleteFoodRow (row) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  var food  = new Food(name, calories);

  food.delete();
  doomedRow.remove();
};

addFoodButton.on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val();
  var calories = $('input[name=calories]').val();
  var food = new Food(name, calories);
  food.store();
  addToTable(name, calories, 'food');
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});


