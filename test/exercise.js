var assert     = require('chai').assert;
var webdriver  = require('selenium-webdriver');
var test       = require('selenium-webdriver/testing');

test.describe('testing exercises.html', function() {
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

  test.it('should allow me to add a name and calories for an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name     = driver.findElement({id: 'exercise-name-input'})
    var calories = driver.findElement({id: 'exercise-calories-input'})

    name.sendKeys('running');

    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'running');
    });

    calories.sendKeys('300');

    calories.getAttribute('value').then(function(value){
      assert.equal(value, '300');
    });
  });

  test.it('should allow me to create an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name     = driver.findElement({id: 'exercise-name-input'})
    var calories = driver.findElement({id: 'exercise-calories-input'})
  });
});
