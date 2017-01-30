var $ = require('jquery');
var _ = require('lodash');

require('../css/main.scss');

var Food = require('./foods');

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
      // editCorrectTable(table, newName, newCalories, oldName, oldCalories);
      editFoodStorage(newName, newCalories, oldName, oldCalories);
      el.blur();
    }
    }, true);
};

function addEventListenerForMousedown (table, className, oldName, oldCalories, el) {
  document.addEventListener('mousedown', function (event) {
    var newName      = recordCellHtmlName(className);
    var newCalories  = recordCellHtmlCalories(className);
    editFoodStorage(newName, newCalories, oldName, oldCalories);
    // editCorrectTable(table, newName, newCalories, oldName, oldCalories);
    el.blur();
  }, true);
}

// function editCorrectTable (table, newName, newCalories, oldName, oldCalories) {
//     switch(table) {
//       case 'foods':
//         editFoodStorage(newName, newCalories, oldName, oldCalories);
//         break;
//       case 'exercises':
//         editExerciseStorage(newName, newCalories, oldName, oldCalories);
//         break;
//       case 'breakfast':
//         editBreakfastStorage(newName, newCalories, oldName, oldCalories);
//         break;
//       case 'lunch':
//         editLunchStorage(newName, newCalories, oldName, oldCalories);
//         break;
//       case 'dinner':
//         editDinnerStorage(newName, newCalories, oldName, oldCalories);
//         break;
//       case 'snacks':
//         editSnacksStorage(newName, newCalories, oldName, oldCalories);
//         break;
//       case 'exercise':
//         editExerciseStorage(newName, newCalories, oldName, oldCalories);
//         break;
//       }
// }

function editFoodStorage (newName, newCalories, oldName, oldCalories) {
  var food  = new Food(newName, newCalories);
  food.edit(oldName, oldCalories);
};

TableInitialize("foods");

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

function deleteRow (row, table) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  deleteLocalStorage(name, calories, table)
  doomedRow.remove();
};

function deleteLocalStorage(name, calories, table) {
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
  case 'exercise':
    var exercise  = new Exercise(name, calories);
    exercise.delete();
    break;
  }
}

// Food Table-------------------------------------------------------------------------

$('.foods').on('click', '.delete-foods', function (event) {
  event.preventDefault();
  deleteRow(this, 'foods');
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
