(function (root, factory) {
  if (typeof define === 'function') {
    // RequireJS
    return define(function() {
        return factory();
    });
  } else if (typeof module === 'object' && module.exports) {
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.phenomenonJS = factory();
  }
}(this, function () {
  function phenomenonJS(){
  	this.defaultMaxListeners = 10;
    this._events = {};

  	this.on = this.addListener = function(type, listener){
  		if (typeof listener !== 'function'){
  			throw new TypeError('Listener must be a function');
  		}

  		if (!this._events){
  			this._events = {};
  		}

  		if (!this._events[type]){
  			this._events[type] = listener;
  		}else if (this._events[type] instanceof Array){
  			this._events[type].push(listener);
  		}else{
  			this._events[type] = [this._events[type], listener];
  		}

  		return this;
  	};

  	function simplifyArgs(val){
  		switch(val.length){
  			case 1:
  				return undefined;
  			case 2:
  				return val[1];
  			case 3:
  				return [val[1], val[2]];
  			default:
  				var args = new Array(val.length - 1);
  				for (var i = 1; i < val.length; i++){
  					args[i - 1] = val[i];
  				}
  				return args;
  		}
  	}

  	function callHandler(scope, handler, args){
  		if (args instanceof Array){
  			handler.apply(scope, args);
  		}else{
  			handler.call(scope, args);
  		}
  	}

  	this.emit = this.trigger = function(type){
  		var args, handler, i;
  		if (!this._events){
  			this._events = {};
  		}

  		handler = this._events[type];

  		if (!handler){
  			return false;
  		}

  		args = simplifyArgs(arguments);

  		if (typeof handler === 'function'){
  			callHandler(this, handler, args);
  		}else if(handler instanceof Array){
  	    for (i = 0; i < handler.length; i++){
  	    	callHandler(this, handler[i], args);
  	    }
  		}
  		return this;
  	};

  	this.off = this.removeListener = function(type, listener){

  		var list, position, length;

  		if (!this._events || !this._events[type]){
  			return this;
  		}

  		list = this._events[type];
  		length = list.length;
  		position = -1;

  		if (list === listener || (typeof list.listener === 'function' && list.listener === listener) || (listener === undefined && list !== undefined)){
  			delete this._events[type];
  		}else if (list instanceof Array){
  			for (var i = 0; i < length; i++) {
  				if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
  					position = i;
  				}
  			}
  	    if (position < 0){
  	    	return this;
  	    }

  	    if (list.length === 1){
  	    	list.length = 0;
  	    	delete this._events[type];
  	    }else{
  	    	list.splice(position, 1);
  	    }
  		}
  		return this;
  	};

  	this.one = this.once = function(type, listener){
  		if (typeof listener !== 'function'){
  			throw new TypeError('Listener must be a function');
  		}

  		var fired = false;

  		function triggered(){
  			this.off(type, triggered);
  			if (!fired){
  				fired = true;
  				listener.apply(this, arguments);
  			}
  		}

  		triggered.listener = listener;
  		this.on(type, triggered);
  		return this;
  	};
  }
  return phenomenonJS;

}));
