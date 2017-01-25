var $ = require('jquery');

// exercise stuff
var Exercise = require('../exercise');
var addExerciseButton = $('.add-exercise');

addExerciseButton.on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val(); 
  var calories = $('input[name=calories]').val(); 
  var exercise = new Exercise(name, calories);
  exercise.store();
  addToTable(name, calories);
})

function addToTable(name, calories) {
  var row = '<tr><td>' +name+ '</td><td>' +calories+ '</td><td><a href="#" class="material-icons">delete</a></td></tr>'
  $('.exercises').append(row);
}
