(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Carto = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":2}],2:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/es6.string.iterator');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.promise');
module.exports = _dereq_('../modules/_core').Promise;
},{"../modules/_core":10,"../modules/es6.object.to-string":62,"../modules/es6.promise":63,"../modules/es6.string.iterator":64,"../modules/web.dom.iterable":65}],3:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],4:[function(_dereq_,module,exports){
module.exports = function(){ /* empty */ };
},{}],5:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],6:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":27}],7:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_('./_to-iobject')
  , toLength  = _dereq_('./_to-length')
  , toIndex   = _dereq_('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":52,"./_to-iobject":54,"./_to-length":55}],8:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_('./_cof')
  , TAG = _dereq_('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":9,"./_wks":59}],9:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],10:[function(_dereq_,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],11:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":3}],12:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],13:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":17}],14:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object')
  , document = _dereq_('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":19,"./_is-object":27}],15:[function(_dereq_,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],16:[function(_dereq_,module,exports){
var global    = _dereq_('./_global')
  , core      = _dereq_('./_core')
  , ctx       = _dereq_('./_ctx')
  , hide      = _dereq_('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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
module.exports = $export;
},{"./_core":10,"./_ctx":11,"./_global":19,"./_hide":21}],17:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],18:[function(_dereq_,module,exports){
var ctx         = _dereq_('./_ctx')
  , call        = _dereq_('./_iter-call')
  , isArrayIter = _dereq_('./_is-array-iter')
  , anObject    = _dereq_('./_an-object')
  , toLength    = _dereq_('./_to-length')
  , getIterFn   = _dereq_('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":6,"./_ctx":11,"./_is-array-iter":26,"./_iter-call":28,"./_to-length":55,"./core.get-iterator-method":60}],19:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],20:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],21:[function(_dereq_,module,exports){
var dP         = _dereq_('./_object-dp')
  , createDesc = _dereq_('./_property-desc');
module.exports = _dereq_('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":13,"./_object-dp":37,"./_property-desc":42}],22:[function(_dereq_,module,exports){
module.exports = _dereq_('./_global').document && document.documentElement;
},{"./_global":19}],23:[function(_dereq_,module,exports){
module.exports = !_dereq_('./_descriptors') && !_dereq_('./_fails')(function(){
  return Object.defineProperty(_dereq_('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":13,"./_dom-create":14,"./_fails":17}],24:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],25:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":9}],26:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_('./_iterators')
  , ITERATOR   = _dereq_('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":33,"./_wks":59}],27:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],28:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":6}],29:[function(_dereq_,module,exports){
'use strict';
var create         = _dereq_('./_object-create')
  , descriptor     = _dereq_('./_property-desc')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_('./_hide')(IteratorPrototype, _dereq_('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":21,"./_object-create":36,"./_property-desc":42,"./_set-to-string-tag":46,"./_wks":59}],30:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_('./_library')
  , $export        = _dereq_('./_export')
  , redefine       = _dereq_('./_redefine')
  , hide           = _dereq_('./_hide')
  , has            = _dereq_('./_has')
  , Iterators      = _dereq_('./_iterators')
  , $iterCreate    = _dereq_('./_iter-create')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , getPrototypeOf = _dereq_('./_object-gpo')
  , ITERATOR       = _dereq_('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":16,"./_has":20,"./_hide":21,"./_iter-create":29,"./_iterators":33,"./_library":34,"./_object-gpo":39,"./_redefine":44,"./_set-to-string-tag":46,"./_wks":59}],31:[function(_dereq_,module,exports){
var ITERATOR     = _dereq_('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":59}],32:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],33:[function(_dereq_,module,exports){
module.exports = {};
},{}],34:[function(_dereq_,module,exports){
module.exports = true;
},{}],35:[function(_dereq_,module,exports){
var global    = _dereq_('./_global')
  , macrotask = _dereq_('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = _dereq_('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":9,"./_global":19,"./_task":51}],36:[function(_dereq_,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = _dereq_('./_an-object')
  , dPs         = _dereq_('./_object-dps')
  , enumBugKeys = _dereq_('./_enum-bug-keys')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _dereq_('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _dereq_('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":6,"./_dom-create":14,"./_enum-bug-keys":15,"./_html":22,"./_object-dps":38,"./_shared-key":47}],37:[function(_dereq_,module,exports){
var anObject       = _dereq_('./_an-object')
  , IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define')
  , toPrimitive    = _dereq_('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = _dereq_('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":6,"./_descriptors":13,"./_ie8-dom-define":23,"./_to-primitive":57}],38:[function(_dereq_,module,exports){
var dP       = _dereq_('./_object-dp')
  , anObject = _dereq_('./_an-object')
  , getKeys  = _dereq_('./_object-keys');

module.exports = _dereq_('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":6,"./_descriptors":13,"./_object-dp":37,"./_object-keys":41}],39:[function(_dereq_,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = _dereq_('./_has')
  , toObject    = _dereq_('./_to-object')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":20,"./_shared-key":47,"./_to-object":56}],40:[function(_dereq_,module,exports){
var has          = _dereq_('./_has')
  , toIObject    = _dereq_('./_to-iobject')
  , arrayIndexOf = _dereq_('./_array-includes')(false)
  , IE_PROTO     = _dereq_('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":7,"./_has":20,"./_shared-key":47,"./_to-iobject":54}],41:[function(_dereq_,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _dereq_('./_object-keys-internal')
  , enumBugKeys = _dereq_('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":15,"./_object-keys-internal":40}],42:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],43:[function(_dereq_,module,exports){
var hide = _dereq_('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":21}],44:[function(_dereq_,module,exports){
module.exports = _dereq_('./_hide');
},{"./_hide":21}],45:[function(_dereq_,module,exports){
'use strict';
var global      = _dereq_('./_global')
  , core        = _dereq_('./_core')
  , dP          = _dereq_('./_object-dp')
  , DESCRIPTORS = _dereq_('./_descriptors')
  , SPECIES     = _dereq_('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":10,"./_descriptors":13,"./_global":19,"./_object-dp":37,"./_wks":59}],46:[function(_dereq_,module,exports){
var def = _dereq_('./_object-dp').f
  , has = _dereq_('./_has')
  , TAG = _dereq_('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":20,"./_object-dp":37,"./_wks":59}],47:[function(_dereq_,module,exports){
var shared = _dereq_('./_shared')('keys')
  , uid    = _dereq_('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":48,"./_uid":58}],48:[function(_dereq_,module,exports){
var global = _dereq_('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":19}],49:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = _dereq_('./_an-object')
  , aFunction = _dereq_('./_a-function')
  , SPECIES   = _dereq_('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":3,"./_an-object":6,"./_wks":59}],50:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , defined   = _dereq_('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":12,"./_to-integer":53}],51:[function(_dereq_,module,exports){
var ctx                = _dereq_('./_ctx')
  , invoke             = _dereq_('./_invoke')
  , html               = _dereq_('./_html')
  , cel                = _dereq_('./_dom-create')
  , global             = _dereq_('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_dereq_('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":9,"./_ctx":11,"./_dom-create":14,"./_global":19,"./_html":22,"./_invoke":24}],52:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":53}],53:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],54:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_('./_iobject')
  , defined = _dereq_('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":12,"./_iobject":25}],55:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":53}],56:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":12}],57:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":27}],58:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],59:[function(_dereq_,module,exports){
var store      = _dereq_('./_shared')('wks')
  , uid        = _dereq_('./_uid')
  , Symbol     = _dereq_('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":19,"./_shared":48,"./_uid":58}],60:[function(_dereq_,module,exports){
var classof   = _dereq_('./_classof')
  , ITERATOR  = _dereq_('./_wks')('iterator')
  , Iterators = _dereq_('./_iterators');
module.exports = _dereq_('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":8,"./_core":10,"./_iterators":33,"./_wks":59}],61:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_('./_add-to-unscopables')
  , step             = _dereq_('./_iter-step')
  , Iterators        = _dereq_('./_iterators')
  , toIObject        = _dereq_('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":4,"./_iter-define":30,"./_iter-step":32,"./_iterators":33,"./_to-iobject":54}],62:[function(_dereq_,module,exports){

},{}],63:[function(_dereq_,module,exports){
'use strict';
var LIBRARY            = _dereq_('./_library')
  , global             = _dereq_('./_global')
  , ctx                = _dereq_('./_ctx')
  , classof            = _dereq_('./_classof')
  , $export            = _dereq_('./_export')
  , isObject           = _dereq_('./_is-object')
  , aFunction          = _dereq_('./_a-function')
  , anInstance         = _dereq_('./_an-instance')
  , forOf              = _dereq_('./_for-of')
  , speciesConstructor = _dereq_('./_species-constructor')
  , task               = _dereq_('./_task').set
  , microtask          = _dereq_('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_dereq_('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _dereq_('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
_dereq_('./_set-to-string-tag')($Promise, PROMISE);
_dereq_('./_set-species')(PROMISE);
Wrapper = _dereq_('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":3,"./_an-instance":5,"./_classof":8,"./_core":10,"./_ctx":11,"./_export":16,"./_for-of":18,"./_global":19,"./_is-object":27,"./_iter-detect":31,"./_library":34,"./_microtask":35,"./_redefine-all":43,"./_set-species":45,"./_set-to-string-tag":46,"./_species-constructor":49,"./_task":51,"./_wks":59}],64:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":30,"./_string-at":50}],65:[function(_dereq_,module,exports){
_dereq_('./es6.array.iterator');
var global        = _dereq_('./_global')
  , hide          = _dereq_('./_hide')
  , Iterators     = _dereq_('./_iterators')
  , TO_STRING_TAG = _dereq_('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":19,"./_hide":21,"./_iterators":33,"./_wks":59,"./es6.array.iterator":61}],66:[function(_dereq_,module,exports){
module.exports = {
  F: _dereq_('./src/F'),
  T: _dereq_('./src/T'),
  __: _dereq_('./src/__'),
  add: _dereq_('./src/add'),
  addIndex: _dereq_('./src/addIndex'),
  adjust: _dereq_('./src/adjust'),
  all: _dereq_('./src/all'),
  allPass: _dereq_('./src/allPass'),
  always: _dereq_('./src/always'),
  and: _dereq_('./src/and'),
  any: _dereq_('./src/any'),
  anyPass: _dereq_('./src/anyPass'),
  ap: _dereq_('./src/ap'),
  aperture: _dereq_('./src/aperture'),
  append: _dereq_('./src/append'),
  apply: _dereq_('./src/apply'),
  applySpec: _dereq_('./src/applySpec'),
  ascend: _dereq_('./src/ascend'),
  assoc: _dereq_('./src/assoc'),
  assocPath: _dereq_('./src/assocPath'),
  binary: _dereq_('./src/binary'),
  bind: _dereq_('./src/bind'),
  both: _dereq_('./src/both'),
  call: _dereq_('./src/call'),
  chain: _dereq_('./src/chain'),
  clamp: _dereq_('./src/clamp'),
  clone: _dereq_('./src/clone'),
  comparator: _dereq_('./src/comparator'),
  complement: _dereq_('./src/complement'),
  compose: _dereq_('./src/compose'),
  composeK: _dereq_('./src/composeK'),
  composeP: _dereq_('./src/composeP'),
  concat: _dereq_('./src/concat'),
  cond: _dereq_('./src/cond'),
  construct: _dereq_('./src/construct'),
  constructN: _dereq_('./src/constructN'),
  contains: _dereq_('./src/contains'),
  converge: _dereq_('./src/converge'),
  countBy: _dereq_('./src/countBy'),
  curry: _dereq_('./src/curry'),
  curryN: _dereq_('./src/curryN'),
  dec: _dereq_('./src/dec'),
  descend: _dereq_('./src/descend'),
  defaultTo: _dereq_('./src/defaultTo'),
  difference: _dereq_('./src/difference'),
  differenceWith: _dereq_('./src/differenceWith'),
  dissoc: _dereq_('./src/dissoc'),
  dissocPath: _dereq_('./src/dissocPath'),
  divide: _dereq_('./src/divide'),
  drop: _dereq_('./src/drop'),
  dropLast: _dereq_('./src/dropLast'),
  dropLastWhile: _dereq_('./src/dropLastWhile'),
  dropRepeats: _dereq_('./src/dropRepeats'),
  dropRepeatsWith: _dereq_('./src/dropRepeatsWith'),
  dropWhile: _dereq_('./src/dropWhile'),
  either: _dereq_('./src/either'),
  empty: _dereq_('./src/empty'),
  eqBy: _dereq_('./src/eqBy'),
  eqProps: _dereq_('./src/eqProps'),
  equals: _dereq_('./src/equals'),
  evolve: _dereq_('./src/evolve'),
  filter: _dereq_('./src/filter'),
  find: _dereq_('./src/find'),
  findIndex: _dereq_('./src/findIndex'),
  findLast: _dereq_('./src/findLast'),
  findLastIndex: _dereq_('./src/findLastIndex'),
  flatten: _dereq_('./src/flatten'),
  flip: _dereq_('./src/flip'),
  forEach: _dereq_('./src/forEach'),
  forEachObjIndexed: _dereq_('./src/forEachObjIndexed'),
  fromPairs: _dereq_('./src/fromPairs'),
  groupBy: _dereq_('./src/groupBy'),
  groupWith: _dereq_('./src/groupWith'),
  gt: _dereq_('./src/gt'),
  gte: _dereq_('./src/gte'),
  has: _dereq_('./src/has'),
  hasIn: _dereq_('./src/hasIn'),
  head: _dereq_('./src/head'),
  identical: _dereq_('./src/identical'),
  identity: _dereq_('./src/identity'),
  ifElse: _dereq_('./src/ifElse'),
  inc: _dereq_('./src/inc'),
  indexBy: _dereq_('./src/indexBy'),
  indexOf: _dereq_('./src/indexOf'),
  init: _dereq_('./src/init'),
  insert: _dereq_('./src/insert'),
  insertAll: _dereq_('./src/insertAll'),
  intersection: _dereq_('./src/intersection'),
  intersectionWith: _dereq_('./src/intersectionWith'),
  intersperse: _dereq_('./src/intersperse'),
  into: _dereq_('./src/into'),
  invert: _dereq_('./src/invert'),
  invertObj: _dereq_('./src/invertObj'),
  invoker: _dereq_('./src/invoker'),
  is: _dereq_('./src/is'),
  isArrayLike: _dereq_('./src/isArrayLike'),
  isEmpty: _dereq_('./src/isEmpty'),
  isNil: _dereq_('./src/isNil'),
  join: _dereq_('./src/join'),
  juxt: _dereq_('./src/juxt'),
  keys: _dereq_('./src/keys'),
  keysIn: _dereq_('./src/keysIn'),
  last: _dereq_('./src/last'),
  lastIndexOf: _dereq_('./src/lastIndexOf'),
  length: _dereq_('./src/length'),
  lens: _dereq_('./src/lens'),
  lensIndex: _dereq_('./src/lensIndex'),
  lensPath: _dereq_('./src/lensPath'),
  lensProp: _dereq_('./src/lensProp'),
  lift: _dereq_('./src/lift'),
  liftN: _dereq_('./src/liftN'),
  lt: _dereq_('./src/lt'),
  lte: _dereq_('./src/lte'),
  map: _dereq_('./src/map'),
  mapAccum: _dereq_('./src/mapAccum'),
  mapAccumRight: _dereq_('./src/mapAccumRight'),
  mapObjIndexed: _dereq_('./src/mapObjIndexed'),
  match: _dereq_('./src/match'),
  mathMod: _dereq_('./src/mathMod'),
  max: _dereq_('./src/max'),
  maxBy: _dereq_('./src/maxBy'),
  mean: _dereq_('./src/mean'),
  median: _dereq_('./src/median'),
  memoize: _dereq_('./src/memoize'),
  merge: _dereq_('./src/merge'),
  mergeAll: _dereq_('./src/mergeAll'),
  mergeWith: _dereq_('./src/mergeWith'),
  mergeWithKey: _dereq_('./src/mergeWithKey'),
  min: _dereq_('./src/min'),
  minBy: _dereq_('./src/minBy'),
  modulo: _dereq_('./src/modulo'),
  multiply: _dereq_('./src/multiply'),
  nAry: _dereq_('./src/nAry'),
  negate: _dereq_('./src/negate'),
  none: _dereq_('./src/none'),
  not: _dereq_('./src/not'),
  nth: _dereq_('./src/nth'),
  nthArg: _dereq_('./src/nthArg'),
  objOf: _dereq_('./src/objOf'),
  of: _dereq_('./src/of'),
  omit: _dereq_('./src/omit'),
  once: _dereq_('./src/once'),
  or: _dereq_('./src/or'),
  over: _dereq_('./src/over'),
  pair: _dereq_('./src/pair'),
  partial: _dereq_('./src/partial'),
  partialRight: _dereq_('./src/partialRight'),
  partition: _dereq_('./src/partition'),
  path: _dereq_('./src/path'),
  pathEq: _dereq_('./src/pathEq'),
  pathOr: _dereq_('./src/pathOr'),
  pathSatisfies: _dereq_('./src/pathSatisfies'),
  pick: _dereq_('./src/pick'),
  pickAll: _dereq_('./src/pickAll'),
  pickBy: _dereq_('./src/pickBy'),
  pipe: _dereq_('./src/pipe'),
  pipeK: _dereq_('./src/pipeK'),
  pipeP: _dereq_('./src/pipeP'),
  pluck: _dereq_('./src/pluck'),
  prepend: _dereq_('./src/prepend'),
  product: _dereq_('./src/product'),
  project: _dereq_('./src/project'),
  prop: _dereq_('./src/prop'),
  propEq: _dereq_('./src/propEq'),
  propIs: _dereq_('./src/propIs'),
  propOr: _dereq_('./src/propOr'),
  propSatisfies: _dereq_('./src/propSatisfies'),
  props: _dereq_('./src/props'),
  range: _dereq_('./src/range'),
  reduce: _dereq_('./src/reduce'),
  reduceBy: _dereq_('./src/reduceBy'),
  reduceRight: _dereq_('./src/reduceRight'),
  reduceWhile: _dereq_('./src/reduceWhile'),
  reduced: _dereq_('./src/reduced'),
  reject: _dereq_('./src/reject'),
  remove: _dereq_('./src/remove'),
  repeat: _dereq_('./src/repeat'),
  replace: _dereq_('./src/replace'),
  reverse: _dereq_('./src/reverse'),
  scan: _dereq_('./src/scan'),
  sequence: _dereq_('./src/sequence'),
  set: _dereq_('./src/set'),
  slice: _dereq_('./src/slice'),
  sort: _dereq_('./src/sort'),
  sortBy: _dereq_('./src/sortBy'),
  sortWith: _dereq_('./src/sortWith'),
  split: _dereq_('./src/split'),
  splitAt: _dereq_('./src/splitAt'),
  splitEvery: _dereq_('./src/splitEvery'),
  splitWhen: _dereq_('./src/splitWhen'),
  subtract: _dereq_('./src/subtract'),
  sum: _dereq_('./src/sum'),
  symmetricDifference: _dereq_('./src/symmetricDifference'),
  symmetricDifferenceWith: _dereq_('./src/symmetricDifferenceWith'),
  tail: _dereq_('./src/tail'),
  take: _dereq_('./src/take'),
  takeLast: _dereq_('./src/takeLast'),
  takeLastWhile: _dereq_('./src/takeLastWhile'),
  takeWhile: _dereq_('./src/takeWhile'),
  tap: _dereq_('./src/tap'),
  test: _dereq_('./src/test'),
  times: _dereq_('./src/times'),
  toLower: _dereq_('./src/toLower'),
  toPairs: _dereq_('./src/toPairs'),
  toPairsIn: _dereq_('./src/toPairsIn'),
  toString: _dereq_('./src/toString'),
  toUpper: _dereq_('./src/toUpper'),
  transduce: _dereq_('./src/transduce'),
  transpose: _dereq_('./src/transpose'),
  traverse: _dereq_('./src/traverse'),
  trim: _dereq_('./src/trim'),
  tryCatch: _dereq_('./src/tryCatch'),
  type: _dereq_('./src/type'),
  unapply: _dereq_('./src/unapply'),
  unary: _dereq_('./src/unary'),
  uncurryN: _dereq_('./src/uncurryN'),
  unfold: _dereq_('./src/unfold'),
  union: _dereq_('./src/union'),
  unionWith: _dereq_('./src/unionWith'),
  uniq: _dereq_('./src/uniq'),
  uniqBy: _dereq_('./src/uniqBy'),
  uniqWith: _dereq_('./src/uniqWith'),
  unless: _dereq_('./src/unless'),
  unnest: _dereq_('./src/unnest'),
  until: _dereq_('./src/until'),
  update: _dereq_('./src/update'),
  useWith: _dereq_('./src/useWith'),
  values: _dereq_('./src/values'),
  valuesIn: _dereq_('./src/valuesIn'),
  view: _dereq_('./src/view'),
  when: _dereq_('./src/when'),
  where: _dereq_('./src/where'),
  whereEq: _dereq_('./src/whereEq'),
  without: _dereq_('./src/without'),
  xprod: _dereq_('./src/xprod'),
  zip: _dereq_('./src/zip'),
  zipObj: _dereq_('./src/zipObj'),
  zipWith: _dereq_('./src/zipWith')
};

},{"./src/F":67,"./src/T":68,"./src/__":69,"./src/add":70,"./src/addIndex":71,"./src/adjust":72,"./src/all":73,"./src/allPass":74,"./src/always":75,"./src/and":76,"./src/any":77,"./src/anyPass":78,"./src/ap":79,"./src/aperture":80,"./src/append":81,"./src/apply":82,"./src/applySpec":83,"./src/ascend":84,"./src/assoc":85,"./src/assocPath":86,"./src/binary":87,"./src/bind":88,"./src/both":89,"./src/call":90,"./src/chain":91,"./src/clamp":92,"./src/clone":93,"./src/comparator":94,"./src/complement":95,"./src/compose":96,"./src/composeK":97,"./src/composeP":98,"./src/concat":99,"./src/cond":100,"./src/construct":101,"./src/constructN":102,"./src/contains":103,"./src/converge":104,"./src/countBy":105,"./src/curry":106,"./src/curryN":107,"./src/dec":108,"./src/defaultTo":109,"./src/descend":110,"./src/difference":111,"./src/differenceWith":112,"./src/dissoc":113,"./src/dissocPath":114,"./src/divide":115,"./src/drop":116,"./src/dropLast":117,"./src/dropLastWhile":118,"./src/dropRepeats":119,"./src/dropRepeatsWith":120,"./src/dropWhile":121,"./src/either":122,"./src/empty":123,"./src/eqBy":124,"./src/eqProps":125,"./src/equals":126,"./src/evolve":127,"./src/filter":128,"./src/find":129,"./src/findIndex":130,"./src/findLast":131,"./src/findLastIndex":132,"./src/flatten":133,"./src/flip":134,"./src/forEach":135,"./src/forEachObjIndexed":136,"./src/fromPairs":137,"./src/groupBy":138,"./src/groupWith":139,"./src/gt":140,"./src/gte":141,"./src/has":142,"./src/hasIn":143,"./src/head":144,"./src/identical":145,"./src/identity":146,"./src/ifElse":147,"./src/inc":148,"./src/indexBy":149,"./src/indexOf":150,"./src/init":151,"./src/insert":152,"./src/insertAll":153,"./src/intersection":224,"./src/intersectionWith":225,"./src/intersperse":226,"./src/into":227,"./src/invert":228,"./src/invertObj":229,"./src/invoker":230,"./src/is":231,"./src/isArrayLike":232,"./src/isEmpty":233,"./src/isNil":234,"./src/join":235,"./src/juxt":236,"./src/keys":237,"./src/keysIn":238,"./src/last":239,"./src/lastIndexOf":240,"./src/length":241,"./src/lens":242,"./src/lensIndex":243,"./src/lensPath":244,"./src/lensProp":245,"./src/lift":246,"./src/liftN":247,"./src/lt":248,"./src/lte":249,"./src/map":250,"./src/mapAccum":251,"./src/mapAccumRight":252,"./src/mapObjIndexed":253,"./src/match":254,"./src/mathMod":255,"./src/max":256,"./src/maxBy":257,"./src/mean":258,"./src/median":259,"./src/memoize":260,"./src/merge":261,"./src/mergeAll":262,"./src/mergeWith":263,"./src/mergeWithKey":264,"./src/min":265,"./src/minBy":266,"./src/modulo":267,"./src/multiply":268,"./src/nAry":269,"./src/negate":270,"./src/none":271,"./src/not":272,"./src/nth":273,"./src/nthArg":274,"./src/objOf":275,"./src/of":276,"./src/omit":277,"./src/once":278,"./src/or":279,"./src/over":280,"./src/pair":281,"./src/partial":282,"./src/partialRight":283,"./src/partition":284,"./src/path":285,"./src/pathEq":286,"./src/pathOr":287,"./src/pathSatisfies":288,"./src/pick":289,"./src/pickAll":290,"./src/pickBy":291,"./src/pipe":292,"./src/pipeK":293,"./src/pipeP":294,"./src/pluck":295,"./src/prepend":296,"./src/product":297,"./src/project":298,"./src/prop":299,"./src/propEq":300,"./src/propIs":301,"./src/propOr":302,"./src/propSatisfies":303,"./src/props":304,"./src/range":305,"./src/reduce":306,"./src/reduceBy":307,"./src/reduceRight":308,"./src/reduceWhile":309,"./src/reduced":310,"./src/reject":311,"./src/remove":312,"./src/repeat":313,"./src/replace":314,"./src/reverse":315,"./src/scan":316,"./src/sequence":317,"./src/set":318,"./src/slice":319,"./src/sort":320,"./src/sortBy":321,"./src/sortWith":322,"./src/split":323,"./src/splitAt":324,"./src/splitEvery":325,"./src/splitWhen":326,"./src/subtract":327,"./src/sum":328,"./src/symmetricDifference":329,"./src/symmetricDifferenceWith":330,"./src/tail":331,"./src/take":332,"./src/takeLast":333,"./src/takeLastWhile":334,"./src/takeWhile":335,"./src/tap":336,"./src/test":337,"./src/times":338,"./src/toLower":339,"./src/toPairs":340,"./src/toPairsIn":341,"./src/toString":342,"./src/toUpper":343,"./src/transduce":344,"./src/transpose":345,"./src/traverse":346,"./src/trim":347,"./src/tryCatch":348,"./src/type":349,"./src/unapply":350,"./src/unary":351,"./src/uncurryN":352,"./src/unfold":353,"./src/union":354,"./src/unionWith":355,"./src/uniq":356,"./src/uniqBy":357,"./src/uniqWith":358,"./src/unless":359,"./src/unnest":360,"./src/until":361,"./src/update":362,"./src/useWith":363,"./src/values":364,"./src/valuesIn":365,"./src/view":366,"./src/when":367,"./src/where":368,"./src/whereEq":369,"./src/without":370,"./src/xprod":371,"./src/zip":372,"./src/zipObj":373,"./src/zipWith":374}],67:[function(_dereq_,module,exports){
var always = _dereq_('./always');


/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */
module.exports = always(false);

},{"./always":75}],68:[function(_dereq_,module,exports){
var always = _dereq_('./always');


/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.F
 * @example
 *
 *      R.T(); //=> true
 */
module.exports = always(true);

},{"./always":75}],69:[function(_dereq_,module,exports){
/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = {'@@functional/placeholder': true};

},{}],70:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */
module.exports = _curry2(function add(a, b) {
  return Number(a) + Number(b);
});

},{"./internal/_curry2":168}],71:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _curry1 = _dereq_('./internal/_curry1');
var curryN = _dereq_('./curryN');


/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, Ramda's simple `map` function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
module.exports = _curry1(function addIndex(fn) {
  return curryN(fn.length, function() {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function() {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});

},{"./curryN":107,"./internal/_concat":163,"./internal/_curry1":167}],72:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */
module.exports = _curry3(function adjust(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});

},{"./internal/_concat":163,"./internal/_curry3":169}],73:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xall = _dereq_('./internal/_xall');


/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      var equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */
module.exports = _curry2(_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xall":204}],74:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var curryN = _dereq_('./curryN');
var max = _dereq_('./max');
var pluck = _dereq_('./pluck');
var reduce = _dereq_('./reduce');


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      var isQueen = R.propEq('rank', 'Q');
 *      var isSpade = R.propEq('suit', '♠︎');
 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */
module.exports = _curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});

},{"./curryN":107,"./internal/_curry1":167,"./max":256,"./pluck":295,"./reduce":306}],75:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */
module.exports = _curry1(function always(val) {
  return function() {
    return val;
  };
});

},{"./internal/_curry1":167}],76:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */
module.exports = _curry2(function and(a, b) {
  return a && b;
});

},{"./internal/_curry2":168}],77:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xany = _dereq_('./internal/_xany');


/**
 * Returns `true` if at least one of elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      var lessThan0 = R.flip(R.lt)(0);
 *      var lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */
module.exports = _curry2(_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xany":205}],78:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var curryN = _dereq_('./curryN');
var max = _dereq_('./max');
var pluck = _dereq_('./pluck');
var reduce = _dereq_('./reduce');


/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      var isClub = R.propEq('suit', '♣');
 *      var isSpade = R.propEq('suit', '♠');
 *      var isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */
module.exports = _curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});

},{"./curryN":107,"./internal/_curry1":167,"./max":256,"./pluck":295,"./reduce":306}],79:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _curry2 = _dereq_('./internal/_curry2');
var _reduce = _dereq_('./internal/_reduce');
var map = _dereq_('./map');


/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @param {Array} fns An array of functions
 * @param {Array} vs An array of values
 * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */
module.exports = _curry2(function ap(applicative, fn) {
  return (
    typeof applicative.ap === 'function' ?
      applicative.ap(fn) :
    typeof applicative === 'function' ?
      function(x) { return applicative(x)(fn(x)); } :
    // else
      _reduce(function(acc, f) { return _concat(acc, map(f, fn)); }, [], applicative)
  );
});

},{"./internal/_concat":163,"./internal/_curry2":168,"./internal/_reduce":199,"./map":250}],80:[function(_dereq_,module,exports){
var _aperture = _dereq_('./internal/_aperture');
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xaperture = _dereq_('./internal/_xaperture');


/**
 * Returns a new list, composed of n-tuples of consecutive elements If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */
module.exports = _curry2(_dispatchable([], _xaperture, _aperture));

},{"./internal/_aperture":155,"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xaperture":206}],81:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */
module.exports = _curry2(function append(el, list) {
  return _concat(list, [el]);
});

},{"./internal/_concat":163,"./internal/_curry2":168}],82:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */
module.exports = _curry2(function apply(fn, args) {
  return fn.apply(this, args);
});

},{"./internal/_curry2":168}],83:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var apply = _dereq_('./apply');
var curryN = _dereq_('./curryN');
var map = _dereq_('./map');
var max = _dereq_('./max');
var pluck = _dereq_('./pluck');
var reduce = _dereq_('./reduce');
var values = _dereq_('./values');


/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *                                      sum: R.add,
 *                                      nested: { mul: R.multiply }
 *                                   });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
module.exports = _curry1(function applySpec(spec) {
  spec = map(function(v) { return typeof v == 'function' ? v : applySpec(v); },
             spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))),
                function() {
                  var args = arguments;
                  return map(function(f) { return apply(f, args); }, spec);
                });
});

},{"./apply":82,"./curryN":107,"./internal/_curry1":167,"./map":250,"./max":256,"./pluck":295,"./reduce":306,"./values":364}],84:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @example
 *
 *      var byAge = R.ascend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByYoungestFirst = R.sort(byAge, people);
 */
module.exports = _curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

},{"./internal/_curry3":169}],85:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry3(function assoc(prop, val, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
});

},{"./internal/_curry3":169}],86:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var _has = _dereq_('./internal/_has');
var _isArray = _dereq_('./internal/_isArray');
var _isInteger = _dereq_('./internal/_isInteger');
var assoc = _dereq_('./assoc');


/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */
module.exports = _curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});

},{"./assoc":85,"./internal/_curry3":169,"./internal/_has":179,"./internal/_isArray":183,"./internal/_isInteger":185}],87:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var nAry = _dereq_('./nAry');


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @example
 *
 *      var takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      var takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */
module.exports = _curry1(function binary(fn) {
  return nAry(2, fn);
});

},{"./internal/_curry1":167,"./nAry":269}],88:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */
module.exports = _curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});

},{"./internal/_arity":156,"./internal/_curry2":168}],89:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isFunction = _dereq_('./internal/_isFunction');
var and = _dereq_('./and');
var lift = _dereq_('./lift');


/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      var gt10 = R.gt(R.__, 10)
 *      var lt20 = R.lt(R.__, 20)
 *      var f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 */
module.exports = _curry2(function both(f, g) {
  return _isFunction(f) ?
    function _both() {
      return f.apply(this, arguments) && g.apply(this, arguments);
    } :
    lift(and)(f, g);
});

},{"./and":76,"./internal/_curry2":168,"./internal/_isFunction":184,"./lift":246}],90:[function(_dereq_,module,exports){
var curry = _dereq_('./curry');


/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * `R.converge`: the left branch can produce a function while the right branch
 * produces a value to be passed to that function as an argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      var indentN = R.pipe(R.times(R.always(' ')),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */
module.exports = curry(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});

},{"./curry":106}],91:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _makeFlat = _dereq_('./internal/_makeFlat');
var _xchain = _dereq_('./internal/_xchain');
var map = _dereq_('./map');


/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */
module.exports = _curry2(_dispatchable(['chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function(x) { return fn(monad(x))(x); };
  }
  return _makeFlat(false)(map(fn, monad));
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_makeFlat":192,"./internal/_xchain":207,"./map":250}],92:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */
module.exports = _curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  return value < min ? min :
         value > max ? max :
         value;
});

},{"./internal/_curry3":169}],93:[function(_dereq_,module,exports){
var _clone = _dereq_('./internal/_clone');
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */
module.exports = _curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ?
    value.clone() :
    _clone(value, [], [], true);
});

},{"./internal/_clone":160,"./internal/_curry1":167}],94:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a, b -> Boolean) -> (a, b -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      var byAge = R.comparator((a, b) => a.age < b.age);
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByIncreasingAge = R.sort(byAge, people);
 */
module.exports = _curry1(function comparator(pred) {
  return function(a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

},{"./internal/_curry1":167}],95:[function(_dereq_,module,exports){
var lift = _dereq_('./lift');
var not = _dereq_('./not');


/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */
module.exports = lift(not);

},{"./lift":246,"./not":272}],96:[function(_dereq_,module,exports){
var pipe = _dereq_('./pipe');
var reverse = _dereq_('./reverse');


/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
module.exports = function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
};

},{"./pipe":292,"./reverse":315}],97:[function(_dereq_,module,exports){
var chain = _dereq_('./chain');
var compose = _dereq_('./compose');
var map = _dereq_('./map');


/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       var get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       var getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */
module.exports = function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }
  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return compose(compose.apply(this, map(chain, init)), last);
};

},{"./chain":91,"./compose":96,"./map":250}],98:[function(_dereq_,module,exports){
var pipeP = _dereq_('./pipeP');
var reverse = _dereq_('./reverse');


/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The rightmost function may have any arity; the remaining
 * functions must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @example
 *
 *      var db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      var lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      var lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      var followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */
module.exports = function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }
  return pipeP.apply(this, reverse(arguments));
};

},{"./pipeP":294,"./reverse":315}],99:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isArray = _dereq_('./internal/_isArray');
var _isFunction = _dereq_('./internal/_isFunction');
var toString = _dereq_('./toString');


/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */
module.exports = _curry2(function concat(a, b) {
  if (a == null || !_isFunction(a.concat)) {
    throw new TypeError(toString(a) + ' does not have a method named "concat"');
  }
  if (_isArray(a) && !_isArray(b)) {
    throw new TypeError(toString(b) + ' is not an array');
  }
  return a.concat(b);
});

},{"./internal/_curry2":168,"./internal/_isArray":183,"./internal/_isFunction":184,"./toString":342}],100:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _curry1 = _dereq_('./internal/_curry1');
var map = _dereq_('./map');
var max = _dereq_('./max');
var reduce = _dereq_('./reduce');


/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @example
 *
 *      var fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */
module.exports = _curry1(function cond(pairs) {
  var arity = reduce(max,
                     0,
                     map(function(pair) { return pair[0].length; }, pairs));
  return _arity(arity, function() {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});

},{"./internal/_arity":156,"./internal/_curry1":167,"./map":250,"./max":256,"./reduce":306}],101:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var constructN = _dereq_('./constructN');


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      var AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      var animalTypes = ["Lion", "Tiger", "Bear"];
 *      var animalSighting = R.invoker(0, 'sighting');
 *      var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */
module.exports = _curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});

},{"./constructN":102,"./internal/_curry1":167}],102:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var curry = _dereq_('./curry');
var nAry = _dereq_('./nAry');


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      };
 *      Salad.prototype.recipe = function() {
 *        var instructions = R.map((ingredient) => (
 *          'Add a whollop of ' + ingredient, this.ingredients)
 *        )
 *        return R.join('\n', instructions)
 *      }
 *
 *      var ThreeLayerSalad = R.constructN(3, Salad)
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup')
 *      console.log(salad.recipe());
 *      // Add a whollop of Mayonnaise
 *      // Add a whollop of Potato Chips
 *      // Add a whollop of Potato Ketchup
 */
module.exports = _curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }
  if (n === 0) {
    return function() { return new Fn(); };
  }
  return curry(nAry(n, function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case  1: return new Fn($0);
      case  2: return new Fn($0, $1);
      case  3: return new Fn($0, $1, $2);
      case  4: return new Fn($0, $1, $2, $3);
      case  5: return new Fn($0, $1, $2, $3, $4);
      case  6: return new Fn($0, $1, $2, $3, $4, $5);
      case  7: return new Fn($0, $1, $2, $3, $4, $5, $6);
      case  8: return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case  9: return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10: return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});

},{"./curry":106,"./internal/_curry2":168,"./nAry":269}],103:[function(_dereq_,module,exports){
var _contains = _dereq_('./internal/_contains');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns `true` if the specified value is equal, in `R.equals` terms, to at
 * least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */
module.exports = _curry2(_contains);

},{"./internal/_contains":164,"./internal/_curry2":168}],104:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _map = _dereq_('./internal/_map');
var curryN = _dereq_('./curryN');
var max = _dereq_('./max');
var pluck = _dereq_('./pluck');
var reduce = _dereq_('./reduce');


/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig (x1 -> x2 -> ... -> z) -> [(a -> b -> ... -> x1), (a -> b -> ... -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */
module.exports = _curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function() {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function(fn) {
      return fn.apply(context, args);
    }, fns));
  });
});

},{"./curryN":107,"./internal/_curry2":168,"./internal/_map":193,"./max":256,"./pluck":295,"./reduce":306}],105:[function(_dereq_,module,exports){
var reduceBy = _dereq_('./reduceBy');


/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */
module.exports = reduceBy(function(acc, elem) { return acc + 1; }, 0);

},{"./reduceBy":307}],106:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var curryN = _dereq_('./curryN');


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

},{"./curryN":107,"./internal/_curry1":167}],107:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _curry1 = _dereq_('./internal/_curry1');
var _curry2 = _dereq_('./internal/_curry2');
var _curryN = _dereq_('./internal/_curryN');


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});

},{"./internal/_arity":156,"./internal/_curry1":167,"./internal/_curry2":168,"./internal/_curryN":170}],108:[function(_dereq_,module,exports){
var add = _dereq_('./add');


/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */
module.exports = add(-1);

},{"./add":70}],109:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */
module.exports = _curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

},{"./internal/_curry2":168}],110:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @example
 *
 *      var byAge = R.descend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByOldestFirst = R.sort(byAge, people);
 */
module.exports = _curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});

},{"./internal/_curry3":169}],111:[function(_dereq_,module,exports){
var _contains = _dereq_('./internal/_contains');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared are compared
 * in terms of value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */
module.exports = _curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});

},{"./internal/_contains":164,"./internal/_curry2":168}],112:[function(_dereq_,module,exports){
var _containsWith = _dereq_('./internal/_containsWith');
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      var cmp = (x, y) => x.a === y.a;
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      var l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */
module.exports = _curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_containsWith(pred, first[idx], second) &&
        !_containsWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});

},{"./internal/_containsWith":165,"./internal/_curry3":169}],113:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
module.exports = _curry2(function dissoc(prop, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
});

},{"./internal/_curry2":168}],114:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var assoc = _dereq_('./assoc');
var dissoc = _dereq_('./dissoc');


/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @sig [String] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */
module.exports = _curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return dissoc(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      return obj[head] == null ? obj : assoc(head, dissocPath(tail, obj[head]), obj);
  }
});

},{"./assoc":85,"./dissoc":113,"./internal/_curry2":168}],115:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      var half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      var reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */
module.exports = _curry2(function divide(a, b) { return a / b; });

},{"./internal/_curry2":168}],116:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xdrop = _dereq_('./internal/_xdrop');
var slice = _dereq_('./slice');


/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {[a]} list
 * @return {[a]} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */
module.exports = _curry2(_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xdrop":208,"./slice":319}],117:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _dropLast = _dereq_('./internal/_dropLast');
var _xdropLast = _dereq_('./internal/_xdropLast');


/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */
module.exports = _curry2(_dispatchable([], _xdropLast, _dropLast));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_dropLast":172,"./internal/_xdropLast":209}],118:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _dropLastWhile = _dereq_('./internal/_dropLastWhile');
var _xdropLastWhile = _dereq_('./internal/_xdropLastWhile');


/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} predicate The function to be called on each element
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      var lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 */
module.exports = _curry2(_dispatchable([], _xdropLastWhile, _dropLastWhile));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_dropLastWhile":173,"./internal/_xdropLastWhile":210}],119:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xdropRepeatsWith = _dereq_('./internal/_xdropRepeatsWith');
var dropRepeatsWith = _dereq_('./dropRepeatsWith');
var equals = _dereq_('./equals');


/**
 * Returns a new list without any consecutively repeating elements. `R.equals`
 * is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */
module.exports = _curry1(_dispatchable([], _xdropRepeatsWith(equals), dropRepeatsWith(equals)));

},{"./dropRepeatsWith":120,"./equals":126,"./internal/_curry1":167,"./internal/_dispatchable":171,"./internal/_xdropRepeatsWith":211}],120:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xdropRepeatsWith = _dereq_('./internal/_xdropRepeatsWith');
var last = _dereq_('./last');


/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a, a -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */
module.exports = _curry2(_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));


},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xdropRepeatsWith":211,"./last":239}],121:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xdropWhile = _dereq_('./internal/_xdropWhile');


/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      var lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 */
module.exports = _curry2(_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len && pred(list[idx])) {
    idx += 1;
  }
  return Array.prototype.slice.call(list, idx);
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xdropWhile":212}],122:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isFunction = _dereq_('./internal/_isFunction');
var lift = _dereq_('./lift');
var or = _dereq_('./or');


/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */
module.exports = _curry2(function either(f, g) {
  return _isFunction(f) ?
    function _either() {
      return f.apply(this, arguments) || g.apply(this, arguments);
    } :
    lift(or)(f, g);
});

},{"./internal/_curry2":168,"./internal/_isFunction":184,"./lift":246,"./or":279}],123:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _isArguments = _dereq_('./internal/_isArguments');
var _isArray = _dereq_('./internal/_isArray');
var _isObject = _dereq_('./internal/_isObject');
var _isString = _dereq_('./internal/_isString');


/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty` and/or
 * `<Type>.prototype.empty`.
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */
module.exports = _curry1(function empty(x) {
  return (
    (x != null && typeof x.empty === 'function') ?
      x.empty() :
    (x != null && x.constructor != null && typeof x.constructor.empty === 'function') ?
      x.constructor.empty() :
    _isArray(x) ?
      [] :
    _isString(x) ?
      '' :
    _isObject(x) ?
      {} :
    _isArguments(x) ?
      (function() { return arguments; }()) :
    // else
      void 0
  );
});

},{"./internal/_curry1":167,"./internal/_isArguments":182,"./internal/_isArray":183,"./internal/_isObject":187,"./internal/_isString":190}],124:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var equals = _dereq_('./equals');


/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */
module.exports = _curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});

},{"./equals":126,"./internal/_curry3":169}],125:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var equals = _dereq_('./equals');


/**
 * Reports whether two objects have the same value, in `R.equals` terms, for
 * the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */
module.exports = _curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});

},{"./equals":126,"./internal/_curry3":169}],126:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _equals = _dereq_('./internal/_equals');


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
module.exports = _curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

},{"./internal/_curry2":168,"./internal/_equals":174}],127:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      var transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */
module.exports = _curry2(function evolve(transformations, object) {
  var result = {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function'                 ? transformation(object[key])
                : transformation && type === 'object' ? evolve(transformation, object[key])
                                                      : object[key];
  }
  return result;
});

},{"./internal/_curry2":168}],128:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _filter = _dereq_('./internal/_filter');
var _isObject = _dereq_('./internal/_isObject');
var _reduce = _dereq_('./internal/_reduce');
var _xfilter = _dereq_('./internal/_xfilter');
var keys = _dereq_('./keys');


/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
module.exports = _curry2(_dispatchable(['filter'], _xfilter, function(pred, filterable) {
  return (
    _isObject(filterable) ?
      _reduce(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys(filterable)) :
    // else
      _filter(pred, filterable)
  );
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_filter":175,"./internal/_isObject":187,"./internal/_reduce":199,"./internal/_xfilter":214,"./keys":237}],129:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xfind = _dereq_('./internal/_xfind');


/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
module.exports = _curry2(_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xfind":215}],130:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xfindIndex = _dereq_('./internal/_xfindIndex');


/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */
module.exports = _curry2(_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xfindIndex":216}],131:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xfindLast = _dereq_('./internal/_xfindLast');


/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */
module.exports = _curry2(_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xfindLast":217}],132:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xfindLastIndex = _dereq_('./internal/_xfindLastIndex');


/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */
module.exports = _curry2(_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xfindLastIndex":218}],133:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _makeFlat = _dereq_('./internal/_makeFlat');


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
module.exports = _curry1(_makeFlat(true));

},{"./internal/_curry1":167,"./internal/_makeFlat":192}],134:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var curry = _dereq_('./curry');


/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */
module.exports = _curry1(function flip(fn) {
  return curry(function(a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

},{"./curry":106,"./internal/_curry1":167}],135:[function(_dereq_,module,exports){
var _checkForMethod = _dereq_('./internal/_checkForMethod');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */
module.exports = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));

},{"./internal/_checkForMethod":159,"./internal/_curry2":168}],136:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var keys = _dereq_('./keys');


/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */
module.exports = _curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});

},{"./internal/_curry2":168,"./keys":237}],137:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});

},{"./internal/_curry1":167}],138:[function(_dereq_,module,exports){
var _checkForMethod = _dereq_('./internal/_checkForMethod');
var _curry2 = _dereq_('./internal/_curry2');
var reduceBy = _dereq_('./reduceBy');

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.transduce
 * @example
 *
 *      var byGrade = R.groupBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */
module.exports = _curry2(_checkForMethod('groupBy', reduceBy(function(acc, item) {
  if (acc == null) {
    acc = [];
  }
  acc.push(item);
  return acc;
}, null)));

},{"./internal/_checkForMethod":159,"./internal/_curry2":168,"./reduceBy":307}],139:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all "equal" according to the provided equality function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of equal elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */
module.exports = _curry2(function(fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[idx], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});

},{"./internal/_curry2":168}],140:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */
module.exports = _curry2(function gt(a, b) { return a > b; });

},{"./internal/_curry2":168}],141:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */
module.exports = _curry2(function gte(a, b) { return a >= b; });

},{"./internal/_curry2":168}],142:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _has = _dereq_('./internal/_has');


/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      var hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      var point = {x: 0, y: 0};
 *      var pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */
module.exports = _curry2(_has);

},{"./internal/_curry2":168,"./internal/_has":179}],143:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      var square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */
module.exports = _curry2(function hasIn(prop, obj) {
  return prop in obj;
});

},{"./internal/_curry2":168}],144:[function(_dereq_,module,exports){
var nth = _dereq_('./nth');


/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */
module.exports = nth(0);

},{"./nth":273}],145:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
module.exports = _curry2(function identical(a, b) {
  // SameValue algorithm
  if (a === b) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});

},{"./internal/_curry2":168}],146:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _identity = _dereq_('./internal/_identity');


/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */
module.exports = _curry1(_identity);

},{"./internal/_curry1":167,"./internal/_identity":180}],147:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var curryN = _dereq_('./curryN');


/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */
module.exports = _curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length),
    function _ifElse() {
      return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
    }
  );
});

},{"./curryN":107,"./internal/_curry3":169}],148:[function(_dereq_,module,exports){
var add = _dereq_('./add');


/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */
module.exports = add(1);

},{"./add":70}],149:[function(_dereq_,module,exports){
var reduceBy = _dereq_('./reduceBy');


/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */
module.exports = reduceBy(function(acc, elem) { return elem; }, null);

},{"./reduceBy":307}],150:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _indexOf = _dereq_('./internal/_indexOf');
var _isArray = _dereq_('./internal/_isArray');


/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. `R.equals` is used to determine
 * equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */
module.exports = _curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ?
    xs.indexOf(target) :
    _indexOf(xs, target, 0);
});

},{"./internal/_curry2":168,"./internal/_indexOf":181,"./internal/_isArray":183}],151:[function(_dereq_,module,exports){
var slice = _dereq_('./slice');


/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */
module.exports = slice(0, -1);

},{"./slice":319}],152:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Inserts the supplied element into the list, at index `index`. _Note that
 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */
module.exports = _curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

},{"./internal/_curry3":169}],153:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Inserts the sub-list into the list, at index `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */
module.exports = _curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx),
                   elts,
                   Array.prototype.slice.call(list, idx));
});

},{"./internal/_curry3":169}],154:[function(_dereq_,module,exports){
var _contains = _dereq_('./_contains');


// A simple Set type that honours R.equals semantics
module.exports = (function() {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function(item) {
    return !hasOrAdd(item, true, this);
  };

  //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //
  _Set.prototype.has = function(item) {
    return hasOrAdd(item, false, this);
  };

  //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //
  function hasOrAdd(item, shouldAdd, set) {
    var type = typeof item;
    var prevSize, newSize;
    switch (type) {
      case 'string':
      case 'number':
        // distinguish between +0 and -0
        if (item === 0 && 1 / item === -Infinity) {
          if (set._items['-0']) {
            return true;
          } else {
            if (shouldAdd) {
              set._items['-0'] = true;
            }
            return false;
          }
        }
        // these types can all utilise the native Set
        if (set._nativeSet !== null) {
          if (shouldAdd) {
            prevSize = set._nativeSet.size;
            set._nativeSet.add(item);
            newSize = set._nativeSet.size;
            return newSize === prevSize;
          } else {
            return set._nativeSet.has(item);
          }
        } else {
          if (!(type in set._items)) {
            if (shouldAdd) {
              set._items[type] = {};
              set._items[type][item] = true;
            }
            return false;
          } else if (item in set._items[type]) {
            return true;
          } else {
            if (shouldAdd) {
              set._items[type][item] = true;
            }
            return false;
          }
        }

      case 'boolean':
        // set._items['boolean'] holds a two element array
        // representing [ falseExists, trueExists ]
        if (type in set._items) {
          var bIdx = item ? 1 : 0;
          if (set._items[type][bIdx]) {
            return true;
          } else {
            if (shouldAdd) {
              set._items[type][bIdx] = true;
            }
            return false;
          }
        } else {
          if (shouldAdd) {
            set._items[type] = item ? [false, true] : [true, false];
          }
          return false;
        }

      case 'function':
        // compare functions for reference equality
        if (set._nativeSet !== null) {
          if (shouldAdd) {
            prevSize = set._nativeSet.size;
            set._nativeSet.add(item);
            newSize = set._nativeSet.size;
            return newSize === prevSize;
          } else {
            return set._nativeSet.has(item);
          }
        } else {
          if (!(type in set._items)) {
            if (shouldAdd) {
              set._items[type] = [item];
            }
            return false;
          }
          if (!_contains(item, set._items[type])) {
            if (shouldAdd) {
              set._items[type].push(item);
            }
            return false;
          }
          return true;
        }

      case 'undefined':
        if (set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type] = true;
          }
          return false;
        }

      case 'object':
        if (item === null) {
          if (!set._items['null']) {
            if (shouldAdd) {
              set._items['null'] = true;
            }
            return false;
          }
          return true;
        }
      /* falls through */
      default:
        // reduce the search size of heterogeneous sets by creating buckets
        // for each type.
        type = Object.prototype.toString.call(item);
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }
          return false;
        }
        // scan through all previously applied items
        if (!_contains(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }
          return false;
        }
        return true;
    }
  }
  return _Set;
}());

},{"./_contains":164}],155:[function(_dereq_,module,exports){
module.exports = function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
};

},{}],156:[function(_dereq_,module,exports){
module.exports = function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};

},{}],157:[function(_dereq_,module,exports){
module.exports = function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
};

},{}],158:[function(_dereq_,module,exports){
var _objectAssign = _dereq_('./_objectAssign');

module.exports =
  typeof Object.assign === 'function' ? Object.assign : _objectAssign;

},{"./_objectAssign":194}],159:[function(_dereq_,module,exports){
var _isArray = _dereq_('./_isArray');


/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
module.exports = function _checkForMethod(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
      fn.apply(this, arguments) :
      obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
};

},{"./_isArray":183}],160:[function(_dereq_,module,exports){
var _cloneRegExp = _dereq_('./_cloneRegExp');
var type = _dereq_('../type');


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
module.exports = function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ?
        _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':  return copy({});
    case 'Array':   return copy([]);
    case 'Date':    return new Date(value.valueOf());
    case 'RegExp':  return _cloneRegExp(value);
    default:        return value;
  }
};

},{"../type":349,"./_cloneRegExp":161}],161:[function(_dereq_,module,exports){
module.exports = function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global     ? 'g' : '') +
                                    (pattern.ignoreCase ? 'i' : '') +
                                    (pattern.multiline  ? 'm' : '') +
                                    (pattern.sticky     ? 'y' : '') +
                                    (pattern.unicode    ? 'u' : ''));
};

},{}],162:[function(_dereq_,module,exports){
module.exports = function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
};

},{}],163:[function(_dereq_,module,exports){
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
module.exports = function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
};

},{}],164:[function(_dereq_,module,exports){
var _indexOf = _dereq_('./_indexOf');


module.exports = function _contains(a, list) {
  return _indexOf(list, a, 0) >= 0;
};

},{"./_indexOf":181}],165:[function(_dereq_,module,exports){
module.exports = function _containsWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
};

},{}],166:[function(_dereq_,module,exports){
var _arity = _dereq_('./_arity');
var _curry2 = _dereq_('./_curry2');


module.exports = function _createPartialApplicator(concat) {
  return _curry2(function(fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function() {
      return fn.apply(this, concat(args, arguments));
    });
  });
};

},{"./_arity":156,"./_curry2":168}],167:[function(_dereq_,module,exports){
var _isPlaceholder = _dereq_('./_isPlaceholder');


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

},{"./_isPlaceholder":188}],168:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./_curry1');
var _isPlaceholder = _dereq_('./_isPlaceholder');


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2
             : _curry1(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
             : fn(a, b);
    }
  };
};

},{"./_curry1":167,"./_isPlaceholder":188}],169:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./_curry1');
var _curry2 = _dereq_('./_curry2');
var _isPlaceholder = _dereq_('./_isPlaceholder');


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3
             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _curry1(function(_c) { return fn(a, b, _c); });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
             : fn(a, b, c);
    }
  };
};

},{"./_curry1":167,"./_curry2":168,"./_isPlaceholder":188}],170:[function(_dereq_,module,exports){
var _arity = _dereq_('./_arity');
var _isPlaceholder = _dereq_('./_isPlaceholder');


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined)
                     : _arity(left, _curryN(length, combined, fn));
  };
};

},{"./_arity":156,"./_isPlaceholder":188}],171:[function(_dereq_,module,exports){
var _isArray = _dereq_('./_isArray');
var _isTransformer = _dereq_('./_isTransformer');


/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
module.exports = function _dispatchable(methodNames, xf, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
};

},{"./_isArray":183,"./_isTransformer":191}],172:[function(_dereq_,module,exports){
var take = _dereq_('../take');

module.exports = function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
};

},{"../take":332}],173:[function(_dereq_,module,exports){
module.exports = function dropLastWhile(pred, list) {
  var idx = list.length - 1;
  while (idx >= 0 && pred(list[idx])) {
    idx -= 1;
  }
  return Array.prototype.slice.call(list, 0, idx + 1);
};

},{}],174:[function(_dereq_,module,exports){
var _arrayFromIterator = _dereq_('./_arrayFromIterator');
var _functionName = _dereq_('./_functionName');
var _has = _dereq_('./_has');
var identical = _dereq_('../identical');
var keys = _dereq_('../keys');
var type = _dereq_('../type');


module.exports = function _equals(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  if (type(a) !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) &&
           typeof b.equals === 'function' && b.equals(a);
  }

  switch (type(a)) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' &&
          _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline &&
            a.sticky === b.sticky &&
            a.unicode === b.unicode)) {
        return false;
      }
      break;
    case 'Map':
    case 'Set':
      if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
        return false;
      }
      break;
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
      break;
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  stackA.push(a);
  stackB.push(b);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
      return false;
    }
    idx -= 1;
  }
  stackA.pop();
  stackB.pop();
  return true;
};

},{"../identical":145,"../keys":237,"../type":349,"./_arrayFromIterator":157,"./_functionName":178,"./_has":179}],175:[function(_dereq_,module,exports){
module.exports = function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
};

},{}],176:[function(_dereq_,module,exports){
var _forceReduced = _dereq_('./_forceReduced');
var _reduce = _dereq_('./_reduce');
var _xfBase = _dereq_('./_xfBase');
var isArrayLike = _dereq_('../isArrayLike');

module.exports = (function() {
  var preservingReduced = function(xf) {
    return {
      '@@transducer/init': _xfBase.init,
      '@@transducer/result': function(result) {
        return xf['@@transducer/result'](result);
      },
      '@@transducer/step': function(result, input) {
        var ret = xf['@@transducer/step'](result, input);
        return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
      }
    };
  };

  return function _xcat(xf) {
    var rxf = preservingReduced(xf);
    return {
      '@@transducer/init': _xfBase.init,
      '@@transducer/result': function(result) {
        return rxf['@@transducer/result'](result);
      },
      '@@transducer/step': function(result, input) {
        return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
      }
    };
  };
}());

},{"../isArrayLike":232,"./_forceReduced":177,"./_reduce":199,"./_xfBase":213}],177:[function(_dereq_,module,exports){
module.exports = function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
};

},{}],178:[function(_dereq_,module,exports){
module.exports = function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
};

},{}],179:[function(_dereq_,module,exports){
module.exports = function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

},{}],180:[function(_dereq_,module,exports){
module.exports = function _identity(x) { return x; };

},{}],181:[function(_dereq_,module,exports){
var equals = _dereq_('../equals');


module.exports = function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
};

},{"../equals":126}],182:[function(_dereq_,module,exports){
var _has = _dereq_('./_has');


module.exports = (function() {
  var toString = Object.prototype.toString;
  return toString.call(arguments) === '[object Arguments]' ?
    function _isArguments(x) { return toString.call(x) === '[object Arguments]'; } :
    function _isArguments(x) { return _has('callee', x); };
}());

},{"./_has":179}],183:[function(_dereq_,module,exports){
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};

},{}],184:[function(_dereq_,module,exports){
module.exports = function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
};

},{}],185:[function(_dereq_,module,exports){
/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return (n << 0) === n;
};

},{}],186:[function(_dereq_,module,exports){
module.exports = function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
};

},{}],187:[function(_dereq_,module,exports){
module.exports = function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
};

},{}],188:[function(_dereq_,module,exports){
module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};

},{}],189:[function(_dereq_,module,exports){
module.exports = function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
};

},{}],190:[function(_dereq_,module,exports){
module.exports = function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};

},{}],191:[function(_dereq_,module,exports){
module.exports = function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
};

},{}],192:[function(_dereq_,module,exports){
var isArrayLike = _dereq_('../isArrayLike');


/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */
module.exports = function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
};

},{"../isArrayLike":232}],193:[function(_dereq_,module,exports){
module.exports = function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
};

},{}],194:[function(_dereq_,module,exports){
var _has = _dereq_('./_has');

// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
module.exports = function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
};

},{"./_has":179}],195:[function(_dereq_,module,exports){
module.exports = function _of(x) { return [x]; };

},{}],196:[function(_dereq_,module,exports){
module.exports = function _pipe(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
};

},{}],197:[function(_dereq_,module,exports){
module.exports = function _pipeP(f, g) {
  return function() {
    var ctx = this;
    return f.apply(ctx, arguments).then(function(x) {
      return g.call(ctx, x);
    });
  };
};

},{}],198:[function(_dereq_,module,exports){
module.exports = function _quote(s) {
  var escaped = s
    .replace(/\\/g, '\\\\')
    .replace(/[\b]/g, '\\b')  // \b matches word boundary; [\b] matches backspace
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\v/g, '\\v')
    .replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
};

},{}],199:[function(_dereq_,module,exports){
var _xwrap = _dereq_('./_xwrap');
var bind = _dereq_('../bind');
var isArrayLike = _dereq_('../isArrayLike');


module.exports = (function() {
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      idx += 1;
    }
    return xf['@@transducer/result'](acc);
  }

  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();
    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      step = iter.next();
    }
    return xf['@@transducer/result'](acc);
  }

  function _methodReduce(xf, acc, obj) {
    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
  return function _reduce(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }
    if (isArrayLike(list)) {
      return _arrayReduce(fn, acc, list);
    }
    if (typeof list.reduce === 'function') {
      return _methodReduce(fn, acc, list);
    }
    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }
    if (typeof list.next === 'function') {
      return _iterableReduce(fn, acc, list);
    }
    throw new TypeError('reduce: list must be array or iterable');
  };
}());

},{"../bind":88,"../isArrayLike":232,"./_xwrap":223}],200:[function(_dereq_,module,exports){
module.exports = function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x :
    {
      '@@transducer/value': x,
      '@@transducer/reduced': true
    };
};

},{}],201:[function(_dereq_,module,exports){
var _assign = _dereq_('./_assign');
var _identity = _dereq_('./_identity');
var _isTransformer = _dereq_('./_isTransformer');
var isArrayLike = _dereq_('../isArrayLike');
var objOf = _dereq_('../objOf');


module.exports = (function() {
  var _stepCatArray = {
    '@@transducer/init': Array,
    '@@transducer/step': function(xs, x) {
      xs.push(x);
      return xs;
    },
    '@@transducer/result': _identity
  };
  var _stepCatString = {
    '@@transducer/init': String,
    '@@transducer/step': function(a, b) { return a + b; },
    '@@transducer/result': _identity
  };
  var _stepCatObject = {
    '@@transducer/init': Object,
    '@@transducer/step': function(result, input) {
      return _assign(
        result,
        isArrayLike(input) ? objOf(input[0], input[1]) : input
      );
    },
    '@@transducer/result': _identity
  };

  return function _stepCat(obj) {
    if (_isTransformer(obj)) {
      return obj;
    }
    if (isArrayLike(obj)) {
      return _stepCatArray;
    }
    if (typeof obj === 'string') {
      return _stepCatString;
    }
    if (typeof obj === 'object') {
      return _stepCatObject;
    }
    throw new Error('Cannot create transformer for ' + obj);
  };
}());

},{"../isArrayLike":232,"../objOf":275,"./_assign":158,"./_identity":180,"./_isTransformer":191}],202:[function(_dereq_,module,exports){
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
module.exports = (function() {
  var pad = function pad(n) { return (n < 10 ? '0' : '') + n; };

  return typeof Date.prototype.toISOString === 'function' ?
    function _toISOString(d) {
      return d.toISOString();
    } :
    function _toISOString(d) {
      return (
        d.getUTCFullYear() + '-' +
        pad(d.getUTCMonth() + 1) + '-' +
        pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds()) + '.' +
        (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z'
      );
    };
}());

},{}],203:[function(_dereq_,module,exports){
var _contains = _dereq_('./_contains');
var _map = _dereq_('./_map');
var _quote = _dereq_('./_quote');
var _toISOString = _dereq_('./_toISOString');
var keys = _dereq_('../keys');
var reject = _dereq_('../reject');


module.exports = function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function(obj, keys) {
    return _map(function(k) { return _quote(k) + ': ' + recur(obj[k]); }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function(k) { return /^\d+$/.test(k); }, keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
};

},{"../keys":237,"../reject":311,"./_contains":164,"./_map":193,"./_quote":198,"./_toISOString":202}],204:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _reduced = _dereq_('./_reduced');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase.init;
  XAll.prototype['@@transducer/result'] = function(result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function(result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }
    return result;
  };

  return _curry2(function _xall(f, xf) { return new XAll(f, xf); });
}());

},{"./_curry2":168,"./_reduced":200,"./_xfBase":213}],205:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _reduced = _dereq_('./_reduced');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny.prototype['@@transducer/init'] = _xfBase.init;
  XAny.prototype['@@transducer/result'] = function(result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAny.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }
    return result;
  };

  return _curry2(function _xany(f, xf) { return new XAny(f, xf); });
}());

},{"./_curry2":168,"./_reduced":200,"./_xfBase":213}],206:[function(_dereq_,module,exports){
var _concat = _dereq_('./_concat');
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XAperture.prototype['@@transducer/init'] = _xfBase.init;
  XAperture.prototype['@@transducer/result'] = function(result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XAperture.prototype['@@transducer/step'] = function(result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };
  XAperture.prototype.store = function(input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  XAperture.prototype.getCopy = function() {
    return _concat(Array.prototype.slice.call(this.acc, this.pos),
                   Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return _curry2(function _xaperture(n, xf) { return new XAperture(n, xf); });
}());

},{"./_concat":163,"./_curry2":168,"./_xfBase":213}],207:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _flatCat = _dereq_('./_flatCat');
var map = _dereq_('../map');


module.exports = _curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});

},{"../map":250,"./_curry2":168,"./_flatCat":176}],208:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;
  XDrop.prototype['@@transducer/step'] = function(result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xdrop(n, xf) { return new XDrop(n, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],209:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XDropLast.prototype['@@transducer/init'] = _xfBase.init;
  XDropLast.prototype['@@transducer/result'] =  function(result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLast.prototype['@@transducer/step'] = function(result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }
    this.store(input);
    return result;
  };
  XDropLast.prototype.store = function(input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return _curry2(function _xdropLast(n, xf) { return new XDropLast(n, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],210:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _reduce = _dereq_('./_reduce');
var _xfBase = _dereq_('./_xfBase');

module.exports = (function() {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropLastWhile.prototype['@@transducer/result'] = function(result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLastWhile.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.retain(result, input)
                         : this.flush(result, input);
  };
  XDropLastWhile.prototype.flush = function(result, input) {
    result = _reduce(
      this.xf['@@transducer/step'],
      result,
      this.retained
    );
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };
  XDropLastWhile.prototype.retain = function(result, input) {
    this.retained.push(input);
    return result;
  };

  return _curry2(function _xdropLastWhile(fn, xf) { return new XDropLastWhile(fn, xf); });
}());

},{"./_curry2":168,"./_reduce":199,"./_xfBase":213}],211:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
  XDropRepeatsWith.prototype['@@transducer/step'] = function(result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xdropRepeatsWith(pred, xf) { return new XDropRepeatsWith(pred, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],212:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
  XDropWhile.prototype['@@transducer/step'] = function(result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xdropWhile(f, xf) { return new XDropWhile(f, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],213:[function(_dereq_,module,exports){
module.exports = {
  init: function() {
    return this.xf['@@transducer/init']();
  },
  result: function(result) {
    return this.xf['@@transducer/result'](result);
  }
};

},{}],214:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;
  XFilter.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return _curry2(function _xfilter(f, xf) { return new XFilter(f, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],215:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _reduced = _dereq_('./_reduced');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase.init;
  XFind.prototype['@@transducer/result'] = function(result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return _curry2(function _xfind(f, xf) { return new XFind(f, xf); });
}());

},{"./_curry2":168,"./_reduced":200,"./_xfBase":213}],216:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _reduced = _dereq_('./_reduced');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindIndex.prototype['@@transducer/result'] = function(result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFindIndex.prototype['@@transducer/step'] = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }
    return result;
  };

  return _curry2(function _xfindIndex(f, xf) { return new XFindIndex(f, xf); });
}());

},{"./_curry2":168,"./_reduced":200,"./_xfBase":213}],217:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast.prototype['@@transducer/init'] = _xfBase.init;
  XFindLast.prototype['@@transducer/result'] = function(result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };
  XFindLast.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };

  return _curry2(function _xfindLast(f, xf) { return new XFindLast(f, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],218:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindLastIndex.prototype['@@transducer/result'] = function(result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };
  XFindLastIndex.prototype['@@transducer/step'] = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };

  return _curry2(function _xfindLastIndex(f, xf) { return new XFindLastIndex(f, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],219:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;
  XMap.prototype['@@transducer/step'] = function(result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
}());

},{"./_curry2":168,"./_xfBase":213}],220:[function(_dereq_,module,exports){
var _curryN = _dereq_('./_curryN');
var _has = _dereq_('./_has');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }
  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
  XReduceBy.prototype['@@transducer/result'] = function(result) {
    var key;
    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);
        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }
    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };
  XReduceBy.prototype['@@transducer/step'] = function(result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return _curryN(4, [],
                 function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
                   return new XReduceBy(valueFn, valueAcc, keyFn, xf);
                 });
}());

},{"./_curryN":170,"./_has":179,"./_xfBase":213}],221:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _reduced = _dereq_('./_reduced');
var _xfBase = _dereq_('./_xfBase');

module.exports = (function() {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }
  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;
  XTake.prototype['@@transducer/step'] = function(result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.i >= this.n ? _reduced(ret) : ret;
  };

  return _curry2(function _xtake(n, xf) { return new XTake(n, xf); });
}());

},{"./_curry2":168,"./_reduced":200,"./_xfBase":213}],222:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./_curry2');
var _reduced = _dereq_('./_reduced');
var _xfBase = _dereq_('./_xfBase');


module.exports = (function() {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
  XTakeWhile.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return _curry2(function _xtakeWhile(f, xf) { return new XTakeWhile(f, xf); });
}());

},{"./_curry2":168,"./_reduced":200,"./_xfBase":213}],223:[function(_dereq_,module,exports){
module.exports = (function() {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function() {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
  XWrap.prototype['@@transducer/step'] = function(acc, x) {
    return this.f(acc, x);
  };

  return function _xwrap(fn) { return new XWrap(fn); };
}());

},{}],224:[function(_dereq_,module,exports){
var _contains = _dereq_('./internal/_contains');
var _curry2 = _dereq_('./internal/_curry2');
var _filter = _dereq_('./internal/_filter');
var flip = _dereq_('./flip');
var uniq = _dereq_('./uniq');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.intersectionWith
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */
module.exports = _curry2(function intersection(list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  return uniq(_filter(flip(_contains)(lookupList), filteredList));
});

},{"./flip":134,"./internal/_contains":164,"./internal/_curry2":168,"./internal/_filter":175,"./uniq":356}],225:[function(_dereq_,module,exports){
var _containsWith = _dereq_('./internal/_containsWith');
var _curry3 = _dereq_('./internal/_curry3');
var uniqWith = _dereq_('./uniqWith');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate function that determines whether
 *        the two supplied elements are equal.
 * @param {Array} list1 One list of items to compare
 * @param {Array} list2 A second list of items to compare
 * @return {Array} A new list containing those elements common to both lists.
 * @see R.intersection
 * @example
 *
 *      var buffaloSpringfield = [
 *        {id: 824, name: 'Richie Furay'},
 *        {id: 956, name: 'Dewey Martin'},
 *        {id: 313, name: 'Bruce Palmer'},
 *        {id: 456, name: 'Stephen Stills'},
 *        {id: 177, name: 'Neil Young'}
 *      ];
 *      var csny = [
 *        {id: 204, name: 'David Crosby'},
 *        {id: 456, name: 'Stephen Stills'},
 *        {id: 539, name: 'Graham Nash'},
 *        {id: 177, name: 'Neil Young'}
 *      ];
 *
 *      R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield, csny);
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */
module.exports = _curry3(function intersectionWith(pred, list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  var results = [];
  var idx = 0;
  while (idx < filteredList.length) {
    if (_containsWith(pred, filteredList[idx], lookupList)) {
      results[results.length] = filteredList[idx];
    }
    idx += 1;
  }
  return uniqWith(pred, results);
});

},{"./internal/_containsWith":165,"./internal/_curry3":169,"./uniqWith":358}],226:[function(_dereq_,module,exports){
var _checkForMethod = _dereq_('./internal/_checkForMethod');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
 */
module.exports = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;
  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }
    idx += 1;
  }
  return out;
}));

},{"./internal/_checkForMethod":159,"./internal/_curry2":168}],227:[function(_dereq_,module,exports){
var _clone = _dereq_('./internal/_clone');
var _curry3 = _dereq_('./internal/_curry3');
var _isTransformer = _dereq_('./internal/_isTransformer');
var _reduce = _dereq_('./internal/_reduce');
var _stepCat = _dereq_('./internal/_stepCat');


/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with R.reduce after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      var intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */
module.exports = _curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ?
    _reduce(xf(acc), acc['@@transducer/init'](), list) :
    _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});

},{"./internal/_clone":160,"./internal/_curry3":169,"./internal/_isTransformer":191,"./internal/_reduce":199,"./internal/_stepCat":201}],228:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _has = _dereq_('./internal/_has');
var keys = _dereq_('./keys');


/**
 * Same as R.invertObj, however this accounts for objects with duplicate values
 * by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys
 * in an array.
 * @example
 *
 *      var raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */
module.exports = _curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : (out[val] = []);
    list[list.length] = key;
    idx += 1;
  }
  return out;
});

},{"./internal/_curry1":167,"./internal/_has":179,"./keys":237}],229:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var keys = _dereq_('./keys');


/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @example
 *
 *      var raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      var raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */
module.exports = _curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});

},{"./internal/_curry1":167,"./keys":237}],230:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isFunction = _dereq_('./internal/_isFunction');
var curryN = _dereq_('./curryN');
var toString = _dereq_('./toString');


/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */
module.exports = _curry2(function invoker(arity, method) {
  return curryN(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});

},{"./curryN":107,"./internal/_curry2":168,"./internal/_isFunction":184,"./toString":342}],231:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */
module.exports = _curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});

},{"./internal/_curry2":168}],232:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _isArray = _dereq_('./internal/_isArray');
var _isString = _dereq_('./internal/_isString');


/**
 * Tests whether or not an object is similar to an array.
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @deprecated since v0.23.0
 * @example
 *
 *      R.isArrayLike([]); //=> true
 *      R.isArrayLike(true); //=> false
 *      R.isArrayLike({}); //=> false
 *      R.isArrayLike({length: 10}); //=> false
 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
module.exports = _curry1(function isArrayLike(x) {
  if (_isArray(x)) { return true; }
  if (!x) { return false; }
  if (typeof x !== 'object') { return false; }
  if (_isString(x)) { return false; }
  if (x.nodeType === 1) { return !!x.length; }
  if (x.length === 0) { return true; }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});

},{"./internal/_curry1":167,"./internal/_isArray":183,"./internal/_isString":190}],233:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var empty = _dereq_('./empty');
var equals = _dereq_('./equals');


/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */
module.exports = _curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});

},{"./empty":123,"./equals":126,"./internal/_curry1":167}],234:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */
module.exports = _curry1(function isNil(x) { return x == null; });

},{"./internal/_curry1":167}],235:[function(_dereq_,module,exports){
var invoker = _dereq_('./invoker');


/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */
module.exports = invoker(1, 'join');

},{"./invoker":230}],236:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var converge = _dereq_('./converge');


/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      var getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */
module.exports = _curry1(function juxt(fns) {
  return converge(function() { return Array.prototype.slice.call(arguments, 0); }, fns);
});

},{"./converge":104,"./internal/_curry1":167}],237:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _has = _dereq_('./internal/_has');
var _isArguments = _dereq_('./internal/_isArguments');


/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
module.exports = (function() {
  // cover IE < 9 keys issues
  var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
                            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
  // Safari bug
  var hasArgsEnumBug = (function() {
    'use strict';
    return arguments.propertyIsEnumerable('length');
  }());

  var contains = function contains(list, item) {
    var idx = 0;
    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }
      idx += 1;
    }
    return false;
  };

  return typeof Object.keys === 'function' && !hasArgsEnumBug ?
    _curry1(function keys(obj) {
      return Object(obj) !== obj ? [] : Object.keys(obj);
    }) :
    _curry1(function keys(obj) {
      if (Object(obj) !== obj) {
        return [];
      }
      var prop, nIdx;
      var ks = [];
      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
      for (prop in obj) {
        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
          ks[ks.length] = prop;
        }
      }
      if (hasEnumBug) {
        nIdx = nonEnumerableProps.length - 1;
        while (nIdx >= 0) {
          prop = nonEnumerableProps[nIdx];
          if (_has(prop, obj) && !contains(ks, prop)) {
            ks[ks.length] = prop;
          }
          nIdx -= 1;
        }
      }
      return ks;
    });
}());

},{"./internal/_curry1":167,"./internal/_has":179,"./internal/_isArguments":182}],238:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */
module.exports = _curry1(function keysIn(obj) {
  var prop;
  var ks = [];
  for (prop in obj) {
    ks[ks.length] = prop;
  }
  return ks;
});

},{"./internal/_curry1":167}],239:[function(_dereq_,module,exports){
var nth = _dereq_('./nth');


/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */
module.exports = nth(-1);

},{"./nth":273}],240:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isArray = _dereq_('./internal/_isArray');
var equals = _dereq_('./equals');


/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. `R.equals` is used to determine
 * equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */
module.exports = _curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});

},{"./equals":126,"./internal/_curry2":168,"./internal/_isArray":183}],241:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _isNumber = _dereq_('./internal/_isNumber');


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */
module.exports = _curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});

},{"./internal/_curry1":167,"./internal/_isNumber":186}],242:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var map = _dereq_('./map');


/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
module.exports = _curry2(function lens(getter, setter) {
  return function(toFunctorFn) {
    return function(target) {
      return map(
        function(focus) {
          return setter(focus, target);
        },
        toFunctorFn(getter(target))
      );
    };
  };
});

},{"./internal/_curry2":168,"./map":250}],243:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var lens = _dereq_('./lens');
var nth = _dereq_('./nth');
var update = _dereq_('./update');


/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */
module.exports = _curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});

},{"./internal/_curry1":167,"./lens":242,"./nth":273,"./update":362}],244:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var assocPath = _dereq_('./assocPath');
var lens = _dereq_('./lens');
var path = _dereq_('./path');


/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */
module.exports = _curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});

},{"./assocPath":86,"./internal/_curry1":167,"./lens":242,"./path":285}],245:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var assoc = _dereq_('./assoc');
var lens = _dereq_('./lens');
var prop = _dereq_('./prop');


/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
module.exports = _curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});

},{"./assoc":85,"./internal/_curry1":167,"./lens":242,"./prop":299}],246:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var liftN = _dereq_('./liftN');


/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */
module.exports = _curry1(function lift(fn) {
  return liftN(fn.length, fn);
});

},{"./internal/_curry1":167,"./liftN":247}],247:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _reduce = _dereq_('./internal/_reduce');
var ap = _dereq_('./ap');
var curryN = _dereq_('./curryN');
var map = _dereq_('./map');


/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */
module.exports = _curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function() {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});

},{"./ap":79,"./curryN":107,"./internal/_curry2":168,"./internal/_reduce":199,"./map":250}],248:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */
module.exports = _curry2(function lt(a, b) { return a < b; });

},{"./internal/_curry2":168}],249:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */
module.exports = _curry2(function lte(a, b) { return a <= b; });

},{"./internal/_curry2":168}],250:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _map = _dereq_('./internal/_map');
var _reduce = _dereq_('./internal/_reduce');
var _xmap = _dereq_('./internal/_xmap');
var curryN = _dereq_('./curryN');
var keys = _dereq_('./keys');


/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */
module.exports = _curry2(_dispatchable(['map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    default:
      return _map(fn, functor);
  }
}));

},{"./curryN":107,"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_map":193,"./internal/_reduce":199,"./internal/_xmap":219,"./keys":237}],251:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * The mapAccum function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccumRight
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */
module.exports = _curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});

},{"./internal/_curry3":169}],252:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * The mapAccumRight function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to `mapAccum`, except moves through the input list from the right to
 * the left.
 *
 * The iterator function receives two arguments, *value* and *acc*, and should
 * return a tuple *[value, acc]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (x-> acc -> (y, acc)) -> acc -> [x] -> ([y], acc)
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var append = (a, b) => [a + b, a + b];
 *
 *      R.mapAccumRight(append, 5, digits); //=> [['12345', '2345', '345', '45'], '12345']
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   [
 *     f(b, f(c, f(d, a)[0])[0])[1],
 *     f(c, f(d, a)[0])[1],
 *     f(d, a)[1],
 *   ]
 *   f(b, f(c, f(d, a)[0])[0])[0],
 * ]
 */
module.exports = _curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(list[idx], tuple[0]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [result, tuple[0]];
});

},{"./internal/_curry3":169}],253:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _reduce = _dereq_('./internal/_reduce');
var keys = _dereq_('./keys');


/**
 * An Object-specific version of `map`. The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * `map` instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */
module.exports = _curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});

},{"./internal/_curry2":168,"./internal/_reduce":199,"./keys":237}],254:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */
module.exports = _curry2(function match(rx, str) {
  return str.match(rx) || [];
});

},{"./internal/_curry2":168}],255:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isInteger = _dereq_('./internal/_isInteger');


/**
 * mathMod behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, R.modulo). So while "-17 % 5" is -2,
 * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
 * when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      var clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      var seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */
module.exports = _curry2(function mathMod(m, p) {
  if (!_isInteger(m)) { return NaN; }
  if (!_isInteger(p) || p < 1) { return NaN; }
  return ((m % p) + p) % p;
});

},{"./internal/_curry2":168,"./internal/_isInteger":185}],256:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */
module.exports = _curry2(function max(a, b) { return b > a ? b : a; });

},{"./internal/_curry2":168}],257:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */
module.exports = _curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});

},{"./internal/_curry3":169}],258:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var sum = _dereq_('./sum');


/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */
module.exports = _curry1(function mean(list) {
  return sum(list) / list.length;
});

},{"./internal/_curry1":167,"./sum":328}],259:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var mean = _dereq_('./mean');


/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */
module.exports = _curry1(function median(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});

},{"./internal/_curry1":167,"./mean":258}],260:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _curry1 = _dereq_('./internal/_curry1');
var _has = _dereq_('./internal/_has');
var toString = _dereq_('./toString');


/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *
 *      var count = 0;
 *      var factorial = R.memoize(n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */
module.exports = _curry1(function memoize(fn) {
  var cache = {};
  return _arity(fn.length, function() {
    var key = toString(arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});

},{"./internal/_arity":156,"./internal/_curry1":167,"./internal/_has":179,"./toString":342}],261:[function(_dereq_,module,exports){
var _assign = _dereq_('./internal/_assign');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge({ x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: 5, z: 3 }
 */
module.exports = _curry2(function merge(l, r) {
  return _assign({}, l, r);
});

},{"./internal/_assign":158,"./internal/_curry2":168}],262:[function(_dereq_,module,exports){
var _assign = _dereq_('./internal/_assign');
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */
module.exports = _curry1(function mergeAll(list) {
  return _assign.apply(null, [{}].concat(list));
});

},{"./internal/_assign":158,"./internal/_curry1":167}],263:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var mergeWithKey = _dereq_('./mergeWithKey');


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object. The key will be
 * excluded from the returned object if the resulting value is `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig (a -> a -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */
module.exports = _curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function(_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});

},{"./internal/_curry3":169,"./mergeWithKey":264}],264:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var _has = _dereq_('./internal/_has');


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object. The key
 * will be excluded from the returned object if the resulting value is
 * `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig (String -> a -> a -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */
module.exports = _curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !(_has(k, result))) {
      result[k] = r[k];
    }
  }

  return result;
});

},{"./internal/_curry3":169,"./internal/_has":179}],265:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */
module.exports = _curry2(function min(a, b) { return b < a ? b : a; });

},{"./internal/_curry2":168}],266:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */
module.exports = _curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});

},{"./internal/_curry3":169}],267:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see `mathMod`.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      var isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */
module.exports = _curry2(function modulo(a, b) { return a % b; });

},{"./internal/_curry2":168}],268:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */
module.exports = _curry2(function multiply(a, b) { return a * b; });

},{"./internal/_curry2":168}],269:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */
module.exports = _curry2(function nAry(n, fn) {
  switch (n) {
    case 0: return function() {return fn.call(this);};
    case 1: return function(a0) {return fn.call(this, a0);};
    case 2: return function(a0, a1) {return fn.call(this, a0, a1);};
    case 3: return function(a0, a1, a2) {return fn.call(this, a0, a1, a2);};
    case 4: return function(a0, a1, a2, a3) {return fn.call(this, a0, a1, a2, a3);};
    case 5: return function(a0, a1, a2, a3, a4) {return fn.call(this, a0, a1, a2, a3, a4);};
    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.call(this, a0, a1, a2, a3, a4, a5);};
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6);};
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);};
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);};
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);};
    default: throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});

},{"./internal/_curry2":168}],270:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */
module.exports = _curry1(function negate(n) { return -n; });

},{"./internal/_curry1":167}],271:[function(_dereq_,module,exports){
var _complement = _dereq_('./internal/_complement');
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xany = _dereq_('./internal/_xany');
var any = _dereq_('./any');


/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isEven, [1, 3, 5, 7, 8, 11]); //=> false
 */
module.exports = _curry2(_complement(_dispatchable(['any'], _xany, any)));

},{"./any":77,"./internal/_complement":162,"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xany":205}],272:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */
module.exports = _curry1(function not(a) {
  return !a;
});

},{"./internal/_curry1":167}],273:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isString = _dereq_('./internal/_isString');


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */
module.exports = _curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

},{"./internal/_curry2":168,"./internal/_isString":190}],274:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var curryN = _dereq_('./curryN');
var nth = _dereq_('./nth');


/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */
module.exports = _curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function() {
    return nth(n, arguments);
  });
});

},{"./curryN":107,"./internal/_curry1":167,"./nth":273}],275:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */
module.exports = _curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});

},{"./internal/_curry2":168}],276:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _of = _dereq_('./internal/_of');


/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */
module.exports = _curry1(_of);

},{"./internal/_curry1":167,"./internal/_of":195}],277:[function(_dereq_,module,exports){
var _contains = _dereq_('./internal/_contains');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */
module.exports = _curry2(function omit(names, obj) {
  var result = {};
  for (var prop in obj) {
    if (!_contains(prop, names)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});

},{"./internal/_contains":164,"./internal/_curry2":168}],278:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */
module.exports = _curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function() {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});

},{"./internal/_arity":156,"./internal/_curry1":167}],279:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */
module.exports = _curry2(function or(a, b) {
  return a || b;
});

},{"./internal/_curry2":168}],280:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */
module.exports = (function() {
  // `Identity` is a functor that holds a single value, where `map` simply
  // transforms the held value with the provided function.
  var Identity = function(x) {
    return {value: x, map: function(f) { return Identity(f(x)); }};
  };

  return _curry3(function over(lens, f, x) {
    // The value returned by the getter function is first transformed with `f`,
    // then set as the value of an `Identity`. This is then mapped over with the
    // setter function of the lens.
    return lens(function(y) { return Identity(f(y)); })(x).value;
  });
}());

},{"./internal/_curry3":169}],281:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */
module.exports = _curry2(function pair(fst, snd) { return [fst, snd]; });

},{"./internal/_curry2":168}],282:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _createPartialApplicator = _dereq_('./internal/_createPartialApplicator');


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight
 * @example
 *
 *      var multiply2 = (a, b) => a * b;
 *      var double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var sayHello = R.partial(greet, ['Hello']);
 *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */
module.exports = _createPartialApplicator(_concat);

},{"./internal/_concat":163,"./internal/_createPartialApplicator":166}],283:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _createPartialApplicator = _dereq_('./internal/_createPartialApplicator');
var flip = _dereq_('./flip');


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */
module.exports = _createPartialApplicator(flip(_concat));

},{"./flip":134,"./internal/_concat":163,"./internal/_createPartialApplicator":166}],284:[function(_dereq_,module,exports){
var filter = _dereq_('./filter');
var juxt = _dereq_('./juxt');
var reject = _dereq_('./reject');


/**
 * Takes a predicate and a list or other "filterable" object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */
module.exports = juxt([filter, reject]);

},{"./filter":128,"./juxt":236,"./reject":311}],285:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
module.exports = _curry2(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});

},{"./internal/_curry2":168}],286:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var equals = _dereq_('./equals');
var path = _dereq_('./path');


/**
 * Determines whether a nested path on an object has a specific value, in
 * `R.equals` terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      var user1 = { address: { zipCode: 90210 } };
 *      var user2 = { address: { zipCode: 55555 } };
 *      var user3 = { name: 'Bob' };
 *      var users = [ user1, user2, user3 ];
 *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */
module.exports = _curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});

},{"./equals":126,"./internal/_curry3":169,"./path":285}],287:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var defaultTo = _dereq_('./defaultTo');
var path = _dereq_('./path');


/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
module.exports = _curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});

},{"./defaultTo":109,"./internal/_curry3":169,"./path":285}],288:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var path = _dereq_('./path');


/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 */
module.exports = _curry3(function pathSatisfies(pred, propPath, obj) {
  return propPath.length > 0 && pred(path(propPath, obj));
});

},{"./internal/_curry3":169,"./path":285}],289:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
module.exports = _curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});

},{"./internal/_curry2":168}],290:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */
module.exports = _curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});

},{"./internal/_curry2":168}],291:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      var isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */
module.exports = _curry2(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});

},{"./internal/_curry2":168}],292:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _pipe = _dereq_('./internal/_pipe');
var reduce = _dereq_('./reduce');
var tail = _dereq_('./tail');


/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
module.exports = function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length,
                reduce(_pipe, arguments[0], tail(arguments)));
};

},{"./internal/_arity":156,"./internal/_pipe":196,"./reduce":306,"./tail":331}],293:[function(_dereq_,module,exports){
var composeK = _dereq_('./composeK');
var reverse = _dereq_('./reverse');

/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      var getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */
module.exports = function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }
  return composeK.apply(this, reverse(arguments));
};

},{"./composeK":97,"./reverse":315}],294:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _pipeP = _dereq_('./internal/_pipeP');
var reduce = _dereq_('./reduce');
var tail = _dereq_('./tail');


/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The leftmost function may have any arity; the remaining functions
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */
module.exports = function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }
  return _arity(arguments[0].length,
                reduce(_pipeP, arguments[0], tail(arguments)));
};

},{"./internal/_arity":156,"./internal/_pipeP":197,"./reduce":306,"./tail":331}],295:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var map = _dereq_('./map');
var prop = _dereq_('./prop');


/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig k -> [{k: v}] -> [v]
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} list The array to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */
module.exports = _curry2(function pluck(p, list) {
  return map(prop(p), list);
});

},{"./internal/_curry2":168,"./map":250,"./prop":299}],296:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */
module.exports = _curry2(function prepend(el, list) {
  return _concat([el], list);
});

},{"./internal/_concat":163,"./internal/_curry2":168}],297:[function(_dereq_,module,exports){
var multiply = _dereq_('./multiply');
var reduce = _dereq_('./reduce');


/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
module.exports = reduce(multiply, 1);

},{"./multiply":268,"./reduce":306}],298:[function(_dereq_,module,exports){
var _map = _dereq_('./internal/_map');
var identity = _dereq_('./identity');
var pickAll = _dereq_('./pickAll');
var useWith = _dereq_('./useWith');


/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      var kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */
module.exports = useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity

},{"./identity":146,"./internal/_map":193,"./pickAll":290,"./useWith":363}],299:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */
module.exports = _curry2(function prop(p, obj) { return obj[p]; });

},{"./internal/_curry2":168}],300:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var equals = _dereq_('./equals');


/**
 * Returns `true` if the specified object property is equal, in `R.equals`
 * terms, to the given value; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.equals, R.propSatisfies
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */
module.exports = _curry3(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});

},{"./equals":126,"./internal/_curry3":169}],301:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var is = _dereq_('./is');


/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */
module.exports = _curry3(function propIs(type, name, obj) {
  return is(type, obj[name]);
});

},{"./internal/_curry3":169,"./is":231}],302:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var _has = _dereq_('./internal/_has');


/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */
module.exports = _curry3(function propOr(val, p, obj) {
  return (obj != null && _has(p, obj)) ? obj[p] : val;
});

},{"./internal/_curry3":169,"./internal/_has":179}],303:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
module.exports = _curry3(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});

},{"./internal/_curry3":169}],304:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */
module.exports = _curry2(function props(ps, obj) {
  var len = ps.length;
  var out = [];
  var idx = 0;

  while (idx < len) {
    out[idx] = obj[ps[idx]];
    idx += 1;
  }

  return out;
});

},{"./internal/_curry2":168}],305:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _isNumber = _dereq_('./internal/_isNumber');


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */
module.exports = _curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});

},{"./internal/_curry2":168,"./internal/_isNumber":186}],306:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var _reduce = _dereq_('./internal/_reduce');


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * `R.reduced` to shortcut the iteration.
 *
 * The arguments' order of `reduceRight`'s iterator function is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *                -               -10
 *               / \              / \
 *              -   4           -6   4
 *             / \              / \
 *            -   3   ==>     -3   3
 *           / \              / \
 *          -   2           -1   2
 *         / \              / \
 *        0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */
module.exports = _curry3(_reduce);

},{"./internal/_curry3":169,"./internal/_reduce":199}],307:[function(_dereq_,module,exports){
var _curryN = _dereq_('./internal/_curryN');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _has = _dereq_('./internal/_has');
var _reduce = _dereq_('./internal/_reduce');
var _xreduceBy = _dereq_('./internal/_xreduceBy');


/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general `groupBy` function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
 *      var namesByGrade = reduceToNamesBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Lucy', score: 92},
 *                      {name: 'Drew', score: 85},
 *                      // ...
 *                      {name: 'Bart', score: 62}];
 *      namesByGrade(students);
 *      // {
 *      //   'A': ['Lucy'],
 *      //   'B': ['Drew']
 *      //   // ...,
 *      //   'F': ['Bart']
 *      // }
 */
module.exports = _curryN(4, [], _dispatchable([], _xreduceBy,
  function reduceBy(valueFn, valueAcc, keyFn, list) {
    return _reduce(function(acc, elt) {
      var key = keyFn(elt);
      acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
      return acc;
    }, {}, list);
  }));

},{"./internal/_curryN":170,"./internal/_dispatchable":171,"./internal/_has":179,"./internal/_reduce":199,"./internal/_xreduceBy":220}],308:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to `reduce`, except moves through the input list from the right to
 * the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a, b -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *          -               -2
 *         / \              / \
 *        1   -            1   3
 *           / \              / \
 *          2   -     ==>    2  -1
 *             / \              / \
 *            3   -            3   4
 *               / \              / \
 *              4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */
module.exports = _curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});

},{"./internal/_curry3":169}],309:[function(_dereq_,module,exports){
var _curryN = _dereq_('./internal/_curryN');
var _reduce = _dereq_('./internal/_reduce');
var _reduced = _dereq_('./internal/_reduced');


/**
 * Like `reduce`, `reduceWhile` returns a single item by iterating through
 * the list, successively calling the iterator function. `reduceWhile` also
 * takes a predicate that is evaluated before each step. If the predicate returns
 * `false`, it "short-circuits" the iteration and returns the current value
 * of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      var isOdd = (acc, x) => x % 2 === 1;
 *      var xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      var ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */
module.exports = _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function(acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});

},{"./internal/_curryN":170,"./internal/_reduce":199,"./internal/_reduced":200}],310:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _reduced = _dereq_('./internal/_reduced');

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is unavailable to functions not explicitly listed
 * above. For instance, it is not currently supported by reduceRight.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.transduce
 * @example
 *
 *      R.reduce(
 *        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
 *        0,
 *        [1, 2, 3, 4, 5]) // 10
 */

module.exports = _curry1(_reduced);

},{"./internal/_curry1":167,"./internal/_reduced":200}],311:[function(_dereq_,module,exports){
var _complement = _dereq_('./internal/_complement');
var _curry2 = _dereq_('./internal/_curry2');
var filter = _dereq_('./filter');


/**
 * The complement of `filter`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
module.exports = _curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});

},{"./filter":128,"./internal/_complement":162,"./internal/_curry2":168}],312:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */
module.exports = _curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});

},{"./internal/_curry3":169}],313:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var always = _dereq_('./always');
var times = _dereq_('./times');


/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      var obj = {};
 *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */
module.exports = _curry2(function repeat(value, n) {
  return times(always(value), n);
});

},{"./always":75,"./internal/_curry2":168,"./times":338}],314:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */
module.exports = _curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

},{"./internal/_curry3":169}],315:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _isString = _dereq_('./internal/_isString');


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */
module.exports = _curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') :
                           Array.prototype.slice.call(list, 0).reverse();
});

},{"./internal/_curry1":167,"./internal/_isString":190}],316:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Scan is similar to reduce, but returns a list of successively reduced values
 * from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a,b -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */
module.exports = _curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
});

},{"./internal/_curry3":169}],317:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var ap = _dereq_('./ap');
var map = _dereq_('./map');
var prepend = _dereq_('./prepend');
var reduceRight = _dereq_('./reduceRight');


/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */
module.exports = _curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ?
    traversable.sequence(of) :
    reduceRight(function(x, acc) { return ap(map(prepend, x), acc); },
                of([]),
                traversable);
});

},{"./ap":79,"./internal/_curry2":168,"./map":250,"./prepend":296,"./reduceRight":308}],318:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var always = _dereq_('./always');
var over = _dereq_('./over');


/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */
module.exports = _curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});

},{"./always":75,"./internal/_curry3":169,"./over":280}],319:[function(_dereq_,module,exports){
var _checkForMethod = _dereq_('./internal/_checkForMethod');
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

},{"./internal/_checkForMethod":159,"./internal/_curry3":169}],320:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a,a -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */
module.exports = _curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

},{"./internal/_curry2":168}],321:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      var sortByFirstItem = R.sortBy(R.prop(0));
 *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      var people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */
module.exports = _curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

},{"./internal/_curry2":168}],322:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [a -> a -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      var alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      var bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      var people = [clara, bob, alice];
 *      var ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */
module.exports = _curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function(a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});

},{"./internal/_curry2":168}],323:[function(_dereq_,module,exports){
var invoker = _dereq_('./invoker');


/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `str`.
 * @see R.join
 * @example
 *
 *      var pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */
module.exports = invoker(1, 'split');

},{"./invoker":230}],324:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var length = _dereq_('./length');
var slice = _dereq_('./slice');


/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */
module.exports = _curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});

},{"./internal/_curry2":168,"./length":241,"./slice":319}],325:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var slice = _dereq_('./slice');


/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */
module.exports = _curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }
  return result;
});

},{"./internal/_curry2":168,"./slice":319}],326:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */
module.exports = _curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});

},{"./internal/_curry2":168}],327:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */
module.exports = _curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});

},{"./internal/_curry2":168}],328:[function(_dereq_,module,exports){
var add = _dereq_('./add');
var reduce = _dereq_('./reduce');


/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */
module.exports = reduce(add, 0);

},{"./add":70,"./reduce":306}],329:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var concat = _dereq_('./concat');
var difference = _dereq_('./difference');


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */
module.exports = _curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});

},{"./concat":99,"./difference":111,"./internal/_curry2":168}],330:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var concat = _dereq_('./concat');
var differenceWith = _dereq_('./differenceWith');


/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      var eqA = R.eqBy(R.prop('a'));
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */
module.exports = _curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});

},{"./concat":99,"./differenceWith":112,"./internal/_curry3":169}],331:[function(_dereq_,module,exports){
var _checkForMethod = _dereq_('./internal/_checkForMethod');
var _curry1 = _dereq_('./internal/_curry1');
var slice = _dereq_('./slice');


/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
module.exports = _curry1(_checkForMethod('tail', slice(1, Infinity)));

},{"./internal/_checkForMethod":159,"./internal/_curry1":167,"./slice":319}],332:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xtake = _dereq_('./internal/_xtake');
var slice = _dereq_('./slice');


/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */
module.exports = _curry2(_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xtake":221,"./slice":319}],333:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var drop = _dereq_('./drop');


/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */
module.exports = _curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

},{"./drop":116,"./internal/_curry2":168}],334:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      var isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 */
module.exports = _curry2(function takeLastWhile(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0 && fn(list[idx])) {
    idx -= 1;
  }
  return Array.prototype.slice.call(list, idx + 1);
});

},{"./internal/_curry2":168}],335:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _dispatchable = _dereq_('./internal/_dispatchable');
var _xtakeWhile = _dereq_('./internal/_xtakeWhile');


/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      var isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 */
module.exports = _curry2(_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len && fn(list[idx])) {
    idx += 1;
  }
  return Array.prototype.slice.call(list, 0, idx);
}));

},{"./internal/_curry2":168,"./internal/_dispatchable":171,"./internal/_xtakeWhile":222}],336:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */
module.exports = _curry2(function tap(fn, x) {
  fn(x);
  return x;
});

},{"./internal/_curry2":168}],337:[function(_dereq_,module,exports){
var _cloneRegExp = _dereq_('./internal/_cloneRegExp');
var _curry2 = _dereq_('./internal/_curry2');
var _isRegExp = _dereq_('./internal/_isRegExp');
var toString = _dereq_('./toString');


/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */
module.exports = _curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});

},{"./internal/_cloneRegExp":161,"./internal/_curry2":168,"./internal/_isRegExp":189,"./toString":342}],338:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */
module.exports = _curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});

},{"./internal/_curry2":168}],339:[function(_dereq_,module,exports){
var invoker = _dereq_('./invoker');


/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */
module.exports = invoker(0, 'toLowerCase');

},{"./invoker":230}],340:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _has = _dereq_('./internal/_has');


/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */
module.exports = _curry1(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});

},{"./internal/_curry1":167,"./internal/_has":179}],341:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */
module.exports = _curry1(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});

},{"./internal/_curry1":167}],342:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var _toString = _dereq_('./internal/_toString');


/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
module.exports = _curry1(function toString(val) { return _toString(val, []); });

},{"./internal/_curry1":167,"./internal/_toString":203}],343:[function(_dereq_,module,exports){
var invoker = _dereq_('./invoker');


/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */
module.exports = invoker(0, 'toUpperCase');

},{"./invoker":230}],344:[function(_dereq_,module,exports){
var _reduce = _dereq_('./internal/_reduce');
var _xwrap = _dereq_('./internal/_xwrap');
var curryN = _dereq_('./curryN');


/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the `R.reduced` function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is R.identity. The init
 * function can be used to provide an initial accumulator, but is ignored by
 * transduce.
 *
 * The iteration is performed with R.reduce after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 */
module.exports = curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});

},{"./curryN":107,"./internal/_reduce":199,"./internal/_xwrap":223}],345:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 * If some of the rows are shorter than the following rows, their elements are skipped:
 *
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */
module.exports = _curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});

},{"./internal/_curry1":167}],346:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var map = _dereq_('./map');
var sequence = _dereq_('./sequence');


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */
module.exports = _curry3(function traverse(of, f, traversable) {
  return sequence(of, map(f, traversable));
});

},{"./internal/_curry3":169,"./map":250,"./sequence":317}],347:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */
module.exports = (function() {
  var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
           '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
           '\u2029\uFEFF';
  var zeroWidth = '\u200b';
  var hasProtoTrim = (typeof String.prototype.trim === 'function');
  if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
    return _curry1(function trim(str) {
      var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
      var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
      return str.replace(beginRx, '').replace(endRx, '');
    });
  } else {
    return _curry1(function trim(str) {
      return str.trim();
    });
  }
}());

},{"./internal/_curry1":167}],348:[function(_dereq_,module,exports){
var _arity = _dereq_('./internal/_arity');
var _concat = _dereq_('./internal/_concat');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */
module.exports = _curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function() {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});

},{"./internal/_arity":156,"./internal/_concat":163,"./internal/_curry2":168}],349:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 */
module.exports = _curry1(function type(val) {
  return val === null      ? 'Null'      :
         val === undefined ? 'Undefined' :
         Object.prototype.toString.call(val).slice(8, -1);
});

},{"./internal/_curry1":167}],350:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, R.unapply derives a variadic function from a function which
 * takes an array. R.unapply is the inverse of R.apply.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */
module.exports = _curry1(function unapply(fn) {
  return function() {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});

},{"./internal/_curry1":167}],351:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var nAry = _dereq_('./nAry');


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */
module.exports = _curry1(function unary(fn) {
  return nAry(1, fn);
});

},{"./internal/_curry1":167,"./nAry":269}],352:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var curryN = _dereq_('./curryN');


/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      var addFour = a => b => c => d => a + b + c + d;
 *
 *      var uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */
module.exports = _curry2(function uncurryN(depth, fn) {
  return curryN(depth, function() {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});

},{"./curryN":107,"./internal/_curry2":168}],353:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      var f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */
module.exports = _curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});

},{"./internal/_curry2":168}],354:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _curry2 = _dereq_('./internal/_curry2');
var compose = _dereq_('./compose');
var uniq = _dereq_('./uniq');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */
module.exports = _curry2(compose(uniq, _concat));

},{"./compose":96,"./internal/_concat":163,"./internal/_curry2":168,"./uniq":356}],355:[function(_dereq_,module,exports){
var _concat = _dereq_('./internal/_concat');
var _curry3 = _dereq_('./internal/_curry3');
var uniqWith = _dereq_('./uniqWith');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      var l1 = [{a: 1}, {a: 2}];
 *      var l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */
module.exports = _curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});

},{"./internal/_concat":163,"./internal/_curry3":169,"./uniqWith":358}],356:[function(_dereq_,module,exports){
var identity = _dereq_('./identity');
var uniqBy = _dereq_('./uniqBy');


/**
 * Returns a new list containing only one copy of each element in the original
 * list. `R.equals` is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */
module.exports = uniqBy(identity);

},{"./identity":146,"./uniqBy":357}],357:[function(_dereq_,module,exports){
var _Set = _dereq_('./internal/_Set');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. `R.equals` is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */
module.exports = _curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});

},{"./internal/_Set":154,"./internal/_curry2":168}],358:[function(_dereq_,module,exports){
var _containsWith = _dereq_('./internal/_containsWith');
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig (a, a -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      var strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */
module.exports = _curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!_containsWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});

},{"./internal/_containsWith":165,"./internal/_curry2":168}],359:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when
 * @example
 *
 *      // coerceArray :: (a|[a]) -> [a]
 *      var coerceArray = R.unless(R.isArrayLike, R.of);
 *      coerceArray([1, 2, 3]); //=> [1, 2, 3]
 *      coerceArray(1);         //=> [1]
 */
module.exports = _curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});

},{"./internal/_curry3":169}],360:[function(_dereq_,module,exports){
var _identity = _dereq_('./internal/_identity');
var chain = _dereq_('./chain');


/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */
module.exports = chain(_identity);

},{"./chain":91,"./internal/_identity":180}],361:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */
module.exports = _curry3(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});

},{"./internal/_curry3":169}],362:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');
var adjust = _dereq_('./adjust');
var always = _dereq_('./always');


/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */
module.exports = _curry3(function update(idx, x, list) {
  return adjust(always(x), idx, list);
});

},{"./adjust":72,"./always":75,"./internal/_curry3":169}],363:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var curryN = _dereq_('./curryN');


/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (x1 -> x2 -> ... -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */
module.exports = _curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function() {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});

},{"./curryN":107,"./internal/_curry2":168}],364:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');
var keys = _dereq_('./keys');


/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */
module.exports = _curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});

},{"./internal/_curry1":167,"./keys":237}],365:[function(_dereq_,module,exports){
var _curry1 = _dereq_('./internal/_curry1');


/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */
module.exports = _curry1(function valuesIn(obj) {
  var prop;
  var vs = [];
  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }
  return vs;
});

},{"./internal/_curry1":167}],366:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */
module.exports = (function() {
  // `Const` is a functor that effectively ignores the function given to `map`.
  var Const = function(x) {
    return {value: x, map: function() { return this; }};
  };

  return _curry2(function view(lens, x) {
    // Using `Const` effectively ignores the setter function of the `lens`,
    // leaving the value returned by the getter function unmodified.
    return lens(Const)(x).value;
  });
}());

},{"./internal/_curry2":168}],367:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless
 * @example
 *
 *      // truncate :: String -> String
 *      var truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */
module.exports = _curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});

},{"./internal/_curry3":169}],368:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var _has = _dereq_('./internal/_has');


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as `filter` and `find`.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(__, 10),
 *        y: R.lt(__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */
module.exports = _curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }
  return true;
});

},{"./internal/_curry2":168,"./internal/_has":179}],369:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');
var equals = _dereq_('./equals');
var map = _dereq_('./map');
var where = _dereq_('./where');


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in `R.equals` terms) as accessing that property of the spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */
module.exports = _curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});

},{"./equals":126,"./internal/_curry2":168,"./map":250,"./where":368}],370:[function(_dereq_,module,exports){
var _contains = _dereq_('./internal/_contains');
var _curry2 = _dereq_('./internal/_curry2');
var flip = _dereq_('./flip');
var reject = _dereq_('./reject');


/**
 * Returns a new list without values in the first argument.
 * `R.equals` is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */
module.exports = _curry2(function(xs, list) {
  return reject(flip(_contains)(xs), list);
});

},{"./flip":134,"./internal/_contains":164,"./internal/_curry2":168,"./reject":311}],371:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */
module.exports = _curry2(function xprod(a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];
  while (idx < ilen) {
    j = 0;
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }
    idx += 1;
  }
  return result;
});

},{"./internal/_curry2":168}],372:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */
module.exports = _curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});

},{"./internal/_curry2":168}],373:[function(_dereq_,module,exports){
var _curry2 = _dereq_('./internal/_curry2');


/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zipWith(pair), fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});

},{"./internal/_curry2":168}],374:[function(_dereq_,module,exports){
var _curry3 = _dereq_('./internal/_curry3');


/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a,b -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      var f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */
module.exports = _curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});

},{"./internal/_curry3":169}],375:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMapFromURL = undefined;

var _engine = _dereq_('../../utils/engine');

var Map = function Map(store) {};

var createEmptyMap = function createEmptyMap() {};

var createMapFromJSON = function createMapFromJSON(json) {};

var createMapFromURL = exports.createMapFromURL = function createMapFromURL(url) {
    console.log((0, _engine.getInitialMapData)(url));
};

},{"../../utils/engine":377}],376:[function(_dereq_,module,exports){
'use strict';

var _map = _dereq_('./components/map/map');

var Carto = function Carto(container) {
    var frame = null;

    if (typeof container === 'string') {
        frame = document.getElementById(container);
    } else {
        frame = container;
    }
};

Carto.create = _map.createMapFromURL;

module.exports = Carto;

},{"./components/map/map":375}],377:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateLayerStyle = exports.getInitalMapData = exports.getLayersData = exports.getMapData = undefined;

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _arguments = arguments;

var _ramda = _dereq_('ramda');

var _request = _dereq_('./request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promify = function promify(fn) {
    return function () {
        return _promise2.default.resolve(fn.call(null, _arguments));
    };
};

var pickP = promify(_ramda.pick);

var getMapData = exports.getMapData = _request.jsonp;
var getLayersData = exports.getLayersData = (0, _ramda.composeP)(pickP('layers'), pickP('metadata'), _request.jsonp);

// export const getInitalMapData = (url) => { return getMapData(url).then(
//     json => getLayersData(url).then(
//         layers => json.layers = addIndex(map)((ly, i) => merge(layers[i]), json.layers)
//     )
// )};

var getInitalMapData = exports.getInitalMapData = function getInitalMapData(url) {
    return url;
};

// This methos update the style of a layer in the maps api
var updateLayerStyle = exports.updateLayerStyle = function updateLayerStyle() {};

},{"./request":378,"babel-runtime/core-js/promise":1,"ramda":66}],378:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsonp = exports.io = undefined;

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = exports.io = function io(url) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60000;
    var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';
    var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';
    var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var request = new XMLHttpRequest();
    var promise = new _promise2.default(function (resolve, reject) {
        request.open(method, url, true);
        request.timeout = timeout;
        request.responseType = responseType;
        request.onload = function () {
            if (request.status === 200) {
                if (['text', 'json'].indexOf(request.responseType) > -1) {
                    resolve(request.responseText);
                } else {
                    resolve(request.response);
                }
            } else {
                reject(Error('Request error with a status of ' + request.statusText));
            }
        };
        request.onerror = function (evt) {
            reject(Error('There was a network error' + evt.toString()));
        };
        request.ontimeout = function (evt) {
            reject(Error('timeout ' + evt.toString()));
        };
        request.send();
    });

    Object.defineProperty(promise, 'request', {
        value: request
    });

    return promise;
};

var jsonp = exports.jsonp = function jsonp(url) {
    return new _promise2.default(function (resolve, reject) {
        var callbackName = '_cdbc_' + Math.round(100000 * Math.random());

        window[callbackName] = function (data) {
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };

        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    });
};

},{"babel-runtime/core-js/promise":1}]},{},[376])(376)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL0YuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL1QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL19fLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hZGQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FkZEluZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hZGp1c3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYWxsUGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYWx3YXlzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hbmQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FueS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYW55UGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwZXJ0dXJlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hcHBlbmQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwcGx5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hcHBseVNwZWMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FzY2VuZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXNzb2MuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Fzc29jUGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYmluYXJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9iaW5kLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ib3RoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jYWxsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jaGFpbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY2xhbXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Nsb25lLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wYXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wb3NlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wb3NlSy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29tcG9zZVAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbmNhdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29uZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29uc3RydWN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb25zdHJ1Y3ROLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb250YWlucy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29udmVyZ2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvdW50QnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2N1cnJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jdXJyeU4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2RlYy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZGVmYXVsdFRvLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kZXNjZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaWZmZXJlbmNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaWZmZXJlbmNlV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZGlzc29jLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaXNzb2NQYXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaXZpZGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Ryb3AuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Ryb3BMYXN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kcm9wTGFzdFdoaWxlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kcm9wUmVwZWF0cy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZHJvcFJlcGVhdHNXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kcm9wV2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VpdGhlci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VxQnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VxUHJvcHMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VxdWFscy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZXZvbHZlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmRJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZmluZExhc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmRMYXN0SW5kZXguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZsaXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZvckVhY2guanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZvckVhY2hPYmpJbmRleGVkLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9mcm9tUGFpcnMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2dyb3VwQnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2dyb3VwV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZ3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2d0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaGFzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9oYXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaGVhZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaWRlbnRpY2FsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaWZFbHNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbmMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2luZGV4QnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2luZGV4T2YuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2luaXQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2luc2VydC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW5zZXJ0QWxsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fU2V0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fYXBlcnR1cmUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcml0eS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FycmF5RnJvbUl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jbG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2Nsb25lUmVnRXhwLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY29tcGxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NvbmNhdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NvbnRhaW5zLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY29udGFpbnNXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTEuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19kaXNwYXRjaGFibGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19kcm9wTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2Ryb3BMYXN0V2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19lcXVhbHMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19mbGF0Q2F0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZm9yY2VSZWR1Y2VkLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZnVuY3Rpb25OYW1lLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faGFzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faWRlbnRpdHkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzSW50ZWdlci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzTnVtYmVyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1BsYWNlaG9sZGVyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNSZWdFeHAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzVHJhbnNmb3JtZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19tYWtlRmxhdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX21hcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX29iamVjdEFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX29mLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcGlwZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3BpcGVQLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcXVvdGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19yZWR1Y2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19yZWR1Y2VkLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fc3RlcENhdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3RvSVNPU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fdG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194YWxsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGFueS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hhcGVydHVyZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hjaGFpbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hkcm9wLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGRyb3BMYXN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGRyb3BMYXN0V2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZHJvcFJlcGVhdHNXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGRyb3BXaGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmQmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaWx0ZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmluZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaW5kSW5kZXguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmluZExhc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmluZExhc3RJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3htYXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194cmVkdWNlQnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194dGFrZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3h0YWtlV2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194d3JhcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJzZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcnNlY3Rpb25XaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcnNwZXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50by5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW52ZXJ0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnZlcnRPYmouanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludm9rZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2lzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pc0FycmF5TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaXNFbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaXNOaWwuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2pvaW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2p1eHQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2tleXMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2tleXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGFzdEluZGV4T2YuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGVucy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGVuc0luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sZW5zUGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGVuc1Byb3AuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xpZnQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xpZnROLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbHRlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21hcEFjY3VtLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXBBY2N1bVJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXBPYmpJbmRleGVkLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWF0aE1vZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWF4LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXhCeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVhbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVkaWFuLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZW1vaXplLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVyZ2VBbGwuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21lcmdlV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVyZ2VXaXRoS2V5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9taW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21pbkJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tb2R1bG8uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL211bHRpcGx5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9uQXJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9uZWdhdGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL25vbmUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL25vdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbnRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9udGhBcmcuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL29iak9mLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9vZi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvb21pdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvb25jZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvb3IuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL292ZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhaXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhcnRpYWwuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhcnRpYWxSaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGFydGl0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXRoRXEuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhdGhPci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGF0aFNhdGlzZmllcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGljay5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGlja0FsbC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGlja0J5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9waXBlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9waXBlSy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGlwZVAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BsdWNrLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcmVwZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9kdWN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9qZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wRXEuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb3BJcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvcE9yLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wU2F0aXNmaWVzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmFuZ2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVkdWNlQnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlZHVjZVJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWR1Y2VXaGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVkdWNlZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVqZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZW1vdmUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlcGVhdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVwbGFjZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmV2ZXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2Nhbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2VxdWVuY2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NldC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc2xpY2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NvcnQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NvcnRCeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc29ydFdpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NwbGl0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zcGxpdEF0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zcGxpdEV2ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zcGxpdFdoZW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3N1YnRyYWN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zdW0uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3N5bW1ldHJpY0RpZmZlcmVuY2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3N5bW1ldHJpY0RpZmZlcmVuY2VXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90YWlsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90YWtlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90YWtlTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFrZUxhc3RXaGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFrZVdoaWxlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90YXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Rlc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RpbWVzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90b0xvd2VyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90b1BhaXJzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90b1BhaXJzSW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90b1VwcGVyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90cmFuc2R1Y2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RyYW5zcG9zZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHJhdmVyc2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RyaW0uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RyeUNhdGNoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90eXBlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmFwcGx5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5jdXJyeU4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuZm9sZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5pb24uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuaW9uV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5pcS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5pcUJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmlxV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5sZXNzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bm5lc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VudGlsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91cGRhdGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VzZVdpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3ZhbHVlcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdmFsdWVzSW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3ZpZXcuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3doZW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3doZXJlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy93aGVyZUVxLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy93aXRob3V0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy94cHJvZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvemlwLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy96aXBPYmouanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3ppcFdpdGguanMiLCJzcmMvY29tcG9uZW50cy9tYXAvbWFwLmpzIiwic3JjL21vZHVsZS5qcyIsInNyYy91dGlscy9lbmdpbmUuanMiLCJzcmMvdXRpbHMvcmVxdWVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3JDQTs7QUFFQSxJQUFNLE1BQU0sU0FBTixHQUFNLENBQVcsS0FBWCxFQUFtQixDQUU5QixDQUZEOztBQUlBLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLEdBQVksQ0FFbEMsQ0FGRDs7QUFJQSxJQUFNLG9CQUFvQixTQUFwQixpQkFBb0IsQ0FBVSxJQUFWLEVBQWdCLENBRXpDLENBRkQ7O0FBSU8sSUFBTSw4Q0FBbUIsU0FBbkIsZ0JBQW1CLENBQVUsR0FBVixFQUFlO0FBQzNDLFlBQVEsR0FBUixDQUFZLCtCQUFrQixHQUFsQixDQUFaO0FBQ0gsQ0FGTTs7Ozs7QUNkUDs7QUFFQSxJQUFNLFFBQVEsU0FBUixLQUFRLENBQVUsU0FBVixFQUFxQjtBQUMvQixRQUFJLFFBQVEsSUFBWjs7QUFFQSxRQUFJLE9BQU8sU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUMvQixnQkFBUSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBUjtBQUNILEtBRkQsTUFHSztBQUNELGdCQUFRLFNBQVI7QUFDSDtBQUNKLENBVEQ7O0FBV0EsTUFBTSxNQUFOOztBQUVBLE9BQU8sT0FBUCxHQUFpQixLQUFqQjs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBOztBQUNBOzs7O0FBRUEsSUFBTSxVQUFVLFNBQVYsT0FBVTtBQUFBLFdBQU07QUFBQSxlQUFNLGtCQUFRLE9BQVIsQ0FBZ0IsR0FBRyxJQUFILENBQVEsSUFBUixhQUFoQixDQUFOO0FBQUEsS0FBTjtBQUFBLENBQWhCOztBQUVBLElBQU0sUUFBUSxvQkFBZDs7QUFFTyxJQUFNLGdEQUFOO0FBQ0EsSUFBTSx3Q0FBZ0IscUJBQ3pCLE1BQU0sUUFBTixDQUR5QixFQUV6QixNQUFNLFVBQU4sQ0FGeUIsaUJBQXRCOztBQU1QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sSUFBTSw4Q0FBbUIsU0FBbkIsZ0JBQW1CO0FBQUEsV0FBTyxHQUFQO0FBQUEsQ0FBekI7O0FBRVA7QUFDTyxJQUFNLDhDQUFtQixTQUFuQixnQkFBbUIsR0FBTSxDQUFFLENBQWpDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBLElBQU0sa0JBQUssU0FBTCxFQUFLLENBQVUsR0FBVixFQUFzRjtBQUFBLFFBQXZFLE9BQXVFLHVFQUE3RCxLQUE2RDtBQUFBLFFBQXRELFlBQXNELHVFQUF2QyxNQUF1QztBQUFBLFFBQS9CLE1BQStCLHVFQUF0QixLQUFzQjtBQUFBLFFBQWYsT0FBZSx1RUFBTCxFQUFLOztBQUNwRyxRQUFJLFVBQVUsSUFBSSxjQUFKLEVBQWQ7QUFDQSxRQUFJLFVBQVUsc0JBQWEsVUFBRSxPQUFGLEVBQVcsTUFBWCxFQUF1QjtBQUM5QyxnQkFBUSxJQUFSLENBQWMsTUFBZCxFQUFzQixHQUF0QixFQUEyQixJQUEzQjtBQUNBLGdCQUFRLE9BQVIsR0FBa0IsT0FBbEI7QUFDQSxnQkFBUSxZQUFSLEdBQXVCLFlBQXZCO0FBQ0EsZ0JBQVEsTUFBUixHQUFpQixZQUFNO0FBQ25CLGdCQUFLLFFBQVEsTUFBUixLQUFtQixHQUF4QixFQUE4QjtBQUMxQixvQkFBSyxDQUFFLE1BQUYsRUFBVSxNQUFWLEVBQW1CLE9BQW5CLENBQTRCLFFBQVEsWUFBcEMsSUFBcUQsQ0FBQyxDQUEzRCxFQUErRDtBQUMzRCw0QkFBUyxRQUFRLFlBQWpCO0FBQ0gsaUJBRkQsTUFFTztBQUNILDRCQUFTLFFBQVEsUUFBakI7QUFDSDtBQUNKLGFBTkQsTUFNTztBQUNILHVCQUFRLE1BQU8sb0NBQW9DLFFBQVEsVUFBbkQsQ0FBUjtBQUNIO0FBQ0osU0FWRDtBQVdBLGdCQUFRLE9BQVIsR0FBa0IsVUFBRSxHQUFGLEVBQVc7QUFDekIsbUJBQVEsTUFBTyw4QkFBOEIsSUFBSSxRQUFKLEVBQXJDLENBQVI7QUFDSCxTQUZEO0FBR0EsZ0JBQVEsU0FBUixHQUFvQixVQUFFLEdBQUYsRUFBVztBQUMzQixtQkFBUSxNQUFPLGFBQWEsSUFBSSxRQUFKLEVBQXBCLENBQVI7QUFDSCxTQUZEO0FBR0EsZ0JBQVEsSUFBUjtBQUNILEtBdEJhLENBQWQ7O0FBd0JBLFdBQU8sY0FBUCxDQUF1QixPQUF2QixFQUFnQyxTQUFoQyxFQUEyQztBQUN2QyxlQUFPO0FBRGdDLEtBQTNDOztBQUlBLFdBQU8sT0FBUDtBQUNILENBL0JNOztBQWlDQSxJQUFNLHdCQUFRLFNBQVIsS0FBUSxNQUFPO0FBQ3hCLFdBQU8sc0JBQWEsVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUNyQyxZQUFNLGVBQWUsV0FBVyxLQUFLLEtBQUwsQ0FBWSxTQUFTLEtBQUssTUFBTCxFQUFyQixDQUFoQzs7QUFFQSxlQUFRLFlBQVIsSUFBeUIsZ0JBQVE7QUFDN0IsbUJBQU8sT0FBUSxZQUFSLENBQVA7QUFDQSxxQkFBUyxJQUFULENBQWMsV0FBZCxDQUEyQixNQUEzQjtBQUNBLG9CQUFTLElBQVQ7QUFDSCxTQUpEOztBQU1BLFlBQUksU0FBUyxTQUFTLGFBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLGVBQU8sR0FBUCxHQUFhLE9BQVEsSUFBSSxPQUFKLENBQWEsR0FBYixLQUFzQixDQUF0QixHQUEwQixHQUExQixHQUFnQyxHQUF4QyxJQUFnRCxXQUFoRCxHQUE4RCxZQUEzRTtBQUNBLGlCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTJCLE1BQTNCO0FBQ0gsS0FaTSxDQUFQO0FBYUgsQ0FkTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5wcm9taXNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5Qcm9taXNlOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJylcbiAgLCBCUkVBSyAgICAgICA9IHt9XG4gICwgUkVUVVJOICAgICAgPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKXtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyAgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIFByb21pc2UgICA9IGdsb2JhbC5Qcm9taXNlXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZihpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSlwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlKGhlYWQpe1xuICAgICAgZm4gICA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIGlmKGhlYWQpbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYoaXNOb2RlKXtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXG4gIH0gZWxzZSBpZihPYnNlcnZlcil7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWVcbiAgICAgICwgbm9kZSAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZihQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSl7XG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oZm4pe1xuICAgIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkfTtcbiAgICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYoIWhlYWQpe1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYyl7XG4gICAgaWYoc2FmZSAmJiB0YXJnZXRba2V5XSl0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpOyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59OyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgU1BFQ0lFUyAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywgRCl7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3IsIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlOyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7IiwiIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjbGFzc29mICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCAkZXhwb3J0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICAgICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGZvck9mICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpXG4gICwgdGFzayAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIG1pY3JvdGFzayAgICAgICAgICA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKClcbiAgLCBQUk9NSVNFICAgICAgICAgICAgPSAnUHJvbWlzZSdcbiAgLCBUeXBlRXJyb3IgICAgICAgICAgPSBnbG9iYWwuVHlwZUVycm9yXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCAkUHJvbWlzZSAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgICAgICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgZW1wdHkgICAgICAgICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIEludGVybmFsLCBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlICAgICA9ICRQcm9taXNlLnJlc29sdmUoMSlcbiAgICAgICwgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uKGV4ZWMpeyBleGVjKGVtcHR5LCBlbXB0eSk7IH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBzYW1lQ29uc3RydWN0b3IgPSBmdW5jdGlvbihhLCBiKXtcbiAgLy8gd2l0aCBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIHJldHVybiBhID09PSBiIHx8IGEgPT09ICRQcm9taXNlICYmIGIgPT09IFdyYXBwZXI7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHJldHVybiBzYW1lQ29uc3RydWN0b3IoJFByb21pc2UsIEMpXG4gICAgPyBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICA6IG5ldyBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcbnZhciBwZXJmb3JtID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB7ZXJyb3I6IGV9O1xuICB9XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHByb21pc2UsIGlzUmVqZWN0KXtcbiAgaWYocHJvbWlzZS5fbilyZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIG9rICAgID0gcHJvbWlzZS5fcyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVhY3Rpb24pe1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbFxuICAgICAgICAsIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlXG4gICAgICAgICwgcmVqZWN0ICA9IHJlYWN0aW9uLnJlamVjdFxuICAgICAgICAsIGRvbWFpbiAgPSByZWFjdGlvbi5kb21haW5cbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spe1xuICAgICAgICAgICAgaWYocHJvbWlzZS5faCA9PSAyKW9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGhhbmRsZXIgPT09IHRydWUpcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2Upe1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZihpc1JlamVjdCAmJiAhcHJvbWlzZS5faClvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBhYnJ1cHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYoaXNVbmhhbmRsZWQocHJvbWlzZSkpe1xuICAgICAgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbil7XG4gICAgICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZX0pO1xuICAgICAgICB9IGVsc2UgaWYoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmKGFicnVwdCl0aHJvdyBhYnJ1cHQuZXJyb3I7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICBpZihwcm9taXNlLl9oID09IDEpcmV0dXJuIGZhbHNlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9hIHx8IHByb21pc2UuX2NcbiAgICAsIGkgICAgID0gMFxuICAgICwgcmVhY3Rpb247XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYoaXNOb2RlKXtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCl7XG4gICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3Z9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmKCFwcm9taXNlLl9hKXByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZihwcm9taXNlID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge193OiBwcm9taXNlLCBfZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmKCFVU0VfTkFUSVZFKXtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gICAgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rICAgICA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCAgID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fYSl0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fcylub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcHJvbWlzZSAgPSBuZXcgSW50ZXJuYWw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ICA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1Byb21pc2U6ICRQcm9taXNlfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgLy8gaW5zdGFuY2VvZiBpbnN0ZWFkIG9mIGludGVybmFsIHNsb3QgY2hlY2sgYmVjYXVzZSB3ZSBzaG91bGQgZml4IGl0IHdpdGhvdXQgcmVwbGFjZW1lbnQgbmF0aXZlIFByb21pc2UgY29yZVxuICAgIGlmKHggaW5zdGFuY2VvZiAkUHJvbWlzZSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlc29sdmUgID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgICQkcmVzb2x2ZSh4KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlc29sdmUgICAgPSBjYXBhYmlsaXR5LnJlc29sdmVcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdmFsdWVzICAgID0gW11cbiAgICAgICAgLCBpbmRleCAgICAgPSAwXG4gICAgICAgICwgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIHZhciAkaW5kZXggICAgICAgID0gaW5kZXgrK1xuICAgICAgICAgICwgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIGlmKGFscmVhZHlDYWxsZWQpcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEY6IHJlcXVpcmUoJy4vc3JjL0YnKSxcbiAgVDogcmVxdWlyZSgnLi9zcmMvVCcpLFxuICBfXzogcmVxdWlyZSgnLi9zcmMvX18nKSxcbiAgYWRkOiByZXF1aXJlKCcuL3NyYy9hZGQnKSxcbiAgYWRkSW5kZXg6IHJlcXVpcmUoJy4vc3JjL2FkZEluZGV4JyksXG4gIGFkanVzdDogcmVxdWlyZSgnLi9zcmMvYWRqdXN0JyksXG4gIGFsbDogcmVxdWlyZSgnLi9zcmMvYWxsJyksXG4gIGFsbFBhc3M6IHJlcXVpcmUoJy4vc3JjL2FsbFBhc3MnKSxcbiAgYWx3YXlzOiByZXF1aXJlKCcuL3NyYy9hbHdheXMnKSxcbiAgYW5kOiByZXF1aXJlKCcuL3NyYy9hbmQnKSxcbiAgYW55OiByZXF1aXJlKCcuL3NyYy9hbnknKSxcbiAgYW55UGFzczogcmVxdWlyZSgnLi9zcmMvYW55UGFzcycpLFxuICBhcDogcmVxdWlyZSgnLi9zcmMvYXAnKSxcbiAgYXBlcnR1cmU6IHJlcXVpcmUoJy4vc3JjL2FwZXJ0dXJlJyksXG4gIGFwcGVuZDogcmVxdWlyZSgnLi9zcmMvYXBwZW5kJyksXG4gIGFwcGx5OiByZXF1aXJlKCcuL3NyYy9hcHBseScpLFxuICBhcHBseVNwZWM6IHJlcXVpcmUoJy4vc3JjL2FwcGx5U3BlYycpLFxuICBhc2NlbmQ6IHJlcXVpcmUoJy4vc3JjL2FzY2VuZCcpLFxuICBhc3NvYzogcmVxdWlyZSgnLi9zcmMvYXNzb2MnKSxcbiAgYXNzb2NQYXRoOiByZXF1aXJlKCcuL3NyYy9hc3NvY1BhdGgnKSxcbiAgYmluYXJ5OiByZXF1aXJlKCcuL3NyYy9iaW5hcnknKSxcbiAgYmluZDogcmVxdWlyZSgnLi9zcmMvYmluZCcpLFxuICBib3RoOiByZXF1aXJlKCcuL3NyYy9ib3RoJyksXG4gIGNhbGw6IHJlcXVpcmUoJy4vc3JjL2NhbGwnKSxcbiAgY2hhaW46IHJlcXVpcmUoJy4vc3JjL2NoYWluJyksXG4gIGNsYW1wOiByZXF1aXJlKCcuL3NyYy9jbGFtcCcpLFxuICBjbG9uZTogcmVxdWlyZSgnLi9zcmMvY2xvbmUnKSxcbiAgY29tcGFyYXRvcjogcmVxdWlyZSgnLi9zcmMvY29tcGFyYXRvcicpLFxuICBjb21wbGVtZW50OiByZXF1aXJlKCcuL3NyYy9jb21wbGVtZW50JyksXG4gIGNvbXBvc2U6IHJlcXVpcmUoJy4vc3JjL2NvbXBvc2UnKSxcbiAgY29tcG9zZUs6IHJlcXVpcmUoJy4vc3JjL2NvbXBvc2VLJyksXG4gIGNvbXBvc2VQOiByZXF1aXJlKCcuL3NyYy9jb21wb3NlUCcpLFxuICBjb25jYXQ6IHJlcXVpcmUoJy4vc3JjL2NvbmNhdCcpLFxuICBjb25kOiByZXF1aXJlKCcuL3NyYy9jb25kJyksXG4gIGNvbnN0cnVjdDogcmVxdWlyZSgnLi9zcmMvY29uc3RydWN0JyksXG4gIGNvbnN0cnVjdE46IHJlcXVpcmUoJy4vc3JjL2NvbnN0cnVjdE4nKSxcbiAgY29udGFpbnM6IHJlcXVpcmUoJy4vc3JjL2NvbnRhaW5zJyksXG4gIGNvbnZlcmdlOiByZXF1aXJlKCcuL3NyYy9jb252ZXJnZScpLFxuICBjb3VudEJ5OiByZXF1aXJlKCcuL3NyYy9jb3VudEJ5JyksXG4gIGN1cnJ5OiByZXF1aXJlKCcuL3NyYy9jdXJyeScpLFxuICBjdXJyeU46IHJlcXVpcmUoJy4vc3JjL2N1cnJ5TicpLFxuICBkZWM6IHJlcXVpcmUoJy4vc3JjL2RlYycpLFxuICBkZXNjZW5kOiByZXF1aXJlKCcuL3NyYy9kZXNjZW5kJyksXG4gIGRlZmF1bHRUbzogcmVxdWlyZSgnLi9zcmMvZGVmYXVsdFRvJyksXG4gIGRpZmZlcmVuY2U6IHJlcXVpcmUoJy4vc3JjL2RpZmZlcmVuY2UnKSxcbiAgZGlmZmVyZW5jZVdpdGg6IHJlcXVpcmUoJy4vc3JjL2RpZmZlcmVuY2VXaXRoJyksXG4gIGRpc3NvYzogcmVxdWlyZSgnLi9zcmMvZGlzc29jJyksXG4gIGRpc3NvY1BhdGg6IHJlcXVpcmUoJy4vc3JjL2Rpc3NvY1BhdGgnKSxcbiAgZGl2aWRlOiByZXF1aXJlKCcuL3NyYy9kaXZpZGUnKSxcbiAgZHJvcDogcmVxdWlyZSgnLi9zcmMvZHJvcCcpLFxuICBkcm9wTGFzdDogcmVxdWlyZSgnLi9zcmMvZHJvcExhc3QnKSxcbiAgZHJvcExhc3RXaGlsZTogcmVxdWlyZSgnLi9zcmMvZHJvcExhc3RXaGlsZScpLFxuICBkcm9wUmVwZWF0czogcmVxdWlyZSgnLi9zcmMvZHJvcFJlcGVhdHMnKSxcbiAgZHJvcFJlcGVhdHNXaXRoOiByZXF1aXJlKCcuL3NyYy9kcm9wUmVwZWF0c1dpdGgnKSxcbiAgZHJvcFdoaWxlOiByZXF1aXJlKCcuL3NyYy9kcm9wV2hpbGUnKSxcbiAgZWl0aGVyOiByZXF1aXJlKCcuL3NyYy9laXRoZXInKSxcbiAgZW1wdHk6IHJlcXVpcmUoJy4vc3JjL2VtcHR5JyksXG4gIGVxQnk6IHJlcXVpcmUoJy4vc3JjL2VxQnknKSxcbiAgZXFQcm9wczogcmVxdWlyZSgnLi9zcmMvZXFQcm9wcycpLFxuICBlcXVhbHM6IHJlcXVpcmUoJy4vc3JjL2VxdWFscycpLFxuICBldm9sdmU6IHJlcXVpcmUoJy4vc3JjL2V2b2x2ZScpLFxuICBmaWx0ZXI6IHJlcXVpcmUoJy4vc3JjL2ZpbHRlcicpLFxuICBmaW5kOiByZXF1aXJlKCcuL3NyYy9maW5kJyksXG4gIGZpbmRJbmRleDogcmVxdWlyZSgnLi9zcmMvZmluZEluZGV4JyksXG4gIGZpbmRMYXN0OiByZXF1aXJlKCcuL3NyYy9maW5kTGFzdCcpLFxuICBmaW5kTGFzdEluZGV4OiByZXF1aXJlKCcuL3NyYy9maW5kTGFzdEluZGV4JyksXG4gIGZsYXR0ZW46IHJlcXVpcmUoJy4vc3JjL2ZsYXR0ZW4nKSxcbiAgZmxpcDogcmVxdWlyZSgnLi9zcmMvZmxpcCcpLFxuICBmb3JFYWNoOiByZXF1aXJlKCcuL3NyYy9mb3JFYWNoJyksXG4gIGZvckVhY2hPYmpJbmRleGVkOiByZXF1aXJlKCcuL3NyYy9mb3JFYWNoT2JqSW5kZXhlZCcpLFxuICBmcm9tUGFpcnM6IHJlcXVpcmUoJy4vc3JjL2Zyb21QYWlycycpLFxuICBncm91cEJ5OiByZXF1aXJlKCcuL3NyYy9ncm91cEJ5JyksXG4gIGdyb3VwV2l0aDogcmVxdWlyZSgnLi9zcmMvZ3JvdXBXaXRoJyksXG4gIGd0OiByZXF1aXJlKCcuL3NyYy9ndCcpLFxuICBndGU6IHJlcXVpcmUoJy4vc3JjL2d0ZScpLFxuICBoYXM6IHJlcXVpcmUoJy4vc3JjL2hhcycpLFxuICBoYXNJbjogcmVxdWlyZSgnLi9zcmMvaGFzSW4nKSxcbiAgaGVhZDogcmVxdWlyZSgnLi9zcmMvaGVhZCcpLFxuICBpZGVudGljYWw6IHJlcXVpcmUoJy4vc3JjL2lkZW50aWNhbCcpLFxuICBpZGVudGl0eTogcmVxdWlyZSgnLi9zcmMvaWRlbnRpdHknKSxcbiAgaWZFbHNlOiByZXF1aXJlKCcuL3NyYy9pZkVsc2UnKSxcbiAgaW5jOiByZXF1aXJlKCcuL3NyYy9pbmMnKSxcbiAgaW5kZXhCeTogcmVxdWlyZSgnLi9zcmMvaW5kZXhCeScpLFxuICBpbmRleE9mOiByZXF1aXJlKCcuL3NyYy9pbmRleE9mJyksXG4gIGluaXQ6IHJlcXVpcmUoJy4vc3JjL2luaXQnKSxcbiAgaW5zZXJ0OiByZXF1aXJlKCcuL3NyYy9pbnNlcnQnKSxcbiAgaW5zZXJ0QWxsOiByZXF1aXJlKCcuL3NyYy9pbnNlcnRBbGwnKSxcbiAgaW50ZXJzZWN0aW9uOiByZXF1aXJlKCcuL3NyYy9pbnRlcnNlY3Rpb24nKSxcbiAgaW50ZXJzZWN0aW9uV2l0aDogcmVxdWlyZSgnLi9zcmMvaW50ZXJzZWN0aW9uV2l0aCcpLFxuICBpbnRlcnNwZXJzZTogcmVxdWlyZSgnLi9zcmMvaW50ZXJzcGVyc2UnKSxcbiAgaW50bzogcmVxdWlyZSgnLi9zcmMvaW50bycpLFxuICBpbnZlcnQ6IHJlcXVpcmUoJy4vc3JjL2ludmVydCcpLFxuICBpbnZlcnRPYmo6IHJlcXVpcmUoJy4vc3JjL2ludmVydE9iaicpLFxuICBpbnZva2VyOiByZXF1aXJlKCcuL3NyYy9pbnZva2VyJyksXG4gIGlzOiByZXF1aXJlKCcuL3NyYy9pcycpLFxuICBpc0FycmF5TGlrZTogcmVxdWlyZSgnLi9zcmMvaXNBcnJheUxpa2UnKSxcbiAgaXNFbXB0eTogcmVxdWlyZSgnLi9zcmMvaXNFbXB0eScpLFxuICBpc05pbDogcmVxdWlyZSgnLi9zcmMvaXNOaWwnKSxcbiAgam9pbjogcmVxdWlyZSgnLi9zcmMvam9pbicpLFxuICBqdXh0OiByZXF1aXJlKCcuL3NyYy9qdXh0JyksXG4gIGtleXM6IHJlcXVpcmUoJy4vc3JjL2tleXMnKSxcbiAga2V5c0luOiByZXF1aXJlKCcuL3NyYy9rZXlzSW4nKSxcbiAgbGFzdDogcmVxdWlyZSgnLi9zcmMvbGFzdCcpLFxuICBsYXN0SW5kZXhPZjogcmVxdWlyZSgnLi9zcmMvbGFzdEluZGV4T2YnKSxcbiAgbGVuZ3RoOiByZXF1aXJlKCcuL3NyYy9sZW5ndGgnKSxcbiAgbGVuczogcmVxdWlyZSgnLi9zcmMvbGVucycpLFxuICBsZW5zSW5kZXg6IHJlcXVpcmUoJy4vc3JjL2xlbnNJbmRleCcpLFxuICBsZW5zUGF0aDogcmVxdWlyZSgnLi9zcmMvbGVuc1BhdGgnKSxcbiAgbGVuc1Byb3A6IHJlcXVpcmUoJy4vc3JjL2xlbnNQcm9wJyksXG4gIGxpZnQ6IHJlcXVpcmUoJy4vc3JjL2xpZnQnKSxcbiAgbGlmdE46IHJlcXVpcmUoJy4vc3JjL2xpZnROJyksXG4gIGx0OiByZXF1aXJlKCcuL3NyYy9sdCcpLFxuICBsdGU6IHJlcXVpcmUoJy4vc3JjL2x0ZScpLFxuICBtYXA6IHJlcXVpcmUoJy4vc3JjL21hcCcpLFxuICBtYXBBY2N1bTogcmVxdWlyZSgnLi9zcmMvbWFwQWNjdW0nKSxcbiAgbWFwQWNjdW1SaWdodDogcmVxdWlyZSgnLi9zcmMvbWFwQWNjdW1SaWdodCcpLFxuICBtYXBPYmpJbmRleGVkOiByZXF1aXJlKCcuL3NyYy9tYXBPYmpJbmRleGVkJyksXG4gIG1hdGNoOiByZXF1aXJlKCcuL3NyYy9tYXRjaCcpLFxuICBtYXRoTW9kOiByZXF1aXJlKCcuL3NyYy9tYXRoTW9kJyksXG4gIG1heDogcmVxdWlyZSgnLi9zcmMvbWF4JyksXG4gIG1heEJ5OiByZXF1aXJlKCcuL3NyYy9tYXhCeScpLFxuICBtZWFuOiByZXF1aXJlKCcuL3NyYy9tZWFuJyksXG4gIG1lZGlhbjogcmVxdWlyZSgnLi9zcmMvbWVkaWFuJyksXG4gIG1lbW9pemU6IHJlcXVpcmUoJy4vc3JjL21lbW9pemUnKSxcbiAgbWVyZ2U6IHJlcXVpcmUoJy4vc3JjL21lcmdlJyksXG4gIG1lcmdlQWxsOiByZXF1aXJlKCcuL3NyYy9tZXJnZUFsbCcpLFxuICBtZXJnZVdpdGg6IHJlcXVpcmUoJy4vc3JjL21lcmdlV2l0aCcpLFxuICBtZXJnZVdpdGhLZXk6IHJlcXVpcmUoJy4vc3JjL21lcmdlV2l0aEtleScpLFxuICBtaW46IHJlcXVpcmUoJy4vc3JjL21pbicpLFxuICBtaW5CeTogcmVxdWlyZSgnLi9zcmMvbWluQnknKSxcbiAgbW9kdWxvOiByZXF1aXJlKCcuL3NyYy9tb2R1bG8nKSxcbiAgbXVsdGlwbHk6IHJlcXVpcmUoJy4vc3JjL211bHRpcGx5JyksXG4gIG5Bcnk6IHJlcXVpcmUoJy4vc3JjL25BcnknKSxcbiAgbmVnYXRlOiByZXF1aXJlKCcuL3NyYy9uZWdhdGUnKSxcbiAgbm9uZTogcmVxdWlyZSgnLi9zcmMvbm9uZScpLFxuICBub3Q6IHJlcXVpcmUoJy4vc3JjL25vdCcpLFxuICBudGg6IHJlcXVpcmUoJy4vc3JjL250aCcpLFxuICBudGhBcmc6IHJlcXVpcmUoJy4vc3JjL250aEFyZycpLFxuICBvYmpPZjogcmVxdWlyZSgnLi9zcmMvb2JqT2YnKSxcbiAgb2Y6IHJlcXVpcmUoJy4vc3JjL29mJyksXG4gIG9taXQ6IHJlcXVpcmUoJy4vc3JjL29taXQnKSxcbiAgb25jZTogcmVxdWlyZSgnLi9zcmMvb25jZScpLFxuICBvcjogcmVxdWlyZSgnLi9zcmMvb3InKSxcbiAgb3ZlcjogcmVxdWlyZSgnLi9zcmMvb3ZlcicpLFxuICBwYWlyOiByZXF1aXJlKCcuL3NyYy9wYWlyJyksXG4gIHBhcnRpYWw6IHJlcXVpcmUoJy4vc3JjL3BhcnRpYWwnKSxcbiAgcGFydGlhbFJpZ2h0OiByZXF1aXJlKCcuL3NyYy9wYXJ0aWFsUmlnaHQnKSxcbiAgcGFydGl0aW9uOiByZXF1aXJlKCcuL3NyYy9wYXJ0aXRpb24nKSxcbiAgcGF0aDogcmVxdWlyZSgnLi9zcmMvcGF0aCcpLFxuICBwYXRoRXE6IHJlcXVpcmUoJy4vc3JjL3BhdGhFcScpLFxuICBwYXRoT3I6IHJlcXVpcmUoJy4vc3JjL3BhdGhPcicpLFxuICBwYXRoU2F0aXNmaWVzOiByZXF1aXJlKCcuL3NyYy9wYXRoU2F0aXNmaWVzJyksXG4gIHBpY2s6IHJlcXVpcmUoJy4vc3JjL3BpY2snKSxcbiAgcGlja0FsbDogcmVxdWlyZSgnLi9zcmMvcGlja0FsbCcpLFxuICBwaWNrQnk6IHJlcXVpcmUoJy4vc3JjL3BpY2tCeScpLFxuICBwaXBlOiByZXF1aXJlKCcuL3NyYy9waXBlJyksXG4gIHBpcGVLOiByZXF1aXJlKCcuL3NyYy9waXBlSycpLFxuICBwaXBlUDogcmVxdWlyZSgnLi9zcmMvcGlwZVAnKSxcbiAgcGx1Y2s6IHJlcXVpcmUoJy4vc3JjL3BsdWNrJyksXG4gIHByZXBlbmQ6IHJlcXVpcmUoJy4vc3JjL3ByZXBlbmQnKSxcbiAgcHJvZHVjdDogcmVxdWlyZSgnLi9zcmMvcHJvZHVjdCcpLFxuICBwcm9qZWN0OiByZXF1aXJlKCcuL3NyYy9wcm9qZWN0JyksXG4gIHByb3A6IHJlcXVpcmUoJy4vc3JjL3Byb3AnKSxcbiAgcHJvcEVxOiByZXF1aXJlKCcuL3NyYy9wcm9wRXEnKSxcbiAgcHJvcElzOiByZXF1aXJlKCcuL3NyYy9wcm9wSXMnKSxcbiAgcHJvcE9yOiByZXF1aXJlKCcuL3NyYy9wcm9wT3InKSxcbiAgcHJvcFNhdGlzZmllczogcmVxdWlyZSgnLi9zcmMvcHJvcFNhdGlzZmllcycpLFxuICBwcm9wczogcmVxdWlyZSgnLi9zcmMvcHJvcHMnKSxcbiAgcmFuZ2U6IHJlcXVpcmUoJy4vc3JjL3JhbmdlJyksXG4gIHJlZHVjZTogcmVxdWlyZSgnLi9zcmMvcmVkdWNlJyksXG4gIHJlZHVjZUJ5OiByZXF1aXJlKCcuL3NyYy9yZWR1Y2VCeScpLFxuICByZWR1Y2VSaWdodDogcmVxdWlyZSgnLi9zcmMvcmVkdWNlUmlnaHQnKSxcbiAgcmVkdWNlV2hpbGU6IHJlcXVpcmUoJy4vc3JjL3JlZHVjZVdoaWxlJyksXG4gIHJlZHVjZWQ6IHJlcXVpcmUoJy4vc3JjL3JlZHVjZWQnKSxcbiAgcmVqZWN0OiByZXF1aXJlKCcuL3NyYy9yZWplY3QnKSxcbiAgcmVtb3ZlOiByZXF1aXJlKCcuL3NyYy9yZW1vdmUnKSxcbiAgcmVwZWF0OiByZXF1aXJlKCcuL3NyYy9yZXBlYXQnKSxcbiAgcmVwbGFjZTogcmVxdWlyZSgnLi9zcmMvcmVwbGFjZScpLFxuICByZXZlcnNlOiByZXF1aXJlKCcuL3NyYy9yZXZlcnNlJyksXG4gIHNjYW46IHJlcXVpcmUoJy4vc3JjL3NjYW4nKSxcbiAgc2VxdWVuY2U6IHJlcXVpcmUoJy4vc3JjL3NlcXVlbmNlJyksXG4gIHNldDogcmVxdWlyZSgnLi9zcmMvc2V0JyksXG4gIHNsaWNlOiByZXF1aXJlKCcuL3NyYy9zbGljZScpLFxuICBzb3J0OiByZXF1aXJlKCcuL3NyYy9zb3J0JyksXG4gIHNvcnRCeTogcmVxdWlyZSgnLi9zcmMvc29ydEJ5JyksXG4gIHNvcnRXaXRoOiByZXF1aXJlKCcuL3NyYy9zb3J0V2l0aCcpLFxuICBzcGxpdDogcmVxdWlyZSgnLi9zcmMvc3BsaXQnKSxcbiAgc3BsaXRBdDogcmVxdWlyZSgnLi9zcmMvc3BsaXRBdCcpLFxuICBzcGxpdEV2ZXJ5OiByZXF1aXJlKCcuL3NyYy9zcGxpdEV2ZXJ5JyksXG4gIHNwbGl0V2hlbjogcmVxdWlyZSgnLi9zcmMvc3BsaXRXaGVuJyksXG4gIHN1YnRyYWN0OiByZXF1aXJlKCcuL3NyYy9zdWJ0cmFjdCcpLFxuICBzdW06IHJlcXVpcmUoJy4vc3JjL3N1bScpLFxuICBzeW1tZXRyaWNEaWZmZXJlbmNlOiByZXF1aXJlKCcuL3NyYy9zeW1tZXRyaWNEaWZmZXJlbmNlJyksXG4gIHN5bW1ldHJpY0RpZmZlcmVuY2VXaXRoOiByZXF1aXJlKCcuL3NyYy9zeW1tZXRyaWNEaWZmZXJlbmNlV2l0aCcpLFxuICB0YWlsOiByZXF1aXJlKCcuL3NyYy90YWlsJyksXG4gIHRha2U6IHJlcXVpcmUoJy4vc3JjL3Rha2UnKSxcbiAgdGFrZUxhc3Q6IHJlcXVpcmUoJy4vc3JjL3Rha2VMYXN0JyksXG4gIHRha2VMYXN0V2hpbGU6IHJlcXVpcmUoJy4vc3JjL3Rha2VMYXN0V2hpbGUnKSxcbiAgdGFrZVdoaWxlOiByZXF1aXJlKCcuL3NyYy90YWtlV2hpbGUnKSxcbiAgdGFwOiByZXF1aXJlKCcuL3NyYy90YXAnKSxcbiAgdGVzdDogcmVxdWlyZSgnLi9zcmMvdGVzdCcpLFxuICB0aW1lczogcmVxdWlyZSgnLi9zcmMvdGltZXMnKSxcbiAgdG9Mb3dlcjogcmVxdWlyZSgnLi9zcmMvdG9Mb3dlcicpLFxuICB0b1BhaXJzOiByZXF1aXJlKCcuL3NyYy90b1BhaXJzJyksXG4gIHRvUGFpcnNJbjogcmVxdWlyZSgnLi9zcmMvdG9QYWlyc0luJyksXG4gIHRvU3RyaW5nOiByZXF1aXJlKCcuL3NyYy90b1N0cmluZycpLFxuICB0b1VwcGVyOiByZXF1aXJlKCcuL3NyYy90b1VwcGVyJyksXG4gIHRyYW5zZHVjZTogcmVxdWlyZSgnLi9zcmMvdHJhbnNkdWNlJyksXG4gIHRyYW5zcG9zZTogcmVxdWlyZSgnLi9zcmMvdHJhbnNwb3NlJyksXG4gIHRyYXZlcnNlOiByZXF1aXJlKCcuL3NyYy90cmF2ZXJzZScpLFxuICB0cmltOiByZXF1aXJlKCcuL3NyYy90cmltJyksXG4gIHRyeUNhdGNoOiByZXF1aXJlKCcuL3NyYy90cnlDYXRjaCcpLFxuICB0eXBlOiByZXF1aXJlKCcuL3NyYy90eXBlJyksXG4gIHVuYXBwbHk6IHJlcXVpcmUoJy4vc3JjL3VuYXBwbHknKSxcbiAgdW5hcnk6IHJlcXVpcmUoJy4vc3JjL3VuYXJ5JyksXG4gIHVuY3VycnlOOiByZXF1aXJlKCcuL3NyYy91bmN1cnJ5TicpLFxuICB1bmZvbGQ6IHJlcXVpcmUoJy4vc3JjL3VuZm9sZCcpLFxuICB1bmlvbjogcmVxdWlyZSgnLi9zcmMvdW5pb24nKSxcbiAgdW5pb25XaXRoOiByZXF1aXJlKCcuL3NyYy91bmlvbldpdGgnKSxcbiAgdW5pcTogcmVxdWlyZSgnLi9zcmMvdW5pcScpLFxuICB1bmlxQnk6IHJlcXVpcmUoJy4vc3JjL3VuaXFCeScpLFxuICB1bmlxV2l0aDogcmVxdWlyZSgnLi9zcmMvdW5pcVdpdGgnKSxcbiAgdW5sZXNzOiByZXF1aXJlKCcuL3NyYy91bmxlc3MnKSxcbiAgdW5uZXN0OiByZXF1aXJlKCcuL3NyYy91bm5lc3QnKSxcbiAgdW50aWw6IHJlcXVpcmUoJy4vc3JjL3VudGlsJyksXG4gIHVwZGF0ZTogcmVxdWlyZSgnLi9zcmMvdXBkYXRlJyksXG4gIHVzZVdpdGg6IHJlcXVpcmUoJy4vc3JjL3VzZVdpdGgnKSxcbiAgdmFsdWVzOiByZXF1aXJlKCcuL3NyYy92YWx1ZXMnKSxcbiAgdmFsdWVzSW46IHJlcXVpcmUoJy4vc3JjL3ZhbHVlc0luJyksXG4gIHZpZXc6IHJlcXVpcmUoJy4vc3JjL3ZpZXcnKSxcbiAgd2hlbjogcmVxdWlyZSgnLi9zcmMvd2hlbicpLFxuICB3aGVyZTogcmVxdWlyZSgnLi9zcmMvd2hlcmUnKSxcbiAgd2hlcmVFcTogcmVxdWlyZSgnLi9zcmMvd2hlcmVFcScpLFxuICB3aXRob3V0OiByZXF1aXJlKCcuL3NyYy93aXRob3V0JyksXG4gIHhwcm9kOiByZXF1aXJlKCcuL3NyYy94cHJvZCcpLFxuICB6aXA6IHJlcXVpcmUoJy4vc3JjL3ppcCcpLFxuICB6aXBPYmo6IHJlcXVpcmUoJy4vc3JjL3ppcE9iaicpLFxuICB6aXBXaXRoOiByZXF1aXJlKCcuL3NyYy96aXBXaXRoJylcbn07XG4iLCJ2YXIgYWx3YXlzID0gcmVxdWlyZSgnLi9hbHdheXMnKTtcblxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBhbHdheXMgcmV0dXJucyBgZmFsc2VgLiBBbnkgcGFzc2VkIGluIHBhcmFtZXRlcnMgYXJlIGlnbm9yZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmFsd2F5cywgUi5UXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5GKCk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhbHdheXMoZmFsc2UpO1xuIiwidmFyIGFsd2F5cyA9IHJlcXVpcmUoJy4vYWx3YXlzJyk7XG5cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgYWx3YXlzIHJldHVybnMgYHRydWVgLiBBbnkgcGFzc2VkIGluIHBhcmFtZXRlcnMgYXJlIGlnbm9yZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmFsd2F5cywgUi5GXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5UKCk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFsd2F5cyh0cnVlKTtcbiIsIi8qKlxuICogQSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIHVzZWQgdG8gc3BlY2lmeSBcImdhcHNcIiB3aXRoaW4gY3VycmllZCBmdW5jdGlvbnMsXG4gKiBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsIHJlZ2FyZGxlc3Mgb2ZcbiAqIHRoZWlyIHBvc2l0aW9ucy5cbiAqXG4gKiBJZiBgZ2AgaXMgYSBjdXJyaWVkIHRlcm5hcnkgZnVuY3Rpb24gYW5kIGBfYCBpcyBgUi5fX2AsIHRoZSBmb2xsb3dpbmcgYXJlXG4gKiBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyLCBfKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAY29uc3RhbnRcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ3JlZXQgPSBSLnJlcGxhY2UoJ3tuYW1lfScsIFIuX18sICdIZWxsbywge25hbWV9IScpO1xuICogICAgICBncmVldCgnQWxpY2UnKTsgLy89PiAnSGVsbG8sIEFsaWNlISdcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7J0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlcic6IHRydWV9O1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIEFkZHMgdHdvIHZhbHVlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBzZWUgUi5zdWJ0cmFjdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYWRkKDIsIDMpOyAgICAgICAvLz0+ICA1XG4gKiAgICAgIFIuYWRkKDcpKDEwKTsgICAgICAvLz0+IDE3XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBhZGQoYSwgYikge1xuICByZXR1cm4gTnVtYmVyKGEpICsgTnVtYmVyKGIpO1xufSk7XG4iLCJ2YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xudmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsaXN0IGl0ZXJhdGlvbiBmdW5jdGlvbiBmcm9tIGFuIGV4aXN0aW5nIG9uZSBieSBhZGRpbmcgdHdvIG5ld1xuICogcGFyYW1ldGVycyB0byBpdHMgY2FsbGJhY2sgZnVuY3Rpb246IHRoZSBjdXJyZW50IGluZGV4LCBhbmQgdGhlIGVudGlyZSBsaXN0LlxuICpcbiAqIFRoaXMgd291bGQgdHVybiwgZm9yIGluc3RhbmNlLCBSYW1kYSdzIHNpbXBsZSBgbWFwYCBmdW5jdGlvbiBpbnRvIG9uZSB0aGF0XG4gKiBtb3JlIGNsb3NlbHkgcmVzZW1ibGVzIGBBcnJheS5wcm90b3R5cGUubWFwYC4gTm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IHdvcmtcbiAqIGZvciBmdW5jdGlvbnMgaW4gd2hpY2ggdGhlIGl0ZXJhdGlvbiBjYWxsYmFjayBmdW5jdGlvbiBpcyB0aGUgZmlyc3RcbiAqIHBhcmFtZXRlciwgYW5kIHdoZXJlIHRoZSBsaXN0IGlzIHRoZSBsYXN0IHBhcmFtZXRlci4gKFRoaXMgbGF0dGVyIG1pZ2h0IGJlXG4gKiB1bmltcG9ydGFudCBpZiB0aGUgbGlzdCBwYXJhbWV0ZXIgaXMgbm90IHVzZWQuKVxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhIC4uLiAtPiBiKSAuLi4gLT4gW2FdIC0+ICopIC0+IChhIC4uLiwgSW50LCBbYV0gLT4gYikgLi4uIC0+IFthXSAtPiAqKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQSBsaXN0IGl0ZXJhdGlvbiBmdW5jdGlvbiB0aGF0IGRvZXMgbm90IHBhc3MgaW5kZXggb3IgbGlzdCB0byBpdHMgY2FsbGJhY2tcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBbiBhbHRlcmVkIGxpc3QgaXRlcmF0aW9uIGZ1bmN0aW9uIHRoYXQgcGFzc2VzIChpdGVtLCBpbmRleCwgbGlzdCkgdG8gaXRzIGNhbGxiYWNrXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1hcEluZGV4ZWQgPSBSLmFkZEluZGV4KFIubWFwKTtcbiAqICAgICAgbWFwSW5kZXhlZCgodmFsLCBpZHgpID0+IGlkeCArICctJyArIHZhbCwgWydmJywgJ28nLCAnbycsICdiJywgJ2EnLCAnciddKTtcbiAqICAgICAgLy89PiBbJzAtZicsICcxLW8nLCAnMi1vJywgJzMtYicsICc0LWEnLCAnNS1yJ11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGFkZEluZGV4KGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgb3JpZ0ZuID0gYXJndW1lbnRzWzBdO1xuICAgIHZhciBsaXN0ID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJnc1swXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IG9yaWdGbi5hcHBseSh0aGlzLCBfY29uY2F0KGFyZ3VtZW50cywgW2lkeCwgbGlzdF0pKTtcbiAgICAgIGlkeCArPSAxO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfSk7XG59KTtcbiIsInZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG52YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4gaW5kZXggb2YgYW4gYXJyYXksIHJldHVybmluZyBhXG4gKiBuZXcgY29weSBvZiB0aGUgYXJyYXkgd2l0aCB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggcmVwbGFjZWQgd2l0aCB0aGVcbiAqIHJlc3VsdCBvZiB0aGUgZnVuY3Rpb24gYXBwbGljYXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gYSkgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBhcHBseS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggVGhlIGluZGV4LlxuICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IGxpc3QgQW4gYXJyYXktbGlrZSBvYmplY3Qgd2hvc2UgdmFsdWVcbiAqICAgICAgICBhdCB0aGUgc3VwcGxpZWQgaW5kZXggd2lsbCBiZSByZXBsYWNlZC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIGNvcHkgb2YgdGhlIHN1cHBsaWVkIGFycmF5LWxpa2Ugb2JqZWN0IHdpdGhcbiAqICAgICAgICAgdGhlIGVsZW1lbnQgYXQgaW5kZXggYGlkeGAgcmVwbGFjZWQgd2l0aCB0aGUgdmFsdWVcbiAqICAgICAgICAgcmV0dXJuZWQgYnkgYXBwbHlpbmcgYGZuYCB0byB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAqIEBzZWUgUi51cGRhdGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFkanVzdChSLmFkZCgxMCksIDEsIFsxLCAyLCAzXSk7ICAgICAvLz0+IFsxLCAxMiwgM11cbiAqICAgICAgUi5hZGp1c3QoUi5hZGQoMTApKSgxKShbMSwgMiwgM10pOyAgICAgLy89PiBbMSwgMTIsIDNdXG4gKiBAc3ltYiBSLmFkanVzdChmLCAtMSwgW2EsIGJdKSA9IFthLCBmKGIpXVxuICogQHN5bWIgUi5hZGp1c3QoZiwgMCwgW2EsIGJdKSA9IFtmKGEpLCBiXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gYWRqdXN0KGZuLCBpZHgsIGxpc3QpIHtcbiAgaWYgKGlkeCA+PSBsaXN0Lmxlbmd0aCB8fCBpZHggPCAtbGlzdC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuICB2YXIgc3RhcnQgPSBpZHggPCAwID8gbGlzdC5sZW5ndGggOiAwO1xuICB2YXIgX2lkeCA9IHN0YXJ0ICsgaWR4O1xuICB2YXIgX2xpc3QgPSBfY29uY2F0KGxpc3QpO1xuICBfbGlzdFtfaWR4XSA9IGZuKGxpc3RbX2lkeF0pO1xuICByZXR1cm4gX2xpc3Q7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF94YWxsID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feGFsbCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsIGBmYWxzZWAgaWZcbiAqIHRoZXJlIGFyZSBhbnkgdGhhdCBkb24ndC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYWxsYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkIGJ5IGV2ZXJ5IGVsZW1lbnQsIGBmYWxzZWBcbiAqICAgICAgICAgb3RoZXJ3aXNlLlxuICogQHNlZSBSLmFueSwgUi5ub25lLCBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBlcXVhbHMzID0gUi5lcXVhbHMoMyk7XG4gKiAgICAgIFIuYWxsKGVxdWFsczMpKFszLCAzLCAzLCAzXSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmFsbChlcXVhbHMzKShbMywgMywgMSwgM10pOyAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKFsnYWxsJ10sIF94YWxsLCBmdW5jdGlvbiBhbGwoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGlmICghZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0pKTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgY3VycnlOID0gcmVxdWlyZSgnLi9jdXJyeU4nKTtcbnZhciBtYXggPSByZXF1aXJlKCcuL21heCcpO1xudmFyIHBsdWNrID0gcmVxdWlyZSgnLi9wbHVjaycpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJy4vcmVkdWNlJyk7XG5cblxuLyoqXG4gKiBUYWtlcyBhIGxpc3Qgb2YgcHJlZGljYXRlcyBhbmQgcmV0dXJucyBhIHByZWRpY2F0ZSB0aGF0IHJldHVybnMgdHJ1ZSBmb3IgYVxuICogZ2l2ZW4gbGlzdCBvZiBhcmd1bWVudHMgaWYgZXZlcnkgb25lIG9mIHRoZSBwcm92aWRlZCBwcmVkaWNhdGVzIGlzIHNhdGlzZmllZFxuICogYnkgdGhvc2UgYXJndW1lbnRzLlxuICpcbiAqIFRoZSBmdW5jdGlvbiByZXR1cm5lZCBpcyBhIGN1cnJpZWQgZnVuY3Rpb24gd2hvc2UgYXJpdHkgbWF0Y2hlcyB0aGF0IG9mIHRoZVxuICogaGlnaGVzdC1hcml0eSBwcmVkaWNhdGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgWygqLi4uIC0+IEJvb2xlYW4pXSAtPiAoKi4uLiAtPiBCb29sZWFuKVxuICogQHBhcmFtIHtBcnJheX0gcHJlZGljYXRlcyBBbiBhcnJheSBvZiBwcmVkaWNhdGVzIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGNvbWJpbmVkIHByZWRpY2F0ZVxuICogQHNlZSBSLmFueVBhc3NcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNRdWVlbiA9IFIucHJvcEVxKCdyYW5rJywgJ1EnKTtcbiAqICAgICAgdmFyIGlzU3BhZGUgPSBSLnByb3BFcSgnc3VpdCcsICfimaDvuI4nKTtcbiAqICAgICAgdmFyIGlzUXVlZW5PZlNwYWRlcyA9IFIuYWxsUGFzcyhbaXNRdWVlbiwgaXNTcGFkZV0pO1xuICpcbiAqICAgICAgaXNRdWVlbk9mU3BhZGVzKHtyYW5rOiAnUScsIHN1aXQ6ICfimaPvuI4nfSk7IC8vPT4gZmFsc2VcbiAqICAgICAgaXNRdWVlbk9mU3BhZGVzKHtyYW5rOiAnUScsIHN1aXQ6ICfimaDvuI4nfSk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gYWxsUGFzcyhwcmVkcykge1xuICByZXR1cm4gY3VycnlOKHJlZHVjZShtYXgsIDAsIHBsdWNrKCdsZW5ndGgnLCBwcmVkcykpLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgbGVuID0gcHJlZHMubGVuZ3RoO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGlmICghcHJlZHNbaWR4XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBhbHdheXMgcmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUuIE5vdGUgdGhhdCBmb3JcbiAqIG5vbi1wcmltaXRpdmVzIHRoZSB2YWx1ZSByZXR1cm5lZCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgdmFsdWUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBrbm93biBhcyBgY29uc3RgLCBgY29uc3RhbnRgLCBvciBgS2AgKGZvciBLIGNvbWJpbmF0b3IpIGluXG4gKiBvdGhlciBsYW5ndWFnZXMgYW5kIGxpYnJhcmllcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gd3JhcCBpbiBhIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBGdW5jdGlvbiA6OiAqIC0+IHZhbC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdCA9IFIuYWx3YXlzKCdUZWUnKTtcbiAqICAgICAgdCgpOyAvLz0+ICdUZWUnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBhbHdheXModmFsKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYm90aCBhcmd1bWVudHMgYXJlIGB0cnVlYDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBiIC0+IGEgfCBiXG4gKiBAcGFyYW0ge0FueX0gYVxuICogQHBhcmFtIHtBbnl9IGJcbiAqIEByZXR1cm4ge0FueX0gdGhlIGZpcnN0IGFyZ3VtZW50IGlmIGl0IGlzIGZhbHN5LCBvdGhlcndpc2UgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAqIEBzZWUgUi5ib3RoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hbmQodHJ1ZSwgdHJ1ZSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmFuZCh0cnVlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5hbmQoZmFsc2UsIHRydWUpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuYW5kKGZhbHNlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGFuZChhLCBiKSB7XG4gIHJldHVybiBhICYmIGI7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF94YW55ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feGFueScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYXQgbGVhc3Qgb25lIG9mIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsXG4gKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYW55YCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkIGJ5IGF0IGxlYXN0IG9uZSBlbGVtZW50LCBgZmFsc2VgXG4gKiAgICAgICAgIG90aGVyd2lzZS5cbiAqIEBzZWUgUi5hbGwsIFIubm9uZSwgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbGVzc1RoYW4wID0gUi5mbGlwKFIubHQpKDApO1xuICogICAgICB2YXIgbGVzc1RoYW4yID0gUi5mbGlwKFIubHQpKDIpO1xuICogICAgICBSLmFueShsZXNzVGhhbjApKFsxLCAyXSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5hbnkobGVzc1RoYW4yKShbMSwgMl0pOyAvLz0+IHRydWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoWydhbnknXSwgX3hhbnksIGZ1bmN0aW9uIGFueShmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJy4vY3VycnlOJyk7XG52YXIgbWF4ID0gcmVxdWlyZSgnLi9tYXgnKTtcbnZhciBwbHVjayA9IHJlcXVpcmUoJy4vcGx1Y2snKTtcbnZhciByZWR1Y2UgPSByZXF1aXJlKCcuL3JlZHVjZScpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBsaXN0IG9mIHByZWRpY2F0ZXMgYW5kIHJldHVybnMgYSBwcmVkaWNhdGUgdGhhdCByZXR1cm5zIHRydWUgZm9yIGFcbiAqIGdpdmVuIGxpc3Qgb2YgYXJndW1lbnRzIGlmIGF0IGxlYXN0IG9uZSBvZiB0aGUgcHJvdmlkZWQgcHJlZGljYXRlcyBpc1xuICogc2F0aXNmaWVkIGJ5IHRob3NlIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gcmV0dXJuZWQgaXMgYSBjdXJyaWVkIGZ1bmN0aW9uIHdob3NlIGFyaXR5IG1hdGNoZXMgdGhhdCBvZiB0aGVcbiAqIGhpZ2hlc3QtYXJpdHkgcHJlZGljYXRlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIFsoKi4uLiAtPiBCb29sZWFuKV0gLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7QXJyYXl9IHByZWRpY2F0ZXMgQW4gYXJyYXkgb2YgcHJlZGljYXRlcyB0byBjaGVja1xuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjb21iaW5lZCBwcmVkaWNhdGVcbiAqIEBzZWUgUi5hbGxQYXNzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzQ2x1YiA9IFIucHJvcEVxKCdzdWl0JywgJ+KZoycpO1xuICogICAgICB2YXIgaXNTcGFkZSA9IFIucHJvcEVxKCdzdWl0JywgJ+KZoCcpO1xuICogICAgICB2YXIgaXNCbGFja0NhcmQgPSBSLmFueVBhc3MoW2lzQ2x1YiwgaXNTcGFkZV0pO1xuICpcbiAqICAgICAgaXNCbGFja0NhcmQoe3Jhbms6ICcxMCcsIHN1aXQ6ICfimaMnfSk7IC8vPT4gdHJ1ZVxuICogICAgICBpc0JsYWNrQ2FyZCh7cmFuazogJ1EnLCBzdWl0OiAn4pmgJ30pOyAvLz0+IHRydWVcbiAqICAgICAgaXNCbGFja0NhcmQoe3Jhbms6ICdRJywgc3VpdDogJ+KZpid9KTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gYW55UGFzcyhwcmVkcykge1xuICByZXR1cm4gY3VycnlOKHJlZHVjZShtYXgsIDAsIHBsdWNrKCdsZW5ndGgnLCBwcmVkcykpLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgbGVuID0gcHJlZHMubGVuZ3RoO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGlmIChwcmVkc1tpZHhdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn0pO1xuIiwidmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG5cblxuLyoqXG4gKiBhcCBhcHBsaWVzIGEgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYSBsaXN0IG9mIHZhbHVlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYXBgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LiBBbHNvXG4gKiB0cmVhdHMgY3VycmllZCBmdW5jdGlvbnMgYXMgYXBwbGljYXRpdmVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIFthIC0+IGJdIC0+IFthXSAtPiBbYl1cbiAqIEBzaWcgQXBwbHkgZiA9PiBmIChhIC0+IGIpIC0+IGYgYSAtPiBmIGJcbiAqIEBwYXJhbSB7QXJyYXl9IGZucyBBbiBhcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXl9IHZzIEFuIGFycmF5IG9mIHZhbHVlc1xuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHJlc3VsdHMgb2YgYXBwbHlpbmcgZWFjaCBvZiBgZm5zYCB0byBhbGwgb2YgYHZzYCBpbiB0dXJuLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXAoW1IubXVsdGlwbHkoMiksIFIuYWRkKDMpXSwgWzEsMiwzXSk7IC8vPT4gWzIsIDQsIDYsIDQsIDUsIDZdXG4gKiAgICAgIFIuYXAoW1IuY29uY2F0KCd0YXN0eSAnKSwgUi50b1VwcGVyXSwgWydwaXp6YScsICdzYWxhZCddKTsgLy89PiBbXCJ0YXN0eSBwaXp6YVwiLCBcInRhc3R5IHNhbGFkXCIsIFwiUElaWkFcIiwgXCJTQUxBRFwiXVxuICogQHN5bWIgUi5hcChbZiwgZ10sIFthLCBiXSkgPSBbZihhKSwgZihiKSwgZyhhKSwgZyhiKV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGFwKGFwcGxpY2F0aXZlLCBmbikge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBhcHBsaWNhdGl2ZS5hcCA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICBhcHBsaWNhdGl2ZS5hcChmbikgOlxuICAgIHR5cGVvZiBhcHBsaWNhdGl2ZSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICBmdW5jdGlvbih4KSB7IHJldHVybiBhcHBsaWNhdGl2ZSh4KShmbih4KSk7IH0gOlxuICAgIC8vIGVsc2VcbiAgICAgIF9yZWR1Y2UoZnVuY3Rpb24oYWNjLCBmKSB7IHJldHVybiBfY29uY2F0KGFjYywgbWFwKGYsIGZuKSk7IH0sIFtdLCBhcHBsaWNhdGl2ZSlcbiAgKTtcbn0pO1xuIiwidmFyIF9hcGVydHVyZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FwZXJ0dXJlJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfeGFwZXJ0dXJlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feGFwZXJ0dXJlJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QsIGNvbXBvc2VkIG9mIG4tdHVwbGVzIG9mIGNvbnNlY3V0aXZlIGVsZW1lbnRzIElmIGBuYCBpc1xuICogZ3JlYXRlciB0aGFuIHRoZSBsZW5ndGggb2YgdGhlIGxpc3QsIGFuIGVtcHR5IGxpc3QgaXMgcmV0dXJuZWQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEyLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW1thXV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBzaXplIG9mIHRoZSB0dXBsZXMgdG8gY3JlYXRlXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHNwbGl0IGludG8gYG5gLWxlbmd0aCB0dXBsZXNcbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgcmVzdWx0aW5nIGxpc3Qgb2YgYG5gLWxlbmd0aCB0dXBsZXNcbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFwZXJ0dXJlKDIsIFsxLCAyLCAzLCA0LCA1XSk7IC8vPT4gW1sxLCAyXSwgWzIsIDNdLCBbMywgNF0sIFs0LCA1XV1cbiAqICAgICAgUi5hcGVydHVyZSgzLCBbMSwgMiwgMywgNCwgNV0pOyAvLz0+IFtbMSwgMiwgM10sIFsyLCAzLCA0XSwgWzMsIDQsIDVdXVxuICogICAgICBSLmFwZXJ0dXJlKDcsIFsxLCAyLCAzLCA0LCA1XSk7IC8vPT4gW11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoW10sIF94YXBlcnR1cmUsIF9hcGVydHVyZSkpO1xuIiwidmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgY29udGVudHMgb2YgdGhlIGdpdmVuIGxpc3QsIGZvbGxvd2VkIGJ5XG4gKiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHsqfSBlbCBUaGUgZWxlbWVudCB0byBhZGQgdG8gdGhlIGVuZCBvZiB0aGUgbmV3IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IG9mIGVsZW1lbnRzIHRvIGFkZCBhIG5ldyBpdGVtIHRvLlxuICogICAgICAgIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBlbGVtZW50cyBvZiB0aGUgb2xkIGxpc3QgZm9sbG93ZWQgYnkgYGVsYC5cbiAqIEBzZWUgUi5wcmVwZW5kXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hcHBlbmQoJ3Rlc3RzJywgWyd3cml0ZScsICdtb3JlJ10pOyAvLz0+IFsnd3JpdGUnLCAnbW9yZScsICd0ZXN0cyddXG4gKiAgICAgIFIuYXBwZW5kKCd0ZXN0cycsIFtdKTsgLy89PiBbJ3Rlc3RzJ11cbiAqICAgICAgUi5hcHBlbmQoWyd0ZXN0cyddLCBbJ3dyaXRlJywgJ21vcmUnXSk7IC8vPT4gWyd3cml0ZScsICdtb3JlJywgWyd0ZXN0cyddXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gYXBwZW5kKGVsLCBsaXN0KSB7XG4gIHJldHVybiBfY29uY2F0KGxpc3QsIFtlbF0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQXBwbGllcyBmdW5jdGlvbiBgZm5gIHRvIHRoZSBhcmd1bWVudCBsaXN0IGBhcmdzYC4gVGhpcyBpcyB1c2VmdWwgZm9yXG4gKiBjcmVhdGluZyBhIGZpeGVkLWFyaXR5IGZ1bmN0aW9uIGZyb20gYSB2YXJpYWRpYyBmdW5jdGlvbi4gYGZuYCBzaG91bGQgYmUgYVxuICogYm91bmQgZnVuY3Rpb24gaWYgY29udGV4dCBpcyBzaWduaWZpY2FudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKi4uLiAtPiBhKSAtPiBbKl0gLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIHdpdGggYGFyZ3NgXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gY2FsbCBgZm5gIHdpdGhcbiAqIEByZXR1cm4geyp9IHJlc3VsdCBUaGUgcmVzdWx0LCBlcXVpdmFsZW50IHRvIGBmbiguLi5hcmdzKWBcbiAqIEBzZWUgUi5jYWxsLCBSLnVuYXBwbHlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbnVtcyA9IFsxLCAyLCAzLCAtOTksIDQyLCA2LCA3XTtcbiAqICAgICAgUi5hcHBseShNYXRoLm1heCwgbnVtcyk7IC8vPT4gNDJcbiAqIEBzeW1iIFIuYXBwbHkoZiwgW2EsIGIsIGNdKSA9IGYoYSwgYiwgYylcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGFwcGx5KGZuLCBhcmdzKSB7XG4gIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4vYXBwbHknKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xudmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG52YXIgbWF4ID0gcmVxdWlyZSgnLi9tYXgnKTtcbnZhciBwbHVjayA9IHJlcXVpcmUoJy4vcGx1Y2snKTtcbnZhciByZWR1Y2UgPSByZXF1aXJlKCcuL3JlZHVjZScpO1xudmFyIHZhbHVlcyA9IHJlcXVpcmUoJy4vdmFsdWVzJyk7XG5cblxuLyoqXG4gKiBHaXZlbiBhIHNwZWMgb2JqZWN0IHJlY3Vyc2l2ZWx5IG1hcHBpbmcgcHJvcGVydGllcyB0byBmdW5jdGlvbnMsIGNyZWF0ZXMgYVxuICogZnVuY3Rpb24gcHJvZHVjaW5nIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBzdHJ1Y3R1cmUsIGJ5IG1hcHBpbmcgZWFjaCBwcm9wZXJ0eVxuICogdG8gdGhlIHJlc3VsdCBvZiBjYWxsaW5nIGl0cyBhc3NvY2lhdGVkIGZ1bmN0aW9uIHdpdGggdGhlIHN1cHBsaWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcge2s6ICgoYSwgYiwgLi4uLCBtKSAtPiB2KX0gLT4gKChhLCBiLCAuLi4sIG0pIC0+IHtrOiB2fSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjIGFuIG9iamVjdCByZWN1cnNpdmVseSBtYXBwaW5nIHByb3BlcnRpZXMgdG8gZnVuY3Rpb25zIGZvclxuICogICAgICAgIHByb2R1Y2luZyB0aGUgdmFsdWVzIGZvciB0aGVzZSBwcm9wZXJ0aWVzLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdCBvZiB0aGUgc2FtZSBzdHJ1Y3R1cmVcbiAqIGFzIGBzcGVjJywgd2l0aCBlYWNoIHByb3BlcnR5IHNldCB0byB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgY2FsbGluZyBpdHNcbiAqIGFzc29jaWF0ZWQgZnVuY3Rpb24gd2l0aCB0aGUgc3VwcGxpZWQgYXJndW1lbnRzLlxuICogQHNlZSBSLmNvbnZlcmdlLCBSLmp1eHRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ2V0TWV0cmljcyA9IFIuYXBwbHlTcGVjKHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW06IFIuYWRkLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RlZDogeyBtdWw6IFIubXVsdGlwbHkgfVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICogICAgICBnZXRNZXRyaWNzKDIsIDQpOyAvLyA9PiB7IHN1bTogNiwgbmVzdGVkOiB7IG11bDogOCB9IH1cbiAqIEBzeW1iIFIuYXBwbHlTcGVjKHsgeDogZiwgeTogeyB6OiBnIH0gfSkoYSwgYikgPSB7IHg6IGYoYSwgYiksIHk6IHsgejogZyhhLCBiKSB9IH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGFwcGx5U3BlYyhzcGVjKSB7XG4gIHNwZWMgPSBtYXAoZnVuY3Rpb24odikgeyByZXR1cm4gdHlwZW9mIHYgPT0gJ2Z1bmN0aW9uJyA/IHYgOiBhcHBseVNwZWModik7IH0sXG4gICAgICAgICAgICAgc3BlYyk7XG4gIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIHZhbHVlcyhzcGVjKSkpLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbWFwKGZ1bmN0aW9uKGYpIHsgcmV0dXJuIGFwcGx5KGYsIGFyZ3MpOyB9LCBzcGVjKTtcbiAgICAgICAgICAgICAgICB9KTtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIE1ha2VzIGFuIGFzY2VuZGluZyBjb21wYXJhdG9yIGZ1bmN0aW9uIG91dCBvZiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHZhbHVlXG4gKiB0aGF0IGNhbiBiZSBjb21wYXJlZCB3aXRoIGA8YCBhbmQgYD5gLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIzLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGZ1bmN0aW9uIG9mIGFyaXR5IG9uZSB0aGF0IHJldHVybnMgYSB2YWx1ZSB0aGF0IGNhbiBiZSBjb21wYXJlZFxuICogQHBhcmFtIHsqfSBhIFRoZSBmaXJzdCBpdGVtIHRvIGJlIGNvbXBhcmVkLlxuICogQHBhcmFtIHsqfSBiIFRoZSBzZWNvbmQgaXRlbSB0byBiZSBjb21wYXJlZC5cbiAqIEByZXR1cm4ge051bWJlcn0gYC0xYCBpZiBmbihhKSA8IGZuKGIpLCBgMWAgaWYgZm4oYikgPCBmbihhKSwgb3RoZXJ3aXNlIGAwYFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBieUFnZSA9IFIuYXNjZW5kKFIucHJvcCgnYWdlJykpO1xuICogICAgICB2YXIgcGVvcGxlID0gW1xuICogICAgICAgIC8vIC4uLlxuICogICAgICBdO1xuICogICAgICB2YXIgcGVvcGxlQnlZb3VuZ2VzdEZpcnN0ID0gUi5zb3J0KGJ5QWdlLCBwZW9wbGUpO1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gYXNjZW5kKGZuLCBhLCBiKSB7XG4gIHZhciBhYSA9IGZuKGEpO1xuICB2YXIgYmIgPSBmbihiKTtcbiAgcmV0dXJuIGFhIDwgYmIgPyAtMSA6IGFhID4gYmIgPyAxIDogMDtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIE1ha2VzIGEgc2hhbGxvdyBjbG9uZSBvZiBhbiBvYmplY3QsIHNldHRpbmcgb3Igb3ZlcnJpZGluZyB0aGUgc3BlY2lmaWVkXG4gKiBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiB2YWx1ZS4gTm90ZSB0aGF0IHRoaXMgY29waWVzIGFuZCBmbGF0dGVucyBwcm90b3R5cGVcbiAqIHByb3BlcnRpZXMgb250byB0aGUgbmV3IG9iamVjdCBhcyB3ZWxsLiBBbGwgbm9uLXByaW1pdGl2ZSBwcm9wZXJ0aWVzIGFyZVxuICogY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgU3RyaW5nIC0+IGEgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIHByb3BlcnR5IG5hbWUgdG8gc2V0XG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgbmV3IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmVcbiAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IGVxdWl2YWxlbnQgdG8gdGhlIG9yaWdpbmFsIGV4Y2VwdCBmb3IgdGhlIGNoYW5nZWQgcHJvcGVydHkuXG4gKiBAc2VlIFIuZGlzc29jXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hc3NvYygnYycsIDMsIHthOiAxLCBiOiAyfSk7IC8vPT4ge2E6IDEsIGI6IDIsIGM6IDN9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBhc3NvYyhwcm9wLCB2YWwsIG9iaikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgcmVzdWx0W3BdID0gb2JqW3BdO1xuICB9XG4gIHJlc3VsdFtwcm9wXSA9IHZhbDtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcbnZhciBfaGFzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG52YXIgX2lzSW50ZWdlciA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzSW50ZWdlcicpO1xudmFyIGFzc29jID0gcmVxdWlyZSgnLi9hc3NvYycpO1xuXG5cbi8qKlxuICogTWFrZXMgYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdCwgc2V0dGluZyBvciBvdmVycmlkaW5nIHRoZSBub2RlcyByZXF1aXJlZFxuICogdG8gY3JlYXRlIHRoZSBnaXZlbiBwYXRoLCBhbmQgcGxhY2luZyB0aGUgc3BlY2lmaWMgdmFsdWUgYXQgdGhlIHRhaWwgZW5kIG9mXG4gKiB0aGF0IHBhdGguIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnMgcHJvdG90eXBlIHByb3BlcnRpZXMgb250byB0aGVcbiAqIG5ldyBvYmplY3QgYXMgd2VsbC4gQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllcyBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4gYSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIHRoZSBwYXRoIHRvIHNldFxuICogQHBhcmFtIHsqfSB2YWwgVGhlIG5ldyB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCBlcXVpdmFsZW50IHRvIHRoZSBvcmlnaW5hbCBleGNlcHQgYWxvbmcgdGhlIHNwZWNpZmllZCBwYXRoLlxuICogQHNlZSBSLmRpc3NvY1BhdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFzc29jUGF0aChbJ2EnLCAnYicsICdjJ10sIDQyLCB7YToge2I6IHtjOiAwfX19KTsgLy89PiB7YToge2I6IHtjOiA0Mn19fVxuICpcbiAqICAgICAgLy8gQW55IG1pc3Npbmcgb3Igbm9uLW9iamVjdCBrZXlzIGluIHBhdGggd2lsbCBiZSBvdmVycmlkZGVuXG4gKiAgICAgIFIuYXNzb2NQYXRoKFsnYScsICdiJywgJ2MnXSwgNDIsIHthOiA1fSk7IC8vPT4ge2E6IHtiOiB7YzogNDJ9fX1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKGZ1bmN0aW9uIGFzc29jUGF0aChwYXRoLCB2YWwsIG9iaikge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG4gIHZhciBpZHggPSBwYXRoWzBdO1xuICBpZiAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgdmFyIG5leHRPYmogPSBfaGFzKGlkeCwgb2JqKSA/IG9ialtpZHhdIDogX2lzSW50ZWdlcihwYXRoWzFdKSA/IFtdIDoge307XG4gICAgdmFsID0gYXNzb2NQYXRoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhdGgsIDEpLCB2YWwsIG5leHRPYmopO1xuICB9XG4gIGlmIChfaXNJbnRlZ2VyKGlkeCkgJiYgX2lzQXJyYXkob2JqKSkge1xuICAgIHZhciBhcnIgPSBbXS5jb25jYXQob2JqKTtcbiAgICBhcnJbaWR4XSA9IHZhbDtcbiAgICByZXR1cm4gYXJyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhc3NvYyhpZHgsIHZhbCwgb2JqKTtcbiAgfVxufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIG5BcnkgPSByZXF1aXJlKCcuL25BcnknKTtcblxuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gb2YgYW55IGFyaXR5IChpbmNsdWRpbmcgbnVsbGFyeSkgaW4gYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHNcbiAqIGV4YWN0bHkgMiBwYXJhbWV0ZXJzLiBBbnkgZXh0cmFuZW91cyBwYXJhbWV0ZXJzIHdpbGwgbm90IGJlIHBhc3NlZCB0byB0aGVcbiAqIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGMpIC0+IChhLCBiIC0+IGMpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyBgZm5gLiBUaGUgbmV3IGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgb2ZcbiAqICAgICAgICAgYXJpdHkgMi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdGFrZXNUaHJlZUFyZ3MgPSBmdW5jdGlvbihhLCBiLCBjKSB7XG4gKiAgICAgICAgcmV0dXJuIFthLCBiLCBjXTtcbiAqICAgICAgfTtcbiAqICAgICAgdGFrZXNUaHJlZUFyZ3MubGVuZ3RoOyAvLz0+IDNcbiAqICAgICAgdGFrZXNUaHJlZUFyZ3MoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIDNdXG4gKlxuICogICAgICB2YXIgdGFrZXNUd29BcmdzID0gUi5iaW5hcnkodGFrZXNUaHJlZUFyZ3MpO1xuICogICAgICB0YWtlc1R3b0FyZ3MubGVuZ3RoOyAvLz0+IDJcbiAqICAgICAgLy8gT25seSAyIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRvIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG4gKiAgICAgIHRha2VzVHdvQXJncygxLCAyLCAzKTsgLy89PiBbMSwgMiwgdW5kZWZpbmVkXVxuICogQHN5bWIgUi5iaW5hcnkoZikoYSwgYiwgYykgPSBmKGEsIGIpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBiaW5hcnkoZm4pIHtcbiAgcmV0dXJuIG5BcnkoMiwgZm4pO1xufSk7XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyBib3VuZCB0byBhIGNvbnRleHQuXG4gKiBOb3RlOiBgUi5iaW5kYCBkb2VzIG5vdCBwcm92aWRlIHRoZSBhZGRpdGlvbmFsIGFyZ3VtZW50LWJpbmRpbmcgY2FwYWJpbGl0aWVzIG9mXG4gKiBbRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL2JpbmQpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjYuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgqIC0+ICopIC0+IHsqfSAtPiAoKiAtPiAqKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJpbmQgdG8gY29udGV4dFxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNPYmogVGhlIGNvbnRleHQgdG8gYmluZCBgZm5gIHRvXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgZXhlY3V0ZSBpbiB0aGUgY29udGV4dCBvZiBgdGhpc09iamAuXG4gKiBAc2VlIFIucGFydGlhbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsb2cgPSBSLmJpbmQoY29uc29sZS5sb2csIGNvbnNvbGUpO1xuICogICAgICBSLnBpcGUoUi5hc3NvYygnYScsIDIpLCBSLnRhcChsb2cpLCBSLmFzc29jKCdhJywgMykpKHthOiAxfSk7IC8vPT4ge2E6IDN9XG4gKiAgICAgIC8vIGxvZ3Mge2E6IDJ9XG4gKiBAc3ltYiBSLmJpbmQoZiwgbykoYSwgYikgPSBmLmNhbGwobywgYSwgYilcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNPYmopIHtcbiAgcmV0dXJuIF9hcml0eShmbi5sZW5ndGgsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzT2JqLCBhcmd1bWVudHMpO1xuICB9KTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzRnVuY3Rpb24nKTtcbnZhciBhbmQgPSByZXF1aXJlKCcuL2FuZCcpO1xudmFyIGxpZnQgPSByZXF1aXJlKCcuL2xpZnQnKTtcblxuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggY2FsbHMgdGhlIHR3byBwcm92aWRlZCBmdW5jdGlvbnMgYW5kIHJldHVybnMgdGhlIGAmJmBcbiAqIG9mIHRoZSByZXN1bHRzLlxuICogSXQgcmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBmaXJzdCBmdW5jdGlvbiBpZiBpdCBpcyBmYWxzZS15IGFuZCB0aGUgcmVzdWx0XG4gKiBvZiB0aGUgc2Vjb25kIGZ1bmN0aW9uIG90aGVyd2lzZS4gTm90ZSB0aGF0IHRoaXMgaXMgc2hvcnQtY2lyY3VpdGVkLFxuICogbWVhbmluZyB0aGF0IHRoZSBzZWNvbmQgZnVuY3Rpb24gd2lsbCBub3QgYmUgaW52b2tlZCBpZiB0aGUgZmlyc3QgcmV0dXJucyBhXG4gKiBmYWxzZS15IHZhbHVlLlxuICpcbiAqIEluIGFkZGl0aW9uIHRvIGZ1bmN0aW9ucywgYFIuYm90aGAgYWxzbyBhY2NlcHRzIGFueSBmYW50YXN5LWxhbmQgY29tcGF0aWJsZVxuICogYXBwbGljYXRpdmUgZnVuY3Rvci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGYgQSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGcgQW5vdGhlciBwcmVkaWNhdGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBpdHMgYXJndW1lbnRzIHRvIGBmYCBhbmQgYGdgIGFuZCBgJiZgcyB0aGVpciBvdXRwdXRzIHRvZ2V0aGVyLlxuICogQHNlZSBSLmFuZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBndDEwID0gUi5ndChSLl9fLCAxMClcbiAqICAgICAgdmFyIGx0MjAgPSBSLmx0KFIuX18sIDIwKVxuICogICAgICB2YXIgZiA9IFIuYm90aChndDEwLCBsdDIwKTtcbiAqICAgICAgZigxNSk7IC8vPT4gdHJ1ZVxuICogICAgICBmKDMwKTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gYm90aChmLCBnKSB7XG4gIHJldHVybiBfaXNGdW5jdGlvbihmKSA/XG4gICAgZnVuY3Rpb24gX2JvdGgoKSB7XG4gICAgICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpICYmIGcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IDpcbiAgICBsaWZ0KGFuZCkoZiwgZyk7XG59KTtcbiIsInZhciBjdXJyeSA9IHJlcXVpcmUoJy4vY3VycnknKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIGl0cyBmaXJzdCBhcmd1bWVudCB3aXRoIHRoZSByZW1haW5pbmdcbiAqIGFyZ3VtZW50cy4gVGhpcyBpcyBvY2Nhc2lvbmFsbHkgdXNlZnVsIGFzIGEgY29udmVyZ2luZyBmdW5jdGlvbiBmb3JcbiAqIGBSLmNvbnZlcmdlYDogdGhlIGxlZnQgYnJhbmNoIGNhbiBwcm9kdWNlIGEgZnVuY3Rpb24gd2hpbGUgdGhlIHJpZ2h0IGJyYW5jaFxuICogcHJvZHVjZXMgYSB2YWx1ZSB0byBiZSBwYXNzZWQgdG8gdGhhdCBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKi4uLiAtPiBhKSwqLi4uIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBhcHBseSB0byB0aGUgcmVtYWluaW5nIGFyZ3VtZW50cy5cbiAqIEBwYXJhbSB7Li4uKn0gYXJncyBBbnkgbnVtYmVyIG9mIHBvc2l0aW9uYWwgYXJndW1lbnRzLlxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5hcHBseVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuY2FsbChSLmFkZCwgMSwgMik7IC8vPT4gM1xuICpcbiAqICAgICAgdmFyIGluZGVudE4gPSBSLnBpcGUoUi50aW1lcyhSLmFsd2F5cygnICcpKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5qb2luKCcnKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5yZXBsYWNlKC9eKD8hJCkvZ20pKTtcbiAqXG4gKiAgICAgIHZhciBmb3JtYXQgPSBSLmNvbnZlcmdlKFIuY2FsbCwgW1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5waXBlKFIucHJvcCgnaW5kZW50JyksIGluZGVudE4pLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5wcm9wKCd2YWx1ZScpXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICpcbiAqICAgICAgZm9ybWF0KHtpbmRlbnQ6IDIsIHZhbHVlOiAnZm9vXFxuYmFyXFxuYmF6XFxuJ30pOyAvLz0+ICcgIGZvb1xcbiAgYmFyXFxuICBiYXpcXG4nXG4gKiBAc3ltYiBSLmNhbGwoZiwgYSwgYikgPSBmKGEsIGIpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY3VycnkoZnVuY3Rpb24gY2FsbChmbikge1xuICByZXR1cm4gZm4uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF9tYWtlRmxhdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX21ha2VGbGF0Jyk7XG52YXIgX3hjaGFpbiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3hjaGFpbicpO1xudmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG5cblxuLyoqXG4gKiBgY2hhaW5gIG1hcHMgYSBmdW5jdGlvbiBvdmVyIGEgbGlzdCBhbmQgY29uY2F0ZW5hdGVzIHRoZSByZXN1bHRzLiBgY2hhaW5gXG4gKiBpcyBhbHNvIGtub3duIGFzIGBmbGF0TWFwYCBpbiBzb21lIGxpYnJhcmllc1xuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBjaGFpbmAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQsXG4gKiBhY2NvcmRpbmcgdG8gdGhlIFtGYW50YXN5TGFuZCBDaGFpbiBzcGVjXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2NoYWluKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIENoYWluIG0gPT4gKGEgLT4gbSBiKSAtPiBtIGEgLT4gbSBiXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWFwIHdpdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gbWFwIG92ZXJcbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgcmVzdWx0IG9mIGZsYXQtbWFwcGluZyBgbGlzdGAgd2l0aCBgZm5gXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGR1cGxpY2F0ZSA9IG4gPT4gW24sIG5dO1xuICogICAgICBSLmNoYWluKGR1cGxpY2F0ZSwgWzEsIDIsIDNdKTsgLy89PiBbMSwgMSwgMiwgMiwgMywgM11cbiAqXG4gKiAgICAgIFIuY2hhaW4oUi5hcHBlbmQsIFIuaGVhZCkoWzEsIDIsIDNdKTsgLy89PiBbMSwgMiwgMywgMV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoWydjaGFpbiddLCBfeGNoYWluLCBmdW5jdGlvbiBjaGFpbihmbiwgbW9uYWQpIHtcbiAgaWYgKHR5cGVvZiBtb25hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmdW5jdGlvbih4KSB7IHJldHVybiBmbihtb25hZCh4KSkoeCk7IH07XG4gIH1cbiAgcmV0dXJuIF9tYWtlRmxhdChmYWxzZSkobWFwKGZuLCBtb25hZCkpO1xufSkpO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBSZXN0cmljdHMgYSBudW1iZXIgdG8gYmUgd2l0aGluIGEgcmFuZ2UuXG4gKlxuICogQWxzbyB3b3JrcyBmb3Igb3RoZXIgb3JkZXJlZCB0eXBlcyBzdWNoIGFzIFN0cmluZ3MgYW5kIERhdGVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIwLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYSAtPiBhXG4gKiBAcGFyYW0ge051bWJlcn0gbWluaW11bSBUaGUgbG93ZXIgbGltaXQgb2YgdGhlIGNsYW1wIChpbmNsdXNpdmUpXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4aW11bSBUaGUgdXBwZXIgbGltaXQgb2YgdGhlIGNsYW1wIChpbmNsdXNpdmUpXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgVmFsdWUgdG8gYmUgY2xhbXBlZFxuICogQHJldHVybiB7TnVtYmVyfSBSZXR1cm5zIGBtaW5pbXVtYCB3aGVuIGB2YWwgPCBtaW5pbXVtYCwgYG1heGltdW1gIHdoZW4gYHZhbCA+IG1heGltdW1gLCByZXR1cm5zIGB2YWxgIG90aGVyd2lzZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuY2xhbXAoMSwgMTAsIC01KSAvLyA9PiAxXG4gKiAgICAgIFIuY2xhbXAoMSwgMTAsIDE1KSAvLyA9PiAxMFxuICogICAgICBSLmNsYW1wKDEsIDEwLCA0KSAgLy8gPT4gNFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gY2xhbXAobWluLCBtYXgsIHZhbHVlKSB7XG4gIGlmIChtaW4gPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21pbiBtdXN0IG5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IGluIGNsYW1wKG1pbiwgbWF4LCB2YWx1ZSknKTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPCBtaW4gPyBtaW4gOlxuICAgICAgICAgdmFsdWUgPiBtYXggPyBtYXggOlxuICAgICAgICAgdmFsdWU7XG59KTtcbiIsInZhciBfY2xvbmUgPSByZXF1aXJlKCcuL2ludGVybmFsL19jbG9uZScpO1xudmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgdGhlIHZhbHVlIHdoaWNoIG1heSBjb250YWluIChuZXN0ZWQpIGBBcnJheWBzIGFuZFxuICogYE9iamVjdGBzLCBgTnVtYmVyYHMsIGBTdHJpbmdgcywgYEJvb2xlYW5gcyBhbmQgYERhdGVgcy4gYEZ1bmN0aW9uYHMgYXJlXG4gKiBhc3NpZ25lZCBieSByZWZlcmVuY2UgcmF0aGVyIHRoYW4gY29waWVkXG4gKlxuICogRGlzcGF0Y2hlcyB0byBhIGBjbG9uZWAgbWV0aG9kIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHsqfSAtPiB7Kn1cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG9iamVjdCBvciBhcnJheSB0byBjbG9uZVxuICogQHJldHVybiB7Kn0gQSBkZWVwbHkgY2xvbmVkIGNvcHkgb2YgYHZhbGBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgb2JqZWN0cyA9IFt7fSwge30sIHt9XTtcbiAqICAgICAgdmFyIG9iamVjdHNDbG9uZSA9IFIuY2xvbmUob2JqZWN0cyk7XG4gKiAgICAgIG9iamVjdHMgPT09IG9iamVjdHNDbG9uZTsgLy89PiBmYWxzZVxuICogICAgICBvYmplY3RzWzBdID09PSBvYmplY3RzQ2xvbmVbMF07IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGNsb25lKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgdmFsdWUuY2xvbmUoKSA6XG4gICAgX2Nsb25lKHZhbHVlLCBbXSwgW10sIHRydWUpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG5cbi8qKlxuICogTWFrZXMgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIG91dCBvZiBhIGZ1bmN0aW9uIHRoYXQgcmVwb3J0cyB3aGV0aGVyIHRoZSBmaXJzdFxuICogZWxlbWVudCBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoYSwgYiAtPiBCb29sZWFuKSAtPiAoYSwgYiAtPiBOdW1iZXIpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIGZ1bmN0aW9uIG9mIGFyaXR5IHR3byB3aGljaCB3aWxsIHJldHVybiBgdHJ1ZWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIEZ1bmN0aW9uIDo6IGEgLT4gYiAtPiBJbnQgdGhhdCByZXR1cm5zIGAtMWAgaWYgYSA8IGIsIGAxYCBpZiBiIDwgYSwgb3RoZXJ3aXNlIGAwYFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBieUFnZSA9IFIuY29tcGFyYXRvcigoYSwgYikgPT4gYS5hZ2UgPCBiLmFnZSk7XG4gKiAgICAgIHZhciBwZW9wbGUgPSBbXG4gKiAgICAgICAgLy8gLi4uXG4gKiAgICAgIF07XG4gKiAgICAgIHZhciBwZW9wbGVCeUluY3JlYXNpbmdBZ2UgPSBSLnNvcnQoYnlBZ2UsIHBlb3BsZSk7XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBjb21wYXJhdG9yKHByZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gcHJlZChhLCBiKSA/IC0xIDogcHJlZChiLCBhKSA/IDEgOiAwO1xuICB9O1xufSk7XG4iLCJ2YXIgbGlmdCA9IHJlcXVpcmUoJy4vbGlmdCcpO1xudmFyIG5vdCA9IHJlcXVpcmUoJy4vbm90Jyk7XG5cblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGBmYCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIGBnYCBzdWNoIHRoYXQgaWYgY2FsbGVkIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzXG4gKiB3aGVuIGBmYCByZXR1cm5zIGEgXCJ0cnV0aHlcIiB2YWx1ZSwgYGdgIHJldHVybnMgYGZhbHNlYCBhbmQgd2hlbiBgZmAgcmV0dXJucyBhIFwiZmFsc3lcIiB2YWx1ZSBgZ2AgcmV0dXJucyBgdHJ1ZWAuXG4gKlxuICogYFIuY29tcGxlbWVudGAgbWF5IGJlIGFwcGxpZWQgdG8gYW55IGZ1bmN0b3JcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKCouLi4gLT4gKikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLm5vdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpc05vdE5pbCA9IFIuY29tcGxlbWVudChSLmlzTmlsKTtcbiAqICAgICAgaXNOaWwobnVsbCk7IC8vPT4gdHJ1ZVxuICogICAgICBpc05vdE5pbChudWxsKTsgLy89PiBmYWxzZVxuICogICAgICBpc05pbCg3KTsgLy89PiBmYWxzZVxuICogICAgICBpc05vdE5pbCg3KTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gbGlmdChub3QpO1xuIiwidmFyIHBpcGUgPSByZXF1aXJlKCcuL3BpcGUnKTtcbnZhciByZXZlcnNlID0gcmVxdWlyZSgnLi9yZXZlcnNlJyk7XG5cblxuLyoqXG4gKiBQZXJmb3JtcyByaWdodC10by1sZWZ0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLiBUaGUgcmlnaHRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gKiBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmcgZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogKipOb3RlOioqIFRoZSByZXN1bHQgb2YgY29tcG9zZSBpcyBub3QgYXV0b21hdGljYWxseSBjdXJyaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoeSAtPiB6KSwgKHggLT4geSksIC4uLiwgKG8gLT4gcCksICgoYSwgYiwgLi4uLCBuKSAtPiBvKSkgLT4gKChhLCBiLCAuLi4sIG4pIC0+IHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSAuLi5mdW5jdGlvbnMgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5waXBlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGNsYXNzeUdyZWV0aW5nID0gKGZpcnN0TmFtZSwgbGFzdE5hbWUpID0+IFwiVGhlIG5hbWUncyBcIiArIGxhc3ROYW1lICsgXCIsIFwiICsgZmlyc3ROYW1lICsgXCIgXCIgKyBsYXN0TmFtZVxuICogICAgICB2YXIgeWVsbEdyZWV0aW5nID0gUi5jb21wb3NlKFIudG9VcHBlciwgY2xhc3N5R3JlZXRpbmcpO1xuICogICAgICB5ZWxsR3JlZXRpbmcoJ0phbWVzJywgJ0JvbmQnKTsgLy89PiBcIlRIRSBOQU1FJ1MgQk9ORCwgSkFNRVMgQk9ORFwiXG4gKlxuICogICAgICBSLmNvbXBvc2UoTWF0aC5hYnMsIFIuYWRkKDEpLCBSLm11bHRpcGx5KDIpKSgtNCkgLy89PiA3XG4gKlxuICogQHN5bWIgUi5jb21wb3NlKGYsIGcsIGgpKGEsIGIpID0gZihnKGgoYSwgYikpKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjb21wb3NlIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICB9XG4gIHJldHVybiBwaXBlLmFwcGx5KHRoaXMsIHJldmVyc2UoYXJndW1lbnRzKSk7XG59O1xuIiwidmFyIGNoYWluID0gcmVxdWlyZSgnLi9jaGFpbicpO1xudmFyIGNvbXBvc2UgPSByZXF1aXJlKCcuL2NvbXBvc2UnKTtcbnZhciBtYXAgPSByZXF1aXJlKCcuL21hcCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmlnaHQtdG8tbGVmdCBLbGVpc2xpIGNvbXBvc2l0aW9uIG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbnMsXG4gKiBlYWNoIG9mIHdoaWNoIG11c3QgcmV0dXJuIGEgdmFsdWUgb2YgYSB0eXBlIHN1cHBvcnRlZCBieSBbYGNoYWluYF0oI2NoYWluKS5cbiAqXG4gKiBgUi5jb21wb3NlSyhoLCBnLCBmKWAgaXMgZXF1aXZhbGVudCB0byBgUi5jb21wb3NlKFIuY2hhaW4oaCksIFIuY2hhaW4oZyksIFIuY2hhaW4oZikpYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgQ2hhaW4gbSA9PiAoKHkgLT4gbSB6KSwgKHggLT4gbSB5KSwgLi4uLCAoYSAtPiBtIGIpKSAtPiAoYSAtPiBtIHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSAuLi5mdW5jdGlvbnMgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5waXBlS1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgICAvLyAgZ2V0IDo6IFN0cmluZyAtPiBPYmplY3QgLT4gTWF5YmUgKlxuICogICAgICAgdmFyIGdldCA9IFIuY3VycnkoKHByb3BOYW1lLCBvYmopID0+IE1heWJlKG9ialtwcm9wTmFtZV0pKVxuICpcbiAqICAgICAgIC8vICBnZXRTdGF0ZUNvZGUgOjogTWF5YmUgU3RyaW5nIC0+IE1heWJlIFN0cmluZ1xuICogICAgICAgdmFyIGdldFN0YXRlQ29kZSA9IFIuY29tcG9zZUsoXG4gKiAgICAgICAgIFIuY29tcG9zZShNYXliZS5vZiwgUi50b1VwcGVyKSxcbiAqICAgICAgICAgZ2V0KCdzdGF0ZScpLFxuICogICAgICAgICBnZXQoJ2FkZHJlc3MnKSxcbiAqICAgICAgICAgZ2V0KCd1c2VyJyksXG4gKiAgICAgICApO1xuICogICAgICAgZ2V0U3RhdGVDb2RlKHtcInVzZXJcIjp7XCJhZGRyZXNzXCI6e1wic3RhdGVcIjpcIm55XCJ9fX0pOyAvLz0+IE1heWJlLkp1c3QoXCJOWVwiKVxuICogICAgICAgZ2V0U3RhdGVDb2RlKHt9KTsgLy89PiBNYXliZS5Ob3RoaW5nKClcbiAqIEBzeW1iIFIuY29tcG9zZUsoZiwgZywgaCkoYSkgPSBSLmNoYWluKGYsIFIuY2hhaW4oZywgaChhKSkpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcG9zZUsoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjb21wb3NlSyByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICB2YXIgaW5pdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIHZhciBsYXN0ID0gaW5pdC5wb3AoKTtcbiAgcmV0dXJuIGNvbXBvc2UoY29tcG9zZS5hcHBseSh0aGlzLCBtYXAoY2hhaW4sIGluaXQpKSwgbGFzdCk7XG59O1xuIiwidmFyIHBpcGVQID0gcmVxdWlyZSgnLi9waXBlUCcpO1xudmFyIHJldmVyc2UgPSByZXF1aXJlKCcuL3JldmVyc2UnKTtcblxuXG4vKipcbiAqIFBlcmZvcm1zIHJpZ2h0LXRvLWxlZnQgY29tcG9zaXRpb24gb2Ygb25lIG9yIG1vcmUgUHJvbWlzZS1yZXR1cm5pbmdcbiAqIGZ1bmN0aW9ucy4gVGhlIHJpZ2h0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZSBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmdcbiAqIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKHkgLT4gUHJvbWlzZSB6KSwgKHggLT4gUHJvbWlzZSB5KSwgLi4uLCAoYSAtPiBQcm9taXNlIGIpKSAtPiAoYSAtPiBQcm9taXNlIHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jdGlvbnMgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5waXBlUFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkYiA9IHtcbiAqICAgICAgICB1c2Vyczoge1xuICogICAgICAgICAgSk9FOiB7XG4gKiAgICAgICAgICAgIG5hbWU6ICdKb2UnLFxuICogICAgICAgICAgICBmb2xsb3dlcnM6IFsnU1RFVkUnLCAnU1VaWSddXG4gKiAgICAgICAgICB9XG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKlxuICogICAgICAvLyBXZSdsbCBwcmV0ZW5kIHRvIGRvIGEgZGIgbG9va3VwIHdoaWNoIHJldHVybnMgYSBwcm9taXNlXG4gKiAgICAgIHZhciBsb29rdXBVc2VyID0gKHVzZXJJZCkgPT4gUHJvbWlzZS5yZXNvbHZlKGRiLnVzZXJzW3VzZXJJZF0pXG4gKiAgICAgIHZhciBsb29rdXBGb2xsb3dlcnMgPSAodXNlcikgPT4gUHJvbWlzZS5yZXNvbHZlKHVzZXIuZm9sbG93ZXJzKVxuICogICAgICBsb29rdXBVc2VyKCdKT0UnKS50aGVuKGxvb2t1cEZvbGxvd2VycylcbiAqXG4gKiAgICAgIC8vICBmb2xsb3dlcnNGb3JVc2VyIDo6IFN0cmluZyAtPiBQcm9taXNlIFtVc2VySWRdXG4gKiAgICAgIHZhciBmb2xsb3dlcnNGb3JVc2VyID0gUi5jb21wb3NlUChsb29rdXBGb2xsb3dlcnMsIGxvb2t1cFVzZXIpO1xuICogICAgICBmb2xsb3dlcnNGb3JVc2VyKCdKT0UnKS50aGVuKGZvbGxvd2VycyA9PiBjb25zb2xlLmxvZygnRm9sbG93ZXJzOicsIGZvbGxvd2VycykpXG4gKiAgICAgIC8vIEZvbGxvd2VyczogW1wiU1RFVkVcIixcIlNVWllcIl1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wb3NlUCgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvc2VQIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICB9XG4gIHJldHVybiBwaXBlUC5hcHBseSh0aGlzLCByZXZlcnNlKGFyZ3VtZW50cykpO1xufTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG52YXIgX2lzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2ludGVybmFsL19pc0Z1bmN0aW9uJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY29uY2F0ZW5hdGluZyB0aGUgZ2l2ZW4gbGlzdHMgb3Igc3RyaW5ncy5cbiAqXG4gKiBOb3RlOiBgUi5jb25jYXRgIGV4cGVjdHMgYm90aCBhcmd1bWVudHMgdG8gYmUgb2YgdGhlIHNhbWUgdHlwZSxcbiAqIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUuY29uY2F0YCBtZXRob2QuIEl0IHdpbGwgdGhyb3dcbiAqIGFuIGVycm9yIGlmIHlvdSBgY29uY2F0YCBhbiBBcnJheSB3aXRoIGEgbm9uLUFycmF5IHZhbHVlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBjb25jYXRgIG1ldGhvZCBvZiB0aGUgZmlyc3QgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGZpcnN0TGlzdCBUaGUgZmlyc3QgbGlzdFxuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IHNlY29uZExpc3QgVGhlIHNlY29uZCBsaXN0XG4gKiBAcmV0dXJuIHtBcnJheXxTdHJpbmd9IEEgbGlzdCBjb25zaXN0aW5nIG9mIHRoZSBlbGVtZW50cyBvZiBgZmlyc3RMaXN0YCBmb2xsb3dlZCBieSB0aGUgZWxlbWVudHMgb2ZcbiAqIGBzZWNvbmRMaXN0YC5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5jb25jYXQoJ0FCQycsICdERUYnKTsgLy8gJ0FCQ0RFRidcbiAqICAgICAgUi5jb25jYXQoWzQsIDUsIDZdLCBbMSwgMiwgM10pOyAvLz0+IFs0LCA1LCA2LCAxLCAyLCAzXVxuICogICAgICBSLmNvbmNhdChbXSwgW10pOyAvLz0+IFtdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBjb25jYXQoYSwgYikge1xuICBpZiAoYSA9PSBudWxsIHx8ICFfaXNGdW5jdGlvbihhLmNvbmNhdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nKGEpICsgJyBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwiY29uY2F0XCInKTtcbiAgfVxuICBpZiAoX2lzQXJyYXkoYSkgJiYgIV9pc0FycmF5KGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcih0b1N0cmluZyhiKSArICcgaXMgbm90IGFuIGFycmF5Jyk7XG4gIH1cbiAgcmV0dXJuIGEuY29uY2F0KGIpO1xufSk7XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcbnZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAnKTtcbnZhciBtYXggPSByZXF1aXJlKCcuL21heCcpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJy4vcmVkdWNlJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24sIGBmbmAsIHdoaWNoIGVuY2Fwc3VsYXRlcyBgaWYvZWxzZSwgaWYvZWxzZSwgLi4uYCBsb2dpYy5cbiAqIGBSLmNvbmRgIHRha2VzIGEgbGlzdCBvZiBbcHJlZGljYXRlLCB0cmFuc2Zvcm1lcl0gcGFpcnMuIEFsbCBvZiB0aGUgYXJndW1lbnRzXG4gKiB0byBgZm5gIGFyZSBhcHBsaWVkIHRvIGVhY2ggb2YgdGhlIHByZWRpY2F0ZXMgaW4gdHVybiB1bnRpbCBvbmUgcmV0dXJucyBhXG4gKiBcInRydXRoeVwiIHZhbHVlLCBhdCB3aGljaCBwb2ludCBgZm5gIHJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBpdHNcbiAqIGFyZ3VtZW50cyB0byB0aGUgY29ycmVzcG9uZGluZyB0cmFuc2Zvcm1lci4gSWYgbm9uZSBvZiB0aGUgcHJlZGljYXRlc1xuICogbWF0Y2hlcywgYGZuYCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyBbWygqLi4uIC0+IEJvb2xlYW4pLCgqLi4uIC0+ICopXV0gLT4gKCouLi4gLT4gKilcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzIEEgbGlzdCBvZiBbcHJlZGljYXRlLCB0cmFuc2Zvcm1lcl1cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBmbiA9IFIuY29uZChbXG4gKiAgICAgICAgW1IuZXF1YWxzKDApLCAgIFIuYWx3YXlzKCd3YXRlciBmcmVlemVzIGF0IDDCsEMnKV0sXG4gKiAgICAgICAgW1IuZXF1YWxzKDEwMCksIFIuYWx3YXlzKCd3YXRlciBib2lscyBhdCAxMDDCsEMnKV0sXG4gKiAgICAgICAgW1IuVCwgICAgICAgICAgIHRlbXAgPT4gJ25vdGhpbmcgc3BlY2lhbCBoYXBwZW5zIGF0ICcgKyB0ZW1wICsgJ8KwQyddXG4gKiAgICAgIF0pO1xuICogICAgICBmbigwKTsgLy89PiAnd2F0ZXIgZnJlZXplcyBhdCAwwrBDJ1xuICogICAgICBmbig1MCk7IC8vPT4gJ25vdGhpbmcgc3BlY2lhbCBoYXBwZW5zIGF0IDUwwrBDJ1xuICogICAgICBmbigxMDApOyAvLz0+ICd3YXRlciBib2lscyBhdCAxMDDCsEMnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBjb25kKHBhaXJzKSB7XG4gIHZhciBhcml0eSA9IHJlZHVjZShtYXgsXG4gICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgbWFwKGZ1bmN0aW9uKHBhaXIpIHsgcmV0dXJuIHBhaXJbMF0ubGVuZ3RoOyB9LCBwYWlycykpO1xuICByZXR1cm4gX2FyaXR5KGFyaXR5LCBmdW5jdGlvbigpIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZSAoaWR4IDwgcGFpcnMubGVuZ3RoKSB7XG4gICAgICBpZiAocGFpcnNbaWR4XVswXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XG4gICAgICAgIHJldHVybiBwYWlyc1tpZHhdWzFdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIGNvbnN0cnVjdE4gPSByZXF1aXJlKCcuL2NvbnN0cnVjdE4nKTtcblxuXG4vKipcbiAqIFdyYXBzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gaW5zaWRlIGEgY3VycmllZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzIGFuZCByZXR1cm5zIHRoZSBzYW1lIHR5cGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4geyp9KSAtPiAoKiAtPiB7Kn0pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHdyYXBwZWQsIGN1cnJpZWQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gQ29uc3RydWN0b3IgZnVuY3Rpb25cbiAqICAgICAgZnVuY3Rpb24gQW5pbWFsKGtpbmQpIHtcbiAqICAgICAgICB0aGlzLmtpbmQgPSBraW5kO1xuICogICAgICB9O1xuICogICAgICBBbmltYWwucHJvdG90eXBlLnNpZ2h0aW5nID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgcmV0dXJuIFwiSXQncyBhIFwiICsgdGhpcy5raW5kICsgXCIhXCI7XG4gKiAgICAgIH1cbiAqXG4gKiAgICAgIHZhciBBbmltYWxDb25zdHJ1Y3RvciA9IFIuY29uc3RydWN0KEFuaW1hbClcbiAqXG4gKiAgICAgIC8vIE5vdGljZSB3ZSBubyBsb25nZXIgbmVlZCB0aGUgJ25ldycga2V5d29yZDpcbiAqICAgICAgQW5pbWFsQ29uc3RydWN0b3IoJ1BpZycpOyAvLz0+IHtcImtpbmRcIjogXCJQaWdcIiwgXCJzaWdodGluZ1wiOiBmdW5jdGlvbiAoKXsuLi59fTtcbiAqXG4gKiAgICAgIHZhciBhbmltYWxUeXBlcyA9IFtcIkxpb25cIiwgXCJUaWdlclwiLCBcIkJlYXJcIl07XG4gKiAgICAgIHZhciBhbmltYWxTaWdodGluZyA9IFIuaW52b2tlcigwLCAnc2lnaHRpbmcnKTtcbiAqICAgICAgdmFyIHNpZ2h0TmV3QW5pbWFsID0gUi5jb21wb3NlKGFuaW1hbFNpZ2h0aW5nLCBBbmltYWxDb25zdHJ1Y3Rvcik7XG4gKiAgICAgIFIubWFwKHNpZ2h0TmV3QW5pbWFsLCBhbmltYWxUeXBlcyk7IC8vPT4gW1wiSXQncyBhIExpb24hXCIsIFwiSXQncyBhIFRpZ2VyIVwiLCBcIkl0J3MgYSBCZWFyIVwiXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gY29uc3RydWN0KEZuKSB7XG4gIHJldHVybiBjb25zdHJ1Y3ROKEZuLmxlbmd0aCwgRm4pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIGN1cnJ5ID0gcmVxdWlyZSgnLi9jdXJyeScpO1xudmFyIG5BcnkgPSByZXF1aXJlKCcuL25BcnknKTtcblxuXG4vKipcbiAqIFdyYXBzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gaW5zaWRlIGEgY3VycmllZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzIGFuZCByZXR1cm5zIHRoZSBzYW1lIHR5cGUuIFRoZSBhcml0eSBvZiB0aGUgZnVuY3Rpb25cbiAqIHJldHVybmVkIGlzIHNwZWNpZmllZCB0byBhbGxvdyB1c2luZyB2YXJpYWRpYyBjb25zdHJ1Y3RvciBmdW5jdGlvbnMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IHsqfSkgLT4gKCogLT4geyp9KVxuICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIGFyaXR5IG9mIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IEZuIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byB3cmFwLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgd3JhcHBlZCwgY3VycmllZCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyBWYXJpYWRpYyBDb25zdHJ1Y3RvciBmdW5jdGlvblxuICogICAgICBmdW5jdGlvbiBTYWxhZCgpIHtcbiAqICAgICAgICB0aGlzLmluZ3JlZGllbnRzID0gYXJndW1lbnRzO1xuICogICAgICB9O1xuICogICAgICBTYWxhZC5wcm90b3R5cGUucmVjaXBlID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgdmFyIGluc3RydWN0aW9ucyA9IFIubWFwKChpbmdyZWRpZW50KSA9PiAoXG4gKiAgICAgICAgICAnQWRkIGEgd2hvbGxvcCBvZiAnICsgaW5ncmVkaWVudCwgdGhpcy5pbmdyZWRpZW50cylcbiAqICAgICAgICApXG4gKiAgICAgICAgcmV0dXJuIFIuam9pbignXFxuJywgaW5zdHJ1Y3Rpb25zKVxuICogICAgICB9XG4gKlxuICogICAgICB2YXIgVGhyZWVMYXllclNhbGFkID0gUi5jb25zdHJ1Y3ROKDMsIFNhbGFkKVxuICpcbiAqICAgICAgLy8gTm90aWNlIHdlIG5vIGxvbmdlciBuZWVkIHRoZSAnbmV3JyBrZXl3b3JkLCBhbmQgdGhlIGNvbnN0cnVjdG9yIGlzIGN1cnJpZWQgZm9yIDMgYXJndW1lbnRzLlxuICogICAgICB2YXIgc2FsYWQgPSBUaHJlZUxheWVyU2FsYWQoJ01heW9ubmFpc2UnKSgnUG90YXRvIENoaXBzJykoJ0tldGNodXAnKVxuICogICAgICBjb25zb2xlLmxvZyhzYWxhZC5yZWNpcGUoKSk7XG4gKiAgICAgIC8vIEFkZCBhIHdob2xsb3Agb2YgTWF5b25uYWlzZVxuICogICAgICAvLyBBZGQgYSB3aG9sbG9wIG9mIFBvdGF0byBDaGlwc1xuICogICAgICAvLyBBZGQgYSB3aG9sbG9wIG9mIFBvdGF0byBLZXRjaHVwXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBjb25zdHJ1Y3ROKG4sIEZuKSB7XG4gIGlmIChuID4gMTApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnN0cnVjdG9yIHdpdGggZ3JlYXRlciB0aGFuIHRlbiBhcmd1bWVudHMnKTtcbiAgfVxuICBpZiAobiA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBGbigpOyB9O1xuICB9XG4gIHJldHVybiBjdXJyeShuQXJ5KG4sIGZ1bmN0aW9uKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlICAxOiByZXR1cm4gbmV3IEZuKCQwKTtcbiAgICAgIGNhc2UgIDI6IHJldHVybiBuZXcgRm4oJDAsICQxKTtcbiAgICAgIGNhc2UgIDM6IHJldHVybiBuZXcgRm4oJDAsICQxLCAkMik7XG4gICAgICBjYXNlICA0OiByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzKTtcbiAgICAgIGNhc2UgIDU6IHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0KTtcbiAgICAgIGNhc2UgIDY6IHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSk7XG4gICAgICBjYXNlICA3OiByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2KTtcbiAgICAgIGNhc2UgIDg6IHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3KTtcbiAgICAgIGNhc2UgIDk6IHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3LCAkOCk7XG4gICAgICBjYXNlIDEwOiByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KTtcbiAgICB9XG4gIH0pKTtcbn0pO1xuIiwidmFyIF9jb250YWlucyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbnRhaW5zJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBlcXVhbCwgaW4gYFIuZXF1YWxzYCB0ZXJtcywgdG8gYXRcbiAqIGxlYXN0IG9uZSBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0OyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBpdGVtIHRvIGNvbXBhcmUgYWdhaW5zdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGFuIGVxdWl2YWxlbnQgaXRlbSBpcyBpbiB0aGUgbGlzdCwgYGZhbHNlYCBvdGhlcndpc2UuXG4gKiBAc2VlIFIuYW55XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5jb250YWlucygzLCBbMSwgMiwgM10pOyAvLz0+IHRydWVcbiAqICAgICAgUi5jb250YWlucyg0LCBbMSwgMiwgM10pOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuY29udGFpbnMoeyBuYW1lOiAnRnJlZCcgfSwgW3sgbmFtZTogJ0ZyZWQnIH1dKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuY29udGFpbnMoWzQyXSwgW1s0Ml1dKTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfY29udGFpbnMpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfbWFwID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFwJyk7XG52YXIgY3VycnlOID0gcmVxdWlyZSgnLi9jdXJyeU4nKTtcbnZhciBtYXggPSByZXF1aXJlKCcuL21heCcpO1xudmFyIHBsdWNrID0gcmVxdWlyZSgnLi9wbHVjaycpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJy4vcmVkdWNlJyk7XG5cblxuLyoqXG4gKiBBY2NlcHRzIGEgY29udmVyZ2luZyBmdW5jdGlvbiBhbmQgYSBsaXN0IG9mIGJyYW5jaGluZyBmdW5jdGlvbnMgYW5kIHJldHVybnNcbiAqIGEgbmV3IGZ1bmN0aW9uLiBXaGVuIGludm9rZWQsIHRoaXMgbmV3IGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gc29tZVxuICogYXJndW1lbnRzLCBlYWNoIGJyYW5jaGluZyBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRob3NlIHNhbWUgYXJndW1lbnRzLiBUaGVcbiAqIHJlc3VsdHMgb2YgZWFjaCBicmFuY2hpbmcgZnVuY3Rpb24gYXJlIHBhc3NlZCBhcyBhcmd1bWVudHMgdG8gdGhlIGNvbnZlcmdpbmdcbiAqIGZ1bmN0aW9uIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC40LjJcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoeDEgLT4geDIgLT4gLi4uIC0+IHopIC0+IFsoYSAtPiBiIC0+IC4uLiAtPiB4MSksIChhIC0+IGIgLT4gLi4uIC0+IHgyKSwgLi4uXSAtPiAoYSAtPiBiIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYWZ0ZXIgQSBmdW5jdGlvbi4gYGFmdGVyYCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgcmV0dXJuIHZhbHVlcyBvZlxuICogICAgICAgIGBmbjFgIGFuZCBgZm4yYCBhcyBpdHMgYXJndW1lbnRzLlxuICogQHBhcmFtIHtBcnJheX0gZnVuY3Rpb25zIEEgbGlzdCBvZiBmdW5jdGlvbnMuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24uXG4gKiBAc2VlIFIudXNlV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBhdmVyYWdlID0gUi5jb252ZXJnZShSLmRpdmlkZSwgW1Iuc3VtLCBSLmxlbmd0aF0pXG4gKiAgICAgIGF2ZXJhZ2UoWzEsIDIsIDMsIDQsIDUsIDYsIDddKSAvLz0+IDRcbiAqXG4gKiAgICAgIHZhciBzdHJhbmdlQ29uY2F0ID0gUi5jb252ZXJnZShSLmNvbmNhdCwgW1IudG9VcHBlciwgUi50b0xvd2VyXSlcbiAqICAgICAgc3RyYW5nZUNvbmNhdChcIllvZGVsXCIpIC8vPT4gXCJZT0RFTHlvZGVsXCJcbiAqXG4gKiBAc3ltYiBSLmNvbnZlcmdlKGYsIFtnLCBoXSkoYSwgYikgPSBmKGcoYSwgYiksIGgoYSwgYikpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBjb252ZXJnZShhZnRlciwgZm5zKSB7XG4gIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIGZucykpLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgcmV0dXJuIGFmdGVyLmFwcGx5KGNvbnRleHQsIF9tYXAoZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9LCBmbnMpKTtcbiAgfSk7XG59KTtcbiIsInZhciByZWR1Y2VCeSA9IHJlcXVpcmUoJy4vcmVkdWNlQnknKTtcblxuXG4vKipcbiAqIENvdW50cyB0aGUgZWxlbWVudHMgb2YgYSBsaXN0IGFjY29yZGluZyB0byBob3cgbWFueSBtYXRjaCBlYWNoIHZhbHVlIG9mIGFcbiAqIGtleSBnZW5lcmF0ZWQgYnkgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLiBSZXR1cm5zIGFuIG9iamVjdCBtYXBwaW5nIHRoZSBrZXlzXG4gKiBwcm9kdWNlZCBieSBgZm5gIHRvIHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgaW4gdGhlIGxpc3QuIE5vdGUgdGhhdCBhbGxcbiAqIGtleXMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBiZWNhdXNlIG9mIGhvdyBKYXZhU2NyaXB0IG9iamVjdHMgd29yay5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKGEgLT4gU3RyaW5nKSAtPiBbYV0gLT4geyp9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdXNlZCB0byBtYXAgdmFsdWVzIHRvIGtleXMuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGNvdW50IGVsZW1lbnRzIGZyb20uXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBtYXBwaW5nIGtleXMgdG8gbnVtYmVyIG9mIG9jY3VycmVuY2VzIGluIHRoZSBsaXN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBudW1iZXJzID0gWzEuMCwgMS4xLCAxLjIsIDIuMCwgMy4wLCAyLjJdO1xuICogICAgICBSLmNvdW50QnkoTWF0aC5mbG9vcikobnVtYmVycyk7ICAgIC8vPT4geycxJzogMywgJzInOiAyLCAnMyc6IDF9XG4gKlxuICogICAgICB2YXIgbGV0dGVycyA9IFsnYScsICdiJywgJ0EnLCAnYScsICdCJywgJ2MnXTtcbiAqICAgICAgUi5jb3VudEJ5KFIudG9Mb3dlcikobGV0dGVycyk7ICAgLy89PiB7J2EnOiAzLCAnYic6IDIsICdjJzogMX1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSByZWR1Y2VCeShmdW5jdGlvbihhY2MsIGVsZW0pIHsgcmV0dXJuIGFjYyArIDE7IH0sIDApO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZVxuICogYXQgYSB0aW1lLiBJZiBgZmAgaXMgYSB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgZ2AgaXMgYFIuY3VycnkoZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIGBSLl9fYCBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIGBSLl9fYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlOXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFkZEZvdXJOdW1iZXJzID0gKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQ7XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeShhZGRGb3VyTnVtYmVycyk7XG4gKiAgICAgIHZhciBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICB2YXIgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGN1cnJ5KGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmbik7XG59KTtcbiIsInZhciBfYXJpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xudmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2N1cnJ5TiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5TicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24sIHdpdGggdGhlIHNwZWNpZmllZFxuICogYXJpdHkuIFRoZSBjdXJyaWVkIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHNcbiAqIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZSBhdCBhIHRpbWUuIElmIGBnYCBpcyBgUi5jdXJyeU4oMywgZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIGBSLl9fYCBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIGBSLl9fYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjUuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzdW1BcmdzID0gKC4uLmFyZ3MpID0+IFIuc3VtKGFyZ3MpO1xuICpcbiAqICAgICAgdmFyIGN1cnJpZWRBZGRGb3VyTnVtYmVycyA9IFIuY3VycnlOKDQsIHN1bUFyZ3MpO1xuICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgdmFyIGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBjdXJyeU4obGVuZ3RoLCBmbikge1xuICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIF9jdXJyeTEoZm4pO1xuICB9XG4gIHJldHVybiBfYXJpdHkobGVuZ3RoLCBfY3VycnlOKGxlbmd0aCwgW10sIGZuKSk7XG59KTtcbiIsInZhciBhZGQgPSByZXF1aXJlKCcuL2FkZCcpO1xuXG5cbi8qKlxuICogRGVjcmVtZW50cyBpdHMgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7TnVtYmVyfSBuIC0gMVxuICogQHNlZSBSLmluY1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGVjKDQyKTsgLy89PiA0MVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFkZCgtMSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2Vjb25kIGFyZ3VtZW50IGlmIGl0IGlzIG5vdCBgbnVsbGAsIGB1bmRlZmluZWRgIG9yIGBOYU5gXG4gKiBvdGhlcndpc2UgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIHJldHVybmVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyBhIC0+IGIgLT4gYSB8IGJcbiAqIEBwYXJhbSB7YX0gZGVmYXVsdCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7Yn0gdmFsIGB2YWxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiBgZGVmYXVsdGAgdW5sZXNzIGB2YWxgIGlzIGBudWxsYCwgYHVuZGVmaW5lZGAgb3IgYE5hTmAuXG4gKiBAcmV0dXJuIHsqfSBUaGUgc2Vjb25kIHZhbHVlIGlmIGl0IGlzIG5vdCBgbnVsbGAsIGB1bmRlZmluZWRgIG9yIGBOYU5gLCBvdGhlcndpc2UgdGhlIGRlZmF1bHQgdmFsdWVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZGVmYXVsdFRvNDIgPSBSLmRlZmF1bHRUbyg0Mik7XG4gKlxuICogICAgICBkZWZhdWx0VG80MihudWxsKTsgIC8vPT4gNDJcbiAqICAgICAgZGVmYXVsdFRvNDIodW5kZWZpbmVkKTsgIC8vPT4gNDJcbiAqICAgICAgZGVmYXVsdFRvNDIoJ1JhbWRhJyk7ICAvLz0+ICdSYW1kYSdcbiAqICAgICAgLy8gcGFyc2VJbnQoJ3N0cmluZycpIHJlc3VsdHMgaW4gTmFOXG4gKiAgICAgIGRlZmF1bHRUbzQyKHBhcnNlSW50KCdzdHJpbmcnKSk7IC8vPT4gNDJcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGRlZmF1bHRUbyhkLCB2KSB7XG4gIHJldHVybiB2ID09IG51bGwgfHwgdiAhPT0gdiA/IGQgOiB2O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogTWFrZXMgYSBkZXNjZW5kaW5nIGNvbXBhcmF0b3IgZnVuY3Rpb24gb3V0IG9mIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgdmFsdWVcbiAqIHRoYXQgY2FuIGJlIGNvbXBhcmVkIHdpdGggYDxgIGFuZCBgPmAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE9yZCBiID0+IChhIC0+IGIpIC0+IGEgLT4gYSAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEEgZnVuY3Rpb24gb2YgYXJpdHkgb25lIHRoYXQgcmV0dXJucyBhIHZhbHVlIHRoYXQgY2FuIGJlIGNvbXBhcmVkXG4gKiBAcGFyYW0geyp9IGEgVGhlIGZpcnN0IGl0ZW0gdG8gYmUgY29tcGFyZWQuXG4gKiBAcGFyYW0geyp9IGIgVGhlIHNlY29uZCBpdGVtIHRvIGJlIGNvbXBhcmVkLlxuICogQHJldHVybiB7TnVtYmVyfSBgLTFgIGlmIGZuKGEpID4gZm4oYiksIGAxYCBpZiBmbihiKSA+IGZuKGEpLCBvdGhlcndpc2UgYDBgXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGJ5QWdlID0gUi5kZXNjZW5kKFIucHJvcCgnYWdlJykpO1xuICogICAgICB2YXIgcGVvcGxlID0gW1xuICogICAgICAgIC8vIC4uLlxuICogICAgICBdO1xuICogICAgICB2YXIgcGVvcGxlQnlPbGRlc3RGaXJzdCA9IFIuc29ydChieUFnZSwgcGVvcGxlKTtcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKGZ1bmN0aW9uIGRlc2NlbmQoZm4sIGEsIGIpIHtcbiAgdmFyIGFhID0gZm4oYSk7XG4gIHZhciBiYiA9IGZuKGIpO1xuICByZXR1cm4gYWEgPiBiYiA/IC0xIDogYWEgPCBiYiA/IDEgOiAwO1xufSk7XG4iLCJ2YXIgX2NvbnRhaW5zID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnMnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgZmlyc3QgbGlzdCBub3RcbiAqIGNvbnRhaW5lZCBpbiB0aGUgc2Vjb25kIGxpc3QuIE9iamVjdHMgYW5kIEFycmF5cyBhcmUgY29tcGFyZWQgYXJlIGNvbXBhcmVkXG4gKiBpbiB0ZXJtcyBvZiB2YWx1ZSBlcXVhbGl0eSwgbm90IHJlZmVyZW5jZSBlcXVhbGl0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBbKl0gLT4gWypdIC0+IFsqXVxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgdGhhdCBhcmUgbm90IGluIGBsaXN0MmAuXG4gKiBAc2VlIFIuZGlmZmVyZW5jZVdpdGgsIFIuc3ltbWV0cmljRGlmZmVyZW5jZSwgUi5zeW1tZXRyaWNEaWZmZXJlbmNlV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGlmZmVyZW5jZShbMSwyLDMsNF0sIFs3LDYsNSw0LDNdKTsgLy89PiBbMSwyXVxuICogICAgICBSLmRpZmZlcmVuY2UoWzcsNiw1LDQsM10sIFsxLDIsMyw0XSk7IC8vPT4gWzcsNiw1XVxuICogICAgICBSLmRpZmZlcmVuY2UoW3thOiAxfSwge2I6IDJ9XSwgW3thOiAxfSwge2M6IDN9XSkgLy89PiBbe2I6IDJ9XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gZGlmZmVyZW5jZShmaXJzdCwgc2Vjb25kKSB7XG4gIHZhciBvdXQgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBmaXJzdExlbiA9IGZpcnN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGZpcnN0TGVuKSB7XG4gICAgaWYgKCFfY29udGFpbnMoZmlyc3RbaWR4XSwgc2Vjb25kKSAmJiAhX2NvbnRhaW5zKGZpcnN0W2lkeF0sIG91dCkpIHtcbiAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGZpcnN0W2lkeF07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KTtcbiIsInZhciBfY29udGFpbnNXaXRoID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnNXaXRoJyk7XG52YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogRmluZHMgdGhlIHNldCAoaS5lLiBubyBkdXBsaWNhdGVzKSBvZiBhbGwgZWxlbWVudHMgaW4gdGhlIGZpcnN0IGxpc3Qgbm90XG4gKiBjb250YWluZWQgaW4gdGhlIHNlY29uZCBsaXN0LiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGVcbiAqIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKChhLCBhKSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgdGhhdCBhcmUgbm90IGluIGBsaXN0MmAuXG4gKiBAc2VlIFIuZGlmZmVyZW5jZSwgUi5zeW1tZXRyaWNEaWZmZXJlbmNlLCBSLnN5bW1ldHJpY0RpZmZlcmVuY2VXaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGNtcCA9ICh4LCB5KSA9PiB4LmEgPT09IHkuYTtcbiAqICAgICAgdmFyIGwxID0gW3thOiAxfSwge2E6IDJ9LCB7YTogM31dO1xuICogICAgICB2YXIgbDIgPSBbe2E6IDN9LCB7YTogNH1dO1xuICogICAgICBSLmRpZmZlcmVuY2VXaXRoKGNtcCwgbDEsIGwyKTsgLy89PiBbe2E6IDF9LCB7YTogMn1dXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBkaWZmZXJlbmNlV2l0aChwcmVkLCBmaXJzdCwgc2Vjb25kKSB7XG4gIHZhciBvdXQgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBmaXJzdExlbiA9IGZpcnN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGZpcnN0TGVuKSB7XG4gICAgaWYgKCFfY29udGFpbnNXaXRoKHByZWQsIGZpcnN0W2lkeF0sIHNlY29uZCkgJiZcbiAgICAgICAgIV9jb250YWluc1dpdGgocHJlZCwgZmlyc3RbaWR4XSwgb3V0KSkge1xuICAgICAgb3V0LnB1c2goZmlyc3RbaWR4XSk7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IG9iamVjdCB0aGF0IGRvZXMgbm90IGNvbnRhaW4gYSBgcHJvcGAgcHJvcGVydHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBTdHJpbmcgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGRpc3NvY2lhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjbG9uZVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3QgZXF1aXZhbGVudCB0byB0aGUgb3JpZ2luYWwgYnV0IHdpdGhvdXQgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eVxuICogQHNlZSBSLmFzc29jXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5kaXNzb2MoJ2InLCB7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IHthOiAxLCBjOiAzfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gZGlzc29jKHByb3AsIG9iaikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgcmVzdWx0W3BdID0gb2JqW3BdO1xuICB9XG4gIGRlbGV0ZSByZXN1bHRbcHJvcF07XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgYXNzb2MgPSByZXF1aXJlKCcuL2Fzc29jJyk7XG52YXIgZGlzc29jID0gcmVxdWlyZSgnLi9kaXNzb2MnKTtcblxuXG4vKipcbiAqIE1ha2VzIGEgc2hhbGxvdyBjbG9uZSBvZiBhbiBvYmplY3QsIG9taXR0aW5nIHRoZSBwcm9wZXJ0eSBhdCB0aGUgZ2l2ZW4gcGF0aC5cbiAqIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnMgcHJvdG90eXBlIHByb3BlcnRpZXMgb250byB0aGUgbmV3IG9iamVjdFxuICogYXMgd2VsbC4gQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllcyBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtTdHJpbmddIC0+IHtrOiB2fSAtPiB7azogdn1cbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gdGhlIHZhbHVlIHRvIG9taXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjbG9uZVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aG91dCB0aGUgcHJvcGVydHkgYXQgcGF0aFxuICogQHNlZSBSLmFzc29jUGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGlzc29jUGF0aChbJ2EnLCAnYicsICdjJ10sIHthOiB7Yjoge2M6IDQyfX19KTsgLy89PiB7YToge2I6IHt9fX1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGRpc3NvY1BhdGgocGF0aCwgb2JqKSB7XG4gIHN3aXRjaCAocGF0aC5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gb2JqO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBkaXNzb2MocGF0aFswXSwgb2JqKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIGhlYWQgPSBwYXRoWzBdO1xuICAgICAgdmFyIHRhaWwgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXRoLCAxKTtcbiAgICAgIHJldHVybiBvYmpbaGVhZF0gPT0gbnVsbCA/IG9iaiA6IGFzc29jKGhlYWQsIGRpc3NvY1BhdGgodGFpbCwgb2JqW2hlYWRdKSwgb2JqKTtcbiAgfVxufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogRGl2aWRlcyB0d28gbnVtYmVycy4gRXF1aXZhbGVudCB0byBgYSAvIGJgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCB2YWx1ZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgdmFsdWUuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGEgLyBiYC5cbiAqIEBzZWUgUi5tdWx0aXBseVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGl2aWRlKDcxLCAxMDApOyAvLz0+IDAuNzFcbiAqXG4gKiAgICAgIHZhciBoYWxmID0gUi5kaXZpZGUoUi5fXywgMik7XG4gKiAgICAgIGhhbGYoNDIpOyAvLz0+IDIxXG4gKlxuICogICAgICB2YXIgcmVjaXByb2NhbCA9IFIuZGl2aWRlKDEpO1xuICogICAgICByZWNpcHJvY2FsKDQpOyAgIC8vPT4gMC4yNVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gZGl2aWRlKGEsIGIpIHsgcmV0dXJuIGEgLyBiOyB9KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF94ZHJvcCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3hkcm9wJyk7XG52YXIgc2xpY2UgPSByZXF1aXJlKCcuL3NsaWNlJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBidXQgdGhlIGZpcnN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCwgc3RyaW5nLCBvclxuICogdHJhbnNkdWNlci90cmFuc2Zvcm1lciAob3Igb2JqZWN0IHdpdGggYSBgZHJvcGAgbWV0aG9kKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZHJvcGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEBwYXJhbSB7W2FdfSBsaXN0XG4gKiBAcmV0dXJuIHtbYV19IEEgY29weSBvZiBsaXN0IHdpdGhvdXQgdGhlIGZpcnN0IGBuYCBlbGVtZW50c1xuICogQHNlZSBSLnRha2UsIFIudHJhbnNkdWNlLCBSLmRyb3BMYXN0LCBSLmRyb3BXaGlsZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZHJvcCgxLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnYmFyJywgJ2JheiddXG4gKiAgICAgIFIuZHJvcCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnYmF6J11cbiAqICAgICAgUi5kcm9wKDMsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gW11cbiAqICAgICAgUi5kcm9wKDQsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gW11cbiAqICAgICAgUi5kcm9wKDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ2RhJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZShbJ2Ryb3AnXSwgX3hkcm9wLCBmdW5jdGlvbiBkcm9wKG4sIHhzKSB7XG4gIHJldHVybiBzbGljZShNYXRoLm1heCgwLCBuKSwgSW5maW5pdHksIHhzKTtcbn0pKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF9kcm9wTGFzdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Ryb3BMYXN0Jyk7XG52YXIgX3hkcm9wTGFzdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3hkcm9wTGFzdCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyBhbGwgYnV0IHRoZSBsYXN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gYGxpc3RgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIG9mIGBsaXN0YCB0byBza2lwLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCBvZiBlbGVtZW50cyB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIGNvcHkgb2YgdGhlIGxpc3Qgd2l0aCBvbmx5IHRoZSBmaXJzdCBgbGlzdC5sZW5ndGggLSBuYCBlbGVtZW50c1xuICogQHNlZSBSLnRha2VMYXN0LCBSLmRyb3AsIFIuZHJvcFdoaWxlLCBSLmRyb3BMYXN0V2hpbGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmRyb3BMYXN0KDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJ11cbiAqICAgICAgUi5kcm9wTGFzdCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJ11cbiAqICAgICAgUi5kcm9wTGFzdCgzLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gKiAgICAgIFIuZHJvcExhc3QoNCwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICogICAgICBSLmRyb3BMYXN0KDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ3JhJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZShbXSwgX3hkcm9wTGFzdCwgX2Ryb3BMYXN0KSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfZHJvcExhc3RXaGlsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Ryb3BMYXN0V2hpbGUnKTtcbnZhciBfeGRyb3BMYXN0V2hpbGUgPSByZXF1aXJlKCcuL2ludGVybmFsL194ZHJvcExhc3RXaGlsZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGV4Y2x1ZGluZyBhbGwgdGhlIHRhaWxpbmcgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0IHdoaWNoXG4gKiBzYXRpc2Z5IHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgZnVuY3Rpb24uIEl0IHBhc3NlcyBlYWNoIHZhbHVlIGZyb20gdGhlIHJpZ2h0XG4gKiB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBza2lwcGluZyBlbGVtZW50cyB1bnRpbCB0aGUgcHJlZGljYXRlXG4gKiBmdW5jdGlvbiByZXR1cm5zIGEgYGZhbHN5YCB2YWx1ZS4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIG9uZSBhcmd1bWVudDpcbiAqICoodmFsdWUpKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBlYWNoIGVsZW1lbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IHdpdGhvdXQgYW55IHRyYWlsaW5nIGVsZW1lbnRzIHRoYXQgcmV0dXJuIGBmYWxzeWAgdmFsdWVzIGZyb20gdGhlIGBwcmVkaWNhdGVgLlxuICogQHNlZSBSLnRha2VMYXN0V2hpbGUsIFIuYWRkSW5kZXgsIFIuZHJvcCwgUi5kcm9wV2hpbGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbHRlVGhyZWUgPSB4ID0+IHggPD0gMztcbiAqXG4gKiAgICAgIFIuZHJvcExhc3RXaGlsZShsdGVUaHJlZSwgWzEsIDIsIDMsIDQsIDMsIDIsIDFdKTsgLy89PiBbMSwgMiwgMywgNF1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoW10sIF94ZHJvcExhc3RXaGlsZSwgX2Ryb3BMYXN0V2hpbGUpKTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF94ZHJvcFJlcGVhdHNXaXRoID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feGRyb3BSZXBlYXRzV2l0aCcpO1xudmFyIGRyb3BSZXBlYXRzV2l0aCA9IHJlcXVpcmUoJy4vZHJvcFJlcGVhdHNXaXRoJyk7XG52YXIgZXF1YWxzID0gcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCB3aXRob3V0IGFueSBjb25zZWN1dGl2ZWx5IHJlcGVhdGluZyBlbGVtZW50cy4gYFIuZXF1YWxzYFxuICogaXMgdXNlZCB0byBkZXRlcm1pbmUgZXF1YWxpdHkuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9IGBsaXN0YCB3aXRob3V0IHJlcGVhdGluZyBlbGVtZW50cy5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgIFIuZHJvcFJlcGVhdHMoWzEsIDEsIDEsIDIsIDMsIDQsIDQsIDIsIDJdKTsgLy89PiBbMSwgMiwgMywgNCwgMl1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKF9kaXNwYXRjaGFibGUoW10sIF94ZHJvcFJlcGVhdHNXaXRoKGVxdWFscyksIGRyb3BSZXBlYXRzV2l0aChlcXVhbHMpKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfeGRyb3BSZXBlYXRzV2l0aCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3hkcm9wUmVwZWF0c1dpdGgnKTtcbnZhciBsYXN0ID0gcmVxdWlyZSgnLi9sYXN0Jyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aG91dCBhbnkgY29uc2VjdXRpdmVseSByZXBlYXRpbmcgZWxlbWVudHMuIEVxdWFsaXR5IGlzXG4gKiBkZXRlcm1pbmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gZWFjaCBwYWlyIG9mIGNvbnNlY3V0aXZlIGVsZW1lbnRzLiBUaGVcbiAqIGZpcnN0IGVsZW1lbnQgaW4gYSBzZXJpZXMgb2YgZXF1YWwgZWxlbWVudHMgd2lsbCBiZSBwcmVzZXJ2ZWQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhLCBhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9IGBsaXN0YCB3aXRob3V0IHJlcGVhdGluZyBlbGVtZW50cy5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbCA9IFsxLCAtMSwgMSwgMywgNCwgLTQsIC00LCAtNSwgNSwgMywgM107XG4gKiAgICAgIFIuZHJvcFJlcGVhdHNXaXRoKFIuZXFCeShNYXRoLmFicyksIGwpOyAvLz0+IFsxLCAzLCA0LCAtNSwgM11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoW10sIF94ZHJvcFJlcGVhdHNXaXRoLCBmdW5jdGlvbiBkcm9wUmVwZWF0c1dpdGgocHJlZCwgbGlzdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpZHggPSAxO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIGlmIChsZW4gIT09IDApIHtcbiAgICByZXN1bHRbMF0gPSBsaXN0WzBdO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGlmICghcHJlZChsYXN0KHJlc3VsdCksIGxpc3RbaWR4XSkpIHtcbiAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gbGlzdFtpZHhdO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KSk7XG5cbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF94ZHJvcFdoaWxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feGRyb3BXaGlsZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGV4Y2x1ZGluZyB0aGUgbGVhZGluZyBlbGVtZW50cyBvZiBhIGdpdmVuIGxpc3Qgd2hpY2hcbiAqIHNhdGlzZnkgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSBmdW5jdGlvbi4gSXQgcGFzc2VzIGVhY2ggdmFsdWUgdG8gdGhlIHN1cHBsaWVkXG4gKiBwcmVkaWNhdGUgZnVuY3Rpb24sIHNraXBwaW5nIGVsZW1lbnRzIHdoaWxlIHRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gcmV0dXJuc1xuICogYHRydWVgLiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gb25lIGFyZ3VtZW50OiAqKHZhbHVlKSouXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGRyb3BXaGlsZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gKiBAc2VlIFIudGFrZVdoaWxlLCBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsdGVUd28gPSB4ID0+IHggPD0gMjtcbiAqXG4gKiAgICAgIFIuZHJvcFdoaWxlKGx0ZVR3bywgWzEsIDIsIDMsIDQsIDMsIDIsIDFdKTsgLy89PiBbMywgNCwgMywgMiwgMV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoWydkcm9wV2hpbGUnXSwgX3hkcm9wV2hpbGUsIGZ1bmN0aW9uIGRyb3BXaGlsZShwcmVkLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4gJiYgcHJlZChsaXN0W2lkeF0pKSB7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIGlkeCk7XG59KSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9pc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNGdW5jdGlvbicpO1xudmFyIGxpZnQgPSByZXF1aXJlKCcuL2xpZnQnKTtcbnZhciBvciA9IHJlcXVpcmUoJy4vb3InKTtcblxuXG4vKipcbiAqIEEgZnVuY3Rpb24gd3JhcHBpbmcgY2FsbHMgdG8gdGhlIHR3byBmdW5jdGlvbnMgaW4gYW4gYHx8YCBvcGVyYXRpb24sXG4gKiByZXR1cm5pbmcgdGhlIHJlc3VsdCBvZiB0aGUgZmlyc3QgZnVuY3Rpb24gaWYgaXQgaXMgdHJ1dGgteSBhbmQgdGhlIHJlc3VsdFxuICogb2YgdGhlIHNlY29uZCBmdW5jdGlvbiBvdGhlcndpc2UuIE5vdGUgdGhhdCB0aGlzIGlzIHNob3J0LWNpcmN1aXRlZCxcbiAqIG1lYW5pbmcgdGhhdCB0aGUgc2Vjb25kIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGludm9rZWQgaWYgdGhlIGZpcnN0IHJldHVybnMgYVxuICogdHJ1dGgteSB2YWx1ZS5cbiAqXG4gKiBJbiBhZGRpdGlvbiB0byBmdW5jdGlvbnMsIGBSLmVpdGhlcmAgYWxzbyBhY2NlcHRzIGFueSBmYW50YXN5LWxhbmQgY29tcGF0aWJsZVxuICogYXBwbGljYXRpdmUgZnVuY3Rvci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGYgYSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGcgYW5vdGhlciBwcmVkaWNhdGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBpdHMgYXJndW1lbnRzIHRvIGBmYCBhbmQgYGdgIGFuZCBgfHxgcyB0aGVpciBvdXRwdXRzIHRvZ2V0aGVyLlxuICogQHNlZSBSLm9yXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGd0MTAgPSB4ID0+IHggPiAxMDtcbiAqICAgICAgdmFyIGV2ZW4gPSB4ID0+IHggJSAyID09PSAwO1xuICogICAgICB2YXIgZiA9IFIuZWl0aGVyKGd0MTAsIGV2ZW4pO1xuICogICAgICBmKDEwMSk7IC8vPT4gdHJ1ZVxuICogICAgICBmKDgpOyAvLz0+IHRydWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGVpdGhlcihmLCBnKSB7XG4gIHJldHVybiBfaXNGdW5jdGlvbihmKSA/XG4gICAgZnVuY3Rpb24gX2VpdGhlcigpIHtcbiAgICAgIHJldHVybiBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gOlxuICAgIGxpZnQob3IpKGYsIGcpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9pc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJndW1lbnRzJyk7XG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG52YXIgX2lzT2JqZWN0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNPYmplY3QnKTtcbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc1N0cmluZycpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZW1wdHkgdmFsdWUgb2YgaXRzIGFyZ3VtZW50J3MgdHlwZS4gUmFtZGEgZGVmaW5lcyB0aGUgZW1wdHlcbiAqIHZhbHVlIG9mIEFycmF5IChgW11gKSwgT2JqZWN0IChge31gKSwgU3RyaW5nIChgJydgKSwgYW5kIEFyZ3VtZW50cy4gT3RoZXJcbiAqIHR5cGVzIGFyZSBzdXBwb3J0ZWQgaWYgdGhleSBkZWZpbmUgYDxUeXBlPi5lbXB0eWAgYW5kL29yXG4gKiBgPFR5cGU+LnByb3RvdHlwZS5lbXB0eWAuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGVtcHR5YCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIGEgLT4gYVxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHsqfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZW1wdHkoSnVzdCg0MikpOyAgICAgIC8vPT4gTm90aGluZygpXG4gKiAgICAgIFIuZW1wdHkoWzEsIDIsIDNdKTsgICAgIC8vPT4gW11cbiAqICAgICAgUi5lbXB0eSgndW5pY29ybnMnKTsgICAgLy89PiAnJ1xuICogICAgICBSLmVtcHR5KHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBlbXB0eSh4KSB7XG4gIHJldHVybiAoXG4gICAgKHggIT0gbnVsbCAmJiB0eXBlb2YgeC5lbXB0eSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgeC5lbXB0eSgpIDpcbiAgICAoeCAhPSBudWxsICYmIHguY29uc3RydWN0b3IgIT0gbnVsbCAmJiB0eXBlb2YgeC5jb25zdHJ1Y3Rvci5lbXB0eSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgeC5jb25zdHJ1Y3Rvci5lbXB0eSgpIDpcbiAgICBfaXNBcnJheSh4KSA/XG4gICAgICBbXSA6XG4gICAgX2lzU3RyaW5nKHgpID9cbiAgICAgICcnIDpcbiAgICBfaXNPYmplY3QoeCkgP1xuICAgICAge30gOlxuICAgIF9pc0FyZ3VtZW50cyh4KSA/XG4gICAgICAoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgOlxuICAgIC8vIGVsc2VcbiAgICAgIHZvaWQgMFxuICApO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIGVxdWFscyA9IHJlcXVpcmUoJy4vZXF1YWxzJyk7XG5cblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGFuZCB0d28gdmFsdWVzIGluIGl0cyBkb21haW4gYW5kIHJldHVybnMgYHRydWVgIGlmIHRoZVxuICogdmFsdWVzIG1hcCB0byB0aGUgc2FtZSB2YWx1ZSBpbiB0aGUgY29kb21haW47IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcGFyYW0geyp9IHlcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lcUJ5KE1hdGguYWJzLCA1LCAtNSk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gZXFCeShmLCB4LCB5KSB7XG4gIHJldHVybiBlcXVhbHMoZih4KSwgZih5KSk7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgZXF1YWxzID0gcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxuXG4vKipcbiAqIFJlcG9ydHMgd2hldGhlciB0d28gb2JqZWN0cyBoYXZlIHRoZSBzYW1lIHZhbHVlLCBpbiBgUi5lcXVhbHNgIHRlcm1zLCBmb3JcbiAqIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkuIFVzZWZ1bCBhcyBhIGN1cnJpZWQgcHJlZGljYXRlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBrIC0+IHtrOiB2fSAtPiB7azogdn0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG8xID0geyBhOiAxLCBiOiAyLCBjOiAzLCBkOiA0IH07XG4gKiAgICAgIHZhciBvMiA9IHsgYTogMTAsIGI6IDIwLCBjOiAzLCBkOiA0MCB9O1xuICogICAgICBSLmVxUHJvcHMoJ2EnLCBvMSwgbzIpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZXFQcm9wcygnYycsIG8xLCBvMik7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gZXFQcm9wcyhwcm9wLCBvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBlcXVhbHMob2JqMVtwcm9wXSwgb2JqMltwcm9wXSk7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2VxdWFscyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2VxdWFscycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgaXRzIGFyZ3VtZW50cyBhcmUgZXF1aXZhbGVudCwgYGZhbHNlYCBvdGhlcndpc2UuIEhhbmRsZXNcbiAqIGN5Y2xpY2FsIGRhdGEgc3RydWN0dXJlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHN5bW1ldHJpY2FsbHkgdG8gdGhlIGBlcXVhbHNgIG1ldGhvZHMgb2YgYm90aCBhcmd1bWVudHMsIGlmXG4gKiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBhIC0+IGIgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lcXVhbHMoMSwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmVxdWFscygxLCAnMScpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZXF1YWxzKFsxLCAyLCAzXSwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gKlxuICogICAgICB2YXIgYSA9IHt9OyBhLnYgPSBhO1xuICogICAgICB2YXIgYiA9IHt9OyBiLnYgPSBiO1xuICogICAgICBSLmVxdWFscyhhLCBiKTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICByZXR1cm4gX2VxdWFscyhhLCBiLCBbXSwgW10pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgYnkgcmVjdXJzaXZlbHkgZXZvbHZpbmcgYSBzaGFsbG93IGNvcHkgb2YgYG9iamVjdGAsXG4gKiBhY2NvcmRpbmcgdG8gdGhlIGB0cmFuc2Zvcm1hdGlvbmAgZnVuY3Rpb25zLiBBbGwgbm9uLXByaW1pdGl2ZSBwcm9wZXJ0aWVzXG4gKiBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBBIGB0cmFuc2Zvcm1hdGlvbmAgZnVuY3Rpb24gd2lsbCBub3QgYmUgaW52b2tlZCBpZiBpdHMgY29ycmVzcG9uZGluZyBrZXlcbiAqIGRvZXMgbm90IGV4aXN0IGluIHRoZSBldm9sdmVkIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6ICh2IC0+IHYpfSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge09iamVjdH0gdHJhbnNmb3JtYXRpb25zIFRoZSBvYmplY3Qgc3BlY2lmeWluZyB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnMgdG8gYXBwbHlcbiAqICAgICAgICB0byB0aGUgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIHRyYW5zZm9ybWVkLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgdHJhbnNmb3JtZWQgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB0b21hdG8gID0ge2ZpcnN0TmFtZTogJyAgVG9tYXRvICcsIGRhdGE6IHtlbGFwc2VkOiAxMDAsIHJlbWFpbmluZzogMTQwMH0sIGlkOjEyM307XG4gKiAgICAgIHZhciB0cmFuc2Zvcm1hdGlvbnMgPSB7XG4gKiAgICAgICAgZmlyc3ROYW1lOiBSLnRyaW0sXG4gKiAgICAgICAgbGFzdE5hbWU6IFIudHJpbSwgLy8gV2lsbCBub3QgZ2V0IGludm9rZWQuXG4gKiAgICAgICAgZGF0YToge2VsYXBzZWQ6IFIuYWRkKDEpLCByZW1haW5pbmc6IFIuYWRkKC0xKX1cbiAqICAgICAgfTtcbiAqICAgICAgUi5ldm9sdmUodHJhbnNmb3JtYXRpb25zLCB0b21hdG8pOyAvLz0+IHtmaXJzdE5hbWU6ICdUb21hdG8nLCBkYXRhOiB7ZWxhcHNlZDogMTAxLCByZW1haW5pbmc6IDEzOTl9LCBpZDoxMjN9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBldm9sdmUodHJhbnNmb3JtYXRpb25zLCBvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgdHJhbnNmb3JtYXRpb24sIGtleSwgdHlwZTtcbiAgZm9yIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgdHJhbnNmb3JtYXRpb24gPSB0cmFuc2Zvcm1hdGlvbnNba2V5XTtcbiAgICB0eXBlID0gdHlwZW9mIHRyYW5zZm9ybWF0aW9uO1xuICAgIHJlc3VsdFtrZXldID0gdHlwZSA9PT0gJ2Z1bmN0aW9uJyAgICAgICAgICAgICAgICAgPyB0cmFuc2Zvcm1hdGlvbihvYmplY3Rba2V5XSlcbiAgICAgICAgICAgICAgICA6IHRyYW5zZm9ybWF0aW9uICYmIHR5cGUgPT09ICdvYmplY3QnID8gZXZvbHZlKHRyYW5zZm9ybWF0aW9uLCBvYmplY3Rba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb2JqZWN0W2tleV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX2ZpbHRlciA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2ZpbHRlcicpO1xudmFyIF9pc09iamVjdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzT2JqZWN0Jyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIF94ZmlsdGVyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feGZpbHRlcicpO1xudmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuXG4vKipcbiAqIFRha2VzIGEgcHJlZGljYXRlIGFuZCBhIFwiZmlsdGVyYWJsZVwiLCBhbmQgcmV0dXJucyBhIG5ldyBmaWx0ZXJhYmxlIG9mIHRoZVxuICogc2FtZSB0eXBlIGNvbnRhaW5pbmcgdGhlIG1lbWJlcnMgb2YgdGhlIGdpdmVuIGZpbHRlcmFibGUgd2hpY2ggc2F0aXNmeSB0aGVcbiAqIGdpdmVuIHByZWRpY2F0ZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmlsdGVyYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IGYgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gZmlsdGVyYWJsZVxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAc2VlIFIucmVqZWN0LCBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpc0V2ZW4gPSBuID0+IG4gJSAyID09PSAwO1xuICpcbiAqICAgICAgUi5maWx0ZXIoaXNFdmVuLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsyLCA0XVxuICpcbiAqICAgICAgUi5maWx0ZXIoaXNFdmVuLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBkOiA0fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZShbJ2ZpbHRlciddLCBfeGZpbHRlciwgZnVuY3Rpb24ocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gKFxuICAgIF9pc09iamVjdChmaWx0ZXJhYmxlKSA/XG4gICAgICBfcmVkdWNlKGZ1bmN0aW9uKGFjYywga2V5KSB7XG4gICAgICAgIGlmIChwcmVkKGZpbHRlcmFibGVba2V5XSkpIHtcbiAgICAgICAgICBhY2Nba2V5XSA9IGZpbHRlcmFibGVba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30sIGtleXMoZmlsdGVyYWJsZSkpIDpcbiAgICAvLyBlbHNlXG4gICAgICBfZmlsdGVyKHByZWQsIGZpbHRlcmFibGUpXG4gICk7XG59KSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfeGZpbmQgPSByZXF1aXJlKCcuL2ludGVybmFsL194ZmluZCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZSBwcmVkaWNhdGUsIG9yXG4gKiBgdW5kZWZpbmVkYCBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGZpbmRgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBhIHwgdW5kZWZpbmVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICogICAgICAgIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGZvdW5kLCBvciBgdW5kZWZpbmVkYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfV07XG4gKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDIpKSh4cyk7IC8vPT4ge2E6IDJ9XG4gKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDQpKSh4cyk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKFsnZmluZCddLCBfeGZpbmQsIGZ1bmN0aW9uIGZpbmQoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gbGlzdFtpZHhdO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxufSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX3hmaW5kSW5kZXggPSByZXF1aXJlKCcuL2ludGVybmFsL194ZmluZEluZGV4Jyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZVxuICogcHJlZGljYXRlLCBvciBgLTFgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4xXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICogZGVzaXJlZCBvbmUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZvdW5kLCBvciBgLTFgLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4cyA9IFt7YTogMX0sIHthOiAyfSwge2E6IDN9XTtcbiAqICAgICAgUi5maW5kSW5kZXgoUi5wcm9wRXEoJ2EnLCAyKSkoeHMpOyAvLz0+IDFcbiAqICAgICAgUi5maW5kSW5kZXgoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IC0xXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKFtdLCBfeGZpbmRJbmRleCwgZnVuY3Rpb24gZmluZEluZGV4KGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX3hmaW5kTGFzdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3hmaW5kTGFzdCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBsaXN0IHdoaWNoIG1hdGNoZXMgdGhlIHByZWRpY2F0ZSwgb3JcbiAqIGB1bmRlZmluZWRgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4xXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gYSB8IHVuZGVmaW5lZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAqIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGZvdW5kLCBvciBgdW5kZWZpbmVkYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDEsIGI6IDB9LCB7YToxLCBiOiAxfV07XG4gKiAgICAgIFIuZmluZExhc3QoUi5wcm9wRXEoJ2EnLCAxKSkoeHMpOyAvLz0+IHthOiAxLCBiOiAxfVxuICogICAgICBSLmZpbmRMYXN0KFIucHJvcEVxKCdhJywgNCkpKHhzKTsgLy89PiB1bmRlZmluZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoW10sIF94ZmluZExhc3QsIGZ1bmN0aW9uIGZpbmRMYXN0KGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gbGlzdFtpZHhdO1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxufSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX3hmaW5kTGFzdEluZGV4ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feGZpbmRMYXN0SW5kZXgnKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgd2hpY2ggbWF0Y2hlcyB0aGVcbiAqIHByZWRpY2F0ZSwgb3IgYC0xYCBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMVxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAqIGRlc2lyZWQgb25lLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmb3VuZCwgb3IgYC0xYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeHMgPSBbe2E6IDEsIGI6IDB9LCB7YToxLCBiOiAxfV07XG4gKiAgICAgIFIuZmluZExhc3RJbmRleChSLnByb3BFcSgnYScsIDEpKSh4cyk7IC8vPT4gMVxuICogICAgICBSLmZpbmRMYXN0SW5kZXgoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IC0xXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKFtdLCBfeGZpbmRMYXN0SW5kZXgsIGZ1bmN0aW9uIGZpbmRMYXN0SW5kZXgoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIGlkeCAtPSAxO1xuICB9XG4gIHJldHVybiAtMTtcbn0pKTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX21ha2VGbGF0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFrZUZsYXQnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBieSBwdWxsaW5nIGV2ZXJ5IGl0ZW0gb3V0IG9mIGl0IChhbmQgYWxsIGl0cyBzdWItYXJyYXlzKVxuICogYW5kIHB1dHRpbmcgdGhlbSBpbiBhIG5ldyBhcnJheSwgZGVwdGgtZmlyc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2JdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmxhdHRlbmVkIGxpc3QuXG4gKiBAc2VlIFIudW5uZXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5mbGF0dGVuKFsxLCAyLCBbMywgNF0sIDUsIFs2LCBbNywgOCwgWzksIFsxMCwgMTFdLCAxMl1dXV0pO1xuICogICAgICAvLz0+IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoX21ha2VGbGF0KHRydWUpKTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgY3VycnkgPSByZXF1aXJlKCcuL2N1cnJ5Jyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIG11Y2ggbGlrZSB0aGUgc3VwcGxpZWQgb25lLCBleGNlcHQgdGhhdCB0aGUgZmlyc3QgdHdvXG4gKiBhcmd1bWVudHMnIG9yZGVyIGlzIHJldmVyc2VkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIChhIC0+IGIgLT4gYyAtPiAuLi4gLT4geikgLT4gKGIgLT4gYSAtPiBjIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZSB3aXRoIGl0cyBmaXJzdCB0d28gcGFyYW1ldGVycyByZXZlcnNlZC5cbiAqIEByZXR1cm4geyp9IFRoZSByZXN1bHQgb2YgaW52b2tpbmcgYGZuYCB3aXRoIGl0cyBmaXJzdCB0d28gcGFyYW1ldGVycycgb3JkZXIgcmV2ZXJzZWQuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1lcmdlVGhyZWUgPSAoYSwgYiwgYykgPT4gW10uY29uY2F0KGEsIGIsIGMpO1xuICpcbiAqICAgICAgbWVyZ2VUaHJlZSgxLCAyLCAzKTsgLy89PiBbMSwgMiwgM11cbiAqXG4gKiAgICAgIFIuZmxpcChtZXJnZVRocmVlKSgxLCAyLCAzKTsgLy89PiBbMiwgMSwgM11cbiAqIEBzeW1iIFIuZmxpcChmKShhLCBiLCBjKSA9IGYoYiwgYSwgYylcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGZsaXAoZm4pIHtcbiAgcmV0dXJuIGN1cnJ5KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgYXJnc1swXSA9IGI7XG4gICAgYXJnc1sxXSA9IGE7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9KTtcbn0pO1xuIiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIGlucHV0IGBsaXN0YCwgY2FsbGluZyBhIHByb3ZpZGVkIGZ1bmN0aW9uIGBmbmAgZm9yIGVhY2hcbiAqIGVsZW1lbnQgaW4gdGhlIGxpc3QuXG4gKlxuICogYGZuYCByZWNlaXZlcyBvbmUgYXJndW1lbnQ6ICoodmFsdWUpKi5cbiAqXG4gKiBOb3RlOiBgUi5mb3JFYWNoYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2VcbiAqIGFycmF5cyksIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kLiBGb3IgbW9yZVxuICogZGV0YWlscyBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mb3JFYWNoI0Rlc2NyaXB0aW9uXG4gKlxuICogQWxzbyBub3RlIHRoYXQsIHVubGlrZSBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgLCBSYW1kYSdzIGBmb3JFYWNoYCByZXR1cm5zXG4gKiB0aGUgb3JpZ2luYWwgYXJyYXkuIEluIHNvbWUgbGlicmFyaWVzIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYGVhY2hgLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBmb3JFYWNoYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+ICopIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuIFJlY2VpdmVzIG9uZSBhcmd1bWVudCwgYHZhbHVlYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBvcmlnaW5hbCBsaXN0LlxuICogQHNlZSBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHByaW50WFBsdXNGaXZlID0geCA9PiBjb25zb2xlLmxvZyh4ICsgNSk7XG4gKiAgICAgIFIuZm9yRWFjaChwcmludFhQbHVzRml2ZSwgWzEsIDIsIDNdKTsgLy89PiBbMSwgMiwgM11cbiAqICAgICAgLy8gbG9ncyA2XG4gKiAgICAgIC8vIGxvZ3MgN1xuICogICAgICAvLyBsb2dzIDhcbiAqIEBzeW1iIFIuZm9yRWFjaChmLCBbYSwgYiwgY10pID0gW2EsIGIsIGNdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfY2hlY2tGb3JNZXRob2QoJ2ZvckVhY2gnLCBmdW5jdGlvbiBmb3JFYWNoKGZuLCBsaXN0KSB7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBmbihsaXN0W2lkeF0pO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBsaXN0O1xufSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gaW5wdXQgYG9iamVjdGAsIGNhbGxpbmcgYSBwcm92aWRlZCBmdW5jdGlvbiBgZm5gIGZvciBlYWNoXG4gKiBrZXkgYW5kIHZhbHVlIGluIHRoZSBvYmplY3QuXG4gKlxuICogYGZuYCByZWNlaXZlcyB0aHJlZSBhcmd1bWVudDogKih2YWx1ZSwga2V5LCBvYmopKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoYSwgU3RyaW5nLCBTdHJNYXAgYSkgLT4gQW55KSAtPiBTdHJNYXAgYSAtPiBTdHJNYXAgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZS4gUmVjZWl2ZXMgdGhyZWUgYXJndW1lbnQsIGB2YWx1ZWAsIGBrZXlgLCBgb2JqYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBvcmlnaW5hbCBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHByaW50S2V5Q29uY2F0VmFsdWUgPSAodmFsdWUsIGtleSkgPT4gY29uc29sZS5sb2coa2V5ICsgJzonICsgdmFsdWUpO1xuICogICAgICBSLmZvckVhY2hPYmpJbmRleGVkKHByaW50S2V5Q29uY2F0VmFsdWUsIHt4OiAxLCB5OiAyfSk7IC8vPT4ge3g6IDEsIHk6IDJ9XG4gKiAgICAgIC8vIGxvZ3MgeDoxXG4gKiAgICAgIC8vIGxvZ3MgeToyXG4gKiBAc3ltYiBSLmZvckVhY2hPYmpJbmRleGVkKGYsIHt4OiBhLCB5OiBifSkgPSB7eDogYSwgeTogYn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGZvckVhY2hPYmpJbmRleGVkKGZuLCBvYmopIHtcbiAgdmFyIGtleUxpc3QgPSBrZXlzKG9iaik7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwga2V5TGlzdC5sZW5ndGgpIHtcbiAgICB2YXIga2V5ID0ga2V5TGlzdFtpZHhdO1xuICAgIGZuKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IGZyb20gYSBsaXN0IGtleS12YWx1ZSBwYWlycy4gSWYgYSBrZXkgYXBwZWFycyBpblxuICogbXVsdGlwbGUgcGFpcnMsIHRoZSByaWdodG1vc3QgcGFpciBpcyBpbmNsdWRlZCBpbiB0aGUgb2JqZWN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW1trLHZdXSAtPiB7azogdn1cbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzIEFuIGFycmF5IG9mIHR3by1lbGVtZW50IGFycmF5cyB0aGF0IHdpbGwgYmUgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiB0aGUgb3V0cHV0IG9iamVjdC5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG9iamVjdCBtYWRlIGJ5IHBhaXJpbmcgdXAgYGtleXNgIGFuZCBgdmFsdWVzYC5cbiAqIEBzZWUgUi50b1BhaXJzLCBSLnBhaXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmZyb21QYWlycyhbWydhJywgMV0sIFsnYicsIDJdLCBbJ2MnLCAzXV0pOyAvLz0+IHthOiAxLCBiOiAyLCBjOiAzfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gZnJvbVBhaXJzKHBhaXJzKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBwYWlycy5sZW5ndGgpIHtcbiAgICByZXN1bHRbcGFpcnNbaWR4XVswXV0gPSBwYWlyc1tpZHhdWzFdO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY2hlY2tGb3JNZXRob2QgPSByZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciByZWR1Y2VCeSA9IHJlcXVpcmUoJy4vcmVkdWNlQnknKTtcblxuLyoqXG4gKiBTcGxpdHMgYSBsaXN0IGludG8gc3ViLWxpc3RzIHN0b3JlZCBpbiBhbiBvYmplY3QsIGJhc2VkIG9uIHRoZSByZXN1bHQgb2ZcbiAqIGNhbGxpbmcgYSBTdHJpbmctcmV0dXJuaW5nIGZ1bmN0aW9uIG9uIGVhY2ggZWxlbWVudCwgYW5kIGdyb3VwaW5nIHRoZVxuICogcmVzdWx0cyBhY2NvcmRpbmcgdG8gdmFsdWVzIHJldHVybmVkLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBncm91cEJ5YCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBTdHJpbmcpIC0+IFthXSAtPiB7U3RyaW5nOiBbYV19XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiA6OiBhIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gZ3JvdXBcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggdGhlIG91dHB1dCBvZiBgZm5gIGZvciBrZXlzLCBtYXBwZWQgdG8gYXJyYXlzIG9mIGVsZW1lbnRzXG4gKiAgICAgICAgIHRoYXQgcHJvZHVjZWQgdGhhdCBrZXkgd2hlbiBwYXNzZWQgdG8gYGZuYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYnlHcmFkZSA9IFIuZ3JvdXBCeShmdW5jdGlvbihzdHVkZW50KSB7XG4gKiAgICAgICAgdmFyIHNjb3JlID0gc3R1ZGVudC5zY29yZTtcbiAqICAgICAgICByZXR1cm4gc2NvcmUgPCA2NSA/ICdGJyA6XG4gKiAgICAgICAgICAgICAgIHNjb3JlIDwgNzAgPyAnRCcgOlxuICogICAgICAgICAgICAgICBzY29yZSA8IDgwID8gJ0MnIDpcbiAqICAgICAgICAgICAgICAgc2NvcmUgPCA5MCA/ICdCJyA6ICdBJztcbiAqICAgICAgfSk7XG4gKiAgICAgIHZhciBzdHVkZW50cyA9IFt7bmFtZTogJ0FiYnknLCBzY29yZTogODR9LFxuICogICAgICAgICAgICAgICAgICAgICAge25hbWU6ICdFZGR5Jywgc2NvcmU6IDU4fSxcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICAgICAgICAgICAge25hbWU6ICdKYWNrJywgc2NvcmU6IDY5fV07XG4gKiAgICAgIGJ5R3JhZGUoc3R1ZGVudHMpO1xuICogICAgICAvLyB7XG4gKiAgICAgIC8vICAgJ0EnOiBbe25hbWU6ICdEaWFubmUnLCBzY29yZTogOTl9XSxcbiAqICAgICAgLy8gICAnQic6IFt7bmFtZTogJ0FiYnknLCBzY29yZTogODR9XVxuICogICAgICAvLyAgIC8vIC4uLixcbiAqICAgICAgLy8gICAnRic6IFt7bmFtZTogJ0VkZHknLCBzY29yZTogNTh9XVxuICogICAgICAvLyB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfY2hlY2tGb3JNZXRob2QoJ2dyb3VwQnknLCByZWR1Y2VCeShmdW5jdGlvbihhY2MsIGl0ZW0pIHtcbiAgaWYgKGFjYyA9PSBudWxsKSB7XG4gICAgYWNjID0gW107XG4gIH1cbiAgYWNjLnB1c2goaXRlbSk7XG4gIHJldHVybiBhY2M7XG59LCBudWxsKSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBUYWtlcyBhIGxpc3QgYW5kIHJldHVybnMgYSBsaXN0IG9mIGxpc3RzIHdoZXJlIGVhY2ggc3VibGlzdCdzIGVsZW1lbnRzIGFyZVxuICogYWxsIFwiZXF1YWxcIiBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIGVxdWFsaXR5IGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIxLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYSkg4oaSIEJvb2xlYW4pIOKGkiBbYV0g4oaSIFtbYV1dXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiBmb3IgZGV0ZXJtaW5pbmcgd2hldGhlciB0d28gZ2l2ZW4gKGFkamFjZW50KVxuICogICAgICAgIGVsZW1lbnRzIHNob3VsZCBiZSBpbiB0aGUgc2FtZSBncm91cFxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gZ3JvdXAuIEFsc28gYWNjZXB0cyBhIHN0cmluZywgd2hpY2ggd2lsbCBiZVxuICogICAgICAgIHRyZWF0ZWQgYXMgYSBsaXN0IG9mIGNoYXJhY3RlcnMuXG4gKiBAcmV0dXJuIHtMaXN0fSBBIGxpc3QgdGhhdCBjb250YWlucyBzdWJsaXN0cyBvZiBlcXVhbCBlbGVtZW50cyxcbiAqICAgICAgICAgd2hvc2UgY29uY2F0ZW5hdGlvbnMgYXJlIGVxdWFsIHRvIHRoZSBvcmlnaW5hbCBsaXN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBSLmdyb3VwV2l0aChSLmVxdWFscywgWzAsIDEsIDEsIDIsIDMsIDUsIDgsIDEzLCAyMV0pXG4gKiAvLz0+IFtbMF0sIFsxLCAxXSwgWzJdLCBbM10sIFs1XSwgWzhdLCBbMTNdLCBbMjFdXVxuICpcbiAqIFIuZ3JvdXBXaXRoKChhLCBiKSA9PiBhICUgMiA9PT0gYiAlIDIsIFswLCAxLCAxLCAyLCAzLCA1LCA4LCAxMywgMjFdKVxuICogLy89PiBbWzBdLCBbMSwgMV0sIFsyXSwgWzMsIDVdLCBbOF0sIFsxMywgMjFdXVxuICpcbiAqIFIuZ3JvdXBXaXRoKFIuZXFCeShpc1Zvd2VsKSwgJ2Flc3Rpb3UnKVxuICogLy89PiBbJ2FlJywgJ3N0JywgJ2lvdSddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbihmbiwgbGlzdCkge1xuICB2YXIgcmVzID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB2YXIgbmV4dGlkeCA9IGlkeCArIDE7XG4gICAgd2hpbGUgKG5leHRpZHggPCBsZW4gJiYgZm4obGlzdFtpZHhdLCBsaXN0W25leHRpZHhdKSkge1xuICAgICAgbmV4dGlkeCArPSAxO1xuICAgIH1cbiAgICByZXMucHVzaChsaXN0LnNsaWNlKGlkeCwgbmV4dGlkeCkpO1xuICAgIGlkeCA9IG5leHRpZHg7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZDsgYGZhbHNlYFxuICogb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5sdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZ3QoMiwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmd0KDIsIDIpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZ3QoMiwgMyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5ndCgnYScsICd6Jyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5ndCgneicsICdhJyk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gZ3QoYSwgYikgeyByZXR1cm4gYSA+IGI7IH0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNlY29uZDtcbiAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIubHRlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5ndGUoMiwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmd0ZSgyLCAyKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuZ3RlKDIsIDMpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZ3RlKCdhJywgJ3onKTsgLy89PiBmYWxzZVxuICogICAgICBSLmd0ZSgneicsICdhJyk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gZ3RlKGEsIGIpIHsgcmV0dXJuIGEgPj0gYjsgfSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9oYXMgPSByZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWVcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgcyAtPiB7czogeH0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGNoZWNrIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0cy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaGFzTmFtZSA9IFIuaGFzKCduYW1lJyk7XG4gKiAgICAgIGhhc05hbWUoe25hbWU6ICdhbGljZSd9KTsgICAvLz0+IHRydWVcbiAqICAgICAgaGFzTmFtZSh7bmFtZTogJ2JvYid9KTsgICAgIC8vPT4gdHJ1ZVxuICogICAgICBoYXNOYW1lKHt9KTsgICAgICAgICAgICAgICAgLy89PiBmYWxzZVxuICpcbiAqICAgICAgdmFyIHBvaW50ID0ge3g6IDAsIHk6IDB9O1xuICogICAgICB2YXIgcG9pbnRIYXMgPSBSLmhhcyhSLl9fLCBwb2ludCk7XG4gKiAgICAgIHBvaW50SGFzKCd4Jyk7ICAvLz0+IHRydWVcbiAqICAgICAgcG9pbnRIYXMoJ3knKTsgIC8vPT4gdHJ1ZVxuICogICAgICBwb2ludEhhcygneicpOyAgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoX2hhcyk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbiBoYXMgYSBwcm9wZXJ0eSB3aXRoXG4gKiB0aGUgc3BlY2lmaWVkIG5hbWVcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgcyAtPiB7czogeH0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGNoZWNrIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0cy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBmdW5jdGlvbiBSZWN0YW5nbGUod2lkdGgsIGhlaWdodCkge1xuICogICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAqICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAqICAgICAgfVxuICogICAgICBSZWN0YW5nbGUucHJvdG90eXBlLmFyZWEgPSBmdW5jdGlvbigpIHtcbiAqICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xuICogICAgICB9O1xuICpcbiAqICAgICAgdmFyIHNxdWFyZSA9IG5ldyBSZWN0YW5nbGUoMiwgMik7XG4gKiAgICAgIFIuaGFzSW4oJ3dpZHRoJywgc3F1YXJlKTsgIC8vPT4gdHJ1ZVxuICogICAgICBSLmhhc0luKCdhcmVhJywgc3F1YXJlKTsgIC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gaGFzSW4ocHJvcCwgb2JqKSB7XG4gIHJldHVybiBwcm9wIGluIG9iajtcbn0pO1xuIiwidmFyIG50aCA9IHJlcXVpcmUoJy4vbnRoJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZy4gSW4gc29tZSBsaWJyYXJpZXNcbiAqIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYGZpcnN0YC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBhIHwgVW5kZWZpbmVkXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLnRhaWwsIFIuaW5pdCwgUi5sYXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5oZWFkKFsnZmknLCAnZm8nLCAnZnVtJ10pOyAvLz0+ICdmaSdcbiAqICAgICAgUi5oZWFkKFtdKTsgLy89PiB1bmRlZmluZWRcbiAqXG4gKiAgICAgIFIuaGVhZCgnYWJjJyk7IC8vPT4gJ2EnXG4gKiAgICAgIFIuaGVhZCgnJyk7IC8vPT4gJydcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBudGgoMCk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGl0cyBhcmd1bWVudHMgYXJlIGlkZW50aWNhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBWYWx1ZXMgYXJlXG4gKiBpZGVudGljYWwgaWYgdGhleSByZWZlcmVuY2UgdGhlIHNhbWUgbWVtb3J5LiBgTmFOYCBpcyBpZGVudGljYWwgdG8gYE5hTmA7XG4gKiBgMGAgYW5kIGAtMGAgYXJlIG5vdCBpZGVudGljYWwuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTUuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbyA9IHt9O1xuICogICAgICBSLmlkZW50aWNhbChvLCBvKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaWRlbnRpY2FsKDEsIDEpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pZGVudGljYWwoMSwgJzEnKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlkZW50aWNhbChbXSwgW10pOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaWRlbnRpY2FsKDAsIC0wKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlkZW50aWNhbChOYU4sIE5hTik7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gaWRlbnRpY2FsKGEsIGIpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoYSA9PT0gYikgeyAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG4gIH1cbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfaWRlbnRpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19pZGVudGl0eScpO1xuXG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGRvZXMgbm90aGluZyBidXQgcmV0dXJuIHRoZSBwYXJhbWV0ZXIgc3VwcGxpZWQgdG8gaXQuIEdvb2RcbiAqIGFzIGEgZGVmYXVsdCBvciBwbGFjZWhvbGRlciBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+IGFcbiAqIEBwYXJhbSB7Kn0geCBUaGUgdmFsdWUgdG8gcmV0dXJuLlxuICogQHJldHVybiB7Kn0gVGhlIGlucHV0IHZhbHVlLCBgeGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pZGVudGl0eSgxKTsgLy89PiAxXG4gKlxuICogICAgICB2YXIgb2JqID0ge307XG4gKiAgICAgIFIuaWRlbnRpdHkob2JqKSA9PT0gb2JqOyAvLz0+IHRydWVcbiAqIEBzeW1iIFIuaWRlbnRpdHkoYSkgPSBhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShfaWRlbnRpdHkpO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGVpdGhlciB0aGUgYG9uVHJ1ZWAgb3IgdGhlIGBvbkZhbHNlYFxuICogZnVuY3Rpb24gZGVwZW5kaW5nIHVwb24gdGhlIHJlc3VsdCBvZiB0aGUgYGNvbmRpdGlvbmAgcHJlZGljYXRlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnICgqLi4uIC0+IEJvb2xlYW4pIC0+ICgqLi4uIC0+ICopIC0+ICgqLi4uIC0+ICopIC0+ICgqLi4uIC0+ICopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25kaXRpb24gQSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uVHJ1ZSBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgY29uZGl0aW9uYCBldmFsdWF0ZXMgdG8gYSB0cnV0aHkgdmFsdWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZhbHNlIEEgZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIGBjb25kaXRpb25gIGV2YWx1YXRlcyB0byBhIGZhbHN5IHZhbHVlLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IHVuYXJ5IGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGVpdGhlciB0aGUgYG9uVHJ1ZWAgb3IgdGhlIGBvbkZhbHNlYFxuICogICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlcGVuZGluZyB1cG9uIHRoZSByZXN1bHQgb2YgdGhlIGBjb25kaXRpb25gIHByZWRpY2F0ZS5cbiAqIEBzZWUgUi51bmxlc3MsIFIud2hlblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpbmNDb3VudCA9IFIuaWZFbHNlKFxuICogICAgICAgIFIuaGFzKCdjb3VudCcpLFxuICogICAgICAgIFIub3ZlcihSLmxlbnNQcm9wKCdjb3VudCcpLCBSLmluYyksXG4gKiAgICAgICAgUi5hc3NvYygnY291bnQnLCAxKVxuICogICAgICApO1xuICogICAgICBpbmNDb3VudCh7fSk7ICAgICAgICAgICAvLz0+IHsgY291bnQ6IDEgfVxuICogICAgICBpbmNDb3VudCh7IGNvdW50OiAxIH0pOyAvLz0+IHsgY291bnQ6IDIgfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gaWZFbHNlKGNvbmRpdGlvbiwgb25UcnVlLCBvbkZhbHNlKSB7XG4gIHJldHVybiBjdXJyeU4oTWF0aC5tYXgoY29uZGl0aW9uLmxlbmd0aCwgb25UcnVlLmxlbmd0aCwgb25GYWxzZS5sZW5ndGgpLFxuICAgIGZ1bmN0aW9uIF9pZkVsc2UoKSB7XG4gICAgICByZXR1cm4gY29uZGl0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPyBvblRydWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IG9uRmFsc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICk7XG59KTtcbiIsInZhciBhZGQgPSByZXF1aXJlKCcuL2FkZCcpO1xuXG5cbi8qKlxuICogSW5jcmVtZW50cyBpdHMgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7TnVtYmVyfSBuICsgMVxuICogQHNlZSBSLmRlY1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW5jKDQyKTsgLy89PiA0M1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFkZCgxKTtcbiIsInZhciByZWR1Y2VCeSA9IHJlcXVpcmUoJy4vcmVkdWNlQnknKTtcblxuXG4vKipcbiAqIEdpdmVuIGEgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBrZXksIHR1cm5zIGEgbGlzdCBvZiBvYmplY3RzIGludG8gYW5cbiAqIG9iamVjdCBpbmRleGluZyB0aGUgb2JqZWN0cyBieSB0aGUgZ2l2ZW4ga2V5LiBOb3RlIHRoYXQgaWYgbXVsdGlwbGVcbiAqIG9iamVjdHMgZ2VuZXJhdGUgdGhlIHNhbWUgdmFsdWUgZm9yIHRoZSBpbmRleGluZyBrZXkgb25seSB0aGUgbGFzdCB2YWx1ZVxuICogd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgZ2VuZXJhdGVkIG9iamVjdC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gU3RyaW5nKSAtPiBbe2s6IHZ9XSAtPiB7azoge2s6IHZ9fVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gOjogYSAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBvZiBvYmplY3RzIHRvIGluZGV4XG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBpbmRleGluZyBlYWNoIGFycmF5IGVsZW1lbnQgYnkgdGhlIGdpdmVuIHByb3BlcnR5LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsaXN0ID0gW3tpZDogJ3h5eicsIHRpdGxlOiAnQSd9LCB7aWQ6ICdhYmMnLCB0aXRsZTogJ0InfV07XG4gKiAgICAgIFIuaW5kZXhCeShSLnByb3AoJ2lkJyksIGxpc3QpO1xuICogICAgICAvLz0+IHthYmM6IHtpZDogJ2FiYycsIHRpdGxlOiAnQid9LCB4eXo6IHtpZDogJ3h5eicsIHRpdGxlOiAnQSd9fVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZUJ5KGZ1bmN0aW9uKGFjYywgZWxlbSkgeyByZXR1cm4gZWxlbTsgfSwgbnVsbCk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9pbmRleE9mID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faW5kZXhPZicpO1xudmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcnJheScpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW4gaXRlbSBpbiBhbiBhcnJheSwgb3IgLTFcbiAqIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuIGBSLmVxdWFsc2AgaXMgdXNlZCB0byBkZXRlcm1pbmVcbiAqIGVxdWFsaXR5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBbYV0gLT4gTnVtYmVyXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgaXRlbSB0byBmaW5kLlxuICogQHBhcmFtIHtBcnJheX0geHMgVGhlIGFycmF5IHRvIHNlYXJjaCBpbi5cbiAqIEByZXR1cm4ge051bWJlcn0gdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQsIG9yIC0xIGlmIHRoZSB0YXJnZXQgaXMgbm90IGZvdW5kLlxuICogQHNlZSBSLmxhc3RJbmRleE9mXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pbmRleE9mKDMsIFsxLDIsMyw0XSk7IC8vPT4gMlxuICogICAgICBSLmluZGV4T2YoMTAsIFsxLDIsMyw0XSk7IC8vPT4gLTFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGluZGV4T2YodGFyZ2V0LCB4cykge1xuICByZXR1cm4gdHlwZW9mIHhzLmluZGV4T2YgPT09ICdmdW5jdGlvbicgJiYgIV9pc0FycmF5KHhzKSA/XG4gICAgeHMuaW5kZXhPZih0YXJnZXQpIDpcbiAgICBfaW5kZXhPZih4cywgdGFyZ2V0LCAwKTtcbn0pO1xuIiwidmFyIHNsaWNlID0gcmVxdWlyZSgnLi9zbGljZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhbGwgYnV0IHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIubGFzdCwgUi5oZWFkLCBSLnRhaWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmluaXQoWzEsIDIsIDNdKTsgIC8vPT4gWzEsIDJdXG4gKiAgICAgIFIuaW5pdChbMSwgMl0pOyAgICAgLy89PiBbMV1cbiAqICAgICAgUi5pbml0KFsxXSk7ICAgICAgICAvLz0+IFtdXG4gKiAgICAgIFIuaW5pdChbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi5pbml0KCdhYmMnKTsgIC8vPT4gJ2FiJ1xuICogICAgICBSLmluaXQoJ2FiJyk7ICAgLy89PiAnYSdcbiAqICAgICAgUi5pbml0KCdhJyk7ICAgIC8vPT4gJydcbiAqICAgICAgUi5pbml0KCcnKTsgICAgIC8vPT4gJydcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBzbGljZSgwLCAtMSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogSW5zZXJ0cyB0aGUgc3VwcGxpZWQgZWxlbWVudCBpbnRvIHRoZSBsaXN0LCBhdCBpbmRleCBgaW5kZXhgLiBfTm90ZSB0aGF0XG4gKiB0aGlzIGlzIG5vdCBkZXN0cnVjdGl2ZV86IGl0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBsaXN0IHdpdGggdGhlIGNoYW5nZXMuXG4gKiA8c21hbGw+Tm8gbGlzdHMgaGF2ZSBiZWVuIGhhcm1lZCBpbiB0aGUgYXBwbGljYXRpb24gb2YgdGhpcyBmdW5jdGlvbi48L3NtYWxsPlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMlxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiB0byBpbnNlcnQgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7Kn0gZWx0IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbnRvIHRoZSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpbnNlcnQgaW50b1xuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IEFycmF5IHdpdGggYGVsdGAgaW5zZXJ0ZWQgYXQgYGluZGV4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmluc2VydCgyLCAneCcsIFsxLDIsMyw0XSk7IC8vPT4gWzEsMiwneCcsMyw0XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gaW5zZXJ0KGlkeCwgZWx0LCBsaXN0KSB7XG4gIGlkeCA9IGlkeCA8IGxpc3QubGVuZ3RoICYmIGlkeCA+PSAwID8gaWR4IDogbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKTtcbiAgcmVzdWx0LnNwbGljZShpZHgsIDAsIGVsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBJbnNlcnRzIHRoZSBzdWItbGlzdCBpbnRvIHRoZSBsaXN0LCBhdCBpbmRleCBgaW5kZXhgLiBfTm90ZSB0aGF0IHRoaXMgaXMgbm90XG4gKiBkZXN0cnVjdGl2ZV86IGl0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBsaXN0IHdpdGggdGhlIGNoYW5nZXMuXG4gKiA8c21hbGw+Tm8gbGlzdHMgaGF2ZSBiZWVuIGhhcm1lZCBpbiB0aGUgYXBwbGljYXRpb24gb2YgdGhpcyBmdW5jdGlvbi48L3NtYWxsPlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIHBvc2l0aW9uIHRvIGluc2VydCB0aGUgc3ViLWxpc3RcbiAqIEBwYXJhbSB7QXJyYXl9IGVsdHMgVGhlIHN1Yi1saXN0IHRvIGluc2VydCBpbnRvIHRoZSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpbnNlcnQgdGhlIHN1Yi1saXN0IGludG9cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBBcnJheSB3aXRoIGBlbHRzYCBpbnNlcnRlZCBzdGFydGluZyBhdCBgaW5kZXhgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW5zZXJ0QWxsKDIsIFsneCcsJ3knLCd6J10sIFsxLDIsMyw0XSk7IC8vPT4gWzEsMiwneCcsJ3knLCd6JywzLDRdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBpbnNlcnRBbGwoaWR4LCBlbHRzLCBsaXN0KSB7XG4gIGlkeCA9IGlkeCA8IGxpc3QubGVuZ3RoICYmIGlkeCA+PSAwID8gaWR4IDogbGlzdC5sZW5ndGg7XG4gIHJldHVybiBbXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCwgaWR4KSxcbiAgICAgICAgICAgICAgICAgICBlbHRzLFxuICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIGlkeCkpO1xufSk7XG4iLCJ2YXIgX2NvbnRhaW5zID0gcmVxdWlyZSgnLi9fY29udGFpbnMnKTtcblxuXG4vLyBBIHNpbXBsZSBTZXQgdHlwZSB0aGF0IGhvbm91cnMgUi5lcXVhbHMgc2VtYW50aWNzXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gX1NldCgpIHtcbiAgICAvKiBnbG9iYWxzIFNldCAqL1xuICAgIHRoaXMuX25hdGl2ZVNldCA9IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgPyBuZXcgU2V0KCkgOiBudWxsO1xuICAgIHRoaXMuX2l0ZW1zID0ge307XG4gIH1cblxuICAvLyB1bnRpbCB3ZSBmaWd1cmUgb3V0IHdoeSBqc2RvYyBjaG9rZXMgb24gdGhpc1xuICAvLyBAcGFyYW0gaXRlbSBUaGUgaXRlbSB0byBhZGQgdG8gdGhlIFNldFxuICAvLyBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgaXRlbSBkaWQgbm90IGV4aXN0IHByaW9yLCBvdGhlcndpc2UgZmFsc2VcbiAgLy9cbiAgX1NldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiAhaGFzT3JBZGQoaXRlbSwgdHJ1ZSwgdGhpcyk7XG4gIH07XG5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gVGhlIGl0ZW0gdG8gY2hlY2sgZm9yIGV4aXN0ZW5jZSBpbiB0aGUgU2V0XG4gIC8vIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBpdGVtIGV4aXN0cyBpbiB0aGUgU2V0LCBvdGhlcndpc2UgZmFsc2VcbiAgLy9cbiAgX1NldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiBoYXNPckFkZChpdGVtLCBmYWxzZSwgdGhpcyk7XG4gIH07XG5cbiAgLy9cbiAgLy8gQ29tYmluZXMgdGhlIGxvZ2ljIGZvciBjaGVja2luZyB3aGV0aGVyIGFuIGl0ZW0gaXMgYSBtZW1iZXIgb2YgdGhlIHNldCBhbmRcbiAgLy8gZm9yIGFkZGluZyBhIG5ldyBpdGVtIHRvIHRoZSBzZXQuXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtICAgICAgIFRoZSBpdGVtIHRvIGNoZWNrIG9yIGFkZCB0byB0aGUgU2V0IGluc3RhbmNlLlxuICAvLyBAcGFyYW0gc2hvdWxkQWRkICBJZiB0cnVlLCB0aGUgaXRlbSB3aWxsIGJlIGFkZGVkIHRvIHRoZSBzZXQgaWYgaXQgZG9lc24ndFxuICAvLyAgICAgICAgICAgICAgICAgICBhbHJlYWR5IGV4aXN0LlxuICAvLyBAcGFyYW0gc2V0ICAgICAgICBUaGUgc2V0IGluc3RhbmNlIHRvIGNoZWNrIG9yIGFkZCB0by5cbiAgLy8gQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgaXRlbSBhbHJlYWR5IGV4aXN0ZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgLy9cbiAgZnVuY3Rpb24gaGFzT3JBZGQoaXRlbSwgc2hvdWxkQWRkLCBzZXQpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBpdGVtO1xuICAgIHZhciBwcmV2U2l6ZSwgbmV3U2l6ZTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAvLyBkaXN0aW5ndWlzaCBiZXR3ZWVuICswIGFuZCAtMFxuICAgICAgICBpZiAoaXRlbSA9PT0gMCAmJiAxIC8gaXRlbSA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgaWYgKHNldC5faXRlbXNbJy0wJ10pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICAgIHNldC5faXRlbXNbJy0wJ10gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGVzZSB0eXBlcyBjYW4gYWxsIHV0aWxpc2UgdGhlIG5hdGl2ZSBTZXRcbiAgICAgICAgaWYgKHNldC5fbmF0aXZlU2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgcHJldlNpemUgPSBzZXQuX25hdGl2ZVNldC5zaXplO1xuICAgICAgICAgICAgc2V0Ll9uYXRpdmVTZXQuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgbmV3U2l6ZSA9IHNldC5fbmF0aXZlU2V0LnNpemU7XG4gICAgICAgICAgICByZXR1cm4gbmV3U2l6ZSA9PT0gcHJldlNpemU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzZXQuX25hdGl2ZVNldC5oYXMoaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghKHR5cGUgaW4gc2V0Ll9pdGVtcykpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXSA9IHt9O1xuICAgICAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdW2l0ZW1dID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gaW4gc2V0Ll9pdGVtc1t0eXBlXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXVtpdGVtXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAvLyBzZXQuX2l0ZW1zWydib29sZWFuJ10gaG9sZHMgYSB0d28gZWxlbWVudCBhcnJheVxuICAgICAgICAvLyByZXByZXNlbnRpbmcgWyBmYWxzZUV4aXN0cywgdHJ1ZUV4aXN0cyBdXG4gICAgICAgIGlmICh0eXBlIGluIHNldC5faXRlbXMpIHtcbiAgICAgICAgICB2YXIgYklkeCA9IGl0ZW0gPyAxIDogMDtcbiAgICAgICAgICBpZiAoc2V0Ll9pdGVtc1t0eXBlXVtiSWR4XSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXVtiSWR4XSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0gPSBpdGVtID8gW2ZhbHNlLCB0cnVlXSA6IFt0cnVlLCBmYWxzZV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIC8vIGNvbXBhcmUgZnVuY3Rpb25zIGZvciByZWZlcmVuY2UgZXF1YWxpdHlcbiAgICAgICAgaWYgKHNldC5fbmF0aXZlU2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgcHJldlNpemUgPSBzZXQuX25hdGl2ZVNldC5zaXplO1xuICAgICAgICAgICAgc2V0Ll9uYXRpdmVTZXQuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgbmV3U2l6ZSA9IHNldC5fbmF0aXZlU2V0LnNpemU7XG4gICAgICAgICAgICByZXR1cm4gbmV3U2l6ZSA9PT0gcHJldlNpemU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzZXQuX25hdGl2ZVNldC5oYXMoaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghKHR5cGUgaW4gc2V0Ll9pdGVtcykpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXSA9IFtpdGVtXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFfY29udGFpbnMoaXRlbSwgc2V0Ll9pdGVtc1t0eXBlXSkpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICBpZiAoc2V0Ll9pdGVtc1t0eXBlXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgICBpZiAoIXNldC5faXRlbXNbJ251bGwnXSkge1xuICAgICAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgICBzZXQuX2l0ZW1zWydudWxsJ10gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gcmVkdWNlIHRoZSBzZWFyY2ggc2l6ZSBvZiBoZXRlcm9nZW5lb3VzIHNldHMgYnkgY3JlYXRpbmcgYnVja2V0c1xuICAgICAgICAvLyBmb3IgZWFjaCB0eXBlLlxuICAgICAgICB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pO1xuICAgICAgICBpZiAoISh0eXBlIGluIHNldC5faXRlbXMpKSB7XG4gICAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXSA9IFtpdGVtXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNjYW4gdGhyb3VnaCBhbGwgcHJldmlvdXNseSBhcHBsaWVkIGl0ZW1zXG4gICAgICAgIGlmICghX2NvbnRhaW5zKGl0ZW0sIHNldC5faXRlbXNbdHlwZV0pKSB7XG4gICAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXS5wdXNoKGl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBfU2V0O1xufSgpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2FwZXJ0dXJlKG4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsaW1pdCA9IGxpc3QubGVuZ3RoIC0gKG4gLSAxKTtcbiAgdmFyIGFjYyA9IG5ldyBBcnJheShsaW1pdCA+PSAwID8gbGltaXQgOiAwKTtcbiAgd2hpbGUgKGlkeCA8IGxpbWl0KSB7XG4gICAgYWNjW2lkeF0gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBpZHgsIGlkeCArIG4pO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBhY2M7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEwKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzKSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDY6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgNzogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgODogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDk6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7IHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgIGNhc2UgMTA6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIF9hcml0eSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgbm8gZ3JlYXRlciB0aGFuIHRlbicpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfYXJyYXlGcm9tSXRlcmF0b3IoaXRlcikge1xuICB2YXIgbGlzdCA9IFtdO1xuICB2YXIgbmV4dDtcbiAgd2hpbGUgKCEobmV4dCA9IGl0ZXIubmV4dCgpKS5kb25lKSB7XG4gICAgbGlzdC5wdXNoKG5leHQudmFsdWUpO1xuICB9XG4gIHJldHVybiBsaXN0O1xufTtcbiIsInZhciBfb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnLi9fb2JqZWN0QXNzaWduJyk7XG5cbm1vZHVsZS5leHBvcnRzID1cbiAgdHlwZW9mIE9iamVjdC5hc3NpZ24gPT09ICdmdW5jdGlvbicgPyBPYmplY3QuYXNzaWduIDogX29iamVjdEFzc2lnbjtcbiIsInZhciBfaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzQXJyYXknKTtcblxuXG4vKipcbiAqIFRoaXMgY2hlY2tzIHdoZXRoZXIgYSBmdW5jdGlvbiBoYXMgYSBbbWV0aG9kbmFtZV0gZnVuY3Rpb24uIElmIGl0IGlzbid0IGFuXG4gKiBhcnJheSBpdCB3aWxsIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiBvdGhlcndpc2UgaXQgd2lsbCBkZWZhdWx0IHRvIHRoZSByYW1kYVxuICogaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHJhbWRhIGltcGxlbXRhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZG5hbWUgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtPYmplY3R9IFdoYXRldmVyIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIG1ldGhvZCBpcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY2hlY2tGb3JNZXRob2QobWV0aG9kbmFtZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2xlbmd0aCAtIDFdO1xuICAgIHJldHVybiAoX2lzQXJyYXkob2JqKSB8fCB0eXBlb2Ygb2JqW21ldGhvZG5hbWVdICE9PSAnZnVuY3Rpb24nKSA/XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDpcbiAgICAgIG9ialttZXRob2RuYW1lXS5hcHBseShvYmosIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgbGVuZ3RoIC0gMSkpO1xuICB9O1xufTtcbiIsInZhciBfY2xvbmVSZWdFeHAgPSByZXF1aXJlKCcuL19jbG9uZVJlZ0V4cCcpO1xudmFyIHR5cGUgPSByZXF1aXJlKCcuLi90eXBlJyk7XG5cblxuLyoqXG4gKiBDb3BpZXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBjb3BpZWRcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZkZyb20gQXJyYXkgY29udGFpbmluZyB0aGUgc291cmNlIHJlZmVyZW5jZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHJlZlRvIEFycmF5IGNvbnRhaW5pbmcgdGhlIGNvcGllZCBzb3VyY2UgcmVmZXJlbmNlc1xuICogQHBhcmFtIHtCb29sZWFufSBkZWVwIFdoZXRoZXIgb3Igbm90IHRvIHBlcmZvcm0gZGVlcCBjbG9uaW5nLlxuICogQHJldHVybiB7Kn0gVGhlIGNvcGllZCB2YWx1ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY2xvbmUodmFsdWUsIHJlZkZyb20sIHJlZlRvLCBkZWVwKSB7XG4gIHZhciBjb3B5ID0gZnVuY3Rpb24gY29weShjb3BpZWRWYWx1ZSkge1xuICAgIHZhciBsZW4gPSByZWZGcm9tLmxlbmd0aDtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHJlZkZyb21baWR4XSkge1xuICAgICAgICByZXR1cm4gcmVmVG9baWR4XTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZWZGcm9tW2lkeCArIDFdID0gdmFsdWU7XG4gICAgcmVmVG9baWR4ICsgMV0gPSBjb3BpZWRWYWx1ZTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgIGNvcGllZFZhbHVlW2tleV0gPSBkZWVwID9cbiAgICAgICAgX2Nsb25lKHZhbHVlW2tleV0sIHJlZkZyb20sIHJlZlRvLCB0cnVlKSA6IHZhbHVlW2tleV07XG4gICAgfVxuICAgIHJldHVybiBjb3BpZWRWYWx1ZTtcbiAgfTtcbiAgc3dpdGNoICh0eXBlKHZhbHVlKSkge1xuICAgIGNhc2UgJ09iamVjdCc6ICByZXR1cm4gY29weSh7fSk7XG4gICAgY2FzZSAnQXJyYXknOiAgIHJldHVybiBjb3B5KFtdKTtcbiAgICBjYXNlICdEYXRlJzogICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlLnZhbHVlT2YoKSk7XG4gICAgY2FzZSAnUmVnRXhwJzogIHJldHVybiBfY2xvbmVSZWdFeHAodmFsdWUpO1xuICAgIGRlZmF1bHQ6ICAgICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jbG9uZVJlZ0V4cChwYXR0ZXJuKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4uc291cmNlLCAocGF0dGVybi5nbG9iYWwgICAgID8gJ2cnIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwYXR0ZXJuLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHBhdHRlcm4ubXVsdGlsaW5lICA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocGF0dGVybi5zdGlja3kgICAgID8gJ3knIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwYXR0ZXJuLnVuaWNvZGUgICAgPyAndScgOiAnJykpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2NvbXBsZW1lbnQoZikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICFmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiLyoqXG4gKiBQcml2YXRlIGBjb25jYXRgIGZ1bmN0aW9uIHRvIG1lcmdlIHR3byBhcnJheS1saWtlIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBbc2V0MT1bXV0gQW4gYXJyYXktbGlrZSBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gW3NldDI9W11dIEFuIGFycmF5LWxpa2Ugb2JqZWN0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3LCBtZXJnZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2NvbmNhdChbNCwgNSwgNl0sIFsxLCAyLCAzXSk7IC8vPT4gWzQsIDUsIDYsIDEsIDIsIDNdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2NvbmNhdChzZXQxLCBzZXQyKSB7XG4gIHNldDEgPSBzZXQxIHx8IFtdO1xuICBzZXQyID0gc2V0MiB8fCBbXTtcbiAgdmFyIGlkeDtcbiAgdmFyIGxlbjEgPSBzZXQxLmxlbmd0aDtcbiAgdmFyIGxlbjIgPSBzZXQyLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsZW4xKSB7XG4gICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gc2V0MVtpZHhdO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsZW4yKSB7XG4gICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gc2V0MltpZHhdO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIF9pbmRleE9mID0gcmVxdWlyZSgnLi9faW5kZXhPZicpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2NvbnRhaW5zKGEsIGxpc3QpIHtcbiAgcmV0dXJuIF9pbmRleE9mKGxpc3QsIGEsIDApID49IDA7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY29udGFpbnNXaXRoKHByZWQsIHgsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgaWYgKHByZWQoeCwgbGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9fYXJpdHknKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IoY29uY2F0KSB7XG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uKGZuLCBhcmdzKSB7XG4gICAgcmV0dXJuIF9hcml0eShNYXRoLm1heCgwLCBmbi5sZW5ndGggLSBhcmdzLmxlbmd0aCksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGNvbmNhdChhcmdzLCBhcmd1bWVudHMpKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIiwidmFyIF9pc1BsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIG9uZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5MShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjEoYSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IF9pc1BsYWNlaG9sZGVyKGEpKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vX2N1cnJ5MScpO1xudmFyIF9pc1BsYWNlaG9sZGVyID0gcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHR3by1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5Mihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjIoYSwgYikge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gZjI7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSA/IGYyXG4gICAgICAgICAgICAgOiBfY3VycnkxKGZ1bmN0aW9uKF9iKSB7IHJldHVybiBmbihhLCBfYik7IH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjJcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbihfYSkgeyByZXR1cm4gZm4oX2EsIGIpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uKF9iKSB7IHJldHVybiBmbihhLCBfYik7IH0pXG4gICAgICAgICAgICAgOiBmbihhLCBiKTtcbiAgICB9XG4gIH07XG59O1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL19jdXJyeTEnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG52YXIgX2lzUGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdGhyZWUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jdXJyeTMoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYzKGEsIGIsIGMpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYzO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmM1xuICAgICAgICAgICAgIDogX2N1cnJ5MihmdW5jdGlvbihfYiwgX2MpIHsgcmV0dXJuIGZuKGEsIF9iLCBfYyk7IH0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBmM1xuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkyKGZ1bmN0aW9uKF9hLCBfYykgeyByZXR1cm4gZm4oX2EsIGIsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MihmdW5jdGlvbihfYiwgX2MpIHsgcmV0dXJuIGZuKGEsIF9iLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBfY3VycnkxKGZ1bmN0aW9uKF9jKSB7IHJldHVybiBmbihhLCBiLCBfYyk7IH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gZjNcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MihmdW5jdGlvbihfYSwgX2IpIHsgcmV0dXJuIGZuKF9hLCBfYiwgYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2EsIF9jKSB7IHJldHVybiBmbihfYSwgYiwgX2MpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYikgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkyKGZ1bmN0aW9uKF9iLCBfYykgeyByZXR1cm4gZm4oYSwgX2IsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbihfYSkgeyByZXR1cm4gZm4oX2EsIGIsIGMpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uKF9iKSB7IHJldHVybiBmbihhLCBfYiwgYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2MpIHsgcmV0dXJuIGZuKGEsIGIsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IGZuKGEsIGIsIGMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9fYXJpdHknKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIEludGVybmFsIGN1cnJ5TiBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBvZiB0aGUgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHJlY2VpdmVkIEFuIGFycmF5IG9mIGFyZ3VtZW50cyByZWNlaXZlZCB0aHVzIGZhci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgdmFyIGxlZnQgPSBsZW5ndGg7XG4gICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpZiAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggJiZcbiAgICAgICAgICAoIV9pc1BsYWNlaG9sZGVyKHJlY2VpdmVkW2NvbWJpbmVkSWR4XSkgfHxcbiAgICAgICAgICAgYXJnc0lkeCA+PSBhcmd1bWVudHMubGVuZ3RoKSkge1xuICAgICAgICByZXN1bHQgPSByZWNlaXZlZFtjb21iaW5lZElkeF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbYXJnc0lkeF07XG4gICAgICAgIGFyZ3NJZHggKz0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkW2NvbWJpbmVkSWR4XSA9IHJlc3VsdDtcbiAgICAgIGlmICghX2lzUGxhY2Vob2xkZXIocmVzdWx0KSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpXG4gICAgICAgICAgICAgICAgICAgICA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gIH07XG59O1xuIiwidmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi9faXNBcnJheScpO1xudmFyIF9pc1RyYW5zZm9ybWVyID0gcmVxdWlyZSgnLi9faXNUcmFuc2Zvcm1lcicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZGlzcGF0Y2hlcyB3aXRoIGRpZmZlcmVudCBzdHJhdGVnaWVzIGJhc2VkIG9uIHRoZVxuICogb2JqZWN0IGluIGxpc3QgcG9zaXRpb24gKGxhc3QgYXJndW1lbnQpLiBJZiBpdCBpcyBhbiBhcnJheSwgZXhlY3V0ZXMgW2ZuXS5cbiAqIE90aGVyd2lzZSwgaWYgaXQgaGFzIGEgZnVuY3Rpb24gd2l0aCBvbmUgb2YgdGhlIGdpdmVuIG1ldGhvZCBuYW1lcywgaXQgd2lsbFxuICogZXhlY3V0ZSB0aGF0IGZ1bmN0aW9uIChmdW5jdG9yIGNhc2UpLiBPdGhlcndpc2UsIGlmIGl0IGlzIGEgdHJhbnNmb3JtZXIsXG4gKiB1c2VzIHRyYW5zZHVjZXIgW3hmXSB0byByZXR1cm4gYSBuZXcgdHJhbnNmb3JtZXIgKHRyYW5zZHVjZXIgY2FzZSkuXG4gKiBPdGhlcndpc2UsIGl0IHdpbGwgZGVmYXVsdCB0byBleGVjdXRpbmcgW2ZuXS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gbWV0aG9kTmFtZXMgcHJvcGVydGllcyB0byBjaGVjayBmb3IgYSBjdXN0b20gaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHhmIHRyYW5zZHVjZXIgdG8gaW5pdGlhbGl6ZSBpZiBvYmplY3QgaXMgdHJhbnNmb3JtZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIGRlZmF1bHQgcmFtZGEgaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZGlzcGF0Y2hlcyBvbiBvYmplY3QgaW4gbGlzdCBwb3NpdGlvblxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9kaXNwYXRjaGFibGUobWV0aG9kTmFtZXMsIHhmLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgdmFyIG9iaiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKCFfaXNBcnJheShvYmopKSB7XG4gICAgICB2YXIgaWR4ID0gMDtcbiAgICAgIHdoaWxlIChpZHggPCBtZXRob2ROYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbbWV0aG9kTmFtZXNbaWR4XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW21ldGhvZE5hbWVzW2lkeF1dLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoX2lzVHJhbnNmb3JtZXIob2JqKSkge1xuICAgICAgICB2YXIgdHJhbnNkdWNlciA9IHhmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdHJhbnNkdWNlcihvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgdGFrZSA9IHJlcXVpcmUoJy4uL3Rha2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkcm9wTGFzdChuLCB4cykge1xuICByZXR1cm4gdGFrZShuIDwgeHMubGVuZ3RoID8geHMubGVuZ3RoIC0gbiA6IDAsIHhzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRyb3BMYXN0V2hpbGUocHJlZCwgbGlzdCkge1xuICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDAgJiYgcHJlZChsaXN0W2lkeF0pKSB7XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIDAsIGlkeCArIDEpO1xufTtcbiIsInZhciBfYXJyYXlGcm9tSXRlcmF0b3IgPSByZXF1aXJlKCcuL19hcnJheUZyb21JdGVyYXRvcicpO1xudmFyIF9mdW5jdGlvbk5hbWUgPSByZXF1aXJlKCcuL19mdW5jdGlvbk5hbWUnKTtcbnZhciBfaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgaWRlbnRpY2FsID0gcmVxdWlyZSgnLi4vaWRlbnRpY2FsJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4uL2tleXMnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi4vdHlwZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2VxdWFscyhhLCBiLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoaWRlbnRpY2FsKGEsIGIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZShhKSAhPT0gdHlwZShiKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgYi5lcXVhbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZW9mIGEuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmIGEuZXF1YWxzKGIpICYmXG4gICAgICAgICAgIHR5cGVvZiBiLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyAmJiBiLmVxdWFscyhhKTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZShhKSkge1xuICAgIGNhc2UgJ0FyZ3VtZW50cyc6XG4gICAgY2FzZSAnQXJyYXknOlxuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgICBpZiAodHlwZW9mIGEuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgICBfZnVuY3Rpb25OYW1lKGEuY29uc3RydWN0b3IpID09PSAnUHJvbWlzZScpIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdCb29sZWFuJzpcbiAgICBjYXNlICdOdW1iZXInOlxuICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICBpZiAoISh0eXBlb2YgYSA9PT0gdHlwZW9mIGIgJiYgaWRlbnRpY2FsKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgaWYgKCFpZGVudGljYWwoYS52YWx1ZU9mKCksIGIudmFsdWVPZigpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFcnJvcic6XG4gICAgICByZXR1cm4gYS5uYW1lID09PSBiLm5hbWUgJiYgYS5tZXNzYWdlID09PSBiLm1lc3NhZ2U7XG4gICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgIGlmICghKGEuc291cmNlID09PSBiLnNvdXJjZSAmJlxuICAgICAgICAgICAgYS5nbG9iYWwgPT09IGIuZ2xvYmFsICYmXG4gICAgICAgICAgICBhLmlnbm9yZUNhc2UgPT09IGIuaWdub3JlQ2FzZSAmJlxuICAgICAgICAgICAgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmXG4gICAgICAgICAgICBhLnN0aWNreSA9PT0gYi5zdGlja3kgJiZcbiAgICAgICAgICAgIGEudW5pY29kZSA9PT0gYi51bmljb2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNYXAnOlxuICAgIGNhc2UgJ1NldCc6XG4gICAgICBpZiAoIV9lcXVhbHMoX2FycmF5RnJvbUl0ZXJhdG9yKGEuZW50cmllcygpKSwgX2FycmF5RnJvbUl0ZXJhdG9yKGIuZW50cmllcygpKSwgc3RhY2tBLCBzdGFja0IpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0ludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhDbGFtcGVkQXJyYXknOlxuICAgIGNhc2UgJ0ludDE2QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzpcbiAgICBjYXNlICdJbnQzMkFycmF5JzpcbiAgICBjYXNlICdVaW50MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDY0QXJyYXknOlxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQXJyYXlCdWZmZXInOlxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIFZhbHVlcyBvZiBvdGhlciB0eXBlcyBhcmUgb25seSBlcXVhbCBpZiBpZGVudGljYWwuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBrZXlzKGEpO1xuICBpZiAoa2V5c0EubGVuZ3RoICE9PSBrZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpZHggPSBzdGFja0EubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgaWYgKHN0YWNrQVtpZHhdID09PSBhKSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2lkeF0gPT09IGI7XG4gICAgfVxuICAgIGlkeCAtPSAxO1xuICB9XG5cbiAgc3RhY2tBLnB1c2goYSk7XG4gIHN0YWNrQi5wdXNoKGIpO1xuICBpZHggPSBrZXlzQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICB2YXIga2V5ID0ga2V5c0FbaWR4XTtcbiAgICBpZiAoIShfaGFzKGtleSwgYikgJiYgX2VxdWFscyhiW2tleV0sIGFba2V5XSwgc3RhY2tBLCBzdGFja0IpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxuICBzdGFja0EucG9wKCk7XG4gIHN0YWNrQi5wb3AoKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfZmlsdGVyKGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGxpc3RbaWR4XTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgX2ZvcmNlUmVkdWNlZCA9IHJlcXVpcmUoJy4vX2ZvcmNlUmVkdWNlZCcpO1xudmFyIF9yZWR1Y2UgPSByZXF1aXJlKCcuL19yZWR1Y2UnKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG52YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pc0FycmF5TGlrZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHByZXNlcnZpbmdSZWR1Y2VkID0gZnVuY3Rpb24oeGYpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ0BAdHJhbnNkdWNlci9pbml0JzogX3hmQmFzZS5pbml0LFxuICAgICAgJ0BAdHJhbnNkdWNlci9yZXN1bHQnOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgIH0sXG4gICAgICAnQEB0cmFuc2R1Y2VyL3N0ZXAnOiBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgIHZhciByZXQgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgICAgICAgcmV0dXJuIHJldFsnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSA/IF9mb3JjZVJlZHVjZWQocmV0KSA6IHJldDtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBfeGNhdCh4Zikge1xuICAgIHZhciByeGYgPSBwcmVzZXJ2aW5nUmVkdWNlZCh4Zik7XG4gICAgcmV0dXJuIHtcbiAgICAgICdAQHRyYW5zZHVjZXIvaW5pdCc6IF94ZkJhc2UuaW5pdCxcbiAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByeGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICAgICAgfSxcbiAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuICFpc0FycmF5TGlrZShpbnB1dCkgPyBfcmVkdWNlKHJ4ZiwgcmVzdWx0LCBbaW5wdXRdKSA6IF9yZWR1Y2UocnhmLCByZXN1bHQsIGlucHV0KTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufSgpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2ZvcmNlUmVkdWNlZCh4KSB7XG4gIHJldHVybiB7XG4gICAgJ0BAdHJhbnNkdWNlci92YWx1ZSc6IHgsXG4gICAgJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJzogdHJ1ZVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2Z1bmN0aW9uTmFtZShmKSB7XG4gIC8vIFN0cmluZyh4ID0+IHgpIGV2YWx1YXRlcyB0byBcInggPT4geFwiLCBzbyB0aGUgcGF0dGVybiBtYXkgbm90IG1hdGNoLlxuICB2YXIgbWF0Y2ggPSBTdHJpbmcoZikubWF0Y2goL15mdW5jdGlvbiAoXFx3KikvKTtcbiAgcmV0dXJuIG1hdGNoID09IG51bGwgPyAnJyA6IG1hdGNoWzFdO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2hhcyhwcm9wLCBvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lkZW50aXR5KHgpIHsgcmV0dXJuIHg7IH07XG4iLCJ2YXIgZXF1YWxzID0gcmVxdWlyZSgnLi4vZXF1YWxzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaW5kZXhPZihsaXN0LCBhLCBpZHgpIHtcbiAgdmFyIGluZiwgaXRlbTtcbiAgLy8gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgZG9lc24ndCBleGlzdCBiZWxvdyBJRTlcbiAgaWYgKHR5cGVvZiBsaXN0LmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBhKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpZiAoYSA9PT0gMCkge1xuICAgICAgICAgIC8vIG1hbnVhbGx5IGNyYXdsIHRoZSBsaXN0IHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gKzAgYW5kIC0wXG4gICAgICAgICAgaW5mID0gMSAvIGE7XG4gICAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IDAgJiYgMSAvIGl0ZW0gPT09IGluZikge1xuICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhICE9PSBhKSB7XG4gICAgICAgICAgLy8gTmFOXG4gICAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVtID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnbnVtYmVyJyAmJiBpdGVtICE9PSBpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5vbi16ZXJvIG51bWJlcnMgY2FuIHV0aWxpc2UgU2V0XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcblxuICAgICAgLy8gYWxsIHRoZXNlIHR5cGVzIGNhbiB1dGlsaXNlIFNldFxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihhLCBpZHgpO1xuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoYSA9PT0gbnVsbCkge1xuICAgICAgICAgIC8vIG51bGwgY2FuIHV0aWxpc2UgU2V0XG4gICAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihhLCBpZHgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGFueXRoaW5nIGVsc2Ugbm90IGNvdmVyZWQgYWJvdmUsIGRlZmVyIHRvIFIuZXF1YWxzXG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGlmIChlcXVhbHMobGlzdFtpZHhdLCBhKSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcbiIsInZhciBfaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFyZ3VtZW50cykgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nID9cbiAgICBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkgeyByZXR1cm4gdG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7IH0gOlxuICAgIGZ1bmN0aW9uIF9pc0FyZ3VtZW50cyh4KSB7IHJldHVybiBfaGFzKCdjYWxsZWUnLCB4KTsgfTtcbn0oKSk7XG4iLCIvKipcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGB2YWxgIGlzIGFuIGFycmF5LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfaXNBcnJheShbXSk7IC8vPT4gdHJ1ZVxuICogICAgICBfaXNBcnJheShudWxsKTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheSh7fSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICByZXR1cm4gKHZhbCAhPSBudWxsICYmXG4gICAgICAgICAgdmFsLmxlbmd0aCA+PSAwICYmXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XScpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcbiIsIi8qKlxuICogRGV0ZXJtaW5lIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgYW4gaW50ZWdlci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBuXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXIuaXNJbnRlZ2VyIHx8IGZ1bmN0aW9uIF9pc0ludGVnZXIobikge1xuICByZXR1cm4gKG4gPDwgMCkgPT09IG47XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaXNOdW1iZXIoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBOdW1iZXJdJztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9pc09iamVjdCh4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzUGxhY2Vob2xkZXIoYSkge1xuICByZXR1cm4gYSAhPSBudWxsICYmXG4gICAgICAgICB0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzUmVnRXhwKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaXNTdHJpbmcoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9pc1RyYW5zZm9ybWVyKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9ialsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pc0FycmF5TGlrZScpO1xuXG5cbi8qKlxuICogYF9tYWtlRmxhdGAgaXMgYSBoZWxwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgb25lLWxldmVsIG9yIGZ1bGx5IHJlY3Vyc2l2ZVxuICogZnVuY3Rpb24gYmFzZWQgb24gdGhlIGZsYWcgcGFzc2VkIGluLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX21ha2VGbGF0KHJlY3Vyc2l2ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZmxhdHQobGlzdCkge1xuICAgIHZhciB2YWx1ZSwgamxlbiwgajtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgdmFyIGlsZW4gPSBsaXN0Lmxlbmd0aDtcblxuICAgIHdoaWxlIChpZHggPCBpbGVuKSB7XG4gICAgICBpZiAoaXNBcnJheUxpa2UobGlzdFtpZHhdKSkge1xuICAgICAgICB2YWx1ZSA9IHJlY3Vyc2l2ZSA/IGZsYXR0KGxpc3RbaWR4XSkgOiBsaXN0W2lkeF07XG4gICAgICAgIGogPSAwO1xuICAgICAgICBqbGVuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaiA8IGpsZW4pIHtcbiAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB2YWx1ZVtqXTtcbiAgICAgICAgICBqICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGxpc3RbaWR4XTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX21hcChmbiwgZnVuY3Rvcikge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGZ1bmN0b3IubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHJlc3VsdFtpZHhdID0gZm4oZnVuY3RvcltpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBfaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG5cbi8vIEJhc2VkIG9uIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX29iamVjdEFzc2lnbih0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gIH1cblxuICB2YXIgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBpZHggPSAxO1xuICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbmd0aCkge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaWR4XTtcbiAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbiAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChfaGFzKG5leHRLZXksIHNvdXJjZSkpIHtcbiAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9vZih4KSB7IHJldHVybiBbeF07IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9waXBlKGYsIGcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBnLmNhbGwodGhpcywgZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9waXBlUChmLCBnKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3R4ID0gdGhpcztcbiAgICByZXR1cm4gZi5hcHBseShjdHgsIGFyZ3VtZW50cykudGhlbihmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gZy5jYWxsKGN0eCwgeCk7XG4gICAgfSk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfcXVvdGUocykge1xuICB2YXIgZXNjYXBlZCA9IHNcbiAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxuICAgIC5yZXBsYWNlKC9bXFxiXS9nLCAnXFxcXGInKSAgLy8gXFxiIG1hdGNoZXMgd29yZCBib3VuZGFyeTsgW1xcYl0gbWF0Y2hlcyBiYWNrc3BhY2VcbiAgICAucmVwbGFjZSgvXFxmL2csICdcXFxcZicpXG4gICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgIC5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcbiAgICAucmVwbGFjZSgvXFx0L2csICdcXFxcdCcpXG4gICAgLnJlcGxhY2UoL1xcdi9nLCAnXFxcXHYnKVxuICAgIC5yZXBsYWNlKC9cXDAvZywgJ1xcXFwwJyk7XG5cbiAgcmV0dXJuICdcIicgKyBlc2NhcGVkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIic7XG59O1xuIiwidmFyIF94d3JhcCA9IHJlcXVpcmUoJy4vX3h3cmFwJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2JpbmQnKTtcbnZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2lzQXJyYXlMaWtlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgbGlzdFtpZHhdKTtcbiAgICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gIH1cblxuICBmdW5jdGlvbiBfaXRlcmFibGVSZWR1Y2UoeGYsIGFjYywgaXRlcikge1xuICAgIHZhciBzdGVwID0gaXRlci5uZXh0KCk7XG4gICAgd2hpbGUgKCFzdGVwLmRvbmUpIHtcbiAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgc3RlcC52YWx1ZSk7XG4gICAgICBpZiAoYWNjICYmIGFjY1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9tZXRob2RSZWR1Y2UoeGYsIGFjYywgb2JqKSB7XG4gICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ob2JqLnJlZHVjZShiaW5kKHhmWydAQHRyYW5zZHVjZXIvc3RlcCddLCB4ZiksIGFjYykpO1xuICB9XG5cbiAgdmFyIHN5bUl0ZXJhdG9yID0gKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnKSA/IFN5bWJvbC5pdGVyYXRvciA6ICdAQGl0ZXJhdG9yJztcbiAgcmV0dXJuIGZ1bmN0aW9uIF9yZWR1Y2UoZm4sIGFjYywgbGlzdCkge1xuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZuID0gX3h3cmFwKGZuKTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXlMaWtlKGxpc3QpKSB7XG4gICAgICByZXR1cm4gX2FycmF5UmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxpc3QucmVkdWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0KTtcbiAgICB9XG4gICAgaWYgKGxpc3Rbc3ltSXRlcmF0b3JdICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGlzdC5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xuICB9O1xufSgpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX3JlZHVjZWQoeCkge1xuICByZXR1cm4geCAmJiB4WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID8geCA6XG4gICAge1xuICAgICAgJ0BAdHJhbnNkdWNlci92YWx1ZSc6IHgsXG4gICAgICAnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnOiB0cnVlXG4gICAgfTtcbn07XG4iLCJ2YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJy4vX2Fzc2lnbicpO1xudmFyIF9pZGVudGl0eSA9IHJlcXVpcmUoJy4vX2lkZW50aXR5Jyk7XG52YXIgX2lzVHJhbnNmb3JtZXIgPSByZXF1aXJlKCcuL19pc1RyYW5zZm9ybWVyJyk7XG52YXIgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pc0FycmF5TGlrZScpO1xudmFyIG9iak9mID0gcmVxdWlyZSgnLi4vb2JqT2YnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIF9zdGVwQ2F0QXJyYXkgPSB7XG4gICAgJ0BAdHJhbnNkdWNlci9pbml0JzogQXJyYXksXG4gICAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgIHhzLnB1c2goeCk7XG4gICAgICByZXR1cm4geHM7XG4gICAgfSxcbiAgICAnQEB0cmFuc2R1Y2VyL3Jlc3VsdCc6IF9pZGVudGl0eVxuICB9O1xuICB2YXIgX3N0ZXBDYXRTdHJpbmcgPSB7XG4gICAgJ0BAdHJhbnNkdWNlci9pbml0JzogU3RyaW5nLFxuICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9LFxuICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogX2lkZW50aXR5XG4gIH07XG4gIHZhciBfc3RlcENhdE9iamVjdCA9IHtcbiAgICAnQEB0cmFuc2R1Y2VyL2luaXQnOiBPYmplY3QsXG4gICAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgICAgcmV0dXJuIF9hc3NpZ24oXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgaXNBcnJheUxpa2UoaW5wdXQpID8gb2JqT2YoaW5wdXRbMF0sIGlucHV0WzFdKSA6IGlucHV0XG4gICAgICApO1xuICAgIH0sXG4gICAgJ0BAdHJhbnNkdWNlci9yZXN1bHQnOiBfaWRlbnRpdHlcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gX3N0ZXBDYXQob2JqKSB7XG4gICAgaWYgKF9pc1RyYW5zZm9ybWVyKG9iaikpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG4gICAgICByZXR1cm4gX3N0ZXBDYXRBcnJheTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gX3N0ZXBDYXRTdHJpbmc7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIF9zdGVwQ2F0T2JqZWN0O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgdHJhbnNmb3JtZXIgZm9yICcgKyBvYmopO1xuICB9O1xufSgpKTtcbiIsIi8qKlxuICogUG9seWZpbGwgZnJvbSA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZS90b0lTT1N0cmluZz4uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgcGFkID0gZnVuY3Rpb24gcGFkKG4pIHsgcmV0dXJuIChuIDwgMTAgPyAnMCcgOiAnJykgKyBuOyB9O1xuXG4gIHJldHVybiB0eXBlb2YgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicgP1xuICAgIGZ1bmN0aW9uIF90b0lTT1N0cmluZyhkKSB7XG4gICAgICByZXR1cm4gZC50b0lTT1N0cmluZygpO1xuICAgIH0gOlxuICAgIGZ1bmN0aW9uIF90b0lTT1N0cmluZyhkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBkLmdldFVUQ0Z1bGxZZWFyKCkgKyAnLScgK1xuICAgICAgICBwYWQoZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgK1xuICAgICAgICBwYWQoZC5nZXRVVENEYXRlKCkpICsgJ1QnICtcbiAgICAgICAgcGFkKGQuZ2V0VVRDSG91cnMoKSkgKyAnOicgK1xuICAgICAgICBwYWQoZC5nZXRVVENNaW51dGVzKCkpICsgJzonICtcbiAgICAgICAgcGFkKGQuZ2V0VVRDU2Vjb25kcygpKSArICcuJyArXG4gICAgICAgIChkLmdldFVUQ01pbGxpc2Vjb25kcygpIC8gMTAwMCkudG9GaXhlZCgzKS5zbGljZSgyLCA1KSArICdaJ1xuICAgICAgKTtcbiAgICB9O1xufSgpKTtcbiIsInZhciBfY29udGFpbnMgPSByZXF1aXJlKCcuL19jb250YWlucycpO1xudmFyIF9tYXAgPSByZXF1aXJlKCcuL19tYXAnKTtcbnZhciBfcXVvdGUgPSByZXF1aXJlKCcuL19xdW90ZScpO1xudmFyIF90b0lTT1N0cmluZyA9IHJlcXVpcmUoJy4vX3RvSVNPU3RyaW5nJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4uL2tleXMnKTtcbnZhciByZWplY3QgPSByZXF1aXJlKCcuLi9yZWplY3QnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF90b1N0cmluZyh4LCBzZWVuKSB7XG4gIHZhciByZWN1ciA9IGZ1bmN0aW9uIHJlY3VyKHkpIHtcbiAgICB2YXIgeHMgPSBzZWVuLmNvbmNhdChbeF0pO1xuICAgIHJldHVybiBfY29udGFpbnMoeSwgeHMpID8gJzxDaXJjdWxhcj4nIDogX3RvU3RyaW5nKHksIHhzKTtcbiAgfTtcblxuICAvLyAgbWFwUGFpcnMgOjogKE9iamVjdCwgW1N0cmluZ10pIC0+IFtTdHJpbmddXG4gIHZhciBtYXBQYWlycyA9IGZ1bmN0aW9uKG9iaiwga2V5cykge1xuICAgIHJldHVybiBfbWFwKGZ1bmN0aW9uKGspIHsgcmV0dXJuIF9xdW90ZShrKSArICc6ICcgKyByZWN1cihvYmpba10pOyB9LCBrZXlzLnNsaWNlKCkuc29ydCgpKTtcbiAgfTtcblxuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSkge1xuICAgIGNhc2UgJ1tvYmplY3QgQXJndW1lbnRzXSc6XG4gICAgICByZXR1cm4gJyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgnICsgX21hcChyZWN1ciwgeCkuam9pbignLCAnKSArICcpKSc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmV0dXJuICdbJyArIF9tYXAocmVjdXIsIHgpLmNvbmNhdChtYXBQYWlycyh4LCByZWplY3QoZnVuY3Rpb24oaykgeyByZXR1cm4gL15cXGQrJC8udGVzdChrKTsgfSwga2V5cyh4KSkpKS5qb2luKCcsICcpICsgJ10nO1xuICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgQm9vbGVhbignICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogeC50b1N0cmluZygpO1xuICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOlxuICAgICAgcmV0dXJuICduZXcgRGF0ZSgnICsgKGlzTmFOKHgudmFsdWVPZigpKSA/IHJlY3VyKE5hTikgOiBfcXVvdGUoX3RvSVNPU3RyaW5nKHgpKSkgKyAnKSc7XG4gICAgY2FzZSAnW29iamVjdCBOdWxsXSc6XG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBOdW1iZXIoJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IDEgLyB4ID09PSAtSW5maW5pdHkgPyAnLTAnIDogeC50b1N0cmluZygxMCk7XG4gICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IFN0cmluZygnICsgcmVjdXIoeC52YWx1ZU9mKCkpICsgJyknIDogX3F1b3RlKHgpO1xuICAgIGNhc2UgJ1tvYmplY3QgVW5kZWZpbmVkXSc6XG4gICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh0eXBlb2YgeC50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgcmVwciA9IHgudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHJlcHIgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcHI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAneycgKyBtYXBQYWlycyh4LCBrZXlzKHgpKS5qb2luKCcsICcpICsgJ30nO1xuICB9XG59O1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfcmVkdWNlZCA9IHJlcXVpcmUoJy4vX3JlZHVjZWQnKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhBbGwoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgICB0aGlzLmFsbCA9IHRydWU7XG4gIH1cbiAgWEFsbC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhBbGwucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICBpZiAodGhpcy5hbGwpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYQWxsLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICBpZiAoIXRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMuYWxsID0gZmFsc2U7XG4gICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgZmFsc2UpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGFsbChmLCB4ZikgeyByZXR1cm4gbmV3IFhBbGwoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF9yZWR1Y2VkID0gcmVxdWlyZSgnLi9fcmVkdWNlZCcpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWEFueShmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICAgIHRoaXMuYW55ID0gZmFsc2U7XG4gIH1cbiAgWEFueS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhBbnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICBpZiAoIXRoaXMuYW55KSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhBbnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICB0aGlzLmFueSA9IHRydWU7XG4gICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdHJ1ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94YW55KGYsIHhmKSB7IHJldHVybiBuZXcgWEFueShmLCB4Zik7IH0pO1xufSgpKTtcbiIsInZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9fY29uY2F0Jyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWEFwZXJ0dXJlKG4sIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLmZ1bGwgPSBmYWxzZTtcbiAgICB0aGlzLmFjYyA9IG5ldyBBcnJheShuKTtcbiAgfVxuICBYQXBlcnR1cmUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYQXBlcnR1cmUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICB0aGlzLmFjYyA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYQXBlcnR1cmUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMuc3RvcmUoaW5wdXQpO1xuICAgIHJldHVybiB0aGlzLmZ1bGwgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5nZXRDb3B5KCkpIDogcmVzdWx0O1xuICB9O1xuICBYQXBlcnR1cmUucHJvdG90eXBlLnN0b3JlID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICB0aGlzLmFjY1t0aGlzLnBvc10gPSBpbnB1dDtcbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIGlmICh0aGlzLnBvcyA9PT0gdGhpcy5hY2MubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvcyA9IDA7XG4gICAgICB0aGlzLmZ1bGwgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgWEFwZXJ0dXJlLnByb3RvdHlwZS5nZXRDb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF9jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5hY2MsIHRoaXMucG9zKSxcbiAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmFjYywgMCwgdGhpcy5wb3MpKTtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGFwZXJ0dXJlKG4sIHhmKSB7IHJldHVybiBuZXcgWEFwZXJ0dXJlKG4sIHhmKTsgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfZmxhdENhdCA9IHJlcXVpcmUoJy4vX2ZsYXRDYXQnKTtcbnZhciBtYXAgPSByZXF1aXJlKCcuLi9tYXAnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gX3hjaGFpbihmLCB4Zikge1xuICByZXR1cm4gbWFwKGYsIF9mbGF0Q2F0KHhmKSk7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG52YXIgX3hmQmFzZSA9IHJlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYRHJvcChuLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLm4gPSBuO1xuICB9XG4gIFhEcm9wLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIGlmICh0aGlzLm4gPiAwKSB7XG4gICAgICB0aGlzLm4gLT0gMTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZHJvcChuLCB4ZikgeyByZXR1cm4gbmV3IFhEcm9wKG4sIHhmKTsgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhEcm9wTGFzdChuLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLnBvcyA9IDA7XG4gICAgdGhpcy5mdWxsID0gZmFsc2U7XG4gICAgdGhpcy5hY2MgPSBuZXcgQXJyYXkobik7XG4gIH1cbiAgWERyb3BMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3BMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIHRoaXMuYWNjID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhEcm9wTGFzdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZnVsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuYWNjW3RoaXMucG9zXSk7XG4gICAgfVxuICAgIHRoaXMuc3RvcmUoaW5wdXQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIFhEcm9wTGFzdC5wcm90b3R5cGUuc3RvcmUgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgIHRoaXMuYWNjW3RoaXMucG9zXSA9IGlucHV0O1xuICAgIHRoaXMucG9zICs9IDE7XG4gICAgaWYgKHRoaXMucG9zID09PSB0aGlzLmFjYy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgIHRoaXMuZnVsbCA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZHJvcExhc3QobiwgeGYpIHsgcmV0dXJuIG5ldyBYRHJvcExhc3QobiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF9yZWR1Y2UgPSByZXF1aXJlKCcuL19yZWR1Y2UnKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYRHJvcExhc3RXaGlsZShmbiwgeGYpIHtcbiAgICB0aGlzLmYgPSBmbjtcbiAgICB0aGlzLnJldGFpbmVkID0gW107XG4gICAgdGhpcy54ZiA9IHhmO1xuICB9XG4gIFhEcm9wTGFzdFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3BMYXN0V2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICB0aGlzLnJldGFpbmVkID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhEcm9wTGFzdFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5mKGlucHV0KSA/IHRoaXMucmV0YWluKHJlc3VsdCwgaW5wdXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmZsdXNoKHJlc3VsdCwgaW5wdXQpO1xuICB9O1xuICBYRHJvcExhc3RXaGlsZS5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgcmVzdWx0ID0gX3JlZHVjZShcbiAgICAgIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10sXG4gICAgICByZXN1bHQsXG4gICAgICB0aGlzLnJldGFpbmVkXG4gICAgKTtcbiAgICB0aGlzLnJldGFpbmVkID0gW107XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gIH07XG4gIFhEcm9wTGFzdFdoaWxlLnByb3RvdHlwZS5yZXRhaW4gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgdGhpcy5yZXRhaW5lZC5wdXNoKGlucHV0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZHJvcExhc3RXaGlsZShmbiwgeGYpIHsgcmV0dXJuIG5ldyBYRHJvcExhc3RXaGlsZShmbiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWERyb3BSZXBlYXRzV2l0aChwcmVkLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLnByZWQgPSBwcmVkO1xuICAgIHRoaXMubGFzdFZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2VlbkZpcnN0VmFsdWUgPSBmYWxzZTtcbiAgfVxuXG4gIFhEcm9wUmVwZWF0c1dpdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRHJvcFJlcGVhdHNXaXRoLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhEcm9wUmVwZWF0c1dpdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIHZhciBzYW1lQXNMYXN0ID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLnNlZW5GaXJzdFZhbHVlKSB7XG4gICAgICB0aGlzLnNlZW5GaXJzdFZhbHVlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJlZCh0aGlzLmxhc3RWYWx1ZSwgaW5wdXQpKSB7XG4gICAgICBzYW1lQXNMYXN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5sYXN0VmFsdWUgPSBpbnB1dDtcbiAgICByZXR1cm4gc2FtZUFzTGFzdCA/IHJlc3VsdCA6IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gIH07XG5cbiAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hkcm9wUmVwZWF0c1dpdGgocHJlZCwgeGYpIHsgcmV0dXJuIG5ldyBYRHJvcFJlcGVhdHNXaXRoKHByZWQsIHhmKTsgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhEcm9wV2hpbGUoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYRHJvcFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYRHJvcFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICBpZiAodGhpcy5mKSB7XG4gICAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdGhpcy5mID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gIH07XG5cbiAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hkcm9wV2hpbGUoZiwgeGYpIHsgcmV0dXJuIG5ldyBYRHJvcFdoaWxlKGYsIHhmKTsgfSk7XG59KCkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG4gIH0sXG4gIHJlc3VsdDogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9XG59O1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhGaWx0ZXIoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5mKGlucHV0KSA/IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCkgOiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hmaWx0ZXIoZiwgeGYpIHsgcmV0dXJuIG5ldyBYRmlsdGVyKGYsIHhmKTsgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfcmVkdWNlZCA9IHJlcXVpcmUoJy4vX3JlZHVjZWQnKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhGaW5kKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gICAgdGhpcy5mb3VuZCA9IGZhbHNlO1xuICB9XG4gIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbmQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICBpZiAoIXRoaXMuZm91bmQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB2b2lkIDApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgdGhpcy5mb3VuZCA9IHRydWU7XG4gICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmQoZiwgeGYpIHsgcmV0dXJuIG5ldyBYRmluZChmLCB4Zik7IH0pO1xufSgpKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG52YXIgX3JlZHVjZWQgPSByZXF1aXJlKCcuL19yZWR1Y2VkJyk7XG52YXIgX3hmQmFzZSA9IHJlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYRmluZEluZGV4KGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gICAgdGhpcy5pZHggPSAtMTtcbiAgICB0aGlzLmZvdW5kID0gZmFsc2U7XG4gIH1cbiAgWEZpbmRJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhGaW5kSW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICBpZiAoIXRoaXMuZm91bmQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCAtMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWEZpbmRJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgdGhpcy5pZHggKz0gMTtcbiAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgdGhpcy5mb3VuZCA9IHRydWU7XG4gICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5pZHgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmRJbmRleChmLCB4ZikgeyByZXR1cm4gbmV3IFhGaW5kSW5kZXgoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWEZpbmRMYXN0KGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWEZpbmRMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbmRMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5sYXN0KSk7XG4gIH07XG4gIFhGaW5kTGFzdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMubGFzdCA9IGlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZmluZExhc3QoZiwgeGYpIHsgcmV0dXJuIG5ldyBYRmluZExhc3QoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWEZpbmRMYXN0SW5kZXgoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgICB0aGlzLmlkeCA9IC0xO1xuICAgIHRoaXMubGFzdElkeCA9IC0xO1xuICB9XG4gIFhGaW5kTGFzdEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbmRMYXN0SW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmxhc3RJZHgpKTtcbiAgfTtcbiAgWEZpbmRMYXN0SW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMuaWR4ICs9IDE7XG4gICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMubGFzdElkeCA9IHRoaXMuaWR4O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZmluZExhc3RJbmRleChmLCB4ZikgeyByZXR1cm4gbmV3IFhGaW5kTGFzdEluZGV4KGYsIHhmKTsgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhNYXAoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuZihpbnB1dCkpO1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94bWFwKGYsIHhmKSB7IHJldHVybiBuZXcgWE1hcChmLCB4Zik7IH0pO1xufSgpKTtcbiIsInZhciBfY3VycnlOID0gcmVxdWlyZSgnLi9fY3VycnlOJyk7XG52YXIgX2hhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWFJlZHVjZUJ5KHZhbHVlRm4sIHZhbHVlQWNjLCBrZXlGbiwgeGYpIHtcbiAgICB0aGlzLnZhbHVlRm4gPSB2YWx1ZUZuO1xuICAgIHRoaXMudmFsdWVBY2MgPSB2YWx1ZUFjYztcbiAgICB0aGlzLmtleUZuID0ga2V5Rm47XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuaW5wdXRzID0ge307XG4gIH1cbiAgWFJlZHVjZUJ5LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWFJlZHVjZUJ5LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiB0aGlzLmlucHV0cykge1xuICAgICAgaWYgKF9oYXMoa2V5LCB0aGlzLmlucHV0cykpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuaW5wdXRzW2tleV0pO1xuICAgICAgICBpZiAocmVzdWx0WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0WydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmlucHV0cyA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYUmVkdWNlQnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIHZhciBrZXkgPSB0aGlzLmtleUZuKGlucHV0KTtcbiAgICB0aGlzLmlucHV0c1trZXldID0gdGhpcy5pbnB1dHNba2V5XSB8fCBba2V5LCB0aGlzLnZhbHVlQWNjXTtcbiAgICB0aGlzLmlucHV0c1trZXldWzFdID0gdGhpcy52YWx1ZUZuKHRoaXMuaW5wdXRzW2tleV1bMV0sIGlucHV0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnlOKDQsIFtdLFxuICAgICAgICAgICAgICAgICBmdW5jdGlvbiBfeHJlZHVjZUJ5KHZhbHVlRm4sIHZhbHVlQWNjLCBrZXlGbiwgeGYpIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFhSZWR1Y2VCeSh2YWx1ZUZuLCB2YWx1ZUFjYywga2V5Rm4sIHhmKTtcbiAgICAgICAgICAgICAgICAgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfcmVkdWNlZCA9IHJlcXVpcmUoJy4vX3JlZHVjZWQnKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYVGFrZShuLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLm4gPSBuO1xuICAgIHRoaXMuaSA9IDA7XG4gIH1cbiAgWFRha2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgdGhpcy5pICs9IDE7XG4gICAgdmFyIHJldCA9IHRoaXMubiA9PT0gMCA/IHJlc3VsdCA6IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gICAgcmV0dXJuIHRoaXMuaSA+PSB0aGlzLm4gPyBfcmVkdWNlZChyZXQpIDogcmV0O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94dGFrZShuLCB4ZikgeyByZXR1cm4gbmV3IFhUYWtlKG4sIHhmKTsgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfcmVkdWNlZCA9IHJlcXVpcmUoJy4vX3JlZHVjZWQnKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhUYWtlV2hpbGUoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYVGFrZVdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWFRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYVGFrZVdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5mKGlucHV0KSA/IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCkgOiBfcmVkdWNlZChyZXN1bHQpO1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94dGFrZVdoaWxlKGYsIHhmKSB7IHJldHVybiBuZXcgWFRha2VXaGlsZShmLCB4Zik7IH0pO1xufSgpKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYV3JhcChmbikge1xuICAgIHRoaXMuZiA9IGZuO1xuICB9XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdCBub3QgaW1wbGVtZW50ZWQgb24gWFdyYXAnKTtcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihhY2MpIHsgcmV0dXJuIGFjYzsgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24oYWNjLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBfeHdyYXAoZm4pIHsgcmV0dXJuIG5ldyBYV3JhcChmbik7IH07XG59KCkpO1xuIiwidmFyIF9jb250YWlucyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbnRhaW5zJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9maWx0ZXIgPSByZXF1aXJlKCcuL2ludGVybmFsL19maWx0ZXInKTtcbnZhciBmbGlwID0gcmVxdWlyZSgnLi9mbGlwJyk7XG52YXIgdW5pcSA9IHJlcXVpcmUoJy4vdW5pcScpO1xuXG5cbi8qKlxuICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhvc2VcbiAqIGVsZW1lbnRzIGNvbW1vbiB0byBib3RoIGxpc3RzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIFsqXSAtPiBbKl0gLT4gWypdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiBlbGVtZW50cyBmb3VuZCBpbiBib3RoIGBsaXN0MWAgYW5kIGBsaXN0MmAuXG4gKiBAc2VlIFIuaW50ZXJzZWN0aW9uV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW50ZXJzZWN0aW9uKFsxLDIsMyw0XSwgWzcsNiw1LDQsM10pOyAvLz0+IFs0LCAzXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gaW50ZXJzZWN0aW9uKGxpc3QxLCBsaXN0Mikge1xuICB2YXIgbG9va3VwTGlzdCwgZmlsdGVyZWRMaXN0O1xuICBpZiAobGlzdDEubGVuZ3RoID4gbGlzdDIubGVuZ3RoKSB7XG4gICAgbG9va3VwTGlzdCA9IGxpc3QxO1xuICAgIGZpbHRlcmVkTGlzdCA9IGxpc3QyO1xuICB9IGVsc2Uge1xuICAgIGxvb2t1cExpc3QgPSBsaXN0MjtcbiAgICBmaWx0ZXJlZExpc3QgPSBsaXN0MTtcbiAgfVxuICByZXR1cm4gdW5pcShfZmlsdGVyKGZsaXAoX2NvbnRhaW5zKShsb29rdXBMaXN0KSwgZmlsdGVyZWRMaXN0KSk7XG59KTtcbiIsInZhciBfY29udGFpbnNXaXRoID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnNXaXRoJyk7XG52YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIHVuaXFXaXRoID0gcmVxdWlyZSgnLi91bmlxV2l0aCcpO1xuXG5cbi8qKlxuICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhvc2VcbiAqIGVsZW1lbnRzIGNvbW1vbiB0byBib3RoIGxpc3RzLiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGVcbiAqIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKChhLCBhKSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlclxuICogICAgICAgIHRoZSB0d28gc3VwcGxpZWQgZWxlbWVudHMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgT25lIGxpc3Qgb2YgaXRlbXMgdG8gY29tcGFyZVxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgQSBzZWNvbmQgbGlzdCBvZiBpdGVtcyB0byBjb21wYXJlXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgbGlzdCBjb250YWluaW5nIHRob3NlIGVsZW1lbnRzIGNvbW1vbiB0byBib3RoIGxpc3RzLlxuICogQHNlZSBSLmludGVyc2VjdGlvblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBidWZmYWxvU3ByaW5nZmllbGQgPSBbXG4gKiAgICAgICAge2lkOiA4MjQsIG5hbWU6ICdSaWNoaWUgRnVyYXknfSxcbiAqICAgICAgICB7aWQ6IDk1NiwgbmFtZTogJ0Rld2V5IE1hcnRpbid9LFxuICogICAgICAgIHtpZDogMzEzLCBuYW1lOiAnQnJ1Y2UgUGFsbWVyJ30sXG4gKiAgICAgICAge2lkOiA0NTYsIG5hbWU6ICdTdGVwaGVuIFN0aWxscyd9LFxuICogICAgICAgIHtpZDogMTc3LCBuYW1lOiAnTmVpbCBZb3VuZyd9XG4gKiAgICAgIF07XG4gKiAgICAgIHZhciBjc255ID0gW1xuICogICAgICAgIHtpZDogMjA0LCBuYW1lOiAnRGF2aWQgQ3Jvc2J5J30sXG4gKiAgICAgICAge2lkOiA0NTYsIG5hbWU6ICdTdGVwaGVuIFN0aWxscyd9LFxuICogICAgICAgIHtpZDogNTM5LCBuYW1lOiAnR3JhaGFtIE5hc2gnfSxcbiAqICAgICAgICB7aWQ6IDE3NywgbmFtZTogJ05laWwgWW91bmcnfVxuICogICAgICBdO1xuICpcbiAqICAgICAgUi5pbnRlcnNlY3Rpb25XaXRoKFIuZXFCeShSLnByb3AoJ2lkJykpLCBidWZmYWxvU3ByaW5nZmllbGQsIGNzbnkpO1xuICogICAgICAvLz0+IFt7aWQ6IDQ1NiwgbmFtZTogJ1N0ZXBoZW4gU3RpbGxzJ30sIHtpZDogMTc3LCBuYW1lOiAnTmVpbCBZb3VuZyd9XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gaW50ZXJzZWN0aW9uV2l0aChwcmVkLCBsaXN0MSwgbGlzdDIpIHtcbiAgdmFyIGxvb2t1cExpc3QsIGZpbHRlcmVkTGlzdDtcbiAgaWYgKGxpc3QxLmxlbmd0aCA+IGxpc3QyLmxlbmd0aCkge1xuICAgIGxvb2t1cExpc3QgPSBsaXN0MTtcbiAgICBmaWx0ZXJlZExpc3QgPSBsaXN0MjtcbiAgfSBlbHNlIHtcbiAgICBsb29rdXBMaXN0ID0gbGlzdDI7XG4gICAgZmlsdGVyZWRMaXN0ID0gbGlzdDE7XG4gIH1cbiAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBmaWx0ZXJlZExpc3QubGVuZ3RoKSB7XG4gICAgaWYgKF9jb250YWluc1dpdGgocHJlZCwgZmlsdGVyZWRMaXN0W2lkeF0sIGxvb2t1cExpc3QpKSB7XG4gICAgICByZXN1bHRzW3Jlc3VsdHMubGVuZ3RoXSA9IGZpbHRlcmVkTGlzdFtpZHhdO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gdW5pcVdpdGgocHJlZCwgcmVzdWx0cyk7XG59KTtcbiIsInZhciBfY2hlY2tGb3JNZXRob2QgPSByZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbGlzdCB3aXRoIHRoZSBzZXBhcmF0b3IgaW50ZXJwb3NlZCBiZXR3ZWVuIGVsZW1lbnRzLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBpbnRlcnNwZXJzZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0geyp9IHNlcGFyYXRvciBUaGUgZWxlbWVudCB0byBhZGQgdG8gdGhlIGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGJlIGludGVycG9zZWQuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBsaXN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW50ZXJzcGVyc2UoJ24nLCBbJ2JhJywgJ2EnLCAnYSddKTsgLy89PiBbJ2JhJywgJ24nLCAnYScsICduJywgJ2EnXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoX2NoZWNrRm9yTWV0aG9kKCdpbnRlcnNwZXJzZScsIGZ1bmN0aW9uIGludGVyc3BlcnNlKHNlcGFyYXRvciwgbGlzdCkge1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW5ndGgpIHtcbiAgICBpZiAoaWR4ID09PSBsZW5ndGggLSAxKSB7XG4gICAgICBvdXQucHVzaChsaXN0W2lkeF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaChsaXN0W2lkeF0sIHNlcGFyYXRvcik7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KSk7XG4iLCJ2YXIgX2Nsb25lID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2xvbmUnKTtcbnZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgX2lzVHJhbnNmb3JtZXIgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc1RyYW5zZm9ybWVyJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIF9zdGVwQ2F0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fc3RlcENhdCcpO1xuXG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgaXRlbXMgb2YgdGhlIGxpc3Qgd2l0aCB0aGUgdHJhbnNkdWNlciBhbmQgYXBwZW5kcyB0aGVcbiAqIHRyYW5zZm9ybWVkIGl0ZW1zIHRvIHRoZSBhY2N1bXVsYXRvciB1c2luZyBhbiBhcHByb3ByaWF0ZSBpdGVyYXRvciBmdW5jdGlvblxuICogYmFzZWQgb24gdGhlIGFjY3VtdWxhdG9yIHR5cGUuXG4gKlxuICogVGhlIGFjY3VtdWxhdG9yIGNhbiBiZSBhbiBhcnJheSwgc3RyaW5nLCBvYmplY3Qgb3IgYSB0cmFuc2Zvcm1lci4gSXRlcmF0ZWRcbiAqIGl0ZW1zIHdpbGwgYmUgYXBwZW5kZWQgdG8gYXJyYXlzIGFuZCBjb25jYXRlbmF0ZWQgdG8gc3RyaW5ncy4gT2JqZWN0cyB3aWxsXG4gKiBiZSBtZXJnZWQgZGlyZWN0bHkgb3IgMi1pdGVtIGFycmF5cyB3aWxsIGJlIG1lcmdlZCBhcyBrZXksIHZhbHVlIHBhaXJzLlxuICpcbiAqIFRoZSBhY2N1bXVsYXRvciBjYW4gYWxzbyBiZSBhIHRyYW5zZm9ybWVyIG9iamVjdCB0aGF0IHByb3ZpZGVzIGEgMi1hcml0eVxuICogcmVkdWNpbmcgaXRlcmF0b3IgZnVuY3Rpb24sIHN0ZXAsIDAtYXJpdHkgaW5pdGlhbCB2YWx1ZSBmdW5jdGlvbiwgaW5pdCwgYW5kXG4gKiAxLWFyaXR5IHJlc3VsdCBleHRyYWN0aW9uIGZ1bmN0aW9uIHJlc3VsdC4gVGhlIHN0ZXAgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGVcbiAqIGl0ZXJhdG9yIGZ1bmN0aW9uIGluIHJlZHVjZS4gVGhlIHJlc3VsdCBmdW5jdGlvbiBpcyB1c2VkIHRvIGNvbnZlcnQgdGhlXG4gKiBmaW5hbCBhY2N1bXVsYXRvciBpbnRvIHRoZSByZXR1cm4gdHlwZSBhbmQgaW4gbW9zdCBjYXNlcyBpcyBSLmlkZW50aXR5LiBUaGVcbiAqIGluaXQgZnVuY3Rpb24gaXMgdXNlZCB0byBwcm92aWRlIHRoZSBpbml0aWFsIGFjY3VtdWxhdG9yLlxuICpcbiAqIFRoZSBpdGVyYXRpb24gaXMgcGVyZm9ybWVkIHdpdGggUi5yZWR1Y2UgYWZ0ZXIgaW5pdGlhbGl6aW5nIHRoZSB0cmFuc2R1Y2VyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEyLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gKGIgLT4gYikgLT4gW2NdIC0+IGFcbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBpbml0aWFsIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0geGYgVGhlIHRyYW5zZHVjZXIgZnVuY3Rpb24uIFJlY2VpdmVzIGEgdHJhbnNmb3JtZXIgYW5kIHJldHVybnMgYSB0cmFuc2Zvcm1lci5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbnVtYmVycyA9IFsxLCAyLCAzLCA0XTtcbiAqICAgICAgdmFyIHRyYW5zZHVjZXIgPSBSLmNvbXBvc2UoUi5tYXAoUi5hZGQoMSkpLCBSLnRha2UoMikpO1xuICpcbiAqICAgICAgUi5pbnRvKFtdLCB0cmFuc2R1Y2VyLCBudW1iZXJzKTsgLy89PiBbMiwgM11cbiAqXG4gKiAgICAgIHZhciBpbnRvQXJyYXkgPSBSLmludG8oW10pO1xuICogICAgICBpbnRvQXJyYXkodHJhbnNkdWNlciwgbnVtYmVycyk7IC8vPT4gWzIsIDNdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBpbnRvKGFjYywgeGYsIGxpc3QpIHtcbiAgcmV0dXJuIF9pc1RyYW5zZm9ybWVyKGFjYykgP1xuICAgIF9yZWR1Y2UoeGYoYWNjKSwgYWNjWydAQHRyYW5zZHVjZXIvaW5pdCddKCksIGxpc3QpIDpcbiAgICBfcmVkdWNlKHhmKF9zdGVwQ2F0KGFjYykpLCBfY2xvbmUoYWNjLCBbXSwgW10sIGZhbHNlKSwgbGlzdCk7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2hhcyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xudmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuXG4vKipcbiAqIFNhbWUgYXMgUi5pbnZlcnRPYmosIGhvd2V2ZXIgdGhpcyBhY2NvdW50cyBmb3Igb2JqZWN0cyB3aXRoIGR1cGxpY2F0ZSB2YWx1ZXNcbiAqIGJ5IHB1dHRpbmcgdGhlIHZhbHVlcyBpbnRvIGFuIGFycmF5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7czogeH0gLT4ge3g6IFsgcywgLi4uIF19XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaW52ZXJ0XG4gKiBAcmV0dXJuIHtPYmplY3R9IG91dCBBIG5ldyBvYmplY3Qgd2l0aCBrZXlzXG4gKiBpbiBhbiBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgcmFjZVJlc3VsdHNCeUZpcnN0TmFtZSA9IHtcbiAqICAgICAgICBmaXJzdDogJ2FsaWNlJyxcbiAqICAgICAgICBzZWNvbmQ6ICdqYWtlJyxcbiAqICAgICAgICB0aGlyZDogJ2FsaWNlJyxcbiAqICAgICAgfTtcbiAqICAgICAgUi5pbnZlcnQocmFjZVJlc3VsdHNCeUZpcnN0TmFtZSk7XG4gKiAgICAgIC8vPT4geyAnYWxpY2UnOiBbJ2ZpcnN0JywgJ3RoaXJkJ10sICdqYWtlJzpbJ3NlY29uZCddIH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGludmVydChvYmopIHtcbiAgdmFyIHByb3BzID0ga2V5cyhvYmopO1xuICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIG91dCA9IHt9O1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaWR4XTtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgdmFyIGxpc3QgPSBfaGFzKHZhbCwgb3V0KSA/IG91dFt2YWxdIDogKG91dFt2YWxdID0gW10pO1xuICAgIGxpc3RbbGlzdC5sZW5ndGhdID0ga2V5O1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBvYmplY3Qgd2l0aCB0aGUga2V5cyBvZiB0aGUgZ2l2ZW4gb2JqZWN0IGFzIHZhbHVlcywgYW5kIHRoZVxuICogdmFsdWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsIHdoaWNoIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MsIGFzIGtleXMuIE5vdGVcbiAqIHRoYXQgdGhlIGxhc3Qga2V5IGZvdW5kIGlzIHByZWZlcnJlZCB3aGVuIGhhbmRsaW5nIHRoZSBzYW1lIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7czogeH0gLT4ge3g6IHN9XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaW52ZXJ0XG4gKiBAcmV0dXJuIHtPYmplY3R9IG91dCBBIG5ldyBvYmplY3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgcmFjZVJlc3VsdHMgPSB7XG4gKiAgICAgICAgZmlyc3Q6ICdhbGljZScsXG4gKiAgICAgICAgc2Vjb25kOiAnamFrZSdcbiAqICAgICAgfTtcbiAqICAgICAgUi5pbnZlcnRPYmoocmFjZVJlc3VsdHMpO1xuICogICAgICAvLz0+IHsgJ2FsaWNlJzogJ2ZpcnN0JywgJ2pha2UnOidzZWNvbmQnIH1cbiAqXG4gKiAgICAgIC8vIEFsdGVybmF0aXZlbHk6XG4gKiAgICAgIHZhciByYWNlUmVzdWx0cyA9IFsnYWxpY2UnLCAnamFrZSddO1xuICogICAgICBSLmludmVydE9iaihyYWNlUmVzdWx0cyk7XG4gKiAgICAgIC8vPT4geyAnYWxpY2UnOiAnMCcsICdqYWtlJzonMScgfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gaW52ZXJ0T2JqKG9iaikge1xuICB2YXIgcHJvcHMgPSBrZXlzKG9iaik7XG4gIHZhciBsZW4gPSBwcm9wcy5sZW5ndGg7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgb3V0ID0ge307XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpZHhdO1xuICAgIG91dFtvYmpba2V5XV0gPSBrZXk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzRnVuY3Rpb24nKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG5cbi8qKlxuICogVHVybnMgYSBuYW1lZCBtZXRob2Qgd2l0aCBhIHNwZWNpZmllZCBhcml0eSBpbnRvIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmVcbiAqIGNhbGxlZCBkaXJlY3RseSBzdXBwbGllZCB3aXRoIGFyZ3VtZW50cyBhbmQgYSB0YXJnZXQgb2JqZWN0LlxuICpcbiAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBjdXJyaWVkIGFuZCBhY2NlcHRzIGBhcml0eSArIDFgIHBhcmFtZXRlcnMgd2hlcmVcbiAqIHRoZSBmaW5hbCBwYXJhbWV0ZXIgaXMgdGhlIHRhcmdldCBvYmplY3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiAoYSAtPiBiIC0+IC4uLiAtPiBuIC0+IE9iamVjdCAtPiAqKVxuICogQHBhcmFtIHtOdW1iZXJ9IGFyaXR5IE51bWJlciBvZiBhcmd1bWVudHMgdGhlIHJldHVybmVkIGZ1bmN0aW9uIHNob3VsZCB0YWtlXG4gKiAgICAgICAgYmVmb3JlIHRoZSB0YXJnZXQgb2JqZWN0LlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBOYW1lIG9mIHRoZSBtZXRob2QgdG8gY2FsbC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzbGljZUZyb20gPSBSLmludm9rZXIoMSwgJ3NsaWNlJyk7XG4gKiAgICAgIHNsaWNlRnJvbSg2LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaGlqa2xtJ1xuICogICAgICB2YXIgc2xpY2VGcm9tNiA9IFIuaW52b2tlcigyLCAnc2xpY2UnKSg2KTtcbiAqICAgICAgc2xpY2VGcm9tNig4LCAnYWJjZGVmZ2hpamtsbScpOyAvLz0+ICdnaCdcbiAqIEBzeW1iIFIuaW52b2tlcigwLCAnbWV0aG9kJykobykgPSBvWydtZXRob2QnXSgpXG4gKiBAc3ltYiBSLmludm9rZXIoMSwgJ21ldGhvZCcpKGEsIG8pID0gb1snbWV0aG9kJ10oYSlcbiAqIEBzeW1iIFIuaW52b2tlcigyLCAnbWV0aG9kJykoYSwgYiwgbykgPSBvWydtZXRob2QnXShhLCBiKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gaW52b2tlcihhcml0eSwgbWV0aG9kKSB7XG4gIHJldHVybiBjdXJyeU4oYXJpdHkgKyAxLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzW2FyaXR5XTtcbiAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgX2lzRnVuY3Rpb24odGFyZ2V0W21ldGhvZF0pKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W21ldGhvZF0uYXBwbHkodGFyZ2V0LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGFyaXR5KSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcodGFyZ2V0KSArICcgZG9lcyBub3QgaGF2ZSBhIG1ldGhvZCBuYW1lZCBcIicgKyBtZXRob2QgKyAnXCInKTtcbiAgfSk7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBTZWUgaWYgYW4gb2JqZWN0IChgdmFsYCkgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHN1cHBsaWVkIGNvbnN0cnVjdG9yLiBUaGlzXG4gKiBmdW5jdGlvbiB3aWxsIGNoZWNrIHVwIHRoZSBpbmhlcml0YW5jZSBjaGFpbiwgaWYgYW55LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKCogLT4geyp9KSAtPiBhIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdG9yIEEgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaXMoT2JqZWN0LCB7fSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlzKE51bWJlciwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlzKE9iamVjdCwgMSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pcyhTdHJpbmcsICdzJyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlzKFN0cmluZywgbmV3IFN0cmluZygnJykpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pcyhPYmplY3QsIG5ldyBTdHJpbmcoJycpKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXMoT2JqZWN0LCAncycpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaXMoTnVtYmVyLCB7fSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGlzKEN0b3IsIHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBDdG9yIHx8IHZhbCBpbnN0YW5jZW9mIEN0b3I7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2lzQXJyYXkgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNTdHJpbmcnKTtcblxuXG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBpcyBzaW1pbGFyIHRvIGFuIGFycmF5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjUuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaGFzIGEgbnVtZXJpYyBsZW5ndGggcHJvcGVydHkgYW5kIGV4dHJlbWUgaW5kaWNlcyBkZWZpbmVkOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYwLjIzLjBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlzQXJyYXlMaWtlKFtdKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNBcnJheUxpa2UodHJ1ZSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc0FycmF5TGlrZSh7bGVuZ3RoOiAxMH0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaXNBcnJheUxpa2UoezA6ICd6ZXJvJywgOTogJ25pbmUnLCBsZW5ndGg6IDEwfSk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gaXNBcnJheUxpa2UoeCkge1xuICBpZiAoX2lzQXJyYXkoeCkpIHsgcmV0dXJuIHRydWU7IH1cbiAgaWYgKCF4KSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAodHlwZW9mIHggIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoX2lzU3RyaW5nKHgpKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoeC5ub2RlVHlwZSA9PT0gMSkgeyByZXR1cm4gISF4Lmxlbmd0aDsgfVxuICBpZiAoeC5sZW5ndGggPT09IDApIHsgcmV0dXJuIHRydWU7IH1cbiAgaWYgKHgubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB4Lmhhc093blByb3BlcnR5KDApICYmIHguaGFzT3duUHJvcGVydHkoeC5sZW5ndGggLSAxKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgZW1wdHkgPSByZXF1aXJlKCcuL2VtcHR5Jyk7XG52YXIgZXF1YWxzID0gcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBpdHMgdHlwZSdzIGVtcHR5IHZhbHVlOyBgZmFsc2VgXG4gKiBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuZW1wdHlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlzRW1wdHkoWzEsIDIsIDNdKTsgICAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaXNFbXB0eShbXSk7ICAgICAgICAgIC8vPT4gdHJ1ZVxuICogICAgICBSLmlzRW1wdHkoJycpOyAgICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgUi5pc0VtcHR5KG51bGwpOyAgICAgICAgLy89PiBmYWxzZVxuICogICAgICBSLmlzRW1wdHkoe30pOyAgICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgUi5pc0VtcHR5KHtsZW5ndGg6IDB9KTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gaXNFbXB0eSh4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgZXF1YWxzKHgsIGVtcHR5KHgpKTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHggVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGlzIGB1bmRlZmluZWRgIG9yIGBudWxsYCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pc05pbChudWxsKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNOaWwodW5kZWZpbmVkKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNOaWwoMCk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc05pbChbXSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGlzTmlsKHgpIHsgcmV0dXJuIHggPT0gbnVsbDsgfSk7XG4iLCJ2YXIgaW52b2tlciA9IHJlcXVpcmUoJy4vaW52b2tlcicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyBtYWRlIGJ5IGluc2VydGluZyB0aGUgYHNlcGFyYXRvcmAgYmV0d2VlbiBlYWNoIGVsZW1lbnQgYW5kXG4gKiBjb25jYXRlbmF0aW5nIGFsbCB0aGUgZWxlbWVudHMgaW50byBhIHNpbmdsZSBzdHJpbmcuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBTdHJpbmcgLT4gW2FdIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBzZXBhcmF0b3IgVGhlIHN0cmluZyB1c2VkIHRvIHNlcGFyYXRlIHRoZSBlbGVtZW50cy5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBlbGVtZW50cyB0byBqb2luIGludG8gYSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIG1hZGUgYnkgY29uY2F0ZW5hdGluZyBgeHNgIHdpdGggYHNlcGFyYXRvcmAuXG4gKiBAc2VlIFIuc3BsaXRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc3BhY2VyID0gUi5qb2luKCcgJyk7XG4gKiAgICAgIHNwYWNlcihbJ2EnLCAyLCAzLjRdKTsgICAvLz0+ICdhIDIgMy40J1xuICogICAgICBSLmpvaW4oJ3wnLCBbMSwgMiwgM10pOyAgICAvLz0+ICcxfDJ8MydcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBpbnZva2VyKDEsICdqb2luJyk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIGNvbnZlcmdlID0gcmVxdWlyZSgnLi9jb252ZXJnZScpO1xuXG5cbi8qKlxuICoganV4dCBhcHBsaWVzIGEgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYSBsaXN0IG9mIHZhbHVlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgWyhhLCBiLCAuLi4sIG0pIC0+IG5dIC0+ICgoYSwgYiwgLi4uLCBtKSAtPiBbbl0pXG4gKiBAcGFyYW0ge0FycmF5fSBmbnMgQW4gYXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBsaXN0IG9mIHZhbHVlcyBhZnRlciBhcHBseWluZyBlYWNoIG9mIHRoZSBvcmlnaW5hbCBgZm5zYCB0byBpdHMgcGFyYW1ldGVycy5cbiAqIEBzZWUgUi5hcHBseVNwZWNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ2V0UmFuZ2UgPSBSLmp1eHQoW01hdGgubWluLCBNYXRoLm1heF0pO1xuICogICAgICBnZXRSYW5nZSgzLCA0LCA5LCAtMyk7IC8vPT4gWy0zLCA5XVxuICogQHN5bWIgUi5qdXh0KFtmLCBnLCBoXSkoYSwgYikgPSBbZihhLCBiKSwgZyhhLCBiKSwgaChhLCBiKV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGp1eHQoZm5zKSB7XG4gIHJldHVybiBjb252ZXJnZShmdW5jdGlvbigpIHsgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7IH0sIGZucyk7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX2hhcyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xudmFyIF9pc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJndW1lbnRzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBjb250YWluaW5nIHRoZSBuYW1lcyBvZiBhbGwgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgb2ZcbiAqIHRoZSBzdXBwbGllZCBvYmplY3QuXG4gKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudFxuICogYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiBba11cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHByb3BlcnRpZXMgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmtleXMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIC8vIGNvdmVyIElFIDwgOSBrZXlzIGlzc3Vlc1xuICB2YXIgaGFzRW51bUJ1ZyA9ICEoe3RvU3RyaW5nOiBudWxsfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG4gIHZhciBub25FbnVtZXJhYmxlUHJvcHMgPSBbJ2NvbnN0cnVjdG9yJywgJ3ZhbHVlT2YnLCAnaXNQcm90b3R5cGVPZicsICd0b1N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2hhc093blByb3BlcnR5JywgJ3RvTG9jYWxlU3RyaW5nJ107XG4gIC8vIFNhZmFyaSBidWdcbiAgdmFyIGhhc0FyZ3NFbnVtQnVnID0gKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4gYXJndW1lbnRzLnByb3BlcnR5SXNFbnVtZXJhYmxlKCdsZW5ndGgnKTtcbiAgfSgpKTtcblxuICB2YXIgY29udGFpbnMgPSBmdW5jdGlvbiBjb250YWlucyhsaXN0LCBpdGVtKSB7XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICBpZiAobGlzdFtpZHhdID09PSBpdGVtKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmICFoYXNBcmdzRW51bUJ1ZyA/XG4gICAgX2N1cnJ5MShmdW5jdGlvbiBrZXlzKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdChvYmopICE9PSBvYmogPyBbXSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfSkgOlxuICAgIF9jdXJyeTEoZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgICAgIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wLCBuSWR4O1xuICAgICAgdmFyIGtzID0gW107XG4gICAgICB2YXIgY2hlY2tBcmdzTGVuZ3RoID0gaGFzQXJnc0VudW1CdWcgJiYgX2lzQXJndW1lbnRzKG9iaik7XG4gICAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmIChfaGFzKHByb3AsIG9iaikgJiYgKCFjaGVja0FyZ3NMZW5ndGggfHwgcHJvcCAhPT0gJ2xlbmd0aCcpKSB7XG4gICAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChoYXNFbnVtQnVnKSB7XG4gICAgICAgIG5JZHggPSBub25FbnVtZXJhYmxlUHJvcHMubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKG5JZHggPj0gMCkge1xuICAgICAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbklkeF07XG4gICAgICAgICAgaWYgKF9oYXMocHJvcCwgb2JqKSAmJiAhY29udGFpbnMoa3MsIHByb3ApKSB7XG4gICAgICAgICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbklkeCAtPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ga3M7XG4gICAgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IGNvbnRhaW5pbmcgdGhlIG5hbWVzIG9mIGFsbCB0aGUgcHJvcGVydGllcyBvZiB0aGUgc3VwcGxpZWRcbiAqIG9iamVjdCwgaW5jbHVkaW5nIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnRcbiAqIGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7azogdn0gLT4gW2tdXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBwcm9wZXJ0aWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgb2JqZWN0J3Mgb3duIGFuZCBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgRiA9IGZ1bmN0aW9uKCkgeyB0aGlzLnggPSAnWCc7IH07XG4gKiAgICAgIEYucHJvdG90eXBlLnkgPSAnWSc7XG4gKiAgICAgIHZhciBmID0gbmV3IEYoKTtcbiAqICAgICAgUi5rZXlzSW4oZik7IC8vPT4gWyd4JywgJ3knXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24ga2V5c0luKG9iaikge1xuICB2YXIgcHJvcDtcbiAgdmFyIGtzID0gW107XG4gIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgfVxuICByZXR1cm4ga3M7XG59KTtcbiIsInZhciBudGggPSByZXF1aXJlKCcuL250aCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjRcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBhIHwgVW5kZWZpbmVkXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5pbml0LCBSLmhlYWQsIFIudGFpbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubGFzdChbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiAnZnVtJ1xuICogICAgICBSLmxhc3QoW10pOyAvLz0+IHVuZGVmaW5lZFxuICpcbiAqICAgICAgUi5sYXN0KCdhYmMnKTsgLy89PiAnYydcbiAqICAgICAgUi5sYXN0KCcnKTsgLy89PiAnJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IG50aCgtMSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcnJheScpO1xudmFyIGVxdWFscyA9IHJlcXVpcmUoJy4vZXF1YWxzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksIG9yIC0xIGlmXG4gKiB0aGUgaXRlbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGFycmF5LiBgUi5lcXVhbHNgIGlzIHVzZWQgdG8gZGV0ZXJtaW5lXG4gKiBlcXVhbGl0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIGl0ZW0gdG8gZmluZC5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBhcnJheSB0byBzZWFyY2ggaW4uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBpbmRleCBvZiB0aGUgdGFyZ2V0LCBvciAtMSBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBmb3VuZC5cbiAqIEBzZWUgUi5pbmRleE9mXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sYXN0SW5kZXhPZigzLCBbLTEsMywzLDAsMSwyLDMsNF0pOyAvLz0+IDZcbiAqICAgICAgUi5sYXN0SW5kZXhPZigxMCwgWzEsMiwzLDRdKTsgLy89PiAtMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbGFzdEluZGV4T2YodGFyZ2V0LCB4cykge1xuICBpZiAodHlwZW9mIHhzLmxhc3RJbmRleE9mID09PSAnZnVuY3Rpb24nICYmICFfaXNBcnJheSh4cykpIHtcbiAgICByZXR1cm4geHMubGFzdEluZGV4T2YodGFyZ2V0KTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaWR4ID0geHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgIGlmIChlcXVhbHMoeHNbaWR4XSwgdGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgaWR4IC09IDE7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9pc051bWJlciA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzTnVtYmVyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGFycmF5IGJ5IHJldHVybmluZyBgbGlzdC5sZW5ndGhgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sZW5ndGgoW10pOyAvLz0+IDBcbiAqICAgICAgUi5sZW5ndGgoWzEsIDIsIDNdKTsgLy89PiAzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBsZW5ndGgobGlzdCkge1xuICByZXR1cm4gbGlzdCAhPSBudWxsICYmIF9pc051bWJlcihsaXN0Lmxlbmd0aCkgPyBsaXN0Lmxlbmd0aCA6IE5hTjtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBtYXAgPSByZXF1aXJlKCcuL21hcCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGxlbnMgZm9yIHRoZSBnaXZlbiBnZXR0ZXIgYW5kIHNldHRlciBmdW5jdGlvbnMuIFRoZSBnZXR0ZXIgXCJnZXRzXCJcbiAqIHRoZSB2YWx1ZSBvZiB0aGUgZm9jdXM7IHRoZSBzZXR0ZXIgXCJzZXRzXCIgdGhlIHZhbHVlIG9mIHRoZSBmb2N1cy4gVGhlIHNldHRlclxuICogc2hvdWxkIG5vdCBtdXRhdGUgdGhlIGRhdGEgc3RydWN0dXJlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgKHMgLT4gYSkgLT4gKChhLCBzKSAtPiBzKSAtPiBMZW5zIHMgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXR0ZXJcbiAqIEByZXR1cm4ge0xlbnN9XG4gKiBAc2VlIFIudmlldywgUi5zZXQsIFIub3ZlciwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeExlbnMgPSBSLmxlbnMoUi5wcm9wKCd4JyksIFIuYXNzb2MoJ3gnKSk7XG4gKlxuICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAgICAgICAgICAgLy89PiAxXG4gKiAgICAgIFIuc2V0KHhMZW5zLCA0LCB7eDogMSwgeTogMn0pOyAgICAgICAgICAvLz0+IHt4OiA0LCB5OiAyfVxuICogICAgICBSLm92ZXIoeExlbnMsIFIubmVnYXRlLCB7eDogMSwgeTogMn0pOyAgLy89PiB7eDogLTEsIHk6IDJ9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBsZW5zKGdldHRlciwgc2V0dGVyKSB7XG4gIHJldHVybiBmdW5jdGlvbih0b0Z1bmN0b3JGbikge1xuICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIHJldHVybiBtYXAoXG4gICAgICAgIGZ1bmN0aW9uKGZvY3VzKSB7XG4gICAgICAgICAgcmV0dXJuIHNldHRlcihmb2N1cywgdGFyZ2V0KTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9GdW5jdG9yRm4oZ2V0dGVyKHRhcmdldCkpXG4gICAgICApO1xuICAgIH07XG4gIH07XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgbGVucyA9IHJlcXVpcmUoJy4vbGVucycpO1xudmFyIG50aCA9IHJlcXVpcmUoJy4vbnRoJyk7XG52YXIgdXBkYXRlID0gcmVxdWlyZSgnLi91cGRhdGUnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsZW5zIHdob3NlIGZvY3VzIGlzIHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgTnVtYmVyIC0+IExlbnMgcyBhXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7TGVuc31cbiAqIEBzZWUgUi52aWV3LCBSLnNldCwgUi5vdmVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGhlYWRMZW5zID0gUi5sZW5zSW5kZXgoMCk7XG4gKlxuICogICAgICBSLnZpZXcoaGVhZExlbnMsIFsnYScsICdiJywgJ2MnXSk7ICAgICAgICAgICAgLy89PiAnYSdcbiAqICAgICAgUi5zZXQoaGVhZExlbnMsICd4JywgWydhJywgJ2InLCAnYyddKTsgICAgICAgIC8vPT4gWyd4JywgJ2InLCAnYyddXG4gKiAgICAgIFIub3ZlcihoZWFkTGVucywgUi50b1VwcGVyLCBbJ2EnLCAnYicsICdjJ10pOyAvLz0+IFsnQScsICdiJywgJ2MnXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gbGVuc0luZGV4KG4pIHtcbiAgcmV0dXJuIGxlbnMobnRoKG4pLCB1cGRhdGUobikpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIGFzc29jUGF0aCA9IHJlcXVpcmUoJy4vYXNzb2NQYXRoJyk7XG52YXIgbGVucyA9IHJlcXVpcmUoJy4vbGVucycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuL3BhdGgnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsZW5zIHdob3NlIGZvY3VzIGlzIHRoZSBzcGVjaWZpZWQgcGF0aC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAdHlwZWRlZm4gSWR4ID0gU3RyaW5nIHwgSW50XG4gKiBAdHlwZWRlZm4gTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICogQHNpZyBbSWR4XSAtPiBMZW5zIHMgYVxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCB0byB1c2UuXG4gKiBAcmV0dXJuIHtMZW5zfVxuICogQHNlZSBSLnZpZXcsIFIuc2V0LCBSLm92ZXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeEhlYWRZTGVucyA9IFIubGVuc1BhdGgoWyd4JywgMCwgJ3knXSk7XG4gKlxuICogICAgICBSLnZpZXcoeEhlYWRZTGVucywge3g6IFt7eTogMiwgejogM30sIHt5OiA0LCB6OiA1fV19KTtcbiAqICAgICAgLy89PiAyXG4gKiAgICAgIFIuc2V0KHhIZWFkWUxlbnMsIDEsIHt4OiBbe3k6IDIsIHo6IDN9LCB7eTogNCwgejogNX1dfSk7XG4gKiAgICAgIC8vPT4ge3g6IFt7eTogMSwgejogM30sIHt5OiA0LCB6OiA1fV19XG4gKiAgICAgIFIub3Zlcih4SGVhZFlMZW5zLCBSLm5lZ2F0ZSwge3g6IFt7eTogMiwgejogM30sIHt5OiA0LCB6OiA1fV19KTtcbiAqICAgICAgLy89PiB7eDogW3t5OiAtMiwgejogM30sIHt5OiA0LCB6OiA1fV19XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBsZW5zUGF0aChwKSB7XG4gIHJldHVybiBsZW5zKHBhdGgocCksIGFzc29jUGF0aChwKSk7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgYXNzb2MgPSByZXF1aXJlKCcuL2Fzc29jJyk7XG52YXIgbGVucyA9IHJlcXVpcmUoJy4vbGVucycpO1xudmFyIHByb3AgPSByZXF1aXJlKCcuL3Byb3AnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsZW5zIHdob3NlIGZvY3VzIGlzIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgU3RyaW5nIC0+IExlbnMgcyBhXG4gKiBAcGFyYW0ge1N0cmluZ30ga1xuICogQHJldHVybiB7TGVuc31cbiAqIEBzZWUgUi52aWV3LCBSLnNldCwgUi5vdmVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICpcbiAqICAgICAgUi52aWV3KHhMZW5zLCB7eDogMSwgeTogMn0pOyAgICAgICAgICAgIC8vPT4gMVxuICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAqICAgICAgUi5vdmVyKHhMZW5zLCBSLm5lZ2F0ZSwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IC0xLCB5OiAyfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gbGVuc1Byb3Aoaykge1xuICByZXR1cm4gbGVucyhwcm9wKGspLCBhc3NvYyhrKSk7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgbGlmdE4gPSByZXF1aXJlKCcuL2xpZnROJyk7XG5cblxuLyoqXG4gKiBcImxpZnRzXCIgYSBmdW5jdGlvbiBvZiBhcml0eSA+IDEgc28gdGhhdCBpdCBtYXkgXCJtYXAgb3ZlclwiIGEgbGlzdCwgRnVuY3Rpb24gb3Igb3RoZXJcbiAqIG9iamVjdCB0aGF0IHNhdGlzZmllcyB0aGUgW0ZhbnRhc3lMYW5kIEFwcGx5IHNwZWNdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjYXBwbHkpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjcuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqLi4uIC0+ICopIC0+IChbKl0uLi4gLT4gWypdKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGxpZnQgaW50byBoaWdoZXIgY29udGV4dFxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBsaWZ0ZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIubGlmdE5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbWFkZDMgPSBSLmxpZnQoKGEsIGIsIGMpID0+IGEgKyBiICsgYyk7XG4gKlxuICogICAgICBtYWRkMyhbMSwyLDNdLCBbMSwyLDNdLCBbMV0pOyAvLz0+IFszLCA0LCA1LCA0LCA1LCA2LCA1LCA2LCA3XVxuICpcbiAqICAgICAgdmFyIG1hZGQ1ID0gUi5saWZ0KChhLCBiLCBjLCBkLCBlKSA9PiBhICsgYiArIGMgKyBkICsgZSk7XG4gKlxuICogICAgICBtYWRkNShbMSwyXSwgWzNdLCBbNCwgNV0sIFs2XSwgWzcsIDhdKTsgLy89PiBbMjEsIDIyLCAyMiwgMjMsIDIyLCAyMywgMjMsIDI0XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gbGlmdChmbikge1xuICByZXR1cm4gbGlmdE4oZm4ubGVuZ3RoLCBmbik7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIGFwID0gcmVxdWlyZSgnLi9hcCcpO1xudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJy4vY3VycnlOJyk7XG52YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAnKTtcblxuXG4vKipcbiAqIFwibGlmdHNcIiBhIGZ1bmN0aW9uIHRvIGJlIHRoZSBzcGVjaWZpZWQgYXJpdHksIHNvIHRoYXQgaXQgbWF5IFwibWFwIG92ZXJcIiB0aGF0XG4gKiBtYW55IGxpc3RzLCBGdW5jdGlvbnMgb3Igb3RoZXIgb2JqZWN0cyB0aGF0IHNhdGlzZnkgdGhlIFtGYW50YXN5TGFuZCBBcHBseSBzcGVjXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2FwcGx5KS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCouLi4gLT4gKikgLT4gKFsqXS4uLiAtPiBbKl0pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbGlmdCBpbnRvIGhpZ2hlciBjb250ZXh0XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGxpZnRlZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5saWZ0LCBSLmFwXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1hZGQzID0gUi5saWZ0TigzLCAoLi4uYXJncykgPT4gUi5zdW0oYXJncykpO1xuICogICAgICBtYWRkMyhbMSwyLDNdLCBbMSwyLDNdLCBbMV0pOyAvLz0+IFszLCA0LCA1LCA0LCA1LCA2LCA1LCA2LCA3XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbGlmdE4oYXJpdHksIGZuKSB7XG4gIHZhciBsaWZ0ZWQgPSBjdXJyeU4oYXJpdHksIGZuKTtcbiAgcmV0dXJuIGN1cnJ5Tihhcml0eSwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF9yZWR1Y2UoYXAsIG1hcChsaWZ0ZWQsIGFyZ3VtZW50c1swXSksIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB9KTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZDsgYGZhbHNlYFxuICogb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5ndFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubHQoMiwgMSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5sdCgyLCAyKTsgLy89PiBmYWxzZVxuICogICAgICBSLmx0KDIsIDMpOyAvLz0+IHRydWVcbiAqICAgICAgUi5sdCgnYScsICd6Jyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmx0KCd6JywgJ2EnKTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbHQoYSwgYikgeyByZXR1cm4gYSA8IGI7IH0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNlY29uZDtcbiAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuZ3RlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sdGUoMiwgMSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5sdGUoMiwgMik7IC8vPT4gdHJ1ZVxuICogICAgICBSLmx0ZSgyLCAzKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubHRlKCdhJywgJ3onKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubHRlKCd6JywgJ2EnKTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbHRlKGEsIGIpIHsgcmV0dXJuIGEgPD0gYjsgfSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfbWFwID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFwJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIF94bWFwID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feG1hcCcpO1xudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJy4vY3VycnlOJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBhbmRcbiAqIGEgW2Z1bmN0b3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjZnVuY3RvciksXG4gKiBhcHBsaWVzIHRoZSBmdW5jdGlvbiB0byBlYWNoIG9mIHRoZSBmdW5jdG9yJ3MgdmFsdWVzLCBhbmQgcmV0dXJuc1xuICogYSBmdW5jdG9yIG9mIHRoZSBzYW1lIHNoYXBlLlxuICpcbiAqIFJhbWRhIHByb3ZpZGVzIHN1aXRhYmxlIGBtYXBgIGltcGxlbWVudGF0aW9ucyBmb3IgYEFycmF5YCBhbmQgYE9iamVjdGAsXG4gKiBzbyB0aGlzIGZ1bmN0aW9uIG1heSBiZSBhcHBsaWVkIHRvIGBbMSwgMiwgM11gIG9yIGB7eDogMSwgeTogMiwgejogM31gLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBtYXBgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBBbHNvIHRyZWF0cyBmdW5jdGlvbnMgYXMgZnVuY3RvcnMgYW5kIHdpbGwgY29tcG9zZSB0aGVtIHRvZ2V0aGVyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgRnVuY3RvciBmID0+IChhIC0+IGIpIC0+IGYgYSAtPiBmIGJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgZWxlbWVudCBvZiB0aGUgaW5wdXQgYGxpc3RgLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBiZSBpdGVyYXRlZCBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBuZXcgbGlzdC5cbiAqIEBzZWUgUi50cmFuc2R1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZG91YmxlID0geCA9PiB4ICogMjtcbiAqXG4gKiAgICAgIFIubWFwKGRvdWJsZSwgWzEsIDIsIDNdKTsgLy89PiBbMiwgNCwgNl1cbiAqXG4gKiAgICAgIFIubWFwKGRvdWJsZSwge3g6IDEsIHk6IDIsIHo6IDN9KTsgLy89PiB7eDogMiwgeTogNCwgejogNn1cbiAqIEBzeW1iIFIubWFwKGYsIFthLCBiXSkgPSBbZihhKSwgZihiKV1cbiAqIEBzeW1iIFIubWFwKGYsIHsgeDogYSwgeTogYiB9KSA9IHsgeDogZihhKSwgeTogZihiKSB9XG4gKiBAc3ltYiBSLm1hcChmLCBmdW5jdG9yX28pID0gZnVuY3Rvcl9vLm1hcChmKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZShbJ21hcCddLCBfeG1hcCwgZnVuY3Rpb24gbWFwKGZuLCBmdW5jdG9yKSB7XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBGdW5jdGlvbl0nOlxuICAgICAgcmV0dXJuIGN1cnJ5TihmdW5jdG9yLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGZ1bmN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICB9KTtcbiAgICBjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuICAgICAgcmV0dXJuIF9yZWR1Y2UoZnVuY3Rpb24oYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBmbihmdW5jdG9yW2tleV0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30sIGtleXMoZnVuY3RvcikpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gX21hcChmbiwgZnVuY3Rvcik7XG4gIH1cbn0pKTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBUaGUgbWFwQWNjdW0gZnVuY3Rpb24gYmVoYXZlcyBsaWtlIGEgY29tYmluYXRpb24gb2YgbWFwIGFuZCByZWR1Y2U7IGl0XG4gKiBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IG9mIGEgbGlzdCwgcGFzc2luZyBhbiBhY2N1bXVsYXRpbmdcbiAqIHBhcmFtZXRlciBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5pbmcgYSBmaW5hbCB2YWx1ZSBvZiB0aGlzXG4gKiBhY2N1bXVsYXRvciB0b2dldGhlciB3aXRoIHRoZSBuZXcgbGlzdC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIGFyZ3VtZW50cywgKmFjYyogYW5kICp2YWx1ZSosIGFuZCBzaG91bGRcbiAqIHJldHVybiBhIHR1cGxlICpbYWNjLCB2YWx1ZV0qLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhY2MgLT4geCAtPiAoYWNjLCB5KSkgLT4gYWNjIC0+IFt4XSAtPiAoYWNjLCBbeV0pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5hZGRJbmRleCwgUi5tYXBBY2N1bVJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRpZ2l0cyA9IFsnMScsICcyJywgJzMnLCAnNCddO1xuICogICAgICB2YXIgYXBwZW5kZXIgPSAoYSwgYikgPT4gW2EgKyBiLCBhICsgYl07XG4gKlxuICogICAgICBSLm1hcEFjY3VtKGFwcGVuZGVyLCAwLCBkaWdpdHMpOyAvLz0+IFsnMDEyMzQnLCBbJzAxJywgJzAxMicsICcwMTIzJywgJzAxMjM0J11dXG4gKiBAc3ltYiBSLm1hcEFjY3VtKGYsIGEsIFtiLCBjLCBkXSkgPSBbXG4gKiAgIGYoZihmKGEsIGIpWzBdLCBjKVswXSwgZClbMF0sXG4gKiAgIFtcbiAqICAgICBmKGEsIGIpWzFdLFxuICogICAgIGYoZihhLCBiKVswXSwgYylbMV0sXG4gKiAgICAgZihmKGYoYSwgYilbMF0sIGMpWzBdLCBkKVsxXVxuICogICBdXG4gKiBdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBtYXBBY2N1bShmbiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIHR1cGxlID0gW2FjY107XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB0dXBsZSA9IGZuKHR1cGxlWzBdLCBsaXN0W2lkeF0pO1xuICAgIHJlc3VsdFtpZHhdID0gdHVwbGVbMV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIFt0dXBsZVswXSwgcmVzdWx0XTtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIFRoZSBtYXBBY2N1bVJpZ2h0IGZ1bmN0aW9uIGJlaGF2ZXMgbGlrZSBhIGNvbWJpbmF0aW9uIG9mIG1hcCBhbmQgcmVkdWNlOyBpdFxuICogYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBvZiBhIGxpc3QsIHBhc3NpbmcgYW4gYWNjdW11bGF0aW5nXG4gKiBwYXJhbWV0ZXIgZnJvbSByaWdodCB0byBsZWZ0LCBhbmQgcmV0dXJuaW5nIGEgZmluYWwgdmFsdWUgb2YgdGhpc1xuICogYWNjdW11bGF0b3IgdG9nZXRoZXIgd2l0aCB0aGUgbmV3IGxpc3QuXG4gKlxuICogU2ltaWxhciB0byBgbWFwQWNjdW1gLCBleGNlcHQgbW92ZXMgdGhyb3VnaCB0aGUgaW5wdXQgbGlzdCBmcm9tIHRoZSByaWdodCB0b1xuICogdGhlIGxlZnQuXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byBhcmd1bWVudHMsICp2YWx1ZSogYW5kICphY2MqLCBhbmQgc2hvdWxkXG4gKiByZXR1cm4gYSB0dXBsZSAqW3ZhbHVlLCBhY2NdKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoeC0+IGFjYyAtPiAoeSwgYWNjKSkgLT4gYWNjIC0+IFt4XSAtPiAoW3ldLCBhY2MpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5hZGRJbmRleCwgUi5tYXBBY2N1bVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkaWdpdHMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAqICAgICAgdmFyIGFwcGVuZCA9IChhLCBiKSA9PiBbYSArIGIsIGEgKyBiXTtcbiAqXG4gKiAgICAgIFIubWFwQWNjdW1SaWdodChhcHBlbmQsIDUsIGRpZ2l0cyk7IC8vPT4gW1snMTIzNDUnLCAnMjM0NScsICczNDUnLCAnNDUnXSwgJzEyMzQ1J11cbiAqIEBzeW1iIFIubWFwQWNjdW1SaWdodChmLCBhLCBbYiwgYywgZF0pID0gW1xuICogICBbXG4gKiAgICAgZihiLCBmKGMsIGYoZCwgYSlbMF0pWzBdKVsxXSxcbiAqICAgICBmKGMsIGYoZCwgYSlbMF0pWzFdLFxuICogICAgIGYoZCwgYSlbMV0sXG4gKiAgIF1cbiAqICAgZihiLCBmKGMsIGYoZCwgYSlbMF0pWzBdKVswXSxcbiAqIF1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKGZ1bmN0aW9uIG1hcEFjY3VtUmlnaHQoZm4sIGFjYywgbGlzdCkge1xuICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciB0dXBsZSA9IFthY2NdO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICB0dXBsZSA9IGZuKGxpc3RbaWR4XSwgdHVwbGVbMF0pO1xuICAgIHJlc3VsdFtpZHhdID0gdHVwbGVbMV07XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIFtyZXN1bHQsIHR1cGxlWzBdXTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfcmVkdWNlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG5cbi8qKlxuICogQW4gT2JqZWN0LXNwZWNpZmljIHZlcnNpb24gb2YgYG1hcGAuIFRoZSBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRocmVlXG4gKiBhcmd1bWVudHM6ICoodmFsdWUsIGtleSwgb2JqKSouIElmIG9ubHkgdGhlIHZhbHVlIGlzIHNpZ25pZmljYW50LCB1c2VcbiAqIGBtYXBgIGluc3RlYWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoKiwgU3RyaW5nLCBPYmplY3QpIC0+ICopIC0+IE9iamVjdCAtPiBPYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIubWFwXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHZhbHVlcyA9IHsgeDogMSwgeTogMiwgejogMyB9O1xuICogICAgICB2YXIgcHJlcGVuZEtleUFuZERvdWJsZSA9IChudW0sIGtleSwgb2JqKSA9PiBrZXkgKyAobnVtICogMik7XG4gKlxuICogICAgICBSLm1hcE9iakluZGV4ZWQocHJlcGVuZEtleUFuZERvdWJsZSwgdmFsdWVzKTsgLy89PiB7IHg6ICd4MicsIHk6ICd5NCcsIHo6ICd6NicgfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbWFwT2JqSW5kZXhlZChmbiwgb2JqKSB7XG4gIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uKGFjYywga2V5KSB7XG4gICAgYWNjW2tleV0gPSBmbihvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9LCBrZXlzKG9iaikpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogVGVzdHMgYSByZWd1bGFyIGV4cHJlc3Npb24gYWdhaW5zdCBhIFN0cmluZy4gTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gd2lsbFxuICogcmV0dXJuIGFuIGVtcHR5IGFycmF5IHdoZW4gdGhlcmUgYXJlIG5vIG1hdGNoZXMuIFRoaXMgZGlmZmVycyBmcm9tXG4gKiBbYFN0cmluZy5wcm90b3R5cGUubWF0Y2hgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvbWF0Y2gpXG4gKiB3aGljaCByZXR1cm5zIGBudWxsYCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBSZWdFeHAgLT4gU3RyaW5nIC0+IFtTdHJpbmcgfCBVbmRlZmluZWRdXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcnggQSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gbWF0Y2ggYWdhaW5zdFxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIG1hdGNoZXMgb3IgZW1wdHkgYXJyYXkuXG4gKiBAc2VlIFIudGVzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWF0Y2goLyhbYS16XWEpL2csICdiYW5hbmFzJyk7IC8vPT4gWydiYScsICduYScsICduYSddXG4gKiAgICAgIFIubWF0Y2goL2EvLCAnYicpOyAvLz0+IFtdXG4gKiAgICAgIFIubWF0Y2goL2EvLCBudWxsKTsgLy89PiBUeXBlRXJyb3I6IG51bGwgZG9lcyBub3QgaGF2ZSBhIG1ldGhvZCBuYW1lZCBcIm1hdGNoXCJcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIG1hdGNoKHJ4LCBzdHIpIHtcbiAgcmV0dXJuIHN0ci5tYXRjaChyeCkgfHwgW107XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2lzSW50ZWdlciA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzSW50ZWdlcicpO1xuXG5cbi8qKlxuICogbWF0aE1vZCBiZWhhdmVzIGxpa2UgdGhlIG1vZHVsbyBvcGVyYXRvciBzaG91bGQgbWF0aGVtYXRpY2FsbHksIHVubGlrZSB0aGVcbiAqIGAlYCBvcGVyYXRvciAoYW5kIGJ5IGV4dGVuc2lvbiwgUi5tb2R1bG8pLiBTbyB3aGlsZSBcIi0xNyAlIDVcIiBpcyAtMixcbiAqIG1hdGhNb2QoLTE3LCA1KSBpcyAzLiBtYXRoTW9kIHJlcXVpcmVzIEludGVnZXIgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBOYU5cbiAqIHdoZW4gdGhlIG1vZHVsdXMgaXMgemVybyBvciBuZWdhdGl2ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gbSBUaGUgZGl2aWRlbmQuXG4gKiBAcGFyYW0ge051bWJlcn0gcCB0aGUgbW9kdWx1cy5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYiBtb2QgYWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tYXRoTW9kKC0xNywgNSk7ICAvLz0+IDNcbiAqICAgICAgUi5tYXRoTW9kKDE3LCA1KTsgICAvLz0+IDJcbiAqICAgICAgUi5tYXRoTW9kKDE3LCAtNSk7ICAvLz0+IE5hTlxuICogICAgICBSLm1hdGhNb2QoMTcsIDApOyAgIC8vPT4gTmFOXG4gKiAgICAgIFIubWF0aE1vZCgxNy4yLCA1KTsgLy89PiBOYU5cbiAqICAgICAgUi5tYXRoTW9kKDE3LCA1LjMpOyAvLz0+IE5hTlxuICpcbiAqICAgICAgdmFyIGNsb2NrID0gUi5tYXRoTW9kKFIuX18sIDEyKTtcbiAqICAgICAgY2xvY2soMTUpOyAvLz0+IDNcbiAqICAgICAgY2xvY2soMjQpOyAvLz0+IDBcbiAqXG4gKiAgICAgIHZhciBzZXZlbnRlZW5Nb2QgPSBSLm1hdGhNb2QoMTcpO1xuICogICAgICBzZXZlbnRlZW5Nb2QoMyk7ICAvLz0+IDJcbiAqICAgICAgc2V2ZW50ZWVuTW9kKDQpOyAgLy89PiAxXG4gKiAgICAgIHNldmVudGVlbk1vZCgxMCk7IC8vPT4gN1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbWF0aE1vZChtLCBwKSB7XG4gIGlmICghX2lzSW50ZWdlcihtKSkgeyByZXR1cm4gTmFOOyB9XG4gIGlmICghX2lzSW50ZWdlcihwKSB8fCBwIDwgMSkgeyByZXR1cm4gTmFOOyB9XG4gIHJldHVybiAoKG0gJSBwKSArIHApICUgcDtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGxhcmdlciBvZiBpdHMgdHdvIGFyZ3VtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYVxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIubWF4QnksIFIubWluXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tYXgoNzg5LCAxMjMpOyAvLz0+IDc4OVxuICogICAgICBSLm1heCgnYScsICdiJyk7IC8vPT4gJ2InXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBtYXgoYSwgYikgeyByZXR1cm4gYiA+IGEgPyBiIDogYTsgfSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBhbmQgdHdvIHZhbHVlcywgYW5kIHJldHVybnMgd2hpY2hldmVyIHZhbHVlIHByb2R1Y2VzIHRoZVxuICogbGFyZ2VyIHJlc3VsdCB3aGVuIHBhc3NlZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOC4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGIgPT4gKGEgLT4gYikgLT4gYSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLm1heCwgUi5taW5CeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vICBzcXVhcmUgOjogTnVtYmVyIC0+IE51bWJlclxuICogICAgICB2YXIgc3F1YXJlID0gbiA9PiBuICogbjtcbiAqXG4gKiAgICAgIFIubWF4Qnkoc3F1YXJlLCAtMywgMik7IC8vPT4gLTNcbiAqXG4gKiAgICAgIFIucmVkdWNlKFIubWF4Qnkoc3F1YXJlKSwgMCwgWzMsIC01LCA0LCAxLCAtMl0pOyAvLz0+IC01XG4gKiAgICAgIFIucmVkdWNlKFIubWF4Qnkoc3F1YXJlKSwgMCwgW10pOyAvLz0+IDBcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKGZ1bmN0aW9uIG1heEJ5KGYsIGEsIGIpIHtcbiAgcmV0dXJuIGYoYikgPiBmKGEpID8gYiA6IGE7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgc3VtID0gcmVxdWlyZSgnLi9zdW0nKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1lYW4gb2YgdGhlIGdpdmVuIGxpc3Qgb2YgbnVtYmVycy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBbTnVtYmVyXSAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1lYW4oWzIsIDcsIDldKTsgLy89PiA2XG4gKiAgICAgIFIubWVhbihbXSk7IC8vPT4gTmFOXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBtZWFuKGxpc3QpIHtcbiAgcmV0dXJuIHN1bShsaXN0KSAvIGxpc3QubGVuZ3RoO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIG1lYW4gPSByZXF1aXJlKCcuL21lYW4nKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1lZGlhbiBvZiB0aGUgZ2l2ZW4gbGlzdCBvZiBudW1iZXJzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWVkaWFuKFsyLCA5LCA3XSk7IC8vPT4gN1xuICogICAgICBSLm1lZGlhbihbNywgMiwgMTAsIDldKTsgLy89PiA4XG4gKiAgICAgIFIubWVkaWFuKFtdKTsgLy89PiBOYU5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIG1lZGlhbihsaXN0KSB7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgaWYgKGxlbiA9PT0gMCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgdmFyIHdpZHRoID0gMiAtIGxlbiAlIDI7XG4gIHZhciBpZHggPSAobGVuIC0gd2lkdGgpIC8gMjtcbiAgcmV0dXJuIG1lYW4oQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICB9KS5zbGljZShpZHgsIGlkeCArIHdpZHRoKSk7XG59KTtcbiIsInZhciBfYXJpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xudmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfaGFzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQsIHdoZW4gaW52b2tlZCwgY2FjaGVzIHRoZSByZXN1bHQgb2YgY2FsbGluZyBgZm5gXG4gKiBmb3IgYSBnaXZlbiBhcmd1bWVudCBzZXQgYW5kIHJldHVybnMgdGhlIHJlc3VsdC4gU3Vic2VxdWVudCBjYWxscyB0byB0aGVcbiAqIG1lbW9pemVkIGBmbmAgd2l0aCB0aGUgc2FtZSBhcmd1bWVudCBzZXQgd2lsbCBub3QgcmVzdWx0IGluIGFuIGFkZGl0aW9uYWxcbiAqIGNhbGwgdG8gYGZuYDsgaW5zdGVhZCwgdGhlIGNhY2hlZCByZXN1bHQgZm9yIHRoYXQgc2V0IG9mIGFyZ3VtZW50cyB3aWxsIGJlXG4gKiByZXR1cm5lZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKi4uLiAtPiBhKSAtPiAoKi4uLiAtPiBhKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1lbW9pemUuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gTWVtb2l6ZWQgdmVyc2lvbiBvZiBgZm5gLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBjb3VudCA9IDA7XG4gKiAgICAgIHZhciBmYWN0b3JpYWwgPSBSLm1lbW9pemUobiA9PiB7XG4gKiAgICAgICAgY291bnQgKz0gMTtcbiAqICAgICAgICByZXR1cm4gUi5wcm9kdWN0KFIucmFuZ2UoMSwgbiArIDEpKTtcbiAqICAgICAgfSk7XG4gKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAqICAgICAgZmFjdG9yaWFsKDUpOyAvLz0+IDEyMFxuICogICAgICBmYWN0b3JpYWwoNSk7IC8vPT4gMTIwXG4gKiAgICAgIGNvdW50OyAvLz0+IDFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIG1lbW9pemUoZm4pIHtcbiAgdmFyIGNhY2hlID0ge307XG4gIHJldHVybiBfYXJpdHkoZm4ubGVuZ3RoLCBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5ID0gdG9TdHJpbmcoYXJndW1lbnRzKTtcbiAgICBpZiAoIV9oYXMoa2V5LCBjYWNoZSkpIHtcbiAgICAgIGNhY2hlW2tleV0gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVba2V5XTtcbiAgfSk7XG59KTtcbiIsInZhciBfYXNzaWduID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXNzaWduJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgZmlyc3Qgb2JqZWN0IG1lcmdlZCB3aXRoXG4gKiB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHNlY29uZCBvYmplY3QuIElmIGEga2V5IGV4aXN0cyBpbiBib3RoIG9iamVjdHMsXG4gKiB0aGUgdmFsdWUgZnJvbSB0aGUgc2Vjb25kIG9iamVjdCB3aWxsIGJlIHVzZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge09iamVjdH0gbFxuICogQHBhcmFtIHtPYmplY3R9IHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tZXJnZVdpdGgsIFIubWVyZ2VXaXRoS2V5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZXJnZSh7ICduYW1lJzogJ2ZyZWQnLCAnYWdlJzogMTAgfSwgeyAnYWdlJzogNDAgfSk7XG4gKiAgICAgIC8vPT4geyAnbmFtZSc6ICdmcmVkJywgJ2FnZSc6IDQwIH1cbiAqXG4gKiAgICAgIHZhciByZXNldFRvRGVmYXVsdCA9IFIubWVyZ2UoUi5fXywge3g6IDB9KTtcbiAqICAgICAgcmVzZXRUb0RlZmF1bHQoe3g6IDUsIHk6IDJ9KTsgLy89PiB7eDogMCwgeTogMn1cbiAqIEBzeW1iIFIubWVyZ2UoeyB4OiAxLCB5OiAyIH0sIHsgeTogNSwgejogMyB9KSA9IHsgeDogMSwgeTogNSwgejogMyB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBtZXJnZShsLCByKSB7XG4gIHJldHVybiBfYXNzaWduKHt9LCBsLCByKTtcbn0pO1xuIiwidmFyIF9hc3NpZ24gPSByZXF1aXJlKCcuL2ludGVybmFsL19hc3NpZ24nKTtcbnZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cblxuLyoqXG4gKiBNZXJnZXMgYSBsaXN0IG9mIG9iamVjdHMgdG9nZXRoZXIgaW50byBvbmUgb2JqZWN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFt7azogdn1dIC0+IHtrOiB2fVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBBbiBhcnJheSBvZiBvYmplY3RzXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbWVyZ2VkIG9iamVjdC5cbiAqIEBzZWUgUi5yZWR1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1lcmdlQWxsKFt7Zm9vOjF9LHtiYXI6Mn0se2JhejozfV0pOyAvLz0+IHtmb286MSxiYXI6MixiYXo6M31cbiAqICAgICAgUi5tZXJnZUFsbChbe2ZvbzoxfSx7Zm9vOjJ9LHtiYXI6Mn1dKTsgLy89PiB7Zm9vOjIsYmFyOjJ9XG4gKiBAc3ltYiBSLm1lcmdlQWxsKFt7IHg6IDEgfSwgeyB5OiAyIH0sIHsgejogMyB9XSkgPSB7IHg6IDEsIHk6IDIsIHo6IDMgfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gbWVyZ2VBbGwobGlzdCkge1xuICByZXR1cm4gX2Fzc2lnbi5hcHBseShudWxsLCBbe31dLmNvbmNhdChsaXN0KSk7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgbWVyZ2VXaXRoS2V5ID0gcmVxdWlyZSgnLi9tZXJnZVdpdGhLZXknKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHdpdGggdGhlIG93biBwcm9wZXJ0aWVzIG9mIHRoZSB0d28gcHJvdmlkZWQgb2JqZWN0cy4gSWZcbiAqIGEga2V5IGV4aXN0cyBpbiBib3RoIG9iamVjdHMsIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRoZSB2YWx1ZXNcbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5IGluIGVhY2ggb2JqZWN0LCB3aXRoIHRoZSByZXN1bHQgYmVpbmcgdXNlZCBhcyB0aGVcbiAqIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5IGluIHRoZSByZXR1cm5lZCBvYmplY3QuIFRoZSBrZXkgd2lsbCBiZVxuICogZXhjbHVkZWQgZnJvbSB0aGUgcmV0dXJuZWQgb2JqZWN0IGlmIHRoZSByZXN1bHRpbmcgdmFsdWUgaXMgYHVuZGVmaW5lZGAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoYSAtPiBhIC0+IGEpIC0+IHthfSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGxcbiAqIEBwYXJhbSB7T2JqZWN0fSByXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIubWVyZ2UsIFIubWVyZ2VXaXRoS2V5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZXJnZVdpdGgoUi5jb25jYXQsXG4gKiAgICAgICAgICAgICAgICAgIHsgYTogdHJ1ZSwgdmFsdWVzOiBbMTAsIDIwXSB9LFxuICogICAgICAgICAgICAgICAgICB7IGI6IHRydWUsIHZhbHVlczogWzE1LCAzNV0gfSk7XG4gKiAgICAgIC8vPT4geyBhOiB0cnVlLCBiOiB0cnVlLCB2YWx1ZXM6IFsxMCwgMjAsIDE1LCAzNV0gfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gbWVyZ2VXaXRoKGZuLCBsLCByKSB7XG4gIHJldHVybiBtZXJnZVdpdGhLZXkoZnVuY3Rpb24oXywgX2wsIF9yKSB7XG4gICAgcmV0dXJuIGZuKF9sLCBfcik7XG4gIH0sIGwsIHIpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIF9oYXMgPSByZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHdpdGggdGhlIG93biBwcm9wZXJ0aWVzIG9mIHRoZSB0d28gcHJvdmlkZWQgb2JqZWN0cy4gSWZcbiAqIGEga2V5IGV4aXN0cyBpbiBib3RoIG9iamVjdHMsIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRoZSBrZXlcbiAqIGFuZCB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5IGluIGVhY2ggb2JqZWN0LCB3aXRoIHRoZSByZXN1bHQgYmVpbmdcbiAqIHVzZWQgYXMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5IGluIHRoZSByZXR1cm5lZCBvYmplY3QuIFRoZSBrZXlcbiAqIHdpbGwgYmUgZXhjbHVkZWQgZnJvbSB0aGUgcmV0dXJuZWQgb2JqZWN0IGlmIHRoZSByZXN1bHRpbmcgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKFN0cmluZyAtPiBhIC0+IGEgLT4gYSkgLT4ge2F9IC0+IHthfSAtPiB7YX1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gbFxuICogQHBhcmFtIHtPYmplY3R9IHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tZXJnZSwgUi5tZXJnZVdpdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBsZXQgY29uY2F0VmFsdWVzID0gKGssIGwsIHIpID0+IGsgPT0gJ3ZhbHVlcycgPyBSLmNvbmNhdChsLCByKSA6IHJcbiAqICAgICAgUi5tZXJnZVdpdGhLZXkoY29uY2F0VmFsdWVzLFxuICogICAgICAgICAgICAgICAgICAgICB7IGE6IHRydWUsIHRoaW5nOiAnZm9vJywgdmFsdWVzOiBbMTAsIDIwXSB9LFxuICogICAgICAgICAgICAgICAgICAgICB7IGI6IHRydWUsIHRoaW5nOiAnYmFyJywgdmFsdWVzOiBbMTUsIDM1XSB9KTtcbiAqICAgICAgLy89PiB7IGE6IHRydWUsIGI6IHRydWUsIHRoaW5nOiAnYmFyJywgdmFsdWVzOiBbMTAsIDIwLCAxNSwgMzVdIH1cbiAqIEBzeW1iIFIubWVyZ2VXaXRoS2V5KGYsIHsgeDogMSwgeTogMiB9LCB7IHk6IDUsIHo6IDMgfSkgPSB7IHg6IDEsIHk6IGYoJ3knLCAyLCA1KSwgejogMyB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBtZXJnZVdpdGhLZXkoZm4sIGwsIHIpIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgaztcblxuICBmb3IgKGsgaW4gbCkge1xuICAgIGlmIChfaGFzKGssIGwpKSB7XG4gICAgICByZXN1bHRba10gPSBfaGFzKGssIHIpID8gZm4oaywgbFtrXSwgcltrXSkgOiBsW2tdO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoayBpbiByKSB7XG4gICAgaWYgKF9oYXMoaywgcikgJiYgIShfaGFzKGssIHJlc3VsdCkpKSB7XG4gICAgICByZXN1bHRba10gPSByW2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzbWFsbGVyIG9mIGl0cyB0d28gYXJndW1lbnRzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBhXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5taW5CeSwgUi5tYXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1pbig3ODksIDEyMyk7IC8vPT4gMTIzXG4gKiAgICAgIFIubWluKCdhJywgJ2InKTsgLy89PiAnYSdcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIG1pbihhLCBiKSB7IHJldHVybiBiIDwgYSA/IGIgOiBhOyB9KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGFuZCB0d28gdmFsdWVzLCBhbmQgcmV0dXJucyB3aGljaGV2ZXIgdmFsdWUgcHJvZHVjZXMgdGhlXG4gKiBzbWFsbGVyIHJlc3VsdCB3aGVuIHBhc3NlZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOC4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGIgPT4gKGEgLT4gYikgLT4gYSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLm1pbiwgUi5tYXhCeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vICBzcXVhcmUgOjogTnVtYmVyIC0+IE51bWJlclxuICogICAgICB2YXIgc3F1YXJlID0gbiA9PiBuICogbjtcbiAqXG4gKiAgICAgIFIubWluQnkoc3F1YXJlLCAtMywgMik7IC8vPT4gMlxuICpcbiAqICAgICAgUi5yZWR1Y2UoUi5taW5CeShzcXVhcmUpLCBJbmZpbml0eSwgWzMsIC01LCA0LCAxLCAtMl0pOyAvLz0+IDFcbiAqICAgICAgUi5yZWR1Y2UoUi5taW5CeShzcXVhcmUpLCBJbmZpbml0eSwgW10pOyAvLz0+IEluZmluaXR5XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBtaW5CeShmLCBhLCBiKSB7XG4gIHJldHVybiBmKGIpIDwgZihhKSA/IGIgOiBhO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogRGl2aWRlcyB0aGUgZmlyc3QgcGFyYW1ldGVyIGJ5IHRoZSBzZWNvbmQgYW5kIHJldHVybnMgdGhlIHJlbWFpbmRlci4gTm90ZVxuICogdGhhdCB0aGlzIGZ1bmN0aW9uIHByZXNlcnZlcyB0aGUgSmF2YVNjcmlwdC1zdHlsZSBiZWhhdmlvciBmb3IgbW9kdWxvLiBGb3JcbiAqIG1hdGhlbWF0aWNhbCBtb2R1bG8gc2VlIGBtYXRoTW9kYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgdmFsdWUgdG8gdGhlIGRpdmlkZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBwc2V1ZG8tbW9kdWx1c1xuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmVzdWx0IG9mIGBiICUgYWAuXG4gKiBAc2VlIFIubWF0aE1vZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubW9kdWxvKDE3LCAzKTsgLy89PiAyXG4gKiAgICAgIC8vIEpTIGJlaGF2aW9yOlxuICogICAgICBSLm1vZHVsbygtMTcsIDMpOyAvLz0+IC0yXG4gKiAgICAgIFIubW9kdWxvKDE3LCAtMyk7IC8vPT4gMlxuICpcbiAqICAgICAgdmFyIGlzT2RkID0gUi5tb2R1bG8oUi5fXywgMik7XG4gKiAgICAgIGlzT2RkKDQyKTsgLy89PiAwXG4gKiAgICAgIGlzT2RkKDIxKTsgLy89PiAxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBtb2R1bG8oYSwgYikgeyByZXR1cm4gYSAlIGI7IH0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG51bWJlcnMuIEVxdWl2YWxlbnQgdG8gYGEgKiBiYCBidXQgY3VycmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgc2Vjb25kIHZhbHVlLlxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmVzdWx0IG9mIGBhICogYmAuXG4gKiBAc2VlIFIuZGl2aWRlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRvdWJsZSA9IFIubXVsdGlwbHkoMik7XG4gKiAgICAgIHZhciB0cmlwbGUgPSBSLm11bHRpcGx5KDMpO1xuICogICAgICBkb3VibGUoMyk7ICAgICAgIC8vPT4gIDZcbiAqICAgICAgdHJpcGxlKDQpOyAgICAgICAvLz0+IDEyXG4gKiAgICAgIFIubXVsdGlwbHkoMiwgNSk7ICAvLz0+IDEwXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBtdWx0aXBseShhLCBiKSB7IHJldHVybiBhICogYjsgfSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiBvZiBhbnkgYXJpdHkgKGluY2x1ZGluZyBudWxsYXJ5KSBpbiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0c1xuICogZXhhY3RseSBgbmAgcGFyYW1ldGVycy4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlXG4gKiBzdXBwbGllZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBkZXNpcmVkIGFyaXR5IG9mIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyBgZm5gLiBUaGUgbmV3IGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgb2ZcbiAqICAgICAgICAgYXJpdHkgYG5gLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB0YWtlc1R3b0FyZ3MgPSAoYSwgYikgPT4gW2EsIGJdO1xuICpcbiAqICAgICAgdGFrZXNUd29BcmdzLmxlbmd0aDsgLy89PiAyXG4gKiAgICAgIHRha2VzVHdvQXJncygxLCAyKTsgLy89PiBbMSwgMl1cbiAqXG4gKiAgICAgIHZhciB0YWtlc09uZUFyZyA9IFIubkFyeSgxLCB0YWtlc1R3b0FyZ3MpO1xuICogICAgICB0YWtlc09uZUFyZy5sZW5ndGg7IC8vPT4gMVxuICogICAgICAvLyBPbmx5IGBuYCBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICogICAgICB0YWtlc09uZUFyZygxLCAyKTsgLy89PiBbMSwgdW5kZWZpbmVkXVxuICogQHN5bWIgUi5uQXJ5KDAsIGYpKGEsIGIpID0gZigpXG4gKiBAc3ltYiBSLm5BcnkoMSwgZikoYSwgYikgPSBmKGEpXG4gKiBAc3ltYiBSLm5BcnkoMiwgZikoYSwgYikgPSBmKGEsIGIpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBuQXJ5KG4sIGZuKSB7XG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uKCkge3JldHVybiBmbi5jYWxsKHRoaXMpO307XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYTApIHtyZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCk7fTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhMCwgYTEpIHtyZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEpO307XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMikge3JldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIpO307XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMpIHtyZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMyk7fTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQpIHtyZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQpO307XG4gICAgY2FzZSA2OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge3JldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO307XG4gICAgY2FzZSA3OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtyZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNik7fTtcbiAgICBjYXNlIDg6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHtyZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpO307XG4gICAgY2FzZSA5OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkge3JldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpO307XG4gICAgY2FzZSAxMDogcmV0dXJuIGZ1bmN0aW9uKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7cmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpO307XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBuQXJ5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gIH1cbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIE5lZ2F0ZXMgaXRzIGFyZ3VtZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm5lZ2F0ZSg0Mik7IC8vPT4gLTQyXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBuZWdhdGUobikgeyByZXR1cm4gLW47IH0pO1xuIiwidmFyIF9jb21wbGVtZW50ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29tcGxlbWVudCcpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX3hhbnkgPSByZXF1aXJlKCcuL2ludGVybmFsL194YW55Jyk7XG52YXIgYW55ID0gcmVxdWlyZSgnLi9hbnknKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIG5vIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsIGBmYWxzZWBcbiAqIG90aGVyd2lzZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYW55YCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgbm90IHNhdGlzZmllZCBieSBldmVyeSBlbGVtZW50LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBzZWUgUi5hbGwsIFIuYW55XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDA7XG4gKlxuICogICAgICBSLm5vbmUoaXNFdmVuLCBbMSwgMywgNSwgNywgOSwgMTFdKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubm9uZShpc0V2ZW4sIFsxLCAzLCA1LCA3LCA4LCAxMV0pOyAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfY29tcGxlbWVudChfZGlzcGF0Y2hhYmxlKFsnYW55J10sIF94YW55LCBhbnkpKSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGAhYCBvZiBpdHMgYXJndW1lbnQuIEl0IHdpbGwgcmV0dXJuIGB0cnVlYCB3aGVuXG4gKiBwYXNzZWQgZmFsc2UteSB2YWx1ZSwgYW5kIGBmYWxzZWAgd2hlbiBwYXNzZWQgYSB0cnV0aC15IG9uZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAqIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gYSBhbnkgdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRoZSBsb2dpY2FsIGludmVyc2Ugb2YgcGFzc2VkIGFyZ3VtZW50LlxuICogQHNlZSBSLmNvbXBsZW1lbnRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm5vdCh0cnVlKTsgLy89PiBmYWxzZVxuICogICAgICBSLm5vdChmYWxzZSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLm5vdCgwKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubm90KDEpOyAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBub3QoYSkge1xuICByZXR1cm4gIWE7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2lzU3RyaW5nID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNTdHJpbmcnKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG50aCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZy4gSWYgbiBpcyBuZWdhdGl2ZSB0aGVcbiAqIGVsZW1lbnQgYXQgaW5kZXggbGVuZ3RoICsgbiBpcyByZXR1cm5lZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldFxuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsaXN0ID0gWydmb28nLCAnYmFyJywgJ2JheicsICdxdXV4J107XG4gKiAgICAgIFIubnRoKDEsIGxpc3QpOyAvLz0+ICdiYXInXG4gKiAgICAgIFIubnRoKC0xLCBsaXN0KTsgLy89PiAncXV1eCdcbiAqICAgICAgUi5udGgoLTk5LCBsaXN0KTsgLy89PiB1bmRlZmluZWRcbiAqXG4gKiAgICAgIFIubnRoKDIsICdhYmMnKTsgLy89PiAnYydcbiAqICAgICAgUi5udGgoMywgJ2FiYycpOyAvLz0+ICcnXG4gKiBAc3ltYiBSLm50aCgtMSwgW2EsIGIsIGNdKSA9IGNcbiAqIEBzeW1iIFIubnRoKDAsIFthLCBiLCBjXSkgPSBhXG4gKiBAc3ltYiBSLm50aCgxLCBbYSwgYiwgY10pID0gYlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbnRoKG9mZnNldCwgbGlzdCkge1xuICB2YXIgaWR4ID0gb2Zmc2V0IDwgMCA/IGxpc3QubGVuZ3RoICsgb2Zmc2V0IDogb2Zmc2V0O1xuICByZXR1cm4gX2lzU3RyaW5nKGxpc3QpID8gbGlzdC5jaGFyQXQoaWR4KSA6IGxpc3RbaWR4XTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xudmFyIG50aCA9IHJlcXVpcmUoJy4vbnRoJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBpdHMgbnRoIGFyZ3VtZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAqLi4uIC0+ICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm50aEFyZygxKSgnYScsICdiJywgJ2MnKTsgLy89PiAnYidcbiAqICAgICAgUi5udGhBcmcoLTEpKCdhJywgJ2InLCAnYycpOyAvLz0+ICdjJ1xuICogQHN5bWIgUi5udGhBcmcoLTEpKGEsIGIsIGMpID0gY1xuICogQHN5bWIgUi5udGhBcmcoMCkoYSwgYiwgYykgPSBhXG4gKiBAc3ltYiBSLm50aEFyZygxKShhLCBiLCBjKSA9IGJcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIG50aEFyZyhuKSB7XG4gIHZhciBhcml0eSA9IG4gPCAwID8gMSA6IG4gKyAxO1xuICByZXR1cm4gY3VycnlOKGFyaXR5LCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbnRoKG4sIGFyZ3VtZW50cyk7XG4gIH0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29udGFpbmluZyBhIHNpbmdsZSBrZXk6dmFsdWUgcGFpci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFN0cmluZyAtPiBhIC0+IHtTdHJpbmc6YX1cbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIucGFpclxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBtYXRjaFBocmFzZXMgPSBSLmNvbXBvc2UoXG4gKiAgICAgICAgUi5vYmpPZignbXVzdCcpLFxuICogICAgICAgIFIubWFwKFIub2JqT2YoJ21hdGNoX3BocmFzZScpKVxuICogICAgICApO1xuICogICAgICBtYXRjaFBocmFzZXMoWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiB7bXVzdDogW3ttYXRjaF9waHJhc2U6ICdmb28nfSwge21hdGNoX3BocmFzZTogJ2Jhcid9LCB7bWF0Y2hfcGhyYXNlOiAnYmF6J31dfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gb2JqT2Yoa2V5LCB2YWwpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICBvYmpba2V5XSA9IHZhbDtcbiAgcmV0dXJuIG9iajtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfb2YgPSByZXF1aXJlKCcuL2ludGVybmFsL19vZicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZXRvbiBhcnJheSBjb250YWluaW5nIHRoZSB2YWx1ZSBwcm92aWRlZC5cbiAqXG4gKiBOb3RlIHRoaXMgYG9mYCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgRVM2IGBvZmA7IFNlZVxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvb2ZcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBhIC0+IFthXVxuICogQHBhcmFtIHsqfSB4IGFueSB2YWx1ZVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IHdyYXBwaW5nIGB4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm9mKG51bGwpOyAvLz0+IFtudWxsXVxuICogICAgICBSLm9mKFs0Ml0pOyAvLz0+IFtbNDJdXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoX29mKTtcbiIsInZhciBfY29udGFpbnMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb250YWlucycpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBwYXJ0aWFsIGNvcHkgb2YgYW4gb2JqZWN0IG9taXR0aW5nIHRoZSBrZXlzIHNwZWNpZmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgW1N0cmluZ10gLT4ge1N0cmluZzogKn0gLT4ge1N0cmluZzogKn1cbiAqIEBwYXJhbSB7QXJyYXl9IG5hbWVzIGFuIGFycmF5IG9mIFN0cmluZyBwcm9wZXJ0eSBuYW1lcyB0byBvbWl0IGZyb20gdGhlIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjb3B5IGZyb21cbiAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IHdpdGggcHJvcGVydGllcyBmcm9tIGBuYW1lc2Agbm90IG9uIGl0LlxuICogQHNlZSBSLnBpY2tcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm9taXQoWydhJywgJ2QnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YjogMiwgYzogM31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIG9taXQobmFtZXMsIG9iaikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgaWYgKCFfY29udGFpbnMocHJvcCwgbmFtZXMpKSB7XG4gICAgICByZXN1bHRbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfYXJpdHkgPSByZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xudmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIEFjY2VwdHMgYSBmdW5jdGlvbiBgZm5gIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBndWFyZHMgaW52b2NhdGlvbiBvZlxuICogYGZuYCBzdWNoIHRoYXQgYGZuYCBjYW4gb25seSBldmVyIGJlIGNhbGxlZCBvbmNlLCBubyBtYXR0ZXIgaG93IG1hbnkgdGltZXNcbiAqIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBpbnZva2VkLiBUaGUgZmlyc3QgdmFsdWUgY2FsY3VsYXRlZCBpcyByZXR1cm5lZCBpblxuICogc3Vic2VxdWVudCBpbnZvY2F0aW9ucy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoYS4uLiAtPiBiKSAtPiAoYS4uLiAtPiBiKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAgaW4gYSBjYWxsLW9ubHktb25jZSB3cmFwcGVyLlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB3cmFwcGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBhZGRPbmVPbmNlID0gUi5vbmNlKHggPT4geCArIDEpO1xuICogICAgICBhZGRPbmVPbmNlKDEwKTsgLy89PiAxMVxuICogICAgICBhZGRPbmVPbmNlKGFkZE9uZU9uY2UoNTApKTsgLy89PiAxMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gb25jZShmbikge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIHZhciByZXN1bHQ7XG4gIHJldHVybiBfYXJpdHkoZm4ubGVuZ3RoLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoY2FsbGVkKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSk7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBvbmUgb3IgYm90aCBvZiBpdHMgYXJndW1lbnRzIGFyZSBgdHJ1ZWAuIFJldHVybnMgYGZhbHNlYFxuICogaWYgYm90aCBhcmd1bWVudHMgYXJlIGBmYWxzZWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBiIC0+IGEgfCBiXG4gKiBAcGFyYW0ge0FueX0gYVxuICogQHBhcmFtIHtBbnl9IGJcbiAqIEByZXR1cm4ge0FueX0gdGhlIGZpcnN0IGFyZ3VtZW50IGlmIHRydXRoeSwgb3RoZXJ3aXNlIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gKiBAc2VlIFIuZWl0aGVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5vcih0cnVlLCB0cnVlKTsgLy89PiB0cnVlXG4gKiAgICAgIFIub3IodHJ1ZSwgZmFsc2UpOyAvLz0+IHRydWVcbiAqICAgICAgUi5vcihmYWxzZSwgdHJ1ZSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLm9yKGZhbHNlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIG9yKGEsIGIpIHtcbiAgcmV0dXJuIGEgfHwgYjtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBcInNldHRpbmdcIiB0aGUgcG9ydGlvbiBvZiB0aGUgZ2l2ZW4gZGF0YSBzdHJ1Y3R1cmVcbiAqIGZvY3VzZWQgYnkgdGhlIGdpdmVuIGxlbnMgdG8gdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGUgZ2l2ZW4gZnVuY3Rpb24gdG9cbiAqIHRoZSBmb2N1c2VkIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIExlbnMgcyBhIC0+IChhIC0+IGEpIC0+IHMgLT4gc1xuICogQHBhcmFtIHtMZW5zfSBsZW5zXG4gKiBAcGFyYW0geyp9IHZcbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5wcm9wLCBSLmxlbnNJbmRleCwgUi5sZW5zUHJvcFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBoZWFkTGVucyA9IFIubGVuc0luZGV4KDApO1xuICpcbiAqICAgICAgUi5vdmVyKGhlYWRMZW5zLCBSLnRvVXBwZXIsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydGT08nLCAnYmFyJywgJ2JheiddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICAvLyBgSWRlbnRpdHlgIGlzIGEgZnVuY3RvciB0aGF0IGhvbGRzIGEgc2luZ2xlIHZhbHVlLCB3aGVyZSBgbWFwYCBzaW1wbHlcbiAgLy8gdHJhbnNmb3JtcyB0aGUgaGVsZCB2YWx1ZSB3aXRoIHRoZSBwcm92aWRlZCBmdW5jdGlvbi5cbiAgdmFyIElkZW50aXR5ID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB7dmFsdWU6IHgsIG1hcDogZnVuY3Rpb24oZikgeyByZXR1cm4gSWRlbnRpdHkoZih4KSk7IH19O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkzKGZ1bmN0aW9uIG92ZXIobGVucywgZiwgeCkge1xuICAgIC8vIFRoZSB2YWx1ZSByZXR1cm5lZCBieSB0aGUgZ2V0dGVyIGZ1bmN0aW9uIGlzIGZpcnN0IHRyYW5zZm9ybWVkIHdpdGggYGZgLFxuICAgIC8vIHRoZW4gc2V0IGFzIHRoZSB2YWx1ZSBvZiBhbiBgSWRlbnRpdHlgLiBUaGlzIGlzIHRoZW4gbWFwcGVkIG92ZXIgd2l0aCB0aGVcbiAgICAvLyBzZXR0ZXIgZnVuY3Rpb24gb2YgdGhlIGxlbnMuXG4gICAgcmV0dXJuIGxlbnMoZnVuY3Rpb24oeSkgeyByZXR1cm4gSWRlbnRpdHkoZih5KSk7IH0pKHgpLnZhbHVlO1xuICB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogVGFrZXMgdHdvIGFyZ3VtZW50cywgYGZzdGAgYW5kIGBzbmRgLCBhbmQgcmV0dXJucyBgW2ZzdCwgc25kXWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTguMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBiIC0+IChhLGIpXG4gKiBAcGFyYW0geyp9IGZzdFxuICogQHBhcmFtIHsqfSBzbmRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHNlZSBSLm9iak9mLCBSLm9mXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYWlyKCdmb28nLCAnYmFyJyk7IC8vPT4gWydmb28nLCAnYmFyJ11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHBhaXIoZnN0LCBzbmQpIHsgcmV0dXJuIFtmc3QsIHNuZF07IH0pO1xuIiwidmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcbnZhciBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IgPSByZXF1aXJlKCcuL2ludGVybmFsL19jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcicpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBgZmAgYW5kIGEgbGlzdCBvZiBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gYGdgLlxuICogV2hlbiBhcHBsaWVkLCBgZ2AgcmV0dXJucyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGBmYCB0byB0aGUgYXJndW1lbnRzXG4gKiBwcm92aWRlZCBpbml0aWFsbHkgZm9sbG93ZWQgYnkgdGhlIGFyZ3VtZW50cyBwcm92aWRlZCB0byBgZ2AuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoYSwgYiwgYywgLi4uLCBuKSAtPiB4KSAtPiBbYSwgYiwgYywgLi4uXSAtPiAoKGQsIGUsIGYsIC4uLiwgbikgLT4geClcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3NcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLnBhcnRpYWxSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBtdWx0aXBseTIgPSAoYSwgYikgPT4gYSAqIGI7XG4gKiAgICAgIHZhciBkb3VibGUgPSBSLnBhcnRpYWwobXVsdGlwbHkyLCBbMl0pO1xuICogICAgICBkb3VibGUoMik7IC8vPT4gNFxuICpcbiAqICAgICAgdmFyIGdyZWV0ID0gKHNhbHV0YXRpb24sIHRpdGxlLCBmaXJzdE5hbWUsIGxhc3ROYW1lKSA9PlxuICogICAgICAgIHNhbHV0YXRpb24gKyAnLCAnICsgdGl0bGUgKyAnICcgKyBmaXJzdE5hbWUgKyAnICcgKyBsYXN0TmFtZSArICchJztcbiAqXG4gKiAgICAgIHZhciBzYXlIZWxsbyA9IFIucGFydGlhbChncmVldCwgWydIZWxsbyddKTtcbiAqICAgICAgdmFyIHNheUhlbGxvVG9NcyA9IFIucGFydGlhbChzYXlIZWxsbywgWydNcy4nXSk7XG4gKiAgICAgIHNheUhlbGxvVG9NcygnSmFuZScsICdKb25lcycpOyAvLz0+ICdIZWxsbywgTXMuIEphbmUgSm9uZXMhJ1xuICogQHN5bWIgUi5wYXJ0aWFsKGYsIFthLCBiXSkoYywgZCkgPSBmKGEsIGIsIGMsIGQpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yKF9jb25jYXQpO1xuIiwidmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcbnZhciBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IgPSByZXF1aXJlKCcuL2ludGVybmFsL19jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcicpO1xudmFyIGZsaXAgPSByZXF1aXJlKCcuL2ZsaXAnKTtcblxuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYGZgIGFuZCBhIGxpc3Qgb2YgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIGBnYC5cbiAqIFdoZW4gYXBwbGllZCwgYGdgIHJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgZmAgdG8gdGhlIGFyZ3VtZW50c1xuICogcHJvdmlkZWQgdG8gYGdgIGZvbGxvd2VkIGJ5IHRoZSBhcmd1bWVudHMgcHJvdmlkZWQgaW5pdGlhbGx5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKGEsIGIsIGMsIC4uLiwgbikgLT4geCkgLT4gW2QsIGUsIGYsIC4uLiwgbl0gLT4gKChhLCBiLCBjLCAuLi4pIC0+IHgpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5wYXJ0aWFsXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGdyZWV0ID0gKHNhbHV0YXRpb24sIHRpdGxlLCBmaXJzdE5hbWUsIGxhc3ROYW1lKSA9PlxuICogICAgICAgIHNhbHV0YXRpb24gKyAnLCAnICsgdGl0bGUgKyAnICcgKyBmaXJzdE5hbWUgKyAnICcgKyBsYXN0TmFtZSArICchJztcbiAqXG4gKiAgICAgIHZhciBncmVldE1zSmFuZUpvbmVzID0gUi5wYXJ0aWFsUmlnaHQoZ3JlZXQsIFsnTXMuJywgJ0phbmUnLCAnSm9uZXMnXSk7XG4gKlxuICogICAgICBncmVldE1zSmFuZUpvbmVzKCdIZWxsbycpOyAvLz0+ICdIZWxsbywgTXMuIEphbmUgSm9uZXMhJ1xuICogQHN5bWIgUi5wYXJ0aWFsUmlnaHQoZiwgW2EsIGJdKShjLCBkKSA9IGYoYywgZCwgYSwgYilcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IoZmxpcChfY29uY2F0KSk7XG4iLCJ2YXIgZmlsdGVyID0gcmVxdWlyZSgnLi9maWx0ZXInKTtcbnZhciBqdXh0ID0gcmVxdWlyZSgnLi9qdXh0Jyk7XG52YXIgcmVqZWN0ID0gcmVxdWlyZSgnLi9yZWplY3QnKTtcblxuXG4vKipcbiAqIFRha2VzIGEgcHJlZGljYXRlIGFuZCBhIGxpc3Qgb3Igb3RoZXIgXCJmaWx0ZXJhYmxlXCIgb2JqZWN0IGFuZCByZXR1cm5zIHRoZVxuICogcGFpciBvZiBmaWx0ZXJhYmxlIG9iamVjdHMgb2YgdGhlIHNhbWUgdHlwZSBvZiBlbGVtZW50cyB3aGljaCBkbyBhbmQgZG8gbm90XG4gKiBzYXRpc2Z5LCB0aGUgcHJlZGljYXRlLCByZXNwZWN0aXZlbHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IFtmIGEsIGYgYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpZGUgdGhlIGVsZW1lbnQgYmVsb25ncyB0by5cbiAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlcmFibGUgdGhlIGxpc3QgKG9yIG90aGVyIGZpbHRlcmFibGUpIHRvIHBhcnRpdGlvbi5cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSwgY29udGFpbmluZyBmaXJzdCB0aGUgc3Vic2V0IG9mIGVsZW1lbnRzIHRoYXQgc2F0aXNmeSB0aGVcbiAqICAgICAgICAgcHJlZGljYXRlLCBhbmQgc2Vjb25kIHRoZSBzdWJzZXQgb2YgZWxlbWVudHMgdGhhdCBkbyBub3Qgc2F0aXNmeS5cbiAqIEBzZWUgUi5maWx0ZXIsIFIucmVqZWN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXJ0aXRpb24oUi5jb250YWlucygncycpLCBbJ3NzcycsICd0dHQnLCAnZm9vJywgJ2JhcnMnXSk7XG4gKiAgICAgIC8vID0+IFsgWyAnc3NzJywgJ2JhcnMnIF0sICBbICd0dHQnLCAnZm9vJyBdIF1cbiAqXG4gKiAgICAgIFIucGFydGl0aW9uKFIuY29udGFpbnMoJ3MnKSwgeyBhOiAnc3NzJywgYjogJ3R0dCcsIGZvbzogJ2JhcnMnIH0pO1xuICogICAgICAvLyA9PiBbIHsgYTogJ3NzcycsIGZvbzogJ2JhcnMnIH0sIHsgYjogJ3R0dCcgfSAgXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGp1eHQoW2ZpbHRlciwgcmVqZWN0XSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHZhbHVlIGF0IGEgZ2l2ZW4gcGF0aC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4ge2F9IC0+IGEgfCBVbmRlZmluZWRcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gdXNlLlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHJldHJpZXZlIHRoZSBuZXN0ZWQgcHJvcGVydHkgZnJvbS5cbiAqIEByZXR1cm4geyp9IFRoZSBkYXRhIGF0IGBwYXRoYC5cbiAqIEBzZWUgUi5wcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXRoKFsnYScsICdiJ10sIHthOiB7YjogMn19KTsgLy89PiAyXG4gKiAgICAgIFIucGF0aChbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBwYXRoKHBhdGhzLCBvYmopIHtcbiAgdmFyIHZhbCA9IG9iajtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBwYXRocy5sZW5ndGgpIHtcbiAgICBpZiAodmFsID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFsID0gdmFsW3BhdGhzW2lkeF1dO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiB2YWw7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgZXF1YWxzID0gcmVxdWlyZSgnLi9lcXVhbHMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi9wYXRoJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBuZXN0ZWQgcGF0aCBvbiBhbiBvYmplY3QgaGFzIGEgc3BlY2lmaWMgdmFsdWUsIGluXG4gKiBgUi5lcXVhbHNgIHRlcm1zLiBNb3N0IGxpa2VseSB1c2VkIHRvIGZpbHRlciBhIGxpc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNy4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4gYSAtPiB7YX0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCBvZiB0aGUgbmVzdGVkIHByb3BlcnR5IHRvIHVzZVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIGNvbXBhcmUgdGhlIG5lc3RlZCBwcm9wZXJ0eSB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2sgdGhlIG5lc3RlZCBwcm9wZXJ0eSBpblxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBlcXVhbHMgdGhlIG5lc3RlZCBvYmplY3QgcHJvcGVydHksXG4gKiAgICAgICAgIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB1c2VyMSA9IHsgYWRkcmVzczogeyB6aXBDb2RlOiA5MDIxMCB9IH07XG4gKiAgICAgIHZhciB1c2VyMiA9IHsgYWRkcmVzczogeyB6aXBDb2RlOiA1NTU1NSB9IH07XG4gKiAgICAgIHZhciB1c2VyMyA9IHsgbmFtZTogJ0JvYicgfTtcbiAqICAgICAgdmFyIHVzZXJzID0gWyB1c2VyMSwgdXNlcjIsIHVzZXIzIF07XG4gKiAgICAgIHZhciBpc0ZhbW91cyA9IFIucGF0aEVxKFsnYWRkcmVzcycsICd6aXBDb2RlJ10sIDkwMjEwKTtcbiAqICAgICAgUi5maWx0ZXIoaXNGYW1vdXMsIHVzZXJzKTsgLy89PiBbIHVzZXIxIF1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKGZ1bmN0aW9uIHBhdGhFcShfcGF0aCwgdmFsLCBvYmopIHtcbiAgcmV0dXJuIGVxdWFscyhwYXRoKF9wYXRoLCBvYmopLCB2YWwpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIGRlZmF1bHRUbyA9IHJlcXVpcmUoJy4vZGVmYXVsdFRvJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4vcGF0aCcpO1xuXG5cbi8qKlxuICogSWYgdGhlIGdpdmVuLCBub24tbnVsbCBvYmplY3QgaGFzIGEgdmFsdWUgYXQgdGhlIGdpdmVuIHBhdGgsIHJldHVybnMgdGhlXG4gKiB2YWx1ZSBhdCB0aGF0IHBhdGguIE90aGVyd2lzZSByZXR1cm5zIHRoZSBwcm92aWRlZCBkZWZhdWx0IHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgYSAtPiBbSWR4XSAtPiB7YX0gLT4gYVxuICogQHBhcmFtIHsqfSBkIFRoZSBkZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gcCBUaGUgcGF0aCB0byB1c2UuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcmV0cmlldmUgdGhlIG5lc3RlZCBwcm9wZXJ0eSBmcm9tLlxuICogQHJldHVybiB7Kn0gVGhlIGRhdGEgYXQgYHBhdGhgIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgb3IgdGhlIGRlZmF1bHQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXRoT3IoJ04vQScsIFsnYScsICdiJ10sIHthOiB7YjogMn19KTsgLy89PiAyXG4gKiAgICAgIFIucGF0aE9yKCdOL0EnLCBbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gXCJOL0FcIlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gcGF0aE9yKGQsIHAsIG9iaikge1xuICByZXR1cm4gZGVmYXVsdFRvKGQsIHBhdGgocCwgb2JqKSk7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4vcGF0aCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgcHJvcGVydHkgYXQgZ2l2ZW4gcGF0aCBzYXRpc2ZpZXMgdGhlXG4gKiBnaXZlbiBwcmVkaWNhdGU7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHR5cGVkZWZuIElkeCA9IFN0cmluZyB8IEludFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbSWR4XSAtPiB7YX0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gcHJvcFBhdGhcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLnByb3BTYXRpc2ZpZXMsIFIucGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGF0aFNhdGlzZmllcyh5ID0+IHkgPiAwLCBbJ3gnLCAneSddLCB7eDoge3k6IDJ9fSk7IC8vPT4gdHJ1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gcGF0aFNhdGlzZmllcyhwcmVkLCBwcm9wUGF0aCwgb2JqKSB7XG4gIHJldHVybiBwcm9wUGF0aC5sZW5ndGggPiAwICYmIHByZWQocGF0aChwcm9wUGF0aCwgb2JqKSk7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgcGFydGlhbCBjb3B5IG9mIGFuIG9iamVjdCBjb250YWluaW5nIG9ubHkgdGhlIGtleXMgc3BlY2lmaWVkLiBJZlxuICogdGhlIGtleSBkb2VzIG5vdCBleGlzdCwgdGhlIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtrXSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge0FycmF5fSBuYW1lcyBhbiBhcnJheSBvZiBTdHJpbmcgcHJvcGVydHkgbmFtZXMgdG8gY29weSBvbnRvIGEgbmV3IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNvcHkgZnJvbVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHByb3BlcnRpZXMgZnJvbSBgbmFtZXNgIG9uIGl0LlxuICogQHNlZSBSLm9taXQsIFIucHJvcHNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBpY2soWydhJywgJ2QnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMSwgZDogNH1cbiAqICAgICAgUi5waWNrKFsnYScsICdlJywgJ2YnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMX1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHBpY2sobmFtZXMsIG9iaikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgaWYgKG5hbWVzW2lkeF0gaW4gb2JqKSB7XG4gICAgICByZXN1bHRbbmFtZXNbaWR4XV0gPSBvYmpbbmFtZXNbaWR4XV07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBTaW1pbGFyIHRvIGBwaWNrYCBleGNlcHQgdGhhdCB0aGlzIG9uZSBpbmNsdWRlcyBhIGBrZXk6IHVuZGVmaW5lZGAgcGFpciBmb3JcbiAqIHByb3BlcnRpZXMgdGhhdCBkb24ndCBleGlzdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgW2tdIC0+IHtrOiB2fSAtPiB7azogdn1cbiAqIEBwYXJhbSB7QXJyYXl9IG5hbWVzIGFuIGFycmF5IG9mIFN0cmluZyBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5IG9udG8gYSBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIG9ubHkgcHJvcGVydGllcyBmcm9tIGBuYW1lc2Agb24gaXQuXG4gKiBAc2VlIFIucGlja1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGlja0FsbChbJ2EnLCAnZCddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHthOiAxLCBkOiA0fVxuICogICAgICBSLnBpY2tBbGwoWydhJywgJ2UnLCAnZiddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHthOiAxLCBlOiB1bmRlZmluZWQsIGY6IHVuZGVmaW5lZH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHBpY2tBbGwobmFtZXMsIG9iaikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgdmFyIG5hbWUgPSBuYW1lc1tpZHhdO1xuICAgIHJlc3VsdFtuYW1lXSA9IG9ialtuYW1lXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIHBhcnRpYWwgY29weSBvZiBhbiBvYmplY3QgY29udGFpbmluZyBvbmx5IHRoZSBrZXlzIHRoYXQgc2F0aXNmeVxuICogdGhlIHN1cHBsaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKHYsIGsgLT4gQm9vbGVhbikgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBrZXlcbiAqICAgICAgICBzaG91bGQgYmUgaW5jbHVkZWQgb24gdGhlIG91dHB1dCBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIG9ubHkgcHJvcGVydGllcyB0aGF0IHNhdGlzZnkgYHByZWRgXG4gKiAgICAgICAgIG9uIGl0LlxuICogQHNlZSBSLnBpY2ssIFIuZmlsdGVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzVXBwZXJDYXNlID0gKHZhbCwga2V5KSA9PiBrZXkudG9VcHBlckNhc2UoKSA9PT0ga2V5O1xuICogICAgICBSLnBpY2tCeShpc1VwcGVyQ2FzZSwge2E6IDEsIGI6IDIsIEE6IDMsIEI6IDR9KTsgLy89PiB7QTogMywgQjogNH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHBpY2tCeSh0ZXN0LCBvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgIGlmICh0ZXN0KG9ialtwcm9wXSwgcHJvcCwgb2JqKSkge1xuICAgICAgcmVzdWx0W3Byb3BdID0gb2JqW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcbnZhciBfcGlwZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3BpcGUnKTtcbnZhciByZWR1Y2UgPSByZXF1aXJlKCcuL3JlZHVjZScpO1xudmFyIHRhaWwgPSByZXF1aXJlKCcuL3RhaWwnKTtcblxuXG4vKipcbiAqIFBlcmZvcm1zIGxlZnQtdG8tcmlnaHQgZnVuY3Rpb24gY29tcG9zaXRpb24uIFRoZSBsZWZ0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZVxuICogYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICpcbiAqIEluIHNvbWUgbGlicmFyaWVzIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYHNlcXVlbmNlYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIHJlc3VsdCBvZiBwaXBlIGlzIG5vdCBhdXRvbWF0aWNhbGx5IGN1cnJpZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCgoYSwgYiwgLi4uLCBuKSAtPiBvKSwgKG8gLT4gcCksIC4uLiwgKHggLT4geSksICh5IC0+IHopKSAtPiAoKGEsIGIsIC4uLiwgbikgLT4geilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuY29tcG9zZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBmID0gUi5waXBlKE1hdGgucG93LCBSLm5lZ2F0ZSwgUi5pbmMpO1xuICpcbiAqICAgICAgZigzLCA0KTsgLy8gLSgzXjQpICsgMVxuICogQHN5bWIgUi5waXBlKGYsIGcsIGgpKGEsIGIpID0gaChnKGYoYSwgYikpKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwaXBlIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICB9XG4gIHJldHVybiBfYXJpdHkoYXJndW1lbnRzWzBdLmxlbmd0aCxcbiAgICAgICAgICAgICAgICByZWR1Y2UoX3BpcGUsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG59O1xuIiwidmFyIGNvbXBvc2VLID0gcmVxdWlyZSgnLi9jb21wb3NlSycpO1xudmFyIHJldmVyc2UgPSByZXF1aXJlKCcuL3JldmVyc2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsZWZ0LXRvLXJpZ2h0IEtsZWlzbGkgY29tcG9zaXRpb24gb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9ucyxcbiAqIGVhY2ggb2Ygd2hpY2ggbXVzdCByZXR1cm4gYSB2YWx1ZSBvZiBhIHR5cGUgc3VwcG9ydGVkIGJ5IFtgY2hhaW5gXSgjY2hhaW4pLlxuICpcbiAqIGBSLnBpcGVLKGYsIGcsIGgpYCBpcyBlcXVpdmFsZW50IHRvIGBSLnBpcGUoUi5jaGFpbihmKSwgUi5jaGFpbihnKSwgUi5jaGFpbihoKSlgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBDaGFpbiBtID0+ICgoYSAtPiBtIGIpLCAoYiAtPiBtIGMpLCAuLi4sICh5IC0+IG0geikpIC0+IChhIC0+IG0geilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlS1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vICBwYXJzZUpzb24gOjogU3RyaW5nIC0+IE1heWJlICpcbiAqICAgICAgLy8gIGdldCA6OiBTdHJpbmcgLT4gT2JqZWN0IC0+IE1heWJlICpcbiAqXG4gKiAgICAgIC8vICBnZXRTdGF0ZUNvZGUgOjogTWF5YmUgU3RyaW5nIC0+IE1heWJlIFN0cmluZ1xuICogICAgICB2YXIgZ2V0U3RhdGVDb2RlID0gUi5waXBlSyhcbiAqICAgICAgICBwYXJzZUpzb24sXG4gKiAgICAgICAgZ2V0KCd1c2VyJyksXG4gKiAgICAgICAgZ2V0KCdhZGRyZXNzJyksXG4gKiAgICAgICAgZ2V0KCdzdGF0ZScpLFxuICogICAgICAgIFIuY29tcG9zZShNYXliZS5vZiwgUi50b1VwcGVyKVxuICogICAgICApO1xuICpcbiAqICAgICAgZ2V0U3RhdGVDb2RlKCd7XCJ1c2VyXCI6e1wiYWRkcmVzc1wiOntcInN0YXRlXCI6XCJueVwifX19Jyk7XG4gKiAgICAgIC8vPT4gSnVzdCgnTlknKVxuICogICAgICBnZXRTdGF0ZUNvZGUoJ1tJbnZhbGlkIEpTT05dJyk7XG4gKiAgICAgIC8vPT4gTm90aGluZygpXG4gKiBAc3ltYiBSLnBpcGVLKGYsIGcsIGgpKGEpID0gUi5jaGFpbihoLCBSLmNoYWluKGcsIGYoYSkpKVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBpcGVLKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGlwZUsgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIGNvbXBvc2VLLmFwcGx5KHRoaXMsIHJldmVyc2UoYXJndW1lbnRzKSk7XG59O1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX3BpcGVQID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcGlwZVAnKTtcbnZhciByZWR1Y2UgPSByZXF1aXJlKCcuL3JlZHVjZScpO1xudmFyIHRhaWwgPSByZXF1aXJlKCcuL3RhaWwnKTtcblxuXG4vKipcbiAqIFBlcmZvcm1zIGxlZnQtdG8tcmlnaHQgY29tcG9zaXRpb24gb2Ygb25lIG9yIG1vcmUgUHJvbWlzZS1yZXR1cm5pbmdcbiAqIGZ1bmN0aW9ucy4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnNcbiAqIG11c3QgYmUgdW5hcnkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoYSAtPiBQcm9taXNlIGIpLCAoYiAtPiBQcm9taXNlIGMpLCAuLi4sICh5IC0+IFByb21pc2UgeikpIC0+IChhIC0+IFByb21pc2UgeilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAc2VlIFIuY29tcG9zZVBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyAgZm9sbG93ZXJzRm9yVXNlciA6OiBTdHJpbmcgLT4gUHJvbWlzZSBbVXNlcl1cbiAqICAgICAgdmFyIGZvbGxvd2Vyc0ZvclVzZXIgPSBSLnBpcGVQKGRiLmdldFVzZXJCeUlkLCBkYi5nZXRGb2xsb3dlcnMpO1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBpcGVQKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGlwZVAgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShhcmd1bWVudHNbMF0ubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHJlZHVjZShfcGlwZVAsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG59O1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBtYXAgPSByZXF1aXJlKCcuL21hcCcpO1xudmFyIHByb3AgPSByZXF1aXJlKCcuL3Byb3AnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBieSBwbHVja2luZyB0aGUgc2FtZSBuYW1lZCBwcm9wZXJ0eSBvZmYgYWxsIG9iamVjdHMgaW5cbiAqIHRoZSBsaXN0IHN1cHBsaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgayAtPiBbe2s6IHZ9XSAtPiBbdl1cbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30ga2V5IFRoZSBrZXkgbmFtZSB0byBwbHVjayBvZmYgb2YgZWFjaCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBrZXkuXG4gKiBAc2VlIFIucHJvcHNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBsdWNrKCdhJykoW3thOiAxfSwge2E6IDJ9XSk7IC8vPT4gWzEsIDJdXG4gKiAgICAgIFIucGx1Y2soMCkoW1sxLCAyXSwgWzMsIDRdXSk7ICAgLy89PiBbMSwgM11cbiAqIEBzeW1iIFIucGx1Y2soJ3gnLCBbe3g6IDEsIHk6IDJ9LCB7eDogMywgeTogNH0sIHt4OiA1LCB5OiA2fV0pID0gWzEsIDMsIDVdXG4gKiBAc3ltYiBSLnBsdWNrKDAsIFtbMSwgMl0sIFszLCA0XSwgWzUsIDZdXSkgPSBbMSwgMywgNV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHBsdWNrKHAsIGxpc3QpIHtcbiAgcmV0dXJuIG1hcChwcm9wKHApLCBsaXN0KTtcbn0pO1xuIiwidmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aCB0aGUgZ2l2ZW4gZWxlbWVudCBhdCB0aGUgZnJvbnQsIGZvbGxvd2VkIGJ5IHRoZVxuICogY29udGVudHMgb2YgdGhlIGxpc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7Kn0gZWwgVGhlIGl0ZW0gdG8gYWRkIHRvIHRoZSBoZWFkIG9mIHRoZSBvdXRwdXQgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGFkZCB0byB0aGUgdGFpbCBvZiB0aGUgb3V0cHV0IGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gKiBAc2VlIFIuYXBwZW5kXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wcmVwZW5kKCdmZWUnLCBbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiBbJ2ZlZScsICdmaScsICdmbycsICdmdW0nXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gcHJlcGVuZChlbCwgbGlzdCkge1xuICByZXR1cm4gX2NvbmNhdChbZWxdLCBsaXN0KTtcbn0pO1xuIiwidmFyIG11bHRpcGx5ID0gcmVxdWlyZSgnLi9tdWx0aXBseScpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJy4vcmVkdWNlJyk7XG5cblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRvZ2V0aGVyIGFsbCB0aGUgZWxlbWVudHMgb2YgYSBsaXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgW051bWJlcl0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIG51bWJlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHByb2R1Y3Qgb2YgYWxsIHRoZSBudW1iZXJzIGluIHRoZSBsaXN0LlxuICogQHNlZSBSLnJlZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucHJvZHVjdChbMiw0LDYsOCwxMDAsMV0pOyAvLz0+IDM4NDAwXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlKG11bHRpcGx5LCAxKTtcbiIsInZhciBfbWFwID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFwJyk7XG52YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG52YXIgcGlja0FsbCA9IHJlcXVpcmUoJy4vcGlja0FsbCcpO1xudmFyIHVzZVdpdGggPSByZXF1aXJlKCcuL3VzZVdpdGgnKTtcblxuXG4vKipcbiAqIFJlYXNvbmFibGUgYW5hbG9nIHRvIFNRTCBgc2VsZWN0YCBzdGF0ZW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgW2tdIC0+IFt7azogdn1dIC0+IFt7azogdn1dXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gcHJvamVjdFxuICogQHBhcmFtIHtBcnJheX0gb2JqcyBUaGUgb2JqZWN0cyB0byBxdWVyeVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIG9iamVjdHMgd2l0aCBqdXN0IHRoZSBgcHJvcHNgIHByb3BlcnRpZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFiYnkgPSB7bmFtZTogJ0FiYnknLCBhZ2U6IDcsIGhhaXI6ICdibG9uZCcsIGdyYWRlOiAyfTtcbiAqICAgICAgdmFyIGZyZWQgPSB7bmFtZTogJ0ZyZWQnLCBhZ2U6IDEyLCBoYWlyOiAnYnJvd24nLCBncmFkZTogN307XG4gKiAgICAgIHZhciBraWRzID0gW2FiYnksIGZyZWRdO1xuICogICAgICBSLnByb2plY3QoWyduYW1lJywgJ2dyYWRlJ10sIGtpZHMpOyAvLz0+IFt7bmFtZTogJ0FiYnknLCBncmFkZTogMn0sIHtuYW1lOiAnRnJlZCcsIGdyYWRlOiA3fV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB1c2VXaXRoKF9tYXAsIFtwaWNrQWxsLCBpZGVudGl0eV0pOyAvLyBwYXNzaW5nIGBpZGVudGl0eWAgZ2l2ZXMgY29ycmVjdCBhcml0eVxuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdoZW4gc3VwcGxpZWQgYW4gb2JqZWN0IHJldHVybnMgdGhlIGluZGljYXRlZFxuICogcHJvcGVydHkgb2YgdGhhdCBvYmplY3QsIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgcyAtPiB7czogYX0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHBhcmFtIHtTdHJpbmd9IHAgVGhlIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeVxuICogQHJldHVybiB7Kn0gVGhlIHZhbHVlIGF0IGBvYmoucGAuXG4gKiBAc2VlIFIucGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucHJvcCgneCcsIHt4OiAxMDB9KTsgLy89PiAxMDBcbiAqICAgICAgUi5wcm9wKCd4Jywge30pOyAvLz0+IHVuZGVmaW5lZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gcHJvcChwLCBvYmopIHsgcmV0dXJuIG9ialtwXTsgfSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIGVxdWFscyA9IHJlcXVpcmUoJy4vZXF1YWxzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBwcm9wZXJ0eSBpcyBlcXVhbCwgaW4gYFIuZXF1YWxzYFxuICogdGVybXMsIHRvIHRoZSBnaXZlbiB2YWx1ZTsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgU3RyaW5nIC0+IGEgLT4gT2JqZWN0IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuZXF1YWxzLCBSLnByb3BTYXRpc2ZpZXNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWJieSA9IHtuYW1lOiAnQWJieScsIGFnZTogNywgaGFpcjogJ2Jsb25kJ307XG4gKiAgICAgIHZhciBmcmVkID0ge25hbWU6ICdGcmVkJywgYWdlOiAxMiwgaGFpcjogJ2Jyb3duJ307XG4gKiAgICAgIHZhciBydXN0eSA9IHtuYW1lOiAnUnVzdHknLCBhZ2U6IDEwLCBoYWlyOiAnYnJvd24nfTtcbiAqICAgICAgdmFyIGFsb2lzID0ge25hbWU6ICdBbG9pcycsIGFnZTogMTUsIGRpc3Bvc2l0aW9uOiAnc3VybHknfTtcbiAqICAgICAgdmFyIGtpZHMgPSBbYWJieSwgZnJlZCwgcnVzdHksIGFsb2lzXTtcbiAqICAgICAgdmFyIGhhc0Jyb3duSGFpciA9IFIucHJvcEVxKCdoYWlyJywgJ2Jyb3duJyk7XG4gKiAgICAgIFIuZmlsdGVyKGhhc0Jyb3duSGFpciwga2lkcyk7IC8vPT4gW2ZyZWQsIHJ1c3R5XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gcHJvcEVxKG5hbWUsIHZhbCwgb2JqKSB7XG4gIHJldHVybiBlcXVhbHModmFsLCBvYmpbbmFtZV0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIGlzID0gcmVxdWlyZSgnLi9pcycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgcHJvcGVydHkgaXMgb2YgdGhlIGdpdmVuIHR5cGU7XG4gKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQHNpZyBUeXBlIC0+IFN0cmluZyAtPiBPYmplY3QgLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmlzLCBSLnByb3BTYXRpc2ZpZXNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByb3BJcyhOdW1iZXIsICd4Jywge3g6IDEsIHk6IDJ9KTsgIC8vPT4gdHJ1ZVxuICogICAgICBSLnByb3BJcyhOdW1iZXIsICd4Jywge3g6ICdmb28nfSk7ICAgIC8vPT4gZmFsc2VcbiAqICAgICAgUi5wcm9wSXMoTnVtYmVyLCAneCcsIHt9KTsgICAgICAgICAgICAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBwcm9wSXModHlwZSwgbmFtZSwgb2JqKSB7XG4gIHJldHVybiBpcyh0eXBlLCBvYmpbbmFtZV0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIF9oYXMgPSByZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuXG4vKipcbiAqIElmIHRoZSBnaXZlbiwgbm9uLW51bGwgb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUsXG4gKiByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGF0IHByb3BlcnR5LiBPdGhlcndpc2UgcmV0dXJucyB0aGUgcHJvdmlkZWQgZGVmYXVsdFxuICogdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIGEgLT4gU3RyaW5nIC0+IE9iamVjdCAtPiBhXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byByZXR1cm4uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJuIHsqfSBUaGUgdmFsdWUgb2YgZ2l2ZW4gcHJvcGVydHkgb2YgdGhlIHN1cHBsaWVkIG9iamVjdCBvciB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWxpY2UgPSB7XG4gKiAgICAgICAgbmFtZTogJ0FMSUNFJyxcbiAqICAgICAgICBhZ2U6IDEwMVxuICogICAgICB9O1xuICogICAgICB2YXIgZmF2b3JpdGUgPSBSLnByb3AoJ2Zhdm9yaXRlTGlicmFyeScpO1xuICogICAgICB2YXIgZmF2b3JpdGVXaXRoRGVmYXVsdCA9IFIucHJvcE9yKCdSYW1kYScsICdmYXZvcml0ZUxpYnJhcnknKTtcbiAqXG4gKiAgICAgIGZhdm9yaXRlKGFsaWNlKTsgIC8vPT4gdW5kZWZpbmVkXG4gKiAgICAgIGZhdm9yaXRlV2l0aERlZmF1bHQoYWxpY2UpOyAgLy89PiAnUmFtZGEnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBwcm9wT3IodmFsLCBwLCBvYmopIHtcbiAgcmV0dXJuIChvYmogIT0gbnVsbCAmJiBfaGFzKHAsIG9iaikpID8gb2JqW3BdIDogdmFsO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgcHJvcGVydHkgc2F0aXNmaWVzIHRoZSBnaXZlblxuICogcHJlZGljYXRlOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gU3RyaW5nIC0+IHtTdHJpbmc6IGF9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5wcm9wRXEsIFIucHJvcElzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wcm9wU2F0aXNmaWVzKHggPT4geCA+IDAsICd4Jywge3g6IDEsIHk6IDJ9KTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBwcm9wU2F0aXNmaWVzKHByZWQsIG5hbWUsIG9iaikge1xuICByZXR1cm4gcHJlZChvYmpbbmFtZV0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQWN0cyBhcyBtdWx0aXBsZSBgcHJvcGA6IGFycmF5IG9mIGtleXMgaW4sIGFycmF5IG9mIHZhbHVlcyBvdXQuIFByZXNlcnZlc1xuICogb3JkZXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtrXSAtPiB7azogdn0gLT4gW3ZdXG4gKiBAcGFyYW0ge0FycmF5fSBwcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZmV0Y2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeVxuICogQHJldHVybiB7QXJyYXl9IFRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcyBvciBwYXJ0aWFsbHkgYXBwbGllZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByb3BzKFsneCcsICd5J10sIHt4OiAxLCB5OiAyfSk7IC8vPT4gWzEsIDJdXG4gKiAgICAgIFIucHJvcHMoWydjJywgJ2EnLCAnYiddLCB7YjogMiwgYTogMX0pOyAvLz0+IFt1bmRlZmluZWQsIDEsIDJdXG4gKlxuICogICAgICB2YXIgZnVsbE5hbWUgPSBSLmNvbXBvc2UoUi5qb2luKCcgJyksIFIucHJvcHMoWydmaXJzdCcsICdsYXN0J10pKTtcbiAqICAgICAgZnVsbE5hbWUoe2xhc3Q6ICdCdWxsZXQtVG9vdGgnLCBhZ2U6IDMzLCBmaXJzdDogJ1RvbnknfSk7IC8vPT4gJ1RvbnkgQnVsbGV0LVRvb3RoJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gcHJvcHMocHMsIG9iaikge1xuICB2YXIgbGVuID0gcHMubGVuZ3RoO1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBpZHggPSAwO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBvdXRbaWR4XSA9IG9ialtwc1tpZHhdXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2lzTnVtYmVyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNOdW1iZXInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIG51bWJlcnMgZnJvbSBgZnJvbWAgKGluY2x1c2l2ZSkgdG8gYHRvYCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW051bWJlcl1cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tIFRoZSBmaXJzdCBudW1iZXIgaW4gdGhlIGxpc3QuXG4gKiBAcGFyYW0ge051bWJlcn0gdG8gT25lIG1vcmUgdGhhbiB0aGUgbGFzdCBudW1iZXIgaW4gdGhlIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgbnVtYmVycyBpbiB0dGhlIHNldCBgW2EsIGIpYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJhbmdlKDEsIDUpOyAgICAvLz0+IFsxLCAyLCAzLCA0XVxuICogICAgICBSLnJhbmdlKDUwLCA1Myk7ICAvLz0+IFs1MCwgNTEsIDUyXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gcmFuZ2UoZnJvbSwgdG8pIHtcbiAgaWYgKCEoX2lzTnVtYmVyKGZyb20pICYmIF9pc051bWJlcih0bykpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm90aCBhcmd1bWVudHMgdG8gcmFuZ2UgbXVzdCBiZSBudW1iZXJzJyk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgbiA9IGZyb207XG4gIHdoaWxlIChuIDwgdG8pIHtcbiAgICByZXN1bHQucHVzaChuKTtcbiAgICBuICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcbnZhciBfcmVkdWNlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nXG4gKiB0aGUgaXRlcmF0b3IgZnVuY3Rpb24gYW5kIHBhc3NpbmcgaXQgYW4gYWNjdW11bGF0b3IgdmFsdWUgYW5kIHRoZSBjdXJyZW50XG4gKiB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kIHRoZW4gcGFzc2luZyB0aGUgcmVzdWx0IHRvIHRoZSBuZXh0IGNhbGwuXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICooYWNjLCB2YWx1ZSkqLiBJdCBtYXkgdXNlXG4gKiBgUi5yZWR1Y2VkYCB0byBzaG9ydGN1dCB0aGUgaXRlcmF0aW9uLlxuICpcbiAqIFRoZSBhcmd1bWVudHMnIG9yZGVyIG9mIGByZWR1Y2VSaWdodGAncyBpdGVyYXRvciBmdW5jdGlvbiBpcyAqKHZhbHVlLCBhY2MpKi5cbiAqXG4gKiBOb3RlOiBgUi5yZWR1Y2VgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZVxuICogYXJyYXlzKSwgdW5saWtlIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlsc1xuICogb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlI0Rlc2NyaXB0aW9uXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHJlZHVjZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5yZWR1Y2VkLCBSLmFkZEluZGV4LCBSLnJlZHVjZVJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5yZWR1Y2UoUi5zdWJ0cmFjdCwgMCwgWzEsIDIsIDMsIDRdKSAvLyA9PiAoKCgoMCAtIDEpIC0gMikgLSAzKSAtIDQpID0gLTEwXG4gKiAgICAgICAgICAgICAgICAtICAgICAgICAgICAgICAgLTEwXG4gKiAgICAgICAgICAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgICAgICAgICAtICAgNCAgICAgICAgICAgLTYgICA0XG4gKiAgICAgICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgICAgIC0gICAzICAgPT0+ICAgICAtMyAgIDNcbiAqICAgICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgICAtICAgMiAgICAgICAgICAgLTEgICAyXG4gKiAgICAgICAgIC8gXFwgICAgICAgICAgICAgIC8gXFxcbiAqICAgICAgICAwICAgMSAgICAgICAgICAgIDAgICAxXG4gKlxuICogQHN5bWIgUi5yZWR1Y2UoZiwgYSwgW2IsIGMsIGRdKSA9IGYoZihmKGEsIGIpLCBjKSwgZClcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzKF9yZWR1Y2UpO1xuIiwidmFyIF9jdXJyeU4gPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX2hhcyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xudmFyIF9yZWR1Y2UgPSByZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcbnZhciBfeHJlZHVjZUJ5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feHJlZHVjZUJ5Jyk7XG5cblxuLyoqXG4gKiBHcm91cHMgdGhlIGVsZW1lbnRzIG9mIHRoZSBsaXN0IGFjY29yZGluZyB0byB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIHRoZSBTdHJpbmctcmV0dXJuaW5nIGZ1bmN0aW9uIGBrZXlGbmAgb24gZWFjaCBlbGVtZW50IGFuZCByZWR1Y2VzIHRoZSBlbGVtZW50c1xuICogb2YgZWFjaCBncm91cCB0byBhIHNpbmdsZSB2YWx1ZSB2aWEgdGhlIHJlZHVjZXIgZnVuY3Rpb24gYHZhbHVlRm5gLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYmFzaWNhbGx5IGEgbW9yZSBnZW5lcmFsIGBncm91cEJ5YCBmdW5jdGlvbi5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjAuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBiKSAtPiBhKSAtPiBhIC0+IChiIC0+IFN0cmluZykgLT4gW2JdIC0+IHtTdHJpbmc6IGF9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB2YWx1ZUZuIFRoZSBmdW5jdGlvbiB0aGF0IHJlZHVjZXMgdGhlIGVsZW1lbnRzIG9mIGVhY2ggZ3JvdXAgdG8gYSBzaW5nbGVcbiAqICAgICAgICB2YWx1ZS4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgYWNjdW11bGF0b3IgZm9yIGEgcGFydGljdWxhciBncm91cCBhbmQgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSAoaW5pdGlhbCkgYWNjdW11bGF0b3IgdmFsdWUgZm9yIGVhY2ggZ3JvdXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlGbiBUaGUgZnVuY3Rpb24gdGhhdCBtYXBzIHRoZSBsaXN0J3MgZWxlbWVudCBpbnRvIGEga2V5LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gZ3JvdXAuXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIHRoZSBvdXRwdXQgb2YgYGtleUZuYCBmb3Iga2V5cywgbWFwcGVkIHRvIHRoZSBvdXRwdXQgb2ZcbiAqICAgICAgICAgYHZhbHVlRm5gIGZvciBlbGVtZW50cyB3aGljaCBwcm9kdWNlZCB0aGF0IGtleSB3aGVuIHBhc3NlZCB0byBga2V5Rm5gLlxuICogQHNlZSBSLmdyb3VwQnksIFIucmVkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHJlZHVjZVRvTmFtZXNCeSA9IFIucmVkdWNlQnkoKGFjYywgc3R1ZGVudCkgPT4gYWNjLmNvbmNhdChzdHVkZW50Lm5hbWUpLCBbXSk7XG4gKiAgICAgIHZhciBuYW1lc0J5R3JhZGUgPSByZWR1Y2VUb05hbWVzQnkoZnVuY3Rpb24oc3R1ZGVudCkge1xuICogICAgICAgIHZhciBzY29yZSA9IHN0dWRlbnQuc2NvcmU7XG4gKiAgICAgICAgcmV0dXJuIHNjb3JlIDwgNjUgPyAnRicgOlxuICogICAgICAgICAgICAgICBzY29yZSA8IDcwID8gJ0QnIDpcbiAqICAgICAgICAgICAgICAgc2NvcmUgPCA4MCA/ICdDJyA6XG4gKiAgICAgICAgICAgICAgIHNjb3JlIDwgOTAgPyAnQicgOiAnQSc7XG4gKiAgICAgIH0pO1xuICogICAgICB2YXIgc3R1ZGVudHMgPSBbe25hbWU6ICdMdWN5Jywgc2NvcmU6IDkyfSxcbiAqICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOiAnRHJldycsIHNjb3JlOiA4NX0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOiAnQmFydCcsIHNjb3JlOiA2Mn1dO1xuICogICAgICBuYW1lc0J5R3JhZGUoc3R1ZGVudHMpO1xuICogICAgICAvLyB7XG4gKiAgICAgIC8vICAgJ0EnOiBbJ0x1Y3knXSxcbiAqICAgICAgLy8gICAnQic6IFsnRHJldyddXG4gKiAgICAgIC8vICAgLy8gLi4uLFxuICogICAgICAvLyAgICdGJzogWydCYXJ0J11cbiAqICAgICAgLy8gfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeU4oNCwgW10sIF9kaXNwYXRjaGFibGUoW10sIF94cmVkdWNlQnksXG4gIGZ1bmN0aW9uIHJlZHVjZUJ5KHZhbHVlRm4sIHZhbHVlQWNjLCBrZXlGbiwgbGlzdCkge1xuICAgIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uKGFjYywgZWx0KSB7XG4gICAgICB2YXIga2V5ID0ga2V5Rm4oZWx0KTtcbiAgICAgIGFjY1trZXldID0gdmFsdWVGbihfaGFzKGtleSwgYWNjKSA/IGFjY1trZXldIDogdmFsdWVBY2MsIGVsdCk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9LCBsaXN0KTtcbiAgfSkpO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGUgaXRlbSBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmdcbiAqIHRoZSBpdGVyYXRvciBmdW5jdGlvbiBhbmQgcGFzc2luZyBpdCBhbiBhY2N1bXVsYXRvciB2YWx1ZSBhbmQgdGhlIGN1cnJlbnRcbiAqIHZhbHVlIGZyb20gdGhlIGFycmF5LCBhbmQgdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAqXG4gKiBTaW1pbGFyIHRvIGByZWR1Y2VgLCBleGNlcHQgbW92ZXMgdGhyb3VnaCB0aGUgaW5wdXQgbGlzdCBmcm9tIHRoZSByaWdodCB0b1xuICogdGhlIGxlZnQuXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICoodmFsdWUsIGFjYykqLCB3aGlsZSB0aGUgYXJndW1lbnRzJ1xuICogb3JkZXIgb2YgYHJlZHVjZWAncyBpdGVyYXRvciBmdW5jdGlvbiBpcyAqKGFjYywgdmFsdWUpKi5cbiAqXG4gKiBOb3RlOiBgUi5yZWR1Y2VSaWdodGAgZG9lcyBub3Qgc2tpcCBkZWxldGVkIG9yIHVuYXNzaWduZWQgaW5kaWNlcyAoc3BhcnNlXG4gKiBhcnJheXMpLCB1bmxpa2UgdGhlIG5hdGl2ZSBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAgbWV0aG9kLiBGb3IgbW9yZSBkZXRhaWxzXG4gKiBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9yZWR1Y2VSaWdodCNEZXNjcmlwdGlvblxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEsIGIgLT4gYikgLT4gYiAtPiBbYV0gLT4gYlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5XG4gKiAgICAgICAgYW5kIHRoZSBhY2N1bXVsYXRvci5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5yZWR1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJlZHVjZVJpZ2h0KFIuc3VidHJhY3QsIDAsIFsxLCAyLCAzLCA0XSkgLy8gPT4gKDEgLSAoMiAtICgzIC0gKDQgLSAwKSkpKSA9IC0yXG4gKiAgICAgICAgICAtICAgICAgICAgICAgICAgLTJcbiAqICAgICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAgIDEgICAtICAgICAgICAgICAgMSAgIDNcbiAqICAgICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgICAyICAgLSAgICAgPT0+ICAgIDIgIC0xXG4gKiAgICAgICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgICAgICAgIDMgICAtICAgICAgICAgICAgMyAgIDRcbiAqICAgICAgICAgICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAgICAgICAgIDQgICAwICAgICAgICAgICAgNCAgIDBcbiAqXG4gKiBAc3ltYiBSLnJlZHVjZVJpZ2h0KGYsIGEsIFtiLCBjLCBkXSkgPSBmKGIsIGYoYywgZihkLCBhKSkpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiByZWR1Y2VSaWdodChmbiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIGFjYyA9IGZuKGxpc3RbaWR4XSwgYWNjKTtcbiAgICBpZHggLT0gMTtcbiAgfVxuICByZXR1cm4gYWNjO1xufSk7XG4iLCJ2YXIgX2N1cnJ5TiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5TicpO1xudmFyIF9yZWR1Y2UgPSByZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcbnZhciBfcmVkdWNlZCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZWQnKTtcblxuXG4vKipcbiAqIExpa2UgYHJlZHVjZWAsIGByZWR1Y2VXaGlsZWAgcmV0dXJucyBhIHNpbmdsZSBpdGVtIGJ5IGl0ZXJhdGluZyB0aHJvdWdoXG4gKiB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmcgdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBgcmVkdWNlV2hpbGVgIGFsc29cbiAqIHRha2VzIGEgcHJlZGljYXRlIHRoYXQgaXMgZXZhbHVhdGVkIGJlZm9yZSBlYWNoIHN0ZXAuIElmIHRoZSBwcmVkaWNhdGUgcmV0dXJuc1xuICogYGZhbHNlYCwgaXQgXCJzaG9ydC1jaXJjdWl0c1wiIHRoZSBpdGVyYXRpb24gYW5kIHJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWVcbiAqIG9mIHRoZSBhY2N1bXVsYXRvci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IEJvb2xlYW4pIC0+ICgoYSwgYikgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBUaGUgcHJlZGljYXRlLiBJdCBpcyBwYXNzZWQgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAqICAgICAgICBjdXJyZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIFJlY2VpdmVzIHR3byB2YWx1ZXMsIHRoZVxuICogICAgICAgIGFjY3VtdWxhdG9yIGFuZCB0aGUgY3VycmVudCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5yZWR1Y2UsIFIucmVkdWNlZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpc09kZCA9IChhY2MsIHgpID0+IHggJSAyID09PSAxO1xuICogICAgICB2YXIgeHMgPSBbMSwgMywgNSwgNjAsIDc3NywgODAwXTtcbiAqICAgICAgUi5yZWR1Y2VXaGlsZShpc09kZCwgUi5hZGQsIDAsIHhzKTsgLy89PiA5XG4gKlxuICogICAgICB2YXIgeXMgPSBbMiwgNCwgNl1cbiAqICAgICAgUi5yZWR1Y2VXaGlsZShpc09kZCwgUi5hZGQsIDExMSwgeXMpOyAvLz0+IDExMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeU4oNCwgW10sIGZ1bmN0aW9uIF9yZWR1Y2VXaGlsZShwcmVkLCBmbiwgYSwgbGlzdCkge1xuICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbihhY2MsIHgpIHtcbiAgICByZXR1cm4gcHJlZChhY2MsIHgpID8gZm4oYWNjLCB4KSA6IF9yZWR1Y2VkKGFjYyk7XG4gIH0sIGEsIGxpc3QpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9yZWR1Y2VkID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlZCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSB2YWx1ZSB3cmFwcGVkIHRvIGluZGljYXRlIHRoYXQgaXQgaXMgdGhlIGZpbmFsIHZhbHVlIG9mIHRoZSByZWR1Y2VcbiAqIGFuZCB0cmFuc2R1Y2UgZnVuY3Rpb25zLiBUaGUgcmV0dXJuZWQgdmFsdWUgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSBibGFja1xuICogYm94OiB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIHN0YWJsZS5cbiAqXG4gKiBOb3RlOiB0aGlzIG9wdGltaXphdGlvbiBpcyB1bmF2YWlsYWJsZSB0byBmdW5jdGlvbnMgbm90IGV4cGxpY2l0bHkgbGlzdGVkXG4gKiBhYm92ZS4gRm9yIGluc3RhbmNlLCBpdCBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZCBieSByZWR1Y2VSaWdodC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+ICpcbiAqIEBwYXJhbSB7Kn0geCBUaGUgZmluYWwgdmFsdWUgb2YgdGhlIHJlZHVjZS5cbiAqIEByZXR1cm4geyp9IFRoZSB3cmFwcGVkIHZhbHVlLlxuICogQHNlZSBSLnJlZHVjZSwgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnJlZHVjZShcbiAqICAgICAgICBSLnBpcGUoUi5hZGQsIFIud2hlbihSLmd0ZShSLl9fLCAxMCksIFIucmVkdWNlZCkpLFxuICogICAgICAgIDAsXG4gKiAgICAgICAgWzEsIDIsIDMsIDQsIDVdKSAvLyAxMFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShfcmVkdWNlZCk7XG4iLCJ2YXIgX2NvbXBsZW1lbnQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb21wbGVtZW50Jyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4vZmlsdGVyJyk7XG5cblxuLyoqXG4gKiBUaGUgY29tcGxlbWVudCBvZiBgZmlsdGVyYC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBGaWx0ZXJhYmxlIGYgPT4gKGEgLT4gQm9vbGVhbikgLT4gZiBhIC0+IGYgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gZmlsdGVyYWJsZVxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAc2VlIFIuZmlsdGVyLCBSLnRyYW5zZHVjZSwgUi5hZGRJbmRleFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpc09kZCA9IChuKSA9PiBuICUgMiA9PT0gMTtcbiAqXG4gKiAgICAgIFIucmVqZWN0KGlzT2RkLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsyLCA0XVxuICpcbiAqICAgICAgUi5yZWplY3QoaXNPZGQsIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2I6IDIsIGQ6IDR9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiByZWplY3QocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gZmlsdGVyKF9jb21wbGVtZW50KHByZWQpLCBmaWx0ZXJhYmxlKTtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHN1Yi1saXN0IG9mIGBsaXN0YCBzdGFydGluZyBhdCBpbmRleCBgc3RhcnRgIGFuZCBjb250YWluaW5nXG4gKiBgY291bnRgIGVsZW1lbnRzLiBfTm90ZSB0aGF0IHRoaXMgaXMgbm90IGRlc3RydWN0aXZlXzogaXQgcmV0dXJucyBhIGNvcHkgb2ZcbiAqIHRoZSBsaXN0IHdpdGggdGhlIGNoYW5nZXMuXG4gKiA8c21hbGw+Tm8gbGlzdHMgaGF2ZSBiZWVuIGhhcm1lZCBpbiB0aGUgYXBwbGljYXRpb24gb2YgdGhpcyBmdW5jdGlvbi48L3NtYWxsPlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMlxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgVGhlIHBvc2l0aW9uIHRvIHN0YXJ0IHJlbW92aW5nIGVsZW1lbnRzXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgVGhlIG51bWJlciBvZiBlbGVtZW50cyB0byByZW1vdmVcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gcmVtb3ZlIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBBcnJheSB3aXRoIGBjb3VudGAgZWxlbWVudHMgZnJvbSBgc3RhcnRgIHJlbW92ZWQuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5yZW1vdmUoMiwgMywgWzEsMiwzLDQsNSw2LDcsOF0pOyAvLz0+IFsxLDIsNiw3LDhdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiByZW1vdmUoc3RhcnQsIGNvdW50LCBsaXN0KSB7XG4gIHZhciByZXN1bHQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKTtcbiAgcmVzdWx0LnNwbGljZShzdGFydCwgY291bnQpO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIGFsd2F5cyA9IHJlcXVpcmUoJy4vYWx3YXlzJyk7XG52YXIgdGltZXMgPSByZXF1aXJlKCcuL3RpbWVzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgZml4ZWQgbGlzdCBvZiBzaXplIGBuYCBjb250YWluaW5nIGEgc3BlY2lmaWVkIGlkZW50aWNhbCB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gbiAtPiBbYV1cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJlcGVhdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBkZXNpcmVkIHNpemUgb2YgdGhlIG91dHB1dCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IGNvbnRhaW5pbmcgYG5gIGB2YWx1ZWBzLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVwZWF0KCdoaScsIDUpOyAvLz0+IFsnaGknLCAnaGknLCAnaGknLCAnaGknLCAnaGknXVxuICpcbiAqICAgICAgdmFyIG9iaiA9IHt9O1xuICogICAgICB2YXIgcmVwZWF0ZWRPYmpzID0gUi5yZXBlYXQob2JqLCA1KTsgLy89PiBbe30sIHt9LCB7fSwge30sIHt9XVxuICogICAgICByZXBlYXRlZE9ianNbMF0gPT09IHJlcGVhdGVkT2Jqc1sxXTsgLy89PiB0cnVlXG4gKiBAc3ltYiBSLnJlcGVhdChhLCAwKSA9IFtdXG4gKiBAc3ltYiBSLnJlcGVhdChhLCAxKSA9IFthXVxuICogQHN5bWIgUi5yZXBlYXQoYSwgMikgPSBbYSwgYV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHJlcGVhdCh2YWx1ZSwgbikge1xuICByZXR1cm4gdGltZXMoYWx3YXlzKHZhbHVlKSwgbik7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBSZXBsYWNlIGEgc3Vic3RyaW5nIG9yIHJlZ2V4IG1hdGNoIGluIGEgc3RyaW5nIHdpdGggYSByZXBsYWNlbWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgUmVnRXhwfFN0cmluZyAtPiBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBwYXR0ZXJuIEEgcmVndWxhciBleHByZXNzaW9uIG9yIGEgc3Vic3RyaW5nIHRvIG1hdGNoLlxuICogQHBhcmFtIHtTdHJpbmd9IHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gcmVwbGFjZSB0aGUgbWF0Y2hlcyB3aXRoLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIGRvIHRoZSBzZWFyY2ggYW5kIHJlcGxhY2VtZW50IGluLlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVzdWx0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVwbGFjZSgnZm9vJywgJ2JhcicsICdmb28gZm9vIGZvbycpOyAvLz0+ICdiYXIgZm9vIGZvbydcbiAqICAgICAgUi5yZXBsYWNlKC9mb28vLCAnYmFyJywgJ2ZvbyBmb28gZm9vJyk7IC8vPT4gJ2JhciBmb28gZm9vJ1xuICpcbiAqICAgICAgLy8gVXNlIHRoZSBcImdcIiAoZ2xvYmFsKSBmbGFnIHRvIHJlcGxhY2UgYWxsIG9jY3VycmVuY2VzOlxuICogICAgICBSLnJlcGxhY2UoL2Zvby9nLCAnYmFyJywgJ2ZvbyBmb28gZm9vJyk7IC8vPT4gJ2JhciBiYXIgYmFyJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gcmVwbGFjZShyZWdleCwgcmVwbGFjZW1lbnQsIHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXgsIHJlcGxhY2VtZW50KTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc1N0cmluZycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IG9yIHN0cmluZyB3aXRoIHRoZSBlbGVtZW50cyBvciBjaGFyYWN0ZXJzIGluIHJldmVyc2VcbiAqIG9yZGVyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gbGlzdFxuICogQHJldHVybiB7QXJyYXl8U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmV2ZXJzZShbMSwgMiwgM10pOyAgLy89PiBbMywgMiwgMV1cbiAqICAgICAgUi5yZXZlcnNlKFsxLCAyXSk7ICAgICAvLz0+IFsyLCAxXVxuICogICAgICBSLnJldmVyc2UoWzFdKTsgICAgICAgIC8vPT4gWzFdXG4gKiAgICAgIFIucmV2ZXJzZShbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi5yZXZlcnNlKCdhYmMnKTsgICAgICAvLz0+ICdjYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYWInKTsgICAgICAgLy89PiAnYmEnXG4gKiAgICAgIFIucmV2ZXJzZSgnYScpOyAgICAgICAgLy89PiAnYSdcbiAqICAgICAgUi5yZXZlcnNlKCcnKTsgICAgICAgICAvLz0+ICcnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiByZXZlcnNlKGxpc3QpIHtcbiAgcmV0dXJuIF9pc1N0cmluZyhsaXN0KSA/IGxpc3Quc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5yZXZlcnNlKCk7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBTY2FuIGlzIHNpbWlsYXIgdG8gcmVkdWNlLCBidXQgcmV0dXJucyBhIGxpc3Qgb2Ygc3VjY2Vzc2l2ZWx5IHJlZHVjZWQgdmFsdWVzXG4gKiBmcm9tIHRoZSBsZWZ0XG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEsYiAtPiBhKSAtPiBhIC0+IFtiXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IEEgbGlzdCBvZiBhbGwgaW50ZXJtZWRpYXRlbHkgcmVkdWNlZCB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG51bWJlcnMgPSBbMSwgMiwgMywgNF07XG4gKiAgICAgIHZhciBmYWN0b3JpYWxzID0gUi5zY2FuKFIubXVsdGlwbHksIDEsIG51bWJlcnMpOyAvLz0+IFsxLCAxLCAyLCA2LCAyNF1cbiAqIEBzeW1iIFIuc2NhbihmLCBhLCBbYiwgY10pID0gW2EsIGYoYSwgYiksIGYoZihhLCBiKSwgYyldXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBzY2FuKGZuLCBhY2MsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IFthY2NdO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgYWNjID0gZm4oYWNjLCBsaXN0W2lkeF0pO1xuICAgIHJlc3VsdFtpZHggKyAxXSA9IGFjYztcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIGFwID0gcmVxdWlyZSgnLi9hcCcpO1xudmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG52YXIgcHJlcGVuZCA9IHJlcXVpcmUoJy4vcHJlcGVuZCcpO1xudmFyIHJlZHVjZVJpZ2h0ID0gcmVxdWlyZSgnLi9yZWR1Y2VSaWdodCcpO1xuXG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIFtUcmF2ZXJzYWJsZV0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCN0cmF2ZXJzYWJsZSlcbiAqIG9mIFtBcHBsaWNhdGl2ZV0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNhcHBsaWNhdGl2ZSkgaW50byBhblxuICogQXBwbGljYXRpdmUgb2YgVHJhdmVyc2FibGUuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHNlcXVlbmNlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoQXBwbGljYXRpdmUgZiwgVHJhdmVyc2FibGUgdCkgPT4gKGEgLT4gZiBhKSAtPiB0IChmIGEpIC0+IGYgKHQgYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9mXG4gKiBAcGFyYW0geyp9IHRyYXZlcnNhYmxlXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLnRyYXZlcnNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zZXF1ZW5jZShNYXliZS5vZiwgW0p1c3QoMSksIEp1c3QoMiksIEp1c3QoMyldKTsgICAvLz0+IEp1c3QoWzEsIDIsIDNdKVxuICogICAgICBSLnNlcXVlbmNlKE1heWJlLm9mLCBbSnVzdCgxKSwgSnVzdCgyKSwgTm90aGluZygpXSk7IC8vPT4gTm90aGluZygpXG4gKlxuICogICAgICBSLnNlcXVlbmNlKFIub2YsIEp1c3QoWzEsIDIsIDNdKSk7IC8vPT4gW0p1c3QoMSksIEp1c3QoMiksIEp1c3QoMyldXG4gKiAgICAgIFIuc2VxdWVuY2UoUi5vZiwgTm90aGluZygpKTsgICAgICAgLy89PiBbTm90aGluZygpXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gc2VxdWVuY2Uob2YsIHRyYXZlcnNhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdHJhdmVyc2FibGUuc2VxdWVuY2UgPT09ICdmdW5jdGlvbicgP1xuICAgIHRyYXZlcnNhYmxlLnNlcXVlbmNlKG9mKSA6XG4gICAgcmVkdWNlUmlnaHQoZnVuY3Rpb24oeCwgYWNjKSB7IHJldHVybiBhcChtYXAocHJlcGVuZCwgeCksIGFjYyk7IH0sXG4gICAgICAgICAgICAgICAgb2YoW10pLFxuICAgICAgICAgICAgICAgIHRyYXZlcnNhYmxlKTtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcbnZhciBhbHdheXMgPSByZXF1aXJlKCcuL2Fsd2F5cycpO1xudmFyIG92ZXIgPSByZXF1aXJlKCcuL292ZXInKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBcInNldHRpbmdcIiB0aGUgcG9ydGlvbiBvZiB0aGUgZ2l2ZW4gZGF0YSBzdHJ1Y3R1cmVcbiAqIGZvY3VzZWQgYnkgdGhlIGdpdmVuIGxlbnMgdG8gdGhlIGdpdmVuIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIExlbnMgcyBhIC0+IGEgLT4gcyAtPiBzXG4gKiBAcGFyYW0ge0xlbnN9IGxlbnNcbiAqIEBwYXJhbSB7Kn0gdlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICpcbiAqICAgICAgUi5zZXQoeExlbnMsIDQsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt4OiA0LCB5OiAyfVxuICogICAgICBSLnNldCh4TGVucywgOCwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IDgsIHk6IDJ9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBzZXQobGVucywgdiwgeCkge1xuICByZXR1cm4gb3ZlcihsZW5zLCBhbHdheXModiksIHgpO1xufSk7XG4iLCJ2YXIgX2NoZWNrRm9yTWV0aG9kID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QnKTtcbnZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdCB3aXRoIGEgYHNsaWNlYFxuICogbWV0aG9kKSBmcm9tIGBmcm9tSW5kZXhgIChpbmNsdXNpdmUpIHRvIGB0b0luZGV4YCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgc2xpY2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4IFRoZSBzdGFydCBpbmRleCAoaW5jbHVzaXZlKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4IFRoZSBlbmQgaW5kZXggKGV4Y2x1c2l2ZSkuXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zbGljZSgxLCAzLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgxLCBJbmZpbml0eSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAvLz0+IFsnYicsICdjJywgJ2QnXVxuICogICAgICBSLnNsaWNlKDAsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgIC8vPT4gWydhJywgJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoLTMsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgLy89PiBbJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoMCwgMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgICAgICAgLy89PiAncmFtJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoX2NoZWNrRm9yTWV0aG9kKCdzbGljZScsIGZ1bmN0aW9uIHNsaWNlKGZyb21JbmRleCwgdG9JbmRleCwgbGlzdCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgZnJvbUluZGV4LCB0b0luZGV4KTtcbn0pKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgY29weSBvZiB0aGUgbGlzdCwgc29ydGVkIGFjY29yZGluZyB0byB0aGUgY29tcGFyYXRvciBmdW5jdGlvbixcbiAqIHdoaWNoIHNob3VsZCBhY2NlcHQgdHdvIHZhbHVlcyBhdCBhIHRpbWUgYW5kIHJldHVybiBhIG5lZ2F0aXZlIG51bWJlciBpZiB0aGVcbiAqIGZpcnN0IHZhbHVlIGlzIHNtYWxsZXIsIGEgcG9zaXRpdmUgbnVtYmVyIGlmIGl0J3MgbGFyZ2VyLCBhbmQgemVybyBpZiB0aGV5XG4gKiBhcmUgZXF1YWwuIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBpcyBhICoqY29weSoqIG9mIHRoZSBsaXN0LiBJdCBkb2VzIG5vdFxuICogbW9kaWZ5IHRoZSBvcmlnaW5hbC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhLGEgLT4gTnVtYmVyKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIEEgc29ydGluZyBmdW5jdGlvbiA6OiBhIC0+IGIgLT4gSW50XG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHNvcnRcbiAqIEByZXR1cm4ge0FycmF5fSBhIG5ldyBhcnJheSB3aXRoIGl0cyBlbGVtZW50cyBzb3J0ZWQgYnkgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRpZmYgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcbiAqICAgICAgUi5zb3J0KGRpZmYsIFs0LDIsNyw1XSk7IC8vPT4gWzIsIDQsIDUsIDddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBzb3J0KGNvbXBhcmF0b3IsIGxpc3QpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIDApLnNvcnQoY29tcGFyYXRvcik7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBTb3J0cyB0aGUgbGlzdCBhY2NvcmRpbmcgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBiID0+IChhIC0+IGIpIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHNvcnQuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgbGlzdCBzb3J0ZWQgYnkgdGhlIGtleXMgZ2VuZXJhdGVkIGJ5IGBmbmAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHNvcnRCeUZpcnN0SXRlbSA9IFIuc29ydEJ5KFIucHJvcCgwKSk7XG4gKiAgICAgIHZhciBzb3J0QnlOYW1lQ2FzZUluc2Vuc2l0aXZlID0gUi5zb3J0QnkoUi5jb21wb3NlKFIudG9Mb3dlciwgUi5wcm9wKCduYW1lJykpKTtcbiAqICAgICAgdmFyIHBhaXJzID0gW1stMSwgMV0sIFstMiwgMl0sIFstMywgM11dO1xuICogICAgICBzb3J0QnlGaXJzdEl0ZW0ocGFpcnMpOyAvLz0+IFtbLTMsIDNdLCBbLTIsIDJdLCBbLTEsIDFdXVxuICogICAgICB2YXIgYWxpY2UgPSB7XG4gKiAgICAgICAgbmFtZTogJ0FMSUNFJyxcbiAqICAgICAgICBhZ2U6IDEwMVxuICogICAgICB9O1xuICogICAgICB2YXIgYm9iID0ge1xuICogICAgICAgIG5hbWU6ICdCb2InLFxuICogICAgICAgIGFnZTogLTEwXG4gKiAgICAgIH07XG4gKiAgICAgIHZhciBjbGFyYSA9IHtcbiAqICAgICAgICBuYW1lOiAnY2xhcmEnLFxuICogICAgICAgIGFnZTogMzE0LjE1OVxuICogICAgICB9O1xuICogICAgICB2YXIgcGVvcGxlID0gW2NsYXJhLCBib2IsIGFsaWNlXTtcbiAqICAgICAgc29ydEJ5TmFtZUNhc2VJbnNlbnNpdGl2ZShwZW9wbGUpOyAvLz0+IFthbGljZSwgYm9iLCBjbGFyYV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHNvcnRCeShmbiwgbGlzdCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIGFhID0gZm4oYSk7XG4gICAgdmFyIGJiID0gZm4oYik7XG4gICAgcmV0dXJuIGFhIDwgYmIgPyAtMSA6IGFhID4gYmIgPyAxIDogMDtcbiAgfSk7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBTb3J0cyBhIGxpc3QgYWNjb3JkaW5nIHRvIGEgbGlzdCBvZiBjb21wYXJhdG9ycy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMy4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgW2EgLT4gYSAtPiBOdW1iZXJdIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7QXJyYXl9IGZ1bmN0aW9ucyBBIGxpc3Qgb2YgY29tcGFyYXRvciBmdW5jdGlvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHNvcnQuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgbGlzdCBzb3J0ZWQgYWNjb3JkaW5nIHRvIHRoZSBjb21hcmF0b3IgZnVuY3Rpb25zLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBhbGljZSA9IHtcbiAqICAgICAgICBuYW1lOiAnYWxpY2UnLFxuICogICAgICAgIGFnZTogNDBcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIGJvYiA9IHtcbiAqICAgICAgICBuYW1lOiAnYm9iJyxcbiAqICAgICAgICBhZ2U6IDMwXG4gKiAgICAgIH07XG4gKiAgICAgIHZhciBjbGFyYSA9IHtcbiAqICAgICAgICBuYW1lOiAnY2xhcmEnLFxuICogICAgICAgIGFnZTogNDBcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIHBlb3BsZSA9IFtjbGFyYSwgYm9iLCBhbGljZV07XG4gKiAgICAgIHZhciBhZ2VOYW1lU29ydCA9IFIuc29ydFdpdGgoW1xuICogICAgICAgIFIuZGVzY2VuZChSLnByb3AoJ2FnZScpKSxcbiAqICAgICAgICBSLmFzY2VuZChSLnByb3AoJ25hbWUnKSlcbiAqICAgICAgXSk7XG4gKiAgICAgIGFnZU5hbWVTb3J0KHBlb3BsZSk7IC8vPT4gW2FsaWNlLCBjbGFyYSwgYm9iXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gc29ydFdpdGgoZm5zLCBsaXN0KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHJlc3VsdCA9PT0gMCAmJiBpIDwgZm5zLmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0gZm5zW2ldKGEsIGIpO1xuICAgICAgaSArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbn0pO1xuIiwidmFyIGludm9rZXIgPSByZXF1aXJlKCcuL2ludm9rZXInKTtcblxuXG4vKipcbiAqIFNwbGl0cyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MgYmFzZWQgb24gdGhlIGdpdmVuXG4gKiBzZXBhcmF0b3IuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAc2lnIChTdHJpbmcgfCBSZWdFeHApIC0+IFN0cmluZyAtPiBbU3RyaW5nXVxuICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBzZXAgVGhlIHBhdHRlcm4uXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gc2VwYXJhdGUgaW50byBhbiBhcnJheS5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgYXJyYXkgb2Ygc3RyaW5ncyBmcm9tIGBzdHJgIHNlcGFyYXRlZCBieSBgc3RyYC5cbiAqIEBzZWUgUi5qb2luXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHBhdGhDb21wb25lbnRzID0gUi5zcGxpdCgnLycpO1xuICogICAgICBSLnRhaWwocGF0aENvbXBvbmVudHMoJy91c3IvbG9jYWwvYmluL25vZGUnKSk7IC8vPT4gWyd1c3InLCAnbG9jYWwnLCAnYmluJywgJ25vZGUnXVxuICpcbiAqICAgICAgUi5zcGxpdCgnLicsICdhLmIuYy54eXouZCcpOyAvLz0+IFsnYScsICdiJywgJ2MnLCAneHl6JywgJ2QnXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGludm9rZXIoMSwgJ3NwbGl0Jyk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIGxlbmd0aCA9IHJlcXVpcmUoJy4vbGVuZ3RoJyk7XG52YXIgc2xpY2UgPSByZXF1aXJlKCcuL3NsaWNlJyk7XG5cblxuLyoqXG4gKiBTcGxpdHMgYSBnaXZlbiBsaXN0IG9yIHN0cmluZyBhdCBhIGdpdmVuIGluZGV4LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW1thXSwgW2FdXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFtTdHJpbmcsIFN0cmluZ11cbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggd2hlcmUgdGhlIGFycmF5L3N0cmluZyBpcyBzcGxpdC5cbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBhcnJheSBUaGUgYXJyYXkvc3RyaW5nIHRvIGJlIHNwbGl0LlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zcGxpdEF0KDEsIFsxLCAyLCAzXSk7ICAgICAgICAgIC8vPT4gW1sxXSwgWzIsIDNdXVxuICogICAgICBSLnNwbGl0QXQoNSwgJ2hlbGxvIHdvcmxkJyk7ICAgICAgLy89PiBbJ2hlbGxvJywgJyB3b3JsZCddXG4gKiAgICAgIFIuc3BsaXRBdCgtMSwgJ2Zvb2JhcicpOyAgICAgICAgICAvLz0+IFsnZm9vYmEnLCAnciddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBzcGxpdEF0KGluZGV4LCBhcnJheSkge1xuICByZXR1cm4gW3NsaWNlKDAsIGluZGV4LCBhcnJheSksIHNsaWNlKGluZGV4LCBsZW5ndGgoYXJyYXkpLCBhcnJheSldO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIHNsaWNlID0gcmVxdWlyZSgnLi9zbGljZScpO1xuXG5cbi8qKlxuICogU3BsaXRzIGEgY29sbGVjdGlvbiBpbnRvIHNsaWNlcyBvZiB0aGUgc3BlY2lmaWVkIGxlbmd0aC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFtbYV1dXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gW1N0cmluZ11cbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnNwbGl0RXZlcnkoMywgWzEsIDIsIDMsIDQsIDUsIDYsIDddKTsgLy89PiBbWzEsIDIsIDNdLCBbNCwgNSwgNl0sIFs3XV1cbiAqICAgICAgUi5zcGxpdEV2ZXJ5KDMsICdmb29iYXJiYXonKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHNwbGl0RXZlcnkobiwgbGlzdCkge1xuICBpZiAobiA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBzcGxpdEV2ZXJ5IG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnB1c2goc2xpY2UoaWR4LCBpZHggKz0gbiwgbGlzdCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBUYWtlcyBhIGxpc3QgYW5kIGEgcHJlZGljYXRlIGFuZCByZXR1cm5zIGEgcGFpciBvZiBsaXN0cyB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgLSB0aGUgcmVzdWx0IG9mIGNvbmNhdGVuYXRpbmcgdGhlIHR3byBvdXRwdXQgbGlzdHMgaXMgZXF1aXZhbGVudCB0byB0aGUgaW5wdXQgbGlzdDtcbiAqICAtIG5vbmUgb2YgdGhlIGVsZW1lbnRzIG9mIHRoZSBmaXJzdCBvdXRwdXQgbGlzdCBzYXRpc2ZpZXMgdGhlIHByZWRpY2F0ZTsgYW5kXG4gKiAgLSBpZiB0aGUgc2Vjb25kIG91dHB1dCBsaXN0IGlzIG5vbi1lbXB0eSwgaXRzIGZpcnN0IGVsZW1lbnQgc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFtbYV0sIFthXV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgVGhlIHByZWRpY2F0ZSB0aGF0IGRldGVybWluZXMgd2hlcmUgdGhlIGFycmF5IGlzIHNwbGl0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gYmUgc3BsaXQuXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnNwbGl0V2hlbihSLmVxdWFscygyKSwgWzEsIDIsIDMsIDEsIDIsIDNdKTsgICAvLz0+IFtbMV0sIFsyLCAzLCAxLCAyLCAzXV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHNwbGl0V2hlbihwcmVkLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciBwcmVmaXggPSBbXTtcblxuICB3aGlsZSAoaWR4IDwgbGVuICYmICFwcmVkKGxpc3RbaWR4XSkpIHtcbiAgICBwcmVmaXgucHVzaChsaXN0W2lkeF0pO1xuICAgIGlkeCArPSAxO1xuICB9XG5cbiAgcmV0dXJuIFtwcmVmaXgsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIGlkeCldO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogU3VidHJhY3RzIGl0cyBzZWNvbmQgYXJndW1lbnQgZnJvbSBpdHMgZmlyc3QgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYSAtIGJgLlxuICogQHNlZSBSLmFkZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc3VidHJhY3QoMTAsIDgpOyAvLz0+IDJcbiAqXG4gKiAgICAgIHZhciBtaW51czUgPSBSLnN1YnRyYWN0KFIuX18sIDUpO1xuICogICAgICBtaW51czUoMTcpOyAvLz0+IDEyXG4gKlxuICogICAgICB2YXIgY29tcGxlbWVudGFyeUFuZ2xlID0gUi5zdWJ0cmFjdCg5MCk7XG4gKiAgICAgIGNvbXBsZW1lbnRhcnlBbmdsZSgzMCk7IC8vPT4gNjBcbiAqICAgICAgY29tcGxlbWVudGFyeUFuZ2xlKDcyKTsgLy89PiAxOFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gc3VidHJhY3QoYSwgYikge1xuICByZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xufSk7XG4iLCJ2YXIgYWRkID0gcmVxdWlyZSgnLi9hZGQnKTtcbnZhciByZWR1Y2UgPSByZXF1aXJlKCcuL3JlZHVjZScpO1xuXG5cbi8qKlxuICogQWRkcyB0b2dldGhlciBhbGwgdGhlIGVsZW1lbnRzIG9mIGEgbGlzdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBBbiBhcnJheSBvZiBudW1iZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBzdW0gb2YgYWxsIHRoZSBudW1iZXJzIGluIHRoZSBsaXN0LlxuICogQHNlZSBSLnJlZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc3VtKFsyLDQsNiw4LDEwMCwxXSk7IC8vPT4gMTIxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlKGFkZCwgMCk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIGNvbmNhdCA9IHJlcXVpcmUoJy4vY29uY2F0Jyk7XG52YXIgZGlmZmVyZW5jZSA9IHJlcXVpcmUoJy4vZGlmZmVyZW5jZScpO1xuXG5cbi8qKlxuICogRmluZHMgdGhlIHNldCAoaS5lLiBubyBkdXBsaWNhdGVzKSBvZiBhbGwgZWxlbWVudHMgY29udGFpbmVkIGluIHRoZSBmaXJzdCBvclxuICogc2Vjb25kIGxpc3QsIGJ1dCBub3QgYm90aC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgWypdIC0+IFsqXSAtPiBbKl1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBlbGVtZW50cyBpbiBgbGlzdDFgIG9yIGBsaXN0MmAsIGJ1dCBub3QgYm90aC5cbiAqIEBzZWUgUi5zeW1tZXRyaWNEaWZmZXJlbmNlV2l0aCwgUi5kaWZmZXJlbmNlLCBSLmRpZmZlcmVuY2VXaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zeW1tZXRyaWNEaWZmZXJlbmNlKFsxLDIsMyw0XSwgWzcsNiw1LDQsM10pOyAvLz0+IFsxLDIsNyw2LDVdXG4gKiAgICAgIFIuc3ltbWV0cmljRGlmZmVyZW5jZShbNyw2LDUsNCwzXSwgWzEsMiwzLDRdKTsgLy89PiBbNyw2LDUsMSwyXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gc3ltbWV0cmljRGlmZmVyZW5jZShsaXN0MSwgbGlzdDIpIHtcbiAgcmV0dXJuIGNvbmNhdChkaWZmZXJlbmNlKGxpc3QxLCBsaXN0MiksIGRpZmZlcmVuY2UobGlzdDIsIGxpc3QxKSk7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgY29uY2F0ID0gcmVxdWlyZSgnLi9jb25jYXQnKTtcbnZhciBkaWZmZXJlbmNlV2l0aCA9IHJlcXVpcmUoJy4vZGlmZmVyZW5jZVdpdGgnKTtcblxuXG4vKipcbiAqIEZpbmRzIHRoZSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgb2YgYWxsIGVsZW1lbnRzIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3Qgb3JcbiAqIHNlY29uZCBsaXN0LCBidXQgbm90IGJvdGguIER1cGxpY2F0aW9uIGlzIGRldGVybWluZWQgYWNjb3JkaW5nIHRvIHRoZSB2YWx1ZVxuICogcmV0dXJuZWQgYnkgYXBwbHlpbmcgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSB0byB0d28gbGlzdCBlbGVtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKChhLCBhKSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgb3IgYGxpc3QyYCwgYnV0IG5vdCBib3RoLlxuICogQHNlZSBSLnN5bW1ldHJpY0RpZmZlcmVuY2UsIFIuZGlmZmVyZW5jZSwgUi5kaWZmZXJlbmNlV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBlcUEgPSBSLmVxQnkoUi5wcm9wKCdhJykpO1xuICogICAgICB2YXIgbDEgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfSwge2E6IDR9XTtcbiAqICAgICAgdmFyIGwyID0gW3thOiAzfSwge2E6IDR9LCB7YTogNX0sIHthOiA2fV07XG4gKiAgICAgIFIuc3ltbWV0cmljRGlmZmVyZW5jZVdpdGgoZXFBLCBsMSwgbDIpOyAvLz0+IFt7YTogMX0sIHthOiAyfSwge2E6IDV9LCB7YTogNn1dXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBzeW1tZXRyaWNEaWZmZXJlbmNlV2l0aChwcmVkLCBsaXN0MSwgbGlzdDIpIHtcbiAgcmV0dXJuIGNvbmNhdChkaWZmZXJlbmNlV2l0aChwcmVkLCBsaXN0MSwgbGlzdDIpLCBkaWZmZXJlbmNlV2l0aChwcmVkLCBsaXN0MiwgbGlzdDEpKTtcbn0pO1xuIiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kJyk7XG52YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIHNsaWNlID0gcmVxdWlyZSgnLi9zbGljZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhbGwgYnV0IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZyAob3Igb2JqZWN0XG4gKiB3aXRoIGEgYHRhaWxgIG1ldGhvZCkuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHNsaWNlYCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuaGVhZCwgUi5pbml0LCBSLmxhc3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRhaWwoWzEsIDIsIDNdKTsgIC8vPT4gWzIsIDNdXG4gKiAgICAgIFIudGFpbChbMSwgMl0pOyAgICAgLy89PiBbMl1cbiAqICAgICAgUi50YWlsKFsxXSk7ICAgICAgICAvLz0+IFtdXG4gKiAgICAgIFIudGFpbChbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi50YWlsKCdhYmMnKTsgIC8vPT4gJ2JjJ1xuICogICAgICBSLnRhaWwoJ2FiJyk7ICAgLy89PiAnYidcbiAqICAgICAgUi50YWlsKCdhJyk7ICAgIC8vPT4gJydcbiAqICAgICAgUi50YWlsKCcnKTsgICAgIC8vPT4gJydcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKF9jaGVja0Zvck1ldGhvZCgndGFpbCcsIHNsaWNlKDEsIEluZmluaXR5KSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX3h0YWtlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feHRha2UnKTtcbnZhciBzbGljZSA9IHJlcXVpcmUoJy4vc2xpY2UnKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCwgc3RyaW5nLCBvclxuICogdHJhbnNkdWNlci90cmFuc2Zvcm1lciAob3Igb2JqZWN0IHdpdGggYSBgdGFrZWAgbWV0aG9kKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgdGFrZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5kcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50YWtlKDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nXVxuICogICAgICBSLnRha2UoMiwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInXVxuICogICAgICBSLnRha2UoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAqICAgICAgUi50YWtlKDQsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gKiAgICAgIFIudGFrZSgzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAvLz0+ICdyYW0nXG4gKlxuICogICAgICB2YXIgcGVyc29ubmVsID0gW1xuICogICAgICAgICdEYXZlIEJydWJlY2snLFxuICogICAgICAgICdQYXVsIERlc21vbmQnLFxuICogICAgICAgICdFdWdlbmUgV3JpZ2h0JyxcbiAqICAgICAgICAnSm9lIE1vcmVsbG8nLFxuICogICAgICAgICdHZXJyeSBNdWxsaWdhbicsXG4gKiAgICAgICAgJ0JvYiBCYXRlcycsXG4gKiAgICAgICAgJ0pvZSBEb2RnZScsXG4gKiAgICAgICAgJ1JvbiBDcm90dHknXG4gKiAgICAgIF07XG4gKlxuICogICAgICB2YXIgdGFrZUZpdmUgPSBSLnRha2UoNSk7XG4gKiAgICAgIHRha2VGaXZlKHBlcnNvbm5lbCk7XG4gKiAgICAgIC8vPT4gWydEYXZlIEJydWJlY2snLCAnUGF1bCBEZXNtb25kJywgJ0V1Z2VuZSBXcmlnaHQnLCAnSm9lIE1vcmVsbG8nLCAnR2VycnkgTXVsbGlnYW4nXVxuICogQHN5bWIgUi50YWtlKC0xLCBbYSwgYl0pID0gW2EsIGJdXG4gKiBAc3ltYiBSLnRha2UoMCwgW2EsIGJdKSA9IFtdXG4gKiBAc3ltYiBSLnRha2UoMSwgW2EsIGJdKSA9IFthXVxuICogQHN5bWIgUi50YWtlKDIsIFthLCBiXSkgPSBbYSwgYl1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoWyd0YWtlJ10sIF94dGFrZSwgZnVuY3Rpb24gdGFrZShuLCB4cykge1xuICByZXR1cm4gc2xpY2UoMCwgbiA8IDAgPyBJbmZpbml0eSA6IG4sIHhzKTtcbn0pKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgZHJvcCA9IHJlcXVpcmUoJy4vZHJvcCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGxhc3QgYG5gIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBsaXN0LlxuICogSWYgYG4gPiBsaXN0Lmxlbmd0aGAsIHJldHVybnMgYSBsaXN0IG9mIGBsaXN0Lmxlbmd0aGAgZWxlbWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gcmV0dXJuLlxuICogQHBhcmFtIHtBcnJheX0geHMgVGhlIGNvbGxlY3Rpb24gdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5kcm9wTGFzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudGFrZUxhc3QoMSwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2JheiddXG4gKiAgICAgIFIudGFrZUxhc3QoMiwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2JhcicsICdiYXonXVxuICogICAgICBSLnRha2VMYXN0KDMsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gKiAgICAgIFIudGFrZUxhc3QoNCwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAqICAgICAgUi50YWtlTGFzdCgzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAvLz0+ICdtZGEnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiB0YWtlTGFzdChuLCB4cykge1xuICByZXR1cm4gZHJvcChuID49IDAgPyB4cy5sZW5ndGggLSBuIDogMCwgeHMpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGxhc3QgYG5gIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCwgcGFzc2luZ1xuICogZWFjaCB2YWx1ZSB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBhbmQgdGVybWluYXRpbmcgd2hlbiB0aGVcbiAqIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zIGBmYWxzZWAuIEV4Y2x1ZGVzIHRoZSBlbGVtZW50IHRoYXQgY2F1c2VkIHRoZVxuICogcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGZhaWwuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDpcbiAqICoodmFsdWUpKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAqIEBzZWUgUi5kcm9wTGFzdFdoaWxlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzTm90T25lID0geCA9PiB4ICE9PSAxO1xuICpcbiAqICAgICAgUi50YWtlTGFzdFdoaWxlKGlzTm90T25lLCBbMSwgMiwgMywgNF0pOyAvLz0+IFsyLCAzLCA0XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gdGFrZUxhc3RXaGlsZShmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDAgJiYgZm4obGlzdFtpZHhdKSkge1xuICAgIGlkeCAtPSAxO1xuICB9XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBpZHggKyAxKTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfZGlzcGF0Y2hhYmxlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG52YXIgX3h0YWtlV2hpbGUgPSByZXF1aXJlKCcuL2ludGVybmFsL194dGFrZVdoaWxlJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgZmlyc3QgYG5gIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCxcbiAqIHBhc3NpbmcgZWFjaCB2YWx1ZSB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBhbmQgdGVybWluYXRpbmcgd2hlblxuICogdGhlIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zIGBmYWxzZWAuIEV4Y2x1ZGVzIHRoZSBlbGVtZW50IHRoYXQgY2F1c2VkIHRoZVxuICogcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGZhaWwuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDpcbiAqICoodmFsdWUpKi5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgdGFrZVdoaWxlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAqIEBzZWUgUi5kcm9wV2hpbGUsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzTm90Rm91ciA9IHggPT4geCAhPT0gNDtcbiAqXG4gKiAgICAgIFIudGFrZVdoaWxlKGlzTm90Rm91ciwgWzEsIDIsIDMsIDQsIDMsIDIsIDFdKTsgLy89PiBbMSwgMiwgM11cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoWyd0YWtlV2hpbGUnXSwgX3h0YWtlV2hpbGUsIGZ1bmN0aW9uIHRha2VXaGlsZShmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgbGVuICYmIGZuKGxpc3RbaWR4XSkpIHtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgMCwgaWR4KTtcbn0pKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSdW5zIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIHRoZSBzdXBwbGllZCBvYmplY3QsIHRoZW4gcmV0dXJucyB0aGUgb2JqZWN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIChhIC0+ICopIC0+IGEgLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2l0aCBgeGAuIFRoZSByZXR1cm4gdmFsdWUgb2YgYGZuYCB3aWxsIGJlIHRocm93biBhd2F5LlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHsqfSBgeGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHNheVggPSB4ID0+IGNvbnNvbGUubG9nKCd4IGlzICcgKyB4KTtcbiAqICAgICAgUi50YXAoc2F5WCwgMTAwKTsgLy89PiAxMDBcbiAqICAgICAgLy8gbG9ncyAneCBpcyAxMDAnXG4gKiBAc3ltYiBSLnRhcChmLCBhKSA9IGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHRhcChmbiwgeCkge1xuICBmbih4KTtcbiAgcmV0dXJuIHg7XG59KTtcbiIsInZhciBfY2xvbmVSZWdFeHAgPSByZXF1aXJlKCcuL2ludGVybmFsL19jbG9uZVJlZ0V4cCcpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfaXNSZWdFeHAgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc1JlZ0V4cCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgZ2l2ZW4gc3RyaW5nIG1hdGNoZXMgYSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTIuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBSZWdFeHAgLT4gU3RyaW5nIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLm1hdGNoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50ZXN0KC9eeC8sICd4eXonKTsgLy89PiB0cnVlXG4gKiAgICAgIFIudGVzdCgvXnkvLCAneHl6Jyk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHRlc3QocGF0dGVybiwgc3RyKSB7XG4gIGlmICghX2lzUmVnRXhwKHBhdHRlcm4pKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcign4oCYdGVzdOKAmSByZXF1aXJlcyBhIHZhbHVlIG9mIHR5cGUgUmVnRXhwIGFzIGl0cyBmaXJzdCBhcmd1bWVudDsgcmVjZWl2ZWQgJyArIHRvU3RyaW5nKHBhdHRlcm4pKTtcbiAgfVxuICByZXR1cm4gX2Nsb25lUmVnRXhwKHBhdHRlcm4pLnRlc3Qoc3RyKTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIENhbGxzIGFuIGlucHV0IGZ1bmN0aW9uIGBuYCB0aW1lcywgcmV0dXJuaW5nIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlc3VsdHNcbiAqIG9mIHRob3NlIGZ1bmN0aW9uIGNhbGxzLlxuICpcbiAqIGBmbmAgaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogVGhlIGN1cnJlbnQgdmFsdWUgb2YgYG5gLCB3aGljaCBiZWdpbnMgYXQgYDBgXG4gKiBhbmQgaXMgZ3JhZHVhbGx5IGluY3JlbWVudGVkIHRvIGBuIC0gMWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMi4zXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoTnVtYmVyIC0+IGEpIC0+IE51bWJlciAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuIFBhc3NlZCBvbmUgYXJndW1lbnQsIHRoZSBjdXJyZW50IHZhbHVlIG9mIGBuYC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBuIEEgdmFsdWUgYmV0d2VlbiBgMGAgYW5kIGBuIC0gMWAuIEluY3JlbWVudHMgYWZ0ZXIgZWFjaCBmdW5jdGlvbiBjYWxsLlxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJldHVybiB2YWx1ZXMgb2YgYWxsIGNhbGxzIHRvIGBmbmAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50aW1lcyhSLmlkZW50aXR5LCA1KTsgLy89PiBbMCwgMSwgMiwgMywgNF1cbiAqIEBzeW1iIFIudGltZXMoZiwgMCkgPSBbXVxuICogQHN5bWIgUi50aW1lcyhmLCAxKSA9IFtmKDApXVxuICogQHN5bWIgUi50aW1lcyhmLCAyKSA9IFtmKDApLCBmKDEpXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gdGltZXMoZm4sIG4pIHtcbiAgdmFyIGxlbiA9IE51bWJlcihuKTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsaXN0O1xuXG4gIGlmIChsZW4gPCAwIHx8IGlzTmFOKGxlbikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbiBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlcicpO1xuICB9XG4gIGxpc3QgPSBuZXcgQXJyYXkobGVuKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGxpc3RbaWR4XSA9IGZuKGlkeCk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGxpc3Q7XG59KTtcbiIsInZhciBpbnZva2VyID0gcmVxdWlyZSgnLi9pbnZva2VyJyk7XG5cblxuLyoqXG4gKiBUaGUgbG93ZXIgY2FzZSB2ZXJzaW9uIG9mIGEgc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gbG93ZXIgY2FzZS5cbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGxvd2VyIGNhc2UgdmVyc2lvbiBvZiBgc3RyYC5cbiAqIEBzZWUgUi50b1VwcGVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b0xvd2VyKCdYWVonKTsgLy89PiAneHl6J1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGludm9rZXIoMCwgJ3RvTG93ZXJDYXNlJyk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9oYXMgPSByZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuXG4vKipcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGtleSwgdmFsdWUgYXJyYXlzLiBPbmx5IHRoZSBvYmplY3Qnc1xuICogb3duIHByb3BlcnRpZXMgYXJlIHVzZWQuXG4gKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudFxuICogYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtTdHJpbmc6ICp9IC0+IFtbU3RyaW5nLCpdXVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIGtleSwgdmFsdWUgYXJyYXlzIGZyb20gdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICogQHNlZSBSLmZyb21QYWlyc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudG9QYWlycyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFtbJ2EnLCAxXSwgWydiJywgMl0sIFsnYycsIDNdXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gdG9QYWlycyhvYmopIHtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgaWYgKF9oYXMocHJvcCwgb2JqKSkge1xuICAgICAgcGFpcnNbcGFpcnMubGVuZ3RoXSA9IFtwcm9wLCBvYmpbcHJvcF1dO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFpcnM7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cy4gVGhlIG9iamVjdCdzIG93blxuICogcHJvcGVydGllcyBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMgYXJlIHVzZWQuIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlXG4gKiBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudCBhY3Jvc3MgZGlmZmVyZW50IEpTXG4gKiBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtTdHJpbmc6ICp9IC0+IFtbU3RyaW5nLCpdXVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIGtleSwgdmFsdWUgYXJyYXlzIGZyb20gdGhlIG9iamVjdCdzIG93blxuICogICAgICAgICBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICogICAgICBGLnByb3RvdHlwZS55ID0gJ1knO1xuICogICAgICB2YXIgZiA9IG5ldyBGKCk7XG4gKiAgICAgIFIudG9QYWlyc0luKGYpOyAvLz0+IFtbJ3gnLCdYJ10sIFsneScsJ1knXV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIHRvUGFpcnNJbihvYmopIHtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgcGFpcnNbcGFpcnMubGVuZ3RoXSA9IFtwcm9wLCBvYmpbcHJvcF1dO1xuICB9XG4gIHJldHVybiBwYWlycztcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfdG9TdHJpbmcgPSByZXF1aXJlKCcuL2ludGVybmFsL190b1N0cmluZycpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiB2YWx1ZS4gYGV2YWxgJ2luZyB0aGUgb3V0cHV0XG4gKiBzaG91bGQgcmVzdWx0IGluIGEgdmFsdWUgZXF1aXZhbGVudCB0byB0aGUgaW5wdXQgdmFsdWUuIE1hbnkgb2YgdGhlIGJ1aWx0LWluXG4gKiBgdG9TdHJpbmdgIG1ldGhvZHMgZG8gbm90IHNhdGlzZnkgdGhpcyByZXF1aXJlbWVudC5cbiAqXG4gKiBJZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYFtvYmplY3QgT2JqZWN0XWAgd2l0aCBhIGB0b1N0cmluZ2AgbWV0aG9kIG90aGVyXG4gKiB0aGFuIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCwgdGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aXRoIG5vIGFyZ3VtZW50c1xuICogdG8gcHJvZHVjZSB0aGUgcmV0dXJuIHZhbHVlLiBUaGlzIG1lYW5zIHVzZXItZGVmaW5lZCBjb25zdHJ1Y3RvciBmdW5jdGlvbnNcbiAqIGNhbiBwcm92aWRlIGEgc3VpdGFibGUgYHRvU3RyaW5nYCBtZXRob2QuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gKiAgICAgICB0aGlzLnggPSB4O1xuICogICAgICAgdGhpcy55ID0geTtcbiAqICAgICB9XG4gKlxuICogICAgIFBvaW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuICduZXcgUG9pbnQoJyArIHRoaXMueCArICcsICcgKyB0aGlzLnkgKyAnKSc7XG4gKiAgICAgfTtcbiAqXG4gKiAgICAgUi50b1N0cmluZyhuZXcgUG9pbnQoMSwgMikpOyAvLz0+ICduZXcgUG9pbnQoMSwgMiknXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyAqIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRvU3RyaW5nKDQyKTsgLy89PiAnNDInXG4gKiAgICAgIFIudG9TdHJpbmcoJ2FiYycpOyAvLz0+ICdcImFiY1wiJ1xuICogICAgICBSLnRvU3RyaW5nKFsxLCAyLCAzXSk7IC8vPT4gJ1sxLCAyLCAzXSdcbiAqICAgICAgUi50b1N0cmluZyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30pOyAvLz0+ICd7XCJiYXJcIjogMiwgXCJiYXpcIjogMywgXCJmb29cIjogMX0nXG4gKiAgICAgIFIudG9TdHJpbmcobmV3IERhdGUoJzIwMDEtMDItMDNUMDQ6MDU6MDZaJykpOyAvLz0+ICduZXcgRGF0ZShcIjIwMDEtMDItMDNUMDQ6MDU6MDYuMDAwWlwiKSdcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIHRvU3RyaW5nKHZhbCkgeyByZXR1cm4gX3RvU3RyaW5nKHZhbCwgW10pOyB9KTtcbiIsInZhciBpbnZva2VyID0gcmVxdWlyZSgnLi9pbnZva2VyJyk7XG5cblxuLyoqXG4gKiBUaGUgdXBwZXIgY2FzZSB2ZXJzaW9uIG9mIGEgc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gdXBwZXIgY2FzZS5cbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHVwcGVyIGNhc2UgdmVyc2lvbiBvZiBgc3RyYC5cbiAqIEBzZWUgUi50b0xvd2VyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b1VwcGVyKCdhYmMnKTsgLy89PiAnQUJDJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGludm9rZXIoMCwgJ3RvVXBwZXJDYXNlJyk7XG4iLCJ2YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIF94d3JhcCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3h3cmFwJyk7XG52YXIgY3VycnlOID0gcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgdHJhbnNkdWNlciB1c2luZyBzdXBwbGllZCBpdGVyYXRvciBmdW5jdGlvbi4gUmV0dXJucyBhIHNpbmdsZVxuICogaXRlbSBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmcgdGhlIHRyYW5zZm9ybWVkXG4gKiBpdGVyYXRvciBmdW5jdGlvbiBhbmQgcGFzc2luZyBpdCBhbiBhY2N1bXVsYXRvciB2YWx1ZSBhbmQgdGhlIGN1cnJlbnQgdmFsdWVcbiAqIGZyb20gdGhlIGFycmF5LCBhbmQgdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIHZhbHVlczogKihhY2MsIHZhbHVlKSouIEl0IHdpbGwgYmVcbiAqIHdyYXBwZWQgYXMgYSB0cmFuc2Zvcm1lciB0byBpbml0aWFsaXplIHRoZSB0cmFuc2R1Y2VyLiBBIHRyYW5zZm9ybWVyIGNhbiBiZVxuICogcGFzc2VkIGRpcmVjdGx5IGluIHBsYWNlIG9mIGFuIGl0ZXJhdG9yIGZ1bmN0aW9uLiBJbiBib3RoIGNhc2VzLCBpdGVyYXRpb25cbiAqIG1heSBiZSBzdG9wcGVkIGVhcmx5IHdpdGggdGhlIGBSLnJlZHVjZWRgIGZ1bmN0aW9uLlxuICpcbiAqIEEgdHJhbnNkdWNlciBpcyBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhIHRyYW5zZm9ybWVyIGFuZCByZXR1cm5zIGFcbiAqIHRyYW5zZm9ybWVyIGFuZCBjYW4gYmUgY29tcG9zZWQgZGlyZWN0bHkuXG4gKlxuICogQSB0cmFuc2Zvcm1lciBpcyBhbiBhbiBvYmplY3QgdGhhdCBwcm92aWRlcyBhIDItYXJpdHkgcmVkdWNpbmcgaXRlcmF0b3JcbiAqIGZ1bmN0aW9uLCBzdGVwLCAwLWFyaXR5IGluaXRpYWwgdmFsdWUgZnVuY3Rpb24sIGluaXQsIGFuZCAxLWFyaXR5IHJlc3VsdFxuICogZXh0cmFjdGlvbiBmdW5jdGlvbiwgcmVzdWx0LiBUaGUgc3RlcCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBpdGVyYXRvclxuICogZnVuY3Rpb24gaW4gcmVkdWNlLiBUaGUgcmVzdWx0IGZ1bmN0aW9uIGlzIHVzZWQgdG8gY29udmVydCB0aGUgZmluYWxcbiAqIGFjY3VtdWxhdG9yIGludG8gdGhlIHJldHVybiB0eXBlIGFuZCBpbiBtb3N0IGNhc2VzIGlzIFIuaWRlbnRpdHkuIFRoZSBpbml0XG4gKiBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGFuIGluaXRpYWwgYWNjdW11bGF0b3IsIGJ1dCBpcyBpZ25vcmVkIGJ5XG4gKiB0cmFuc2R1Y2UuXG4gKlxuICogVGhlIGl0ZXJhdGlvbiBpcyBwZXJmb3JtZWQgd2l0aCBSLnJlZHVjZSBhZnRlciBpbml0aWFsaXppbmcgdGhlIHRyYW5zZHVjZXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTIuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGMgLT4gYykgLT4gKGEsYiAtPiBhKSAtPiBhIC0+IFtiXSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB4ZiBUaGUgdHJhbnNkdWNlciBmdW5jdGlvbi4gUmVjZWl2ZXMgYSB0cmFuc2Zvcm1lciBhbmQgcmV0dXJucyBhIHRyYW5zZm9ybWVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheS4gV3JhcHBlZCBhcyB0cmFuc2Zvcm1lciwgaWYgbmVjZXNzYXJ5LCBhbmQgdXNlZCB0b1xuICogICAgICAgIGluaXRpYWxpemUgdGhlIHRyYW5zZHVjZXJcbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBpbml0aWFsIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICogQHNlZSBSLnJlZHVjZSwgUi5yZWR1Y2VkLCBSLmludG9cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbnVtYmVycyA9IFsxLCAyLCAzLCA0XTtcbiAqICAgICAgdmFyIHRyYW5zZHVjZXIgPSBSLmNvbXBvc2UoUi5tYXAoUi5hZGQoMSkpLCBSLnRha2UoMikpO1xuICpcbiAqICAgICAgUi50cmFuc2R1Y2UodHJhbnNkdWNlciwgUi5mbGlwKFIuYXBwZW5kKSwgW10sIG51bWJlcnMpOyAvLz0+IFsyLCAzXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGN1cnJ5Tig0LCBmdW5jdGlvbiB0cmFuc2R1Y2UoeGYsIGZuLCBhY2MsIGxpc3QpIHtcbiAgcmV0dXJuIF9yZWR1Y2UoeGYodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nID8gX3h3cmFwKGZuKSA6IGZuKSwgYWNjLCBsaXN0KTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIFRyYW5zcG9zZXMgdGhlIHJvd3MgYW5kIGNvbHVtbnMgb2YgYSAyRCBsaXN0LlxuICogV2hlbiBwYXNzZWQgYSBsaXN0IG9mIGBuYCBsaXN0cyBvZiBsZW5ndGggYHhgLFxuICogcmV0dXJucyBhIGxpc3Qgb2YgYHhgIGxpc3RzIG9mIGxlbmd0aCBgbmAuXG4gKlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFtbYV1dIC0+IFtbYV1dXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IEEgMkQgbGlzdFxuICogQHJldHVybiB7QXJyYXl9IEEgMkQgbGlzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudHJhbnNwb3NlKFtbMSwgJ2EnXSwgWzIsICdiJ10sIFszLCAnYyddXSkgLy89PiBbWzEsIDIsIDNdLCBbJ2EnLCAnYicsICdjJ11dXG4gKiAgICAgIFIudHJhbnNwb3NlKFtbMSwgMiwgM10sIFsnYScsICdiJywgJ2MnXV0pIC8vPT4gW1sxLCAnYSddLCBbMiwgJ2InXSwgWzMsICdjJ11dXG4gKlxuICogSWYgc29tZSBvZiB0aGUgcm93cyBhcmUgc2hvcnRlciB0aGFuIHRoZSBmb2xsb3dpbmcgcm93cywgdGhlaXIgZWxlbWVudHMgYXJlIHNraXBwZWQ6XG4gKlxuICogICAgICBSLnRyYW5zcG9zZShbWzEwLCAxMV0sIFsyMF0sIFtdLCBbMzAsIDMxLCAzMl1dKSAvLz0+IFtbMTAsIDIwLCAzMF0sIFsxMSwgMzFdLCBbMzJdXVxuICogQHN5bWIgUi50cmFuc3Bvc2UoW1thXSwgW2JdLCBbY11dKSA9IFthLCBiLCBjXVxuICogQHN5bWIgUi50cmFuc3Bvc2UoW1thLCBiXSwgW2MsIGRdXSkgPSBbW2EsIGNdLCBbYiwgZF1dXG4gKiBAc3ltYiBSLnRyYW5zcG9zZShbW2EsIGJdLCBbY11dKSA9IFtbYSwgY10sIFtiXV1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIHRyYW5zcG9zZShvdXRlcmxpc3QpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHdoaWxlIChpIDwgb3V0ZXJsaXN0Lmxlbmd0aCkge1xuICAgIHZhciBpbm5lcmxpc3QgPSBvdXRlcmxpc3RbaV07XG4gICAgdmFyIGogPSAwO1xuICAgIHdoaWxlIChqIDwgaW5uZXJsaXN0Lmxlbmd0aCkge1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHRbal0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJlc3VsdFtqXSA9IFtdO1xuICAgICAgfVxuICAgICAgcmVzdWx0W2pdLnB1c2goaW5uZXJsaXN0W2pdKTtcbiAgICAgIGogKz0gMTtcbiAgICB9XG4gICAgaSArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgbWFwID0gcmVxdWlyZSgnLi9tYXAnKTtcbnZhciBzZXF1ZW5jZSA9IHJlcXVpcmUoJy4vc2VxdWVuY2UnKTtcblxuXG4vKipcbiAqIE1hcHMgYW4gW0FwcGxpY2F0aXZlXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2FwcGxpY2F0aXZlKS1yZXR1cm5pbmdcbiAqIGZ1bmN0aW9uIG92ZXIgYSBbVHJhdmVyc2FibGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjdHJhdmVyc2FibGUpLFxuICogdGhlbiB1c2VzIFtgc2VxdWVuY2VgXSgjc2VxdWVuY2UpIHRvIHRyYW5zZm9ybSB0aGUgcmVzdWx0aW5nIFRyYXZlcnNhYmxlIG9mIEFwcGxpY2F0aXZlXG4gKiBpbnRvIGFuIEFwcGxpY2F0aXZlIG9mIFRyYXZlcnNhYmxlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzZXF1ZW5jZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoQXBwbGljYXRpdmUgZiwgVHJhdmVyc2FibGUgdCkgPT4gKGEgLT4gZiBhKSAtPiAoYSAtPiBmIGIpIC0+IHQgYSAtPiBmICh0IGIpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvZlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHsqfSB0cmF2ZXJzYWJsZVxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5zZXF1ZW5jZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vIFJldHVybnMgYE5vdGhpbmdgIGlmIHRoZSBnaXZlbiBkaXZpc29yIGlzIGAwYFxuICogICAgICBzYWZlRGl2ID0gbiA9PiBkID0+IGQgPT09IDAgPyBOb3RoaW5nKCkgOiBKdXN0KG4gLyBkKVxuICpcbiAqICAgICAgUi50cmF2ZXJzZShNYXliZS5vZiwgc2FmZURpdigxMCksIFsyLCA0LCA1XSk7IC8vPT4gSnVzdChbNSwgMi41LCAyXSlcbiAqICAgICAgUi50cmF2ZXJzZShNYXliZS5vZiwgc2FmZURpdigxMCksIFsyLCAwLCA1XSk7IC8vPT4gTm90aGluZ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gdHJhdmVyc2Uob2YsIGYsIHRyYXZlcnNhYmxlKSB7XG4gIHJldHVybiBzZXF1ZW5jZShvZiwgbWFwKGYsIHRyYXZlcnNhYmxlKSk7XG59KTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cblxuLyoqXG4gKiBSZW1vdmVzIChzdHJpcHMpIHdoaXRlc3BhY2UgZnJvbSBib3RoIGVuZHMgb2YgdGhlIHN0cmluZy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHRyaW0uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFRyaW1tZWQgdmVyc2lvbiBvZiBgc3RyYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRyaW0oJyAgIHh5eiAgJyk7IC8vPT4gJ3h5eidcbiAqICAgICAgUi5tYXAoUi50cmltLCBSLnNwbGl0KCcsJywgJ3gsIHksIHonKSk7IC8vPT4gWyd4JywgJ3knLCAneiddXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgd3MgPSAnXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDMnICtcbiAgICAgICAgICAgJ1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4JyArXG4gICAgICAgICAgICdcXHUyMDI5XFx1RkVGRic7XG4gIHZhciB6ZXJvV2lkdGggPSAnXFx1MjAwYic7XG4gIHZhciBoYXNQcm90b1RyaW0gPSAodHlwZW9mIFN0cmluZy5wcm90b3R5cGUudHJpbSA9PT0gJ2Z1bmN0aW9uJyk7XG4gIGlmICghaGFzUHJvdG9UcmltIHx8ICh3cy50cmltKCkgfHwgIXplcm9XaWR0aC50cmltKCkpKSB7XG4gICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgICAgIHZhciBiZWdpblJ4ID0gbmV3IFJlZ0V4cCgnXlsnICsgd3MgKyAnXVsnICsgd3MgKyAnXSonKTtcbiAgICAgIHZhciBlbmRSeCA9IG5ldyBSZWdFeHAoJ1snICsgd3MgKyAnXVsnICsgd3MgKyAnXSokJyk7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoYmVnaW5SeCwgJycpLnJlcGxhY2UoZW5kUngsICcnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbiB0cmltKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci50cmltKCk7XG4gICAgfSk7XG4gIH1cbn0oKSk7XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcbnZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogYHRyeUNhdGNoYCB0YWtlcyB0d28gZnVuY3Rpb25zLCBhIGB0cnllcmAgYW5kIGEgYGNhdGNoZXJgLiBUaGUgcmV0dXJuZWRcbiAqIGZ1bmN0aW9uIGV2YWx1YXRlcyB0aGUgYHRyeWVyYDsgaWYgaXQgZG9lcyBub3QgdGhyb3csIGl0IHNpbXBseSByZXR1cm5zIHRoZVxuICogcmVzdWx0LiBJZiB0aGUgYHRyeWVyYCAqZG9lcyogdGhyb3csIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBldmFsdWF0ZXMgdGhlXG4gKiBgY2F0Y2hlcmAgZnVuY3Rpb24gYW5kIHJldHVybnMgaXRzIHJlc3VsdC4gTm90ZSB0aGF0IGZvciBlZmZlY3RpdmVcbiAqIGNvbXBvc2l0aW9uIHdpdGggdGhpcyBmdW5jdGlvbiwgYm90aCB0aGUgYHRyeWVyYCBhbmQgYGNhdGNoZXJgIGZ1bmN0aW9uc1xuICogbXVzdCByZXR1cm4gdGhlIHNhbWUgdHlwZSBvZiByZXN1bHRzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoLi4ueCAtPiBhKSAtPiAoKGUsIC4uLngpIC0+IGEpIC0+ICguLi54IC0+IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cnllciBUaGUgZnVuY3Rpb24gdGhhdCBtYXkgdGhyb3cuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYXRjaGVyIFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXZhbHVhdGVkIGlmIGB0cnllcmAgdGhyb3dzLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgd2lsbCBjYXRjaCBleGNlcHRpb25zIGFuZCBzZW5kIHRoZW4gdG8gdGhlIGNhdGNoZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50cnlDYXRjaChSLnByb3AoJ3gnKSwgUi5GKSh7eDogdHJ1ZX0pOyAvLz0+IHRydWVcbiAqICAgICAgUi50cnlDYXRjaChSLnByb3AoJ3gnKSwgUi5GKShudWxsKTsgICAgICAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBfdHJ5Q2F0Y2godHJ5ZXIsIGNhdGNoZXIpIHtcbiAgcmV0dXJuIF9hcml0eSh0cnllci5sZW5ndGgsIGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ5ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gY2F0Y2hlci5hcHBseSh0aGlzLCBfY29uY2F0KFtlXSwgYXJndW1lbnRzKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIEdpdmVzIGEgc2luZ2xlLXdvcmQgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIHRoZSAobmF0aXZlKSB0eXBlIG9mIGEgdmFsdWUsXG4gKiByZXR1cm5pbmcgc3VjaCBhbnN3ZXJzIGFzICdPYmplY3QnLCAnTnVtYmVyJywgJ0FycmF5Jywgb3IgJ051bGwnLiBEb2VzIG5vdFxuICogYXR0ZW1wdCB0byBkaXN0aW5ndWlzaCB1c2VyIE9iamVjdCB0eXBlcyBhbnkgZnVydGhlciwgcmVwb3J0aW5nIHRoZW0gYWxsIGFzXG4gKiAnT2JqZWN0Jy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBUeXBlXG4gKiBAc2lnICgqIC0+IHsqfSkgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudHlwZSh7fSk7IC8vPT4gXCJPYmplY3RcIlxuICogICAgICBSLnR5cGUoMSk7IC8vPT4gXCJOdW1iZXJcIlxuICogICAgICBSLnR5cGUoZmFsc2UpOyAvLz0+IFwiQm9vbGVhblwiXG4gKiAgICAgIFIudHlwZSgncycpOyAvLz0+IFwiU3RyaW5nXCJcbiAqICAgICAgUi50eXBlKG51bGwpOyAvLz0+IFwiTnVsbFwiXG4gKiAgICAgIFIudHlwZShbXSk7IC8vPT4gXCJBcnJheVwiXG4gKiAgICAgIFIudHlwZSgvW0Etel0vKTsgLy89PiBcIlJlZ0V4cFwiXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiB0eXBlKHZhbCkge1xuICByZXR1cm4gdmFsID09PSBudWxsICAgICAgPyAnTnVsbCcgICAgICA6XG4gICAgICAgICB2YWwgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDpcbiAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpLnNsaWNlKDgsIC0xKTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYGZuYCwgd2hpY2ggdGFrZXMgYSBzaW5nbGUgYXJyYXkgYXJndW1lbnQsIGFuZCByZXR1cm5zIGFcbiAqIGZ1bmN0aW9uIHdoaWNoOlxuICpcbiAqICAgLSB0YWtlcyBhbnkgbnVtYmVyIG9mIHBvc2l0aW9uYWwgYXJndW1lbnRzO1xuICogICAtIHBhc3NlcyB0aGVzZSBhcmd1bWVudHMgdG8gYGZuYCBhcyBhbiBhcnJheTsgYW5kXG4gKiAgIC0gcmV0dXJucyB0aGUgcmVzdWx0LlxuICpcbiAqIEluIG90aGVyIHdvcmRzLCBSLnVuYXBwbHkgZGVyaXZlcyBhIHZhcmlhZGljIGZ1bmN0aW9uIGZyb20gYSBmdW5jdGlvbiB3aGljaFxuICogdGFrZXMgYW4gYXJyYXkuIFIudW5hcHBseSBpcyB0aGUgaW52ZXJzZSBvZiBSLmFwcGx5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIChbKi4uLl0gLT4gYSkgLT4gKCouLi4gLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5hcHBseVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5hcHBseShKU09OLnN0cmluZ2lmeSkoMSwgMiwgMyk7IC8vPT4gJ1sxLDIsM10nXG4gKiBAc3ltYiBSLnVuYXBwbHkoZikoYSwgYikgPSBmKFthLCBiXSlcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIHVuYXBwbHkoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmbihBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgfTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBuQXJ5ID0gcmVxdWlyZSgnLi9uQXJ5Jyk7XG5cblxuLyoqXG4gKiBXcmFwcyBhIGZ1bmN0aW9uIG9mIGFueSBhcml0eSAoaW5jbHVkaW5nIG51bGxhcnkpIGluIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzXG4gKiBleGFjdGx5IDEgcGFyYW1ldGVyLiBBbnkgZXh0cmFuZW91cyBwYXJhbWV0ZXJzIHdpbGwgbm90IGJlIHBhc3NlZCB0byB0aGVcbiAqIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGIpIC0+IChhIC0+IGIpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyBgZm5gLiBUaGUgbmV3IGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgb2ZcbiAqICAgICAgICAgYXJpdHkgMS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdGFrZXNUd29BcmdzID0gZnVuY3Rpb24oYSwgYikge1xuICogICAgICAgIHJldHVybiBbYSwgYl07XG4gKiAgICAgIH07XG4gKiAgICAgIHRha2VzVHdvQXJncy5sZW5ndGg7IC8vPT4gMlxuICogICAgICB0YWtlc1R3b0FyZ3MoMSwgMik7IC8vPT4gWzEsIDJdXG4gKlxuICogICAgICB2YXIgdGFrZXNPbmVBcmcgPSBSLnVuYXJ5KHRha2VzVHdvQXJncyk7XG4gKiAgICAgIHRha2VzT25lQXJnLmxlbmd0aDsgLy89PiAxXG4gKiAgICAgIC8vIE9ubHkgMSBhcmd1bWVudCBpcyBwYXNzZWQgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb25cbiAqICAgICAgdGFrZXNPbmVBcmcoMSwgMik7IC8vPT4gWzEsIHVuZGVmaW5lZF1cbiAqIEBzeW1iIFIudW5hcnkoZikoYSwgYiwgYykgPSBmKGEpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiB1bmFyeShmbikge1xuICByZXR1cm4gbkFyeSgxLCBmbik7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgY3VycnlOID0gcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBvZiBhcml0eSBgbmAgZnJvbSBhIChtYW51YWxseSkgY3VycmllZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+IChhIC0+IGIpIC0+IChhIC0+IGMpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHVuY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWRkRm91ciA9IGEgPT4gYiA9PiBjID0+IGQgPT4gYSArIGIgKyBjICsgZDtcbiAqXG4gKiAgICAgIHZhciB1bmN1cnJpZWRBZGRGb3VyID0gUi51bmN1cnJ5Tig0LCBhZGRGb3VyKTtcbiAqICAgICAgdW5jdXJyaWVkQWRkRm91cigxLCAyLCAzLCA0KTsgLy89PiAxMFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gdW5jdXJyeU4oZGVwdGgsIGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZGVwdGgsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50RGVwdGggPSAxO1xuICAgIHZhciB2YWx1ZSA9IGZuO1xuICAgIHZhciBpZHggPSAwO1xuICAgIHZhciBlbmRJZHg7XG4gICAgd2hpbGUgKGN1cnJlbnREZXB0aCA8PSBkZXB0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVuZElkeCA9IGN1cnJlbnREZXB0aCA9PT0gZGVwdGggPyBhcmd1bWVudHMubGVuZ3RoIDogaWR4ICsgdmFsdWUubGVuZ3RoO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIGlkeCwgZW5kSWR4KSk7XG4gICAgICBjdXJyZW50RGVwdGggKz0gMTtcbiAgICAgIGlkeCA9IGVuZElkeDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9KTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIEJ1aWxkcyBhIGxpc3QgZnJvbSBhIHNlZWQgdmFsdWUuIEFjY2VwdHMgYW4gaXRlcmF0b3IgZnVuY3Rpb24sIHdoaWNoIHJldHVybnNcbiAqIGVpdGhlciBmYWxzZSB0byBzdG9wIGl0ZXJhdGlvbiBvciBhbiBhcnJheSBvZiBsZW5ndGggMiBjb250YWluaW5nIHRoZSB2YWx1ZVxuICogdG8gYWRkIHRvIHRoZSByZXN1bHRpbmcgbGlzdCBhbmQgdGhlIHNlZWQgdG8gYmUgdXNlZCBpbiB0aGUgbmV4dCBjYWxsIHRvIHRoZVxuICogaXRlcmF0b3IgZnVuY3Rpb24uXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIG9uZSBhcmd1bWVudDogKihzZWVkKSouXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gW2JdKSAtPiAqIC0+IFtiXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiByZWNlaXZlcyBvbmUgYXJndW1lbnQsIGBzZWVkYCwgYW5kIHJldHVybnNcbiAqICAgICAgICBlaXRoZXIgZmFsc2UgdG8gcXVpdCBpdGVyYXRpb24gb3IgYW4gYXJyYXkgb2YgbGVuZ3RoIHR3byB0byBwcm9jZWVkLiBUaGUgZWxlbWVudFxuICogICAgICAgIGF0IGluZGV4IDAgb2YgdGhpcyBhcnJheSB3aWxsIGJlIGFkZGVkIHRvIHRoZSByZXN1bHRpbmcgYXJyYXksIGFuZCB0aGUgZWxlbWVudFxuICogICAgICAgIGF0IGluZGV4IDEgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIG5leHQgY2FsbCB0byBgZm5gLlxuICogQHBhcmFtIHsqfSBzZWVkIFRoZSBzZWVkIHZhbHVlLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBmaW5hbCBsaXN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBmID0gbiA9PiBuID4gNTAgPyBmYWxzZSA6IFstbiwgbiArIDEwXTtcbiAqICAgICAgUi51bmZvbGQoZiwgMTApOyAvLz0+IFstMTAsIC0yMCwgLTMwLCAtNDAsIC01MF1cbiAqIEBzeW1iIFIudW5mb2xkKGYsIHgpID0gW2YoeClbMF0sIGYoZih4KVsxXSlbMF0sIGYoZihmKHgpWzFdKVsxXSlbMF0sIC4uLl1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHVuZm9sZChmbiwgc2VlZCkge1xuICB2YXIgcGFpciA9IGZuKHNlZWQpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHdoaWxlIChwYWlyICYmIHBhaXIubGVuZ3RoKSB7XG4gICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcGFpclswXTtcbiAgICBwYWlyID0gZm4ocGFpclsxXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuIiwidmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgY29tcG9zZSA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xudmFyIHVuaXEgPSByZXF1aXJlKCcuL3VuaXEnKTtcblxuXG4vKipcbiAqIENvbWJpbmVzIHR3byBsaXN0cyBpbnRvIGEgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIGNvbXBvc2VkIG9mIHRoZSBlbGVtZW50c1xuICogb2YgZWFjaCBsaXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIFsqXSAtPiBbKl0gLT4gWypdXG4gKiBAcGFyYW0ge0FycmF5fSBhcyBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGJzIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmlyc3QgYW5kIHNlY29uZCBsaXN0cyBjb25jYXRlbmF0ZWQsIHdpdGhcbiAqICAgICAgICAgZHVwbGljYXRlcyByZW1vdmVkLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5pb24oWzEsIDIsIDNdLCBbMiwgMywgNF0pOyAvLz0+IFsxLCAyLCAzLCA0XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoY29tcG9zZSh1bmlxLCBfY29uY2F0KSk7XG4iLCJ2YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xudmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcbnZhciB1bmlxV2l0aCA9IHJlcXVpcmUoJy4vdW5pcVdpdGgnKTtcblxuXG4vKipcbiAqIENvbWJpbmVzIHR3byBsaXN0cyBpbnRvIGEgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIGNvbXBvc2VkIG9mIHRoZSBlbGVtZW50c1xuICogb2YgZWFjaCBsaXN0LiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGUgdmFsdWUgcmV0dXJuZWQgYnlcbiAqIGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKGEgLT4gYSAtPiBCb29sZWFuKSAtPiBbKl0gLT4gWypdIC0+IFsqXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGZpcnN0IGFuZCBzZWNvbmQgbGlzdHMgY29uY2F0ZW5hdGVkLCB3aXRoXG4gKiAgICAgICAgIGR1cGxpY2F0ZXMgcmVtb3ZlZC5cbiAqIEBzZWUgUi51bmlvblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsMSA9IFt7YTogMX0sIHthOiAyfV07XG4gKiAgICAgIHZhciBsMiA9IFt7YTogMX0sIHthOiA0fV07XG4gKiAgICAgIFIudW5pb25XaXRoKFIuZXFCeShSLnByb3AoJ2EnKSksIGwxLCBsMik7IC8vPT4gW3thOiAxfSwge2E6IDJ9LCB7YTogNH1dXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiB1bmlvbldpdGgocHJlZCwgbGlzdDEsIGxpc3QyKSB7XG4gIHJldHVybiB1bmlxV2l0aChwcmVkLCBfY29uY2F0KGxpc3QxLCBsaXN0MikpO1xufSk7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG52YXIgdW5pcUJ5ID0gcmVxdWlyZSgnLi91bmlxQnknKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIG9ubHkgb25lIGNvcHkgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICogbGlzdC4gYFIuZXF1YWxzYCBpcyB1c2VkIHRvIGRldGVybWluZSBlcXVhbGl0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIHVuaXF1ZSBpdGVtcy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnVuaXEoWzEsIDEsIDIsIDFdKTsgLy89PiBbMSwgMl1cbiAqICAgICAgUi51bmlxKFsxLCAnMSddKTsgICAgIC8vPT4gWzEsICcxJ11cbiAqICAgICAgUi51bmlxKFtbNDJdLCBbNDJdXSk7IC8vPT4gW1s0Ml1dXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gdW5pcUJ5KGlkZW50aXR5KTtcbiIsInZhciBfU2V0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fU2V0Jyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgb25seSBvbmUgY29weSBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gKiBsaXN0LCBiYXNlZCB1cG9uIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgZnVuY3Rpb24gdG9cbiAqIGVhY2ggbGlzdCBlbGVtZW50LiBQcmVmZXJzIHRoZSBmaXJzdCBpdGVtIGlmIHRoZSBzdXBwbGllZCBmdW5jdGlvbiBwcm9kdWNlc1xuICogdGhlIHNhbWUgdmFsdWUgb24gdHdvIGl0ZW1zLiBgUi5lcXVhbHNgIGlzIHVzZWQgZm9yIGNvbXBhcmlzb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gYikgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQSBmdW5jdGlvbiB1c2VkIHRvIHByb2R1Y2UgYSB2YWx1ZSB0byB1c2UgZHVyaW5nIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5pcUJ5KE1hdGguYWJzLCBbLTEsIC01LCAyLCAxMCwgMSwgMl0pOyAvLz0+IFstMSwgLTUsIDIsIDEwXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gdW5pcUJ5KGZuLCBsaXN0KSB7XG4gIHZhciBzZXQgPSBuZXcgX1NldCgpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgYXBwbGllZEl0ZW0sIGl0ZW07XG5cbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICBhcHBsaWVkSXRlbSA9IGZuKGl0ZW0pO1xuICAgIGlmIChzZXQuYWRkKGFwcGxpZWRJdGVtKSkge1xuICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbiIsInZhciBfY29udGFpbnNXaXRoID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnNXaXRoJyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgb25seSBvbmUgY29weSBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gKiBsaXN0LCBiYXNlZCB1cG9uIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIHRvXG4gKiB0d28gbGlzdCBlbGVtZW50cy4gUHJlZmVycyB0aGUgZmlyc3QgaXRlbSBpZiB0d28gaXRlbXMgY29tcGFyZSBlcXVhbCBiYXNlZFxuICogb24gdGhlIHByZWRpY2F0ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhLCBhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIHVuaXF1ZSBpdGVtcy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgc3RyRXEgPSBSLmVxQnkoU3RyaW5nKTtcbiAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoWzEsICcxJywgMiwgMV0pOyAvLz0+IFsxLCAyXVxuICogICAgICBSLnVuaXFXaXRoKHN0ckVxKShbe30sIHt9XSk7ICAgICAgIC8vPT4gW3t9XVxuICogICAgICBSLnVuaXFXaXRoKHN0ckVxKShbMSwgJzEnLCAxXSk7ICAgIC8vPT4gWzFdXG4gKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFsnMScsIDEsIDFdKTsgICAgLy89PiBbJzEnXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gdW5pcVdpdGgocHJlZCwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpdGVtO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICBpZiAoIV9jb250YWluc1dpdGgocHJlZCwgaXRlbSwgcmVzdWx0KSkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gaXRlbTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIFRlc3RzIHRoZSBmaW5hbCBhcmd1bWVudCBieSBwYXNzaW5nIGl0IHRvIHRoZSBnaXZlbiBwcmVkaWNhdGUgZnVuY3Rpb24uIElmXG4gKiB0aGUgcHJlZGljYXRlIGlzIG5vdCBzYXRpc2ZpZWQsIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mXG4gKiBjYWxsaW5nIHRoZSBgd2hlbkZhbHNlRm5gIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgYXJndW1lbnQuIElmIHRoZSBwcmVkaWNhdGVcbiAqIGlzIHNhdGlzZmllZCwgdGhlIGFyZ3VtZW50IGlzIHJldHVybmVkIGFzIGlzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiAoYSAtPiBhKSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgICAgICAgIEEgcHJlZGljYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB3aGVuRmFsc2VGbiBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgcHJlZGAgZXZhbHVhdGVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIGZhbHN5IHZhbHVlLlxuICogQHBhcmFtIHsqfSAgICAgICAgeCAgICAgICAgICAgQW4gb2JqZWN0IHRvIHRlc3Qgd2l0aCB0aGUgYHByZWRgIGZ1bmN0aW9uIGFuZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzcyB0byBgd2hlbkZhbHNlRm5gIGlmIG5lY2Vzc2FyeS5cbiAqIEByZXR1cm4geyp9IEVpdGhlciBgeGAgb3IgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgeGAgdG8gYHdoZW5GYWxzZUZuYC5cbiAqIEBzZWUgUi5pZkVsc2UsIFIud2hlblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vIGNvZXJjZUFycmF5IDo6IChhfFthXSkgLT4gW2FdXG4gKiAgICAgIHZhciBjb2VyY2VBcnJheSA9IFIudW5sZXNzKFIuaXNBcnJheUxpa2UsIFIub2YpO1xuICogICAgICBjb2VyY2VBcnJheShbMSwgMiwgM10pOyAvLz0+IFsxLCAyLCAzXVxuICogICAgICBjb2VyY2VBcnJheSgxKTsgICAgICAgICAvLz0+IFsxXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gdW5sZXNzKHByZWQsIHdoZW5GYWxzZUZuLCB4KSB7XG4gIHJldHVybiBwcmVkKHgpID8geCA6IHdoZW5GYWxzZUZuKHgpO1xufSk7XG4iLCJ2YXIgX2lkZW50aXR5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faWRlbnRpdHknKTtcbnZhciBjaGFpbiA9IHJlcXVpcmUoJy4vY2hhaW4nKTtcblxuXG4vKipcbiAqIFNob3J0aGFuZCBmb3IgYFIuY2hhaW4oUi5pZGVudGl0eSlgLCB3aGljaCByZW1vdmVzIG9uZSBsZXZlbCBvZiBuZXN0aW5nIGZyb21cbiAqIGFueSBbQ2hhaW5dKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjY2hhaW4pLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgQ2hhaW4gYyA9PiBjIChjIGEpIC0+IGMgYVxuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLmZsYXR0ZW4sIFIuY2hhaW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnVubmVzdChbMSwgWzJdLCBbWzNdXV0pOyAvLz0+IFsxLCAyLCBbM11dXG4gKiAgICAgIFIudW5uZXN0KFtbMSwgMl0sIFszLCA0XSwgWzUsIDZdXSk7IC8vPT4gWzEsIDIsIDMsIDQsIDUsIDZdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY2hhaW4oX2lkZW50aXR5KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBUYWtlcyBhIHByZWRpY2F0ZSwgYSB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiwgYW5kIGFuIGluaXRpYWwgdmFsdWUsXG4gKiBhbmQgcmV0dXJucyBhIHZhbHVlIG9mIHRoZSBzYW1lIHR5cGUgYXMgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBJdCBkb2VzIHNvIGJ5IGFwcGx5aW5nIHRoZSB0cmFuc2Zvcm1hdGlvbiB1bnRpbCB0aGUgcHJlZGljYXRlIGlzIHNhdGlzZmllZCxcbiAqIGF0IHdoaWNoIHBvaW50IGl0IHJldHVybnMgdGhlIHNhdGlzZmFjdG9yeSB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMC4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gKGEgLT4gYSkgLT4gYSAtPiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gaW5pdCBJbml0aWFsIHZhbHVlXG4gKiBAcmV0dXJuIHsqfSBGaW5hbCB2YWx1ZSB0aGF0IHNhdGlzZmllcyBwcmVkaWNhdGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnVudGlsKFIuZ3QoUi5fXywgMTAwKSwgUi5tdWx0aXBseSgyKSkoMSkgLy8gPT4gMTI4XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiB1bnRpbChwcmVkLCBmbiwgaW5pdCkge1xuICB2YXIgdmFsID0gaW5pdDtcbiAgd2hpbGUgKCFwcmVkKHZhbCkpIHtcbiAgICB2YWwgPSBmbih2YWwpO1xuICB9XG4gIHJldHVybiB2YWw7XG59KTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgYWRqdXN0ID0gcmVxdWlyZSgnLi9hZGp1c3QnKTtcbnZhciBhbHdheXMgPSByZXF1aXJlKCcuL2Fsd2F5cycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjb3B5IG9mIHRoZSBhcnJheSB3aXRoIHRoZSBlbGVtZW50IGF0IHRoZSBwcm92aWRlZCBpbmRleFxuICogcmVwbGFjZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgaW5kZXggdG8gdXBkYXRlLlxuICogQHBhcmFtIHsqfSB4IFRoZSB2YWx1ZSB0byBleGlzdCBhdCB0aGUgZ2l2ZW4gaW5kZXggb2YgdGhlIHJldHVybmVkIGFycmF5LlxuICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IGxpc3QgVGhlIHNvdXJjZSBhcnJheS1saWtlIG9iamVjdCB0byBiZSB1cGRhdGVkLlxuICogQHJldHVybiB7QXJyYXl9IEEgY29weSBvZiBgbGlzdGAgd2l0aCB0aGUgdmFsdWUgYXQgaW5kZXggYGlkeGAgcmVwbGFjZWQgd2l0aCBgeGAuXG4gKiBAc2VlIFIuYWRqdXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51cGRhdGUoMSwgMTEsIFswLCAxLCAyXSk7ICAgICAvLz0+IFswLCAxMSwgMl1cbiAqICAgICAgUi51cGRhdGUoMSkoMTEpKFswLCAxLCAyXSk7ICAgICAvLz0+IFswLCAxMSwgMl1cbiAqIEBzeW1iIFIudXBkYXRlKC0xLCBhLCBbYiwgY10pID0gW2IsIGFdXG4gKiBAc3ltYiBSLnVwZGF0ZSgwLCBhLCBbYiwgY10pID0gW2EsIGNdXG4gKiBAc3ltYiBSLnVwZGF0ZSgxLCBhLCBbYiwgY10pID0gW2IsIGFdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiB1cGRhdGUoaWR4LCB4LCBsaXN0KSB7XG4gIHJldHVybiBhZGp1c3QoYWx3YXlzKHgpLCBpZHgsIGxpc3QpO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJy4vY3VycnlOJyk7XG5cblxuLyoqXG4gKiBBY2NlcHRzIGEgZnVuY3Rpb24gYGZuYCBhbmQgYSBsaXN0IG9mIHRyYW5zZm9ybWVyIGZ1bmN0aW9ucyBhbmQgcmV0dXJucyBhXG4gKiBuZXcgY3VycmllZCBmdW5jdGlvbi4gV2hlbiB0aGUgbmV3IGZ1bmN0aW9uIGlzIGludm9rZWQsIGl0IGNhbGxzIHRoZVxuICogZnVuY3Rpb24gYGZuYCB3aXRoIHBhcmFtZXRlcnMgY29uc2lzdGluZyBvZiB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgZWFjaFxuICogc3VwcGxpZWQgaGFuZGxlciBvbiBzdWNjZXNzaXZlIGFyZ3VtZW50cyB0byB0aGUgbmV3IGZ1bmN0aW9uLlxuICpcbiAqIElmIG1vcmUgYXJndW1lbnRzIGFyZSBwYXNzZWQgdG8gdGhlIHJldHVybmVkIGZ1bmN0aW9uIHRoYW4gdHJhbnNmb3JtZXJcbiAqIGZ1bmN0aW9ucywgdGhvc2UgYXJndW1lbnRzIGFyZSBwYXNzZWQgZGlyZWN0bHkgdG8gYGZuYCBhcyBhZGRpdGlvbmFsXG4gKiBwYXJhbWV0ZXJzLiBJZiB5b3UgZXhwZWN0IGFkZGl0aW9uYWwgYXJndW1lbnRzIHRoYXQgZG9uJ3QgbmVlZCB0byBiZVxuICogdHJhbnNmb3JtZWQsIGFsdGhvdWdoIHlvdSBjYW4gaWdub3JlIHRoZW0sIGl0J3MgYmVzdCB0byBwYXNzIGFuIGlkZW50aXR5XG4gKiBmdW5jdGlvbiBzbyB0aGF0IHRoZSBuZXcgZnVuY3Rpb24gcmVwb3J0cyB0aGUgY29ycmVjdCBhcml0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoeDEgLT4geDIgLT4gLi4uIC0+IHopIC0+IFsoYSAtPiB4MSksIChiIC0+IHgyKSwgLi4uXSAtPiAoYSAtPiBiIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0FycmF5fSB0cmFuc2Zvcm1lcnMgQSBsaXN0IG9mIHRyYW5zZm9ybWVyIGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB3cmFwcGVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmNvbnZlcmdlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51c2VXaXRoKE1hdGgucG93LCBbUi5pZGVudGl0eSwgUi5pZGVudGl0eV0pKDMsIDQpOyAvLz0+IDgxXG4gKiAgICAgIFIudXNlV2l0aChNYXRoLnBvdywgW1IuaWRlbnRpdHksIFIuaWRlbnRpdHldKSgzKSg0KTsgLy89PiA4MVxuICogICAgICBSLnVzZVdpdGgoTWF0aC5wb3csIFtSLmRlYywgUi5pbmNdKSgzLCA0KTsgLy89PiAzMlxuICogICAgICBSLnVzZVdpdGgoTWF0aC5wb3csIFtSLmRlYywgUi5pbmNdKSgzKSg0KTsgLy89PiAzMlxuICogQHN5bWIgUi51c2VXaXRoKGYsIFtnLCBoXSkoYSwgYikgPSBmKGcoYSksIGgoYikpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiB1c2VXaXRoKGZuLCB0cmFuc2Zvcm1lcnMpIHtcbiAgcmV0dXJuIGN1cnJ5Tih0cmFuc2Zvcm1lcnMubGVuZ3RoLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpZHggPSAwO1xuICAgIHdoaWxlIChpZHggPCB0cmFuc2Zvcm1lcnMubGVuZ3RoKSB7XG4gICAgICBhcmdzLnB1c2godHJhbnNmb3JtZXJzW2lkeF0uY2FsbCh0aGlzLCBhcmd1bWVudHNbaWR4XSkpO1xuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIHRyYW5zZm9ybWVycy5sZW5ndGgpKSk7XG4gIH0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIGFjcm9zcyBkaWZmZXJlbnRcbiAqIEpTIHBsYXRmb3Jtcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6IHZ9IC0+IFt2XVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgdmFsdWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgdmFsdWVzIG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnZhbHVlcyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFsxLCAyLCAzXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gdmFsdWVzKG9iaikge1xuICB2YXIgcHJvcHMgPSBrZXlzKG9iaik7XG4gIHZhciBsZW4gPSBwcm9wcy5sZW5ndGg7XG4gIHZhciB2YWxzID0gW107XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgdmFsc1tpZHhdID0gb2JqW3Byb3BzW2lkeF1dO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiB2YWxzO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHRoZSBwcm9wZXJ0aWVzLCBpbmNsdWRpbmcgcHJvdG90eXBlIHByb3BlcnRpZXMsIG9mIHRoZVxuICogc3VwcGxpZWQgb2JqZWN0LlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnRcbiAqIGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7azogdn0gLT4gW3ZdXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCB2YWx1ZXMgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSB2YWx1ZXMgb2YgdGhlIG9iamVjdCdzIG93biBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICogICAgICBGLnByb3RvdHlwZS55ID0gJ1knO1xuICogICAgICB2YXIgZiA9IG5ldyBGKCk7XG4gKiAgICAgIFIudmFsdWVzSW4oZik7IC8vPT4gWydYJywgJ1knXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTEoZnVuY3Rpb24gdmFsdWVzSW4ob2JqKSB7XG4gIHZhciBwcm9wO1xuICB2YXIgdnMgPSBbXTtcbiAgZm9yIChwcm9wIGluIG9iaikge1xuICAgIHZzW3ZzLmxlbmd0aF0gPSBvYmpbcHJvcF07XG4gIH1cbiAgcmV0dXJuIHZzO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIFwidmlld1wiIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZSwgZGV0ZXJtaW5lZCBieSB0aGUgZ2l2ZW4gbGVucy5cbiAqIFRoZSBsZW5zJ3MgZm9jdXMgZGV0ZXJtaW5lcyB3aGljaCBwb3J0aW9uIG9mIHRoZSBkYXRhIHN0cnVjdHVyZSBpcyB2aXNpYmxlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIExlbnMgcyBhIC0+IHMgLT4gYVxuICogQHBhcmFtIHtMZW5zfSBsZW5zXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIucHJvcCwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeExlbnMgPSBSLmxlbnNQcm9wKCd4Jyk7XG4gKlxuICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IDFcbiAqICAgICAgUi52aWV3KHhMZW5zLCB7eDogNCwgeTogMn0pOyAgLy89PiA0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICAvLyBgQ29uc3RgIGlzIGEgZnVuY3RvciB0aGF0IGVmZmVjdGl2ZWx5IGlnbm9yZXMgdGhlIGZ1bmN0aW9uIGdpdmVuIHRvIGBtYXBgLlxuICB2YXIgQ29uc3QgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHt2YWx1ZTogeCwgbWFwOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH19O1xuICB9O1xuXG4gIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIHZpZXcobGVucywgeCkge1xuICAgIC8vIFVzaW5nIGBDb25zdGAgZWZmZWN0aXZlbHkgaWdub3JlcyB0aGUgc2V0dGVyIGZ1bmN0aW9uIG9mIHRoZSBgbGVuc2AsXG4gICAgLy8gbGVhdmluZyB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhlIGdldHRlciBmdW5jdGlvbiB1bm1vZGlmaWVkLlxuICAgIHJldHVybiBsZW5zKENvbnN0KSh4KS52YWx1ZTtcbiAgfSk7XG59KCkpO1xuIiwidmFyIF9jdXJyeTMgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuXG4vKipcbiAqIFRlc3RzIHRoZSBmaW5hbCBhcmd1bWVudCBieSBwYXNzaW5nIGl0IHRvIHRoZSBnaXZlbiBwcmVkaWNhdGUgZnVuY3Rpb24uIElmXG4gKiB0aGUgcHJlZGljYXRlIGlzIHNhdGlzZmllZCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgY2FsbGluZ1xuICogdGhlIGB3aGVuVHJ1ZUZuYCBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIGFyZ3VtZW50LiBJZiB0aGUgcHJlZGljYXRlIGlzIG5vdFxuICogc2F0aXNmaWVkLCB0aGUgYXJndW1lbnQgaXMgcmV0dXJuZWQgYXMgaXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTguMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IChhIC0+IGEpIC0+IGEgLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCAgICAgICBBIHByZWRpY2F0ZSBmdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gd2hlblRydWVGbiBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgY29uZGl0aW9uYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsdWF0ZXMgdG8gYSB0cnV0aHkgdmFsdWUuXG4gKiBAcGFyYW0geyp9ICAgICAgICB4ICAgICAgICAgIEFuIG9iamVjdCB0byB0ZXN0IHdpdGggdGhlIGBwcmVkYCBmdW5jdGlvbiBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzcyB0byBgd2hlblRydWVGbmAgaWYgbmVjZXNzYXJ5LlxuICogQHJldHVybiB7Kn0gRWl0aGVyIGB4YCBvciB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGB4YCB0byBgd2hlblRydWVGbmAuXG4gKiBAc2VlIFIuaWZFbHNlLCBSLnVubGVzc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vIHRydW5jYXRlIDo6IFN0cmluZyAtPiBTdHJpbmdcbiAqICAgICAgdmFyIHRydW5jYXRlID0gUi53aGVuKFxuICogICAgICAgIFIucHJvcFNhdGlzZmllcyhSLmd0KFIuX18sIDEwKSwgJ2xlbmd0aCcpLFxuICogICAgICAgIFIucGlwZShSLnRha2UoMTApLCBSLmFwcGVuZCgn4oCmJyksIFIuam9pbignJykpXG4gKiAgICAgICk7XG4gKiAgICAgIHRydW5jYXRlKCcxMjM0NScpOyAgICAgICAgIC8vPT4gJzEyMzQ1J1xuICogICAgICB0cnVuY2F0ZSgnMDEyMzQ1Njc4OUFCQycpOyAvLz0+ICcwMTIzNDU2Nzg54oCmJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gd2hlbihwcmVkLCB3aGVuVHJ1ZUZuLCB4KSB7XG4gIHJldHVybiBwcmVkKHgpID8gd2hlblRydWVGbih4KSA6IHg7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2hhcyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBzcGVjIG9iamVjdCBhbmQgYSB0ZXN0IG9iamVjdDsgcmV0dXJucyB0cnVlIGlmIHRoZSB0ZXN0IHNhdGlzZmllc1xuICogdGhlIHNwZWMuIEVhY2ggb2YgdGhlIHNwZWMncyBvd24gcHJvcGVydGllcyBtdXN0IGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICogRWFjaCBwcmVkaWNhdGUgaXMgYXBwbGllZCB0byB0aGUgdmFsdWUgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgb2YgdGhlXG4gKiB0ZXN0IG9iamVjdC4gYHdoZXJlYCByZXR1cm5zIHRydWUgaWYgYWxsIHRoZSBwcmVkaWNhdGVzIHJldHVybiB0cnVlLCBmYWxzZVxuICogb3RoZXJ3aXNlLlxuICpcbiAqIGB3aGVyZWAgaXMgd2VsbCBzdWl0ZWQgdG8gZGVjbGFyYXRpdmVseSBleHByZXNzaW5nIGNvbnN0cmFpbnRzIGZvciBvdGhlclxuICogZnVuY3Rpb25zIHN1Y2ggYXMgYGZpbHRlcmAgYW5kIGBmaW5kYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge1N0cmluZzogKCogLT4gQm9vbGVhbil9IC0+IHtTdHJpbmc6ICp9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjXG4gKiBAcGFyYW0ge09iamVjdH0gdGVzdE9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyBwcmVkIDo6IE9iamVjdCAtPiBCb29sZWFuXG4gKiAgICAgIHZhciBwcmVkID0gUi53aGVyZSh7XG4gKiAgICAgICAgYTogUi5lcXVhbHMoJ2ZvbycpLFxuICogICAgICAgIGI6IFIuY29tcGxlbWVudChSLmVxdWFscygnYmFyJykpLFxuICogICAgICAgIHg6IFIuZ3QoX18sIDEwKSxcbiAqICAgICAgICB5OiBSLmx0KF9fLCAyMClcbiAqICAgICAgfSk7XG4gKlxuICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ3h4eCcsIHg6IDExLCB5OiAxOX0pOyAvLz0+IHRydWVcbiAqICAgICAgcHJlZCh7YTogJ3h4eCcsIGI6ICd4eHgnLCB4OiAxMSwgeTogMTl9KTsgLy89PiBmYWxzZVxuICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ2JhcicsIHg6IDExLCB5OiAxOX0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIHByZWQoe2E6ICdmb28nLCBiOiAneHh4JywgeDogMTAsIHk6IDE5fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICd4eHgnLCB4OiAxMSwgeTogMjB9KTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gd2hlcmUoc3BlYywgdGVzdE9iaikge1xuICBmb3IgKHZhciBwcm9wIGluIHNwZWMpIHtcbiAgICBpZiAoX2hhcyhwcm9wLCBzcGVjKSAmJiAhc3BlY1twcm9wXSh0ZXN0T2JqW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBlcXVhbHMgPSByZXF1aXJlKCcuL2VxdWFscycpO1xudmFyIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG52YXIgd2hlcmUgPSByZXF1aXJlKCcuL3doZXJlJyk7XG5cblxuLyoqXG4gKiBUYWtlcyBhIHNwZWMgb2JqZWN0IGFuZCBhIHRlc3Qgb2JqZWN0OyByZXR1cm5zIHRydWUgaWYgdGhlIHRlc3Qgc2F0aXNmaWVzXG4gKiB0aGUgc3BlYywgZmFsc2Ugb3RoZXJ3aXNlLiBBbiBvYmplY3Qgc2F0aXNmaWVzIHRoZSBzcGVjIGlmLCBmb3IgZWFjaCBvZiB0aGVcbiAqIHNwZWMncyBvd24gcHJvcGVydGllcywgYWNjZXNzaW5nIHRoYXQgcHJvcGVydHkgb2YgdGhlIG9iamVjdCBnaXZlcyB0aGUgc2FtZVxuICogdmFsdWUgKGluIGBSLmVxdWFsc2AgdGVybXMpIGFzIGFjY2Vzc2luZyB0aGF0IHByb3BlcnR5IG9mIHRoZSBzcGVjLlxuICpcbiAqIGB3aGVyZUVxYCBpcyBhIHNwZWNpYWxpemF0aW9uIG9mIFtgd2hlcmVgXSgjd2hlcmUpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge1N0cmluZzogKn0gLT4ge1N0cmluZzogKn0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtPYmplY3R9IHNwZWNcbiAqIEBwYXJhbSB7T2JqZWN0fSB0ZXN0T2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLndoZXJlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gcHJlZCA6OiBPYmplY3QgLT4gQm9vbGVhblxuICogICAgICB2YXIgcHJlZCA9IFIud2hlcmVFcSh7YTogMSwgYjogMn0pO1xuICpcbiAqICAgICAgcHJlZCh7YTogMX0pOyAgICAgICAgICAgICAgLy89PiBmYWxzZVxuICogICAgICBwcmVkKHthOiAxLCBiOiAyfSk7ICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgcHJlZCh7YTogMSwgYjogMiwgYzogM30pOyAgLy89PiB0cnVlXG4gKiAgICAgIHByZWQoe2E6IDEsIGI6IDF9KTsgICAgICAgIC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHdoZXJlRXEoc3BlYywgdGVzdE9iaikge1xuICByZXR1cm4gd2hlcmUobWFwKGVxdWFscywgc3BlYyksIHRlc3RPYmopO1xufSk7XG4iLCJ2YXIgX2NvbnRhaW5zID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnMnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgZmxpcCA9IHJlcXVpcmUoJy4vZmxpcCcpO1xudmFyIHJlamVjdCA9IHJlcXVpcmUoJy4vcmVqZWN0Jyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aG91dCB2YWx1ZXMgaW4gdGhlIGZpcnN0IGFyZ3VtZW50LlxuICogYFIuZXF1YWxzYCBpcyB1c2VkIHRvIGRldGVybWluZSBlcXVhbGl0eS5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSB2YWx1ZXMgdG8gYmUgcmVtb3ZlZCBmcm9tIGBsaXN0MmAuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgYXJyYXkgdG8gcmVtb3ZlIHZhbHVlcyBmcm9tLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgd2l0aG91dCB2YWx1ZXMgaW4gYGxpc3QxYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLndpdGhvdXQoWzEsIDJdLCBbMSwgMiwgMSwgMywgNF0pOyAvLz0+IFszLCA0XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24oeHMsIGxpc3QpIHtcbiAgcmV0dXJuIHJlamVjdChmbGlwKF9jb250YWlucykoeHMpLCBsaXN0KTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbGlzdCBvdXQgb2YgdGhlIHR3byBzdXBwbGllZCBieSBjcmVhdGluZyBlYWNoIHBvc3NpYmxlIHBhaXJcbiAqIGZyb20gdGhlIGxpc3RzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFtiXSAtPiBbW2EsYl1dXG4gKiBAcGFyYW0ge0FycmF5fSBhcyBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGJzIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBtYWRlIGJ5IGNvbWJpbmluZyBlYWNoIHBvc3NpYmxlIHBhaXIgZnJvbVxuICogICAgICAgICBgYXNgIGFuZCBgYnNgIGludG8gcGFpcnMgKGBbYSwgYl1gKS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnhwcm9kKFsxLCAyXSwgWydhJywgJ2InXSk7IC8vPT4gW1sxLCAnYSddLCBbMSwgJ2InXSwgWzIsICdhJ10sIFsyLCAnYiddXVxuICogQHN5bWIgUi54cHJvZChbYSwgYl0sIFtjLCBkXSkgPSBbW2EsIGNdLCBbYSwgZF0sIFtiLCBjXSwgW2IsIGRdXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24geHByb2QoYSwgYikgeyAvLyA9IHhwcm9kV2l0aChwcmVwZW5kKTsgKHRha2VzIGFib3V0IDMgdGltZXMgYXMgbG9uZy4uLilcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBpbGVuID0gYS5sZW5ndGg7XG4gIHZhciBqO1xuICB2YXIgamxlbiA9IGIubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHdoaWxlIChpZHggPCBpbGVuKSB7XG4gICAgaiA9IDA7XG4gICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBbYVtpZHhdLCBiW2pdXTtcbiAgICAgIGogKz0gMTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbGlzdCBvdXQgb2YgdGhlIHR3byBzdXBwbGllZCBieSBwYWlyaW5nIHVwIGVxdWFsbHktcG9zaXRpb25lZFxuICogaXRlbXMgZnJvbSBib3RoIGxpc3RzLiBUaGUgcmV0dXJuZWQgbGlzdCBpcyB0cnVuY2F0ZWQgdG8gdGhlIGxlbmd0aCBvZiB0aGVcbiAqIHNob3J0ZXIgb2YgdGhlIHR3byBpbnB1dCBsaXN0cy5cbiAqIE5vdGU6IGB6aXBgIGlzIGVxdWl2YWxlbnQgdG8gYHppcFdpdGgoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gW2EsIGJdIH0pYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYl0gLT4gW1thLGJdXVxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBtYWRlIGJ5IHBhaXJpbmcgdXAgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBsaXN0MWAgYW5kIGBsaXN0MmAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi56aXAoWzEsIDIsIDNdLCBbJ2EnLCAnYicsICdjJ10pOyAvLz0+IFtbMSwgJ2EnXSwgWzIsICdiJ10sIFszLCAnYyddXVxuICogQHN5bWIgUi56aXAoW2EsIGIsIGNdLCBbZCwgZSwgZl0pID0gW1thLCBkXSwgW2IsIGVdLCBbYywgZl1dXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiB6aXAoYSwgYikge1xuICB2YXIgcnYgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgcnZbaWR4XSA9IFthW2lkeF0sIGJbaWR4XV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJ2O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgb3V0IG9mIGEgbGlzdCBvZiBrZXlzIGFuZCBhIGxpc3Qgb2YgdmFsdWVzLlxuICogS2V5L3ZhbHVlIHBhaXJpbmcgaXMgdHJ1bmNhdGVkIHRvIHRoZSBsZW5ndGggb2YgdGhlIHNob3J0ZXIgb2YgdGhlIHR3byBsaXN0cy5cbiAqIE5vdGU6IGB6aXBPYmpgIGlzIGVxdWl2YWxlbnQgdG8gYHBpcGUoemlwV2l0aChwYWlyKSwgZnJvbVBhaXJzKWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMy4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbU3RyaW5nXSAtPiBbKl0gLT4ge1N0cmluZzogKn1cbiAqIEBwYXJhbSB7QXJyYXl9IGtleXMgVGhlIGFycmF5IHRoYXQgd2lsbCBiZSBwcm9wZXJ0aWVzIG9uIHRoZSBvdXRwdXQgb2JqZWN0LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSBsaXN0IG9mIHZhbHVlcyBvbiB0aGUgb3V0cHV0IG9iamVjdC5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIG9iamVjdCBtYWRlIGJ5IHBhaXJpbmcgdXAgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBrZXlzYCBhbmQgYHZhbHVlc2AuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi56aXBPYmooWydhJywgJ2InLCAnYyddLCBbMSwgMiwgM10pOyAvLz0+IHthOiAxLCBiOiAyLCBjOiAzfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gemlwT2JqKGtleXMsIHZhbHVlcykge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IE1hdGgubWluKGtleXMubGVuZ3RoLCB2YWx1ZXMubGVuZ3RoKTtcbiAgdmFyIG91dCA9IHt9O1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgb3V0W2tleXNbaWR4XV0gPSB2YWx1ZXNbaWR4XTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gb3V0O1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsaXN0IG91dCBvZiB0aGUgdHdvIHN1cHBsaWVkIGJ5IGFwcGx5aW5nIHRoZSBmdW5jdGlvbiB0byBlYWNoXG4gKiBlcXVhbGx5LXBvc2l0aW9uZWQgcGFpciBpbiB0aGUgbGlzdHMuIFRoZSByZXR1cm5lZCBsaXN0IGlzIHRydW5jYXRlZCB0byB0aGVcbiAqIGxlbmd0aCBvZiB0aGUgc2hvcnRlciBvZiB0aGUgdHdvIGlucHV0IGxpc3RzLlxuICpcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhLGIgLT4gYykgLT4gW2FdIC0+IFtiXSAtPiBbY11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbWJpbmUgdGhlIHR3byBlbGVtZW50cyBpbnRvIG9uZSB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBhcnJheSB0byBjb25zaWRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBjb21iaW5pbmcgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBsaXN0MWAgYW5kIGBsaXN0MmBcbiAqICAgICAgICAgdXNpbmcgYGZuYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZiA9ICh4LCB5KSA9PiB7XG4gKiAgICAgICAgLy8gLi4uXG4gKiAgICAgIH07XG4gKiAgICAgIFIuemlwV2l0aChmLCBbMSwgMiwgM10sIFsnYScsICdiJywgJ2MnXSk7XG4gKiAgICAgIC8vPT4gW2YoMSwgJ2EnKSwgZigyLCAnYicpLCBmKDMsICdjJyldXG4gKiBAc3ltYiBSLnppcFdpdGgoZm4sIFthLCBiLCBjXSwgW2QsIGUsIGZdKSA9IFtmbihhLCBkKSwgZm4oYiwgZSksIGZuKGMsIGYpXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gemlwV2l0aChmbiwgYSwgYikge1xuICB2YXIgcnYgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgcnZbaWR4XSA9IGZuKGFbaWR4XSwgYltpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcnY7XG59KTtcbiIsImltcG9ydCB7IGdldEluaXRpYWxNYXBEYXRhIH0gZnJvbSAnLi4vLi4vdXRpbHMvZW5naW5lJztcblxuY29uc3QgTWFwID0gZnVuY3Rpb24gKCBzdG9yZSApIHtcblxufTtcblxuY29uc3QgY3JlYXRlRW1wdHlNYXAgPSBmdW5jdGlvbiAoKSB7XG5cbn07XG5cbmNvbnN0IGNyZWF0ZU1hcEZyb21KU09OID0gZnVuY3Rpb24gKGpzb24pIHtcblxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1hcEZyb21VUkwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgY29uc29sZS5sb2coZ2V0SW5pdGlhbE1hcERhdGEodXJsKSk7XG59O1xuIiwiaW1wb3J0IHtjcmVhdGVNYXBGcm9tVVJMfSBmcm9tICcuL2NvbXBvbmVudHMvbWFwL21hcCc7XG5cbmNvbnN0IENhcnRvID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIGxldCBmcmFtZSA9IG51bGw7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZnJhbWUgPSBjb250YWluZXI7XG4gICAgfVxufTtcblxuQ2FydG8uY3JlYXRlID0gY3JlYXRlTWFwRnJvbVVSTDtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXJ0bzsiLCJpbXBvcnQgeyBjb21wb3NlUCwgcGljaywgbWFwLCBtZXJnZSwgYWRkSW5kZXggfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBqc29ucCB9IGZyb20gJy4vcmVxdWVzdCc7XG5cbmNvbnN0IHByb21pZnkgPSBmbiA9PiAoKSA9PiBQcm9taXNlLnJlc29sdmUoZm4uY2FsbChudWxsLCBhcmd1bWVudHMpKTtcblxuY29uc3QgcGlja1AgPSBwcm9taWZ5KHBpY2spO1xuXG5leHBvcnQgY29uc3QgZ2V0TWFwRGF0YSA9IGpzb25wO1xuZXhwb3J0IGNvbnN0IGdldExheWVyc0RhdGEgPSBjb21wb3NlUChcbiAgICBwaWNrUCgnbGF5ZXJzJyksXG4gICAgcGlja1AoJ21ldGFkYXRhJyksXG4gICAganNvbnBcbik7XG5cbi8vIGV4cG9ydCBjb25zdCBnZXRJbml0YWxNYXBEYXRhID0gKHVybCkgPT4geyByZXR1cm4gZ2V0TWFwRGF0YSh1cmwpLnRoZW4oXG4vLyAgICAganNvbiA9PiBnZXRMYXllcnNEYXRhKHVybCkudGhlbihcbi8vICAgICAgICAgbGF5ZXJzID0+IGpzb24ubGF5ZXJzID0gYWRkSW5kZXgobWFwKSgobHksIGkpID0+IG1lcmdlKGxheWVyc1tpXSksIGpzb24ubGF5ZXJzKVxuLy8gICAgIClcbi8vICl9O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5pdGFsTWFwRGF0YSA9IHVybCA9PiB1cmw7XG5cbi8vIFRoaXMgbWV0aG9zIHVwZGF0ZSB0aGUgc3R5bGUgb2YgYSBsYXllciBpbiB0aGUgbWFwcyBhcGlcbmV4cG9ydCBjb25zdCB1cGRhdGVMYXllclN0eWxlID0gKCkgPT4ge307IiwiZXhwb3J0IGNvbnN0IGlvID0gZnVuY3Rpb24oIHVybCwgdGltZW91dCA9IDYwMDAwLCByZXNwb25zZVR5cGUgPSAndGV4dCcsIG1ldGhvZCA9ICdHRVQnLCBoZWFkZXJzID0ge30gKSB7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcbiAgICAgICAgcmVxdWVzdC5vcGVuKCBtZXRob2QsIHVybCwgdHJ1ZSApO1xuICAgICAgICByZXF1ZXN0LnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIHJlcXVlc3Quc3RhdHVzID09PSAyMDAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBbICd0ZXh0JywgJ2pzb24nIF0uaW5kZXhPZiggcmVxdWVzdC5yZXNwb25zZVR5cGUgKSA+IC0xICkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCByZXF1ZXN0LnJlc3BvbnNlVGV4dCApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoIHJlcXVlc3QucmVzcG9uc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdCggRXJyb3IoICdSZXF1ZXN0IGVycm9yIHdpdGggYSBzdGF0dXMgb2YgJyArIHJlcXVlc3Quc3RhdHVzVGV4dCApICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9ICggZXZ0ICkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KCBFcnJvciggJ1RoZXJlIHdhcyBhIG5ldHdvcmsgZXJyb3InICsgZXZ0LnRvU3RyaW5nKCkgKSApO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9udGltZW91dCA9ICggZXZ0ICkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KCBFcnJvciggJ3RpbWVvdXQgJyArIGV2dC50b1N0cmluZygpICkgKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfSApO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KCBwcm9taXNlLCAncmVxdWVzdCcsIHtcbiAgICAgICAgdmFsdWU6IHJlcXVlc3RcbiAgICB9ICk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBqc29ucCA9IHVybCA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrTmFtZSA9ICdfY2RiY18nICsgTWF0aC5yb3VuZCggMTAwMDAwICogTWF0aC5yYW5kb20oKSApO1xuXG4gICAgICAgIHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBkYXRhID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCggc2NyaXB0ICk7XG4gICAgICAgICAgICByZXNvbHZlKCBkYXRhICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzY3JpcHQnICk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSB1cmwgKyAoIHVybC5pbmRleE9mKCAnPycgKSA+PSAwID8gJyYnIDogJz8nICkgKyAnY2FsbGJhY2s9JyArIGNhbGxiYWNrTmFtZTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggc2NyaXB0ICk7XG4gICAgfSk7XG59OyJdfQ==
