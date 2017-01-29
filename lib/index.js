var $ = require('jquery');

require('../css/main.scss');

// exercise vars
var Exercise = require('./exercise');
var addExerciseButton = $('.add-exercise');

// food vars
var Food = require('./foods');
var addFoodButton = $('.add-food');

// meal vars
var Breakfast = require('./breakfast');
var Lunch = require('./lunch');
var Dinner = require('./dinner');
var Snacks = require('./snacks');

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
      $(this).removeClass('new-row');
      $( this ).addClass( "row" + i );
    });
  };

})();

// food diary table

(function foodDiaryTableInitialize () {
  foodsJSON = localStorage.getItem('foods');
  var foods = JSON.parse(foodsJSON);
  if (foods !== null) {
    for (var i = 0; i < foods.length; i++) {
      addFoodToDiaryTable(foods[i].name, foods[i].calories);
    };
    $('tr').each(function(i) {
      $(this).removeClass('new-row');
      $( this ).addClass( "row" + i );
    });
  };

})();

// exercise diary table

(function exerciseDiaryTableInitialize () {
  exercisesJSON = localStorage.getItem('exercises');
  var exercises = JSON.parse(exercisesJSON);
  if (exercises !== null) {
    for (var i = 0; i < exercises.length; i++) {
      addExerciseToDiaryTable(exercises[i].name, exercises[i].calories);
    };
    $('tr').each(function(i) {
      $(this).removeClass('new-row');
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
  makeEditable('exercises');
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
  makeEditable('foods');
};

//editable ----------------------------------------------------------------------

function recordCellHtmlName (className) {
  return $('.'+className).children('td')[0].innerHTML;
};

function recordCellHtmlCalories (className) {
  return $('.'+className).children('td')[1].innerHTML;
};

function classNameClickedRow (clicked) {
  return clicked.parentElement.className;
};

function editFoodStorage (newName, newCalories, oldName, oldCalories) {
  var food  = new Food(newName, newCalories);
  food.edit(oldName, oldCalories);
};

function editExerciseStorage (newName, newCalories, oldName, oldCalories) {
  var exercise  = new Exercise(newName, newCalories);
  exercise.edit(oldName, oldCalories);
};

function editBreakfastStorage (newName, newCalories, oldName, oldCalories) {
  var breakfast  = new Breakfast(newName, newCalories);
  breakfast.edit(oldName, oldCalories);
};

function editLunchStorage (newName, newCalories, oldName, oldCalories) {
  var lunch  = new Lunch(newName, newCalories);
  lunch.edit(oldName, oldCalories);
};

function editDinnerStorage (newName, newCalories, oldName, oldCalories) {
  var dinner  = new Dinner(newName, newCalories);
  dinner.edit(oldName, oldCalories);
};

function editSnacksStorage (newName, newCalories, oldName, oldCalories) {
  var snacks  = new Snacks(newName, newCalories);
  snacks.edit(oldName, oldCalories);
};


function editCorrectTable (table, newName, newCalories, oldName, oldCalories) {
    switch(table) {
      case 'foods':
        editFoodStorage(newName, newCalories, oldName, oldCalories);
        break;
      case 'exercises':
        editExerciseStorage(newName, newCalories, oldName, oldCalories);
        break;
      case 'breakfast':
        editBreakfastStorage(newName, newCalories, oldName, oldCalories);
        break;
      case 'lunch':
        editLunchStorage(newName, newCalories, oldName, oldCalories);
        break;
      case 'dinner':
        editDinnerStorage(newName, newCalories, oldName, oldCalories);
        break;
      case 'snacks':
        editSnacksStorage(newName, newCalories, oldName, oldCalories);
        break;
      }
}

function addEventListenerForEnter (table, className, oldName, oldCalories, el) {
  document.getElementById(table + '-table').addEventListener('keydown', function (event) {
    if(event.keyCode == 13 || event.keyCode == 9) {
      event.preventDefault();
      var newName      = recordCellHtmlName(className);
      var newCalories  = recordCellHtmlCalories(className);
      editCorrectTable(table, newName, newCalories, oldName, oldCalories);
      el.blur();
    }
    }, true);
};

function addEventListenerForMousedown (table, className, oldName, oldCalories, el) {
  document.addEventListener('mousedown', function (event) {
    var newName      = recordCellHtmlName(className);
    var newCalories  = recordCellHtmlCalories(className);
    editCorrectTable(table, newName, newCalories, oldName, oldCalories);
    el.blur();
  }, true);
}


function makeEditable(table) {
  $('.'+table).on('click', 'td', function (event) {
    var className    = classNameClickedRow(this);
    var oldName      = recordCellHtmlName(className);
    var oldCalories  = recordCellHtmlCalories(className);
    var el = event.target;
    addEventListenerForEnter(table, className, oldName, oldCalories, el);
    addEventListenerForMousedown(table, className, oldName, oldCalories, el);
  });
};

// Foods Diary Add to Table -------------------------------------------------------------------------

function addFoodToDiaryTable(name, calories) {
  var row = '<tr id="editable" class="new-row" ><td><input type="checkbox" id="'+name+'"/><label for="'+name+'"></label></td><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td></tr>'
  $('.foods-diary > tbody').prepend(row);
  makeEditable('foods');
};

// Exercises Diary Add to Table-------------------------------------------------------------------------

function addExerciseToDiaryTable(name, calories) {
  var row = '<tr id="editable" class="new-row" ><td><input type="checkbox" id="'+name+'"/><label for="'+name+'"></label></td><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td></tr>'
  $('.exercises-diary > tbody').prepend(row);
  makeEditable('exercises');
};


// food to meal table

foodMealTableInitialize("breakfast");
foodMealTableInitialize("lunch");
foodMealTableInitialize("dinner");
foodMealTableInitialize("snacks");

function foodMealTableInitialize (table) {
  mealsJSON = localStorage.getItem(table);
  var meals = JSON.parse(mealsJSON);
  if (meals !== null) {
    for (var i = 0; i < meals.length; i++) {
      addFoodToMealDiaryTable(meals[i].name, meals[i].calories, table)
    };
    $('tr').each(function(i) {
      $(this).removeClass('new-row');
      $( this ).addClass( "row" + i );
    });
  };
};

function addFoodToMealDiaryTable(name, calories, table) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-'+table+' material-icons">delete</a></td></tr>'
  $('.'+table+' > tbody').prepend(row);
  makeEditable(table);
};

function deleteMealDiaryRow (row, table) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  deleteMealLocalStorage(name, calories, table)
  doomedRow.remove();
};

function deleteMealLocalStorage(name, calories, table) {
  switch(table) {
  case 'foods':
    break;
  case 'exercises':
    break;
  case 'breakfast':
    var breakfast  = new Breakfast(name, calories);
    breakfast.delete();
    break;
  case 'lunch':
    var lunch  = new Lunch(name, calories);
    lunch.delete();
    break;
  case 'dinner':
    var dinner  = new Dinner(name, calories);
    dinner.delete();
    break;
  case 'snacks':
    var snacks  = new Snacks(name, calories);
    snacks.delete();
    break;
  }
}

function checkedBoxInfo (table) {
var meals = $('.foods-diary input[type=checkbox]:checked');
  _.forEach(meals, function(meal, index){
      food = $(meal).parents('tr').children('td')[1].innerHTML;
      calories = $(meal).parents('tr').children('td')[2].innerHTML;
      addFoodToMealDiaryTable(food, calories, table)
      storeCheckedBoxInfo(table);
  });
}

function storeCheckedBoxInfo (table) {
  switch(table) {
  case 'foods':
    break;
  case 'exercises':
    break;
  case 'breakfast':
    var breakfast  = new Breakfast(food, calories);
    breakfast.store();
    break;
  case 'lunch':
    var lunch  = new Lunch(food, calories);
    lunch.store();
    break;
  case 'dinner':
    var dinner  = new Dinner(food, calories);
    dinner.store();
    break;
  case 'snacks':
    var snacks  = new Snacks(food, calories);
    snacks.store();
    break;
  }
}
 
// Breakfast Diary-------------------------------------------------------------------------

$('.breakfast').on('click', '.delete-breakfast', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'breakfast');
});
  

$('.add-breakfast').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('breakfast');
  $('.foods-diary input[type=checkbox]').prop('checked', false);
})

// Diary Lunch---------------------------------------------------------

$('.lunch').on('click', '.delete-lunch', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'lunch');
});

$('.add-lunch').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('lunch');
  $('.foods-diary input[type=checkbox]').prop('checked', false);
})

// Diary Dinner -----------------------------------------------------

$('.dinner').on('click', '.delete-dinner', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'dinner');
});

$('.add-dinner').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('dinner');
  $('.foods-diary input[type=checkbox]').prop('checked', false);
})


// Diary Snack -----------------------------------------------------

$('.snacks').on('click', '.delete-snacks', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'snacks');
});

$('.add-snacks').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('snacks');
  $('.foods-diary input[type=checkbox]').prop('checked', false);
})

// Filter


$('input[name=name-filter]').on('keyup', function () {
  var searchTerm = this.value.toUpperCase();
  var tableContents = $('#table-body').children();
  for(var i = 0; i < tableContents.length; i++) {
    var tableName = tableContents[i].children[0].innerHTML.toUpperCase();
    if (tableName.indexOf(searchTerm)) {
      tableContents[i].style.display = 'none';
    } else {
      tableContents[i].style.display = '';
    }
  }
})

