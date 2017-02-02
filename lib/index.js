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
var Editable = require('./editable')


initializeDays();
makeTables();

// food to meal table
function makeTables() {
  TableInitialize("breakfast");
  TableInitialize("lunch");
  TableInitialize("dinner");
  TableInitialize("snacks");
  TableInitialize("diary-foods");
  TableInitialize("diary-exercises");
  TableInitialize("exercise")
}

function TableInitialize (table) {
  if (table === 'diary-foods' || table === 'diary-exercises') {
    mealsJSON = localStorage.getItem(table.substring(6));
    var meals = JSON.parse(mealsJSON);
  } else {
    mealsJSON = localStorage.getItem($('#date').text())
    var meals = JSON.parse(mealsJSON)[table];
  }
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
  var tempUniqClassName = (name+calories+table).replace(/\s+/g, '')
  var row = '<tr id="editable" class="'+tempUniqClassName+'" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-'+table+' material-icons">delete</a></td></tr>'
  $('.'+table+' > tbody').prepend(row);
  var editable  = new Editable();
  editable.make(table);
  calculateCaloriesTotal(table);
  calculateRemainingCalories(table);
  caloriesConsumedTotal();
  caloriesBurnedTotal();
  caloriesRemainingTotal();
};

function addToCheckBoxTable(name, calories, table) {
  var row = '<tr id="editable" class="new-row" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><input type="checkbox" id="'+name+'"/><label for="'+name+'"></label></td></tr>'
  $('.'+table+' > tbody').prepend(row);
  var editable  = new Editable();
  editable.make(table);
};


// Calculations ------------------------------

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


// Total Calories table _________________________

function addTotalCaloriesConsumed() {
  return addCalories('breakfast') + addCalories('lunch') + addCalories('dinner') + addCalories('snacks')
}

function caloriesConsumedTotal() {
    var sum = addTotalCaloriesConsumed();
    $('#totals-calories-consumed').text(sum);
};

function addTotalCaloriesBurned() {
  return addCalories('exercise')
}

function caloriesBurnedTotal() {
    var sum = addTotalCaloriesBurned();
    var cell = $('#totals-calories-burned')
    cell.text(sum);
    cell.removeClass('special-green');
      if (sum > 0) {
    cell.addClass('special-green');
  }
};

function caloriesRemainingTotal() {
  var sum = parseInt($('#totals-goal-calories').text(), 10) - addTotalCaloriesConsumed()
  var cell = $('#totals-remaining-calories')
  cell.text(sum)
  cell.removeClass('special-red special-green');
  if (sum < 0) {
    cell.addClass('special-red');
  } else if (sum > 0) {
    cell.addClass('special-green');
  }
}

// Delete-------------------------------------

function deleteRow (row, table) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  deleteLocalStorage(name, calories, table)
  doomedRow.remove();
  calculateCaloriesTotal(table);
  calculateRemainingCalories(table);
  caloriesConsumedTotal();
  caloriesBurnedTotal();
  caloriesRemainingTotal();
};

function nukeRows (table, tableBody) {
  var length = tableBody.children().length
  for(var i = 0; i < length; i++) {
    tableBody.children()[0].remove();
  }
  if (table === 'foods' || table === 'exercises') { return };
  calculateCaloriesTotal(table);
  calculateRemainingCalories(table);
};

function nuke() {
  nukeRows('exercise', $('#exercise-table-body'));
  nukeRows('breakfast', $('#breakfast-table-body'));
  nukeRows('lunch', $('#lunch-table-body'));
  nukeRows('dinner', $('#dinner-table-body'));
  nukeRows('snacks', $('#snacks-table-body'));
  nukeRows('exercises', $('#exercises-table-body'));
  nukeRows('foods', $('#foods-table-body'));
}

function deleteLocalStorage(name, calories, table) {
  switch(table) {
    case 'breakfast':
      var breakfast  = new Breakfast(name, calories);
      breakfast.delete($('#date').text());
      break;
    case 'lunch':
      var lunch  = new Lunch(name, calories);
      lunch.delete($('#date').text());
      break;
    case 'dinner':
      var dinner  = new Dinner(name, calories);
      dinner.delete($('#date').text());
      break;
    case 'snacks':
      var snacks  = new Snacks(name, calories);
      snacks.delete($('#date').text());
      break;
    case 'exercise':
      var exercise  = new Exercise(name, calories);
      exercise.delete($('#date').text());
      break;
    }
}

//  Storing checked box info ------------------------

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
    breakfast.store($('#date').text());
    break;
  case 'lunch':
    var lunch  = new Lunch(food, calories);
    lunch.store($('#date').text());
    break;
  case 'dinner':
    var dinner  = new Dinner(food, calories);
    dinner.store($('#date').text());
    break;
  case 'snacks':
    var snacks  = new Snacks(food, calories);
    snacks.store($('#date').text());
    break;
  case 'exercise':
    var exercise  = new Exercise(food, calories);
    exercise.store($('#date').text());
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


// Filter----------------------------------------

function displayDate(date) {
  $('#date').text(date);
}

function initializeDays() {
  var today     = new Date;
  var humanDate = today.toDateString();
  var dayJSON  = localStorage.getItem(humanDate);
  displayDate(humanDate);

  if (!dayJSON) {
    dayJSON = JSON.stringify(dayTemplate());
    localStorage.setItem(humanDate, dayJSON);
  }
}

function dayTemplate(date) {
  var dayContents = { breakfast: [],
                      lunch:     [],
                      dinner:    [],
                      snacks:    [],
                      exercise:  []
                     };
  return dayContents;
}

$('#day-back').on('click', function() {
  nuke();
  var current = new Date($('#date').text())
  var dayBack = new Date(current - 1).toDateString();
  displayDate(dayBack);
  dayJSON = localStorage.getItem(dayBack);
  if (!dayJSON) {
    dayJSON = JSON.stringify(dayTemplate());
    localStorage.setItem(dayBack, dayJSON);
    makeTables();
  } else {
    makeTables();
  }
})

$('#day-forward').on('click', function() {
  nuke();
  var current    = new Date($('#date').text())
  var dayForward = new Date(current.setDate(current.getDate() + 1)).toDateString();
  displayDate(dayForward);
  dayJSON = localStorage.getItem(dayForward);
  if (!dayJSON) {
    dayJSON = JSON.stringify(dayTemplate());
    localStorage.setItem(dayForward, dayJSON);
    makeTables();
  } else {
    makeTables();
  }
})

$('#exercise-name-filter').on('keyup', function () {
  var searchTerm = this.value.toUpperCase();
  var tableContents = $('#exercises-table-body').children();
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
  var tableContents = $('#foods-table-body').children();
  for(var i = 0; i < tableContents.length; i++) {
    var tableName = tableContents[i].children[0].innerHTML.toUpperCase();
    if (tableName.indexOf(searchTerm)) {
      tableContents[i].style.display = 'none';
    } else {
      tableContents[i].style.display = '';
    }
  }
})


  // sortable ---------------------------

$('.diary-foods').on('click', '#sort-food-calories', function () {
  if (this.className === 'asc') {
    sortCalories("diary-foods-table");
    this.removeClass;
    this.className = 'desc'
  } else if (this.className === 'desc') {
    sortReverseCalories("diary-foods-table");
    this.removeClass;
    this.className = 'normal'
  } else {
    nukeRows('foods', $('#foods-table-body'));
    TableInitialize("diary-foods");
    this.removeClass;
    this.className = 'asc'
  }
});

$('.diary-exercises').on('click', '#sort-exercises-calories', function () {
  if (this.className === 'asc') {
    sortCalories('diary-exercises-table');
    this.removeClass;
    this.className = 'desc'
  } else if (this.className === 'desc') {
    sortReverseCalories('diary-exercises-table');
    this.removeClass;
    this.className = 'normal'
  } else {
    nukeRows('exercises', $('#exercises-table-body'));
    TableInitialize("diary-exercises");
    this.removeClass;
    this.className = 'asc'
  }
});


function sortCalories (table) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(table);
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      //check if the two rows should switch place:
      x = parseInt(x.innerHTML, 10)
      y = parseInt(y.innerHTML, 10)
      if (x > y) {
        //if so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
};


function sortReverseCalories (table) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById(table);
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      //check if the two rows should switch place:
      x = parseInt(x.innerHTML, 10)
      y = parseInt(y.innerHTML, 10)
      if (x < y) {
        //if so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
};

