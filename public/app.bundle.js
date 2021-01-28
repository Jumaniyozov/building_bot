var AdminBro = function (e, t, r, a, n, o, l, s, c, i, u, d, p, f) {
    "use strict";

    function m(e) {
        return e && "object" == typeof e && "default" in e ? e : {default: e}
    }

    function h(e) {
        if (e && e.__esModule) return e;
        var t = Object.create(null);
        return e && Object.keys(e).forEach((function (r) {
            if ("default" !== r) {
                var a = Object.getOwnPropertyDescriptor(e, r);
                Object.defineProperty(t, r, a.get ? a : {
                    enumerable: !0, get: function () {
                        return e[r]
                    }
                })
            }
        })), t.default = e, Object.freeze(t)
    }

    var g = m(e), E = m(a), y = m(o), v = h(l), b = m(c), w = m(u), x = m(d),
        I = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function S(e, t, r) {
        return e(r = {
            path: t, exports: {}, require: function (e, t) {
                return function () {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                }(null == t && r.path)
            }
        }, r.exports), r.exports
    }

    var C = S((function (e) {
        var t = function (e) {
            var t = Object.prototype, r = t.hasOwnProperty, a = "function" == typeof Symbol ? Symbol : {},
                n = a.iterator || "@@iterator", o = a.asyncIterator || "@@asyncIterator",
                l = a.toStringTag || "@@toStringTag";

            function s(e, t, r) {
                return Object.defineProperty(e, t, {value: r, enumerable: !0, configurable: !0, writable: !0}), e[t]
            }

            try {
                s({}, "")
            } catch (e) {
                s = function (e, t, r) {
                    return e[t] = r
                }
            }

            function c(e, t, r, a) {
                var n = t && t.prototype instanceof d ? t : d, o = Object.create(n.prototype), l = new I(a || []);
                return o._invoke = function (e, t, r) {
                    var a = "suspendedStart";
                    return function (n, o) {
                        if ("executing" === a) throw new Error("Generator is already running");
                        if ("completed" === a) {
                            if ("throw" === n) throw o;
                            return C()
                        }
                        for (r.method = n, r.arg = o; ;) {
                            var l = r.delegate;
                            if (l) {
                                var s = b(l, r);
                                if (s) {
                                    if (s === u) continue;
                                    return s
                                }
                            }
                            if ("next" === r.method) r.sent = r._sent = r.arg; else if ("throw" === r.method) {
                                if ("suspendedStart" === a) throw a = "completed", r.arg;
                                r.dispatchException(r.arg)
                            } else "return" === r.method && r.abrupt("return", r.arg);
                            a = "executing";
                            var c = i(e, t, r);
                            if ("normal" === c.type) {
                                if (a = r.done ? "completed" : "suspendedYield", c.arg === u) continue;
                                return {value: c.arg, done: r.done}
                            }
                            "throw" === c.type && (a = "completed", r.method = "throw", r.arg = c.arg)
                        }
                    }
                }(e, r, l), o
            }

            function i(e, t, r) {
                try {
                    return {type: "normal", arg: e.call(t, r)}
                } catch (e) {
                    return {type: "throw", arg: e}
                }
            }

            e.wrap = c;
            var u = {};

            function d() {
            }

            function p() {
            }

            function f() {
            }

            var m = {};
            m[n] = function () {
                return this
            };
            var h = Object.getPrototypeOf, g = h && h(h(S([])));
            g && g !== t && r.call(g, n) && (m = g);
            var E = f.prototype = d.prototype = Object.create(m);

            function y(e) {
                ["next", "throw", "return"].forEach((function (t) {
                    s(e, t, (function (e) {
                        return this._invoke(t, e)
                    }))
                }))
            }

            function v(e, t) {
                var a;
                this._invoke = function (n, o) {
                    function l() {
                        return new t((function (a, l) {
                            !function a(n, o, l, s) {
                                var c = i(e[n], e, o);
                                if ("throw" !== c.type) {
                                    var u = c.arg, d = u.value;
                                    return d && "object" == typeof d && r.call(d, "__await") ? t.resolve(d.__await).then((function (e) {
                                        a("next", e, l, s)
                                    }), (function (e) {
                                        a("throw", e, l, s)
                                    })) : t.resolve(d).then((function (e) {
                                        u.value = e, l(u)
                                    }), (function (e) {
                                        return a("throw", e, l, s)
                                    }))
                                }
                                s(c.arg)
                            }(n, o, a, l)
                        }))
                    }

                    return a = a ? a.then(l, l) : l()
                }
            }

            function b(e, t) {
                var r = e.iterator[t.method];
                if (void 0 === r) {
                    if (t.delegate = null, "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return", t.arg = void 0, b(e, t), "throw" === t.method)) return u;
                        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return u
                }
                var a = i(r, e.iterator, t.arg);
                if ("throw" === a.type) return t.method = "throw", t.arg = a.arg, t.delegate = null, u;
                var n = a.arg;
                return n ? n.done ? (t[e.resultName] = n.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, u) : n : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, u)
            }

            function w(e) {
                var t = {tryLoc: e[0]};
                1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
            }

            function x(e) {
                var t = e.completion || {};
                t.type = "normal", delete t.arg, e.completion = t
            }

            function I(e) {
                this.tryEntries = [{tryLoc: "root"}], e.forEach(w, this), this.reset(!0)
            }

            function S(e) {
                if (e) {
                    var t = e[n];
                    if (t) return t.call(e);
                    if ("function" == typeof e.next) return e;
                    if (!isNaN(e.length)) {
                        var a = -1, o = function t() {
                            for (; ++a < e.length;) if (r.call(e, a)) return t.value = e[a], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t
                        };
                        return o.next = o
                    }
                }
                return {next: C}
            }

            function C() {
                return {value: void 0, done: !0}
            }

            return p.prototype = E.constructor = f, f.constructor = p, p.displayName = s(f, l, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === p || "GeneratorFunction" === (t.displayName || t.name))
            }, e.mark = function (e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, f) : (e.__proto__ = f, s(e, l, "GeneratorFunction")), e.prototype = Object.create(E), e
            }, e.awrap = function (e) {
                return {__await: e}
            }, y(v.prototype), v.prototype[o] = function () {
                return this
            }, e.AsyncIterator = v, e.async = function (t, r, a, n, o) {
                void 0 === o && (o = Promise);
                var l = new v(c(t, r, a, n), o);
                return e.isGeneratorFunction(r) ? l : l.next().then((function (e) {
                    return e.done ? e.value : l.next()
                }))
            }, y(E), s(E, l, "Generator"), E[n] = function () {
                return this
            }, E.toString = function () {
                return "[object Generator]"
            }, e.keys = function (e) {
                var t = [];
                for (var r in e) t.push(r);
                return t.reverse(), function r() {
                    for (; t.length;) {
                        var a = t.pop();
                        if (a in e) return r.value = a, r.done = !1, r
                    }
                    return r.done = !0, r
                }
            }, e.values = S, I.prototype = {
                constructor: I, reset: function (e) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(x), !e) for (var t in this) "t" === t.charAt(0) && r.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                }, stop: function () {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval
                }, dispatchException: function (e) {
                    if (this.done) throw e;
                    var t = this;

                    function a(r, a) {
                        return l.type = "throw", l.arg = e, t.next = r, a && (t.method = "next", t.arg = void 0), !!a
                    }

                    for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                        var o = this.tryEntries[n], l = o.completion;
                        if ("root" === o.tryLoc) return a("end");
                        if (o.tryLoc <= this.prev) {
                            var s = r.call(o, "catchLoc"), c = r.call(o, "finallyLoc");
                            if (s && c) {
                                if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                                if (this.prev < o.finallyLoc) return a(o.finallyLoc)
                            } else if (s) {
                                if (this.prev < o.catchLoc) return a(o.catchLoc, !0)
                            } else {
                                if (!c) throw new Error("try statement without catch or finally");
                                if (this.prev < o.finallyLoc) return a(o.finallyLoc)
                            }
                        }
                    }
                }, abrupt: function (e, t) {
                    for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                        var n = this.tryEntries[a];
                        if (n.tryLoc <= this.prev && r.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                            var o = n;
                            break
                        }
                    }
                    o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                    var l = o ? o.completion : {};
                    return l.type = e, l.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, u) : this.complete(l)
                }, complete: function (e, t) {
                    if ("throw" === e.type) throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), u
                }, finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t];
                        if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), x(r), u
                    }
                }, catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var r = this.tryEntries[t];
                        if (r.tryLoc === e) {
                            var a = r.completion;
                            if ("throw" === a.type) {
                                var n = a.arg;
                                x(r)
                            }
                            return n
                        }
                    }
                    throw new Error("illegal catch attempt")
                }, delegateYield: function (e, t, r) {
                    return this.delegate = {
                        iterator: S(e),
                        resultName: t,
                        nextLoc: r
                    }, "next" === this.method && (this.arg = void 0), u
                }
            }, e
        }(e.exports);
        try {
            regeneratorRuntime = t
        } catch (e) {
            Function("r", "regeneratorRuntime = r")(t)
        }
    }));
    let A = {};
    try {
        A = window
    } catch (e) {
        if ("window is not defined" !== e.message) throw e
    }
    const R = new Date;

    class _ {
        constructor({options: e} = {}) {
            let t = _.getPaths(e);
            t = t || {rootPath: "/admin"}, this.options = t
        }

        static getPaths(e) {
            var t;
            return e || (null === (t = A.REDUX_STATE) || void 0 === t ? void 0 : t.paths)
        }

        urlBuilder(e = [], t = "") {
            const r = new RegExp("/{1,}", "g");
            let {rootPath: a} = this.options;
            a.startsWith("/") || (a = "/" + a);
            return `${[a, ...e].join("/").replace(r, "/")}${t}`
        }

        loginUrl() {
            return this.options.loginPath
        }

        logoutUrl() {
            return this.options.logoutPath
        }

        dashboardUrl() {
            return this.options.rootPath
        }

        pageUrl(e) {
            return this.urlBuilder(["pages", e])
        }

        editUrl(e, t, r) {
            return this.recordActionUrl({resourceId: e, recordId: t, actionName: "edit", search: r})
        }

        showUrl(e, t, r) {
            return this.recordActionUrl({resourceId: e, recordId: t, actionName: "show", search: r})
        }

        deleteUrl(e, t, r) {
            return this.recordActionUrl({resourceId: e, recordId: t, actionName: "delete", search: r})
        }

        newUrl(e, t) {
            return this.resourceActionUrl({resourceId: e, actionName: "new", search: t})
        }

        listUrl(e, t) {
            return this.resourceActionUrl({resourceId: e, actionName: "list", search: t})
        }

        bulkDeleteUrl(e, t, r) {
            return this.bulkActionUrl({resourceId: e, recordIds: t, actionName: "bulkDelete", search: r})
        }

        resourceActionUrl({resourceId: e, actionName: t, search: r}) {
            return this.urlBuilder(["resources", e, "actions", t], r)
        }

        resourceUrl({resourceId: e, search: t}) {
            return this.urlBuilder(["resources", e], t)
        }

        recordActionUrl({resourceId: e, recordId: t, actionName: r, search: a}) {
            return this.urlBuilder(["resources", e, "records", t, r], a)
        }

        bulkActionUrl({resourceId: e, recordIds: t, actionName: r, search: a}) {
            const n = this.urlBuilder(["resources", e, "bulk", r]);
            if (t && t.length) {
                const e = new URLSearchParams(a);
                return e.set("recordIds", t.join(",")), `${n}?${e.toString()}`
            }
            return `${n}${a || ""}`
        }

        assetPath(e) {
            if (this.options.assetsCDN) {
                return `${new URL(e, this.options.assetsCDN).href}?date=${R.getTime()}`
            }
            return this.urlBuilder(["frontend", "assets", e])
        }
    }

    var P = S((function (e) {
        function t() {
            return e.exports = t = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
                }
                return e
            }, t.apply(this, arguments)
        }

        e.exports = t
    }));

    function k(e, t) {
        if ("undefined" == typeof window) return e;
        return r => {
            let a = window;
            a = window;
            let n = e;
            return a.AdminBro && a.AdminBro.UserComponents && a.AdminBro.UserComponents[t] ? (n = a.AdminBro.UserComponents[t], g.default.createElement(n, P({}, r, {OriginalComponent: e}))) : g.default.createElement(n, r)
        }
    }

    const B = E.default(r.Link).withConfig({
            displayName: "sidebar-branding__StyledLogo",
            componentId: "sc-1ozeetj-0"
        })(["text-align:center;display:flex;align-content:center;justify-content:center;flex-shrink:0;padding:", " ", " ", ";text-decoration:none;& > h1{text-decoration:none;font-weight:", ";font-size:", ";color:", ";font-size:", ";line-height:", ";}& > img{max-width:170px;}&:hover h1{color:", ";}"], l.themeGet("space", "lg"), l.themeGet("space", "xxl"), l.themeGet("space", "xxl"), l.themeGet("fontWeights", "bolder"), l.themeGet("fontWeights", "bolder"), l.themeGet("colors", "grey80"), l.themeGet("fontSizes", "xl"), l.themeGet("lineHeights", "xl"), l.themeGet("colors", "primary100")),
        N = new _;
    var T = k(e => {
        const {branding: t} = e, {logo: r, companyName: a} = t;
        return g.default.createElement(B, {
            className: l.cssClass("Logo"),
            to: N.dashboardUrl()
        }, r ? g.default.createElement("img", {src: r, alt: a}) : g.default.createElement("h1", null, a))
    }, "SidebarBranding");
    var L = function (e, t, r, a) {
        var n = -1, o = null == e ? 0 : e.length;
        for (a && o && (r = e[++n]); ++n < o;) r = t(r, e[n], n, e);
        return r
    };
    var O = function (e) {
            return function (t) {
                return null == e ? void 0 : e[t]
            }
        }({
            "À": "A",
            "Á": "A",
            "Â": "A",
            "Ã": "A",
            "Ä": "A",
            "Å": "A",
            "à": "a",
            "á": "a",
            "â": "a",
            "ã": "a",
            "ä": "a",
            "å": "a",
            "Ç": "C",
            "ç": "c",
            "Ð": "D",
            "ð": "d",
            "È": "E",
            "É": "E",
            "Ê": "E",
            "Ë": "E",
            "è": "e",
            "é": "e",
            "ê": "e",
            "ë": "e",
            "Ì": "I",
            "Í": "I",
            "Î": "I",
            "Ï": "I",
            "ì": "i",
            "í": "i",
            "î": "i",
            "ï": "i",
            "Ñ": "N",
            "ñ": "n",
            "Ò": "O",
            "Ó": "O",
            "Ô": "O",
            "Õ": "O",
            "Ö": "O",
            "Ø": "O",
            "ò": "o",
            "ó": "o",
            "ô": "o",
            "õ": "o",
            "ö": "o",
            "ø": "o",
            "Ù": "U",
            "Ú": "U",
            "Û": "U",
            "Ü": "U",
            "ù": "u",
            "ú": "u",
            "û": "u",
            "ü": "u",
            "Ý": "Y",
            "ý": "y",
            "ÿ": "y",
            "Æ": "Ae",
            "æ": "ae",
            "Þ": "Th",
            "þ": "th",
            "ß": "ss",
            "Ā": "A",
            "Ă": "A",
            "Ą": "A",
            "ā": "a",
            "ă": "a",
            "ą": "a",
            "Ć": "C",
            "Ĉ": "C",
            "Ċ": "C",
            "Č": "C",
            "ć": "c",
            "ĉ": "c",
            "ċ": "c",
            "č": "c",
            "Ď": "D",
            "Đ": "D",
            "ď": "d",
            "đ": "d",
            "Ē": "E",
            "Ĕ": "E",
            "Ė": "E",
            "Ę": "E",
            "Ě": "E",
            "ē": "e",
            "ĕ": "e",
            "ė": "e",
            "ę": "e",
            "ě": "e",
            "Ĝ": "G",
            "Ğ": "G",
            "Ġ": "G",
            "Ģ": "G",
            "ĝ": "g",
            "ğ": "g",
            "ġ": "g",
            "ģ": "g",
            "Ĥ": "H",
            "Ħ": "H",
            "ĥ": "h",
            "ħ": "h",
            "Ĩ": "I",
            "Ī": "I",
            "Ĭ": "I",
            "Į": "I",
            "İ": "I",
            "ĩ": "i",
            "ī": "i",
            "ĭ": "i",
            "į": "i",
            "ı": "i",
            "Ĵ": "J",
            "ĵ": "j",
            "Ķ": "K",
            "ķ": "k",
            "ĸ": "k",
            "Ĺ": "L",
            "Ļ": "L",
            "Ľ": "L",
            "Ŀ": "L",
            "Ł": "L",
            "ĺ": "l",
            "ļ": "l",
            "ľ": "l",
            "ŀ": "l",
            "ł": "l",
            "Ń": "N",
            "Ņ": "N",
            "Ň": "N",
            "Ŋ": "N",
            "ń": "n",
            "ņ": "n",
            "ň": "n",
            "ŋ": "n",
            "Ō": "O",
            "Ŏ": "O",
            "Ő": "O",
            "ō": "o",
            "ŏ": "o",
            "ő": "o",
            "Ŕ": "R",
            "Ŗ": "R",
            "Ř": "R",
            "ŕ": "r",
            "ŗ": "r",
            "ř": "r",
            "Ś": "S",
            "Ŝ": "S",
            "Ş": "S",
            "Š": "S",
            "ś": "s",
            "ŝ": "s",
            "ş": "s",
            "š": "s",
            "Ţ": "T",
            "Ť": "T",
            "Ŧ": "T",
            "ţ": "t",
            "ť": "t",
            "ŧ": "t",
            "Ũ": "U",
            "Ū": "U",
            "Ŭ": "U",
            "Ů": "U",
            "Ű": "U",
            "Ų": "U",
            "ũ": "u",
            "ū": "u",
            "ŭ": "u",
            "ů": "u",
            "ű": "u",
            "ų": "u",
            "Ŵ": "W",
            "ŵ": "w",
            "Ŷ": "Y",
            "ŷ": "y",
            "Ÿ": "Y",
            "Ź": "Z",
            "Ż": "Z",
            "Ž": "Z",
            "ź": "z",
            "ż": "z",
            "ž": "z",
            "Ĳ": "IJ",
            "ĳ": "ij",
            "Œ": "Oe",
            "œ": "oe",
            "ŉ": "'n",
            "ſ": "s"
        }), D = "object" == typeof I && I && I.Object === Object && I,
        U = "object" == typeof self && self && self.Object === Object && self,
        j = (D || U || Function("return this")()).Symbol;
    var M = function (e, t) {
        for (var r = -1, a = null == e ? 0 : e.length, n = Array(a); ++r < a;) n[r] = t(e[r], r, e);
        return n
    }, F = Array.isArray, G = Object.prototype, z = G.hasOwnProperty, H = G.toString, V = j ? j.toStringTag : void 0;
    var $ = function (e) {
        var t = z.call(e, V), r = e[V];
        try {
            e[V] = void 0;
            var a = !0
        } catch (e) {
        }
        var n = H.call(e);
        return a && (t ? e[V] = r : delete e[V]), n
    }, Y = Object.prototype.toString;
    var Z = function (e) {
        return Y.call(e)
    }, q = j ? j.toStringTag : void 0;
    var W = function (e) {
        return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : q && q in Object(e) ? $(e) : Z(e)
    };
    var J = function (e) {
        return null != e && "object" == typeof e
    };
    var K = function (e) {
        return "symbol" == typeof e || J(e) && "[object Symbol]" == W(e)
    }, X = j ? j.prototype : void 0, Q = X ? X.toString : void 0;
    var ee = function e(t) {
        if ("string" == typeof t) return t;
        if (F(t)) return M(t, e) + "";
        if (K(t)) return Q ? Q.call(t) : "";
        var r = t + "";
        return "0" == r && 1 / t == -1 / 0 ? "-0" : r
    };
    var te = function (e) {
            return null == e ? "" : ee(e)
        }, re = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
        ae = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g");
    var ne = function (e) {
        return (e = te(e)) && e.replace(re, O).replace(ae, "")
    }, oe = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var le = function (e) {
        return e.match(oe) || []
    }, se = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var ce = function (e) {
            return se.test(e)
        },
        ie = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
        ue = "[" + ie + "]", de = "\\d+", pe = "[\\u2700-\\u27bf]", fe = "[a-z\\xdf-\\xf6\\xf8-\\xff]",
        me = "[^\\ud800-\\udfff" + ie + de + "\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",
        he = "(?:\\ud83c[\\udde6-\\uddff]){2}", ge = "[\\ud800-\\udbff][\\udc00-\\udfff]",
        Ee = "[A-Z\\xc0-\\xd6\\xd8-\\xde]", ye = "(?:" + fe + "|" + me + ")", ve = "(?:" + Ee + "|" + me + ")",
        be = "(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",
        we = "[\\ufe0e\\ufe0f]?" + be + ("(?:\\u200d(?:" + ["[^\\ud800-\\udfff]", he, ge].join("|") + ")[\\ufe0e\\ufe0f]?" + be + ")*"),
        xe = "(?:" + [pe, he, ge].join("|") + ")" + we,
        Ie = RegExp([Ee + "?" + fe + "+(?:['’](?:d|ll|m|re|s|t|ve))?(?=" + [ue, Ee, "$"].join("|") + ")", ve + "+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=" + [ue, Ee + ye, "$"].join("|") + ")", Ee + "?" + ye + "+(?:['’](?:d|ll|m|re|s|t|ve))?", Ee + "+(?:['’](?:D|LL|M|RE|S|T|VE))?", "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", de, xe].join("|"), "g");
    var Se = function (e) {
        return e.match(Ie) || []
    };
    var Ce = function (e, t, r) {
        return e = te(e), void 0 === (t = r ? void 0 : t) ? ce(e) ? Se(e) : le(e) : e.match(t) || []
    }, Ae = RegExp("['’]", "g");
    var Re = function (e) {
        return function (t) {
            return L(Ce(ne(t).replace(Ae, "")), e, "")
        }
    };
    var _e = function (e, t, r) {
        var a = -1, n = e.length;
        t < 0 && (t = -t > n ? 0 : n + t), (r = r > n ? n : r) < 0 && (r += n), n = t > r ? 0 : r - t >>> 0, t >>>= 0;
        for (var o = Array(n); ++a < n;) o[a] = e[a + t];
        return o
    };
    var Pe = function (e, t, r) {
        var a = e.length;
        return r = void 0 === r ? a : r, !t && r >= a ? e : _e(e, t, r)
    }, ke = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
    var Be = function (e) {
        return ke.test(e)
    };
    var Ne = function (e) {
            return e.split("")
        }, Te = "[\\ud800-\\udfff]", Le = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
        Oe = "\\ud83c[\\udffb-\\udfff]", De = "[^\\ud800-\\udfff]", Ue = "(?:\\ud83c[\\udde6-\\uddff]){2}",
        je = "[\\ud800-\\udbff][\\udc00-\\udfff]", Me = "(?:" + Le + "|" + Oe + ")" + "?",
        Fe = "[\\ufe0e\\ufe0f]?" + Me + ("(?:\\u200d(?:" + [De, Ue, je].join("|") + ")[\\ufe0e\\ufe0f]?" + Me + ")*"),
        Ge = "(?:" + [De + Le + "?", Le, Ue, je, Te].join("|") + ")",
        ze = RegExp(Oe + "(?=" + Oe + ")|" + Ge + Fe, "g");
    var He = function (e) {
        return e.match(ze) || []
    };
    var Ve = function (e) {
        return Be(e) ? He(e) : Ne(e)
    };
    var $e = function (e) {
        return function (t) {
            t = te(t);
            var r = Be(t) ? Ve(t) : void 0, a = r ? r[0] : t.charAt(0), n = r ? Pe(r, 1).join("") : t.slice(1);
            return a[e]() + n
        }
    }("toUpperCase"), Ye = Re((function (e, t, r) {
        return e + (r ? " " : "") + $e(t)
    }));
    const Ze = (e, t, r, a, n) => {
        var o;
        const l = ("string" == typeof a ? n : a) || {}, s = (e => e.split(".").join("&#46;"))(r);
        let c = [`${t}.${s}`];
        return a && (c = [`resources.${a}.${t}.${s}`, ...c]), e.exists(c) ? e.t(c, l) : null !== (o = l.defaultValue) && void 0 !== o ? o : Ye(r)
    }, qe = () => {
        const {i18n: e, ...t} = n.useTranslation();
        return {
            ...t, i18n: e, ...(e => {
                const t = (t, r, a) => Ze(e, "actions", t, r, a), r = (t, r, a) => Ze(e, "buttons", t, r, a),
                    a = (t, r, a) => Ze(e, "labels", t, r, a), n = (t, r, a) => Ze(e, "properties", t, r, a),
                    o = (t, r, a) => Ze(e, "messages", t, r, a);
                return {
                    translateAction: t,
                    ta: t,
                    translateButton: r,
                    tb: r,
                    translateLabel: a,
                    tl: a,
                    translateProperty: n,
                    tp: n,
                    translateMessage: o,
                    tm: o,
                    t: e.t,
                    translate: e.t
                }
            })(e)
        }
    }, We = new _, Je = e => {
        const {pages: t} = e, {translateLabel: r} = qe(), a = s.useLocation(), n = s.useHistory();
        if (!t || !t.length) return g.default.createElement(g.default.Fragment, null);
        const o = e => !!a.pathname.match("/pages/" + e.name), c = t.map(e => ({
            id: e.name,
            label: e.name,
            isSelected: o(e),
            icon: e.icon,
            href: We.pageUrl(e.name),
            onClick: (e, t) => {
                e.preventDefault(), t.href && n.push(t.href)
            }
        }));
        return g.default.createElement(l.Navigation, {label: r("pages"), elements: c})
    };
    var Ke = k(() => g.default.createElement(l.Box, {mt: "lg"}, g.default.createElement(l.SoftwareBrothers, null)), "SidebarFooter");
    let Xe = {};
    try {
        Xe = window
    } catch (e) {
        if ("window is not defined" !== e.message) throw e;
        Xe = {isOnServer: !0}
    }
    const Qe = e => {
        if (Xe.isOnServer) return;
        const t = [Xe.location.origin, Xe.REDUX_STATE.paths.loginPath].join("");
        e.request.responseURL && e.request.responseURL.match(t) && (alert("Your session expired. You will be redirected to login screen"), Xe.location.assign(t))
    };

    class et {
        constructor() {
            this.baseURL = et.getBaseUrl(), this.client = b.default.create({baseURL: this.baseURL})
        }

        static getBaseUrl() {
            var e;
            return Xe.isOnServer ? "" : [Xe.location.origin, null === (e = Xe.REDUX_STATE) || void 0 === e ? void 0 : e.paths.rootPath].join("")
        }

        async searchRecords({resourceId: e, query: t}) {
            if (Xe.isOnServer) return [];
            const r = await this.resourceAction({resourceId: e, actionName: "search", query: t});
            return Qe(r), r.data.records
        }

        async resourceAction(e) {
            const {resourceId: t, actionName: r, data: a, query: n, ...o} = e;
            let l = `/api/resources/${t}/actions/${r}`;
            if (n) {
                l = [l, encodeURIComponent(n)].join("/")
            }
            const s = await this.client.request({url: l, method: a ? "POST" : "GET", ...o, data: a});
            return Qe(s), s
        }

        async recordAction(e) {
            const {resourceId: t, recordId: r, actionName: a, data: n, ...o} = e, l = await this.client.request({
                url: `/api/resources/${t}/records/${r}/${a}`,
                method: n ? "POST" : "GET", ...o,
                data: n
            });
            return Qe(l), l
        }

        async bulkAction(e) {
            const {resourceId: t, recordIds: r, actionName: a, data: n, ...o} = e, l = new URLSearchParams;
            l.set("recordIds", (r || []).join(","));
            const s = await this.client.request({
                url: `/api/resources/${t}/bulk/${a}`,
                method: n ? "POST" : "GET", ...o,
                data: n,
                params: l
            });
            return Qe(s), s
        }

        async getDashboard(e = {}) {
            const t = await this.client.get("/api/dashboard", e);
            return Qe(t), t
        }

        async getPage(e) {
            const {pageName: t, ...r} = e, a = await this.client.request({url: "/api/pages/" + t, ...r});
            return Qe(a), a
        }
    }

    function tt(e) {
        const t = new FormData;
        return Object.entries(e).forEach(([e, r]) => null === r ? t.set(e, "__FORM_VALUE_NULL__") : (e => "object" == typeof e && e.constructor !== File && !(e instanceof Date))(r) ? Array.isArray(r) ? t.set(e, "__FORM_VALUE_EMPTY_ARRAY__") : t.set(e, "__FORM_VALUE_EMPTY_OBJECT__") : t.set(e, r)), t
    }

    const rt = (e = {message: ""}) => ({
        type: "ADD_NOTICE",
        data: {message: e.message, id: Math.random().toString(36).substr(2, 9), type: e.type || "success", progress: 0}
    }), at = () => {
        const e = t.useDispatch();
        return t => e(rt(t))
    }, nt = (e, t) => ({
        ...t.record || e,
        errors: t.record.errors,
        populated: {...e.populated, ...t.record.populated},
        params: {...e.params, ...t.record.params}
    }), ot = (e, t) => {
        const r = new RegExp("\\.", "g"),
            a = (null == t ? void 0 : t.includeAllSiblings) ? e.replace(r, "(\\.|\\.\\d+\\.)") : e.replace(r, "\\.");
        return new RegExp(`^${a}($|\\.)`, "")
    }, lt = (e, t, r) => (Array.isArray(t) ? t : [t]).filter(e => !!e).reduce((t, a) => {
        const n = ot(a, r);
        return {...t, ...Object.keys(e).filter(e => e.match(n)).reduce((t, r) => (t[r] = e[r], t), {})}
    }, {}), st = (e, t) => (Array.isArray(t) ? t : [t]).filter(e => !!e).reduce((t, r) => {
        const a = ot(r);
        return Object.keys(t).filter(e => !e.match(a)).reduce((t, r) => (t[r] = e[r], t), {})
    }, e), ct = (e, t = {}) => {
        let r = e.split(".");
        return t.skipArrayIndexes && (r = r.filter(e => isNaN(+e))), r.reduce((e, t) => e.length ? [...e, [e[e.length - 1], t].join(".")] : [t], [])
    }, it = (e = {}, t, r) => {
        const a = ot(t), n = Object.keys(e).filter(e => !e.match(a)).reduce((t, r) => (t[r] = e[r], t), {});
        if (void 0 !== r) {
            if (!(e => "undefined" == typeof File ? "object" == typeof e && null !== e : "object" == typeof e && !(e instanceof File) && null !== e)(r) || r instanceof Date) n[t] = r; else {
                const e = i.flatten(r);
                Object.keys(e).length ? Object.keys(e).forEach(r => {
                    n[`${t}.${r}`] = e[r]
                }) : Array.isArray(r) ? n[t] = [] : n[t] = {}
            }
            const e = ct(t).slice(0, -1);
            if (e.length) return Object.keys(n).filter(t => !e.includes(t)).reduce((e, t) => (e[t] = n[t], e), {})
        }
        return n
    }, ut = (e = {}, t, r) => {
        if (!t) return i.unflatten(e);
        if (Object.keys(e).find(e => e === t)) return e[t];
        const a = ot(t, r), n = lt(e, t, r), o = Object.keys(n).reduce((e, t, o) => {
            let l = t.replace(a, "TEMP_HOLDING_KEY.");
            return (null == r ? void 0 : r.includeAllSiblings) && (l = l.replace(new RegExp("TEMP_HOLDING_KEY\\.(\\d+)"), "TEMP_HOLDING_KEY." + o)), e[l] = n[t], e
        }, {});
        return Object.keys(o).length ? i.unflatten(o).TEMP_HOLDING_KEY : void 0
    }, dt = {
        flatten: i.flatten,
        unflatten: i.unflatten,
        set: it,
        get: ut,
        selectParams: lt,
        filterOutParams: st,
        removePath: (e, t) => {
            let r = st(e, t);
            const a = ct(t).reverse();
            return a.find((t, n) => {
                const o = ut(e, t);
                if (Array.isArray(o)) {
                    const l = a[n - 1].split("."), s = l[l.length - 1];
                    return o.splice(+s, 1), r = it(e, t, o), !0
                }
                return !1
            }), r
        },
        DELIMITER: ".",
        pathToParts: ct,
        merge: (e = {}, ...t) => {
            const r = i.flatten(e);
            return t.reverse().reduce((e, t) => Object.keys(t).reduce((e, r) => it(e, r, t[r]), e), r)
        }
    }, pt = (e, t, r) => a => {
        let n = !1;
        const o = {...a.populated}, l = dt.set(a.params, e, t);
        return e in o && (delete o[e], n = !0), r && (o[e] = r, n = !0), {
            ...a,
            params: l,
            populated: n ? o : a.populated
        }
    }, ft = (e, t) => !(void 0 !== t || "string" == typeof e || !e.params), mt = function (e, t = {}) {
        return t.includeParams && e ? {...e, params: dt.selectParams(e.params || {}, t.includeParams)} : e
    }, ht = new et, gt = (t, r, a) => {
        var n, o, l;
        const [s, c] = e.useState(!1), [i, u] = e.useState(!0), [d, p] = e.useState(0),
            f = t ? mt(t, a) : null, [m, h] = e.useState({
                ...f,
                params: null !== (n = null == f ? void 0 : f.params) && void 0 !== n ? n : {},
                errors: null !== (o = null == t ? void 0 : t.errors) && void 0 !== o ? o : {},
                populated: null !== (l = null == t ? void 0 : t.populated) && void 0 !== l ? l : {}
            }), g = e.useCallback(e => {
                const t = e instanceof Function ? e(m) : e;
                h(mt(t, a))
            }, [a, m]), E = at(), y = e.useCallback((e, t, r) => {
                ft(e, t) ? g(e) : ((e, t = {}) => {
                    const {includeParams: r} = t;
                    if (r) {
                        return dt.pathToParts(e, {skipArrayIndexes: !0}).some(e => r.includes(e))
                    }
                    return !0
                })(e, a) && h(pt(e, t, r)), u(!1)
            }, [h, a]), v = e.useCallback((e = {}, t) => {
                c(!0);
                const a = tt(dt.merge(m.params, e)), n = {
                    resourceId: r,
                    onUploadProgress: e => p(Math.round(100 * e.loaded / e.total)),
                    data: a,
                    headers: {"Content-Type": "multipart/form-data"}
                }, o = m.id ? ht.recordAction({...n, actionName: "edit", recordId: m.id}) : ht.resourceAction({
                    ...n,
                    actionName: "new"
                });
                return o.then(e => {
                    e.data.notice && E(e.data.notice), !1 !== (null == t ? void 0 : t.updateOnSave) && g(t => nt(t, e.data)), p(0), c(!1), u(!0)
                }).catch(() => {
                    E({
                        message: "There was an error updating record, Check out console to see more information.",
                        type: "error"
                    }), p(0), c(!1)
                }), o
            }, [m, r, c, p, h]);
        return {record: m, handleChange: y, submit: v, loading: s, progress: d, setRecord: g, isSynced: i}
    }, Et = new _, yt = (e, t) => {
        const r = e.name;
        if (!e.component && !e.hasHandler) return null;
        const a = {
            record: () => Et.recordActionUrl({...t, actionName: r}),
            resource: () => Et.resourceActionUrl({resourceId: t.resourceId, actionName: r}),
            bulk: () => Et.bulkActionUrl({...t, actionName: r})
        };
        if (a[e.actionType]) return a[e.actionType]();
        throw new Error('"actionType" should be either record, resource or bulk')
    }, vt = new et;
    const bt = e => {
        const {action: t, params: r, actionResponseHandler: a, search: n} = e;
        return () => {
            const e = function (e, t, r) {
                let a;
                const {recordId: n, recordIds: o, resourceId: l} = t;
                switch (e.actionType) {
                    case"record":
                        if (!n) throw new Error('You have to specify "recordId" for record action');
                        a = vt.recordAction({resourceId: l, actionName: e.name, recordId: n, search: r});
                        break;
                    case"resource":
                        a = vt.resourceAction({resourceId: l, actionName: e.name});
                        break;
                    case"bulk":
                        if (!o) throw new Error('You have to specify "recordIds" for bulk action');
                        a = vt.bulkAction({resourceId: l, actionName: e.name, recordIds: o, search: r});
                        break;
                    default:
                        throw new Error('"actionType" should be either record, resource or bulk')
                }
                return a
            }(t, r, n);
            return e.then(a).catch(e => {
                throw e
            }), e
        }
    }, wt = e => "action-" + e.name, xt = e => {
        const {action: t, params: r, actionResponseHandler: a, push: n} = e;
        return e => {
            e.preventDefault(), e.stopPropagation();
            const o = yt(t, r), l = bt({params: r, action: t, actionResponseHandler: a});
            t.guard && !confirm(t.guard) || ((e => void 0 !== e.component && !1 === e.component)(t) ? l() : o && n(o))
        }
    }, It = (e, t) => {
        const r = new URLSearchParams(null != t ? t : window.location.search);
        return r.set("refresh", "true"), `${e}?${r}`
    }, St = e => {
        const t = new URLSearchParams(e);
        return t.get("refresh") && t.delete("refresh"), t.toString()
    }, Ct = e => {
        const t = s.useLocation(), r = s.useHistory(), a = at();
        return n => {
            const {data: o} = n;
            if (o.notice && a(o.notice), o.redirectUrl && t.pathname !== o.redirectUrl) {
                const e = It(o.redirectUrl);
                r.push(e)
            }
            e && e(o)
        }
    };

    function At(e, t, r) {
        const a = s.useHistory(), n = Ct(r);
        return {
            href: yt(e, t),
            callApi: bt({action: e, params: t, actionResponseHandler: n}),
            handleClick: xt({action: e, params: t, actionResponseHandler: n, push: a.push})
        }
    }

    function Rt(t, r) {
        const [a, n] = e.useState(() => {
            try {
                const e = window.localStorage.getItem(t);
                return e ? JSON.parse(e) : r
            } catch (e) {
                return console.log(e), r
            }
        });
        return [a, e => {
            try {
                const r = e instanceof Function ? e(a) : e;
                n(r), window.localStorage.setItem(t, JSON.stringify(r))
            } catch (e) {
                console.log(e)
            }
        }]
    }

    const _t = (e, t) => {
        const r = new RegExp(e + "($|/)");
        return !!t.pathname.match(r)
    };

    function Pt(t) {
        const [r, a] = Rt("sidebarElements", {}), n = s.useHistory(), o = s.useLocation(),
            l = e.useMemo(() => (e, t) => ({
                href: e.href || void 0,
                icon: t,
                isSelected: _t(e.href, o),
                label: e.name,
                id: e.id,
                onClick: t => {
                    e.href && (t.preventDefault(), n.push(e.href))
                }
            }), [o, n]), c = t.filter(e => e.href).reduce((e, t) => {
                var n, o;
                const s = (null === (n = t.navigation) || void 0 === n ? void 0 : n.name) || ["resource", t.name].join("-");
                var c;
                if (t.navigation && null !== t.navigation.name) if (e[s] && e[s].elements && (null === (o = t.navigation) || void 0 === o ? void 0 : o.name)) e[s].elements.push(l(t)); else {
                    var i, u;
                    e[s] = {
                        elements: [l(t)],
                        label: null === (i = t.navigation) || void 0 === i ? void 0 : i.name,
                        icon: null === (u = t.navigation) || void 0 === u ? void 0 : u.icon,
                        onClick: () => a({...r, [s]: !r[s]}),
                        isOpen: !!r[s]
                    }
                } else e[s] = l(t, null === (c = t.navigation) || void 0 === c ? void 0 : c.icon);
                return e
            }, {});
        return Object.values(c)
    }

    const kt = new et;

    function Bt(t) {
        const [r, a] = e.useState([]), [n, o] = e.useState(!1), [l, c] = e.useState(10), [i, u] = e.useState(1), [d, p] = e.useState(0), [f, m] = e.useState("asc"), [h, g] = e.useState(),
            E = s.useLocation(), y = s.useHistory(), v = at(), {translateMessage: b} = qe(), w = at(), x = () => {
                o(!0);
                const e = new URLSearchParams(E.search),
                    r = kt.resourceAction({actionName: "list", resourceId: t, params: e});
                return r.then(e => {
                    const t = e.data;
                    t.notice && w(t.notice), t.redirectUrl ? y.push(t.redirectUrl) : (a(t.records), u(t.meta.page), c(t.meta.perPage), p(t.meta.total), m(t.meta.direction), g(t.meta.sortBy), o(!1))
                }).catch(() => {
                    v({message: b("errorFetchingRecords", t), type: "error"})
                }), r
            };
        return e.useEffect(() => {
            var e;
            e = E.search, new URLSearchParams(e).get("refresh") ? y.replace([E.pathname, St(E.search).toString()].join("?")) : x()
        }, [t, E.search]), {
            records: r,
            loading: n,
            page: i,
            total: d,
            direction: f,
            sortBy: h,
            perPage: l,
            fetchData: x
        }
    }

    function Nt(t) {
        const [r, a] = e.useState([]);
        return {
            handleSelect: e => {
                const t = r.findIndex(t => t.id === e.id);
                if (t < 0) a([...r, e]); else {
                    const e = [...r];
                    e.splice(t, 1), a(e)
                }
            }, handleSelectAll: () => {
                const e = t.filter(e => !r.find(t => t.id === e.id) && e.bulkActions.length);
                if (e.length) a([...r, ...e]); else {
                    const e = r.filter(e => !t.find(t => t.id === e.id));
                    a(e)
                }
            }, selectedRecords: r, setSelectedRecords: a
        }
    }

    const Tt = e => t.useSelector(e => e.resources).find(t => t.id === e);
    var Lt = Object.freeze({
        __proto__: null,
        useRecord: gt,
        isEntireRecordGiven: ft,
        FORM_VALUE_NULL: "__FORM_VALUE_NULL__",
        FORM_VALUE_EMPTY_OBJECT: "__FORM_VALUE_EMPTY_OBJECT__",
        FORM_VALUE_EMPTY_ARRAY: "__FORM_VALUE_EMPTY_ARRAY__",
        paramsToFormData: tt,
        updateRecord: pt,
        useAction: At,
        useActionResponseHandler: Ct,
        useCurrentAdmin: function () {
            const e = t.useSelector(e => e.session), r = t.useDispatch();
            return [e, e => r(((e = null) => ({type: "SESSION_INITIALIZE", data: e}))(e))]
        },
        useLocalStorage: Rt,
        useNavigationResources: Pt,
        useNotice: at,
        useRecords: Bt,
        useSelectedRecords: Nt,
        useTranslation: qe,
        useResource: Tt
    });
    const Ot = k(({resources: e}) => {
        const t = Pt(e), {translateLabel: r} = qe();
        return g.default.createElement(l.Navigation, {label: r("navigation"), elements: t})
    }, "SidebarResourceSection"), Dt = E.default(l.Box).withConfig({
        displayName: "sidebar__StyledSidebar",
        componentId: "z5zut0-0"
    })(["transition:left 0.3s;top:0;bottom:0;flex-shrink:0;overflow-y:auto;&.hidden{left:-", ";}&.visible{left:0;}"], l.themeGet("sizes", "sidebarWidth"));
    Dt.defaultProps = {
        position: ["absolute", "absolute", "absolute", "absolute", "inherit"],
        width: "sidebarWidth",
        borderRight: "default",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        bg: "white"
    };
    const Ut = e => {
        const {isVisible: r} = e, [a, n, o] = t.useSelector(e => [e.branding, e.resources, e.pages]);
        return g.default.createElement(Dt, {className: r ? "visible" : "hidden"}, g.default.createElement(T, {branding: a}), g.default.createElement(l.Box, {
            flexGrow: 1,
            className: l.cssClass("Resources")
        }, g.default.createElement(Ot, {resources: n})), g.default.createElement(Je, {pages: o}), (null == a ? void 0 : a.softwareBrothers) && g.default.createElement(Ke, null))
    }, jt = k(e => {
        const {session: t, paths: r} = e, {translateButton: a} = qe(), n = [{
            label: a("logout"), onClick: e => {
                e.preventDefault(), window.location.href = r.logoutPath
            }, icon: "Logout"
        }];
        return g.default.createElement(l.Box, {flexShrink: 0}, g.default.createElement(l.CurrentUserNav, {
            name: t.email,
            title: t.title,
            avatarUrl: t.avatarUrl,
            dropActions: n
        }))
    }, "LoggedIn"), Mt = E.default(l.Text).withConfig({
        displayName: "version__VersionItem",
        componentId: "rgspw3-0"
    })(["padding:12px 24px 12px 0;"]);
    Mt.defaultProps = {display: ["none", "block"], color: "grey100"};
    const Ft = e => {
        const {versions: t} = e, {admin: r, app: a} = t, {translateLabel: n} = qe();
        return g.default.createElement(l.Box, {
            flex: !0,
            flexGrow: 1,
            py: "default",
            px: "xxl",
            className: l.cssClass("Version")
        }, r && g.default.createElement(Mt, null, n("adminVersion", {version: r})), a && g.default.createElement(Mt, null, n("appVersion", {version: a})))
    }, Gt = E.default(l.Box).withConfig({
        displayName: "top-bar__NavBar",
        componentId: "sc-1qk1nql-0"
    })(["height:", ";border-bottom:", ";background:", ";display:flex;flex-direction:row;flex-shrink:0;"], ({theme: e}) => e.sizes.navbarHeight, l.themeGet("borders", "default"), ({theme: e}) => e.colors.white);
    Gt.defaultProps = {className: l.cssClass("NavBar")};
    const zt = e => {
        const {toggleSidebar: r} = e, [a, n, o] = t.useSelector(e => [e.session, e.paths, e.versions]);
        return g.default.createElement(Gt, null, g.default.createElement(l.Box, {
            py: "lg",
            px: ["default", "lg"],
            onClick: r,
            display: ["block", "block", "block", "block", "none"],
            style: {cursor: "pointer"}
        }, g.default.createElement(l.Icon, {
            icon: "Menu",
            size: 32,
            color: "grey100"
        })), g.default.createElement(Ft, {versions: o}), a && a.email ? g.default.createElement(jt, {
            session: a,
            paths: n
        }) : "")
    };

    class Ht extends g.default.Component {
        constructor(e) {
            super(e);
            const {notice: t} = e;
            this.timer = null, this.state = {progress: t.progress || 0}
        }

        componentDidMount() {
            const {drop: e, notice: t, notifyProgress: r} = this.props;
            this.timer = setInterval(() => {
                this.setState(e => {
                    const a = e.progress + 100 / 3;
                    return r({noticeId: t.id, progress: a}), {progress: a}
                })
            }, 1e3), setTimeout(() => {
                this.timer && clearInterval(this.timer), e()
            }, 4e3)
        }

        componentWillUnmount() {
            this.timer && clearInterval(this.timer)
        }

        render() {
            const {notice: e, drop: t} = this.props;
            return g.default.createElement(l.MessageBox, {
                style: {minWidth: "480px"},
                message: e.message,
                variant: "success" === e.type ? "success" : "danger",
                onCloseClick: t
            })
        }
    }

    const Vt = t.connect(e => ({notices: e.notices}), e => ({
        drop: t => e((e => ({
            type: "DROP_NOTICE",
            data: {noticeId: e}
        }))(t)),
        notifyProgress: ({noticeId: t, progress: r}) => e({
            type: "SET_NOTICE_PROGRESS",
            data: {noticeId: t, progress: r}
        })
    }))(e => {
        const {drop: t, notices: r, notifyProgress: a} = e, n = r.length ? r[r.length - 1] : null;
        return n ? g.default.createElement("div", {"data-testid": "notice-wrapper"}, g.default.createElement(Ht, {
            key: n.id,
            notice: n,
            drop: () => t(n.id),
            notifyProgress: a
        })) : g.default.createElement("div", null)
    }), $t = () => {
        const {translateMessage: e} = qe();
        return g.default.createElement(l.Box, {
            position: "relative",
            overflow: "hidden"
        }, g.default.createElement(l.Box, {
            position: "absolute",
            top: 50,
            left: -10,
            opacity: [.2, .4, 1],
            animate: !0
        }, g.default.createElement(l.Illustration, {variant: "Rocket"})), g.default.createElement(l.Box, {
            position: "absolute",
            top: -70,
            right: -15,
            opacity: [.2, .4, 1],
            animate: !0
        }, g.default.createElement(l.Illustration, {variant: "Moon"})), g.default.createElement(l.Box, {
            bg: "grey100",
            height: 284,
            py: 74,
            px: ["default", "lg", 250]
        }, g.default.createElement(l.Text, {
            textAlign: "center",
            color: "white"
        }, g.default.createElement(l.H2, null, e("welcomeOnBoard_title")), g.default.createElement(l.Text, {opacity: .8}, e("welcomeOnBoard_subtitle")))))
    }, Yt = E.default(l.Box).withConfig({
        displayName: "default-dashboard__Card",
        componentId: "y6jxa9-0"
    })(["display:", ";color:", ";text-decoration:none;border:1px solid transparent;&:hover{border:1px solid ", ";box-shadow:", ";}"], ({flex: e}) => e ? "flex" : "block", ({theme: e}) => e.colors.grey100, ({theme: e}) => e.colors.primary100, ({theme: e}) => e.shadows.cardHover);
    Yt.defaultProps = {variant: "white", boxShadow: "card"};
    const Zt = () => {
        const {translateMessage: e, translateButton: t} = qe();
        return g.default.createElement(l.Box, null, g.default.createElement($t, null), g.default.createElement(l.Box, {
            mt: ["xl", "xl", "-100px"],
            mb: "xl",
            mx: [0, 0, 0, "auto"],
            px: ["default", "lg", "xxl", "0"],
            position: "relative",
            flex: !0,
            flexDirection: "row",
            flexWrap: "wrap",
            width: [1, 1, 1, 1024]
        }, (({translateMessage: e}) => [{
            variant: "Planet",
            title: e("addingResources_title"),
            subtitle: e("addingResources_subtitle"),
            href: "https://adminbro.com/tutorial-passing-resources.html"
        }, {
            variant: "DocumentCheck",
            title: e("customizeResources_title"),
            subtitle: e("customizeResources_subtitle"),
            href: "https://adminbro.com/tutorial-customizing-resources.html"
        }, {
            variant: "DocumentSearch",
            title: e("customizeActions_title"),
            subtitle: e("customizeActions_subtitle"),
            href: "https://adminbro.com/tutorial-actions.html"
        }, {
            variant: "FlagInCog",
            title: e("writeOwnComponents_title"),
            subtitle: e("writeOwnComponents_subtitle"),
            href: "https://adminbro.com/tutorial-writing-react-components.html"
        }, {
            variant: "Folders",
            title: e("customDashboard_title"),
            subtitle: e("customDashboard_subtitle"),
            href: "https://adminbro.com/tutorial-custom-dashboard.html"
        }, {
            variant: "Astronaut",
            title: e("roleBasedAccess_title"),
            subtitle: e("roleBasedAccess_subtitle"),
            href: "https://adminbro.com/tutorial-rbac.html"
        }])({translateMessage: e}).map((e, t) => g.default.createElement(l.Box, {
            key: t,
            width: [1, .5, .5, 1 / 3],
            p: "lg"
        }, g.default.createElement(Yt, {
            as: "a",
            href: e.href
        }, g.default.createElement(l.Text, {textAlign: "center"}, g.default.createElement(l.Illustration, {
            variant: e.variant,
            width: 100,
            height: 70
        }), g.default.createElement(l.H5, {mt: "lg"}, e.title), g.default.createElement(l.Text, null, e.subtitle))))), g.default.createElement(l.Box, {
            width: [1, 1, .5],
            p: "lg"
        }, g.default.createElement(Yt, {
            as: "a",
            flex: !0,
            href: "https://join.slack.com/t/adminbro/shared_invite/zt-djsqxxpz-_YCS8UMtQ9Ade6DPuLR7Zw"
        }, g.default.createElement(l.Box, {flexShrink: 0}, g.default.createElement(l.Illustration, {variant: "SlackLogo"})), g.default.createElement(l.Box, {ml: "xl"}, g.default.createElement(l.H4, null, e("community_title")), g.default.createElement(l.Text, null, e("community_subtitle"))))), g.default.createElement(l.Box, {
            width: [1, 1, .5],
            p: "lg"
        }, g.default.createElement(Yt, {
            as: "a",
            flex: !0,
            href: "https://github.com/SoftwareBrothers/admin-bro/issues"
        }, g.default.createElement(l.Box, {flexShrink: 0}, g.default.createElement(l.Illustration, {variant: "GithubLogo"})), g.default.createElement(l.Box, {ml: "xl"}, g.default.createElement(l.H4, null, e("foundBug_title")), g.default.createElement(l.Text, null, e("foundBug_subtitle"))))), g.default.createElement(l.Box, {
            variant: "white",
            boxShadow: "card",
            width: 1,
            m: "lg"
        }, g.default.createElement(l.Text, {textAlign: "center"}, g.default.createElement(l.Illustration, {variant: "SoftwareBrothersLogo"}), g.default.createElement(l.H4, null, e("needMoreSolutions_title")), g.default.createElement(l.Text, null, e("needMoreSolutions_subtitle")), g.default.createElement(l.Text, {mt: "xxl"}, g.default.createElement(l.Button, {
            as: "a",
            variant: "primary",
            href: "https://softwarebrothers.co/services"
        }, t("contactUs")))))))
    }, qt = ({error: e}) => {
        const {translateMessage: t} = qe();
        return g.default.createElement(l.MessageBox, {
            m: "xxl",
            variant: "danger",
            message: "Javascript Error"
        }, g.default.createElement(l.Text, null, e.toString()), g.default.createElement(l.Text, {mt: "default"}, t("seeConsoleForMore")))
    };

    class Wt extends g.default.Component {
        constructor(e) {
            super(e), this.state = {error: null}
        }

        componentDidCatch(e) {
            this.setState({error: e})
        }

        render() {
            const {children: e} = this.props, {error: t} = this.state;
            return null !== t ? g.default.createElement(qt, {error: t}) : e || null
        }
    }

    class Jt extends g.default.Component {
        constructor(e) {
            super(e), this.state = {isClient: !1}
        }

        componentDidMount() {
            this.setState({isClient: !0})
        }

        render() {
            const {dashboard: e} = this.props, {isClient: t} = this.state;
            let r;
            return r = e && e.component && t && AdminBro.UserComponents[e.component] ? AdminBro.UserComponents[e.component] : Zt, g.default.createElement(Wt, null, g.default.createElement(r, null))
        }
    }

    var Kt = t.connect(e => ({dashboard: e.dashboard}))(Jt);
    const Xt = e => {
        const {resource: t, property: r} = e, {translateProperty: a, translateButton: n} = qe(),
            o = a(r.path + ".addNewItem", t.id, {defaultValue: n("addNewItem", t.id)});
        return g.default.createElement(g.default.Fragment, null, g.default.createElement(l.Icon, {icon: "Add"}), o)
    }, Qt = e => {
        const {property: t, props: r} = e;
        return t.hideLabel ? null : g.default.createElement(l.Label, P({
            htmlFor: t.path,
            required: t.isRequired
        }, r), t.label)
    }, er = (e, t) => ({...e, path: [e.path, t].join("."), label: `[${t + 1}]`, isArray: !1}), tr = e => {
        const {ItemComponent: t, property: r, onDelete: a} = e;
        return g.default.createElement(l.Box, {
            flex: !0,
            flexDirection: "row",
            alignItems: "center",
            "data-testid": r.path
        }, g.default.createElement(l.Box, {flexGrow: 1}, g.default.createElement(t, e)), g.default.createElement(l.Box, {
            flexShrink: 0,
            ml: "lg"
        }, g.default.createElement(l.Button, {
            rounded: !0,
            ml: "default",
            "data-testid": "delete-item",
            type: "button",
            size: "icon",
            onClick: e => a(e, r),
            variant: "danger"
        }, g.default.createElement(l.Icon, {icon: "TrashCan"}))))
    }, rr = t => {
        const {property: r, record: a, resource: n, onChange: o} = t, s = dt.get(a.params, r.path) || [],
            c = e.useCallback(e => {
                const t = [...s, r.subProperties.length ? {} : ""];
                return o(r.path, t), e.preventDefault(), !1
            }, [a, o, r]), i = e.useCallback((e, t) => {
                const r = ((e, t) => {
                    const r = Object.keys(e.populated).reduce((e, t) => ({...e, [t]: t}), {}), a = dt.removePath(r, t),
                        n = Object.entries(a).reduce((t, [r, a]) => ({
                            ...t,
                            [r]: a && e.populated[null == a ? void 0 : a.toString()]
                        }), {});
                    return {...e, params: dt.removePath(e.params, t), populated: n}
                })(a, t.path);
                return o(r), e.preventDefault(), !1
            }, [a, o, r]);
        return g.default.createElement(l.Section, {mt: "xl"}, s.map((e, r) => {
            const a = er(t.property, r);
            return g.default.createElement(tr, P({}, t, {property: a, key: a.path, onDelete: i}))
        }), g.default.createElement(l.Button, {
            onClick: c,
            type: "button",
            rounded: !0
        }, g.default.createElement(Xt, {resource: n, property: r})))
    };

    class ar extends g.default.PureComponent {
        render() {
            const {property: e, record: t, ItemComponent: r} = this.props, a = dt.get(t.params, e.path) || [];
            return g.default.createElement(l.ValueGroup, {label: e.label}, g.default.createElement(l.Section, null, (a || []).map((t, a) => {
                const n = er(e, a);
                return g.default.createElement(r, P({}, this.props, {key: n.path, property: n}))
            })))
        }
    }

    var nr = Object.freeze({
        __proto__: null, show: ar, edit: e => {
            const {property: t, record: r, testId: a} = e, n = r.errors && r.errors[t.propertyPath];
            return g.default.createElement(l.FormGroup, {
                error: !!n,
                "data-testid": a
            }, g.default.createElement(Qt, {property: t}), g.default.createElement(rr, e), g.default.createElement(l.FormMessage, null, n && n.message))
        }, list: e => {
            const {property: t, record: r} = e, a = dt.get(r.params, t.path) || [];
            return g.default.createElement("span", null, "length: " + a.length)
        }
    });

    function or(e, t) {
        return {...t, path: [e.path, t.name].join(".")}
    }

    class lr extends g.default.PureComponent {
        renderItems() {
            const {property: e, ItemComponent: t} = this.props;
            return g.default.createElement(g.default.Fragment, null, e.subProperties.filter(e => !e.isId).map(r => {
                const a = or(e, r);
                return g.default.createElement("div", {key: a.path}, g.default.createElement(l.Label, {inline: !0}, r.label + ": "), g.default.createElement(t, P({}, this.props, {property: a})))
            }))
        }

        render() {
            const {property: e, record: t, resource: a} = this.props, n = t.recordActions.find(e => "show" === e.name);
            if (a.titleProperty.propertyPath === e.propertyPath && n) {
                const e = (new _).recordActionUrl({resourceId: a.id, recordId: t.id, actionName: "show"});
                return g.default.createElement(r.Link, {to: e}, this.renderItems())
            }
            return this.renderItems()
        }
    }

    var sr = Object.freeze({
        __proto__: null, show: e => {
            const {property: t, ItemComponent: r} = e;
            return g.default.createElement(l.ValueGroup, {label: t.label}, g.default.createElement(l.Section, null, t.subProperties.filter(e => !e.isId).map(a => {
                const n = or(t, a);
                return g.default.createElement(r, P({}, e, {key: n.path, property: n}))
            })))
        }, edit: e => {
            const {property: t, record: r, ItemComponent: a} = e, n = r.errors && r.errors[t.path];
            return g.default.createElement(l.FormGroup, {error: !!n}, g.default.createElement(Qt, {property: t}), g.default.createElement(l.Section, t.props, t.subProperties.filter(e => !e.isId).map(r => {
                const n = or(t, r);
                return g.default.createElement(a, P({}, e, {key: n.path, property: n}))
            })), g.default.createElement(l.FormMessage, null, n && n.message))
        }, list: lr
    });
    const cr = e => {
        const {property: t, record: r} = e, a = null == r ? void 0 : r.params[t.path];
        if (void 0 === a) return null;
        if (t.availableValues) {
            const e = t.availableValues.find(e => e.value === a);
            return e ? g.default.createElement(l.Badge, null, (null == e ? void 0 : e.label) || a) : a
        }
        return a
    };

    class ir extends g.default.PureComponent {
        render() {
            const {property: e} = this.props;
            return g.default.createElement(l.ValueGroup, {label: e.label}, g.default.createElement(cr, this.props))
        }
    }

    const ur = (e, t) => {
        const r = e.record.params[e.property.path], a = t.record.params[t.property.path],
            n = e.record.errors[e.property.path], o = t.record.errors[t.property.path];
        return r === a && n === o
    }, dr = e => {
        var t;
        const {property: r, record: a} = e, n = null === (t = a.errors) || void 0 === t ? void 0 : t[r.path];
        return g.default.createElement(l.FormGroup, {error: Boolean(n)}, g.default.createElement(Qt, {property: r}), r.availableValues ? g.default.createElement(pr, e) : g.default.createElement(fr, e), g.default.createElement(l.FormMessage, null, n && n.message))
    }, pr = e => {
        var t, r;
        const {theme: a, record: n, property: o, onChange: s} = e;
        if (!o.availableValues) return null;
        const c = null !== (t = null === (r = n.params) || void 0 === r ? void 0 : r[o.path]) && void 0 !== t ? t : "",
            i = l.selectStyles(a), u = o.availableValues.find(e => e.value === c);
        return g.default.createElement(w.default, P({
            isClearable: !0,
            styles: i,
            value: u,
            options: o.availableValues,
            onChange: e => {
                var t;
                return s(o.path, null !== (t = null == e ? void 0 : e.value) && void 0 !== t ? t : "")
            },
            isDisabled: o.isDisabled
        }, o.props))
    }, fr = t => {
        var r, a;
        const {property: n, record: o, onChange: s} = t,
            c = null !== (r = null === (a = o.params) || void 0 === a ? void 0 : a[n.path]) && void 0 !== r ? r : "", [i, u] = e.useState(c);
        return e.useEffect(() => {
            i !== c && u(c)
        }, [c]), g.default.createElement(l.Input, P({
            id: n.path,
            name: n.path,
            onChange: e => u(e.target.value),
            onBlur: () => s(n.path, i),
            onKeyDown: e => 13 === e.keyCode && s(n.path, i),
            value: i,
            disabled: n.isDisabled
        }, n.props))
    };
    var mr = a.withTheme(e.memo(dr, ur));

    class hr extends g.default.PureComponent {
        constructor(e) {
            super(e), this.handleInputChange = this.handleInputChange.bind(this), this.handleSelectChange = this.handleSelectChange.bind(this)
        }

        handleInputChange(e) {
            const {onChange: t, property: r} = this.props;
            t(r.path, e.target.value)
        }

        handleSelectChange(e) {
            const {onChange: t, property: r} = this.props, a = e ? e.value : "";
            t(r.path, a)
        }

        renderInput() {
            const {property: e, filter: t, theme: r} = this.props, a = "filter-" + e.path, n = t[e.path] || "";
            if (e.availableValues) {
                const t = e.availableValues.find(e => e.value === n);
                return g.default.createElement(w.default, {
                    value: void 0 === t ? "" : t,
                    isClearable: !0,
                    options: e.availableValues,
                    styles: l.filterStyles(r),
                    onChange: this.handleSelectChange
                })
            }
            return g.default.createElement(l.Input, {name: a, onChange: this.handleInputChange, value: n})
        }

        render() {
            const {property: e} = this.props;
            return g.default.createElement(l.FormGroup, {variant: "filter"}, g.default.createElement(l.Label, null, e.label), this.renderInput())
        }
    }

    var gr = a.withTheme(hr);

    class Er extends g.default.PureComponent {
        render() {
            return g.default.createElement(cr, this.props)
        }
    }

    var yr = Object.freeze({__proto__: null, show: ir, edit: mr, filter: gr, list: Er});
    const vr = e => {
        const {property: t, onChange: r, record: a} = e,
            n = (e => !(!e || "false" === e))(a.params && a.params[t.path]), o = a.errors && a.errors[t.path];
        return g.default.createElement(l.FormGroup, {error: !!o}, g.default.createElement(l.CheckBox, P({
            id: t.path,
            name: t.path,
            onChange: () => {
                t.isDisabled || r(t.path, !n)
            },
            checked: n,
            disabled: t.isDisabled
        }, t.props)), g.default.createElement(Qt, {
            property: t,
            props: {inline: !0}
        }), g.default.createElement(l.FormMessage, null, o && o.message))
    };
    var br = e.memo(vr, ur), wr = e => void 0 === e ? "" : e ? "Yes" : "No";
    const xr = e => {
        const {record: t, property: r, resource: a} = e, {translateProperty: n} = qe(),
            o = null == t ? void 0 : t.params[r.path];
        if (void 0 === o || "" === o) return null;
        const s = wr(o), c = n(`${r.path}.${o}`, a.id, {defaultValue: s});
        return g.default.createElement(l.Badge, {outline: !0, size: "sm"}, c)
    };

    class Ir extends g.default.PureComponent {
        render() {
            const {property: e} = this.props;
            return g.default.createElement(l.ValueGroup, {label: e.label}, g.default.createElement(xr, this.props))
        }
    }

    class Sr extends g.default.PureComponent {
        render() {
            return g.default.createElement(xr, this.props)
        }
    }

    class Cr extends g.default.PureComponent {
        constructor(e) {
            super(e), this.handleChange = this.handleChange.bind(this)
        }

        handleChange(e) {
            const {onChange: t, property: r} = this.props, a = e ? e.value : "";
            t(r.path, a)
        }

        render() {
            const {property: e, filter: t = {}, theme: r} = this.props, a = void 0 === t[e.path] ? "" : t[e.path],
                n = [{value: !0, label: wr(!0)}, {value: !1, label: wr(!1)}], o = n.find(e => e.value === a);
            return g.default.createElement(l.FormGroup, null, g.default.createElement(l.Label, null, e.label), g.default.createElement(w.default, {
                value: void 0 === o ? "" : o,
                isClearable: !0,
                options: n,
                styles: l.filterStyles(r),
                onChange: this.handleChange
            }))
        }
    }

    var Ar = a.withTheme(Cr), Rr = Object.freeze({__proto__: null, edit: br, show: Ir, list: Sr, filter: Ar});
    const _r = e => {
        const {property: t, onChange: r, record: a} = e, n = a.params && a.params[t.path] || "",
            o = a.errors && a.errors[t.path];
        return g.default.createElement(l.FormGroup, {error: !!o}, g.default.createElement(Qt, {property: t}), g.default.createElement(l.DatePicker, P({
            value: n,
            disabled: t.isDisabled,
            onChange: e => r(t.path, e),
            propertyType: t.type
        }, t.props)), g.default.createElement(l.FormMessage, null, o && o.message))
    };
    var Pr = e.memo(_r, ur), kr = (e, t) => {
        if (!e) return "";
        const r = new Date(e);
        return r ? l.formatDateProperty(r, t) : ""
    };

    class Br extends g.default.PureComponent {
        render() {
            const {property: e, record: t} = this.props, r = kr(t.params[e.path], e.type);
            return g.default.createElement(l.ValueGroup, {label: e.label}, r)
        }
    }

    class Nr extends g.default.PureComponent {
        render() {
            const {property: e, record: t} = this.props, r = kr(t.params[e.path], e.type);
            return g.default.createElement("span", null, r)
        }
    }

    class Tr {
        static normalizeKeys(e) {
            return i.unflatten(i.flatten(e), {delimiter: "~~"})
        }

        constructor(e = {}, t) {
            this.resource = t;
            const r = Tr.normalizeKeys(e);
            this.filters = Object.keys(r).reduce((e, t) => (e[t] = {
                path: t,
                property: this.resource.property(t),
                value: r[t]
            }, e), {})
        }

        get(e) {
            return this.filters[e]
        }

        async populate() {
            const e = Object.keys(this.filters);
            for (let r = 0; r < e.length; r += 1) {
                var t;
                const a = e[r],
                    n = null === (t = this.resource.decorate().getPropertyByKey(a)) || void 0 === t ? void 0 : t.reference();
                n && (this.filters[a].populated = await n.findOne(this.filters[a].value))
            }
            return this
        }

        reduce(e, t) {
            return Object.values(this.filters).reduce(e, t || {})
        }

        isVisible() {
            return !!Object.keys(this.filters).length
        }
    }

    var Lr = Object.freeze({__proto__: null, PARAM_SEPARATOR: "~~", Filter: Tr, default: Tr});
    const {PARAM_SEPARATOR: Or} = Lr;
    var Dr = Object.freeze({
        __proto__: null, edit: Pr, show: Br, list: Nr, filter: e => {
            const {property: t, filter: r, onChange: a} = e, n = `${t.path}${Or}from`, o = `${t.path}${Or}to`, s = r[n],
                c = r[o];
            return g.default.createElement(g.default.Fragment, null, g.default.createElement(l.FormGroup, {variant: "filter"}, g.default.createElement(l.Label, null, t.label), g.default.createElement(l.Label, null, "- From: "), g.default.createElement(l.DatePicker, {
                value: s,
                onChange: e => a(n, e),
                propertyType: t.type
            }), g.default.createElement(l.Label, {mt: "default"}, "- To: "), g.default.createElement(l.DatePicker, {
                value: c,
                onChange: e => a(o, e),
                propertyType: t.type
            })))
        }
    });
    const Ur = e => {
        var t, r;
        const {property: a, record: n, onChange: o} = e,
            s = null !== (t = null === (r = n.params) || void 0 === r ? void 0 : r[a.path]) && void 0 !== t ? t : "",
            c = n.errors && n.errors[a.path], {props: i} = a, {quill: u = {}, ...d} = i || {};
        return u.theme = u.theme || "snow", u.modules = {toolbar: l.DefaultQuillToolbarOptions, ...u.modules || {}}, g.default.createElement(l.FormGroup, {error: Boolean(c)}, g.default.createElement(Qt, {property: a}), g.default.createElement(l.RichText, P({}, d, {
            value: s,
            onChange: e => o(a.path, e),
            quill: u
        })), g.default.createElement(l.FormMessage, null, null == c ? void 0 : c.message))
    };
    var jr = e.memo(Ur, ur);

    class Mr extends g.default.PureComponent {
        constructor(e) {
            super(e), this.contentRef = g.default.createRef()
        }

        componentDidMount() {
            const {property: e, record: t} = this.props, r = t.params[e.path];
            this.contentRef.current.innerHTML = r
        }

        render() {
            const {property: e} = this.props;
            return g.default.createElement(l.ValueGroup, {label: e.label}, g.default.createElement(l.Box, {
                variant: "grey",
                border: "default"
            }, g.default.createElement(l.Text, {ref: this.contentRef})))
        }
    }

    var Fr = Object.freeze({
        __proto__: null, edit: jr, show: Mr, list: e => {
            const {property: t, record: r} = e, a = r.params[t.path] || "",
                n = a.substring(0, 15) + (a.length > 15 ? "..." : "");
            return g.default.createElement("span", null, n)
        }
    });
    var Gr = a.withTheme(t => {
        var r;
        const {onChange: a, property: n, record: o, theme: s} = t, {reference: c} = n;
        if (!c) throw new Error(`Cannot reference resource in property '${n.path}'`);
        const i = null == o ? void 0 : o.errors[n.path],
            u = null == o ? void 0 : o.params[n.path], [d, p] = e.useState(), [f, m] = e.useState(0),
            h = null !== (r = null == o ? void 0 : o.populated[n.path]) && void 0 !== r ? r : d,
            E = u && h ? {value: h.id, label: h.title} : {value: "", label: ""}, y = l.selectStyles(s);
        return e.useEffect(() => {
            if (!h && u) {
                m(e => e + 1);
                (new et).recordAction({actionName: "show", resourceId: c, recordId: u}).then(({data: e}) => {
                    p(e.record)
                }).finally(() => {
                    m(e => e - 1)
                })
            }
        }, [h, u, c]), g.default.createElement(l.FormGroup, {error: Boolean(i)}, g.default.createElement(Qt, {property: n}), g.default.createElement(x.default, P({
            cacheOptions: !0,
            value: E,
            styles: y,
            defaultOptions: !0,
            loadOptions: async e => {
                const t = new et;
                return (await t.searchRecords({resourceId: c, query: e})).map(e => ({
                    value: e.id,
                    label: e.title,
                    record: e
                }))
            },
            onChange: e => {
                e ? a(n.path, e.value, e.record) : a(n.path, null)
            },
            isClearable: !0,
            isDisabled: n.isDisabled,
            isLoading: f
        }, n.props)), g.default.createElement(l.FormMessage, null, null == i ? void 0 : i.message))
    });
    const zr = E.default(r.Link).withConfig({
            displayName: "reference-value__StyledLink",
            componentId: "flgaqr-0"
        })(["", ";padding-left:", ";padding-right:", ";"], l.ButtonCSS, ({theme: e}) => e.space.xs, ({theme: e}) => e.space.xs),
        Hr = e => {
            const {property: t, record: r} = e, a = new _, n = r.params[t.path], o = r.populated[t.path],
                l = o && o.title || n;
            if (!t.reference) throw new Error(`property: "${t.path}" does not have a reference`);
            if (o && o.recordActions.find(e => "show" === e.name)) {
                const e = a.recordActionUrl({resourceId: t.reference, recordId: n, actionName: "show"});
                return g.default.createElement(zr, {variant: "text", to: e}, l)
            }
            return g.default.createElement("span", null, l)
        };

    class Vr extends g.default.PureComponent {
        render() {
            const {property: e, record: t} = this.props;
            return g.default.createElement(l.ValueGroup, {label: e.label}, g.default.createElement(Hr, {
                property: e,
                record: t
            }))
        }
    }

    class $r extends g.default.PureComponent {
        render() {
            const {property: e, record: t} = this.props;
            return g.default.createElement(Hr, {property: e, record: t})
        }
    }

    class Yr extends g.default.PureComponent {
        constructor(e) {
            super(e), this.api = new et, this.options = [], this.loadOptions = this.loadOptions.bind(this), this.handleChange = this.handleChange.bind(this)
        }

        handleChange(e) {
            const {onChange: t, property: r} = this.props;
            t(r.path, e ? e.value : "")
        }

        async loadOptions(e) {
            const {property: t} = this.props, r = await this.api.searchRecords({resourceId: t.reference, query: e});
            return this.options = r.map(e => ({value: e.id, label: e.title})), this.options
        }

        render() {
            const {property: e, filter: t, theme: r} = this.props, a = void 0 === t[e.path] ? "" : t[e.path],
                n = (this.options || []).find(e => e.value === a);
            return g.default.createElement(l.FormGroup, null, g.default.createElement(l.Label, null, e.label), g.default.createElement(x.default, {
                value: void 0 === n ? "" : n,
                isClearable: !0,
                cacheOptions: !0,
                styles: l.filterStyles(r),
                loadOptions: this.loadOptions,
                onChange: this.handleChange,
                defaultOptions: !0
            }))
        }
    }

    var Zr = a.withTheme(Yr), qr = Object.freeze({__proto__: null, edit: Gr, show: Vr, list: $r, filter: Zr});

    class Wr extends g.default.PureComponent {
        render() {
            const {property: e, record: t} = this.props, r = t.params[e.path] || "";
            return g.default.createElement(l.ValueGroup, {label: e.label}, r.split(/(?:\r\n|\r|\n)/g).map((e, t) => g.default.createElement(g.default.Fragment, {key: t}, e, g.default.createElement("br", null))))
        }
    }

    const Jr = t => {
        var r, a, n;
        const {onChange: o, property: s, record: c} = t,
            i = null !== (r = null === (a = c.params) || void 0 === a ? void 0 : a[s.path]) && void 0 !== r ? r : "", [u, d] = e.useState(i),
            p = null === (n = c.errors) || void 0 === n ? void 0 : n[s.path];
        return e.useEffect(() => {
            u !== i && d(i)
        }, [i]), g.default.createElement(l.FormGroup, {error: Boolean(p)}, g.default.createElement(Qt, {property: s}), g.default.createElement(l.Input, P({
            as: "textarea",
            rows: (u.match(/\n/g) || []).length + 1,
            id: s.path,
            name: s.path,
            onChange: e => d(e.target.value),
            onBlur: () => o(s.path, u),
            value: u,
            disabled: s.isDisabled
        }, s.props)), g.default.createElement(l.FormMessage, null, p && p.message))
    };
    var Kr = e.memo(Jr, ur), Xr = Object.freeze({__proto__: null, show: Wr, edit: Kr});
    const Qr = t => {
        const {property: r, record: a, onChange: n} = t, o = a.params[r.path], [s, c] = e.useState(o),
            i = a.errors && a.errors[r.path], [u, d] = e.useState(!1);
        return e.useEffect(() => {
            s !== o && c(o)
        }, [o]), g.default.createElement(l.FormGroup, {error: !!i}, g.default.createElement(Qt, {property: r}), g.default.createElement(l.InputGroup, null, g.default.createElement(l.Input, P({
            type: u ? "input" : "password",
            className: "input",
            id: r.path,
            name: r.path,
            onChange: e => c(e.target.value),
            onBlur: () => n(r.path, s),
            onKeyDown: e => 13 === e.keyCode && n(r.path, s),
            value: null != s ? s : "",
            disabled: r.isDisabled
        }, r.props)), g.default.createElement(l.Button, {
            variant: u ? "primary" : "text",
            type: "button",
            size: "icon",
            onClick: () => d(!u)
        }, g.default.createElement(l.Icon, {icon: "View"}))), g.default.createElement(l.FormMessage, null, i && i.message))
    };
    var ea = e.memo(Qr, ur), ta = Object.freeze({__proto__: null, edit: ea});
    let ra = {};
    try {
        ra = window
    } catch (e) {
        if ("window is not defined" !== e.message) throw e
    }
    const aa = {
        textarea: Xr,
        boolean: Rr,
        datetime: Dr,
        reference: qr,
        password: ta,
        date: Dr,
        richtext: Fr,
        string: yr,
        number: yr,
        float: yr,
        mixed: null
    }, na = t => {
        const {property: r, resource: a, record: n, filter: o, where: s, onChange: c} = t,
            i = e.useMemo(() => ({...r, path: r.path || r.propertyPath}), [r]), u = `property-${s}-${i.path}`;
        let d = aa[i.type] && aa[i.type][s] || yr[s];
        if (i.components && i.components[s]) {
            const e = i.components[s];
            if (!e) throw new Error(`there is no "${i.path}.components.${s}"`);
            return d = ra.AdminBro.UserComponents[e], g.default.createElement(Wt, null, g.default.createElement(l.Box, {"data-testid": u}, g.default.createElement(d, {
                property: i,
                resource: a,
                record: n,
                filter: o,
                onChange: c,
                where: s
            })))
        }
        const p = nr[s], f = sr[s];
        return r.isArray ? p ? g.default.createElement(p, P({}, t, {
            property: i,
            ItemComponent: na,
            testId: u
        })) : g.default.createElement("div", null) : "mixed" === r.type ? f ? g.default.createElement(f, P({}, t, {
            property: i,
            ItemComponent: na,
            testId: u
        })) : g.default.createElement("div", null) : g.default.createElement(Wt, null, g.default.createElement(l.Box, {"data-testid": u}, g.default.createElement(d, {
            property: i,
            resource: a,
            record: n,
            filter: o,
            onChange: c,
            where: s
        })))
    };
    let oa = {};
    try {
        oa = window
    } catch (e) {
        if ("window is not defined" !== e.message) throw e
    }

    function la(e) {
        return {Edit: e.edit, Show: e.show, List: e.list, Filter: e.filter}
    }

    const sa = Object.assign(na, {
            DefaultType: la(yr),
            Boolean: la(Rr),
            DateTime: la(Dr),
            RichText: la(Fr),
            Reference: la(qr),
            TextArea: la(Xr),
            Password: la(ta)
        }), ca = E.default(r.Link).withConfig({
            displayName: "breadcrumbs__BreadcrumbLink",
            componentId: "yjyesi-0"
        })(["color:", ";font-family:", ";line-height:", ";font-size:", ";text-decoration:none;&:hover{color:", ";}&:after{content:'/';padding:0 ", ";}&:last-child{&:after{content:'';}}"], ({theme: e}) => e.colors.grey40, ({theme: e}) => e.font, ({theme: e}) => e.lineHeights.default, ({theme: e}) => e.fontSizes.default, ({theme: e}) => e.colors.primary100, ({theme: e}) => e.space.default),
        ia = e => {
            const {resource: t, record: r, actionName: a} = e, n = t.actions.find(e => e.name === a), o = new _;
            return g.default.createElement(l.Box, {
                flexGrow: 1,
                className: l.cssClass("Breadcrumbs")
            }, g.default.createElement(ca, {to: o.dashboardUrl()}, "Dashboard"), g.default.createElement(ca, {
                to: t.href ? t.href : "/",
                className: r ? "is-active" : ""
            }, t.name), n && "list" !== n.name && g.default.createElement(ca, {to: "#"}, n.label))
        }, ua = e => {
            const {actions: t, params: r, handleClick: a} = e, n = t.map(e => {
                const t = yt(e, r);
                return {
                    icon: e.icon,
                    label: e.label,
                    variant: e.variant,
                    source: e,
                    href: t || void 0,
                    onClick: t ? a : void 0,
                    "data-testid": wt(e),
                    buttons: []
                }
            }), o = n.reduce((e, t) => {
                const r = t.source;
                if (r.parent) {
                    const a = e[r.parent] || n.find(e => e.source.name === r.parent) || {label: r.parent};
                    return a.buttons = a.buttons || [], a.buttons.push(t), {...e, [r.parent]: a}
                }
                return {...e, [t.source.name]: t}
            }, {});
            return Object.values(o)
        }, da = E.default(({
                               rounded: e,
                               ...t
                           }) => g.default.createElement(r.Link, t)).withConfig({
            displayName: "styled-back-button__StyledLink",
            componentId: "uyhg9d-0"
        })(["", ""], l.ButtonCSS), pa = new _, fa = e => {
            const {resourceId: t, showInDrawer: r} = e, a = r ? "ChevronRight" : "ChevronLeft";
            return g.default.createElement(da, {
                size: "icon",
                to: pa.resourceUrl({resourceId: t, search: window.location.search}),
                rounded: !0,
                mr: "lg",
                type: "button"
            }, g.default.createElement(l.Icon, {icon: a}))
        }, ma = e => {
            const {
                resource: t,
                toggleFilter: r,
                actionPerformed: a,
                record: n,
                action: o,
                tag: c,
                omitActions: i
            } = e, {translateButton: u} = qe(), d = s.useHistory(), p = Ct(a);
            if (o.hideActionHeader) return null;
            const f = t.id, m = {resourceId: f, recordId: null == n ? void 0 : n.id},
                h = (e, t) => xt({action: t, params: m, actionResponseHandler: p, push: d.push})(e), E = ua({
                    actions: n ? n.recordActions.filter(e => !o || o.name !== e.name) : t.resourceActions.filter(e => "new" === e.name && (!o || o.name !== e.name)),
                    params: m,
                    handleClick: h
                });
            r && E.push({label: u("filter", t.id), onClick: r, icon: "SettingsAdjust"});
            const y = ua({
                    actions: t.resourceActions.filter(e => !["list", "new"].includes(e.name)),
                    params: {resourceId: f},
                    handleClick: h
                }), v = o ? o.label : t.name, b = o && "list" === o.name, w = t.resourceActions.find(e => "list" === e.name),
                x = !o.showInDrawer, I = o.showInDrawer ? "" : "lg", S = o.showInDrawer ? "xl" : "default",
                C = o.showInDrawer ? l.H3 : l.H2;
            return g.default.createElement(l.Box, {className: l.cssClass("ActionHeader")}, o.showInDrawer ? "" : g.default.createElement(l.Box, {
                flex: !0,
                flexDirection: "row",
                px: ["default", 0]
            }, g.default.createElement(ia, {
                resource: t,
                actionName: o.name,
                record: n
            }), g.default.createElement(l.Box, {flexShrink: 0}, g.default.createElement(l.ButtonGroup, {
                size: "sm",
                rounded: !0,
                buttons: y
            }))), g.default.createElement(l.Box, {display: ["block", x ? "flex" : "block"]}, g.default.createElement(l.Box, {
                mt: I,
                flexGrow: 1,
                px: ["default", 0]
            }, g.default.createElement(C, {mb: "lg"}, !b && w ? g.default.createElement(fa, {
                resourceId: f,
                showInDrawer: o.showInDrawer
            }) : "", v, c ? g.default.createElement(l.Badge, {
                variant: "primary",
                ml: "default"
            }, c) : "")), i ? "" : g.default.createElement(l.Box, {
                mt: "xl",
                mb: S,
                flexShrink: 0
            }, g.default.createElement(l.ButtonGroup, {buttons: E}))))
        }, ha = e => {
            const {layoutElement: t, resource: r, where: a, record: n, onChange: o} = e, {
                props: s,
                properties: c,
                layoutElements: i,
                component: u
            } = t, {children: d, ...p} = s, f = c.map(e => r.properties[e]), m = v[u];
            return m ? g.default.createElement(m, p, f.map(e => g.default.createElement(l.Box, {
                flexGrow: 1,
                key: e.propertyPath
            }, g.default.createElement(sa, {
                key: e.propertyPath,
                where: a,
                property: e,
                resource: r,
                record: n,
                onChange: o
            }))), i.map((t, r) => g.default.createElement(ha, P({}, e, {
                key: r,
                layoutElement: t
            }))), d) : g.default.createElement(l.MessageBox, {
                size: "sm",
                message: "Javascript Error",
                variant: "danger",
                py: "xl"
            }, "There is no component by the name of", g.default.createElement(l.Badge, {
                size: "sm",
                variant: "danger",
                mx: "default"
            }, u), "in @admin-bro/design-system. Change", g.default.createElement(l.Badge, {
                size: "sm",
                variant: "danger",
                mx: "default"
            }, "@" + u), "to available component like @Header")
        }, ga = e => [e ? "table-cell" : "none", e ? "table-cell" : "none", "table-cell", "table-cell"], Ea = t => {
            const {
                resource: a,
                record: n,
                actionPerformed: o,
                isLoading: s,
                onSelect: c,
                isSelected: i
            } = t, [u, d] = e.useState(n), p = r.useHistory(), f = e.useCallback(e => {
                e.record && !e.redirectUrl ? d(nt(u, e)) : o && o(e)
            }, [o, u]), m = Ct(f);
            e.useEffect(() => {
                d(n)
            }, [n]);
            const {recordActions: h} = u, E = u.recordActions.find(({name: e}) => "show" === e),
                y = u.recordActions.find(({name: e}) => "edit" === e), v = E || y, b = {resourceId: a.id, recordId: u.id},
                w = [{
                    icon: "OverflowMenuHorizontal",
                    variant: "light",
                    label: void 0,
                    "data-testid": "actions-dropdown",
                    buttons: ua({
                        actions: h,
                        params: b,
                        handleClick: (e, t) => xt({action: t, params: b, actionResponseHandler: m, push: p.push})(e)
                    })
                }];
            return g.default.createElement(l.TableRow, {
                onClick: e => {
                    const t = e.target.tagName.toLowerCase();
                    v && "a" !== t && "button" !== t && "svg" !== t && xt({
                        action: v,
                        params: {resourceId: a.id, recordId: u.id},
                        actionResponseHandler: m,
                        push: p.push
                    })(e)
                }, "data-id": u.id
            }, g.default.createElement(l.TableCell, {className: i ? "selected" : "not-selected"}, c && u.bulkActions.length ? g.default.createElement(l.CheckBox, {
                onChange: () => c(u),
                checked: i
            }) : null), a.listProperties.map(e => g.default.createElement(l.TableCell, {
                style: {cursor: "pointer"},
                key: e.propertyPath,
                "data-property-name": e.propertyPath,
                display: ga(e.isTitle)
            }, s ? g.default.createElement(l.Placeholder, {style: {height: 14}}) : g.default.createElement(sa, {
                key: e.propertyPath,
                where: "list",
                property: e,
                resource: a,
                record: u
            }))), g.default.createElement(l.TableCell, {key: "options"}, h.length ? g.default.createElement(l.ButtonGroup, {buttons: w}) : ""))
        };

    class ya extends g.default.PureComponent {
        constructor(e) {
            super(e), this.isActive = this.isActive.bind(this)
        }

        isActive() {
            const {sortBy: e, property: t} = this.props;
            return e === t.propertyPath
        }

        render() {
            const {property: e, location: t, direction: a} = this.props, n = new URLSearchParams(t.search),
                o = this.isActive() && "asc" === a ? "desc" : "asc", s = "Caret" + ("asc" === a ? "Up" : "Down");
            return n.set("direction", o), n.set("sortBy", e.propertyPath), g.default.createElement(r.NavLink, {
                to: {search: n.toString()},
                className: l.cssClass("SortLink")
            }, e.label, this.isActive() ? g.default.createElement(l.Icon, {
                icon: s,
                color: "primary100",
                ml: "default"
            }) : "")
        }
    }

    var va = r.withRouter(ya);
    const ba = e => {
            const {property: t, titleProperty: r, display: a} = e, n = t.propertyPath === r.propertyPath;
            return g.default.createElement(l.TableCell, {
                className: n ? "main" : void 0,
                display: a
            }, t.isSortable ? g.default.createElement(va, e) : t.label)
        }, wa = e => {
            const {titleProperty: t, properties: r, sortBy: a, direction: n, onSelectAll: o, selectedAll: s} = e;
            return g.default.createElement(l.TableHead, null, g.default.createElement(l.TableRow, null, g.default.createElement(l.TableCell, null, o ? g.default.createElement(l.CheckBox, {
                style: {marginLeft: 5},
                onChange: () => o(),
                checked: s
            }) : null), r.map(e => g.default.createElement(ba, {
                display: ga(e.isTitle),
                key: e.propertyPath,
                titleProperty: t,
                property: e,
                sortBy: a,
                direction: n
            })), g.default.createElement(l.TableCell, {key: "actions", style: {width: 80}})))
        }, xa = e => {
            const {children: t, action: r, actionPerformed: a, resourceId: n, recordId: o, recordIds: l} = e, {
                href: s,
                handleClick: c
            } = At(r, {resourceId: n, recordId: o, recordIds: l}, a);
            if (!r) return null;
            const i = g.default.Children.toArray(t)[0];
            if (!i || "string" == typeof i || "number" == typeof i || "boolean" == typeof i) throw new Error("ActionButton has to have one child");
            return g.default.cloneElement(i, {onClick: c, "data-testid": wt(r), href: s})
        }, Ia = k(e => {
            const {resource: t} = e, {translateButton: r, translateMessage: a} = qe(),
                n = t.resourceActions.find(e => "new" === e.name);
            return g.default.createElement(l.InfoBox, {title: a("noRecords", t.id)}, g.default.createElement(l.Text, {mb: "xxl"}, a("noRecordsInResource", t.id)), n ? g.default.createElement(xa, {
                action: n,
                resourceId: t.id
            }, g.default.createElement(l.Button, {variant: "primary"}, g.default.createElement(l.Icon, {icon: "Add"}), r("createFirstRecord", t.id))) : "")
        }, "NoRecords"), Sa = e => Object.values(e.reduce((e, t) => ({
            ...e, ...t.bulkActions.reduce((e, t) => ({
                ...e,
                [t.name]: t
            }), {})
        }), {})), Ca = e => {
            const {resource: t, selectedRecords: r} = e, {translateLabel: a} = qe(), n = s.useHistory(), o = Ct();
            if (!r || !r.length) return null;
            const c = {resourceId: t.id, recordIds: r.map(e => e.id)}, i = ua({
                actions: Sa(r),
                params: c,
                handleClick: (e, t) => xt({action: t, params: c, actionResponseHandler: o, push: n.push})(e)
            });
            return g.default.createElement(l.TableCaption, null, g.default.createElement(l.Box, {
                flex: !0,
                py: "sm",
                alignItems: "center"
            }, g.default.createElement(l.Title, {mr: "lg"}, a("selectedRecords", t.id, {selected: r.length})), g.default.createElement(l.ButtonGroup, {
                size: "sm",
                rounded: !0,
                buttons: i
            })))
        }, Aa = e => {
            const {
                resource: t,
                records: r,
                actionPerformed: a,
                sortBy: n,
                direction: o,
                isLoading: s,
                onSelect: c,
                selectedRecords: i,
                onSelectAll: u
            } = e;
            if (!r.length) return s ? g.default.createElement(l.Loader, null) : g.default.createElement(Ia, {resource: t});
            const d = i && !!r.find(e => i.find(t => t.id === e.id)), p = !!r.find(e => e.bulkActions.length);
            return g.default.createElement(l.Table, null, g.default.createElement(Ca, {
                resource: t,
                selectedRecords: i
            }), g.default.createElement(wa, {
                properties: t.listProperties,
                titleProperty: t.titleProperty,
                direction: o,
                sortBy: n,
                onSelectAll: p ? u : void 0,
                selectedAll: d
            }), g.default.createElement(l.TableBody, null, r.map(e => g.default.createElement(Ea, {
                record: e,
                resource: t,
                key: e.id,
                actionPerformed: a,
                isLoading: s,
                onSelect: c,
                isSelected: i && !!i.find(t => t.id === e.id)
            }))))
        }, Ra = e => ({addNotice: t => e(rt(t))}), _a = e => t.connect(null, Ra)(e), Pa = {
            new: t => {
                const {record: r, resource: a, action: n} = t, {
                    record: o,
                    handleChange: c,
                    submit: i,
                    loading: u,
                    setRecord: d
                } = gt(r, a.id), {translateButton: p} = qe(), f = s.useHistory();
                e.useEffect(() => {
                    r && d(r)
                }, [r]);
                return g.default.createElement(l.Box, {
                    as: "form", onSubmit: e => (e.preventDefault(), i().then(e => {
                        e.data.redirectUrl && f.push(It(e.data.redirectUrl)), e.data.record.id && c({
                            params: {},
                            populated: {},
                            errors: {}
                        })
                    }), !1), flex: !0, flexGrow: 1, flexDirection: "column"
                }, g.default.createElement(l.DrawerContent, null, (null == n ? void 0 : n.showInDrawer) ? g.default.createElement(ma, t) : null, n.layout ? n.layout.map((e, r) => g.default.createElement(ha, P({
                    key: r,
                    layoutElement: e
                }, t, {
                    where: "edit",
                    onChange: c,
                    record: o
                }))) : a.editProperties.map(e => g.default.createElement(sa, {
                    key: e.propertyPath,
                    where: "edit",
                    onChange: c,
                    property: e,
                    resource: a,
                    record: o
                }))), g.default.createElement(l.DrawerFooter, null, g.default.createElement(l.Button, {
                    variant: "primary",
                    size: "lg",
                    type: "submit",
                    "data-testid": "button-save"
                }, u ? g.default.createElement(l.Icon, {icon: "Fade", spin: !0}) : null, p("save", a.id))))
            }, edit: t => {
                const {record: r, resource: a, action: n} = t, {
                    record: o,
                    handleChange: c,
                    submit: i,
                    loading: u,
                    setRecord: d
                } = gt(r, a.id), {translateButton: p} = qe(), f = s.useHistory();
                e.useEffect(() => {
                    r && d(r)
                }, [r]);
                return g.default.createElement(l.Box, {
                    as: "form", onSubmit: e => (e.preventDefault(), i().then(e => {
                        e.data.redirectUrl && f.push(It(e.data.redirectUrl))
                    }), !1), flex: !0, flexGrow: 1, flexDirection: "column"
                }, g.default.createElement(l.DrawerContent, null, (null == n ? void 0 : n.showInDrawer) ? g.default.createElement(ma, t) : null, n.layout ? n.layout.map((e, r) => g.default.createElement(ha, P({
                    key: r,
                    layoutElement: e
                }, t, {
                    where: "edit",
                    onChange: c,
                    record: o
                }))) : a.editProperties.map(e => g.default.createElement(sa, {
                    key: e.propertyPath,
                    where: "edit",
                    onChange: c,
                    property: e,
                    resource: a,
                    record: o
                }))), g.default.createElement(l.DrawerFooter, null, g.default.createElement(l.Button, {
                    variant: "primary",
                    size: "lg",
                    type: "submit",
                    "data-testid": "button-save"
                }, u ? g.default.createElement(l.Icon, {icon: "Fade", spin: !0}) : null, p("save", a.id))))
            }, show: e => {
                const {resource: t, record: r, action: a} = e, n = t.showProperties;
                return g.default.createElement(l.DrawerContent, null, (null == a ? void 0 : a.showInDrawer) ? g.default.createElement(ma, e) : null, a.layout ? a.layout.map((t, r) => g.default.createElement(ha, P({
                    key: r,
                    layoutElement: t
                }, e, {where: "show"}))) : n.map(e => g.default.createElement(sa, {
                    key: e.propertyPath,
                    where: "show",
                    property: e,
                    resource: t,
                    record: r
                })))
            }, list: ({resource: t, setTag: r}) => {
                const {
                        records: a,
                        loading: n,
                        direction: o,
                        sortBy: c,
                        page: i,
                        total: u,
                        fetchData: d,
                        perPage: p
                    } = Bt(t.id), {selectedRecords: f, handleSelect: m, handleSelectAll: h, setSelectedRecords: E} = Nt(a),
                    y = s.useLocation(), v = s.useHistory();
                e.useEffect(() => {
                    r && r(u.toString())
                }, [u]), e.useEffect(() => {
                    E([])
                }, [t.id]), e.useEffect(() => {
                    new URLSearchParams(y.search).get("refresh") && E([])
                }, [y.search]);
                return g.default.createElement(l.Box, {variant: "white"}, g.default.createElement(Aa, {
                    resource: t,
                    records: a,
                    actionPerformed: () => d(),
                    onSelect: m,
                    onSelectAll: h,
                    selectedRecords: f,
                    direction: o,
                    sortBy: c,
                    isLoading: n
                }), g.default.createElement(l.Text, {
                    mt: "xl",
                    textAlign: "center"
                }, g.default.createElement(l.Pagination, {
                    page: i, perPage: p, total: u, onChange: e => {
                        const t = new URLSearchParams(y.search);
                        t.set("page", e.toString()), v.push({search: t.toString()})
                    }
                })))
            }, bulkDelete: _a(s.withRouter(t => {
                const {
                    resource: r,
                    records: a,
                    action: n,
                    addNotice: o,
                    history: s
                } = t, [c, i] = e.useState(!1), {translateMessage: u, translateButton: d} = qe();
                if (!a) return g.default.createElement(l.Text, null, u("pickSomeFirstToRemove", r.id));
                return g.default.createElement(g.default.Fragment, null, g.default.createElement(l.DrawerContent, null, (null == n ? void 0 : n.showInDrawer) ? g.default.createElement(ma, P({omitActions: !0}, t)) : null, g.default.createElement(l.MessageBox, {
                    mb: "xxl",
                    variant: "danger",
                    message: u("theseRecordsWillBeRemoved", r.id, {count: a.length})
                }), g.default.createElement(l.Table, null, g.default.createElement(l.TableBody, null, a.map(e => g.default.createElement(l.TableRow, {key: e.id}, g.default.createElement(l.TableCell, null, g.default.createElement(sa, {
                    where: "list",
                    property: r.titleProperty,
                    resource: r,
                    record: e
                }))))))), g.default.createElement(l.DrawerFooter, null, g.default.createElement(l.Button, {
                    variant: "primary",
                    size: "lg",
                    onClick: () => {
                        const e = new et;
                        i(!0);
                        const t = a.map(e => e.id);
                        e.bulkAction({resourceId: r.id, actionName: n.name, recordIds: t, method: "post"}).then(e => {
                            if (i(!1), e.data.notice && o(e.data.notice), e.data.redirectUrl) {
                                const t = new URLSearchParams(window.location.search);
                                t.delete("recordIds"), s.push(It(e.data.redirectUrl, t.toString()))
                            }
                        }).catch(e => {
                            throw i(!1), o({message: u("bulkDeleteError", r.id), type: "error"}), e
                        })
                    }
                }, c ? g.default.createElement(l.Icon, {
                    icon: "Fade",
                    spin: !0
                }) : null, d("confirmRemovalMany", r.id, {count: a.length}))))
            }))
        }, ka = "https://adminbro.com", Ba = {rootPath: "/admin", logoutPath: "/admin/logout", loginPath: "/admin/login"},
        Na = e => {
            const {resource: t, action: r, record: a, records: o, setTag: s} = e,
                c = [ka, "BaseAction.html"].join("/"), {translateMessage: i} = qe();
            let u = Pa[r.name];
            return r.component && (u = AdminBro.UserComponents[r.component]), u ? g.default.createElement(Wt, null, g.default.createElement(u, {
                action: r,
                resource: t,
                record: a,
                records: o,
                setTag: s
            })) : u || g.default.createElement(l.MessageBox, {variant: "danger"}, i("noActionComponent"), g.default.createElement(n.Trans, {key: "messages.buttons.seeTheDocumentation"}, "See:", g.default.createElement(l.Link, {
                ml: "default",
                href: c
            }, "the documentation")))
        }, Ta = e => {
            const {children: t, title: r, testId: a} = e;
            return g.default.createElement(l.MessageBox, {
                "data-testid": a,
                message: r
            }, g.default.createElement(l.Text, null, t))
        }, La = e => {
            const {resourceId: t} = e, {translateMessage: r} = qe();
            return g.default.createElement(l.MessageBox, {
                message: "404 - PAGE NOT FOUND",
                "data-testid": "NoResourceError",
                variant: "info",
                m: "xxl"
            }, g.default.createElement(l.Text, null, r("error404Resource", t, {resourceId: t})))
        }, Oa = e => {
            const {resourceId: t, actionName: r} = e, {translateMessage: a} = qe();
            return g.default.createElement(l.MessageBox, {
                message: "404 - PAGE NOT FOUND",
                "data-testid": "NoActionError",
                variant: "info",
                m: "xxl"
            }, g.default.createElement(l.Text, null, a("error404Action", t, {resourceId: t, actionName: r})))
        }, Da = e => {
            const {resourceId: t, recordId: r} = e, {translateMessage: a} = qe();
            return g.default.createElement(l.MessageBox, {
                message: "404 - PAGE NOT FOUND",
                "data-testid": "NoRecordError",
                variant: "info",
                m: "xxl"
            }, g.default.createElement(l.Text, null, a("error404Record", t, {resourceId: t, recordId: r})))
        }, Ua = E.default(l.Box).withConfig({
            displayName: "wrapper__StyledWrapper",
            componentId: "gd2y70-0"
        })(["& ", "{background:", ";padding:", ";overflow:visible;}& ", "{background:", ";padding:0 ", " ", ";}"], l.DrawerContent, ({theme: e}) => e.colors.white, ({theme: e}) => e.space.xxl, l.DrawerFooter, ({theme: e}) => e.colors.white, ({theme: e}) => e.space.xxl, ({theme: e}) => e.space.xxl),
        ja = e => {
            const {children: t, variant: r, color: a, ...n} = e;
            return g.default.createElement(Ua, P({}, n, {variant: "grey", mx: "auto"}), t)
        }, Ma = ({children: t, width: r}) => {
            const [n, o] = e.useState(window.document.getElementById("drawerPortal"));
            if (!n && window) {
                const e = window.document.createElement("div"),
                    t = g.default.createElement(a.ThemeProvider, {theme: window.THEME}, g.default.createElement(l.Drawer, {
                        id: "drawerPortal",
                        className: "hidden"
                    }));
                window.document.body.appendChild(e), p.render(t, e, () => {
                    o(window.document.getElementById("drawerPortal"))
                })
            }
            return e.useEffect(() => n ? (n.classList.remove("hidden"), r && (n.style.width = Array.isArray(r) ? r[0].toString() : r.toString()), () => {
                n.style.width = l.DEFAULT_DRAWER_WIDTH, n.classList.add("hidden")
            }) : () => {
            }, [n]), n ? p.createPortal(t, n) : null
        }, Fa = t => {
            const {resource: a, isVisible: n, toggleFilter: o} = t, s = a.filterProperties,
                c = r.useLocation(), [i, u] = e.useState((e => {
                    const t = {}, r = new URLSearchParams(e.search);
                    for (const e of r.entries()) {
                        const [r, a] = e;
                        r.match("filters.") && (t[r.replace("filters.", "")] = a)
                    }
                    return t
                })(c)), d = r.useRouteMatch(), p = r.useHistory(), {translateLabel: f, translateButton: m} = qe();
            e.useEffect(() => u({}), [d.params.resourceId]);
            const h = (e, t) => {
                if (e.params) throw new Error("you can not pass RecordJSON to filters");
                u({...i, [e]: t})
            };
            return g.default.createElement(l.Drawer, {
                variant: "filter", isHidden: !n, as: "form", onSubmit: e => {
                    e.preventDefault();
                    const t = new URLSearchParams(window.location.search);
                    return Object.keys(i).forEach(e => {
                        "" !== i[e] ? t.set("filters." + e, i[e]) : t.delete("filters." + e)
                    }), t.set("page", "1"), p.push(`${p.location.pathname}?${t.toString()}`), !1
                }
            }, g.default.createElement(l.DrawerContent, null, g.default.createElement(l.H3, null, g.default.createElement(l.Button, {
                type: "button",
                size: "icon",
                rounded: !0,
                mr: "lg",
                onClick: () => o()
            }, g.default.createElement(l.Icon, {
                icon: "ChevronRight",
                color: "white"
            })), f("filters", a.id)), g.default.createElement(l.Box, {my: "x3"}, s.map(e => g.default.createElement(sa, {
                key: e.propertyPath,
                where: "filter",
                onChange: h,
                property: e,
                filter: i,
                resource: a
            })))), g.default.createElement(l.DrawerFooter, null, g.default.createElement(l.Button, {
                variant: "primary",
                size: "lg"
            }, m("applyChanges", a.id)), g.default.createElement(l.Button, {
                variant: "text", size: "lg", onClick: e => {
                    e.preventDefault();
                    const t = new URLSearchParams, r = new URLSearchParams(window.location.search);
                    for (const e of r.keys()) e.match("filters.") || t.set(e, r.get(e));
                    const a = "" === t.toString() ? "?" + t.toString() : "";
                    p.push(p.location.pathname + a), u({})
                }, type: "button", color: "white"
            }, m("resetFilter", a.id))))
        };
    var Ga = Object.freeze({
        __proto__: null,
        SortLink: va,
        NoRecords: Ia,
        PropertyHeader: ba,
        RecordInList: Ea,
        RecordsTableHeader: wa,
        RecordsTable: Aa,
        SelectedRecords: Ca,
        SidebarResourceSection: Ot,
        Sidebar: Ut,
        ActionButton: xa,
        ActionHeader: ma,
        BaseActionComponent: Na,
        BreadcrumbLink: ca,
        Breadcrumbs: ia,
        DashboardHeader: $t,
        Dashboard: Zt,
        ErrorBoundary: Wt,
        DrawerPortal: Ma,
        NoResourceError: La,
        NoActionError: Oa,
        NoRecordError: Da,
        ErrorMessageBox: Ta,
        FilterDrawer: Fa,
        LoggedIn: jt,
        NoticeElement: Ht,
        NoticeBox: Vt,
        TopBar: zt,
        Version: Ft
    });
    const za = new et, Ha = () => {
        const [t, r] = e.useState(), [a, n] = e.useState(!0), o = s.useRouteMatch(),
            c = at(), {translateMessage: i} = qe(), {actionName: u, recordId: d, resourceId: p} = o.params, f = Tt(p),
            m = t && t.recordActions.find(e => e.name === u), h = () => {
                n(!0), za.recordAction(o.params).then(e => {
                    n(!1), r(e.data.record)
                }).catch(e => {
                    throw c({message: i("errorFetchingRecord", p), type: "error"}), e
                })
            };
        e.useEffect(() => {
            h()
        }, [u, d, p]);
        const E = e.useCallback((e, t) => {
            t.record ? r(nt(e, t)) : h()
        }, [h]);
        if (!f) return g.default.createElement(La, {resourceId: p});
        const y = t && t.id.toString() !== d;
        if (a || y) {
            const e = f.actions.find(e => e.name === u);
            return (null == e ? void 0 : e.showInDrawer) ? g.default.createElement(Ma, null, g.default.createElement(l.Loader, null)) : g.default.createElement(l.Loader, null)
        }
        return m ? t ? m.showInDrawer ? g.default.createElement(Ma, {width: m.containerWidth}, g.default.createElement(Na, {
            action: m,
            resource: f,
            record: t
        })) : g.default.createElement(ja, {width: m.containerWidth}, g.default.createElement(ma, {
            resource: f,
            action: m,
            record: t,
            actionPerformed: e => E(t, e)
        }), g.default.createElement(Na, {
            action: m,
            resource: f,
            record: t
        })) : g.default.createElement(Da, {resourceId: p, recordId: d}) : g.default.createElement(Oa, {
            resourceId: p,
            actionName: u
        })
    };
    var Va = t.connect(e => ({resources: e.resources}))(e => {
        const {resources: t, match: r} = e, {resourceId: a, actionName: n} = r.params, o = t.find(e => e.id === a);
        if (!o) return g.default.createElement(La, {resourceId: a});
        const l = o.resourceActions.find(e => e.name === n);
        return l ? l.showInDrawer ? g.default.createElement(Ma, {width: l.containerWidth}, g.default.createElement(Na, {
            action: l,
            resource: o
        })) : g.default.createElement(ja, {width: l.containerWidth}, g.default.createElement(ma, {
            resource: o,
            action: l
        }), g.default.createElement(Na, {action: l, resource: o})) : g.default.createElement(Oa, {
            resourceId: a,
            actionName: n
        })
    });
    const $a = new et, Ya = () => {
        const t = s.useRouteMatch(), [r, a] = e.useState([]), [n, o] = e.useState(!1), {translateMessage: c} = qe(),
            i = at(), u = s.useLocation(), {resourceId: d, actionName: p} = t.params, f = Tt(d);
        if (e.useEffect(() => {
            (() => {
                const e = new URLSearchParams(u.search).get("recordIds"), t = e ? e.split(",") : [];
                o(!0), $a.bulkAction({resourceId: d, recordIds: t, actionName: p}).then(e => {
                    o(!1), a(e.data.records)
                }).catch(e => {
                    throw o(!1), i({message: c("errorFetchingRecords", d), type: "error"}), e
                })
            })()
        }, [t.params.resourceId, t.params.actionName]), !f) return g.default.createElement(La, {resourceId: d});
        if (!r && !n) return g.default.createElement(Ta, {title: "No records"}, g.default.createElement("p", null, c("noRecordsSelected", d)));
        const m = Sa(r || []).find(e => e.name === p);
        if (n) {
            const e = f.actions.find(e => e.name === p);
            return (null == e ? void 0 : e.showInDrawer) ? g.default.createElement(Ma, null, g.default.createElement(l.Loader, null)) : g.default.createElement(l.Loader, null)
        }
        return m ? m.showInDrawer ? g.default.createElement(Ma, {width: m.containerWidth}, g.default.createElement(Na, {
            action: m,
            resource: f,
            records: r
        })) : g.default.createElement(ja, {width: m.containerWidth}, (null == m ? void 0 : m.showInDrawer) ? "" : g.default.createElement(ma, {
            resource: f,
            action: m
        }), g.default.createElement(Na, {
            action: m,
            resource: f,
            records: r
        })) : g.default.createElement(Oa, {resourceId: d, actionName: p})
    };

    class Za extends g.default.Component {
        constructor(e) {
            super(e), this.state = {isClient: !1}
        }

        componentDidMount() {
            this.setState({isClient: !0})
        }

        render() {
            const {pages: e, match: t} = this.props, {params: r} = t, {pageName: a} = r, {isClient: n} = this.state,
                o = e.find(e => e.name === a);
            if (!o) return g.default.createElement(Ta, {title: "There is no page of given name"}, g.default.createElement("p", null, "Page:", g.default.createElement("b", null, ` "${a}" `), "does not exist."));
            const l = AdminBro.UserComponents[o.component];
            return l && n ? g.default.createElement(Wt, null, g.default.createElement(l, null)) : g.default.createElement(Ta, {title: "No component specified"}, g.default.createElement("p", null, "You have to specify component which will render this Page"))
        }
    }

    var qa = t.connect(e => ({pages: e.pages}))(Za);
    var Wa = t.connect(e => ({resources: e.resources}))(t => {
        const {resources: a, match: n, location: o} = t, {resourceId: s} = n.params, [c, i] = e.useState((e => {
            const t = new URLSearchParams(e);
            for (const e of t.keys()) if (e.match("filters.")) return !0;
            return !1
        })(o.search)), [u, d] = e.useState(""), p = a.find(e => e.id === s);
        if (!p) return g.default.createElement(La, {resourceId: s});
        const f = (e => {
            const t = new _,
                a = t.recordActionUrl({resourceId: ":resourceId", recordId: ":recordId", actionName: ":actionName"}),
                n = t.resourceActionUrl({resourceId: ":resourceId", actionName: ":actionName"}),
                o = t.bulkActionUrl({resourceId: ":resourceId", actionName: ":actionName"}), l = r.useRouteMatch(n),
                s = r.useRouteMatch(a), c = r.useRouteMatch(o),
                i = (null == l ? void 0 : l.params.actionName) || (null == s ? void 0 : s.params.actionName) || (null == c ? void 0 : c.params.actionName);
            return i ? e.actions.find(e => e.name === i) : void 0
        })(p);
        if (f && !f.showInDrawer) return null;
        const m = p.resourceActions.find(e => "list" === e.name);
        if (!m) return g.default.createElement(Oa, {resourceId: s, actionName: "list"});
        const h = m.showFilter ? () => i(!c) : void 0;
        return g.default.createElement(l.Box, {
            variant: "grey",
            width: m.containerWidth,
            mx: "auto"
        }, g.default.createElement(ma, {
            resource: p,
            action: m,
            tag: u,
            toggleFilter: h
        }), g.default.createElement(Na, {
            action: m,
            resource: p,
            setTag: d
        }), m.showFilter ? g.default.createElement(Fa, {
            resource: p, isVisible: c, toggleFilter: () => {
                i(!c)
            }
        }) : "")
    });
    const Ja = a.createGlobalStyle`
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${({theme: e}) => e.colors.grey100}
  }
`, Ka = new _, Xa = () => {
        const [t, a] = e.useState(!1), n = s.useLocation();
        e.useEffect(() => {
            t && a(!1)
        }, [n]);
        const o = Ka.recordActionUrl({resourceId: ":resourceId", recordId: ":recordId", actionName: ":actionName"}),
            c = Ka.resourceActionUrl({resourceId: ":resourceId", actionName: ":actionName"}),
            i = Ka.bulkActionUrl({resourceId: ":resourceId", actionName: ":actionName"}),
            u = Ka.resourceUrl({resourceId: ":resourceId"}), d = Ka.pageUrl(":pageName");
        return g.default.createElement(g.default.Fragment, null, g.default.createElement(l.Reset, null), g.default.createElement(Ja, null), g.default.createElement(l.Box, {
            height: "100%",
            flex: !0
        }, t ? g.default.createElement(l.Overlay, {onClick: () => a(!t)}) : null, g.default.createElement(Ut, {isVisible: t}), g.default.createElement(l.Box, {
            flex: !0,
            flexGrow: 1,
            flexDirection: "column",
            overflowY: "auto",
            bg: "bg"
        }, g.default.createElement(zt, {toggleSidebar: () => a(!t)}), g.default.createElement(l.Box, {
            position: "absolute",
            top: 0,
            zIndex: "2000"
        }, g.default.createElement(Vt, null)), g.default.createElement(r.Switch, null, g.default.createElement(r.Route, {
            path: Ka.dashboardUrl(),
            exact: !0,
            component: Kt
        }), g.default.createElement(r.Route, {path: u, component: Wa}), g.default.createElement(r.Route, {
            path: d,
            exact: !0,
            component: qa
        })), g.default.createElement(r.Switch, null, g.default.createElement(r.Route, {
            path: o,
            component: Ha
        }), g.default.createElement(r.Route, {path: c, component: Va}), g.default.createElement(r.Route, {
            path: i,
            component: Ya
        })))))
    }, Qa = f.combineReducers({
        resources: (e = [], t) => {
            switch (t.type) {
                case"RESOURCES_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }, branding: (e = {}, t) => {
            switch (t.type) {
                case"BRANDING_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }, assets: (e = {}, t) => {
            switch (t.type) {
                case"ASSETS_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }, paths: (e = Ba, t) => {
            switch (t.type) {
                case"PATHS_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }, session: (e = null, t) => {
            switch (t.type) {
                case"SESSION_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }, dashboard: (e = {}, t) => {
            switch (t.type) {
                case"DASHBOARD_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }, notices: (e = [], t) => {
            switch (t.type) {
                case"ADD_NOTICE":
                    return [t.data];
                case"DROP_NOTICE":
                    return e.filter(e => e.id !== t.data.noticeId);
                case"SET_NOTICE_PROGRESS":
                    return e.map(e => ({...e, progress: e.id === t.data.noticeId ? t.data.progress : e.progress}));
                default:
                    return e
            }
        }, versions: (e = {}, t) => {
            switch (t.type) {
                case"VERSIONS_INITIALIZE":
                    return {admin: t.data.admin, app: t.data.app};
                default:
                    return e
            }
        }, pages: (e = [], t) => {
            switch (t.type) {
                case"PAGES_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }, locale: (e = {language: "en", translations: {}}, t) => {
            switch (t.type) {
                case"LOCALE_INITIALIZE":
                    return t.data;
                default:
                    return e
            }
        }
    });
    const en = ((e = {}) => f.createStore(Qa, e))(window.REDUX_STATE),
        tn = window.THEME, {locale: rn} = window.REDUX_STATE;
    y.default.use(n.initReactI18next).init({
        resources: {[rn.language]: {translation: rn.translations}},
        lng: rn.language,
        interpolation: {escapeValue: !1}
    });
    const an = g.default.createElement(t.Provider, {store: en}, g.default.createElement(a.ThemeProvider, {theme: tn}, g.default.createElement(r.BrowserRouter, null, g.default.createElement(Xa, null))));
    return window.regeneratorRuntime = C, {
        withNotice: _a,
        Application: an,
        ViewHelpers: _,
        UserComponents: {},
        ApiClient: et,
        BasePropertyComponent: sa,
        env: {NODE_ENV: "production"}, ...Ga, ...Lt,
        flat: dt,
        flatten: dt.flatten,
        unflatten: dt.unflatten
    }
}(React, ReactRedux, ReactRouterDOM, styled, ReactI18Next, i18n, AdminBroDesignSystem, ReactRouter, axios, flat, ReactSelect, ReactSelectAsync, ReactDOM, Redux);
