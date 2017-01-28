
  // var someFood = new Food();

var $ = require('jquery');

// exercise vars
var Exercise = require('../exercise');
var addExerciseButton = $('.add-exercise');

// food vars
var Food = require('./foods');
var addFoodButton = $('.add-food');

// exercise table

(function tableInitialize () {
  exercisesJSON = localStorage.getItem('exercises');
  var exercises = JSON.parse(exercisesJSON);
  if (exercises !== null) {
    for (var i = 0; i < exercises.length; i++) {
      addToTable(exercises[i].name, exercises[i].calories);
    }
  };
})();

// food table

(function FoodTableInitialize () {
  foodsJSON = localStorage.getItem('foods');
  var foods = JSON.parse(foodsJSON);
  if (foods !== null) {
    for (var i = 0; i < foods.length; i++) {
      addFoodToTable(foods[i].name, foods[i].calories);
    };
  $('tr').each(function(i) {
    $( this ).addClass( "row" + i );
  });
  };

})();


// exercise stuff

$('.exercises').on('click', '.delete-exercise', function (event) {
  event.preventDefault();
  deleteRow(this);
});

function deleteRow (row) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  var exercise  = new Exercise(name, calories);

  exercise.delete();
  doomedRow.remove();
};

addExerciseButton.on('click', function (event) {
  event.preventDefault();
  var name = $('input[name=name]').val();
  var calories = $('input[name=calories]').val();
  var exercise = new Exercise(name, calories);
  exercise.store();
  addToTable(name, calories);
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});

function addToTable(name, calories) {
  var row = '<tr><td>' +name+ '</td><td>' +calories+ '</td><td><a href="#" class="delete-exercise material-icons">delete</a></td></tr>'
  $('.exercises > tbody').prepend(row);
};


// food stuff

$('.foods').on('click', '.delete-food', function (event) {
  event.preventDefault();
  deleteRow(this);
});

function deleteRow (row) {
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
  var food = new Food(name, calories);
  food.store();
  addFoodToTable(name, calories);
  $('input[name=name]').val('');
  $('input[name=calories]').val('');
});

function addFoodToTable(name, calories) {
  var row = '<tr id="editable" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-food material-icons">delete</a></td></tr>'
  $('.foods > tbody').prepend(row);
};

//editable 



$('.foods').on('click', 'td', function (event) {
  var className    = this.parentElement.className
  var oldName      = $('.'+className).children('td')[0].innerHTML;
  var oldCalories  = $('.'+className).children('td')[1].innerHTML;
  var el = event.target
  document.getElementById('editable').addEventListener('keydown', function (event) {
    // var esc = event.keyCode == 27,
        // enter = event.keyCode == 13,
        // enter = event.target,
        // input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
        // data = {};

    // if (input) {
      // if (esc) {
        // restore state
        // document.execCommand('undo');
        // el.blur();
      // } else 
      // if (enter) {
     if(event.keyCode == 13 || event.keyCode == 9) {
        event.preventDefault();
        var newName      = this.children[0].innerHTML;
        var newCalories  = this.children[1].innerHTML;
        var food  = new Food(newName, newCalories);
        food.edit(oldName, oldCalories);
        el.blur();
      }
    // }
  }, true);

  document.addEventListener('mousedown', function (event) {
    var newName      = $('.'+className).children('td')[0].innerHTML;
    var newCalories      = $('.'+className).children('td')[1].innerHTML;
    var food  = new Food(newName, newCalories);
    food.edit(oldName, oldCalories);
    el.blur();
  }, true);
});


// document.getElementById(".foods")


 // document.getElementById('foods').addEventListener("keydown", 'td', function(event) {
 //    if (event.keyCode === 13) {
 //      event.preventDefault();
 //    }
 //  });

// $("td").on('keydown', function(e) {  
//     if(e.keyCode == 13)
//     {
//         e.preventDefault();
//     }
// });
// $('.foods').on('click', function () {
//   document.getElementById('foods').addEventListener("mousedown", 'tbody > tr', function() {
//     alert("fired");
//     document.getElementById('foods').removeEventListener("mousedown", function() {
//       alert('canceled')
//     }, false);
//   }, false);
// });

// document.getElementsByTagName('td').addEventListener("keydown", function() {
//     alert("input event fired");
// }, false);

// $('.foods').on('click', 'td', function (event) {
//   event.preventDefault();
//   alert("input event fired");
// }, false);

