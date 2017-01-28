var $ = require('jquery');
require('../css/main.scss');

// exercise vars
var Exercise = require('./exercise');
var addExerciseButton = $('.add-exercise');

// food vars
var Food = require('./foods');
var addFoodButton = $('.add-food');

// exercise table

(function exerciseTableInitialize () {
  exercisesJSON = localStorage.getItem('exercises');
  var exercises = JSON.parse(exercisesJSON);
  if (exercises !== null) {
    for (var i = 0; i < exercises.length; i++) {
      addExerciseToTable(exercises[i].name, exercises[i].calories);
    };
    $('tr').each(function(i) {
      $(this).removeClass('new-row')
      $( this ).addClass( "row" + i );
    });
  };
})();

// food table

(function foodTableInitialize () {
  foodsJSON = localStorage.getItem('foods');
  var foods = JSON.parse(foodsJSON);
  if (foods !== null) {
    for (var i = 0; i < foods.length; i++) {
      addFoodToTable(foods[i].name, foods[i].calories);
    };
    $('tr').each(function(i) {
      $(this).removeClass('new-row')
      $( this ).addClass( "row" + i );
    });
  };

})();


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
  addExerciseToTable(name, calories);
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});

function addExerciseToTable(name, calories) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-exercise material-icons">delete</a></td></tr>'
  $('.exercises > tbody').prepend(row);
  makeEditable('exercise');
};


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
  if (!name) {
    $('input[name=name]').after("<div class='form-error'>Please enter a food name</div>")
    return
  } else if (!calories) {
    $('input[name=calories]').after("<div class='form-error'>Please enter a calorie amount</div>")
    return
  }
  $('.form-error').remove();
  var food = new Food(name, calories);
  food.store();
  addFoodToTable(name, calories);
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});

function addFoodToTable(name, calories) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-food material-icons">delete</a></td></tr>'
  $('.foods > tbody').prepend(row);
  makeEditable('food');
};

//editable ----------------------------------------------------------------------

function recordCellHtmlName (className) {
  return $('.'+className).children('td')[0].innerHTML
}

function recordCellHtmlCalories (className) {
  return $('.'+className).children('td')[1].innerHTML
}

function classNameClickedRow (clicked) {
  return clicked.parentElement.className;
}

function editFoodStorage (newName, newCalories, oldName, oldCalories) {
  var food  = new Food(newName, newCalories);
  food.edit(oldName, oldCalories);
}

function editExerciseStorage (newName, newCalories, oldName, oldCalories) {
  var exercise  = new Exercise(newName, newCalories);
  exercise.edit(oldName, oldCalories);
}

function addEventListenerForEnter (table, className, oldName, oldCalories, el) {
  document.getElementById(table + '-table').addEventListener('keydown', function (event) {
    if(event.keyCode == 13 || event.keyCode == 9) {
      event.preventDefault();
      var newName      = recordCellHtmlName(className);
      var newCalories  = recordCellHtmlCalories(className);
      switch(table) {
      case 'food':
        editFoodStorage(newName, newCalories, oldName, oldCalories)
        break;
      case 'exercise':
        editExerciseStorage(newName, newCalories, oldName, oldCalories)
        break;
      }
      el.blur();
    }
    }, true);
};

function addEventListenerForMousedown (table, className, oldName, oldCalories, el) {
  document.addEventListener('mousedown', function (event) {
    var newName      = recordCellHtmlName(className);
    var newCalories  = recordCellHtmlCalories(className);
    switch(table) {
    case 'food':
      editFoodStorage(newName, newCalories, oldName, oldCalories)
      break;
    case 'exercise':
      editExerciseStorage(newName, newCalories, oldName, oldCalories)
      break;
    }
    el.blur();
  }, true);
}


function makeEditable(table) {
  $('.'+table+'s').on('click', 'td', function (event) {
    var className    = classNameClickedRow(this);
    var oldName      = recordCellHtmlName(className);
    var oldCalories  = recordCellHtmlCalories(className);
    var el = event.target;
    addEventListenerForEnter(table, className, oldName, oldCalories, el);
    addEventListenerForMousedown(table, className, oldName, oldCalories, el);
  });
};

// -------------------------------------------------------------------------------
