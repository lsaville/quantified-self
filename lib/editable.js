var $ = require('jquery');

var Exercises = require('./exercises');
var Food = require('./foods');
var Breakfast = require('./breakfast');
var Lunch = require('./lunch');
var Dinner = require('./dinner');
var Snacks = require('./snacks');
var Exercise = require('./exercise')

function Editable () {};

Editable.prototype.make = function(table) {
	$('.'+table).on('click', 'td', function (event) {
	  var className    = classNameClickedRow(this);
	  var oldName      = recordCellHtmlName(className);
	  var oldCalories  = recordCellHtmlCalories(className);
	  var el = event.target;
	  addEventListenerForEnter(table, className, oldName, oldCalories, el);
	  addEventListenerForMousedown(table, className, oldName, oldCalories, el);
	});

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
	    	case 'foods':
	        editFoodStorage(newName, newCalories, oldName, oldCalories);
	        break;
	      case 'exercises':
	        editExercisesStorage(newName, newCalories, oldName, oldCalories);
	        break;
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
	  breakfast.edit($('#date').text(), oldName, oldCalories);
	};

	function editLunchStorage (newName, newCalories, oldName, oldCalories) {
	  var lunch  = new Lunch(newName, newCalories);
	  lunch.edit($('#date').text(), oldName, oldCalories);
	};

	function editDinnerStorage (newName, newCalories, oldName, oldCalories) {
	  var dinner  = new Dinner(newName, newCalories);
	  dinner.edit($('#date').text(), oldName, oldCalories);
	};

	function editSnacksStorage (newName, newCalories, oldName, oldCalories) {
	  var snacks  = new Snacks(newName, newCalories);
	  snacks.edit($('#date').text(), oldName, oldCalories);
	};

	function editExerciseStorage (newName, newCalories, oldName, oldCalories) {
	  var exercise  = new Exercise(newName, newCalories);
	  exercise.edit($('#date').text(), oldName, oldCalories);
	};
};

module.exports = Editable;