var assert    = require('chai').assert;
var expect    = require('chai').expect;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

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

  test.it('shows me todays date', function() {
    driver.get('http://localhost:8080/');

    var dateOnPage = driver.findElement({id: 'date'});
    var dateToday  = new Date;

    dateOnPage.getText().then(function(value) {
      assert.equal(value, dateToday.toDateString())
    })
  })

  test.it('the day changes to yesterday if I click the left arrow', function(){
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

  test.it('the day changes to tomorrow if I click the right arrow', function(){
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
})
