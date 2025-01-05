class xo {
  constructor() {
    this.eventBuffer = [], this.handledTypes = [], this.copilotMain = null, this.debug = !1, this.eventProxy = {
      functionCallQueue: [],
      dispatchEvent(...t) {
        return this.functionCallQueue.push({ name: "dispatchEvent", args: t }), !0;
      },
      removeEventListener(...t) {
        this.functionCallQueue.push({ name: "removeEventListener", args: t });
      },
      addEventListener(...t) {
        this.functionCallQueue.push({ name: "addEventListener", args: t });
      },
      processQueue(t) {
        this.functionCallQueue.forEach((n) => {
          t[n.name].call(t, ...n.args);
        }), this.functionCallQueue = [];
      }
    };
  }
  getEventTarget() {
    return this.copilotMain ? this.copilotMain : (this.copilotMain = document.querySelector("copilot-main"), this.copilotMain ? (this.eventProxy.processQueue(this.copilotMain), this.copilotMain) : this.eventProxy);
  }
  on(t, n) {
    const r = n;
    return this.getEventTarget().addEventListener(t, r), this.handledTypes.push(t), this.flush(t), () => this.off(t, r);
  }
  once(t, n) {
    this.getEventTarget().addEventListener(t, n, { once: !0 });
  }
  off(t, n) {
    this.getEventTarget().removeEventListener(t, n);
    const r = this.handledTypes.indexOf(t, 0);
    r > -1 && this.handledTypes.splice(r, 1);
  }
  emit(t, n) {
    const r = new CustomEvent(t, { detail: n, cancelable: !0 });
    return this.handledTypes.includes(t) || this.eventBuffer.push(r), this.debug && console.debug("Emit event", r), this.getEventTarget().dispatchEvent(r), r.defaultPrevented;
  }
  emitUnsafe({ type: t, data: n }) {
    return this.emit(t, n);
  }
  // Communication with server via eventbus
  send(t, n) {
    const r = new CustomEvent("copilot-send", { detail: { command: t, data: n } });
    this.getEventTarget().dispatchEvent(r);
  }
  // Listeners for Copilot itself
  onSend(t) {
    this.on("copilot-send", t);
  }
  offSend(t) {
    this.off("copilot-send", t);
  }
  flush(t) {
    const n = [];
    this.eventBuffer.filter((r) => r.type === t).forEach((r) => {
      this.getEventTarget().dispatchEvent(r), n.push(r);
    }), this.eventBuffer = this.eventBuffer.filter((r) => !n.includes(r));
  }
}
var Po = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function(t, n) {
    return "Cannot apply '" + t + "' to '" + n.toString() + "': Field not found.";
  },
  /*
  2(prop) {
      return `invalid decorator for '${prop.toString()}'`
  },
  3(prop) {
      return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
  },
  4(prop) {
      return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
  },
  */
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function(t, n) {
    return "[mobx.array] Index out of bounds, " + t + " is larger than " + n;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function(t) {
    return "Cannot initialize from classes that inherit from Map: " + t.constructor.name;
  },
  20: function(t) {
    return "Cannot initialize map from " + t;
  },
  21: function(t) {
    return "Cannot convert to map from '" + t + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function(t) {
    return "Cannot obtain administration from " + t;
  },
  25: function(t, n) {
    return "the entry '" + t + "' does not exist in the observable map '" + n + "'";
  },
  26: "please specify a property",
  27: function(t, n) {
    return "no observable property '" + t.toString() + "' found on the observable object '" + n + "'";
  },
  28: function(t) {
    return "Cannot obtain atom from " + t;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function(t, n) {
    return "Cycle detected in computation " + t + ": " + n;
  },
  33: function(t) {
    return "The setter of computed value '" + t + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function(t) {
    return "[ComputedValue '" + t + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function(t) {
    return "[mobx] `observableArray." + t + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + t + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
}, Co = process.env.NODE_ENV !== "production" ? Po : {};
function h(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  if (process.env.NODE_ENV !== "production") {
    var i = typeof e == "string" ? e : Co[e];
    throw typeof i == "function" && (i = i.apply(null, n)), new Error("[MobX] " + i);
  }
  throw new Error(typeof e == "number" ? "[MobX] minified error nr: " + e + (n.length ? " " + n.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + e);
}
var $o = {};
function kn() {
  return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : $o;
}
var qr = Object.assign, It = Object.getOwnPropertyDescriptor, X = Object.defineProperty, Jt = Object.prototype, Rt = [];
Object.freeze(Rt);
var Vn = {};
Object.freeze(Vn);
var Do = typeof Proxy < "u", To = /* @__PURE__ */ Object.toString();
function Wr() {
  Do || h(process.env.NODE_ENV !== "production" ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
}
function Qe(e) {
  process.env.NODE_ENV !== "production" && f.verifyProxies && h("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + e);
}
function B() {
  return ++f.mobxGuid;
}
function In(e) {
  var t = !1;
  return function() {
    if (!t)
      return t = !0, e.apply(this, arguments);
  };
}
var Le = function() {
};
function A(e) {
  return typeof e == "function";
}
function Ae(e) {
  var t = typeof e;
  switch (t) {
    case "string":
    case "symbol":
    case "number":
      return !0;
  }
  return !1;
}
function Xt(e) {
  return e !== null && typeof e == "object";
}
function C(e) {
  if (!Xt(e))
    return !1;
  var t = Object.getPrototypeOf(e);
  if (t == null)
    return !0;
  var n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n.toString() === To;
}
function Gr(e) {
  var t = e?.constructor;
  return t ? t.name === "GeneratorFunction" || t.displayName === "GeneratorFunction" : !1;
}
function Zt(e, t, n) {
  X(e, t, {
    enumerable: !1,
    writable: !0,
    configurable: !0,
    value: n
  });
}
function Yr(e, t, n) {
  X(e, t, {
    enumerable: !1,
    writable: !1,
    configurable: !0,
    value: n
  });
}
function ke(e, t) {
  var n = "isMobX" + e;
  return t.prototype[n] = !0, function(r) {
    return Xt(r) && r[n] === !0;
  };
}
function qe(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Map]";
}
function ko(e) {
  var t = Object.getPrototypeOf(e), n = Object.getPrototypeOf(t), r = Object.getPrototypeOf(n);
  return r === null;
}
function te(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Set]";
}
var Jr = typeof Object.getOwnPropertySymbols < "u";
function Vo(e) {
  var t = Object.keys(e);
  if (!Jr)
    return t;
  var n = Object.getOwnPropertySymbols(e);
  return n.length ? [].concat(t, n.filter(function(r) {
    return Jt.propertyIsEnumerable.call(e, r);
  })) : t;
}
var dt = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Jr ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : (
  /* istanbul ignore next */
  Object.getOwnPropertyNames
);
function wn(e) {
  return typeof e == "string" ? e : typeof e == "symbol" ? e.toString() : new String(e).toString();
}
function Xr(e) {
  return e === null ? null : typeof e == "object" ? "" + e : e;
}
function H(e, t) {
  return Jt.hasOwnProperty.call(e, t);
}
var Io = Object.getOwnPropertyDescriptors || function(t) {
  var n = {};
  return dt(t).forEach(function(r) {
    n[r] = It(t, r);
  }), n;
};
function D(e, t) {
  return !!(e & t);
}
function T(e, t, n) {
  return n ? e |= t : e &= ~t, e;
}
function Zn(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Ro(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Mo(r.key), r);
  }
}
function We(e, t, n) {
  return t && Ro(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Ue(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = Lo(e)) || t) {
    n && (e = n);
    var r = 0;
    return function() {
      return r >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[r++]
      };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function de() {
  return de = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, de.apply(null, arguments);
}
function Zr(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, En(e, t);
}
function En(e, t) {
  return En = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, En(e, t);
}
function jo(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Mo(e) {
  var t = jo(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Lo(e, t) {
  if (e) {
    if (typeof e == "string") return Zn(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Zn(e, t) : void 0;
  }
}
var ne = /* @__PURE__ */ Symbol("mobx-stored-annotations");
function Z(e) {
  function t(n, r) {
    if (_t(r))
      return e.decorate_20223_(n, r);
    mt(n, r, e);
  }
  return Object.assign(t, e);
}
function mt(e, t, n) {
  if (H(e, ne) || Zt(e, ne, de({}, e[ne])), process.env.NODE_ENV !== "production" && jt(n) && !H(e[ne], t)) {
    var r = e.constructor.name + ".prototype." + t.toString();
    h("'" + r + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  Uo(e, n, t), jt(n) || (e[ne][t] = n);
}
function Uo(e, t, n) {
  if (process.env.NODE_ENV !== "production" && !jt(t) && H(e[ne], n)) {
    var r = e.constructor.name + ".prototype." + n.toString(), i = e[ne][n].annotationType_, o = t.annotationType_;
    h("Cannot apply '@" + o + "' to '" + r + "':" + (`
The field is already decorated with '@` + i + "'.") + `
Re-decorating fields is not allowed.
Use '@override' decorator for methods overridden by subclass.`);
  }
}
function _t(e) {
  return typeof e == "object" && typeof e.kind == "string";
}
function Qt(e, t) {
  process.env.NODE_ENV !== "production" && !t.includes(e.kind) && h("The decorator applied to '" + String(e.name) + "' cannot be used on a " + e.kind + " element");
}
var b = /* @__PURE__ */ Symbol("mobx administration"), ve = /* @__PURE__ */ function() {
  function e(n) {
    n === void 0 && (n = process.env.NODE_ENV !== "production" ? "Atom@" + B() : "Atom"), this.name_ = void 0, this.flags_ = 0, this.observers_ = /* @__PURE__ */ new Set(), this.lastAccessedBy_ = 0, this.lowestObserverState_ = _.NOT_TRACKING_, this.onBOL = void 0, this.onBUOL = void 0, this.name_ = n;
  }
  var t = e.prototype;
  return t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(r) {
      return r();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(r) {
      return r();
    });
  }, t.reportObserved = function() {
    return vi(this);
  }, t.reportChanged = function() {
    M(), pi(this), L();
  }, t.toString = function() {
    return this.name_;
  }, We(e, [{
    key: "isBeingObserved",
    get: function() {
      return D(this.flags_, e.isBeingObservedMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isBeingObservedMask_, r);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return D(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isPendingUnobservationMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return D(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
ve.isBeingObservedMask_ = 1;
ve.isPendingUnobservationMask_ = 2;
ve.diffValueMask_ = 4;
var Rn = /* @__PURE__ */ ke("Atom", ve);
function Qr(e, t, n) {
  t === void 0 && (t = Le), n === void 0 && (n = Le);
  var r = new ve(e);
  return t !== Le && Qa(r, t), n !== Le && Si(r, n), r;
}
function zo(e, t) {
  return e === t;
}
function Bo(e, t) {
  return Bn(e, t);
}
function Fo(e, t) {
  return Bn(e, t, 1);
}
function Ho(e, t) {
  return Object.is ? Object.is(e, t) : e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var ze = {
  identity: zo,
  structural: Bo,
  default: Ho,
  shallow: Fo
};
function Se(e, t, n) {
  return vt(e) ? e : Array.isArray(e) ? S.array(e, {
    name: n
  }) : C(e) ? S.object(e, void 0, {
    name: n
  }) : qe(e) ? S.map(e, {
    name: n
  }) : te(e) ? S.set(e, {
    name: n
  }) : typeof e == "function" && !Be(e) && !ht(e) ? Gr(e) ? Fe(e) : ft(n, e) : e;
}
function Ko(e, t, n) {
  if (e == null || Ye(e) || ln(e) || pe(e) || Y(e))
    return e;
  if (Array.isArray(e))
    return S.array(e, {
      name: n,
      deep: !1
    });
  if (C(e))
    return S.object(e, void 0, {
      name: n,
      deep: !1
    });
  if (qe(e))
    return S.map(e, {
      name: n,
      deep: !1
    });
  if (te(e))
    return S.set(e, {
      name: n,
      deep: !1
    });
  process.env.NODE_ENV !== "production" && h("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function en(e) {
  return e;
}
function qo(e, t) {
  return process.env.NODE_ENV !== "production" && vt(e) && h("observable.struct should not be used with observable values"), Bn(e, t) ? t : e;
}
var Wo = "override";
function jt(e) {
  return e.annotationType_ === Wo;
}
function yt(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: Go,
    extend_: Yo,
    decorate_20223_: Jo
  };
}
function Go(e, t, n, r) {
  var i;
  if ((i = this.options_) != null && i.bound)
    return this.extend_(e, t, n, !1) === null ? 0 : 1;
  if (r === e.target_)
    return this.extend_(e, t, n, !1) === null ? 0 : 2;
  if (Be(n.value))
    return 1;
  var o = ei(e, this, t, n, !1);
  return X(r, t, o), 2;
}
function Yo(e, t, n, r) {
  var i = ei(e, this, t, n);
  return e.defineProperty_(t, i, r);
}
function Jo(e, t) {
  process.env.NODE_ENV !== "production" && Qt(t, ["method", "field"]);
  var n = t.kind, r = t.name, i = t.addInitializer, o = this, a = function(c) {
    var u, d, v, p;
    return Ne((u = (d = o.options_) == null ? void 0 : d.name) != null ? u : r.toString(), c, (v = (p = o.options_) == null ? void 0 : p.autoAction) != null ? v : !1);
  };
  if (n == "field")
    return function(l) {
      var c, u = l;
      return Be(u) || (u = a(u)), (c = o.options_) != null && c.bound && (u = u.bind(this), u.isMobxAction = !0), u;
    };
  if (n == "method") {
    var s;
    return Be(e) || (e = a(e)), (s = this.options_) != null && s.bound && i(function() {
      var l = this, c = l[r].bind(l);
      c.isMobxAction = !0, l[r] = c;
    }), e;
  }
  h("Cannot apply '" + o.annotationType_ + "' to '" + String(r) + "' (kind: " + n + "):" + (`
'` + o.annotationType_ + "' can only be used on properties with a function value."));
}
function Xo(e, t, n, r) {
  var i = t.annotationType_, o = r.value;
  process.env.NODE_ENV !== "production" && !A(o) && h("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' can only be used on properties with a function value."));
}
function ei(e, t, n, r, i) {
  var o, a, s, l, c, u, d;
  i === void 0 && (i = f.safeDescriptors), Xo(e, t, n, r);
  var v = r.value;
  if ((o = t.options_) != null && o.bound) {
    var p;
    v = v.bind((p = e.proxy_) != null ? p : e.target_);
  }
  return {
    value: Ne(
      (a = (s = t.options_) == null ? void 0 : s.name) != null ? a : n.toString(),
      v,
      (l = (c = t.options_) == null ? void 0 : c.autoAction) != null ? l : !1,
      // https://github.com/mobxjs/mobx/discussions/3140
      (u = t.options_) != null && u.bound ? (d = e.proxy_) != null ? d : e.target_ : void 0
    ),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: i ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !i
  };
}
function ti(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: Zo,
    extend_: Qo,
    decorate_20223_: ea
  };
}
function Zo(e, t, n, r) {
  var i;
  if (r === e.target_)
    return this.extend_(e, t, n, !1) === null ? 0 : 2;
  if ((i = this.options_) != null && i.bound && (!H(e.target_, t) || !ht(e.target_[t])) && this.extend_(e, t, n, !1) === null)
    return 0;
  if (ht(n.value))
    return 1;
  var o = ni(e, this, t, n, !1, !1);
  return X(r, t, o), 2;
}
function Qo(e, t, n, r) {
  var i, o = ni(e, this, t, n, (i = this.options_) == null ? void 0 : i.bound);
  return e.defineProperty_(t, o, r);
}
function ea(e, t) {
  var n;
  process.env.NODE_ENV !== "production" && Qt(t, ["method"]);
  var r = t.name, i = t.addInitializer;
  return ht(e) || (e = Fe(e)), (n = this.options_) != null && n.bound && i(function() {
    var o = this, a = o[r].bind(o);
    a.isMobXFlow = !0, o[r] = a;
  }), e;
}
function ta(e, t, n, r) {
  var i = t.annotationType_, o = r.value;
  process.env.NODE_ENV !== "production" && !A(o) && h("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' can only be used on properties with a generator function value."));
}
function ni(e, t, n, r, i, o) {
  o === void 0 && (o = f.safeDescriptors), ta(e, t, n, r);
  var a = r.value;
  if (ht(a) || (a = Fe(a)), i) {
    var s;
    a = a.bind((s = e.proxy_) != null ? s : e.target_), a.isMobXFlow = !0;
  }
  return {
    value: a,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: o ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !o
  };
}
function jn(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: na,
    extend_: ra,
    decorate_20223_: ia
  };
}
function na(e, t, n) {
  return this.extend_(e, t, n, !1) === null ? 0 : 1;
}
function ra(e, t, n, r) {
  return oa(e, this, t, n), e.defineComputedProperty_(t, de({}, this.options_, {
    get: n.get,
    set: n.set
  }), r);
}
function ia(e, t) {
  process.env.NODE_ENV !== "production" && Qt(t, ["getter"]);
  var n = this, r = t.name, i = t.addInitializer;
  return i(function() {
    var o = Ge(this)[b], a = de({}, n.options_, {
      get: e,
      context: this
    });
    a.name || (a.name = process.env.NODE_ENV !== "production" ? o.name_ + "." + r.toString() : "ObservableObject." + r.toString()), o.values_.set(r, new z(a));
  }), function() {
    return this[b].getObservablePropValue_(r);
  };
}
function oa(e, t, n, r) {
  var i = t.annotationType_, o = r.get;
  process.env.NODE_ENV !== "production" && !o && h("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' can only be used on getter(+setter) properties."));
}
function tn(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: aa,
    extend_: sa,
    decorate_20223_: la
  };
}
function aa(e, t, n) {
  return this.extend_(e, t, n, !1) === null ? 0 : 1;
}
function sa(e, t, n, r) {
  var i, o;
  return ca(e, this, t, n), e.defineObservableProperty_(t, n.value, (i = (o = this.options_) == null ? void 0 : o.enhancer) != null ? i : Se, r);
}
function la(e, t) {
  if (process.env.NODE_ENV !== "production") {
    if (t.kind === "field")
      throw h("Please use `@observable accessor " + String(t.name) + "` instead of `@observable " + String(t.name) + "`");
    Qt(t, ["accessor"]);
  }
  var n = this, r = t.kind, i = t.name, o = /* @__PURE__ */ new WeakSet();
  function a(s, l) {
    var c, u, d = Ge(s)[b], v = new Oe(l, (c = (u = n.options_) == null ? void 0 : u.enhancer) != null ? c : Se, process.env.NODE_ENV !== "production" ? d.name_ + "." + i.toString() : "ObservableObject." + i.toString(), !1);
    d.values_.set(i, v), o.add(s);
  }
  if (r == "accessor")
    return {
      get: function() {
        return o.has(this) || a(this, e.get.call(this)), this[b].getObservablePropValue_(i);
      },
      set: function(l) {
        return o.has(this) || a(this, l), this[b].setObservablePropValue_(i, l);
      },
      init: function(l) {
        return o.has(this) || a(this, l), l;
      }
    };
}
function ca(e, t, n, r) {
  var i = t.annotationType_;
  process.env.NODE_ENV !== "production" && !("value" in r) && h("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' cannot be used on getter/setter properties"));
}
var ua = "true", da = /* @__PURE__ */ ri();
function ri(e) {
  return {
    annotationType_: ua,
    options_: e,
    make_: fa,
    extend_: ha,
    decorate_20223_: va
  };
}
function fa(e, t, n, r) {
  var i, o;
  if (n.get)
    return nn.make_(e, t, n, r);
  if (n.set) {
    var a = Ne(t.toString(), n.set);
    return r === e.target_ ? e.defineProperty_(t, {
      configurable: f.safeDescriptors ? e.isPlainObject_ : !0,
      set: a
    }) === null ? 0 : 2 : (X(r, t, {
      configurable: !0,
      set: a
    }), 2);
  }
  if (r !== e.target_ && typeof n.value == "function") {
    var s;
    if (Gr(n.value)) {
      var l, c = (l = this.options_) != null && l.autoBind ? Fe.bound : Fe;
      return c.make_(e, t, n, r);
    }
    var u = (s = this.options_) != null && s.autoBind ? ft.bound : ft;
    return u.make_(e, t, n, r);
  }
  var d = ((i = this.options_) == null ? void 0 : i.deep) === !1 ? S.ref : S;
  if (typeof n.value == "function" && (o = this.options_) != null && o.autoBind) {
    var v;
    n.value = n.value.bind((v = e.proxy_) != null ? v : e.target_);
  }
  return d.make_(e, t, n, r);
}
function ha(e, t, n, r) {
  var i, o;
  if (n.get)
    return nn.extend_(e, t, n, r);
  if (n.set)
    return e.defineProperty_(t, {
      configurable: f.safeDescriptors ? e.isPlainObject_ : !0,
      set: Ne(t.toString(), n.set)
    }, r);
  if (typeof n.value == "function" && (i = this.options_) != null && i.autoBind) {
    var a;
    n.value = n.value.bind((a = e.proxy_) != null ? a : e.target_);
  }
  var s = ((o = this.options_) == null ? void 0 : o.deep) === !1 ? S.ref : S;
  return s.extend_(e, t, n, r);
}
function va(e, t) {
  h("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var pa = "observable", ga = "observable.ref", ba = "observable.shallow", ma = "observable.struct", ii = {
  deep: !0,
  name: void 0,
  defaultDecorator: void 0,
  proxy: !0
};
Object.freeze(ii);
function At(e) {
  return e || ii;
}
var On = /* @__PURE__ */ tn(pa), _a = /* @__PURE__ */ tn(ga, {
  enhancer: en
}), ya = /* @__PURE__ */ tn(ba, {
  enhancer: Ko
}), wa = /* @__PURE__ */ tn(ma, {
  enhancer: qo
}), oi = /* @__PURE__ */ Z(On);
function St(e) {
  return e.deep === !0 ? Se : e.deep === !1 ? en : Oa(e.defaultDecorator);
}
function Ea(e) {
  var t;
  return e ? (t = e.defaultDecorator) != null ? t : ri(e) : void 0;
}
function Oa(e) {
  var t, n;
  return e && (t = (n = e.options_) == null ? void 0 : n.enhancer) != null ? t : Se;
}
function ai(e, t, n) {
  if (_t(t))
    return On.decorate_20223_(e, t);
  if (Ae(t)) {
    mt(e, t, On);
    return;
  }
  return vt(e) ? e : C(e) ? S.object(e, t, n) : Array.isArray(e) ? S.array(e, t) : qe(e) ? S.map(e, t) : te(e) ? S.set(e, t) : typeof e == "object" && e !== null ? e : S.box(e, t);
}
qr(ai, oi);
var Aa = {
  box: function(t, n) {
    var r = At(n);
    return new Oe(t, St(r), r.name, !0, r.equals);
  },
  array: function(t, n) {
    var r = At(n);
    return (f.useProxies === !1 || r.proxy === !1 ? ws : ds)(t, St(r), r.name);
  },
  map: function(t, n) {
    var r = At(n);
    return new Di(t, St(r), r.name);
  },
  set: function(t, n) {
    var r = At(n);
    return new Ti(t, St(r), r.name);
  },
  object: function(t, n, r) {
    return Ie(function() {
      return xi(f.useProxies === !1 || r?.proxy === !1 ? Ge({}, r) : ls({}, r), t, n);
    });
  },
  ref: /* @__PURE__ */ Z(_a),
  shallow: /* @__PURE__ */ Z(ya),
  deep: oi,
  struct: /* @__PURE__ */ Z(wa)
}, S = /* @__PURE__ */ qr(ai, Aa), si = "computed", Sa = "computed.struct", An = /* @__PURE__ */ jn(si), Na = /* @__PURE__ */ jn(Sa, {
  equals: ze.structural
}), nn = function(t, n) {
  if (_t(n))
    return An.decorate_20223_(t, n);
  if (Ae(n))
    return mt(t, n, An);
  if (C(t))
    return Z(jn(si, t));
  process.env.NODE_ENV !== "production" && (A(t) || h("First argument to `computed` should be an expression."), A(n) && h("A setter as second argument is no longer supported, use `{ set: fn }` option instead"));
  var r = C(n) ? n : {};
  return r.get = t, r.name || (r.name = t.name || ""), new z(r);
};
Object.assign(nn, An);
nn.struct = /* @__PURE__ */ Z(Na);
var Qn, er, Mt = 0, xa = 1, Pa = (Qn = (er = /* @__PURE__ */ It(function() {
}, "name")) == null ? void 0 : er.configurable) != null ? Qn : !1, tr = {
  value: "action",
  configurable: !0,
  writable: !1,
  enumerable: !1
};
function Ne(e, t, n, r) {
  n === void 0 && (n = !1), process.env.NODE_ENV !== "production" && (A(t) || h("`action` can only be invoked on functions"), (typeof e != "string" || !e) && h("actions should have valid names, got: '" + e + "'"));
  function i() {
    return li(e, n, t, r || this, arguments);
  }
  return i.isMobxAction = !0, i.toString = function() {
    return t.toString();
  }, Pa && (tr.value = e, X(i, "name", tr)), i;
}
function li(e, t, n, r, i) {
  var o = Ca(e, t, r, i);
  try {
    return n.apply(r, i);
  } catch (a) {
    throw o.error_ = a, a;
  } finally {
    $a(o);
  }
}
function Ca(e, t, n, r) {
  var i = process.env.NODE_ENV !== "production" && P() && !!e, o = 0;
  if (process.env.NODE_ENV !== "production" && i) {
    o = Date.now();
    var a = r ? Array.from(r) : Rt;
    k({
      type: Ln,
      name: e,
      object: n,
      arguments: a
    });
  }
  var s = f.trackingDerivation, l = !t || !s;
  M();
  var c = f.allowStateChanges;
  l && (Ve(), c = rn(!0));
  var u = Mn(!0), d = {
    runAsAction_: l,
    prevDerivation_: s,
    prevAllowStateChanges_: c,
    prevAllowStateReads_: u,
    notifySpy_: i,
    startTime_: o,
    actionId_: xa++,
    parentActionId_: Mt
  };
  return Mt = d.actionId_, d;
}
function $a(e) {
  Mt !== e.actionId_ && h(30), Mt = e.parentActionId_, e.error_ !== void 0 && (f.suppressReactionErrors = !0), on(e.prevAllowStateChanges_), st(e.prevAllowStateReads_), L(), e.runAsAction_ && oe(e.prevDerivation_), process.env.NODE_ENV !== "production" && e.notifySpy_ && V({
    time: Date.now() - e.startTime_
  }), f.suppressReactionErrors = !1;
}
function Da(e, t) {
  var n = rn(e);
  try {
    return t();
  } finally {
    on(n);
  }
}
function rn(e) {
  var t = f.allowStateChanges;
  return f.allowStateChanges = e, t;
}
function on(e) {
  f.allowStateChanges = e;
}
var Ta = "create", Oe = /* @__PURE__ */ function(e) {
  function t(r, i, o, a, s) {
    var l;
    return o === void 0 && (o = process.env.NODE_ENV !== "production" ? "ObservableValue@" + B() : "ObservableValue"), a === void 0 && (a = !0), s === void 0 && (s = ze.default), l = e.call(this, o) || this, l.enhancer = void 0, l.name_ = void 0, l.equals = void 0, l.hasUnreportedChange_ = !1, l.interceptors_ = void 0, l.changeListeners_ = void 0, l.value_ = void 0, l.dehancer = void 0, l.enhancer = i, l.name_ = o, l.equals = s, l.value_ = i(r, void 0, o), process.env.NODE_ENV !== "production" && a && P() && xe({
      type: Ta,
      object: l,
      observableKind: "value",
      debugObjectName: l.name_,
      newValue: "" + l.value_
    }), l;
  }
  Zr(t, e);
  var n = t.prototype;
  return n.dehanceValue = function(i) {
    return this.dehancer !== void 0 ? this.dehancer(i) : i;
  }, n.set = function(i) {
    var o = this.value_;
    if (i = this.prepareNewValue_(i), i !== f.UNCHANGED) {
      var a = P();
      process.env.NODE_ENV !== "production" && a && k({
        type: F,
        object: this,
        observableKind: "value",
        debugObjectName: this.name_,
        newValue: i,
        oldValue: o
      }), this.setNewValue_(i), process.env.NODE_ENV !== "production" && a && V();
    }
  }, n.prepareNewValue_ = function(i) {
    if (J(this), R(this)) {
      var o = j(this, {
        object: this,
        type: F,
        newValue: i
      });
      if (!o)
        return f.UNCHANGED;
      i = o.newValue;
    }
    return i = this.enhancer(i, this.value_, this.name_), this.equals(this.value_, i) ? f.UNCHANGED : i;
  }, n.setNewValue_ = function(i) {
    var o = this.value_;
    this.value_ = i, this.reportChanged(), K(this) && q(this, {
      type: F,
      object: this,
      newValue: i,
      oldValue: o
    });
  }, n.get = function() {
    return this.reportObserved(), this.dehanceValue(this.value_);
  }, n.intercept_ = function(i) {
    return wt(this, i);
  }, n.observe_ = function(i, o) {
    return o && i({
      observableKind: "value",
      debugObjectName: this.name_,
      object: this,
      type: F,
      newValue: this.value_,
      oldValue: void 0
    }), Et(this, i);
  }, n.raw = function() {
    return this.value_;
  }, n.toJSON = function() {
    return this.get();
  }, n.toString = function() {
    return this.name_ + "[" + this.value_ + "]";
  }, n.valueOf = function() {
    return Xr(this.get());
  }, n[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, t;
}(ve), z = /* @__PURE__ */ function() {
  function e(n) {
    this.dependenciesState_ = _.NOT_TRACKING_, this.observing_ = [], this.newObserving_ = null, this.observers_ = /* @__PURE__ */ new Set(), this.runId_ = 0, this.lastAccessedBy_ = 0, this.lowestObserverState_ = _.UP_TO_DATE_, this.unboundDepsCount_ = 0, this.value_ = new Lt(null), this.name_ = void 0, this.triggeredBy_ = void 0, this.flags_ = 0, this.derivation = void 0, this.setter_ = void 0, this.isTracing_ = U.NONE, this.scope_ = void 0, this.equals_ = void 0, this.requiresReaction_ = void 0, this.keepAlive_ = void 0, this.onBOL = void 0, this.onBUOL = void 0, n.get || h(31), this.derivation = n.get, this.name_ = n.name || (process.env.NODE_ENV !== "production" ? "ComputedValue@" + B() : "ComputedValue"), n.set && (this.setter_ = Ne(process.env.NODE_ENV !== "production" ? this.name_ + "-setter" : "ComputedValue-setter", n.set)), this.equals_ = n.equals || (n.compareStructural || n.struct ? ze.structural : ze.default), this.scope_ = n.context, this.requiresReaction_ = n.requiresReaction, this.keepAlive_ = !!n.keepAlive;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    Ma(this);
  }, t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(r) {
      return r();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(r) {
      return r();
    });
  }, t.get = function() {
    if (this.isComputing && h(32, this.name_, this.derivation), f.inBatch === 0 && // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_)
      Sn(this) && (this.warnAboutUntrackedRead_(), M(), this.value_ = this.computeValue_(!1), L());
    else if (vi(this), Sn(this)) {
      var r = f.trackingContext;
      this.keepAlive_ && !r && (f.trackingContext = this), this.trackAndCompute() && ja(this), f.trackingContext = r;
    }
    var i = this.value_;
    if (Dt(i))
      throw i.cause;
    return i;
  }, t.set = function(r) {
    if (this.setter_) {
      this.isRunningSetter && h(33, this.name_), this.isRunningSetter = !0;
      try {
        this.setter_.call(this.scope_, r);
      } finally {
        this.isRunningSetter = !1;
      }
    } else
      h(34, this.name_);
  }, t.trackAndCompute = function() {
    var r = this.value_, i = (
      /* see #1208 */
      this.dependenciesState_ === _.NOT_TRACKING_
    ), o = this.computeValue_(!0), a = i || Dt(r) || Dt(o) || !this.equals_(r, o);
    return a && (this.value_ = o, process.env.NODE_ENV !== "production" && P() && xe({
      observableKind: "computed",
      debugObjectName: this.name_,
      object: this.scope_,
      type: "update",
      oldValue: r,
      newValue: o
    })), a;
  }, t.computeValue_ = function(r) {
    this.isComputing = !0;
    var i = rn(!1), o;
    if (r)
      o = ci(this, this.derivation, this.scope_);
    else if (f.disableErrorBoundaries === !0)
      o = this.derivation.call(this.scope_);
    else
      try {
        o = this.derivation.call(this.scope_);
      } catch (a) {
        o = new Lt(a);
      }
    return on(i), this.isComputing = !1, o;
  }, t.suspend_ = function() {
    this.keepAlive_ || (Nn(this), this.value_ = void 0, process.env.NODE_ENV !== "production" && this.isTracing_ !== U.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access."));
  }, t.observe_ = function(r, i) {
    var o = this, a = !0, s = void 0;
    return Ei(function() {
      var l = o.get();
      if (!a || i) {
        var c = Ve();
        r({
          observableKind: "computed",
          debugObjectName: o.name_,
          type: F,
          object: o,
          newValue: l,
          oldValue: s
        }), oe(c);
      }
      a = !1, s = l;
    });
  }, t.warnAboutUntrackedRead_ = function() {
    process.env.NODE_ENV !== "production" && (this.isTracing_ !== U.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."), (typeof this.requiresReaction_ == "boolean" ? this.requiresReaction_ : f.computedRequiresReaction) && console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."));
  }, t.toString = function() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  }, t.valueOf = function() {
    return Xr(this.get());
  }, t[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, We(e, [{
    key: "isComputing",
    get: function() {
      return D(this.flags_, e.isComputingMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isComputingMask_, r);
    }
  }, {
    key: "isRunningSetter",
    get: function() {
      return D(this.flags_, e.isRunningSetterMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isRunningSetterMask_, r);
    }
  }, {
    key: "isBeingObserved",
    get: function() {
      return D(this.flags_, e.isBeingObservedMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isBeingObservedMask_, r);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return D(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isPendingUnobservationMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return D(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
z.isComputingMask_ = 1;
z.isRunningSetterMask_ = 2;
z.isBeingObservedMask_ = 4;
z.isPendingUnobservationMask_ = 8;
z.diffValueMask_ = 16;
var an = /* @__PURE__ */ ke("ComputedValue", z), _;
(function(e) {
  e[e.NOT_TRACKING_ = -1] = "NOT_TRACKING_", e[e.UP_TO_DATE_ = 0] = "UP_TO_DATE_", e[e.POSSIBLY_STALE_ = 1] = "POSSIBLY_STALE_", e[e.STALE_ = 2] = "STALE_";
})(_ || (_ = {}));
var U;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.LOG = 1] = "LOG", e[e.BREAK = 2] = "BREAK";
})(U || (U = {}));
var Lt = function(t) {
  this.cause = void 0, this.cause = t;
};
function Dt(e) {
  return e instanceof Lt;
}
function Sn(e) {
  switch (e.dependenciesState_) {
    case _.UP_TO_DATE_:
      return !1;
    case _.NOT_TRACKING_:
    case _.STALE_:
      return !0;
    case _.POSSIBLY_STALE_: {
      for (var t = Mn(!0), n = Ve(), r = e.observing_, i = r.length, o = 0; o < i; o++) {
        var a = r[o];
        if (an(a)) {
          if (f.disableErrorBoundaries)
            a.get();
          else
            try {
              a.get();
            } catch {
              return oe(n), st(t), !0;
            }
          if (e.dependenciesState_ === _.STALE_)
            return oe(n), st(t), !0;
        }
      }
      return di(e), oe(n), st(t), !1;
    }
  }
}
function J(e) {
  if (process.env.NODE_ENV !== "production") {
    var t = e.observers_.size > 0;
    !f.allowStateChanges && (t || f.enforceActions === "always") && console.warn("[MobX] " + (f.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + e.name_);
  }
}
function ka(e) {
  process.env.NODE_ENV !== "production" && !f.allowStateReads && f.observableRequiresReaction && console.warn("[mobx] Observable '" + e.name_ + "' being read outside a reactive context.");
}
function ci(e, t, n) {
  var r = Mn(!0);
  di(e), e.newObserving_ = new Array(
    // Reserve constant space for initial dependencies, dynamic space otherwise.
    // See https://github.com/mobxjs/mobx/pull/3833
    e.runId_ === 0 ? 100 : e.observing_.length
  ), e.unboundDepsCount_ = 0, e.runId_ = ++f.runId;
  var i = f.trackingDerivation;
  f.trackingDerivation = e, f.inBatch++;
  var o;
  if (f.disableErrorBoundaries === !0)
    o = t.call(n);
  else
    try {
      o = t.call(n);
    } catch (a) {
      o = new Lt(a);
    }
  return f.inBatch--, f.trackingDerivation = i, Ia(e), Va(e), st(r), o;
}
function Va(e) {
  process.env.NODE_ENV !== "production" && e.observing_.length === 0 && (typeof e.requiresObservable_ == "boolean" ? e.requiresObservable_ : f.reactionRequiresObservable) && console.warn("[mobx] Derivation '" + e.name_ + "' is created/updated without reading any observable value.");
}
function Ia(e) {
  for (var t = e.observing_, n = e.observing_ = e.newObserving_, r = _.UP_TO_DATE_, i = 0, o = e.unboundDepsCount_, a = 0; a < o; a++) {
    var s = n[a];
    s.diffValue === 0 && (s.diffValue = 1, i !== a && (n[i] = s), i++), s.dependenciesState_ > r && (r = s.dependenciesState_);
  }
  for (n.length = i, e.newObserving_ = null, o = t.length; o--; ) {
    var l = t[o];
    l.diffValue === 0 && fi(l, e), l.diffValue = 0;
  }
  for (; i--; ) {
    var c = n[i];
    c.diffValue === 1 && (c.diffValue = 0, Ra(c, e));
  }
  r !== _.UP_TO_DATE_ && (e.dependenciesState_ = r, e.onBecomeStale_());
}
function Nn(e) {
  var t = e.observing_;
  e.observing_ = [];
  for (var n = t.length; n--; )
    fi(t[n], e);
  e.dependenciesState_ = _.NOT_TRACKING_;
}
function ui(e) {
  var t = Ve();
  try {
    return e();
  } finally {
    oe(t);
  }
}
function Ve() {
  var e = f.trackingDerivation;
  return f.trackingDerivation = null, e;
}
function oe(e) {
  f.trackingDerivation = e;
}
function Mn(e) {
  var t = f.allowStateReads;
  return f.allowStateReads = e, t;
}
function st(e) {
  f.allowStateReads = e;
}
function di(e) {
  if (e.dependenciesState_ !== _.UP_TO_DATE_) {
    e.dependenciesState_ = _.UP_TO_DATE_;
    for (var t = e.observing_, n = t.length; n--; )
      t[n].lowestObserverState_ = _.UP_TO_DATE_;
  }
}
var fn = function() {
  this.version = 6, this.UNCHANGED = {}, this.trackingDerivation = null, this.trackingContext = null, this.runId = 0, this.mobxGuid = 0, this.inBatch = 0, this.pendingUnobservations = [], this.pendingReactions = [], this.isRunningReactions = !1, this.allowStateChanges = !1, this.allowStateReads = !0, this.enforceActions = !0, this.spyListeners = [], this.globalReactionErrorHandlers = [], this.computedRequiresReaction = !1, this.reactionRequiresObservable = !1, this.observableRequiresReaction = !1, this.disableErrorBoundaries = !1, this.suppressReactionErrors = !1, this.useProxies = !0, this.verifyProxies = !1, this.safeDescriptors = !0;
}, hn = !0, f = /* @__PURE__ */ function() {
  var e = /* @__PURE__ */ kn();
  return e.__mobxInstanceCount > 0 && !e.__mobxGlobals && (hn = !1), e.__mobxGlobals && e.__mobxGlobals.version !== new fn().version && (hn = !1), hn ? e.__mobxGlobals ? (e.__mobxInstanceCount += 1, e.__mobxGlobals.UNCHANGED || (e.__mobxGlobals.UNCHANGED = {}), e.__mobxGlobals) : (e.__mobxInstanceCount = 1, e.__mobxGlobals = /* @__PURE__ */ new fn()) : (setTimeout(function() {
    h(35);
  }, 1), new fn());
}();
function Ra(e, t) {
  e.observers_.add(t), e.lowestObserverState_ > t.dependenciesState_ && (e.lowestObserverState_ = t.dependenciesState_);
}
function fi(e, t) {
  e.observers_.delete(t), e.observers_.size === 0 && hi(e);
}
function hi(e) {
  e.isPendingUnobservation === !1 && (e.isPendingUnobservation = !0, f.pendingUnobservations.push(e));
}
function M() {
  f.inBatch++;
}
function L() {
  if (--f.inBatch === 0) {
    mi();
    for (var e = f.pendingUnobservations, t = 0; t < e.length; t++) {
      var n = e[t];
      n.isPendingUnobservation = !1, n.observers_.size === 0 && (n.isBeingObserved && (n.isBeingObserved = !1, n.onBUO()), n instanceof z && n.suspend_());
    }
    f.pendingUnobservations = [];
  }
}
function vi(e) {
  ka(e);
  var t = f.trackingDerivation;
  return t !== null ? (t.runId_ !== e.lastAccessedBy_ && (e.lastAccessedBy_ = t.runId_, t.newObserving_[t.unboundDepsCount_++] = e, !e.isBeingObserved && f.trackingContext && (e.isBeingObserved = !0, e.onBO())), e.isBeingObserved) : (e.observers_.size === 0 && f.inBatch > 0 && hi(e), !1);
}
function pi(e) {
  e.lowestObserverState_ !== _.STALE_ && (e.lowestObserverState_ = _.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === _.UP_TO_DATE_ && (process.env.NODE_ENV !== "production" && t.isTracing_ !== U.NONE && gi(t, e), t.onBecomeStale_()), t.dependenciesState_ = _.STALE_;
  }));
}
function ja(e) {
  e.lowestObserverState_ !== _.STALE_ && (e.lowestObserverState_ = _.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === _.POSSIBLY_STALE_ ? (t.dependenciesState_ = _.STALE_, process.env.NODE_ENV !== "production" && t.isTracing_ !== U.NONE && gi(t, e)) : t.dependenciesState_ === _.UP_TO_DATE_ && (e.lowestObserverState_ = _.UP_TO_DATE_);
  }));
}
function Ma(e) {
  e.lowestObserverState_ === _.UP_TO_DATE_ && (e.lowestObserverState_ = _.POSSIBLY_STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === _.UP_TO_DATE_ && (t.dependenciesState_ = _.POSSIBLY_STALE_, t.onBecomeStale_());
  }));
}
function gi(e, t) {
  if (console.log("[mobx.trace] '" + e.name_ + "' is invalidated due to a change in: '" + t.name_ + "'"), e.isTracing_ === U.BREAK) {
    var n = [];
    bi(es(e), n, 1), new Function(`debugger;
/*
Tracing '` + e.name_ + `'

You are entering this break point because derivation '` + e.name_ + "' is being traced and '" + t.name_ + `' is now forcing it to update.
Just follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update
The stackframe you are looking for is at least ~6-8 stack-frames up.

` + (e instanceof z ? e.derivation.toString().replace(/[*]\//g, "/") : "") + `

The dependencies for this derivation are:

` + n.join(`
`) + `
*/
    `)();
  }
}
function bi(e, t, n) {
  if (t.length >= 1e3) {
    t.push("(and many more)");
    return;
  }
  t.push("" + "	".repeat(n - 1) + e.name), e.dependencies && e.dependencies.forEach(function(r) {
    return bi(r, t, n + 1);
  });
}
var ee = /* @__PURE__ */ function() {
  function e(n, r, i, o) {
    n === void 0 && (n = process.env.NODE_ENV !== "production" ? "Reaction@" + B() : "Reaction"), this.name_ = void 0, this.onInvalidate_ = void 0, this.errorHandler_ = void 0, this.requiresObservable_ = void 0, this.observing_ = [], this.newObserving_ = [], this.dependenciesState_ = _.NOT_TRACKING_, this.runId_ = 0, this.unboundDepsCount_ = 0, this.flags_ = 0, this.isTracing_ = U.NONE, this.name_ = n, this.onInvalidate_ = r, this.errorHandler_ = i, this.requiresObservable_ = o;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    this.schedule_();
  }, t.schedule_ = function() {
    this.isScheduled || (this.isScheduled = !0, f.pendingReactions.push(this), mi());
  }, t.runReaction_ = function() {
    if (!this.isDisposed) {
      M(), this.isScheduled = !1;
      var r = f.trackingContext;
      if (f.trackingContext = this, Sn(this)) {
        this.isTrackPending = !0;
        try {
          this.onInvalidate_(), process.env.NODE_ENV !== "production" && this.isTrackPending && P() && xe({
            name: this.name_,
            type: "scheduled-reaction"
          });
        } catch (i) {
          this.reportExceptionInDerivation_(i);
        }
      }
      f.trackingContext = r, L();
    }
  }, t.track = function(r) {
    if (!this.isDisposed) {
      M();
      var i = P(), o;
      process.env.NODE_ENV !== "production" && i && (o = Date.now(), k({
        name: this.name_,
        type: "reaction"
      })), this.isRunning = !0;
      var a = f.trackingContext;
      f.trackingContext = this;
      var s = ci(this, r, void 0);
      f.trackingContext = a, this.isRunning = !1, this.isTrackPending = !1, this.isDisposed && Nn(this), Dt(s) && this.reportExceptionInDerivation_(s.cause), process.env.NODE_ENV !== "production" && i && V({
        time: Date.now() - o
      }), L();
    }
  }, t.reportExceptionInDerivation_ = function(r) {
    var i = this;
    if (this.errorHandler_) {
      this.errorHandler_(r, this);
      return;
    }
    if (f.disableErrorBoundaries)
      throw r;
    var o = process.env.NODE_ENV !== "production" ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
    f.suppressReactionErrors ? process.env.NODE_ENV !== "production" && console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)") : console.error(o, r), process.env.NODE_ENV !== "production" && P() && xe({
      type: "error",
      name: this.name_,
      message: o,
      error: "" + r
    }), f.globalReactionErrorHandlers.forEach(function(a) {
      return a(r, i);
    });
  }, t.dispose = function() {
    this.isDisposed || (this.isDisposed = !0, this.isRunning || (M(), Nn(this), L()));
  }, t.getDisposer_ = function(r) {
    var i = this, o = function a() {
      i.dispose(), r == null || r.removeEventListener == null || r.removeEventListener("abort", a);
    };
    return r == null || r.addEventListener == null || r.addEventListener("abort", o), o[b] = this, o;
  }, t.toString = function() {
    return "Reaction[" + this.name_ + "]";
  }, t.trace = function(r) {
    r === void 0 && (r = !1), os(this, r);
  }, We(e, [{
    key: "isDisposed",
    get: function() {
      return D(this.flags_, e.isDisposedMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isDisposedMask_, r);
    }
  }, {
    key: "isScheduled",
    get: function() {
      return D(this.flags_, e.isScheduledMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isScheduledMask_, r);
    }
  }, {
    key: "isTrackPending",
    get: function() {
      return D(this.flags_, e.isTrackPendingMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isTrackPendingMask_, r);
    }
  }, {
    key: "isRunning",
    get: function() {
      return D(this.flags_, e.isRunningMask_);
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.isRunningMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return D(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = T(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
ee.isDisposedMask_ = 1;
ee.isScheduledMask_ = 2;
ee.isTrackPendingMask_ = 4;
ee.isRunningMask_ = 8;
ee.diffValueMask_ = 16;
function La(e) {
  return f.globalReactionErrorHandlers.push(e), function() {
    var t = f.globalReactionErrorHandlers.indexOf(e);
    t >= 0 && f.globalReactionErrorHandlers.splice(t, 1);
  };
}
var nr = 100, Ua = function(t) {
  return t();
};
function mi() {
  f.inBatch > 0 || f.isRunningReactions || Ua(za);
}
function za() {
  f.isRunningReactions = !0;
  for (var e = f.pendingReactions, t = 0; e.length > 0; ) {
    ++t === nr && (console.error(process.env.NODE_ENV !== "production" ? "Reaction doesn't converge to a stable state after " + nr + " iterations." + (" Probably there is a cycle in the reactive function: " + e[0]) : "[mobx] cycle in reaction: " + e[0]), e.splice(0));
    for (var n = e.splice(0), r = 0, i = n.length; r < i; r++)
      n[r].runReaction_();
  }
  f.isRunningReactions = !1;
}
var Ut = /* @__PURE__ */ ke("Reaction", ee);
function P() {
  return process.env.NODE_ENV !== "production" && !!f.spyListeners.length;
}
function xe(e) {
  if (process.env.NODE_ENV !== "production" && f.spyListeners.length)
    for (var t = f.spyListeners, n = 0, r = t.length; n < r; n++)
      t[n](e);
}
function k(e) {
  if (process.env.NODE_ENV !== "production") {
    var t = de({}, e, {
      spyReportStart: !0
    });
    xe(t);
  }
}
var Ba = {
  type: "report-end",
  spyReportEnd: !0
};
function V(e) {
  process.env.NODE_ENV !== "production" && xe(e ? de({}, e, {
    type: "report-end",
    spyReportEnd: !0
  }) : Ba);
}
function Fa(e) {
  return process.env.NODE_ENV === "production" ? (console.warn("[mobx.spy] Is a no-op in production builds"), function() {
  }) : (f.spyListeners.push(e), In(function() {
    f.spyListeners = f.spyListeners.filter(function(t) {
      return t !== e;
    });
  }));
}
var Ln = "action", Ha = "action.bound", _i = "autoAction", Ka = "autoAction.bound", yi = "<unnamed action>", xn = /* @__PURE__ */ yt(Ln), qa = /* @__PURE__ */ yt(Ha, {
  bound: !0
}), Pn = /* @__PURE__ */ yt(_i, {
  autoAction: !0
}), Wa = /* @__PURE__ */ yt(Ka, {
  autoAction: !0,
  bound: !0
});
function wi(e) {
  var t = function(r, i) {
    if (A(r))
      return Ne(r.name || yi, r, e);
    if (A(i))
      return Ne(r, i, e);
    if (_t(i))
      return (e ? Pn : xn).decorate_20223_(r, i);
    if (Ae(i))
      return mt(r, i, e ? Pn : xn);
    if (Ae(r))
      return Z(yt(e ? _i : Ln, {
        name: r,
        autoAction: e
      }));
    process.env.NODE_ENV !== "production" && h("Invalid arguments for `action`");
  };
  return t;
}
var we = /* @__PURE__ */ wi(!1);
Object.assign(we, xn);
var ft = /* @__PURE__ */ wi(!0);
Object.assign(ft, Pn);
we.bound = /* @__PURE__ */ Z(qa);
ft.bound = /* @__PURE__ */ Z(Wa);
function Ga(e) {
  return li(e.name || yi, !1, e, this, void 0);
}
function Be(e) {
  return A(e) && e.isMobxAction === !0;
}
function Ei(e, t) {
  var n, r, i, o;
  t === void 0 && (t = Vn), process.env.NODE_ENV !== "production" && (A(e) || h("Autorun expects a function as first argument"), Be(e) && h("Autorun does not accept actions since actions are untrackable"));
  var a = (n = (r = t) == null ? void 0 : r.name) != null ? n : process.env.NODE_ENV !== "production" ? e.name || "Autorun@" + B() : "Autorun", s = !t.scheduler && !t.delay, l;
  if (s)
    l = new ee(a, function() {
      this.track(d);
    }, t.onError, t.requiresObservable);
  else {
    var c = Oi(t), u = !1;
    l = new ee(a, function() {
      u || (u = !0, c(function() {
        u = !1, l.isDisposed || l.track(d);
      }));
    }, t.onError, t.requiresObservable);
  }
  function d() {
    e(l);
  }
  return (i = t) != null && (i = i.signal) != null && i.aborted || l.schedule_(), l.getDisposer_((o = t) == null ? void 0 : o.signal);
}
var Ya = function(t) {
  return t();
};
function Oi(e) {
  return e.scheduler ? e.scheduler : e.delay ? function(t) {
    return setTimeout(t, e.delay);
  } : Ya;
}
function Ai(e, t, n) {
  var r, i, o;
  n === void 0 && (n = Vn), process.env.NODE_ENV !== "production" && ((!A(e) || !A(t)) && h("First and second argument to reaction should be functions"), C(n) || h("Third argument of reactions should be an object"));
  var a = (r = n.name) != null ? r : process.env.NODE_ENV !== "production" ? "Reaction@" + B() : "Reaction", s = we(a, n.onError ? Ja(n.onError, t) : t), l = !n.scheduler && !n.delay, c = Oi(n), u = !0, d = !1, v, p = n.compareStructural ? ze.structural : n.equals || ze.default, m = new ee(a, function() {
    u || l ? w() : d || (d = !0, c(w));
  }, n.onError, n.requiresObservable);
  function w() {
    if (d = !1, !m.isDisposed) {
      var N = !1, G = v;
      m.track(function() {
        var Re = Da(!1, function() {
          return e(m);
        });
        N = u || !p(v, Re), v = Re;
      }), (u && n.fireImmediately || !u && N) && s(v, G, m), u = !1;
    }
  }
  return (i = n) != null && (i = i.signal) != null && i.aborted || m.schedule_(), m.getDisposer_((o = n) == null ? void 0 : o.signal);
}
function Ja(e, t) {
  return function() {
    try {
      return t.apply(this, arguments);
    } catch (n) {
      e.call(this, n);
    }
  };
}
var Xa = "onBO", Za = "onBUO";
function Qa(e, t, n) {
  return Ni(Xa, e, t, n);
}
function Si(e, t, n) {
  return Ni(Za, e, t, n);
}
function Ni(e, t, n, r) {
  var i = He(t), o = A(r) ? r : n, a = e + "L";
  return i[a] ? i[a].add(o) : i[a] = /* @__PURE__ */ new Set([o]), function() {
    var s = i[a];
    s && (s.delete(o), s.size === 0 && delete i[a]);
  };
}
function xi(e, t, n, r) {
  process.env.NODE_ENV !== "production" && (arguments.length > 4 && h("'extendObservable' expected 2-4 arguments"), typeof e != "object" && h("'extendObservable' expects an object as first argument"), pe(e) && h("'extendObservable' should not be used on maps, use map.merge instead"), C(t) || h("'extendObservable' only accepts plain objects as second argument"), (vt(t) || vt(n)) && h("Extending an object with another observable (object) is not supported"));
  var i = Io(t);
  return Ie(function() {
    var o = Ge(e, r)[b];
    dt(i).forEach(function(a) {
      o.extend_(
        a,
        i[a],
        // must pass "undefined" for { key: undefined }
        n && a in n ? n[a] : !0
      );
    });
  }), e;
}
function es(e, t) {
  return Pi(He(e, t));
}
function Pi(e) {
  var t = {
    name: e.name_
  };
  return e.observing_ && e.observing_.length > 0 && (t.dependencies = ts(e.observing_).map(Pi)), t;
}
function ts(e) {
  return Array.from(new Set(e));
}
var ns = 0;
function Ci() {
  this.message = "FLOW_CANCELLED";
}
Ci.prototype = /* @__PURE__ */ Object.create(Error.prototype);
var vn = /* @__PURE__ */ ti("flow"), rs = /* @__PURE__ */ ti("flow.bound", {
  bound: !0
}), Fe = /* @__PURE__ */ Object.assign(function(t, n) {
  if (_t(n))
    return vn.decorate_20223_(t, n);
  if (Ae(n))
    return mt(t, n, vn);
  process.env.NODE_ENV !== "production" && arguments.length !== 1 && h("Flow expects single argument with generator function");
  var r = t, i = r.name || "<unnamed flow>", o = function() {
    var s = this, l = arguments, c = ++ns, u = we(i + " - runid: " + c + " - init", r).apply(s, l), d, v = void 0, p = new Promise(function(m, w) {
      var N = 0;
      d = w;
      function G($) {
        v = void 0;
        var ae;
        try {
          ae = we(i + " - runid: " + c + " - yield " + N++, u.next).call(u, $);
        } catch (ge) {
          return w(ge);
        }
        Ze(ae);
      }
      function Re($) {
        v = void 0;
        var ae;
        try {
          ae = we(i + " - runid: " + c + " - yield " + N++, u.throw).call(u, $);
        } catch (ge) {
          return w(ge);
        }
        Ze(ae);
      }
      function Ze($) {
        if (A($?.then)) {
          $.then(Ze, w);
          return;
        }
        return $.done ? m($.value) : (v = Promise.resolve($.value), v.then(G, Re));
      }
      G(void 0);
    });
    return p.cancel = we(i + " - runid: " + c + " - cancel", function() {
      try {
        v && rr(v);
        var m = u.return(void 0), w = Promise.resolve(m.value);
        w.then(Le, Le), rr(w), d(new Ci());
      } catch (N) {
        d(N);
      }
    }), p;
  };
  return o.isMobXFlow = !0, o;
}, vn);
Fe.bound = /* @__PURE__ */ Z(rs);
function rr(e) {
  A(e.cancel) && e.cancel();
}
function ht(e) {
  return e?.isMobXFlow === !0;
}
function is(e, t) {
  return e ? Ye(e) || !!e[b] || Rn(e) || Ut(e) || an(e) : !1;
}
function vt(e) {
  return process.env.NODE_ENV !== "production" && arguments.length !== 1 && h("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property"), is(e);
}
function os() {
  if (process.env.NODE_ENV !== "production") {
    for (var e = !1, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    typeof n[n.length - 1] == "boolean" && (e = n.pop());
    var i = as(n);
    if (!i)
      return h("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    i.isTracing_ === U.NONE && console.log("[mobx.trace] '" + i.name_ + "' tracing enabled"), i.isTracing_ = e ? U.BREAK : U.LOG;
  }
}
function as(e) {
  switch (e.length) {
    case 0:
      return f.trackingDerivation;
    case 1:
      return He(e[0]);
    case 2:
      return He(e[0], e[1]);
  }
}
function re(e, t) {
  t === void 0 && (t = void 0), M();
  try {
    return e.apply(t);
  } finally {
    L();
  }
}
function be(e) {
  return e[b];
}
var ss = {
  has: function(t, n) {
    return process.env.NODE_ENV !== "production" && f.trackingDerivation && Qe("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead."), be(t).has_(n);
  },
  get: function(t, n) {
    return be(t).get_(n);
  },
  set: function(t, n, r) {
    var i;
    return Ae(n) ? (process.env.NODE_ENV !== "production" && !be(t).values_.has(n) && Qe("add a new observable property through direct assignment. Use 'set' from 'mobx' instead."), (i = be(t).set_(n, r, !0)) != null ? i : !0) : !1;
  },
  deleteProperty: function(t, n) {
    var r;
    return process.env.NODE_ENV !== "production" && Qe("delete properties from an observable object. Use 'remove' from 'mobx' instead."), Ae(n) ? (r = be(t).delete_(n, !0)) != null ? r : !0 : !1;
  },
  defineProperty: function(t, n, r) {
    var i;
    return process.env.NODE_ENV !== "production" && Qe("define property on an observable object. Use 'defineProperty' from 'mobx' instead."), (i = be(t).defineProperty_(n, r)) != null ? i : !0;
  },
  ownKeys: function(t) {
    return process.env.NODE_ENV !== "production" && f.trackingDerivation && Qe("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead."), be(t).ownKeys_();
  },
  preventExtensions: function(t) {
    h(13);
  }
};
function ls(e, t) {
  var n, r;
  return Wr(), e = Ge(e, t), (r = (n = e[b]).proxy_) != null ? r : n.proxy_ = new Proxy(e, ss);
}
function R(e) {
  return e.interceptors_ !== void 0 && e.interceptors_.length > 0;
}
function wt(e, t) {
  var n = e.interceptors_ || (e.interceptors_ = []);
  return n.push(t), In(function() {
    var r = n.indexOf(t);
    r !== -1 && n.splice(r, 1);
  });
}
function j(e, t) {
  var n = Ve();
  try {
    for (var r = [].concat(e.interceptors_ || []), i = 0, o = r.length; i < o && (t = r[i](t), t && !t.type && h(14), !!t); i++)
      ;
    return t;
  } finally {
    oe(n);
  }
}
function K(e) {
  return e.changeListeners_ !== void 0 && e.changeListeners_.length > 0;
}
function Et(e, t) {
  var n = e.changeListeners_ || (e.changeListeners_ = []);
  return n.push(t), In(function() {
    var r = n.indexOf(t);
    r !== -1 && n.splice(r, 1);
  });
}
function q(e, t) {
  var n = Ve(), r = e.changeListeners_;
  if (r) {
    r = r.slice();
    for (var i = 0, o = r.length; i < o; i++)
      r[i](t);
    oe(n);
  }
}
var pn = /* @__PURE__ */ Symbol("mobx-keys");
function sn(e, t, n) {
  return process.env.NODE_ENV !== "production" && (!C(e) && !C(Object.getPrototypeOf(e)) && h("'makeAutoObservable' can only be used for classes that don't have a superclass"), Ye(e) && h("makeAutoObservable can only be used on objects not already made observable")), C(e) ? xi(e, e, t, n) : (Ie(function() {
    var r = Ge(e, n)[b];
    if (!e[pn]) {
      var i = Object.getPrototypeOf(e), o = new Set([].concat(dt(e), dt(i)));
      o.delete("constructor"), o.delete(b), Zt(i, pn, o);
    }
    e[pn].forEach(function(a) {
      return r.make_(
        a,
        // must pass "undefined" for { key: undefined }
        t && a in t ? t[a] : !0
      );
    });
  }), e);
}
var ir = "splice", F = "update", cs = 1e4, us = {
  get: function(t, n) {
    var r = t[b];
    return n === b ? r : n === "length" ? r.getArrayLength_() : typeof n == "string" && !isNaN(n) ? r.get_(parseInt(n)) : H(zt, n) ? zt[n] : t[n];
  },
  set: function(t, n, r) {
    var i = t[b];
    return n === "length" && i.setArrayLength_(r), typeof n == "symbol" || isNaN(n) ? t[n] = r : i.set_(parseInt(n), r), !0;
  },
  preventExtensions: function() {
    h(15);
  }
}, Un = /* @__PURE__ */ function() {
  function e(n, r, i, o) {
    n === void 0 && (n = process.env.NODE_ENV !== "production" ? "ObservableArray@" + B() : "ObservableArray"), this.owned_ = void 0, this.legacyMode_ = void 0, this.atom_ = void 0, this.values_ = [], this.interceptors_ = void 0, this.changeListeners_ = void 0, this.enhancer_ = void 0, this.dehancer = void 0, this.proxy_ = void 0, this.lastKnownLength_ = 0, this.owned_ = i, this.legacyMode_ = o, this.atom_ = new ve(n), this.enhancer_ = function(a, s) {
      return r(a, s, process.env.NODE_ENV !== "production" ? n + "[..]" : "ObservableArray[..]");
    };
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, t.dehanceValues_ = function(r) {
    return this.dehancer !== void 0 && r.length > 0 ? r.map(this.dehancer) : r;
  }, t.intercept_ = function(r) {
    return wt(this, r);
  }, t.observe_ = function(r, i) {
    return i === void 0 && (i = !1), i && r({
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: "splice",
      index: 0,
      added: this.values_.slice(),
      addedCount: this.values_.length,
      removed: [],
      removedCount: 0
    }), Et(this, r);
  }, t.getArrayLength_ = function() {
    return this.atom_.reportObserved(), this.values_.length;
  }, t.setArrayLength_ = function(r) {
    (typeof r != "number" || isNaN(r) || r < 0) && h("Out of range: " + r);
    var i = this.values_.length;
    if (r !== i)
      if (r > i) {
        for (var o = new Array(r - i), a = 0; a < r - i; a++)
          o[a] = void 0;
        this.spliceWithArray_(i, 0, o);
      } else
        this.spliceWithArray_(r, i - r);
  }, t.updateArrayLength_ = function(r, i) {
    r !== this.lastKnownLength_ && h(16), this.lastKnownLength_ += i, this.legacyMode_ && i > 0 && Ii(r + i + 1);
  }, t.spliceWithArray_ = function(r, i, o) {
    var a = this;
    J(this.atom_);
    var s = this.values_.length;
    if (r === void 0 ? r = 0 : r > s ? r = s : r < 0 && (r = Math.max(0, s + r)), arguments.length === 1 ? i = s - r : i == null ? i = 0 : i = Math.max(0, Math.min(i, s - r)), o === void 0 && (o = Rt), R(this)) {
      var l = j(this, {
        object: this.proxy_,
        type: ir,
        index: r,
        removedCount: i,
        added: o
      });
      if (!l)
        return Rt;
      i = l.removedCount, o = l.added;
    }
    if (o = o.length === 0 ? o : o.map(function(d) {
      return a.enhancer_(d, void 0);
    }), this.legacyMode_ || process.env.NODE_ENV !== "production") {
      var c = o.length - i;
      this.updateArrayLength_(s, c);
    }
    var u = this.spliceItemsIntoValues_(r, i, o);
    return (i !== 0 || o.length !== 0) && this.notifyArraySplice_(r, o, u), this.dehanceValues_(u);
  }, t.spliceItemsIntoValues_ = function(r, i, o) {
    if (o.length < cs) {
      var a;
      return (a = this.values_).splice.apply(a, [r, i].concat(o));
    } else {
      var s = this.values_.slice(r, r + i), l = this.values_.slice(r + i);
      this.values_.length += o.length - i;
      for (var c = 0; c < o.length; c++)
        this.values_[r + c] = o[c];
      for (var u = 0; u < l.length; u++)
        this.values_[r + o.length + u] = l[u];
      return s;
    }
  }, t.notifyArrayChildUpdate_ = function(r, i, o) {
    var a = !this.owned_ && P(), s = K(this), l = s || a ? {
      observableKind: "array",
      object: this.proxy_,
      type: F,
      debugObjectName: this.atom_.name_,
      index: r,
      newValue: i,
      oldValue: o
    } : null;
    process.env.NODE_ENV !== "production" && a && k(l), this.atom_.reportChanged(), s && q(this, l), process.env.NODE_ENV !== "production" && a && V();
  }, t.notifyArraySplice_ = function(r, i, o) {
    var a = !this.owned_ && P(), s = K(this), l = s || a ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: ir,
      index: r,
      removed: o,
      added: i,
      removedCount: o.length,
      addedCount: i.length
    } : null;
    process.env.NODE_ENV !== "production" && a && k(l), this.atom_.reportChanged(), s && q(this, l), process.env.NODE_ENV !== "production" && a && V();
  }, t.get_ = function(r) {
    if (this.legacyMode_ && r >= this.values_.length) {
      console.warn(process.env.NODE_ENV !== "production" ? "[mobx.array] Attempt to read an array index (" + r + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + r);
      return;
    }
    return this.atom_.reportObserved(), this.dehanceValue_(this.values_[r]);
  }, t.set_ = function(r, i) {
    var o = this.values_;
    if (this.legacyMode_ && r > o.length && h(17, r, o.length), r < o.length) {
      J(this.atom_);
      var a = o[r];
      if (R(this)) {
        var s = j(this, {
          type: F,
          object: this.proxy_,
          // since "this" is the real array we need to pass its proxy
          index: r,
          newValue: i
        });
        if (!s)
          return;
        i = s.newValue;
      }
      i = this.enhancer_(i, a);
      var l = i !== a;
      l && (o[r] = i, this.notifyArrayChildUpdate_(r, i, a));
    } else {
      for (var c = new Array(r + 1 - o.length), u = 0; u < c.length - 1; u++)
        c[u] = void 0;
      c[c.length - 1] = i, this.spliceWithArray_(o.length, 0, c);
    }
  }, e;
}();
function ds(e, t, n, r) {
  return n === void 0 && (n = process.env.NODE_ENV !== "production" ? "ObservableArray@" + B() : "ObservableArray"), r === void 0 && (r = !1), Wr(), Ie(function() {
    var i = new Un(n, t, r, !1);
    Yr(i.values_, b, i);
    var o = new Proxy(i.values_, us);
    return i.proxy_ = o, e && e.length && i.spliceWithArray_(0, 0, e), o;
  });
}
var zt = {
  clear: function() {
    return this.splice(0);
  },
  replace: function(t) {
    var n = this[b];
    return n.spliceWithArray_(0, n.values_.length, t);
  },
  // Used by JSON.stringify
  toJSON: function() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function(t, n) {
    for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++)
      i[o - 2] = arguments[o];
    var a = this[b];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return a.spliceWithArray_(t);
      case 2:
        return a.spliceWithArray_(t, n);
    }
    return a.spliceWithArray_(t, n, i);
  },
  spliceWithArray: function(t, n, r) {
    return this[b].spliceWithArray_(t, n, r);
  },
  push: function() {
    for (var t = this[b], n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    return t.spliceWithArray_(t.values_.length, 0, r), t.values_.length;
  },
  pop: function() {
    return this.splice(Math.max(this[b].values_.length - 1, 0), 1)[0];
  },
  shift: function() {
    return this.splice(0, 1)[0];
  },
  unshift: function() {
    for (var t = this[b], n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    return t.spliceWithArray_(0, 0, r), t.values_.length;
  },
  reverse: function() {
    return f.trackingDerivation && h(37, "reverse"), this.replace(this.slice().reverse()), this;
  },
  sort: function() {
    f.trackingDerivation && h(37, "sort");
    var t = this.slice();
    return t.sort.apply(t, arguments), this.replace(t), this;
  },
  remove: function(t) {
    var n = this[b], r = n.dehanceValues_(n.values_).indexOf(t);
    return r > -1 ? (this.splice(r, 1), !0) : !1;
  }
};
y("at", I);
y("concat", I);
y("flat", I);
y("includes", I);
y("indexOf", I);
y("join", I);
y("lastIndexOf", I);
y("slice", I);
y("toString", I);
y("toLocaleString", I);
y("toSorted", I);
y("toSpliced", I);
y("with", I);
y("every", W);
y("filter", W);
y("find", W);
y("findIndex", W);
y("findLast", W);
y("findLastIndex", W);
y("flatMap", W);
y("forEach", W);
y("map", W);
y("some", W);
y("toReversed", W);
y("reduce", $i);
y("reduceRight", $i);
function y(e, t) {
  typeof Array.prototype[e] == "function" && (zt[e] = t(e));
}
function I(e) {
  return function() {
    var t = this[b];
    t.atom_.reportObserved();
    var n = t.dehanceValues_(t.values_);
    return n[e].apply(n, arguments);
  };
}
function W(e) {
  return function(t, n) {
    var r = this, i = this[b];
    i.atom_.reportObserved();
    var o = i.dehanceValues_(i.values_);
    return o[e](function(a, s) {
      return t.call(n, a, s, r);
    });
  };
}
function $i(e) {
  return function() {
    var t = this, n = this[b];
    n.atom_.reportObserved();
    var r = n.dehanceValues_(n.values_), i = arguments[0];
    return arguments[0] = function(o, a, s) {
      return i(o, a, s, t);
    }, r[e].apply(r, arguments);
  };
}
var fs = /* @__PURE__ */ ke("ObservableArrayAdministration", Un);
function ln(e) {
  return Xt(e) && fs(e[b]);
}
var hs = {}, ce = "add", Bt = "delete", Di = /* @__PURE__ */ function() {
  function e(n, r, i) {
    var o = this;
    r === void 0 && (r = Se), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableMap@" + B() : "ObservableMap"), this.enhancer_ = void 0, this.name_ = void 0, this[b] = hs, this.data_ = void 0, this.hasMap_ = void 0, this.keysAtom_ = void 0, this.interceptors_ = void 0, this.changeListeners_ = void 0, this.dehancer = void 0, this.enhancer_ = r, this.name_ = i, A(Map) || h(18), Ie(function() {
      o.keysAtom_ = Qr(process.env.NODE_ENV !== "production" ? o.name_ + ".keys()" : "ObservableMap.keys()"), o.data_ = /* @__PURE__ */ new Map(), o.hasMap_ = /* @__PURE__ */ new Map(), n && o.merge(n);
    });
  }
  var t = e.prototype;
  return t.has_ = function(r) {
    return this.data_.has(r);
  }, t.has = function(r) {
    var i = this;
    if (!f.trackingDerivation)
      return this.has_(r);
    var o = this.hasMap_.get(r);
    if (!o) {
      var a = o = new Oe(this.has_(r), en, process.env.NODE_ENV !== "production" ? this.name_ + "." + wn(r) + "?" : "ObservableMap.key?", !1);
      this.hasMap_.set(r, a), Si(a, function() {
        return i.hasMap_.delete(r);
      });
    }
    return o.get();
  }, t.set = function(r, i) {
    var o = this.has_(r);
    if (R(this)) {
      var a = j(this, {
        type: o ? F : ce,
        object: this,
        newValue: i,
        name: r
      });
      if (!a)
        return this;
      i = a.newValue;
    }
    return o ? this.updateValue_(r, i) : this.addValue_(r, i), this;
  }, t.delete = function(r) {
    var i = this;
    if (J(this.keysAtom_), R(this)) {
      var o = j(this, {
        type: Bt,
        object: this,
        name: r
      });
      if (!o)
        return !1;
    }
    if (this.has_(r)) {
      var a = P(), s = K(this), l = s || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: Bt,
        object: this,
        oldValue: this.data_.get(r).value_,
        name: r
      } : null;
      return process.env.NODE_ENV !== "production" && a && k(l), re(function() {
        var c;
        i.keysAtom_.reportChanged(), (c = i.hasMap_.get(r)) == null || c.setNewValue_(!1);
        var u = i.data_.get(r);
        u.setNewValue_(void 0), i.data_.delete(r);
      }), s && q(this, l), process.env.NODE_ENV !== "production" && a && V(), !0;
    }
    return !1;
  }, t.updateValue_ = function(r, i) {
    var o = this.data_.get(r);
    if (i = o.prepareNewValue_(i), i !== f.UNCHANGED) {
      var a = P(), s = K(this), l = s || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: F,
        object: this,
        oldValue: o.value_,
        name: r,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && a && k(l), o.setNewValue_(i), s && q(this, l), process.env.NODE_ENV !== "production" && a && V();
    }
  }, t.addValue_ = function(r, i) {
    var o = this;
    J(this.keysAtom_), re(function() {
      var c, u = new Oe(i, o.enhancer_, process.env.NODE_ENV !== "production" ? o.name_ + "." + wn(r) : "ObservableMap.key", !1);
      o.data_.set(r, u), i = u.value_, (c = o.hasMap_.get(r)) == null || c.setNewValue_(!0), o.keysAtom_.reportChanged();
    });
    var a = P(), s = K(this), l = s || a ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: ce,
      object: this,
      name: r,
      newValue: i
    } : null;
    process.env.NODE_ENV !== "production" && a && k(l), s && q(this, l), process.env.NODE_ENV !== "production" && a && V();
  }, t.get = function(r) {
    return this.has(r) ? this.dehanceValue_(this.data_.get(r).get()) : this.dehanceValue_(void 0);
  }, t.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, t.keys = function() {
    return this.keysAtom_.reportObserved(), this.data_.keys();
  }, t.values = function() {
    var r = this, i = this.keys();
    return or({
      next: function() {
        var a = i.next(), s = a.done, l = a.value;
        return {
          done: s,
          value: s ? void 0 : r.get(l)
        };
      }
    });
  }, t.entries = function() {
    var r = this, i = this.keys();
    return or({
      next: function() {
        var a = i.next(), s = a.done, l = a.value;
        return {
          done: s,
          value: s ? void 0 : [l, r.get(l)]
        };
      }
    });
  }, t[Symbol.iterator] = function() {
    return this.entries();
  }, t.forEach = function(r, i) {
    for (var o = Ue(this), a; !(a = o()).done; ) {
      var s = a.value, l = s[0], c = s[1];
      r.call(i, c, l, this);
    }
  }, t.merge = function(r) {
    var i = this;
    return pe(r) && (r = new Map(r)), re(function() {
      C(r) ? Vo(r).forEach(function(o) {
        return i.set(o, r[o]);
      }) : Array.isArray(r) ? r.forEach(function(o) {
        var a = o[0], s = o[1];
        return i.set(a, s);
      }) : qe(r) ? (ko(r) || h(19, r), r.forEach(function(o, a) {
        return i.set(a, o);
      })) : r != null && h(20, r);
    }), this;
  }, t.clear = function() {
    var r = this;
    re(function() {
      ui(function() {
        for (var i = Ue(r.keys()), o; !(o = i()).done; ) {
          var a = o.value;
          r.delete(a);
        }
      });
    });
  }, t.replace = function(r) {
    var i = this;
    return re(function() {
      for (var o = vs(r), a = /* @__PURE__ */ new Map(), s = !1, l = Ue(i.data_.keys()), c; !(c = l()).done; ) {
        var u = c.value;
        if (!o.has(u)) {
          var d = i.delete(u);
          if (d)
            s = !0;
          else {
            var v = i.data_.get(u);
            a.set(u, v);
          }
        }
      }
      for (var p = Ue(o.entries()), m; !(m = p()).done; ) {
        var w = m.value, N = w[0], G = w[1], Re = i.data_.has(N);
        if (i.set(N, G), i.data_.has(N)) {
          var Ze = i.data_.get(N);
          a.set(N, Ze), Re || (s = !0);
        }
      }
      if (!s)
        if (i.data_.size !== a.size)
          i.keysAtom_.reportChanged();
        else
          for (var $ = i.data_.keys(), ae = a.keys(), ge = $.next(), Xn = ae.next(); !ge.done; ) {
            if (ge.value !== Xn.value) {
              i.keysAtom_.reportChanged();
              break;
            }
            ge = $.next(), Xn = ae.next();
          }
      i.data_ = a;
    }), this;
  }, t.toString = function() {
    return "[object ObservableMap]";
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.observe_ = function(r, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && h("`observe` doesn't support fireImmediately=true in combination with maps."), Et(this, r);
  }, t.intercept_ = function(r) {
    return wt(this, r);
  }, We(e, [{
    key: "size",
    get: function() {
      return this.keysAtom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Map";
    }
  }]);
}(), pe = /* @__PURE__ */ ke("ObservableMap", Di);
function or(e) {
  return e[Symbol.toStringTag] = "MapIterator", Fn(e);
}
function vs(e) {
  if (qe(e) || pe(e))
    return e;
  if (Array.isArray(e))
    return new Map(e);
  if (C(e)) {
    var t = /* @__PURE__ */ new Map();
    for (var n in e)
      t.set(n, e[n]);
    return t;
  } else
    return h(21, e);
}
var ps = {}, Ti = /* @__PURE__ */ function() {
  function e(n, r, i) {
    var o = this;
    r === void 0 && (r = Se), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableSet@" + B() : "ObservableSet"), this.name_ = void 0, this[b] = ps, this.data_ = /* @__PURE__ */ new Set(), this.atom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.dehancer = void 0, this.enhancer_ = void 0, this.name_ = i, A(Set) || h(22), this.enhancer_ = function(a, s) {
      return r(a, s, i);
    }, Ie(function() {
      o.atom_ = Qr(o.name_), n && o.replace(n);
    });
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, t.clear = function() {
    var r = this;
    re(function() {
      ui(function() {
        for (var i = Ue(r.data_.values()), o; !(o = i()).done; ) {
          var a = o.value;
          r.delete(a);
        }
      });
    });
  }, t.forEach = function(r, i) {
    for (var o = Ue(this), a; !(a = o()).done; ) {
      var s = a.value;
      r.call(i, s, s, this);
    }
  }, t.add = function(r) {
    var i = this;
    if (J(this.atom_), R(this)) {
      var o = j(this, {
        type: ce,
        object: this,
        newValue: r
      });
      if (!o)
        return this;
    }
    if (!this.has(r)) {
      re(function() {
        i.data_.add(i.enhancer_(r, void 0)), i.atom_.reportChanged();
      });
      var a = process.env.NODE_ENV !== "production" && P(), s = K(this), l = s || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: ce,
        object: this,
        newValue: r
      } : null;
      a && process.env.NODE_ENV !== "production" && k(l), s && q(this, l), a && process.env.NODE_ENV !== "production" && V();
    }
    return this;
  }, t.delete = function(r) {
    var i = this;
    if (R(this)) {
      var o = j(this, {
        type: Bt,
        object: this,
        oldValue: r
      });
      if (!o)
        return !1;
    }
    if (this.has(r)) {
      var a = process.env.NODE_ENV !== "production" && P(), s = K(this), l = s || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: Bt,
        object: this,
        oldValue: r
      } : null;
      return a && process.env.NODE_ENV !== "production" && k(l), re(function() {
        i.atom_.reportChanged(), i.data_.delete(r);
      }), s && q(this, l), a && process.env.NODE_ENV !== "production" && V(), !0;
    }
    return !1;
  }, t.has = function(r) {
    return this.atom_.reportObserved(), this.data_.has(this.dehanceValue_(r));
  }, t.entries = function() {
    var r = 0, i = Array.from(this.keys()), o = Array.from(this.values());
    return ar({
      next: function() {
        var s = r;
        return r += 1, s < o.length ? {
          value: [i[s], o[s]],
          done: !1
        } : {
          value: void 0,
          done: !0
        };
      }
    });
  }, t.keys = function() {
    return this.values();
  }, t.values = function() {
    this.atom_.reportObserved();
    var r = this, i = 0, o = Array.from(this.data_.values());
    return ar({
      next: function() {
        return i < o.length ? {
          value: r.dehanceValue_(o[i++]),
          done: !1
        } : {
          value: void 0,
          done: !0
        };
      }
    });
  }, t.intersection = function(r) {
    if (te(r) && !Y(r))
      return r.intersection(this);
    var i = new Set(this);
    return i.intersection(r);
  }, t.union = function(r) {
    if (te(r) && !Y(r))
      return r.union(this);
    var i = new Set(this);
    return i.union(r);
  }, t.difference = function(r) {
    return new Set(this).difference(r);
  }, t.symmetricDifference = function(r) {
    if (te(r) && !Y(r))
      return r.symmetricDifference(this);
    var i = new Set(this);
    return i.symmetricDifference(r);
  }, t.isSubsetOf = function(r) {
    return new Set(this).isSubsetOf(r);
  }, t.isSupersetOf = function(r) {
    return new Set(this).isSupersetOf(r);
  }, t.isDisjointFrom = function(r) {
    if (te(r) && !Y(r))
      return r.isDisjointFrom(this);
    var i = new Set(this);
    return i.isDisjointFrom(r);
  }, t.replace = function(r) {
    var i = this;
    return Y(r) && (r = new Set(r)), re(function() {
      Array.isArray(r) ? (i.clear(), r.forEach(function(o) {
        return i.add(o);
      })) : te(r) ? (i.clear(), r.forEach(function(o) {
        return i.add(o);
      })) : r != null && h("Cannot initialize set from " + r);
    }), this;
  }, t.observe_ = function(r, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && h("`observe` doesn't support fireImmediately=true in combination with sets."), Et(this, r);
  }, t.intercept_ = function(r) {
    return wt(this, r);
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.toString = function() {
    return "[object ObservableSet]";
  }, t[Symbol.iterator] = function() {
    return this.values();
  }, We(e, [{
    key: "size",
    get: function() {
      return this.atom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Set";
    }
  }]);
}(), Y = /* @__PURE__ */ ke("ObservableSet", Ti);
function ar(e) {
  return e[Symbol.toStringTag] = "SetIterator", Fn(e);
}
var sr = /* @__PURE__ */ Object.create(null), lr = "remove", Cn = /* @__PURE__ */ function() {
  function e(n, r, i, o) {
    r === void 0 && (r = /* @__PURE__ */ new Map()), o === void 0 && (o = da), this.target_ = void 0, this.values_ = void 0, this.name_ = void 0, this.defaultAnnotation_ = void 0, this.keysAtom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.proxy_ = void 0, this.isPlainObject_ = void 0, this.appliedAnnotations_ = void 0, this.pendingKeys_ = void 0, this.target_ = n, this.values_ = r, this.name_ = i, this.defaultAnnotation_ = o, this.keysAtom_ = new ve(process.env.NODE_ENV !== "production" ? this.name_ + ".keys" : "ObservableObject.keys"), this.isPlainObject_ = C(this.target_), process.env.NODE_ENV !== "production" && !ji(this.defaultAnnotation_) && h("defaultAnnotation must be valid annotation"), process.env.NODE_ENV !== "production" && (this.appliedAnnotations_ = {});
  }
  var t = e.prototype;
  return t.getObservablePropValue_ = function(r) {
    return this.values_.get(r).get();
  }, t.setObservablePropValue_ = function(r, i) {
    var o = this.values_.get(r);
    if (o instanceof z)
      return o.set(i), !0;
    if (R(this)) {
      var a = j(this, {
        type: F,
        object: this.proxy_ || this.target_,
        name: r,
        newValue: i
      });
      if (!a)
        return null;
      i = a.newValue;
    }
    if (i = o.prepareNewValue_(i), i !== f.UNCHANGED) {
      var s = K(this), l = process.env.NODE_ENV !== "production" && P(), c = s || l ? {
        type: F,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: o.value_,
        name: r,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && l && k(c), o.setNewValue_(i), s && q(this, c), process.env.NODE_ENV !== "production" && l && V();
    }
    return !0;
  }, t.get_ = function(r) {
    return f.trackingDerivation && !H(this.target_, r) && this.has_(r), this.target_[r];
  }, t.set_ = function(r, i, o) {
    return o === void 0 && (o = !1), H(this.target_, r) ? this.values_.has(r) ? this.setObservablePropValue_(r, i) : o ? Reflect.set(this.target_, r, i) : (this.target_[r] = i, !0) : this.extend_(r, {
      value: i,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }, this.defaultAnnotation_, o);
  }, t.has_ = function(r) {
    if (!f.trackingDerivation)
      return r in this.target_;
    this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
    var i = this.pendingKeys_.get(r);
    return i || (i = new Oe(r in this.target_, en, process.env.NODE_ENV !== "production" ? this.name_ + "." + wn(r) + "?" : "ObservableObject.key?", !1), this.pendingKeys_.set(r, i)), i.get();
  }, t.make_ = function(r, i) {
    if (i === !0 && (i = this.defaultAnnotation_), i !== !1) {
      if (dr(this, i, r), !(r in this.target_)) {
        var o;
        if ((o = this.target_[ne]) != null && o[r])
          return;
        h(1, i.annotationType_, this.name_ + "." + r.toString());
      }
      for (var a = this.target_; a && a !== Jt; ) {
        var s = It(a, r);
        if (s) {
          var l = i.make_(this, r, s, a);
          if (l === 0)
            return;
          if (l === 1)
            break;
        }
        a = Object.getPrototypeOf(a);
      }
      ur(this, i, r);
    }
  }, t.extend_ = function(r, i, o, a) {
    if (a === void 0 && (a = !1), o === !0 && (o = this.defaultAnnotation_), o === !1)
      return this.defineProperty_(r, i, a);
    dr(this, o, r);
    var s = o.extend_(this, r, i, a);
    return s && ur(this, o, r), s;
  }, t.defineProperty_ = function(r, i, o) {
    o === void 0 && (o = !1), J(this.keysAtom_);
    try {
      M();
      var a = this.delete_(r);
      if (!a)
        return a;
      if (R(this)) {
        var s = j(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: ce,
          newValue: i.value
        });
        if (!s)
          return null;
        var l = s.newValue;
        i.value !== l && (i = de({}, i, {
          value: l
        }));
      }
      if (o) {
        if (!Reflect.defineProperty(this.target_, r, i))
          return !1;
      } else
        X(this.target_, r, i);
      this.notifyPropertyAddition_(r, i.value);
    } finally {
      L();
    }
    return !0;
  }, t.defineObservableProperty_ = function(r, i, o, a) {
    a === void 0 && (a = !1), J(this.keysAtom_);
    try {
      M();
      var s = this.delete_(r);
      if (!s)
        return s;
      if (R(this)) {
        var l = j(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: ce,
          newValue: i
        });
        if (!l)
          return null;
        i = l.newValue;
      }
      var c = cr(r), u = {
        configurable: f.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !0,
        get: c.get,
        set: c.set
      };
      if (a) {
        if (!Reflect.defineProperty(this.target_, r, u))
          return !1;
      } else
        X(this.target_, r, u);
      var d = new Oe(i, o, process.env.NODE_ENV !== "production" ? this.name_ + "." + r.toString() : "ObservableObject.key", !1);
      this.values_.set(r, d), this.notifyPropertyAddition_(r, d.value_);
    } finally {
      L();
    }
    return !0;
  }, t.defineComputedProperty_ = function(r, i, o) {
    o === void 0 && (o = !1), J(this.keysAtom_);
    try {
      M();
      var a = this.delete_(r);
      if (!a)
        return a;
      if (R(this)) {
        var s = j(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: ce,
          newValue: void 0
        });
        if (!s)
          return null;
      }
      i.name || (i.name = process.env.NODE_ENV !== "production" ? this.name_ + "." + r.toString() : "ObservableObject.key"), i.context = this.proxy_ || this.target_;
      var l = cr(r), c = {
        configurable: f.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !1,
        get: l.get,
        set: l.set
      };
      if (o) {
        if (!Reflect.defineProperty(this.target_, r, c))
          return !1;
      } else
        X(this.target_, r, c);
      this.values_.set(r, new z(i)), this.notifyPropertyAddition_(r, void 0);
    } finally {
      L();
    }
    return !0;
  }, t.delete_ = function(r, i) {
    if (i === void 0 && (i = !1), J(this.keysAtom_), !H(this.target_, r))
      return !0;
    if (R(this)) {
      var o = j(this, {
        object: this.proxy_ || this.target_,
        name: r,
        type: lr
      });
      if (!o)
        return null;
    }
    try {
      var a;
      M();
      var s = K(this), l = process.env.NODE_ENV !== "production" && P(), c = this.values_.get(r), u = void 0;
      if (!c && (s || l)) {
        var d;
        u = (d = It(this.target_, r)) == null ? void 0 : d.value;
      }
      if (i) {
        if (!Reflect.deleteProperty(this.target_, r))
          return !1;
      } else
        delete this.target_[r];
      if (process.env.NODE_ENV !== "production" && delete this.appliedAnnotations_[r], c && (this.values_.delete(r), c instanceof Oe && (u = c.value_), pi(c)), this.keysAtom_.reportChanged(), (a = this.pendingKeys_) == null || (a = a.get(r)) == null || a.set(r in this.target_), s || l) {
        var v = {
          type: lr,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: u,
          name: r
        };
        process.env.NODE_ENV !== "production" && l && k(v), s && q(this, v), process.env.NODE_ENV !== "production" && l && V();
      }
    } finally {
      L();
    }
    return !0;
  }, t.observe_ = function(r, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && h("`observe` doesn't support the fire immediately property for observable objects."), Et(this, r);
  }, t.intercept_ = function(r) {
    return wt(this, r);
  }, t.notifyPropertyAddition_ = function(r, i) {
    var o, a = K(this), s = process.env.NODE_ENV !== "production" && P();
    if (a || s) {
      var l = a || s ? {
        type: ce,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: r,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && s && k(l), a && q(this, l), process.env.NODE_ENV !== "production" && s && V();
    }
    (o = this.pendingKeys_) == null || (o = o.get(r)) == null || o.set(!0), this.keysAtom_.reportChanged();
  }, t.ownKeys_ = function() {
    return this.keysAtom_.reportObserved(), dt(this.target_);
  }, t.keys_ = function() {
    return this.keysAtom_.reportObserved(), Object.keys(this.target_);
  }, e;
}();
function Ge(e, t) {
  var n;
  if (process.env.NODE_ENV !== "production" && t && Ye(e) && h("Options can't be provided for already observable objects."), H(e, b))
    return process.env.NODE_ENV !== "production" && !(Ri(e) instanceof Cn) && h("Cannot convert '" + Ft(e) + `' into observable object:
The target is already observable of different type.
Extending builtins is not supported.`), e;
  process.env.NODE_ENV !== "production" && !Object.isExtensible(e) && h("Cannot make the designated object observable; it is not extensible");
  var r = (n = t?.name) != null ? n : process.env.NODE_ENV !== "production" ? (C(e) ? "ObservableObject" : e.constructor.name) + "@" + B() : "ObservableObject", i = new Cn(e, /* @__PURE__ */ new Map(), String(r), Ea(t));
  return Zt(e, b, i), e;
}
var gs = /* @__PURE__ */ ke("ObservableObjectAdministration", Cn);
function cr(e) {
  return sr[e] || (sr[e] = {
    get: function() {
      return this[b].getObservablePropValue_(e);
    },
    set: function(n) {
      return this[b].setObservablePropValue_(e, n);
    }
  });
}
function Ye(e) {
  return Xt(e) ? gs(e[b]) : !1;
}
function ur(e, t, n) {
  var r;
  process.env.NODE_ENV !== "production" && (e.appliedAnnotations_[n] = t), (r = e.target_[ne]) == null || delete r[n];
}
function dr(e, t, n) {
  if (process.env.NODE_ENV !== "production" && !ji(t) && h("Cannot annotate '" + e.name_ + "." + n.toString() + "': Invalid annotation."), process.env.NODE_ENV !== "production" && !jt(t) && H(e.appliedAnnotations_, n)) {
    var r = e.name_ + "." + n.toString(), i = e.appliedAnnotations_[n].annotationType_, o = t.annotationType_;
    h("Cannot apply '" + o + "' to '" + r + "':" + (`
The field is already annotated with '` + i + "'.") + `
Re-annotating fields is not allowed.
Use 'override' annotation for methods overridden by subclass.`);
  }
}
var bs = /* @__PURE__ */ Vi(0), ms = /* @__PURE__ */ function() {
  var e = !1, t = {};
  return Object.defineProperty(t, "0", {
    set: function() {
      e = !0;
    }
  }), Object.create(t)[0] = 1, e === !1;
}(), gn = 0, ki = function() {
};
function _s(e, t) {
  Object.setPrototypeOf ? Object.setPrototypeOf(e.prototype, t) : e.prototype.__proto__ !== void 0 ? e.prototype.__proto__ = t : e.prototype = t;
}
_s(ki, Array.prototype);
var zn = /* @__PURE__ */ function(e) {
  function t(r, i, o, a) {
    var s;
    return o === void 0 && (o = process.env.NODE_ENV !== "production" ? "ObservableArray@" + B() : "ObservableArray"), a === void 0 && (a = !1), s = e.call(this) || this, Ie(function() {
      var l = new Un(o, i, a, !0);
      l.proxy_ = s, Yr(s, b, l), r && r.length && s.spliceWithArray(0, 0, r), ms && Object.defineProperty(s, "0", bs);
    }), s;
  }
  Zr(t, e);
  var n = t.prototype;
  return n.concat = function() {
    this[b].atom_.reportObserved();
    for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    return Array.prototype.concat.apply(
      this.slice(),
      //@ts-ignore
      o.map(function(s) {
        return ln(s) ? s.slice() : s;
      })
    );
  }, n[Symbol.iterator] = function() {
    var r = this, i = 0;
    return Fn({
      next: function() {
        return i < r.length ? {
          value: r[i++],
          done: !1
        } : {
          done: !0,
          value: void 0
        };
      }
    });
  }, We(t, [{
    key: "length",
    get: function() {
      return this[b].getArrayLength_();
    },
    set: function(i) {
      this[b].setArrayLength_(i);
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Array";
    }
  }]);
}(ki);
Object.entries(zt).forEach(function(e) {
  var t = e[0], n = e[1];
  t !== "concat" && Zt(zn.prototype, t, n);
});
function Vi(e) {
  return {
    enumerable: !1,
    configurable: !0,
    get: function() {
      return this[b].get_(e);
    },
    set: function(n) {
      this[b].set_(e, n);
    }
  };
}
function ys(e) {
  X(zn.prototype, "" + e, Vi(e));
}
function Ii(e) {
  if (e > gn) {
    for (var t = gn; t < e + 100; t++)
      ys(t);
    gn = e;
  }
}
Ii(1e3);
function ws(e, t, n) {
  return new zn(e, t, n);
}
function He(e, t) {
  if (typeof e == "object" && e !== null) {
    if (ln(e))
      return t !== void 0 && h(23), e[b].atom_;
    if (Y(e))
      return e.atom_;
    if (pe(e)) {
      if (t === void 0)
        return e.keysAtom_;
      var n = e.data_.get(t) || e.hasMap_.get(t);
      return n || h(25, t, Ft(e)), n;
    }
    if (Ye(e)) {
      if (!t)
        return h(26);
      var r = e[b].values_.get(t);
      return r || h(27, t, Ft(e)), r;
    }
    if (Rn(e) || an(e) || Ut(e))
      return e;
  } else if (A(e) && Ut(e[b]))
    return e[b];
  h(28);
}
function Ri(e, t) {
  if (e || h(29), Rn(e) || an(e) || Ut(e) || pe(e) || Y(e))
    return e;
  if (e[b])
    return e[b];
  h(24, e);
}
function Ft(e, t) {
  var n;
  if (t !== void 0)
    n = He(e, t);
  else {
    if (Be(e))
      return e.name;
    Ye(e) || pe(e) || Y(e) ? n = Ri(e) : n = He(e);
  }
  return n.name_;
}
function Ie(e) {
  var t = Ve(), n = rn(!0);
  M();
  try {
    return e();
  } finally {
    L(), on(n), oe(t);
  }
}
var fr = Jt.toString;
function Bn(e, t, n) {
  return n === void 0 && (n = -1), $n(e, t, n);
}
function $n(e, t, n, r, i) {
  if (e === t)
    return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null)
    return !1;
  if (e !== e)
    return t !== t;
  var o = typeof e;
  if (o !== "function" && o !== "object" && typeof t != "object")
    return !1;
  var a = fr.call(e);
  if (a !== fr.call(t))
    return !1;
  switch (a) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case "[object RegExp]":
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return typeof Symbol < "u" && Symbol.valueOf.call(e) === Symbol.valueOf.call(t);
    case "[object Map]":
    case "[object Set]":
      n >= 0 && n++;
      break;
  }
  e = hr(e), t = hr(t);
  var s = a === "[object Array]";
  if (!s) {
    if (typeof e != "object" || typeof t != "object")
      return !1;
    var l = e.constructor, c = t.constructor;
    if (l !== c && !(A(l) && l instanceof l && A(c) && c instanceof c) && "constructor" in e && "constructor" in t)
      return !1;
  }
  if (n === 0)
    return !1;
  n < 0 && (n = -1), r = r || [], i = i || [];
  for (var u = r.length; u--; )
    if (r[u] === e)
      return i[u] === t;
  if (r.push(e), i.push(t), s) {
    if (u = e.length, u !== t.length)
      return !1;
    for (; u--; )
      if (!$n(e[u], t[u], n - 1, r, i))
        return !1;
  } else {
    var d = Object.keys(e), v;
    if (u = d.length, Object.keys(t).length !== u)
      return !1;
    for (; u--; )
      if (v = d[u], !(H(t, v) && $n(e[v], t[v], n - 1, r, i)))
        return !1;
  }
  return r.pop(), i.pop(), !0;
}
function hr(e) {
  return ln(e) ? e.slice() : qe(e) || pe(e) || te(e) || Y(e) ? Array.from(e.entries()) : e;
}
var vr, Es = ((vr = kn().Iterator) == null ? void 0 : vr.prototype) || {};
function Fn(e) {
  return e[Symbol.iterator] = Os, Object.assign(Object.create(Es), e);
}
function Os() {
  return this;
}
function ji(e) {
  return (
    // Can be function
    e instanceof Object && typeof e.annotationType_ == "string" && A(e.make_) && A(e.extend_)
  );
}
["Symbol", "Map", "Set"].forEach(function(e) {
  var t = kn();
  typeof t[e] > "u" && h("MobX requires global '" + e + "' to be available or polyfilled");
});
typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ == "object" && __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
  spy: Fa,
  extras: {
    getDebugName: Ft
  },
  $mobx: b
});
const pr = "copilot-conf";
class ue {
  static get sessionConfiguration() {
    const t = sessionStorage.getItem(pr);
    return t ? JSON.parse(t) : {};
  }
  static saveCopilotActivation(t) {
    const n = this.sessionConfiguration;
    n.active = t, this.persist(n);
  }
  static getCopilotActivation() {
    return this.sessionConfiguration.active;
  }
  static saveSpotlightActivation(t) {
    const n = this.sessionConfiguration;
    n.spotlightActive = t, this.persist(n);
  }
  static getSpotlightActivation() {
    return this.sessionConfiguration.spotlightActive;
  }
  static saveSpotlightPosition(t, n, r, i) {
    const o = this.sessionConfiguration;
    o.spotlightPosition = { left: t, top: n, right: r, bottom: i }, this.persist(o);
  }
  static getSpotlightPosition() {
    return this.sessionConfiguration.spotlightPosition;
  }
  static saveDrawerSize(t, n) {
    const r = this.sessionConfiguration;
    r.drawerSizes = r.drawerSizes ?? {}, r.drawerSizes[t] = n, this.persist(r);
  }
  static getDrawerSize(t) {
    const n = this.sessionConfiguration;
    if (n.drawerSizes)
      return n.drawerSizes[t];
  }
  static savePanelConfigurations(t) {
    const n = this.sessionConfiguration;
    n.sectionPanelState = t, this.persist(n);
  }
  static getPanelConfigurations() {
    return this.sessionConfiguration.sectionPanelState;
  }
  static persist(t) {
    sessionStorage.setItem(pr, JSON.stringify(t));
  }
  static savePrompts(t) {
    const n = this.sessionConfiguration;
    n.prompts = t, this.persist(n);
  }
  static getPrompts() {
    return this.sessionConfiguration.prompts || [];
  }
  static saveCurrentSelection(t) {
    const n = this.sessionConfiguration;
    n.selection = n.selection ?? {}, n.selection && (n.selection.current = t, n.selection.location = window.location.pathname, this.persist(n));
  }
  static savePendingSelection(t) {
    const n = this.sessionConfiguration;
    n.selection = n.selection ?? {}, n.selection && (n.selection.pending = t, n.selection.location = window.location.pathname, this.persist(n));
  }
  static getCurrentSelection() {
    const t = this.sessionConfiguration.selection;
    if (t?.location === window.location.pathname)
      return t.current;
  }
  static getPendingSelection() {
    const t = this.sessionConfiguration.selection;
    if (t?.location === window.location.pathname)
      return t.pending;
  }
}
var Je = /* @__PURE__ */ ((e) => (e.INFORMATION = "information", e.WARNING = "warning", e.ERROR = "error", e))(Je || {});
const As = Symbol.for("react.portal"), Ss = Symbol.for("react.fragment"), Ns = Symbol.for("react.strict_mode"), xs = Symbol.for("react.profiler"), Ps = Symbol.for("react.provider"), Cs = Symbol.for("react.context"), Mi = Symbol.for("react.forward_ref"), $s = Symbol.for("react.suspense"), Ds = Symbol.for("react.suspense_list"), Ts = Symbol.for("react.memo"), ks = Symbol.for("react.lazy");
function Vs(e, t, n) {
  const r = e.displayName;
  if (r)
    return r;
  const i = t.displayName || t.name || "";
  return i !== "" ? `${n}(${i})` : n;
}
function gr(e) {
  return e.displayName || "Context";
}
function Ht(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case Ss:
      return "Fragment";
    case As:
      return "Portal";
    case xs:
      return "Profiler";
    case Ns:
      return "StrictMode";
    case $s:
      return "Suspense";
    case Ds:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Cs:
        return `${gr(e)}.Consumer`;
      case Ps:
        return `${gr(e._context)}.Provider`;
      case Mi:
        return Vs(e, e.render, "ForwardRef");
      case Ts:
        const t = e.displayName || null;
        return t !== null ? t : Ht(e.type) || "Memo";
      case ks: {
        const n = e, r = n._payload, i = n._init;
        try {
          return Ht(i(r));
        } catch {
          return null;
        }
      }
    }
  return null;
}
let Nt;
function Uc() {
  const e = /* @__PURE__ */ new Set();
  return Array.from(document.body.querySelectorAll("*")).flatMap(Ms).filter(Is).filter((n) => !n.fileName.endsWith("frontend/generated/flow/Flow.tsx")).forEach((n) => e.add(n.fileName)), Array.from(e);
}
function Is(e) {
  return !!e && e.fileName;
}
function Rs(e) {
  return e?._debugSource || void 0;
}
function js(e) {
  if (e && e.type?.__debugSourceDefine)
    return e.type.__debugSourceDefine;
}
function Ms(e) {
  return Rs(qt(e));
}
function Ls() {
  return `__reactFiber$${Li()}`;
}
function Us() {
  return `__reactContainer$${Li()}`;
}
function Li() {
  if (!(!Nt && (Nt = Array.from(document.querySelectorAll("*")).flatMap((e) => Object.keys(e)).filter((e) => e.startsWith("__reactFiber$")).map((e) => e.replace("__reactFiber$", "")).find((e) => e), !Nt)))
    return Nt;
}
function Kt(e) {
  const t = e.type;
  return t?.$$typeof === Mi && !t.displayName && e.child ? Kt(e.child) : Ht(e.type) ?? Ht(e.elementType) ?? "???";
}
function zs() {
  const e = Array.from(document.querySelectorAll("body > *")).flatMap((n) => n[Us()]).find((n) => n), t = Pe(e);
  return Pe(t?.child);
}
function Bs(e) {
  const t = [];
  let n = Pe(e.child);
  for (; n; )
    t.push(n), n = Pe(n.sibling);
  return t;
}
function Fs(e) {
  return e.hasOwnProperty("entanglements") && e.hasOwnProperty("containerInfo");
}
function Hs(e) {
  return e.hasOwnProperty("stateNode") && e.hasOwnProperty("pendingProps");
}
function Pe(e) {
  const t = e?.stateNode;
  if (t?.current && (Fs(t) || Hs(t)))
    return t?.current;
  if (!e)
    return;
  if (!e.alternate)
    return e;
  const n = e.alternate, r = e?.actualStartTime, i = n?.actualStartTime;
  return i !== r && i > r ? n : e;
}
function qt(e) {
  const t = Ls(), n = Pe(e[t]);
  if (n?._debugSource)
    return n;
  let r = n?.return || void 0;
  for (; r && !r._debugSource; )
    r = r.return || void 0;
  return r;
}
function Wt(e) {
  if (e.stateNode?.isConnected === !0)
    return e.stateNode;
  if (e.child)
    return Wt(e.child);
}
function Ui(e) {
  const t = Wt(e);
  return t && Pe(qt(t)) === e;
}
function Ks(e) {
  return typeof e.type != "function" ? !1 : !!(e._debugSource || js(e));
}
const zi = async (e, t, n) => window.Vaadin.copilot.comm(e, t, n), Ce = "copilot-", qs = "24.5.8", zc = "attention-required", Bc = "https://plugins.jetbrains.com/plugin/23758-vaadin", Fc = "https://marketplace.visualstudio.com/items?itemName=vaadin.vaadin-vscode";
function Hc(e) {
  return e === void 0 ? !1 : e.nodeId >= 0;
}
function Ws(e) {
  if (e.javaClass)
    return e.javaClass.substring(e.javaClass.lastIndexOf(".") + 1);
}
function Gs(e) {
  const t = window.Vaadin;
  if (t && t.Flow) {
    const { clients: n } = t.Flow, r = Object.keys(n);
    for (const i of r) {
      const o = n[i];
      if (o.getNodeId) {
        const a = o.getNodeId(e);
        if (a >= 0) {
          const s = o.getNodeInfo(a);
          return { nodeId: a, uiId: o.getUIId(), element: e, javaClass: s.javaClass, styles: s.styles };
        }
      }
    }
  }
}
function Kc() {
  const e = window.Vaadin;
  let t;
  if (e && e.Flow) {
    const { clients: n } = e.Flow, r = Object.keys(n);
    for (const i of r) {
      const o = n[i];
      o.getUIId && (t = o.getUIId());
    }
  }
  return t;
}
function qc(e) {
  return {
    uiId: e.uiId,
    nodeId: e.nodeId
  };
}
function Ys(e) {
  return e ? e.type?.type === "FlowContainer" : !1;
}
function Js(e) {
  return e.localName.startsWith("flow-container");
}
function Bi(e, t) {
  const n = e();
  n ? t(n) : setTimeout(() => Bi(e, t), 50);
}
async function Fi(e) {
  const t = e();
  if (t)
    return t;
  let n;
  const r = new Promise((o) => {
    n = o;
  }), i = setInterval(() => {
    const o = e();
    o && (clearInterval(i), n(o));
  }, 10);
  return r;
}
function Xs(e) {
  return S.box(e, { deep: !1 });
}
function Zs(e) {
  return e && typeof e.lastAccessedBy_ == "number";
}
function Wc(e) {
  if (e) {
    if (typeof e == "string")
      return e;
    if (!Zs(e))
      throw new Error(`Expected message to be a string or an observable value but was ${JSON.stringify(e)}`);
    return e.get();
  }
}
function Hn(e) {
  Promise.resolve().then(() => Ll).then(({ showNotification: t }) => {
    t(e);
  });
}
function Qs() {
  Hn({
    type: Je.INFORMATION,
    message: "The previous operation is still in progress. Please wait for it to finish."
  });
}
class el {
  constructor() {
    this.spotlightActive = !1, this.welcomeActive = !1, this.loginCheckActive = !1, this.userInfo = void 0, this.active = !1, this.activatedFrom = null, this.activatedAtLeastOnce = !1, this.operationInProgress = void 0, this.operationWaitsHmrUpdate = void 0, this.operationWaitsHmrUpdateTimeout = void 0, this.idePluginState = void 0, this.notifications = [], this.infoTooltip = null, this.sectionPanelDragging = !1, this.spotlightDragging = !1, this.sectionPanelResizing = !1, this.drawerResizing = !1, this.jdkInfo = void 0, sn(this, {
      notifications: S.shallow
    }), this.spotlightActive = ue.getSpotlightActivation() ?? !1;
  }
  setActive(t, n) {
    this.active = t, t && (this.activatedAtLeastOnce = !0), this.activatedFrom = n ?? null;
  }
  setSpotlightActive(t) {
    this.spotlightActive = t;
  }
  setWelcomeActive(t) {
    this.welcomeActive = t;
  }
  setLoginCheckActive(t) {
    this.loginCheckActive = t;
  }
  setUserInfo(t) {
    this.userInfo = t;
  }
  startOperation(t) {
    if (this.operationInProgress)
      throw new Error(`An ${t} operation is already in progress`);
    if (this.operationWaitsHmrUpdate) {
      Qs();
      return;
    }
    this.operationInProgress = t;
  }
  stopOperation(t) {
    if (this.operationInProgress) {
      if (this.operationInProgress !== t)
        return;
    } else return;
    this.operationInProgress = void 0;
  }
  setOperationWaitsHmrUpdate(t, n) {
    this.operationWaitsHmrUpdate = t, this.operationWaitsHmrUpdateTimeout = n;
  }
  clearOperationWaitsHmrUpdate() {
    this.operationWaitsHmrUpdate = void 0, this.operationWaitsHmrUpdateTimeout = void 0;
  }
  setIdePluginState(t) {
    this.idePluginState = t;
  }
  setJdkInfo(t) {
    this.jdkInfo = t;
  }
  toggleActive(t) {
    this.setActive(!this.active, this.active ? null : t ?? null);
  }
  reset() {
    this.active = !1, this.activatedAtLeastOnce = !1;
  }
  setNotifications(t) {
    this.notifications = t;
  }
  removeNotification(t) {
    t.animatingOut = !0, setTimeout(() => {
      this.reallyRemoveNotification(t);
    }, 180);
  }
  reallyRemoveNotification(t) {
    const n = this.notifications.indexOf(t);
    n > -1 && this.notifications.splice(n, 1);
  }
  setTooltip(t, n) {
    this.infoTooltip = {
      text: t,
      loader: n
    };
  }
  clearTooltip() {
    this.infoTooltip = null;
  }
  setSectionPanelDragging(t) {
    this.sectionPanelDragging = t;
  }
  setSpotlightDragging(t) {
    this.spotlightDragging = t;
  }
  setSectionPanelResizing(t) {
    this.sectionPanelResizing = t;
  }
  setDrawerResizing(t) {
    this.drawerResizing = t;
  }
}
const Gc = (e, t, n) => t >= e.left && t <= e.right && n >= e.top && n <= e.bottom, tl = (e) => {
  const t = [];
  let n = rl(e);
  for (; n; )
    t.push(n), n = n.parentElement;
  return t;
}, nl = (e, t) => {
  let n = e;
  for (; !(n instanceof HTMLElement && n.localName === `${Ce}main`); ) {
    if (!n.isConnected)
      return null;
    if (n.parentNode ? n = n.parentNode : n.host && (n = n.host), n instanceof HTMLElement && n.localName === t)
      return n;
  }
  return null;
};
function rl(e) {
  return e.parentElement ?? e.parentNode?.host;
}
function Ke(e) {
  return !e || !(e instanceof HTMLElement) ? !1 : [...tl(e), e].map((t) => t.localName).some((t) => t.startsWith(Ce));
}
function br(e) {
  return e instanceof Element;
}
function mr(e) {
  return e.startsWith("vaadin-") ? e.substring(7).split("-").map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : e;
}
function _r(e) {
  if (!e)
    return;
  if (e.id)
    return `#${e.id}`;
  if (!e.children)
    return;
  const t = Array.from(e.children).find((r) => r.localName === "label");
  if (t)
    return t.outerText.trim();
  const n = Array.from(e.childNodes).find(
    (r) => r.nodeType === Node.TEXT_NODE && r.textContent && r.textContent.trim().length > 0
  );
  if (n && n.textContent)
    return n.textContent.trim();
}
var Hi = /* @__PURE__ */ ((e) => (e["vaadin-combo-box"] = "vaadin-combo-box", e["vaadin-date-picker"] = "vaadin-date-picker", e["vaadin-dialog"] = "vaadin-dialog", e["vaadin-multi-select-combo-box"] = "vaadin-multi-select-combo-box", e["vaadin-select"] = "vaadin-select", e["vaadin-time-picker"] = "vaadin-time-picker", e["vaadin-popover"] = "vaadin-popover", e))(Hi || {});
const et = {
  "vaadin-combo-box": {
    hideOnActivation: !0,
    open: (e) => xt(e),
    close: (e) => Pt(e)
  },
  "vaadin-select": {
    hideOnActivation: !0,
    open: (e) => {
      const t = e;
      qi(t, t._overlayElement), t.opened = !0;
    },
    close: (e) => {
      const t = e;
      Wi(t, t._overlayElement), t.opened = !1;
    }
  },
  "vaadin-multi-select-combo-box": {
    hideOnActivation: !0,
    open: (e) => xt(e.$.comboBox),
    close: (e) => {
      Pt(e.$.comboBox), e.removeAttribute("focused");
    }
  },
  "vaadin-date-picker": {
    hideOnActivation: !0,
    open: (e) => xt(e),
    close: (e) => Pt(e)
  },
  "vaadin-time-picker": {
    hideOnActivation: !0,
    open: (e) => xt(e.$.comboBox),
    close: (e) => {
      Pt(e.$.comboBox), e.removeAttribute("focused");
    }
  },
  "vaadin-dialog": {
    hideOnActivation: !1
  },
  "vaadin-popover": {
    hideOnActivation: !1
  }
}, Ki = (e) => {
  e.preventDefault(), e.stopImmediatePropagation();
}, xt = (e) => {
  e.addEventListener("focusout", Ki, { capture: !0 }), qi(e), e.opened = !0;
}, Pt = (e) => {
  Wi(e), e.removeAttribute("focused"), e.removeEventListener("focusout", Ki, { capture: !0 }), e.opened = !1;
}, qi = (e, t) => {
  const n = t ?? e.$.overlay;
  n.__oldModeless = n.modeless, n.modeless = !0;
}, Wi = (e, t) => {
  const n = t ?? e.$.overlay;
  n.modeless = n.__oldModeless !== void 0 ? n.__oldModeless : n.modeless, delete n.__oldModeless;
};
class il {
  constructor() {
    this.openedOverlayOwners = /* @__PURE__ */ new Set(), this.overlayCloseEventListener = (t) => {
      Ke(t.target?.owner) || (window.Vaadin.copilot._uiState.active || Ke(t.detail.sourceEvent.target)) && (t.preventDefault(), t.stopImmediatePropagation());
    };
  }
  /**
   * Modifies pointer-events property to auto if dialog overlay is present on body element. <br/>
   * Overriding closeOnOutsideClick method in order to keep overlay present while copilot is active
   * @private
   */
  onCopilotActivation() {
    const t = Array.from(document.body.children).find(
      (r) => r.localName.startsWith("vaadin") && r.localName.endsWith("-overlay")
    );
    if (!t)
      return;
    const n = this.getOwner(t);
    if (n) {
      const r = et[n.localName];
      if (!r)
        return;
      r.hideOnActivation && r.close ? r.close(n) : document.body.style.getPropertyValue("pointer-events") === "none" && document.body.style.removeProperty("pointer-events");
    }
  }
  /**
   * Restores pointer-events state on deactivation. <br/>
   * Closes opened overlays while using copilot.
   * @private
   */
  onCopilotDeactivation() {
    this.openedOverlayOwners.forEach((n) => {
      const r = et[n.localName];
      r && r.close && r.close(n);
    }), document.body.querySelector("vaadin-dialog-overlay") && document.body.style.setProperty("pointer-events", "none");
  }
  getOwner(t) {
    const n = t;
    return n.owner ?? n.__dataHost;
  }
  addOverlayOutsideClickEvent() {
    document.documentElement.addEventListener("vaadin-overlay-outside-click", this.overlayCloseEventListener, {
      capture: !0
    }), document.documentElement.addEventListener("vaadin-overlay-escape-press", this.overlayCloseEventListener, {
      capture: !0
    });
  }
  removeOverlayOutsideClickEvent() {
    document.documentElement.removeEventListener("vaadin-overlay-outside-click", this.overlayCloseEventListener), document.documentElement.removeEventListener("vaadin-overlay-escape-press", this.overlayCloseEventListener);
  }
  toggle(t) {
    const n = et[t.localName];
    this.isOverlayActive(t) ? (n.close(t), this.openedOverlayOwners.delete(t)) : (n.open(t), this.openedOverlayOwners.add(t));
  }
  isOverlayActive(t) {
    const n = et[t.localName];
    return n.active ? n.active(t) : t.hasAttribute("opened");
  }
  overlayStatus(t) {
    if (!t)
      return { visible: !1 };
    const n = t.localName;
    let r = Object.keys(Hi).includes(n);
    if (!r)
      return { visible: !1 };
    const i = et[t.localName];
    i.hasOverlay && (r = i.hasOverlay(t));
    const o = this.isOverlayActive(t);
    return { visible: r, active: o };
  }
}
async function Gi() {
  return Fi(() => {
    const e = window.Vaadin.devTools, t = e?.frontendConnection && e?.frontendConnection.status === "active";
    return e !== void 0 && t && e?.frontendConnection;
  });
}
function fe(e, t) {
  Gi().then((n) => n.send(e, t));
}
class ol {
  constructor() {
    this.promise = new Promise((t) => {
      this.resolveInit = t;
    });
  }
  done(t) {
    this.resolveInit(t);
  }
}
class al {
  constructor() {
    this.dismissedNotifications = [], this.termsSummaryDismissed = !1, this.activationButtonPosition = null, this.paletteState = null, this.activationShortcut = !0, this.activationAnimation = !0, sn(this), this.initializer = new ol(), this.initializer.promise.then(() => {
      Ai(
        () => JSON.stringify(this),
        () => {
          fe("copilot-set-machine-configuration", { conf: JSON.stringify(yr(this)) });
        }
      );
    }), window.Vaadin.copilot.eventbus.on("copilot-machine-configuration", (t) => {
      const n = t.detail.conf;
      Object.assign(this, yr(n)), this.initializer.done(!0), t.preventDefault();
    }), this.loadData();
  }
  loadData() {
    fe("copilot-get-machine-configuration", {});
  }
  addDismissedNotification(t) {
    this.dismissedNotifications.push(t);
  }
  getDismissedNotifications() {
    return this.dismissedNotifications;
  }
  setTermsSummaryDismissed(t) {
    this.termsSummaryDismissed = t;
  }
  isTermsSummaryDismissed() {
    return this.termsSummaryDismissed;
  }
  getActivationButtonPosition() {
    return this.activationButtonPosition;
  }
  setActivationButtonPosition(t) {
    this.activationButtonPosition = t;
  }
  getPaletteState() {
    return this.paletteState;
  }
  setPaletteState(t) {
    this.paletteState = t;
  }
  isActivationShortcut() {
    return this.activationShortcut;
  }
  setActivationShortcut(t) {
    this.activationShortcut = t;
  }
  isActivationAnimation() {
    return this.activationAnimation;
  }
  setActivationAnimation(t) {
    this.activationAnimation = t;
  }
}
function yr(e) {
  const t = { ...e };
  return delete t.initializer, t;
}
class sl {
  constructor() {
    this._previewActivated = !1, this._remainingTimeInMillis = -1, this._active = !1, this._configurationLoaded = !1, sn(this);
  }
  setConfiguration(t) {
    this._previewActivated = t.previewActivated, t.previewActivated ? this._remainingTimeInMillis = t.remainingTimeInMillis : this._remainingTimeInMillis = -1, this._active = t.active, this._configurationLoaded = !0;
  }
  get previewActivated() {
    return this._previewActivated;
  }
  get remainingTimeInMillis() {
    return this._remainingTimeInMillis;
  }
  get active() {
    return this._active;
  }
  get configurationLoaded() {
    return this._configurationLoaded;
  }
  get expired() {
    return this.previewActivated && !this.active;
  }
  reset() {
    this._previewActivated = !1, this._active = !1, this._configurationLoaded = !1, this._remainingTimeInMillis = -1;
  }
  loadPreviewConfiguration() {
    zi(`${Ce}get-preview`, {}, (t) => {
      const n = t.data;
      this.setConfiguration(n);
    }).catch((t) => {
      Promise.resolve().then(() => ql).then((n) => {
        n.handleCopilotError("Load preview configuration failed", t);
      });
    });
  }
}
class ll {
  constructor() {
    this._panels = [], this._attentionRequiredPanelTag = null, this._floatingPanelsZIndexOrder = [], this.renderedPanels = /* @__PURE__ */ new Set(), sn(this), this.restorePositions();
  }
  shouldRender(t) {
    return this.renderedPanels.has(t);
  }
  restorePositions() {
    const t = ue.getPanelConfigurations();
    t && (this._panels = this._panels.map((n) => {
      const r = t.find((i) => i.tag === n.tag);
      return r && (n = Object.assign(n, { ...r })), n;
    }));
  }
  /**
   * Brings a given floating panel to the front.
   *
   * @param panelTag the tag name of the panel
   */
  bringToFront(t) {
    this._floatingPanelsZIndexOrder = this._floatingPanelsZIndexOrder.filter((n) => n !== t), this.getPanelByTag(t)?.floating && this._floatingPanelsZIndexOrder.push(t);
  }
  /**
   * Returns the focused z-index of floating panel as following order
   * <ul>
   *     <li>Returns 50 for last(focused) element </li>
   *     <li>Returns the index of element in list(starting from 0) </li>
   *     <li>Returns 0 if panel is not in the list</li>
   * </ul>
   * @param panelTag
   */
  getFloatingPanelZIndex(t) {
    const n = this._floatingPanelsZIndexOrder.findIndex((r) => r === t);
    return n === this._floatingPanelsZIndexOrder.length - 1 ? 50 : n === -1 ? 0 : n;
  }
  get floatingPanelsZIndexOrder() {
    return this._floatingPanelsZIndexOrder;
  }
  get attentionRequiredPanelTag() {
    return this._attentionRequiredPanelTag;
  }
  set attentionRequiredPanelTag(t) {
    this._attentionRequiredPanelTag = t;
  }
  getAttentionRequiredPanelConfiguration() {
    return this._panels.find((t) => t.tag === this._attentionRequiredPanelTag);
  }
  clearAttention() {
    this._attentionRequiredPanelTag = null;
  }
  get panels() {
    return this._panels;
  }
  addPanel(t) {
    if (this.getPanelByTag(t.tag))
      return;
    this._panels.push(t), this.restorePositions();
    const n = this.getPanelByTag(t.tag);
    if (n)
      (n.eager || n.expanded) && this.renderedPanels.add(t.tag);
    else throw new Error(`Panel configuration not found for tag ${t.tag}`);
  }
  getPanelByTag(t) {
    return this._panels.find((n) => n.tag === t);
  }
  updatePanel(t, n) {
    const r = [...this._panels], i = r.find((o) => o.tag === t);
    if (i) {
      for (const o in n)
        i[o] = n[o];
      i.expanded && this.renderedPanels.add(i.tag), n.floating === !1 && (this._floatingPanelsZIndexOrder = this._floatingPanelsZIndexOrder.filter((o) => o !== t)), this._panels = r, ue.savePanelConfigurations(this._panels);
    }
  }
  updateOrders(t) {
    const n = [...this._panels];
    n.forEach((r) => {
      const i = t.find((o) => o.tag === r.tag);
      i && (r.panelOrder = i.order);
    }), this._panels = n, ue.savePanelConfigurations(n);
  }
  removePanel(t) {
    const n = this._panels.findIndex((r) => r.tag === t);
    n < 0 || (this._panels.splice(n, 1), ue.savePanelConfigurations(this._panels));
  }
}
window.Vaadin ??= {};
window.Vaadin.copilot ??= {};
window.Vaadin.copilot.plugins = [];
window.Vaadin.copilot._uiState = new el();
window.Vaadin.copilot.eventbus = new xo();
window.Vaadin.copilot.overlayManager = new il();
window.Vaadin.copilot._machineState = new al();
window.Vaadin.copilot._previewState = new sl();
window.Vaadin.copilot._sectionPanelUiState = new ll();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const cl = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis, Kn = Tt.ShadowRoot && (Tt.ShadyCSS === void 0 || Tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, qn = Symbol(), wr = /* @__PURE__ */ new WeakMap();
let Yi = class {
  constructor(t, n, r) {
    if (this._$cssResult$ = !0, r !== qn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Kn && t === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (t = wr.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && wr.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const le = (e) => new Yi(typeof e == "string" ? e : e + "", void 0, qn), ul = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((r, i, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new Yi(n, e, qn);
}, dl = (e, t) => {
  if (Kn) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const r = document.createElement("style"), i = Tt.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, e.appendChild(r);
  }
}, Er = Kn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const r of t.cssRules) n += r.cssText;
  return le(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: fl, defineProperty: hl, getOwnPropertyDescriptor: vl, getOwnPropertyNames: pl, getOwnPropertySymbols: gl, getPrototypeOf: bl } = Object, cn = globalThis, Or = cn.trustedTypes, ml = Or ? Or.emptyScript : "", _l = cn.reactiveElementPolyfillSupport, lt = (e, t) => e, Dn = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ml : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, Ji = (e, t) => !fl(e, t), Ar = { attribute: !0, type: String, converter: Dn, reflect: !1, hasChanged: Ji };
Symbol.metadata ??= Symbol("metadata"), cn.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Me = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Ar) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.elementProperties.set(t, n), !n.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, n);
      i !== void 0 && hl(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, n, r) {
    const { get: i, set: o } = vl(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get() {
      return i?.call(this);
    }, set(a) {
      const s = i?.call(this);
      o.call(this, a), this.requestUpdate(t, s, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ar;
  }
  static _$Ei() {
    if (this.hasOwnProperty(lt("elementProperties"))) return;
    const t = bl(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(lt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(lt("properties"))) {
      const n = this.properties, r = [...pl(n), ...gl(n)];
      for (const i of r) this.createProperty(i, n[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [r, i] of n) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const i = this._$Eu(n, r);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) n.unshift(Er(i));
    } else t !== void 0 && n.push(Er(t));
    return n;
  }
  static _$Eu(t, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dl(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, r) {
    this._$AK(t, r);
  }
  _$EC(t, n) {
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : Dn).toAttribute(n, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Dn;
      this._$Em = i, this[i] = a.fromAttribute(n, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, n, r) {
    if (t !== void 0) {
      if (r ??= this.constructor.getPropertyOptions(t), !(r.hasChanged ?? Ji)(this[t], n)) return;
      this.P(t, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, n, r) {
    this._$AL.has(t) || this._$AL.set(t, n), r.reflect === !0 && this._$Em !== t && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, o] of r) o.wrapped !== !0 || this._$AL.has(i) || this[i] === void 0 || this.P(i, this[i], o);
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(n)) : this._$EU();
    } catch (r) {
      throw t = !1, this._$EU(), r;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej &&= this._$Ej.forEach((n) => this._$EC(n, this[n])), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Me.elementStyles = [], Me.shadowRootOptions = { mode: "open" }, Me[lt("elementProperties")] = /* @__PURE__ */ new Map(), Me[lt("finalized")] = /* @__PURE__ */ new Map(), _l?.({ ReactiveElement: Me }), (cn.reactiveElementVersions ??= []).push("2.0.4");
const je = Symbol("LitMobxRenderReaction"), Sr = Symbol("LitMobxRequestUpdate");
function yl(e, t) {
  var n, r;
  return r = class extends e {
    constructor() {
      super(...arguments), this[n] = () => {
        this.requestUpdate();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const o = this.constructor.name || this.nodeName;
      this[je] = new t(`${o}.update()`, this[Sr]), this.hasUpdated && this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this[je] && (this[je].dispose(), this[je] = void 0);
    }
    update(o) {
      this[je] ? this[je].track(super.update.bind(this, o)) : super.update(o);
    }
  }, n = Sr, r;
}
function wl(e) {
  return yl(e, ee);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wn = globalThis, Gt = Wn.trustedTypes, Nr = Gt ? Gt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Gn = "$lit$", ie = `lit$${Math.random().toFixed(9).slice(2)}$`, Yn = "?" + ie, El = `<${Yn}>`, $e = document, pt = () => $e.createComment(""), gt = (e) => e === null || typeof e != "object" && typeof e != "function", Jn = Array.isArray, Xi = (e) => Jn(e) || typeof e?.[Symbol.iterator] == "function", bn = `[ 	
\f\r]`, tt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xr = /-->/g, Pr = />/g, me = RegExp(`>|${bn}(?:([^\\s"'>=/]+)(${bn}*=${bn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cr = /'/g, $r = /"/g, Zi = /^(?:script|style|textarea|title)$/i, Qi = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), Yt = Qi(1), Zc = Qi(2), he = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), Dr = /* @__PURE__ */ new WeakMap(), Ee = $e.createTreeWalker($e, 129);
function eo(e, t) {
  if (!Jn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Nr !== void 0 ? Nr.createHTML(t) : t;
}
const to = (e, t) => {
  const n = e.length - 1, r = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = tt;
  for (let s = 0; s < n; s++) {
    const l = e[s];
    let c, u, d = -1, v = 0;
    for (; v < l.length && (a.lastIndex = v, u = a.exec(l), u !== null); ) v = a.lastIndex, a === tt ? u[1] === "!--" ? a = xr : u[1] !== void 0 ? a = Pr : u[2] !== void 0 ? (Zi.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = me) : u[3] !== void 0 && (a = me) : a === me ? u[0] === ">" ? (a = i ?? tt, d = -1) : u[1] === void 0 ? d = -2 : (d = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? me : u[3] === '"' ? $r : Cr) : a === $r || a === Cr ? a = me : a === xr || a === Pr ? a = tt : (a = me, i = void 0);
    const p = a === me && e[s + 1].startsWith("/>") ? " " : "";
    o += a === tt ? l + El : d >= 0 ? (r.push(c), l.slice(0, d) + Gn + l.slice(d) + ie + p) : l + ie + (d === -2 ? s : p);
  }
  return [eo(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class bt {
  constructor({ strings: t, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const s = t.length - 1, l = this.parts, [c, u] = to(t, n);
    if (this.el = bt.createElement(c, r), Ee.currentNode = this.el.content, n === 2 || n === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = Ee.nextNode()) !== null && l.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Gn)) {
          const v = u[a++], p = i.getAttribute(d).split(ie), m = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: o, name: m[2], strings: p, ctor: m[1] === "." ? ro : m[1] === "?" ? io : m[1] === "@" ? oo : Ot }), i.removeAttribute(d);
        } else d.startsWith(ie) && (l.push({ type: 6, index: o }), i.removeAttribute(d));
        if (Zi.test(i.tagName)) {
          const d = i.textContent.split(ie), v = d.length - 1;
          if (v > 0) {
            i.textContent = Gt ? Gt.emptyScript : "";
            for (let p = 0; p < v; p++) i.append(d[p], pt()), Ee.nextNode(), l.push({ type: 2, index: ++o });
            i.append(d[v], pt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Yn) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(ie, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += ie.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const r = $e.createElement("template");
    return r.innerHTML = t, r;
  }
}
function De(e, t, n = e, r) {
  if (t === he) return t;
  let i = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const o = gt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = i : n._$Cl = i), i !== void 0 && (t = De(e, i._$AS(e, t.values), i, r)), t;
}
let no = class {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: r } = this._$AD, i = (t?.creationScope ?? $e).importNode(n, !0);
    Ee.currentNode = i;
    let o = Ee.nextNode(), a = 0, s = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new Xe(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new ao(o, this, t)), this._$AV.push(c), l = r[++s];
      }
      a !== l?.index && (o = Ee.nextNode(), a++);
    }
    return Ee.currentNode = $e, i;
  }
  p(t) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, n), n += r.strings.length - 2) : r._$AI(t[n])), n++;
  }
};
class Xe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, r, i) {
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = De(this, t, n), gt(t) ? t === O || t == null || t === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : t !== this._$AH && t !== he && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Xi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== O && gt(this._$AH) ? this._$AA.nextSibling.data = t : this.T($e.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = bt.createElement(eo(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const o = new no(i, this), a = o.u(this.options);
      o.p(n), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let n = Dr.get(t.strings);
    return n === void 0 && Dr.set(t.strings, n = new bt(t)), n;
  }
  k(t) {
    Jn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const o of t) i === n.length ? n.push(r = new Xe(this.O(pt()), this.O(pt()), this, this.options)) : r = n[i], r._$AI(o), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, r, i, o) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = t, this.name = n, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = O;
  }
  _$AI(t, n = this, r, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = De(this, t, n, 0), a = !gt(t) || t !== this._$AH && t !== he, a && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = De(this, s[r + l], n, l), c === he && (c = this._$AH[l]), a ||= !gt(c) || c !== this._$AH[l], c === O ? t = O : t !== O && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ro extends Ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === O ? void 0 : t;
  }
}
class io extends Ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== O);
  }
}
class oo extends Ot {
  constructor(t, n, r, i, o) {
    super(t, n, r, i, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = De(this, t, n, 0) ?? O) === he) return;
    const r = this._$AH, i = t === O && r !== O || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== O && (r === O || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ao {
  constructor(t, n, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    De(this, t);
  }
}
const Ol = { M: Gn, P: ie, A: Yn, C: 1, L: to, R: no, D: Xi, V: De, I: Xe, H: Ot, N: io, U: oo, B: ro, F: ao }, Al = Wn.litHtmlPolyfillSupport;
Al?.(bt, Xe), (Wn.litHtmlVersions ??= []).push("3.2.1");
const Sl = (e, t, n) => {
  const r = n?.renderBefore ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = n?.renderBefore ?? null;
    r._$litPart$ = i = new Xe(t.insertBefore(pt(), o), o, void 0, n ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let ct = class extends Me {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Sl(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return he;
  }
};
ct._$litElement$ = !0, ct.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: ct });
const Nl = globalThis.litElementPolyfillSupport;
Nl?.({ LitElement: ct });
(globalThis.litElementVersions ??= []).push("4.1.1");
class xl extends wl(ct) {
}
class Pl extends xl {
  constructor() {
    super(...arguments), this.disposers = [];
  }
  /**
   * Creates a MobX reaction using the given parameters and disposes it when this element is detached.
   *
   * This should be called from `connectedCallback` to ensure that the reaction is active also if the element is attached again later.
   */
  reaction(t, n, r) {
    this.disposers.push(Ai(t, n, r));
  }
  /**
   * Creates a MobX autorun using the given parameters and disposes it when this element is detached.
   *
   * This should be called from `connectedCallback` to ensure that the reaction is active also if the element is attached again later.
   */
  autorun(t, n) {
    this.disposers.push(Ei(t, n));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disposers.forEach((t) => {
      t();
    }), this.disposers = [];
  }
}
const Q = window.Vaadin.copilot._sectionPanelUiState;
if (!Q)
  throw new Error("Tried to access copilot section panel ui state before it was initialized.");
let ye = [];
const Tr = [];
function kr(e) {
  e.init({
    addPanel: (t) => {
      Q.addPanel(t);
    },
    send(t, n) {
      fe(t, n);
    }
  });
}
function Cl() {
  ye.push(import("./copilot-log-plugin-B8-8h5oY.js")), ye.push(import("./copilot-info-plugin-Dapy5fTq.js")), ye.push(import("./copilot-features-plugin-BGBi5jiu.js")), ye.push(import("./copilot-feedback-plugin-Bztf_x-F.js")), ye.push(import("./copilot-shortcuts-plugin-V0zS2Sak.js"));
}
function $l() {
  {
    const e = `https://cdn.vaadin.com/copilot/${qs}/copilot-plugins.js`;
    import(
      /* @vite-ignore */
      e
    ).catch((t) => {
      console.warn(`Unable to load plugins from ${e}. Some Copilot features are unavailable.`, t);
    });
  }
}
function Dl() {
  Promise.all(ye).then(() => {
    const e = window.Vaadin;
    if (e.copilot.plugins) {
      const t = e.copilot.plugins;
      e.copilot.plugins.push = (n) => kr(n), Array.from(t).forEach((n) => {
        Tr.includes(n) || (kr(n), Tr.push(n));
      });
    }
  }), ye = [];
}
function tu(e) {
  return Object.assign({
    expanded: !0,
    expandable: !1,
    panelOrder: 0,
    floating: !1,
    width: 500,
    height: 500,
    floatingPosition: {
      top: 50,
      left: 350
    }
  }, e);
}
class Tl {
  constructor() {
    this.active = !1, this.activate = () => {
      this.active = !0, this.blurActiveApplicationElement();
    }, this.deactivate = () => {
      this.active = !1;
    }, this.focusInEventListener = (t) => {
      this.active && (t.preventDefault(), t.stopPropagation(), Ke(t.target) || requestAnimationFrame(() => {
        t.target.blur && t.target.blur(), document.body.querySelector("copilot-main")?.focus();
      }));
    };
  }
  hostConnectedCallback() {
    const t = this.getApplicationRootElement();
    t && t instanceof HTMLElement && t.addEventListener("focusin", this.focusInEventListener);
  }
  hostDisconnectedCallback() {
    const t = this.getApplicationRootElement();
    t && t instanceof HTMLElement && t.removeEventListener("focusin", this.focusInEventListener);
  }
  getApplicationRootElement() {
    return document.body.firstElementChild;
  }
  blurActiveApplicationElement() {
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
  }
}
const Ct = new Tl(), E = window.Vaadin.copilot.eventbus;
if (!E)
  throw new Error("Tried to access copilot eventbus before it was initialized.");
const nt = window.Vaadin.copilot.overlayManager, nu = {
  AddClickListener: "Add Click Listener",
  AI: "AI",
  Delete: "Delete",
  DragAndDrop: "Drag and Drop",
  Duplicate: "Duplicate",
  SetLabel: "Set label",
  SetText: "Set text",
  SetHelper: "Set helper text",
  WrapWithTag: "Wrapping with tag",
  Alignment: "Alignment",
  Padding: "Padding",
  ModifyComponentSource: "Modify component source",
  Gap: "Gap",
  RedoUndo: "Redo/Undo",
  Sizing: "Sizing"
}, g = window.Vaadin.copilot._uiState;
if (!g)
  throw new Error("Tried to access copilot ui state before it was initialized.");
const kl = () => {
  fe("copilot-browser-info", {
    userAgent: navigator.userAgent,
    locale: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
}, un = (e, t) => {
  fe("copilot-track-event", { event: e, properties: t });
}, ru = (e, t) => {
  un(e, { ...t, view: "react" });
}, iu = (e, t) => {
  un(e, { ...t, view: "flow" });
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const so = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, lo = (e) => (...t) => ({ _$litDirective$: e, values: t });
class co {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, n, r) {
    this._$Ct = t, this._$AM = n, this._$Ci = r;
  }
  _$AS(t, n) {
    return this.update(t, n);
  }
  update(t, n) {
    return this.render(...n);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Tn extends co {
  constructor(t) {
    if (super(t), this.it = O, t.type !== so.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === O || t == null) return this._t = void 0, this.it = t;
    if (t === he) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const n = [t];
    return n.raw = n, this._t = { _$litType$: this.constructor.resultType, strings: n, values: [] };
  }
}
Tn.directiveName = "unsafeHTML", Tn.resultType = 1;
const Vl = lo(Tn), dn = window.Vaadin.copilot._machineState;
if (!dn)
  throw new Error("Trying to use stored machine state before it was initialized");
const Il = 5e3;
let Vr = 1;
function uo(e) {
  g.notifications.includes(e) && (e.dontShowAgain && e.dismissId && Rl(e.dismissId), g.removeNotification(e), E.emit("notification-dismissed", e));
}
function fo(e) {
  return dn.getDismissedNotifications().includes(e);
}
function Rl(e) {
  fo(e) || dn.addDismissedNotification(e);
}
function jl(e) {
  return !(e.dismissId && (fo(e.dismissId) || g.notifications.find((t) => t.dismissId === e.dismissId)));
}
function ho(e) {
  jl(e) && Ml(e);
}
function Ml(e) {
  const t = Vr;
  Vr += 1;
  const n = { ...e, id: t, dontShowAgain: !1, animatingOut: !1 };
  g.setNotifications([...g.notifications, n]), (e.delay || !e.link && !e.dismissId) && setTimeout(() => {
    uo(n);
  }, e.delay ?? Il), E.emit("notification-shown", e);
}
const Ll = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dismissNotification: uo,
  showNotification: ho
}, Symbol.toStringTag, { value: "Module" })), Ul = (e) => {
  Te("Unspecified error", e), E.emit("vite-after-update", {});
}, zl = (e) => e.error ? (Bl({
  error: e.error,
  message: e.errorMessage,
  stackTrace: e.errorStacktrace
}), !0) : !1, vo = (e, t, n) => {
  Hn({
    type: Je.ERROR,
    message: e,
    details: Xs(
      Yt`<vaadin-details summary="Details" style="color: var(--dev-tools-text-color)"
        ><div>
          <code class="codeblock" style="white-space: normal;color: var(--color)"
            ><copilot-copy></copilot-copy>${Vl(t)}</code
          >
          <vaadin-button hidden>Report this issue</vaadin-button>
        </div></vaadin-details
      >`
    ),
    delay: 3e4
  }), E.emit("system-info-with-callback", {
    callback: (r) => E.send("copilot-error", {
      message: e,
      details: String(n).replace("	", `
`),
      versions: r
    }),
    notify: !1
  }), g.clearOperationWaitsHmrUpdate();
}, Bl = (e) => {
  vo(e.error, e.message, e.stackTrace);
};
function Fl(e, t) {
  vo(e, t.message, t.stack || "");
}
function Te(e, t) {
  Hn({
    type: Je.ERROR,
    message: "Copilot internal error",
    details: e + (t ? `
${t}` : "")
  }), E.emit("system-info-with-callback", {
    callback: (n) => E.send("copilot-error", {
      message: `Copilot internal error: ${e}`,
      details: t?.stack ?? "",
      versions: n
    }),
    notify: !1
  });
}
function Ir(e) {
  return e?.stack?.includes("cdn.vaadin.com/copilot") || e?.stack?.includes("/copilot/copilot/") || e?.stack?.includes("/copilot/copilot-private/");
}
function po() {
  const e = window.onerror;
  window.onerror = (t, n, r, i, o) => {
    if (Ir(o)) {
      Te(t.toString(), o);
      return;
    }
    e && e(t, n, r, i, o);
  }, La((t) => {
    Ir(t) && Te("", t);
  }), bo((t) => go.push(t));
}
const go = [];
function bo(e) {
  const t = window.Vaadin.ConsoleErrors;
  window.Vaadin.ConsoleErrors = {
    push: (n) => {
      Ga(() => {
        Q.attentionRequiredPanelTag = "copilot-log-panel";
      }), n[0].type !== void 0 && n[0].message !== void 0 ? e({
        type: n[0].type,
        message: n[0].message,
        internal: !!n[0].internal,
        details: n[0].details,
        link: n[0].link
      }) : e({ type: Je.ERROR, message: n.map((r) => Hl(r)).join(" "), internal: !1 }), t.push(n);
    }
  };
}
function Hl(e) {
  return e.message ? e.message.toString() : e.toString();
}
function Kl(e) {
  ho({
    type: Je.ERROR,
    message: `Unable to ${e}`,
    details: "Could not find sources for React components, probably because the project is not a React (or Flow) project"
  });
}
const ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  catchErrors: bo,
  consoleErrorsQueue: go,
  handleBrowserOperationError: Fl,
  handleCopilotError: Te,
  handleErrorDuringOperation: Ul,
  handleServerOperationErrorIfNeeded: zl,
  installErrorHandlers: po,
  showNotReactFlowProject: Kl
}, Symbol.toStringTag, { value: "Module" })), mo = window.Vaadin.copilot._previewState;
if (!mo)
  throw new Error("Tried to access copilot preview state before it was initialized.");
const _o = () => {
  Wl().then((e) => g.setUserInfo(e)).catch((e) => Te("Failed to load userInfo", e));
}, Wl = async () => zi(`${Ce}get-user-info`, {}, (e) => (delete e.data.reqId, e.data)), Gl = async () => Fi(() => g.userInfo), ou = async () => (await Gl()).vaadiner;
E.on("copilot-prokey-received", (e) => {
  _o(), e.preventDefault();
});
function Yl() {
  const e = window.navigator.userAgent;
  return e.indexOf("Windows") !== -1 ? "Windows" : e.indexOf("Mac") !== -1 ? "Mac" : e.indexOf("Linux") !== -1 ? "Linux" : null;
}
function Jl() {
  return Yl() === "Mac";
}
function Xl() {
  return Jl() ? "⌘" : "Ctrl";
}
function Zl(e) {
  return e.composed && e.composedPath().map((t) => t.localName).some((t) => t === "copilot-spotlight");
}
function Ql(e) {
  return e.composed && e.composedPath().map((t) => t.localName).some((t) => t === "copilot-drawer-panel" || t === "copilot-section-panel-wrapper");
}
let mn = !1, rt = 0;
const Rr = (e) => {
  if (dn.isActivationShortcut())
    if (e.key === "Shift" && !e.ctrlKey && !e.altKey && !e.metaKey)
      mn = !0;
    else if (mn && e.shiftKey && (e.key === "Control" || e.key === "Meta")) {
      if (rt++, rt === 2) {
        g.toggleActive("shortcut"), rt = 0;
        return;
      }
      setTimeout(() => {
        rt = 0;
      }, 500);
    } else
      mn = !1, rt = 0;
  g.active && ec(e);
}, ec = (e) => {
  const t = Zl(e);
  if (e.shiftKey && e.code === "Space")
    g.setSpotlightActive(!g.spotlightActive), e.stopPropagation(), e.preventDefault();
  else if (e.key === "Escape") {
    if (e.stopPropagation(), g.loginCheckActive) {
      g.setLoginCheckActive(!1);
      return;
    }
    E.emit("close-drawers", {}), g.setSpotlightActive(!1);
  } else !Ql(e) && !t && tc(e) ? (E.emit("delete-selected", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "d" && !t ? (E.emit("duplicate-selected", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "b" && !t ? (E.emit("show-selected-in-ide", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "z" ? g.idePluginState?.supportedActions?.find((n) => n === "undo") && (E.emit("undoRedo", { undo: !e.shiftKey }), e.preventDefault(), e.stopPropagation()) : Ke(e.target) && E.emit("keyboard-event", { event: e });
}, tc = (e) => (e.key === "Backspace" || e.key === "Delete") && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey, se = Xl(), au = {
  toggleCopilot: `<kbd>⇧</kbd> + <kbd>${se}</kbd> <kbd>${se}</kbd>`,
  toggleCommandWindow: "<kbd>⇧</kbd> + <kbd>Space</kbd>",
  undo: `<kbd>${se}</kbd> + <kbd>Z</kbd>`,
  redo: `<kbd>${se}</kbd> + <kbd>⇧</kbd> + <kbd>Z</kbd>`,
  duplicate: `<kbd>${se}</kbd> + <kbd>D</kbd>`,
  goToSource: `<kbd>${se}</kbd> + <kbd>B</kbd>`,
  selectParent: "<kbd>←</kbd>",
  selectPreviousSibling: "<kbd>↑</kbd>",
  selectNextSibling: "<kbd>↓</kbd>",
  delete: "<kbd>DEL</kbd>",
  copy: `<kbd>${se}</kbd> + <kbd>C</kbd>`,
  paste: `<kbd>${se}</kbd> + <kbd>V</kbd>`
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yo = Symbol.for(""), nc = (e) => {
  if (e?.r === yo) return e?._$litStatic$;
}, wo = (e) => ({ _$litStatic$: e, r: yo }), jr = /* @__PURE__ */ new Map(), rc = (e) => (t, ...n) => {
  const r = n.length;
  let i, o;
  const a = [], s = [];
  let l, c = 0, u = !1;
  for (; c < r; ) {
    for (l = t[c]; c < r && (o = n[c], (i = nc(o)) !== void 0); ) l += i + t[++c], u = !0;
    c !== r && s.push(o), a.push(l), c++;
  }
  if (c === r && a.push(t[r]), u) {
    const d = a.join("$$lit$$");
    (t = jr.get(d)) === void 0 && (a.raw = a, jr.set(d, t = a)), n = s;
  }
  return e(t, ...n);
}, ut = rc(Yt);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ic } = Ol, Mr = () => document.createComment(""), it = (e, t, n) => {
  const r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
  if (n === void 0) {
    const o = r.insertBefore(Mr(), i), a = r.insertBefore(Mr(), i);
    n = new ic(o, a, e, e.options);
  } else {
    const o = n._$AB.nextSibling, a = n._$AM, s = a !== e;
    if (s) {
      let l;
      n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (l = e._$AU) !== a._$AU && n._$AP(l);
    }
    if (o !== i || s) {
      let l = n._$AA;
      for (; l !== o; ) {
        const c = l.nextSibling;
        r.insertBefore(l, i), l = c;
      }
    }
  }
  return n;
}, _e = (e, t, n = e) => (e._$AI(t, n), e), oc = {}, ac = (e, t = oc) => e._$AH = t, sc = (e) => e._$AH, _n = (e) => {
  e._$AP?.(!1, !0);
  let t = e._$AA;
  const n = e._$AB.nextSibling;
  for (; t !== n; ) {
    const r = t.nextSibling;
    t.remove(), t = r;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lr = (e, t, n) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = t; i <= n; i++) r.set(e[i], i);
  return r;
}, Eo = lo(class extends co {
  constructor(e) {
    if (super(e), e.type !== so.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, n) {
    let r;
    n === void 0 ? n = t : t !== void 0 && (r = t);
    const i = [], o = [];
    let a = 0;
    for (const s of e) i[a] = r ? r(s, a) : a, o[a] = n(s, a), a++;
    return { values: o, keys: i };
  }
  render(e, t, n) {
    return this.dt(e, t, n).values;
  }
  update(e, [t, n, r]) {
    const i = sc(e), { values: o, keys: a } = this.dt(t, n, r);
    if (!Array.isArray(i)) return this.ut = a, o;
    const s = this.ut ??= [], l = [];
    let c, u, d = 0, v = i.length - 1, p = 0, m = o.length - 1;
    for (; d <= v && p <= m; ) if (i[d] === null) d++;
    else if (i[v] === null) v--;
    else if (s[d] === a[p]) l[p] = _e(i[d], o[p]), d++, p++;
    else if (s[v] === a[m]) l[m] = _e(i[v], o[m]), v--, m--;
    else if (s[d] === a[m]) l[m] = _e(i[d], o[m]), it(e, l[m + 1], i[d]), d++, m--;
    else if (s[v] === a[p]) l[p] = _e(i[v], o[p]), it(e, i[d], i[v]), v--, p++;
    else if (c === void 0 && (c = Lr(a, p, m), u = Lr(s, d, v)), c.has(s[d])) if (c.has(s[v])) {
      const w = u.get(a[p]), N = w !== void 0 ? i[w] : null;
      if (N === null) {
        const G = it(e, i[d]);
        _e(G, o[p]), l[p] = G;
      } else l[p] = _e(N, o[p]), it(e, i[d], N), i[w] = null;
      p++;
    } else _n(i[v]), v--;
    else _n(i[d]), d++;
    for (; p <= m; ) {
      const w = it(e, l[m + 1]);
      _e(w, o[p]), l[p++] = w;
    }
    for (; d <= v; ) {
      const w = i[d++];
      w !== null && _n(w);
    }
    return this.ut = a, ac(e, l), he;
  }
}), kt = /* @__PURE__ */ new Map(), lc = (e) => {
  const n = Q.panels.filter((r) => !r.floating && r.panel === e).sort((r, i) => r.panelOrder - i.panelOrder);
  return ut`
    ${Eo(
    n,
    (r) => r.tag,
    (r) => {
      const i = wo(r.tag);
      return ut` <copilot-section-panel-wrapper panelTag="${i}">
          ${Q.shouldRender(r.tag) ? ut`<${i} slot="content"></${i}>` : O}
        </copilot-section-panel-wrapper>`;
    }
  )}
  `;
}, cc = () => {
  const e = Q.panels;
  return ut`
    ${Eo(
    e.filter((t) => t.floating),
    (t) => t.tag,
    (t) => {
      const n = wo(t.tag);
      return ut`
                        <copilot-section-panel-wrapper panelTag="${n}">
                            <${n} slot="content"></${n}>
                        </copilot-section-panel-wrapper>`;
    }
  )}
  `;
}, su = (e) => {
  const t = e.panelTag, n = e.querySelector('[slot="content"]');
  n && kt.set(t, n);
}, lu = (e) => {
  if (kt.has(e.panelTag)) {
    const t = kt.get(e.panelTag);
    e.querySelector('[slot="content"]').replaceWith(t);
  }
  kt.delete(e.panelTag);
}, x = [];
for (let e = 0; e < 256; ++e)
  x.push((e + 256).toString(16).slice(1));
function uc(e, t = 0) {
  return (x[e[t + 0]] + x[e[t + 1]] + x[e[t + 2]] + x[e[t + 3]] + "-" + x[e[t + 4]] + x[e[t + 5]] + "-" + x[e[t + 6]] + x[e[t + 7]] + "-" + x[e[t + 8]] + x[e[t + 9]] + "-" + x[e[t + 10]] + x[e[t + 11]] + x[e[t + 12]] + x[e[t + 13]] + x[e[t + 14]] + x[e[t + 15]]).toLowerCase();
}
let yn;
const dc = new Uint8Array(16);
function fc() {
  if (!yn) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    yn = crypto.getRandomValues.bind(crypto);
  }
  return yn(dc);
}
const hc = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ur = { randomUUID: hc };
function Oo(e, t, n) {
  if (Ur.randomUUID && !t && !e)
    return Ur.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || fc)();
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, uc(r);
}
const Vt = [], at = [], cu = async (e, t, n) => {
  let r, i;
  t.reqId = Oo();
  const o = new Promise((a, s) => {
    r = a, i = s;
  });
  return Vt.push({
    handleMessage(a) {
      if (a?.data?.reqId !== t.reqId)
        return !1;
      try {
        r(n(a));
      } catch (s) {
        i(s.toString());
      }
      return !0;
    }
  }), fe(e, t), o;
};
function vc(e) {
  for (const t of Vt)
    if (t.handleMessage(e))
      return Vt.splice(Vt.indexOf(t), 1), !0;
  if (E.emitUnsafe({ type: e.command, data: e.data }))
    return !0;
  for (const t of So())
    if (Ao(t, e))
      return !0;
  return at.push(e), !1;
}
function Ao(e, t) {
  return e.handleMessage?.call(e, t);
}
function pc() {
  if (at.length)
    for (const e of So())
      for (let t = 0; t < at.length; t++)
        Ao(e, at[t]) && (at.splice(t, 1), t--);
}
function So() {
  const e = document.querySelector("copilot-main");
  return e ? e.renderRoot.querySelectorAll("copilot-section-panel-wrapper *") : [];
}
const gc = ":host{--gray-h: 220;--gray-s: 30%;--gray-l: 30%;--gray-hsl: var(--gray-h) var(--gray-s) var(--gray-l);--gray: hsl(var(--gray-hsl));--gray-50: hsl(var(--gray-hsl) / .05);--gray-100: hsl(var(--gray-hsl) / .1);--gray-150: hsl(var(--gray-hsl) / .16);--gray-200: hsl(var(--gray-hsl) / .24);--gray-250: hsl(var(--gray-hsl) / .34);--gray-300: hsl(var(--gray-hsl) / .46);--gray-350: hsl(var(--gray-hsl) / .6);--gray-400: hsl(var(--gray-hsl) / .7);--gray-450: hsl(var(--gray-hsl) / .8);--gray-500: hsl(var(--gray-hsl) / .9);--gray-550: hsl(var(--gray-hsl));--gray-600: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 2%));--gray-650: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 4%));--gray-700: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 8%));--gray-750: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 12%));--gray-800: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 20%));--gray-850: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 23%));--gray-900: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 30%));--blue-h: 220;--blue-s: 90%;--blue-l: 53%;--blue-hsl: var(--blue-h) var(--blue-s) var(--blue-l);--blue: hsl(var(--blue-hsl));--blue-50: hsl(var(--blue-hsl) / .05);--blue-100: hsl(var(--blue-hsl) / .1);--blue-150: hsl(var(--blue-hsl) / .2);--blue-200: hsl(var(--blue-hsl) / .3);--blue-250: hsl(var(--blue-hsl) / .4);--blue-300: hsl(var(--blue-hsl) / .5);--blue-350: hsl(var(--blue-hsl) / .6);--blue-400: hsl(var(--blue-hsl) / .7);--blue-450: hsl(var(--blue-hsl) / .8);--blue-500: hsl(var(--blue-hsl) / .9);--blue-550: hsl(var(--blue-hsl));--blue-600: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 4%));--blue-650: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 8%));--blue-700: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 12%));--blue-750: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 15%));--blue-800: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 18%));--blue-850: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 24%));--blue-900: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 27%));--purple-h: 246;--purple-s: 90%;--purple-l: 60%;--purple-hsl: var(--purple-h) var(--purple-s) var(--purple-l);--purple: hsl(var(--purple-hsl));--purple-50: hsl(var(--purple-hsl) / .05);--purple-100: hsl(var(--purple-hsl) / .1);--purple-150: hsl(var(--purple-hsl) / .2);--purple-200: hsl(var(--purple-hsl) / .3);--purple-250: hsl(var(--purple-hsl) / .4);--purple-300: hsl(var(--purple-hsl) / .5);--purple-350: hsl(var(--purple-hsl) / .6);--purple-400: hsl(var(--purple-hsl) / .7);--purple-450: hsl(var(--purple-hsl) / .8);--purple-500: hsl(var(--purple-hsl) / .9);--purple-550: hsl(var(--purple-hsl));--purple-600: hsl(var(--purple-h) calc(var(--purple-s) - 4%) calc(var(--purple-l) - 2%));--purple-650: hsl(var(--purple-h) calc(var(--purple-s) - 8%) calc(var(--purple-l) - 4%));--purple-700: hsl(var(--purple-h) calc(var(--purple-s) - 15%) calc(var(--purple-l) - 7%));--purple-750: hsl(var(--purple-h) calc(var(--purple-s) - 23%) calc(var(--purple-l) - 11%));--purple-800: hsl(var(--purple-h) calc(var(--purple-s) - 24%) calc(var(--purple-l) - 15%));--purple-850: hsl(var(--purple-h) calc(var(--purple-s) - 24%) calc(var(--purple-l) - 19%));--purple-900: hsl(var(--purple-h) calc(var(--purple-s) - 27%) calc(var(--purple-l) - 23%));--green-h: 150;--green-s: 80%;--green-l: 42%;--green-hsl: var(--green-h) var(--green-s) var(--green-l);--green: hsl(var(--green-hsl));--green-50: hsl(var(--green-hsl) / .05);--green-100: hsl(var(--green-hsl) / .1);--green-150: hsl(var(--green-hsl) / .2);--green-200: hsl(var(--green-hsl) / .3);--green-250: hsl(var(--green-hsl) / .4);--green-300: hsl(var(--green-hsl) / .5);--green-350: hsl(var(--green-hsl) / .6);--green-400: hsl(var(--green-hsl) / .7);--green-450: hsl(var(--green-hsl) / .8);--green-500: hsl(var(--green-hsl) / .9);--green-550: hsl(var(--green-hsl));--green-600: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 2%));--green-650: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 4%));--green-700: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 8%));--green-750: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 12%));--green-800: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 15%));--green-850: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 19%));--green-900: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 23%));--yellow-h: 38;--yellow-s: 98%;--yellow-l: 64%;--yellow-hsl: var(--yellow-h) var(--yellow-s) var(--yellow-l);--yellow: hsl(var(--yellow-hsl));--yellow-50: hsl(var(--yellow-hsl) / .07);--yellow-100: hsl(var(--yellow-hsl) / .12);--yellow-150: hsl(var(--yellow-hsl) / .2);--yellow-200: hsl(var(--yellow-hsl) / .3);--yellow-250: hsl(var(--yellow-hsl) / .4);--yellow-300: hsl(var(--yellow-hsl) / .5);--yellow-350: hsl(var(--yellow-hsl) / .6);--yellow-400: hsl(var(--yellow-hsl) / .7);--yellow-450: hsl(var(--yellow-hsl) / .8);--yellow-500: hsl(var(--yellow-hsl) / .9);--yellow-550: hsl(var(--yellow-hsl));--yellow-600: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 5%));--yellow-650: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 10%));--yellow-700: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 15%));--yellow-750: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 20%));--yellow-800: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 25%));--yellow-850: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 30%));--yellow-900: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 35%));--red-h: 355;--red-s: 75%;--red-l: 55%;--red-hsl: var(--red-h) var(--red-s) var(--red-l);--red: hsl(var(--red-hsl));--red-50: hsl(var(--red-hsl) / .05);--red-100: hsl(var(--red-hsl) / .1);--red-150: hsl(var(--red-hsl) / .2);--red-200: hsl(var(--red-hsl) / .3);--red-250: hsl(var(--red-hsl) / .4);--red-300: hsl(var(--red-hsl) / .5);--red-350: hsl(var(--red-hsl) / .6);--red-400: hsl(var(--red-hsl) / .7);--red-450: hsl(var(--red-hsl) / .8);--red-500: hsl(var(--red-hsl) / .9);--red-550: hsl(var(--red-hsl));--red-600: hsl(var(--red-h) calc(var(--red-s) - 5%) calc(var(--red-l) - 2%));--red-650: hsl(var(--red-h) calc(var(--red-s) - 10%) calc(var(--red-l) - 4%));--red-700: hsl(var(--red-h) calc(var(--red-s) - 15%) calc(var(--red-l) - 8%));--red-750: hsl(var(--red-h) calc(var(--red-s) - 20%) calc(var(--red-l) - 12%));--red-800: hsl(var(--red-h) calc(var(--red-s) - 25%) calc(var(--red-l) - 15%));--red-850: hsl(var(--red-h) calc(var(--red-s) - 30%) calc(var(--red-l) - 19%));--red-900: hsl(var(--red-h) calc(var(--red-s) - 35%) calc(var(--red-l) - 23%));--codeblock-bg: #f4f4f4;--vaadin-logo-blue: #00b4f0}:host(.dark){--gray-s: 15%;--gray-l: 70%;--gray-600: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 6%));--gray-650: hsl(var(--gray-h) calc(var(--gray-s) - 5%) calc(var(--gray-l) + 14%));--gray-700: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 26%));--gray-750: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 36%));--gray-800: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 48%));--gray-850: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 62%));--gray-900: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 70%));--blue-s: 90%;--blue-l: 58%;--blue-600: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 6%));--blue-650: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 12%));--blue-700: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 17%));--blue-750: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 22%));--blue-800: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 28%));--blue-850: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 35%));--blue-900: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 43%));--purple-600: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 4%));--purple-650: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 9%));--purple-700: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 12%));--purple-750: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 18%));--purple-800: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 24%));--purple-850: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 29%));--purple-900: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 33%));--green-600: hsl(calc(var(--green-h) - 1) calc(var(--green-s) - 5%) calc(var(--green-l) + 5%));--green-650: hsl(calc(var(--green-h) - 2) calc(var(--green-s) - 10%) calc(var(--green-l) + 12%));--green-700: hsl(calc(var(--green-h) - 4) calc(var(--green-s) - 15%) calc(var(--green-l) + 20%));--green-750: hsl(calc(var(--green-h) - 6) calc(var(--green-s) - 20%) calc(var(--green-l) + 29%));--green-800: hsl(calc(var(--green-h) - 8) calc(var(--green-s) - 25%) calc(var(--green-l) + 37%));--green-850: hsl(calc(var(--green-h) - 10) calc(var(--green-s) - 30%) calc(var(--green-l) + 42%));--green-900: hsl(calc(var(--green-h) - 12) calc(var(--green-s) - 35%) calc(var(--green-l) + 48%));--yellow-600: hsl(calc(var(--yellow-h) + 1) var(--yellow-s) calc(var(--yellow-l) + 4%));--yellow-650: hsl(calc(var(--yellow-h) + 2) var(--yellow-s) calc(var(--yellow-l) + 7%));--yellow-700: hsl(calc(var(--yellow-h) + 4) var(--yellow-s) calc(var(--yellow-l) + 11%));--yellow-750: hsl(calc(var(--yellow-h) + 6) var(--yellow-s) calc(var(--yellow-l) + 16%));--yellow-800: hsl(calc(var(--yellow-h) + 8) var(--yellow-s) calc(var(--yellow-l) + 20%));--yellow-850: hsl(calc(var(--yellow-h) + 10) var(--yellow-s) calc(var(--yellow-l) + 24%));--yellow-900: hsl(calc(var(--yellow-h) + 12) var(--yellow-s) calc(var(--yellow-l) + 29%));--red-600: hsl(calc(var(--red-h) - 1) calc(var(--red-s) - 5%) calc(var(--red-l) + 3%));--red-650: hsl(calc(var(--red-h) - 2) calc(var(--red-s) - 10%) calc(var(--red-l) + 7%));--red-700: hsl(calc(var(--red-h) - 4) calc(var(--red-s) - 15%) calc(var(--red-l) + 14%));--red-750: hsl(calc(var(--red-h) - 6) calc(var(--red-s) - 20%) calc(var(--red-l) + 19%));--red-800: hsl(calc(var(--red-h) - 8) calc(var(--red-s) - 25%) calc(var(--red-l) + 24%));--red-850: hsl(calc(var(--red-h) - 10) calc(var(--red-s) - 30%) calc(var(--red-l) + 30%));--red-900: hsl(calc(var(--red-h) - 12) calc(var(--red-s) - 35%) calc(var(--red-l) + 36%));--codeblock-bg: var(--gray-100)}", bc = ":host{--font-family: Inter, system-ui, ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;--monospace-font-family: Inconsolata, Monaco, Consolas, Courier New, Courier, monospace;--font-size-0: .6875rem;--font-size-1: .75rem;--font-size-2: .875rem;--font-size-3: 1rem;--font-size-4: 1.125rem;--font-size-5: 1.25rem;--font-size-6: 1.375rem;--font-size-7: 1.5rem;--line-height-1: 1.125rem;--line-height-2: 1.25rem;--line-height-3: 1.5rem;--line-height-4: 1.75rem;--line-height-5: 2rem;--line-height-6: 2.25rem;--line-height-7: 2.5rem;--font-weight-bold: 500;--font-weight-strong: 600;--font: normal 400 var(--font-size-3) / var(--line-height-3) var(--font-family);--font-bold: normal var(--font-weight-bold) var(--font-size-3) / var(--line-height-3) var(--font-family);--font-strong: normal var(--font-weight-strong) var(--font-size-3) / var(--line-height-3) var(--font-family);--font-small: normal 400 var(--font-size-2) / var(--line-height-2) var(--font-family);--font-small-bold: normal var(--font-weight-bold) var(--font-size-2) / var(--line-height-2) var(--font-family);--font-small-strong: normal var(--font-weight-strong) var(--font-size-2) / var(--line-height-2) var(--font-family);--font-xsmall: normal 400 var(--font-size-1) / var(--line-height-1) var(--font-family);--font-xsmall-bold: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-xsmall-strong: normal var(--font-weight-strong) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-button: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-tooltip: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-2) var(--font-family);--radius-1: .1875rem;--radius-2: .375rem;--radius-3: .75rem;--space-25: 2px;--space-50: 4px;--space-75: 6px;--space-100: 8px;--space-150: 12px;--space-200: 16px;--space-300: 24px;--space-400: 32px;--space-500: 40px;--space-600: 48px;--space-700: 56px;--space-800: 64px;--space-900: 72px;--z-index-component-selector: 100;--z-index-floating-panel: 101;--z-index-drawer: 150;--z-index-opened-drawer: 151;--z-index-spotlight: 200;--z-index-popover: 300;--z-index-activation-button: 1000;--duration-1: .1s;--duration-2: .2s;--duration-3: .3s;--duration-4: .4s;--button-background: var(--gray-100);--button-background-hover: var(--gray-150)}:host{--lumo-font-family: var(--font-family);--lumo-font-size-xs: var(--font-size-1);--lumo-font-size-s: var(--font-size-2);--lumo-font-size-m: var(--font-size-3);--lumo-font-size-l: var(--font-size-4);--lumo-font-size-xl: var(--font-size-5);--lumo-font-size-xxl: var(--font-size-6);--lumo-font-size-xxxl: var(--font-size-7);--lumo-line-height-s: var(--line-height-2);--lumo-line-height-m: var(--line-height-3);--lumo-line-height-l: var(--line-height-4);--lumo-border-radius-s: var(--radius-1);--lumo-border-radius-m: var(--radius-2);--lumo-border-radius-l: var(--radius-3);--lumo-base-color: var(--surface-0);--lumo-body-text-color: var(--color-high-contrast);--lumo-header-text-color: var(--color-high-contrast);--lumo-secondary-text-color: var(--color);--lumo-tertiary-text-color: var(--color);--lumo-error-text-color: var(--color-danger);--lumo-primary-text-color: var(--color-high-contrast);--lumo-primary-color: var(--color-high-contrast);--lumo-primary-color-50pct: var(--color-accent);--lumo-primary-contrast-color: var(--lumo-secondary-text-color);--lumo-space-xs: var(--space-50);--lumo-space-s: var(--space-100);--lumo-space-m: var(--space-200);--lumo-space-l: var(--space-300);--lumo-space-xl: var(--space-500);--lumo-icon-size-xs: var(--font-size-1);--lumo-icon-size-s: var(--font-size-2);--lumo-icon-size-m: var(--font-size-3);--lumo-icon-size-l: var(--font-size-4);--lumo-icon-size-xl: var(--font-size-5)}:host{color-scheme:light;--surface-0: hsl(var(--gray-h) var(--gray-s) 90% / .8);--surface-1: hsl(var(--gray-h) var(--gray-s) 95% / .8);--surface-2: hsl(var(--gray-h) var(--gray-s) 100% / .8);--surface-background: linear-gradient( hsl(var(--gray-h) var(--gray-s) 95% / .7), hsl(var(--gray-h) var(--gray-s) 95% / .65) );--surface-glow: radial-gradient(circle at 30% 0%, hsl(var(--gray-h) var(--gray-s) 98% / .7), transparent 50%);--surface-border-glow: radial-gradient(at 50% 50%, hsl(var(--purple-h) 90% 90% / .8) 0, transparent 50%);--surface: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, hsl(var(--gray-h) var(--gray-s) 98% / .2);--surface-with-border-glow: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, var(--surface-border-glow) no-repeat border-box 0 0 / var(--glow-size, 600px) var(--glow-size, 600px);--surface-border-color: hsl(var(--gray-h) var(--gray-s) 100% / .7);--surface-backdrop-filter: blur(10px);--surface-box-shadow-1: 0 0 0 .5px hsl(var(--gray-h) var(--gray-s) 5% / .15), 0 6px 12px -1px hsl(var(--shadow-hsl) / .3);--surface-box-shadow-2: 0 0 0 .5px hsl(var(--gray-h) var(--gray-s) 5% / .15), 0 24px 40px -4px hsl(var(--shadow-hsl) / .4);--background-button: linear-gradient( hsl(var(--gray-h) var(--gray-s) 98% / .4), hsl(var(--gray-h) var(--gray-s) 90% / .2) );--background-button-active: hsl(var(--gray-h) var(--gray-s) 80% / .2);--color: var(--gray-500);--color-high-contrast: var(--gray-900);--color-accent: var(--purple-700);--color-danger: var(--red-700);--border-color: var(--gray-150);--border-color-high-contrast: var(--gray-300);--border-color-button: var(--gray-350);--border-color-popover: hsl(var(--gray-hsl) / .08);--border-color-dialog: hsl(var(--gray-hsl) / .08);--accent-color: var(--purple-600);--selection-color: hsl(var(--blue-hsl));--shadow-hsl: var(--gray-h) var(--gray-s) 20%;--lumo-contrast-5pct: var(--gray-100);--lumo-contrast-10pct: var(--gray-200);--lumo-contrast-60pct: var(--gray-400);--lumo-contrast-80pct: var(--gray-600);--lumo-contrast-90pct: var(--gray-800);--card-bg: rgba(255, 255, 255, .5);--card-hover-bg: rgba(255, 255, 255, .65);--card-open-bg: rgba(255, 255, 255, .8);--card-border: 1px solid rgba(0, 50, 100, .15);--card-open-shadow: 0px 1px 4px -1px rgba(28, 52, 84, .26);--card-section-border: var(--card-border);--card-field-bg: var(--lumo-contrast-5pct);--indicator-border: white}:host(.dark){color-scheme:dark;--surface-0: hsl(var(--gray-h) var(--gray-s) 10% / .85);--surface-1: hsl(var(--gray-h) var(--gray-s) 14% / .85);--surface-2: hsl(var(--gray-h) var(--gray-s) 18% / .85);--surface-background: linear-gradient( hsl(var(--gray-h) var(--gray-s) 8% / .65), hsl(var(--gray-h) var(--gray-s) 8% / .7) );--surface-glow: radial-gradient( circle at 30% 0%, hsl(var(--gray-h) calc(var(--gray-s) * 2) 90% / .12), transparent 50% );--surface: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, hsl(var(--gray-h) var(--gray-s) 20% / .4);--surface-border-glow: hsl(var(--gray-h) var(--gray-s) 20% / .4) radial-gradient(at 50% 50%, hsl(250 40% 80% / .4) 0, transparent 50%);--surface-border-color: hsl(var(--gray-h) var(--gray-s) 50% / .2);--surface-box-shadow-1: 0 0 0 .5px hsl(var(--purple-h) 40% 5% / .4), 0 6px 12px -1px hsl(var(--shadow-hsl) / .4);--surface-box-shadow-2: 0 0 0 .5px hsl(var(--purple-h) 40% 5% / .4), 0 24px 40px -4px hsl(var(--shadow-hsl) / .5);--color: var(--gray-650);--background-button: linear-gradient( hsl(var(--gray-h) calc(var(--gray-s) * 2) 80% / .1), hsl(var(--gray-h) calc(var(--gray-s) * 2) 80% / 0) );--background-button-active: hsl(var(--gray-h) var(--gray-s) 10% / .1);--border-color-popover: hsl(var(--gray-h) var(--gray-s) 90% / .1);--border-color-dialog: hsl(var(--gray-h) var(--gray-s) 90% / .1);--shadow-hsl: 0 0% 0%;--lumo-disabled-text-color: var(--lumo-contrast-60pct);--card-bg: rgba(255, 255, 255, .05);--card-hover-bg: rgba(255, 255, 255, .065);--card-open-bg: rgba(255, 255, 255, .1);--card-border: 1px solid rgba(255, 255, 255, .11);--card-open-shadow: 0px 1px 4px -1px rgba(0, 0, 0, .26);--card-section-border: var(--card-border);--card-field-bg: var(--lumo-contrast-10pct);--indicator-border: var(--lumo-base-color)}", mc = "button{-webkit-appearance:none;appearance:none;background:var(--background-button);background-origin:border-box;font:var(--font-button);color:var(--color-high-contrast);border:1px solid var(--border-color);border-radius:var(--radius-2);padding:var(--space-25) var(--space-100)}button:focus-visible{outline:2px solid var(--blue-500);outline-offset:2px}button:active:not(:disabled){background:var(--background-button-active)}button:disabled{color:var(--gray-400);background:transparent}", _c = ":is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay){z-index:var(--z-index-popover)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay):first-of-type{padding-top:0}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay)::part(overlay){color:inherit;font:inherit;background:var(--surface);-webkit-backdrop-filter:var(--surface-backdrop-filter);backdrop-filter:var(--surface-backdrop-filter);border-radius:var(--radius-2);border:1px solid var(--surface-border-color);box-shadow:var(--surface-box-shadow-1)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay)::part(content){padding:var(--space-50)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item){color:var(--color-high-contrast);font:var(--font-small);display:flex;align-items:center;cursor:default;padding:var(--space-75) var(--space-100);min-height:0;border-radius:var(--radius-1);--_lumo-item-selected-icon-display: none}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item)[disabled],:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item)[disabled] .hint,:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item)[disabled] vaadin-icon{color:var(--lumo-disabled-text-color)}:is(vaadin-context-menu-item,vaadin-menu-bar-item)[expanded]{background:var(--gray-200)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item):not([disabled]):hover{background:var(--color-high-contrast);color:var(--surface-2);--lumo-tertiary-text-color: var(--surface-2);--color: currentColor;--border-color: var(--surface-0)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item)[focus-ring]{outline:2px solid var(--selection-color);outline-offset:-2px}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item):is([aria-haspopup=true]):after{margin-inline-end:calc(var(--space-200) * -1);margin-right:unset}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item).danger{color:var(--color-danger);--color: currentColor}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item).danger:not([disabled]):hover{background-color:var(--color-danger)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item)::part(content){display:flex;align-items:center;gap:var(--space-100)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item,.custom-menu-item) vaadin-icon{width:1em;height:1em;padding:0;color:var(--color)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay) hr{margin:var(--space-50)}:is(vaadin-context-menu-item,vaadin-select-item,vaadin-menu-bar-item,.custom-menu-item) .label{padding-inline-end:var(--space-300)}:is(vaadin-context-menu-item,vaadin-select-item,vaadin-menu-bar-item,.custom-menu-item) .hint{margin-inline-start:auto;color:var(--color)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,.custom-menu-item) kbd{display:inline-block;border-radius:var(--radius-1);border:1px solid var(--border-color);min-width:1em;min-height:1em;text-align:center;margin:0 .1em;padding:.1em .25em;box-sizing:border-box;font-size:var(--font-size-1);font-family:var(--font-family);line-height:1}:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info){justify-content:space-between}:is(:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info)) div.warning{--small-text-color: var(--yellow-700)}:is(:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info)) div.error{--small-text-color: var(--red)}:is(:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info)) div.user{font:var(--font-bold);font-size:inherit}:is(:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info)) div.portrait{width:32px;height:32px;border-radius:50%;background-size:cover}:is(:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info)) div.icon{width:8px;height:8px;margin:0 .1em;background-color:var(--small-text-color)}:is(:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info)) div.icon.warning{border-radius:4px}:is(:is(copilot-activation-button-development-workflow),:is(copilot-activation-button-user-info)) div.status{font-size:var(--font-size-0);color:var(--small-text-color)}:is(copilot-alignment-overlay)::part(content){padding:0}:is(.padding-values-overlay){--lumo-base-color: var(--selection-color);--color-high-contrast: white}:is(.padding-values-overlay) vaadin-combo-box-item:hover{color:#272c35d9}", yc = "code.codeblock{background:var(--codeblock-bg);border-radius:var(--radius-2);display:block;font-family:var(--monospace-font-family);font-size:var(--font-size-1);line-height:var(--line-height-1);overflow:hidden;padding:.3125rem 1.75rem .3125rem var(--space-100);position:relative;text-overflow:ellipsis;white-space:pre;min-height:var(--line-height-1)}copilot-copy{position:absolute;right:0;top:0}copilot-copy button{align-items:center;background:none;border:1px solid transparent;border-radius:var(--radius-2);color:var(--color);display:flex;font:var(--font-button);height:1.75rem;justify-content:center;padding:0;width:1.75rem}copilot-copy button:hover{color:var(--color-high-contrast)}", wc = "vaadin-dialog-overlay::part(overlay){background:#fff}vaadin-dialog-overlay::part(content){background:var(--surface);font:var(--font-xsmall);padding:var(--space-300)}vaadin-dialog-overlay::part(header){background:var(--surface);font:var(--font-xsmall-strong);border-bottom:1px solid var(--border-color);padding:var(--space-100) var(--space-150)}vaadin-dialog-overlay::part(footer){background:var(--surface);padding:var(--space-150)}vaadin-dialog-overlay::part(header-content){display:flex;line-height:normal;justify-content:space-between;width:100%;align-items:center}vaadin-dialog-overlay [slot=header-content] h2{margin:0;padding:0;font:var(--font-small-bold)}vaadin-dialog-overlay [slot=header-content] .close{line-height:0}vaadin-dialog-overlay{--vaadin-button-font-size: var(--font-size-1);--vaadin-button-height: var(--line-height-4)}vaadin-dialog-overlay vaadin-button[theme~=primary]{background-color:hsl(var(--blue-hsl))}vaadin-dialog-overlay a svg{height:12px;width:12px}.dialog-footer vaadin-button{--vaadin-button-primary-background: var(--button-background);--vaadin-button-border-radius: var(--radius-1);--vaadin-button-primary-text-color: var(--color-high-contrast);--vaadin-button-height: var(--line-height-5);font:var(--font-small-bold)}.dialog-footer vaadin-button span[slot=suffix]{display:flex}.dialog-footer vaadin-button span[slot=suffix] svg{height:14px;width:14px}", Ec = ":host{--vaadin-input-field-label-font-size: var(--font-size-1);--vaadin-select-label-font-size: var(--font-size-1);--vaadin-input-field-helper-font-size: var(--font-size-0);--vaadin-button-font-size: var(--font-size-2);--vaadin-checkbox-label-font-size: var(--font-size-1);--vaadin-input-field-background: var(--lumo-contrast-10pct);--vaadin-input-field-height: 26px;--vaadin-input-field-value-font-size: var(--font-xsmall)}";
var uu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Oc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function du(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var $t = { exports: {} }, zr;
function Ac() {
  if (zr) return $t.exports;
  zr = 1;
  function e(t, n = 100, r = {}) {
    if (typeof t != "function")
      throw new TypeError(`Expected the first parameter to be a function, got \`${typeof t}\`.`);
    if (n < 0)
      throw new RangeError("`wait` must not be negative.");
    const { immediate: i } = typeof r == "boolean" ? { immediate: r } : r;
    let o, a, s, l, c;
    function u() {
      const p = o, m = a;
      return o = void 0, a = void 0, c = t.apply(p, m), c;
    }
    function d() {
      const p = Date.now() - l;
      p < n && p >= 0 ? s = setTimeout(d, n - p) : (s = void 0, i || (c = u()));
    }
    const v = function(...p) {
      if (o && this !== o && Object.getPrototypeOf(this) === Object.getPrototypeOf(o))
        throw new Error("Debounced method called with different contexts of the same prototype.");
      o = this, a = p, l = Date.now();
      const m = i && !s;
      return s || (s = setTimeout(d, n)), m && (c = u()), c;
    };
    return Object.defineProperty(v, "isPending", {
      get() {
        return s !== void 0;
      }
    }), v.clear = () => {
      s && (clearTimeout(s), s = void 0);
    }, v.flush = () => {
      s && v.trigger();
    }, v.trigger = () => {
      c = u(), v.clear();
    }, v;
  }
  return $t.exports.debounce = e, $t.exports = e, $t.exports;
}
var Sc = /* @__PURE__ */ Ac();
const Nc = /* @__PURE__ */ Oc(Sc);
class xc {
  constructor() {
    this.documentActive = !0, this.addListeners = () => {
      window.addEventListener("pageshow", this.handleWindowVisibilityChange), window.addEventListener("pagehide", this.handleWindowVisibilityChange), window.addEventListener("focus", this.handleWindowFocusChange), window.addEventListener("blur", this.handleWindowFocusChange), document.addEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    }, this.removeListeners = () => {
      window.removeEventListener("pageshow", this.handleWindowVisibilityChange), window.removeEventListener("pagehide", this.handleWindowVisibilityChange), window.removeEventListener("focus", this.handleWindowFocusChange), window.removeEventListener("blur", this.handleWindowFocusChange), document.removeEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    }, this.handleWindowVisibilityChange = (t) => {
      t.type === "pageshow" ? this.dispatch(!0) : this.dispatch(!1);
    }, this.handleWindowFocusChange = (t) => {
      t.type === "focus" ? this.dispatch(!0) : this.dispatch(!1);
    }, this.handleDocumentVisibilityChange = () => {
      this.dispatch(!document.hidden);
    }, this.dispatch = (t) => {
      if (t !== this.documentActive) {
        const n = window.Vaadin.copilot.eventbus;
        this.documentActive = t, n.emit("document-activation-change", { active: this.documentActive });
      }
    };
  }
  copilotActivated() {
    this.addListeners();
  }
  copilotDeactivated() {
    this.removeListeners();
  }
}
const Br = new xc(), Pc = "copilot-development-setup-user-guide";
function fu() {
  un("use-dev-workflow-guide"), Q.updatePanel(Pc, { floating: !0 });
}
function No() {
  const e = g.jdkInfo;
  return e ? e.jrebel ? "success" : e.hotswapAgentFound ? !e.hotswapVersionOk || !e.runningWithExtendClassDef || !e.runningWitHotswap || !e.runningInJavaDebugMode ? "error" : "success" : "warning" : null;
}
function hu() {
  const e = g.jdkInfo;
  return e == null || No() !== "success" ? "none" : e.jrebel ? "jrebel" : e.runningWitHotswap ? "hotswap" : "none";
}
function Cc() {
  return g.idePluginState?.ide === "eclipse" ? "unsupported" : g.idePluginState !== void 0 && !g.idePluginState.active ? "warning" : "success";
}
function vu() {
  if (!g.jdkInfo)
    return { status: "success" };
  const e = No(), t = Cc();
  return e === "warning" ? t === "warning" ? { status: "warning", message: "IDE Plugin, Hotswap" } : { status: "warning", message: "Hotswap is not enabled" } : t === "warning" ? { status: "warning", message: "IDE Plugin is not active" } : e === "error" ? { status: "error", message: "Hotswap is partially enabled" } : { status: "success" };
}
function $c() {
  fe(`${Ce}get-dev-setup-info`, {}), window.Vaadin.copilot.eventbus.on("copilot-get-dev-setup-info-response", (e) => {
    if (e.detail.content) {
      const t = JSON.parse(e.detail.content);
      g.setIdePluginState(t.ideInfo), g.setJdkInfo(t.jdkInfo);
    }
  });
}
function Dc(e) {
  return Kt(e) === "PreconfiguredAuthProvider" || Kt(e) === "RouterProvider" ? !1 : Ui(e) || Ks(e);
}
function Tc(e) {
  return !Js(e);
}
const ot = /* @__PURE__ */ new WeakMap();
class kc {
  constructor() {
    this.root = null, this.flatNodes = [], this._hasFlowComponent = !1;
  }
  async init() {
    const t = zs();
    t && (await this.addToTree(t), await this.addOverlayContentToTreeIfExists("vaadin-popover-overlay"), await this.addOverlayContentToTreeIfExists("vaadin-dialog-overlay"));
  }
  getChildren(t) {
    return this.flatNodes.find((r) => r.uuid === t)?.children || [];
  }
  get allNodesFlat() {
    return this.flatNodes;
  }
  getNodeOfElement(t) {
    if (t)
      return this.flatNodes.find((n) => n.element === t);
  }
  async handleRouteContainers(t, n) {
    const r = br(t);
    if (!r && Ys(t)) {
      const i = Wt(t);
      if (i && i.nextElementSibling)
        return await this.addToTree(i.nextElementSibling, n), !0;
    }
    if (r && t.localName === "react-router-outlet") {
      for (const i of Array.from(t.children)) {
        const o = qt(i);
        o && await this.addToTree(o, n);
      }
      return !0;
    }
    return !1;
  }
  async addToTree(t, n) {
    if (await this.handleRouteContainers(t, n))
      return;
    const r = br(t);
    let i;
    if (!r)
      Dc(t) && (i = this.generateNodeFromFiber(t, n));
    else if (Tc(t)) {
      const s = this.generateNodeFromFlow(t, n);
      if (!s)
        return;
      this._hasFlowComponent = !0, i = s;
    }
    if (n)
      i && (i.parent = n, n.children || (n.children = []), n.children.push(i));
    else {
      if (!i) {
        Te("Tree root node is undefined");
        return;
      }
      this.root = i;
    }
    i && this.flatNodes.push(i);
    const o = i ?? n, a = r ? Array.from(t.children) : Bs(t);
    for (const s of a)
      await this.addToTree(s, o);
  }
  generateNodeFromFiber(t, n) {
    const r = Ui(t) ? Wt(t) : void 0, i = n?.children.length ?? 0;
    return {
      node: t,
      parent: n,
      element: r,
      depth: n && n.depth + 1 || 0,
      children: [],
      siblingIndex: i,
      isFlowComponent: !1,
      isReactComponent: !0,
      get uuid() {
        if (ot.has(t))
          return ot.get(t);
        if (t.alternate && ot.has(t.alternate))
          return ot.get(t.alternate);
        const a = Oo();
        return ot.set(t, a), a;
      },
      get name() {
        return mr(Kt(t));
      },
      get identifier() {
        return _r(r);
      },
      get nameAndIdentifier() {
        return Hr(this.name, this.identifier);
      },
      get previousSibling() {
        if (i !== 0)
          return n?.children[i - 1];
      },
      get nextSibling() {
        if (!(n === void 0 || i === n.children.length - 1))
          return n.children[i + 1];
      },
      get path() {
        return Fr(this);
      }
    };
  }
  generateNodeFromFlow(t, n) {
    const r = Gs(t);
    if (!r || this.ignoreFlowNode(n, r))
      return;
    const i = n?.children.length ?? 0;
    return {
      node: r,
      parent: n,
      element: t,
      depth: n && n.depth + 1 || 0,
      children: [],
      siblingIndex: i,
      get uuid() {
        return `${r.uiId}#${r.nodeId}`;
      },
      isFlowComponent: !0,
      isReactComponent: !1,
      get name() {
        return Ws(r) ?? mr(r.element.localName);
      },
      get identifier() {
        return _r(t);
      },
      get nameAndIdentifier() {
        return Hr(this.name, this.identifier);
      },
      get previousSibling() {
        if (i !== 0)
          return n?.children[i - 1];
      },
      get nextSibling() {
        if (!(n === void 0 || i === n.children.length - 1))
          return n.children[i + 1];
      },
      get path() {
        return Fr(this);
      }
    };
  }
  ignoreFlowNode(t, n) {
    return !!(t?.element?.localName === "vaadin-radio-button" || t?.element?.localName === "vaadin-date-time-picker" || t?.element?.localName === "vaadin-grid" || n?.javaClass?.startsWith("com.vaadin.flow.data.renderer"));
  }
  async addOverlayContentToTreeIfExists(t) {
    const n = document.body.querySelector(t);
    if (!n)
      return;
    const r = n.owner;
    if (r) {
      if (!this.getNodeOfElement(r)) {
        const i = Pe(qt(r));
        await this.addToTree(i ?? r, this.root);
      }
      for (const i of Array.from(n.children))
        await this.addToTree(i, this.getNodeOfElement(r));
    }
  }
  hasFlowComponents() {
    return this._hasFlowComponent;
  }
  findNodeByUuid(t) {
    return this.flatNodes.find((n) => n.uuid === t);
  }
  getElementByNodeUuid(t) {
    return this.findNodeByUuid(t)?.element;
  }
  findByTreePath(t) {
    if (t)
      return this.flatNodes.find((n) => n.path === t);
  }
}
function Fr(e) {
  if (!e.parent)
    return e.name;
  let t = 0;
  for (let n = 0; n < e.siblingIndex + 1; n++)
    e.parent.children[n].name === e.name && t++;
  return `${e.parent.path} > ${e.name}[${t}]`;
}
function Hr(e, t) {
  return t ? `${e} "${t}"` : e;
}
const Vc = async () => {
  const e = new kc();
  await e.init(), window.Vaadin.copilot.tree.currentTree = e;
};
var Ic = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, jc = (e, t, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Rc(t, n) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, n, i) : a(i)) || i);
  return r && i && Ic(t, n, i), i;
};
let Kr = class extends Pl {
  constructor() {
    super(...arguments), this.removers = [], this.initialized = !1, this.active = !1, this.toggleOperationInProgressAttr = () => {
      this.toggleAttribute("operation-in-progress", g.operationWaitsHmrUpdate !== void 0);
    }, this.operationInProgressCursorUpdateDebounceFunc = Nc(this.toggleOperationInProgressAttr, 500), this.overlayOutsideClickListener = (e) => {
      Ke(e.target?.owner) || (g.active || Ke(e.detail.sourceEvent.target)) && e.preventDefault();
    };
  }
  static get styles() {
    return [
      le(gc),
      le(bc),
      le(mc),
      le(_c),
      le(yc),
      le(wc),
      le(Ec),
      ul`
        :host {
          position: fixed;
          inset: 0;
          z-index: 9999;
          contain: strict;
          font: var(--font-small);
          color: var(--color);
          pointer-events: all;
          cursor: var(--cursor, default);
        }

        :host([operation-in-progress]) {
          --cursor: wait;
          --lumo-clickable-cursor: wait;
        }

        :host(:not([active])) {
          visibility: hidden !important;
          pointer-events: none;
        }

        /* Hide floating panels when not active */

        :host(:not([active])) > copilot-section-panel-wrapper {
          display: none !important;
        }
        :host(:not([active])) > copilot-section-panel-wrapper[individual] {
          display: block !important;
          visibility: visible;
          pointer-events: all;
        }

        /* Keep activation button and menu visible */

        copilot-activation-button,
        .activation-button-menu {
          visibility: visible;
          display: flex !important;
        }

        copilot-activation-button {
          pointer-events: auto;
        }

        a {
          color: var(--blue-600);
          text-decoration-color: var(--blue-200);
        }

        :host([user-select-none]) {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Needed to prevent a JS error because of monkey patched '_attachOverlay'. It is some scope issue, */
        /* where 'this._placeholder.parentNode' is undefined - the scope if 'this' gets messed up at some point. */
        /* We also don't want animations on the overlays to make the feel faster, so this is fine. */

        :is(
            vaadin-context-menu-overlay,
            vaadin-menu-bar-overlay,
            vaadin-select-overlay,
            vaadin-combo-box-overlay,
            vaadin-tooltip-overlay
          ):is([opening], [closing]),
        :is(
            vaadin-context-menu-overlay,
            vaadin-menu-bar-overlay,
            vaadin-select-overlay,
            vaadin-combo-box-overlay,
            vaadin-tooltip-overlay
          )::part(overlay) {
          animation: none !important;
        }

        :host(:not([active])) copilot-drawer-panel::before {
          animation: none;
        }

        /* Workaround for https://github.com/vaadin/web-components/issues/5400 */

        :host([active]) .activation-button-menu .activate,
        :host(:not([active])) .activation-button-menu .deactivate,
        :host(:not([active])) .activation-button-menu .toggle-spotlight {
          display: none;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.init().catch((e) => Te("Unable to initialize copilot", e));
  }
  async init() {
    if (this.initialized)
      return;
    await window.Vaadin.copilot._machineState.initializer.promise, document.body.style.setProperty("--dev-tools-button-display", "none"), await import("./copilot-global-vars-later-D3LRggv0.js"), await import("./copilot-init-step2-B1wOLEay.js"), kl(), Cl(), this.tabIndex = 0, Ct.hostConnectedCallback(), window.addEventListener("keydown", Rr), E.onSend(this.handleSendEvent), this.removers.push(E.on("close-drawers", this.closeDrawers.bind(this))), this.removers.push(
      E.on("open-attention-required-drawer", this.openDrawerIfPanelRequiresAttention.bind(this))
    ), this.removers.push(
      E.on("set-pointer-events", (t) => {
        this.style.pointerEvents = t.detail.enable ? "" : "none";
      })
    ), this.addEventListener("mousemove", this.mouseMoveListener), this.addEventListener("dragover", this.mouseMoveListener), nt.addOverlayOutsideClickEvent();
    const e = window.matchMedia("(prefers-color-scheme: dark)");
    this.classList.toggle("dark", e.matches), e.addEventListener("change", (t) => {
      this.classList.toggle("dark", e.matches);
    }), this.reaction(
      () => g.spotlightActive,
      () => {
        ue.saveSpotlightActivation(g.spotlightActive), Array.from(this.shadowRoot.querySelectorAll("copilot-section-panel-wrapper")).filter((t) => t.panelInfo?.floating === !0).forEach((t) => {
          g.spotlightActive ? t.style.setProperty("display", "none") : t.style.removeProperty("display");
        });
      }
    ), this.reaction(
      () => g.active,
      () => {
        this.toggleAttribute("active", g.active), g.active ? this.activate() : this.deactivate(), ue.saveCopilotActivation(g.active);
      }
    ), this.reaction(
      () => g.activatedAtLeastOnce,
      () => {
        _o(), $l();
      }
    ), this.reaction(
      () => g.sectionPanelDragging,
      () => {
        g.sectionPanelDragging && Array.from(this.shadowRoot.children).filter((n) => n.localName.endsWith("-overlay")).forEach((n) => {
          n.close && n.close();
        });
      }
    ), this.reaction(
      () => g.operationWaitsHmrUpdate,
      () => {
        g.operationWaitsHmrUpdate ? this.operationInProgressCursorUpdateDebounceFunc() : (this.operationInProgressCursorUpdateDebounceFunc.clear(), this.toggleOperationInProgressAttr());
      }
    ), this.reaction(
      () => Q.panels,
      () => {
        Q.panels.find((t) => t.individual) && this.requestUpdate();
      }
    ), ue.getCopilotActivation() && Gi().then(() => {
      g.setActive(!0, "restore");
    }), this.removers.push(
      E.on("user-select", (t) => {
        const { allowSelection: n } = t.detail;
        this.toggleAttribute("user-select-none", !n);
      })
    ), po(), this.initialized = !0, $c();
  }
  /**
   * Called when Copilot is activated. Good place to start attach listeners etc.
   */
  async activate() {
    un("activate"), Ct.activate(), Br.copilotActivated(), Dl(), this.openDrawerIfPanelRequiresAttention(), document.documentElement.addEventListener("mouseleave", this.mouseLeaveListener), nt.onCopilotActivation(), await Vc(), mo.loadPreviewConfiguration(), this.active = !0;
  }
  /**
   * Called when Copilot is deactivated. Good place to remove listeners etc.
   */
  deactivate() {
    this.closeDrawers(), Ct.deactivate(), Br.copilotDeactivated(), document.documentElement.removeEventListener("mouseleave", this.mouseLeaveListener), nt.onCopilotDeactivation(), this.active = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Ct.hostDisconnectedCallback(), window.removeEventListener("keydown", Rr), E.offSend(this.handleSendEvent), this.removers.forEach((e) => e()), this.removeEventListener("mousemove", this.mouseMoveListener), this.removeEventListener("dragover", this.mouseMoveListener), nt.removeOverlayOutsideClickEvent(), document.documentElement.removeEventListener("vaadin-overlay-outside-click", this.overlayOutsideClickListener);
  }
  handleSendEvent(e) {
    const t = e.detail.command, n = e.detail.data;
    fe(t, n);
  }
  /**
   * Opens the attention required drawer if there is any.
   */
  openDrawerIfPanelRequiresAttention() {
    const e = Q.getAttentionRequiredPanelConfiguration();
    if (!e)
      return;
    const t = e.panel;
    if (!t || e.floating)
      return;
    const n = this.shadowRoot.querySelector(`copilot-drawer-panel[position="${t}"]`);
    n.opened = !0;
  }
  render() {
    return Yt`
      <copilot-activation-button
        @activation-btn-clicked="${() => {
      g.toggleActive("button"), g.setLoginCheckActive(!1);
    }}"
        @spotlight-activation-changed="${(e) => {
      g.setSpotlightActive(e.detail);
    }}"
        .spotlightOn="${g.spotlightActive}">
      </copilot-activation-button>
      <copilot-component-selector></copilot-component-selector>
      <copilot-label-editor-container></copilot-label-editor-container>
      <copilot-info-tooltip></copilot-info-tooltip>
      ${this.renderDrawer("left")} ${this.renderDrawer("right")} ${this.renderDrawer("bottom")} ${cc()}
      <copilot-spotlight ?active=${g.spotlightActive && g.active}></copilot-spotlight>
      <copilot-login-check ?active=${g.loginCheckActive && g.active}></copilot-login-check>
      <copilot-notifications-container></copilot-notifications-container>
    `;
  }
  renderDrawer(e) {
    return Yt` <copilot-drawer-panel no-transition position=${e}>
      ${lc(e)}
    </copilot-drawer-panel>`;
  }
  /**
   * Closes the open drawers if any opened unless an overlay is opened from drawer.
   */
  closeDrawers() {
    const e = this.shadowRoot.querySelectorAll(`${Ce}drawer-panel`);
    if (!Array.from(e).some((o) => o.opened))
      return;
    const n = Array.from(this.shadowRoot.children).find(
      (o) => o.localName.endsWith("overlay")
    ), r = n && nt.getOwner(n);
    if (!r) {
      e.forEach((o) => {
        o.opened = !1;
      });
      return;
    }
    const i = nl(r, "copilot-drawer-panel");
    if (!i) {
      e.forEach((o) => {
        o.opened = !1;
      });
      return;
    }
    Array.from(e).filter((o) => o.position !== i.position).forEach((o) => {
      o.opened = !1;
    });
  }
  updated(e) {
    super.updated(e), this.attachActivationButtonToBody(), pc();
  }
  attachActivationButtonToBody() {
    const e = document.body.querySelectorAll("copilot-activation-button");
    e.length > 1 && e[0].remove();
  }
  mouseMoveListener(e) {
    e.composedPath().find((t) => t.localName === `${Ce}drawer-panel`) || this.closeDrawers();
  }
  mouseLeaveListener() {
    E.emit("close-drawers", {});
  }
};
Kr = jc([
  cl("copilot-main")
], Kr);
const Mc = window.Vaadin, Lc = {
  init(e) {
    Bi(
      () => window.Vaadin.devTools,
      (t) => {
        const n = t.handleFrontendMessage;
        t.handleFrontendMessage = (r) => {
          vc(r) || n.call(t, r);
        };
      }
    );
  }
};
Mc.devToolsPlugins.push(Lc);
export {
  Je as $,
  zc as A,
  Ga as B,
  kc as C,
  hu as D,
  O as E,
  Pc as F,
  fu as G,
  vu as H,
  Bc as I,
  mo as J,
  au as K,
  Nc as L,
  Pl as M,
  su as N,
  nu as O,
  Ce as P,
  lu as Q,
  Vl as R,
  Uc as S,
  Kc as T,
  un as U,
  Fc as V,
  yc as W,
  mc as X,
  Wc as Y,
  uo as Z,
  ho as _,
  Oc as a,
  Vc as a0,
  bo as a1,
  go as a2,
  Zs as a3,
  sn as a4,
  ou as a5,
  Cc as a6,
  Dn as a7,
  Ji as a8,
  Zc as a9,
  E as b,
  uu as c,
  Rs as d,
  js as e,
  qc as f,
  du as g,
  ru as h,
  Hc as i,
  g as j,
  zi as k,
  Te as l,
  cu as m,
  cl as n,
  ue as o,
  Q as p,
  Gc as q,
  le as r,
  fe as s,
  iu as t,
  ul as u,
  dn as v,
  ct as w,
  Yt as x,
  tu as y,
  No as z
};
