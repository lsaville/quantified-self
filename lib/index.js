var $ = require('jquery');

// exercise stuff
var Exercise = require('../exercise');
var addExerciseButton = $('.add-exercise');
var deleteExerciseButton = $('.delete-exercise');

/*
deleteExerciseButton.on('click', function (event) {
  event.preventDefault();
  console.log(this + ' is a party');
})
*/
deleteExerciseButton.on('click', function (event) {
  event.preventDefault;
  console.log('crush it');
  deleteRow();
})

function deleteRow () {
  var blah = $(this)
    console.log(blah)
  var doomedRow = row.parent().parent().rowIndex;
  console.log(doomedRow);
} 

addExerciseButton.on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val(); 
  var calories = $('input[name=calories]').val(); 
  var exercise = new Exercise(name, calories);
  exercise.store();
  addToTable(name, calories);
})

function addToTable(name, calories) {
  var row = '<tr><td>' +name+ '</td><td>' +calories+ '</td><td><a href="#" class="delete-exercise material-icons">delete</a></td></tr>'
  $('.exercises').append(row);
}

(function tableInitialize () {
  exercisesJSON = localStorage.getItem('exercises'); 
  if (!exercises) {};
  var exercises = JSON.parse(exercisesJSON);
  for (var i = 0; i < exercises.length; i++) {
    addToTable(exercises[i].name, exercises[i].calories);
  }
})()
