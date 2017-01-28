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
