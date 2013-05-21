// ==========================================================================
// Project:   Bench
// Copyright: @2013 My Company, Inc.
// ==========================================================================
/*globals Bench */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//

tick = function () {
  return new Date().getTime();
}

tock = function (time) {
  return tick() - time;
}

SC.runBench = function () {

  var testVal = Math.random();

  SC.testObject = SC.Object.extend({
    value: '',
    computed: function(){
     return testVal;
    }.property()
  }).create();

  SC.testObject2 = SC.Object.extend({
    value: '',
    valueBinding: 'SC.testObject.value',
    computed: function(){
      return testVal;
    }.property()
  }).create();

  var time = tick();
  for (var i = 0; i < 10000; i++) {
    var random = Math.random();
    SC.run(function () {
      SC.testObject.set('value', random);
    });

    SC.run(function () {
      var test = SC.testObject2.get('value');
      if(test !== random){
        throw Error('Binding did not update');
      }
    });
  }
  console.log("Time to operate a binding 10000 times: " + tock(time));

  var time = tick();
  for (var i = 0; i < 10000; i++) {
    SC.run(function () {
      var test = SC.testObject2.get('value');
    });
  }
  console.log("Time to call get 10000 times on a primitive: " + tock(time));

  var time = tick();
  for (var i = 0; i < 10000; i++) {
    SC.run(function () {
      testVal = Math.random;
      if(SC.testObject2.get('computed') !== testVal) {
        throw Error('should match')
      }
    });
  }
  console.log("Time to call get 10000 times on a computed: " + tock(time));

  SC.run(function () {
    console.log("Benchmarking Creating an anonymous class with no extension");
    var time = tick(), klass = null;
    for (var i = 0; i < 10000; i++) {
      klass = SC.Object.extend();
    }
    console.log("Took %@ ms to create 10000 anonymous classes with no extension".fmt(tock(time)))


    console.log("Benchmarking Creating an anonymous class with properties");
    var n = 10000;
    for (var j = 0; j < 20; j++) {
      var props = {};
      for (var k = 0; k < j; k++) {
        props['prop' + k] = 5;
      }
      var time = tick(), klass = null;
      for (var i = 0; i < n; i++) {
        klass = SC.Object.extend(props).create();
      }
      console.log("%@, %@".fmt(j, tock(time) / n));
    }

    console.log("Benchmarking Creating an anonymous class with properties inline");
    var n = 10000;
    for (var j = 0; j < 20; j++) {
      var props = {};
      for (var k = 0; k < j; k++) {
        props['prop' + k] = 5;
      }
      var time = tick(), klass = null;
      for (var i = 0; i < n; i++) {
        klass = SC.Object.create(props);
      }
      console.log("%@, %@".fmt(j, tock(time) / n));
    }
  });
}


Bench.main = function main() {

};

function main() {
  Bench.main();
}
