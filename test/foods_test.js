assert = require('chai').assert;

describe("Chai Assertions Sandbox", function(){
  it("can assert true", function(){
    assert(true, 'TRUE IS FALSE! UP IS DOWN! DAY IS NIGHT!');
  });

  it("can assert 1 is 1", function(){
    assert.equal(1, 1);
  });

  it("can assert 2 is not 3", function(){
    assert.notEqual(2, 3);
  });

  it("can assert that something is a given data type", function(){
    assert.isNumber(42);
    assert.isObject({answer: 42});
    assert.isArray([1,2,3,4]);
    var thingIHaventDefined;
    assert.isUndefined(thingIHaventDefined);
  });

  it("can compare that two arrays contain the same values", function(){
    var actualArray = [1,2,3,4];
    assert.deepEqual(actualArray, [1,2,3,4]);
  })

  it("can compare that two objects contain the same key/value pairs", function(){
    var actualObject = {name: "Nate", module: 4};
    assert.deepEqual(actualObject, {name: "Nate", module: 4});
  })
});