var $ = require('jquery');

// exercise stuff

var addExerciseButton = $('.add-exercise');

addExerciseButton.on('click', function (event) {
  event.preventDefault();
  console.log('winner winner chicken dinner');
})

function appendToExerciseTable(name, calories) {
  
}
