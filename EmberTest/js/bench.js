tick = function () {
  return new Date().getTime();
}

tock = function (time) {
  return tick() - time;
}

Em.runBench = function () {

  var testVal = Math.random();

  Em.testObject = Em.Object.extend({
    value: '',
    computed: function(){
      return testVal;
    }.property()
  }).create();

  Em.testObject2 = Em.Object.extend({
    value: '',
    valueBinding: 'Em.testObject.value',
    computed: function(){
      return testVal;
    }.property()
  }).create();

  var time = tick();
  for (var i = 0; i < 10000; i++) {
    var random = Math.random();
    Em.run(function () {
      Em.testObject.set('value', random);
    });

    Em.run(function () {
      var test = Em.testObject2.get('value');
      if(test !== random){
        throw Error('Binding did not update');
      }
    });
  }
  console.log("Time to operate a binding 10000 times: " + tock(time));

  var time = tick();
  for (var i = 0; i < 10000; i++) {
    Em.run(function () {
      var test = Em.testObject2.get('value');
    });
  }
  console.log("Time to call get 10000 times on a primitive: " + tock(time));

  var time = tick();
  for (var i = 0; i < 10000; i++) {
    Em.run(function () {
      testVal = Math.random;
      if(Em.testObject2.get('computed') !== testVal) {
        throw Error('should match')
      }
    });
  }
  console.log("Time to call get 10000 times on a computed: " + tock(time));

  Em.run(function () {
    console.log("Benchmarking Creating an anonymous class with no extension");
    var time = tick(), klass = null;
    for (var i = 0; i < 10000; i++) {
      klass = Em.Object.extend();
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
        klass = Em.Object.extend(props).create();
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
        klass = Em.Object.create(props);
      }
      console.log("%@, %@".fmt(j, tock(time) / n));
    }
  });
}

