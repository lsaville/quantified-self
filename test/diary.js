var assert    = require('chai').assert;
var expect    = require('chai').expect;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var $         = require('jquery');
var until     = webdriver.until;

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

    driver.findElement({css: '#exercises-table-body'}).getText().then(function(value) {
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

    driver.findElement({css: '#foods-table-body'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.notInclude(value, 'chocolate cake');
    })
  })

test.xit('each meal table has a list of food and calories', function(){
    driver.get('http://localhost:8080/');

    var data = {name: 'rice', calories: '40'};
    var date = new Date;
    date     = date.toDateString();

    var day =  { breakfast: [],
                 lunch:     [],
                 dinner:    [],
                 snacks:    [],
                 exercise:  []
               }

    day.breakfast.push(data);
    day.lunch.push(data);
    day.dinner.push(data);
    day.snacks.push(data);

    dayJSON = JSON.stringify(day);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON}')`);

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

    var data    = {name: 'running', calories: '400'};
    var date    = new Date;
    date        = date.toDateString();

    var day =  { breakfast: [],
                 lunch:     [],
                 dinner:    [],
                 snacks:    [],
                 exercise:  []
               }

    day.exercise.push(data);
    dayJSON = JSON.stringify(day);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON}')`);

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

    var data     = {name: 'Apple', calories: '33'};
    var foodData = [{name: 'Apple', calories: '33'}];
    var date = new Date;
    date     = date.toDateString();

    var day =  { breakfast: [],
                 lunch:     [],
                 dinner:    [],
                 snacks:    [],
                 exercise:  []
               }

    day.breakfast.push(data);
    day.lunch.push(data);
    day.dinner.push(data);
    day.snacks.push(data);

    dayJSON   = JSON.stringify(day);
    foodsJSON = JSON.stringify(foodData);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON}')`);
    driver.executeScript(`window.localStorage.setItem('foods', '${foodsJSON}')`);

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '.delete-breakfast'}).click();

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '.delete-lunch'}).click();

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '.delete-dinner'}).click();

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '.delete-snacks'}).click();

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
    });

    driver.findElement({css: '#diary-foods-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
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

    var foodData = [{name: 'Apple', calories: '33'}];

    foodsJSON = JSON.stringify(foodData);

    driver.executeScript(`window.localStorage.setItem('foods', '${foodsJSON}')`);

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
      assert.include(value, '33');
    });

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.include(value, 'Apple');
      assert.include(value, '33');
    });

    driver.findElement({css: '.delete-breakfast'}).click();
    driver.findElement({css: '.delete-lunch'}).click();
    driver.findElement({css: '.delete-dinner'}).click();
    driver.findElement({css: '.delete-snacks'}).click();

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
    });

    driver.findElement({css: '#lunch-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
    });

    driver.findElement({css: '#snacks-table'}).getText().then(function(value) {
      assert.notInclude(value, 'Apple');
      assert.notInclude(value, '33');
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

    var data     = {name: 'Running', calories: '400'};
    var exerciseData = [{name: 'Running', calories: '400'}];
    var date = new Date;
    date     = date.toDateString();

    var day =  { breakfast: [],
                 lunch:     [],
                 dinner:    [],
                 snacks:    [],
                 exercise:  []
               }

    day.exercise.push(data);

    dayJSON   = JSON.stringify(day);
    exerciseJSON = JSON.stringify(exerciseData);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON}')`);
    driver.executeScript(`window.localStorage.setItem('exercises', '${exerciseJSON}')`);

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

  test.xit('has total calories for breakfast', function(){
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

  test.xit('has remaining calories for breakfast', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'banana', calories: '30'}, {name: 'Chocolate', calories: '300'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');

    addToBreakfastButton = driver.findElement({id: 'add-to-breakfast'});
    bananaCheckBox       = driver.findElement({css: 'input#banana'});
    chocolateCheckBox    = driver.findElement({css: 'input#Chocolate'}) ;

    driver.executeScript("arguments[0].click();", bananaCheckBox);
    driver.executeScript("arguments[0].click();", chocolateCheckBox);
    addToBreakfastButton.click();

    driver.findElement({css: '#breakfast-remaining-calories'}).getText().then(function(value){
      assert.equal(value, '70');
    })
  })

  test.xit('it colors remaining calories green when positive', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'banana', calories: '30'}, {name: 'Chocolate', calories: '300'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');

    addToBreakfastButton = driver.findElement({id: 'add-to-breakfast'});
    bananaCheckBox       = driver.findElement({css: 'input#banana'});
    chocolateCheckBox    = driver.findElement({css: 'input#Chocolate'}) ;

    driver.executeScript("arguments[0].click();", bananaCheckBox);
    driver.executeScript("arguments[0].click();", chocolateCheckBox);
    addToBreakfastButton.click();

    driver.findElement({css: '.special-green'}).getText().then(function(text) {
      assert.equal(text, '70');
    })
  })

  test.xit('it colors remaining calories red when negative', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'banana', calories: '300'}, {name: 'Chocolate', calories: '300'}]);
    driver.executeScript("window.localStorage.setItem('foods','" +data+ "');");

    driver.get('http://localhost:8080/');


    addToBreakfastButton = driver.findElement({id: 'add-to-breakfast'});
    bananaCheckBox       = driver.findElement({css: 'input#banana'});
    chocolateCheckBox    = driver.findElement({css: 'input#Chocolate'}) ;

    driver.executeScript("arguments[0].click();", bananaCheckBox);
    driver.executeScript("arguments[0].click();", chocolateCheckBox);
    addToBreakfastButton.click();

    driver.findElement({css: '.special-red'}).getText().then(function(text) {
      assert.equal(text, '-200');
    })
  })

  test.xit('it colors exercise calories green when positive', function(){
    driver.get('http://localhost:8080/');

    var data = JSON.stringify([{name: 'swimming', calories: '300'}]);
    driver.executeScript("window.localStorage.setItem('exercises','" +data+ "');");

    driver.get('http://localhost:8080/');

    addToExerciseButton = driver.findElement({id: 'add-to-exercise'});
    swimmingCheckBox     = driver.findElement({css: 'input#swimming'});

    driver.executeScript("arguments[0].click();", swimmingCheckBox);
    addToExerciseButton.click();

    driver.findElement({css: '.special-green'}).getText().then(function(text) {
      assert.equal(text, '300');
    })
  })

  test.xit('when a previous day with content is visited, the tables update', function(){
    driver.get('http://localhost:8080/');

    var date    = new Date;
    var dayBack = new Date;
    dayBack.setDate(date.getDate() - 1)
    dayBack     = dayBack.toDateString();
    date        = date.toDateString();

    var day1 =  { breakfast: [{name: 'rice', calories: '88'}],
                  lunch:     [],
                  dinner:    [],
                  snacks:    [],
                  exercise:  []
                }

    var day2 =  { breakfast: [],
                  lunch:     [],
                  dinner:    [{name: 'cake', calories: '333'}],
                  snacks:    [],
                  exercise:  []
                }

    dayJSON1 = JSON.stringify(day1);
    dayJSON2 = JSON.stringify(day2);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON1}')`);
    driver.executeScript(`window.localStorage.setItem('${dayBack}', '${dayJSON2}')`);

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.include(value, '88');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.notInclude(value, 'cake');
      assert.notInclude(value, '333');
    });

    driver.findElement({css: '#day-back'}).click();

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.notInclude(value, 'rice');
      assert.notInclude(value, '88');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'cake');
      assert.include(value, '333');
    });
  })

  test.xit('when a future day with content is visited, the tables update', function(){
    driver.get('http://localhost:8080/');

    var date       = new Date;
    var dayForward = new Date;
    dayForward.setDate(date.getDate() + 1)
    dayForward     = dayForward.toDateString();
    date           = date.toDateString();

    var day1 =  { breakfast: [{name: 'rice', calories: '88'}],
                  lunch:     [],
                  dinner:    [],
                  snacks:    [],
                  exercise:  []
                }

    var day2 =  { breakfast: [],
                  lunch:     [],
                  dinner:    [{name: 'cake', calories: '333'}],
                  snacks:    [],
                  exercise:  []
                }

    dayJSON1 = JSON.stringify(day1);
    dayJSON2 = JSON.stringify(day2);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON1}')`);
    driver.executeScript(`window.localStorage.setItem('${dayForward}', '${dayJSON2}')`);

    driver.get('http://localhost:8080/');

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.include(value, 'rice');
      assert.include(value, '88');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.notInclude(value, 'cake');
      assert.notInclude(value, '333');
    });

    driver.findElement({css: '#day-forward'}).click();

    driver.findElement({css: '#breakfast-table'}).getText().then(function(value) {
      assert.notInclude(value, 'rice');
      assert.notInclude(value, '88');
    });

    driver.findElement({css: '#dinner-table'}).getText().then(function(value) {
      assert.include(value, 'cake');
      assert.include(value, '333');
    });
  })

  test.xit("reroutes to the exercise page when you click 'Create New' in the exercises section", function() {
    driver.get('http://localhost:8080/');

    createNewExerciseButton = driver.findElement({css: '#new-exercise-button'});
    createNewExerciseButton.click();

    var url = driver.getCurrentUrl().then(function(value){
      assert.equal(value, 'http://localhost:8080/exercises.html');
    })
  })

  test.xit("Has a totals table in diary", function() {
    driver.get('http://localhost:8080/');

    table = driver.findElement({css: '#totals-table'});

    table.getText().then(function(text) {
      assert.include(text, 'Goal Calories');
    })

    table.getText().then(function(text) {
      assert.include(text, 'Calories Consumed');
    })

    table.getText().then(function(text) {
      assert.include(text, 'Calories Burned');
    })

    table.getText().then(function(text) {
      assert.include(text, 'Remaining Calories');
    })
  });

  test.xit("Color change for total calories highlight green or red depending on positive or negative", function() {
    driver.get('http://localhost:8080/');

    var date    = new Date;
    date        = date.toDateString();

    var day =  { breakfast: [],
                lunch:     [],
                dinner:    [],
                snacks:    [],
                exercise:  [{name: 'running', calories: '400'}]
              }
    dayJSON = JSON.stringify(day);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON}')`);
    driver.get('http://localhost:8080/');

    driver.findElement({css: '#totals-calories-burned'}).getText().then(function(text) {
      assert.equal(text, '400');
    })

    var tableWithGreenAttr = driver.findElement({css: '.totals .special-green'})

    tableWithGreenAttr.getText().then(function(text) {
      assert.equal(text, '400')
    })

  });

  test.xit("Color change for remaining calories turns green when calories not above limit", function() {
    driver.get('http://localhost:8080/');

    var date    = new Date;
    date        = date.toDateString();

    var day =  { breakfast: [{name: 'Apple', calories: '400'}],
                lunch:     [{name: 'Peach', calories: '500'}],
                dinner:    [],
                snacks:    [],
                exercise:  []
              }
    dayJSON = JSON.stringify(day);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON}')`);
    driver.get('http://localhost:8080/');

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '1100');
    })

    var tableWithGreenAttr = driver.findElement({css: '.totals .special-green'})

    tableWithGreenAttr.getText().then(function(text) {
      assert.equal(text, '1100')
    })

  });

  test.xit("Color change for remaining calories turns red when calories is above limit", function() {
    driver.get('http://localhost:8080/');

    var date    = new Date;
    date        = date.toDateString();

    var day =  { breakfast: [{name: 'Apple', calories: '1100'}],
                lunch:     [{name: 'Peach', calories: '1100'}],
                dinner:    [],
                snacks:    [],
                exercise:  []
              }
    dayJSON = JSON.stringify(day);

    driver.executeScript(`window.localStorage.setItem('${date}', '${dayJSON}')`);
    driver.get('http://localhost:8080/');

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '-200');
    })

    var tableWithGreenAttr = driver.findElement({css: '.totals .special-red'})

    tableWithGreenAttr.getText().then(function(text) {
      assert.equal(text, '-200')
    })
  });


  test.xit("Update calorie totals after adding food", function() {
    driver.get('http://localhost:8080/');

    var foodData = [{name: 'Apple', calories: '500'}];

    foodsJSON = JSON.stringify(foodData);

    driver.executeScript(`window.localStorage.setItem('foods', '${foodsJSON}')`);

    driver.get('http://localhost:8080/');

    elementChkBox = driver.findElement({css: 'input[type=checkbox]'})

    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-breakfast'}).click();

    driver.findElement({css: '#totals-calories-consumed'}).getText().then(function(text) {
      assert.equal(text, '500');
    })

    driver.findElement({css: '#totals-calories-burned'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '1500');
    })

  });

  test.xit("Update calorie totals after adding exercise", function() {
    driver.get('http://localhost:8080/');

    var foodData = [{name: 'Running', calories: '500'}];

    foodsJSON = JSON.stringify(foodData);

    driver.executeScript(`window.localStorage.setItem('exercises', '${foodsJSON}')`);

    driver.get('http://localhost:8080/');

    elementChkBox = driver.findElement({css: 'input[type=checkbox]'})

    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-exercise'}).click();

    driver.findElement({css: '#totals-calories-consumed'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-calories-burned'}).getText().then(function(text) {
      assert.equal(text, '500');
    })

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '2000');
    })
  });


  test.xit("Update calorie totals after adding food", function() {
    driver.get('http://localhost:8080/');

    var foodData = [{name: 'Apple', calories: '500'}];

    foodsJSON = JSON.stringify(foodData);

    driver.executeScript(`window.localStorage.setItem('foods', '${foodsJSON}')`);

    driver.get('http://localhost:8080/');

    elementChkBox = driver.findElement({css: 'input[type=checkbox]'})

    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-breakfast'}).click();

    driver.findElement({css: '#totals-calories-consumed'}).getText().then(function(text) {
      assert.equal(text, '500');
    })

    driver.findElement({css: '#totals-calories-burned'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '1500');
    })

    driver.findElement({css: '.delete-breakfast'}).click();

    driver.findElement({css: '#totals-calories-consumed'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-calories-burned'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '2000');
    })
  });

  test.xit("Update calorie totals after adding exercise", function() {
    driver.get('http://localhost:8080/');

    var foodData = [{name: 'Running', calories: '500'}];

    foodsJSON = JSON.stringify(foodData);

    driver.executeScript(`window.localStorage.setItem('exercises', '${foodsJSON}')`);

    driver.get('http://localhost:8080/');

    elementChkBox = driver.findElement({css: 'input[type=checkbox]'})

    driver.executeScript("arguments[0].click();", elementChkBox);

    driver.findElement({css: '#add-to-exercise'}).click();

    driver.findElement({css: '#totals-calories-consumed'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-calories-burned'}).getText().then(function(text) {
      assert.equal(text, '500');
    })

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '2000');
    })

    driver.findElement({css: '.delete-exercise'}).click();

    driver.findElement({css: '#totals-calories-consumed'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-calories-burned'}).getText().then(function(text) {
      assert.equal(text, '0');
    })

    driver.findElement({css: '#totals-remaining-calories'}).getText().then(function(text) {
      assert.equal(text, '2000');
    })

  });

})
