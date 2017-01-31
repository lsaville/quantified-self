var assert    = require('chai').assert;
var expect    = require('chai').expect;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var $         = require('jquery')

test.describe('testing diary.html', function() {
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

  test.xit('shows me todays date', function() {
    driver.get('http://localhost:8080/');

    var dateOnPage = driver.findElement({id: 'date'});
    var dateToday  = new Date;

    dateOnPage.getText().then(function(value) {
      assert.equal(value, dateToday.toDateString())
    })
  })

  test.xit('the day changes to yesterday if I click the left arrow', function(){
    driver.get('http://localhost:8080/');

    var leftArrow  = driver.findElement({id: 'day-back'});
    var yesterday  = new Date;
    yesterday      = new Date(yesterday.setDate(yesterday.getDate() - 1));
    yesterday      = yesterday.toDateString();
    leftArrow.click()

    driver.findElement({id: 'date'}).getText().then(function(value) {
      assert.equal(value, yesterday);
    });
  })

  test.xit('the day changes to tomorrow if I click the right arrow', function(){
    driver.get('http://localhost:8080/');

    var rightArrow  = driver.findElement({id: 'day-forward'});
    var tomorrow  = new Date;
    tomorrow      = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
    tomorrow      = tomorrow.toDateString();
    rightArrow.click()

    driver.findElement({id: 'date'}).getText().then(function(value) {
      assert.equal(value, tomorrow);
    });
  })

  test.xit('can search through the exercises', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'running', calories: '300'}, {name: 'swimming', calories: '400'}]);
    driver.executeScript("window.localStorage.setItem('exercises','" +data+ "');");

    driver.get('http://localhost:8080/');

    var searchInput = driver.findElement({css: '#exercise-name-filter'});
    searchInput.click();
    searchInput.sendKeys('R');

    driver.findElement({css: '#exercise-table-body'}).getText().then(function(value) {
      assert.include(value, 'running');
      assert.notInclude(value, 'swimming');
    })
  })

  test.xit('can search through the foods', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'chocolate cake', calories: '3000'}, {name: 'rice', calories: '40'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');

    var searchInput = driver.findElement({css: '#food-name-filter'});
    searchInput.click();
    searchInput.sendKeys('R');

    driver.findElement({css: '#food-table-body'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.notInclude(value, 'chocolate cake');
    })
  })

test.xit('each meal table has a list of food and calories', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'rice', calories: '40'}]);
    driver.executeScript("window.localStorage.setItem('breakfast','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('lunch','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('dinner','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('snacks','" +data+ "');");

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.include(value, '40');
    });

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.include(value, '40');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.include(value, '40');
    });

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.include(value, '40');
    });
  });

  test.xit('exercise table has a list of exercise and calories', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'running', calories: '400'}]);
    driver.executeScript("window.localStorage.setItem('exercise','" +data+ "');");

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#exercise-table'}).getText().then(function(value) {
      assert.include(value, 'running');
      assert.include(value, '400');
    });
  });

  test.xit('foods table in Diary', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'Apple', calories: '40'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });
  });

  test.xit('Exercises table in Diary', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'Running', calories: '400'}]);
    driver.executeScript("window.localStorage.setItem('exercises','" +data+ "');");

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#diary-exercises-table'}).getText().then(function(value) {
      assert.include(value, 'Running');
      assert.include(value, '40');
    });
  });

  test.xit('Removing deleted foods from diary removes from meal table but not foods table', function(){
    
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'Apple', calories: '40'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('breakfast','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('lunch','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('dinner','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('snacks','" +data+ "');");

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });
    driver.findElement({css: '.delete-breakfast'}).click();

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '.delete-lunch'}).click();

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '.delete-dinner'}).click();

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '.delete-snacks'}).click();

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });
  });

  test.xit('Add meal to diary', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'Apple', calories: '40'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');

    elementChkBox = driver.findElement({css: 'input[type=checkbox]'})
    
    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-breakfast'}).click();

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-lunch'}).click();

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-dinner'}).click();

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-snacks'}).click();

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });
  });

  test.xit('Persisting diary across refreshes', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'Apple', calories: '40'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');

    elementChkBox = driver.findElement({css: 'input[type=checkbox]'})
    
    driver.executeScript("arguments[0].click();", elementChkBox);
    driver.findElement({css: '#add-to-breakfast'}).click();

    driver.executeScript("arguments[0].click();", elementChkBox);
    driver.findElement({css: '#add-to-lunch'}).click();
    
    driver.executeScript("arguments[0].click();", elementChkBox);
    driver.findElement({css: '#add-to-dinner'}).click();

    driver.executeScript("arguments[0].click();", elementChkBox);
    driver.findElement({css: '#add-to-snacks'}).click();

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '40');
    });

    driver.findElement({css: '.delete-breakfast'}).click();
    driver.findElement({css: '.delete-lunch'}).click();
    driver.findElement({css: '.delete-dinner'}).click();
    driver.findElement({css: '.delete-snacks'}).click();

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '40');
    });
  });

  test.xit('Add exercise to diary', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'Running', calories: '400'}]);
    driver.executeScript("window.localStorage.setItem('exercises','" +data+ "');");

    driver.get('http://localhost:8080/');

    elementChkBox = driver.findElement({css: 'input[type=checkbox]'})
    
    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-exercise'}).click();

    driver.findElement({css: '#exercise-table'}).getText().then(function(value) {
      assert.include(value, 'Running');
      assert.include(value, '400');
    });
  });

  test.xit('Removing deleted exercises from diary removes from exercise table but not exercises table', function(){
    
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'Running', calories: '400'}]);
    driver.executeScript("window.localStorage.setItem('exercises','" +data+ "');");
    driver.executeScript("window.localStorage.setItem('exercise','" +data+ "');");

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#exercise-table'}).getText().then(function(value) {
      assert.include(value, 'Running');
      assert.include(value, '40');
    });

    driver.findElement({css: '#diary-exercises-table'}).getText().then(function(value) {
      assert.include(value, 'Running');
      assert.include(value, '400');
    });

    driver.findElement({css: '.delete-exercise'}).click();

    driver.findElement({css: '#exercise-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Running');
      assert.notInclude(value, '400');
    });

    driver.findElement({css: '#diary-exercises-table'}).getText().then(function(value) {
      assert.include(value, 'Running');
      assert.include(value, '400');
    });
  });

  test.it('has total calories for breakfast', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'banana', calories: '30'}, {name: 'Chocolate', calories: '400'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');
// driver.sleep(1000000)
    addToBreakfastButton  = driver.findElement({id: '#add-to-breakfast'})
    bananaCheckbox        = driver.findElement({id: 'input#banana'});
    chocolateCakeCheckbox = driver.findElement({id: 'input#Chocolate'});

    bananaCheckbox.click();
    chocolateCakeCheckbox.click();
    addToBreakfastButton.click();

    driver.findElement({css: '#breakfast-total-calories'}).getText().then(function(value){
      assert.equal(value, '430');
    })
  })
})
