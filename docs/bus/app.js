"use strict";
(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var a;
  var s;
  var h;
  var p;
  var v;
  var y;
  var d = {};
  var w = [];
  var _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var g = Array.isArray;
  function m(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function b(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k(l3, u4, t3) {
    var i3, r3, o3, e3 = {};
    for (o3 in u4) "key" == o3 ? i3 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return x(l3, e3, i3, r3, null);
  }
  function x(n2, t3, i3, r3, o3) {
    var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function S(n2) {
    return n2.children;
  }
  function C(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function $(n2, l3) {
    if (null == l3) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u4 = n2.__v, t3 = u4.__e, i3 = [], r3 = [], o3 = m({}, u4);
      o3.__v = u4.__v + 1, l.vnode && l.vnode(o3), q(n2.__P, o3, u4, n2.__n, n2.__P.namespaceURI, 32 & u4.__u ? [t3] : null, i3, null == t3 ? $(u4) : t3, !!(32 & u4.__u), r3), o3.__v = u4.__v, o3.__.__k[o3.__i] = o3, D(i3, o3, r3), u4.__e = u4.__ = null, o3.__e != t3 && P(o3);
    }
  }
  function P(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
      if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
    }), P(n2);
  }
  function A(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
  }
  function H() {
    try {
      for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, I(n2);
    } finally {
      i.length = H.__r = 0;
    }
  }
  function L(n2, l3, u4, t3, i3, r3, o3, e3, f4, c3, a3) {
    var s3, h3, p3, v3, y3, _3, g2 = t3 && t3.__k || w, m3 = l3.length;
    for (f4 = T(u4, l3, g2, f4, m3), s3 = 0; s3 < m3; s3++) null != (p3 = u4.__k[s3]) && (h3 = -1 != p3.__i && g2[p3.__i] || d, p3.__i = s3, _3 = q(n2, p3, h3, i3, r3, o3, e3, f4, c3, a3), v3 = p3.__e, p3.ref && h3.ref != p3.ref && (h3.ref && J(h3.ref, null, p3), a3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), 4 & p3.__u ? (f4 = j(p3, f4, n2), h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _3 ? f4 = _3 : v3 && (f4 = v3.nextSibling), p3.__u &= -7);
    return u4.__e = y3, f4;
  }
  function T(n2, l3, u4, t3, i3) {
    var r3, o3, e3, f4, c3, a3 = u4.length, s3 = a3, h3 = 0;
    for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = x(null, o3, null, null, null) : g(o3) ? o3 = n2.__k[r3] = x(S, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = x(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f4 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = O(o3, u4, f4, s3)) && (s3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i3 > a3 ? h3-- : i3 < a3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (s3) for (r3 = 0; r3 < a3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = $(e3)), K(e3, e3));
    return t3;
  }
  function j(n2, l3, u4) {
    var t3, i3;
    if ("function" == typeof n2.type) {
      for (t3 = n2.__k, i3 = 0; t3 && i3 < t3.length; i3++) t3[i3] && (t3[i3].__ = n2, l3 = j(t3[i3], l3, u4));
      return l3;
    }
    n2.__e != l3 && (l3 && n2.type && !l3.parentNode && (l3 = $(n2)), l3 = u4.insertBefore(n2.__e, l3 || null));
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function O(n2, l3, u4, t3) {
    var i3, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], a3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == e3 || a3 && e3 == c3.key && f4 == c3.type) return u4;
    if (t3 > (a3 ? 1 : 0)) {
      for (i3 = u4 - 1, r3 = u4 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
    }
    return -1;
  }
  function z(n2, l3, u4) {
    "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || _.test(l3) ? u4 : u4 + "px";
  }
  function N(n2, l3, u4, t3, i3) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || z(n2.style, l3, "");
      if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || z(n2.style, l3, u4[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(s, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4[a] = t3[a] : (u4[a] = h, n2.addEventListener(l3, r3 ? v : p, r3)) : n2.removeEventListener(l3, r3 ? v : p, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
    }
  }
  function V(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4[c]) u4[c] = h++;
        else if (u4[c] < t3[a]) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function q(n2, u4, t3, i3, r3, o3, e3, f4, c3, a3) {
    var s3, h3, p3, v3, y3, d3, _3, k3, x2, M, I2, P2, A3, H2, T3, j3, F = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (s3 = l.__b) && s3(u4);
    n: if ("function" == typeof F) {
      h3 = e3.length;
      try {
        if (x2 = u4.props, M = F.prototype && F.prototype.render, I2 = (s3 = F.contextType) && i3[s3.__c], P2 = s3 ? I2 ? I2.props.value : s3.__ : i3, t3.__c ? k3 = (p3 = u4.__c = t3.__c).__ = p3.__E : (M ? u4.__c = p3 = new F(x2, P2) : (u4.__c = p3 = new C(x2, P2), p3.constructor = F, p3.render = Q), I2 && I2.sub(p3), p3.state || (p3.state = {}), p3.__n = i3, v3 = p3.__d = true, p3.__h = [], p3._sb = []), M && null == p3.__s && (p3.__s = p3.state), M && null != F.getDerivedStateFromProps && (p3.__s == p3.state && (p3.__s = m({}, p3.__s)), m(p3.__s, F.getDerivedStateFromProps(x2, p3.__s))), y3 = p3.props, d3 = p3.state, p3.__v = u4, v3) M && null == F.getDerivedStateFromProps && null != p3.componentWillMount && p3.componentWillMount(), M && null != p3.componentDidMount && p3.__h.push(p3.componentDidMount);
        else {
          if (M && null == F.getDerivedStateFromProps && x2 !== y3 && null != p3.componentWillReceiveProps && p3.componentWillReceiveProps(x2, P2), u4.__v == t3.__v || !p3.__e && null != p3.shouldComponentUpdate && false === p3.shouldComponentUpdate(x2, p3.__s, P2)) {
            u4.__v != t3.__v && (p3.props = x2, p3.state = p3.__s, p3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
              n3 && (n3.__ = u4);
            }), w.push.apply(p3.__h, p3._sb), p3._sb = [], p3.__h.length && e3.push(p3), f4 = $(t3);
            break n;
          }
          null != p3.componentWillUpdate && p3.componentWillUpdate(x2, p3.__s, P2), M && null != p3.componentDidUpdate && p3.__h.push(function() {
            p3.componentDidUpdate(y3, d3, _3);
          });
        }
        if (p3.context = P2, p3.props = x2, p3.__P = n2, p3.__e = false, A3 = l.__r, H2 = 0, M) p3.state = p3.__s, p3.__d = false, A3 && A3(u4), s3 = p3.render(p3.props, p3.state, p3.context), w.push.apply(p3.__h, p3._sb), p3._sb = [];
        else do {
          p3.__d = false, A3 && A3(u4), s3 = p3.render(p3.props, p3.state, p3.context), p3.state = p3.__s;
        } while (p3.__d && ++H2 < 25);
        p3.state = p3.__s, null != p3.getChildContext && (i3 = m(m({}, i3), p3.getChildContext())), M && !v3 && null != p3.getSnapshotBeforeUpdate && (_3 = p3.getSnapshotBeforeUpdate(y3, d3)), T3 = null != s3 && s3.type === S && null == s3.key ? E(s3.props.children) : s3, f4 = L(n2, g(T3) ? T3 : [T3], u4, t3, i3, r3, o3, e3, f4, c3, a3), p3.base = u4.__e, u4.__u &= -161, p3.__h.length && e3.push(p3), k3 && (p3.__E = p3.__ = null);
      } catch (n3) {
        if (e3.length = h3, u4.__v = null, c3 || null != o3) {
          if (n3.then) {
            for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
            null != o3 && (o3[o3.indexOf(f4)] = null), u4.__e = f4;
          } else if (null != o3) for (j3 = o3.length; j3--; ) b(o3[j3]);
        } else u4.__e = t3.__e;
        null == u4.__k && (u4.__k = t3.__k || []), n3.then || B(u4), l.__e(n3, u4, t3);
      }
    } else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = G(t3.__e, u4, t3, i3, r3, o3, e3, c3, a3);
    return (s3 = l.diffed) && s3(u4), 128 & u4.__u ? void 0 : f4;
  }
  function B(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B));
  }
  function D(n2, u4, t3) {
    for (var i3 = 0; i3 < t3.length; i3++) J(t3[i3], t3[++i3], t3[++i3]);
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
  function E(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : void 0 !== n2.constructor ? null : m({}, n2);
  }
  function G(u4, t3, i3, r3, o3, e3, f4, c3, a3) {
    var s3, h3, p3, v3, y3, w3, _3, m3 = i3.props || d, k3 = t3.props, x2 = t3.type;
    if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (s3 = 0; s3 < e3.length; s3++) if ((y3 = e3[s3]) && "setAttribute" in y3 == !!x2 && (x2 ? y3.localName == x2 : 3 == y3.nodeType)) {
        u4 = y3, e3[s3] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x2) return document.createTextNode(k3);
      u4 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x2) m3 === k3 || c3 && u4.data == k3 || (u4.data = k3);
    else {
      if (e3 = "textarea" == x2 && null != k3.defaultValue ? null : e3 && n.call(u4.childNodes), !c3 && null != e3) for (m3 = {}, s3 = 0; s3 < u4.attributes.length; s3++) m3[(y3 = u4.attributes[s3]).name] = y3.value;
      for (s3 in m3) y3 = m3[s3], "dangerouslySetInnerHTML" == s3 ? p3 = y3 : "children" == s3 || s3 in k3 || "value" == s3 && "defaultValue" in k3 || "checked" == s3 && "defaultChecked" in k3 || N(u4, s3, null, y3, o3);
      for (s3 in k3) y3 = k3[s3], "children" == s3 ? v3 = y3 : "dangerouslySetInnerHTML" == s3 ? h3 = y3 : "value" == s3 ? w3 = y3 : "checked" == s3 ? _3 = y3 : c3 && "function" != typeof y3 || m3[s3] === y3 || N(u4, s3, y3, m3[s3], o3);
      if (h3) c3 || p3 && (h3.__html == p3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
      else if (p3 && (u4.innerHTML = ""), L("template" == t3.type ? u4.content : u4, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i3.__k && $(i3, 0), c3, a3), null != e3) for (s3 = e3.length; s3--; ) b(e3[s3]);
      c3 && "textarea" != x2 || (s3 = "value", "progress" == x2 && null == w3 ? u4.removeAttribute("value") : null != w3 && (w3 !== u4[s3] || "progress" == x2 && !w3 || "option" == x2 && w3 != m3[s3]) && N(u4, s3, w3, m3[s3], o3), s3 = "checked", null != _3 && _3 != u4[s3] && N(u4, s3, _3, m3[s3], o3));
    }
    return u4;
  }
  function J(n2, u4, t3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u4 || (n2.__u = n2(u4));
      } else n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function K(n2, u4, t3) {
    var i3, r3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || J(i3, null, u4)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i3.base = i3.__P = i3.__n = null;
    }
    if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && K(i3[r3], u4, t3 || "function" != typeof n2.type);
    t3 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  function R(u4, t3, i3) {
    var r3, o3, e3, f4;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f4 = [], q(t3, u4 = (!r3 && i3 || t3).__k = k(S, null, [u4]), o3 || d, d, t3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r3, f4), D(e3, u4, f4), u4.props.children = null;
  }
  n = w.slice, l = { __e: function(n2, l3, u4, t3) {
    for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
      if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, C.prototype.setState = function(n2, l3) {
    var u4;
    u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n2 && (n2 = n2(m({}, u4), this.props)), n2 && m(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), A(this));
  }, C.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A(this));
  }, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, a = "__a" + f, s = /(PointerCapture)$|Capture$/i, h = 0, p = V(false), v = V(true), y = 0;

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
  var p2 = c2.__;
  function s2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
  }
  function d2(n2) {
    return o2 = 1, y2(D2, n2);
  }
  function y2(n2, u4, i3) {
    var o3 = s2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u4) : D2(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f4 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u5 = false, i4 = o3.__c.props !== n3;
        if (o3.__c.__H.__.some(function(n4) {
          if (n4.__N) {
            u5 = true;
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), c3) {
          var f5 = c3.call(this, n3, t3, r3);
          return u5 ? f5 || i4 : f5;
        }
        return !u5 || i4;
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
  function h2(n2, u4) {
    var i3 = s2(t2++, 3);
    !c2.__s && C2(i3.__H, u4) && (i3.__ = n2, i3.u = u4, r2.__H.__h.push(i3));
  }
  function _2(n2, u4) {
    var i3 = s2(t2++, 4);
    !c2.__s && C2(i3.__H, u4) && (i3.__ = n2, i3.u = u4, r2.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u4 = s2(t2++, 7);
    return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
  }
  function q2(n2, t3) {
    return o2 = 8, T2(function() {
      return n2;
    }, t3);
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) {
      var t3 = n2.__H;
      if (n2.__P && t3) try {
        t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], c2.__e(r3, n2.__v);
      }
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), p2 && p2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u, n3.u = void 0);
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
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
    r3 && r3.__H && (r3.__H.__.some(function(n3) {
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

  // src/data.ts
  var materials = [
    {
      "id": "stone-brick",
      "name": "Stone brick",
      "kind": "item",
      "icon": "icons/stone-brick.png"
    },
    {
      "id": "wood",
      "name": "Wood",
      "kind": "item",
      "icon": "icons/wood.png"
    },
    {
      "id": "coal",
      "name": "Coal",
      "kind": "item",
      "icon": "icons/coal.png"
    },
    {
      "id": "stone",
      "name": "Stone",
      "kind": "item",
      "icon": "icons/stone.png"
    },
    {
      "id": "iron-ore",
      "name": "Iron ore",
      "kind": "item",
      "icon": "icons/iron-ore.png"
    },
    {
      "id": "copper-ore",
      "name": "Copper ore",
      "kind": "item",
      "icon": "icons/copper-ore.png"
    },
    {
      "id": "iron-plate",
      "name": "Iron plate",
      "kind": "item",
      "icon": "icons/iron-plate.png"
    },
    {
      "id": "copper-plate",
      "name": "Copper plate",
      "kind": "item",
      "icon": "icons/copper-plate.png"
    },
    {
      "id": "copper-cable",
      "name": "Copper cable",
      "kind": "item",
      "icon": "icons/copper-cable.png"
    },
    {
      "id": "iron-stick",
      "name": "Iron stick",
      "kind": "item",
      "icon": "icons/iron-stick.png"
    },
    {
      "id": "iron-gear-wheel",
      "name": "Iron gear wheel",
      "kind": "item",
      "icon": "icons/iron-gear-wheel.png"
    },
    {
      "id": "electronic-circuit",
      "name": "Electronic circuit",
      "kind": "item",
      "icon": "icons/electronic-circuit.png"
    },
    {
      "id": "wooden-chest",
      "name": "Wooden chest",
      "kind": "item",
      "icon": "icons/wooden-chest.png"
    },
    {
      "id": "stone-furnace",
      "name": "Stone furnace",
      "kind": "item",
      "icon": "icons/stone-furnace.png"
    },
    {
      "id": "burner-mining-drill",
      "name": "Burner mining drill",
      "kind": "item",
      "icon": "icons/burner-mining-drill.png"
    },
    {
      "id": "electric-mining-drill",
      "name": "Electric mining drill",
      "kind": "item",
      "icon": "icons/electric-mining-drill.png"
    },
    {
      "id": "burner-inserter",
      "name": "Burner inserter",
      "kind": "item",
      "icon": "icons/burner-inserter.png"
    },
    {
      "id": "inserter",
      "name": "Inserter",
      "kind": "item",
      "icon": "icons/inserter.png"
    },
    {
      "id": "fast-inserter",
      "name": "Fast inserter",
      "kind": "item",
      "icon": "icons/fast-inserter.png"
    },
    {
      "id": "long-handed-inserter",
      "name": "Long-handed inserter",
      "kind": "item",
      "icon": "icons/long-handed-inserter.png"
    },
    {
      "id": "offshore-pump",
      "name": "Offshore pump",
      "kind": "item",
      "icon": "icons/offshore-pump.png"
    },
    {
      "id": "pipe",
      "name": "Pipe",
      "kind": "item",
      "icon": "icons/pipe.png"
    },
    {
      "id": "boiler",
      "name": "Boiler",
      "kind": "item",
      "icon": "icons/boiler.png"
    },
    {
      "id": "steam-engine",
      "name": "Steam engine",
      "kind": "item",
      "icon": "icons/steam-engine.png"
    },
    {
      "id": "small-electric-pole",
      "name": "Small electric pole",
      "kind": "item",
      "icon": "icons/small-electric-pole.png"
    },
    {
      "id": "radar",
      "name": "Radar",
      "kind": "item",
      "icon": "icons/radar.png"
    },
    {
      "id": "small-lamp",
      "name": "Lamp",
      "kind": "item",
      "icon": "icons/small-lamp.png"
    },
    {
      "id": "pipe-to-ground",
      "name": "Pipe to ground",
      "kind": "item",
      "icon": "icons/pipe-to-ground.png"
    },
    {
      "id": "assembling-machine-1",
      "name": "Assembling machine 1",
      "kind": "item",
      "icon": "icons/assembling-machine-1.png"
    },
    {
      "id": "assembling-machine-2",
      "name": "Assembling machine 2",
      "kind": "item",
      "icon": "icons/assembling-machine-2.png"
    },
    {
      "id": "red-wire",
      "name": "Red wire",
      "kind": "item",
      "icon": "icons/red-wire.png"
    },
    {
      "id": "green-wire",
      "name": "Green wire",
      "kind": "item",
      "icon": "icons/green-wire.png"
    },
    {
      "id": "copper-wire",
      "name": "Copper wire",
      "kind": "item",
      "icon": "icons/copper-wire.png"
    },
    {
      "id": "stone-wall",
      "name": "Wall",
      "kind": "item",
      "icon": "icons/stone-wall.png"
    },
    {
      "id": "lab",
      "name": "Lab",
      "kind": "item",
      "icon": "icons/lab.png"
    },
    {
      "id": "automation-science-pack",
      "name": "Automation science pack",
      "kind": "item",
      "icon": "icons/automation-science-pack.png"
    },
    {
      "id": "logistic-science-pack",
      "name": "Logistic science pack",
      "kind": "item",
      "icon": "icons/logistic-science-pack.png"
    },
    {
      "id": "steel-plate",
      "name": "Steel plate",
      "kind": "item",
      "icon": "icons/steel-plate.png"
    },
    {
      "id": "engine-unit",
      "name": "Engine unit",
      "kind": "item",
      "icon": "icons/engine-unit.png"
    },
    {
      "id": "electric-furnace",
      "name": "Electric furnace",
      "kind": "item",
      "icon": "icons/electric-furnace.png"
    },
    {
      "id": "solid-fuel",
      "name": "Solid fuel",
      "kind": "item",
      "icon": "icons/solid-fuel.png"
    },
    {
      "id": "rocket-fuel",
      "name": "Rocket fuel",
      "kind": "item",
      "icon": "icons/rocket-fuel.png"
    },
    {
      "id": "iron-chest",
      "name": "Iron chest",
      "kind": "item",
      "icon": "icons/iron-chest.png"
    },
    {
      "id": "big-electric-pole",
      "name": "Big electric pole",
      "kind": "item",
      "icon": "icons/big-electric-pole.png"
    },
    {
      "id": "medium-electric-pole",
      "name": "Medium electric pole",
      "kind": "item",
      "icon": "icons/medium-electric-pole.png"
    },
    {
      "id": "steel-furnace",
      "name": "Steel furnace",
      "kind": "item",
      "icon": "icons/steel-furnace.png"
    },
    {
      "id": "gate",
      "name": "Gate",
      "kind": "item",
      "icon": "icons/gate.png"
    },
    {
      "id": "steel-chest",
      "name": "Steel chest",
      "kind": "item",
      "icon": "icons/steel-chest.png"
    },
    {
      "id": "solar-panel",
      "name": "Solar panel",
      "kind": "item",
      "icon": "icons/solar-panel.png"
    },
    {
      "id": "train-stop",
      "name": "Train stop",
      "kind": "item",
      "icon": "icons/train-stop.png"
    },
    {
      "id": "rail-signal",
      "name": "Rail signal",
      "kind": "item",
      "icon": "icons/rail-signal.png"
    },
    {
      "id": "rail-chain-signal",
      "name": "Rail chain signal",
      "kind": "item",
      "icon": "icons/rail-chain-signal.png"
    },
    {
      "id": "concrete",
      "name": "Concrete",
      "kind": "item",
      "icon": "icons/concrete.png"
    },
    {
      "id": "refined-concrete",
      "name": "Refined concrete",
      "kind": "item",
      "icon": "icons/refined-concrete.png"
    },
    {
      "id": "hazard-concrete",
      "name": "Hazard concrete",
      "kind": "item",
      "icon": "icons/hazard-concrete.png"
    },
    {
      "id": "refined-hazard-concrete",
      "name": "Refined hazard concrete",
      "kind": "item",
      "icon": "icons/refined-hazard-concrete.png"
    },
    {
      "id": "landfill",
      "name": "Landfill",
      "kind": "item",
      "icon": "icons/landfill.png"
    },
    {
      "id": "accumulator",
      "name": "Accumulator",
      "kind": "item",
      "icon": "icons/accumulator.png"
    },
    {
      "id": "uranium-ore",
      "name": "Uranium ore",
      "kind": "item",
      "icon": "icons/uranium-ore.png"
    },
    {
      "id": "transport-belt",
      "name": "Transport belt",
      "kind": "item",
      "icon": "icons/transport-belt.png"
    },
    {
      "id": "fast-transport-belt",
      "name": "Fast transport belt",
      "kind": "item",
      "icon": "icons/fast-transport-belt.png"
    },
    {
      "id": "express-transport-belt",
      "name": "Express transport belt",
      "kind": "item",
      "icon": "icons/express-transport-belt.png"
    },
    {
      "id": "bulk-inserter",
      "name": "Bulk inserter",
      "kind": "item",
      "icon": "icons/bulk-inserter.png"
    },
    {
      "id": "assembling-machine-3",
      "name": "Assembling machine 3",
      "kind": "item",
      "icon": "icons/assembling-machine-3.png"
    },
    {
      "id": "chemical-science-pack",
      "name": "Chemical science pack",
      "kind": "item",
      "icon": "icons/chemical-science-pack.png"
    },
    {
      "id": "military-science-pack",
      "name": "Military science pack",
      "kind": "item",
      "icon": "icons/military-science-pack.png"
    },
    {
      "id": "production-science-pack",
      "name": "Production science pack",
      "kind": "item",
      "icon": "icons/production-science-pack.png"
    },
    {
      "id": "utility-science-pack",
      "name": "Utility science pack",
      "kind": "item",
      "icon": "icons/utility-science-pack.png"
    },
    {
      "id": "space-science-pack",
      "name": "Space science pack",
      "kind": "item",
      "icon": "icons/space-science-pack.png"
    },
    {
      "id": "underground-belt",
      "name": "Underground belt",
      "kind": "item",
      "icon": "icons/underground-belt.png"
    },
    {
      "id": "fast-underground-belt",
      "name": "Fast underground belt",
      "kind": "item",
      "icon": "icons/fast-underground-belt.png"
    },
    {
      "id": "express-underground-belt",
      "name": "Express underground belt",
      "kind": "item",
      "icon": "icons/express-underground-belt.png"
    },
    {
      "id": "splitter",
      "name": "Splitter",
      "kind": "item",
      "icon": "icons/splitter.png"
    },
    {
      "id": "lane-splitter",
      "name": "Lane splitter",
      "kind": "item",
      "icon": "icons/lane-splitter.png"
    },
    {
      "id": "fast-splitter",
      "name": "Fast splitter",
      "kind": "item",
      "icon": "icons/fast-splitter.png"
    },
    {
      "id": "express-splitter",
      "name": "Express splitter",
      "kind": "item",
      "icon": "icons/express-splitter.png"
    },
    {
      "id": "loader",
      "name": "Loader",
      "kind": "item",
      "icon": "icons/loader.png"
    },
    {
      "id": "fast-loader",
      "name": "Fast loader",
      "kind": "item",
      "icon": "icons/fast-loader.png"
    },
    {
      "id": "express-loader",
      "name": "Express loader",
      "kind": "item",
      "icon": "icons/express-loader.png"
    },
    {
      "id": "advanced-circuit",
      "name": "Advanced circuit",
      "kind": "item",
      "icon": "icons/advanced-circuit.png"
    },
    {
      "id": "processing-unit",
      "name": "Processing unit",
      "kind": "item",
      "icon": "icons/processing-unit.png"
    },
    {
      "id": "logistic-robot",
      "name": "Logistic robot",
      "kind": "item",
      "icon": "icons/logistic-robot.png"
    },
    {
      "id": "construction-robot",
      "name": "Construction robot",
      "kind": "item",
      "icon": "icons/construction-robot.png"
    },
    {
      "id": "passive-provider-chest",
      "name": "Passive provider chest",
      "kind": "item",
      "icon": "icons/passive-provider-chest.png"
    },
    {
      "id": "active-provider-chest",
      "name": "Active provider chest",
      "kind": "item",
      "icon": "icons/active-provider-chest.png"
    },
    {
      "id": "storage-chest",
      "name": "Storage chest",
      "kind": "item",
      "icon": "icons/storage-chest.png"
    },
    {
      "id": "buffer-chest",
      "name": "Buffer chest",
      "kind": "item",
      "icon": "icons/buffer-chest.png"
    },
    {
      "id": "requester-chest",
      "name": "Requester chest",
      "kind": "item",
      "icon": "icons/requester-chest.png"
    },
    {
      "id": "rocket-silo",
      "name": "Rocket silo",
      "kind": "item",
      "icon": "icons/rocket-silo.png"
    },
    {
      "id": "cargo-landing-pad",
      "name": "Cargo landing pad",
      "kind": "item",
      "icon": "icons/cargo-landing-pad.png"
    },
    {
      "id": "roboport",
      "name": "Roboport",
      "kind": "item",
      "icon": "icons/roboport.png"
    },
    {
      "id": "coin",
      "name": "Coin",
      "kind": "item",
      "icon": "icons/coin.png"
    },
    {
      "id": "substation",
      "name": "Substation",
      "kind": "item",
      "icon": "icons/substation.png"
    },
    {
      "id": "beacon",
      "name": "Beacon",
      "kind": "item",
      "icon": "icons/beacon.png"
    },
    {
      "id": "storage-tank",
      "name": "Storage tank",
      "kind": "item",
      "icon": "icons/storage-tank.png"
    },
    {
      "id": "pump",
      "name": "Pump",
      "kind": "item",
      "icon": "icons/pump.png"
    },
    {
      "id": "pumpjack",
      "name": "Pumpjack",
      "kind": "item",
      "icon": "icons/pumpjack.png"
    },
    {
      "id": "oil-refinery",
      "name": "Oil refinery",
      "kind": "item",
      "icon": "icons/oil-refinery.png"
    },
    {
      "id": "chemical-plant",
      "name": "Chemical plant",
      "kind": "item",
      "icon": "icons/chemical-plant.png"
    },
    {
      "id": "sulfur",
      "name": "Sulfur",
      "kind": "item",
      "icon": "icons/sulfur.png"
    },
    {
      "id": "barrel",
      "name": "Barrel",
      "kind": "item",
      "icon": "icons/barrel.png"
    },
    {
      "id": "plastic-bar",
      "name": "Plastic bar",
      "kind": "item",
      "icon": "icons/plastic-bar.png"
    },
    {
      "id": "electric-engine-unit",
      "name": "Electric engine unit",
      "kind": "item",
      "icon": "icons/electric-engine-unit.png"
    },
    {
      "id": "explosives",
      "name": "Explosives",
      "kind": "item",
      "icon": "icons/explosives.png"
    },
    {
      "id": "battery",
      "name": "Battery",
      "kind": "item",
      "icon": "icons/battery.png"
    },
    {
      "id": "flying-robot-frame",
      "name": "Flying robot frame",
      "kind": "item",
      "icon": "icons/flying-robot-frame.png"
    },
    {
      "id": "low-density-structure",
      "name": "Low density structure",
      "kind": "item",
      "icon": "icons/low-density-structure.png"
    },
    {
      "id": "nuclear-fuel",
      "name": "Nuclear fuel",
      "kind": "item",
      "icon": "icons/nuclear-fuel.png"
    },
    {
      "id": "rocket-part",
      "name": "Rocket part",
      "kind": "item",
      "icon": "icons/rocket-part.png"
    },
    {
      "id": "electric-energy-interface",
      "name": "Electric energy interface",
      "kind": "item",
      "icon": "icons/electric-energy-interface.png"
    },
    {
      "id": "heat-interface",
      "name": "Heat interface",
      "kind": "item",
      "icon": "icons/heat-interface.png"
    },
    {
      "id": "nuclear-reactor",
      "name": "Nuclear reactor",
      "kind": "item",
      "icon": "icons/nuclear-reactor.png"
    },
    {
      "id": "uranium-235",
      "name": "Uranium-235",
      "kind": "item",
      "icon": "icons/uranium-235.png"
    },
    {
      "id": "uranium-238",
      "name": "Uranium-238",
      "kind": "item",
      "icon": "icons/uranium-238.png"
    },
    {
      "id": "centrifuge",
      "name": "Centrifuge",
      "kind": "item",
      "icon": "icons/centrifuge.png"
    },
    {
      "id": "uranium-fuel-cell",
      "name": "Uranium fuel cell",
      "kind": "item",
      "icon": "icons/uranium-fuel-cell.png"
    },
    {
      "id": "depleted-uranium-fuel-cell",
      "name": "Depleted uranium fuel cell",
      "kind": "item",
      "icon": "icons/depleted-uranium-fuel-cell.png"
    },
    {
      "id": "heat-exchanger",
      "name": "Heat exchanger",
      "kind": "item",
      "icon": "icons/heat-exchanger.png"
    },
    {
      "id": "steam-turbine",
      "name": "Steam turbine",
      "kind": "item",
      "icon": "icons/steam-turbine.png"
    },
    {
      "id": "heat-pipe",
      "name": "Heat pipe",
      "kind": "item",
      "icon": "icons/heat-pipe.png"
    },
    {
      "id": "simple-entity-with-force",
      "name": "Simple entity with force",
      "kind": "item",
      "icon": "icons/simple-entity-with-force.png"
    },
    {
      "id": "simple-entity-with-owner",
      "name": "Simple entity with owner",
      "kind": "item",
      "icon": "icons/simple-entity-with-owner.png"
    },
    {
      "id": "infinity-chest",
      "name": "Infinity chest",
      "kind": "item",
      "icon": "icons/infinity-chest.png"
    },
    {
      "id": "infinity-cargo-wagon",
      "name": "Infinity cargo wagon",
      "kind": "item",
      "icon": "icons/infinity-cargo-wagon.png"
    },
    {
      "id": "infinity-pipe",
      "name": "Infinity pipe",
      "kind": "item",
      "icon": "icons/infinity-pipe.png"
    },
    {
      "id": "burner-generator",
      "name": "Burner generator",
      "kind": "item",
      "icon": "icons/burner-generator.png"
    },
    {
      "id": "linked-chest",
      "name": "Linked chest",
      "kind": "item",
      "icon": "icons/linked-chest.png"
    },
    {
      "id": "proxy-container",
      "name": "Proxy container",
      "kind": "item",
      "icon": "icons/proxy-container.png"
    },
    {
      "id": "bottomless-chest",
      "name": "Bottomless chest",
      "kind": "item",
      "icon": "icons/bottomless-chest.png"
    },
    {
      "id": "linked-belt",
      "name": "Linked belt",
      "kind": "item",
      "icon": "icons/linked-belt.png"
    },
    {
      "id": "one-way-valve",
      "name": "One-way valve",
      "kind": "item",
      "icon": "icons/one-way-valve.png"
    },
    {
      "id": "overflow-valve",
      "name": "Overflow valve",
      "kind": "item",
      "icon": "icons/overflow-valve.png"
    },
    {
      "id": "top-up-valve",
      "name": "Top-up valve",
      "kind": "item",
      "icon": "icons/top-up-valve.png"
    },
    {
      "id": "land-mine",
      "name": "Land mine",
      "kind": "item",
      "icon": "icons/land-mine.png"
    },
    {
      "id": "solar-panel-equipment",
      "name": "Portable solar panel",
      "kind": "item",
      "icon": "icons/solar-panel-equipment.png"
    },
    {
      "id": "fission-reactor-equipment",
      "name": "Portable fission reactor",
      "kind": "item",
      "icon": "icons/fission-reactor-equipment.png"
    },
    {
      "id": "electric-energy-interface-equipment",
      "name": "Electric energy interface equipment",
      "kind": "item",
      "icon": "icons/electric-energy-interface-equipment.png"
    },
    {
      "id": "battery-equipment",
      "name": "Personal battery",
      "kind": "item",
      "icon": "icons/battery-equipment.png"
    },
    {
      "id": "battery-mk2-equipment",
      "name": "Personal battery MK2",
      "kind": "item",
      "icon": "icons/battery-mk2-equipment.png"
    },
    {
      "id": "belt-immunity-equipment",
      "name": "Belt immunity equipment",
      "kind": "item",
      "icon": "icons/belt-immunity-equipment.png"
    },
    {
      "id": "exoskeleton-equipment",
      "name": "Exoskeleton",
      "kind": "item",
      "icon": "icons/exoskeleton-equipment.png"
    },
    {
      "id": "personal-roboport-equipment",
      "name": "Personal roboport",
      "kind": "item",
      "icon": "icons/personal-roboport-equipment.png"
    },
    {
      "id": "personal-roboport-mk2-equipment",
      "name": "Personal roboport MK2",
      "kind": "item",
      "icon": "icons/personal-roboport-mk2-equipment.png"
    },
    {
      "id": "night-vision-equipment",
      "name": "Nightvision",
      "kind": "item",
      "icon": "icons/night-vision-equipment.png"
    },
    {
      "id": "energy-shield-equipment",
      "name": "Energy shield",
      "kind": "item",
      "icon": "icons/energy-shield-equipment.png"
    },
    {
      "id": "energy-shield-mk2-equipment",
      "name": "Energy shield MK2",
      "kind": "item",
      "icon": "icons/energy-shield-mk2-equipment.png"
    },
    {
      "id": "personal-laser-defense-equipment",
      "name": "Personal laser defense",
      "kind": "item",
      "icon": "icons/personal-laser-defense-equipment.png"
    },
    {
      "id": "discharge-defense-equipment",
      "name": "Discharge defense",
      "kind": "item",
      "icon": "icons/discharge-defense-equipment.png"
    },
    {
      "id": "gun-turret",
      "name": "Gun turret",
      "kind": "item",
      "icon": "icons/gun-turret.png"
    },
    {
      "id": "laser-turret",
      "name": "Laser turret",
      "kind": "item",
      "icon": "icons/laser-turret.png"
    },
    {
      "id": "flamethrower-turret",
      "name": "Flamethrower turret",
      "kind": "item",
      "icon": "icons/flamethrower-turret.png"
    },
    {
      "id": "artillery-turret",
      "name": "Artillery turret",
      "kind": "item",
      "icon": "icons/artillery-turret.png"
    },
    {
      "id": "arithmetic-combinator",
      "name": "Arithmetic combinator",
      "kind": "item",
      "icon": "icons/arithmetic-combinator.png"
    },
    {
      "id": "decider-combinator",
      "name": "Decider combinator",
      "kind": "item",
      "icon": "icons/decider-combinator.png"
    },
    {
      "id": "constant-combinator",
      "name": "Constant combinator",
      "kind": "item",
      "icon": "icons/constant-combinator.png"
    },
    {
      "id": "selector-combinator",
      "name": "Selector combinator",
      "kind": "item",
      "icon": "icons/selector-combinator.png"
    },
    {
      "id": "power-switch",
      "name": "Power switch",
      "kind": "item",
      "icon": "icons/power-switch.png"
    },
    {
      "id": "programmable-speaker",
      "name": "Programmable speaker",
      "kind": "item",
      "icon": "icons/programmable-speaker.png"
    },
    {
      "id": "display-panel",
      "name": "Display panel",
      "kind": "item",
      "icon": "icons/display-panel.png"
    },
    {
      "id": "science",
      "name": "Science",
      "kind": "item",
      "icon": "icons/science.png"
    },
    {
      "id": "rail-support",
      "name": "Rail support",
      "kind": "item",
      "icon": "icons/rail-support.png"
    },
    {
      "id": "recycler",
      "name": "Recycler",
      "kind": "item",
      "icon": "icons/recycler.png"
    },
    {
      "id": "space-platform-foundation",
      "name": "Space platform foundation",
      "kind": "item",
      "icon": "icons/space-platform-foundation.png",
      "spaceAge": true
    },
    {
      "id": "metallurgic-science-pack",
      "name": "Metallurgic science pack",
      "kind": "item",
      "icon": "icons/metallurgic-science-pack.png",
      "spaceAge": true
    },
    {
      "id": "agricultural-science-pack",
      "name": "Agricultural science pack",
      "kind": "item",
      "icon": "icons/agricultural-science-pack.png",
      "spaceAge": true
    },
    {
      "id": "electromagnetic-science-pack",
      "name": "Electromagnetic science pack",
      "kind": "item",
      "icon": "icons/electromagnetic-science-pack.png",
      "spaceAge": true
    },
    {
      "id": "cryogenic-science-pack",
      "name": "Cryogenic science pack",
      "kind": "item",
      "icon": "icons/cryogenic-science-pack.png",
      "spaceAge": true
    },
    {
      "id": "promethium-science-pack",
      "name": "Promethium science pack",
      "kind": "item",
      "icon": "icons/promethium-science-pack.png",
      "spaceAge": true
    },
    {
      "id": "turbo-transport-belt",
      "name": "Turbo transport belt",
      "kind": "item",
      "icon": "icons/turbo-transport-belt.png",
      "spaceAge": true
    },
    {
      "id": "turbo-underground-belt",
      "name": "Turbo underground belt",
      "kind": "item",
      "icon": "icons/turbo-underground-belt.png",
      "spaceAge": true
    },
    {
      "id": "turbo-splitter",
      "name": "Turbo splitter",
      "kind": "item",
      "icon": "icons/turbo-splitter.png",
      "spaceAge": true
    },
    {
      "id": "turbo-loader",
      "name": "Turbo loader",
      "kind": "item",
      "icon": "icons/turbo-loader.png",
      "spaceAge": true
    },
    {
      "id": "toolbelt-equipment",
      "name": "Toolbelt equipment",
      "kind": "item",
      "icon": "icons/toolbelt-equipment.png",
      "spaceAge": true
    },
    {
      "id": "battery-mk3-equipment",
      "name": "Personal battery MK3",
      "kind": "item",
      "icon": "icons/battery-mk3-equipment.png",
      "spaceAge": true
    },
    {
      "id": "cargo-bay",
      "name": "Cargo bay",
      "kind": "item",
      "icon": "icons/cargo-bay.png",
      "spaceAge": true
    },
    {
      "id": "landing-pad-unloading-bay",
      "name": "Landing pad unloading bay",
      "kind": "item",
      "icon": "icons/landing-pad-unloading-bay.png",
      "spaceAge": true
    },
    {
      "id": "metallic-asteroid-chunk",
      "name": "Metallic asteroid chunk",
      "kind": "item",
      "icon": "icons/metallic-asteroid-chunk.png",
      "spaceAge": true
    },
    {
      "id": "carbonic-asteroid-chunk",
      "name": "Carbonic asteroid chunk",
      "kind": "item",
      "icon": "icons/carbonic-asteroid-chunk.png",
      "spaceAge": true
    },
    {
      "id": "oxide-asteroid-chunk",
      "name": "Oxide asteroid chunk",
      "kind": "item",
      "icon": "icons/oxide-asteroid-chunk.png",
      "spaceAge": true
    },
    {
      "id": "promethium-asteroid-chunk",
      "name": "Promethium asteroid chunk",
      "kind": "item",
      "icon": "icons/promethium-asteroid-chunk.png",
      "spaceAge": true
    },
    {
      "id": "asteroid-collector",
      "name": "Asteroid collector",
      "kind": "item",
      "icon": "icons/asteroid-collector.png",
      "spaceAge": true
    },
    {
      "id": "crusher",
      "name": "Crusher",
      "kind": "item",
      "icon": "icons/crusher.png",
      "spaceAge": true
    },
    {
      "id": "thruster",
      "name": "Thruster",
      "kind": "item",
      "icon": "icons/thruster.png",
      "spaceAge": true
    },
    {
      "id": "ice",
      "name": "Ice",
      "kind": "item",
      "icon": "icons/ice.png",
      "spaceAge": true
    },
    {
      "id": "carbon",
      "name": "Carbon",
      "kind": "item",
      "icon": "icons/carbon.png",
      "spaceAge": true
    },
    {
      "id": "calcite",
      "name": "Calcite",
      "kind": "item",
      "icon": "icons/calcite.png",
      "spaceAge": true
    },
    {
      "id": "tungsten-ore",
      "name": "Tungsten ore",
      "kind": "item",
      "icon": "icons/tungsten-ore.png",
      "spaceAge": true
    },
    {
      "id": "tungsten-plate",
      "name": "Tungsten plate",
      "kind": "item",
      "icon": "icons/tungsten-plate.png",
      "spaceAge": true
    },
    {
      "id": "big-mining-drill",
      "name": "Big mining drill",
      "kind": "item",
      "icon": "icons/big-mining-drill.png",
      "spaceAge": true
    },
    {
      "id": "tungsten-carbide",
      "name": "Tungsten carbide",
      "kind": "item",
      "icon": "icons/tungsten-carbide.png",
      "spaceAge": true
    },
    {
      "id": "foundry",
      "name": "Foundry",
      "kind": "item",
      "icon": "icons/foundry.png",
      "spaceAge": true
    },
    {
      "id": "railgun-turret",
      "name": "Railgun turret",
      "kind": "item",
      "icon": "icons/railgun-turret.png",
      "spaceAge": true
    },
    {
      "id": "copper-bacteria",
      "name": "Copper bacteria",
      "kind": "item",
      "icon": "icons/copper-bacteria.png",
      "spaceAge": true
    },
    {
      "id": "iron-bacteria",
      "name": "Iron bacteria",
      "kind": "item",
      "icon": "icons/iron-bacteria.png",
      "spaceAge": true
    },
    {
      "id": "yumako-seed",
      "name": "Yumako seed",
      "kind": "item",
      "icon": "icons/yumako-seed.png",
      "spaceAge": true
    },
    {
      "id": "jellynut-seed",
      "name": "Jellynut seed",
      "kind": "item",
      "icon": "icons/jellynut-seed.png",
      "spaceAge": true
    },
    {
      "id": "nutrients",
      "name": "Nutrients",
      "kind": "item",
      "icon": "icons/nutrients.png",
      "spaceAge": true
    },
    {
      "id": "artificial-yumako-soil",
      "name": "Artificial yumako soil",
      "kind": "item",
      "icon": "icons/artificial-yumako-soil.png",
      "spaceAge": true
    },
    {
      "id": "overgrowth-yumako-soil",
      "name": "Overgrowth yumako soil",
      "kind": "item",
      "icon": "icons/overgrowth-yumako-soil.png",
      "spaceAge": true
    },
    {
      "id": "artificial-jellynut-soil",
      "name": "Artificial jellynut soil",
      "kind": "item",
      "icon": "icons/artificial-jellynut-soil.png",
      "spaceAge": true
    },
    {
      "id": "overgrowth-jellynut-soil",
      "name": "Overgrowth jellynut soil",
      "kind": "item",
      "icon": "icons/overgrowth-jellynut-soil.png",
      "spaceAge": true
    },
    {
      "id": "agricultural-tower",
      "name": "Agricultural tower",
      "kind": "item",
      "icon": "icons/agricultural-tower.png",
      "spaceAge": true
    },
    {
      "id": "biochamber",
      "name": "Biochamber",
      "kind": "item",
      "icon": "icons/biochamber.png",
      "spaceAge": true
    },
    {
      "id": "biolab",
      "name": "Biolab",
      "kind": "item",
      "icon": "icons/biolab.png",
      "spaceAge": true
    },
    {
      "id": "captive-biter-spawner",
      "name": "Captive biter spawner",
      "kind": "item",
      "icon": "icons/captive-biter-spawner.png",
      "spaceAge": true
    },
    {
      "id": "biter-egg",
      "name": "Biter egg",
      "kind": "item",
      "icon": "icons/biter-egg.png",
      "spaceAge": true
    },
    {
      "id": "pentapod-egg",
      "name": "Pentapod egg",
      "kind": "item",
      "icon": "icons/pentapod-egg.png",
      "spaceAge": true
    },
    {
      "id": "carbon-fiber",
      "name": "Carbon fiber",
      "kind": "item",
      "icon": "icons/carbon-fiber.png",
      "spaceAge": true
    },
    {
      "id": "stack-inserter",
      "name": "Stack inserter",
      "kind": "item",
      "icon": "icons/stack-inserter.png",
      "spaceAge": true
    },
    {
      "id": "rocket-turret",
      "name": "Rocket turret",
      "kind": "item",
      "icon": "icons/rocket-turret.png",
      "spaceAge": true
    },
    {
      "id": "holmium-ore",
      "name": "Holmium ore",
      "kind": "item",
      "icon": "icons/holmium-ore.png",
      "spaceAge": true
    },
    {
      "id": "holmium-plate",
      "name": "Holmium plate",
      "kind": "item",
      "icon": "icons/holmium-plate.png",
      "spaceAge": true
    },
    {
      "id": "lithium",
      "name": "Lithium",
      "kind": "item",
      "icon": "icons/lithium.png",
      "spaceAge": true
    },
    {
      "id": "lithium-plate",
      "name": "Lithium plate",
      "kind": "item",
      "icon": "icons/lithium-plate.png",
      "spaceAge": true
    },
    {
      "id": "scrap",
      "name": "Scrap",
      "kind": "item",
      "icon": "icons/scrap.png",
      "spaceAge": true
    },
    {
      "id": "lightning-rod",
      "name": "Lightning rod",
      "kind": "item",
      "icon": "icons/lightning-rod.png",
      "spaceAge": true
    },
    {
      "id": "lightning-collector",
      "name": "Lightning collector",
      "kind": "item",
      "icon": "icons/lightning-collector.png",
      "spaceAge": true
    },
    {
      "id": "heating-tower",
      "name": "Heating tower",
      "kind": "item",
      "icon": "icons/heating-tower.png",
      "spaceAge": true
    },
    {
      "id": "electromagnetic-plant",
      "name": "Electromagnetic plant",
      "kind": "item",
      "icon": "icons/electromagnetic-plant.png",
      "spaceAge": true
    },
    {
      "id": "superconductor",
      "name": "Superconductor",
      "kind": "item",
      "icon": "icons/superconductor.png",
      "spaceAge": true
    },
    {
      "id": "supercapacitor",
      "name": "Supercapacitor",
      "kind": "item",
      "icon": "icons/supercapacitor.png",
      "spaceAge": true
    },
    {
      "id": "tesla-turret",
      "name": "Tesla turret",
      "kind": "item",
      "icon": "icons/tesla-turret.png",
      "spaceAge": true
    },
    {
      "id": "quantum-processor",
      "name": "Quantum processor",
      "kind": "item",
      "icon": "icons/quantum-processor.png",
      "spaceAge": true
    },
    {
      "id": "fusion-reactor-equipment",
      "name": "Portable fusion reactor",
      "kind": "item",
      "icon": "icons/fusion-reactor-equipment.png",
      "spaceAge": true
    },
    {
      "id": "fusion-power-cell",
      "name": "Fusion power cell",
      "kind": "item",
      "icon": "icons/fusion-power-cell.png",
      "spaceAge": true
    },
    {
      "id": "fusion-reactor",
      "name": "Fusion reactor",
      "kind": "item",
      "icon": "icons/fusion-reactor.png",
      "spaceAge": true
    },
    {
      "id": "fusion-generator",
      "name": "Fusion generator",
      "kind": "item",
      "icon": "icons/fusion-generator.png",
      "spaceAge": true
    },
    {
      "id": "cryogenic-plant",
      "name": "Cryogenic plant",
      "kind": "item",
      "icon": "icons/cryogenic-plant.png",
      "spaceAge": true
    },
    {
      "id": "spoilage",
      "name": "Spoilage",
      "kind": "item",
      "icon": "icons/spoilage.png",
      "spaceAge": true
    },
    {
      "id": "ice-platform",
      "name": "Ice platform",
      "kind": "item",
      "icon": "icons/ice-platform.png",
      "spaceAge": true
    },
    {
      "id": "foundation",
      "name": "Foundation",
      "kind": "item",
      "icon": "icons/foundation.png",
      "spaceAge": true
    },
    {
      "id": "space-platform-hub",
      "name": "Space platform hub",
      "kind": "item",
      "icon": "icons/space-platform-hub.png",
      "spaceAge": true
    },
    {
      "id": "tree-seed",
      "name": "Tree seed",
      "kind": "item",
      "icon": "icons/tree-seed.png",
      "spaceAge": true
    },
    {
      "id": "water-barrel",
      "name": "Water barrel",
      "kind": "item",
      "icon": "icons/water-barrel.png"
    },
    {
      "id": "sulfuric-acid-barrel",
      "name": "Sulfuric acid barrel",
      "kind": "item",
      "icon": "icons/sulfuric-acid-barrel.png"
    },
    {
      "id": "crude-oil-barrel",
      "name": "Crude oil barrel",
      "kind": "item",
      "icon": "icons/crude-oil-barrel.png"
    },
    {
      "id": "heavy-oil-barrel",
      "name": "Heavy oil barrel",
      "kind": "item",
      "icon": "icons/heavy-oil-barrel.png"
    },
    {
      "id": "light-oil-barrel",
      "name": "Light oil barrel",
      "kind": "item",
      "icon": "icons/light-oil-barrel.png"
    },
    {
      "id": "petroleum-gas-barrel",
      "name": "Petroleum gas barrel",
      "kind": "item",
      "icon": "icons/petroleum-gas-barrel.png"
    },
    {
      "id": "lubricant-barrel",
      "name": "Lubricant barrel",
      "kind": "item",
      "icon": "icons/lubricant-barrel.png"
    },
    {
      "id": "fluoroketone-cold-barrel",
      "name": "Fluoroketone (Cold) barrel",
      "kind": "item",
      "icon": "icons/fluoroketone-cold-barrel.png"
    },
    {
      "id": "fluoroketone-hot-barrel",
      "name": "Fluoroketone (Hot) barrel",
      "kind": "item",
      "icon": "icons/fluoroketone-hot-barrel.png"
    },
    {
      "id": "water",
      "name": "Water",
      "kind": "fluid",
      "icon": "icons/fluid/water.png"
    },
    {
      "id": "steam",
      "name": "Steam",
      "kind": "fluid",
      "icon": "icons/fluid/steam.png"
    },
    {
      "id": "sulfuric-acid",
      "name": "Sulfuric Acid",
      "kind": "fluid",
      "icon": "icons/fluid/sulfuric-acid.png"
    },
    {
      "id": "crude-oil",
      "name": "Crude Oil",
      "kind": "fluid",
      "icon": "icons/fluid/crude-oil.png"
    },
    {
      "id": "heavy-oil",
      "name": "Heavy Oil",
      "kind": "fluid",
      "icon": "icons/fluid/heavy-oil.png"
    },
    {
      "id": "light-oil",
      "name": "Light Oil",
      "kind": "fluid",
      "icon": "icons/fluid/light-oil.png"
    },
    {
      "id": "petroleum-gas",
      "name": "Petroleum Gas",
      "kind": "fluid",
      "icon": "icons/fluid/petroleum-gas.png"
    },
    {
      "id": "lubricant",
      "name": "Lubricant",
      "kind": "fluid",
      "icon": "icons/fluid/lubricant.png"
    },
    {
      "id": "ammoniacal-solution",
      "name": "Ammoniacal Solution",
      "kind": "fluid",
      "icon": "icons/fluid/ammoniacal-solution.png",
      "spaceAge": true
    },
    {
      "id": "ammonia",
      "name": "Ammonia",
      "kind": "fluid",
      "icon": "icons/fluid/ammonia.png",
      "spaceAge": true
    },
    {
      "id": "fluorine",
      "name": "Fluorine",
      "kind": "fluid",
      "icon": "icons/fluid/fluorine.png",
      "spaceAge": true
    },
    {
      "id": "fluoroketone-cold",
      "name": "Fluoroketone Cold",
      "kind": "fluid",
      "icon": "icons/fluid/fluoroketone-cold.png",
      "spaceAge": true
    },
    {
      "id": "fluoroketone-hot",
      "name": "Fluoroketone Hot",
      "kind": "fluid",
      "icon": "icons/fluid/fluoroketone-hot.png",
      "spaceAge": true
    },
    {
      "id": "holmium-solution",
      "name": "Holmium Solution",
      "kind": "fluid",
      "icon": "icons/fluid/holmium-solution.png",
      "spaceAge": true
    },
    {
      "id": "electrolyte",
      "name": "Electrolyte",
      "kind": "fluid",
      "icon": "icons/fluid/electrolyte.png",
      "spaceAge": true
    },
    {
      "id": "lithium-brine",
      "name": "Lithium Brine",
      "kind": "fluid",
      "icon": "icons/fluid/lithium-brine.png",
      "spaceAge": true
    },
    {
      "id": "lava",
      "name": "Lava",
      "kind": "fluid",
      "icon": "icons/fluid/lava.png",
      "spaceAge": true
    },
    {
      "id": "molten-iron",
      "name": "Molten Iron",
      "kind": "fluid",
      "icon": "icons/fluid/molten-iron.png",
      "spaceAge": true
    },
    {
      "id": "molten-copper",
      "name": "Molten Copper",
      "kind": "fluid",
      "icon": "icons/fluid/molten-copper.png",
      "spaceAge": true
    },
    {
      "id": "thruster-fuel",
      "name": "Thruster Fuel",
      "kind": "fluid",
      "icon": "icons/fluid/thruster-fuel.png",
      "spaceAge": true
    },
    {
      "id": "thruster-oxidizer",
      "name": "Thruster Oxidizer",
      "kind": "fluid",
      "icon": "icons/fluid/thruster-oxidizer.png",
      "spaceAge": true
    },
    {
      "id": "fusion-plasma",
      "name": "Fusion Plasma",
      "kind": "fluid",
      "icon": "icons/fluid/fusion-plasma.png",
      "spaceAge": true
    },
    {
      "id": "speed-module",
      "name": "Speed module",
      "kind": "item",
      "icon": "icons/speed-module.png"
    },
    {
      "id": "speed-module-2",
      "name": "Speed module 2",
      "kind": "item",
      "icon": "icons/speed-module-2.png"
    },
    {
      "id": "speed-module-3",
      "name": "Speed module 3",
      "kind": "item",
      "icon": "icons/speed-module-3.png"
    },
    {
      "id": "productivity-module",
      "name": "Productivity module",
      "kind": "item",
      "icon": "icons/productivity-module.png"
    },
    {
      "id": "productivity-module-2",
      "name": "Productivity module 2",
      "kind": "item",
      "icon": "icons/productivity-module-2.png"
    },
    {
      "id": "productivity-module-3",
      "name": "Productivity module 3",
      "kind": "item",
      "icon": "icons/productivity-module-3.png"
    },
    {
      "id": "efficiency-module",
      "name": "Efficiency module",
      "kind": "item",
      "icon": "icons/efficiency-module.png"
    },
    {
      "id": "efficiency-module-2",
      "name": "Efficiency module 2",
      "kind": "item",
      "icon": "icons/efficiency-module-2.png"
    },
    {
      "id": "efficiency-module-3",
      "name": "Efficiency module 3",
      "kind": "item",
      "icon": "icons/efficiency-module-3.png"
    },
    {
      "id": "pistol",
      "name": "Pistol",
      "kind": "item",
      "icon": "icons/pistol.png"
    },
    {
      "id": "submachine-gun",
      "name": "Submachine gun",
      "kind": "item",
      "icon": "icons/submachine-gun.png"
    },
    {
      "id": "firearm-magazine",
      "name": "Firearm magazine",
      "kind": "item",
      "icon": "icons/firearm-magazine.png"
    },
    {
      "id": "light-armor",
      "name": "Light armor",
      "kind": "item",
      "icon": "icons/light-armor.png"
    },
    {
      "id": "repair-pack",
      "name": "Repair pack",
      "kind": "item",
      "icon": "icons/repair-pack.png"
    },
    {
      "id": "car",
      "name": "Car",
      "kind": "item",
      "icon": "icons/car.png"
    },
    {
      "id": "shotgun",
      "name": "Shotgun",
      "kind": "item",
      "icon": "icons/shotgun.png"
    },
    {
      "id": "shotgun-shell",
      "name": "Shotgun shells",
      "kind": "item",
      "icon": "icons/shotgun-shell.png"
    },
    {
      "id": "piercing-rounds-magazine",
      "name": "Piercing rounds magazine",
      "kind": "item",
      "icon": "icons/piercing-rounds-magazine.png"
    },
    {
      "id": "grenade",
      "name": "Grenade",
      "kind": "item",
      "icon": "icons/grenade.png"
    },
    {
      "id": "heavy-armor",
      "name": "Heavy armor",
      "kind": "item",
      "icon": "icons/heavy-armor.png"
    },
    {
      "id": "rail",
      "name": "Rail",
      "kind": "item",
      "icon": "icons/rail.png"
    },
    {
      "id": "locomotive",
      "name": "Locomotive",
      "kind": "item",
      "icon": "icons/locomotive.png"
    },
    {
      "id": "cargo-wagon",
      "name": "Cargo wagon",
      "kind": "item",
      "icon": "icons/cargo-wagon.png"
    },
    {
      "id": "poison-capsule",
      "name": "Poison capsule",
      "kind": "item",
      "icon": "icons/poison-capsule.png"
    },
    {
      "id": "slowdown-capsule",
      "name": "Slowdown capsule",
      "kind": "item",
      "icon": "icons/slowdown-capsule.png"
    },
    {
      "id": "cluster-grenade",
      "name": "Cluster grenade",
      "kind": "item",
      "icon": "icons/cluster-grenade.png"
    },
    {
      "id": "defender-capsule",
      "name": "Defender capsule",
      "kind": "item",
      "icon": "icons/defender-capsule.png"
    },
    {
      "id": "distractor-capsule",
      "name": "Distractor capsule",
      "kind": "item",
      "icon": "icons/distractor-capsule.png"
    },
    {
      "id": "destroyer-capsule",
      "name": "Destroyer capsule",
      "kind": "item",
      "icon": "icons/destroyer-capsule.png"
    },
    {
      "id": "cliff-explosives",
      "name": "Cliff explosives",
      "kind": "item",
      "icon": "icons/cliff-explosives.png"
    },
    {
      "id": "uranium-rounds-magazine",
      "name": "Uranium rounds magazine",
      "kind": "item",
      "icon": "icons/uranium-rounds-magazine.png"
    },
    {
      "id": "rocket",
      "name": "Rocket",
      "kind": "item",
      "icon": "icons/rocket.png"
    },
    {
      "id": "explosive-rocket",
      "name": "Explosive rocket",
      "kind": "item",
      "icon": "icons/explosive-rocket.png"
    },
    {
      "id": "atomic-bomb",
      "name": "Atomic bomb",
      "kind": "item",
      "icon": "icons/atomic-bomb.png"
    },
    {
      "id": "piercing-shotgun-shell",
      "name": "Piercing shotgun shells",
      "kind": "item",
      "icon": "icons/piercing-shotgun-shell.png"
    },
    {
      "id": "cannon-shell",
      "name": "Cannon shell",
      "kind": "item",
      "icon": "icons/cannon-shell.png"
    },
    {
      "id": "explosive-cannon-shell",
      "name": "Explosive cannon shell",
      "kind": "item",
      "icon": "icons/explosive-cannon-shell.png"
    },
    {
      "id": "uranium-cannon-shell",
      "name": "Uranium cannon shell",
      "kind": "item",
      "icon": "icons/uranium-cannon-shell.png"
    },
    {
      "id": "explosive-uranium-cannon-shell",
      "name": "Explosive uranium cannon shell",
      "kind": "item",
      "icon": "icons/explosive-uranium-cannon-shell.png"
    },
    {
      "id": "artillery-shell",
      "name": "Artillery shell",
      "kind": "item",
      "icon": "icons/artillery-shell.png"
    },
    {
      "id": "flamethrower-ammo",
      "name": "Flamethrower ammo",
      "kind": "item",
      "icon": "icons/flamethrower-ammo.png"
    },
    {
      "id": "tank",
      "name": "Tank",
      "kind": "item",
      "icon": "icons/tank.png"
    },
    {
      "id": "raw-fish",
      "name": "Raw fish",
      "kind": "item",
      "icon": "icons/raw-fish.png"
    },
    {
      "id": "spidertron",
      "name": "Spidertron",
      "kind": "item",
      "icon": "icons/spidertron.png"
    },
    {
      "id": "fluid-wagon",
      "name": "Fluid wagon",
      "kind": "item",
      "icon": "icons/fluid-wagon.png"
    },
    {
      "id": "artillery-wagon",
      "name": "Artillery wagon",
      "kind": "item",
      "icon": "icons/artillery-wagon.png"
    },
    {
      "id": "modular-armor",
      "name": "Modular armor",
      "kind": "item",
      "icon": "icons/modular-armor.png"
    },
    {
      "id": "power-armor",
      "name": "Power armor",
      "kind": "item",
      "icon": "icons/power-armor.png"
    },
    {
      "id": "power-armor-mk2",
      "name": "Power armor MK2",
      "kind": "item",
      "icon": "icons/power-armor-mk2.png"
    },
    {
      "id": "flamethrower",
      "name": "Flamethrower",
      "kind": "item",
      "icon": "icons/flamethrower.png"
    },
    {
      "id": "rocket-launcher",
      "name": "Rocket launcher",
      "kind": "item",
      "icon": "icons/rocket-launcher.png"
    },
    {
      "id": "combat-shotgun",
      "name": "Combat shotgun",
      "kind": "item",
      "icon": "icons/combat-shotgun.png"
    },
    {
      "id": "rail-ramp",
      "name": "Rail ramp",
      "kind": "item",
      "icon": "icons/rail-ramp.png"
    },
    {
      "id": "quality-module",
      "name": "Quality module",
      "kind": "item",
      "icon": "icons/quality-module.png"
    },
    {
      "id": "quality-module-2",
      "name": "Quality module 2",
      "kind": "item",
      "icon": "icons/quality-module-2.png"
    },
    {
      "id": "quality-module-3",
      "name": "Quality module 3",
      "kind": "item",
      "icon": "icons/quality-module-3.png"
    },
    {
      "id": "yumako",
      "name": "Yumako",
      "kind": "item",
      "icon": "icons/yumako.png",
      "spaceAge": true
    },
    {
      "id": "yumako-mash",
      "name": "Yumako mash",
      "kind": "item",
      "icon": "icons/yumako-mash.png",
      "spaceAge": true
    },
    {
      "id": "jellynut",
      "name": "Jellynut",
      "kind": "item",
      "icon": "icons/jellynut.png",
      "spaceAge": true
    },
    {
      "id": "jelly",
      "name": "Jelly",
      "kind": "item",
      "icon": "icons/jelly.png",
      "spaceAge": true
    },
    {
      "id": "bioflux",
      "name": "Bioflux",
      "kind": "item",
      "icon": "icons/bioflux.png",
      "spaceAge": true
    },
    {
      "id": "space-platform-starter-pack",
      "name": "Space platform starter pack",
      "kind": "item",
      "icon": "icons/space-platform-starter-pack.png",
      "spaceAge": true
    },
    {
      "id": "mech-armor",
      "name": "Mech armor",
      "kind": "item",
      "icon": "icons/mech-armor.png",
      "spaceAge": true
    },
    {
      "id": "railgun",
      "name": "Railgun",
      "kind": "item",
      "icon": "icons/railgun.png",
      "spaceAge": true
    },
    {
      "id": "railgun-ammo",
      "name": "Railgun ammo",
      "kind": "item",
      "icon": "icons/railgun-ammo.png",
      "spaceAge": true
    },
    {
      "id": "capture-robot-rocket",
      "name": "Capture bot rocket",
      "kind": "item",
      "icon": "icons/capture-robot-rocket.png",
      "spaceAge": true
    },
    {
      "id": "teslagun",
      "name": "Tesla gun",
      "kind": "item",
      "icon": "icons/teslagun.png",
      "spaceAge": true
    },
    {
      "id": "tesla-ammo",
      "name": "Tesla ammo",
      "kind": "item",
      "icon": "icons/tesla-ammo.png",
      "spaceAge": true
    },
    {
      "id": "blueprint",
      "name": "Blueprint",
      "kind": "item",
      "icon": "icons/blueprint.png"
    },
    {
      "id": "blueprint-book",
      "name": "Blueprint book",
      "kind": "item",
      "icon": "icons/blueprint-book.png"
    },
    {
      "id": "deconstruction-planner",
      "name": "Deconstruction planner",
      "kind": "item",
      "icon": "icons/deconstruction-planner.png"
    },
    {
      "id": "selection-tool",
      "name": "Selection tool",
      "kind": "item",
      "icon": "icons/selection-tool.png"
    },
    {
      "id": "upgrade-planner",
      "name": "Upgrade planner",
      "kind": "item",
      "icon": "icons/upgrade-planner.png"
    }
  ];
  var recipes = [
    {
      "id": "speed-module",
      "name": "Speed module",
      "outputs": [
        {
          "material": "speed-module",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "speed-module-2",
      "name": "Speed module 2",
      "outputs": [
        {
          "material": "speed-module-2",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "speed-module",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        }
      ]
    },
    {
      "id": "speed-module-3",
      "name": "Speed module 3",
      "outputs": [
        {
          "material": "speed-module-3",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "speed-module-2",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "tungsten-carbide",
          "amount": 1
        }
      ]
    },
    {
      "id": "productivity-module",
      "name": "Productivity module",
      "outputs": [
        {
          "material": "productivity-module",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "productivity-module-2",
      "name": "Productivity module 2",
      "outputs": [
        {
          "material": "productivity-module-2",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "productivity-module",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        }
      ]
    },
    {
      "id": "productivity-module-3",
      "name": "Productivity module 3",
      "outputs": [
        {
          "material": "productivity-module-3",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "productivity-module-2",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "biter-egg",
          "amount": 1
        }
      ]
    },
    {
      "id": "efficiency-module",
      "name": "Efficiency module",
      "outputs": [
        {
          "material": "efficiency-module",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "efficiency-module-2",
      "name": "Efficiency module 2",
      "outputs": [
        {
          "material": "efficiency-module-2",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "efficiency-module",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        }
      ]
    },
    {
      "id": "efficiency-module-3",
      "name": "Efficiency module 3",
      "outputs": [
        {
          "material": "efficiency-module-3",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "efficiency-module-2",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "spoilage",
          "amount": 5
        }
      ]
    },
    {
      "id": "bulk-inserter",
      "name": "Bulk inserter",
      "outputs": [
        {
          "material": "bulk-inserter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 15
        },
        {
          "material": "electronic-circuit",
          "amount": 15
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "fast-inserter",
          "amount": 1
        }
      ]
    },
    {
      "id": "basic-oil-processing",
      "name": "Basic oil processing",
      "outputs": [
        {
          "material": "petroleum-gas",
          "amount": 45
        }
      ],
      "inputs": [
        {
          "material": "crude-oil",
          "amount": 100
        }
      ]
    },
    {
      "id": "advanced-oil-processing",
      "name": "Advanced oil processing",
      "outputs": [
        {
          "material": "heavy-oil",
          "amount": 25
        },
        {
          "material": "light-oil",
          "amount": 45
        },
        {
          "material": "petroleum-gas",
          "amount": 55
        }
      ],
      "inputs": [
        {
          "material": "water",
          "amount": 50
        },
        {
          "material": "crude-oil",
          "amount": 100
        }
      ]
    },
    {
      "id": "coal-liquefaction",
      "name": "Coal liquefaction",
      "outputs": [
        {
          "material": "heavy-oil",
          "amount": 90
        },
        {
          "material": "light-oil",
          "amount": 20
        },
        {
          "material": "petroleum-gas",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "coal",
          "amount": 10
        },
        {
          "material": "heavy-oil",
          "amount": 25
        },
        {
          "material": "steam",
          "amount": 50
        }
      ],
      "alternate": true
    },
    {
      "id": "heavy-oil-cracking",
      "name": "Heavy oil cracking to light oil",
      "outputs": [
        {
          "material": "light-oil",
          "amount": 30
        }
      ],
      "inputs": [
        {
          "material": "water",
          "amount": 30
        },
        {
          "material": "heavy-oil",
          "amount": 40
        }
      ]
    },
    {
      "id": "light-oil-cracking",
      "name": "Light oil cracking to petroleum gas",
      "outputs": [
        {
          "material": "petroleum-gas",
          "amount": 20
        }
      ],
      "inputs": [
        {
          "material": "water",
          "amount": 30
        },
        {
          "material": "light-oil",
          "amount": 30
        }
      ],
      "alternate": true
    },
    {
      "id": "sulfuric-acid",
      "name": "Sulfuric acid",
      "outputs": [
        {
          "material": "sulfuric-acid",
          "amount": 50
        }
      ],
      "inputs": [
        {
          "material": "sulfur",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 100
        }
      ]
    },
    {
      "id": "plastic-bar",
      "name": "Plastic bar",
      "outputs": [
        {
          "material": "plastic-bar",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "petroleum-gas",
          "amount": 20
        },
        {
          "material": "coal",
          "amount": 1
        }
      ]
    },
    {
      "id": "solid-fuel-from-light-oil",
      "name": "Solid fuel from light oil",
      "outputs": [
        {
          "material": "solid-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "light-oil",
          "amount": 10
        }
      ]
    },
    {
      "id": "solid-fuel-from-petroleum-gas",
      "name": "Solid fuel from petroleum gas",
      "outputs": [
        {
          "material": "solid-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "petroleum-gas",
          "amount": 20
        }
      ],
      "alternate": true
    },
    {
      "id": "solid-fuel-from-heavy-oil",
      "name": "Solid fuel from heavy oil",
      "outputs": [
        {
          "material": "solid-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "heavy-oil",
          "amount": 20
        }
      ],
      "alternate": true
    },
    {
      "id": "sulfur",
      "name": "Sulfur",
      "outputs": [
        {
          "material": "sulfur",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "water",
          "amount": 30
        },
        {
          "material": "petroleum-gas",
          "amount": 30
        }
      ]
    },
    {
      "id": "lubricant",
      "name": "Lubricant",
      "outputs": [
        {
          "material": "lubricant",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "heavy-oil",
          "amount": 10
        }
      ]
    },
    {
      "id": "barrel",
      "name": "Barrel",
      "outputs": [
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "night-vision-equipment",
      "name": "Nightvision",
      "outputs": [
        {
          "material": "night-vision-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "belt-immunity-equipment",
      "name": "Belt immunity equipment",
      "outputs": [
        {
          "material": "belt-immunity-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "energy-shield-equipment",
      "name": "Energy shield",
      "outputs": [
        {
          "material": "energy-shield-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "energy-shield-mk2-equipment",
      "name": "Energy shield MK2",
      "outputs": [
        {
          "material": "energy-shield-mk2-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "energy-shield-equipment",
          "amount": 10
        },
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "low-density-structure",
          "amount": 5
        }
      ]
    },
    {
      "id": "battery-equipment",
      "name": "Personal battery",
      "outputs": [
        {
          "material": "battery-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "battery",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "battery-mk2-equipment",
      "name": "Personal battery MK2",
      "outputs": [
        {
          "material": "battery-mk2-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "battery-equipment",
          "amount": 10
        },
        {
          "material": "processing-unit",
          "amount": 15
        },
        {
          "material": "low-density-structure",
          "amount": 5
        }
      ]
    },
    {
      "id": "solar-panel-equipment",
      "name": "Portable solar panel",
      "outputs": [
        {
          "material": "solar-panel-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "solar-panel",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "fission-reactor-equipment",
      "name": "Portable fission reactor",
      "outputs": [
        {
          "material": "fission-reactor-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 200
        },
        {
          "material": "low-density-structure",
          "amount": 50
        },
        {
          "material": "uranium-fuel-cell",
          "amount": 4
        }
      ]
    },
    {
      "id": "personal-laser-defense-equipment",
      "name": "Personal laser defense",
      "outputs": [
        {
          "material": "personal-laser-defense-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 20
        },
        {
          "material": "low-density-structure",
          "amount": 5
        },
        {
          "material": "laser-turret",
          "amount": 5
        }
      ]
    },
    {
      "id": "discharge-defense-equipment",
      "name": "Discharge defense",
      "outputs": [
        {
          "material": "discharge-defense-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "laser-turret",
          "amount": 10
        }
      ]
    },
    {
      "id": "exoskeleton-equipment",
      "name": "Exoskeleton",
      "outputs": [
        {
          "material": "exoskeleton-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 10
        },
        {
          "material": "electric-engine-unit",
          "amount": 30
        },
        {
          "material": "steel-plate",
          "amount": 20
        }
      ]
    },
    {
      "id": "personal-roboport-equipment",
      "name": "Personal roboport",
      "outputs": [
        {
          "material": "personal-roboport-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 10
        },
        {
          "material": "iron-gear-wheel",
          "amount": 40
        },
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "battery",
          "amount": 45
        }
      ]
    },
    {
      "id": "personal-roboport-mk2-equipment",
      "name": "Personal roboport MK2",
      "outputs": [
        {
          "material": "personal-roboport-mk2-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "personal-roboport-equipment",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 50
        },
        {
          "material": "superconductor",
          "amount": 50
        }
      ]
    },
    {
      "id": "laser-turret",
      "name": "Laser turret",
      "outputs": [
        {
          "material": "laser-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "electronic-circuit",
          "amount": 20
        },
        {
          "material": "battery",
          "amount": 12
        }
      ]
    },
    {
      "id": "flamethrower-turret",
      "name": "Flamethrower turret",
      "outputs": [
        {
          "material": "flamethrower-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 30
        },
        {
          "material": "iron-gear-wheel",
          "amount": 15
        },
        {
          "material": "pipe",
          "amount": 10
        },
        {
          "material": "engine-unit",
          "amount": 5
        }
      ]
    },
    {
      "id": "artillery-turret",
      "name": "Artillery turret",
      "outputs": [
        {
          "material": "artillery-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 60
        },
        {
          "material": "refined-concrete",
          "amount": 60
        },
        {
          "material": "iron-gear-wheel",
          "amount": 40
        },
        {
          "material": "processing-unit",
          "amount": 10
        }
      ]
    },
    {
      "id": "gun-turret",
      "name": "Gun turret",
      "outputs": [
        {
          "material": "gun-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "copper-plate",
          "amount": 10
        },
        {
          "material": "iron-plate",
          "amount": 20
        }
      ]
    },
    {
      "id": "wooden-chest",
      "name": "Wooden chest",
      "outputs": [
        {
          "material": "wooden-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "wood",
          "amount": 2
        }
      ]
    },
    {
      "id": "display-panel",
      "name": "Display panel",
      "outputs": [
        {
          "material": "display-panel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ]
    },
    {
      "id": "iron-stick",
      "name": "Iron stick",
      "outputs": [
        {
          "material": "iron-stick",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "stone-furnace",
      "name": "Stone furnace",
      "outputs": [
        {
          "material": "stone-furnace",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone",
          "amount": 5
        }
      ]
    },
    {
      "id": "boiler",
      "name": "Boiler",
      "outputs": [
        {
          "material": "boiler",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone-furnace",
          "amount": 1
        },
        {
          "material": "pipe",
          "amount": 4
        }
      ]
    },
    {
      "id": "steam-engine",
      "name": "Steam engine",
      "outputs": [
        {
          "material": "steam-engine",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 8
        },
        {
          "material": "pipe",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "iron-gear-wheel",
      "name": "Iron gear wheel",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 2
        }
      ]
    },
    {
      "id": "electronic-circuit",
      "name": "Electronic circuit",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 3
        }
      ]
    },
    {
      "id": "transport-belt",
      "name": "Transport belt",
      "outputs": [
        {
          "material": "transport-belt",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        }
      ]
    },
    {
      "id": "electric-mining-drill",
      "name": "Electric mining drill",
      "outputs": [
        {
          "material": "electric-mining-drill",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "burner-mining-drill",
      "name": "Burner mining drill",
      "outputs": [
        {
          "material": "burner-mining-drill",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 3
        },
        {
          "material": "stone-furnace",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 3
        }
      ]
    },
    {
      "id": "inserter",
      "name": "Inserter",
      "outputs": [
        {
          "material": "inserter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "fast-inserter",
      "name": "Fast inserter",
      "outputs": [
        {
          "material": "fast-inserter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 2
        },
        {
          "material": "iron-plate",
          "amount": 2
        },
        {
          "material": "inserter",
          "amount": 1
        }
      ]
    },
    {
      "id": "long-handed-inserter",
      "name": "Long-handed inserter",
      "outputs": [
        {
          "material": "long-handed-inserter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "inserter",
          "amount": 1
        }
      ]
    },
    {
      "id": "burner-inserter",
      "name": "Burner inserter",
      "outputs": [
        {
          "material": "burner-inserter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        }
      ]
    },
    {
      "id": "pipe",
      "name": "Pipe",
      "outputs": [
        {
          "material": "pipe",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "offshore-pump",
      "name": "Offshore pump",
      "outputs": [
        {
          "material": "offshore-pump",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "pipe",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        }
      ]
    },
    {
      "id": "copper-cable",
      "name": "Copper cable",
      "outputs": [
        {
          "material": "copper-cable",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "copper-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "small-electric-pole",
      "name": "Small electric pole",
      "outputs": [
        {
          "material": "small-electric-pole",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "wood",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 2
        }
      ]
    },
    {
      "id": "pistol",
      "name": "Pistol",
      "outputs": [
        {
          "material": "pistol",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-plate",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "submachine-gun",
      "name": "Submachine gun",
      "outputs": [
        {
          "material": "submachine-gun",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "copper-plate",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "firearm-magazine",
      "name": "Firearm magazine",
      "outputs": [
        {
          "material": "firearm-magazine",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 4
        }
      ]
    },
    {
      "id": "light-armor",
      "name": "Light armor",
      "outputs": [
        {
          "material": "light-armor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 40
        }
      ]
    },
    {
      "id": "radar",
      "name": "Radar",
      "outputs": [
        {
          "material": "radar",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "small-lamp",
      "name": "Lamp",
      "outputs": [
        {
          "material": "small-lamp",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 3
        },
        {
          "material": "iron-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "pipe-to-ground",
      "name": "Pipe to ground",
      "outputs": [
        {
          "material": "pipe-to-ground",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "pipe",
          "amount": 10
        },
        {
          "material": "iron-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "assembling-machine-1",
      "name": "Assembling machine 1",
      "outputs": [
        {
          "material": "assembling-machine-1",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 9
        }
      ]
    },
    {
      "id": "repair-pack",
      "name": "Repair pack",
      "outputs": [
        {
          "material": "repair-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 2
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        }
      ]
    },
    {
      "id": "automation-science-pack",
      "name": "Automation science pack",
      "outputs": [
        {
          "material": "automation-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        }
      ]
    },
    {
      "id": "logistic-science-pack",
      "name": "Logistic science pack",
      "outputs": [
        {
          "material": "logistic-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "inserter",
          "amount": 1
        },
        {
          "material": "transport-belt",
          "amount": 1
        }
      ]
    },
    {
      "id": "lab",
      "name": "Lab",
      "outputs": [
        {
          "material": "lab",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 10
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "transport-belt",
          "amount": 4
        }
      ]
    },
    {
      "id": "stone-wall",
      "name": "Wall",
      "outputs": [
        {
          "material": "stone-wall",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone-brick",
          "amount": 5
        }
      ]
    },
    {
      "id": "assembling-machine-2",
      "name": "Assembling machine 2",
      "outputs": [
        {
          "material": "assembling-machine-2",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "assembling-machine-1",
          "amount": 1
        }
      ]
    },
    {
      "id": "splitter",
      "name": "Splitter",
      "outputs": [
        {
          "material": "splitter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "transport-belt",
          "amount": 4
        }
      ]
    },
    {
      "id": "underground-belt",
      "name": "Underground belt",
      "outputs": [
        {
          "material": "underground-belt",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 10
        },
        {
          "material": "transport-belt",
          "amount": 5
        }
      ]
    },
    {
      "id": "loader",
      "name": "Loader",
      "outputs": [
        {
          "material": "loader",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "inserter",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "transport-belt",
          "amount": 5
        }
      ]
    },
    {
      "id": "car",
      "name": "Car",
      "outputs": [
        {
          "material": "car",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 8
        },
        {
          "material": "iron-plate",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "engine-unit",
      "name": "Engine unit",
      "outputs": [
        {
          "material": "engine-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "pipe",
          "amount": 2
        }
      ]
    },
    {
      "id": "iron-chest",
      "name": "Iron chest",
      "outputs": [
        {
          "material": "iron-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 8
        }
      ]
    },
    {
      "id": "big-electric-pole",
      "name": "Big electric pole",
      "outputs": [
        {
          "material": "big-electric-pole",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-stick",
          "amount": 8
        },
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "copper-cable",
          "amount": 4
        }
      ]
    },
    {
      "id": "medium-electric-pole",
      "name": "Medium electric pole",
      "outputs": [
        {
          "material": "medium-electric-pole",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-stick",
          "amount": 4
        },
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "copper-cable",
          "amount": 2
        }
      ]
    },
    {
      "id": "shotgun",
      "name": "Shotgun",
      "outputs": [
        {
          "material": "shotgun",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 15
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "copper-plate",
          "amount": 10
        },
        {
          "material": "wood",
          "amount": 5
        }
      ]
    },
    {
      "id": "shotgun-shell",
      "name": "Shotgun shells",
      "outputs": [
        {
          "material": "shotgun-shell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-plate",
          "amount": 2
        },
        {
          "material": "iron-plate",
          "amount": 2
        }
      ]
    },
    {
      "id": "piercing-rounds-magazine",
      "name": "Piercing rounds magazine",
      "outputs": [
        {
          "material": "piercing-rounds-magazine",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "firearm-magazine",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "copper-plate",
          "amount": 2
        }
      ]
    },
    {
      "id": "grenade",
      "name": "Grenade",
      "outputs": [
        {
          "material": "grenade",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "coal",
          "amount": 10
        }
      ]
    },
    {
      "id": "steel-furnace",
      "name": "Steel furnace",
      "outputs": [
        {
          "material": "steel-furnace",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 6
        },
        {
          "material": "stone-brick",
          "amount": 10
        }
      ]
    },
    {
      "id": "gate",
      "name": "Gate",
      "outputs": [
        {
          "material": "gate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone-wall",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        }
      ]
    },
    {
      "id": "heavy-armor",
      "name": "Heavy armor",
      "outputs": [
        {
          "material": "heavy-armor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-plate",
          "amount": 100
        },
        {
          "material": "steel-plate",
          "amount": 50
        }
      ]
    },
    {
      "id": "steel-chest",
      "name": "Steel chest",
      "outputs": [
        {
          "material": "steel-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 8
        }
      ]
    },
    {
      "id": "fast-underground-belt",
      "name": "Fast underground belt",
      "outputs": [
        {
          "material": "fast-underground-belt",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 40
        },
        {
          "material": "underground-belt",
          "amount": 2
        }
      ]
    },
    {
      "id": "fast-splitter",
      "name": "Fast splitter",
      "outputs": [
        {
          "material": "fast-splitter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "splitter",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "electronic-circuit",
          "amount": 10
        }
      ]
    },
    {
      "id": "concrete",
      "name": "Concrete",
      "outputs": [
        {
          "material": "concrete",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "stone-brick",
          "amount": 5
        },
        {
          "material": "iron-ore",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 100
        }
      ]
    },
    {
      "id": "hazard-concrete",
      "name": "Hazard concrete",
      "outputs": [
        {
          "material": "hazard-concrete",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "concrete",
          "amount": 10
        }
      ]
    },
    {
      "id": "refined-concrete",
      "name": "Refined concrete",
      "outputs": [
        {
          "material": "refined-concrete",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "concrete",
          "amount": 20
        },
        {
          "material": "iron-stick",
          "amount": 8
        },
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 100
        }
      ]
    },
    {
      "id": "refined-hazard-concrete",
      "name": "Refined hazard concrete",
      "outputs": [
        {
          "material": "refined-hazard-concrete",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "refined-concrete",
          "amount": 10
        }
      ]
    },
    {
      "id": "landfill",
      "name": "Landfill",
      "outputs": [
        {
          "material": "landfill",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone",
          "amount": 50
        }
      ]
    },
    {
      "id": "fast-transport-belt",
      "name": "Fast transport belt",
      "outputs": [
        {
          "material": "fast-transport-belt",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "transport-belt",
          "amount": 1
        }
      ]
    },
    {
      "id": "solar-panel",
      "name": "Solar panel",
      "outputs": [
        {
          "material": "solar-panel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 15
        },
        {
          "material": "copper-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "rail",
      "name": "Rail",
      "outputs": [
        {
          "material": "rail",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "stone",
          "amount": 1
        },
        {
          "material": "iron-stick",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "locomotive",
      "name": "Locomotive",
      "outputs": [
        {
          "material": "locomotive",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 20
        },
        {
          "material": "electronic-circuit",
          "amount": 10
        },
        {
          "material": "steel-plate",
          "amount": 30
        }
      ]
    },
    {
      "id": "cargo-wagon",
      "name": "Cargo wagon",
      "outputs": [
        {
          "material": "cargo-wagon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "iron-plate",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 20
        }
      ]
    },
    {
      "id": "rail-signal",
      "name": "Rail signal",
      "outputs": [
        {
          "material": "rail-signal",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "rail-chain-signal",
      "name": "Rail chain signal",
      "outputs": [
        {
          "material": "rail-chain-signal",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "train-stop",
      "name": "Train stop",
      "outputs": [
        {
          "material": "train-stop",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "iron-plate",
          "amount": 6
        },
        {
          "material": "iron-stick",
          "amount": 6
        },
        {
          "material": "steel-plate",
          "amount": 3
        }
      ]
    },
    {
      "id": "copper-plate",
      "name": "Copper plate",
      "outputs": [
        {
          "material": "copper-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-ore",
          "amount": 1
        }
      ]
    },
    {
      "id": "iron-plate",
      "name": "Iron plate",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-ore",
          "amount": 1
        }
      ]
    },
    {
      "id": "stone-brick",
      "name": "Stone brick",
      "outputs": [
        {
          "material": "stone-brick",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone",
          "amount": 2
        }
      ]
    },
    {
      "id": "steel-plate",
      "name": "Steel plate",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "arithmetic-combinator",
      "name": "Arithmetic combinator",
      "outputs": [
        {
          "material": "arithmetic-combinator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-cable",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "decider-combinator",
      "name": "Decider combinator",
      "outputs": [
        {
          "material": "decider-combinator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-cable",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "constant-combinator",
      "name": "Constant combinator",
      "outputs": [
        {
          "material": "constant-combinator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-cable",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        }
      ]
    },
    {
      "id": "selector-combinator",
      "name": "Selector combinator",
      "outputs": [
        {
          "material": "selector-combinator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 2
        },
        {
          "material": "decider-combinator",
          "amount": 5
        }
      ]
    },
    {
      "id": "power-switch",
      "name": "Power switch",
      "outputs": [
        {
          "material": "power-switch",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "copper-cable",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        }
      ]
    },
    {
      "id": "programmable-speaker",
      "name": "Programmable speaker",
      "outputs": [
        {
          "material": "programmable-speaker",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 3
        },
        {
          "material": "iron-stick",
          "amount": 4
        },
        {
          "material": "copper-cable",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 4
        }
      ]
    },
    {
      "id": "poison-capsule",
      "name": "Poison capsule",
      "outputs": [
        {
          "material": "poison-capsule",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 3
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "coal",
          "amount": 10
        }
      ]
    },
    {
      "id": "slowdown-capsule",
      "name": "Slowdown capsule",
      "outputs": [
        {
          "material": "slowdown-capsule",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        },
        {
          "material": "coal",
          "amount": 5
        }
      ]
    },
    {
      "id": "cluster-grenade",
      "name": "Cluster grenade",
      "outputs": [
        {
          "material": "cluster-grenade",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "grenade",
          "amount": 7
        },
        {
          "material": "explosives",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "defender-capsule",
      "name": "Defender capsule",
      "outputs": [
        {
          "material": "defender-capsule",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "piercing-rounds-magazine",
          "amount": 3
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 3
        }
      ]
    },
    {
      "id": "distractor-capsule",
      "name": "Distractor capsule",
      "outputs": [
        {
          "material": "distractor-capsule",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "defender-capsule",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 3
        }
      ]
    },
    {
      "id": "destroyer-capsule",
      "name": "Destroyer capsule",
      "outputs": [
        {
          "material": "destroyer-capsule",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "distractor-capsule",
          "amount": 4
        },
        {
          "material": "steel-plate",
          "amount": 4
        },
        {
          "material": "processing-unit",
          "amount": 1
        }
      ]
    },
    {
      "id": "cliff-explosives",
      "name": "Cliff explosives",
      "outputs": [
        {
          "material": "cliff-explosives",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "explosives",
          "amount": 10
        },
        {
          "material": "calcite",
          "amount": 10
        },
        {
          "material": "grenade",
          "amount": 1
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "uranium-rounds-magazine",
      "name": "Uranium rounds magazine",
      "outputs": [
        {
          "material": "uranium-rounds-magazine",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "piercing-rounds-magazine",
          "amount": 1
        },
        {
          "material": "uranium-238",
          "amount": 1
        }
      ]
    },
    {
      "id": "rocket",
      "name": "Rocket",
      "outputs": [
        {
          "material": "rocket",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "explosives",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 2
        }
      ]
    },
    {
      "id": "explosive-rocket",
      "name": "Explosive rocket",
      "outputs": [
        {
          "material": "explosive-rocket",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "rocket",
          "amount": 1
        },
        {
          "material": "explosives",
          "amount": 2
        }
      ]
    },
    {
      "id": "atomic-bomb",
      "name": "Atomic bomb",
      "outputs": [
        {
          "material": "atomic-bomb",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 10
        },
        {
          "material": "explosives",
          "amount": 10
        },
        {
          "material": "uranium-235",
          "amount": 100
        }
      ]
    },
    {
      "id": "piercing-shotgun-shell",
      "name": "Piercing shotgun shells",
      "outputs": [
        {
          "material": "piercing-shotgun-shell",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "shotgun-shell",
          "amount": 2
        },
        {
          "material": "copper-plate",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "cannon-shell",
      "name": "Cannon shell",
      "outputs": [
        {
          "material": "cannon-shell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "plastic-bar",
          "amount": 2
        },
        {
          "material": "explosives",
          "amount": 1
        }
      ]
    },
    {
      "id": "explosive-cannon-shell",
      "name": "Explosive cannon shell",
      "outputs": [
        {
          "material": "explosive-cannon-shell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "plastic-bar",
          "amount": 2
        },
        {
          "material": "explosives",
          "amount": 2
        }
      ]
    },
    {
      "id": "uranium-cannon-shell",
      "name": "Uranium cannon shell",
      "outputs": [
        {
          "material": "uranium-cannon-shell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "cannon-shell",
          "amount": 1
        },
        {
          "material": "uranium-238",
          "amount": 1
        }
      ]
    },
    {
      "id": "explosive-uranium-cannon-shell",
      "name": "Explosive uranium cannon shell",
      "outputs": [
        {
          "material": "explosive-uranium-cannon-shell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "explosive-cannon-shell",
          "amount": 1
        },
        {
          "material": "uranium-238",
          "amount": 1
        }
      ]
    },
    {
      "id": "artillery-shell",
      "name": "Artillery shell",
      "outputs": [
        {
          "material": "artillery-shell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "radar",
          "amount": 1
        },
        {
          "material": "calcite",
          "amount": 1
        },
        {
          "material": "tungsten-plate",
          "amount": 4
        },
        {
          "material": "explosives",
          "amount": 8
        }
      ]
    },
    {
      "id": "flamethrower-ammo",
      "name": "Flamethrower ammo",
      "outputs": [
        {
          "material": "flamethrower-ammo",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "crude-oil",
          "amount": 100
        }
      ]
    },
    {
      "id": "express-transport-belt",
      "name": "Express transport belt",
      "outputs": [
        {
          "material": "express-transport-belt",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "fast-transport-belt",
          "amount": 1
        },
        {
          "material": "lubricant",
          "amount": 20
        }
      ]
    },
    {
      "id": "assembling-machine-3",
      "name": "Assembling machine 3",
      "outputs": [
        {
          "material": "assembling-machine-3",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "assembling-machine-2",
          "amount": 2
        },
        {
          "material": "speed-module",
          "amount": 4
        }
      ]
    },
    {
      "id": "tank",
      "name": "Tank",
      "outputs": [
        {
          "material": "tank",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 32
        },
        {
          "material": "steel-plate",
          "amount": 50
        },
        {
          "material": "iron-gear-wheel",
          "amount": 15
        },
        {
          "material": "advanced-circuit",
          "amount": 10
        }
      ]
    },
    {
      "id": "spidertron",
      "name": "Spidertron",
      "outputs": [
        {
          "material": "spidertron",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "exoskeleton-equipment",
          "amount": 4
        },
        {
          "material": "fission-reactor-equipment",
          "amount": 2
        },
        {
          "material": "rocket-turret",
          "amount": 1
        },
        {
          "material": "radar",
          "amount": 2
        },
        {
          "material": "raw-fish",
          "amount": 1
        }
      ]
    },
    {
      "id": "fluid-wagon",
      "name": "Fluid wagon",
      "outputs": [
        {
          "material": "fluid-wagon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "steel-plate",
          "amount": 16
        },
        {
          "material": "pipe",
          "amount": 8
        },
        {
          "material": "storage-tank",
          "amount": 1
        }
      ]
    },
    {
      "id": "artillery-wagon",
      "name": "Artillery wagon",
      "outputs": [
        {
          "material": "artillery-wagon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 60
        },
        {
          "material": "tungsten-plate",
          "amount": 60
        },
        {
          "material": "refined-concrete",
          "amount": 60
        },
        {
          "material": "iron-gear-wheel",
          "amount": 40
        },
        {
          "material": "processing-unit",
          "amount": 10
        }
      ]
    },
    {
      "id": "modular-armor",
      "name": "Modular armor",
      "outputs": [
        {
          "material": "modular-armor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 30
        },
        {
          "material": "steel-plate",
          "amount": 50
        }
      ]
    },
    {
      "id": "power-armor",
      "name": "Power armor",
      "outputs": [
        {
          "material": "power-armor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 40
        },
        {
          "material": "electric-engine-unit",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 40
        }
      ]
    },
    {
      "id": "power-armor-mk2",
      "name": "Power armor MK2",
      "outputs": [
        {
          "material": "power-armor-mk2",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "efficiency-module",
          "amount": 100
        },
        {
          "material": "speed-module",
          "amount": 100
        },
        {
          "material": "processing-unit",
          "amount": 60
        },
        {
          "material": "electric-engine-unit",
          "amount": 40
        },
        {
          "material": "low-density-structure",
          "amount": 30
        }
      ]
    },
    {
      "id": "flamethrower",
      "name": "Flamethrower",
      "outputs": [
        {
          "material": "flamethrower",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        }
      ]
    },
    {
      "id": "land-mine",
      "name": "Land mine",
      "outputs": [
        {
          "material": "land-mine",
          "amount": 4
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "explosives",
          "amount": 2
        }
      ]
    },
    {
      "id": "rocket-launcher",
      "name": "Rocket launcher",
      "outputs": [
        {
          "material": "rocket-launcher",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "combat-shotgun",
      "name": "Combat shotgun",
      "outputs": [
        {
          "material": "combat-shotgun",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 15
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "copper-plate",
          "amount": 10
        },
        {
          "material": "wood",
          "amount": 10
        }
      ]
    },
    {
      "id": "chemical-science-pack",
      "name": "Chemical science pack",
      "outputs": [
        {
          "material": "chemical-science-pack",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 2
        },
        {
          "material": "advanced-circuit",
          "amount": 3
        },
        {
          "material": "sulfur",
          "amount": 1
        }
      ]
    },
    {
      "id": "military-science-pack",
      "name": "Military science pack",
      "outputs": [
        {
          "material": "military-science-pack",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "piercing-rounds-magazine",
          "amount": 1
        },
        {
          "material": "grenade",
          "amount": 1
        },
        {
          "material": "stone-wall",
          "amount": 2
        }
      ]
    },
    {
      "id": "production-science-pack",
      "name": "Production science pack",
      "outputs": [
        {
          "material": "production-science-pack",
          "amount": 3
        }
      ],
      "inputs": [
        {
          "material": "electric-furnace",
          "amount": 1
        },
        {
          "material": "productivity-module",
          "amount": 1
        },
        {
          "material": "rail",
          "amount": 30
        }
      ]
    },
    {
      "id": "utility-science-pack",
      "name": "Utility science pack",
      "outputs": [
        {
          "material": "utility-science-pack",
          "amount": 3
        }
      ],
      "inputs": [
        {
          "material": "low-density-structure",
          "amount": 3
        },
        {
          "material": "processing-unit",
          "amount": 2
        },
        {
          "material": "flying-robot-frame",
          "amount": 1
        }
      ]
    },
    {
      "id": "express-underground-belt",
      "name": "Express underground belt",
      "outputs": [
        {
          "material": "express-underground-belt",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 80
        },
        {
          "material": "fast-underground-belt",
          "amount": 2
        },
        {
          "material": "lubricant",
          "amount": 40
        }
      ]
    },
    {
      "id": "fast-loader",
      "name": "Fast loader",
      "outputs": [
        {
          "material": "fast-loader",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fast-transport-belt",
          "amount": 5
        },
        {
          "material": "loader",
          "amount": 1
        }
      ]
    },
    {
      "id": "express-loader",
      "name": "Express loader",
      "outputs": [
        {
          "material": "express-loader",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "express-transport-belt",
          "amount": 5
        },
        {
          "material": "fast-loader",
          "amount": 1
        }
      ]
    },
    {
      "id": "express-splitter",
      "name": "Express splitter",
      "outputs": [
        {
          "material": "express-splitter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fast-splitter",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "advanced-circuit",
          "amount": 10
        },
        {
          "material": "lubricant",
          "amount": 80
        }
      ]
    },
    {
      "id": "advanced-circuit",
      "name": "Advanced circuit",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 2
        },
        {
          "material": "plastic-bar",
          "amount": 2
        },
        {
          "material": "copper-cable",
          "amount": 4
        }
      ]
    },
    {
      "id": "processing-unit",
      "name": "Processing unit",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 20
        },
        {
          "material": "advanced-circuit",
          "amount": 2
        },
        {
          "material": "sulfuric-acid",
          "amount": 5
        }
      ]
    },
    {
      "id": "logistic-robot",
      "name": "Logistic robot",
      "outputs": [
        {
          "material": "logistic-robot",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "flying-robot-frame",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 2
        }
      ]
    },
    {
      "id": "construction-robot",
      "name": "Construction robot",
      "outputs": [
        {
          "material": "construction-robot",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "flying-robot-frame",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        }
      ]
    },
    {
      "id": "passive-provider-chest",
      "name": "Passive provider chest",
      "outputs": [
        {
          "material": "passive-provider-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-chest",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ]
    },
    {
      "id": "active-provider-chest",
      "name": "Active provider chest",
      "outputs": [
        {
          "material": "active-provider-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-chest",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ]
    },
    {
      "id": "storage-chest",
      "name": "Storage chest",
      "outputs": [
        {
          "material": "storage-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-chest",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ]
    },
    {
      "id": "buffer-chest",
      "name": "Buffer chest",
      "outputs": [
        {
          "material": "buffer-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-chest",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ]
    },
    {
      "id": "requester-chest",
      "name": "Requester chest",
      "outputs": [
        {
          "material": "requester-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-chest",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ]
    },
    {
      "id": "rocket-silo",
      "name": "Rocket silo",
      "outputs": [
        {
          "material": "rocket-silo",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 1e3
        },
        {
          "material": "concrete",
          "amount": 1e3
        },
        {
          "material": "pipe",
          "amount": 100
        },
        {
          "material": "processing-unit",
          "amount": 200
        },
        {
          "material": "electric-engine-unit",
          "amount": 200
        }
      ]
    },
    {
      "id": "cargo-landing-pad",
      "name": "Cargo landing pad",
      "outputs": [
        {
          "material": "cargo-landing-pad",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "concrete",
          "amount": 200
        },
        {
          "material": "steel-plate",
          "amount": 25
        },
        {
          "material": "processing-unit",
          "amount": 10
        }
      ]
    },
    {
      "id": "roboport",
      "name": "Roboport",
      "outputs": [
        {
          "material": "roboport",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 45
        },
        {
          "material": "iron-gear-wheel",
          "amount": 45
        },
        {
          "material": "advanced-circuit",
          "amount": 45
        }
      ]
    },
    {
      "id": "substation",
      "name": "Substation",
      "outputs": [
        {
          "material": "substation",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "copper-cable",
          "amount": 6
        }
      ]
    },
    {
      "id": "accumulator",
      "name": "Accumulator",
      "outputs": [
        {
          "material": "accumulator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 2
        },
        {
          "material": "battery",
          "amount": 5
        }
      ]
    },
    {
      "id": "electric-furnace",
      "name": "Electric furnace",
      "outputs": [
        {
          "material": "electric-furnace",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "stone-brick",
          "amount": 10
        }
      ]
    },
    {
      "id": "beacon",
      "name": "Beacon",
      "outputs": [
        {
          "material": "beacon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 20
        },
        {
          "material": "advanced-circuit",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "copper-cable",
          "amount": 10
        }
      ]
    },
    {
      "id": "pumpjack",
      "name": "Pumpjack",
      "outputs": [
        {
          "material": "pumpjack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "pipe",
          "amount": 10
        }
      ]
    },
    {
      "id": "oil-refinery",
      "name": "Oil refinery",
      "outputs": [
        {
          "material": "oil-refinery",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 15
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "stone-brick",
          "amount": 10
        },
        {
          "material": "electronic-circuit",
          "amount": 10
        },
        {
          "material": "pipe",
          "amount": 10
        }
      ]
    },
    {
      "id": "electric-engine-unit",
      "name": "Electric engine unit",
      "outputs": [
        {
          "material": "electric-engine-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 1
        },
        {
          "material": "lubricant",
          "amount": 15
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        }
      ]
    },
    {
      "id": "flying-robot-frame",
      "name": "Flying robot frame",
      "outputs": [
        {
          "material": "flying-robot-frame",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electric-engine-unit",
          "amount": 1
        },
        {
          "material": "battery",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        }
      ]
    },
    {
      "id": "explosives",
      "name": "Explosives",
      "outputs": [
        {
          "material": "explosives",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "sulfur",
          "amount": 1
        },
        {
          "material": "coal",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 10
        }
      ]
    },
    {
      "id": "battery",
      "name": "Battery",
      "outputs": [
        {
          "material": "battery",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "sulfuric-acid",
          "amount": 20
        },
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "copper-plate",
          "amount": 1
        }
      ]
    },
    {
      "id": "storage-tank",
      "name": "Storage tank",
      "outputs": [
        {
          "material": "storage-tank",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 5
        }
      ]
    },
    {
      "id": "pump",
      "name": "Pump",
      "outputs": [
        {
          "material": "pump",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "pipe",
          "amount": 1
        }
      ]
    },
    {
      "id": "chemical-plant",
      "name": "Chemical plant",
      "outputs": [
        {
          "material": "chemical-plant",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "pipe",
          "amount": 5
        }
      ]
    },
    {
      "id": "low-density-structure",
      "name": "Low density structure",
      "outputs": [
        {
          "material": "low-density-structure",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "copper-plate",
          "amount": 20
        },
        {
          "material": "plastic-bar",
          "amount": 5
        }
      ]
    },
    {
      "id": "rocket-fuel",
      "name": "Rocket fuel",
      "outputs": [
        {
          "material": "rocket-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "solid-fuel",
          "amount": 10
        },
        {
          "material": "light-oil",
          "amount": 10
        }
      ]
    },
    {
      "id": "rocket-part",
      "name": "Rocket part",
      "outputs": [
        {
          "material": "rocket-part",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "low-density-structure",
          "amount": 1
        },
        {
          "material": "rocket-fuel",
          "amount": 1
        }
      ]
    },
    {
      "id": "nuclear-reactor",
      "name": "Nuclear reactor",
      "outputs": [
        {
          "material": "nuclear-reactor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "concrete",
          "amount": 500
        },
        {
          "material": "steel-plate",
          "amount": 500
        },
        {
          "material": "advanced-circuit",
          "amount": 500
        },
        {
          "material": "copper-plate",
          "amount": 500
        }
      ]
    },
    {
      "id": "centrifuge",
      "name": "Centrifuge",
      "outputs": [
        {
          "material": "centrifuge",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "concrete",
          "amount": 100
        },
        {
          "material": "steel-plate",
          "amount": 50
        },
        {
          "material": "advanced-circuit",
          "amount": 100
        },
        {
          "material": "iron-gear-wheel",
          "amount": 100
        }
      ]
    },
    {
      "id": "uranium-processing",
      "name": "Uranium processing",
      "outputs": [
        {
          "material": "uranium-235",
          "amount": 1
        },
        {
          "material": "uranium-238",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "uranium-ore",
          "amount": 10
        }
      ]
    },
    {
      "id": "kovarex-enrichment-process",
      "name": "Kovarex enrichment process",
      "outputs": [
        {
          "material": "uranium-235",
          "amount": 41
        },
        {
          "material": "uranium-238",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "uranium-235",
          "amount": 40
        },
        {
          "material": "uranium-238",
          "amount": 5
        }
      ],
      "alternate": true
    },
    {
      "id": "nuclear-fuel",
      "name": "Nuclear fuel",
      "outputs": [
        {
          "material": "nuclear-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "uranium-235",
          "amount": 1
        },
        {
          "material": "rocket-fuel",
          "amount": 1
        }
      ]
    },
    {
      "id": "nuclear-fuel-reprocessing",
      "name": "Nuclear fuel reprocessing",
      "outputs": [
        {
          "material": "uranium-238",
          "amount": 3
        }
      ],
      "inputs": [
        {
          "material": "depleted-uranium-fuel-cell",
          "amount": 5
        }
      ]
    },
    {
      "id": "uranium-fuel-cell",
      "name": "Uranium fuel cell",
      "outputs": [
        {
          "material": "uranium-fuel-cell",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 10
        },
        {
          "material": "uranium-235",
          "amount": 1
        },
        {
          "material": "uranium-238",
          "amount": 19
        }
      ]
    },
    {
      "id": "heat-exchanger",
      "name": "Heat exchanger",
      "outputs": [
        {
          "material": "heat-exchanger",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "copper-plate",
          "amount": 100
        },
        {
          "material": "pipe",
          "amount": 10
        }
      ]
    },
    {
      "id": "heat-pipe",
      "name": "Heat pipe",
      "outputs": [
        {
          "material": "heat-pipe",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "copper-plate",
          "amount": 20
        }
      ]
    },
    {
      "id": "steam-turbine",
      "name": "Steam turbine",
      "outputs": [
        {
          "material": "steam-turbine",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 50
        },
        {
          "material": "copper-plate",
          "amount": 50
        },
        {
          "material": "pipe",
          "amount": 20
        }
      ]
    },
    {
      "id": "rail-support",
      "name": "Rail support",
      "outputs": [
        {
          "material": "rail-support",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "refined-concrete",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "rail-ramp",
      "name": "Rail ramp",
      "outputs": [
        {
          "material": "rail-ramp",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "refined-concrete",
          "amount": 100
        },
        {
          "material": "rail",
          "amount": 8
        },
        {
          "material": "steel-plate",
          "amount": 10
        }
      ]
    },
    {
      "id": "recycler",
      "name": "Recycler",
      "outputs": [
        {
          "material": "recycler",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 6
        },
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "iron-gear-wheel",
          "amount": 40
        },
        {
          "material": "concrete",
          "amount": 20
        }
      ]
    },
    {
      "id": "quality-module",
      "name": "Quality module",
      "outputs": [
        {
          "material": "quality-module",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "quality-module-2",
      "name": "Quality module 2",
      "outputs": [
        {
          "material": "quality-module-2",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "quality-module",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        }
      ]
    },
    {
      "id": "quality-module-3",
      "name": "Quality module 3",
      "outputs": [
        {
          "material": "quality-module-3",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "quality-module-2",
          "amount": 4
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "superconductor",
          "amount": 1
        }
      ]
    },
    {
      "id": "simple-coal-liquefaction",
      "name": "Simple coal liquefaction",
      "outputs": [
        {
          "material": "heavy-oil",
          "amount": 50
        }
      ],
      "inputs": [
        {
          "material": "coal",
          "amount": 10
        },
        {
          "material": "calcite",
          "amount": 2
        },
        {
          "material": "sulfuric-acid",
          "amount": 25
        }
      ],
      "alternate": true
    },
    {
      "id": "yumako-processing",
      "name": "Yumako processing",
      "outputs": [
        {
          "material": "yumako-seed",
          "amount": 1
        },
        {
          "material": "yumako-mash",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "yumako",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "jellynut-processing",
      "name": "Jellynut processing",
      "outputs": [
        {
          "material": "jellynut-seed",
          "amount": 1
        },
        {
          "material": "jelly",
          "amount": 4
        }
      ],
      "inputs": [
        {
          "material": "jellynut",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "copper-bacteria",
      "name": "Copper bacteria",
      "outputs": [
        {
          "material": "copper-bacteria",
          "amount": 1
        },
        {
          "material": "spoilage",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "yumako-mash",
          "amount": 3
        }
      ],
      "spaceAge": true
    },
    {
      "id": "copper-bacteria-cultivation",
      "name": "Copper bacteria cultivation",
      "outputs": [
        {
          "material": "copper-bacteria",
          "amount": 4
        }
      ],
      "inputs": [
        {
          "material": "copper-bacteria",
          "amount": 1
        },
        {
          "material": "bioflux",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "iron-bacteria",
      "name": "Iron bacteria",
      "outputs": [
        {
          "material": "iron-bacteria",
          "amount": 1
        },
        {
          "material": "spoilage",
          "amount": 4
        }
      ],
      "inputs": [
        {
          "material": "jelly",
          "amount": 6
        }
      ],
      "spaceAge": true
    },
    {
      "id": "iron-bacteria-cultivation",
      "name": "Iron bacteria cultivation",
      "outputs": [
        {
          "material": "iron-bacteria",
          "amount": 4
        }
      ],
      "inputs": [
        {
          "material": "iron-bacteria",
          "amount": 1
        },
        {
          "material": "bioflux",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "artificial-yumako-soil",
      "name": "Artificial yumako soil",
      "outputs": [
        {
          "material": "artificial-yumako-soil",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "yumako-seed",
          "amount": 2
        },
        {
          "material": "nutrients",
          "amount": 50
        },
        {
          "material": "landfill",
          "amount": 5
        }
      ],
      "spaceAge": true
    },
    {
      "id": "overgrowth-yumako-soil",
      "name": "Overgrowth yumako soil",
      "outputs": [
        {
          "material": "overgrowth-yumako-soil",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "artificial-yumako-soil",
          "amount": 2
        },
        {
          "material": "yumako-seed",
          "amount": 5
        },
        {
          "material": "biter-egg",
          "amount": 10
        },
        {
          "material": "spoilage",
          "amount": 50
        },
        {
          "material": "water",
          "amount": 100
        }
      ],
      "spaceAge": true
    },
    {
      "id": "artificial-jellynut-soil",
      "name": "Artificial jellynut soil",
      "outputs": [
        {
          "material": "artificial-jellynut-soil",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "jellynut-seed",
          "amount": 2
        },
        {
          "material": "nutrients",
          "amount": 50
        },
        {
          "material": "landfill",
          "amount": 5
        }
      ],
      "spaceAge": true
    },
    {
      "id": "overgrowth-jellynut-soil",
      "name": "Overgrowth jellynut soil",
      "outputs": [
        {
          "material": "overgrowth-jellynut-soil",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "artificial-jellynut-soil",
          "amount": 2
        },
        {
          "material": "jellynut-seed",
          "amount": 5
        },
        {
          "material": "biter-egg",
          "amount": 10
        },
        {
          "material": "spoilage",
          "amount": 50
        },
        {
          "material": "water",
          "amount": 100
        }
      ],
      "spaceAge": true
    },
    {
      "id": "nutrients-from-spoilage",
      "name": "Nutrients from spoilage",
      "outputs": [
        {
          "material": "nutrients",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "spoilage",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "nutrients-from-yumako-mash",
      "name": "Nutrients from yumako mash",
      "outputs": [
        {
          "material": "nutrients",
          "amount": 6
        }
      ],
      "inputs": [
        {
          "material": "yumako-mash",
          "amount": 4
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "nutrients-from-bioflux",
      "name": "Nutrients from bioflux",
      "outputs": [
        {
          "material": "nutrients",
          "amount": 40
        }
      ],
      "inputs": [
        {
          "material": "bioflux",
          "amount": 5
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "pentapod-egg",
      "name": "Pentapod egg",
      "outputs": [
        {
          "material": "pentapod-egg",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "pentapod-egg",
          "amount": 1
        },
        {
          "material": "nutrients",
          "amount": 30
        },
        {
          "material": "water",
          "amount": 60
        }
      ],
      "spaceAge": true
    },
    {
      "id": "rocket-fuel-from-jelly",
      "name": "Rocket fuel from jelly",
      "outputs": [
        {
          "material": "rocket-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "water",
          "amount": 30
        },
        {
          "material": "jelly",
          "amount": 30
        },
        {
          "material": "bioflux",
          "amount": 2
        }
      ],
      "alternate": true
    },
    {
      "id": "bioflux",
      "name": "Bioflux",
      "outputs": [
        {
          "material": "bioflux",
          "amount": 4
        }
      ],
      "inputs": [
        {
          "material": "yumako-mash",
          "amount": 15
        },
        {
          "material": "jelly",
          "amount": 12
        }
      ]
    },
    {
      "id": "bioplastic",
      "name": "Bioplastic",
      "outputs": [
        {
          "material": "plastic-bar",
          "amount": 3
        }
      ],
      "inputs": [
        {
          "material": "bioflux",
          "amount": 1
        },
        {
          "material": "yumako-mash",
          "amount": 4
        }
      ],
      "alternate": true
    },
    {
      "id": "biosulfur",
      "name": "Biosulfur",
      "outputs": [
        {
          "material": "sulfur",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "spoilage",
          "amount": 5
        },
        {
          "material": "bioflux",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "biolubricant",
      "name": "Biolubricant",
      "outputs": [
        {
          "material": "lubricant",
          "amount": 20
        }
      ],
      "inputs": [
        {
          "material": "jelly",
          "amount": 60
        }
      ],
      "alternate": true
    },
    {
      "id": "carbon-fiber",
      "name": "Carbon fiber",
      "outputs": [
        {
          "material": "carbon-fiber",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "yumako-mash",
          "amount": 10
        },
        {
          "material": "carbon",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "toolbelt-equipment",
      "name": "Toolbelt equipment",
      "outputs": [
        {
          "material": "toolbelt-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 3
        },
        {
          "material": "carbon-fiber",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "battery-mk3-equipment",
      "name": "Personal battery MK3",
      "outputs": [
        {
          "material": "battery-mk3-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "battery-mk2-equipment",
          "amount": 5
        },
        {
          "material": "supercapacitor",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "space-platform-foundation",
      "name": "Space platform foundation",
      "outputs": [
        {
          "material": "space-platform-foundation",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "copper-cable",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "stack-inserter",
      "name": "Stack inserter",
      "outputs": [
        {
          "material": "stack-inserter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "bulk-inserter",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "carbon-fiber",
          "amount": 2
        },
        {
          "material": "jelly",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "rocket-turret",
      "name": "Rocket turret",
      "outputs": [
        {
          "material": "rocket-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "rocket-launcher",
          "amount": 4
        },
        {
          "material": "processing-unit",
          "amount": 4
        },
        {
          "material": "carbon-fiber",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "iron-gear-wheel",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "infinity-chest",
      "name": "Infinity chest",
      "outputs": [
        {
          "material": "infinity-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-chest",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "infinity-pipe",
      "name": "Infinity pipe",
      "outputs": [
        {
          "material": "infinity-pipe",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "pipe",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "heat-interface",
      "name": "Heat interface",
      "outputs": [
        {
          "material": "heat-interface",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "heat-pipe",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        }
      ]
    },
    {
      "id": "space-platform-starter-pack",
      "name": "Space platform starter pack",
      "outputs": [
        {
          "material": "space-platform-starter-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "space-platform-foundation",
          "amount": 60
        },
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "processing-unit",
          "amount": 20
        }
      ]
    },
    {
      "id": "cargo-bay",
      "name": "Cargo bay",
      "outputs": [
        {
          "material": "cargo-bay",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 20
        },
        {
          "material": "low-density-structure",
          "amount": 20
        },
        {
          "material": "processing-unit",
          "amount": 5
        }
      ],
      "spaceAge": true
    },
    {
      "id": "landing-pad-unloading-bay",
      "name": "Landing pad unloading bay",
      "outputs": [
        {
          "material": "landing-pad-unloading-bay",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "cargo-bay",
          "amount": 1
        },
        {
          "material": "steel-chest",
          "amount": 4
        },
        {
          "material": "electric-engine-unit",
          "amount": 15
        },
        {
          "material": "processing-unit",
          "amount": 8
        }
      ],
      "spaceAge": true
    },
    {
      "id": "asteroid-collector",
      "name": "Asteroid collector",
      "outputs": [
        {
          "material": "asteroid-collector",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "low-density-structure",
          "amount": 20
        },
        {
          "material": "electric-engine-unit",
          "amount": 8
        },
        {
          "material": "processing-unit",
          "amount": 5
        }
      ],
      "spaceAge": true
    },
    {
      "id": "crusher",
      "name": "Crusher",
      "outputs": [
        {
          "material": "crusher",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "low-density-structure",
          "amount": 20
        },
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "electric-engine-unit",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "thruster",
      "name": "Thruster",
      "outputs": [
        {
          "material": "thruster",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "processing-unit",
          "amount": 10
        },
        {
          "material": "electric-engine-unit",
          "amount": 5
        }
      ],
      "spaceAge": true
    },
    {
      "id": "space-science-pack",
      "name": "Space science pack",
      "outputs": [
        {
          "material": "space-science-pack",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 2
        },
        {
          "material": "carbon",
          "amount": 1
        },
        {
          "material": "ice",
          "amount": 1
        }
      ]
    },
    {
      "id": "metallurgic-science-pack",
      "name": "Metallurgic science pack",
      "outputs": [
        {
          "material": "metallurgic-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-carbide",
          "amount": 3
        },
        {
          "material": "tungsten-plate",
          "amount": 2
        },
        {
          "material": "molten-copper",
          "amount": 200
        }
      ],
      "spaceAge": true
    },
    {
      "id": "agricultural-science-pack",
      "name": "Agricultural science pack",
      "outputs": [
        {
          "material": "agricultural-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "bioflux",
          "amount": 1
        },
        {
          "material": "pentapod-egg",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "electromagnetic-science-pack",
      "name": "Electromagnetic science pack",
      "outputs": [
        {
          "material": "electromagnetic-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "supercapacitor",
          "amount": 1
        },
        {
          "material": "accumulator",
          "amount": 1
        },
        {
          "material": "electrolyte",
          "amount": 25
        },
        {
          "material": "holmium-solution",
          "amount": 25
        }
      ],
      "spaceAge": true
    },
    {
      "id": "cryogenic-science-pack",
      "name": "Cryogenic science pack",
      "outputs": [
        {
          "material": "cryogenic-science-pack",
          "amount": 1
        },
        {
          "material": "fluoroketone-hot",
          "amount": 3
        }
      ],
      "inputs": [
        {
          "material": "ice",
          "amount": 3
        },
        {
          "material": "lithium-plate",
          "amount": 1
        },
        {
          "material": "fluoroketone-cold",
          "amount": 6
        }
      ],
      "spaceAge": true
    },
    {
      "id": "metallic-asteroid-crushing",
      "name": "Metallic asteroid crushing",
      "outputs": [
        {
          "material": "iron-ore",
          "amount": 20
        },
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        }
      ]
    },
    {
      "id": "carbonic-asteroid-crushing",
      "name": "Carbonic asteroid crushing",
      "outputs": [
        {
          "material": "carbon",
          "amount": 10
        },
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "oxide-asteroid-crushing",
      "name": "Oxide asteroid crushing",
      "outputs": [
        {
          "material": "ice",
          "amount": 5
        },
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "advanced-metallic-asteroid-crushing",
      "name": "Advanced metallic asteroid crushing",
      "outputs": [
        {
          "material": "iron-ore",
          "amount": 10
        },
        {
          "material": "copper-ore",
          "amount": 4
        },
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "advanced-carbonic-asteroid-crushing",
      "name": "Advanced carbonic asteroid crushing",
      "outputs": [
        {
          "material": "carbon",
          "amount": 5
        },
        {
          "material": "sulfur",
          "amount": 2
        },
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "advanced-oxide-asteroid-crushing",
      "name": "Advanced oxide asteroid crushing",
      "outputs": [
        {
          "material": "ice",
          "amount": 3
        },
        {
          "material": "calcite",
          "amount": 2
        },
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "metallic-asteroid-reprocessing",
      "name": "Metallic asteroid reprocessing",
      "outputs": [
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        },
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        },
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "carbonic-asteroid-reprocessing",
      "name": "Carbonic asteroid reprocessing",
      "outputs": [
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        },
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        },
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "oxide-asteroid-reprocessing",
      "name": "Oxide asteroid reprocessing",
      "outputs": [
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        },
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        },
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "thruster-fuel",
      "name": "Thruster fuel",
      "outputs": [
        {
          "material": "thruster-fuel",
          "amount": 75
        }
      ],
      "inputs": [
        {
          "material": "carbon",
          "amount": 2
        },
        {
          "material": "water",
          "amount": 10
        }
      ]
    },
    {
      "id": "thruster-oxidizer",
      "name": "Thruster oxidizer",
      "outputs": [
        {
          "material": "thruster-oxidizer",
          "amount": 75
        }
      ],
      "inputs": [
        {
          "material": "iron-ore",
          "amount": 2
        },
        {
          "material": "water",
          "amount": 10
        }
      ]
    },
    {
      "id": "ice-melting",
      "name": "Ice melting",
      "outputs": [
        {
          "material": "water",
          "amount": 20
        }
      ],
      "inputs": [
        {
          "material": "ice",
          "amount": 1
        }
      ]
    },
    {
      "id": "advanced-thruster-fuel",
      "name": "Advanced thruster fuel",
      "outputs": [
        {
          "material": "thruster-fuel",
          "amount": 1500
        }
      ],
      "inputs": [
        {
          "material": "carbon",
          "amount": 2
        },
        {
          "material": "calcite",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 100
        }
      ],
      "alternate": true
    },
    {
      "id": "advanced-thruster-oxidizer",
      "name": "Advanced thruster oxidizer",
      "outputs": [
        {
          "material": "thruster-oxidizer",
          "amount": 1500
        }
      ],
      "inputs": [
        {
          "material": "iron-ore",
          "amount": 2
        },
        {
          "material": "calcite",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 100
        }
      ],
      "alternate": true
    },
    {
      "id": "acid-neutralisation",
      "name": "Acid neutralisation",
      "outputs": [
        {
          "material": "steam",
          "amount": 1e3
        }
      ],
      "inputs": [
        {
          "material": "calcite",
          "amount": 1
        },
        {
          "material": "sulfuric-acid",
          "amount": 100
        }
      ]
    },
    {
      "id": "steam-condensation",
      "name": "Steam condensation",
      "outputs": [
        {
          "material": "water",
          "amount": 90
        }
      ],
      "inputs": [
        {
          "material": "steam",
          "amount": 1e3
        }
      ],
      "alternate": true
    },
    {
      "id": "carbon",
      "name": "Carbon",
      "outputs": [
        {
          "material": "carbon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "coal",
          "amount": 2
        },
        {
          "material": "sulfuric-acid",
          "amount": 20
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "tungsten-carbide",
      "name": "Tungsten carbide",
      "outputs": [
        {
          "material": "tungsten-carbide",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-ore",
          "amount": 2
        },
        {
          "material": "sulfuric-acid",
          "amount": 10
        },
        {
          "material": "carbon",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "foundry",
      "name": "Foundry",
      "outputs": [
        {
          "material": "foundry",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-carbide",
          "amount": 50
        },
        {
          "material": "steel-plate",
          "amount": 50
        },
        {
          "material": "electronic-circuit",
          "amount": 30
        },
        {
          "material": "refined-concrete",
          "amount": 20
        },
        {
          "material": "lubricant",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "molten-iron-from-lava",
      "name": "Molten iron from lava",
      "outputs": [
        {
          "material": "molten-iron",
          "amount": 250
        },
        {
          "material": "stone",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "lava",
          "amount": 500
        },
        {
          "material": "calcite",
          "amount": 1
        }
      ]
    },
    {
      "id": "molten-copper-from-lava",
      "name": "Molten copper from lava",
      "outputs": [
        {
          "material": "molten-copper",
          "amount": 250
        },
        {
          "material": "stone",
          "amount": 15
        }
      ],
      "inputs": [
        {
          "material": "lava",
          "amount": 500
        },
        {
          "material": "calcite",
          "amount": 1
        }
      ]
    },
    {
      "id": "iron-ore-melting",
      "name": "Iron ore melting",
      "outputs": [
        {
          "material": "molten-iron",
          "amount": 500
        }
      ],
      "inputs": [
        {
          "material": "iron-ore",
          "amount": 50
        },
        {
          "material": "calcite",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "copper-ore-melting",
      "name": "Copper ore melting",
      "outputs": [
        {
          "material": "molten-copper",
          "amount": 500
        }
      ],
      "inputs": [
        {
          "material": "copper-ore",
          "amount": 50
        },
        {
          "material": "calcite",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-iron",
      "name": "Casting iron",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 20
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-steel",
      "name": "Casting steel",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 30
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-copper",
      "name": "Casting copper",
      "outputs": [
        {
          "material": "copper-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "molten-copper",
          "amount": 20
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-iron-gear-wheel",
      "name": "Casting iron gear wheel",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 10
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-iron-stick",
      "name": "Casting iron stick",
      "outputs": [
        {
          "material": "iron-stick",
          "amount": 4
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 20
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-pipe",
      "name": "Casting pipe",
      "outputs": [
        {
          "material": "pipe",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 10
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-pipe-to-ground",
      "name": "Casting pipe to ground",
      "outputs": [
        {
          "material": "pipe-to-ground",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 50
        },
        {
          "material": "pipe",
          "amount": 10
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-low-density-structure",
      "name": "Casting low density structure",
      "outputs": [
        {
          "material": "low-density-structure",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 80
        },
        {
          "material": "molten-copper",
          "amount": 250
        },
        {
          "material": "plastic-bar",
          "amount": 5
        }
      ],
      "alternate": true
    },
    {
      "id": "concrete-from-molten-iron",
      "name": "Concrete from molten iron",
      "outputs": [
        {
          "material": "concrete",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "molten-iron",
          "amount": 20
        },
        {
          "material": "water",
          "amount": 100
        },
        {
          "material": "stone-brick",
          "amount": 5
        }
      ],
      "alternate": true
    },
    {
      "id": "casting-copper-cable",
      "name": "Casting copper cable",
      "outputs": [
        {
          "material": "copper-cable",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "molten-copper",
          "amount": 5
        }
      ],
      "alternate": true
    },
    {
      "id": "tungsten-plate",
      "name": "Tungsten plate",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-ore",
          "amount": 4
        },
        {
          "material": "molten-iron",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "turbo-transport-belt",
      "name": "Turbo transport belt",
      "outputs": [
        {
          "material": "turbo-transport-belt",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 5
        },
        {
          "material": "express-transport-belt",
          "amount": 1
        },
        {
          "material": "lubricant",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "turbo-underground-belt",
      "name": "Turbo underground belt",
      "outputs": [
        {
          "material": "turbo-underground-belt",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 40
        },
        {
          "material": "express-underground-belt",
          "amount": 2
        },
        {
          "material": "lubricant",
          "amount": 40
        }
      ],
      "spaceAge": true
    },
    {
      "id": "turbo-splitter",
      "name": "Turbo splitter",
      "outputs": [
        {
          "material": "turbo-splitter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "express-splitter",
          "amount": 1
        },
        {
          "material": "tungsten-plate",
          "amount": 15
        },
        {
          "material": "processing-unit",
          "amount": 2
        },
        {
          "material": "lubricant",
          "amount": 80
        }
      ],
      "spaceAge": true
    },
    {
      "id": "turbo-loader",
      "name": "Turbo loader",
      "outputs": [
        {
          "material": "turbo-loader",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "turbo-transport-belt",
          "amount": 5
        },
        {
          "material": "express-loader",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "big-mining-drill",
      "name": "Big mining drill",
      "outputs": [
        {
          "material": "big-mining-drill",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electric-mining-drill",
          "amount": 1
        },
        {
          "material": "molten-iron",
          "amount": 200
        },
        {
          "material": "tungsten-carbide",
          "amount": 20
        },
        {
          "material": "electric-engine-unit",
          "amount": 10
        },
        {
          "material": "advanced-circuit",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "mech-armor",
      "name": "Mech armor",
      "outputs": [
        {
          "material": "mech-armor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "power-armor-mk2",
          "amount": 1
        },
        {
          "material": "holmium-plate",
          "amount": 200
        },
        {
          "material": "processing-unit",
          "amount": 100
        },
        {
          "material": "superconductor",
          "amount": 50
        },
        {
          "material": "supercapacitor",
          "amount": 50
        }
      ]
    },
    {
      "id": "railgun",
      "name": "Railgun",
      "outputs": [
        {
          "material": "railgun",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 10
        },
        {
          "material": "superconductor",
          "amount": 10
        },
        {
          "material": "quantum-processor",
          "amount": 20
        },
        {
          "material": "fluoroketone-cold",
          "amount": 10
        }
      ]
    },
    {
      "id": "railgun-turret",
      "name": "Railgun turret",
      "outputs": [
        {
          "material": "railgun-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "quantum-processor",
          "amount": 100
        },
        {
          "material": "tungsten-plate",
          "amount": 30
        },
        {
          "material": "superconductor",
          "amount": 50
        },
        {
          "material": "carbon-fiber",
          "amount": 20
        },
        {
          "material": "fluoroketone-cold",
          "amount": 100
        }
      ],
      "spaceAge": true
    },
    {
      "id": "railgun-ammo",
      "name": "Railgun ammo",
      "outputs": [
        {
          "material": "railgun-ammo",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "copper-cable",
          "amount": 10
        },
        {
          "material": "explosives",
          "amount": 2
        }
      ]
    },
    {
      "id": "agricultural-tower",
      "name": "Agricultural tower",
      "outputs": [
        {
          "material": "agricultural-tower",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 10
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "spoilage",
          "amount": 20
        },
        {
          "material": "landfill",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "biochamber",
      "name": "Biochamber",
      "outputs": [
        {
          "material": "biochamber",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "nutrients",
          "amount": 5
        },
        {
          "material": "pentapod-egg",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 20
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "landfill",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "burnt-spoilage",
      "name": "Burnt spoilage",
      "outputs": [
        {
          "material": "carbon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "spoilage",
          "amount": 6
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "coal-synthesis",
      "name": "Coal synthesis",
      "outputs": [
        {
          "material": "coal",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "carbon",
          "amount": 5
        },
        {
          "material": "sulfur",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 10
        }
      ]
    },
    {
      "id": "capture-robot-rocket",
      "name": "Capture bot rocket",
      "outputs": [
        {
          "material": "capture-robot-rocket",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "flying-robot-frame",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "bioflux",
          "amount": 20
        },
        {
          "material": "processing-unit",
          "amount": 2
        }
      ]
    },
    {
      "id": "biolab",
      "name": "Biolab",
      "outputs": [
        {
          "material": "biolab",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lab",
          "amount": 1
        },
        {
          "material": "biter-egg",
          "amount": 10
        },
        {
          "material": "refined-concrete",
          "amount": 25
        },
        {
          "material": "capture-robot-rocket",
          "amount": 2
        },
        {
          "material": "uranium-235",
          "amount": 3
        }
      ],
      "spaceAge": true
    },
    {
      "id": "captive-biter-spawner",
      "name": "Captive biter spawner",
      "outputs": [
        {
          "material": "captive-biter-spawner",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "biter-egg",
          "amount": 10
        },
        {
          "material": "capture-robot-rocket",
          "amount": 1
        },
        {
          "material": "uranium-235",
          "amount": 15
        },
        {
          "material": "fluoroketone-cold",
          "amount": 100
        }
      ],
      "spaceAge": true
    },
    {
      "id": "fish-breeding",
      "name": "Fish breeding",
      "outputs": [
        {
          "material": "raw-fish",
          "amount": 3
        }
      ],
      "inputs": [
        {
          "material": "raw-fish",
          "amount": 2
        },
        {
          "material": "nutrients",
          "amount": 100
        },
        {
          "material": "water",
          "amount": 100
        }
      ]
    },
    {
      "id": "nutrients-from-fish",
      "name": "Nutrients from fish",
      "outputs": [
        {
          "material": "nutrients",
          "amount": 20
        }
      ],
      "inputs": [
        {
          "material": "raw-fish",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "nutrients-from-biter-egg",
      "name": "Nutrients from biter egg",
      "outputs": [
        {
          "material": "nutrients",
          "amount": 20
        }
      ],
      "inputs": [
        {
          "material": "biter-egg",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "scrap-recycling",
      "name": "Scrap recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "solid-fuel",
          "amount": 1
        },
        {
          "material": "concrete",
          "amount": 1
        },
        {
          "material": "ice",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "battery",
          "amount": 1
        },
        {
          "material": "stone",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "low-density-structure",
          "amount": 1
        },
        {
          "material": "holmium-ore",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "scrap",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "lightning-rod",
      "name": "Lightning rod",
      "outputs": [
        {
          "material": "lightning-rod",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-cable",
          "amount": 12
        },
        {
          "material": "steel-plate",
          "amount": 8
        },
        {
          "material": "stone-brick",
          "amount": 4
        }
      ],
      "spaceAge": true
    },
    {
      "id": "holmium-solution",
      "name": "Holmium solution",
      "outputs": [
        {
          "material": "holmium-solution",
          "amount": 100
        }
      ],
      "inputs": [
        {
          "material": "holmium-ore",
          "amount": 2
        },
        {
          "material": "stone",
          "amount": 1
        },
        {
          "material": "water",
          "amount": 10
        }
      ]
    },
    {
      "id": "holmium-plate",
      "name": "Holmium plate",
      "outputs": [
        {
          "material": "holmium-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "holmium-solution",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "electromagnetic-plant",
      "name": "Electromagnetic plant",
      "outputs": [
        {
          "material": "electromagnetic-plant",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "holmium-plate",
          "amount": 150
        },
        {
          "material": "steel-plate",
          "amount": 50
        },
        {
          "material": "processing-unit",
          "amount": 50
        },
        {
          "material": "refined-concrete",
          "amount": 50
        }
      ],
      "spaceAge": true
    },
    {
      "id": "superconductor",
      "name": "Superconductor",
      "outputs": [
        {
          "material": "superconductor",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "holmium-plate",
          "amount": 1
        },
        {
          "material": "copper-plate",
          "amount": 1
        },
        {
          "material": "plastic-bar",
          "amount": 1
        },
        {
          "material": "light-oil",
          "amount": 5
        }
      ],
      "spaceAge": true
    },
    {
      "id": "supercapacitor",
      "name": "Supercapacitor",
      "outputs": [
        {
          "material": "supercapacitor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "holmium-plate",
          "amount": 2
        },
        {
          "material": "superconductor",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 4
        },
        {
          "material": "battery",
          "amount": 1
        },
        {
          "material": "electrolyte",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "electrolyte",
      "name": "Electrolyte",
      "outputs": [
        {
          "material": "electrolyte",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "stone",
          "amount": 1
        },
        {
          "material": "heavy-oil",
          "amount": 10
        },
        {
          "material": "holmium-solution",
          "amount": 10
        }
      ]
    },
    {
      "id": "lightning-collector",
      "name": "Lightning collector",
      "outputs": [
        {
          "material": "lightning-collector",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lightning-rod",
          "amount": 1
        },
        {
          "material": "supercapacitor",
          "amount": 8
        },
        {
          "material": "accumulator",
          "amount": 1
        },
        {
          "material": "electrolyte",
          "amount": 80
        }
      ],
      "spaceAge": true
    },
    {
      "id": "teslagun",
      "name": "Tesla gun",
      "outputs": [
        {
          "material": "teslagun",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "holmium-plate",
          "amount": 10
        },
        {
          "material": "superconductor",
          "amount": 10
        },
        {
          "material": "plastic-bar",
          "amount": 30
        },
        {
          "material": "electrolyte",
          "amount": 100
        }
      ]
    },
    {
      "id": "tesla-turret",
      "name": "Tesla turret",
      "outputs": [
        {
          "material": "tesla-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "teslagun",
          "amount": 1
        },
        {
          "material": "supercapacitor",
          "amount": 10
        },
        {
          "material": "processing-unit",
          "amount": 10
        },
        {
          "material": "superconductor",
          "amount": 50
        },
        {
          "material": "electrolyte",
          "amount": 500
        }
      ],
      "spaceAge": true
    },
    {
      "id": "tesla-ammo",
      "name": "Tesla ammo",
      "outputs": [
        {
          "material": "tesla-ammo",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "supercapacitor",
          "amount": 1
        },
        {
          "material": "plastic-bar",
          "amount": 1
        },
        {
          "material": "electrolyte",
          "amount": 10
        }
      ]
    },
    {
      "id": "heating-tower",
      "name": "Heating tower",
      "outputs": [
        {
          "material": "heating-tower",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "boiler",
          "amount": 2
        },
        {
          "material": "heat-pipe",
          "amount": 5
        },
        {
          "material": "concrete",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "lithium",
      "name": "Lithium",
      "outputs": [
        {
          "material": "lithium",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "holmium-plate",
          "amount": 1
        },
        {
          "material": "lithium-brine",
          "amount": 50
        },
        {
          "material": "ammonia",
          "amount": 50
        }
      ],
      "spaceAge": true
    },
    {
      "id": "lithium-plate",
      "name": "Lithium plate",
      "outputs": [
        {
          "material": "lithium-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lithium",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "fluoroketone",
      "name": "Fluoroketone",
      "outputs": [
        {
          "material": "fluoroketone-hot",
          "amount": 50
        }
      ],
      "inputs": [
        {
          "material": "fluorine",
          "amount": 50
        },
        {
          "material": "ammonia",
          "amount": 50
        },
        {
          "material": "solid-fuel",
          "amount": 1
        },
        {
          "material": "lithium",
          "amount": 1
        }
      ]
    },
    {
      "id": "fluoroketone-cooling",
      "name": "Cooling hot fluoroketone",
      "outputs": [
        {
          "material": "fluoroketone-cold",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "fluoroketone-hot",
          "amount": 10
        }
      ]
    },
    {
      "id": "cryogenic-plant",
      "name": "Cryogenic plant",
      "outputs": [
        {
          "material": "cryogenic-plant",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "refined-concrete",
          "amount": 40
        },
        {
          "material": "superconductor",
          "amount": 20
        },
        {
          "material": "processing-unit",
          "amount": 20
        },
        {
          "material": "lithium-plate",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "quantum-processor",
      "name": "Quantum processor",
      "outputs": [
        {
          "material": "quantum-processor",
          "amount": 1
        },
        {
          "material": "fluoroketone-hot",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "tungsten-carbide",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "superconductor",
          "amount": 1
        },
        {
          "material": "carbon-fiber",
          "amount": 1
        },
        {
          "material": "lithium-plate",
          "amount": 2
        },
        {
          "material": "fluoroketone-cold",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "ammoniacal-solution-separation",
      "name": "Ammoniacal solution separation",
      "outputs": [
        {
          "material": "ice",
          "amount": 5
        },
        {
          "material": "ammonia",
          "amount": 50
        }
      ],
      "inputs": [
        {
          "material": "ammoniacal-solution",
          "amount": 50
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "fusion-reactor-equipment",
      "name": "Portable fusion reactor",
      "outputs": [
        {
          "material": "fusion-reactor-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fission-reactor-equipment",
          "amount": 1
        },
        {
          "material": "fusion-power-cell",
          "amount": 10
        },
        {
          "material": "tungsten-plate",
          "amount": 250
        },
        {
          "material": "carbon-fiber",
          "amount": 100
        },
        {
          "material": "supercapacitor",
          "amount": 25
        },
        {
          "material": "quantum-processor",
          "amount": 250
        }
      ],
      "spaceAge": true
    },
    {
      "id": "fusion-power-cell",
      "name": "Fusion power cell",
      "outputs": [
        {
          "material": "fusion-power-cell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lithium-plate",
          "amount": 5
        },
        {
          "material": "holmium-plate",
          "amount": 1
        },
        {
          "material": "ammonia",
          "amount": 100
        }
      ],
      "spaceAge": true
    },
    {
      "id": "fusion-reactor",
      "name": "Fusion reactor",
      "outputs": [
        {
          "material": "fusion-reactor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 200
        },
        {
          "material": "superconductor",
          "amount": 200
        },
        {
          "material": "quantum-processor",
          "amount": 250
        }
      ],
      "spaceAge": true
    },
    {
      "id": "fusion-generator",
      "name": "Fusion generator",
      "outputs": [
        {
          "material": "fusion-generator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 100
        },
        {
          "material": "superconductor",
          "amount": 100
        },
        {
          "material": "quantum-processor",
          "amount": 50
        }
      ],
      "spaceAge": true
    },
    {
      "id": "ice-platform",
      "name": "Ice platform",
      "outputs": [
        {
          "material": "ice-platform",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "ammonia",
          "amount": 400
        },
        {
          "material": "ice",
          "amount": 50
        }
      ],
      "spaceAge": true
    },
    {
      "id": "solid-fuel-from-ammonia",
      "name": "Solid fuel from ammonia",
      "outputs": [
        {
          "material": "solid-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "ammonia",
          "amount": 15
        },
        {
          "material": "crude-oil",
          "amount": 6
        }
      ],
      "alternate": true
    },
    {
      "id": "ammonia-rocket-fuel",
      "name": "Ammonia rocket fuel",
      "outputs": [
        {
          "material": "rocket-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "solid-fuel",
          "amount": 10
        },
        {
          "material": "water",
          "amount": 50
        },
        {
          "material": "ammonia",
          "amount": 500
        }
      ],
      "alternate": true
    },
    {
      "id": "foundation",
      "name": "Foundation",
      "outputs": [
        {
          "material": "foundation",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 4
        },
        {
          "material": "lithium-plate",
          "amount": 4
        },
        {
          "material": "carbon-fiber",
          "amount": 4
        },
        {
          "material": "stone",
          "amount": 20
        },
        {
          "material": "fluoroketone-cold",
          "amount": 20
        }
      ],
      "spaceAge": true
    },
    {
      "id": "promethium-science-pack",
      "name": "Promethium science pack",
      "outputs": [
        {
          "material": "promethium-science-pack",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "promethium-asteroid-chunk",
          "amount": 25
        },
        {
          "material": "quantum-processor",
          "amount": 1
        },
        {
          "material": "biter-egg",
          "amount": 10
        }
      ],
      "spaceAge": true
    },
    {
      "id": "tree-seed",
      "name": "Tree seed",
      "outputs": [
        {
          "material": "tree-seed",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "wood",
          "amount": 2
        }
      ],
      "spaceAge": true
    },
    {
      "id": "water-barrel",
      "name": "Fill Water barrel",
      "outputs": [
        {
          "material": "water-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "water",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-water-barrel",
      "name": "Empty Water barrel",
      "outputs": [
        {
          "material": "water",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "water-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "sulfuric-acid-barrel",
      "name": "Fill Sulfuric acid barrel",
      "outputs": [
        {
          "material": "sulfuric-acid-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "sulfuric-acid",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-sulfuric-acid-barrel",
      "name": "Empty Sulfuric acid barrel",
      "outputs": [
        {
          "material": "sulfuric-acid",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "sulfuric-acid-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "crude-oil-barrel",
      "name": "Fill Crude oil barrel",
      "outputs": [
        {
          "material": "crude-oil-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "crude-oil",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-crude-oil-barrel",
      "name": "Empty Crude oil barrel",
      "outputs": [
        {
          "material": "crude-oil",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "crude-oil-barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "heavy-oil-barrel",
      "name": "Fill Heavy oil barrel",
      "outputs": [
        {
          "material": "heavy-oil-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "heavy-oil",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-heavy-oil-barrel",
      "name": "Empty Heavy oil barrel",
      "outputs": [
        {
          "material": "heavy-oil",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "heavy-oil-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "light-oil-barrel",
      "name": "Fill Light oil barrel",
      "outputs": [
        {
          "material": "light-oil-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "light-oil",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-light-oil-barrel",
      "name": "Empty Light oil barrel",
      "outputs": [
        {
          "material": "light-oil",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "light-oil-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "petroleum-gas-barrel",
      "name": "Fill Petroleum gas barrel",
      "outputs": [
        {
          "material": "petroleum-gas-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "petroleum-gas",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-petroleum-gas-barrel",
      "name": "Empty Petroleum gas barrel",
      "outputs": [
        {
          "material": "petroleum-gas",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "petroleum-gas-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "lubricant-barrel",
      "name": "Fill Lubricant barrel",
      "outputs": [
        {
          "material": "lubricant-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lubricant",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-lubricant-barrel",
      "name": "Empty Lubricant barrel",
      "outputs": [
        {
          "material": "lubricant",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lubricant-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fluoroketone-cold-barrel",
      "name": "Fill Fluoroketone (Cold) barrel",
      "outputs": [
        {
          "material": "fluoroketone-cold-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fluoroketone-cold",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-fluoroketone-cold-barrel",
      "name": "Empty Fluoroketone (Cold) barrel",
      "outputs": [
        {
          "material": "fluoroketone-cold",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fluoroketone-cold-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fluoroketone-hot-barrel",
      "name": "Fill Fluoroketone (Hot) barrel",
      "outputs": [
        {
          "material": "fluoroketone-hot-barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fluoroketone-hot",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ]
    },
    {
      "id": "empty-fluoroketone-hot-barrel",
      "name": "Empty Fluoroketone (Hot) barrel",
      "outputs": [
        {
          "material": "fluoroketone-hot",
          "amount": 50
        },
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fluoroketone-hot-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "speed-module-recycling",
      "name": "Speed module recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "speed-module",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "speed-module-2-recycling",
      "name": "Speed module 2 recycling",
      "outputs": [
        {
          "material": "speed-module",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "speed-module-2",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "speed-module-3-recycling",
      "name": "Speed module 3 recycling",
      "outputs": [
        {
          "material": "speed-module-2",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "tungsten-carbide",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "speed-module-3",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "productivity-module-recycling",
      "name": "Productivity module recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "productivity-module",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "productivity-module-2-recycling",
      "name": "Productivity module 2 recycling",
      "outputs": [
        {
          "material": "productivity-module",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "productivity-module-2",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "productivity-module-3-recycling",
      "name": "Productivity module 3 recycling",
      "outputs": [
        {
          "material": "productivity-module-2",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "biter-egg",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "productivity-module-3",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "efficiency-module-recycling",
      "name": "Efficiency module recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "efficiency-module",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "efficiency-module-2-recycling",
      "name": "Efficiency module 2 recycling",
      "outputs": [
        {
          "material": "efficiency-module",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "efficiency-module-2",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "efficiency-module-3-recycling",
      "name": "Efficiency module 3 recycling",
      "outputs": [
        {
          "material": "efficiency-module-2",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "spoilage",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "efficiency-module-3",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "bulk-inserter-recycling",
      "name": "Bulk inserter recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 3
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        },
        {
          "material": "fast-inserter",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "bulk-inserter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "barrel-recycling",
      "name": "Barrel recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "night-vision-equipment-recycling",
      "name": "Nightvision recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "night-vision-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "belt-immunity-equipment-recycling",
      "name": "Belt immunity equipment recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "belt-immunity-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "energy-shield-equipment-recycling",
      "name": "Energy shield recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "energy-shield-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "energy-shield-mk2-equipment-recycling",
      "name": "Energy shield MK2 recycling",
      "outputs": [
        {
          "material": "energy-shield-equipment",
          "amount": 2
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "low-density-structure",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "energy-shield-mk2-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "battery-equipment-recycling",
      "name": "Personal battery recycling",
      "outputs": [
        {
          "material": "battery",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "battery-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "battery-mk2-equipment-recycling",
      "name": "Personal battery MK2 recycling",
      "outputs": [
        {
          "material": "battery-equipment",
          "amount": 2
        },
        {
          "material": "processing-unit",
          "amount": 3
        },
        {
          "material": "low-density-structure",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "battery-mk2-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "solar-panel-equipment-recycling",
      "name": "Portable solar panel recycling",
      "outputs": [
        {
          "material": "solar-panel",
          "amount": 0
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "solar-panel-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fission-reactor-equipment-recycling",
      "name": "Portable fission reactor recycling",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 50
        },
        {
          "material": "low-density-structure",
          "amount": 12
        },
        {
          "material": "uranium-fuel-cell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fission-reactor-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "personal-laser-defense-equipment-recycling",
      "name": "Personal laser defense recycling",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "low-density-structure",
          "amount": 1
        },
        {
          "material": "laser-turret",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "personal-laser-defense-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "discharge-defense-equipment-recycling",
      "name": "Discharge defense recycling",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "laser-turret",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "discharge-defense-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "exoskeleton-equipment-recycling",
      "name": "Exoskeleton recycling",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 2
        },
        {
          "material": "electric-engine-unit",
          "amount": 7
        },
        {
          "material": "steel-plate",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "exoskeleton-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "personal-roboport-equipment-recycling",
      "name": "Personal roboport recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 2
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "battery",
          "amount": 11
        }
      ],
      "inputs": [
        {
          "material": "personal-roboport-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "personal-roboport-mk2-equipment-recycling",
      "name": "Personal roboport MK2 recycling",
      "outputs": [
        {
          "material": "personal-roboport-equipment",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 12
        },
        {
          "material": "superconductor",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "personal-roboport-mk2-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "laser-turret-recycling",
      "name": "Laser turret recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "battery",
          "amount": 3
        }
      ],
      "inputs": [
        {
          "material": "laser-turret",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "flamethrower-turret-recycling",
      "name": "Flamethrower turret recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 7
        },
        {
          "material": "iron-gear-wheel",
          "amount": 3
        },
        {
          "material": "pipe",
          "amount": 2
        },
        {
          "material": "engine-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "flamethrower-turret",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "artillery-turret-recycling",
      "name": "Artillery turret recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 15
        },
        {
          "material": "refined-concrete",
          "amount": 15
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "processing-unit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "artillery-turret",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "gun-turret-recycling",
      "name": "Gun turret recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "copper-plate",
          "amount": 2
        },
        {
          "material": "iron-plate",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "gun-turret",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "wooden-chest-recycling",
      "name": "Wooden chest recycling",
      "outputs": [
        {
          "material": "wood",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "wooden-chest",
          "amount": 1
        }
      ]
    },
    {
      "id": "display-panel-recycling",
      "name": "Display panel recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "display-panel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "iron-stick-recycling",
      "name": "Iron stick recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "iron-stick",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "stone-furnace-recycling",
      "name": "Stone furnace recycling",
      "outputs": [
        {
          "material": "stone",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone-furnace",
          "amount": 1
        }
      ]
    },
    {
      "id": "boiler-recycling",
      "name": "Boiler recycling",
      "outputs": [
        {
          "material": "stone-furnace",
          "amount": 0
        },
        {
          "material": "pipe",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "boiler",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "steam-engine-recycling",
      "name": "Steam engine recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "pipe",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "steam-engine",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "iron-gear-wheel-recycling",
      "name": "Iron gear wheel recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "electronic-circuit-recycling",
      "name": "Electronic circuit recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "copper-cable",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "transport-belt-recycling",
      "name": "Transport belt recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "transport-belt",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "electric-mining-drill-recycling",
      "name": "Electric mining drill recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "electric-mining-drill",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "burner-mining-drill-recycling",
      "name": "Burner mining drill recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 0
        },
        {
          "material": "stone-furnace",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "burner-mining-drill",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "inserter-recycling",
      "name": "Inserter recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "inserter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fast-inserter-recycling",
      "name": "Fast inserter recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "inserter",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "fast-inserter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "long-handed-inserter-recycling",
      "name": "Long-handed inserter recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "inserter",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "long-handed-inserter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "burner-inserter-recycling",
      "name": "Burner inserter recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "burner-inserter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "pipe-recycling",
      "name": "Pipe recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "pipe",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "offshore-pump-recycling",
      "name": "Offshore pump recycling",
      "outputs": [
        {
          "material": "pipe",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "offshore-pump",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "copper-cable-recycling",
      "name": "Copper cable recycling",
      "outputs": [
        {
          "material": "copper-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "copper-cable",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "small-electric-pole-recycling",
      "name": "Small electric pole recycling",
      "outputs": [
        {
          "material": "wood",
          "amount": 0
        },
        {
          "material": "copper-cable",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "small-electric-pole",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "submachine-gun-recycling",
      "name": "Submachine gun recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "copper-plate",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "submachine-gun",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "firearm-magazine-recycling",
      "name": "Firearm magazine recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "firearm-magazine",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "light-armor-recycling",
      "name": "Light armor recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "light-armor",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "radar-recycling",
      "name": "Radar recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "radar",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "small-lamp-recycling",
      "name": "Lamp recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "copper-cable",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "small-lamp",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "pipe-to-ground-recycling",
      "name": "Pipe to ground recycling",
      "outputs": [
        {
          "material": "pipe",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "pipe-to-ground",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "assembling-machine-1-recycling",
      "name": "Assembling machine 1 recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "assembling-machine-1",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "repair-pack-recycling",
      "name": "Repair pack recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "repair-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "lab-recycling",
      "name": "Lab recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 2
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "transport-belt",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lab",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "stone-wall-recycling",
      "name": "Wall recycling",
      "outputs": [
        {
          "material": "stone-brick",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone-wall",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "assembling-machine-2-recycling",
      "name": "Assembling machine 2 recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "assembling-machine-1",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "assembling-machine-2",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "splitter-recycling",
      "name": "Splitter recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "transport-belt",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "splitter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "underground-belt-recycling",
      "name": "Underground belt recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "transport-belt",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "underground-belt",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "loader-recycling",
      "name": "Loader recycling",
      "outputs": [
        {
          "material": "inserter",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "transport-belt",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "loader",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "car-recycling",
      "name": "Car recycling",
      "outputs": [
        {
          "material": "engine-unit",
          "amount": 2
        },
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "car",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "engine-unit-recycling",
      "name": "Engine unit recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 0
        },
        {
          "material": "pipe",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "engine-unit",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "iron-chest-recycling",
      "name": "Iron chest recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "iron-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "big-electric-pole-recycling",
      "name": "Big electric pole recycling",
      "outputs": [
        {
          "material": "iron-stick",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "big-electric-pole",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "medium-electric-pole-recycling",
      "name": "Medium electric pole recycling",
      "outputs": [
        {
          "material": "iron-stick",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "copper-cable",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "medium-electric-pole",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "shotgun-recycling",
      "name": "Shotgun recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "copper-plate",
          "amount": 2
        },
        {
          "material": "wood",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "shotgun",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "shotgun-shell-recycling",
      "name": "Shotgun shells recycling",
      "outputs": [
        {
          "material": "copper-plate",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "shotgun-shell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "piercing-rounds-magazine-recycling",
      "name": "Piercing rounds magazine recycling",
      "outputs": [
        {
          "material": "firearm-magazine",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "copper-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "piercing-rounds-magazine",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "grenade-recycling",
      "name": "Grenade recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "coal",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "grenade",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "steel-furnace-recycling",
      "name": "Steel furnace recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "stone-brick",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "steel-furnace",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "gate-recycling",
      "name": "Gate recycling",
      "outputs": [
        {
          "material": "stone-wall",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "gate",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "heavy-armor-recycling",
      "name": "Heavy armor recycling",
      "outputs": [
        {
          "material": "copper-plate",
          "amount": 25
        },
        {
          "material": "steel-plate",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "heavy-armor",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "steel-chest-recycling",
      "name": "Steel chest recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "steel-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fast-underground-belt-recycling",
      "name": "Fast underground belt recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 5
        },
        {
          "material": "underground-belt",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "fast-underground-belt",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fast-splitter-recycling",
      "name": "Fast splitter recycling",
      "outputs": [
        {
          "material": "splitter",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "fast-splitter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "concrete-recycling",
      "name": "Concrete recycling",
      "outputs": [
        {
          "material": "stone-brick",
          "amount": 0
        },
        {
          "material": "iron-ore",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "concrete",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "hazard-concrete-recycling",
      "name": "Hazard concrete recycling",
      "outputs": [
        {
          "material": "stone-brick",
          "amount": 0
        },
        {
          "material": "iron-ore",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "hazard-concrete",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "refined-concrete-recycling",
      "name": "Refined concrete recycling",
      "outputs": [
        {
          "material": "concrete",
          "amount": 0
        },
        {
          "material": "iron-stick",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "refined-concrete",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "refined-hazard-concrete-recycling",
      "name": "Refined hazard concrete recycling",
      "outputs": [
        {
          "material": "concrete",
          "amount": 0
        },
        {
          "material": "iron-stick",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "refined-hazard-concrete",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fast-transport-belt-recycling",
      "name": "Fast transport belt recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "transport-belt",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "fast-transport-belt",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "solar-panel-recycling",
      "name": "Solar panel recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 3
        },
        {
          "material": "copper-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "solar-panel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rail-recycling",
      "name": "Rail recycling",
      "outputs": [
        {
          "material": "stone",
          "amount": 0
        },
        {
          "material": "iron-stick",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "rail",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "locomotive-recycling",
      "name": "Locomotive recycling",
      "outputs": [
        {
          "material": "engine-unit",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 7
        }
      ],
      "inputs": [
        {
          "material": "locomotive",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "cargo-wagon-recycling",
      "name": "Cargo wagon recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "cargo-wagon",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rail-signal-recycling",
      "name": "Rail signal recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "rail-signal",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rail-chain-signal-recycling",
      "name": "Rail chain signal recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "rail-chain-signal",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "train-stop-recycling",
      "name": "Train stop recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "iron-stick",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "train-stop",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "arithmetic-combinator-recycling",
      "name": "Arithmetic combinator recycling",
      "outputs": [
        {
          "material": "copper-cable",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "arithmetic-combinator",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "decider-combinator-recycling",
      "name": "Decider combinator recycling",
      "outputs": [
        {
          "material": "copper-cable",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "decider-combinator",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "constant-combinator-recycling",
      "name": "Constant combinator recycling",
      "outputs": [
        {
          "material": "copper-cable",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "constant-combinator",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "selector-combinator-recycling",
      "name": "Selector combinator recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 0
        },
        {
          "material": "decider-combinator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "selector-combinator",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "power-switch-recycling",
      "name": "Power switch recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "power-switch",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "programmable-speaker-recycling",
      "name": "Programmable speaker recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "iron-stick",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "programmable-speaker",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "poison-capsule-recycling",
      "name": "Poison capsule recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "coal",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "poison-capsule",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "slowdown-capsule-recycling",
      "name": "Slowdown capsule recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "coal",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "slowdown-capsule",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "cluster-grenade-recycling",
      "name": "Cluster grenade recycling",
      "outputs": [
        {
          "material": "grenade",
          "amount": 1
        },
        {
          "material": "explosives",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "cluster-grenade",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "defender-capsule-recycling",
      "name": "Defender capsule recycling",
      "outputs": [
        {
          "material": "piercing-rounds-magazine",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "defender-capsule",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "distractor-capsule-recycling",
      "name": "Distractor capsule recycling",
      "outputs": [
        {
          "material": "defender-capsule",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "distractor-capsule",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "destroyer-capsule-recycling",
      "name": "Destroyer capsule recycling",
      "outputs": [
        {
          "material": "distractor-capsule",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "destroyer-capsule",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "cliff-explosives-recycling",
      "name": "Cliff explosives recycling",
      "outputs": [
        {
          "material": "explosives",
          "amount": 2
        },
        {
          "material": "calcite",
          "amount": 2
        },
        {
          "material": "grenade",
          "amount": 0
        },
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "cliff-explosives",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "uranium-rounds-magazine-recycling",
      "name": "Uranium rounds magazine recycling",
      "outputs": [
        {
          "material": "piercing-rounds-magazine",
          "amount": 0
        },
        {
          "material": "uranium-238",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "uranium-rounds-magazine",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rocket-recycling",
      "name": "Rocket recycling",
      "outputs": [
        {
          "material": "explosives",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "rocket",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "explosive-rocket-recycling",
      "name": "Explosive rocket recycling",
      "outputs": [
        {
          "material": "rocket",
          "amount": 0
        },
        {
          "material": "explosives",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "explosive-rocket",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "atomic-bomb-recycling",
      "name": "Atomic bomb recycling",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 2
        },
        {
          "material": "explosives",
          "amount": 2
        },
        {
          "material": "uranium-235",
          "amount": 25
        }
      ],
      "inputs": [
        {
          "material": "atomic-bomb",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "piercing-shotgun-shell-recycling",
      "name": "Piercing shotgun shells recycling",
      "outputs": [
        {
          "material": "shotgun-shell",
          "amount": 0
        },
        {
          "material": "copper-plate",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "piercing-shotgun-shell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "cannon-shell-recycling",
      "name": "Cannon shell recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "plastic-bar",
          "amount": 0
        },
        {
          "material": "explosives",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "cannon-shell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "explosive-cannon-shell-recycling",
      "name": "Explosive cannon shell recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "plastic-bar",
          "amount": 0
        },
        {
          "material": "explosives",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "explosive-cannon-shell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "uranium-cannon-shell-recycling",
      "name": "Uranium cannon shell recycling",
      "outputs": [
        {
          "material": "cannon-shell",
          "amount": 0
        },
        {
          "material": "uranium-238",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "uranium-cannon-shell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "explosive-uranium-cannon-shell-recycling",
      "name": "Explosive uranium cannon shell recycling",
      "outputs": [
        {
          "material": "explosive-cannon-shell",
          "amount": 0
        },
        {
          "material": "uranium-238",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "explosive-uranium-cannon-shell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "artillery-shell-recycling",
      "name": "Artillery shell recycling",
      "outputs": [
        {
          "material": "radar",
          "amount": 0
        },
        {
          "material": "calcite",
          "amount": 0
        },
        {
          "material": "tungsten-plate",
          "amount": 1
        },
        {
          "material": "explosives",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "artillery-shell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "express-transport-belt-recycling",
      "name": "Express transport belt recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "fast-transport-belt",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "express-transport-belt",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "assembling-machine-3-recycling",
      "name": "Assembling machine 3 recycling",
      "outputs": [
        {
          "material": "assembling-machine-2",
          "amount": 0
        },
        {
          "material": "speed-module",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "assembling-machine-3",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "tank-recycling",
      "name": "Tank recycling",
      "outputs": [
        {
          "material": "engine-unit",
          "amount": 8
        },
        {
          "material": "steel-plate",
          "amount": 12
        },
        {
          "material": "iron-gear-wheel",
          "amount": 3
        },
        {
          "material": "advanced-circuit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "tank",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "spidertron-recycling",
      "name": "Spidertron recycling",
      "outputs": [
        {
          "material": "exoskeleton-equipment",
          "amount": 1
        },
        {
          "material": "fission-reactor-equipment",
          "amount": 0
        },
        {
          "material": "rocket-turret",
          "amount": 0
        },
        {
          "material": "radar",
          "amount": 0
        },
        {
          "material": "raw-fish",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "spidertron",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fluid-wagon-recycling",
      "name": "Fluid wagon recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 4
        },
        {
          "material": "pipe",
          "amount": 2
        },
        {
          "material": "storage-tank",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "fluid-wagon",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "artillery-wagon-recycling",
      "name": "Artillery wagon recycling",
      "outputs": [
        {
          "material": "engine-unit",
          "amount": 15
        },
        {
          "material": "tungsten-plate",
          "amount": 15
        },
        {
          "material": "refined-concrete",
          "amount": 15
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "processing-unit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "artillery-wagon",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "modular-armor-recycling",
      "name": "Modular armor recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 7
        },
        {
          "material": "steel-plate",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "modular-armor",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "power-armor-recycling",
      "name": "Power armor recycling",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 10
        },
        {
          "material": "electric-engine-unit",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 10
        }
      ],
      "inputs": [
        {
          "material": "power-armor",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "power-armor-mk2-recycling",
      "name": "Power armor MK2 recycling",
      "outputs": [
        {
          "material": "efficiency-module",
          "amount": 25
        },
        {
          "material": "speed-module",
          "amount": 25
        },
        {
          "material": "processing-unit",
          "amount": 15
        },
        {
          "material": "electric-engine-unit",
          "amount": 10
        },
        {
          "material": "low-density-structure",
          "amount": 7
        }
      ],
      "inputs": [
        {
          "material": "power-armor-mk2",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "flamethrower-recycling",
      "name": "Flamethrower recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "flamethrower",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "land-mine-recycling",
      "name": "Land mine recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "explosives",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "land-mine",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rocket-launcher-recycling",
      "name": "Rocket launcher recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "rocket-launcher",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "combat-shotgun-recycling",
      "name": "Combat shotgun recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "copper-plate",
          "amount": 2
        },
        {
          "material": "wood",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "combat-shotgun",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "express-underground-belt-recycling",
      "name": "Express underground belt recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "fast-underground-belt",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "express-underground-belt",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fast-loader-recycling",
      "name": "Fast loader recycling",
      "outputs": [
        {
          "material": "fast-transport-belt",
          "amount": 1
        },
        {
          "material": "loader",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "fast-loader",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "express-loader-recycling",
      "name": "Express loader recycling",
      "outputs": [
        {
          "material": "express-transport-belt",
          "amount": 1
        },
        {
          "material": "fast-loader",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "express-loader",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "express-splitter-recycling",
      "name": "Express splitter recycling",
      "outputs": [
        {
          "material": "fast-splitter",
          "amount": 0
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "advanced-circuit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "express-splitter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "advanced-circuit-recycling",
      "name": "Advanced circuit recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "plastic-bar",
          "amount": 0
        },
        {
          "material": "copper-cable",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "processing-unit-recycling",
      "name": "Processing unit recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "logistic-robot-recycling",
      "name": "Logistic robot recycling",
      "outputs": [
        {
          "material": "flying-robot-frame",
          "amount": 0
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "logistic-robot",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "construction-robot-recycling",
      "name": "Construction robot recycling",
      "outputs": [
        {
          "material": "flying-robot-frame",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "construction-robot",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "passive-provider-chest-recycling",
      "name": "Passive provider chest recycling",
      "outputs": [
        {
          "material": "steel-chest",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "passive-provider-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "active-provider-chest-recycling",
      "name": "Active provider chest recycling",
      "outputs": [
        {
          "material": "steel-chest",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "active-provider-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "storage-chest-recycling",
      "name": "Storage chest recycling",
      "outputs": [
        {
          "material": "steel-chest",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "storage-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "buffer-chest-recycling",
      "name": "Buffer chest recycling",
      "outputs": [
        {
          "material": "steel-chest",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "buffer-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "requester-chest-recycling",
      "name": "Requester chest recycling",
      "outputs": [
        {
          "material": "steel-chest",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "advanced-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "requester-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rocket-silo-recycling",
      "name": "Rocket silo recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 250
        },
        {
          "material": "concrete",
          "amount": 250
        },
        {
          "material": "pipe",
          "amount": 25
        },
        {
          "material": "processing-unit",
          "amount": 50
        },
        {
          "material": "electric-engine-unit",
          "amount": 50
        }
      ],
      "inputs": [
        {
          "material": "rocket-silo",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "cargo-landing-pad-recycling",
      "name": "Cargo landing pad recycling",
      "outputs": [
        {
          "material": "concrete",
          "amount": 50
        },
        {
          "material": "steel-plate",
          "amount": 6
        },
        {
          "material": "processing-unit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "cargo-landing-pad",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "roboport-recycling",
      "name": "Roboport recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 11
        },
        {
          "material": "iron-gear-wheel",
          "amount": 11
        },
        {
          "material": "advanced-circuit",
          "amount": 11
        }
      ],
      "inputs": [
        {
          "material": "roboport",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "substation-recycling",
      "name": "Substation recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "substation",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "accumulator-recycling",
      "name": "Accumulator recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "battery",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "accumulator",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "electric-furnace-recycling",
      "name": "Electric furnace recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "stone-brick",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "electric-furnace",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "beacon-recycling",
      "name": "Beacon recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 5
        },
        {
          "material": "advanced-circuit",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "copper-cable",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "beacon",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "pumpjack-recycling",
      "name": "Pumpjack recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "pipe",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "pumpjack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "oil-refinery-recycling",
      "name": "Oil refinery recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 3
        },
        {
          "material": "iron-gear-wheel",
          "amount": 2
        },
        {
          "material": "stone-brick",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 2
        },
        {
          "material": "pipe",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "oil-refinery",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "electric-engine-unit-recycling",
      "name": "Electric engine unit recycling",
      "outputs": [
        {
          "material": "engine-unit",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "electric-engine-unit",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "flying-robot-frame-recycling",
      "name": "Flying robot frame recycling",
      "outputs": [
        {
          "material": "electric-engine-unit",
          "amount": 0
        },
        {
          "material": "battery",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "flying-robot-frame",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "battery-recycling",
      "name": "Battery recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 0
        },
        {
          "material": "copper-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "battery",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "storage-tank-recycling",
      "name": "Storage tank recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "storage-tank",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "pump-recycling",
      "name": "Pump recycling",
      "outputs": [
        {
          "material": "engine-unit",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "pipe",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "pump",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "chemical-plant-recycling",
      "name": "Chemical plant recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "iron-gear-wheel",
          "amount": 1
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "pipe",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "chemical-plant",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "low-density-structure-recycling",
      "name": "Low density structure recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "copper-plate",
          "amount": 5
        },
        {
          "material": "plastic-bar",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "low-density-structure",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rocket-fuel-recycling",
      "name": "Rocket fuel recycling",
      "outputs": [
        {
          "material": "solid-fuel",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "rocket-fuel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "nuclear-reactor-recycling",
      "name": "Nuclear reactor recycling",
      "outputs": [
        {
          "material": "concrete",
          "amount": 125
        },
        {
          "material": "steel-plate",
          "amount": 125
        },
        {
          "material": "advanced-circuit",
          "amount": 125
        },
        {
          "material": "copper-plate",
          "amount": 125
        }
      ],
      "inputs": [
        {
          "material": "nuclear-reactor",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "centrifuge-recycling",
      "name": "Centrifuge recycling",
      "outputs": [
        {
          "material": "concrete",
          "amount": 25
        },
        {
          "material": "steel-plate",
          "amount": 12
        },
        {
          "material": "advanced-circuit",
          "amount": 25
        },
        {
          "material": "iron-gear-wheel",
          "amount": 25
        }
      ],
      "inputs": [
        {
          "material": "centrifuge",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "nuclear-fuel-recycling",
      "name": "Nuclear fuel recycling",
      "outputs": [
        {
          "material": "uranium-235",
          "amount": 0
        },
        {
          "material": "rocket-fuel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "nuclear-fuel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "heat-exchanger-recycling",
      "name": "Heat exchanger recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "copper-plate",
          "amount": 25
        },
        {
          "material": "pipe",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "heat-exchanger",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "heat-pipe-recycling",
      "name": "Heat pipe recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "copper-plate",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "heat-pipe",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "steam-turbine-recycling",
      "name": "Steam turbine recycling",
      "outputs": [
        {
          "material": "iron-gear-wheel",
          "amount": 12
        },
        {
          "material": "copper-plate",
          "amount": 12
        },
        {
          "material": "pipe",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "steam-turbine",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rail-support-recycling",
      "name": "Rail support recycling",
      "outputs": [
        {
          "material": "refined-concrete",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "rail-support",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rail-ramp-recycling",
      "name": "Rail ramp recycling",
      "outputs": [
        {
          "material": "refined-concrete",
          "amount": 25
        },
        {
          "material": "rail",
          "amount": 2
        },
        {
          "material": "steel-plate",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "rail-ramp",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "recycler-recycling",
      "name": "Recycler recycling",
      "outputs": [
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 10
        },
        {
          "material": "concrete",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "recycler",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "quality-module-recycling",
      "name": "Quality module recycling",
      "outputs": [
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "quality-module",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "quality-module-2-recycling",
      "name": "Quality module 2 recycling",
      "outputs": [
        {
          "material": "quality-module",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "quality-module-2",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "quality-module-3-recycling",
      "name": "Quality module 3 recycling",
      "outputs": [
        {
          "material": "quality-module-2",
          "amount": 1
        },
        {
          "material": "advanced-circuit",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "superconductor",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "quality-module-3",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "artificial-yumako-soil-recycling",
      "name": "Artificial yumako soil recycling",
      "outputs": [
        {
          "material": "yumako-seed",
          "amount": 0
        },
        {
          "material": "nutrients",
          "amount": 1
        },
        {
          "material": "landfill",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "artificial-yumako-soil",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "overgrowth-yumako-soil-recycling",
      "name": "Overgrowth yumako soil recycling",
      "outputs": [
        {
          "material": "artificial-yumako-soil",
          "amount": 0
        },
        {
          "material": "yumako-seed",
          "amount": 1
        },
        {
          "material": "biter-egg",
          "amount": 2
        },
        {
          "material": "spoilage",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "overgrowth-yumako-soil",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "artificial-jellynut-soil-recycling",
      "name": "Artificial jellynut soil recycling",
      "outputs": [
        {
          "material": "jellynut-seed",
          "amount": 0
        },
        {
          "material": "nutrients",
          "amount": 1
        },
        {
          "material": "landfill",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "artificial-jellynut-soil",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "overgrowth-jellynut-soil-recycling",
      "name": "Overgrowth jellynut soil recycling",
      "outputs": [
        {
          "material": "artificial-jellynut-soil",
          "amount": 0
        },
        {
          "material": "jellynut-seed",
          "amount": 1
        },
        {
          "material": "biter-egg",
          "amount": 2
        },
        {
          "material": "spoilage",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "overgrowth-jellynut-soil",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "nutrients-recycling",
      "name": "Nutrients recycling",
      "outputs": [
        {
          "material": "spoilage",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "nutrients",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "toolbelt-equipment-recycling",
      "name": "Toolbelt equipment recycling",
      "outputs": [
        {
          "material": "advanced-circuit",
          "amount": 0
        },
        {
          "material": "carbon-fiber",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "toolbelt-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "battery-mk3-equipment-recycling",
      "name": "Personal battery MK3 recycling",
      "outputs": [
        {
          "material": "battery-mk2-equipment",
          "amount": 1
        },
        {
          "material": "supercapacitor",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "battery-mk3-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "space-platform-foundation-recycling",
      "name": "Space platform foundation recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "copper-cable",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "space-platform-foundation",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "stack-inserter-recycling",
      "name": "Stack inserter recycling",
      "outputs": [
        {
          "material": "bulk-inserter",
          "amount": 0
        },
        {
          "material": "processing-unit",
          "amount": 0
        },
        {
          "material": "carbon-fiber",
          "amount": 0
        },
        {
          "material": "jelly",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "stack-inserter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "rocket-turret-recycling",
      "name": "Rocket turret recycling",
      "outputs": [
        {
          "material": "rocket-launcher",
          "amount": 1
        },
        {
          "material": "processing-unit",
          "amount": 1
        },
        {
          "material": "carbon-fiber",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "iron-gear-wheel",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "rocket-turret",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "infinity-chest-recycling",
      "name": "Infinity chest recycling",
      "outputs": [
        {
          "material": "steel-chest",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "infinity-chest",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "infinity-pipe-recycling",
      "name": "Infinity pipe recycling",
      "outputs": [
        {
          "material": "pipe",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "infinity-pipe",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "heat-interface-recycling",
      "name": "Heat interface recycling",
      "outputs": [
        {
          "material": "heat-pipe",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "heat-interface",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "space-platform-starter-pack-recycling",
      "name": "Space platform starter pack recycling",
      "outputs": [
        {
          "material": "space-platform-foundation",
          "amount": 15
        },
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "space-platform-starter-pack",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "cargo-bay-recycling",
      "name": "Cargo bay recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 5
        },
        {
          "material": "low-density-structure",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "cargo-bay",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "landing-pad-unloading-bay-recycling",
      "name": "Landing pad unloading bay recycling",
      "outputs": [
        {
          "material": "cargo-bay",
          "amount": 0
        },
        {
          "material": "steel-chest",
          "amount": 1
        },
        {
          "material": "electric-engine-unit",
          "amount": 3
        },
        {
          "material": "processing-unit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "landing-pad-unloading-bay",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "asteroid-collector-recycling",
      "name": "Asteroid collector recycling",
      "outputs": [
        {
          "material": "low-density-structure",
          "amount": 5
        },
        {
          "material": "electric-engine-unit",
          "amount": 2
        },
        {
          "material": "processing-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "asteroid-collector",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "crusher-recycling",
      "name": "Crusher recycling",
      "outputs": [
        {
          "material": "low-density-structure",
          "amount": 5
        },
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "electric-engine-unit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "crusher",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "thruster-recycling",
      "name": "Thruster recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "processing-unit",
          "amount": 2
        },
        {
          "material": "electric-engine-unit",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "thruster",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "foundry-recycling",
      "name": "Foundry recycling",
      "outputs": [
        {
          "material": "tungsten-carbide",
          "amount": 12
        },
        {
          "material": "steel-plate",
          "amount": 12
        },
        {
          "material": "electronic-circuit",
          "amount": 7
        },
        {
          "material": "refined-concrete",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "foundry",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "turbo-transport-belt-recycling",
      "name": "Turbo transport belt recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 1
        },
        {
          "material": "express-transport-belt",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "turbo-transport-belt",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "turbo-underground-belt-recycling",
      "name": "Turbo underground belt recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 5
        },
        {
          "material": "express-underground-belt",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "turbo-underground-belt",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "turbo-splitter-recycling",
      "name": "Turbo splitter recycling",
      "outputs": [
        {
          "material": "express-splitter",
          "amount": 0
        },
        {
          "material": "tungsten-plate",
          "amount": 3
        },
        {
          "material": "processing-unit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "turbo-splitter",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "turbo-loader-recycling",
      "name": "Turbo loader recycling",
      "outputs": [
        {
          "material": "turbo-transport-belt",
          "amount": 1
        },
        {
          "material": "express-loader",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "turbo-loader",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "big-mining-drill-recycling",
      "name": "Big mining drill recycling",
      "outputs": [
        {
          "material": "electric-mining-drill",
          "amount": 0
        },
        {
          "material": "tungsten-carbide",
          "amount": 5
        },
        {
          "material": "electric-engine-unit",
          "amount": 2
        },
        {
          "material": "advanced-circuit",
          "amount": 2
        }
      ],
      "inputs": [
        {
          "material": "big-mining-drill",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "mech-armor-recycling",
      "name": "Mech armor recycling",
      "outputs": [
        {
          "material": "power-armor-mk2",
          "amount": 0
        },
        {
          "material": "holmium-plate",
          "amount": 50
        },
        {
          "material": "processing-unit",
          "amount": 25
        },
        {
          "material": "superconductor",
          "amount": 12
        },
        {
          "material": "supercapacitor",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "mech-armor",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "railgun-recycling",
      "name": "Railgun recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 2
        },
        {
          "material": "superconductor",
          "amount": 2
        },
        {
          "material": "quantum-processor",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "railgun",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "railgun-turret-recycling",
      "name": "Railgun turret recycling",
      "outputs": [
        {
          "material": "quantum-processor",
          "amount": 25
        },
        {
          "material": "tungsten-plate",
          "amount": 7
        },
        {
          "material": "superconductor",
          "amount": 12
        },
        {
          "material": "carbon-fiber",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "railgun-turret",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "railgun-ammo-recycling",
      "name": "Railgun ammo recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        },
        {
          "material": "copper-cable",
          "amount": 2
        },
        {
          "material": "explosives",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "railgun-ammo",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "agricultural-tower-recycling",
      "name": "Agricultural tower recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "electronic-circuit",
          "amount": 0
        },
        {
          "material": "spoilage",
          "amount": 5
        },
        {
          "material": "landfill",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "agricultural-tower",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "biochamber-recycling",
      "name": "Biochamber recycling",
      "outputs": [
        {
          "material": "nutrients",
          "amount": 1
        },
        {
          "material": "pentapod-egg",
          "amount": 0
        },
        {
          "material": "iron-plate",
          "amount": 5
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "landfill",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "biochamber",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "capture-robot-rocket-recycling",
      "name": "Capture bot rocket recycling",
      "outputs": [
        {
          "material": "flying-robot-frame",
          "amount": 0
        },
        {
          "material": "steel-plate",
          "amount": 0
        },
        {
          "material": "bioflux",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "capture-robot-rocket",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "lightning-rod-recycling",
      "name": "Lightning rod recycling",
      "outputs": [
        {
          "material": "copper-cable",
          "amount": 3
        },
        {
          "material": "steel-plate",
          "amount": 2
        },
        {
          "material": "stone-brick",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lightning-rod",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "electromagnetic-plant-recycling",
      "name": "Electromagnetic plant recycling",
      "outputs": [
        {
          "material": "holmium-plate",
          "amount": 37
        },
        {
          "material": "steel-plate",
          "amount": 12
        },
        {
          "material": "processing-unit",
          "amount": 12
        },
        {
          "material": "refined-concrete",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "electromagnetic-plant",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "supercapacitor-recycling",
      "name": "Supercapacitor recycling",
      "outputs": [
        {
          "material": "holmium-plate",
          "amount": 0
        },
        {
          "material": "superconductor",
          "amount": 0
        },
        {
          "material": "electronic-circuit",
          "amount": 1
        },
        {
          "material": "battery",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "supercapacitor",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "lightning-collector-recycling",
      "name": "Lightning collector recycling",
      "outputs": [
        {
          "material": "lightning-rod",
          "amount": 0
        },
        {
          "material": "supercapacitor",
          "amount": 2
        },
        {
          "material": "accumulator",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "lightning-collector",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "teslagun-recycling",
      "name": "Tesla gun recycling",
      "outputs": [
        {
          "material": "holmium-plate",
          "amount": 2
        },
        {
          "material": "superconductor",
          "amount": 2
        },
        {
          "material": "plastic-bar",
          "amount": 7
        }
      ],
      "inputs": [
        {
          "material": "teslagun",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "tesla-turret-recycling",
      "name": "Tesla turret recycling",
      "outputs": [
        {
          "material": "teslagun",
          "amount": 0
        },
        {
          "material": "supercapacitor",
          "amount": 2
        },
        {
          "material": "processing-unit",
          "amount": 2
        },
        {
          "material": "superconductor",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "tesla-turret",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "tesla-ammo-recycling",
      "name": "Tesla ammo recycling",
      "outputs": [
        {
          "material": "supercapacitor",
          "amount": 0
        },
        {
          "material": "plastic-bar",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "tesla-ammo",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "heating-tower-recycling",
      "name": "Heating tower recycling",
      "outputs": [
        {
          "material": "boiler",
          "amount": 0
        },
        {
          "material": "heat-pipe",
          "amount": 1
        },
        {
          "material": "concrete",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "heating-tower",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "cryogenic-plant-recycling",
      "name": "Cryogenic plant recycling",
      "outputs": [
        {
          "material": "refined-concrete",
          "amount": 10
        },
        {
          "material": "superconductor",
          "amount": 5
        },
        {
          "material": "processing-unit",
          "amount": 5
        },
        {
          "material": "lithium-plate",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "cryogenic-plant",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "quantum-processor-recycling",
      "name": "Quantum processor recycling",
      "outputs": [
        {
          "material": "tungsten-carbide",
          "amount": 0
        },
        {
          "material": "processing-unit",
          "amount": 0
        },
        {
          "material": "superconductor",
          "amount": 0
        },
        {
          "material": "carbon-fiber",
          "amount": 0
        },
        {
          "material": "lithium-plate",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "quantum-processor",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "fusion-reactor-equipment-recycling",
      "name": "Portable fusion reactor recycling",
      "outputs": [
        {
          "material": "fission-reactor-equipment",
          "amount": 0
        },
        {
          "material": "fusion-power-cell",
          "amount": 2
        },
        {
          "material": "tungsten-plate",
          "amount": 62
        },
        {
          "material": "carbon-fiber",
          "amount": 25
        },
        {
          "material": "supercapacitor",
          "amount": 6
        },
        {
          "material": "quantum-processor",
          "amount": 62
        }
      ],
      "inputs": [
        {
          "material": "fusion-reactor-equipment",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fusion-reactor-recycling",
      "name": "Fusion reactor recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 50
        },
        {
          "material": "superconductor",
          "amount": 50
        },
        {
          "material": "quantum-processor",
          "amount": 62
        }
      ],
      "inputs": [
        {
          "material": "fusion-reactor",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "fusion-generator-recycling",
      "name": "Fusion generator recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 25
        },
        {
          "material": "superconductor",
          "amount": 25
        },
        {
          "material": "quantum-processor",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "fusion-generator",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "ice-platform-recycling",
      "name": "Ice platform recycling",
      "outputs": [
        {
          "material": "ice",
          "amount": 12
        }
      ],
      "inputs": [
        {
          "material": "ice-platform",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "foundation-recycling",
      "name": "Foundation recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 1
        },
        {
          "material": "lithium-plate",
          "amount": 1
        },
        {
          "material": "carbon-fiber",
          "amount": 1
        },
        {
          "material": "stone",
          "amount": 5
        }
      ],
      "inputs": [
        {
          "material": "foundation",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "water-barrel-recycling",
      "name": "Water barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "water-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "sulfuric-acid-barrel-recycling",
      "name": "Sulfuric acid barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "sulfuric-acid-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "crude-oil-barrel-recycling",
      "name": "Crude oil barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "crude-oil-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "heavy-oil-barrel-recycling",
      "name": "Heavy oil barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "heavy-oil-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "light-oil-barrel-recycling",
      "name": "Light oil barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "light-oil-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "petroleum-gas-barrel-recycling",
      "name": "Petroleum gas barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "petroleum-gas-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "lubricant-barrel-recycling",
      "name": "Lubricant barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "lubricant-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fluoroketone-cold-barrel-recycling",
      "name": "Fluoroketone (Cold) barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "fluoroketone-cold-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "fluoroketone-hot-barrel-recycling",
      "name": "Fluoroketone (Hot) barrel recycling",
      "outputs": [
        {
          "material": "barrel",
          "amount": 0
        }
      ],
      "inputs": [
        {
          "material": "fluoroketone-hot-barrel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "flamethrower-ammo-recycling",
      "name": "Flamethrower ammo recycling",
      "outputs": [
        {
          "material": "flamethrower-ammo",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "flamethrower-ammo",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "blueprint-recycling",
      "name": "Blueprint recycling",
      "outputs": [
        {
          "material": "blueprint",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "blueprint",
          "amount": 1
        }
      ]
    },
    {
      "id": "blueprint-book-recycling",
      "name": "Blueprint book recycling",
      "outputs": [
        {
          "material": "blueprint-book",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "blueprint-book",
          "amount": 1
        }
      ]
    },
    {
      "id": "raw-fish-recycling",
      "name": "Raw fish recycling",
      "outputs": [
        {
          "material": "raw-fish",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "raw-fish",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "yumako-recycling",
      "name": "Yumako recycling",
      "outputs": [
        {
          "material": "yumako",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "yumako",
          "amount": 1
        }
      ]
    },
    {
      "id": "jellynut-recycling",
      "name": "Jellynut recycling",
      "outputs": [
        {
          "material": "jellynut",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "jellynut",
          "amount": 1
        }
      ]
    },
    {
      "id": "yumako-mash-recycling",
      "name": "Yumako mash recycling",
      "outputs": [
        {
          "material": "yumako-mash",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "yumako-mash",
          "amount": 1
        }
      ]
    },
    {
      "id": "jelly-recycling",
      "name": "Jelly recycling",
      "outputs": [
        {
          "material": "jelly",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "jelly",
          "amount": 1
        }
      ]
    },
    {
      "id": "bioflux-recycling",
      "name": "Bioflux recycling",
      "outputs": [
        {
          "material": "bioflux",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "bioflux",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "deconstruction-planner-recycling",
      "name": "Deconstruction planner recycling",
      "outputs": [
        {
          "material": "deconstruction-planner",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "deconstruction-planner",
          "amount": 1
        }
      ]
    },
    {
      "id": "pistol-recycling",
      "name": "Pistol recycling",
      "outputs": [
        {
          "material": "pistol",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "pistol",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "stone-brick-recycling",
      "name": "Stone brick recycling",
      "outputs": [
        {
          "material": "stone-brick",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone-brick",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "wood-recycling",
      "name": "Wood recycling",
      "outputs": [
        {
          "material": "wood",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "wood",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "coal-recycling",
      "name": "Coal recycling",
      "outputs": [
        {
          "material": "coal",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "coal",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "stone-recycling",
      "name": "Stone recycling",
      "outputs": [
        {
          "material": "stone",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "stone",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "iron-ore-recycling",
      "name": "Iron ore recycling",
      "outputs": [
        {
          "material": "iron-ore",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-ore",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "copper-ore-recycling",
      "name": "Copper ore recycling",
      "outputs": [
        {
          "material": "copper-ore",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-ore",
          "amount": 1
        }
      ]
    },
    {
      "id": "iron-plate-recycling",
      "name": "Iron plate recycling",
      "outputs": [
        {
          "material": "iron-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-plate",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "copper-plate-recycling",
      "name": "Copper plate recycling",
      "outputs": [
        {
          "material": "copper-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-plate",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "automation-science-pack-recycling",
      "name": "Automation science pack recycling",
      "outputs": [
        {
          "material": "automation-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "automation-science-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "logistic-science-pack-recycling",
      "name": "Logistic science pack recycling",
      "outputs": [
        {
          "material": "logistic-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "logistic-science-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "steel-plate-recycling",
      "name": "Steel plate recycling",
      "outputs": [
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "steel-plate",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "solid-fuel-recycling",
      "name": "Solid fuel recycling",
      "outputs": [
        {
          "material": "solid-fuel",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "solid-fuel",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "landfill-recycling",
      "name": "Landfill recycling",
      "outputs": [
        {
          "material": "landfill",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "landfill",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "uranium-ore-recycling",
      "name": "Uranium ore recycling",
      "outputs": [
        {
          "material": "uranium-ore",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "uranium-ore",
          "amount": 1
        }
      ]
    },
    {
      "id": "chemical-science-pack-recycling",
      "name": "Chemical science pack recycling",
      "outputs": [
        {
          "material": "chemical-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "chemical-science-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "military-science-pack-recycling",
      "name": "Military science pack recycling",
      "outputs": [
        {
          "material": "military-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "military-science-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "production-science-pack-recycling",
      "name": "Production science pack recycling",
      "outputs": [
        {
          "material": "production-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "production-science-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "utility-science-pack-recycling",
      "name": "Utility science pack recycling",
      "outputs": [
        {
          "material": "utility-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "utility-science-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "space-science-pack-recycling",
      "name": "Space science pack recycling",
      "outputs": [
        {
          "material": "space-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "space-science-pack",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "lane-splitter-recycling",
      "name": "Lane splitter recycling",
      "outputs": [
        {
          "material": "lane-splitter",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lane-splitter",
          "amount": 1
        }
      ]
    },
    {
      "id": "coin-recycling",
      "name": "Coin recycling",
      "outputs": [
        {
          "material": "coin",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "coin",
          "amount": 1
        }
      ]
    },
    {
      "id": "sulfur-recycling",
      "name": "Sulfur recycling",
      "outputs": [
        {
          "material": "sulfur",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "sulfur",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "plastic-bar-recycling",
      "name": "Plastic bar recycling",
      "outputs": [
        {
          "material": "plastic-bar",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "plastic-bar",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "explosives-recycling",
      "name": "Explosives recycling",
      "outputs": [
        {
          "material": "explosives",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "explosives",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "electric-energy-interface-recycling",
      "name": "Electric energy interface recycling",
      "outputs": [
        {
          "material": "electric-energy-interface",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electric-energy-interface",
          "amount": 1
        }
      ]
    },
    {
      "id": "uranium-235-recycling",
      "name": "Uranium-235 recycling",
      "outputs": [
        {
          "material": "uranium-235",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "uranium-235",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "uranium-238-recycling",
      "name": "Uranium-238 recycling",
      "outputs": [
        {
          "material": "uranium-238",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "uranium-238",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "uranium-fuel-cell-recycling",
      "name": "Uranium fuel cell recycling",
      "outputs": [
        {
          "material": "uranium-fuel-cell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "uranium-fuel-cell",
          "amount": 1
        }
      ],
      "alternate": true
    },
    {
      "id": "depleted-uranium-fuel-cell-recycling",
      "name": "Depleted uranium fuel cell recycling",
      "outputs": [
        {
          "material": "depleted-uranium-fuel-cell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "depleted-uranium-fuel-cell",
          "amount": 1
        }
      ]
    },
    {
      "id": "simple-entity-with-force-recycling",
      "name": "Simple entity with force recycling",
      "outputs": [
        {
          "material": "simple-entity-with-force",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "simple-entity-with-force",
          "amount": 1
        }
      ]
    },
    {
      "id": "simple-entity-with-owner-recycling",
      "name": "Simple entity with owner recycling",
      "outputs": [
        {
          "material": "simple-entity-with-owner",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "simple-entity-with-owner",
          "amount": 1
        }
      ]
    },
    {
      "id": "infinity-cargo-wagon-recycling",
      "name": "Infinity cargo wagon recycling",
      "outputs": [
        {
          "material": "infinity-cargo-wagon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "infinity-cargo-wagon",
          "amount": 1
        }
      ]
    },
    {
      "id": "burner-generator-recycling",
      "name": "Burner generator recycling",
      "outputs": [
        {
          "material": "burner-generator",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "burner-generator",
          "amount": 1
        }
      ]
    },
    {
      "id": "linked-chest-recycling",
      "name": "Linked chest recycling",
      "outputs": [
        {
          "material": "linked-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "linked-chest",
          "amount": 1
        }
      ]
    },
    {
      "id": "proxy-container-recycling",
      "name": "Proxy container recycling",
      "outputs": [
        {
          "material": "proxy-container",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "proxy-container",
          "amount": 1
        }
      ]
    },
    {
      "id": "bottomless-chest-recycling",
      "name": "Bottomless chest recycling",
      "outputs": [
        {
          "material": "bottomless-chest",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "bottomless-chest",
          "amount": 1
        }
      ]
    },
    {
      "id": "linked-belt-recycling",
      "name": "Linked belt recycling",
      "outputs": [
        {
          "material": "linked-belt",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "linked-belt",
          "amount": 1
        }
      ]
    },
    {
      "id": "one-way-valve-recycling",
      "name": "One-way valve recycling",
      "outputs": [
        {
          "material": "one-way-valve",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "one-way-valve",
          "amount": 1
        }
      ]
    },
    {
      "id": "overflow-valve-recycling",
      "name": "Overflow valve recycling",
      "outputs": [
        {
          "material": "overflow-valve",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "overflow-valve",
          "amount": 1
        }
      ]
    },
    {
      "id": "top-up-valve-recycling",
      "name": "Top-up valve recycling",
      "outputs": [
        {
          "material": "top-up-valve",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "top-up-valve",
          "amount": 1
        }
      ]
    },
    {
      "id": "electric-energy-interface-equipment-recycling",
      "name": "Electric energy interface equipment recycling",
      "outputs": [
        {
          "material": "electric-energy-interface-equipment",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electric-energy-interface-equipment",
          "amount": 1
        }
      ]
    },
    {
      "id": "science-recycling",
      "name": "Science recycling",
      "outputs": [
        {
          "material": "science",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "science",
          "amount": 1
        }
      ]
    },
    {
      "id": "metallurgic-science-pack-recycling",
      "name": "Metallurgic science pack recycling",
      "outputs": [
        {
          "material": "metallurgic-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "metallurgic-science-pack",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "agricultural-science-pack-recycling",
      "name": "Agricultural science pack recycling",
      "outputs": [
        {
          "material": "agricultural-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "agricultural-science-pack",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "electromagnetic-science-pack-recycling",
      "name": "Electromagnetic science pack recycling",
      "outputs": [
        {
          "material": "electromagnetic-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "electromagnetic-science-pack",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "cryogenic-science-pack-recycling",
      "name": "Cryogenic science pack recycling",
      "outputs": [
        {
          "material": "cryogenic-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "cryogenic-science-pack",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "promethium-science-pack-recycling",
      "name": "Promethium science pack recycling",
      "outputs": [
        {
          "material": "promethium-science-pack",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "promethium-science-pack",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "metallic-asteroid-chunk-recycling",
      "name": "Metallic asteroid chunk recycling",
      "outputs": [
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "metallic-asteroid-chunk",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "carbonic-asteroid-chunk-recycling",
      "name": "Carbonic asteroid chunk recycling",
      "outputs": [
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "carbonic-asteroid-chunk",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "oxide-asteroid-chunk-recycling",
      "name": "Oxide asteroid chunk recycling",
      "outputs": [
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "oxide-asteroid-chunk",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "promethium-asteroid-chunk-recycling",
      "name": "Promethium asteroid chunk recycling",
      "outputs": [
        {
          "material": "promethium-asteroid-chunk",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "promethium-asteroid-chunk",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "ice-recycling",
      "name": "Ice recycling",
      "outputs": [
        {
          "material": "ice",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "ice",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "carbon-recycling",
      "name": "Carbon recycling",
      "outputs": [
        {
          "material": "carbon",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "carbon",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "calcite-recycling",
      "name": "Calcite recycling",
      "outputs": [
        {
          "material": "calcite",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "calcite",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "tungsten-ore-recycling",
      "name": "Tungsten ore recycling",
      "outputs": [
        {
          "material": "tungsten-ore",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-ore",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "tungsten-plate-recycling",
      "name": "Tungsten plate recycling",
      "outputs": [
        {
          "material": "tungsten-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-plate",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "tungsten-carbide-recycling",
      "name": "Tungsten carbide recycling",
      "outputs": [
        {
          "material": "tungsten-carbide",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tungsten-carbide",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "copper-bacteria-recycling",
      "name": "Copper bacteria recycling",
      "outputs": [
        {
          "material": "copper-bacteria",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "copper-bacteria",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "iron-bacteria-recycling",
      "name": "Iron bacteria recycling",
      "outputs": [
        {
          "material": "iron-bacteria",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "iron-bacteria",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "yumako-seed-recycling",
      "name": "Yumako seed recycling",
      "outputs": [
        {
          "material": "yumako-seed",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "yumako-seed",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "jellynut-seed-recycling",
      "name": "Jellynut seed recycling",
      "outputs": [
        {
          "material": "jellynut-seed",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "jellynut-seed",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "biolab-recycling",
      "name": "Biolab recycling",
      "outputs": [
        {
          "material": "biolab",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "biolab",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "captive-biter-spawner-recycling",
      "name": "Captive biter spawner recycling",
      "outputs": [
        {
          "material": "captive-biter-spawner",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "captive-biter-spawner",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "biter-egg-recycling",
      "name": "Biter egg recycling",
      "outputs": [
        {
          "material": "biter-egg",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "biter-egg",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "pentapod-egg-recycling",
      "name": "Pentapod egg recycling",
      "outputs": [
        {
          "material": "pentapod-egg",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "pentapod-egg",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "carbon-fiber-recycling",
      "name": "Carbon fiber recycling",
      "outputs": [
        {
          "material": "carbon-fiber",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "carbon-fiber",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "holmium-ore-recycling",
      "name": "Holmium ore recycling",
      "outputs": [
        {
          "material": "holmium-ore",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "holmium-ore",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "holmium-plate-recycling",
      "name": "Holmium plate recycling",
      "outputs": [
        {
          "material": "holmium-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "holmium-plate",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "lithium-recycling",
      "name": "Lithium recycling",
      "outputs": [
        {
          "material": "lithium",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lithium",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "lithium-plate-recycling",
      "name": "Lithium plate recycling",
      "outputs": [
        {
          "material": "lithium-plate",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "lithium-plate",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "superconductor-recycling",
      "name": "Superconductor recycling",
      "outputs": [
        {
          "material": "superconductor",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "superconductor",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "fusion-power-cell-recycling",
      "name": "Fusion power cell recycling",
      "outputs": [
        {
          "material": "fusion-power-cell",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "fusion-power-cell",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "spoilage-recycling",
      "name": "Spoilage recycling",
      "outputs": [
        {
          "material": "spoilage",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "spoilage",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "space-platform-hub-recycling",
      "name": "Space platform hub recycling",
      "outputs": [
        {
          "material": "space-platform-hub",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "space-platform-hub",
          "amount": 1
        }
      ],
      "spaceAge": true
    },
    {
      "id": "tree-seed-recycling",
      "name": "Tree seed recycling",
      "outputs": [
        {
          "material": "tree-seed",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "tree-seed",
          "amount": 1
        }
      ],
      "alternate": true,
      "spaceAge": true
    },
    {
      "id": "selection-tool-recycling",
      "name": "Selection tool recycling",
      "outputs": [
        {
          "material": "selection-tool",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "selection-tool",
          "amount": 1
        }
      ]
    },
    {
      "id": "upgrade-planner-recycling",
      "name": "Upgrade planner recycling",
      "outputs": [
        {
          "material": "upgrade-planner",
          "amount": 1
        }
      ],
      "inputs": [
        {
          "material": "upgrade-planner",
          "amount": 1
        }
      ]
    }
  ];
  var materialById = new Map(materials.map((material) => [material.id, material]));
  function recipesForMaterial(materialId) {
    return recipes.filter((candidate) => candidate.outputs.some((output) => output.material === materialId));
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f3 = 0;
  function u3(e3, t3, n2, o3, i3, u4) {
    t3 || (t3 = {});
    var a3, c3, p3 = t3;
    if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
    var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i3, __self: u4 };
    if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
    return l.vnode && l.vnode(l3), l3;
  }

  // src/app.tsx
  var VERSION = "1.3.3";
  var COMMIT_HASH = "dev";
  var STORAGE_KEY = "factorio-bus-planner";
  var MAX_HISTORY = 60;
  var emptyPlan = { lanes: [], stations: [] };
  function newId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }
  function loadPlan() {
    const encoded = new URLSearchParams(window.location.hash.slice(1)).get("plan");
    const stored = encoded ? decodePlan(encoded) : localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyPlan;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed.lanes) && Array.isArray(parsed.stations)) return parsed;
    } catch (error) {
      console.error("Could not load saved bus plan:", error);
    }
    return emptyPlan;
  }
  function decodePlan(encoded) {
    try {
      const binary = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
      return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
    } catch (error) {
      console.error("Could not decode shared bus plan:", error);
      return null;
    }
  }
  function encodePlan(plan) {
    const bytes = new TextEncoder().encode(JSON.stringify(plan));
    const binary = String.fromCharCode(...bytes);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function materialName(id) {
    return materialById.get(id)?.name ?? id;
  }
  function standardRecipe(materialId) {
    const recipes2 = recipesForMaterial(materialId);
    return recipes2.find((recipe) => !recipe.alternate) ?? recipes2[0];
  }
  function pullsLaneFromBus(station, laneId) {
    return station.busInputs?.includes(laneId) ?? false;
  }
  function laneTapSpan(plan, lane) {
    let first = null;
    let last = null;
    const origin = laneOrigin(plan, lane.material);
    const originOnlyCounterflows = laneOnlyCounterflowsFromOrigin(plan, lane, origin);
    plan.stations.forEach((station, index) => {
      const endpointPositions = [];
      if (station.material === lane.material) {
        endpointPositions.push(index + (originOnlyCounterflows && index === origin ? 0.25 : -0.25));
      }
      if (pullsLaneFromBus(station, lane.id)) {
        endpointPositions.push(index + (origin !== null && index > origin ? -0.25 : 0.25));
      }
      for (const endpoint of endpointPositions) {
        first = first === null ? endpoint : Math.min(first, endpoint);
        last = last === null ? endpoint : Math.max(last, endpoint);
      }
    });
    if (first === null || last === null) return null;
    return { first, last: origin === null ? plan.stations.length + 0.5 : last };
  }
  function spansOverlap(first, second) {
    if (!first || !second) return false;
    return first.first <= second.last && second.first <= first.last;
  }
  function soleLaneSide(plan, lane) {
    let side = null;
    for (const station of plan.stations) {
      if (station.material !== lane.material && !pullsLaneFromBus(station, lane.id)) continue;
      if (side && side !== station.side) return null;
      side = station.side;
    }
    return side;
  }
  function collapseLaneGroups(plan) {
    const columns = plan.lanes.map((lane) => [lane]);
    let moved = true;
    while (moved) {
      moved = false;
      const candidates = columns.flatMap((column, columnIndex) => column.map((lane) => ({ lane, columnIndex, side: soleLaneSide(plan, lane) }))).filter((candidate) => candidate.side !== null).sort((first, second) => first.side === second.side ? first.side === "left" ? first.columnIndex - second.columnIndex : second.columnIndex - first.columnIndex : first.side === "left" ? -1 : 1);
      for (const { lane, columnIndex, side } of candidates) {
        const sourceColumn = columns[columnIndex];
        if (!sourceColumn?.includes(lane)) continue;
        const targetIndexes = side === "left" ? Array.from({ length: columnIndex }, (_3, index) => index) : Array.from({ length: columns.length - columnIndex - 1 }, (_3, index) => columns.length - index - 1);
        const targetIndex = targetIndexes.find((index) => columns[index]?.every((targetLane) => !spansOverlap(laneTapSpan(plan, lane), laneTapSpan(plan, targetLane))));
        if (targetIndex === void 0) continue;
        const targetColumn = columns[targetIndex];
        sourceColumn.splice(sourceColumn.indexOf(lane), 1);
        targetColumn.push(lane);
        if (sourceColumn.length === 0) columns.splice(columnIndex, 1);
        moved = true;
        break;
      }
    }
    return columns;
  }
  function MaterialIcon({ material, size = "medium" }) {
    if (!material) return /* @__PURE__ */ u3("span", { class: `material-icon missing ${size}`, children: "?" });
    return /* @__PURE__ */ u3("img", { class: `material-icon ${size}`, src: material.icon, alt: "", draggable: false });
  }
  function Footer() {
    return /* @__PURE__ */ u3(S, { children: [
      /* @__PURE__ */ u3("footer", { class: "app-footer", children: [
        /* @__PURE__ */ u3("span", { children: [
          "A vibe-coded micro-app via ",
          /* @__PURE__ */ u3("a", { href: "https://searyanc.dev", target: "_blank", rel: "noopener noreferrer", children: "SeaRyanC" })
        ] }),
        /* @__PURE__ */ u3("a", { class: "github-link", href: "https://github.com/SeaRyanC/app/tree/main/bus", target: "_blank", rel: "noopener noreferrer", title: "View source on GitHub", "aria-label": "View source on GitHub", children: "\u2318" }),
        /* @__PURE__ */ u3("span", { class: "version", children: [
          "v",
          VERSION,
          "+",
          COMMIT_HASH
        ] })
      ] }),
      /* @__PURE__ */ u3("span", { class: "build-stamp", children: [
        "BUILD v",
        VERSION,
        "+",
        COMMIT_HASH
      ] })
    ] });
  }
  function ItemCard({ material, onDragStart, disabled }) {
    return /* @__PURE__ */ u3(
      "button",
      {
        class: "item-card",
        draggable: !disabled,
        disabled,
        onDragStart: (event) => {
          if (disabled) return;
          const payload = { kind: "material", id: material.id };
          onDragStart(payload);
          event.dataTransfer?.setData("application/x-factorio-bus", JSON.stringify(payload));
          event.dataTransfer?.setData("text/plain", material.id);
          if (event.dataTransfer) event.dataTransfer.effectAllowed = "copy";
        },
        title: `Drag ${material.name} into the bus`,
        children: [
          /* @__PURE__ */ u3(MaterialIcon, { material }),
          /* @__PURE__ */ u3("span", { children: material.name }),
          material.spaceAge && /* @__PURE__ */ u3("em", { children: "SA" })
        ]
      }
    );
  }
  var App = () => {
    const [plan, setPlan] = d2(loadPlan);
    const [history, setHistory] = d2([]);
    const [future, setFuture] = d2([]);
    const [search, setSearch] = d2("");
    const [selectedStationId, setSelectedStationId] = d2(null);
    const [highlightedStationId, setHighlightedStationId] = d2(null);
    const [collapseView, setCollapseView] = d2(false);
    const [notice, setNotice] = d2("");
    const stageRef = A2(null);
    const stationPortRefs = A2(/* @__PURE__ */ new Map());
    const laneSpineRefs = A2(/* @__PURE__ */ new Map());
    const registerStationPort = q2((stationId, element) => {
      if (element) stationPortRefs.current.set(stationId, element);
      else stationPortRefs.current.delete(stationId);
    }, []);
    const registerLaneSpine = q2((laneId, element) => {
      if (element) laneSpineRefs.current.set(laneId, element);
      else laneSpineRefs.current.delete(laneId);
    }, []);
    const setHoveredStation = q2((stationId) => setHighlightedStationId(stationId), []);
    const filteredMaterials = T2(() => {
      const needle = search.trim().toLowerCase();
      return materials.filter((material) => !needle || material.name.toLowerCase().includes(needle) || material.id.includes(needle));
    }, [search]);
    const laneGroups = T2(() => collapseLaneGroups(plan), [plan]);
    const visibleLaneGroups = collapseView ? laneGroups : plan.lanes.map((lane) => [lane]);
    const inSituLaneIds = T2(
      () => new Set(collapseView ? laneGroups.filter((group) => group.length > 1).flatMap((group) => group.map((lane) => lane.id)) : []),
      [collapseView, laneGroups]
    );
    const selectedStation = plan.stations.find((station) => station.id === selectedStationId);
    const selectedStationRecipe = selectedStation ? standardRecipe(selectedStation.material) : void 0;
    h2(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    }, [plan]);
    const updatePlan = q2((next) => {
      if (collapseView) return;
      setHistory((previous) => [...previous.slice(-(MAX_HISTORY - 1)), plan]);
      setFuture([]);
      setPlan(next);
    }, [collapseView, plan]);
    const addLane = q2((materialId) => {
      updatePlan({ ...plan, lanes: [...plan.lanes, { id: newId("lane"), material: materialId }] });
    }, [plan, updatePlan]);
    const addStation = q2((materialId, side) => {
      const recipe = standardRecipe(materialId);
      const busInputs = recipe ? plan.lanes.filter((lane) => recipe.inputs.some((input) => input.material === lane.material)).map((lane) => lane.id) : [];
      const station = { id: newId("station"), material: materialId, side, ...busInputs.length > 0 ? { busInputs } : {} };
      updatePlan({ ...plan, stations: [...plan.stations, station] });
      setSelectedStationId(station.id);
    }, [plan, updatePlan]);
    const toggleStationSide = q2((stationId) => {
      updatePlan({
        ...plan,
        stations: plan.stations.map((station) => station.id === stationId ? { ...station, side: station.side === "left" ? "right" : "left" } : station)
      });
    }, [plan, updatePlan]);
    const onDragStart = q2((payload) => {
      window.__busPlannerDrag = payload;
    }, []);
    const dropPayload = q2((event) => {
      if (window.__busPlannerDrag) return window.__busPlannerDrag;
      const encoded = event.dataTransfer?.getData("application/x-factorio-bus");
      if (!encoded) return null;
      try {
        return JSON.parse(encoded);
      } catch (error) {
        console.error("Could not read dragged bus payload:", error);
        return null;
      }
    }, []);
    const reorderLane = q2((draggedId, targetId) => {
      if (draggedId === targetId) return;
      const lanes = [...plan.lanes];
      const from = lanes.findIndex((lane2) => lane2.id === draggedId);
      const to = lanes.findIndex((lane2) => lane2.id === targetId);
      if (from < 0 || to < 0) return;
      const [lane] = lanes.splice(from, 1);
      if (lane) lanes.splice(to, 0, lane);
      updatePlan({ ...plan, lanes });
    }, [plan, updatePlan]);
    const reorderStation = q2((draggedId, targetId) => {
      if (draggedId === targetId) return;
      const stations = [...plan.stations];
      const from = stations.findIndex((station2) => station2.id === draggedId);
      const to = stations.findIndex((station2) => station2.id === targetId);
      if (from < 0 || to < 0) return;
      const [station] = stations.splice(from, 1);
      if (station) stations.splice(to, 0, station);
      updatePlan({ ...plan, stations });
    }, [plan, updatePlan]);
    const removeLane = q2((laneId) => {
      updatePlan({
        lanes: plan.lanes.filter((lane) => lane.id !== laneId),
        stations: plan.stations.map((station) => {
          const busInputs = station.busInputs?.filter((inputLaneId) => inputLaneId !== laneId) ?? [];
          if (busInputs.length > 0) return { ...station, busInputs };
          const nextStation = { ...station };
          delete nextStation.busInputs;
          return nextStation;
        })
      });
    }, [plan, updatePlan]);
    const moveStation = q2((stationId, direction) => {
      const stations = [...plan.stations];
      const from = stations.findIndex((station2) => station2.id === stationId);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= stations.length) return;
      const [station] = stations.splice(from, 1);
      if (station) stations.splice(to, 0, station);
      updatePlan({ ...plan, stations });
    }, [plan, updatePlan]);
    const handleDrop = q2((target, event) => {
      event.preventDefault();
      if (collapseView) return;
      const payload = dropPayload(event);
      if (!payload) return;
      if (target === "lane") {
        if (payload.kind === "material") addLane(payload.id);
        else if (payload.kind === "lane") reorderLane(payload.id, payload.id);
      } else if (target === "station-add") {
        if (payload.kind === "material") addStation(payload.id, "left");
      } else if (payload.kind === "lane") {
        reorderLane(payload.id, target);
      } else if (payload.kind === "station") {
        reorderStation(payload.id, target);
      }
      window.__busPlannerDrag = void 0;
    }, [addLane, addStation, collapseView, dropPayload, reorderLane, reorderStation]);
    const setLaneSource = q2((laneId, useBus) => {
      if (!selectedStationId) return;
      updatePlan({
        ...plan,
        stations: plan.stations.map((station) => {
          if (station.id !== selectedStationId) return station;
          const busInputs = new Set(station.busInputs ?? []);
          if (useBus) busInputs.add(laneId);
          else busInputs.delete(laneId);
          if (busInputs.size > 0) return { ...station, busInputs: [...busInputs] };
          const nextStation = { ...station };
          delete nextStation.busInputs;
          return nextStation;
        })
      });
    }, [plan, selectedStationId, updatePlan]);
    const removeSelectedStation = q2(() => {
      if (!selectedStationId) return;
      updatePlan({ ...plan, stations: plan.stations.filter((station) => station.id !== selectedStationId) });
      setSelectedStationId(null);
    }, [plan, selectedStationId, updatePlan]);
    h2(() => {
      const handleKeyDown = (event) => {
        const target = event.target;
        if (!selectedStationId || target?.matches("input, select, textarea")) return;
        if (event.key !== "Delete" && event.key !== "Backspace") return;
        event.preventDefault();
        removeSelectedStation();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [removeSelectedStation, selectedStationId]);
    const undo = q2(() => {
      if (collapseView) return;
      const previous = history.at(-1);
      if (!previous) return;
      setFuture((current) => [...current, plan]);
      setPlan(previous);
      setHistory((current) => current.slice(0, -1));
    }, [collapseView, history, plan]);
    const redo = q2(() => {
      if (collapseView) return;
      const next = future.at(-1);
      if (!next) return;
      setHistory((current) => [...current, plan]);
      setPlan(next);
      setFuture((current) => current.slice(0, -1));
    }, [collapseView, future, plan]);
    const share = q2(async () => {
      const url = `${window.location.origin}${window.location.pathname}#plan=${encodePlan(plan)}`;
      window.history.replaceState(null, "", url);
      try {
        await navigator.clipboard.writeText(url);
        setNotice("Share link copied");
      } catch {
        setNotice("Share link ready in the address bar");
      }
      window.setTimeout(() => setNotice(""), 2200);
    }, [plan]);
    const reset = q2(() => {
      if (plan.lanes.length === 0 && plan.stations.length === 0) return;
      updatePlan(emptyPlan);
      setSelectedStationId(null);
    }, [plan, updatePlan]);
    const toggleCollapseView = q2((enabled) => {
      setCollapseView(enabled);
      if (enabled) setSelectedStationId(null);
    }, []);
    return /* @__PURE__ */ u3("div", { class: "app", children: [
      /* @__PURE__ */ u3("main", { class: "workspace", children: [
        /* @__PURE__ */ u3("aside", { class: "catalog panel", children: [
          /* @__PURE__ */ u3("div", { class: "toolbar", children: [
            /* @__PURE__ */ u3("button", { onClick: undo, disabled: collapseView || !history.length, title: "Undo (\u2318Z)", children: "\u21B6 Undo" }),
            /* @__PURE__ */ u3("button", { onClick: redo, disabled: collapseView || !future.length, title: "Redo (\u21E7\u2318Z)", children: "\u21B7 Redo" }),
            /* @__PURE__ */ u3("button", { onClick: () => void share(), class: "share-button", children: "\u2197 Share link" }),
            /* @__PURE__ */ u3("button", { onClick: reset, disabled: collapseView, class: "quiet-button", children: "Reset" })
          ] }),
          /* @__PURE__ */ u3("div", { class: "panel-heading", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("span", { class: "section-kicker", children: "01 / CATALOG" }),
              /* @__PURE__ */ u3("h2", { children: "Materials" })
            ] }),
            /* @__PURE__ */ u3("span", { class: "count", children: filteredMaterials.length })
          ] }),
          /* @__PURE__ */ u3("label", { class: "search-box", children: [
            /* @__PURE__ */ u3("span", { children: "\u2315" }),
            /* @__PURE__ */ u3("input", { value: search, onInput: (event) => setSearch(event.currentTarget.value), placeholder: "Search items and fluids" })
          ] }),
          /* @__PURE__ */ u3("p", { class: "catalog-help", children: "Drag a material into the bus, or drop it below the stations to add one." }),
          /* @__PURE__ */ u3("div", { class: "item-list", children: filteredMaterials.map((material) => /* @__PURE__ */ u3(ItemCard, { material, onDragStart, disabled: collapseView }, material.id)) })
        ] }),
        /* @__PURE__ */ u3("section", { class: "planner panel", children: [
          /* @__PURE__ */ u3("div", { class: "planner-heading", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("span", { class: "section-kicker", children: "02 / FIELD" }),
              /* @__PURE__ */ u3("h2", { children: "Your bus" })
            ] }),
            /* @__PURE__ */ u3("div", { class: "planner-options", children: [
              /* @__PURE__ */ u3("label", { class: "collapse-toggle", title: "Place adjacent lanes in one column when their visible segments do not overlap", children: [
                /* @__PURE__ */ u3("input", { type: "checkbox", checked: collapseView, onChange: (event) => toggleCollapseView(event.currentTarget.checked) }),
                "Collapse view"
              ] }),
              /* @__PURE__ */ u3("span", { class: "field-hint", children: [
                "bottom \u2192 top ",
                /* @__PURE__ */ u3("span", { class: "arrow", children: "\u2191" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ u3("div", { class: "bus-shell", children: [
            /* @__PURE__ */ u3("div", { class: "bus-columns", ref: stageRef, children: [
              /* @__PURE__ */ u3("div", { class: "station-bay left-bay", children: [
                /* @__PURE__ */ u3("div", { class: "bay-label", children: "\u25C2 stations" }),
                plan.stations.map((station, index) => station.side === "left" ? /* @__PURE__ */ u3(StationCard, { station, index, isFirst: index === 0, isLast: index === plan.stations.length - 1, selected: selectedStationId === station.id, onSelect: setSelectedStationId, onHover: setHoveredStation, onDragStart, onDrop: handleDrop, onToggleSide: toggleStationSide, onMove: moveStation, portRef: (element) => registerStationPort(station.id, element), editingDisabled: collapseView }, station.id) : /* @__PURE__ */ u3("div", { class: "station-spacer" }, station.id))
              ] }),
              /* @__PURE__ */ u3(
                "div",
                {
                  class: "lanes",
                  onDragOver: (event) => event.preventDefault(),
                  onDrop: (event) => handleDrop("lane", event),
                  children: plan.lanes.length === 0 ? /* @__PURE__ */ u3("div", { class: "empty-field", children: [
                    /* @__PURE__ */ u3("div", { class: "empty-icon", children: "\uFF0B" }),
                    /* @__PURE__ */ u3("strong", { children: "Drop items here to create lanes" }),
                    /* @__PURE__ */ u3("span", { children: "Your bus grows upward from each item's lowest producing station." })
                  ] }) : visibleLaneGroups.map((group) => group.length === 1 ? /* @__PURE__ */ u3(LaneColumn, { lane: group[0], onDragStart, onDrop: handleDrop, onRemove: removeLane, spineRef: (element) => registerLaneSpine(group[0].id, element), editingDisabled: collapseView }, group[0].id) : /* @__PURE__ */ u3("div", { class: "lane-column-group", children: group.map((lane, index) => /* @__PURE__ */ u3(LaneColumn, { lane, onDragStart, onDrop: handleDrop, onRemove: removeLane, spineRef: (element) => registerLaneSpine(lane.id, element), editingDisabled: true, collapsedIndex: index }, lane.id)) }, group.map((lane) => lane.id).join(":")))
                }
              ),
              /* @__PURE__ */ u3("div", { class: "station-bay right-bay", children: [
                /* @__PURE__ */ u3("div", { class: "bay-label", children: "stations \u25B8" }),
                plan.stations.map((station, index) => station.side === "right" ? /* @__PURE__ */ u3(StationCard, { station, index, isFirst: index === 0, isLast: index === plan.stations.length - 1, selected: selectedStationId === station.id, onSelect: setSelectedStationId, onHover: setHoveredStation, onDragStart, onDrop: handleDrop, onToggleSide: toggleStationSide, onMove: moveStation, portRef: (element) => registerStationPort(station.id, element), editingDisabled: collapseView }, station.id) : /* @__PURE__ */ u3("div", { class: "station-spacer" }, station.id))
              ] }),
              /* @__PURE__ */ u3(BeltOverlay, { plan, stageRef, stationPortRefs, laneSpineRefs, collapseView, inSituLaneIds, highlightedStationId })
            ] }),
            /* @__PURE__ */ u3(
              "div",
              {
                class: "add-station-row",
                onDragOver: (event) => event.preventDefault(),
                onDrop: (event) => handleDrop("station-add", event),
                children: collapseView ? "Collapse view is read-only \xB7 uncheck it to edit the plan" : "Drop an item here to add a station \xB7 use \u21C4 on a station to flip which side it taps from"
              }
            )
          ] }),
          plan.lanes.length > 0 && /* @__PURE__ */ u3("div", { class: "legend", children: [
            /* @__PURE__ */ u3("span", { class: "legend-line" }),
            " normal flow ",
            /* @__PURE__ */ u3("span", { class: "legend-line dashed" }),
            " counterflow ",
            /* @__PURE__ */ u3("span", { class: "legend-note", children: collapseView ? "Read-only collapsed layout" : "Select a station to edit its bus inputs" })
          ] })
        ] })
      ] }),
      selectedStation && /* @__PURE__ */ u3("div", { class: "modal-backdrop", onClick: (event) => {
        if (event.target === event.currentTarget) setSelectedStationId(null);
      }, children: /* @__PURE__ */ u3("section", { class: "recipe-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "recipe-title", children: [
        /* @__PURE__ */ u3("button", { class: "modal-close", onClick: () => setSelectedStationId(null), "aria-label": "Close", children: "\xD7" }),
        /* @__PURE__ */ u3("div", { class: "modal-material", children: /* @__PURE__ */ u3(MaterialIcon, { material: materialById.get(selectedStation.material) }) }),
        /* @__PURE__ */ u3("span", { class: "section-kicker", children: [
          "STATION / ",
          selectedStation.side.toUpperCase()
        ] }),
        /* @__PURE__ */ u3("h2", { id: "recipe-title", children: materialName(selectedStation.material) }),
        selectedStationRecipe && selectedStationRecipe.inputs.length > 0 && /* @__PURE__ */ u3("div", { class: "recipe-info", children: [
          /* @__PURE__ */ u3("h3", { children: "Recipe inputs" }),
          /* @__PURE__ */ u3("div", { class: "recipe-inputs", children: selectedStationRecipe.inputs.map((input) => /* @__PURE__ */ u3("span", { class: "recipe-input", title: `${input.amount} ${materialName(input.material)}`, children: [
            /* @__PURE__ */ u3(MaterialIcon, { material: materialById.get(input.material), size: "small" }),
            /* @__PURE__ */ u3("span", { children: materialName(input.material) })
          ] }, input.material)) })
        ] }),
        /* @__PURE__ */ u3("div", { class: "lane-inputs", children: [
          /* @__PURE__ */ u3("h3", { children: "Bus inputs" }),
          plan.lanes.length > 0 ? /* @__PURE__ */ u3("div", { class: "lane-input-grid", children: plan.lanes.map((lane) => {
            const name = materialName(lane.material);
            return /* @__PURE__ */ u3("label", { class: "lane-input-cell", title: `${name}: ${pullsLaneFromBus(selectedStation, lane.id) ? "pulling from bus" : "not pulled"}`, children: [
              /* @__PURE__ */ u3(
                "input",
                {
                  type: "checkbox",
                  checked: pullsLaneFromBus(selectedStation, lane.id),
                  onChange: (event) => setLaneSource(lane.id, event.currentTarget.checked),
                  "aria-label": `Pull ${name} from this lane`
                }
              ),
              /* @__PURE__ */ u3(MaterialIcon, { material: materialById.get(lane.material) }),
              /* @__PURE__ */ u3("span", { class: "lane-input-name", children: name })
            ] }, lane.id);
          }) }) : /* @__PURE__ */ u3("p", { class: "modal-help", children: "Add lanes to the bus, then choose which ones this station consumes." })
        ] }),
        /* @__PURE__ */ u3("button", { class: "remove-button", onClick: removeSelectedStation, children: "Dismantle station" })
      ] }) }),
      notice && /* @__PURE__ */ u3("div", { class: "notice", children: notice }),
      /* @__PURE__ */ u3(Footer, {})
    ] });
  };
  var QUARTER_TURN_CONTROL = 0.5522848;
  var ELBOW_RADIUS = 12;
  var TAP_SPACING = 11;
  var HOP_RADIUS = 6;
  var COLLAPSED_LANE_ICON_SIZE = 18;
  function stationProducesMaterial(station, materialId) {
    return station.material === materialId;
  }
  function laneOrigin(plan, materialId) {
    let originIndex = null;
    plan.stations.forEach((station, index) => {
      if (stationProducesMaterial(station, materialId)) originIndex = index;
    });
    return originIndex;
  }
  function laneOnlyCounterflowsFromOrigin(plan, lane, origin) {
    if (origin === null) return false;
    let hasCounterflowPull = false;
    for (const [stationIndex, station] of plan.stations.entries()) {
      if (stationIndex < origin && (stationProducesMaterial(station, lane.material) || pullsLaneFromBus(station, lane.id))) {
        return false;
      }
      if (stationIndex > origin && pullsLaneFromBus(station, lane.id)) hasCounterflowPull = true;
    }
    return hasCounterflowPull;
  }
  function buildLogicalConnectors(plan) {
    const plannedLaneIds = new Set(plan.lanes.map((lane) => lane.id));
    const laneOrigins = new Map(plan.lanes.map((lane) => [lane.id, laneOrigin(plan, lane.material)]));
    const counterflowOnlyLaneIds = new Set(
      plan.lanes.filter((lane) => laneOnlyCounterflowsFromOrigin(plan, lane, laneOrigins.get(lane.id) ?? null)).map((lane) => lane.id)
    );
    const connectors = plan.stations.flatMap((station, stationIndex) => {
      const inputLaneIds = new Set((station.busInputs ?? []).filter((laneId) => plannedLaneIds.has(laneId)));
      const outputLaneIds = new Set(
        plan.lanes.filter((lane) => lane.material === station.material).map((lane) => lane.id)
      );
      return plan.lanes.flatMap((lane) => {
        const stationConnectors = [];
        if (inputLaneIds.has(lane.id)) {
          const origin = laneOrigins.get(lane.id) ?? null;
          stationConnectors.push({
            id: `${station.id}:input:${lane.id}`,
            stationId: station.id,
            laneId: lane.id,
            kind: "input",
            counterflow: origin !== null && stationIndex > origin
          });
        }
        if (outputLaneIds.has(lane.id)) {
          stationConnectors.push({
            id: `${station.id}:output:${lane.id}`,
            stationId: station.id,
            laneId: lane.id,
            kind: "output",
            counterflow: counterflowOnlyLaneIds.has(lane.id) && stationIndex === laneOrigins.get(lane.id)
          });
        }
        return stationConnectors;
      });
    });
    return connectors;
  }
  function connectorVerticalDirection(kind, counterflow) {
    if (counterflow) return kind === "output" ? 1 : -1;
    return kind === "output" ? -1 : 1;
  }
  function connectorPath(start, rowOffset, laneX, kind, counterflow, hopXs) {
    const rowY = start.y + rowOffset;
    const dx = laneX - start.x;
    const sign = dx >= 0 ? 1 : -1;
    const radius = Math.min(ELBOW_RADIUS, Math.abs(dx));
    const vDir = connectorVerticalDirection(kind, counterflow);
    const entryX = laneX - sign * radius;
    const curveEndY = rowY + vDir * radius;
    const control = QUARTER_TURN_CONTROL * radius;
    const c1x = entryX + sign * control;
    const c2y = curveEndY - vDir * control;
    let d3 = `M ${start.x} ${start.y}`;
    if (rowOffset !== 0) d3 += ` V ${rowY}`;
    const sweepFlag = sign > 0 ? 1 : 0;
    const orderedHops = [...hopXs].sort((a3, b2) => sign > 0 ? a3 - b2 : b2 - a3);
    for (const hopX of orderedHops) {
      d3 += ` H ${hopX - sign * HOP_RADIUS} A ${HOP_RADIUS} ${HOP_RADIUS} 0 0 ${sweepFlag} ${hopX + sign * HOP_RADIUS} ${rowY}`;
    }
    d3 += ` H ${entryX} C ${c1x} ${rowY} ${laneX} ${c2y} ${laneX} ${curveEndY}`;
    return d3;
  }
  function connectorRowRank(connector) {
    if (connector.kind === "output") return connector.counterflow ? 3 : 0;
    return connector.counterflow ? 1 : 2;
  }
  function groupConnectorsByStation(connectors) {
    const byStation = /* @__PURE__ */ new Map();
    for (const connector of connectors) {
      const list = byStation.get(connector.stationId) ?? [];
      list.push(connector);
      byStation.set(connector.stationId, list);
    }
    return byStation;
  }
  function buildTapOffsets(byStation, layout) {
    const tapOffsets = /* @__PURE__ */ new Map();
    for (const [stationId, list] of byStation) {
      const stationPort = layout.stationPorts.get(stationId);
      if (!stationPort) continue;
      const ordered = [...list].sort((first, second) => {
        const rankDifference = connectorRowRank(first) - connectorRowRank(second);
        if (rankDifference !== 0) return rankDifference;
        const firstLane = layout.laneSpines.get(first.laneId);
        const secondLane = layout.laneSpines.get(second.laneId);
        return Math.abs((firstLane?.x ?? stationPort.x) - stationPort.x) - Math.abs((secondLane?.x ?? stationPort.x) - stationPort.x);
      });
      const count = ordered.length;
      ordered.forEach((connector, index) => {
        tapOffsets.set(connector.id, (index - (count - 1) / 2) * TAP_SPACING);
      });
    }
    return tapOffsets;
  }
  function buildLaneRanges(plan, layout, connectors, tapOffsets) {
    const laneRanges = /* @__PURE__ */ new Map();
    const laneCounterflow = /* @__PURE__ */ new Set();
    for (const lane of plan.lanes) {
      const metrics = layout.laneSpines.get(lane.id);
      if (!metrics) continue;
      const originIndex = laneOrigin(plan, lane.material);
      const laneConnectors = connectors.filter((connector) => connector.laneId === lane.id);
      const tapEndpoints = laneConnectors.flatMap((connector) => {
        const port = layout.stationPorts.get(connector.stationId);
        if (!port) return [];
        const offset = tapOffsets.get(connector.id) ?? 0;
        return [port.y + offset + connectorVerticalDirection(connector.kind, connector.counterflow) * ELBOW_RADIUS];
      });
      if (tapEndpoints.length === 0) continue;
      let bottom = metrics.bottom;
      let top = Math.min(...tapEndpoints);
      if (originIndex !== null) {
        const originStation = plan.stations[originIndex];
        const originPort = originStation ? layout.stationPorts.get(originStation.id) : void 0;
        let originY = null;
        if (originStation && originPort) {
          const offset = tapOffsets.get(`${originStation.id}:output:${lane.id}`) ?? 0;
          const originConnector = laneConnectors.find((connector) => connector.id === `${originStation.id}:output:${lane.id}`);
          originY = originPort.y + offset + connectorVerticalDirection("output", originConnector?.counterflow ?? false) * ELBOW_RADIUS;
          bottom = originY;
          top = Math.min(top, originY);
        }
        const counterflowBottom = laneConnectors.filter((connector) => connector.counterflow).map((connector) => {
          const port = layout.stationPorts.get(connector.stationId);
          if (!port) return null;
          const offset = tapOffsets.get(connector.id) ?? 0;
          return port.y + offset + connectorVerticalDirection(connector.kind, connector.counterflow) * ELBOW_RADIUS;
        }).filter((endpoint) => endpoint !== null).reduce((lowest, endpoint) => lowest === null ? endpoint : Math.max(lowest, endpoint), null);
        if (counterflowBottom !== null && counterflowBottom > bottom) {
          bottom = counterflowBottom;
          laneCounterflow.add(lane.id);
        }
      }
      laneRanges.set(lane.id, { x: metrics.x, top, bottom });
    }
    return { laneRanges, laneCounterflow };
  }
  function tapCrossingCount(layout, connectors, tapOffsets, laneRanges) {
    let crossings = 0;
    for (const connector of connectors) {
      const stationPort = layout.stationPorts.get(connector.stationId);
      const laneSpine = layout.laneSpines.get(connector.laneId);
      if (!stationPort || !laneSpine) continue;
      const rowY = stationPort.y + (tapOffsets.get(connector.id) ?? 0);
      const lo = Math.min(stationPort.x, laneSpine.x);
      const hi = Math.max(stationPort.x, laneSpine.x);
      for (const [laneId, range] of laneRanges) {
        if (laneId === connector.laneId) continue;
        if (range.x <= lo || range.x >= hi) continue;
        if (rowY < range.top || rowY > range.bottom) continue;
        crossings += 1;
      }
    }
    return crossings;
  }
  function optimizeInputTapRows(plan, layout, connectors, byStation, tapOffsets) {
    const optimizedOffsets = new Map(tapOffsets);
    for (const list of byStation.values()) {
      let ordered = [...list].sort((first, second) => (optimizedOffsets.get(first.id) ?? 0) - (optimizedOffsets.get(second.id) ?? 0));
      for (const counterflow of [true, false]) {
        const slots = ordered.map((connector, index) => ({ connector, index })).filter(({ connector }) => connector.kind === "input" && connector.counterflow === counterflow);
        if (slots.length < 2) continue;
        const slotOffsets = slots.map(({ connector }) => optimizedOffsets.get(connector.id) ?? 0);
        const stationPort = layout.stationPorts.get(slots[0].connector.stationId);
        const scoreOrder = (candidateOrder) => {
          const candidateOffsets = new Map(optimizedOffsets);
          candidateOrder.forEach((connector, index) => candidateOffsets.set(connector.id, slotOffsets[index]));
          const { laneRanges } = buildLaneRanges(plan, layout, connectors, candidateOffsets);
          const crossings = tapCrossingCount(layout, connectors, candidateOffsets, laneRanges);
          const proximity = candidateOrder.reduce((total, connector, index) => {
            const laneX = layout.laneSpines.get(connector.laneId)?.x ?? stationPort?.x ?? 0;
            const rowPriority = counterflow ? candidateOrder.length - 1 - index : index;
            return total + Math.abs(laneX - (stationPort?.x ?? 0)) * rowPriority;
          }, 0);
          return { crossings, proximity };
        };
        const isBetterScore = (candidate, current) => candidate.crossings < current.crossings || candidate.crossings === current.crossings && candidate.proximity < current.proximity;
        let bestOrder = slots.map(({ connector }) => connector);
        let bestScore = scoreOrder(bestOrder);
        if (bestOrder.length <= 7) {
          const permutation = [...bestOrder];
          const evaluatePermutations = (start) => {
            if (start === permutation.length) {
              const score = scoreOrder(permutation);
              if (isBetterScore(score, bestScore)) {
                bestScore = score;
                bestOrder = [...permutation];
              }
              return;
            }
            for (let index = start; index < permutation.length; index += 1) {
              [permutation[start], permutation[index]] = [permutation[index], permutation[start]];
              evaluatePermutations(start + 1);
              [permutation[start], permutation[index]] = [permutation[index], permutation[start]];
            }
          };
          evaluatePermutations(0);
        } else {
          let improved = true;
          while (improved) {
            improved = false;
            for (let first = 0; first < bestOrder.length && !improved; first += 1) {
              for (let second = first + 1; second < bestOrder.length; second += 1) {
                const candidate = [...bestOrder];
                [candidate[first], candidate[second]] = [candidate[second], candidate[first]];
                const score = scoreOrder(candidate);
                if (isBetterScore(score, bestScore)) {
                  bestOrder = candidate;
                  bestScore = score;
                  improved = true;
                  break;
                }
              }
            }
          }
        }
        bestOrder.forEach((connector, index) => optimizedOffsets.set(connector.id, slotOffsets[index]));
        ordered = [...list].sort((first, second) => (optimizedOffsets.get(first.id) ?? 0) - (optimizedOffsets.get(second.id) ?? 0));
      }
    }
    return optimizedOffsets;
  }
  function BeltOverlay({ plan, stageRef, stationPortRefs, laneSpineRefs, collapseView, inSituLaneIds, highlightedStationId }) {
    const [layout, setLayout] = d2(null);
    const connectors = T2(() => buildLogicalConnectors(plan), [plan]);
    _2(() => {
      let disposed = false;
      let frame = 0;
      const stage = stageRef.current;
      setLayout(null);
      if (!stage || plan.lanes.length === 0) return () => void 0;
      const measure = () => {
        if (disposed) return;
        const stageRect = stage.getBoundingClientRect();
        const stageLeft = stageRect.left + stage.clientLeft;
        const stageTop = stageRect.top + stage.clientTop - stage.scrollTop;
        const width = stage.clientWidth;
        const height = stage.scrollHeight;
        if (width <= 0 || height <= 0) return;
        const stationPorts = /* @__PURE__ */ new Map();
        for (const station of plan.stations) {
          const anchor = stationPortRefs.current.get(station.id);
          if (!anchor) return;
          const rect = anchor.getBoundingClientRect();
          stationPorts.set(station.id, {
            x: rect.left + rect.width / 2 - stageLeft,
            y: rect.top + rect.height / 2 - stageTop
          });
        }
        const laneSpines = /* @__PURE__ */ new Map();
        for (const lane of plan.lanes) {
          const anchor = laneSpineRefs.current.get(lane.id);
          if (!anchor) return;
          const rect = anchor.getBoundingClientRect();
          laneSpines.set(lane.id, {
            x: rect.left + rect.width / 2 - stageLeft,
            top: rect.top - stageTop,
            bottom: rect.bottom - stageTop
          });
        }
        setLayout({ width, height, stationPorts, laneSpines });
      };
      const scheduleMeasure = () => {
        if (disposed) return;
        setLayout(null);
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          frame = 0;
          measure();
        });
      };
      const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMeasure);
      observer?.observe(stage);
      stationPortRefs.current.forEach((anchor) => observer?.observe(anchor));
      laneSpineRefs.current.forEach((anchor) => observer?.observe(anchor));
      scheduleMeasure();
      return () => {
        disposed = true;
        if (frame) cancelAnimationFrame(frame);
        observer?.disconnect();
      };
    }, [collapseView, laneSpineRefs, plan, stageRef, stationPortRefs]);
    if (!layout || plan.lanes.length === 0) return null;
    const byStation = groupConnectorsByStation(connectors);
    let tapOffsets = buildTapOffsets(byStation, layout);
    for (let pass = 0; pass < 2; pass += 1) {
      tapOffsets = optimizeInputTapRows(plan, layout, connectors, byStation, tapOffsets);
    }
    const laneRangeResult = buildLaneRanges(plan, layout, connectors, tapOffsets);
    const { laneRanges, laneCounterflow } = laneRangeResult;
    const highlightedStation = plan.stations.find((station) => station.id === highlightedStationId);
    const highlightedLaneIds = new Set(highlightedStation?.busInputs ?? []);
    const highlightedMaterials = [...new Set(
      plan.lanes.filter((lane) => highlightedLaneIds.has(lane.id)).map((lane) => lane.material)
    )].sort();
    const highlightedMaterialColors = new Map(
      highlightedMaterials.map((material, index) => [material, `hsl(${Math.round(index * 360 / highlightedMaterials.length)} 84% 62%)`])
    );
    const highlightedLaneColors = new Map(
      plan.lanes.filter((lane) => highlightedLaneIds.has(lane.id)).map((lane) => [lane.id, highlightedMaterialColors.get(lane.material)])
    );
    const laneSpineElements = plan.lanes.map((lane) => {
      const range = laneRanges.get(lane.id);
      if (!range) return null;
      const originIndex = laneOrigin(plan, lane.material);
      const originStation = originIndex !== null ? plan.stations[originIndex] : void 0;
      const originPort = originStation ? layout.stationPorts.get(originStation.id) : void 0;
      const originOffset = originStation ? tapOffsets.get(`${originStation.id}:output:${lane.id}`) ?? 0 : 0;
      const originConnector = originStation ? connectors.find((connector) => connector.id === `${originStation.id}:output:${lane.id}`) : void 0;
      const originY = originPort ? originPort.y + originOffset + connectorVerticalDirection("output", originConnector?.counterflow ?? false) * ELBOW_RADIUS : range.bottom;
      const hasUpwardSpine = range.top < originY;
      return /* @__PURE__ */ u3("g", { children: [
        hasUpwardSpine && /* @__PURE__ */ u3("line", { class: "lane-spine", x1: range.x, y1: originY, x2: range.x, y2: range.top }),
        laneCounterflow.has(lane.id) && /* @__PURE__ */ u3("line", { class: "lane-spine counterflow", x1: range.x, y1: originY, x2: range.x, y2: range.bottom }),
        hasUpwardSpine && /* @__PURE__ */ u3("polygon", { class: "lane-arrowhead", points: `${range.x - 6},${range.top + 11} ${range.x + 6},${range.top + 11} ${range.x},${range.top}` })
      ] }, lane.id);
    });
    const highlightedLaneSegments = plan.lanes.map((lane) => {
      const highlightColor = highlightedLaneColors.get(lane.id);
      const laneSpine = layout.laneSpines.get(lane.id);
      const targetConnector = connectors.find((connector) => connector.stationId === highlightedStationId && connector.laneId === lane.id && connector.kind === "input");
      if (!highlightColor || !laneSpine || !targetConnector) return null;
      const targetPort = layout.stationPorts.get(targetConnector.stationId);
      if (!targetPort) return null;
      const targetY = targetPort.y + (tapOffsets.get(targetConnector.id) ?? 0) + connectorVerticalDirection(targetConnector.kind, targetConnector.counterflow) * ELBOW_RADIUS;
      const originIndex = laneOrigin(plan, lane.material);
      const originStation = originIndex === null ? void 0 : plan.stations[originIndex];
      const originPort = originStation ? layout.stationPorts.get(originStation.id) : void 0;
      const originConnector = originStation ? connectors.find((connector) => connector.id === `${originStation.id}:output:${lane.id}`) : void 0;
      const originY = originPort ? originPort.y + (tapOffsets.get(originConnector?.id ?? "") ?? 0) + connectorVerticalDirection("output", originConnector?.counterflow ?? false) * ELBOW_RADIUS : laneSpine.bottom;
      return /* @__PURE__ */ u3("line", { class: `lane-spine highlighted ${targetConnector.counterflow ? "counterflow" : ""}`, style: `--highlight-color: ${highlightColor};`, x1: laneSpine.x, y1: originY, x2: laneSpine.x, y2: targetY }, lane.id);
    });
    const collapsedLaneIndicators = plan.lanes.map((lane) => {
      if (!inSituLaneIds.has(lane.id)) return null;
      const range = laneRanges.get(lane.id);
      const material = materialById.get(lane.material);
      if (!range || !material) return null;
      return /* @__PURE__ */ u3(
        "image",
        {
          class: "collapsed-lane-indicator",
          href: material.icon,
          x: range.x - COLLAPSED_LANE_ICON_SIZE / 2,
          y: Math.max(0, range.top - COLLAPSED_LANE_ICON_SIZE - 4),
          width: COLLAPSED_LANE_ICON_SIZE,
          height: COLLAPSED_LANE_ICON_SIZE,
          preserveAspectRatio: "xMidYMid meet"
        },
        lane.id
      );
    });
    return /* @__PURE__ */ u3(
      "svg",
      {
        class: "belt-overlay",
        "aria-hidden": "true",
        width: layout.width,
        height: layout.height,
        viewBox: `0 0 ${layout.width} ${layout.height}`,
        children: [
          laneSpineElements,
          highlightedLaneSegments,
          connectors.map((connector) => {
            const stationPort = layout.stationPorts.get(connector.stationId);
            const laneSpine = layout.laneSpines.get(connector.laneId);
            if (!stationPort || !laneSpine) return null;
            const rowOffset = tapOffsets.get(connector.id) ?? 0;
            const rowY = stationPort.y + rowOffset;
            const lo = Math.min(stationPort.x, laneSpine.x);
            const hi = Math.max(stationPort.x, laneSpine.x);
            const hopXs = [];
            for (const [laneId, range] of laneRanges) {
              if (laneId === connector.laneId) continue;
              if (range.x <= lo || range.x >= hi) continue;
              if (rowY < range.top || rowY > range.bottom) continue;
              hopXs.push(range.x);
            }
            const path = connectorPath(stationPort, rowOffset, laneSpine.x, connector.kind, connector.counterflow, hopXs);
            const originIndex = laneOrigin(plan, plan.lanes.find((lane) => lane.id === connector.laneId)?.material ?? "");
            const originStation = originIndex === null ? void 0 : plan.stations[originIndex];
            const isHighlightedInput = connector.stationId === highlightedStationId && connector.kind === "input";
            const isHighlightedOrigin = connector.kind === "output" && connector.stationId === originStation?.id;
            const highlightColor = isHighlightedInput || isHighlightedOrigin ? highlightedLaneColors.get(connector.laneId) : void 0;
            return /* @__PURE__ */ u3("path", { class: `connector ${connector.kind} ${connector.counterflow ? "counterflow" : ""} ${highlightColor ? "highlighted" : ""}`, style: highlightColor ? `--highlight-color: ${highlightColor};` : void 0, d: path }, connector.id);
          }),
          collapsedLaneIndicators
        ]
      }
    );
  }
  function StationCard({ station, index, isFirst, isLast, selected, onSelect, onHover, onDragStart, onDrop, onToggleSide, onMove, portRef, editingDisabled }) {
    return /* @__PURE__ */ u3(
      "div",
      {
        class: `station-card ${selected ? "selected" : ""}`,
        role: "button",
        tabIndex: editingDisabled ? -1 : 0,
        draggable: !editingDisabled,
        onPointerEnter: () => onHover(station.id),
        onPointerLeave: () => onHover(null),
        onClick: () => {
          if (!editingDisabled) onSelect(station.id);
        },
        onKeyDown: (event) => {
          if (!editingDisabled && (event.key === "Enter" || event.key === " ")) onSelect(station.id);
        },
        onDragStart: () => {
          if (!editingDisabled) onDragStart({ kind: "station", id: station.id });
        },
        onDragOver: (event) => {
          if (!editingDisabled) event.preventDefault();
        },
        onDrop: (event) => {
          if (editingDisabled) return;
          event.preventDefault();
          event.stopPropagation();
          onDrop(station.id, event);
        },
        title: `${materialName(station.material)} \xB7 station ${index + 1}${editingDisabled ? "" : " \xB7 click to edit bus inputs"}`,
        children: [
          /* @__PURE__ */ u3("span", { ref: portRef, class: `station-port-anchor ${station.side}`, "aria-hidden": "true" }),
          /* @__PURE__ */ u3(MaterialIcon, { material: materialById.get(station.material) }),
          !editingDisabled && /* @__PURE__ */ u3("span", { class: "station-controls", children: [
            /* @__PURE__ */ u3(
              "button",
              {
                class: "move-button",
                disabled: isFirst,
                title: "Move up (toward the top of the bus)",
                onClick: (event) => {
                  event.stopPropagation();
                  onMove(station.id, -1);
                },
                children: "\u25B2"
              }
            ),
            /* @__PURE__ */ u3(
              "button",
              {
                class: "side-toggle",
                title: `Tapping from the ${station.side} side \xB7 click to flip`,
                onClick: (event) => {
                  event.stopPropagation();
                  onToggleSide(station.id);
                },
                children: "\u21C4"
              }
            ),
            /* @__PURE__ */ u3(
              "button",
              {
                class: "move-button",
                disabled: isLast,
                title: "Move down (toward the bottom of the bus)",
                onClick: (event) => {
                  event.stopPropagation();
                  onMove(station.id, 1);
                },
                children: "\u25BC"
              }
            )
          ] })
        ]
      }
    );
  }
  function LaneColumn({ lane, onDragStart, onDrop, onRemove, spineRef, editingDisabled, collapsedIndex }) {
    const material = materialById.get(lane.material);
    return /* @__PURE__ */ u3("div", { class: `lane-column ${collapsedIndex === void 0 ? "" : "collapsed"}`, style: collapsedIndex === void 0 ? void 0 : `--collapse-index: ${collapsedIndex};`, draggable: !editingDisabled, onDragStart: () => {
      if (!editingDisabled) onDragStart({ kind: "lane", id: lane.id });
    }, onDragOver: (event) => {
      if (!editingDisabled) event.preventDefault();
    }, onDrop: (event) => {
      if (!editingDisabled) onDrop(lane.id, event);
    }, title: material?.name ?? lane.material, children: [
      /* @__PURE__ */ u3("div", { class: "lane-header", children: [
        /* @__PURE__ */ u3(MaterialIcon, { material }),
        !editingDisabled && /* @__PURE__ */ u3("button", { class: "lane-remove", onClick: (event) => {
          event.stopPropagation();
          onRemove(lane.id);
        }, "aria-label": `Remove ${material?.name ?? lane.material} lane`, title: "Remove lane", children: "\xD7" })
      ] }),
      /* @__PURE__ */ u3("div", { class: "lane-track", children: /* @__PURE__ */ u3("span", { ref: spineRef, class: "lane-spine-anchor", "aria-hidden": "true" }) })
    ] });
  }

  // src/index.tsx
  R(/* @__PURE__ */ u3(App, {}), document.getElementById("app"));
})();
//# sourceMappingURL=app.js.map
