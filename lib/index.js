var $ = require('jquery');
require('../css/main.scss');

// exercise stuff
var Exercise = require('./exercise');
var addExerciseButton = $('.add-exercise');

(function tableInitialize () {
  exercisesJSON = localStorage.getItem('exercises');
  var exercises = JSON.parse(exercisesJSON);
  if (exercises !== null) {
   for (var i = 0; i < exercises.length; i++) {
     addToTable(exercises[i].name, exercises[i].calories);
   }
 };
})()

// $('#table-body').on('focusout', '.cell', function() {
//   var newContent = this.innerHTML;
//   var localStorageIndex = this.parentNode.rowIndex - 1;
//   var cellType = this.classList[0];
//   editLocalStorageExercise(cellType, localStorageIndex, newContent);
// })

$('#table-body').on('focusout keyup', '.cell', function(e) {
  debugger;
  var newContent = this.innerHTML;
  var localStorageIndex = this.parentNode.rowIndex - 1;
  var cellType = this.classList[0];
  editLocalStorageExercise(cellType, localStorageIndex, newContent);
})

$('#table-body').on('keyup', '.cell', function(e) {
  debugger;
})

function editLocalStorageExercise(cellType, index, newContent) {
  exercisesJSON = localStorage.getItem('exercises');
  var exercises = JSON.parse(exercisesJSON);

  if (cellType === 'name') {
    exercises.reverse()[index].name = newContent;
  } else if (cellType === 'calories') {
    exercises.reverse()[index].calories = newContent;
  }

  exercisesJSON = JSON.stringify(exercises.reverse());
  localStorage.setItem('exercises', exercisesJSON);
}

$('#table-body').on('click', '.delete-exercise', function (event) {
  event.preventDefault();
  deleteRow(this);
})

function deleteRow (row) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  var exercise  = new Exercise(name, calories);

  exercise.delete();
  doomedRow.remove();
}

$('.add-exercise').on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val();
  var calories = $('input[name=calories]').val();
  if (!name) {
    $('input[name=name]').after("<div class='form-error'>Please enter an exercise name</div>")
    return
  } else if (!calories) {
    $('input[name=calories]').after("<div class='form-error'>Please enter a calorie amount</div>")
    return
  }
  $('.form-error').remove();
  var exercise = new Exercise(name, calories);
  exercise.store();
  addToTable(name, calories);
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
})

function addToTable(name, calories) {
  var row = '<tr><td class="name cell" contentEditable="true">' +name+ '</td><td class="calories cell" contentEditable="true">' +calories+ '</td><td><a href="#" class="delete-exercise material-icons">delete</a></td></tr>'
  $('.exercises > tbody').prepend(row);
}
