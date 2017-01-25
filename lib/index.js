var $ = require('jquery');

// exercise stuff

var addFoodButton = $('.add-food');

addFoodButton.on('click', function (event) {
  event.preventDefault();
  console.log('winner winner chicken dinner');
})
