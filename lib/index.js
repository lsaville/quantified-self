var $ = require('jquery');
var _ = require('lodash');

require('../css/main.scss');

// meal vars
var Exercises = require('./exercises');
var Food = require('./foods');
var Breakfast = require('./breakfast');
var Lunch = require('./lunch');
var Dinner = require('./dinner');
var Snacks = require('./snacks');
var Exercise = require('./exercise')

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
  return $(clicked).parents('tr').attr('class');
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
      case 'diary-foods':
        editFoodStorage(newName, newCalories, oldName, oldCalories);
        break;
      case 'diary-exercises':
        editExercisesStorage(newName, newCalories, oldName, oldCalories);
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
      case 'exercise':
        editExerciseStorage(newName, newCalories, oldName, oldCalories);
        break;
      }
}

function editFoodStorage (newName, newCalories, oldName, oldCalories) {
  var food  = new Food(newName, newCalories);
  food.edit(oldName, oldCalories);
};

function editExercisesStorage (newName, newCalories, oldName, oldCalories) {
  var exercises  = new Exercises(newName, newCalories);
  exercises.edit(oldName, oldCalories);
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

function editExerciseStorage (newName, newCalories, oldName, oldCalories) {
  var exercise  = new Exercise(newName, newCalories);
  exercise.edit(oldName, oldCalories);
};

// food to meal table

TableInitialize("breakfast");
TableInitialize("lunch");
TableInitialize("dinner");
TableInitialize("snacks");
TableInitialize("diary-foods");
TableInitialize("diary-exercises");
TableInitialize("exercise")

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
      $(this).removeAttr('class');
      $( this ).addClass( "row" + i );
    });
  };
};

function addToTable(name, calories, table) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-'+table+' material-icons">delete</a></td></tr>'
  $('.'+table+' > tbody').prepend(row);
  makeEditable(table);
  calculateCaloriesTotal(table);
  calculateRemainingCalories(table);
};

function calculateCaloriesTotal(table) {
    var sum = addCalories(table);
    $('#' + table + '-total-calories').text(sum);
};

function calculateRemainingCalories(table) {
  var calories = addCalories(table);
  var remainingCaloriesCell = $('#' + table + '-remaining-calories');
  var exerciseTotalCell = $('#exercise-total-calories');

  switch(table){
    case 'exercise':
      setExerciseTotalStyle(exerciseTotalCell, calories);
    case 'breakfast':
      var difference = 400 - calories;
      setRemainingCaloriesCell(remainingCaloriesCell, difference)
      break;
    case 'lunch':
      var difference = 600 - calories;
      setRemainingCaloriesCell(remainingCaloriesCell, difference)
      break;
    case 'dinner':
      var difference = 800 - calories;
      setRemainingCaloriesCell(remainingCaloriesCell, difference)
      break;
    case 'snacks':
      var difference = 200 - calories;
      setRemainingCaloriesCell(remainingCaloriesCell, difference)
      break;
  }
}

function setExerciseTotalStyle(cell, calories) {
  cell.removeClass('special-red special-green');
  if (calories > 0) {
    cell.addClass('special-green');
  }
}

function setRemainingCaloriesCell(cell, difference) {
  cell.removeClass('special-red special-green');
  if (difference < 0) {
    cell.addClass('special-red');
  } else {
    cell.addClass('special-green');
  }
  cell.text(difference);
}

function addCalories(table) {
  var tableContents = $('#' + table + '-table-body');
  var sum = 0;
  for(var i = 0; i < tableContents[0].children.length; i++) {
    sum += parseInt(tableContents[0].children[i].children[1].innerHTML);
  }
  return sum;
}

function addToCheckBoxTable(name, calories, table) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><input type="checkbox" id="'+name+'"/><label for="'+name+'"></label></td></tr>'
  $('.'+table+' > tbody').prepend(row);
  makeEditable(table);
};

function deleteRow (row, table) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  deleteLocalStorage(name, calories, table)
  doomedRow.remove();
  calculateCaloriesTotal(table);
  calculateRemainingCalories(table);
};

function deleteLocalStorage(name, calories, table) {
  switch(table) {
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
    case 'exercise':
      var exercise  = new Exercise(name, calories);
      exercise.delete();
      break;
    }
}

function checkedBoxInfo (table, fromTable) {
var meals = $('.diary-'+fromTable+' input[type=checkbox]:checked');
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
  case 'exercise':
    var exercise  = new Exercise(food, calories);
    exercise.store();
    break;
  }
}

// Breakfast Diary-------------------------------------------------------------------------

$('.breakfast').on('click', '.delete-breakfast', function (event) {
  event.preventDefault();
  deleteRow(this, 'breakfast');
});


$('.add-breakfast').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('breakfast', 'foods');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})

// Diary Lunch---------------------------------------------------------

$('.lunch').on('click', '.delete-lunch', function (event) {
  event.preventDefault();
  deleteRow(this, 'lunch');
});

$('.add-lunch').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('lunch', 'foods');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})

// Diary Dinner -----------------------------------------------------

$('.dinner').on('click', '.delete-dinner', function (event) {
  event.preventDefault();
  deleteRow(this, 'dinner');
});

$('.add-dinner').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('dinner', 'foods');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})


// Diary Snack -----------------------------------------------------

$('.snacks').on('click', '.delete-snacks', function (event) {
  event.preventDefault();
  deleteRow(this, 'snacks');
});

$('.add-snacks').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('snacks', 'foods');
  $('.diary-foods input[type=checkbox]').prop('checked', false);
})

// Diary Exercise -----------------------------------------------------

$('.exercise').on('click', '.delete-exercise', function (event) {
  event.preventDefault();
  deleteRow(this, 'exercise');
});

$('.add-exercise').on('click', function (e) {
  e.preventDefault();
  checkedBoxInfo('exercise', 'exercises');
  $('.diary-exercises input[type=checkbox]').prop('checked', false);
})


// Filter
function displayDate(date) {
  $('#date').text(date);
}

(function initializeDays() {
  var today     = new Date;
  var humanDate = today.toDateString();
  var dayJSON  = localStorage.getItem(humanDate);
  // var day       = dayTemplate(humanDate);
  displayDate(humanDate);

  if (!dayJSON) {
    dayJSON = JSON.stringify(dayTemplate());
    localStorage.setItem(humanDate, dayJSON);
  }
})();

function dayTemplate(date) {
  var dayContents = { breakfast: '[]',
                      lunch:     '[]',
                      dinner:    '[]',
                      snacks:    '[]',
                      exercise:  '[]'
                     };
  return dayContents;
}

$('#day-back').on('click', function() {
  //empty tables
  var current = new Date($('#date').text())
  var dayBack = new Date(current - 1).toDateString();
  displayDate(dayBack);
  dayJSON = localStorage.getItem(dayBack);
  if (!dayJSON) {
    dayJSON = JSON.stringify(dayTemplate());
    localStorage.setItem(dayBack, dayJSON);
    //load tables that are empty
  } else {
    //grab the day and its things and make tables from it
  }
  //check localstorage, if the day isnt in the days array, add the day with the day template like above
  //otherwise, take the day's info and create the tables from it
})

$('#day-forward').on('click', function() {
  var current    = new Date($('#date').text())
  var dayForward = new Date(current.setDate(current.getDate() + 1)).toDateString();
  displayDate(dayForward);
  dayJSON = localStorage.getItem(dayForward);
  if (!dayJSON) {
    dayJSON = JSON.stringify(dayTemplate());
    localStorage.setItem(dayForward, dayJSON);
  }
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
