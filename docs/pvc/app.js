"use strict";
(() => {
  // node_modules/preact/dist/preact.mjs
  var n;
  var t;
  var r;
  var u;
  var i;
  var f;
  var o;
  var e;
  var l;
  var c;
  var a;
  var s;
  var h = /* @__PURE__ */ Symbol.for("pv");
  var p = {};
  var y = [];
  var v = /^m(i|n|o|s|text|space)$/;
  var w = Array.isArray;
  var d = y.slice;
  var _ = Object.assign;
  function g(n2) {
    n2 && n2.parentNode && n2.remove();
  }
  function m(r3, u3, i3, f4, o4) {
    var e3 = { type: r3, props: u3, key: i3, ref: f4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: h, __v: o4 || ++t, __i: -1, __u: 0 };
    return !o4 && n.vnode && n.vnode(e3), e3;
  }
  function $(n2) {
    return n2.children;
  }
  function x(n2, t3) {
    this.props = n2, this.context = t3, this.__g = 0;
  }
  function S(n2, t3) {
    if (null == t3) return n2.__ && S(n2.__, n2.__i + 1);
    for (var r3; t3 < n2.__k.length; t3++) if ((r3 = n2.__k[t3]) && r3.__e) return r3.__e;
    return "function" != typeof n2.type || n2.props.__P ? null : S(n2);
  }
  function C(t3) {
    var r3, u3 = t3.__v, i3 = u3.__e, f4 = [], o4 = [], e3 = t3.__P;
    e3 && ((r3 = _({ constructor: h }, u3)).__v = u3.__v + 1, n.vnode && n.vnode(r3), z(e3, r3, u3, t3.__n, e3.namespaceURI, 32 & u3.__u ? [i3] : null, f4, i3 || S(u3), 32 & u3.__u, o4), r3.__v = u3.__v, r3.__.__k[r3.__i] = r3, E(f4, r3, o4), u3.__ = u3.__e = null, r3.__e != i3 && j(r3));
  }
  function j(n2) {
    if ((n2 = n2.__) && n2.__c && !n2.props.__P) return n2.__e = null, n2.__k.some(function(t3) {
      return t3 && (n2.__e = t3.__e);
    }), j(n2);
  }
  function L(t3) {
    (8 & t3.__g || (t3.__g |= 8, u.push(t3), f++)) && i == n.debounceRendering || ((i = n.debounceRendering) || queueMicrotask)(H);
  }
  function H() {
    try {
      for (var n2, t3 = 1; u.length; ) u.length > t3 && u.sort(o), n2 = u.shift(), t3 = u.length, 8 & n2.__g && C(n2);
    } finally {
      (f = u.length) && (i || queueMicrotask)(H);
    }
  }
  function I(n2, t3, r3, u3, i3, f4, o4, e3, l3, c3, a4) {
    var s3, h3, v3, w3, d3, _3, g3 = u3.__k || y, k2 = t3.length;
    for (l3 = q(r3, t3, g3, l3, k2), s3 = 0; s3 < k2; s3++) null != (v3 = r3.__k[s3]) && (h3 = ~v3.__i && g3[v3.__i] || p, v3.__i = s3, _3 = z(n2, v3, h3, i3, f4, o4, e3, l3, c3, a4), w3 = v3.__e, (h3.ref != v3.ref || 8 & h3.__u) && (h3.ref && G(h3.ref, null, v3, h3), v3.ref && a4.push(v3.ref, v3.__c || w3, v3)), d3 = d3 || w3, 4 & v3.__u ? (l3 = A(v3, l3, n2, !h3.__v), h3.__e && (h3.__e = null)) : "function" == typeof v3.type && void 0 !== _3 ? l3 = _3 : w3 && (l3 = w3.nextSibling), v3.__u &= -21);
    return r3.__e = d3, l3;
  }
  function q(n2, t3, r3, u3, i3) {
    var f4, o4, e3, l3, c3, a4, s3, p3, y3, v3 = r3.length, d3 = v3, _3 = 0, g3 = 0, k2 = n2.__k = Array(i3);
    for (f4 = 0; f4 < i3; f4++) null != (o4 = t3[f4]) && "boolean" != typeof o4 && "function" != typeof o4 ? ("object" != typeof o4 || o4.constructor === String ? o4 = k2[f4] = m(null, o4) : w(o4) ? o4 = k2[f4] = m($, { children: o4 }) : o4.constructor === h && o4.__b ? o4 = k2[f4] = m(o4.type, o4.props, o4.key, o4.ref, o4.__v) : k2[f4] = o4, l3 = f4 + _3, o4.__ = n2, o4.__b = n2.__b + 1, e3 = null, ~(c3 = o4.__i = P(o4, r3, l3, d3)) && (d3--, (e3 = r3[c3]) && (e3.__u |= 2)), e3 && e3.__v ? (o4.__u |= 16, c3 == l3 - 1 ? _3-- : c3 == l3 + 1 ? _3++ : c3 != l3 && (c3 > l3 ? _3-- : _3++, g3 = 1)) : (~c3 || (i3 > v3 ? _3-- : i3 < v3 && _3++), "function" != typeof o4.type && (o4.__u |= 4))) : k2[f4] = null;
    if (g3) {
      for (a4 = [], s3 = [], f4 = 0; f4 < i3; f4++) if ((o4 = k2[f4]) && 16 & o4.__u) {
        for (_3 = 0, p3 = a4.length; _3 < p3; ) a4[y3 = _3 + p3 >> 1] < o4.__i ? _3 = y3 + 1 : p3 = y3;
        a4[_3] = o4.__i, s3[f4] = _3 + 1;
      }
      for (_3 = a4.length; f4--; ) s3[f4] && (s3[f4] == _3 ? _3-- : k2[f4].__u |= 4);
    }
    if (d3) for (f4 = 0; f4 < v3; f4++) !(e3 = r3[f4]) || 2 & e3.__u || (e3.__e == u3 && (u3 = S(e3)), J(e3, e3));
    return u3;
  }
  function A(n2, t3, r3, u3) {
    var i3, f4, o4, e3;
    if ("function" == typeof n2.type) {
      if (n2.props.__P) return t3;
      if (i3 = n2.__k) for (f4 = 0; f4 < i3.length; f4++) i3[f4] && (i3[f4].__ = n2, t3 = A(i3[f4], t3, r3, false));
      return t3;
    }
    for (t3 && !t3.parentNode && (t3 = S(n2)) && !t3.parentNode && (t3 = null), o4 = n2.__e, e3 = t3; e3 && 8 == e3.nodeType; ) e3 = e3.nextSibling;
    for (o4 != e3 && (!u3 && r3.moveBefore && o4.parentNode ? r3.moveBefore(o4, t3) : r3.insertBefore(o4, t3 || null)), t3 = o4; (t3 = t3 && t3.nextSibling) && 8 == t3.nodeType && !t3.data.startsWith("$s"); ) ;
    return t3;
  }
  function P(n2, t3, r3, u3) {
    var i3, f4 = n2.key, o4 = n2.type, e3 = t3[r3], l3 = e3 && !(2 & e3.__u);
    if (null === e3 && null == f4 || l3 && f4 == e3.key && o4 == e3.type) return r3;
    if (u3 > (l3 ? 1 : 0)) {
      for (i3 = r3 - 1; i3 >= 0; i3--) if ((e3 = t3[i3]) && !(2 & e3.__u) && f4 == e3.key && o4 == e3.type) return i3;
      for (i3 = r3 + 1; i3 < t3.length; i3++) if ((e3 = t3[i3]) && !(2 & e3.__u) && f4 == e3.key && o4 == e3.type) return i3;
    }
    return -1;
  }
  function T(n2, t3, r3) {
    null == r3 && (r3 = ""), "-" == t3[0] ? n2.setProperty(t3, r3) : n2[t3] = r3;
  }
  function N(n2, t3, r3, u3, i3) {
    var f4, o4;
    if ("style" == t3) if ("string" == typeof r3) n2.style.cssText = r3;
    else {
      if ("string" == typeof u3 && (n2.style.cssText = u3 = ""), u3) for (t3 in u3) r3 && t3 in r3 || T(n2.style, t3);
      if (r3) for (t3 in r3) u3 && r3[t3] == u3[t3] || T(n2.style, t3, r3[t3]);
    }
    else if ("o" == t3[0] && "n" == t3[1]) "function" != typeof r3 && (r3 = null), "function" != typeof u3 && (u3 = null), (n2.__e || (n2.__e = {}))[t3] = r3, r3 && u3 || (o4 = a[t3] || (a[t3] = V(t3)), (n2.__a || (n2.__a = {}))[t3] = c, f4 = t3 != (t3 = t3.replace(l, "$1")), (t3 = t3.slice(2))[0] < "a" && (t3 = t3.toLowerCase()), r3 ? n2.addEventListener(t3, o4, f4) : n2.removeEventListener(t3, o4, f4));
    else {
      if ("http://www.w3.org/2000/svg" == i3) t3 = t3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != t3 && "height" != t3 && "href" != t3 && "list" != t3 && "form" != t3 && "tabIndex" != t3 && "download" != t3 && "rowSpan" != t3 && "colSpan" != t3 && "role" != t3 && "popover" != t3 && t3 in n2) try {
        return void (n2[t3] = null == r3 ? "" : r3);
      } catch (n3) {
      }
      if ("function" == typeof r3) return;
      null == r3 || false === r3 && "-" != t3[4] ? n2.removeAttribute(t3) : n2.setAttribute(t3, "popover" == t3 && 1 == r3 ? "" : r3);
    }
  }
  function V(t3) {
    return function(r3) {
      var u3 = this.__e;
      if (u3) {
        if (u3 = u3[t3], null == r3[e]) r3[e] = c++;
        else if (r3[e] < this.__a[t3]) return;
        return u3(n.event ? n.event(r3) : r3);
      }
    };
  }
  function z(t3, r3, u3, i3, f4, o4, e3, l3, c3, a4) {
    var s3, p3, v3, d3, k2, b, m3, M, C3, j2, L2, H2, q2, A3, O, P2, T3, N2, V2 = r3.type;
    if (r3.constructor !== h) return null;
    128 & u3.__u && (c3 = 32 & u3.__u, s3 = u3.__c.__z) && (r3.__u |= c3, p3 = o4 = [], 8 == s3.nodeType ? l3 = B(s3, o4) : o4.push(s3), l3 = o4[0] || l3), (s3 = n.__b) && s3(r3);
    n: if ("function" == typeof V2) {
      v3 = e3.length;
      try {
        if (M = r3.props, C3 = (s3 = V2.prototype) && s3.render, j2 = (s3 = V2.contextType) && i3[s3.__c], L2 = s3 ? j2 ? j2.props.value : s3.__ : i3, (d3 = u3.__c) ? (r3.__c = d3, 2 & d3.__g && (d3.__g |= 1)) : (C3 ? r3.__c = d3 = new V2(M, L2) : (r3.__c = d3 = new x(M, L2), d3.constructor = V2, d3.render = K), j2 && j2.sub(d3), d3.state || (d3.state = {}), d3.__n = i3, d3.__g |= 8, d3.__h = [], d3.__k = []), C3 && (d3.__s || (d3.__s = d3.state), V2.getDerivedStateFromProps && (d3.__s == d3.state && (d3.__s = _({}, d3.__s)), _(d3.__s, V2.getDerivedStateFromProps(M, d3.__s)))), k2 = d3.props, b = d3.state, d3.__v = r3, u3.__c) {
          if (M !== k2 && C3 && !V2.getDerivedStateFromProps && d3.componentWillReceiveProps && d3.componentWillReceiveProps(M, L2), r3.__v == u3.__v && !(8 & d3.__g) || !(4 & d3.__g) && d3.shouldComponentUpdate && false === d3.shouldComponentUpdate(M, d3.__s, L2)) {
            r3.__v != u3.__v && (d3.props = M, d3.state = d3.__s, d3.__g &= -9), r3.__e = u3.__e, r3.__k = u3.__k, r3.__k.some(function(n2) {
              n2 && (n2.__ = r3);
            }), y.push.apply(d3.__h, d3.__k), d3.__k = [], d3.__h.length && e3.push(d3), l3 = S(u3);
            break n;
          }
          d3.componentWillUpdate && d3.componentWillUpdate(M, d3.__s, L2), C3 && d3.componentDidUpdate && d3.__h.push(function() {
            d3.componentDidUpdate(k2, b, m3);
          });
        } else C3 && !V2.getDerivedStateFromProps && d3.componentWillMount && d3.componentWillMount(), C3 && d3.componentDidMount && d3.__h.push(d3.componentDidMount);
        d3.context = L2, d3.props = M, d3.__P = t3, d3.__g &= -5, H2 = n.__r, q2 = C3 ? 25 : 0;
        do {
          d3.__g &= -9, H2 && H2(r3), s3 = d3.render(d3.props, d3.state = d3.__s, d3.context);
        } while (8 & d3.__g && ++q2 < 25);
        C3 && (y.push.apply(d3.__h, d3.__k), d3.__k = []), d3.state = d3.__s, d3.getChildContext && (i3 = _({}, i3, d3.getChildContext())), C3 && u3.__c && d3.getSnapshotBeforeUpdate && (m3 = d3.getSnapshotBeforeUpdate(k2, b)), A3 = s3 && s3.type === $ && null == s3.key ? s3.props.children : s3, M.__P && (s3 = l3, f4 = (t3 = M.__P).namespaceURI, c3 = o4 = null, u3.props && u3.props.__P != t3 && (u3.__k.some(function(n2) {
          n2 && J(n2, n2);
        }), u3.__k = null), l3 = u3.__k ? S(u3, 0) : null), l3 = I(t3, w(A3) ? A3 : [A3], r3, u3, i3, f4, o4, e3, l3, c3, a4), M.__P && (r3.__e = null, l3 = s3), r3.__u &= -161, p3 && p3.some(g), d3.__h.length && e3.push(d3), 1 & d3.__g && (d3.__g &= -4);
      } catch (t4) {
        if (e3.length = v3, r3.__v = null, c3 || o4) if (t4 && t4.then) {
          if (r3.__u |= 128 | c3, o4) {
            for (~(T3 = o4.indexOf(l3 || void 0)) || (T3 = o4.length); (N2 = o4[T3 - 1]) && 8 == N2.nodeType; ) T3--;
            for (; T3 < o4.length; T3++) if (N2 = o4[T3]) if (o4[T3] = null, O) {
              if (N2 == P2) break;
            } else {
              if (8 != N2.nodeType) break;
              N2.data.startsWith("$s") && (P2 = B(O = N2));
            }
          }
          if (!O) {
            for (; l3 && 8 == l3.nodeType && l3.nextSibling; ) l3 = l3.nextSibling;
            O = l3;
          }
          (s3 = B(O = r3.__c.__z || (r3.__c.__z = O))) ? (r3.__e = O, l3 = s3) : r3.__e = l3, l3 = l3 && l3.nextSibling;
        } else o4 && o4.some(g);
        else r3.__e = u3.__e;
        r3.__k || (r3.__k = u3.__k || []), t4 && t4.then || D(r3), n.__e(t4, r3, u3);
      }
    } else l3 = r3.__e = F(u3.__e, r3, u3, i3, f4, o4, e3, c3, a4, t3);
    return (s3 = n.diffed) && s3(r3), l3;
  }
  function B(n2, t3) {
    if (n2 && 8 == n2.nodeType && n2.data.startsWith("$s")) for (var r3 = 1; n2 = n2.nextSibling; ) {
      if (8 == n2.nodeType) {
        if (n2.data.startsWith("$s")) r3++;
        else if (n2.data.startsWith("/$s") && !--r3) return n2;
      }
      t3 && t3.push(n2);
    }
  }
  function D(n2) {
    n2 && (n2.__c && (n2.__c.__g |= 4), n2.__k && n2.__k.some(D));
  }
  function E(t3, r3, u3) {
    for (var i3 = 0; i3 < u3.length; ) G(u3[i3++], u3[i3++], u3[i3++]);
    n.__c && n.__c(r3, t3), t3.some(function(r4) {
      try {
        t3 = r4.__h, r4.__h = [], t3.some(function(n2) {
          n2.call(r4);
        });
      } catch (t4) {
        n.__e(t4, r4.__v);
      }
    });
  }
  function F(t3, r3, u3, i3, f4, o4, e3, l3, c3, a4) {
    var s3, h3, y3, _3, k2, b, m3, M, $2 = u3.props || p, x2 = r3.props, C3 = r3.type;
    if ("svg" == C3 ? f4 = "http://www.w3.org/2000/svg" : "math" == C3 ? f4 = "http://www.w3.org/1998/Math/MathML" : f4 || (f4 = "http://www.w3.org/1999/xhtml"), o4) {
      for (s3 = 0; s3 < o4.length; s3++) if ((k2 = o4[s3]) && (C3 ? k2.localName == C3 : 3 == k2.nodeType)) {
        t3 = k2, o4[s3] = null;
        break;
      }
    }
    if (!t3) {
      if (M = a4.ownerDocument || document, !C3) return M.createTextNode(x2);
      t3 = M.createElementNS(f4, C3, x2.is ? x2 : a4), l3 && (n.__m && n.__m(r3, o4), l3 = false), o4 = null;
    }
    if (C3) {
      if (a4 = "template" == C3 && t3.content || t3, o4 = "textarea" == C3 && null != x2.defaultValue ? null : o4 && d.call(a4.childNodes), !l3 && o4) for ($2 = {}, s3 = 0; s3 < t3.attributes.length; s3++) $2[(k2 = t3.attributes[s3]).name] = k2.value;
      for (s3 in $2) k2 = $2[s3], "dangerouslySetInnerHTML" == s3 ? y3 = k2 : "children" == s3 || s3 in x2 || "value" == s3 && "defaultValue" in x2 || "checked" == s3 && "defaultChecked" in x2 || N(t3, s3, null, k2, f4);
      for (s3 in x2) k2 = x2[s3], "children" == s3 ? _3 = k2 : "dangerouslySetInnerHTML" == s3 ? h3 = k2 : "value" == s3 ? b = k2 : "checked" == s3 ? m3 = k2 : l3 && "function" != typeof k2 || $2[s3] === k2 || N(t3, s3, k2, $2[s3], f4);
      h3 ? (l3 || y3 && (h3.__html == y3.__html || h3.__html == t3.innerHTML) || (t3.innerHTML = h3.__html), r3.__k = []) : (y3 && (t3.textContent = ""), ("foreignObject" == C3 || "http://www.w3.org/1998/Math/MathML" == f4 && v.test(C3)) && (f4 = "http://www.w3.org/1999/xhtml"), I(a4, w(_3) ? _3 : [_3], r3, u3, i3, f4, o4, e3, o4 ? o4[0] : u3.__k && S(u3, 0), l3, c3), o4 && o4.some(g)), l3 && "textarea" != C3 || (s3 = "value", "progress" == C3 && null == b ? t3.removeAttribute(s3) : null == b || b === t3[s3] && ("progress" != C3 || b) || N(t3, s3, b, $2[s3], f4), s3 = "checked", null != m3 && m3 != t3[s3] && N(t3, s3, m3, $2[s3], f4));
    } else $2 === x2 || l3 && t3.data == x2 || (t3.data = x2);
    return t3;
  }
  function G(t3, r3, u3, i3) {
    try {
      "function" == typeof t3 ? r3 ? r3.__x = t3(r3) || 1 : i3 && (i3 = i3.__c || i3.__e) && (r3 = i3.__x) && (i3.__x = null, "function" == typeof r3 ? r3() : t3(null)) : t3.current = r3;
    } catch (t4) {
      n.__e(t4, u3);
    }
  }
  function J(t3, r3, u3) {
    var i3, f4, o4, e3;
    if (n.unmount && n.unmount(t3), !(i3 = t3.ref) || i3.current && i3.current != t3.__e || G(i3, null, r3, t3), i3 = t3.__c) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (t4) {
        n.__e(t4, r3);
      }
      i3.__P = i3.__n = null;
    }
    if (i3 = t3.__k) for (e3 = 0; e3 < i3.length; e3++) i3[e3] && J(i3[e3], r3, "function" != typeof t3.type || u3 && !t3.props.__P);
    !u3 && (i3 = t3.__c) && (i3 = i3.__z) && (f4 = B(i3, o4 = [])) && (i3 == t3.__e && o4.some(g), g(f4), g(i3)), u3 || g(t3.__e), t3.__e = t3.__c = t3.__ = null;
  }
  function K(n2, t3, r3) {
    return this.constructor(n2, r3);
  }
  function Q(t3, r3) {
    var u3, i3, f4, o4;
    n.__ && n.__(t3, r3), 9 == r3.nodeType && (r3 = r3.documentElement), i3 = (u3 = t3 && 32 & t3.__u) ? null : r3.__k, r3.__k = m($, { children: [t3] }), f4 = [], o4 = [], z(r3, r3.__k, i3 || p, p, r3.namespaceURI, i3 ? null : r3.firstChild ? d.call(r3.childNodes) : null, f4, i3 ? i3.__e : r3.firstChild, u3, o4), E(f4, r3.__k, o4), r3.__k.props.children = null;
  }
  n = { __e: function(n2, t3, r3, u3) {
    for (var i3, o4, e3; t3 = t3.__; ) if ((i3 = t3.__c) && !(1 & i3.__g)) {
      i3.__g |= 4;
      try {
        if ((e3 = (o4 = i3.constructor) && o4.getDerivedStateFromError) && i3.setState(o4.getDerivedStateFromError(n2)), i3.componentDidCatch && (i3.componentDidCatch(n2, u3 || {}), e3 = 1), e3 && 8 & i3.__g) return void (i3.__g |= 2);
      } catch (t4) {
        n2 = t4;
      }
    }
    throw f = 0, n2;
  } }, t = 0, r = function(n2) {
    return null != n2 && n2.constructor === h;
  }, x.prototype.setState = function(n2, t3) {
    var r3 = this.__s;
    r3 && r3 != this.state || (r3 = this.__s = _({}, this.state)), "function" == typeof n2 && (n2 = n2(_({}, r3), this.props)), n2 && (_(r3, n2), this.__v && (t3 && this.__k.push(t3), L(this)));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__g |= 4, n2 && this.__h.push(n2), L(this));
  }, x.prototype.render = $, u = [], f = 0, o = function(n2, t3) {
    return n2.__v.__b - t3.__v.__b;
  }, e = /* @__PURE__ */ Symbol(), l = /(PointerCapture)$|Capture$/i, c = 0, a = {}, s = 0;

  // node_modules/preact/hooks/dist/hooks.mjs
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = Object.is;
  var f2 = 0;
  var c2 = [];
  var e2 = [];
  var a2 = n;
  var v2 = a2.__b;
  var l2 = a2.__r;
  var m2 = a2.diffed;
  var h2 = a2.__c;
  var s2 = a2.unmount;
  var p2 = a2.__;
  function y2(n2, t3) {
    a2.__h && a2.__h(r2, n2, f2 || t3), f2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function d2(n2) {
    return f2 = 1, _2(G2, n2);
  }
  function _2(n2, u3, i3) {
    var f4 = y2(t2++, 2);
    if (f4.t = n2, !f4.__c && (f4.__ = [i3 ? i3(u3) : G2(void 0, u3), function(n3) {
      var t3 = (f4.__N || f4.__)[0], r3 = f4.t(t3, n3);
      o2(t3, r3) || (f4.__N = [r3, f4.__[1]], f4.__c.setState({}));
    }], f4.__c = r2, !r2.__f)) {
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate;
      r2.shouldComponentUpdate = function(n3, t3, r3) {
        var u4 = this.__H;
        if (!u4) return true;
        var i4 = false, f5 = this.props != n3;
        if (u4.__.some(function(n4) {
          n4.__N && (i4 = true, o2(n4.__[0], n4.__N[0]) || (f5 = true));
        }), c3) {
          var e3 = c3.call(this, n3, t3, r3);
          return i4 ? e3 || f5 : e3;
        }
        return !i4 || f5;
      };
    }
    return f4.__;
  }
  function A2(n2, u3) {
    var i3 = y2(t2++, 3);
    !a2.__s && E2(i3.__H, u3) && (i3.__P = true, i3.__ = n2, i3.u = u3, r2.__H.__h.push(i3));
  }
  function T2(n2) {
    return f2 = 5, w2(function() {
      return { current: n2 };
    }, []);
  }
  function w2(n2, r3) {
    var u3 = y2(t2++, 7);
    return E2(u3.__H, r3) && (u3.__ = n2(), u3.__H = r3), u3.__;
  }
  function g2() {
    var n2;
    do {
      for (; n2 = e2.shift(); ) try {
        C2(n2);
      } catch (t4) {
        a2.__e(t4, { __: (n2 = n2.__P) && n2.__v });
      }
      for (; n2 = c2.shift(); ) {
        var t3 = n2.__H;
        if (n2.__P && t3) try {
          t3.__h.some(C2), t3.__h.some(D2), t3.__h = [];
        } catch (r3) {
          t3.__h = [], a2.__e(r3, n2.__v);
        }
      }
    } while (e2.length);
  }
  a2.__b = function(n2) {
    r2 = null, v2 && v2(n2);
  }, a2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), p2 && p2(n2, t3);
  }, a2.__r = function(n2) {
    l2 && l2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 == r2 ? r2.__h = [] : (i3.__h.some(C2), i3.__h.some(D2), t2 = 0), i3.__h = [], i3.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })), u2 = r2;
  }, a2.diffed = function(n2) {
    m2 && m2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && B2(c2.push(t3)), t3.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u);
    })), u2 = r2 = null;
  }, a2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.some(C2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || D2(n4);
        });
      } catch (t4) {
        n3.__h = [function() {
          throw t4;
        }];
      }
    }), h2 && h2(n2, t3);
  }, a2.unmount = function(n2) {
    s2 && s2(n2);
    var t3, r3, u3 = n2.__c;
    u3 && u3.__H && (u3.__H.__.some(function(u4) {
      try {
        if (u4.__P && u4.__c) {
          if (void 0 === r3) {
            for (r3 = n2.__; r3 && (!r3.__c || !r3.__c.__P); ) r3 = r3.__;
            r3 = r3 && r3.__c;
          }
          u4.__P = r3, B2(e2.push(u4));
        } else C2(u4);
      } catch (n3) {
        t3 = n3;
      }
    }), u3.__H = void 0, t3 && a2.__e(t3, u3.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function z2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), k && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 35);
    k && (t3 = requestAnimationFrame(r3));
  }
  function B2(n2) {
    1 != n2 && i2 == a2.requestAnimationFrame || ((i2 = a2.requestAnimationFrame) || z2)(g2);
  }
  function C2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function D2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function E2(n2, t3) {
    return !n2 || n2.length != t3.length || t3.some(function(t4, r3) {
      return !o2(t4, n2[r3]);
    });
  }
  function G2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // src/model.ts
  var DEFAULT_CODE = `// z is the height in mm, theta is the angle in degrees (0..360).
// diameter() is the inner diameter at the wall's midpoint line;
// thickness() extends the wall outward from there.

function bulge(z) {
  return 1 + 0.5 * Math.sin(z / 30 * Math.PI);
}

function ripple(z, theta) {
  return 4 * Math.sin(5 * radians(theta) + z / 8);
}

function radians(deg) {
  return deg * Math.PI / 180;
}

function diameter(z, theta) {
  return 40 * bulge(z) + ripple(z, theta);
}

function thickness(z, theta) {
  return 2 + 0.5 * Math.cos(3 * radians(theta));
}
`;
  var MATH_PRELUDE = '"use strict";\nconst {' + Object.getOwnPropertyNames(Math).filter((k2) => k2 !== "constructor" && /^[A-Za-z_$][\w$]*$/.test(k2)).join(",") + "} = Math;\n";
  function validateParams(p3) {
    const all = [p3.zMin, p3.zMax, p3.zStep, p3.thetaStepDeg];
    if (!all.every(Number.isFinite)) return "All parameters must be numbers.";
    if (p3.zMax <= p3.zMin) return "Z max must be greater than Z min.";
    if (p3.zStep <= 0) return "Z step must be positive.";
    if (p3.thetaStepDeg <= 0 || p3.thetaStepDeg > 180) return "Theta step must be between 0 and 180 degrees.";
    return void 0;
  }
  function layerHeights(p3) {
    const n2 = Math.max(1, Math.ceil((p3.zMax - p3.zMin) / p3.zStep - 1e-9));
    const out = [];
    for (let i3 = 0; i3 < n2; i3++) out.push(p3.zMin + i3 * p3.zStep);
    out.push(p3.zMax);
    return out;
  }
  function thetaCount(p3) {
    return Math.max(3, Math.ceil(360 / p3.thetaStepDeg - 1e-9));
  }
  function meshBounds(m3) {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let i3 = 0; i3 < m3.positions.length; i3 += 3) {
      for (let j2 = 0; j2 < 3; j2++) {
        const v3 = m3.positions[i3 + j2];
        if (v3 < min[j2]) min[j2] = v3;
        if (v3 > max[j2]) max[j2] = v3;
      }
    }
    return { min, max };
  }

  // src/stl.ts
  function meshToStl(mesh) {
    const n2 = mesh.triangleCount;
    const buf = new ArrayBuffer(84 + n2 * 50);
    const view = new DataView(buf);
    const header = "PVC parametric vase";
    for (let i3 = 0; i3 < header.length; i3++) view.setUint8(i3, header.charCodeAt(i3));
    view.setUint32(80, n2, true);
    const p3 = mesh.positions;
    let o4 = 84;
    for (let t3 = 0; t3 < n2; t3++) {
      const b = t3 * 9;
      const ux = p3[b + 3] - p3[b], uy = p3[b + 4] - p3[b + 1], uz = p3[b + 5] - p3[b + 2];
      const vx = p3[b + 6] - p3[b], vy = p3[b + 7] - p3[b + 1], vz = p3[b + 8] - p3[b + 2];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;
      view.setFloat32(o4, nx, true);
      view.setFloat32(o4 + 4, ny, true);
      view.setFloat32(o4 + 8, nz, true);
      for (let i3 = 0; i3 < 9; i3++) view.setFloat32(o4 + 12 + i3 * 4, p3[b + i3], true);
      o4 += 50;
    }
    return buf;
  }

  // src/viewer.ts
  var VERT = `#version 300 es
in vec3 aPos;
uniform mat4 uMvp;
uniform mat4 uView;
out vec3 vViewPos;
out float vZ;
void main() {
  vec4 v = uView * vec4(aPos, 1.0);
  vViewPos = v.xyz;
  vZ = aPos.z;
  gl_Position = uMvp * vec4(aPos, 1.0);
}`;
  var FRAG = `#version 300 es
precision highp float;
in vec3 vViewPos;
in float vZ;
uniform vec2 uZRange;
out vec4 outColor;
void main() {
  vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
  float key = max(dot(n, normalize(vec3(0.4, 0.6, 1.0))), 0.0);
  float fill = max(dot(n, normalize(vec3(-0.6, -0.2, 0.5))), 0.0);
  float t = clamp((vZ - uZRange.x) / max(uZRange.y - uZRange.x, 1e-6), 0.0, 1.0);
  vec3 base = mix(vec3(0.25, 0.55, 0.85), vec3(0.9, 0.55, 0.35), t);
  vec3 c = base * (0.25 + 0.7 * key + 0.25 * fill);
  outColor = vec4(c, 1.0);
}`;
  function perspective(fovy, aspect, near, far) {
    const f4 = 1 / Math.tan(fovy / 2);
    const m3 = new Float32Array(16);
    m3[0] = f4 / aspect;
    m3[5] = f4;
    m3[10] = (far + near) / (near - far);
    m3[11] = -1;
    m3[14] = 2 * far * near / (near - far);
    return m3;
  }
  function lookAt(eye, target, up) {
    const [ex, ey, ez] = eye;
    let zx = ex - target[0], zy = ey - target[1], zz = ez - target[2];
    let l3 = Math.hypot(zx, zy, zz);
    zx /= l3;
    zy /= l3;
    zz /= l3;
    let xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx;
    l3 = Math.hypot(xx, xy, xz);
    xx /= l3;
    xy /= l3;
    xz /= l3;
    const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    const m3 = new Float32Array(16);
    m3[0] = xx;
    m3[1] = yx;
    m3[2] = zx;
    m3[4] = xy;
    m3[5] = yy;
    m3[6] = zy;
    m3[8] = xz;
    m3[9] = yz;
    m3[10] = zz;
    m3[12] = -(xx * ex + xy * ey + xz * ez);
    m3[13] = -(yx * ex + yy * ey + yz * ez);
    m3[14] = -(zx * ex + zy * ey + zz * ez);
    m3[15] = 1;
    return m3;
  }
  function mul(a4, b) {
    const o4 = new Float32Array(16);
    for (let c3 = 0; c3 < 4; c3++) for (let r3 = 0; r3 < 4; r3++) {
      let s3 = 0;
      for (let k2 = 0; k2 < 4; k2++) s3 += a4[k2 * 4 + r3] * b[c3 * 4 + k2];
      o4[c3 * 4 + r3] = s3;
    }
    return o4;
  }
  var Viewer = class {
    constructor(canvas) {
      this.canvas = canvas;
      const gl = canvas.getContext("webgl2", { antialias: true });
      if (!gl) throw new Error("WebGL2 is not available in this browser.");
      this.gl = gl;
      this.prog = this.makeProgram();
      this.vao = gl.createVertexArray();
      this.buf = gl.createBuffer();
      gl.bindVertexArray(this.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
      const loc = gl.getAttribLocation(this.prog, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
      gl.enable(gl.DEPTH_TEST);
      canvas.addEventListener("pointerdown", this.onDown);
      canvas.addEventListener("pointermove", this.onMove);
      canvas.addEventListener("pointerup", this.onUp);
      canvas.addEventListener("pointercancel", this.onUp);
      canvas.addEventListener("wheel", this.onWheel, { passive: false });
      canvas.addEventListener("contextmenu", (e3) => e3.preventDefault());
      this.ro = new ResizeObserver(() => this.draw());
      this.ro.observe(canvas);
    }
    canvas;
    gl;
    prog;
    vao;
    buf;
    count = 0;
    zRange = [0, 1];
    yaw = -0.8;
    pitch = 0.5;
    dist = 200;
    target = [0, 0, 0];
    raf = 0;
    pointers = /* @__PURE__ */ new Map();
    ro;
    makeProgram() {
      const gl = this.gl;
      const compile = (type, src) => {
        const s3 = gl.createShader(type);
        gl.shaderSource(s3, src);
        gl.compileShader(s3);
        if (!gl.getShaderParameter(s3, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s3) ?? "shader error");
        return s3;
      };
      const p3 = gl.createProgram();
      gl.attachShader(p3, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(p3, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(p3);
      if (!gl.getProgramParameter(p3, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p3) ?? "link error");
      return p3;
    }
    setMesh(mesh, fit) {
      const gl = this.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
      gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
      this.count = mesh.triangleCount * 3;
      const { min, max } = meshBounds(mesh);
      this.zRange = [min[2], max[2]];
      if (fit) {
        this.target = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
        const size = Math.hypot(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
        this.dist = Math.max(size, 1) * 1.1;
      }
      this.draw();
    }
    onDown = (e3) => {
      this.canvas.setPointerCapture(e3.pointerId);
      this.pointers.set(e3.pointerId, { x: e3.clientX, y: e3.clientY });
    };
    onUp = (e3) => {
      this.pointers.delete(e3.pointerId);
    };
    onMove = (e3) => {
      const prev = this.pointers.get(e3.pointerId);
      if (!prev) return;
      const dx = e3.clientX - prev.x, dy = e3.clientY - prev.y;
      if (this.pointers.size === 2) {
        const other = [...this.pointers.entries()].find(([id]) => id !== e3.pointerId)[1];
        const before = Math.hypot(prev.x - other.x, prev.y - other.y);
        const after = Math.hypot(e3.clientX - other.x, e3.clientY - other.y);
        if (after > 0) this.dist *= before / after;
      } else if (e3.buttons & 2 || e3.buttons & 4 || e3.shiftKey) {
        const k2 = this.dist * 15e-4;
        const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
        this.target = [
          this.target[0] + sy * dx * k2,
          this.target[1] + -cy * dx * k2,
          this.target[2] + dy * k2
        ];
      } else {
        this.yaw -= dx * 0.01;
        this.pitch = Math.max(-1.55, Math.min(1.55, this.pitch + dy * 0.01));
      }
      this.pointers.set(e3.pointerId, { x: e3.clientX, y: e3.clientY });
      this.draw();
    };
    onWheel = (e3) => {
      e3.preventDefault();
      this.dist *= Math.exp(e3.deltaY * 1e-3);
      this.draw();
    };
    draw() {
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(() => this.render());
    }
    render() {
      const gl = this.gl;
      const dpr = window.devicePixelRatio || 1;
      const w3 = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
      const h3 = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));
      if (this.canvas.width !== w3 || this.canvas.height !== h3) {
        this.canvas.width = w3;
        this.canvas.height = h3;
      }
      gl.viewport(0, 0, w3, h3);
      gl.clearColor(0.09, 0.1, 0.12, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      if (!this.count) return;
      const cp = Math.cos(this.pitch);
      const eye = [
        this.target[0] + this.dist * cp * Math.cos(this.yaw),
        this.target[1] + this.dist * cp * Math.sin(this.yaw),
        this.target[2] + this.dist * Math.sin(this.pitch)
      ];
      const view = lookAt(eye, this.target, [0, 0, 1]);
      const proj = perspective(Math.PI / 4, w3 / h3, this.dist / 100, this.dist * 20);
      gl.useProgram(this.prog);
      gl.uniformMatrix4fv(gl.getUniformLocation(this.prog, "uMvp"), false, mul(proj, view));
      gl.uniformMatrix4fv(gl.getUniformLocation(this.prog, "uView"), false, view);
      gl.uniform2f(gl.getUniformLocation(this.prog, "uZRange"), this.zRange[0], this.zRange[1]);
      gl.bindVertexArray(this.vao);
      gl.drawArrays(gl.TRIANGLES, 0, this.count);
    }
    dispose() {
      cancelAnimationFrame(this.raf);
      this.ro.disconnect();
    }
  };

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
  var f3 = /* @__PURE__ */ Symbol.for("pv");
  var o3 = 0;
  function a3(t3, e3, n2, u3, a4, i3) {
    e3 || (e3 = {});
    var c3, l3, p3 = e3;
    if ("ref" in p3 && "function" != typeof t3) for (l3 in p3 = {}, e3) "ref" == l3 ? c3 = e3[l3] : p3[l3] = e3[l3];
    var s3 = { type: t3, props: p3, key: n2, ref: c3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: f3, __v: --o3, __i: -1, __u: 0 };
    return (a4 || i3) && (s3.__source = a4, s3.__self = i3), n.vnode && n.vnode(s3), s3;
  }

  // src/app.tsx
  var STORAGE_KEY = "pvc:state:v1";
  var TIMEOUT_MS = 15e3;
  var DEFAULTS = { code: DEFAULT_CODE, zMin: "0", zMax: "100", zStep: "1", thetaStep: "5" };
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p3 = JSON.parse(raw);
        const pick = (k2) => typeof p3[k2] === "string" ? p3[k2] : DEFAULTS[k2];
        return { code: pick("code"), zMin: pick("zMin"), zMax: pick("zMax"), zStep: pick("zStep"), thetaStep: pick("thetaStep") };
      }
    } catch {
    }
    return DEFAULTS;
  }
  function toParams(s3) {
    return { zMin: parseFloat(s3.zMin), zMax: parseFloat(s3.zMax), zStep: parseFloat(s3.zStep), thetaStepDeg: parseFloat(s3.thetaStep) };
  }
  function App() {
    const [state, setState] = d2(loadState);
    const [error, setError] = d2();
    const [info, setInfo] = d2("");
    const canvasRef = T2(null);
    const viewerRef = T2(null);
    const meshRef = T2(null);
    const workerRef = T2(null);
    const [busy, setBusy] = d2(false);
    const [glError, setGlError] = d2();
    A2(() => {
      try {
        viewerRef.current = new Viewer(canvasRef.current);
      } catch (e3) {
        setGlError(e3 instanceof Error ? e3.message : String(e3));
      }
      return () => {
        viewerRef.current?.dispose();
        workerRef.current?.terminate();
      };
    }, []);
    A2(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
      }
      const handle = setTimeout(() => {
        const params = toParams(state);
        const paramError = validateParams(params);
        if (paramError) {
          setError(paramError);
          return;
        }
        workerRef.current?.terminate();
        const worker = new Worker("worker.js");
        workerRef.current = worker;
        setBusy(true);
        const timeout = setTimeout(() => {
          worker.terminate();
          setBusy(false);
          setError(`Timed out after ${TIMEOUT_MS / 1e3}s. Check your code for infinite loops or use larger steps.`);
        }, TIMEOUT_MS);
        worker.onmessage = (e3) => {
          clearTimeout(timeout);
          worker.terminate();
          setBusy(false);
          if ("error" in e3.data) {
            setError(e3.data.error);
            return;
          }
          const mesh = e3.data.mesh;
          const first = meshRef.current === null;
          meshRef.current = mesh;
          viewerRef.current?.setMesh(mesh, first);
          setError(void 0);
          setInfo(`${layerHeights(params).length} layers \xD7 ${thetaCount(params)} angles \xB7 ${mesh.triangleCount.toLocaleString()} triangles`);
        };
        worker.onerror = (e3) => {
          clearTimeout(timeout);
          setBusy(false);
          setError(`Worker failed: ${e3.message}`);
        };
        worker.postMessage({ code: state.code, params });
      }, 300);
      return () => {
        clearTimeout(handle);
      };
    }, [state]);
    const set = (k2) => (e3) => {
      const v3 = e3.target.value;
      setState((s3) => ({ ...s3, [k2]: v3 }));
    };
    const exportStl = () => {
      if (!meshRef.current) return;
      const url = URL.createObjectURL(new Blob([meshToStl(meshRef.current)], { type: "model/stl" }));
      const a4 = document.createElement("a");
      a4.href = url;
      a4.download = "vase.stl";
      a4.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
    };
    const field = (k2, label, step) => /* @__PURE__ */ a3("label", { class: "field", children: [
      /* @__PURE__ */ a3("span", { children: label }),
      /* @__PURE__ */ a3("input", { type: "number", step, value: state[k2], onInput: set(k2) })
    ] });
    const stale = w2(() => error !== void 0 && meshRef.current !== null, [error]);
    return /* @__PURE__ */ a3("div", { class: "layout", children: [
      /* @__PURE__ */ a3("header", { class: "topbar", children: [
        /* @__PURE__ */ a3("h1", { children: [
          "PVC ",
          /* @__PURE__ */ a3("small", { children: "Parametric Vase Creator" })
        ] }),
        /* @__PURE__ */ a3("button", { class: "primary", onClick: exportStl, disabled: !meshRef.current, children: "Export STL" })
      ] }),
      /* @__PURE__ */ a3("main", { class: "main", children: [
        /* @__PURE__ */ a3("section", { class: "panel", children: [
          /* @__PURE__ */ a3("div", { class: "fields", children: [
            field("zMin", "Z min (mm)", "any"),
            field("zMax", "Z max (mm)", "any"),
            field("zStep", "Z step (mm)", "any"),
            field("thetaStep", "Theta step (\xB0)", "any")
          ] }),
          /* @__PURE__ */ a3(
            "textarea",
            {
              class: "code",
              spellcheck: false,
              value: state.code,
              onInput: set("code"),
              "aria-label": "Vase function JavaScript"
            }
          ),
          /* @__PURE__ */ a3("div", { class: "actions", children: [
            /* @__PURE__ */ a3("button", { onClick: () => setState(DEFAULTS), children: "Reset to example" }),
            /* @__PURE__ */ a3("span", { class: "info", children: [
              busy ? "Computing\u2026 " : "",
              info
            ] })
          ] }),
          error && /* @__PURE__ */ a3("pre", { class: "error", role: "alert", children: [
            error,
            stale ? "\n(Preview shows the last valid shape.)" : ""
          ] })
        ] }),
        /* @__PURE__ */ a3("section", { class: "preview", children: [
          /* @__PURE__ */ a3("canvas", { ref: canvasRef }),
          glError && /* @__PURE__ */ a3("div", { class: "gl-error", children: glError }),
          /* @__PURE__ */ a3("div", { class: "hint", children: "Drag to orbit \xB7 right-drag or Shift-drag to pan \xB7 scroll to zoom" })
        ] })
      ] }),
      /* @__PURE__ */ a3("footer", { class: "app-footer", children: [
        /* @__PURE__ */ a3("span", { children: [
          "A vibe-coded micro-app via ",
          /* @__PURE__ */ a3("a", { href: "https://searyanc.dev", target: "_blank", rel: "noopener noreferrer", children: "SeaRyanC" })
        ] }),
        /* @__PURE__ */ a3("a", { class: "github-link", href: "https://github.com/SeaRyanC/app/tree/main/pvc", target: "_blank", rel: "noopener noreferrer", title: "View source on GitHub", "aria-label": "View source on GitHub", children: /* @__PURE__ */ a3("svg", { viewBox: "0 0 16 16", width: "16", height: "16", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ a3("path", { d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" }) }) }),
        /* @__PURE__ */ a3("span", { class: "version", children: [
          "v",
          "1.1.0",
          "+",
          "cab50d4"
        ] })
      ] })
    ] });
  }

  // src/index.tsx
  Q(/* @__PURE__ */ a3(App, {}), document.getElementById("app"));
})();
//# sourceMappingURL=app.js.map
