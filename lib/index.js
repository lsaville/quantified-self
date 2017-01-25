var $ = require('jquery');

// exercise stuff
var Exercise = require('../exercise');
var addExerciseButton = $('.add-exercise');

(function tableInitialize () {
  exercisesJSON = localStorage.getItem('exercises');
  if (!exercises) {};
  var exercises = JSON.parse(exercisesJSON);
  for (var i = 0; i < exercises.length; i++) {
    addToTable(exercises[i].name, exercises[i].calories);
  }
})()

$('.delete-exercise').on('click', function (event) {
  event.preventDefault();
  deleteRow(this);
})

function deleteRow (row) {
  var doomedRow = row.parentNode.parentNode;
  doomedRow.parentNode.removeChild(doomedRow);
}

addExerciseButton.on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val();
  var calories = $('input[name=calories]').val();
  var exercise = new Exercise(name, calories);
  exercise.store();
  addToTable(name, calories);
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
})

function addToTable(name, calories) {
  var row = '<tr><td>' +name+ '</td><td>' +calories+ '</td><td><a href="#" class="delete-exercise material-icons">delete</a></td></tr>'
  $('.exercises > tbody').prepend(row);
}
