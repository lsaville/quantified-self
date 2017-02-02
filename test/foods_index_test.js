var assert    = require('chai').assert;
var expect     = require('chai').expect;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing foods.html', function() {
  var driver;
  this.timeout(1000000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.xit('should allow me to add a name and calories for an food', function(){
    driver.get('http://localhost:8080/foods.html');

    var name     = driver.findElement({id: 'food-name-input'})
    var calories = driver.findElement({id: 'food-calories-input'})

    name.sendKeys('banana');

    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'banana');
    });

    calories.sendKeys('30');

    calories.getAttribute('value').then(function(value){
      assert.equal(value, '30');
    });
  });

  test.xit('should allow me to create an food', function(){
    driver.get('http://localhost:8080/foods.html');

    var name     = driver.findElement({id: 'food-name-input'});
    var calories = driver.findElement({id: 'food-calories-input'});
    var submitButton   = driver.findElement({id: 'add-food'});

    name.sendKeys('banana');
    calories.sendKeys('30');
    submitButton.click();

    driver.findElement({css: '#foods-table tbody tr td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'banana');
    })

    driver.findElement({css: '#foods-table tbody tr td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '30');
    })
  });

  test.xit('my food exists when I visit the site', function(){
    driver.get('http://localhost:8080/foods.html');

    var data = JSON.stringify([{name: 'banana', calories: '30'}]);

    driver.executeScript("window.localStorage.setItem('foods','" + data+ "');");

    driver.get('http://localhost:8080/foods.html');

    driver.findElement({css: '#foods-table tbody tr td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'banana');
    })

    driver.findElement({css: '#foods-table tbody tr td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '30');
    })
  });

  test.xit('the calorie field is validated', function(){
    driver.get('http://localhost:8080/foods.html');

    var calories       = driver.findElement({id: 'food-calories-input'});
    var submitButton   = driver.findElement({id: 'add-food'});

    calories.sendKeys('30');
    submitButton.click();

    driver.findElement({css: '.form-error'}).getText().then(function(textValue) {
      assert.equal(textValue, 'Please enter a food name');
    })
  });

  test.xit('the name field is validated', function(){
    driver.get('http://localhost:8080/foods.html');

    var name           = driver.findElement({id: 'food-name-input'});
    var submitButton   = driver.findElement({id: 'add-food'});

    name.sendKeys('banana');
    submitButton.click();

    driver.findElement({css: '.form-error'}).getText().then(function(textValue) {
      assert.equal(textValue, 'Please enter a calorie amount');
    })
  });

  test.xit("doesn't allow a food to be created if a field is invalid", function(){
    driver.get('http://localhost:8080/foods.html');

    var name           = driver.findElement({id: 'food-name-input'});
    var submitButton   = driver.findElement({id: 'add-food'});

    name.sendKeys('banana');
    submitButton.click();

    driver.findElement({id: 'foods-table-body'}).getText().then(function(value){
      expect(value).to.be.empty;
    });
  });

  test.xit('maintains order when refreshed', function(){
    driver.get('http://localhost:8080/foods.html');

    var name     = driver.findElement({id: 'food-name-input'});
    var calories = driver.findElement({id: 'food-calories-input'});
    var submitButton   = driver.findElement({id: 'add-food'});

    name.sendKeys('banana');
    calories.sendKeys('30');
    submitButton.click();

    name.sendKeys('berries');
    calories.sendKeys('600');
    submitButton.click();

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'berries');
    })

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '600');
    })

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(2) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'banana');
    })

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '30');
    })

    driver.get('http://localhost:8080/foods.html');

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'berries');
    })

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '600');
    })

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(2) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'banana');
    })

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(2) td:nth-child(2)'}).getText().then(function(textValue) {
      assert.equal(textValue, '30');
    })
  })

  test.xit('can delete a food', function(){
    driver.get('http://localhost:8080/foods.html');

    var name     = driver.findElement({id: 'food-name-input'});
    var calories = driver.findElement({id: 'food-calories-input'});
    var submitButton   = driver.findElement({id: 'add-food'});

    name.sendKeys('banana');
    calories.sendKeys('30');
    submitButton.click();

    driver.findElement({css: '.delete-foods'}).click();

    driver.findElement({id: 'foods-table-body'}).getText().then(function(value){
      expect(value).to.be.empty;
    });
  })

  test.xit('lets you click on name or calories and they become input fields containing the current values', function(){
    driver.get('http://localhost:8080/foods.html');

    var name     = driver.findElement({id: 'food-name-input'});
    var calories = driver.findElement({id: 'food-calories-input'});
    var submitButton   = driver.findElement({id: 'add-food'});

    name.sendKeys('banana');
    calories.sendKeys('30');
    submitButton.click();

    var foodName = driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(1)'});

    // excerciseName.click();

    // driver.sleep(1000000)
  })

  test.xit('lets you change the exercise name inline', function() {
    driver.get('http://localhost:8080/foods.html');

    var name           = driver.findElement({id: 'food-name-input'});
    var calories       = driver.findElement({id: 'food-calories-input'});
    var submitButton   = driver.findElement({id: 'add-food'});
    var elseWhere      = driver.findElement({css: '.container'});

    name.sendKeys('banana');
    calories.sendKeys('30');
    submitButton.click();

    var foodName = driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(1)'});

    foodName.click();
    foodName.sendKeys(' split');
    elseWhere.click();

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'banana split');
    })
  })

  test.xit('persists the inline change after refresh', function() {
    driver.get('http://localhost:8080/foods.html');

    var name           = driver.findElement({id: 'food-name-input'});
    var calories       = driver.findElement({id: 'food-calories-input'});
    var submitButton   = driver.findElement({id: 'add-food'});
    var elseWhere      = driver.findElement({css: '.container'});

    name.sendKeys('banana');
    calories.sendKeys('30');
    submitButton.click();

    var foodName = driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(1)'});

    foodName.click();
    foodName.sendKeys(' split');
    elseWhere.click();

    driver.get('http://localhost:8080/foods.html');

    driver.findElement({css: '#foods-table tbody tr:nth-of-type(1) td:nth-child(1)'}).getText().then(function(textValue) {
      assert.equal(textValue, 'banana split');
    })
  })

  test.xit('can filter by name', function() {
    driver.get('http://localhost:8080/foods.html');

    var data = JSON.stringify([{name: 'banana', calories: '30'}, {name: 'Chocolate Cake', calories: '400'}]);

    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/foods.html');

    var filterInput = driver.findElement({css: '#food-name-filter'});
    filterInput.click();
    filterInput.sendKeys('B');


    driver.findElement({css: '#foods-table-body'}).getText().then(function(textValue) {
      assert.include(textValue, 'banana');
      assert.notInclude(textValue, 'Chocolate Cake');
    })
  })
});
