var test = require('tape');
module.exports = function(jsPath){
  var phenomenonJS = require(jsPath);
  test('event adding', function (t) {
    var instance = new phenomenonJS();
    instance.on('event1',function(){

    }).addListener('event1',function(){

    }).once('event1',function(){

    }).one('event1',function(){

    });
    t.end(); //only test that doesn't break
  });

  test('trigger events', function (t) {
    var instance = new phenomenonJS();
    var times = 0;
    t.plan(5);

    instance.on('event1',function(t,f){
      times++;
    }).addListener('event1',function(t,f){
      times++;
    }).once('event1',function(t,f){
      times++;
    }).one('event1',function(t,f){
      times++;
    }).one('end', function(a,b,c,d){
      t.equal(times, 6);
      t.equal(a, 1);
      t.equal(b, 2);
      t.equal(c, 3);
      t.equal(d, 4);
    });

    instance.trigger('event1', true);
    instance.emit('event1', true, false);

    instance.emit('end', 1, 2, 3, 4);
  });

  test('try to trigger with out callback', function (t) {
    var instance = new phenomenonJS();
    t.plan(1);
    try {
      instance.on('event1');
    } catch (e) {
      t.notEqual(e, undefined);
    } finally {
      t.end();
    }
  });

  test('try to trigger with out callback', function (t) {
    var instance = new phenomenonJS();
    t.plan(1);
    try {
      instance.one('event1');
    } catch (e) {
      t.notEqual(e, undefined);
    } finally {
      t.end();
    }
  });

  test('try to emit with out event', function (t) {
    var instance = new phenomenonJS();
    t.plan(1);
    t.equal(instance.emit(), false);
  });

  test('try to remove listeners with out listeners', function (t) {
    var instance = new phenomenonJS();
    t.plan(1);
    t.equal(instance.off('event1'), instance);
  });


  test('removing events', function (t) {
    var instance = new phenomenonJS();
    t.plan(2);

    instance.on('event1',function(){
      t.notEqual(this._events.event1, undefined);
      instance.off('event1');
      t.equal(this._events.event1, undefined);
    });
    instance.emit('event1');
  });
};
