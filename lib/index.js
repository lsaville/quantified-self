var $ = require('jquery');

require('../css/main.scss');

// meal vars
var Exercises = require('./exercises');
var Food = require('./foods');
var Breakfast = require('./breakfast');
var Lunch = require('./lunch');
var Dinner = require('./dinner');
var Snacks = require('./snacks');

//editable ----------------------------------------------------------------------


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

function recordCellHtmlName (className) {
  return $('.'+className).children('td')[0].innerHTML;
};

function recordCellHtmlCalories (className) {
  return $('.'+className).children('td')[1].innerHTML;
};

function classNameClickedRow (clicked) {
  return clicked.parentElement.className;
};

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

function editFoodStorage (newName, newCalories, oldName, oldCalories) {
  var food  = new Food(newName, newCalories);
  food.edit(oldName, oldCalories);
};

function editExerciseStorage (newName, newCalories, oldName, oldCalories) {
  var exercise  = new Exercises(newName, newCalories);
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

// food to meal table

TableInitialize("breakfast");
TableInitialize("lunch");
TableInitialize("dinner");
TableInitialize("snacks");
TableInitialize("diary-foods");
TableInitialize("diary-exercises");
TableInitialize("foods");
TableInitialize("exercises")

function TableInitialize (table) {
  if (table === 'diary-foods' || table === 'diary-exercises') {
    mealsJSON = localStorage.getItem(table.substring(6));
  } else {
    mealsJSON = localStorage.getItem(table)
  }
  var meals = JSON.parse(mealsJSON);
  if (meals !== null) {
    for (var i = 0; i < meals.length; i++) {
      if (table === 'diary-foods' || table === 'diary-exercises') {
      addToCheckBoxTable(meals[i].name, meals[i].calories, table)
      } else {
      addToTable(meals[i].name, meals[i].calories, table)
      }
    };
    $('tr').each(function(i) {
      $(this).removeClass('new-row');
      $( this ).addClass( "row" + i );
    });
  };
};


function addToTable(name, calories, table) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-'+table+' material-icons">delete</a></td></tr>'
  $('.'+table+' > tbody').prepend(row);
  makeEditable(table);
};

function addToCheckBoxTable(name, calories, table) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><input type="checkbox" id="'+name+'"/><label for="'+name+'"></label></td></tr>'
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
    var foods  = new Food(name, calories);
    foods.delete();
    break;
  case 'exercises':
    var exercises  = new Exercises(name, calories);
    exercises.delete();
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
var meals = $('.diary-foods input[type=checkbox]:checked');
  _.forEach(meals, function(meal, index){
      food = $(meal).parents('tr').children('td')[0].innerHTML;
      calories = $(meal).parents('tr').children('td')[1].innerHTML;
      addToTable(food, calories, table)
      storeCheckedBoxInfo(table);
  });
}

function storeCheckedBoxInfo (table) {
  switch(table) {
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

// Food Table-------------------------------------------------------------------------

$('.foods').on('click', '.delete-foods', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'foods');
});

$('.add-food').on('click', function (e) {
  e.preventDefault();
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
  addToTable(name, calories, 'foods');
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
})

// Exercise Diary-------------------------------------------------------------------------

$('.exercises').on('click', '.delete-exercises', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'exercises');
});

$('.add-exercise').on('click', function (e) {
  e.preventDefault();
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
  var exercise = new Exercises(name, calories);
  exercise.store();
  addToTable(name, calories, 'exercises');
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});

// Breakfast Diary-------------------------------------------------------------------------

$('.breakfast').on('click', '.delete-breakfast', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'breakfast');
});


$('.add-breakfast').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('breakfast');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})

// Diary Lunch---------------------------------------------------------

$('.lunch').on('click', '.delete-lunch', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'lunch');
});

$('.add-lunch').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('lunch');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})

// Diary Dinner -----------------------------------------------------

$('.dinner').on('click', '.delete-dinner', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'dinner');
});

$('.add-dinner').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('dinner');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})


// Diary Snack -----------------------------------------------------

$('.snacks').on('click', '.delete-snacks', function (event) {
  event.preventDefault();
  deleteMealDiaryRow(this, 'snacks');
});

$('.add-snacks').on('click', function (e) {
  e.preventDefault();
  ;
  checkedBoxInfo('snacks');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})

function displayDate(date) {
  $('#date').text(date);
}

(function initializeDays() {
  var today     = new Date;
  var humanDate = today.toDateString();
  var daysJSON  = localStorage.getItem('days');
  var day       = dayTemplate(humanDate);
  displayDate(humanDate);

  if (!daysJSON) {
    daysJSON = '[' + JSON.stringify(day) + ']';
    localStorage.setItem('days', daysJSON);
  }
})();

function dayTemplate(date) {
  var dayContents = { date: date,
                      breakfast: '[]',
                      lunch:     '[]',
                      dinner:    '[]',
                      snacks:    '[]',
                      exercise:  '[]'
                     };
  return dayContents;
}

$('#day-back').on('click', function() {
  var current = new Date($('#date').text())
  var dayBack = new Date(current - 1).toDateString();
  displayDate(dayBack);
  //check localstorage, if the day isnt in the days array, add the day with the day template like above
  //otherwise, take the day's info and create the tables from it
})

$('#day-forward').on('click', function() {
  var current    = new Date($('#date').text())
  var dayForward = new Date(current.setDate(current.getDate() + 1)).toDateString();
  displayDate(dayForward);
  //check localstorage, if the day isnt in the days array, add the day with the day template like above
  //otherwise, take the day's info and create the tables from it
})

$('#exercise-name-filter').on('keyup', function () {
  var searchTerm = this.value.toUpperCase();
  var tableContents = $('#exercise-table-body').children();
  for(var i = 0; i < tableContents.length; i++) {
    var tableName = tableContents[i].children[0].innerHTML.toUpperCase();
    if (tableName.indexOf(searchTerm)) {
      tableContents[i].style.display = 'none';
    } else {
      tableContents[i].style.display = '';
    }
  }
})

$('#food-name-filter').on('keyup', function () {
  var searchTerm = this.value.toUpperCase();
  var tableContents = $('#food-table-body').children();
  for(var i = 0; i < tableContents.length; i++) {
    var tableName = tableContents[i].children[0].innerHTML.toUpperCase();
    if (tableName.indexOf(searchTerm)) {
      tableContents[i].style.display = 'none';
    } else {
      tableContents[i].style.display = '';
    }
  }
})
