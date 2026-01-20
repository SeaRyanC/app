// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var t;
var i;
var o;
var r;
var e;
var f;
var c;
var s;
var a;
var h;
var p = {};
var v = [];
var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var d = Array.isArray;
function w(n2, l3) {
  for (var u4 in l3) n2[u4] = l3[u4];
  return n2;
}
function g(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _(l3, u4, t3) {
  var i4, o3, r3, e3 = {};
  for (r3 in u4) "key" == r3 ? i4 = u4[r3] : "ref" == r3 ? o3 = u4[r3] : e3[r3] = u4[r3];
  if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (r3 in l3.defaultProps) void 0 === e3[r3] && (e3[r3] = l3.defaultProps[r3]);
  return m(l3, e3, i4, o3, null);
}
function m(n2, t3, i4, o3, r3) {
  var e3 = { type: n2, props: t3, key: i4, ref: o3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == r3 ? ++u : r3, __i: -1, __u: 0 };
  return null == r3 && null != l.vnode && l.vnode(e3), e3;
}
function k(n2) {
  return n2.children;
}
function x(n2, l3) {
  this.props = n2, this.context = l3;
}
function S(n2, l3) {
  if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
  return "function" == typeof n2.type ? S(n2) : null;
}
function C(n2) {
  var l3, u4;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) {
      n2.__e = n2.__c.base = u4.__e;
      break;
    }
    return C(n2);
  }
}
function M(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || o != l.debounceRendering) && ((o = l.debounceRendering) || r)($);
}
function $() {
  for (var n2, u4, t3, o3, r3, f4, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (t3 = void 0, o3 = void 0, r3 = (o3 = (u4 = n2).__v).__e, f4 = [], c3 = [], u4.__P && ((t3 = w({}, o3)).__v = o3.__v + 1, l.vnode && l.vnode(t3), O(u4.__P, t3, o3, u4.__n, u4.__P.namespaceURI, 32 & o3.__u ? [r3] : null, f4, null == r3 ? S(o3) : r3, !!(32 & o3.__u), c3), t3.__v = o3.__v, t3.__.__k[t3.__i] = t3, N(f4, t3, c3), o3.__e = o3.__ = null, t3.__e != r3 && C(t3)));
  $.__r = 0;
}
function I(n2, l3, u4, t3, i4, o3, r3, e3, f4, c3, s3) {
  var a3, h3, y3, d3, w3, g2, _2, m3 = t3 && t3.__k || v, b = l3.length;
  for (f4 = P(u4, l3, m3, f4, b), a3 = 0; a3 < b; a3++) null != (y3 = u4.__k[a3]) && (h3 = -1 == y3.__i ? p : m3[y3.__i] || p, y3.__i = a3, g2 = O(n2, y3, h3, i4, o3, r3, e3, f4, c3, s3), d3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && B(h3.ref, null, y3), s3.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), (_2 = !!(4 & y3.__u)) || h3.__k === y3.__k ? f4 = A(y3, f4, n2, _2) : "function" == typeof y3.type && void 0 !== g2 ? f4 = g2 : d3 && (f4 = d3.nextSibling), y3.__u &= -7);
  return u4.__e = w3, f4;
}
function P(n2, l3, u4, t3, i4) {
  var o3, r3, e3, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
  for (n2.__k = new Array(i4), o3 = 0; o3 < i4; o3++) null != (r3 = l3[o3]) && "boolean" != typeof r3 && "function" != typeof r3 ? ("string" == typeof r3 || "number" == typeof r3 || "bigint" == typeof r3 || r3.constructor == String ? r3 = n2.__k[o3] = m(null, r3, null, null, null) : d(r3) ? r3 = n2.__k[o3] = m(k, { children: r3 }, null, null, null) : void 0 === r3.constructor && r3.__b > 0 ? r3 = n2.__k[o3] = m(r3.type, r3.props, r3.key, r3.ref ? r3.ref : null, r3.__v) : n2.__k[o3] = r3, f4 = o3 + h3, r3.__ = n2, r3.__b = n2.__b + 1, e3 = null, -1 != (c3 = r3.__i = L(r3, u4, f4, a3)) && (a3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i4 > s3 ? h3-- : i4 < s3 && h3++), "function" != typeof r3.type && (r3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, r3.__u |= 4))) : n2.__k[o3] = null;
  if (a3) for (o3 = 0; o3 < s3; o3++) null != (e3 = u4[o3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = S(e3)), D(e3, e3));
  return t3;
}
function A(n2, l3, u4, t3) {
  var i4, o3;
  if ("function" == typeof n2.type) {
    for (i4 = n2.__k, o3 = 0; i4 && o3 < i4.length; o3++) i4[o3] && (i4[o3].__ = n2, l3 = A(i4[o3], l3, u4, t3));
    return l3;
  }
  n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = S(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
  do {
    l3 = l3 && l3.nextSibling;
  } while (null != l3 && 8 == l3.nodeType);
  return l3;
}
function L(n2, l3, u4, t3) {
  var i4, o3, r3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
  if (null === c3 && null == e3 || s3 && e3 == c3.key && f4 == c3.type) return u4;
  if (t3 > (s3 ? 1 : 0)) {
    for (i4 = u4 - 1, o3 = u4 + 1; i4 >= 0 || o3 < l3.length; ) if (null != (c3 = l3[r3 = i4 >= 0 ? i4-- : o3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return r3;
  }
  return -1;
}
function T(n2, l3, u4) {
  "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || y.test(l3) ? u4 : u4 + "px";
}
function j(n2, l3, u4, t3, i4) {
  var o3, r3;
  n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
  else {
    if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || T(n2.style, l3, "");
    if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || T(n2.style, l3, u4[l3]);
  }
  else if ("o" == l3[0] && "n" == l3[1]) o3 = l3 != (l3 = l3.replace(f, "$1")), r3 = l3.toLowerCase(), l3 = r3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? r3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = c, n2.addEventListener(l3, o3 ? a : s, o3)) : n2.removeEventListener(l3, o3 ? a : s, o3);
  else {
    if ("http://www.w3.org/2000/svg" == i4) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
      n2[l3] = null == u4 ? "" : u4;
      break n;
    } catch (n3) {
    }
    "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
  }
}
function F(n2) {
  return function(u4) {
    if (this.l) {
      var t3 = this.l[u4.type + n2];
      if (null == u4.t) u4.t = c++;
      else if (u4.t < t3.u) return;
      return t3(l.event ? l.event(u4) : u4);
    }
  };
}
function O(n2, u4, t3, i4, o3, r3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, _2, m3, b, S2, C3, M2, $2, P2, A3, H, L2, T3, j3 = u4.type;
  if (void 0 !== u4.constructor) return null;
  128 & t3.__u && (c3 = !!(32 & t3.__u), r3 = [f4 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
  n: if ("function" == typeof j3) try {
    if (b = u4.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a3 = j3.contextType) && i4[a3.__c], M2 = a3 ? C3 ? C3.props.value : a3.__ : i4, t3.__c ? m3 = (h3 = u4.__c = t3.__c).__ = h3.__E : (S2 ? u4.__c = h3 = new j3(b, M2) : (u4.__c = h3 = new x(b, M2), h3.constructor = j3, h3.render = E), C3 && C3.sub(h3), h3.state || (h3.state = {}), h3.__n = i4, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = w({}, h3.__s)), w(h3.__s, j3.getDerivedStateFromProps(b, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) S2 && null == j3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
    else {
      if (S2 && null == j3.getDerivedStateFromProps && b !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b, M2), u4.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b, h3.__s, M2)) {
        for (u4.__v != t3.__v && (h3.props = b, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
          n3 && (n3.__ = u4);
        }), $2 = 0; $2 < h3._sb.length; $2++) h3.__h.push(h3._sb[$2]);
        h3._sb = [], h3.__h.length && e3.push(h3);
        break n;
      }
      null != h3.componentWillUpdate && h3.componentWillUpdate(b, h3.__s, M2), S2 && null != h3.componentDidUpdate && h3.__h.push(function() {
        h3.componentDidUpdate(v3, y3, _2);
      });
    }
    if (h3.context = M2, h3.props = b, h3.__P = n2, h3.__e = false, P2 = l.__r, A3 = 0, S2) {
      for (h3.state = h3.__s, h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), H = 0; H < h3._sb.length; H++) h3.__h.push(h3._sb[H]);
      h3._sb = [];
    } else do {
      h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
    } while (h3.__d && ++A3 < 25);
    h3.state = h3.__s, null != h3.getChildContext && (i4 = w(w({}, i4), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_2 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = V(a3.props.children)), f4 = I(n2, d(L2) ? L2 : [L2], u4, t3, i4, o3, r3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
  } catch (n3) {
    if (u4.__v = null, c3 || null != r3) if (n3.then) {
      for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
      r3[r3.indexOf(f4)] = null, u4.__e = f4;
    } else {
      for (T3 = r3.length; T3--; ) g(r3[T3]);
      z(u4);
    }
    else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || z(u4);
    l.__e(n3, u4, t3);
  }
  else null == r3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = q(t3.__e, u4, t3, i4, o3, r3, e3, c3, s3);
  return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
}
function z(n2) {
  n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z);
}
function N(n2, u4, t3) {
  for (var i4 = 0; i4 < t3.length; i4++) B(t3[i4], t3[++i4], t3[++i4]);
  l.__c && l.__c(u4, n2), n2.some(function(u5) {
    try {
      n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
        n3.call(u5);
      });
    } catch (n3) {
      l.__e(n3, u5.__v);
    }
  });
}
function V(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : d(n2) ? n2.map(V) : w({}, n2);
}
function q(u4, t3, i4, o3, r3, e3, f4, c3, s3) {
  var a3, h3, v3, y3, w3, _2, m3, b = i4.props || p, k3 = t3.props, x2 = t3.type;
  if ("svg" == x2 ? r3 = "http://www.w3.org/2000/svg" : "math" == x2 ? r3 = "http://www.w3.org/1998/Math/MathML" : r3 || (r3 = "http://www.w3.org/1999/xhtml"), null != e3) {
    for (a3 = 0; a3 < e3.length; a3++) if ((w3 = e3[a3]) && "setAttribute" in w3 == !!x2 && (x2 ? w3.localName == x2 : 3 == w3.nodeType)) {
      u4 = w3, e3[a3] = null;
      break;
    }
  }
  if (null == u4) {
    if (null == x2) return document.createTextNode(k3);
    u4 = document.createElementNS(r3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
  }
  if (null == x2) b === k3 || c3 && u4.data == k3 || (u4.data = k3);
  else {
    if (e3 = e3 && n.call(u4.childNodes), !c3 && null != e3) for (b = {}, a3 = 0; a3 < u4.attributes.length; a3++) b[(w3 = u4.attributes[a3]).name] = w3.value;
    for (a3 in b) if (w3 = b[a3], "children" == a3) ;
    else if ("dangerouslySetInnerHTML" == a3) v3 = w3;
    else if (!(a3 in k3)) {
      if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
      j(u4, a3, null, w3, r3);
    }
    for (a3 in k3) w3 = k3[a3], "children" == a3 ? y3 = w3 : "dangerouslySetInnerHTML" == a3 ? h3 = w3 : "value" == a3 ? _2 = w3 : "checked" == a3 ? m3 = w3 : c3 && "function" != typeof w3 || b[a3] === w3 || j(u4, a3, w3, b[a3], r3);
    if (h3) c3 || v3 && (h3.__html == v3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
    else if (v3 && (u4.innerHTML = ""), I("template" == t3.type ? u4.content : u4, d(y3) ? y3 : [y3], t3, i4, o3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : r3, e3, f4, e3 ? e3[0] : i4.__k && S(i4, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) g(e3[a3]);
    c3 || (a3 = "value", "progress" == x2 && null == _2 ? u4.removeAttribute("value") : null != _2 && (_2 !== u4[a3] || "progress" == x2 && !_2 || "option" == x2 && _2 != b[a3]) && j(u4, a3, _2, b[a3], r3), a3 = "checked", null != m3 && m3 != u4[a3] && j(u4, a3, m3, b[a3], r3));
  }
  return u4;
}
function B(n2, u4, t3) {
  try {
    if ("function" == typeof n2) {
      var i4 = "function" == typeof n2.__u;
      i4 && n2.__u(), i4 && null == u4 || (n2.__u = n2(u4));
    } else n2.current = u4;
  } catch (n3) {
    l.__e(n3, t3);
  }
}
function D(n2, u4, t3) {
  var i4, o3;
  if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current != n2.__e || B(i4, null, u4)), null != (i4 = n2.__c)) {
    if (i4.componentWillUnmount) try {
      i4.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, u4);
    }
    i4.base = i4.__P = null;
  }
  if (i4 = n2.__k) for (o3 = 0; o3 < i4.length; o3++) i4[o3] && D(i4[o3], u4, t3 || "function" != typeof n2.type);
  t3 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function E(n2, l3, u4) {
  return this.constructor(n2, u4);
}
function G(u4, t3, i4) {
  var o3, r3, e3, f4;
  t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), r3 = (o3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, e3 = [], f4 = [], O(t3, u4 = (!o3 && i4 || t3).__k = _(k, null, [u4]), r3 || p, p, t3.namespaceURI, !o3 && i4 ? [i4] : r3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !o3 && i4 ? i4 : r3 ? r3.__e : t3.firstChild, o3, f4), N(e3, u4, f4);
}
n = v.slice, l = { __e: function(n2, l3, u4, t3) {
  for (var i4, o3, r3; l3 = l3.__; ) if ((i4 = l3.__c) && !i4.__) try {
    if ((o3 = i4.constructor) && null != o3.getDerivedStateFromError && (i4.setState(o3.getDerivedStateFromError(n2)), r3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), r3 = i4.__d), r3) return i4.__E = i4;
  } catch (l4) {
    n2 = l4;
  }
  throw n2;
} }, u = 0, t = function(n2) {
  return null != n2 && void 0 === n2.constructor;
}, x.prototype.setState = function(n2, l3) {
  var u4;
  u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, u4), this.props)), n2 && w(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
}, x.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
  return n2.__v.__b - l3.__v.__b;
}, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

// node_modules/preact/hooks/dist/hooks.module.js
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var f2 = [];
var c2 = l;
var e2 = c2.__b;
var a2 = c2.__r;
var v2 = c2.diffed;
var l2 = c2.__c;
var m2 = c2.unmount;
var s2 = c2.__;
function p2(n2, t3) {
  c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
  var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
}
function d2(n2) {
  return o2 = 1, h2(D2, n2);
}
function h2(n2, u4, i4) {
  var o3 = p2(t2++, 2);
  if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
    var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
    t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
  }], o3.__c = r2, !r2.__f)) {
    var f4 = function(n3, t3, r3) {
      if (!o3.__c.__H) return true;
      var u5 = o3.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u5.every(function(n4) {
        return !n4.__N;
      })) return !c3 || c3.call(this, n3, t3, r3);
      var i5 = o3.__c.props !== n3;
      return u5.forEach(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
        }
      }), c3 && c3.call(this, n3, t3, r3) || i5;
    };
    r2.__f = true;
    var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
    r2.componentWillUpdate = function(n3, t3, r3) {
      if (this.__e) {
        var u5 = c3;
        c3 = void 0, f4(n3, t3, r3), c3 = u5;
      }
      e3 && e3.call(this, n3, t3, r3);
    }, r2.shouldComponentUpdate = f4;
  }
  return o3.__N || o3.__;
}
function y2(n2, u4) {
  var i4 = p2(t2++, 3);
  !c2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.u = u4, r2.__H.__h.push(i4));
}
function A2(n2) {
  return o2 = 5, T2(function() {
    return { current: n2 };
  }, []);
}
function T2(n2, r3) {
  var u4 = p2(t2++, 7);
  return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
}
function q2(n2, t3) {
  return o2 = 8, T2(function() {
    return n2;
  }, t3);
}
function j2() {
  for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
  } catch (t3) {
    n2.__H.__h = [], c2.__e(t3, n2.__v);
  }
}
c2.__b = function(n2) {
  r2 = null, e2 && e2(n2);
}, c2.__ = function(n2, t3) {
  n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
}, c2.__r = function(n2) {
  a2 && a2(n2), t2 = 0;
  var i4 = (r2 = n2.__c).__H;
  i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
}, c2.diffed = function(n2) {
  v2 && v2(n2);
  var t3 = n2.__c;
  t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u2 = r2 = null;
}, c2.__c = function(n2, t3) {
  t3.some(function(n3) {
    try {
      n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B2(n4);
      });
    } catch (r3) {
      t3.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t3 = [], c2.__e(r3, n3.__v);
    }
  }), l2 && l2(n2, t3);
}, c2.unmount = function(n2) {
  m2 && m2(n2);
  var t3, r3 = n2.__c;
  r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
    try {
      z2(n3);
    } catch (n4) {
      t3 = n4;
    }
  }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
};
var k2 = "function" == typeof requestAnimationFrame;
function w2(n2) {
  var t3, r3 = function() {
    clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u4 = setTimeout(r3, 35);
  k2 && (t3 = requestAnimationFrame(r3));
}
function z2(n2) {
  var t3 = r2, u4 = n2.__c;
  "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
}
function B2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function C2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function D2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}

// src/regions.ts
function analyzeRegionShape(result) {
  const { bounds, pixels } = result;
  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const aspectRatio = width / height;
  const pixelCount = pixels.size;
  const area = width * height;
  const density = pixelCount / area;
  const candidates = [];
  const possibleShapes = [];
  if (aspectRatio >= 0.7 && aspectRatio <= 1.4) {
    possibleShapes.push([1, 1], [2, 2], [3, 3], [4, 4]);
  } else if (aspectRatio > 1.4) {
    const ratio = Math.round(aspectRatio);
    possibleShapes.push([1, 1]);
    for (let w3 = 2; w3 <= Math.min(8, ratio + 2); w3++) {
      for (let h3 = 1; h3 <= Math.min(4, w3); h3++) {
        if (Math.abs(w3 / h3 - aspectRatio) < 1) {
          possibleShapes.push([w3, h3]);
        }
      }
    }
  } else {
    const ratio = Math.round(1 / aspectRatio);
    possibleShapes.push([1, 1]);
    for (let h3 = 2; h3 <= Math.min(8, ratio + 2); h3++) {
      for (let w3 = 1; w3 <= Math.min(4, h3); w3++) {
        if (Math.abs(w3 / h3 - aspectRatio) < 1) {
          possibleShapes.push([w3, h3]);
        }
      }
    }
  }
  for (const [gw, gh] of possibleShapes) {
    const expectedAspect = gw / gh;
    const aspectScore = 1 - Math.abs(aspectRatio - expectedAspect) / Math.max(aspectRatio, expectedAspect);
    const densityScore = density > 0.5 ? 1 : density * 2;
    const rectangularityScore = calculateRectangularity(result, gw, gh);
    const score = aspectScore * 0.4 + densityScore * 0.3 + rectangularityScore * 0.3;
    const previewPixels = [];
    const cellW = width / gw;
    const cellH = height / gh;
    for (let gy = 0; gy < gh; gy++) {
      for (let gx = 0; gx < gw; gx++) {
        previewPixels.push({
          x: bounds.minX + Math.floor(cellW * (gx + 0.5)),
          y: bounds.minY + Math.floor(cellH * (gy + 0.5))
        });
      }
    }
    candidates.push({
      gridWidth: gw,
      gridHeight: gh,
      score,
      previewPixels
    });
  }
  candidates.sort((a3, b) => b.score - a3.score);
  const unique = [];
  const seen = /* @__PURE__ */ new Set();
  for (const c3 of candidates) {
    const key = `${c3.gridWidth}x${c3.gridHeight}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(c3);
      if (unique.length >= 4) break;
    }
  }
  return unique;
}
function calculateRectangularity(result, gw, gh) {
  const { bounds, pixels } = result;
  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const cellW = width / gw;
  const cellH = height / gh;
  let totalExpectedPixels = 0;
  let actualFilledPixels = 0;
  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      const cellMinX = Math.floor(bounds.minX + cellW * gx);
      const cellMaxX = Math.floor(bounds.minX + cellW * (gx + 1));
      const cellMinY = Math.floor(bounds.minY + cellH * gy);
      const cellMaxY = Math.floor(bounds.minY + cellH * (gy + 1));
      let cellPixels = 0;
      const cellArea = (cellMaxX - cellMinX) * (cellMaxY - cellMinY);
      for (let y3 = cellMinY; y3 < cellMaxY; y3++) {
        for (let x2 = cellMinX; x2 < cellMaxX; x2++) {
          if (pixels.has(`${x2},${y3}`)) {
            cellPixels++;
          }
        }
      }
      if (cellPixels > cellArea * 0.5) {
        totalExpectedPixels += cellArea;
        actualFilledPixels += cellPixels;
      }
    }
  }
  if (totalExpectedPixels === 0) return 0;
  return actualFilledPixels / totalExpectedPixels;
}
function createRegion(result, gridWidth, gridHeight) {
  return {
    id: crypto.randomUUID(),
    pixels: result.pixels,
    bounds: result.bounds,
    color: result.color,
    gridX: 0,
    // Will be set by grid inference
    gridY: 0,
    gridWidth,
    gridHeight
  };
}

// src/colors.ts
function srgbToLinear(c3) {
  const s3 = c3 / 255;
  return s3 <= 0.04045 ? s3 / 12.92 : Math.pow((s3 + 0.055) / 1.055, 2.4);
}
function rgbToXyz(rgb) {
  const r3 = srgbToLinear(rgb.r);
  const g2 = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return {
    X: 0.4124564 * r3 + 0.3575761 * g2 + 0.1804375 * b,
    Y: 0.2126729 * r3 + 0.7151522 * g2 + 0.072175 * b,
    Z: 0.0193339 * r3 + 0.119192 * g2 + 0.9503041 * b
  };
}
function xyzToLab(xyz) {
  const Xn = 0.95047;
  const Yn = 1;
  const Zn = 1.08883;
  const f4 = (t3) => {
    const delta = 6 / 29;
    return t3 > delta ** 3 ? Math.cbrt(t3) : t3 / (3 * delta ** 2) + 4 / 29;
  };
  const fx = f4(xyz.X / Xn);
  const fy = f4(xyz.Y / Yn);
  const fz = f4(xyz.Z / Zn);
  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz)
  };
}
function rgbToLab(rgb) {
  return xyzToLab(rgbToXyz(rgb));
}
function ciede2000(lab1, lab2) {
  const { L: L1, a: a1, b: b1 } = lab1;
  const { L: L2, a: a22, b: b2 } = lab2;
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C22 = Math.sqrt(a22 * a22 + b2 * b2);
  const Cab = (C1 + C22) / 2;
  const G2 = 0.5 * (1 - Math.sqrt(Math.pow(Cab, 7) / (Math.pow(Cab, 7) + Math.pow(25, 7))));
  const a1p = a1 * (1 + G2);
  const a2p = a22 * (1 + G2);
  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);
  const h1p = Math.atan2(b1, a1p) * 180 / Math.PI + (b1 < 0 ? 360 : 0);
  const h2p = Math.atan2(b2, a2p) * 180 / Math.PI + (b2 < 0 ? 360 : 0);
  const dLp = L2 - L1;
  const dCp = C2p - C1p;
  let dhp;
  if (C1p * C2p === 0) {
    dhp = 0;
  } else if (Math.abs(h2p - h1p) <= 180) {
    dhp = h2p - h1p;
  } else if (h2p - h1p > 180) {
    dhp = h2p - h1p - 360;
  } else {
    dhp = h2p - h1p + 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(dhp * Math.PI / 360);
  const Lp = (L1 + L2) / 2;
  const Cp = (C1p + C2p) / 2;
  let Hp;
  if (C1p * C2p === 0) {
    Hp = h1p + h2p;
  } else if (Math.abs(h1p - h2p) <= 180) {
    Hp = (h1p + h2p) / 2;
  } else if (h1p + h2p < 360) {
    Hp = (h1p + h2p + 360) / 2;
  } else {
    Hp = (h1p + h2p - 360) / 2;
  }
  const T3 = 1 - 0.17 * Math.cos((Hp - 30) * Math.PI / 180) + 0.24 * Math.cos(2 * Hp * Math.PI / 180) + 0.32 * Math.cos((3 * Hp + 6) * Math.PI / 180) - 0.2 * Math.cos((4 * Hp - 63) * Math.PI / 180);
  const dTheta = 30 * Math.exp(-Math.pow((Hp - 275) / 25, 2));
  const Rc = 2 * Math.sqrt(Math.pow(Cp, 7) / (Math.pow(Cp, 7) + Math.pow(25, 7)));
  const Sl = 1 + 0.015 * Math.pow(Lp - 50, 2) / Math.sqrt(20 + Math.pow(Lp - 50, 2));
  const Sc = 1 + 0.045 * Cp;
  const Sh = 1 + 0.015 * Cp * T3;
  const Rt = -Math.sin(2 * dTheta * Math.PI / 180) * Rc;
  const kL = 1, kC = 1, kH = 1;
  const deltaE = Math.sqrt(
    Math.pow(dLp / (kL * Sl), 2) + Math.pow(dCp / (kC * Sc), 2) + Math.pow(dHp / (kH * Sh), 2) + Rt * (dCp / (kC * Sc)) * (dHp / (kH * Sh))
  );
  return deltaE;
}
function pq(x2) {
  const m1 = 0.1593017578125;
  const m22 = 78.84375;
  const c1 = 0.8359375;
  const c22 = 18.8515625;
  const c3 = 18.6875;
  const xm1 = Math.pow(Math.max(0, x2), m1);
  return Math.pow((c1 + c22 * xm1) / (1 + c3 * xm1), m22);
}
function rgbToICtCp(rgb) {
  const r3 = srgbToLinear(rgb.r);
  const g2 = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  const L2 = 0.412109375 * r3 + 0.523925781 * g2 + 0.063964844 * b;
  const M2 = 0.166748047 * r3 + 0.720458984 * g2 + 0.112792969 * b;
  const S2 = 0.024047852 * r3 + 0.075439453 * g2 + 0.900512695 * b;
  const Lp = pq(L2);
  const Mp = pq(M2);
  const Sp = pq(S2);
  const I2 = 0.5 * Lp + 0.5 * Mp;
  const Ct = 1.613769531 * Lp - 3.323486328 * Mp + 1.709716797 * Sp;
  const Cp = 4.378173828 * Lp - 4.245605469 * Mp - 0.132568359 * Sp;
  return { I: I2, Ct, Cp };
}
function ictcpDistance(ictcp1, ictcp2) {
  const dI = ictcp1.I - ictcp2.I;
  const dCt = ictcp1.Ct - ictcp2.Ct;
  const dCp = ictcp1.Cp - ictcp2.Cp;
  return Math.sqrt(dI * dI + dCt * dCt + dCp * dCp);
}
function colorDistance(rgb1, rgb2) {
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);
  const ciede = ciede2000(lab1, lab2);
  const ictcp1 = rgbToICtCp(rgb1);
  const ictcp2 = rgbToICtCp(rgb2);
  const ictcp = ictcpDistance(ictcp1, ictcp2);
  return (ciede + ictcp * 50) / 2;
}
function colorsMatch(rgb1, rgb2, threshold) {
  return colorDistance(rgb1, rgb2) < threshold;
}
function medianColor(colors) {
  if (colors.length === 0) {
    return { r: 0, g: 0, b: 0 };
  }
  const sortedR = [...colors].sort((a3, b) => a3.r - b.r);
  const sortedG = [...colors].sort((a3, b) => a3.g - b.g);
  const sortedB = [...colors].sort((a3, b) => a3.b - b.b);
  const mid = Math.floor(colors.length / 2);
  return {
    r: sortedR[mid].r,
    g: sortedG[mid].g,
    b: sortedB[mid].b
  };
}
function kMeansCluster(colors, k3, maxIterations = 50) {
  if (colors.length <= k3) {
    return [...colors];
  }
  const centroids = [];
  centroids.push(colors[Math.floor(Math.random() * colors.length)]);
  for (let i4 = 1; i4 < k3; i4++) {
    const distances = colors.map((color) => {
      let minDist = Infinity;
      for (const centroid of centroids) {
        const dist = colorDistance(color, centroid);
        if (dist < minDist) minDist = dist;
      }
      return minDist * minDist;
    });
    const totalDist = distances.reduce((a3, b) => a3 + b, 0);
    let random = Math.random() * totalDist;
    for (let j3 = 0; j3 < colors.length; j3++) {
      random -= distances[j3];
      if (random <= 0) {
        centroids.push(colors[j3]);
        break;
      }
    }
  }
  for (let iter = 0; iter < maxIterations; iter++) {
    const clusters = Array.from({ length: k3 }, () => []);
    for (const color of colors) {
      let minDist = Infinity;
      let minIdx = 0;
      for (let i4 = 0; i4 < centroids.length; i4++) {
        const dist = colorDistance(color, centroids[i4]);
        if (dist < minDist) {
          minDist = dist;
          minIdx = i4;
        }
      }
      clusters[minIdx].push(color);
    }
    let changed = false;
    for (let i4 = 0; i4 < k3; i4++) {
      if (clusters[i4].length > 0) {
        const newCentroid = medianColor(clusters[i4]);
        if (newCentroid.r !== centroids[i4].r || newCentroid.g !== centroids[i4].g || newCentroid.b !== centroids[i4].b) {
          centroids[i4] = newCentroid;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }
  return centroids;
}

// src/floodFill.ts
function getPixel(imageData, x2, y3) {
  const idx = (y3 * imageData.width + x2) * 4;
  return {
    r: imageData.data[idx],
    g: imageData.data[idx + 1],
    b: imageData.data[idx + 2]
  };
}
function floodFill(imageData, startX, startY, threshold) {
  const width = imageData.width;
  const height = imageData.height;
  const startColor = getPixel(imageData, startX, startY);
  const visited = /* @__PURE__ */ new Set();
  const pixels = /* @__PURE__ */ new Set();
  const stack = [{ x: startX, y: startY }];
  let minX = startX, maxX = startX, minY = startY, maxY = startY;
  const colorSamples = [];
  while (stack.length > 0) {
    const { x: x2, y: y3 } = stack.pop();
    const key = `${x2},${y3}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (x2 < 0 || x2 >= width || y3 < 0 || y3 >= height) continue;
    const pixel = getPixel(imageData, x2, y3);
    if (!colorsMatch(pixel, startColor, threshold)) continue;
    pixels.add(key);
    colorSamples.push(pixel);
    minX = Math.min(minX, x2);
    maxX = Math.max(maxX, x2);
    minY = Math.min(minY, y3);
    maxY = Math.max(maxY, y3);
    stack.push({ x: x2 - 1, y: y3 });
    stack.push({ x: x2 + 1, y: y3 });
    stack.push({ x: x2, y: y3 - 1 });
    stack.push({ x: x2, y: y3 + 1 });
  }
  return {
    pixels,
    bounds: { minX, minY, maxX, maxY },
    color: medianColor(colorSamples)
  };
}
function getFloodFillCandidates(imageData, startX, startY, thresholds = [5, 10, 15, 25]) {
  return thresholds.map(
    (threshold) => floodFill(imageData, startX, startY, threshold)
  );
}
function getPerimeterPixels(imageData) {
  const width = imageData.width;
  const height = imageData.height;
  const perimeter = [];
  for (let x2 = 0; x2 < width; x2++) {
    perimeter.push(getPixel(imageData, x2, 0));
    perimeter.push(getPixel(imageData, x2, height - 1));
  }
  for (let y3 = 1; y3 < height - 1; y3++) {
    perimeter.push(getPixel(imageData, 0, y3));
    perimeter.push(getPixel(imageData, width - 1, y3));
  }
  return perimeter;
}
function getMostCommonPerimeterColor(imageData, bucketSize = 10) {
  const perimeter = getPerimeterPixels(imageData);
  const buckets = /* @__PURE__ */ new Map();
  for (const color of perimeter) {
    const key = `${Math.floor(color.r / bucketSize)},${Math.floor(color.g / bucketSize)},${Math.floor(color.b / bucketSize)}`;
    if (!buckets.has(key)) {
      buckets.set(key, []);
    }
    buckets.get(key).push(color);
  }
  let maxCount = 0;
  let maxColors = [];
  for (const colors of buckets.values()) {
    if (colors.length > maxCount) {
      maxCount = colors.length;
      maxColors = colors;
    }
  }
  return medianColor(maxColors);
}
function findTransparentPixels(imageData, perimeterColor, threshold) {
  const width = imageData.width;
  const height = imageData.height;
  const visited = /* @__PURE__ */ new Set();
  const transparent = /* @__PURE__ */ new Set();
  const stack = [];
  for (let x2 = 0; x2 < width; x2++) {
    stack.push({ x: x2, y: 0 });
    stack.push({ x: x2, y: height - 1 });
  }
  for (let y3 = 0; y3 < height; y3++) {
    stack.push({ x: 0, y: y3 });
    stack.push({ x: width - 1, y: y3 });
  }
  while (stack.length > 0) {
    const { x: x2, y: y3 } = stack.pop();
    const key = `${x2},${y3}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (x2 < 0 || x2 >= width || y3 < 0 || y3 >= height) continue;
    const pixel = getPixel(imageData, x2, y3);
    if (!colorsMatch(pixel, perimeterColor, threshold)) continue;
    transparent.add(key);
    stack.push({ x: x2 - 1, y: y3 });
    stack.push({ x: x2 + 1, y: y3 });
    stack.push({ x: x2, y: y3 - 1 });
    stack.push({ x: x2, y: y3 + 1 });
  }
  return transparent;
}

// src/grid.ts
function inferGrid(regions, imageWidth, imageHeight) {
  if (regions.length < 4) {
    return { grid: null, confidence: 0 };
  }
  const samples = [];
  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    const pixelWidth = region.bounds.maxX - region.bounds.minX + 1;
    const pixelHeight = region.bounds.maxY - region.bounds.minY + 1;
    samples.push({
      centerX,
      centerY,
      gridWidth: region.gridWidth,
      gridHeight: region.gridHeight
    });
    const estimatedPitchX = pixelWidth / region.gridWidth;
    const estimatedPitchY = pixelHeight / region.gridHeight;
    samples[samples.length - 1] = {
      ...samples[samples.length - 1],
      estimatedPitchX,
      estimatedPitchY
    };
  }
  const pitchSamples = samples.map((s3) => {
    const es = s3;
    return { x: es.estimatedPitchX, y: es.estimatedPitchY };
  }).filter((p3) => p3.x && p3.y);
  if (pitchSamples.length === 0) {
    return { grid: null, confidence: 0 };
  }
  pitchSamples.sort((a3, b) => a3.x - b.x);
  const medianPitchX = pitchSamples[Math.floor(pitchSamples.length / 2)].x;
  pitchSamples.sort((a3, b) => a3.y - b.y);
  const medianPitchY = pitchSamples[Math.floor(pitchSamples.length / 2)].y;
  const offsetXCandidates = [];
  const offsetYCandidates = [];
  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    const offX = centerX % medianPitchX;
    const offY = centerY % medianPitchY;
    offsetXCandidates.push(offX);
    offsetYCandidates.push(offY);
  }
  offsetXCandidates.sort((a3, b) => a3 - b);
  offsetYCandidates.sort((a3, b) => a3 - b);
  const offsetX = offsetXCandidates[Math.floor(offsetXCandidates.length / 2)];
  const offsetY = offsetYCandidates[Math.floor(offsetYCandidates.length / 2)];
  const width = Math.ceil(imageWidth / medianPitchX);
  const height = Math.ceil(imageHeight / medianPitchY);
  let alignmentError = 0;
  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    const gridX = Math.round((centerX - offsetX) / medianPitchX);
    const gridY = Math.round((centerY - offsetY) / medianPitchY);
    const expectedX = offsetX + gridX * medianPitchX;
    const expectedY = offsetY + gridY * medianPitchY;
    alignmentError += Math.sqrt(
      Math.pow(centerX - expectedX, 2) + Math.pow(centerY - expectedY, 2)
    );
  }
  const avgError = alignmentError / regions.length;
  const maxAllowedError = Math.max(medianPitchX, medianPitchY) * 0.3;
  const confidence = Math.max(0, 1 - avgError / maxAllowedError);
  return {
    grid: {
      pitchX: medianPitchX,
      pitchY: medianPitchY,
      offsetX,
      offsetY,
      width,
      height
    },
    confidence
  };
}
function assignGridPositions(regions, grid) {
  return regions.map((region) => {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    const gridX = Math.round((centerX - grid.offsetX) / grid.pitchX);
    const gridY = Math.round((centerY - grid.offsetY) / grid.pitchY);
    return {
      ...region,
      gridX,
      gridY
    };
  });
}
function sampleGridPixel(imageData, grid, gridX, gridY) {
  const centerX = grid.offsetX + gridX * grid.pitchX;
  const centerY = grid.offsetY + gridY * grid.pitchY;
  const halfPitchX = grid.pitchX / 2;
  const halfPitchY = grid.pitchY / 2;
  const colors = [];
  const sampleRadius = Math.min(grid.pitchX, grid.pitchY) * 0.4;
  for (let dy = -halfPitchY; dy <= halfPitchY; dy += grid.pitchY / 4) {
    for (let dx = -halfPitchX; dx <= halfPitchX; dx += grid.pitchX / 4) {
      const x2 = Math.round(centerX + dx);
      const y3 = Math.round(centerY + dy);
      if (x2 < 0 || x2 >= imageData.width || y3 < 0 || y3 >= imageData.height) {
        continue;
      }
      const dist = Math.sqrt(dx * dx + dy * dy);
      const weight = Math.max(0, 1 - dist / sampleRadius);
      colors.push({
        color: getPixel(imageData, x2, y3),
        weight
      });
    }
  }
  if (colors.length === 0) {
    return { r: 0, g: 0, b: 0 };
  }
  let totalWeight = 0;
  let r3 = 0, g2 = 0, b = 0;
  for (const { color, weight } of colors) {
    totalWeight += weight;
    r3 += color.r * weight;
    g2 += color.g * weight;
    b += color.b * weight;
  }
  return {
    r: Math.round(r3 / totalWeight),
    g: Math.round(g2 / totalWeight),
    b: Math.round(b / totalWeight)
  };
}
function generateOutput(imageData, grid, regions, transparentPixels, colorCentroids) {
  const output = new ImageData(grid.width, grid.height);
  const regionMap = /* @__PURE__ */ new Map();
  for (const region of regions) {
    for (let dy = 0; dy < region.gridHeight; dy++) {
      for (let dx = 0; dx < region.gridWidth; dx++) {
        const key = `${region.gridX + dx},${region.gridY + dy}`;
        regionMap.set(key, region.color);
      }
    }
  }
  for (let y3 = 0; y3 < grid.height; y3++) {
    for (let x2 = 0; x2 < grid.width; x2++) {
      const key = `${x2},${y3}`;
      let color;
      if (regionMap.has(key)) {
        color = regionMap.get(key);
      } else {
        color = sampleGridPixel(imageData, grid, x2, y3);
      }
      if (colorCentroids) {
        color = findNearestCentroid(color, colorCentroids);
      }
      const idx = (y3 * grid.width + x2) * 4;
      output.data[idx] = color.r;
      output.data[idx + 1] = color.g;
      output.data[idx + 2] = color.b;
      const centerX = Math.round(grid.offsetX + x2 * grid.pitchX);
      const centerY = Math.round(grid.offsetY + y3 * grid.pitchY);
      const isTransparent = transparentPixels?.has(`${centerX},${centerY}`);
      output.data[idx + 3] = isTransparent ? 0 : 255;
    }
  }
  return output;
}
function findNearestCentroid(color, centroids) {
  let minDist = Infinity;
  let nearest = color;
  for (const c3 of centroids) {
    const dist = Math.sqrt(
      Math.pow(color.r - c3.r, 2) + Math.pow(color.g - c3.g, 2) + Math.pow(color.b - c3.b, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = c3;
    }
  }
  return nearest;
}

// src/state.ts
var STORAGE_KEY = "pix-app-state";
var STATE_VERSION = "1";
function getDefaultState() {
  return {
    imageDataUrl: null,
    regions: [],
    inferTransparency: false,
    transparencyThreshold: 10,
    maxColors: null,
    version: STATE_VERSION
  };
}
function saveState(state) {
  try {
    const serialized = {
      ...state,
      regions: state.regions.map((r3) => ({
        ...r3,
        pixels: Array.from(r3.pixels)
      }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (e3) {
    console.error("Failed to save state:", e3);
  }
}
function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultState();
    const parsed = JSON.parse(stored);
    if (parsed.version !== STATE_VERSION) {
      return getDefaultState();
    }
    return {
      ...parsed,
      regions: parsed.regions.map((r3) => ({
        ...r3,
        pixels: new Set(r3.pixels)
      }))
    };
  } catch (e3) {
    console.error("Failed to load state:", e3);
    return getDefaultState();
  }
}

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f3 = 0;
var i3 = Array.isArray;
function u3(e3, t3, n2, o3, i4, u4) {
  t3 || (t3 = {});
  var a3, c3, p3 = t3;
  if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
  var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
  if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
  return l.vnode && l.vnode(l3), l3;
}

// src/app.tsx
var VERSION = true ? "0.1.2" : "0.1.0";
var COMMIT_HASH = true ? "30c213c" : "dev";
function App() {
  const [state, setState] = d2(loadState);
  const [image, setImage] = d2(null);
  const [imageData, setImageData] = d2(null);
  const [tool, setTool] = d2("add");
  const [hoveredRegion, setHoveredRegion] = d2(null);
  const [candidateModal, setCandidateModal] = d2(null);
  const [grid, setGrid] = d2(null);
  const [outputImageData, setOutputImageData] = d2(null);
  const [outputZoom, setOutputZoom] = d2(4);
  const inputCanvasRef = A2(null);
  const outputCanvasRef = A2(null);
  y2(() => {
    if (state.imageDataUrl && !image) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = state.imageDataUrl;
    }
  }, [state.imageDataUrl, image]);
  y2(() => {
    if (image && inputCanvasRef.current) {
      const canvas = inputCanvasRef.current;
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      setImageData(ctx.getImageData(0, 0, image.width, image.height));
    }
  }, [image]);
  y2(() => {
    saveState(state);
  }, [state]);
  y2(() => {
    if (imageData && state.regions.length >= 4) {
      const result = inferGrid(state.regions, imageData.width, imageData.height);
      if (result.grid && result.confidence > 0.3) {
        setGrid(result.grid);
        const updated = assignGridPositions(state.regions, result.grid);
        if (JSON.stringify(updated) !== JSON.stringify(state.regions)) {
          setState((s3) => ({ ...s3, regions: updated }));
        }
      }
    } else {
      setGrid(null);
    }
  }, [state.regions, imageData]);
  y2(() => {
    if (!imageData || !grid) {
      setOutputImageData(null);
      return;
    }
    let transparentPixels = null;
    if (state.inferTransparency) {
      const perimeterColor = getMostCommonPerimeterColor(imageData);
      transparentPixels = findTransparentPixels(imageData, perimeterColor, state.transparencyThreshold);
    }
    let colorCentroids = null;
    if (state.maxColors && state.maxColors > 0) {
      const allColors = [];
      for (let y3 = 0; y3 < imageData.height; y3 += 4) {
        for (let x2 = 0; x2 < imageData.width; x2 += 4) {
          const idx = (y3 * imageData.width + x2) * 4;
          allColors.push({
            r: imageData.data[idx],
            g: imageData.data[idx + 1],
            b: imageData.data[idx + 2]
          });
        }
      }
      colorCentroids = kMeansCluster(allColors, state.maxColors);
    }
    const output = generateOutput(imageData, grid, state.regions, transparentPixels, colorCentroids);
    setOutputImageData(output);
  }, [imageData, grid, state.regions, state.inferTransparency, state.transparencyThreshold, state.maxColors]);
  y2(() => {
    if (!inputCanvasRef.current || !image) return;
    const canvas = inputCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    if (grid) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      for (let x2 = 0; x2 <= grid.width; x2++) {
        const px = grid.offsetX + x2 * grid.pitchX - grid.pitchX / 2;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, canvas.height);
        ctx.stroke();
      }
      for (let y3 = 0; y3 <= grid.height; y3++) {
        const py = grid.offsetY + y3 * grid.pitchY - grid.pitchY / 2;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(canvas.width, py);
        ctx.stroke();
      }
    }
    for (const region of state.regions) {
      const isHovered = region.id === hoveredRegion;
      ctx.strokeStyle = isHovered ? "rgba(255, 200, 100, 0.9)" : "rgba(100, 200, 255, 0.6)";
      ctx.lineWidth = isHovered ? 2 : 1;
      const { minX, minY, maxX, maxY } = region.bounds;
      ctx.strokeRect(minX - 1, minY - 1, maxX - minX + 3, maxY - minY + 3);
    }
  }, [image, grid, state.regions, hoveredRegion]);
  y2(() => {
    if (!outputCanvasRef.current || !outputImageData) return;
    const canvas = outputCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = outputImageData.width * outputZoom;
    canvas.height = outputImageData.height * outputZoom;
    const checkSize = outputZoom / 2;
    for (let y3 = 0; y3 < canvas.height; y3 += checkSize) {
      for (let x2 = 0; x2 < canvas.width; x2 += checkSize) {
        const isLight = (x2 / checkSize + y3 / checkSize) % 2 === 0;
        ctx.fillStyle = isLight ? "#444" : "#666";
        ctx.fillRect(x2, y3, checkSize, checkSize);
      }
    }
    ctx.imageSmoothingEnabled = false;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = outputImageData.width;
    tempCanvas.height = outputImageData.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(outputImageData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    for (let x2 = 0; x2 <= outputImageData.width; x2++) {
      ctx.beginPath();
      ctx.moveTo(x2 * outputZoom, 0);
      ctx.lineTo(x2 * outputZoom, canvas.height);
      ctx.stroke();
    }
    for (let y3 = 0; y3 <= outputImageData.height; y3++) {
      ctx.beginPath();
      ctx.moveTo(0, y3 * outputZoom);
      ctx.lineTo(canvas.width, y3 * outputZoom);
      ctx.stroke();
    }
  }, [outputImageData, outputZoom]);
  const handleImageLoad = q2((file) => {
    const reader = new FileReader();
    reader.onload = (e3) => {
      const dataUrl = e3.target?.result;
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setState((s3) => ({ ...s3, imageDataUrl: dataUrl, regions: [] }));
        setGrid(null);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);
  const handlePaste = q2((e3) => {
    const items = e3.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          handleImageLoad(file);
          break;
        }
      }
    }
  }, [handleImageLoad]);
  y2(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);
  const handleDrop = q2((e3) => {
    e3.preventDefault();
    const file = e3.dataTransfer?.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageLoad(file);
    }
  }, [handleImageLoad]);
  const handleCanvasClick = q2((e3) => {
    if (!imageData || !inputCanvasRef.current) return;
    const rect = inputCanvasRef.current.getBoundingClientRect();
    const scaleX = imageData.width / rect.width;
    const scaleY = imageData.height / rect.height;
    const x2 = Math.floor((e3.clientX - rect.left) * scaleX);
    const y3 = Math.floor((e3.clientY - rect.top) * scaleY);
    if (tool === "delete") {
      for (const region of state.regions) {
        if (region.pixels.has(`${x2},${y3}`)) {
          setState((s3) => ({
            ...s3,
            regions: s3.regions.filter((r3) => r3.id !== region.id)
          }));
          return;
        }
      }
    } else {
      const candidates = getFloodFillCandidates(imageData, x2, y3);
      const result = candidates[1] || candidates[0];
      const shapeCandidates = analyzeRegionShape(result);
      if (shapeCandidates.length === 0) return;
      if (shapeCandidates[0].score > 0.8 && (shapeCandidates.length === 1 || shapeCandidates[0].score > shapeCandidates[1].score * 1.2)) {
        const region = createRegion(result, shapeCandidates[0].gridWidth, shapeCandidates[0].gridHeight);
        setState((s3) => ({ ...s3, regions: [...s3.regions, region] }));
      } else {
        setCandidateModal({ result, candidates: shapeCandidates });
      }
    }
  }, [imageData, tool, state.regions]);
  const handleCanvasMouseMove = q2((e3) => {
    if (!imageData || !inputCanvasRef.current) return;
    const rect = inputCanvasRef.current.getBoundingClientRect();
    const scaleX = imageData.width / rect.width;
    const scaleY = imageData.height / rect.height;
    const x2 = Math.floor((e3.clientX - rect.left) * scaleX);
    const y3 = Math.floor((e3.clientY - rect.top) * scaleY);
    for (const region of state.regions) {
      if (region.pixels.has(`${x2},${y3}`)) {
        setHoveredRegion(region.id);
        return;
      }
    }
    setHoveredRegion(null);
  }, [imageData, state.regions]);
  const handleSelectCandidate = q2((candidate) => {
    if (!candidateModal) return;
    const region = createRegion(candidateModal.result, candidate.gridWidth, candidate.gridHeight);
    setState((s3) => ({ ...s3, regions: [...s3.regions, region] }));
    setCandidateModal(null);
  }, [candidateModal]);
  const handleCopyOutput = q2(async () => {
    if (!outputCanvasRef.current) return;
    try {
      const blob = await new Promise((resolve, reject) => {
        outputCanvasRef.current.toBlob((blob2) => {
          if (blob2) resolve(blob2);
          else reject(new Error("Failed to create blob"));
        }, "image/png");
      });
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
    } catch (e3) {
      console.error("Failed to copy:", e3);
    }
  }, []);
  const handleDownloadOutput = q2(() => {
    if (!outputCanvasRef.current || !outputImageData) return;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = outputImageData.width;
    tempCanvas.height = outputImageData.height;
    const ctx = tempCanvas.getContext("2d");
    ctx.putImageData(outputImageData, 0, 0);
    const link = document.createElement("a");
    link.download = "pixel-art.png";
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
  }, [outputImageData]);
  const handleClear = q2(() => {
    setState(getDefaultState());
    setImage(null);
    setImageData(null);
    setGrid(null);
    setOutputImageData(null);
  }, []);
  return /* @__PURE__ */ u3(k, { children: [
    /* @__PURE__ */ u3("header", { class: "header", children: [
      /* @__PURE__ */ u3("h1", { children: "\u{1F3A8} Pix - Pixel Image Extractor" }),
      /* @__PURE__ */ u3("div", { class: "toolbar", children: [
        /* @__PURE__ */ u3(
          "button",
          {
            class: `btn btn-icon ${tool === "add" ? "active" : ""}`,
            onClick: () => setTool("add"),
            title: "Add Region",
            children: "\u2795"
          }
        ),
        /* @__PURE__ */ u3(
          "button",
          {
            class: `btn btn-icon ${tool === "delete" ? "active" : ""}`,
            onClick: () => setTool("delete"),
            title: "Delete Region",
            children: "\u{1F5D1}\uFE0F"
          }
        ),
        /* @__PURE__ */ u3("button", { class: "btn btn-danger", onClick: handleClear, disabled: !state.imageDataUrl, children: "Clear" })
      ] })
    ] }),
    /* @__PURE__ */ u3("main", { class: "main-container", children: [
      /* @__PURE__ */ u3("section", { class: "panel input-panel", children: [
        /* @__PURE__ */ u3("div", { class: "panel-header", children: [
          /* @__PURE__ */ u3("h2", { children: "Input Image" }),
          /* @__PURE__ */ u3("span", { class: "text-muted", children: [
            state.regions.length,
            " regions"
          ] })
        ] }),
        !image ? /* @__PURE__ */ u3(
          "div",
          {
            class: "drop-zone",
            onDrop: handleDrop,
            onDragOver: (e3) => {
              e3.preventDefault();
              e3.currentTarget.classList.add("dragover");
            },
            onDragLeave: (e3) => e3.currentTarget.classList.remove("dragover"),
            onClick: () => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e3) => {
                const file = e3.target.files?.[0];
                if (file) handleImageLoad(file);
              };
              input.click();
            },
            children: [
              /* @__PURE__ */ u3("div", { class: "drop-zone-icon", children: "\u{1F4C1}" }),
              /* @__PURE__ */ u3("p", { children: "Drop an image, paste, or click to upload" })
            ]
          }
        ) : /* @__PURE__ */ u3("div", { class: "canvas-container", children: /* @__PURE__ */ u3(
          "canvas",
          {
            ref: inputCanvasRef,
            onClick: handleCanvasClick,
            onMouseMove: handleCanvasMouseMove,
            style: { cursor: tool === "delete" ? "pointer" : "crosshair" }
          }
        ) }),
        /* @__PURE__ */ u3("div", { class: "settings-panel", children: [
          /* @__PURE__ */ u3("h3", { children: "Settings" }),
          /* @__PURE__ */ u3("div", { class: "setting-row", children: [
            /* @__PURE__ */ u3("label", { children: "Infer Transparency" }),
            /* @__PURE__ */ u3(
              "input",
              {
                type: "checkbox",
                checked: state.inferTransparency,
                onChange: (e3) => setState((s3) => ({ ...s3, inferTransparency: e3.target.checked }))
              }
            )
          ] }),
          state.inferTransparency && /* @__PURE__ */ u3("div", { class: "setting-row", children: [
            /* @__PURE__ */ u3("label", { children: "Threshold" }),
            /* @__PURE__ */ u3(
              "input",
              {
                type: "range",
                min: "1",
                max: "50",
                value: state.transparencyThreshold,
                onChange: (e3) => setState((s3) => ({ ...s3, transparencyThreshold: parseInt(e3.target.value) }))
              }
            ),
            /* @__PURE__ */ u3("span", { children: state.transparencyThreshold })
          ] }),
          /* @__PURE__ */ u3("div", { class: "setting-row", children: [
            /* @__PURE__ */ u3("label", { children: "Max Colors" }),
            /* @__PURE__ */ u3(
              "input",
              {
                type: "number",
                min: "0",
                max: "256",
                value: state.maxColors || "",
                placeholder: "None",
                onChange: (e3) => {
                  const val = parseInt(e3.target.value);
                  setState((s3) => ({ ...s3, maxColors: isNaN(val) || val <= 0 ? null : val }));
                }
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u3("section", { class: "panel", children: [
        /* @__PURE__ */ u3("div", { class: "panel-header", children: [
          /* @__PURE__ */ u3("h2", { children: "Output Preview" }),
          /* @__PURE__ */ u3("div", { class: "zoom-controls", children: [
            /* @__PURE__ */ u3("button", { class: "btn btn-secondary btn-icon", onClick: () => setOutputZoom((z3) => Math.max(1, z3 - 1)), children: "-" }),
            /* @__PURE__ */ u3("span", { class: "zoom-level", children: [
              outputZoom,
              "x"
            ] }),
            /* @__PURE__ */ u3("button", { class: "btn btn-secondary btn-icon", onClick: () => setOutputZoom((z3) => Math.min(16, z3 + 1)), children: "+" })
          ] })
        ] }),
        outputImageData ? /* @__PURE__ */ u3(k, { children: [
          /* @__PURE__ */ u3("div", { class: "canvas-container", children: /* @__PURE__ */ u3("canvas", { ref: outputCanvasRef, class: "output-canvas" }) }),
          /* @__PURE__ */ u3("div", { class: "toolbar", style: { marginTop: "1rem" }, children: [
            /* @__PURE__ */ u3("button", { class: "btn", onClick: handleCopyOutput, children: "\u{1F4CB} Copy" }),
            /* @__PURE__ */ u3("button", { class: "btn", onClick: handleDownloadOutput, children: "\u{1F4BE} Download PNG" })
          ] })
        ] }) : /* @__PURE__ */ u3("div", { class: "drop-zone", style: { cursor: "default" }, children: [
          /* @__PURE__ */ u3("p", { children: "Add at least 4 regions to generate output" }),
          /* @__PURE__ */ u3("p", { class: "text-muted", children: state.regions.length === 0 ? "Click on the input image to start adding regions" : `${4 - state.regions.length} more needed` })
        ] })
      ] })
    ] }),
    candidateModal && /* @__PURE__ */ u3("div", { class: "modal-overlay", onClick: () => setCandidateModal(null), children: /* @__PURE__ */ u3("div", { class: "modal", onClick: (e3) => e3.stopPropagation(), children: [
      /* @__PURE__ */ u3("h2", { children: "Select Region Shape" }),
      /* @__PURE__ */ u3("p", { children: "Choose the shape that best matches this region:" }),
      /* @__PURE__ */ u3("div", { class: "modal-candidates", children: candidateModal.candidates.map((candidate, i4) => /* @__PURE__ */ u3(
        "div",
        {
          class: "candidate",
          onClick: () => handleSelectCandidate(candidate),
          children: [
            /* @__PURE__ */ u3("div", { class: "candidate-preview", children: /* @__PURE__ */ u3("div", { style: {
              display: "grid",
              gridTemplateColumns: `repeat(${candidate.gridWidth}, 20px)`,
              gap: "2px"
            }, children: Array.from({ length: candidate.gridWidth * candidate.gridHeight }).map((_2, j3) => /* @__PURE__ */ u3("div", { style: {
              width: "20px",
              height: "20px",
              backgroundColor: `rgb(${candidateModal.result.color.r}, ${candidateModal.result.color.g}, ${candidateModal.result.color.b})`,
              borderRadius: "2px"
            } }, j3)) }) }),
            /* @__PURE__ */ u3("span", { class: "candidate-label", children: [
              candidate.gridWidth,
              "\xD7",
              candidate.gridHeight,
              " (",
              Math.round(candidate.score * 100),
              "%)"
            ] })
          ]
        },
        i4
      )) }),
      /* @__PURE__ */ u3("div", { class: "modal-actions", children: /* @__PURE__ */ u3("button", { class: "btn btn-secondary", onClick: () => setCandidateModal(null), children: "Cancel" }) })
    ] }) }),
    /* @__PURE__ */ u3("footer", { class: "footer", children: [
      /* @__PURE__ */ u3("span", { children: [
        "A vibe-coded micro-app via",
        " ",
        /* @__PURE__ */ u3("a", { href: "https://searyanc.dev", target: "_blank", rel: "noopener noreferrer", children: "SeaRyanC" })
      ] }),
      /* @__PURE__ */ u3(
        "a",
        {
          href: "https://github.com/SeaRyanC/app/tree/main/pix",
          target: "_blank",
          rel: "noopener noreferrer",
          title: "View source on GitHub",
          children: /* @__PURE__ */ u3("svg", { viewBox: "0 0 16 16", fill: "currentColor", children: /* @__PURE__ */ u3("path", { d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" }) })
        }
      ),
      /* @__PURE__ */ u3("span", { style: { fontSize: "0.75rem" }, children: [
        "v",
        VERSION,
        "+",
        COMMIT_HASH
      ] })
    ] })
  ] });
}
G(/* @__PURE__ */ u3(App, {}), document.getElementById("app"));
