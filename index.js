(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global = global || self, global.nextUI = factory(global.Vue));
}(this, function (Vue) { 'use strict';

	Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') { __g = global; } // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') { __e = core; } // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') { throw TypeError(it + ' is not a function!'); }
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) { return fn; }
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) { throw TypeError(it + ' is not an object!'); }
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) { return it; }
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) { try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ } }
	  if ('get' in Attributes || 'set' in Attributes) { throw TypeError('Accessors not supported!'); }
	  if ('value' in Attributes) { O[P] = Attributes.value; }
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) { source = name; }
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) { continue; }
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) { _hide(expProto, key, out); }
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) { throw TypeError("Can't call method on  " + it); }
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) { while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) { return true; }
	    // Array#indexOf ignores holes, Array#includes - not
	    } } else { for (;length > index; index++) { if (IS_INCLUDES || index in O) {
	      if (O[index] === el) { return IS_INCLUDES || index || 0; }
	    } } } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) { if (key != IE_PROTO) { _has(O, key) && result.push(key); } }
	  // Don't enum bug & hidden keys
	  while (names.length > i) { if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  } }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  var arguments$1 = arguments;
	 // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments$1[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) { if (isEnum.call(S, key = keys[j++])) { T[key] = S[key]; } }
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = assign;

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) { throw TypeError(it + ' is not an object!'); }
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') { __g = global; } // eslint-disable-line no-undef
	});

	var document$2 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$2) && _isObject$1(document$2.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$2.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) { return it; }
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) { return val; }
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) { return val; }
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) { return val; }
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$1 = Object.defineProperty;

	var f$3 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) { try {
	    return dP$1(O, P, Attributes);
	  } catch (e) { /* empty */ } }
	  if ('get' in Attributes || 'set' in Attributes) { throw TypeError('Accessors not supported!'); }
	  if ('value' in Attributes) { O[P] = Attributes.value; }
	  return O;
	};

	var _objectDp$1 = {
		f: f$3
	};

	var dP$2 = _objectDp$1.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors$1 && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = defineProperty;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$1(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var EVENT_TOGGLE = 'toggle';
	var visibilityMixin = {
	  model: {
	    prop: 'visible',
	    event: EVENT_TOGGLE
	  },
	  props: {
	    visible: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      // If use the prop visible directly, the toggle will failed when user haven't set v-model as a reactive property.
	      // So we use the data isVisible instead.
	      isVisible: false
	    };
	  },
	  watch: {
	    isVisible: function isVisible(newVal) {
	      this.$emit(EVENT_TOGGLE, newVal);
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    this.$watch('visible', function (newVal, oldVal) {
	      if (newVal) {
	        _this.show();
	      } else if (oldVal && !_this._createAPI_reuse) {
	        _this.hide();
	      }
	    }, {
	      immediate: true
	    });
	  },
	  methods: {
	    show: function show() {
	      this.isVisible = true;
	    },
	    hide: function hide() {
	      this.isVisible = false;
	    }
	  }
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var toString$1 = {}.toString;

	var _cof$1 = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') { throw TypeError(it + ' is not a function!'); }
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) { return fn; }
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var f$4 = {}.propertyIsEnumerable;

	var _objectPie$1 = {
		f: f$4
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof$1(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined$1 = function (it) {
	  if (it == undefined) { throw TypeError("Can't call method on  " + it); }
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject$1 = function (it) {
	  return _iobject$1(_defined$1(it));
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$5 = _descriptors$1 ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject$1(O);
	  P = _toPrimitive$1(P, true);
	  if (_ie8DomDefine$1) { try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ } }
	  if (_has$1(O, P)) { return _propertyDesc$1(!_objectPie$1.f.call(O, P), O[P]); }
	};

	var _objectGopd = {
		f: f$5
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject$1(O);
	  if (!_isObject$1(proto) && proto !== null) { throw TypeError(proto + ": can't set as prototype!"); }
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx$1(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) { O.__proto__ = proto; }
	        else { set(O, proto); }
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject$1(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	// 7.1.4 ToInteger
	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor;
	var _toInteger$1 = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
	};

	// 7.1.15 ToLength

	var min$2 = Math.min;
	var _toLength$1 = function (it) {
	  return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max$1 = Math.max;
	var min$3 = Math.min;
	var _toAbsoluteIndex$1 = function (index, length) {
	  index = _toInteger$1(index);
	  return index < 0 ? max$1(index + length, 0) : min$3(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject$1($this);
	    var length = _toLength$1(O.length);
	    var index = _toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) { while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) { return true; }
	    // Array#indexOf ignores holes, Array#includes - not
	    } } else { for (;length > index; index++) { if (IS_INCLUDES || index in O) {
	      if (O[index] === el) { return IS_INCLUDES || index || 0; }
	    } } } return !IS_INCLUDES && -1;
	  };
	};

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') { __e = core; } // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _shared$1 = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global$1[SHARED] || (_global$1[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core$1.version,
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var px$1 = Math.random();
	var _uid$1 = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
	};

	var shared$1 = _shared$1('keys');

	var _sharedKey$1 = function (key) {
	  return shared$1[key] || (shared$1[key] = _uid$1(key));
	};

	var arrayIndexOf$1 = _arrayIncludes$1(false);
	var IE_PROTO$1 = _sharedKey$1('IE_PROTO');

	var _objectKeysInternal$1 = function (object, names) {
	  var O = _toIobject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) { if (key != IE_PROTO$1) { _has$1(O, key) && result.push(key); } }
	  // Don't enum bug & hidden keys
	  while (names.length > i) { if (_has$1(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  } }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys$1 = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys$1.concat('length', 'prototype');

	var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal$1(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$6
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _functionToString = _shared$1('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid$1('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core$1.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) { _has$1(val, 'name') || _hide$1(val, 'name', key); }
	  if (O[key] === val) { return; }
	  if (isFunction) { _has$1(val, SRC) || _hide$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key))); }
	  if (O === _global$1) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide$1(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide$1(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var PROTOTYPE$1 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] || (_global$1[name] = {}) : (_global$1[name] || {})[PROTOTYPE$1];
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) { source = name; }
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx$1(out, _global$1) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // extend global
	    if (target) { _redefine(target, key, out, type & $export$1.U); }
	    // export
	    if (exports[key] != out) { _hide$1(exports, key, exp); }
	    if (IS_PROTO && expProto[key] != out) { expProto[key] = out; }
	  }
	};
	_global$1.core = _core$1;
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails$1(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) { exp[ALIAS] = fn; }
	  _export$1(_export$1.P + _export$1.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined$1(string));
	  if (TYPE & 1) { string = string.replace(ltrim, ''); }
	  if (TYPE & 2) { string = string.replace(rtrim, ''); }
	  return string;
	};

	var _stringTrim = exporter;

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys$1 = Object.keys || function keys(O) {
	  return _objectKeysInternal$1(O, _enumBugKeys$1);
	};

	var _objectDps = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject$1(O);
	  var keys = _objectKeys$1(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) { _objectDp$1.f(O, P = keys[i++], Properties[P]); }
	  return O;
	};

	var document$3 = _global$1.document;
	var _html = document$3 && document$3.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$2 = _sharedKey$1('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$2 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate$1('iframe');
	  var i = _enumBugKeys$1.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) { delete createDict[PROTOTYPE$2][_enumBugKeys$1[i]]; }
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$2] = _anObject$1(O);
	    result = new Empty();
	    Empty[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$2] = O;
	  } else { result = createDict(); }
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var gOPN = _objectGopn.f;
	var gOPD$1 = _objectGopd.f;
	var dP$3 = _objectDp$1.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global$1[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof$1(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive$1(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) { return NaN; } // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) { return NaN; }
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails$1(function () { proto.valueOf.call(that); }) : _cof$1(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors$1 ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (_has$1(Base, key = keys[j]) && !_has$1($Number, key)) {
	      dP$3($Number, key, gOPD$1(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  _redefine(_global$1, NUMBER, $Number);
	}

	var popupMixin = {
	  props: {
	    zIndex: {
	      type: Number,
	      default: 100
	    },
	    maskClosable: {
	      type: Boolean,
	      default: false
	    }
	  }
	};

	var COMPONENT_NAME = 'cube-popup';
	var EVENT_MASK_CLICK = 'mask-click';
	var script = {
	  name: COMPONENT_NAME,
	  mixins: [visibilityMixin, popupMixin],
	  props: {
	    type: {
	      type: String,
	      default: ''
	    },
	    mask: {
	      type: Boolean,
	      default: true
	    },
	    content: {
	      type: String,
	      default: ''
	    },
	    center: {
	      type: Boolean,
	      default: true
	    },
	    position: {
	      type: String,
	      default: ''
	    }
	  },
	  computed: {
	    rootClass: function rootClass() {
	      var cls = {
	        'cube-popup_mask': this.mask
	      };

	      if (this.type) {
	        cls["cube-".concat(this.type)] = true;
	      }

	      return cls;
	    },
	    containerClass: function containerClass() {
	      var center = this.center;
	      var position = this.position;

	      if (position) {
	        return _defineProperty({}, "cube-popup-".concat(position), true);
	      }

	      if (center) {
	        return {
	          'cube-popup-center': true
	        };
	      }
	    }
	  },
	  methods: {
	    maskClick: function maskClick(e) {
	      this.$emit(EVENT_MASK_CLICK, e);

	      if (this.maskClosable) {
	        this.hide();
	      }
	    }
	  }
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function () {
	      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
	function createInjector(context) {
	  return function (id, style) {
	    return addStyle(id, style);
	  };
	}
	var HEAD = document.head || document.getElementsByTagName('head')[0];
	var styles = {};

	function addStyle(id, css) {
	  var group = isOldIE ? css.media || 'default' : id;
	  var style = styles[group] || (styles[group] = {
	    ids: new Set(),
	    styles: []
	  });

	  if (!style.ids.has(id)) {
	    style.ids.add(id);
	    var code = css.source;

	    if (css.map) {
	      // https://developer.chrome.com/devtools/docs/javascript-debugging
	      // this makes source maps inside style tags work properly in Chrome
	      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

	      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
	    }

	    if (!style.element) {
	      style.element = document.createElement('style');
	      style.element.type = 'text/css';
	      if (css.media) { style.element.setAttribute('media', css.media); }
	      HEAD.appendChild(style.element);
	    }

	    if ('styleSheet' in style.element) {
	      style.styles.push(code);
	      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
	    } else {
	      var index = style.ids.size - 1;
	      var textNode = document.createTextNode(code);
	      var nodes = style.element.childNodes;
	      if (nodes[index]) { style.element.removeChild(nodes[index]); }
	      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
	    }
	  }
	}

	var browser = createInjector;

	/* script */
	var __vue_script__ = script;
	/* template */

	var __vue_render__ = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: _vm.isVisible,
	      expression: "isVisible"
	    }],
	    staticClass: "cube-popup",
	    class: _vm.rootClass,
	    style: {
	      'z-index': _vm.zIndex
	    }
	  }, [_c('div', {
	    staticClass: "cube-popup-mask",
	    on: {
	      "touchmove": function touchmove($event) {
	        $event.preventDefault();
	      },
	      "click": _vm.maskClick
	    }
	  }, [_vm._t("mask")], 2), _vm._v(" "), _c('div', {
	    staticClass: "cube-popup-container",
	    class: _vm.containerClass,
	    on: {
	      "touchmove": function touchmove($event) {
	        $event.preventDefault();
	      }
	    }
	  }, [_vm.$slots.default ? _c('div', {
	    staticClass: "cube-popup-content"
	  }, [_vm._t("default")], 2) : _c('div', {
	    staticClass: "cube-popup-content",
	    domProps: {
	      "innerHTML": _vm._s(_vm.content)
	    }
	  })])]);
	};

	var __vue_staticRenderFns__ = [];
	/* style */

	var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-33e7b185_0", {
	    source: ".cube-popup{position:fixed;left:0;right:0;top:0;bottom:0;z-index:100;pointer-events:none}.cube-popup_mask{pointer-events:auto}.cube-popup_mask .cube-popup-mask{display:block}.cube-popup-container,.cube-popup-mask{position:absolute;width:100%;height:100%}.cube-popup-mask{display:none;overflow:hidden;background-color:#000;opacity:.78;pointer-events:auto}.cube-popup-mask::before{content:\".\";display:block;width:1px;height:1px;background-color:rgba(0,0,0,.1);margin-left:-10px}.cube-popup-container{-webkit-transform:translate(100%,100%);transform:translate(100%,100%)}.cube-popup-content{position:absolute;top:0;left:0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate(-100%,-100%);transform:translate(-100%,-100%);pointer-events:auto}.cube-popup-center .cube-popup-content,.cube-popup-left .cube-popup-content,.cube-popup-right .cube-popup-content{top:-50%;left:-50%;width:auto;max-width:100%;-webkit-transform:translate(0,0);transform:translate(0,0)}.cube-popup-left .cube-popup-content,.cube-popup-right .cube-popup-content{height:100%;top:-100%}.cube-popup-center .cube-popup-content{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.cube-popup-top .cube-popup-content{top:-100%;left:-100%;-webkit-transform:translate(0,0);transform:translate(0,0)}.cube-popup-right .cube-popup-content{top:-100%;right:100%}.cube-popup-left .cube-popup-content{left:-100%}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__ = undefined;
	/* module identifier */

	var __vue_module_identifier__ = undefined;
	/* functional template */

	var __vue_is_functional_template__ = false;
	/* style inject SSR */

	var CubePopup = normalizeComponent_1({
	  render: __vue_render__,
	  staticRenderFns: __vue_staticRenderFns__
	}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

	/**
	 * vue-create-api v0.2.0
	 * (c) 2018 ustbhuangyi
	 * @license MIT
	 */
	var _extends = Object.assign || function (target) {
	  var arguments$1 = arguments;

	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments$1[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return (str + '').replace(camelizeRE, function (m, c) {
	    return c ? c.toUpperCase() : '';
	  });
	}

	function escapeReg(str, delimiter) {
	  return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
	}

	function isBoolean(value) {
	  return typeof value === 'boolean';
	}

	function isUndef(value) {
	  return value === undefined;
	}

	function isStr(value) {
	  return typeof value === 'string';
	}

	function isFunction(fn) {
	  return typeof fn === 'function';
	}

	function warn(msg) {
	  console.error("[vue-create-api warn]: " + msg);
	}

	function assert(condition, msg) {
	  if (!condition) {
	    throw new Error("[vue-create-api error]: " + msg);
	  }
	}

	function instantiateComponent(Vue, Component, data, renderFn, options) {
	  var renderData = void 0;
	  var childrenRenderFn = void 0;

	  var instance = new Vue(_extends({}, options, {
	    render: function render(createElement) {
	      var children = childrenRenderFn && childrenRenderFn(createElement);
	      if (children && !Array.isArray(children)) {
	        children = [children];
	      }

	      return createElement(Component, _extends({}, renderData), children || []);
	    },

	    methods: {
	      init: function init() {
	        document.body.appendChild(this.$el);
	      },
	      destroy: function destroy() {
	        this.$destroy();
	        document.body.removeChild(this.$el);
	      }
	    }
	  }));
	  instance.updateRenderData = function (data, render) {
	    renderData = data;
	    childrenRenderFn = render;
	  };
	  instance.updateRenderData(data, renderFn);
	  instance.$mount();
	  instance.init();
	  var component = instance.$children[0];
	  component.$updateProps = function (props) {
	    _extends(renderData.props, props);
	    instance.$forceUpdate();
	  };
	  return component;
	}

	function parseRenderData() {
	  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  events = parseEvents(events);
	  var props = _extends({}, data);
	  var on = {};
	  for (var name in events) {
	    if (events.hasOwnProperty(name)) {
	      var handlerName = events[name];
	      if (props[handlerName]) {
	        on[name] = props[handlerName];
	        delete props[handlerName];
	      }
	    }
	  }
	  return {
	    props: props,
	    on: on
	  };
	}

	function parseEvents(events) {
	  var parsedEvents = {};
	  events.forEach(function (name) {
	    parsedEvents[name] = camelize('on-' + name);
	  });
	  return parsedEvents;
	}

	var eventBeforeDestroy = 'hook:beforeDestroy';

	function apiCreator(Component) {
	  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var single = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var Vue = this;
	  var singleMap = {};
	  var beforeHooks = [];

	  function createComponent(renderData, renderFn, options, single) {
	    beforeHooks.forEach(function (before) {
	      before(renderData, renderFn, single);
	    });
	    var ownerInsUid = options.parent ? options.parent._uid : -1;

	    var _ref = singleMap[ownerInsUid] ? singleMap[ownerInsUid] : {},
	        comp = _ref.comp,
	        ins = _ref.ins;

	    if (single && comp && ins) {
	      ins.updateRenderData(renderData, renderFn);
	      ins.$forceUpdate();
	      return comp;
	    }
	    var component = instantiateComponent(Vue, Component, renderData, renderFn, options);
	    var instance = component.$parent;
	    var originRemove = component.remove;

	    component.remove = function () {
	      if (single) {
	        if (!singleMap[ownerInsUid]) {
	          return;
	        }
	        singleMap[ownerInsUid] = null;
	      }
	      originRemove && originRemove.call(this);
	      instance.destroy();
	    };

	    var originShow = component.show;
	    component.show = function () {
	      originShow && originShow.call(this);
	      return this;
	    };

	    var originHide = component.hide;
	    component.hide = function () {
	      originHide && originHide.call(this);
	      return this;
	    };

	    if (single) {
	      singleMap[ownerInsUid] = {
	        comp: component,
	        ins: instance
	      };
	    }
	    return component;
	  }

	  function processProps(ownerInstance, renderData, isInVueInstance, onChange) {
	    var $props = renderData.props.$props;
	    if ($props) {
	      delete renderData.props.$props;

	      var watchKeys = [];
	      var watchPropKeys = [];
	      Object.keys($props).forEach(function (key) {
	        var propKey = $props[key];
	        if (isStr(propKey) && propKey in ownerInstance) {
	          // get instance value
	          renderData.props[key] = ownerInstance[propKey];
	          watchKeys.push(key);
	          watchPropKeys.push(propKey);
	        } else {
	          renderData.props[key] = propKey;
	        }
	      });
	      if (isInVueInstance) {
	        var unwatchFn = ownerInstance.$watch(function () {
	          var props = {};
	          watchKeys.forEach(function (key, i) {
	            props[key] = ownerInstance[watchPropKeys[i]];
	          });
	          return props;
	        }, onChange);
	        ownerInstance.__unwatchFns__.push(unwatchFn);
	      }
	    }
	  }

	  function processEvents(renderData, ownerInstance) {
	    var $events = renderData.props.$events;
	    if ($events) {
	      delete renderData.props.$events;

	      Object.keys($events).forEach(function (event) {
	        var eventHandler = $events[event];
	        if (typeof eventHandler === 'string') {
	          eventHandler = ownerInstance[eventHandler];
	        }
	        renderData.on[event] = eventHandler;
	      });
	    }
	  }

	  function process$(renderData) {
	    var props = renderData.props;
	    Object.keys(props).forEach(function (prop) {
	      if (prop.charAt(0) === '$') {
	        renderData[prop.slice(1)] = props[prop];
	        delete props[prop];
	      }
	    });
	  }

	  function cancelWatchProps(ownerInstance) {
	    if (ownerInstance.__unwatchFns__) {
	      ownerInstance.__unwatchFns__.forEach(function (unwatchFn) {
	        unwatchFn();
	      });
	      ownerInstance.__unwatchFns__ = null;
	    }
	  }

	  var api = {
	    before: function before(hook) {
	      beforeHooks.push(hook);
	    },
	    create: function create(config, renderFn, _single) {
	      if (!isFunction(renderFn) && isUndef(_single)) {
	        _single = renderFn;
	        renderFn = null;
	      }

	      if (isUndef(_single)) {
	        _single = single;
	      }

	      var ownerInstance = this;
	      var isInVueInstance = !!ownerInstance.$on;
	      var options = {};

	      if (isInVueInstance) {
	        // Set parent to store router i18n ...
	        options.parent = ownerInstance;
	        if (!ownerInstance.__unwatchFns__) {
	          ownerInstance.__unwatchFns__ = [];
	        }
	      }

	      var renderData = parseRenderData(config, events);

	      var component = null;

	      processProps(ownerInstance, renderData, isInVueInstance, function (newProps) {
	        component && component.$updateProps(newProps);
	      });
	      processEvents(renderData, ownerInstance);
	      process$(renderData);

	      component = createComponent(renderData, renderFn, options, _single);

	      if (isInVueInstance) {
	        ownerInstance.$on(eventBeforeDestroy, beforeDestroy);
	      }

	      function beforeDestroy() {
	        cancelWatchProps(ownerInstance);
	        component.remove();
	        component = null;
	      }

	      return component;
	    }
	  };

	  return api;
	}

	var installed = false;

	function install(Vue) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (installed) {
	    warn('[vue-create-api] already installed. Vue.use(CreateAPI) should be called only once.');
	    return;
	  }
	  installed = true;
	  var _options$componentPre = options.componentPrefix,
	      componentPrefix = _options$componentPre === undefined ? '' : _options$componentPre,
	      _options$apiPrefix = options.apiPrefix,
	      apiPrefix = _options$apiPrefix === undefined ? '$create-' : _options$apiPrefix;


	  Vue.createAPI = function (Component, events, single) {
	    if (isBoolean(events)) {
	      single = events;
	      events = [];
	    }
	    var api = apiCreator.call(this, Component, events, single);
	    var createName = processComponentName(Component, {
	      componentPrefix: componentPrefix,
	      apiPrefix: apiPrefix
	    });
	    Vue.prototype[createName] = Component.$create = api.create;
	    return api;
	  };
	}

	function processComponentName(Component, options) {
	  var componentPrefix = options.componentPrefix,
	      apiPrefix = options.apiPrefix;

	  var name = Component.name;
	  assert(name, 'Component must have name while using create-api!');
	  var prefixReg = new RegExp('^' + escapeReg(componentPrefix), 'i');
	  var pureName = name.replace(prefixReg, '');
	  var camelizeName = '' + camelize('' + apiPrefix + pureName);
	  return camelizeName;
	}

	var index = {
	  install: install,
	  instantiateComponent: instantiateComponent,
	  version: '0.2.0'
	};

	function createAPI(Vue, Component, events, single) {
	  Vue.use(index, {
	    componentPrefix: 'cube-'
	  });
	  var api = Vue.createAPI(Component, events, single);
	  return api;
	}

	function addPopup(Vue, Popup) {
	  createAPI(Vue, Popup, ['mask-click'], true);
	}

	CubePopup.install = function (Vue) {
	  Vue.component(CubePopup.name, CubePopup);
	  addPopup(Vue, CubePopup);
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	var isArray = _core.Array.isArray;

	var isArray$1 = isArray;

	function _arrayWithoutHoles(arr) {
	  if (isArray$1(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) { return TO_STRING ? '' : undefined; }
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _redefine$1 = _hide;

	var _iterators = {};

	var _objectDps$1 = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) { _objectDp.f(O, P = keys[i++], Properties[P]); }
	  return O;
	};

	var document$4 = _global.document;
	var _html$1 = document$4 && document$4.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$3 = _sharedKey('IE_PROTO');
	var Empty$1 = function () { /* empty */ };
	var PROTOTYPE$3 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict$1 = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html$1.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict$1 = iframeDocument.F;
	  while (i--) { delete createDict$1[PROTOTYPE$3][_enumBugKeys[i]]; }
	  return createDict$1();
	};

	var _objectCreate$1 = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty$1[PROTOTYPE$3] = _anObject(O);
	    result = new Empty$1();
	    Empty$1[PROTOTYPE$3] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$3] = O;
	  } else { result = createDict$1(); }
	  return Properties === undefined ? result : _objectDps$1(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) { def(it, TAG, { configurable: true, value: tag }); }
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate$1(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$4 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$4)) { return O[IE_PROTO$4]; }
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) { return proto[kind]; }
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) { for (key in methods) {
	      if (!(key in proto)) { _redefine$1(proto, key, methods[key]); }
	    } } else { _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods); }
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) { return { value: undefined, done: true }; }
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) { _anObject(ret.call(iterator)); }
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) { _objectDp.f(object, index, _propertyDesc(0, value)); }
	  else { object[index] = value; }
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) { return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)]; }
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) { return false; }
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) { mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); }
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from_1 = _core.Array.from;

	var from_1$1 = from_1;

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') { return _iterStep(0, index); }
	  if (kind == 'values') { return _iterStep(0, O[index]); }
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME$1 = DOMIterables[i];
	  var Collection = _global[NAME$1];
	  var proto$1 = Collection && Collection.prototype;
	  if (proto$1 && !proto$1[TO_STRING_TAG]) { _hide(proto$1, TO_STRING_TAG, NAME$1); }
	  _iterators[NAME$1] = _iterators.Array;
	}

	var ITERATOR$4 = _wks('iterator');

	var core_isIterable = _core.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$4] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || _iterators.hasOwnProperty(_classof(O));
	};

	var isIterable = core_isIterable;

	var isIterable$1 = isIterable;

	function _iterableToArray(iter) {
	  if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") { return from_1$1(iter); }
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	/*!
	 * better-normal-scroll v1.15.0
	 * (c) 2016-2019 ustbhuangyi
	 * Released under the MIT License.
	 */
	// As of V8 6.6, depending on the size of the array, this is anywhere
	// between 1.5-10x faster than the two-arg version of Array#splice()
	function spliceOne(list, index) {
	  for (; index + 1 < list.length; index++) {
	    list[index] = list[index + 1];
	  }

	  list.pop();
	}

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) { break; }
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) { _i["return"](); }
	      } finally {
	        if (_d) { throw _e; }
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();













	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; }

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	function eventMixin(BScroll) {
	  BScroll.prototype.on = function (type, fn) {
	    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

	    if (!this._events[type]) {
	      this._events[type] = [];
	    }

	    this._events[type].push([fn, context]);
	  };

	  BScroll.prototype.once = function (type, fn) {
	    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

	    function magic() {
	      this.off(type, magic);

	      fn.apply(context, arguments);
	    }
	    // To expose the corresponding function method in order to execute the off method
	    magic.fn = fn;

	    this.on(type, magic);
	  };

	  BScroll.prototype.off = function (type, fn) {
	    var _events = this._events[type];
	    if (!_events) {
	      return;
	    }

	    var count = _events.length;
	    while (count--) {
	      if (_events[count][0] === fn || _events[count][0] && _events[count][0].fn === fn) {
	        spliceOne(_events, count);
	      }
	    }
	  };

	  BScroll.prototype.trigger = function (type) {
	    var arguments$1 = arguments;

	    var events = this._events[type];
	    if (!events) {
	      return;
	    }

	    var len = events.length;
	    var eventsCopy = [].concat(toConsumableArray(events));
	    for (var i = 0; i < len; i++) {
	      var event = eventsCopy[i];

	      var _event = slicedToArray(event, 2),
	          fn = _event[0],
	          context = _event[1];

	      if (fn) {
	        fn.apply(context, [].slice.call(arguments$1, 1));
	      }
	    }
	  };
	}

	// ssr support
	var inBrowser = typeof window !== 'undefined';
	var ua = inBrowser && navigator.userAgent.toLowerCase();
	var isWeChatDevTools = ua && /wechatdevtools/.test(ua);
	var isAndroid = ua && ua.indexOf('android') > 0;

	function getNow() {
	  return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
	}

	function extend(target) {
	  var arguments$1 = arguments;

	  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    rest[_key - 1] = arguments$1[_key];
	  }

	  for (var i = 0; i < rest.length; i++) {
	    var source = rest[i];
	    for (var key in source) {
	      target[key] = source[key];
	    }
	  }
	  return target;
	}

	function isUndef$1(v) {
	  return v === undefined || v === null;
	}

	function getDistance(x, y) {
	  return Math.sqrt(x * x + y * y);
	}

	var elementStyle = inBrowser && document.createElement('div').style;

	var vendor = function () {
	  if (!inBrowser) {
	    return false;
	  }
	  // first pick up standard to fix #743
	  var transformNames = {
	    standard: 'transform',
	    webkit: 'webkitTransform',
	    Moz: 'MozTransform',
	    O: 'OTransform',
	    ms: 'msTransform'
	  };

	  for (var key in transformNames) {
	    if (elementStyle[transformNames[key]] !== undefined) {
	      return key;
	    }
	  }

	  return false;
	}();

	function prefixStyle(style) {
	  if (vendor === false) {
	    return false;
	  }

	  if (vendor === 'standard') {
	    if (style === 'transitionEnd') {
	      return 'transitionend';
	    }
	    return style;
	  }

	  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	function addEvent(el, type, fn, capture) {
	  el.addEventListener(type, fn, { passive: false, capture: !!capture });
	}

	function removeEvent(el, type, fn, capture) {
	  el.removeEventListener(type, fn, { passive: false, capture: !!capture });
	}

	function offset(el) {
	  var left = 0;
	  var top = 0;

	  while (el) {
	    left -= el.offsetLeft;
	    top -= el.offsetTop;
	    el = el.offsetParent;
	  }

	  return {
	    left: left,
	    top: top
	  };
	}

	function offsetToBody(el) {
	  var rect = el.getBoundingClientRect();

	  return {
	    left: -(rect.left + window.pageXOffset),
	    top: -(rect.top + window.pageYOffset)
	  };
	}

	var cssVendor = vendor && vendor !== 'standard' ? '-' + vendor.toLowerCase() + '-' : '';

	var transform = prefixStyle('transform');
	var transition = prefixStyle('transition');

	var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;
	// fix issue #361
	var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
	var hasTransform = transform !== false;
	var hasTransition = inBrowser && transition in elementStyle;

	var style = {
	  transform: transform,
	  transition: transition,
	  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
	  transitionDuration: prefixStyle('transitionDuration'),
	  transitionDelay: prefixStyle('transitionDelay'),
	  transformOrigin: prefixStyle('transformOrigin'),
	  transitionEnd: prefixStyle('transitionEnd')
	};

	var TOUCH_EVENT = 1;
	var MOUSE_EVENT = 2;

	var eventType = {
	  touchstart: TOUCH_EVENT,
	  touchmove: TOUCH_EVENT,
	  touchend: TOUCH_EVENT,

	  mousedown: MOUSE_EVENT,
	  mousemove: MOUSE_EVENT,
	  mouseup: MOUSE_EVENT
	};

	function getRect(el) {
	  if (el instanceof window.SVGElement) {
	    var rect = el.getBoundingClientRect();
	    return {
	      top: rect.top,
	      left: rect.left,
	      width: rect.width,
	      height: rect.height
	    };
	  } else {
	    return {
	      top: el.offsetTop,
	      left: el.offsetLeft,
	      width: el.offsetWidth,
	      height: el.offsetHeight
	    };
	  }
	}

	function preventDefaultException(el, exceptions) {
	  for (var i in exceptions) {
	    if (exceptions[i].test(el[i])) {
	      return true;
	    }
	  }
	  return false;
	}

	function tap(e, eventName) {
	  var ev = document.createEvent('Event');
	  ev.initEvent(eventName, true, true);
	  ev.pageX = e.pageX;
	  ev.pageY = e.pageY;
	  e.target.dispatchEvent(ev);
	}

	function click(e) {
	  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';

	  var eventSource = void 0;
	  if (e.type === 'mouseup' || e.type === 'mousecancel') {
	    eventSource = e;
	  } else if (e.type === 'touchend' || e.type === 'touchcancel') {
	    eventSource = e.changedTouches[0];
	  }
	  var posSrc = {};
	  if (eventSource) {
	    posSrc.screenX = eventSource.screenX || 0;
	    posSrc.screenY = eventSource.screenY || 0;
	    posSrc.clientX = eventSource.clientX || 0;
	    posSrc.clientY = eventSource.clientY || 0;
	  }
	  var ev = void 0;
	  var bubbles = true;
	  var cancelable = true;
	  if (typeof MouseEvent !== 'undefined') {
	    try {
	      ev = new MouseEvent(event, extend({
	        bubbles: bubbles,
	        cancelable: cancelable
	      }, posSrc));
	    } catch (e) {
	      createEvent();
	    }
	  } else {
	    createEvent();
	  }

	  function createEvent() {
	    ev = document.createEvent('Event');
	    ev.initEvent(event, bubbles, cancelable);
	    extend(ev, posSrc);
	  }

	  // forwardedTouchEvent set to true in case of the conflict with fastclick
	  ev.forwardedTouchEvent = true;
	  ev._constructed = true;
	  e.target.dispatchEvent(ev);
	}

	function dblclick(e) {
	  click(e, 'dblclick');
	}

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	function removeChild(el, child) {
	  el.removeChild(child);
	}

	var DEFAULT_OPTIONS = {
	  startX: 0,
	  startY: 0,
	  scrollX: false,
	  scrollY: true,
	  freeScroll: false,
	  directionLockThreshold: 5,
	  eventPassthrough: '',
	  click: false,
	  tap: false,
	  /**
	   * support any side
	   * bounce: {
	   *   top: true,
	   *   bottom: true,
	   *   left: true,
	   *   right: true
	   * }
	   */
	  bounce: true,
	  bounceTime: 800,
	  momentum: true,
	  momentumLimitTime: 300,
	  momentumLimitDistance: 15,
	  swipeTime: 2500,
	  swipeBounceTime: 500,
	  deceleration: 0.0015,
	  flickLimitTime: 200,
	  flickLimitDistance: 100,
	  resizePolling: 60,
	  probeType: 0,
	  preventDefault: true,
	  preventDefaultException: {
	    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
	  },
	  HWCompositing: true,
	  useTransition: true,
	  useTransform: true,
	  bindToWrapper: false,
	  disableMouse: hasTouch,
	  disableTouch: !hasTouch,
	  observeDOM: true,
	  autoBlur: true,
	  /**
	   * for picker
	   * wheel: {
	   *   selectedIndex: 0,
	   *   rotate: 25,
	   *   adjustTime: 400
	   *   wheelWrapperClass: 'wheel-scroll',
	   *   wheelItemClass: 'wheel-item'
	   * }
	   */
	  wheel: false,
	  /**
	   * for slide
	   * snap: {
	   *   loop: false,
	   *   el: domEl,
	   *   threshold: 0.1,
	   *   stepX: 100,
	   *   stepY: 100,
	   *   speed: 400,
	   *   easing: {
	   *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	   *     fn: function (t) {
	   *       return t * (2 - t)
	   *     }
	   *   }
	   *   listenFlick: true
	   * }
	   */
	  snap: false,
	  /**
	   * for scrollbar
	   * scrollbar: {
	   *   fade: true,
	   *   interactive: false
	   * }
	   */
	  scrollbar: false,
	  /**
	   * for pull down and refresh
	   * pullDownRefresh: {
	   *   threshold: 50,
	   *   stop: 20
	   * }
	   */
	  pullDownRefresh: false,
	  /**
	   * for pull up and load
	   * pullUpLoad: {
	   *   threshold: 50
	   * }
	   */
	  pullUpLoad: false,
	  /**
	   * for mouse wheel
	   * mouseWheel: {
	   *   speed: 20,
	   *   invert: false,
	   *   easeTime: 300
	   * }
	   */
	  mouseWheel: false,
	  stopPropagation: false,
	  /**
	   * for zoom
	   * zoom: {
	   *   start: 1,
	   *   min: 1,
	   *   max: 4
	   * }
	   */
	  zoom: false,
	  /**
	   * for infinity
	   * infinity: {
	   *   render(item, div) {
	   *   },
	   *   createTombstone() {
	   *   },
	   *   fetch(count) {
	   *   }
	   * }
	   */
	  infinity: false,
	  /**
	   * for double click
	   * dblclick: {
	   *   delay: 300
	   * }
	   */
	  dblclick: false
	};

	function initMixin(BScroll) {
	  BScroll.prototype._init = function (options) {
	    this._handleOptions(options);

	    // init private custom events
	    this._events = {};

	    this.x = 0;
	    this.y = 0;
	    this.directionX = 0;
	    this.directionY = 0;

	    this.setScale(1);

	    this._addDOMEvents();

	    this._initExtFeatures();

	    this._watchTransition();

	    if (this.options.observeDOM) {
	      this._initDOMObserver();
	    }

	    if (this.options.autoBlur) {
	      this._handleAutoBlur();
	    }

	    this.refresh();

	    if (!this.options.snap) {
	      this.scrollTo(this.options.startX, this.options.startY);
	    }

	    this.enable();
	  };

	  BScroll.prototype.setScale = function (scale) {
	    this.lastScale = isUndef$1(this.scale) ? scale : this.scale;
	    this.scale = scale;
	  };

	  BScroll.prototype._handleOptions = function (options) {
	    this.options = extend({}, DEFAULT_OPTIONS, options);

	    this.translateZ = this.options.HWCompositing && hasPerspective ? ' translateZ(0)' : '';

	    this.options.useTransition = this.options.useTransition && hasTransition;
	    this.options.useTransform = this.options.useTransform && hasTransform;

	    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	    // If you want eventPassthrough I have to lock one of the axes
	    this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;
	    this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY;

	    // With eventPassthrough we also need lockDirection mechanism
	    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	    if (this.options.tap === true) {
	      this.options.tap = 'tap';
	    }
	  };

	  BScroll.prototype._addDOMEvents = function () {
	    var eventOperation = addEvent;
	    this._handleDOMEvents(eventOperation);
	  };

	  BScroll.prototype._removeDOMEvents = function () {
	    var eventOperation = removeEvent;
	    this._handleDOMEvents(eventOperation);
	  };

	  BScroll.prototype._handleDOMEvents = function (eventOperation) {
	    var target = this.options.bindToWrapper ? this.wrapper : window;
	    eventOperation(window, 'orientationchange', this);
	    eventOperation(window, 'resize', this);

	    if (this.options.click) {
	      eventOperation(this.wrapper, 'click', this, true);
	    }

	    if (!this.options.disableMouse) {
	      eventOperation(this.wrapper, 'mousedown', this);
	      eventOperation(target, 'mousemove', this);
	      eventOperation(target, 'mousecancel', this);
	      eventOperation(target, 'mouseup', this);
	    }

	    if (hasTouch && !this.options.disableTouch) {
	      eventOperation(this.wrapper, 'touchstart', this);
	      eventOperation(target, 'touchmove', this);
	      eventOperation(target, 'touchcancel', this);
	      eventOperation(target, 'touchend', this);
	    }

	    eventOperation(this.scroller, style.transitionEnd, this);
	  };

	  BScroll.prototype._initExtFeatures = function () {
	    if (this.options.snap) {
	      this._initSnap();
	    }
	    if (this.options.scrollbar) {
	      this._initScrollbar();
	    }
	    if (this.options.pullUpLoad) {
	      this._initPullUp();
	    }
	    if (this.options.pullDownRefresh) {
	      this._initPullDown();
	    }
	    if (this.options.wheel) {
	      this._initWheel();
	    }
	    if (this.options.mouseWheel) {
	      this._initMouseWheel();
	    }
	    if (this.options.zoom) {
	      this._initZoom();
	    }
	    if (this.options.infinity) {
	      this._initInfinite();
	    }
	  };

	  BScroll.prototype._watchTransition = function () {
	    if (typeof Object.defineProperty !== 'function') {
	      return;
	    }
	    var me = this;
	    var isInTransition = false;
	    var key = this.options.useTransition ? 'isInTransition' : 'isAnimating';
	    Object.defineProperty(this, key, {
	      get: function get() {
	        return isInTransition;
	      },
	      set: function set(newVal) {
	        isInTransition = newVal;
	        // fix issue #359
	        var el = me.scroller.children.length ? me.scroller.children : [me.scroller];
	        var pointerEvents = isInTransition && !me.pulling ? 'none' : 'auto';
	        for (var i = 0; i < el.length; i++) {
	          el[i].style.pointerEvents = pointerEvents;
	        }
	      }
	    });
	  };

	  BScroll.prototype._handleAutoBlur = function () {
	    this.on('scrollStart', function () {
	      var activeElement = document.activeElement;
	      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
	        activeElement.blur();
	      }
	    });
	  };

	  BScroll.prototype._initDOMObserver = function () {
	    var _this = this;

	    if (typeof MutationObserver !== 'undefined') {
	      var timer = void 0;
	      var observer = new MutationObserver(function (mutations) {
	        // don't do any refresh during the transition, or outside of the boundaries
	        if (_this._shouldNotRefresh()) {
	          return;
	        }
	        var immediateRefresh = false;
	        var deferredRefresh = false;
	        for (var i = 0; i < mutations.length; i++) {
	          var mutation = mutations[i];
	          if (mutation.type !== 'attributes') {
	            immediateRefresh = true;
	            break;
	          } else {
	            if (mutation.target !== _this.scroller) {
	              deferredRefresh = true;
	              break;
	            }
	          }
	        }
	        if (immediateRefresh) {
	          _this.refresh();
	        } else if (deferredRefresh) {
	          // attributes changes too often
	          clearTimeout(timer);
	          timer = setTimeout(function () {
	            if (!_this._shouldNotRefresh()) {
	              _this.refresh();
	            }
	          }, 60);
	        }
	      });
	      var config = {
	        attributes: true,
	        childList: true,
	        subtree: true
	      };
	      observer.observe(this.scroller, config);

	      this.on('destroy', function () {
	        observer.disconnect();
	      });
	    } else {
	      this._checkDOMUpdate();
	    }
	  };

	  BScroll.prototype._shouldNotRefresh = function () {
	    var outsideBoundaries = this.x > this.minScrollX || this.x < this.maxScrollX || this.y > this.minScrollY || this.y < this.maxScrollY;

	    return this.isInTransition || this.stopFromTransition || outsideBoundaries;
	  };

	  BScroll.prototype._checkDOMUpdate = function () {
	    var scrollerRect = getRect(this.scroller);
	    var oldWidth = scrollerRect.width;
	    var oldHeight = scrollerRect.height;

	    function check() {
	      if (this.destroyed) {
	        return;
	      }
	      scrollerRect = getRect(this.scroller);
	      var newWidth = scrollerRect.width;
	      var newHeight = scrollerRect.height;

	      if (oldWidth !== newWidth || oldHeight !== newHeight) {
	        this.refresh();
	      }
	      oldWidth = newWidth;
	      oldHeight = newHeight;

	      next.call(this);
	    }

	    function next() {
	      var _this2 = this;

	      setTimeout(function () {
	        check.call(_this2);
	      }, 1000);
	    }

	    next.call(this);
	  };

	  BScroll.prototype.handleEvent = function (e) {
	    switch (e.type) {
	      case 'touchstart':
	      case 'mousedown':
	        this._start(e);
	        if (this.options.zoom && e.touches && e.touches.length > 1) {
	          this._zoomStart(e);
	        }
	        break;
	      case 'touchmove':
	      case 'mousemove':
	        if (this.options.zoom && e.touches && e.touches.length > 1) {
	          this._zoom(e);
	        } else {
	          this._move(e);
	        }
	        break;
	      case 'touchend':
	      case 'mouseup':
	      case 'touchcancel':
	      case 'mousecancel':
	        if (this.scaled) {
	          this._zoomEnd(e);
	        } else {
	          this._end(e);
	        }
	        break;
	      case 'orientationchange':
	      case 'resize':
	        this._resize();
	        break;
	      case 'transitionend':
	      case 'webkitTransitionEnd':
	      case 'oTransitionEnd':
	      case 'MSTransitionEnd':
	        this._transitionEnd(e);
	        break;
	      case 'click':
	        if (this.enabled && !e._constructed) {
	          if (!preventDefaultException(e.target, this.options.preventDefaultException)) {
	            e.preventDefault();
	            e.stopPropagation();
	          }
	        }
	        break;
	      case 'wheel':
	      case 'DOMMouseScroll':
	      case 'mousewheel':
	        this._onMouseWheel(e);
	        break;
	    }
	  };

	  BScroll.prototype.refresh = function () {
	    var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
	    var wrapperRect = getRect(this.wrapper);
	    this.wrapperWidth = wrapperRect.width;
	    this.wrapperHeight = wrapperRect.height;

	    var scrollerRect = getRect(this.scroller);
	    this.scrollerWidth = Math.round(scrollerRect.width * this.scale);
	    this.scrollerHeight = Math.round(scrollerRect.height * this.scale);

	    this.relativeX = scrollerRect.left;
	    this.relativeY = scrollerRect.top;

	    if (isWrapperStatic) {
	      this.relativeX -= wrapperRect.left;
	      this.relativeY -= wrapperRect.top;
	    }

	    this.minScrollX = 0;
	    this.minScrollY = 0;

	    var wheel = this.options.wheel;
	    if (wheel) {
	      this.items = this.scroller.children;
	      // check whether there are all disable items or not when refresh
	      this._checkWheelAllDisabled();
	      this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0;
	      if (this.selectedIndex === undefined) {
	        this.selectedIndex = wheel.selectedIndex || 0;
	      }
	      this.options.startY = -this.selectedIndex * this.itemHeight;

	      this.maxScrollX = 0;
	      this.maxScrollY = -this.itemHeight * (this.items.length - 1);
	    } else {
	      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
	      if (!this.options.infinity) {
	        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
	      }
	      if (this.maxScrollX < 0) {
	        this.maxScrollX -= this.relativeX;
	        this.minScrollX = -this.relativeX;
	      } else if (this.scale > 1) {
	        this.maxScrollX = this.maxScrollX / 2 - this.relativeX;
	        this.minScrollX = this.maxScrollX;
	      }
	      if (this.maxScrollY < 0) {
	        this.maxScrollY -= this.relativeY;
	        this.minScrollY = -this.relativeY;
	      } else if (this.scale > 1) {
	        this.maxScrollY = this.maxScrollY / 2 - this.relativeY;
	        this.minScrollY = this.maxScrollY;
	      }
	    }

	    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX;
	    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY;

	    if (!this.hasHorizontalScroll) {
	      this.maxScrollX = this.minScrollX;
	      this.scrollerWidth = this.wrapperWidth;
	    }

	    if (!this.hasVerticalScroll) {
	      this.maxScrollY = this.minScrollY;
	      this.scrollerHeight = this.wrapperHeight;
	    }

	    this.endTime = 0;
	    this.directionX = 0;
	    this.directionY = 0;
	    this.wrapperOffset = offset(this.wrapper);

	    this.trigger('refresh');

	    !this.scaled && this.resetPosition();
	  };

	  BScroll.prototype.enable = function () {
	    this.enabled = true;
	  };

	  BScroll.prototype.disable = function () {
	    this.enabled = false;
	  };
	}

	var ease = {
	  // easeOutQuint
	  swipe: {
	    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
	    fn: function fn(t) {
	      return 1 + --t * t * t * t * t;
	    }
	  },
	  // easeOutQuard
	  swipeBounce: {
	    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	    fn: function fn(t) {
	      return t * (2 - t);
	    }
	  },
	  // easeOutQuart
	  bounce: {
	    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
	    fn: function fn(t) {
	      return 1 - --t * t * t * t;
	    }
	  }
	};

	function momentum(current, start, time, lowerMargin, upperMargin, wrapperSize, options, scroll) {
	  var distance = current - start;
	  var speed = Math.abs(distance) / time;

	  var deceleration = options.deceleration,
	      itemHeight = options.itemHeight,
	      swipeBounceTime = options.swipeBounceTime,
	      wheel = options.wheel,
	      swipeTime = options.swipeTime;

	  var duration = swipeTime;
	  var rate = wheel ? 4 : 15;

	  var destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

	  if (wheel && itemHeight) {
	    destination = scroll._findNearestValidWheel(destination).y;
	  }

	  if (destination < lowerMargin) {
	    destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - wrapperSize / rate * speed) : lowerMargin;
	    duration = swipeBounceTime;
	  } else if (destination > upperMargin) {
	    destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / rate * speed) : upperMargin;
	    duration = swipeBounceTime;
	  }

	  return {
	    destination: Math.round(destination),
	    duration: duration
	  };
	}

	var DEFAULT_INTERVAL = 100 / 60;

	function noop() {}

	var requestAnimationFrame = function () {
	  if (!inBrowser) {
	    /* istanbul ignore if */
	    return noop;
	  }
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
	  // if all else fails, use setTimeout
	  function (callback) {
	    return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.
	  };
	}();

	var cancelAnimationFrame = function () {
	  if (!inBrowser) {
	    /* istanbul ignore if */
	    return noop;
	  }
	  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
	    window.clearTimeout(id);
	  };
	}();

	var DIRECTION_UP = 1;
	var DIRECTION_DOWN = -1;
	var DIRECTION_LEFT = 1;
	var DIRECTION_RIGHT = -1;

	var PROBE_DEBOUNCE = 1;

	var PROBE_REALTIME = 3;

	function warn$1(msg) {
	  console.error('[BScroll warn]: ' + msg);
	}

	function assert$1(condition, msg) {
	  if (!condition) {
	    throw new Error('[BScroll] ' + msg);
	  }
	}

	function coreMixin(BScroll) {
	  BScroll.prototype._start = function (e) {
	    var _eventType = eventType[e.type];
	    if (_eventType !== TOUCH_EVENT) {
	      if (e.button !== 0) {
	        return;
	      }
	    }
	    if (!this.enabled || this.destroyed || this.initiated && this.initiated !== _eventType) {
	      return;
	    }
	    this.initiated = _eventType;

	    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
	      e.preventDefault();
	    }
	    if (this.options.stopPropagation) {
	      e.stopPropagation();
	    }

	    this.moved = false;
	    this.distX = 0;
	    this.distY = 0;
	    this.directionX = 0;
	    this.directionY = 0;
	    this.movingDirectionX = 0;
	    this.movingDirectionY = 0;
	    this.directionLocked = 0;

	    this._transitionTime();
	    this.startTime = getNow();

	    if (this.options.wheel) {
	      this.target = e.target;
	    }

	    this.stop();

	    var point = e.touches ? e.touches[0] : e;

	    this.startX = this.x;
	    this.startY = this.y;
	    this.absStartX = this.x;
	    this.absStartY = this.y;
	    this.pointX = point.pageX;
	    this.pointY = point.pageY;

	    this.trigger('beforeScrollStart');
	  };

	  BScroll.prototype._move = function (e) {
	    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
	      return;
	    }

	    if (this.options.preventDefault) {
	      e.preventDefault();
	    }
	    if (this.options.stopPropagation) {
	      e.stopPropagation();
	    }

	    var point = e.touches ? e.touches[0] : e;
	    var deltaX = point.pageX - this.pointX;
	    var deltaY = point.pageY - this.pointY;

	    this.pointX = point.pageX;
	    this.pointY = point.pageY;

	    this.distX += deltaX;
	    this.distY += deltaY;

	    var absDistX = Math.abs(this.distX);
	    var absDistY = Math.abs(this.distY);

	    var timestamp = getNow();

	    // We need to move at least momentumLimitDistance pixels for the scrolling to initiate
	    if (timestamp - this.endTime > this.options.momentumLimitTime && !this.moved && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance) {
	      return;
	    }

	    // If you are scrolling in one direction lock the other
	    if (!this.directionLocked && !this.options.freeScroll) {
	      if (absDistX > absDistY + this.options.directionLockThreshold) {
	        this.directionLocked = 'h'; // lock horizontally
	      } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
	        this.directionLocked = 'v'; // lock vertically
	      } else {
	        this.directionLocked = 'n'; // no lock
	      }
	    }

	    if (this.directionLocked === 'h') {
	      if (this.options.eventPassthrough === 'vertical') {
	        e.preventDefault();
	      } else if (this.options.eventPassthrough === 'horizontal') {
	        this.initiated = false;
	        return;
	      }
	      deltaY = 0;
	    } else if (this.directionLocked === 'v') {
	      if (this.options.eventPassthrough === 'horizontal') {
	        e.preventDefault();
	      } else if (this.options.eventPassthrough === 'vertical') {
	        this.initiated = false;
	        return;
	      }
	      deltaX = 0;
	    }

	    deltaX = this.hasHorizontalScroll ? deltaX : 0;
	    deltaY = this.hasVerticalScroll ? deltaY : 0;
	    this.movingDirectionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
	    this.movingDirectionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;

	    var newX = this.x + deltaX;
	    var newY = this.y + deltaY;

	    var top = false;
	    var bottom = false;
	    var left = false;
	    var right = false;
	    // Slow down or stop if outside of the boundaries
	    var bounce = this.options.bounce;
	    if (bounce !== false) {
	      top = bounce.top === undefined ? true : bounce.top;
	      bottom = bounce.bottom === undefined ? true : bounce.bottom;
	      left = bounce.left === undefined ? true : bounce.left;
	      right = bounce.right === undefined ? true : bounce.right;
	    }
	    if (newX > this.minScrollX || newX < this.maxScrollX) {
	      if (newX > this.minScrollX && left || newX < this.maxScrollX && right) {
	        newX = this.x + deltaX / 3;
	      } else {
	        newX = newX > this.minScrollX ? this.minScrollX : this.maxScrollX;
	      }
	    }
	    if (newY > this.minScrollY || newY < this.maxScrollY) {
	      if (newY > this.minScrollY && top || newY < this.maxScrollY && bottom) {
	        newY = this.y + deltaY / 3;
	      } else {
	        newY = newY > this.minScrollY ? this.minScrollY : this.maxScrollY;
	      }
	    }

	    if (!this.moved) {
	      this.moved = true;
	      this.trigger('scrollStart');
	    }

	    this._translate(newX, newY);

	    if (timestamp - this.startTime > this.options.momentumLimitTime) {
	      this.startTime = timestamp;
	      this.startX = this.x;
	      this.startY = this.y;

	      if (this.options.probeType === PROBE_DEBOUNCE) {
	        this.trigger('scroll', {
	          x: this.x,
	          y: this.y
	        });
	      }
	    }

	    if (this.options.probeType > PROBE_DEBOUNCE) {
	      this.trigger('scroll', {
	        x: this.x,
	        y: this.y
	      });
	    }

	    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
	    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

	    var pX = this.pointX - scrollLeft;
	    var pY = this.pointY - scrollTop;

	    if (pX > document.documentElement.clientWidth - this.options.momentumLimitDistance || pX < this.options.momentumLimitDistance || pY < this.options.momentumLimitDistance || pY > document.documentElement.clientHeight - this.options.momentumLimitDistance) {
	      this._end(e);
	    }
	  };

	  BScroll.prototype._end = function (e) {
	    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
	      return;
	    }
	    this.initiated = false;

	    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
	      e.preventDefault();
	    }
	    if (this.options.stopPropagation) {
	      e.stopPropagation();
	    }

	    this.trigger('touchEnd', {
	      x: this.x,
	      y: this.y
	    });

	    this.isInTransition = false;

	    // ensures that the last position is rounded
	    var newX = Math.round(this.x);
	    var newY = Math.round(this.y);

	    var deltaX = newX - this.absStartX;
	    var deltaY = newY - this.absStartY;
	    this.directionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
	    this.directionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;

	    // if configure pull down refresh, check it first
	    if (this.options.pullDownRefresh && this._checkPullDown()) {
	      return;
	    }

	    // check if it is a click operation
	    if (this._checkClick(e)) {
	      this.trigger('scrollCancel');
	      return;
	    }

	    // reset if we are outside of the boundaries
	    if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
	      return;
	    }

	    this._translate(newX, newY);

	    this.endTime = getNow();
	    var duration = this.endTime - this.startTime;
	    var absDistX = Math.abs(newX - this.startX);
	    var absDistY = Math.abs(newY - this.startY);

	    // flick
	    if (this._events.flick && duration < this.options.flickLimitTime && absDistX < this.options.flickLimitDistance && absDistY < this.options.flickLimitDistance) {
	      this.trigger('flick');
	      return;
	    }

	    var time = 0;
	    // start momentum animation if needed
	    if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {
	      var top = false;
	      var bottom = false;
	      var left = false;
	      var right = false;
	      var bounce = this.options.bounce;
	      if (bounce !== false) {
	        top = bounce.top === undefined ? true : bounce.top;
	        bottom = bounce.bottom === undefined ? true : bounce.bottom;
	        left = bounce.left === undefined ? true : bounce.left;
	        right = bounce.right === undefined ? true : bounce.right;
	      }
	      var wrapperWidth = this.directionX === DIRECTION_RIGHT && left || this.directionX === DIRECTION_LEFT && right ? this.wrapperWidth : 0;
	      var wrapperHeight = this.directionY === DIRECTION_DOWN && top || this.directionY === DIRECTION_UP && bottom ? this.wrapperHeight : 0;
	      var momentumX = this.hasHorizontalScroll ? momentum(this.x, this.startX, duration, this.maxScrollX, this.minScrollX, wrapperWidth, this.options, this) : { destination: newX, duration: 0 };
	      var momentumY = this.hasVerticalScroll ? momentum(this.y, this.startY, duration, this.maxScrollY, this.minScrollY, wrapperHeight, this.options, this) : { destination: newY, duration: 0 };
	      newX = momentumX.destination;
	      newY = momentumY.destination;
	      time = Math.max(momentumX.duration, momentumY.duration);
	      this.isInTransition = true;
	    } else {
	      if (this.options.wheel) {
	        newY = this._findNearestValidWheel(newY).y;
	        time = this.options.wheel.adjustTime || 400;
	      }
	    }

	    var easing = ease.swipe;
	    if (this.options.snap) {
	      var snap = this._nearestSnap(newX, newY);
	      this.currentPage = snap;
	      time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
	      newX = snap.x;
	      newY = snap.y;

	      this.directionX = 0;
	      this.directionY = 0;
	      easing = this.options.snap.easing || ease.bounce;
	    }

	    if (newX !== this.x || newY !== this.y) {
	      // change easing function when scroller goes out of the boundaries
	      if (newX > this.minScrollX || newX < this.maxScrollX || newY > this.minScrollY || newY < this.maxScrollY) {
	        easing = ease.swipeBounce;
	      }
	      this.scrollTo(newX, newY, time, easing);
	      return;
	    }

	    if (this.options.wheel) {
	      this.selectedIndex = this._findNearestValidWheel(this.y).index;
	    }

	    this.trigger('scrollEnd', {
	      x: this.x,
	      y: this.y
	    });
	  };

	  BScroll.prototype._checkClick = function (e) {
	    // when in the process of pulling down, it should not prevent click
	    var preventClick = this.stopFromTransition && !this.pulling;
	    this.stopFromTransition = false;

	    // we scrolled less than 15 pixels
	    if (!this.moved) {
	      if (this.options.wheel) {
	        if (this.target && this.target.className === this.options.wheel.wheelWrapperClass) {
	          var index = this._findNearestValidWheel(this.y).index;
	          var _offset = Math.round((this.pointY + offsetToBody(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);
	          this.target = this.items[index + _offset];
	        }
	        var top = offset(this.target).top;
	        var left = offset(this.target).left;
	        top -= this.wrapperOffset.top;
	        top -= Math.round(this.target.offsetHeight / 2 - this.wrapper.offsetHeight / 2) || 0;
	        left -= this.wrapperOffset.left;
	        left -= Math.round(this.target.offsetWidth / 2 - this.wrapper.offsetWidth / 2) || 0;

	        top = this._findNearestValidWheel(top).y;
	        this.scrollTo(left, top, this.options.wheel.adjustTime || 400, ease.swipe);
	        return true;
	      } else {
	        if (!preventClick) {
	          var _dblclick = this.options.dblclick;
	          var dblclickTrigged = false;
	          if (_dblclick && this.lastClickTime) {
	            var _dblclick$delay = _dblclick.delay,
	                delay = _dblclick$delay === undefined ? 300 : _dblclick$delay;

	            if (getNow() - this.lastClickTime < delay) {
	              dblclickTrigged = true;
	              dblclick(e);
	            }
	          }
	          if (this.options.tap) {
	            tap(e, this.options.tap);
	          }

	          if (this.options.click && !preventDefaultException(e.target, this.options.preventDefaultException)) {
	            click(e);
	          }
	          this.lastClickTime = dblclickTrigged ? null : getNow();
	          return true;
	        }
	        return false;
	      }
	    }
	    return false;
	  };

	  BScroll.prototype._resize = function () {
	    var _this = this;

	    if (!this.enabled) {
	      return;
	    }
	    // fix a scroll problem under Android condition
	    if (isAndroid) {
	      this.wrapper.scrollTop = 0;
	    }
	    clearTimeout(this.resizeTimeout);
	    this.resizeTimeout = setTimeout(function () {
	      _this.refresh();
	    }, this.options.resizePolling);
	  };

	  BScroll.prototype._startProbe = function () {
	    cancelAnimationFrame(this.probeTimer);
	    this.probeTimer = requestAnimationFrame(probe);

	    var me = this;

	    function probe() {
	      var pos = me.getComputedPosition();
	      me.trigger('scroll', pos);
	      if (!me.isInTransition) {
	        me.trigger('scrollEnd', pos);
	        return;
	      }
	      me.probeTimer = requestAnimationFrame(probe);
	    }
	  };

	  BScroll.prototype._transitionTime = function () {
	    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    this.scrollerStyle[style.transitionDuration] = time + 'ms';

	    if (this.options.wheel) {
	      for (var i = 0; i < this.items.length; i++) {
	        this.items[i].style[style.transitionDuration] = time + 'ms';
	      }
	    }

	    if (this.indicators) {
	      for (var _i = 0; _i < this.indicators.length; _i++) {
	        this.indicators[_i].transitionTime(time);
	      }
	    }
	  };

	  BScroll.prototype._transitionTimingFunction = function (easing) {
	    this.scrollerStyle[style.transitionTimingFunction] = easing;

	    if (this.options.wheel) {
	      for (var i = 0; i < this.items.length; i++) {
	        this.items[i].style[style.transitionTimingFunction] = easing;
	      }
	    }

	    if (this.indicators) {
	      for (var _i2 = 0; _i2 < this.indicators.length; _i2++) {
	        this.indicators[_i2].transitionTimingFunction(easing);
	      }
	    }
	  };

	  BScroll.prototype._transitionEnd = function (e) {
	    if (e.target !== this.scroller || !this.isInTransition) {
	      return;
	    }

	    this._transitionTime();
	    var needReset = !this.pulling || this.movingDirectionY === DIRECTION_UP;
	    if (needReset && !this.resetPosition(this.options.bounceTime, ease.bounce)) {
	      this.isInTransition = false;
	      if (this.options.probeType !== PROBE_REALTIME) {
	        this.trigger('scrollEnd', {
	          x: this.x,
	          y: this.y
	        });
	      }
	    }
	  };

	  BScroll.prototype._translate = function (x, y, scale) {
	    assert$1(!isUndef$1(x) && !isUndef$1(y), 'Translate x or y is null or undefined.');
	    if (isUndef$1(scale)) {
	      scale = this.scale;
	    }
	    if (this.options.useTransform) {
	      this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')' + this.translateZ;
	    } else {
	      x = Math.round(x);
	      y = Math.round(y);
	      this.scrollerStyle.left = x + 'px';
	      this.scrollerStyle.top = y + 'px';
	    }

	    if (this.options.wheel) {
	      var _options$wheel$rotate = this.options.wheel.rotate,
	          rotate = _options$wheel$rotate === undefined ? 25 : _options$wheel$rotate;

	      for (var i = 0; i < this.items.length; i++) {
	        var deg = rotate * (y / this.itemHeight + i);
	        this.items[i].style[style.transform] = 'rotateX(' + deg + 'deg)';
	      }
	    }

	    this.x = x;
	    this.y = y;
	    this.setScale(scale);

	    if (this.indicators) {
	      for (var _i3 = 0; _i3 < this.indicators.length; _i3++) {
	        this.indicators[_i3].updatePosition();
	      }
	    }
	  };

	  BScroll.prototype._animate = function (destX, destY, duration, easingFn) {
	    var me = this;
	    var startX = this.x;
	    var startY = this.y;
	    var startScale = this.lastScale;
	    var destScale = this.scale;
	    var startTime = getNow();
	    var destTime = startTime + duration;

	    function step() {
	      var now = getNow();

	      if (now >= destTime) {
	        me.isAnimating = false;
	        me._translate(destX, destY, destScale);

	        me.trigger('scroll', {
	          x: me.x,
	          y: me.y
	        });

	        if (!me.pulling && !me.resetPosition(me.options.bounceTime)) {
	          me.trigger('scrollEnd', {
	            x: me.x,
	            y: me.y
	          });
	        }
	        return;
	      }
	      now = (now - startTime) / duration;
	      var easing = easingFn(now);
	      var newX = (destX - startX) * easing + startX;
	      var newY = (destY - startY) * easing + startY;
	      var newScale = (destScale - startScale) * easing + startScale;

	      me._translate(newX, newY, newScale);

	      if (me.isAnimating) {
	        me.animateTimer = requestAnimationFrame(step);
	      }

	      if (me.options.probeType === PROBE_REALTIME) {
	        me.trigger('scroll', {
	          x: me.x,
	          y: me.y
	        });
	      }
	    }

	    this.isAnimating = true;
	    cancelAnimationFrame(this.animateTimer);
	    step();
	  };

	  BScroll.prototype.scrollBy = function (x, y) {
	    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;

	    x = this.x + x;
	    y = this.y + y;

	    this.scrollTo(x, y, time, easing);
	  };

	  BScroll.prototype.scrollTo = function (x, y) {
	    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;

	    if (this.options.wheel) {
	      y = this._findNearestValidWheel(y).y;
	    }
	    this.isInTransition = this.options.useTransition && time > 0 && (this.x !== x || this.y !== y);

	    if (!time || this.options.useTransition) {
	      this._transitionTimingFunction(easing.style);
	      this._transitionTime(time);
	      this._translate(x, y);

	      if (time && this.options.probeType === PROBE_REALTIME) {
	        this._startProbe();
	      }
	      if (!time) {
	        // don't trigger resetPosition when zoom feature is open, fix #748
	        if (this.options.zoom) { return; }
	        this.trigger('scroll', {
	          x: x,
	          y: y
	        });
	        // force reflow to put everything in position
	        this._reflow = document.body.offsetHeight;
	        if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
	          this.trigger('scrollEnd', {
	            x: x,
	            y: y
	          });
	        }
	      }

	      if (this.options.wheel) {
	        this.selectedIndex = this._findNearestValidWheel(y).index;
	      }
	    } else {
	      this._animate(x, y, time, easing.fn);
	    }
	  };

	  BScroll.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
	    if (!el) {
	      return;
	    }
	    el = el.nodeType ? el : this.scroller.querySelector(el);

	    if (this.options.wheel && !el.classList.contains(this.options.wheel.wheelItemClass)) {
	      return;
	    }

	    var pos = offset(el);
	    pos.left -= this.wrapperOffset.left;
	    pos.top -= this.wrapperOffset.top;

	    // if offsetX/Y are true we center the element to the screen
	    if (offsetX === true) {
	      offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
	    }
	    if (offsetY === true) {
	      offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
	    }

	    pos.left -= offsetX || 0;
	    pos.top -= offsetY || 0;
	    pos.left = pos.left > this.minScrollX ? this.minScrollX : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
	    pos.top = pos.top > this.minScrollY ? this.minScrollY : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

	    if (this.options.wheel) {
	      pos.top = this._findNearestValidWheel(pos.top).y;
	    }

	    this.scrollTo(pos.left, pos.top, time, easing);
	  };

	  BScroll.prototype.resetPosition = function () {
	    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var easeing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ease.bounce;

	    var x = this.x;
	    var roundX = Math.round(x);
	    if (!this.hasHorizontalScroll || roundX > this.minScrollX) {
	      x = this.minScrollX;
	    } else if (roundX < this.maxScrollX) {
	      x = this.maxScrollX;
	    }

	    var y = this.y;
	    var roundY = Math.round(y);
	    if (!this.hasVerticalScroll || roundY > this.minScrollY) {
	      y = this.minScrollY;
	    } else if (roundY < this.maxScrollY) {
	      y = this.maxScrollY;
	    }

	    if (x === this.x && y === this.y) {
	      return false;
	    }

	    this.scrollTo(x, y, time, easeing);

	    return true;
	  };

	  BScroll.prototype.getComputedPosition = function () {
	    var matrix = window.getComputedStyle(this.scroller, null);
	    var x = void 0;
	    var y = void 0;

	    if (this.options.useTransform) {
	      matrix = matrix[style.transform].split(')')[0].split(', ');
	      x = +(matrix[12] || matrix[4]);
	      y = +(matrix[13] || matrix[5]);
	    } else {
	      x = +matrix.left.replace(/[^-\d.]/g, '');
	      y = +matrix.top.replace(/[^-\d.]/g, '');
	    }

	    return {
	      x: x,
	      y: y
	    };
	  };

	  BScroll.prototype.stop = function () {
	    if (this.options.useTransition && this.isInTransition) {
	      this.isInTransition = false;
	      cancelAnimationFrame(this.probeTimer);
	      var pos = this.getComputedPosition();
	      this._translate(pos.x, pos.y);
	      if (this.options.wheel) {
	        this.target = this.items[this._findNearestValidWheel(pos.y).index];
	      } else {
	        this.trigger('scrollEnd', {
	          x: this.x,
	          y: this.y
	        });
	      }
	      this.stopFromTransition = true;
	    } else if (!this.options.useTransition && this.isAnimating) {
	      this.isAnimating = false;
	      cancelAnimationFrame(this.animateTimer);
	      this.trigger('scrollEnd', {
	        x: this.x,
	        y: this.y
	      });
	      this.stopFromTransition = true;
	    }
	  };

	  BScroll.prototype.destroy = function () {
	    this.destroyed = true;
	    this.trigger('destroy');
	    if (this.options.useTransition) {
	      cancelAnimationFrame(this.probeTimer);
	    } else {
	      cancelAnimationFrame(this.animateTimer);
	    }
	    this._removeDOMEvents();
	    // remove custom events
	    this._events = {};
	  };
	}

	function snapMixin(BScroll) {
	  BScroll.prototype._initSnap = function () {
	    var _this = this;

	    this.currentPage = {};
	    var snap = this.options.snap;

	    if (snap.loop) {
	      var children = this.scroller.children;
	      if (children.length > 1) {
	        prepend(children[children.length - 1].cloneNode(true), this.scroller);
	        this.scroller.appendChild(children[1].cloneNode(true));
	      } else {
	        // Loop does not make any sense if there is only one child.
	        snap.loop = false;
	      }
	    }

	    var el = snap.el;
	    if (typeof el === 'string') {
	      el = this.scroller.querySelectorAll(el);
	    }

	    this.on('refresh', function () {
	      _this.pages = [];

	      if (!_this.wrapperWidth || !_this.wrapperHeight || !_this.scrollerWidth || !_this.scrollerHeight) {
	        return;
	      }

	      var stepX = snap.stepX || _this.wrapperWidth;
	      var stepY = snap.stepY || _this.wrapperHeight;

	      var x = 0;
	      var y = void 0;
	      var cx = void 0;
	      var cy = void 0;
	      var i = 0;
	      var l = void 0;
	      var m = 0;
	      var n = void 0;
	      var rect = void 0;
	      if (!el) {
	        cx = Math.round(stepX / 2);
	        cy = Math.round(stepY / 2);

	        while (x > -_this.scrollerWidth) {
	          _this.pages[i] = [];
	          l = 0;
	          y = 0;

	          while (y > -_this.scrollerHeight) {
	            _this.pages[i][l] = {
	              x: Math.max(x, _this.maxScrollX),
	              y: Math.max(y, _this.maxScrollY),
	              width: stepX,
	              height: stepY,
	              cx: x - cx,
	              cy: y - cy
	            };

	            y -= stepY;
	            l++;
	          }

	          x -= stepX;
	          i++;
	        }
	      } else {
	        l = el.length;
	        n = -1;

	        for (; i < l; i++) {
	          rect = getRect(el[i]);
	          if (i === 0 || rect.left <= getRect(el[i - 1]).left) {
	            m = 0;
	            n++;
	          }

	          if (!_this.pages[m]) {
	            _this.pages[m] = [];
	          }

	          x = Math.max(-rect.left, _this.maxScrollX);
	          y = Math.max(-rect.top, _this.maxScrollY);
	          cx = x - Math.round(rect.width / 2);
	          cy = y - Math.round(rect.height / 2);

	          _this.pages[m][n] = {
	            x: x,
	            y: y,
	            width: rect.width,
	            height: rect.height,
	            cx: cx,
	            cy: cy
	          };

	          if (x > _this.maxScrollX) {
	            m++;
	          }
	        }
	      }

	      _this._checkSnapLoop();

	      var initPageX = snap._loopX ? 1 : 0;
	      var initPageY = snap._loopY ? 1 : 0;
	      _this._goToPage(_this.currentPage.pageX || initPageX, _this.currentPage.pageY || initPageY, 0);

	      // Update snap threshold if needed.
	      var snapThreshold = snap.threshold;
	      if (snapThreshold % 1 === 0) {
	        _this.snapThresholdX = snapThreshold;
	        _this.snapThresholdY = snapThreshold;
	      } else {
	        _this.snapThresholdX = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].width * snapThreshold);
	        _this.snapThresholdY = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].height * snapThreshold);
	      }
	    });

	    this.on('scrollEnd', function () {
	      if (snap.loop) {
	        if (snap._loopX) {
	          if (_this.currentPage.pageX === 0) {
	            _this._goToPage(_this.pages.length - 2, _this.currentPage.pageY, 0);
	          }
	          if (_this.currentPage.pageX === _this.pages.length - 1) {
	            _this._goToPage(1, _this.currentPage.pageY, 0);
	          }
	        } else {
	          if (_this.currentPage.pageY === 0) {
	            _this._goToPage(_this.currentPage.pageX, _this.pages[0].length - 2, 0);
	          }
	          if (_this.currentPage.pageY === _this.pages[0].length - 1) {
	            _this._goToPage(_this.currentPage.pageX, 1, 0);
	          }
	        }
	      }
	    });

	    if (snap.listenFlick !== false) {
	      this.on('flick', function () {
	        var time = snap.speed || Math.max(Math.max(Math.min(Math.abs(_this.x - _this.startX), 1000), Math.min(Math.abs(_this.y - _this.startY), 1000)), 300);

	        _this._goToPage(_this.currentPage.pageX + _this.directionX, _this.currentPage.pageY + _this.directionY, time);
	      });
	    }

	    this.on('destroy', function () {
	      if (snap.loop) {
	        var _children = _this.scroller.children;
	        if (_children.length > 2) {
	          removeChild(_this.scroller, _children[_children.length - 1]);
	          removeChild(_this.scroller, _children[0]);
	        }
	      }
	    });
	  };

	  BScroll.prototype._checkSnapLoop = function () {
	    var snap = this.options.snap;

	    if (!snap.loop || !this.pages || !this.pages.length) {
	      return;
	    }

	    if (this.pages.length > 1) {
	      snap._loopX = true;
	    }
	    if (this.pages[0] && this.pages[0].length > 1) {
	      snap._loopY = true;
	    }
	    if (snap._loopX && snap._loopY) {
	      warn$1('Loop does not support two direction at the same time.');
	    }
	  };

	  BScroll.prototype._nearestSnap = function (x, y) {
	    if (!this.pages.length) {
	      return { x: 0, y: 0, pageX: 0, pageY: 0 };
	    }

	    var i = 0;
	    // Check if we exceeded the snap threshold
	    if (Math.abs(x - this.absStartX) <= this.snapThresholdX && Math.abs(y - this.absStartY) <= this.snapThresholdY) {
	      return this.currentPage;
	    }

	    if (x > this.minScrollX) {
	      x = this.minScrollX;
	    } else if (x < this.maxScrollX) {
	      x = this.maxScrollX;
	    }

	    if (y > this.minScrollY) {
	      y = this.minScrollY;
	    } else if (y < this.maxScrollY) {
	      y = this.maxScrollY;
	    }

	    var l = this.pages.length;
	    for (; i < l; i++) {
	      if (x >= this.pages[i][0].cx) {
	        x = this.pages[i][0].x;
	        break;
	      }
	    }

	    l = this.pages[i].length;

	    var m = 0;
	    for (; m < l; m++) {
	      if (y >= this.pages[0][m].cy) {
	        y = this.pages[0][m].y;
	        break;
	      }
	    }

	    if (i === this.currentPage.pageX) {
	      i += this.directionX;

	      if (i < 0) {
	        i = 0;
	      } else if (i >= this.pages.length) {
	        i = this.pages.length - 1;
	      }

	      x = this.pages[i][0].x;
	    }

	    if (m === this.currentPage.pageY) {
	      m += this.directionY;

	      if (m < 0) {
	        m = 0;
	      } else if (m >= this.pages[0].length) {
	        m = this.pages[0].length - 1;
	      }

	      y = this.pages[0][m].y;
	    }

	    return {
	      x: x,
	      y: y,
	      pageX: i,
	      pageY: m
	    };
	  };

	  BScroll.prototype._goToPage = function (x) {
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var time = arguments[2];
	    var easing = arguments[3];

	    var snap = this.options.snap;

	    if (!snap || !this.pages || !this.pages.length) {
	      return;
	    }

	    easing = easing || snap.easing || ease.bounce;

	    if (x >= this.pages.length) {
	      x = this.pages.length - 1;
	    } else if (x < 0) {
	      x = 0;
	    }

	    if (!this.pages[x]) {
	      return;
	    }

	    if (y >= this.pages[x].length) {
	      y = this.pages[x].length - 1;
	    } else if (y < 0) {
	      y = 0;
	    }

	    var posX = this.pages[x][y].x;
	    var posY = this.pages[x][y].y;

	    time = time === undefined ? snap.speed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

	    this.currentPage = {
	      x: posX,
	      y: posY,
	      pageX: x,
	      pageY: y
	    };
	    this.scrollTo(posX, posY, time, easing);
	  };

	  BScroll.prototype.goToPage = function (x, y, time, easing) {
	    var snap = this.options.snap;
	    if (!snap || !this.pages || !this.pages.length) {
	      return;
	    }

	    if (snap.loop) {
	      var len = void 0;
	      if (snap._loopX) {
	        len = this.pages.length - 2;
	        if (x >= len) {
	          x = len - 1;
	        } else if (x < 0) {
	          x = 0;
	        }
	        x += 1;
	      } else {
	        len = this.pages[0].length - 2;
	        if (y >= len) {
	          y = len - 1;
	        } else if (y < 0) {
	          y = 0;
	        }
	        y += 1;
	      }
	    }
	    this._goToPage(x, y, time, easing);
	  };

	  BScroll.prototype.next = function (time, easing) {
	    var snap = this.options.snap;
	    if (!snap) {
	      return;
	    }

	    var x = this.currentPage.pageX;
	    var y = this.currentPage.pageY;

	    x++;
	    if (x >= this.pages.length && this.hasVerticalScroll) {
	      x = 0;
	      y++;
	    }

	    this._goToPage(x, y, time, easing);
	  };

	  BScroll.prototype.prev = function (time, easing) {
	    var snap = this.options.snap;
	    if (!snap) {
	      return;
	    }

	    var x = this.currentPage.pageX;
	    var y = this.currentPage.pageY;

	    x--;
	    if (x < 0 && this.hasVerticalScroll) {
	      x = 0;
	      y--;
	    }

	    this._goToPage(x, y, time, easing);
	  };

	  BScroll.prototype.getCurrentPage = function () {
	    var snap = this.options.snap;
	    if (!snap) {
	      return null;
	    }

	    if (snap.loop) {
	      var currentPage = void 0;
	      if (snap._loopX) {
	        currentPage = extend({}, this.currentPage, {
	          pageX: this.currentPage.pageX - 1
	        });
	      } else {
	        currentPage = extend({}, this.currentPage, {
	          pageY: this.currentPage.pageY - 1
	        });
	      }
	      return currentPage;
	    }
	    return this.currentPage;
	  };
	}

	function wheelMixin(BScroll) {
	  BScroll.prototype.wheelTo = function () {
	    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    if (this.options.wheel) {
	      var y = -index * this.itemHeight;
	      this.scrollTo(0, y);
	    }
	  };

	  BScroll.prototype.getSelectedIndex = function () {
	    return this.options.wheel && this.selectedIndex;
	  };

	  BScroll.prototype._initWheel = function () {
	    var wheel = this.options.wheel;
	    if (!wheel.wheelWrapperClass) {
	      wheel.wheelWrapperClass = 'wheel-scroll';
	    }
	    if (!wheel.wheelItemClass) {
	      wheel.wheelItemClass = 'wheel-item';
	    }
	    if (!wheel.wheelDisabledItemClass) {
	      wheel.wheelDisabledItemClass = 'wheel-disabled-item';
	    }
	    if (wheel.selectedIndex === undefined) {
	      wheel.selectedIndex = 0;
	    }
	  };

	  BScroll.prototype._findNearestValidWheel = function (y) {
	    y = y > 0 ? 0 : y < this.maxScrollY ? this.maxScrollY : y;
	    var wheel = this.options.wheel;
	    var currentIndex = Math.abs(Math.round(-y / this.itemHeight));
	    var cacheIndex = currentIndex;
	    var items = this.items;
	    // Impersonation web native select
	    // first, check whether there is a enable item whose index is smaller than currentIndex
	    // then, check whether there is a enable item whose index is bigger than currentIndex
	    // otherwise, there are all disabled items, just keep currentIndex unchange
	    while (currentIndex >= 0) {
	      if (items[currentIndex].className.indexOf(wheel.wheelDisabledItemClass) === -1) {
	        break;
	      }
	      currentIndex--;
	    }

	    if (currentIndex < 0) {
	      currentIndex = cacheIndex;
	      while (currentIndex <= items.length - 1) {
	        if (items[currentIndex].className.indexOf(wheel.wheelDisabledItemClass) === -1) {
	          break;
	        }
	        currentIndex++;
	      }
	    }

	    // keep it unchange when all the items are disabled
	    if (currentIndex === items.length) {
	      currentIndex = cacheIndex;
	    }
	    // when all the items are disabled, this.selectedIndex should always be -1
	    return {
	      index: this.wheelItemsAllDisabled ? -1 : currentIndex,
	      y: -currentIndex * this.itemHeight
	    };
	  };

	  BScroll.prototype._checkWheelAllDisabled = function () {
	    var wheel = this.options.wheel;
	    var items = this.items;
	    this.wheelItemsAllDisabled = true;
	    for (var i = 0; i < items.length; i++) {
	      if (items[i].className.indexOf(wheel.wheelDisabledItemClass) === -1) {
	        this.wheelItemsAllDisabled = false;
	        break;
	      }
	    }
	  };
	}

	var INDICATOR_MIN_LEN = 8;

	function scrollbarMixin(BScroll) {
	  BScroll.prototype._initScrollbar = function () {
	    var _this = this;

	    var _options$scrollbar = this.options.scrollbar,
	        _options$scrollbar$fa = _options$scrollbar.fade,
	        fade = _options$scrollbar$fa === undefined ? true : _options$scrollbar$fa,
	        _options$scrollbar$in = _options$scrollbar.interactive,
	        interactive = _options$scrollbar$in === undefined ? false : _options$scrollbar$in;

	    this.indicators = [];
	    var indicator = void 0;

	    if (this.options.scrollX) {
	      indicator = {
	        el: createScrollbar('horizontal'),
	        direction: 'horizontal',
	        fade: fade,
	        interactive: interactive
	      };
	      this._insertScrollBar(indicator.el);

	      this.indicators.push(new Indicator(this, indicator));
	    }

	    if (this.options.scrollY) {
	      indicator = {
	        el: createScrollbar('vertical'),
	        direction: 'vertical',
	        fade: fade,
	        interactive: interactive
	      };
	      this._insertScrollBar(indicator.el);
	      this.indicators.push(new Indicator(this, indicator));
	    }

	    this.on('refresh', function () {
	      for (var i = 0; i < _this.indicators.length; i++) {
	        _this.indicators[i].refresh();
	      }
	    });

	    if (fade) {
	      this.on('scrollEnd', function () {
	        for (var i = 0; i < _this.indicators.length; i++) {
	          _this.indicators[i].fade();
	        }
	      });

	      this.on('scrollCancel', function () {
	        for (var i = 0; i < _this.indicators.length; i++) {
	          _this.indicators[i].fade();
	        }
	      });

	      this.on('scrollStart', function () {
	        for (var i = 0; i < _this.indicators.length; i++) {
	          _this.indicators[i].fade(true);
	        }
	      });

	      this.on('beforeScrollStart', function () {
	        for (var i = 0; i < _this.indicators.length; i++) {
	          _this.indicators[i].fade(true, true);
	        }
	      });
	    }

	    this.on('destroy', function () {
	      _this._removeScrollBars();
	    });
	  };

	  BScroll.prototype._insertScrollBar = function (scrollbar) {
	    this.wrapper.appendChild(scrollbar);
	  };

	  BScroll.prototype._removeScrollBars = function () {
	    for (var i = 0; i < this.indicators.length; i++) {
	      this.indicators[i].destroy();
	    }
	  };
	}

	function createScrollbar(direction) {
	  var scrollbar = document.createElement('div');
	  var indicator = document.createElement('div');

	  scrollbar.style.cssText = 'position:absolute;z-index:9999;pointerEvents:none';
	  indicator.style.cssText = 'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';

	  indicator.className = 'bscroll-indicator';

	  if (direction === 'horizontal') {
	    scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
	    indicator.style.height = '100%';
	    scrollbar.className = 'bscroll-horizontal-scrollbar';
	  } else {
	    scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
	    indicator.style.width = '100%';
	    scrollbar.className = 'bscroll-vertical-scrollbar';
	  }

	  scrollbar.style.cssText += ';overflow:hidden';
	  scrollbar.appendChild(indicator);

	  return scrollbar;
	}

	function Indicator(scroller, options) {
	  this.wrapper = options.el;
	  this.wrapperStyle = this.wrapper.style;
	  this.indicator = this.wrapper.children[0];
	  this.indicatorStyle = this.indicator.style;
	  this.scroller = scroller;
	  this.direction = options.direction;
	  if (options.fade) {
	    this.visible = 0;
	    this.wrapperStyle.opacity = '0';
	  } else {
	    this.visible = 1;
	  }

	  this.sizeRatioX = 1;
	  this.sizeRatioY = 1;
	  this.maxPosX = 0;
	  this.maxPosY = 0;
	  this.x = 0;
	  this.y = 0;

	  if (options.interactive) {
	    this._addDOMEvents();
	  }
	}

	Indicator.prototype.handleEvent = function (e) {
	  switch (e.type) {
	    case 'touchstart':
	    case 'mousedown':
	      this._start(e);
	      break;
	    case 'touchmove':
	    case 'mousemove':
	      this._move(e);
	      break;
	    case 'touchend':
	    case 'mouseup':
	    case 'touchcancel':
	    case 'mousecancel':
	      this._end(e);
	      break;
	  }
	};

	Indicator.prototype.refresh = function () {
	  if (this._shouldShow()) {
	    this.transitionTime();
	    this._calculate();
	    this.updatePosition();
	  }
	};

	Indicator.prototype.fade = function (visible, hold) {
	  var _this2 = this;

	  if (hold && !this.visible) {
	    return;
	  }

	  var time = visible ? 250 : 500;

	  visible = visible ? '1' : '0';

	  this.wrapperStyle[style.transitionDuration] = time + 'ms';

	  clearTimeout(this.fadeTimeout);
	  this.fadeTimeout = setTimeout(function () {
	    _this2.wrapperStyle.opacity = visible;
	    _this2.visible = +visible;
	  }, 0);
	};

	Indicator.prototype.updatePosition = function () {
	  if (this.direction === 'vertical') {
	    var y = Math.round(this.sizeRatioY * this.scroller.y);

	    if (y < 0) {
	      this.transitionTime(500);
	      var height = Math.max(this.indicatorHeight + y * 3, INDICATOR_MIN_LEN);
	      this.indicatorStyle.height = height + 'px';
	      y = 0;
	    } else if (y > this.maxPosY) {
	      this.transitionTime(500);
	      var _height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, INDICATOR_MIN_LEN);
	      this.indicatorStyle.height = _height + 'px';
	      y = this.maxPosY + this.indicatorHeight - _height;
	    } else {
	      this.indicatorStyle.height = this.indicatorHeight + 'px';
	    }
	    this.y = y;

	    if (this.scroller.options.useTransform) {
	      this.indicatorStyle[style.transform] = 'translateY(' + y + 'px)' + this.scroller.translateZ;
	    } else {
	      this.indicatorStyle.top = y + 'px';
	    }
	  } else {
	    var x = Math.round(this.sizeRatioX * this.scroller.x);

	    if (x < 0) {
	      this.transitionTime(500);
	      var width = Math.max(this.indicatorWidth + x * 3, INDICATOR_MIN_LEN);
	      this.indicatorStyle.width = width + 'px';
	      x = 0;
	    } else if (x > this.maxPosX) {
	      this.transitionTime(500);
	      var _width = Math.max(this.indicatorWidth - (x - this.maxPosX) * 3, INDICATOR_MIN_LEN);
	      this.indicatorStyle.width = _width + 'px';
	      x = this.maxPosX + this.indicatorWidth - _width;
	    } else {
	      this.indicatorStyle.width = this.indicatorWidth + 'px';
	    }

	    this.x = x;

	    if (this.scroller.options.useTransform) {
	      this.indicatorStyle[style.transform] = 'translateX(' + x + 'px)' + this.scroller.translateZ;
	    } else {
	      this.indicatorStyle.left = x + 'px';
	    }
	  }
	};

	Indicator.prototype.transitionTime = function () {
	  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	  this.indicatorStyle[style.transitionDuration] = time + 'ms';
	};

	Indicator.prototype.transitionTimingFunction = function (easing) {
	  this.indicatorStyle[style.transitionTimingFunction] = easing;
	};

	Indicator.prototype.destroy = function () {
	  this._removeDOMEvents();
	  this.wrapper.parentNode.removeChild(this.wrapper);
	};

	Indicator.prototype._start = function (e) {
	  var point = e.touches ? e.touches[0] : e;

	  e.preventDefault();
	  e.stopPropagation();

	  this.transitionTime();

	  this.initiated = true;
	  this.moved = false;
	  this.lastPointX = point.pageX;
	  this.lastPointY = point.pageY;

	  this.startTime = getNow();

	  this._handleMoveEvents(addEvent);
	  this.scroller.trigger('beforeScrollStart');
	};

	Indicator.prototype._move = function (e) {
	  var point = e.touches ? e.touches[0] : e;

	  e.preventDefault();
	  e.stopPropagation();

	  if (!this.moved) {
	    this.scroller.trigger('scrollStart');
	  }

	  this.moved = true;

	  var deltaX = point.pageX - this.lastPointX;
	  this.lastPointX = point.pageX;

	  var deltaY = point.pageY - this.lastPointY;
	  this.lastPointY = point.pageY;

	  var newX = this.x + deltaX;
	  var newY = this.y + deltaY;

	  this._pos(newX, newY);
	};

	Indicator.prototype._end = function (e) {
	  if (!this.initiated) {
	    return;
	  }
	  this.initiated = false;

	  e.preventDefault();
	  e.stopPropagation();

	  this._handleMoveEvents(removeEvent);

	  var snapOption = this.scroller.options.snap;
	  if (snapOption) {
	    var speed = snapOption.speed,
	        _snapOption$easing = snapOption.easing,
	        easing = _snapOption$easing === undefined ? ease.bounce : _snapOption$easing;

	    var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

	    var time = speed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

	    if (this.scroller.x !== snap.x || this.scroller.y !== snap.y) {
	      this.scroller.directionX = 0;
	      this.scroller.directionY = 0;
	      this.scroller.currentPage = snap;
	      this.scroller.scrollTo(snap.x, snap.y, time, easing);
	    }
	  }

	  if (this.moved) {
	    this.scroller.trigger('scrollEnd', {
	      x: this.scroller.x,
	      y: this.scroller.y
	    });
	  }
	};

	Indicator.prototype._pos = function (x, y) {
	  if (x < 0) {
	    x = 0;
	  } else if (x > this.maxPosX) {
	    x = this.maxPosX;
	  }

	  if (y < 0) {
	    y = 0;
	  } else if (y > this.maxPosY) {
	    y = this.maxPosY;
	  }

	  x = Math.round(x / this.sizeRatioX);
	  y = Math.round(y / this.sizeRatioY);

	  this.scroller.scrollTo(x, y);
	  this.scroller.trigger('scroll', {
	    x: this.scroller.x,
	    y: this.scroller.y
	  });
	};

	Indicator.prototype._shouldShow = function () {
	  if (this.direction === 'vertical' && this.scroller.hasVerticalScroll || this.direction === 'horizontal' && this.scroller.hasHorizontalScroll) {
	    this.wrapper.style.display = '';
	    return true;
	  }
	  this.wrapper.style.display = 'none';
	  return false;
	};

	Indicator.prototype._calculate = function () {
	  if (this.direction === 'vertical') {
	    var wrapperHeight = this.wrapper.clientHeight;
	    this.indicatorHeight = Math.max(Math.round(wrapperHeight * wrapperHeight / (this.scroller.scrollerHeight || wrapperHeight || 1)), INDICATOR_MIN_LEN);
	    this.indicatorStyle.height = this.indicatorHeight + 'px';

	    this.maxPosY = wrapperHeight - this.indicatorHeight;

	    this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY;
	  } else {
	    var wrapperWidth = this.wrapper.clientWidth;
	    this.indicatorWidth = Math.max(Math.round(wrapperWidth * wrapperWidth / (this.scroller.scrollerWidth || wrapperWidth || 1)), INDICATOR_MIN_LEN);
	    this.indicatorStyle.width = this.indicatorWidth + 'px';

	    this.maxPosX = wrapperWidth - this.indicatorWidth;

	    this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX;
	  }
	};

	Indicator.prototype._addDOMEvents = function () {
	  var eventOperation = addEvent;
	  this._handleDOMEvents(eventOperation);
	};

	Indicator.prototype._removeDOMEvents = function () {
	  var eventOperation = removeEvent;
	  this._handleDOMEvents(eventOperation);
	  this._handleMoveEvents(eventOperation);
	};

	Indicator.prototype._handleMoveEvents = function (eventOperation) {
	  if (!this.scroller.options.disableTouch) {
	    eventOperation(window, 'touchmove', this);
	  }
	  if (!this.scroller.options.disableMouse) {
	    eventOperation(window, 'mousemove', this);
	  }
	};

	Indicator.prototype._handleDOMEvents = function (eventOperation) {
	  if (!this.scroller.options.disableTouch) {
	    eventOperation(this.indicator, 'touchstart', this);
	    eventOperation(window, 'touchend', this);
	  }
	  if (!this.scroller.options.disableMouse) {
	    eventOperation(this.indicator, 'mousedown', this);
	    eventOperation(window, 'mouseup', this);
	  }
	};

	function pullDownMixin(BScroll) {
	  BScroll.prototype._initPullDown = function () {
	    // must watch scroll in real time
	    this.options.probeType = PROBE_REALTIME;
	  };

	  BScroll.prototype._checkPullDown = function () {
	    var _options$pullDownRefr = this.options.pullDownRefresh,
	        _options$pullDownRefr2 = _options$pullDownRefr.threshold,
	        threshold = _options$pullDownRefr2 === undefined ? 90 : _options$pullDownRefr2,
	        _options$pullDownRefr3 = _options$pullDownRefr.stop,
	        stop = _options$pullDownRefr3 === undefined ? 40 : _options$pullDownRefr3;

	    // check if a real pull down action

	    if (this.directionY !== DIRECTION_DOWN || this.y < threshold) {
	      return false;
	    }

	    if (!this.pulling) {
	      this.pulling = true;
	      this.trigger('pullingDown');
	    }
	    this.scrollTo(this.x, stop, this.options.bounceTime, ease.bounce);

	    return this.pulling;
	  };

	  BScroll.prototype.finishPullDown = function () {
	    this.pulling = false;
	    this.resetPosition(this.options.bounceTime, ease.bounce);
	  };

	  BScroll.prototype.openPullDown = function () {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    this.options.pullDownRefresh = config;
	    this._initPullDown();
	  };

	  BScroll.prototype.closePullDown = function () {
	    this.options.pullDownRefresh = false;
	  };

	  BScroll.prototype.autoPullDownRefresh = function () {
	    var _options$pullDownRefr4 = this.options.pullDownRefresh,
	        _options$pullDownRefr5 = _options$pullDownRefr4.threshold,
	        threshold = _options$pullDownRefr5 === undefined ? 90 : _options$pullDownRefr5,
	        _options$pullDownRefr6 = _options$pullDownRefr4.stop,
	        stop = _options$pullDownRefr6 === undefined ? 40 : _options$pullDownRefr6;


	    if (this.pulling) {
	      return;
	    }
	    this.pulling = true;

	    this.scrollTo(this.x, threshold);
	    this.trigger('pullingDown');
	    this.scrollTo(this.x, stop, this.options.bounceTime, ease.bounce);
	  };
	}

	function pullUpMixin(BScroll) {
	  BScroll.prototype._initPullUp = function () {
	    // must watch scroll in real time
	    this.options.probeType = PROBE_REALTIME;

	    this.pullupWatching = false;
	    this._watchPullUp();
	  };

	  BScroll.prototype._watchPullUp = function () {
	    if (this.pullupWatching) {
	      return;
	    }
	    this.pullupWatching = true;
	    this.on('scroll', this._checkToEnd);
	  };

	  BScroll.prototype._checkToEnd = function (pos) {
	    var _this = this;

	    var _options$pullUpLoad$t = this.options.pullUpLoad.threshold,
	        threshold = _options$pullUpLoad$t === undefined ? 0 : _options$pullUpLoad$t;

	    if (this.movingDirectionY === DIRECTION_UP && pos.y <= this.maxScrollY + threshold) {
	      // reset pullupWatching status after scroll end.
	      this.once('scrollEnd', function () {
	        _this.pullupWatching = false;
	      });
	      this.trigger('pullingUp');
	      this.off('scroll', this._checkToEnd);
	    }
	  };

	  BScroll.prototype.finishPullUp = function () {
	    var _this2 = this;

	    if (this.pullupWatching) {
	      this.once('scrollEnd', function () {
	        _this2._watchPullUp();
	      });
	    } else {
	      this._watchPullUp();
	    }
	  };

	  BScroll.prototype.openPullUp = function () {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    this.options.pullUpLoad = config;
	    this._initPullUp();
	  };

	  BScroll.prototype.closePullUp = function () {
	    this.options.pullUpLoad = false;
	    if (!this.pullupWatching) {
	      return;
	    }
	    this.pullupWatching = false;
	    this.off('scroll', this._checkToEnd);
	  };
	}

	function mouseWheelMixin(BScroll) {
	  BScroll.prototype._initMouseWheel = function () {
	    var _this = this;

	    this._handleMouseWheelEvent(addEvent);

	    this.on('destroy', function () {
	      clearTimeout(_this.mouseWheelTimer);
	      clearTimeout(_this.mouseWheelEndTimer);
	      _this._handleMouseWheelEvent(removeEvent);
	    });

	    this.firstWheelOpreation = true;
	  };

	  BScroll.prototype._handleMouseWheelEvent = function (eventOperation) {
	    eventOperation(this.wrapper, 'wheel', this);
	    eventOperation(this.wrapper, 'mousewheel', this);
	    eventOperation(this.wrapper, 'DOMMouseScroll', this);
	  };

	  BScroll.prototype._onMouseWheel = function (e) {
	    var _this2 = this;

	    if (!this.enabled) {
	      return;
	    }
	    e.preventDefault();

	    if (this.options.stopPropagation) {
	      e.stopPropagation();
	    }

	    if (this.firstWheelOpreation) {
	      this.trigger('scrollStart');
	    }
	    this.firstWheelOpreation = false;

	    var _options$mouseWheel = this.options.mouseWheel,
	        _options$mouseWheel$s = _options$mouseWheel.speed,
	        speed = _options$mouseWheel$s === undefined ? 20 : _options$mouseWheel$s,
	        _options$mouseWheel$i = _options$mouseWheel.invert,
	        invert = _options$mouseWheel$i === undefined ? false : _options$mouseWheel$i,
	        _options$mouseWheel$e = _options$mouseWheel.easeTime,
	        easeTime = _options$mouseWheel$e === undefined ? 300 : _options$mouseWheel$e;


	    clearTimeout(this.mouseWheelTimer);
	    this.mouseWheelTimer = setTimeout(function () {
	      if (!_this2.options.snap && !easeTime) {
	        _this2.trigger('scrollEnd', {
	          x: _this2.x,
	          y: _this2.y
	        });
	      }
	      _this2.firstWheelOpreation = true;
	    }, 400);

	    var wheelDeltaX = void 0;
	    var wheelDeltaY = void 0;

	    switch (true) {
	      case 'deltaX' in e:
	        if (e.deltaMode === 1) {
	          wheelDeltaX = -e.deltaX * speed;
	          wheelDeltaY = -e.deltaY * speed;
	        } else {
	          wheelDeltaX = -e.deltaX;
	          wheelDeltaY = -e.deltaY;
	        }
	        break;
	      case 'wheelDeltaX' in e:
	        wheelDeltaX = e.wheelDeltaX / 120 * speed;
	        wheelDeltaY = e.wheelDeltaY / 120 * speed;
	        break;
	      case 'wheelDelta' in e:
	        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;
	        break;
	      case 'detail' in e:
	        wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;
	        break;
	      default:
	        return;
	    }

	    var direction = invert ? -1 : 1;
	    wheelDeltaX *= direction;
	    wheelDeltaY *= direction;

	    if (!this.hasVerticalScroll) {
	      wheelDeltaX = wheelDeltaY;
	      wheelDeltaY = 0;
	    }

	    var newX = void 0;
	    var newY = void 0;
	    if (this.options.snap) {
	      newX = this.currentPage.pageX;
	      newY = this.currentPage.pageY;

	      if (wheelDeltaX > 0) {
	        newX--;
	      } else if (wheelDeltaX < 0) {
	        newX++;
	      }

	      if (wheelDeltaY > 0) {
	        newY--;
	      } else if (wheelDeltaY < 0) {
	        newY++;
	      }

	      this._goToPage(newX, newY);
	      return;
	    }

	    newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
	    newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

	    this.movingDirectionX = this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
	    this.movingDirectionY = this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

	    if (newX > this.minScrollX) {
	      newX = this.minScrollX;
	    } else if (newX < this.maxScrollX) {
	      newX = this.maxScrollX;
	    }

	    if (newY > this.minScrollY) {
	      newY = this.minScrollY;
	    } else if (newY < this.maxScrollY) {
	      newY = this.maxScrollY;
	    }

	    var needTriggerEnd = this.y === newY;
	    this.scrollTo(newX, newY, easeTime, ease.swipe);
	    this.trigger('scroll', {
	      x: this.x,
	      y: this.y
	    });
	    clearTimeout(this.mouseWheelEndTimer);
	    if (needTriggerEnd) {
	      this.mouseWheelEndTimer = setTimeout(function () {
	        _this2.trigger('scrollEnd', {
	          x: _this2.x,
	          y: _this2.y
	        });
	      }, easeTime);
	    }
	  };
	}

	function zoomMixin(BScroll) {
	  BScroll.prototype._initZoom = function () {
	    var _options$zoom = this.options.zoom,
	        _options$zoom$start = _options$zoom.start,
	        start = _options$zoom$start === undefined ? 1 : _options$zoom$start,
	        _options$zoom$min = _options$zoom.min,
	        min = _options$zoom$min === undefined ? 1 : _options$zoom$min,
	        _options$zoom$max = _options$zoom.max,
	        max = _options$zoom$max === undefined ? 4 : _options$zoom$max;

	    this.scale = Math.min(Math.max(start, min), max);
	    this.setScale(this.scale);
	    this.scrollerStyle[style.transformOrigin] = '0 0';
	  };

	  BScroll.prototype._zoomTo = function (scale, originX, originY, startScale) {
	    this.scaled = true;

	    var lastScale = scale / (startScale || this.scale);
	    this.setScale(scale);

	    this.refresh();

	    var newX = Math.round(this.startX - (originX - this.relativeX) * (lastScale - 1));
	    var newY = Math.round(this.startY - (originY - this.relativeY) * (lastScale - 1));

	    if (newX > this.minScrollX) {
	      newX = this.minScrollX;
	    } else if (newX < this.maxScrollX) {
	      newX = this.maxScrollX;
	    }

	    if (newY > this.minScrollY) {
	      newY = this.minScrollY;
	    } else if (newY < this.maxScrollY) {
	      newY = this.maxScrollY;
	    }

	    if (this.x !== newX || this.y !== newY) {
	      this.scrollTo(newX, newY, this.options.bounceTime);
	    }

	    this.scaled = false;
	  };

	  BScroll.prototype.zoomTo = function (scale, x, y) {
	    var _offsetToBody = offsetToBody(this.wrapper),
	        left = _offsetToBody.left,
	        top = _offsetToBody.top;

	    var originX = x + left - this.x;
	    var originY = y + top - this.y;
	    this._zoomTo(scale, originX, originY);
	  };

	  BScroll.prototype._zoomStart = function (e) {
	    var firstFinger = e.touches[0];
	    var secondFinger = e.touches[1];
	    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
	    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);

	    this.startDistance = getDistance(deltaX, deltaY);
	    this.startScale = this.scale;

	    var _offsetToBody2 = offsetToBody(this.wrapper),
	        left = _offsetToBody2.left,
	        top = _offsetToBody2.top;

	    this.originX = Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 + left - this.x;
	    this.originY = Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 + top - this.y;

	    this.trigger('zoomStart');
	  };

	  BScroll.prototype._zoom = function (e) {
	    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
	      return;
	    }

	    if (this.options.preventDefault) {
	      e.preventDefault();
	    }

	    if (this.options.stopPropagation) {
	      e.stopPropagation();
	    }

	    var firstFinger = e.touches[0];
	    var secondFinger = e.touches[1];
	    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
	    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
	    var distance = getDistance(deltaX, deltaY);
	    var scale = distance / this.startDistance * this.startScale;

	    this.scaled = true;

	    var _options$zoom2 = this.options.zoom,
	        _options$zoom2$min = _options$zoom2.min,
	        min = _options$zoom2$min === undefined ? 1 : _options$zoom2$min,
	        _options$zoom2$max = _options$zoom2.max,
	        max = _options$zoom2$max === undefined ? 4 : _options$zoom2$max;


	    if (scale < min) {
	      scale = 0.5 * min * Math.pow(2.0, scale / min);
	    } else if (scale > max) {
	      scale = 2.0 * max * Math.pow(0.5, max / scale);
	    }

	    var lastScale = scale / this.startScale;

	    var x = this.startX - (this.originX - this.relativeX) * (lastScale - 1);
	    var y = this.startY - (this.originY - this.relativeY) * (lastScale - 1);

	    this.setScale(scale);

	    this.scrollTo(x, y, 0);
	  };

	  BScroll.prototype._zoomEnd = function (e) {
	    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
	      return;
	    }

	    if (this.options.preventDefault) {
	      e.preventDefault();
	    }

	    if (this.options.stopPropagation) {
	      e.stopPropagation();
	    }

	    this.isInTransition = false;
	    this.isAnimating = false;
	    this.initiated = 0;

	    var _options$zoom3 = this.options.zoom,
	        _options$zoom3$min = _options$zoom3.min,
	        min = _options$zoom3$min === undefined ? 1 : _options$zoom3$min,
	        _options$zoom3$max = _options$zoom3.max,
	        max = _options$zoom3$max === undefined ? 4 : _options$zoom3$max;


	    var scale = this.scale > max ? max : this.scale < min ? min : this.scale;

	    this._zoomTo(scale, this.originX, this.originY, this.startScale);

	    this.trigger('zoomEnd');
	  };
	}

	// import { ease } from '../util/ease'

	// Number of items to instantiate beyond current view in the scroll direction.
	var RUNWAY_ITEMS = 30;

	// Number of items to instantiate beyond current view in the opposite direction.
	var RUNWAY_ITEMS_OPPOSITE = 10;

	// The animation interval (in ms) for fading in content from tombstones.
	var ANIMATION_DURATION_MS = 200;

	// The number of pixels of default additional length to allow scrolling to.
	var DEFAULT_SCROLL_RUNWAY = 2000;

	function infiniteMixin(BScroll) {
	  BScroll.prototype._initInfinite = function () {
	    this.options.probeType = 3;
	    this.maxScrollY = -DEFAULT_SCROLL_RUNWAY;
	    this.infiniteScroller = new InfiniteScroller(this, this.options.infinity);
	  };
	}

	function isTombstoneNode(node) {
	  if (node && node.classList) {
	    return node.classList.contains('tombstone');
	  }
	}

	function InfiniteScroller(scroller, options) {
	  var _this = this;

	  this.options = options;
	  assert$1(typeof this.options.createTombstone === 'function', 'Infinite scroll need createTombstone Function to create tombstone');

	  assert$1(typeof this.options.fetch === 'function', 'Infinite scroll need fetch Function to fetch new data.');

	  assert$1(typeof this.options.render === 'function', 'Infinite scroll need render Function to render each item.');

	  this.firstAttachedItem = 0;
	  this.lastAttachedItem = 0;

	  this.anchorScrollTop = 0;
	  this.anchorItem = {
	    index: 0,
	    offset: 0
	  };
	  this.tombstoneHeight = 0;
	  this.tombstoneWidth = 0;
	  this.tombstones = [];
	  this.tombstonesAnimationHandlers = [];

	  this.items = [];
	  this.loadedItems = 0;
	  this.requestInProgress = false;
	  this.hasMore = true;

	  this.scroller = scroller;
	  this.wrapperEl = this.scroller.wrapper;
	  this.scrollerEl = this.scroller.scroller;

	  this.scroller.on('resize', function () {
	    _this.onResize();
	  });
	  this.scroller.on('destroy', function () {
	    _this.destroy();
	  });

	  // wait scroll core init
	  this._onResizeHandler = setTimeout(function () {
	    _this.onResize();

	    // must wait tombstoneHeight has size
	    _this.scroller.on('scroll', function () {
	      _this.onScroll();
	    });
	  });
	}

	InfiniteScroller.prototype.destroy = function () {
	  var _this2 = this;

	  // In extreme scene, destroy is triggered before _onResizeHandler
	  clearTimeout(this._onResizeHandler);
	  this.tombstonesAnimationHandlers.forEach(function (handler) {
	    clearTimeout(handler);
	  });
	  this.tombstonesAnimationHandlers = null;
	  this.items.forEach(function (item) {
	    if (item.node) {
	      _this2.scrollerEl.removeChild(item.node);
	      item.node = null;
	    }
	  });
	  this.scroller.infiniteScroller = null;
	  this.scroller = null;
	  this.wrapperEl = null;
	  this.scrollerEl = null;
	  this.items = null;
	  this.tombstones = null;
	};

	InfiniteScroller.prototype.onScroll = function () {
	  var scrollTop = -this.scroller.y;
	  var delta = scrollTop - this.anchorScrollTop;
	  if (scrollTop === 0) {
	    this.anchorItem = {
	      index: 0,
	      offset: 0
	    };
	  } else {
	    this.anchorItem = this._calculateAnchoredItem(this.anchorItem, delta);
	  }

	  this.anchorScrollTop = scrollTop;
	  var lastScreenItem = this._calculateAnchoredItem(this.anchorItem, this.scroller.wrapperHeight);

	  var start = this.anchorItem.index;
	  var end = lastScreenItem.index;
	  if (delta < 0) {
	    start -= RUNWAY_ITEMS;
	    end += RUNWAY_ITEMS_OPPOSITE;
	  } else {
	    start -= RUNWAY_ITEMS_OPPOSITE;
	    end += RUNWAY_ITEMS;
	  }
	  this.fill(start, end);
	  this.maybeRequestContent();
	};

	InfiniteScroller.prototype.onResize = function () {
	  var tombstone = this.options.createTombstone();
	  tombstone.style.position = 'absolute';
	  this.scrollerEl.appendChild(tombstone);
	  tombstone.style.display = '';
	  this.tombstoneHeight = tombstone.offsetHeight;
	  this.tombstoneWidth = tombstone.offsetWidth;
	  this.scrollerEl.removeChild(tombstone);

	  for (var i = 0; i < this.items.length; i++) {
	    this.items[i].height = this.items[i].width = 0;
	  }

	  this.onScroll();
	};

	InfiniteScroller.prototype.fill = function (start, end) {
	  this.firstAttachedItem = Math.max(0, start);
	  if (!this.hasMore) {
	    end = Math.min(end, this.items.length);
	  }
	  this.lastAttachedItem = end;
	  this.attachContent();
	};

	InfiniteScroller.prototype.maybeRequestContent = function () {
	  var _this3 = this;

	  if (this.requestInProgress || !this.hasMore) {
	    return;
	  }
	  var itemsNeeded = this.lastAttachedItem - this.loadedItems;
	  if (itemsNeeded <= 0) {
	    return;
	  }
	  this.requestInProgress = true;
	  this.options.fetch(itemsNeeded).then(function (items) {
	    _this3.requestInProgress = false;
	    if (items) {
	      _this3.addContent(items);
	    } else {
	      _this3.hasMore = false;
	      var tombstoneLen = _this3._removeTombstones();
	      var curPos = 0;
	      if (_this3.anchorItem.index <= _this3.items.length) {
	        curPos = _this3._fixScrollPosition();
	        _this3._setupAnimations({}, curPos);
	        _this3.scroller.resetPosition(_this3.scroller.options.bounceTime);
	      } else {
	        _this3.anchorItem.index -= tombstoneLen;
	        curPos = _this3._fixScrollPosition();
	        _this3._setupAnimations({}, curPos);
	        _this3.scroller.stop();
	        _this3.scroller.resetPosition();
	        _this3.onScroll();
	      }
	    }
	  });
	};

	InfiniteScroller.prototype.addContent = function (items) {
	  for (var i = 0; i < items.length; i++) {
	    if (this.items.length <= this.loadedItems) {
	      this._addItem();
	    }
	    this.items[this.loadedItems++].data = items[i];
	  }
	  this.attachContent();
	  this.maybeRequestContent();
	};

	InfiniteScroller.prototype.attachContent = function () {
	  var unusedNodes = this._collectUnusedNodes();
	  var tombstoneAnimations = this._createDOMNodes(unusedNodes);
	  this._cleanupUnusedNodes(unusedNodes);
	  this._cacheNodeSize();
	  var curPos = this._fixScrollPosition();
	  this._setupAnimations(tombstoneAnimations, curPos);
	};

	InfiniteScroller.prototype.resetMore = function () {
	  this.hasMore = true;
	};

	InfiniteScroller.prototype._removeTombstones = function () {
	  var markIndex = void 0;
	  var tombstoneLen = 0;
	  var itemLen = this.items.length;
	  for (var i = 0; i < itemLen; i++) {
	    var currentNode = this.items[i].node;
	    var currentData = this.items[i].data;
	    if ((!currentNode || isTombstoneNode(currentNode)) && !currentData) {
	      // 0 should be excluded
	      if (markIndex === void 0) {
	        markIndex = i;
	      }
	      if (currentNode) {
	        this.scrollerEl.removeChild(currentNode);
	      }
	    }
	  }
	  tombstoneLen = itemLen - markIndex;
	  this.items.splice(markIndex);
	  this.lastAttachedItem = Math.min(this.lastAttachedItem, this.items.length);
	  return tombstoneLen;
	};

	InfiniteScroller.prototype._collectUnusedNodes = function () {
	  var unusedNodes = [];
	  for (var i = 0; i < this.items.length; i++) {
	    // Skip the items which should be visible.
	    if (i === this.firstAttachedItem) {
	      i = this.lastAttachedItem - 1;
	      continue;
	    }
	    var currentNode = this.items[i].node;
	    if (currentNode) {
	      if (isTombstoneNode(currentNode)) {
	        // Cache tombstones for reuse
	        this.tombstones.push(currentNode);
	        this.tombstones[this.tombstones.length - 1].style.display = 'none';
	      } else {
	        unusedNodes.push(currentNode);
	      }
	    }
	    this.items[i].node = null;
	  }
	  return unusedNodes;
	};

	InfiniteScroller.prototype._createDOMNodes = function (unusedNodes) {
	  var tombstoneAnimations = {};
	  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
	    while (this.items.length <= i) {
	      this._addItem();
	    }
	    var currentNode = this.items[i].node;
	    var currentData = this.items[i].data;
	    if (currentNode) {
	      if (isTombstoneNode(currentNode) && currentData) {
	        currentNode.style.zIndex = 1;
	        tombstoneAnimations[i] = [currentNode, this.items[i].top - this.anchorScrollTop];
	        this.items[i].node = null;
	      } else {
	        continue;
	      }
	    }
	    var node = currentData ? this.options.render(currentData, unusedNodes.pop()) : this._getTombStone();
	    node.style.position = 'absolute';
	    this.items[i].top = -1;
	    this.scrollerEl.appendChild(node);
	    this.items[i].node = node;
	  }
	  return tombstoneAnimations;
	};

	InfiniteScroller.prototype._cleanupUnusedNodes = function (unusedNodes) {
	  while (unusedNodes.length) {
	    this.scrollerEl.removeChild(unusedNodes.pop());
	  }
	};

	InfiniteScroller.prototype._cacheNodeSize = function () {
	  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
	    var item = this.items[i];
	    // Only cache the height if we have the real contents, not a placeholder.
	    if (item.data && !item.height) {
	      var isTombstone = isTombstoneNode(item.node);
	      item.height = isTombstone ? this.tombstoneHeight : item.node.offsetHeight;
	      item.width = isTombstone ? this.tombstoneWidth : item.node.offsetWidth;
	    }
	  }
	};

	InfiniteScroller.prototype._fixScrollPosition = function () {
	  this.anchorScrollTop = 0;
	  for (var _i = 0; _i < this.anchorItem.index; _i++) {
	    this.anchorScrollTop += this.items[_i].height || this.tombstoneHeight;
	  }
	  this.anchorScrollTop += this.anchorItem.offset;

	  // Position all nodes.
	  var curPos = this.anchorScrollTop - this.anchorItem.offset;
	  var i = this.anchorItem.index;
	  while (i > this.firstAttachedItem) {
	    curPos -= this.items[i - 1].height || this.tombstoneHeight;
	    i--;
	  }

	  return curPos;
	};

	InfiniteScroller.prototype._setupAnimations = function (tombstoneAnimations, curPos) {
	  var _this4 = this;

	  for (var i in tombstoneAnimations) {
	    var animation = tombstoneAnimations[i];
	    this.items[i].node.style[style.transform] = 'translateY(' + (this.anchorScrollTop + animation[1]) + 'px) scale(' + this.tombstoneWidth / this.items[i].width + ', ' + this.tombstoneHeight / this.items[i].height + ')';
	    // Call offsetTop on the nodes to be animated to force them to apply current transforms.
	    /* eslint-disable no-unused-expressions */
	    this.items[i].node.offsetTop;
	    animation[0].offsetTop;
	    this.items[i].node.style[style.transition] = cssVendor + 'transform ' + ANIMATION_DURATION_MS + 'ms';
	  }

	  for (var _i2 = this.firstAttachedItem; _i2 < this.lastAttachedItem; _i2++) {
	    var _animation = tombstoneAnimations[_i2];
	    if (_animation) {
	      var tombstoneNode = _animation[0];
	      tombstoneNode.style[style.transition] = cssVendor + 'transform ' + ANIMATION_DURATION_MS + 'ms, opacity ' + ANIMATION_DURATION_MS + 'ms';
	      tombstoneNode.style[style.transform] = 'translateY(' + curPos + 'px) scale(' + this.items[_i2].width / this.tombstoneWidth + ', ' + this.items[_i2].height / this.tombstoneHeight + ')';
	      tombstoneNode.style.opacity = 0;
	    }
	    if (curPos !== this.items[_i2].top) {
	      if (!_animation) {
	        this.items[_i2].node.style[style.transition] = '';
	      }
	      this.items[_i2].node.style[style.transform] = 'translateY(' + curPos + 'px)';
	    }
	    this.items[_i2].top = curPos;
	    curPos += this.items[_i2].height || this.tombstoneHeight;
	  }

	  this.scroller.maxScrollY = -(curPos - this.scroller.wrapperHeight + (this.hasMore ? DEFAULT_SCROLL_RUNWAY : 0));

	  var tombstoneAnimationsHandler = setTimeout(function () {
	    for (var _i3 in tombstoneAnimations) {
	      var _animation2 = tombstoneAnimations[_i3];
	      _animation2[0].style.display = 'none';
	      // Tombstone can be recycled now.
	      _this4.tombstones.push(_animation2[0]);
	    }
	  }, ANIMATION_DURATION_MS);

	  this.tombstonesAnimationHandlers.push(tombstoneAnimationsHandler);
	};

	InfiniteScroller.prototype._getTombStone = function () {
	  var tombstone = this.tombstones.pop();
	  if (tombstone) {
	    tombstone.style.display = '';
	    tombstone.style.opacity = 1;
	    tombstone.style[style.transform] = '';
	    tombstone.style[style.transition] = '';
	    return tombstone;
	  }
	  return this.options.createTombstone();
	};

	InfiniteScroller.prototype._addItem = function () {
	  this.items.push({
	    data: null,
	    node: null,
	    height: 0,
	    width: 0,
	    top: 0
	  });
	};

	InfiniteScroller.prototype._calculateAnchoredItem = function (initialAnchor, delta) {
	  if (delta === 0) {
	    return initialAnchor;
	  }
	  var i = initialAnchor.index;
	  var tombstones = 0;

	  delta += initialAnchor.offset;
	  if (delta < 0) {
	    while (delta < 0 && i > 0 && this.items[i - 1].height) {
	      delta += this.items[i - 1].height;
	      i--;
	    }
	    tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneHeight));
	  } else {
	    while (delta > 0 && i < this.items.length && this.items[i].height && this.items[i].height < delta) {
	      delta -= this.items[i].height;
	      i++;
	    }
	    if (i >= this.items.length || !this.items[i].height) {
	      tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneHeight);
	    }
	  }
	  i += tombstones;
	  delta -= tombstones * this.tombstoneHeight;

	  return {
	    index: i,
	    offset: delta
	  };
	};

	function BScroll(el, options) {
	  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
	  if (!this.wrapper) {
	    warn$1('Can not resolve the wrapper DOM.');
	  }
	  this.scroller = this.wrapper.children[0];
	  if (!this.scroller) {
	    warn$1('The wrapper need at least one child element to be scroller.');
	  }
	  // cache style for better performance
	  this.scrollerStyle = this.scroller.style;

	  this._init(options);
	}

	initMixin(BScroll);
	coreMixin(BScroll);
	eventMixin(BScroll);
	snapMixin(BScroll);
	wheelMixin(BScroll);
	scrollbarMixin(BScroll);
	pullDownMixin(BScroll);
	pullUpMixin(BScroll);
	mouseWheelMixin(BScroll);
	zoomMixin(BScroll);
	infiniteMixin(BScroll);

	BScroll.Version = '1.15.0';

	var DEFAULT_KEYS = {
	  value: 'value',
	  text: 'text',
	  order: 'order'
	};
	var basicPickerMixin = {
	  props: {
	    data: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    selectedIndex: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    alias: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  computed: {
	    valueKey: function valueKey() {
	      return this.alias.value || DEFAULT_KEYS.value;
	    },
	    textKey: function textKey() {
	      return this.alias.text || DEFAULT_KEYS.text;
	    },
	    orderKey: function orderKey() {
	      return DEFAULT_KEYS.order;
	    },
	    merge: function merge() {
	      return [this.data, this.selectedIndex];
	    }
	  },
	  watch: {
	    // Merge the watch handlers of data and selectedIndex into one.
	    merge: function merge(newVal) {
	      this.setData(newVal[0], newVal[1]);
	    }
	  }
	};

	var pickerMixin = {
	  props: {
	    title: {
	      type: String
	    },
	    subtitle: {
	      type: String
	    },
	    cancelTxt: {
	      type: String,
	      default: ''
	    },
	    confirmTxt: {
	      type: String,
	      default: ''
	    },
	    swipeTime: {
	      type: Number,
	      default: 2500
	    },
	    maskClosable: {
	      type: Boolean,
	      default: true
	    },
	    lockWhenCascading: {
	      type: Boolean,
	      default: false
	    }
	  },
	  computed: {
	    _cancelTxt: function _cancelTxt() {
	      return this.cancelTxt || this.$t('cancel');
	    },
	    _confirmTxt: function _confirmTxt() {
	      return this.confirmTxt || this.$t('ok');
	    }
	  }
	};

	// 7.1.13 ToObject(argument)

	var _toObject$1 = function (it) {
	  return Object(_defined$1(it));
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt$1 = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined$1(that));
	    var i = _toInteger$1(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) { return TO_STRING ? '' : undefined; }
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt$1(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var _wks$1 = createCommonjsModule(function (module) {
	var store = _shared$1('wks');

	var Symbol = _global$1.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$2 = _wks$1('toStringTag');
	// ES3 wrong here
	var ARG$1 = _cof$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet$1 = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof$1 = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet$1(O = Object(it), TAG$2)) == 'string' ? T
	    // builtinTag case
	    : ARG$1 ? _cof$1(O)
	    // ES3 arguments fallback
	    : (B = _cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof$1(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject$1(this);
	  var result = '';
	  if (that.global) { result += 'g'; }
	  if (that.ignoreCase) { result += 'i'; }
	  if (that.multiline) { result += 'm'; }
	  if (that.unicode) { result += 'u'; }
	  if (that.sticky) { result += 'y'; }
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) { lastIndex = re[LAST_INDEX]; }

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        var arguments$1 = arguments;

	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments$1[i] === undefined) { match[i] = undefined; }
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export$1({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES = _wks$1('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails$1(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks$1(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails$1(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails$1(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined$1,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide$1(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var max$2 = Math.max;
	var min$4 = Math.min;
	var floor$2 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) { return res.value; }

	      var rx = _anObject$1(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) { replaceValue = String(replaceValue); }
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) { break; }
	        results.push(result);
	        if (!global) { break; }
	        var matchStr = String(result[0]);
	        if (matchStr === '') { rx.lastIndex = _advanceStringIndex(S, _toLength$1(rx.lastIndex), fullUnicode); }
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$2(min$4(_toInteger$1(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) { captures.push(maybeToString(result[j])); }
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) { replacerArgs.push(namedCaptures); }
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject$1(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) { return match; }
	          if (n > m) {
	            var f = floor$2(n / 10);
	            if (f === 0) { return match; }
	            if (f <= m) { return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1); }
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var defaultMessages = {
	  cancel: '取消',
	  confirm: '确认',
	  ok: '确定',
	  prev: '上一步',
	  next: '下一步',
	  selectText: '请选择',
	  now: '现在',
	  selectTime: '选择时间',
	  today: '今日',
	  formatDate: 'M月D日',
	  hours: '点',
	  minutes: '分',
	  validator: {
	    required: '此为必填项',
	    type: {
	      string: '请输入字符',
	      number: '请输入数字',
	      array: '数据类型应为数组',
	      date: '请选择有效日期',
	      email: '请输入有效邮箱',
	      tel: '请输入有效的手机号码',
	      url: '请输入有效网址'
	    },
	    min: {
	      string: '至少输入 {{config}} 位字符',
	      number: '不得小于 {{config}}',
	      array: '请选择至少 {{config}} 项',
	      date: '请选择 {{config | toLocaleDateString("yyyy年MM月dd日")}} 之后的时间',
	      email: '至少输入 {{config}} 位字符',
	      tel: '至少输入 {{config}} 位字符',
	      url: '至少输入 {{config}} 位字符'
	    },
	    max: {
	      string: '请勿超过 {{config}} 位字符',
	      number: '请勿大于 {{config}}',
	      array: '最多选择 {{config}} 项',
	      date: '请选择 {{config | toLocaleDateString("yyyy年MM月dd日")}} 之前的时间',
	      email: '请勿超过 {{config}} 位字符',
	      tel: '请勿超过 {{config}} 位字符',
	      url: '请勿超过 {{config}} 位字符'
	    },
	    len: {
	      string: '请输入 {{config}} 位字符',
	      number: '长度应等于 {{config}}',
	      array: '请选择 {{config}} 项',
	      date: '请选择 {{config | toLocaleDateString("yyyy年MM月dd日")}} 之前的时间',
	      email: '请输入 {{config}} 位字符',
	      tel: '请输入 {{config}} 位字符',
	      url: '请输入 {{config}} 位字符'
	    },
	    pattern: '格式错误',
	    custom: '未通过校验',
	    notWhitespace: '空白内容无效'
	  }
	};

	var global$1 = (typeof global !== "undefined" ? global :
	            typeof self !== "undefined" ? self :
	            typeof window !== "undefined" ? window : {});

	if (typeof global$1.setTimeout === 'function') ;
	if (typeof global$1.clearTimeout === 'function') ;

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	var warn$2 = function warn(msg, componentName) {
	  /* istanbul ignore if */
	  {
	    var component = componentName ? "<".concat(componentName, "> ") : '';
	    console.error("[Cube warn]: ".concat(component).concat(msg));
	  }
	};
	var tip = function tip(msg, componentName) {
	  {
	    var component = componentName ? "<".concat(componentName, "> ") : '';
	    console.warn("[Cube tip]: ".concat(component).concat(msg));
	  }
	};

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks$1('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject$1(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof$1(it) == 'RegExp');
	};

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$1 = _wks$1('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject$1(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject$1(C)[SPECIES$1]) == undefined ? D : _aFunction$1(S);
	};

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails$1(function () { });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) { return []; }
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) { return $split.call(string, separator, limit); }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) { $push.apply(output, match.slice(1)); }
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) { break; }
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) { separatorCopy[LAST_INDEX$1]++; } // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) { output.push(''); }
	      } else { output.push(string.slice(lastLastIndex)); }
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) { return res.value; }

	      var rx = _anObject$1(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) { return []; }
	      if (S.length === 0) { return _regexpExecAbstract(splitter, S) === null ? [S] : []; }
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength$1(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) { return A; }
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) { return A; }
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys$1 = _core.Object.keys;

	var keys$2 = keys$1;

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors$1 && /./g.flags != 'g') { _objectDp$1.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	}); }

	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails$1(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject$1(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors$1 && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks$1('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof$1(this) + ']';
	  }, true);
	}

	var f$7 = _wks;

	var _wksExt = {
		f: f$7
	};

	var iterator = _wksExt.f('iterator');

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) { return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it; }
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) { return 'F'; }
	    // not necessary to add metadata
	    if (!create) { return 'E'; }
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) { return true; }
	    // not necessary to add metadata
	    if (!create) { return false; }
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) { setMeta(it); }
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty$2 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) { defineProperty$2($Symbol, name, { value: _wksExt.f(name) }); }
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) { if (isEnum.call(it, key = symbols[i++])) { result.push(key); } }
	  } return result;
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys$1 = _enumBugKeys.concat('length', 'prototype');

	var f$8 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys$1);
	};

	var _objectGopn$1 = {
		f: f$8
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN$1 = _objectGopn$1.f;
	var toString$2 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN$1(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$9 = function getOwnPropertyNames(it) {
	  return windowNames && toString$2.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$9
	};

	var gOPD$2 = Object.getOwnPropertyDescriptor;

	var f$a = _descriptors ? gOPD$2 : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) { try {
	    return gOPD$2(O, P);
	  } catch (e) { /* empty */ } }
	  if (_has(O, P)) { return _propertyDesc(!_objectPie.f.call(O, P), O[P]); }
	};

	var _objectGopd$1 = {
		f: f$a
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$3 = _objectGopd$1.f;
	var dP$4 = _objectDp.f;
	var gOPN$2 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$4 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$4];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$4] || !QObject[PROTOTYPE$4].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate$1(dP$4({}, 'a', {
	    get: function () { return dP$4(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$3(ObjectProto$1, key);
	  if (protoDesc) { delete ObjectProto$1[key]; }
	  dP$4(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) { dP$4(ObjectProto$1, key, protoDesc); }
	} : dP$4;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate$1($Symbol[PROTOTYPE$4]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) { $defineProperty(OPSymbols, key, D); }
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) { dP$4(it, HIDDEN, _propertyDesc(1, {})); }
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) { it[HIDDEN][key] = false; }
	      D = _objectCreate$1(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$4(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) { $defineProperty(it, key = keys[i++], P[key]); }
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate$1(it) : $defineProperties(_objectCreate$1(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) { return false; }
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) { return; }
	  var D = gOPD$3(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) { D.enumerable = true; }
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$2(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) { result.push(key); }
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$2(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) { result.push(AllSymbols[key]); }
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) { throw TypeError('Symbol is not a constructor!'); }
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) { $set.call(OPSymbols, value); }
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) { this[HIDDEN][tag] = false; }
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) { setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set }); }
	    return wrap(tag);
	  };
	  _redefine$1($Symbol[PROTOTYPE$4], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd$1.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn$1.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine$1(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j$1 = 0; es6Symbols.length > j$1;){ _wks(es6Symbols[j$1++]); }

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) { _wksDefine(wellKnownSymbols[k++]); }

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) { throw TypeError(sym + ' is not a symbol!'); }
	    for (var key in SymbolRegistry) { if (SymbolRegistry[key] === sym) { return key; } }
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var arguments$1 = arguments;

	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) { args.push(arguments$1[i++]); }
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) { return; } // IE8 returns string on undefined
	    if (!_isArray(replacer)) { replacer = function (key, value) {
	      if (typeof $replacer == 'function') { value = $replacer.call(this, key, value); }
	      if (!isSymbol(value)) { return value; }
	    }; }
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$4][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$4], TO_PRIMITIVE, $Symbol[PROTOTYPE$4].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	// 7.2.2 IsArray(argument)

	var _isArray$1 = Array.isArray || function isArray(arg) {
	  return _cof$1(arg) == 'Array';
	};

	var SPECIES$2 = _wks$1('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray$1(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray$1(C.prototype))) { C = undefined; }
	    if (_isObject$1(C)) {
	      C = C[SPECIES$2];
	      if (C === null) { C = undefined; }
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject$1($this);
	    var self = _iobject$1(O);
	    var f = _ctx$1(callbackfn, that, 3);
	    var length = _toLength$1(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) { if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) { result[index] = res; }   // map
	        else if (res) { switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } } else if (IS_EVERY) { return false; } // every
	      }
	    } }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks$1('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) { _hide$1(ArrayProto$1, UNSCOPABLES, {}); }
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find = _arrayMethods(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) { Array(1)[KEY](function () { forced = false; }); }
	_export$1(_export$1.P + _export$1.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	function judgeTypeFnCreator(type) {
	  var toString = Object.prototype.toString;
	  return function isType(o) {
	    return toString.call(o) === "[object ".concat(type, "]");
	  };
	}

	function parsePath(obj) {
	  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var segments = path.split('.');
	  var result = obj;

	  for (var i = 0; i < segments.length; i++) {
	    var key = segments[i];
	    /* istanbul ignore if */

	    if (isUndef$2(result[key])) {
	      result = '';
	      break;
	    } else {
	      result = result[key];
	    }
	  }

	  return result;
	}
	var isUndef$2 = judgeTypeFnCreator('Undefined');
	var isNumber = judgeTypeFnCreator('Number');

	var SPECIES$3 = _wks$1('species');

	var _setSpecies = function (KEY) {
	  var C = _global$1[KEY];
	  if (_descriptors$1 && C && !C[SPECIES$3]) { _objectDp$1.f(C, SPECIES$3, {
	    configurable: true,
	    get: function () { return this; }
	  }); }
	};

	var dP$5 = _objectDp$1.f;
	var gOPN$3 = _objectGopn.f;


	var $RegExp = _global$1.RegExp;
	var Base$1 = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors$1 && (!CORRECT_NEW || _fails$1(function () {
	  re2[_wks$1('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base$1(piRE && !fiU ? p.source : p, f)
	        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$5($RegExp, key, {
	      configurable: true,
	      get: function () { return Base$1[key]; },
	      set: function (it) { Base$1[key] = it; }
	    });
	  };
	  for (var keys$3 = gOPN$3(Base$1), i$1 = 0; keys$3.length > i$1;) { proxy(keys$3[i$1++]); }
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefine(_global$1, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	function formatType(type, format, value, regExpAttributes) {
	  var regExpMap = {
	    year: '(Y+)',
	    month: '(M+)',
	    date: '(D+)',
	    hour: '(h+)',
	    minute: '(m+)',
	    second: '(s+)',
	    quarter: '(q+)',
	    millisecond: '(S)'
	  };

	  if (new RegExp(regExpMap[type], regExpAttributes).test(format)) {
	    var replaceStr = type === 'year' ? value.toString().substr(4 - RegExp.$1.length) : RegExp.$1.length === 1 ? value : pad(value);
	    format = format.replace(RegExp.$1, replaceStr);
	  }

	  return format;
	}

	function pad(value) {
	  return ('00' + value).substr(('' + value).length);
	}

	function formatDate(date, format) {
	  var map = {
	    year: {
	      value: date.getFullYear(),
	      regExpAttributes: 'i'
	    },
	    month: {
	      value: date.getMonth() + 1
	    },
	    date: {
	      value: date.getDate(),
	      regExpAttributes: 'i'
	    },
	    hour: {
	      value: date.getHours(),
	      regExpAttributes: 'i'
	    },
	    minute: {
	      value: date.getMinutes()
	    },
	    second: {
	      value: date.getSeconds()
	    },
	    quarter: {
	      value: Math.floor((date.getMonth() + 3) / 3),
	      regExpAttributes: 'i'
	    },
	    millisecond: {
	      value: date.getMilliseconds()
	    }
	  };

	  for (var key in map) {
	    format = formatType(key, format, map[key].value, map[key].regExpAttributes);
	  }

	  return format;
	}

	var proto$3;
	var DEFAULT_LANG = 'zh-CN';
	var locale = {
	  name: 'locale',
	  install: function install(Vue) {
	    if (locale.installed) { return; }
	    proto$3 = Vue.prototype;
	    Vue.util.defineReactive(proto$3, '$cubeLang', DEFAULT_LANG);
	    proto$3['$cubeMessages'] = _defineProperty({}, DEFAULT_LANG, defaultMessages);
	    locale.installed = true;
	  },
	  use: function use(lang, messages) {
	    proto$3['$cubeLang'] = lang;
	    var cubeMessages = proto$3['$cubeMessages']; // if messages have never been stored in vue.prototye

	    if (!(lang in cubeMessages)) {
	      cubeMessages[[lang]] = messages;
	    }
	  },
	  helpers: {
	    toLocaleDateString: function toLocaleDateString(config, formatRules) {
	      /**
	       * Safari don't support formatRules like
	       * 'yyyy-MM-dd hh:mm:ss', so transfer it to 'yyyy/MM/dd hh:mm:ss'
	       */
	      var compatibleConfig = isNumber(config) ? config : config.replace(/-/g, '/');
	      var date = new Date(compatibleConfig);
	      /* istanbul ignore if */

	      if (isUndef$2(formatRules)) { return date.toDateString(); }
	      return formatDate(date, formatRules);
	    }
	  },
	  addHelper: function addHelper(fnName, fn) {
	    // check existed helper fn

	    /* istanbul ignore if */
	    if (fnName in locale.helpers) {
	      warn$2("".concat(fnName, " has already been registered on helpers function, please change another name"));
	      return;
	    }

	    locale.helpers[fnName] = fn;
	  }
	};

	var TRANSLATION_ABSENT = "Translation is not registered correctly, " + "you can call Locale.use() to install it.";
	var localeMixin = {
	  computed: {
	    $t: function $t() {
	      var lang = this.$cubeLang;
	      var messages = this.$cubeMessages[lang];

	      if (isUndef$2(messages)) {
	        warn$2(TRANSLATION_ABSENT);
	        return '';
	      }

	      return function (path) {
	        return parsePath(messages, path);
	      };
	    }
	  },
	  beforeCreate: function beforeCreate() {
	    locale.install(this.$root.constructor);
	  }
	};

	var COMPONENT_NAME$1 = 'cube-picker';
	var EVENT_SELECT = 'select';
	var EVENT_VALUE_CHANGE = 'value-change';
	var EVENT_CANCEL = 'cancel';
	var EVENT_CHANGE = 'change';
	var script$1 = {
	  name: COMPONENT_NAME$1,
	  mixins: [visibilityMixin, popupMixin, basicPickerMixin, pickerMixin, localeMixin],
	  props: {
	    pending: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      finalData: this.data.slice()
	    };
	  },
	  created: function created() {
	    this._values = [];
	    this._indexes = this.selectedIndex;
	  },
	  methods: {
	    confirm: function confirm() {
	      if (!this._canConfirm()) {
	        return;
	      }

	      this.hide();
	      var changed = false;
	      var pickerSelectedText = [];
	      var length = this.finalData.length;
	      var oldLength = this._values.length; // when column count has changed.

	      if (oldLength !== length) {
	        changed = true;
	        oldLength > length && (this._values.length = this._indexes.length = length);
	      }

	      for (var i = 0; i < length; i++) {
	        var index = this.wheels[i].getSelectedIndex();
	        this._indexes[i] = index;
	        var value = null;
	        var text = '';

	        if (this.finalData[i].length) {
	          value = this.finalData[i][index][this.valueKey];
	          text = this.finalData[i][index][this.textKey];
	        }

	        if (this._values[i] !== value) {
	          changed = true;
	        }

	        this._values[i] = value;
	        pickerSelectedText[i] = text;
	      }

	      this.$emit(EVENT_SELECT, this._values, this._indexes, pickerSelectedText);

	      if (changed) {
	        this.$emit(EVENT_VALUE_CHANGE, this._values, this._indexes, pickerSelectedText);
	      }
	    },
	    maskClick: function maskClick() {
	      this.maskClosable && this.cancel();
	    },
	    cancel: function cancel() {
	      this.hide();
	      this.$emit(EVENT_CANCEL);
	    },
	    show: function show() {
	      var _this = this;

	      if (this.isVisible) {
	        return;
	      }

	      this.isVisible = true;

	      if (!this.wheels || this.dirty) {
	        this.$nextTick(function () {
	          _this.wheels = _this.wheels || [];
	          var wheelWrapper = _this.$refs.wheelWrapper;

	          for (var i = 0; i < _this.finalData.length; i++) {
	            _this._createWheel(wheelWrapper, i).enable();

	            _this.wheels[i].wheelTo(_this._indexes[i]);
	          }

	          _this.dirty && _this._destroyExtraWheels();
	          _this.dirty = false;
	        });
	      } else {
	        for (var i = 0; i < this.finalData.length; i++) {
	          this.wheels[i].enable();
	          this.wheels[i].wheelTo(this._indexes[i]);
	        }
	      }
	    },
	    hide: function hide() {
	      if (!this.isVisible) {
	        return;
	      }

	      this.isVisible = false;

	      for (var i = 0; i < this.finalData.length; i++) {
	        this.wheels[i].disable();
	      }
	    },
	    setData: function setData(data, selectedIndex) {
	      var _this2 = this;

	      this._indexes = selectedIndex ? _toConsumableArray(selectedIndex) : [];
	      this.finalData = data.slice();

	      if (this.isVisible) {
	        this.$nextTick(function () {
	          var wheelWrapper = _this2.$refs.wheelWrapper;

	          _this2.finalData.forEach(function (item, i) {
	            _this2._createWheel(wheelWrapper, i);

	            _this2.wheels[i].wheelTo(_this2._indexes[i]);
	          });

	          _this2._destroyExtraWheels();
	        });
	      } else {
	        this.dirty = true;
	      }
	    },
	    refill: function refill(datas) {
	      var _this3 = this;

	      var ret = [];

	      if (!datas.length) {
	        return ret;
	      }

	      datas.forEach(function (data, index) {
	        ret[index] = _this3.refillColumn(index, data);
	      });
	      return ret;
	    },
	    refillColumn: function refillColumn(index, data) {
	      var _this4 = this;

	      var wheelWrapper = this.$refs.wheelWrapper;
	      var scroll = wheelWrapper.children[index].querySelector('.cube-picker-wheel-scroll');
	      var wheel = this.wheels ? this.wheels[index] : false;
	      var dist = 0;

	      if (scroll && wheel) {
	        var oldData = this.finalData[index];
	        this.$set(this.finalData, index, data);
	        var selectedIndex = wheel.getSelectedIndex();

	        if (oldData.length) {
	          var oldValue = oldData[selectedIndex] ? oldData[selectedIndex][this.valueKey] : -1;

	          for (var i = 0; i < data.length; i++) {
	            if (data[i][this.valueKey] === oldValue) {
	              dist = i;
	              break;
	            }
	          }
	        }

	        this._indexes[index] = dist;
	        this.$nextTick(function () {
	          // recreate wheel so that the wrapperHeight will be correct.
	          wheel = _this4._createWheel(wheelWrapper, index);
	          wheel.wheelTo(dist);
	        });
	      }

	      return dist;
	    },
	    scrollTo: function scrollTo(index, dist) {
	      var wheel = this.wheels[index];
	      this._indexes[index] = dist;
	      wheel.wheelTo(dist);
	    },
	    refresh: function refresh() {
	      var _this5 = this;

	      this.$nextTick(function () {
	        _this5.wheels.forEach(function (wheel) {
	          wheel.refresh();
	        });
	      });
	    },
	    _createWheel: function _createWheel(wheelWrapper, i) {
	      var _this6 = this;

	      if (!this.wheels[i]) {
	        var wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
	          wheel: {
	            selectedIndex: this._indexes[i] || 0,
	            wheelWrapperClass: 'cube-picker-wheel-scroll',
	            wheelItemClass: 'cube-picker-wheel-item'
	          },
	          swipeTime: this.swipeTime,
	          observeDOM: false
	        });
	        wheel.on('scrollStart', function () {
	          if (_this6.lockWhenCascading) {
	            _this6.wheels.forEach(function (wheel, index) {
	              if (index !== i) {
	                wheel.disable();
	              }
	            });
	          }
	        });
	        wheel.on('scrollEnd', function () {
	          if (_this6.lockWhenCascading) {
	            _this6.wheels.forEach(function (wheel) {
	              wheel.enable();
	            });
	          }
	        });
	        wheel.on('scrollEnd', function () {
	          _this6.$emit(EVENT_CHANGE, i, wheel.getSelectedIndex());
	        });
	      } else {
	        this.wheels[i].refresh();
	      }

	      return this.wheels[i];
	    },
	    _destroyExtraWheels: function _destroyExtraWheels() {
	      var dataLength = this.finalData.length;

	      if (this.wheels.length > dataLength) {
	        var extraWheels = this.wheels.splice(dataLength);
	        extraWheels.forEach(function (wheel) {
	          wheel.destroy();
	        });
	      }
	    },
	    _canConfirm: function _canConfirm() {
	      return !this.pending && this.wheels.every(function (wheel) {
	        return !wheel.isInTransition;
	      });
	    },
	    _getFlexOrder: function _getFlexOrder(data) {
	      if (data[0]) {
	        return data[0][this.orderKey];
	      }

	      return 0;
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.wheels && this.wheels.forEach(function (wheel) {
	      wheel.destroy();
	    });
	    this.wheels = null;
	  },
	  components: {
	    CubePopup: CubePopup
	  }
	};

	/* script */
	var __vue_script__$1 = script$1;
	/* template */

	var __vue_render__$1 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('transition', {
	    attrs: {
	      "name": "cube-picker-fade"
	    }
	  }, [_c('cube-popup', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: _vm.isVisible,
	      expression: "isVisible"
	    }],
	    attrs: {
	      "type": "picker",
	      "mask": true,
	      "center": false,
	      "z-index": _vm.zIndex
	    },
	    on: {
	      "touchmove": function touchmove($event) {
	        $event.preventDefault();
	      },
	      "mask-click": _vm.maskClick
	    }
	  }, [_c('transition', {
	    attrs: {
	      "name": "cube-picker-move"
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: _vm.isVisible,
	      expression: "isVisible"
	    }],
	    staticClass: "cube-picker-panel cube-safe-area-pb",
	    on: {
	      "click": function click($event) {
	        $event.stopPropagation();
	      }
	    }
	  }, [_c('div', {
	    staticClass: "cube-picker-choose border-bottom-1px"
	  }, [_c('span', {
	    staticClass: "cube-picker-cancel",
	    on: {
	      "click": _vm.cancel
	    }
	  }, [_vm._v(_vm._s(_vm._cancelTxt))]), _vm._v(" "), _c('span', {
	    staticClass: "cube-picker-confirm",
	    on: {
	      "click": _vm.confirm
	    }
	  }, [_vm._v(_vm._s(_vm._confirmTxt))]), _vm._v(" "), _c('div', {
	    staticClass: "cube-picker-title-group"
	  }, [_c('h1', {
	    staticClass: "cube-picker-title",
	    domProps: {
	      "innerHTML": _vm._s(_vm.title)
	    }
	  }), _vm._v(" "), _vm.subtitle ? _c('h2', {
	    staticClass: "cube-picker-subtitle",
	    domProps: {
	      "innerHTML": _vm._s(_vm.subtitle)
	    }
	  }) : _vm._e()])]), _vm._v(" "), _c('div', {
	    staticClass: "cube-picker-content"
	  }, [_c('i', {
	    staticClass: "border-bottom-1px"
	  }), _vm._v(" "), _c('i', {
	    staticClass: "border-top-1px"
	  }), _vm._v(" "), _c('div', {
	    ref: "wheelWrapper",
	    staticClass: "cube-picker-wheel-wrapper"
	  }, _vm._l(_vm.finalData, function (data, index) {
	    return _c('div', {
	      key: index,
	      style: {
	        order: _vm._getFlexOrder(data)
	      }
	    }, [_c('ul', {
	      staticClass: "cube-picker-wheel-scroll"
	    }, _vm._l(data, function (item, index) {
	      return _c('li', {
	        key: index,
	        staticClass: "cube-picker-wheel-item",
	        domProps: {
	          "innerHTML": _vm._s(item[_vm.textKey])
	        }
	      });
	    }), 0)]);
	  }), 0)]), _vm._v(" "), _c('div', {
	    staticClass: "cube-picker-footer"
	  })])])], 1)], 1);
	};

	var __vue_staticRenderFns__$1 = [];
	/* style */

	var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-1ac4a668_0", {
	    source: ".cube-picker-fade-enter,.cube-picker-fade-leave-active{opacity:0}.cube-picker-fade-enter-active,.cube-picker-fade-leave-active{-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.cube-picker-panel{height:273px;text-align:center;font-size:14px;background:#fff}.cube-picker-move-enter,.cube-picker-move-leave-active{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.cube-picker-move-enter-active,.cube-picker-move-leave-active{-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.cube-picker-choose{position:relative;height:58px;border-bottom:1px solid #eaeaea}.cube-picker-cancel,.cube-picker-confirm{font-size:16px;line-height:58px;padding:0 16px;-webkit-box-sizing:content-box;box-sizing:content-box}.cube-picker-confirm{position:absolute;right:0;color:#ef7d00}.cube-picker-confirm:active{color:#ea6900}.cube-picker-cancel{position:absolute;left:0;color:#898989}.cube-picker-cancel:active{color:#595959}.cube-picker-title-group{padding:0 60px;display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column;flex-flow:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;text-align:center}.cube-picker-title{font-size:18px;line-height:1;font-weight:400;color:#333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cube-picker-subtitle{margin-top:2px;line-height:16px;font-size:13px;color:#999}.cube-picker-content{position:relative;top:20px}.cube-picker-content>i{position:absolute;z-index:10;left:0;width:100%;height:68px;pointer-events:none;-webkit-transform:translateZ(0);transform:translateZ(0)}.cube-picker-content>.border-bottom-1px{top:0;background:-webkit-gradient(linear,left bottom, left top,from(rgba(255,255,255,.4)),to(rgba(255,255,255,.8)));background:linear-gradient(to top,rgba(255,255,255,.4),rgba(255,255,255,.8));border-bottom:1px solid #eaeaea}.cube-picker-content>.border-top-1px{bottom:0;background:-webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,.4)),to(rgba(255,255,255,.8)));background:linear-gradient(to bottom,rgba(255,255,255,.4),rgba(255,255,255,.8));border-top:1px solid #eaeaea}.cube-picker-wheel-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;padding:0}.cube-picker-wheel-wrapper>div{-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-preferred-size:1e-9px;flex-basis:1e-9px;width:1%;height:173px;overflow:hidden;font-size:20px}.cube-picker-wheel-scroll{padding:0;margin-top:68px;line-height:36px;list-style:none}.cube-picker-wheel-item{list-style:none;height:36px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#333;padding:0 13px;font-size:18px}.cube-picker-footer{height:20px}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$1 = undefined;
	/* module identifier */

	var __vue_module_identifier__$1 = undefined;
	/* functional template */

	var __vue_is_functional_template__$1 = false;
	/* style inject SSR */

	var Picker = normalizeComponent_1({
	  render: __vue_render__$1,
	  staticRenderFns: __vue_staticRenderFns__$1
	}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, browser, undefined);

	function addPicker(Vue, Picker) {
	  var pickerAPI = createAPI(Vue, Picker, ['select', 'value-change', 'cancel', 'change']);
	  pickerAPI.before(function (data, renderFn, single) {
	    if (single) {
	      tip('Picker component can not be a singleton.');
	    }
	  });
	}

	Picker.install = function (Vue) {
	  Vue.component(Picker.name, Picker);
	  locale.install(Vue);
	  addPicker(Vue, Picker);
	};

	//
	var COMPONENT_NAME$2 = 'cube-cascade-picker';
	var EVENT_SELECT$1 = 'select';
	var EVENT_CANCEL$1 = 'cancel';
	var EVENT_CHANGE$1 = 'change';
	var script$2 = {
	  name: COMPONENT_NAME$2,
	  mixins: [visibilityMixin, popupMixin, basicPickerMixin, pickerMixin, localeMixin],
	  props: {
	    async: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      cascadeData: this.data.slice(),
	      pickerSelectedIndex: this.selectedIndex.slice(),
	      pickerData: [],
	      pending: false
	    };
	  },
	  created: function created() {
	    this._updatePickerData();
	  },
	  methods: {
	    setData: function setData(data) {
	      var selectedIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	      this.pending = false;
	      this.cascadeData = data.slice();
	      this.pickerSelectedIndex = selectedIndex.slice();

	      this._updatePickerData();
	    },
	    _pickerSelect: function _pickerSelect(selectedVal, selectedIndex, selectedText) {
	      this.$emit(EVENT_SELECT$1, selectedVal, selectedIndex, selectedText);
	    },
	    _pickerCancel: function _pickerCancel() {
	      this.$emit(EVENT_CANCEL$1);
	    },
	    _pickerChange: function _pickerChange(i, newIndex) {
	      if (newIndex !== this.pickerSelectedIndex[i]) {
	        this.pickerSelectedIndex.splice(i, 1, newIndex);
	        this.async ? this.pending = i !== this.pickerData.length - 1 : this._updatePickerData(i + 1);
	      }

	      this.$emit(EVENT_CHANGE$1, i, newIndex);
	    },
	    _updatePickerData: function _updatePickerData() {
	      var _this = this;

	      var fromColumn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var data = this.cascadeData;
	      var i = 0;

	      while (data) {
	        if (i >= fromColumn) {
	          (function () {
	            var columnData = [];
	            data.forEach(function (item) {
	              columnData.push({
	                value: item[_this.valueKey],
	                text: item[_this.textKey],
	                order: item[_this.orderKey]
	              });
	            });
	            _this.pickerData[i] = columnData;
	            /* refillColumn could only be called after show() */

	            _this.pickerSelectedIndex[i] = fromColumn === 0 ? _this.pickerSelectedIndex[i] < data.length ? _this.pickerSelectedIndex[i] || 0 : 0 : _this.$refs.picker.refillColumn(i, columnData);
	          })();
	        }

	        data = data.length && data[this.pickerSelectedIndex[i]] ? data[this.pickerSelectedIndex[i]].children : null;
	        i++;
	      }

	      if (i < this.pickerData.length) {
	        this.pickerData.splice(i, this.pickerData.length - i);
	      }

	      this.pickerData = this.pickerData.slice();
	    }
	  },
	  components: {
	    CubePicker: Picker
	  }
	};

	/* script */
	var __vue_script__$2 = script$2;
	/* template */

	var __vue_render__$2 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('cube-picker', {
	    ref: "picker",
	    attrs: {
	      "data": _vm.pickerData,
	      "selected-index": _vm.pickerSelectedIndex,
	      "pending": _vm.pending,
	      "title": _vm.title,
	      "subtitle": _vm.subtitle,
	      "z-index": _vm.zIndex,
	      "cancel-txt": _vm._cancelTxt,
	      "confirm-txt": _vm._confirmTxt,
	      "swipe-time": _vm.swipeTime,
	      "mask-closable": _vm.maskClosable,
	      "lock-when-cascading": true
	    },
	    on: {
	      "select": _vm._pickerSelect,
	      "cancel": _vm._pickerCancel,
	      "change": _vm._pickerChange
	    },
	    model: {
	      value: _vm.isVisible,
	      callback: function callback($$v) {
	        _vm.isVisible = $$v;
	      },
	      expression: "isVisible"
	    }
	  });
	};

	var __vue_staticRenderFns__$2 = [];
	/* style */

	var __vue_inject_styles__$2 = undefined;
	/* scoped */

	var __vue_scope_id__$2 = undefined;
	/* module identifier */

	var __vue_module_identifier__$2 = undefined;
	/* functional template */

	var __vue_is_functional_template__$2 = false;
	/* style inject */

	/* style inject SSR */

	var CascadePicker = normalizeComponent_1({
	  render: __vue_render__$2,
	  staticRenderFns: __vue_staticRenderFns__$2
	}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

	function addCascadePicker(Vue, CascadePicker) {
	  var cascadePickerAPI = createAPI(Vue, CascadePicker, ['select', 'cancel', 'change']);
	  cascadePickerAPI.before(function (data, renderFn, single) {
	    if (single) {
	      tip('CascadePicker component can not be a singleton.');
	    }
	  });
	}

	CascadePicker.install = function (Vue) {
	  Vue.component(Picker.name, Picker);
	  Vue.component(CascadePicker.name, CascadePicker);
	  locale.install(Vue);
	  addPicker(Vue, Picker);
	  addCascadePicker(Vue, CascadePicker);
	};

	CascadePicker.Picker = Picker;

	var cube = {
	  popup: CubePopup,
	  picker: Picker,
	  cascadePicker: CascadePicker
	};

	var defaultSvg = {
	  success: '<svg viewBox="0 0 28 28" preserveAspectRatio="xMidYMid"><path d="M14 28a14 14 0 1 1 0-28 14 14 0 0 1 0 28zm6.34-16.15c.2-.2.33-.47.33-.77 0-.6-.5-1.08-1.12-1.08-.3 0-.58.12-.78.32l-5.89 5.73-3.65-3.55c-.2-.2-.48-.32-.78-.32a1.1 1.1 0 0 0-1.12 1.08c0 .3.13.57.33.76l4.43 4.33a1.13 1.13 0 0 0 1.58 0l6.67-6.5z"/><path d="M20.34,11.85 C20.54,11.65 20.67,11.38 20.67,11.08 C20.67,10.48 20.17,10 19.55,10 C19.25,10 18.97,10.12 18.77,10.32 L12.88,16.05 L9.23,12.5 C9.03,12.3 8.75,12.18 8.45,12.18 C8.15824796,12.1746472 7.87632378,12.2854366 7.66627239,12.4879862 C7.456221,12.6905357 7.33525637,12.9682462 7.33,13.26 C7.33,13.56 7.46,13.83 7.66,14.02 L12.09,18.35 C12.5291481,18.7793861 13.2308519,18.7793861 13.67,18.35 L20.34,11.85 L20.34,11.85 Z" id="Path" fill="#FFFFFF"></path></svg>',
	  'arrow-right': '<svg viewBox="0 0 20 20"><path d="M12.49 10.2L6.65 4.35a.49.49 0 0 1 .7-.7l6.2 6.19a.5.5 0 0 1 0 .7l-6.19 6.51a.49.49 0 0 1-.7 0 .5.5 0 0 1 0-.71z"/></svg>',
	  'bsb-logo': '<svg viewBox="0 0 100 100" version="1.1"><defs><radialGradient cx="50.0243202%" cy="49.9676872%" fx="50.0243202%" fy="49.9676872%" r="50.0114804%" id="radialGradient-1"><stop stop-color="#FFCD44" offset="0%"></stop><stop stop-color="#FEC73F" offset="5.986708%"></stop><stop stop-color="#F69F1F" offset="47.14%"></stop><stop stop-color="#F1870B" offset="79.9%"></stop><stop stop-color="#EF7E04" offset="100%"></stop></radialGradient></defs><g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M79.1833333,26 C73.7559919,26 69.3666667,30.3893253 69.3666667,35.8166667 C69.3666667,41.2440081 73.7559919,45.6333333 79.1833333,45.6333333 C84.6106747,45.6333333 89,41.2440081 89,35.8166667 C89,30.3893253 84.6106747,26 79.1833333,26 Z M79.1833333,40.7101712 C76.4548338,40.7101712 74.2898288,38.5155085 74.2898288,35.787009 C74.2898288,33.0881671 76.4844915,30.8935046 79.1833333,30.8935046 C81.8821752,30.8935046 84.0768379,33.0881671 84.0768379,35.787009 C84.1064954,38.5155085 81.9118329,40.7101712 79.1833333,40.7101712 Z" id="Shape" fill="url(#radialGradient-1)" fill-rule="nonzero"></path><path d="M19.9058292,43.9226596 C25.7446634,43.9226596 32.0280788,47.2254256 32.0577176,53.8599291 C32.0577176,60.465461 25.7743021,63.768227 19.9354679,63.768227 C16.8530378,63.768227 13.0296388,63.0729078 13.0296388,59.2776241 C13.0296388,56.4673759 13.0296388,38.7367376 13.0296388,38.7367376 L18.1275041,37.0274114 C18.1275041,37.0274114 18.1275041,39.9245744 18.1275041,43.9516312 C18.5720854,43.9226596 19.698358,43.9226596 19.9058292,43.9226596 Z M21.0321018,60.7262056 C26.5449097,60.7262056 26.3077997,53.8309574 26.3077997,53.8019858 C26.3077997,53.8019858 26.6338259,47.0515958 19.816913,46.9067376 C18.3942529,46.8777659 16.0824303,47.0805674 16.0824303,47.0805674 L18.1275041,47.9207447 L18.1275041,58.6981915 C18.1275041,60.5813476 19.7872742,60.7262056 21.0321018,60.7262056 Z M60.7776684,43.9226596 C66.6461412,43.9226596 72.8999179,47.2254256 72.9295566,53.8599291 C72.9295566,60.465461 66.6461412,63.768227 60.8073071,63.768227 C57.7248768,63.768227 53.9014779,63.0729078 53.9014779,59.2776241 C53.9014779,56.4673759 53.9014779,38.7367376 53.9014779,38.7367376 L58.9993432,37.0274114 C58.9993432,37.0274114 58.9993432,39.9245744 58.9993432,43.9516312 C59.4439244,43.9226596 60.570197,43.9226596 60.7776684,43.9226596 Z M61.9039409,60.7262056 C67.4167488,60.7262056 67.1796387,53.8309574 67.1796387,53.8019858 C67.1796387,53.8019858 67.505665,47.0515958 60.6887521,46.9067376 C59.266092,46.8777659 56.9542693,47.0805674 56.9542693,47.0805674 L58.9993432,47.9207447 L58.9993432,58.6981915 C58.9993432,60.5813476 60.6591133,60.7262056 61.9039409,60.7262056 Z M43.9724959,52.0926596 C48.62578,53.3674114 50.8486864,55.1926241 50.8190476,57.9449291 C50.8190476,61.0448936 47.5587849,63.7102837 40.6825944,63.7102837 C37.8372742,63.7102837 34.9030378,63.1598227 33.4211002,62.4934752 L34.5473727,59.5963121 C36.0885878,60.2626596 38.5189655,60.8131206 41.0086207,60.8131206 C44.0910509,60.8131206 45.2173235,59.7701418 45.2173235,58.2056738 C45.2173235,56.7570922 44.5059934,56.0907447 41.1271757,55.1926241 C36.6813629,54.0627305 33.8656815,52.2085461 33.8656815,49.4562411 C33.8656815,46.327305 37.5112479,43.9516312 43.3500821,43.9516312 C46.2546798,43.9516312 48.3590312,44.3862056 49.7520526,44.907695 L48.5961412,47.7179433 C47.6180624,47.3702837 45.7508211,46.8198227 43.2315271,46.8198227 C40.1490969,46.8198227 39.4674056,47.9786879 39.4674056,49.1085815 C39.4674056,50.5861347 40.3862069,51.1076241 43.9724959,52.0926596 Z" id="Combined-Shape" fill="#551F0A" fill-rule="nonzero"></path></g></svg>',
	  'close-circle': '<svg viewBox="0 0 36 36"><g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="Oval-2" fill="#595959" cx="18" cy="18" r="18"></circle><path d="M18,18.7049095 L9.9405364,26.7643731 L9.23342961,26.0572663 L17.2928932,17.9978027 L9.23342961,9.93833913 L9.9405364,9.23123235 L18,17.290696 L26.062571,9.22812495 L26.7696778,9.93523173 L18.7071068,17.9978027 L26.7696778,26.0603737 L26.062571,26.7674805 L18,18.7049095 Z" id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path></g></svg>'
	};

	var svgSprite = function svgSprite(contents) {
	  return "\n<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n  id=\"__MAND_MOBILE_SVG_SPRITE_NODE__\"\n  style=\"position:absolute;width:0;height:0\"\n>\n  <defs>\n    ".concat(contents, "\n  </defs>\n</svg>\n");
	};

	var renderSvgSprite = function renderSvgSprite() {
	  var symbols = keys$2(defaultSvg).map(function (iconName) {
	    var svgContent = defaultSvg[iconName].split('svg')[1];
	    return "<symbol id=".concat(iconName).concat(svgContent, "symbol>");
	  }).join('');

	  return svgSprite(symbols);
	};

	var loadSprite = function loadSprite() {
	  /* istanbul ignore if */
	  if (!document) {
	    return;
	  }

	  var existing = document.getElementById('__MAND_MOBILE_SVG_SPRITE_NODE__');
	  var mountNode = document.body;

	  if (!existing) {
	    mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite());
	  }
	};

	var script$3 = {
	  name: 'md-icon',
	  props: {
	    name: {
	      type: String,
	      default: ''
	    },
	    size: {
	      type: String,
	      default: 'md'
	    },
	    color: {
	      type: String,
	      default: ''
	    },
	    svg: {
	      type: Boolean,
	      default: false
	    }
	  },
	  mounted: function mounted() {
	    loadSprite();
	  },
	  computed: {
	    isInnerSvg: function isInnerSvg() {
	      return !!defaultSvg[this.name];
	    }
	  }
	};

	var __vue_script__$3 = script$3;
	/* template */

	var __vue_render__$3 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _vm.svg || _vm.isInnerSvg ? _c('svg', {
	    staticClass: "md-icon icon-svg",
	    class: ["md-icon-" + _vm.name, _vm.size],
	    style: {
	      fill: _vm.color
	    },
	    on: {
	      "click": function click($event) {
	        return _vm.$emit('click', $event);
	      }
	    }
	  }, [_c('use', {
	    attrs: {
	      "xlink:href": "#" + _vm.name
	    }
	  })]) : _vm.name ? _c('i', {
	    staticClass: "md-icon icon-font",
	    class: ["md-icon-" + _vm.name, _vm.name, _vm.size],
	    style: {
	      color: _vm.color
	    },
	    on: {
	      "click": function click($event) {
	        return _vm.$emit('click', $event);
	      }
	    }
	  }) : _vm._e();
	};

	var __vue_staticRenderFns__$3 = [];
	/* style */

	var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-4fc4308d_0", {
	    source: "body{font-family:Helvetica,\"微软雅黑\",\"Helvetica Neue\",\"Microsoft YaHei\",\"PingFang SC\",\"Hiragino Sans GB\",Arial,sans-serif;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li,ol{list-style:none}.md-icon{background-size:contain;fill:currentColor;-webkit-backface-visibility:hidden;-webkit-transform:translateZ(0) scale(1,1);transform:translateZ(0) scale(1,1)}.md-icon.icon-font{font-family:Mand-Mobile-Icon!important;font-size:16px;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;letter-spacing:0;speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.md-icon.icon-font.xss{font-size:icon-size-xxs}.md-icon.icon-font.xs{font-size:20px}.md-icon.icon-font.sm{font-size:28px}.md-icon.icon-font.md{font-size:36px}.md-icon.icon-font.lg{font-size:40px}.md-icon.icon-font:before{position:relative;z-index:2}.md-icon.icon-svg.xss{width:icon-size-xxs;height:icon-size-xxs;line-height:icon-size-xxs}.md-icon.icon-svg.xs{width:20px;height:20px;line-height:20px}.md-icon.icon-svg.sm{width:28px;height:28px;line-height:28px}.md-icon.icon-svg.md{width:36px;height:36px;line-height:36px}.md-icon.icon-svg.lg{width:40px;height:40px;line-height:40px}.md-icon-rectangle:before{content:\"\\e900\"}.md-icon-invisible:before{content:\"\\e601\"}.md-icon-visible:before{content:\"\\e602\"}.md-icon-right:before{content:\"\\e905\"}.md-icon-wrong:before{content:\"\\e906\"}.md-icon-info:before{content:\"\\e605\"}.md-icon-service:before{content:\"\\e606\"}.md-icon-edit:before{content:\"\\e607\"}.md-icon-refresh:before{content:\"\\e901\"}.md-icon-question:before{content:\"\\e608\"}.md-icon-setting:before{content:\"\\e609\"}.md-icon-wait:before{content:\"\\e902\"}.md-icon-check:before{content:\"\\e904\"}.md-icon-check-disabled:before{content:\"\\e903\"}.md-icon-checked:before,.md-icon-success:before{content:\"\\e908\"}.md-icon-clear:before,.md-icon-fail:before{content:\"\\e60e\"}.md-icon-info-solid:before{content:\"\\e907\"}.md-icon-warn:before{content:\"\\e60b\"}.md-icon-security:before{content:\"\\e60f\"}.md-icon-rmb:before{content:\"\\e610\"}.md-icon-scan:before{content:\"\\e611\"}.md-icon-share:before{content:\"\\e612\"}.md-icon-back:before{content:\"\\e613\"}.md-icon-card-bag:before{content:\"\\e614\"}.md-icon-message:before{content:\"\\e615\"}.md-icon-order:before{content:\"\\e616\"}.md-icon-balance:before{content:\"\\e617\"}.md-icon-coupon:before{content:\"\\e618\"}.md-icon-sort:before{content:\"\\e619\"}.md-icon-address-book:before{content:\"\\e61a\"}.md-icon-mobile-phone:before{content:\"\\e61b\"}.md-icon-home:before{content:\"\\e61c\"}.md-icon-discovery:before{content:\"\\e61d\"}.md-icon-calendar:before{content:\"\\e61e\"}.md-icon-user:before{content:\"\\e61f\"}.md-icon-time:before{content:\"\\e620\"}.md-icon-search:before{content:\"\\e621\"}.md-icon-switch:before{content:\"\\e622\"}.md-icon-camera:before{content:\"\\e623\"}.md-icon-clock:before{content:\"\\e624\"}.md-icon-profession:before{content:\"\\e625\"}.md-icon-delete:before{content:\"\\e626\"}.md-icon-id-card:before{content:\"\\e627\"}.md-icon-filter:before{content:\"\\e628\"}.md-icon-location:before{content:\"\\e629\"}.md-icon-authentication:before{content:\"\\e62a\"}.md-icon-motor-vehicle:before{content:\"\\e62b\"}.md-icon-phone:before{content:\"\\e62c\"}.md-icon-volumn:before{content:\"\\e62d\"}.md-icon-arrow-left:before{content:\"\\e603\"}.md-icon-arrow-right:before{content:\"\\e630\"}.md-icon-arrow-up:before{content:\"\\e633\"}.md-icon-arrow-down:before{content:\"\\e634\"}.md-icon-close:before{content:\"\\e604\"}@font-face{font-family:Mand-Mobile-Icon;font-style:normal;font-weight:400;src:url(iconfont.woff) format('woff'),url(iconfont.ttf) format(\"truetype\")}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$3 = undefined;
	/* module identifier */

	var __vue_module_identifier__$3 = undefined;
	/* functional template */

	var __vue_is_functional_template__$3 = false;
	/* style inject SSR */

	var Icon = normalizeComponent_1({
	  render: __vue_render__$3,
	  staticRenderFns: __vue_staticRenderFns__$3
	}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, browser, undefined);

	var inBrowser$1 = !Vue.prototype.$isServer || typeof window !== 'undefined';
	var UA = inBrowser$1 && window.navigator.userAgent.toLowerCase();
	var isAndroid$1 = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });

	var _stringWs$1 = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space$1 = '[' + _stringWs$1 + ']';
	var non$1 = '\u200b\u0085';
	var ltrim$1 = RegExp('^' + space$1 + space$1 + '*');
	var rtrim$1 = RegExp(space$1 + space$1 + '*$');

	var exporter$1 = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs$1[KEY]() || non$1[KEY]() != non$1;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim$1) : _stringWs$1[KEY];
	  if (ALIAS) { exp[ALIAS] = fn; }
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim$1 = exporter$1.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) { string = string.replace(ltrim$1, ''); }
	  if (TYPE & 2) { string = string.replace(rtrim$1, ''); }
	  return string;
	};

	var _stringTrim$1 = exporter$1;

	var $parseFloat = _global.parseFloat;
	var $trim$1 = _stringTrim$1.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs$1 + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 18.2.4 parseFloat(string)
	_export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

	var _parseFloat$1 = _core.parseFloat;

	var _parseFloat$2 = _parseFloat$1;

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

	var now = _core.Date.now;

	var $parseInt = _global.parseInt;
	var $trim$2 = _stringTrim$1.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs$1 + '08') !== 8 || $parseInt(_stringWs$1 + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim$2(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var _parseInt$1 = _core.parseInt;

	var _parseInt$2 = _parseInt$1;

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) { return res.value; }
	      var rx = _anObject$1(regexp);
	      var S = String(this);
	      if (!rx.global) { return _regexpExecAbstract(rx, S); }
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') { rx.lastIndex = _advanceStringIndex(S, _toLength$1(rx.lastIndex), fullUnicode); }
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	/**
	 * Convert an Array-like object to a real Array.
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = [];

	  while (i--) {
	    ret.unshift(list[i + start]);
	  }

	  return ret;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) { descriptor.writable = true; }

	    defineProperty$1(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
	  if (staticProps) { _defineProperties(Constructor, staticProps); }
	  return Constructor;
	}

	var Dom =
	/*#__PURE__*/
	function () {
	  function Dom() {
	    _classCallCheck(this, Dom);
	  }

	  _createClass(Dom, [{
	    key: "appendChild",
	    value: function appendChild() {}
	  }, {
	    key: "removeChild",
	    value: function removeChild() {}
	  }, {
	    key: "querySelector",
	    value: function querySelector() {}
	  }, {
	    key: "addEventListener",
	    value: function addEventListener() {}
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener() {}
	  }]);

	  return Dom;
	}();

	var dom = new Dom();
	var mdDocument = dom;
	var mdBody = dom;
	mdDocument.body = mdBody;

	if (inBrowser$1) {
	  mdDocument = window.document;
	  mdBody = document.body;
	}

	var script$4 = {
	  name: 'timeline',
	  components: _defineProperty({}, Icon.name, Icon),
	  props: {
	    type: {
	      type: String,
	      default: ''
	    },
	    steps: {
	      type: Array,
	      default: function _default() {
	        /* istanbul ignore next */
	        return [];
	      }
	    },
	    step: {
	      type: Number,
	      default: -1
	    },
	    direction: {
	      type: String,
	      default: 'horizontal'
	    },
	    transition: {
	      type: Boolean,
	      default: false
	    },
	    verticalAdaptive: {
	      type: Boolean,
	      default: false
	    },
	    shortInactiveSteps: {
	      type: Boolean,
	      default: true
	    }
	  },
	  data: function data() {
	    return {
	      initialed: false,
	      progress: [],
	      stepsSize: [],
	      currentLength: 0,
	      duration: 0.3,
	      timer: null
	    };
	  },
	  computed: {
	    $_barInnerStyle: function $_barInnerStyle() {
	      var _this = this;

	      return function (index) {
	        var progress = _this.progress;
	        var transform = _this.direction === 'horizontal' ? "(".concat((progress[index].len - 1) * 100, "%, 0, 0)") : "(0, ".concat((progress[index].len - 1) * 100, "%, 0)");
	        return {
	          transform: "translate3d".concat(transform),
	          transition: "all ".concat(progress[index].time, "s linear")
	        };
	      };
	    },
	    current: function current() {
	      if (this.step !== -1) {
	        return this.step;
	      }

	      var current = this.steps.findIndex(function (item) {
	        return item.SysNo === '1';
	      });
	      return current === -1 ? 0 : current;
	    }
	  },
	  watch: {
	    current: function current(val, oldVal) {
	      var _this2 = this;

	      var currentStep = this.$_formatValue(val);
	      var newProgress = this.$_sliceProgress(currentStep);

	      if (this.transition) {
	        var isAdd = currentStep >= oldVal;
	        this.timer && clearTimeout(this.timer);
	        this.timer = setTimeout(function () {
	          _this2.$_doTransition(newProgress, isAdd, function (len) {
	            if (isAdd && len > _this2.currentLength || !isAdd && len < _this2.currentLength) {
	              _this2.currentLength = len;
	            }
	          });
	        }, 100);
	      } else {
	        this.progress = newProgress;
	        this.currentLength = currentStep;
	      }
	    }
	  },
	  created: function created() {
	    var currentStep = this.$_formatValue(this.current);
	    this.currentLength = currentStep;
	    this.progress = this.$_sliceProgress(currentStep);
	  },
	  mounted: function mounted() {
	    this.$_initStepSize();
	  },
	  updated: function updated() {
	    var _this3 = this;

	    this.$nextTick(function () {
	      _this3.$_initStepSize();
	    });
	  },
	  methods: {
	    // MARK: private methods
	    $_initStepSize: function $_initStepSize() {
	      if (this.direction !== 'vertical' || this.verticalAdaptive) {
	        return;
	      }

	      var iconWrappers = this.$el.querySelectorAll('.icon-wrapper');
	      var textWrappers = this.$el.querySelectorAll('.text-wrapper');
	      var stepsSize = toArray(textWrappers).map(function (wrapper, index) {
	        var stepHeight = wrapper.clientHeight || 22;
	        var iconHeight = iconWrappers[index].clientHeight || 22;

	        if (index === textWrappers.length - 1) {
	          // The last step needs to subtract floated height
	          stepHeight -= iconHeight;
	        } else {
	          // Add spacing between steps to prevent distance too close
	          stepHeight += 16;
	        }

	        return stepHeight > 0 ? stepHeight : 0;
	      });

	      if (stepsSize.toString() !== this.stepsSize.toString()) {
	        this.stepsSize = stepsSize;
	      }
	    },
	    $_getStepSizeForStyle: function $_getStepSizeForStyle(index) {
	      var size = this.direction === 'vertical' && !this.verticalAdaptive ? this.stepsSize[index] : 0;
	      return size ? {
	        height: "".concat(size, "px")
	      } : null;
	    },
	    $_getStepBarStatusClass: function $_getStepBarStatusClass(index, total) {
	      var status = [];

	      if (index === 0) {
	        status.push('first-bar');
	      }

	      if (index === total - 2) {
	        status.push('last-bar');
	      }

	      return status.join(' ');
	    },
	    $_getStepStatusClass: function $_getStepStatusClass(index, total) {
	      var currentLength = this.currentLength;
	      var status = [];

	      if (index < currentLength) {
	        status.push('reached');
	      }

	      if (index === Math.floor(currentLength)) {
	        status.push('current');
	      }

	      if (index === 0 && index !== total - 1) {
	        status.push('first-node');
	      }

	      if (index === total - 1 && index !== 0) {
	        status.push('last-node');
	      }

	      return status.join(' ');
	    },
	    $_formatValue: function $_formatValue(val) {
	      if (val < 0) {
	        return 0;
	      } else if (val > this.steps.length - 1) {
	        return this.steps.length - 1;
	      }

	      return val;
	    },
	    $_sliceProgress: function $_sliceProgress(current) {
	      var _this4 = this;

	      return this.steps.slice(0, this.steps.length - 1).map(function (step, index) {
	        var offset = current - index;
	        var progress = _this4.progress[index];
	        var isNewProgress = progress === undefined;
	        var len;
	        var time;

	        if (offset <= 0) {
	          len = 0;
	        } else if (offset >= 1) {
	          len = 1;
	        } else {
	          len = offset;
	        }

	        time = (isNewProgress ? len : Math.abs(progress.len - len)) * _this4.duration;
	        return {
	          len: len,
	          time: time
	        };
	      });
	    },
	    $_doTransition: function $_doTransition(progress, isAdd, step) {
	      var _this5 = this;

	      var currentLength = isAdd ? 0 : this.currentLength;

	      var walk = function walk(index) {
	        if (index < progress.length & index > -1 && progress[index]) {
	          if (isAdd) {
	            currentLength += progress[index].len;
	          } else {
	            currentLength -= _this5.progress[index].len - progress[index].len;
	          }

	          setTimeout(function () {
	            index += isAdd ? 1 : -1;
	            step(currentLength);
	            walk(index);
	          }, progress[index].time * 1000);
	        }

	        _this5.$set(_this5.progress, index, progress[index]);
	      };

	      walk(isAdd ? 0 : progress.length - 1);
	    }
	  }
	};

	/* script */
	var __vue_script__$4 = script$4;
	/* template */

	var __vue_render__$4 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "md-timeline",
	    class: {
	      'md-timeline-vertical': _vm.direction === 'vertical',
	      'md-timeline-horizontal': _vm.direction === 'horizontal',
	      'vertical-adaptive': _vm.direction === 'vertical' && _vm.verticalAdaptive,
	      'no-current': _vm.currentLength % 1 !== 0
	    }
	  }, [_vm._l(_vm.steps, function (step, index) {
	    return [_c('div', {
	      key: "steps-" + index,
	      staticClass: "step-wrapper",
	      class: [_vm.$_getStepStatusClass(index, _vm.steps.length)]
	    }, [_c('div', {
	      staticClass: "time-wrapper"
	    }, [_vm.$scopedSlots.timeFlag ? _vm._t("content", null, {
	      "index": index,
	      "step": step
	    }) : [_c('div', {
	      staticClass: "name"
	    }, [_vm._v("\n            " + _vm._s(step.timeFlag || '--') + "\n          ")]), _vm._v(" "), step.timeFlagDesc ? _c('div', {
	      staticClass: "desc"
	    }, [_vm._v("\n            " + _vm._s(step.timeFlagDesc) + "\n          ")]) : _vm._e()]], 2), _vm._v(" "), _c('div', {
	      staticClass: "icon-wrapper"
	    }, [index < _vm.currentLength && (_vm.$scopedSlots.reached || _vm.$slots.reached) ? _vm._t("reached", null, {
	      "index": index
	    }) : index === _vm.currentLength && (_vm.$scopedSlots.current || _vm.$slots.current) ? _vm._t("current", null, {
	      "index": index
	    }) : index === _vm.currentLength ? _c('md-icon', {
	      attrs: {
	        "name": "success"
	      }
	    }) : _c('div', {
	      staticClass: "step-node-default"
	    }, [_c('div', {
	      staticClass: "step-node-default-icon",
	      style: {
	        width: _vm.direction === 'horizontal' ? '7px' : '8px',
	        height: _vm.direction === 'horizontal' ? '7px' : '8px',
	        'border-radius': '50%'
	      }
	    })])], 2), _vm._v(" "), _c('div', {
	      staticClass: "text-wrapper"
	    }, [_vm.$scopedSlots.timeFlagMsg ? _vm._t("content", null, {
	      "index": index,
	      "step": step
	    }) : [_c('div', {
	      staticClass: "name",
	      style: {
	        'max-width': _vm.direction === 'horizontal' ? 340 / _vm.steps.length + 'px' : 'auto'
	      }
	    }, [_vm._v("\n            " + _vm._s(step.timeFlagMsg || '--') + "\n          ")]), _vm._v(" "), step.timeFlagMsgDesc ? _c('div', {
	      staticClass: "desc"
	    }, [_vm._v("\n            " + _vm._s(step.timeFlagMsgDesc) + "\n          ")]) : _vm._e()]], 2)]), _vm._v(" "), _c('div', {
	      key: "bar-" + index,
	      staticClass: "bar",
	      class: [_vm.direction === 'horizontal' ? 'horizontal-bar' : 'vertical-bar', _vm.$_getStepBarStatusClass(index, _vm.steps.length)],
	      style: _vm.$_getStepSizeForStyle(index, _vm.steps.length)
	    }, [_vm.progress[index] ? _c('i', {
	      staticClass: "bar-inner",
	      style: _vm.$_barInnerStyle(index)
	    }) : _vm._e()])];
	  })], 2);
	};

	var __vue_staticRenderFns__$4 = [];
	/* style */

	var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-4c87d372_0", {
	    source: "body{font-family:Helvetica,\"微软雅黑\",\"Helvetica Neue\",\"Microsoft YaHei\",\"PingFang SC\",\"Hiragino Sans GB\",Arial,sans-serif;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li,ol{list-style:none}.md-timeline{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;font-size:14px}.md-timeline.md-timeline-horizontal{width:100%;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0}.md-timeline.md-timeline-horizontal .step-wrapper{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;z-index:1;-webkit-box-flex:1;-ms-flex:1;flex:1;max-width:15px;overflow:visible;min-width:15px;min-height:15px}.md-timeline.md-timeline-horizontal .step-wrapper .icon-wrapper{min-width:15px;min-height:15px;margin:2px 0;z-index:2;line-height:1}.md-timeline.md-timeline-horizontal .step-wrapper .icon-wrapper .md-icon{width:15px;height:15px;font-size:15px;line-height:15px}.md-timeline.md-timeline-horizontal .step-wrapper.reached .text-wrapper .name{color:#595959}.md-timeline.md-timeline-horizontal .step-wrapper.current .text-wrapper .name,.md-timeline.md-timeline-horizontal .step-wrapper.current .time-wrapper .name{color:#ef7d00}.md-timeline.md-timeline-horizontal .step-wrapper.first-node .icon-wrapper{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.md-timeline.md-timeline-horizontal .step-wrapper.first-node .text-wrapper .name,.md-timeline.md-timeline-horizontal .step-wrapper.first-node .time-wrapper .name{left:0;-webkit-transform:translateX(0);transform:translateX(0)}.md-timeline.md-timeline-horizontal .step-wrapper.last-node .icon-wrapper{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.md-timeline.md-timeline-horizontal .step-wrapper.last-node .text-wrapper .name,.md-timeline.md-timeline-horizontal .step-wrapper.last-node .time-wrapper .name{left:100%;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.md-timeline.md-timeline-horizontal .text-wrapper,.md-timeline.md-timeline-horizontal .time-wrapper{height:17px;line-height:17px;width:100%;position:relative}.md-timeline.md-timeline-horizontal .text-wrapper .name,.md-timeline.md-timeline-horizontal .time-wrapper .name{max-width:60px;overflow:hidden;text-overflow:ellipsis;text-align:center;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.md-timeline.md-timeline-horizontal .time-wrapper{font-size:12px;color:#595959;white-space:nowrap}.md-timeline.md-timeline-horizontal .text-wrapper{top:100%}.md-timeline.md-timeline-horizontal .text-wrapper .name{color:#595959;font-size:12px}.md-timeline.md-timeline-horizontal .text-wrapper .desc{color:#595959;line-height:12px;font-size:12px}.md-timeline.md-timeline-horizontal.no-current .reached:last-of-type{display:none!important}.md-timeline.md-timeline-vertical{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;padding:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.md-timeline.md-timeline-vertical.vertical-adaptive{-webkit-box-pack:normal;-ms-flex-pack:normal;justify-content:normal;padding:0}.md-timeline.md-timeline-vertical.vertical-adaptive .bar.vertical-bar{-webkit-box-flex:1;-ms-flex:1;flex:1}.md-timeline.md-timeline-vertical .step-wrapper{width:100%;height:22px;line-height:22px;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;z-index:1}.md-timeline.md-timeline-vertical .step-wrapper .time-wrapper{font-size:13px;width:75px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-right:12px}.md-timeline.md-timeline-vertical .step-wrapper .time-wrapper .name{color:#898989}.md-timeline.md-timeline-vertical .step-wrapper .icon-wrapper{position:relative;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.md-timeline.md-timeline-vertical .step-wrapper .icon-wrapper .step-node-default{min-width:22px;min-height:22px}.md-timeline.md-timeline-vertical .step-wrapper .text-wrapper{left:22px;padding-left:12px}.md-timeline.md-timeline-vertical .step-wrapper .text-wrapper .desc,.md-timeline.md-timeline-vertical .step-wrapper .text-wrapper .name{line-height:22px;white-space:normal;text-align:left}.md-timeline.md-timeline-vertical .step-wrapper .text-wrapper .name{color:#898989;line-height:22px;font-size:16px}.md-timeline.md-timeline-vertical .step-wrapper .text-wrapper .desc{color:#c9c9c9;line-height:16px;font-size:14px}.md-timeline.md-timeline-vertical .step-wrapper.current .text-wrapper .name,.md-timeline.md-timeline-vertical .step-wrapper.current .time-wrapper .name{color:#ef7d00}.md-timeline .icon-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#ef7d00}.md-timeline .icon-wrapper>div{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.md-timeline .icon-wrapper:nth-child(3){display:none}.md-timeline .icon-wrapper .step-node-default-icon{border:1px solid #c9c9c9;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box}.md-timeline .step-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;min-width:22px;min-height:22px}.md-timeline .step-wrapper .icon-wrapper{min-width:22px;min-height:22px}.md-timeline .step-wrapper .icon-wrapper .md-icon{width:22px;height:22px;font-size:22px;line-height:22px}.md-timeline .step-wrapper .text-wrapper .desc,.md-timeline .step-wrapper .text-wrapper .name{white-space:nowrap}.md-timeline .step-wrapper.reached .icon-wrapper .step-node-default-icon{background:#ef7d00;border-color:#ef7d00}.md-timeline .bar{position:relative;background-color:#c9c9c9;overflow:hidden;z-index:0}.md-timeline .bar .bar-inner{z-index:1;position:absolute;top:0;left:0;display:block;content:'';-webkit-transition:all linear 1s;transition:all linear 1s}.md-timeline .bar.horizontal-bar{-webkit-box-flex:1;-ms-flex:1;flex:1;height:1px;margin-left:-8px;margin-right:-8px}.md-timeline .bar.horizontal-bar .bar-inner{width:100%;height:1px;background-color:#ef7d00}.md-timeline .bar.vertical-bar{left:98px;margin-top:-7px;margin-bottom:-7px;width:1px;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.md-timeline .bar.vertical-bar .bar-inner{width:1px;height:100%;background-color:#ef7d00}.md-timeline .bar:last-of-type.horizontal-bar{display:none}.md-timeline .bar:last-of-type.vertical-bar{visibility:hidden;margin:0}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$4 = undefined;
	/* module identifier */

	var __vue_module_identifier__$4 = undefined;
	/* functional template */

	var __vue_is_functional_template__$4 = false;
	/* style inject SSR */

	var Timeline = normalizeComponent_1({
	  render: __vue_render__$4,
	  staticRenderFns: __vue_staticRenderFns__$4
	}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, browser, undefined);

	Timeline.install = function (Vue) {
	  Vue.component(Timeline.name, Timeline);
	};

	Icon.install = function (Vue) {
	  Vue.component(Icon.name, Icon);
	};

	var script$5 = {
	  name: 'md-transition',
	  functional: true,
	  render: function render(h, context) {
	    return h('transition', context.data, context.children);
	  }
	};

	/* script */
	var __vue_script__$5 = script$5;
	/* template */

	/* style */

	var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-16b9dc2b_0", {
	    source: ".md-bounce-enter-active{-webkit-animation:bounce-in .3s linear;animation:bounce-in .3s linear}.md-bounce-leave-active{-webkit-animation:zoom-out 250ms linear;animation:zoom-out 250ms linear}.md-zoom-enter,.md-zoom-leave-to{opacity:.01;-webkit-transform:scale(.75);transform:scale(.75)}.md-zoom-enter-active{-webkit-transition:all .3s cubic-bezier(.215,.61,.355,1);transition:all .3s cubic-bezier(.215,.61,.355,1)}.md-zoom-leave-active{-webkit-transition:all 250ms linear;transition:all 250ms linear}.md-landscape-enter,.md-landscape-leave-to{opacity:.01;-webkit-transform:scale(1.2);transform:scale(1.2)}.md-landscape-enter-active{-webkit-transition:all .3s cubic-bezier(.215,.61,.355,1);transition:all .3s cubic-bezier(.215,.61,.355,1)}.md-landscape-leave-active{-webkit-transition:all 250ms linear;transition:all 250ms linear}.md-punch-enter,.md-punch-leave-to{opacity:.01;-webkit-transform:scale(1.35);transform:scale(1.35)}.md-punch-enter-active{-webkit-transition:all .3s cubic-bezier(.215,.61,.355,1);transition:all .3s cubic-bezier(.215,.61,.355,1)}.md-punch-leave-active{-webkit-transition:all 250ms linear;transition:all 250ms linear}.md-slide-up-enter,.md-slide-up-leave-to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.md-slide-up-enter-active{-webkit-transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1), -webkit-transform .3s cubic-bezier(.165,.84,.44,1)}.md-slide-up-leave-active{-webkit-transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1), -webkit-transform 250ms cubic-bezier(.165,.84,.44,1)}.md-slide-right-enter,.md-slide-right-leave-to{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.md-slide-right-enter-active{-webkit-transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1), -webkit-transform .3s cubic-bezier(.165,.84,.44,1)}.md-slide-right-leave-active{-webkit-transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1), -webkit-transform 250ms cubic-bezier(.165,.84,.44,1)}.md-slide-left-enter,.md-slide-left-leave-to{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.md-slide-left-enter-active{-webkit-transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1), -webkit-transform .3s cubic-bezier(.165,.84,.44,1)}.md-slide-left-leave-active{-webkit-transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1), -webkit-transform 250ms cubic-bezier(.165,.84,.44,1)}.md-slide-down-enter,.md-slide-down-leave-to{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}.md-slide-down-enter-active{-webkit-transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:-webkit-transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1);transition:transform .3s cubic-bezier(.165,.84,.44,1), -webkit-transform .3s cubic-bezier(.165,.84,.44,1)}.md-slide-down-leave-active{-webkit-transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:-webkit-transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1);transition:transform 250ms cubic-bezier(.165,.84,.44,1), -webkit-transform 250ms cubic-bezier(.165,.84,.44,1)}.md-fade-enter,.md-fade-leave-to{opacity:.01}.md-fade-enter-active{-webkit-transition:opacity .3s cubic-bezier(.215,.61,.355,1);transition:opacity .3s cubic-bezier(.215,.61,.355,1)}.md-fade-leave-active{-webkit-transition:opacity 250ms linear;transition:opacity 250ms linear}.md-fade-up-enter,.md-fade-up-leave-to{opacity:.01;-webkit-transform:translate3d(0,20%,0);transform:translate3d(0,20%,0)}.md-fade-up-enter-active{-webkit-transition:all .3s cubic-bezier(.215,.61,.355,1);transition:all .3s cubic-bezier(.215,.61,.355,1)}.md-fade-up-leave-active{-webkit-transition:all 250ms linear;transition:all 250ms linear}.md-fade-down-enter,.md-fade-down-leave-to{opacity:.01;-webkit-transform:translate3d(0,-20%,0);transform:translate3d(0,-20%,0)}.md-fade-down-enter-active{-webkit-transition:all .3s cubic-bezier(.215,.61,.355,1);transition:all .3s cubic-bezier(.215,.61,.355,1)}.md-fade-down-leave-active{-webkit-transition:all 250ms linear;transition:all 250ms linear}.md-fade-right-enter,.md-fade-right-leave-to{opacity:.01;-webkit-transform:translate3d(-20%,0,0);transform:translate3d(-20%,0,0)}.md-fade-right-enter-active{-webkit-transition:all .3s cubic-bezier(.215,.61,.355,1);transition:all .3s cubic-bezier(.215,.61,.355,1)}.md-fade-right-leave-active{-webkit-transition:all 250ms linear;transition:all 250ms linear}.md-fade-left-enter,.md-fade-left-leave-to{opacity:.01;-webkit-transform:translate3d(20%,0,0);transform:translate3d(20%,0,0)}.md-fade-left-enter-active{-webkit-transition:all .3s cubic-bezier(.215,.61,.355,1);transition:all .3s cubic-bezier(.215,.61,.355,1)}.md-fade-left-leave-active{-webkit-transition:all 250ms linear;transition:all 250ms linear}.md-fly-enter-active{-webkit-animation:fly-in .6s;animation:fly-in .6s;-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}.md-fly-leave-active{-webkit-animation:zoom-out 250ms;animation:zoom-out 250ms}@-webkit-keyframes fly-in{0%{opacity:.5;-webkit-transform:scale(.5) translate3d(0,50px,0);transform:scale(.5) translate3d(0,50px,0)}45%{opacity:1;-webkit-transform:scale(1.05) translate3d(0,-50px,0);transform:scale(1.05) translate3d(0,-50px,0)}100%{-webkit-transform:scale(1) translate3d(0,0,0);transform:scale(1) translate3d(0,0,0)}}@keyframes fly-in{0%{opacity:.5;-webkit-transform:scale(.5) translate3d(0,50px,0);transform:scale(.5) translate3d(0,50px,0)}45%{opacity:1;-webkit-transform:scale(1.05) translate3d(0,-50px,0);transform:scale(1.05) translate3d(0,-50px,0)}100%{-webkit-transform:scale(1) translate3d(0,0,0);transform:scale(1) translate3d(0,0,0)}}@-webkit-keyframes bounce-in{0%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes bounce-in{0%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes zoom-out{to{opacity:.01;-webkit-transform:scale(.75);transform:scale(.75)}}@keyframes zoom-out{to{opacity:.01;-webkit-transform:scale(.75);transform:scale(.75)}}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$5 = undefined;
	/* module identifier */

	var __vue_module_identifier__$5 = undefined;
	/* functional template */

	var __vue_is_functional_template__$5 = undefined;
	/* style inject SSR */

	var Transition = normalizeComponent_1({}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, browser, undefined);

	var popupMixin$1 = {
	  props: {
	    value: {
	      type: Boolean,
	      default: false
	    },
	    hasMask: {
	      type: Boolean,
	      default: true
	    },
	    maskClosable: {
	      type: Boolean,
	      default: true
	    }
	  }
	};

	var script$6 = {
	  name: 'md-popup',
	  mixins: [popupMixin$1],
	  components: {
	    'md-transition': Transition
	  },
	  props: {
	    position: {
	      type: String,
	      default: 'center'
	    },
	    transition: {
	      type: String,
	      default: function _default() {
	        switch (this.position) {
	          case 'bottom':
	            return 'md-slide-up';

	          /* istanbul ignore next */

	          case 'top':
	            return 'md-slide-down';

	          /* istanbul ignore next */

	          case 'left':
	            return 'md-slide-right';

	          /* istanbul ignore next */

	          case 'right':
	            return 'md-slide-left';

	          default:
	            return 'md-fade';
	          // fade/fade-bounce/fade-slide/fade-zoom
	        }
	      }
	    },
	    preventScroll: {
	      type: Boolean,
	      default: false
	    },
	    preventScrollExclude: {
	      type: [String, Function],
	      default: function _default() {
	        return '';
	      }
	    } // Mixin Props
	    // value: {
	    //   type: Boolean,
	    //   default: false,
	    // },
	    // hasMask: {
	    //   type: Boolean,
	    //   default: true,
	    // },
	    // maskClosable: {
	    //   type: Boolean,
	    //   default: true,
	    // },

	  },
	  data: function data() {
	    return {
	      // controle popup mask & popup box
	      isPopupShow: false,
	      // controle popup box
	      isPopupBoxShow: false,
	      // transtion lock
	      isAnimation: false
	    };
	  },
	  watch: {
	    value: function value(val) {
	      var _this = this;

	      /* istanbul ignore next */
	      if (val) {
	        if (this.isAnimation) {
	          setTimeout(function () {
	            _this.$_showPopupBox();
	          }, 50);
	        } else {
	          this.$_showPopupBox();
	        }
	      } else {
	        this.$_hidePopupBox();
	      }
	    },
	    preventScrollExclude: function preventScrollExclude(val, oldVal) {
	      // remove old listener before add

	      /* istanbul ignore next */
	      this.$_preventScrollExclude(false, oldVal);
	      /* istanbul ignore next */

	      this.$_preventScrollExclude(true, val);
	    }
	  },
	  mounted: function mounted() {
	    this.value && this.$_showPopupBox();
	  },
	  methods: {
	    // MARK: private methods
	    $_showPopupBox: function $_showPopupBox() {
	      this.isPopupShow = true;
	      this.isAnimation = true; // popup box enter the animation after popup show

	      this.isPopupBoxShow = true;

	      this.preventScroll && this.$_preventScroll(true);
	    },
	    $_hidePopupBox: function $_hidePopupBox() {
	      this.isAnimation = true;
	      this.isPopupBoxShow = false;
	      this.preventScroll && this.$_preventScroll(false);
	      this.$emit('input', false);
	    },
	    $_preventScroll: function $_preventScroll(isBind) {
	      var handler = isBind ? 'addEventListener' : 'removeEventListener';
	      var masker = this.$el.querySelector('.md-popup-mask');
	      var boxer = this.$el.querySelector('.md-popup-box');
	      masker && masker[handler]('touchmove', this.$_preventDefault, false);
	      boxer && boxer[handler]('touchmove', this.$_preventDefault, false);
	      this.$_preventScrollExclude(isBind);
	    },
	    $_preventScrollExclude: function $_preventScrollExclude(isBind, preventScrollExclude) {
	      var handler = isBind ? 'addEventListener' : 'removeEventListener';
	      preventScrollExclude = preventScrollExclude || this.preventScrollExclude;
	      var excluder = preventScrollExclude && typeof preventScrollExclude === 'string' ? this.$el.querySelector(preventScrollExclude) : preventScrollExclude;
	      excluder && excluder[handler]('touchmove', this.$_stopImmediatePropagation, false);
	    },
	    $_preventDefault: function $_preventDefault(event) {
	      event.preventDefault();
	    },
	    $_stopImmediatePropagation: function $_stopImmediatePropagation(event) {
	      /* istanbul ignore next */
	      event.stopImmediatePropagation();
	    },
	    // MARK: event handler
	    $_onPopupTransitionStart: function $_onPopupTransitionStart() {
	      if (!this.isPopupBoxShow) {
	        this.$emit('beforeHide');
	        this.$emit('before-hide');
	      } else {
	        this.$emit('beforeShow');
	        this.$emit('before-show');
	      }
	    },
	    $_onPopupTransitionEnd: function $_onPopupTransitionEnd() {
	      /* istanbul ignore next */
	      if (!this.isAnimation) {
	        return;
	      }
	      /* istanbul ignore next */


	      if (!this.isPopupBoxShow) {
	        // popup hide after popup box finish animation
	        this.isPopupShow = false;
	        this.$emit('hide');
	      } else {
	        this.$emit('show');
	      }
	      /* istanbul ignore next */


	      this.isAnimation = false;
	    },
	    $_onPopupMaskClick: function $_onPopupMaskClick() {
	      if (this.maskClosable) {
	        this.$_hidePopupBox();
	        this.$emit('maskClick');
	      }
	    }
	  }
	};

	/* script */
	var __vue_script__$6 = script$6;
	/* template */

	var __vue_render__$5 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: _vm.isPopupShow,
	      expression: "isPopupShow"
	    }],
	    staticClass: "md-popup",
	    class: [_vm.hasMask ? 'with-mask' : '', _vm.position]
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: _vm.hasMask && _vm.isPopupBoxShow,
	      expression: "hasMask && isPopupBoxShow"
	    }],
	    staticClass: "md-popup-mask",
	    on: {
	      "click": _vm.$_onPopupMaskClick
	    }
	  }), _vm._v(" "), _c('md-transition', {
	    attrs: {
	      "name": _vm.transition
	    },
	    on: {
	      "before-enter": _vm.$_onPopupTransitionStart,
	      "before-leave": _vm.$_onPopupTransitionStart,
	      "after-enter": _vm.$_onPopupTransitionEnd,
	      "after-leave": _vm.$_onPopupTransitionEnd
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: _vm.isPopupBoxShow,
	      expression: "isPopupBoxShow"
	    }],
	    staticClass: "md-popup-box",
	    class: [_vm.transition]
	  }, [_vm._t("default")], 2)])], 1);
	};

	var __vue_staticRenderFns__$5 = [];
	/* style */

	var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-ed0a3818_0", {
	    source: "body{font-family:Helvetica,\"微软雅黑\",\"Helvetica Neue\",\"Microsoft YaHei\",\"PingFang SC\",\"Hiragino Sans GB\",Arial,sans-serif;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li,ol{list-style:none}.md-popup{top:0;right:0;bottom:0;left:0;position:fixed;display:-webkit-box;display:-ms-flexbox;display:flex;pointer-events:none;z-index:1000}.md-popup.center{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.md-popup.top{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.md-popup.top .md-popup-box{width:100%}.md-popup.bottom{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.md-popup.bottom .md-popup-box{width:100%}.md-popup.left{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.md-popup.left .md-popup-box{height:100%}.md-popup.right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.md-popup.right .md-popup-box{height:100%}.md-popup.inner-popup .md-popup-box{background-color:#fff;border-radius:8px 8px 0 0}.md-popup-mask{top:0;right:0;bottom:0;left:0;position:absolute;pointer-events:auto;z-index:1;background-color:rgba(0,0,0,.8)}.md-popup-box{position:relative;pointer-events:auto;z-index:2;max-width:100%;max-height:100%;overflow:auto}.md-mask-fade-enter,.md-mask-fade-leave-to{opacity:.01}.md-mask-fade-enter-active,.md-mask-fade-leave-active{-webkit-transition:opacity 250ms;transition:opacity 250ms}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$6 = undefined;
	/* module identifier */

	var __vue_module_identifier__$6 = undefined;
	/* functional template */

	var __vue_is_functional_template__$6 = false;
	/* style inject SSR */

	var Popup = normalizeComponent_1({
	  render: __vue_render__$5,
	  staticRenderFns: __vue_staticRenderFns__$5
	}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, browser, undefined);

	var util = {
	  createNativeViewPatches: function createNativeViewPatches() {
	    var patches = [{
	      name: 'offsetTopPatch',
	      style: {
	        top: '0px',
	        left: '0px',
	        width: '100%',
	        height: this.getCurrentWebviewOffsetTop() + 'px'
	      }
	    }, {
	      name: 'titleSpacePatch',
	      style: {
	        top: this.getCurrentWebviewOffsetTop() + 'px',
	        left: '0px',
	        width: '100%',
	        height: this.getCurrentWebviewTitleTop() + 'px'
	      }
	    }, {
	      name: 'offsetBottomPatch',
	      style: {
	        bottom: '0px',
	        left: '0px',
	        width: '100%',
	        height: this.getCurrentWebviewOffsetBottom() + 'px'
	      }
	    }];
	    return patches.map(function (patch) {
	      return new window.plus.nativeObj.View(patch.name, patch.style);
	    });
	  },
	  destoryNativeViewPatches: function destoryNativeViewPatches() {
	    var patches = ['offsetTopPatch', 'titleSpacePatch', 'offsetBottomPatch'];
	    patches.forEach(function (patch) {
	      var view = window.plus.nativeObj.View.getViewById(patch);
	      view && view.close();
	    });
	  },

	  /**
	   * @function 获取当前webview中原生头、h5头、状态栏高度总和
	   * title缺失=原生头高度+分割线高度+statusbar高度
	   * 无原生头时，title缺失=状态栏高度+header元素高度
	   */
	  getCurrentWebviewTitleTop: function getCurrentWebviewTitleTop() {
	    var nativeTitleStyle = window.plus.webview.currentWebview().getStyle().titleNView;

	    var nativeTitleHeight = _parseInt$2(nativeTitleStyle.height, 10);

	    var nativeTitleTotalHeight = 0; // hbuilder有个bug，子页面的statusbar不显示，所以子页面不加statusbar的高度

	    if (!window.plus.webview.currentWebview().parent()) {
	      var statusbarHeight = _parseInt$2(window.plus.navigator.getStatusbarHeight(), 10);

	      nativeTitleTotalHeight += statusbarHeight;
	    } // 有原生头


	    if (nativeTitleHeight > 0) {
	      nativeTitleTotalHeight += nativeTitleHeight;

	      if (nativeTitleStyle.splitLine && nativeTitleStyle.splitLine.height) {
	        nativeTitleTotalHeight += _parseInt$2(nativeTitleStyle.splitLine.height, 10);
	      }
	    } // 没有原生头，h5的header+statusbar
	    else {
	        var headerElementHeight = 0;
	        var headerElement = document.querySelector('header');

	        if (headerElement) {
	          headerElementHeight = _parseInt$2(getComputedStyle(headerElement).height || 0, 10);
	        }

	        nativeTitleTotalHeight += headerElementHeight;
	      }

	    return nativeTitleTotalHeight;
	  },

	  /**
	   * @function 获取当前webview距离屏幕顶部距离
	   *
	   */
	  getCurrentWebviewOffsetTop: function getCurrentWebviewOffsetTop() {
	    var style = window.plus.webview.currentWebview().getStyle();
	    return _parseInt$2(style.top || 0, 10);
	  },

	  /**
	   * @function 获取当前webview距离屏幕底部距离
	   *
	   */
	  getCurrentWebviewOffsetBottom: function getCurrentWebviewOffsetBottom() {
	    var style = window.plus.webview.currentWebview().getStyle();
	    return _parseInt$2(style.bottom || 0, 10);
	  }
	};

	var _components;
	var script$7 = {
	  name: 'md-landscape',
	  components: (_components = {}, _defineProperty(_components, Popup.name, Popup), _defineProperty(_components, Icon.name, Icon), _components),
	  props: {
	    value: {
	      type: Boolean,
	      default: false
	    },
	    scroll: {
	      type: Boolean,
	      default: false
	    },
	    fullScreen: {
	      type: Boolean,
	      default: false
	    },
	    appMaskFullScreen: {
	      type: Boolean,
	      default: true
	    },
	    hasMask: {
	      type: Boolean,
	      default: true
	    },
	    maskClosable: {
	      type: Boolean,
	      default: false
	    },
	    title: {
	      type: String,
	      default: '提示'
	    },
	    content: {
	      type: String,
	      default: ''
	    }
	  },
	  data: function data() {
	    return {
	      isLandscapeShow: this.value
	    };
	  },
	  watch: {
	    value: function value(val) {
	      var _this = this;

	      this.isLandscapeShow = val;

	      if (window.plus) {
	        if (val) {
	          var patches = util.createNativeViewPatches();
	          patches.forEach(function (patch) {
	            if (_this.fullScreen) {
	              patch.setStyle({
	                backgroundColor: '#ffffff'
	              });
	            } else {
	              patch.setStyle({
	                backgroundColor: '#000000',
	                opacity: 0.8
	              });
	            }

	            patch.show();
	          });
	        } else {
	          util.destoryNativeViewPatches();
	        }
	      }
	    }
	  },
	  computed: {
	    fullScreenWrapperStyle: function fullScreenWrapperStyle() {
	      var padding = {
	        top: 95,
	        bottom: 70
	      };

	      if (window.plus && this.fullScreen) {
	        var statusBarHeight = _parseInt$2(window.plus.navigator.getStatusbarHeight(), 10);

	        var titleNViewStyle = window.plus.webview.currentWebview().getStyle().titleNView;

	        var titleNViewHeight = _parseInt$2(titleNViewStyle.height || 0, 10);

	        if (titleNViewStyle.splitLine && titleNViewStyle.splitLine.height) {
	          titleNViewHeight += _parseInt$2(titleNViewStyle.splitLine.height, 10);
	        }

	        padding.top -= statusBarHeight + titleNViewHeight;

	        var bottomHeight = _parseInt$2(window.plus.webview.currentWebview().getStyle().bottom || 0, 10);

	        padding.bottom -= bottomHeight;
	      }

	      return {
	        'padding-top': padding.top + 'px',
	        'padding-bottom': padding.bottom + 'px'
	      };
	    }
	  },
	  methods: {
	    // MARK: private methods
	    $_close: function $_close() {
	      this.isLandscapeShow = false;
	    }
	  }
	};

	/* script */
	var __vue_script__$7 = script$7;
	/* template */

	var __vue_render__$6 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "md-landscape",
	    class: {
	      'is-full': _vm.fullScreen
	    }
	  }, [_c('md-popup', {
	    attrs: {
	      "mask-closable": _vm.maskClosable,
	      "prevent-scroll": "",
	      "prevent-scroll-exclude": ".md-landscape-content-slot-content",
	      "has-mask": !_vm.fullScreen && _vm.hasMask,
	      "transition": _vm.fullScreen ? 'md-landscape' : 'md-punch'
	    },
	    on: {
	      "input": function input($event) {
	        return _vm.$emit('input', false);
	      },
	      "show": function show($event) {
	        return _vm.$emit('show');
	      },
	      "hide": function hide($event) {
	        return _vm.$emit('hide');
	      }
	    },
	    model: {
	      value: _vm.isLandscapeShow,
	      callback: function callback($$v) {
	        _vm.isLandscapeShow = $$v;
	      },
	      expression: "isLandscapeShow"
	    }
	  }, [_vm.fullScreen ? [_c('div', {
	    staticClass: "md-landscape-body",
	    class: {
	      scroll: _vm.scroll
	    },
	    style: _vm.fullScreenWrapperStyle
	  }, [_c('div', {
	    staticClass: "md-landscape-content-full-title"
	  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
	    staticClass: "md-landscape-content-full-content"
	  }, [_vm._t("content"), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.content))])], 2), _vm._v(" "), _c('md-icon', {
	    staticClass: "md-landscape-close dark",
	    attrs: {
	      "size": "md",
	      "name": "close-circle"
	    },
	    on: {
	      "click": _vm.$_close
	    }
	  })], 1)] : [_c('div', {
	    staticClass: "md-landscape-content"
	  }, [_c('div', {
	    staticClass: "md-landscape-body",
	    class: {
	      scroll: _vm.scroll
	    }
	  }, [_c('div', {
	    staticClass: "md-landscape-content-slot-header"
	  }, [_vm._t("header")], 2), _vm._v(" "), _c('div', {
	    staticClass: "md-landscape-content-slot-content"
	  }, [_vm._t("content")], 2), _vm._v(" "), _c('div', {
	    staticClass: "md-landscape-content-slot-footer"
	  }, [_vm._t("footer")], 2)]), _vm._v(" "), _c('md-icon', {
	    staticClass: "md-landscape-close",
	    attrs: {
	      "name": "close-circle"
	    },
	    on: {
	      "click": _vm.$_close
	    }
	  })], 1)]], 2)], 1);
	};

	var __vue_staticRenderFns__$6 = [];
	/* style */

	var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-066cc2ba_0", {
	    source: "body{font-family:Helvetica,\"微软雅黑\",\"Helvetica Neue\",\"Microsoft YaHei\",\"PingFang SC\",\"Hiragino Sans GB\",Arial,sans-serif;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}li,ol{list-style:none}.md-landscape.is-full .md-popup-box{position:absolute;top:0;right:0;bottom:0;left:0}.md-landscape.is-full .md-landscape-body{color:#333;width:100%;height:100%;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 35px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.md-landscape.is-full .md-landscape-body .md-landscape-content-full-title{font-size:20px;font-weight:700;padding-bottom:15px;border-bottom:1px solid #898989;margin-bottom:15px;width:100%}.md-landscape.is-full .md-landscape-body .md-landscape-content-full-content{font-size:14px;-webkit-box-flex:1;-ms-flex:1;flex:1;width:100%}.md-landscape.is-full .md-landscape-content{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.md-landscape .md-popup,.md-landscape .md-popup-box{z-index:1700}.md-landscape:not(.is-full) .md-popup-box{overflow:visible}.md-landscape:not(.is-full) .md-landscape-content{width:286px;position:relative}.md-landscape:not(.is-full) .md-landscape-content .md-landscape-body{background:#fff;border-radius:12px;overflow:hidden}.md-landscape:not(.is-full) .md-landscape-content .md-landscape-body .md-landscape-content-slot-header{margin-bottom:20px}.md-landscape:not(.is-full) .md-landscape-content .md-landscape-body .md-landscape-content-slot-content{height:166px;font-size:13px;color:#333;line-height:22px;margin:0 10px;padding:0 10px;overflow-y:auto;-webkit-overflow-scrolling:touch}.md-landscape:not(.is-full) .md-landscape-content .md-icon.md-landscape-close{position:absolute;right:0;top:-50px;width:30px;height:30px;font-size:30px}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$7 = undefined;
	/* module identifier */

	var __vue_module_identifier__$7 = undefined;
	/* functional template */

	var __vue_is_functional_template__$7 = false;
	/* style inject SSR */

	var landscape = normalizeComponent_1({
	  render: __vue_render__$6,
	  staticRenderFns: __vue_staticRenderFns__$6
	}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, browser, undefined);

	landscape.install = function (Vue) {
	  Vue.component(landscape.name, landscape);
	};

	var mand = {
	  timeline: Timeline,
	  icon: Icon,
	  landscape: landscape
	};

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes$1(true);

	_export$1(_export$1.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) { throw TypeError('String#' + NAME + " doesn't accept regex!"); }
	  return String(_defined$1(that));
	};

	var MATCH$1 = _wks$1('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export$1(_export$1.P + _export$1.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	function _arrayWithHoles(arr) {
	  if (isArray$1(arr)) { return arr; }
	}

	var core_getIterator = _core.getIterator = function (it) {
	  var iterFn = core_getIteratorMethod(it);
	  if (typeof iterFn != 'function') { throw TypeError(it + ' is not iterable!'); }
	  return _anObject(iterFn.call(it));
	};

	var getIterator = core_getIterator;

	var getIterator$1 = getIterator;

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = getIterator$1(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) { break; }
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) { _i["return"](); }
	    } finally {
	      if (_d) { throw _e; }
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) { if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	var entries$1 = entries;

	//
	//
	//
	//
	//
	//
	//
	//
	var script$8 = {
	  name: 'Marquee',
	  props: {
	    text: {
	      type: String,
	      default: ''
	    },
	    loop: {
	      type: Boolean,
	      default: true
	    },
	    leading: {
	      type: Number,
	      default: 1000
	    },
	    trailing: {
	      type: Number,
	      default: 1000
	    },
	    fps: {
	      type: Number,
	      default: 60
	    }
	  },
	  data: function data() {
	    return {
	      timer: 0,
	      animateWidth: 0,
	      overflowWidth: 0,
	      overflow: false
	    };
	  },
	  computed: {
	    /**
	     * @return {number}
	     */
	    TIMEOUT: function TIMEOUT() {
	      return 1 / this.fps * 1000;
	    }
	  },
	  updated: function updated() {
	    this.measureText();

	    if (!this.timer) {
	      this.startAnimate();
	    }
	  },
	  mounted: function mounted() {
	    this.measureText();
	    this.startAnimate();
	  },
	  methods: {
	    startAnimate: function startAnimate() {
	      if (this.timer) {
	        clearTimeout(this.timer);
	      }

	      var isLeading = this.animateWidth === 0;
	      var timeout = isLeading ? this.leading : this.TIMEOUT;

	      if (this.overflowWidth !== 0) {
	        this.timer = window.setTimeout(this.animate, timeout);
	      }
	    },
	    animate: function animate() {
	      var _this = this;

	      var overflowWidth = this.overflowWidth;
	      var animateWidth = this.animateWidth + 1;
	      var isRoundOver = animateWidth > overflowWidth;

	      if (isRoundOver) {
	        if (!this.loop) {
	          return;
	        }

	        animateWidth = 0;
	      }

	      if (isRoundOver && this.trailing) {
	        this.timer = window.setTimeout(function () {
	          _this.animateWidth = animateWidth;
	          _this.timer = window.setTimeout(_this.animate, _this.leading || _this.TIMEOUT);
	        }, this.trailing);
	      } else {
	        this.animateWidth = animateWidth;
	        this.timer = window.setTimeout(this.animate, this.TIMEOUT);
	      }
	    },
	    measureText: function measureText() {
	      var _this$$refs = this.$refs,
	          wrapper = _this$$refs.wrapper,
	          content = _this$$refs.content;

	      if (!wrapper || !content) {
	        return;
	      }

	      this.overflowWidth = content.clientWidth - wrapper.clientWidth;
	    }
	  }
	};

	/* script */
	var __vue_script__$8 = script$8;
	/* template */

	var __vue_render__$7 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    ref: "wrapper",
	    staticClass: "marquee-wrapper"
	  }, [_c('div', {
	    ref: "content",
	    staticClass: "marquee-content",
	    style: {
	      position: 'relative',
	      right: _vm.animateWidth + 'px'
	    }
	  }, [_vm._v("\n    " + _vm._s(_vm.text) + "\n  ")])]);
	};

	var __vue_staticRenderFns__$7 = [];
	/* style */

	var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-667344a6_0", {
	    source: ".marquee-wrapper[data-v-667344a6]{overflow:hidden}.marquee-content[data-v-667344a6]{display:inline-block;white-space:nowrap}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$8 = "data-v-667344a6";
	/* module identifier */

	var __vue_module_identifier__$8 = undefined;
	/* functional template */

	var __vue_is_functional_template__$8 = false;
	/* style inject SSR */

	var marquee = normalizeComponent_1({
	  render: __vue_render__$7,
	  staticRenderFns: __vue_staticRenderFns__$7
	}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, browser, undefined);

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(5);
	var KEY$1 = 'find';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) { Array(1)[KEY$1](function () { forced$1 = false; }); }
	_export$1(_export$1.P + _export$1.F * forced$1, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var Enum = {
	  CARD_TYPE: [{
	    value: 1,
	    alias: 'IClassCard',
	    text: '储蓄卡'
	  }, {
	    value: 2,
	    alias: 'IIClassCard',
	    text: 'II类户'
	  }, {
	    value: 3,
	    alias: 'IIIClassCard',
	    text: 'III类户'
	  }]
	};

	var filters = {
	  stringUtil: {
	    trim: function trim(s) {
	      if (!s) {
	        return '';
	      }

	      return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	    },
	    pascalize: function pascalize(s) {
	      if (!s) {
	        return '';
	      }

	      s = s + '';

	      if (/^[A-Z\s-\/_]+$/.test(s)) {
	        s = s.toLowerCase();
	      }

	      s = s.replace(/[\s-\/_]+(.)/g, function (w, c) {
	        return c.toUpperCase();
	      });
	      s = s.charAt(0).toUpperCase() + s.slice(1);
	      return s;
	    },
	    camelize: function camelize(s) {
	      if (!s) {
	        return '';
	      }

	      s = this.pascalize(s);
	      return s.charAt(0).toLowerCase() + s.slice(1);
	    },
	    dasherize: function dasherize(s) {
	      if (!s) {
	        return '';
	      }

	      s = this.pascalize(s);
	      s = s.replace(/[A-Z]{2,}$/g, function (match) {
	        return match.charAt(0) + match.slice(1).toLowerCase();
	      });
	      s = s.replace(/[A-Z]{2,}/g, function (match) {
	        return match.charAt(0) + match.slice(1, -1).toLowerCase() + match.charAt(match.length - 1);
	      });
	      s = s.replace(/[A-Z]/g, function (match) {
	        return '-' + match.toLowerCase();
	      });

	      if (s.charAt(0) === '-') {
	        s = s.substring(1);
	      }

	      return s;
	    },
	    constlize: function constlize(s) {
	      if (!s) {
	        return '';
	      }

	      s = this.dasherize(s).replace(/-/g, '_');
	      return s.toUpperCase();
	    },
	    pluralize: function pluralize(s) {
	      if (!s) {
	        return '';
	      }

	      return s.replace(/y$/, 'ie') + 's';
	    },
	    pad: function pad(s, padding, length) {
	      s = (!s ? '' : s) + '';
	      var padLength = length - s.length;

	      if (padLength > 0) {
	        var left = new Array(padLength + 1).join(padding);
	        return left + s;
	      }

	      return s;
	    },
	    padRight: function padRight(s, padding, length) {
	      s = (!s ? '' : s) + '';
	      var padLength = length - s.length;

	      if (padLength > 0) {
	        var right = new Array(padLength + 1).join(padding);
	        return s + right;
	      }

	      return s;
	    }
	  },
	  formatNumber: function formatNumber(number, decimals) {
	    var emptyValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	    var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	    if (typeof decimals !== 'number') {
	      prefix = emptyValue;
	      emptyValue = decimals;
	      decimals = 2;
	    }

	    if (!number || isNaN(number)) {
	      return prefix + emptyValue;
	    }

	    number = _parseFloat$2(number).toFixed(decimals);
	    var parts = number.split('.');
	    var integer = parts[0];
	    var decimal = parts[1];
	    integer = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	    var result = prefix + integer;

	    if (decimal) {
	      result += '.' + decimal;
	    }

	    return result;
	  },
	  cardTypeText: function cardTypeText(value) {
	    var CARD_TYPE = Enum.CARD_TYPE;
	    var type = CARD_TYPE.find(function (item) {
	      return item.value === _parseInt$2(value, 10);
	    });

	    if (type) {
	      return type.text;
	    }

	    return '未知';
	  },
	  cardSuffix4: function cardSuffix4(cardNo) {
	    return cardNo.substring(cardNo.length - 4);
	  },
	  cardNumberSplit: function cardNumberSplit(cardNo) {
	    if (/\s/.test(cardNo)) {
	      return cardNo;
	    }

	    return cardNo.replace(/(\d{4})/g, '$1 ');
	  },
	  cardNumberMask: function cardNumberMask(cardNo) {
	    if (!cardNo || cardNo.length <= 8) {
	      return cardNo;
	    }

	    var mask = ' **** **** ';
	    return cardNo.replace(/^\d{4}(\d+)\d{4}$/g, function (match, segment, offset, string) {
	      return string.replace(segment, mask);
	    });
	  }
	};

	var _components$1;
	Vue.use(Picker);

	entries$1(filters).forEach(function (_ref) {
	  var _ref2 = _slicedToArray(_ref, 2),
	      key = _ref2[0],
	      filter = _ref2[1];

	  Vue.filter(key, filter);
	});

	var _defaultBankName = '包商银行';
	var _defaultAmoutUnit = '元';
	var script$9 = {
	  name: 'CardCell',
	  components: (_components$1 = {}, _defineProperty(_components$1, Icon.name, Icon), _defineProperty(_components$1, marquee.name, marquee), _components$1),
	  props: {
	    // 是否可切卡
	    isSwitchable: {
	      type: Boolean,
	      default: true
	    },

	    /**
	     * 布局样式，可选full|compact-display|compact-action|simple|mini
	     * full
	     * ---------------------------
	     * | 签约账户  储蓄卡 尾号8888 |
	     * | 可用额度  123456789012元 |
	     * ---------------------------
	     *
	     * compact-display
	     * ---------------------------
	     * | 储蓄卡                   |
	     * | 8888 **** **** 8888     |
	     * ---------------------------
	     *
	     * compact-action
	     * ---------------------------
	     * | 赎回至                   |
	     * | 储蓄卡 尾号8888          |
	     * ---------------------------
	     *
	     * simple
	     * ---------------------------
	     * | 包商银行储蓄卡   尾号8888 |
	     * ---------------------------
	     *
	     * mini
	     * ---------------------------
	     * | 储蓄卡 尾号8888          |
	     * ---------------------------
	     */
	    layout: {
	      type: String,
	      default: 'full'
	    },
	    // full模式下账户类型的名称
	    accountTitle: {
	      type: String,
	      default: '交易账户'
	    },
	    // 余额显示为可用余额，默认账户余额
	    isAvailableBalanceView: {
	      type: Boolean,
	      default: false
	    },
	    // 资金流入时使用，不显示卡相关金额，显示外部传入金额
	    isIncomeAmountView: {
	      type: Boolean,
	      default: false
	    },
	    // 账户余额显示文案
	    balanceText: {
	      type: String,
	      default: '账户余额'
	    },
	    // 可用余额显示文案
	    availableBalanceText: {
	      type: String,
	      default: '可用余额'
	    },
	    // 资金流入时金额标题
	    incomeAmountTitle: {
	      type: String,
	      default: '可提现金额'
	    },
	    // 资金流入时的金额
	    incomeAmount: {
	      type: String,
	      default: '--'
	    },
	    // 资金流入时的金额单元
	    incomeAmountUnit: {
	      type: String,
	      default: _defaultAmoutUnit
	    },
	    // compact-action时的操作标题
	    actionTitle: {
	      type: String,
	      default: '赎回至'
	    },

	    /**
	     * 数据
	     * @type string cardNo 卡号
	     * @type string balance 账户余额
	     * @type string availableBalance 可用余额
	     * @type number cardType 1储蓄卡 2II类卡 3III类卡
	     * @type string unit 金额单元默认元
	     * @type string bankName 银行名称默认包商银行
	     * @type string bankLogoSrc 银行logo src地址
	     */
	    list: {
	      type: Array,
	      default: Array
	    },
	    // 选中的索引
	    selectedIndex: {
	      type: Number,
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      cardIndex: this.selectedIndex,
	      picker: null
	    };
	  },
	  computed: {
	    defaultBankName: function defaultBankName() {
	      return _defaultBankName;
	    },
	    defaultAmoutUnit: function defaultAmoutUnit() {
	      return _defaultAmoutUnit;
	    },
	    singleLineLayout: function singleLineLayout() {
	      return ['simple', 'mini'].includes(this.layout);
	    },
	    selectedCard: function selectedCard() {
	      return this.list[this.cardIndex];
	    }
	  },
	  methods: {
	    showPicker: function showPicker() {
	      if (!this.isSwitchable) {
	        return;
	      }

	      if (!this.picker) {
	        this.picker = this.$createPicker({
	          data: [this.list.map(function (item) {
	            return {
	              value: item.cardNo,
	              text: filters.cardNumberMask(item.cardNo)
	            };
	          })],
	          onSelect: this.selectHandler,
	          onCancel: this.cancelHandler
	        });
	      }

	      this.picker.show();
	    },
	    selectHandler: function selectHandler(value, index) {
	      this.cardIndex = index[0];
	    },
	    cancelHandler: function cancelHandler() {//
	    }
	  }
	};

	/* script */
	var __vue_script__$9 = script$9;
	/* template */

	var __vue_render__$8 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    class: ['card-cell', {
	      'single-line': _vm.singleLineLayout,
	      interactive: _vm.isSwitchable
	    }],
	    on: {
	      "click": _vm.showPicker
	    }
	  }, [_c('div', {
	    staticClass: "card-cell-logo"
	  }, [_vm.selectedCard.bankLogoSrc ? [_c('img', {
	    attrs: {
	      "src": _vm.selectedCard.bankLogoSrc,
	      "alt": ""
	    }
	  })] : [_c('md-icon', {
	    attrs: {
	      "name": "bsb-logo",
	      "size": _vm.singleLineLayout ? 'sm' : 'lg'
	    }
	  })]], 2), _vm._v(" "), _c('div', {
	    staticClass: "card-cell-content"
	  }, [_vm.layout === 'full' ? [_c('div', {
	    staticClass: "content-row"
	  }, [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v(_vm._s(_vm.accountTitle))]), _vm._v(" "), _c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v("\n          " + _vm._s(_vm._f("cardTypeText")(_vm.selectedCard.cardType)) + " 尾号" + _vm._s(_vm._f("cardSuffix4")(_vm.selectedCard.cardNo)) + "\n        ")])]), _vm._v(" "), _c('div', {
	    staticClass: "content-row"
	  }, [_vm.isIncomeAmountView ? [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v(_vm._s(_vm.incomeAmountTitle))]), _vm._v(" "), _c('div', {
	    staticClass: "content-cell"
	  }, [_c('span', {
	    staticClass: "card-cell-amount"
	  }, [_vm._v(_vm._s(_vm.incomeAmount))]), _c('span', [_vm._v("\n              " + _vm._s(_vm.incomeAmountUnit || _vm.defaultAmoutUnit))])])] : [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v(_vm._s(_vm.isAvailableBalanceView ? _vm.availableBalanceText : _vm.balanceText))]), _vm._v(" "), _c('div', {
	    staticClass: "content-cell"
	  }, [_c('span', {
	    staticClass: "card-cell-amount"
	  }, [_vm._v("\n              " + _vm._s(_vm._f("formatNumber")(_vm.isAvailableBalanceView ? _vm.selectedCard.availableBalance : _vm.selectedCard.balance)) + "\n            ")]), _c('span', [_vm._v(_vm._s(_vm.selectedCard.unit || _vm.defaultAmoutUnit))])])]], 2)] : _vm._e(), _vm._v(" "), _vm.layout === 'compact-display' ? [_c('div', {
	    staticClass: "content-row"
	  }, [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v(_vm._s(_vm._f("cardTypeText")(_vm.selectedCard.cardType)))])]), _vm._v(" "), _c('div', {
	    staticClass: "content-row"
	  }, [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v(_vm._s(_vm._f("cardNumberMask")(_vm.selectedCard.cardNo)))])])] : _vm._e(), _vm._v(" "), _vm.layout === 'compact-action' ? [_c('div', {
	    staticClass: "content-row"
	  }, [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v(_vm._s(_vm.actionTitle))])]), _vm._v(" "), _c('div', {
	    staticClass: "content-row"
	  }, [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v("\n          " + _vm._s(_vm._f("cardTypeText")(_vm.selectedCard.cardType)) + " 尾号" + _vm._s(_vm._f("cardSuffix4")(_vm.selectedCard.cardNo)) + "\n        ")])])] : _vm._e(), _vm._v(" "), _vm.layout === 'simple' ? [_c('div', {
	    staticClass: "content-row spacing-between"
	  }, [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v("\n          " + _vm._s(_vm.selectedCard.bankName || _vm.defaultBankName) + _vm._s(_vm._f("cardTypeText")(_vm.selectedCard.cardType)) + "\n        ")]), _vm._v(" "), _c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v("\n          尾号" + _vm._s(_vm._f("cardSuffix4")(_vm.selectedCard.cardNo)) + "\n        ")])])] : _vm._e(), _vm._v(" "), _vm.layout === 'mini' ? [_c('div', {
	    staticClass: "content-row"
	  }, [_c('div', {
	    staticClass: "content-cell"
	  }, [_vm._v("\n          " + _vm._s(_vm._f("cardTypeText")(_vm.selectedCard.cardType)) + " 尾号" + _vm._s(_vm._f("cardSuffix4")(_vm.selectedCard.cardNo)) + "\n        ")])])] : _vm._e()], 2), _vm._v(" "), _vm.isSwitchable ? _c('div', {
	    staticClass: "card-cell-arrow"
	  }, [_c('md-icon', {
	    attrs: {
	      "name": "arrow-right",
	      "size": "xs"
	    }
	  })], 1) : _vm._e()]);
	};

	var __vue_staticRenderFns__$8 = [];
	/* style */

	var __vue_inject_styles__$9 = function __vue_inject_styles__(inject) {
	  if (!inject) { return; }
	  inject("data-v-7f1382f5_0", {
	    source: ".card-cell[data-v-7f1382f5]{color:#333;font-size:16px;line-height:1;background:#fff;padding:22px 17px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.card-cell.interactive[data-v-7f1382f5]:active{background:#f4f4f4}.card-cell .card-cell-logo[data-v-7f1382f5]{width:40px;height:40px;border-radius:50%;border:1px solid #e8e8e8;background:#f9f9f9;-webkit-box-sizing:border-box;box-sizing:border-box}.card-cell .card-cell-content[data-v-7f1382f5]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-left:12px;height:40px}.card-cell.single-line[data-v-7f1382f5]{padding:10px 17px}.card-cell.single-line .card-cell-logo[data-v-7f1382f5]{width:28px;height:28px}.card-cell.single-line .card-cell-content[data-v-7f1382f5]{height:28px;margin-left:7px}.card-cell.single-line .content-row[data-v-7f1382f5]{height:28px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.card-cell.single-line .content-row.spacing-between[data-v-7f1382f5]{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.card-cell .content-row[data-v-7f1382f5]{display:-webkit-box;display:-ms-flexbox;display:flex}.card-cell .content-row+.content-row[data-v-7f1382f5]{margin-top:8px}.card-cell .content-row .content-cell[data-v-7f1382f5]{display:-webkit-box;display:-ms-flexbox;display:flex}.card-cell .content-row .content-cell .card-cell-amount[data-v-7f1382f5]{color:#4fc0f5}.card-cell .content-row .content-cell+.content-cell[data-v-7f1382f5]{margin-left:15px}.card-cell .card-cell-arrow[data-v-7f1382f5]{width:20px;height:20px;color:#c8c8c8}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$9 = "data-v-7f1382f5";
	/* module identifier */

	var __vue_module_identifier__$9 = undefined;
	/* functional template */

	var __vue_is_functional_template__$9 = false;
	/* style inject SSR */

	var cardCell = normalizeComponent_1({
	  render: __vue_render__$8,
	  staticRenderFns: __vue_staticRenderFns__$8
	}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, browser, undefined);

	var fastclick = createCommonjsModule(function (module) {
	(function () {

		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */

		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/


		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;


			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;


			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;


			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;


			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;


			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;


			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;


			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;

			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;

			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}


			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}

			return (/\bneedsclick\b/).test(target.className);
		};


		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};


		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function(targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};


		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};


		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};


		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};


		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};


		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};


		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};


		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};


		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};


		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};


		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};


		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};


		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};


		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};


		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};


		if (module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());
	});
	var fastclick_1 = fastclick.FastClick;

	if ('addEventListener' in document) {
	  document.addEventListener('DOMContentLoaded', function () {
	    fastclick(document.body);
	  }, false);
	}

	var entry = assign$1({
	  cardCell: cardCell,
	  marquee: marquee
	}, mand, cube);

	return entry;

}));
