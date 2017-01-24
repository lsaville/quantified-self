var $ = require('jquery');

$(document).ready(

  $('.add-breakfast').on('click', function (e) {
    e.preventDefault();  
    console.log('I will add the foods to the breakfast table!');
  }),

  $('.add-lunch').on('click', function (e) {
    e.preventDefault();
    console.log('I will add the foods to the lunch table!');
  }),

  $('.add-dinner').on('click', function (e) {
    e.preventDefault();
    console.log('I will add the foods to the dinner table!');
  }),

  $('.add-snacks').on('click', function (e) {
    e.preventDefault();
    console.log('I will add the foods to the snack table!');
  })

);
