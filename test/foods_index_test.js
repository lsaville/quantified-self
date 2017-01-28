// var assert    = require('chai').assert;
// var webdriver = require('selenium-webdriver');
// var test      = require('selenium-webdriver/testing');

// test.describe('testing ideabox', function() {
//   var driver;
//   this.timeout(10000);

//   test.beforeEach(function() {
//     driver = new webdriver.Builder()
//       .forBrowser('chrome')
//       .build();
//   })

//   test.afterEach(function() {
//     driver.quit();
//   })


//   test.it('should allow me to add a title and a description', function() {

//     driver.get('http://idea-box-jhun.herokuapp.com/');

//     var title = driver.findElement({id: 'idea-name'});
//     var description = driver.findElement({id: 'idea-body'});
//     title.sendKeys('this is a title');

//     title.getAttribute('value').then(function(value) {
//       assert.equal(value, 'this is a title');
//     });

//     description.sendKeys('this is a description');

//     description.getAttribute('value').then(function(value) {
//       assert.equal(value, 'this is a description');
//     });

//   });

//   test.it('should allow me to create an idea', function() {

//     driver.get('http://idea-box-jhun.herokuapp.com/');

//     var title = driver.findElement({id: 'idea-name'});
//     var description = driver.findElement({id: 'idea-body'});
//     var submitButton = driver.findElement({id: 'create-idea'});

//     title.sendKeys('a new title');
//     description.sendKeys('a new description');
//     submitButton.click();

//     driver.sleep(1000);

//     driver.findElement({id: 'ideaname'}).getText().then(function(textValue) {
//       assert.equal(textValue, "a new title");
//     });

//     driver.findElement({id: 'delete-idea'}).click();

//   })

// });


var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing ideabox', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it('should allow me to create a food', function() {

    driver.get('http://localhost:8080/foods.html');


    var foodName = driver.findElement(webdriver.By.name('name'));
    var foodCalories = driver.findElement(webdriver.By.name('calories'));
    var submitButton = driver.findElement(webdriver.By.className('add-food'));


    foodName.sendKeys('Apple');
    foodCalories.sendKeys(150);
    submitButton.click();

    driver.sleep(1000);

		driver.findElement(webdriver.By.tagName('td:nt-child(1)')).getText().then(function(textValue) {
    	assert.equal(textValue, "Apple");
  	});

    driver.findElement(webdriver.By.tagName('td:nth-child(2)')).getText().then(function(textValue) {
      assert.equal(textValue, 150);
    });

    driver.findElement(webdriver.By.className('delete-food')).click();

  })

});
