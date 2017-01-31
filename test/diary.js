var assert    = require('chai').assert;
var expect    = require('chai').expect;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var until     =  webdriver.until;

test.describe('testing diary.html', function() {
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

  test.it('has total calories for breakfast', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'banana', calories: '30'}, {name: 'Chocolate', calories: '400'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');

    addToBreakfastButton = driver.findElement({id: 'add-to-breakfast'});
    bananaCheckBox       = driver.findElement({css: 'input#banana'});
    chocolateCheckBox    = driver.findElement({css: 'input#Chocolate'}) ;

    driver.executeScript("arguments[0].click();", bananaCheckBox);
    driver.executeScript("arguments[0].click();", chocolateCheckBox);
    addToBreakfastButton.click();

    driver.findElement({css: '#breakfast-total-calories'}).getText().then(function(value){
      assert.equal(value, '430');
    })
  })
})
