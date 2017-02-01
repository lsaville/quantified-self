var $ = require('jquery');
var _ = require('lodash');

require('../css/main.scss');

var Food = require('./foods');
var Editable = require('./editable')

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
      $(this).removeAttr('class');
      $( this ).addClass( "row" + i );
    });
  };
};


function addToTable(name, calories, table) {
  var tempUniqClassName = (name+calories+table).replace(/\s+/g, '');
  var row = '<tr id="editable" class="'+tempUniqClassName+'" ><td contenteditable="true">' +name+ '</td><td contenteditable="true">' +calories+ '</td><td><a href="#" class="delete-'+table+' material-icons">delete</a></td></tr>'
  $('.'+table+' > tbody').prepend(row);
  var editable  = new Editable();
  editable.make(table);
};

function deleteRow (row, table) {
  var doomedRow = $(row).parents('tr')
  var name      = doomedRow.children('td')[0].innerHTML;
  var calories  = doomedRow.children('td')[1].innerHTML;
  var foods  = new Food(name, calories);
  foods.delete();
  doomedRow.remove();
};

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
