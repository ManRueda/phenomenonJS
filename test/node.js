describe("A phenomenonJS", function () {

  it("have a 'dada' event", function(){
    var test = new phenomenonJS();
    expect(test._events).toBe(undefined);
    test.on('dada', function(){});
    expect(test._events.dada).not.toBe(undefined);
  });


  it("have three 'dada' event", function(){
    var test = new phenomenonJS();
    expect(test._events).toBe(undefined);
    test.on('dada', function(){});
    test.on('dada', function(){});
    test.on('dada', function(){});
    expect(test._events.dada).not.toBe(undefined);
  });

  it("trigger the 'dada' event", function(done){
    var test = new phenomenonJS();
    test.on('dada', function(){
      done();
    });
    test.emit('dada');
  });

  it("lister and emit the 'dede' event", function(done){
    var test = new phenomenonJS();
    test.on('dede', function(){
      expect(true).toBe(true);
      done();
    });
    test.emit('dede');
  });

  it("lister and emit the 'dede' event with one parameters", function(done){
    var test = new phenomenonJS();
    test.on('dede', function(param1){
      expect(param1).toBe(33);
      done();
    });
    test.emit('dede', 33);
  });

  it("lister and emit the 'dede' event with two parameters", function(done){
    var test = new phenomenonJS();
    test.on('dede', function(param1, param2){
      expect(param1).toBe(33);
      expect(param2).toBe(false);
      done();
    });
    test.emit('dede', 33, false);
  });

  it("lister and emit the 'dede' event with four parameters", function(done){
    var test = new phenomenonJS();
    test.on('dede', function(param1, param2, param3, param4){
      expect(param1).toBe(33);
      expect(param2).toBe(false);
      expect(param3).toBe(null);
      expect(param4).toBe('hola');
      done();
    });
    test.emit('dede', 33, false, null, 'hola');
  });

  it("lister and emit the 'dede' 2 times event with one parameters", function(done){
    var test = new phenomenonJS();
    var count = 0;
    test.on('dede', function(param1){
      count++;
    });
    test.on('dede', function(param1){
      count++;
      expect(count).toBe(2);
      done();
    });
    test.emit('dede');
  });

  it("lister and emit two differents event with one parameters", function(done){
    var test = new phenomenonJS();
    var dada = false;
    var dede = false;
    test.on('dada', function(param1){
      dada = true;
    });
    test.on('dede', function(param1){
      dede = true;
    });
    test.on('dede', function(param1){
      expect(dede).toBe(true);
      expect(dada).toBe(true);
      done();
    });
    test.emit('dada');
    test.emit('dede');
  });

  it("have a 'dada' event and remove it", function(){
    var test = new phenomenonJS();
    test.on('dada', function(){});
    expect(test._events.dada).not.toBe(undefined);
    test.off('dada');
    expect(test._events.dada).toBe(undefined);
  });

  it("have two 'dada' event and remove it", function(){
    var test = new phenomenonJS();
    test.on('dada', function(){});
    test.on('dada', function(){});
    expect(test._events.dada).not.toBe(undefined);
    test.off('dada');
    expect(test._events.dada).toBe(undefined);
  });

  it("throw errores", function(){
    var test = new phenomenonJS();
    expect(function(){
      test.on('dada')
    }).toThrow(new TypeError('Listener must be a function'));

    expect(function(){
      test.one('dada')
    }).toThrow(new TypeError('Listener must be a function'));
  });

  it("lister and emit only one time 'dada' event", function(done){
    var test = new phenomenonJS();
    var count = 0;
    test.one('dada', function(param1){
      count++;
    });
    test.trigger('dada');
    test.one('dada', function(param1){
      expect(count).toBe(1);
      done();
    });
    test.trigger('dada');
  });
});

