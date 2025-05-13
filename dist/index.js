import { getInput as kn, startGroup as Yr, info as On, endGroup as kr, setFailed as hu } from "@actions/core";
import { context as Eu, getOctokit as pu } from "@actions/github";
function Mu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var De = {}, Br = {}, Ae = {}, me = {}, pn = { exports: {} }, Nu = pn.exports, Gn;
function Du() {
  return Gn || (Gn = 1, function(e, d) {
    (function(_, n) {
      e.exports = n();
    })(Nu, function() {
      var _ = "month", n = "quarter";
      return function(f, m) {
        var u = m.prototype;
        u.quarter = function(t) {
          return this.$utils().u(t) ? Math.ceil((this.month() + 1) / 3) : this.month(this.month() % 3 + 3 * (t - 1));
        };
        var i = u.add;
        u.add = function(t, r) {
          return t = Number(t), this.$utils().p(r) === n ? this.add(3 * t, _) : i.bind(this)(t, r);
        };
        var s = u.startOf;
        u.startOf = function(t, r) {
          var a = this.$utils(), o = !!a.u(r) || r;
          if (a.p(t) === n) {
            var l = this.quarter() - 1;
            return o ? this.month(3 * l).startOf(_).startOf("day") : this.month(3 * l + 2).endOf(_).endOf("day");
          }
          return s.bind(this)(t, r);
        };
      };
    });
  }(pn)), pn.exports;
}
var Mn = { exports: {} }, Au = Mn.exports, zn;
function k() {
  return zn || (zn = 1, function(e, d) {
    (function(_, n) {
      e.exports = n();
    })(Au, function() {
      var _ = 1e3, n = 6e4, f = 36e5, m = "millisecond", u = "second", i = "minute", s = "hour", t = "day", r = "week", a = "month", o = "quarter", l = "year", c = "date", g = "Invalid Date", P = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, T = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(U) {
        var I = ["th", "st", "nd", "rd"], O = U % 100;
        return "[" + U + (I[(O - 20) % 10] || I[O] || I[0]) + "]";
      } }, h = function(U, I, O) {
        var w = String(U);
        return !w || w.length >= I ? U : "" + Array(I + 1 - w.length).join(O) + U;
      }, R = { s: h, z: function(U) {
        var I = -U.utcOffset(), O = Math.abs(I), w = Math.floor(O / 60), C = O % 60;
        return (I <= 0 ? "+" : "-") + h(w, 2, "0") + ":" + h(C, 2, "0");
      }, m: function U(I, O) {
        if (I.date() < O.date()) return -U(O, I);
        var w = 12 * (O.year() - I.year()) + (O.month() - I.month()), C = I.clone().add(w, a), v = O - C < 0, j = I.clone().add(w + (v ? -1 : 1), a);
        return +(-(w + (O - C) / (v ? C - j : j - C)) || 0);
      }, a: function(U) {
        return U < 0 ? Math.ceil(U) || 0 : Math.floor(U);
      }, p: function(U) {
        return { M: a, y: l, w: r, d: t, D: c, h: s, m: i, s: u, ms: m, Q: o }[U] || String(U || "").toLowerCase().replace(/s$/, "");
      }, u: function(U) {
        return U === void 0;
      } }, E = "en", p = {};
      p[E] = T;
      var A = "$isDayjsObject", N = function(U) {
        return U instanceof S || !(!U || !U[A]);
      }, b = function U(I, O, w) {
        var C;
        if (!I) return E;
        if (typeof I == "string") {
          var v = I.toLowerCase();
          p[v] && (C = v), O && (p[v] = O, C = v);
          var j = I.split("-");
          if (!C && j.length > 1) return U(j[0]);
        } else {
          var L = I.name;
          p[L] = I, C = L;
        }
        return !w && C && (E = C), C || !w && E;
      }, D = function(U, I) {
        if (N(U)) return U.clone();
        var O = typeof I == "object" ? I : {};
        return O.date = U, O.args = arguments, new S(O);
      }, M = R;
      M.l = b, M.i = N, M.w = function(U, I) {
        return D(U, { locale: I.$L, utc: I.$u, x: I.$x, $offset: I.$offset });
      };
      var S = function() {
        function U(O) {
          this.$L = b(O.locale, null, !0), this.parse(O), this.$x = this.$x || O.x || {}, this[A] = !0;
        }
        var I = U.prototype;
        return I.parse = function(O) {
          this.$d = function(w) {
            var C = w.date, v = w.utc;
            if (C === null) return /* @__PURE__ */ new Date(NaN);
            if (M.u(C)) return /* @__PURE__ */ new Date();
            if (C instanceof Date) return new Date(C);
            if (typeof C == "string" && !/Z$/i.test(C)) {
              var j = C.match(P);
              if (j) {
                var L = j[2] - 1 || 0, H = (j[7] || "0").substring(0, 3);
                return v ? new Date(Date.UTC(j[1], L, j[3] || 1, j[4] || 0, j[5] || 0, j[6] || 0, H)) : new Date(j[1], L, j[3] || 1, j[4] || 0, j[5] || 0, j[6] || 0, H);
              }
            }
            return new Date(C);
          }(O), this.init();
        }, I.init = function() {
          var O = this.$d;
          this.$y = O.getFullYear(), this.$M = O.getMonth(), this.$D = O.getDate(), this.$W = O.getDay(), this.$H = O.getHours(), this.$m = O.getMinutes(), this.$s = O.getSeconds(), this.$ms = O.getMilliseconds();
        }, I.$utils = function() {
          return M;
        }, I.isValid = function() {
          return this.$d.toString() !== g;
        }, I.isSame = function(O, w) {
          var C = D(O);
          return this.startOf(w) <= C && C <= this.endOf(w);
        }, I.isAfter = function(O, w) {
          return D(O) < this.startOf(w);
        }, I.isBefore = function(O, w) {
          return this.endOf(w) < D(O);
        }, I.$g = function(O, w, C) {
          return M.u(O) ? this[w] : this.set(C, O);
        }, I.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, I.valueOf = function() {
          return this.$d.getTime();
        }, I.startOf = function(O, w) {
          var C = this, v = !!M.u(w) || w, j = M.p(O), L = function(je, x) {
            var be = M.w(C.$u ? Date.UTC(C.$y, x, je) : new Date(C.$y, x, je), C);
            return v ? be : be.endOf(t);
          }, H = function(je, x) {
            return M.w(C.toDate()[je].apply(C.toDate("s"), (v ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(x)), C);
          }, z = this.$W, K = this.$M, re = this.$D, ze = "set" + (this.$u ? "UTC" : "");
          switch (j) {
            case l:
              return v ? L(1, 0) : L(31, 11);
            case a:
              return v ? L(1, K) : L(0, K + 1);
            case r:
              var Se = this.$locale().weekStart || 0, $r = (z < Se ? z + 7 : z) - Se;
              return L(v ? re - $r : re + (6 - $r), K);
            case t:
            case c:
              return H(ze + "Hours", 0);
            case s:
              return H(ze + "Minutes", 1);
            case i:
              return H(ze + "Seconds", 2);
            case u:
              return H(ze + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, I.endOf = function(O) {
          return this.startOf(O, !1);
        }, I.$set = function(O, w) {
          var C, v = M.p(O), j = "set" + (this.$u ? "UTC" : ""), L = (C = {}, C[t] = j + "Date", C[c] = j + "Date", C[a] = j + "Month", C[l] = j + "FullYear", C[s] = j + "Hours", C[i] = j + "Minutes", C[u] = j + "Seconds", C[m] = j + "Milliseconds", C)[v], H = v === t ? this.$D + (w - this.$W) : w;
          if (v === a || v === l) {
            var z = this.clone().set(c, 1);
            z.$d[L](H), z.init(), this.$d = z.set(c, Math.min(this.$D, z.daysInMonth())).$d;
          } else L && this.$d[L](H);
          return this.init(), this;
        }, I.set = function(O, w) {
          return this.clone().$set(O, w);
        }, I.get = function(O) {
          return this[M.p(O)]();
        }, I.add = function(O, w) {
          var C, v = this;
          O = Number(O);
          var j = M.p(w), L = function(K) {
            var re = D(v);
            return M.w(re.date(re.date() + Math.round(K * O)), v);
          };
          if (j === a) return this.set(a, this.$M + O);
          if (j === l) return this.set(l, this.$y + O);
          if (j === t) return L(1);
          if (j === r) return L(7);
          var H = (C = {}, C[i] = n, C[s] = f, C[u] = _, C)[j] || 1, z = this.$d.getTime() + O * H;
          return M.w(z, this);
        }, I.subtract = function(O, w) {
          return this.add(-1 * O, w);
        }, I.format = function(O) {
          var w = this, C = this.$locale();
          if (!this.isValid()) return C.invalidDate || g;
          var v = O || "YYYY-MM-DDTHH:mm:ssZ", j = M.z(this), L = this.$H, H = this.$m, z = this.$M, K = C.weekdays, re = C.months, ze = C.meridiem, Se = function(x, be, Fr, it) {
            return x && (x[be] || x(w, v)) || Fr[be].slice(0, it);
          }, $r = function(x) {
            return M.s(L % 12 || 12, x, "0");
          }, je = ze || function(x, be, Fr) {
            var it = x < 12 ? "AM" : "PM";
            return Fr ? it.toLowerCase() : it;
          };
          return v.replace(y, function(x, be) {
            return be || function(Fr) {
              switch (Fr) {
                case "YY":
                  return String(w.$y).slice(-2);
                case "YYYY":
                  return M.s(w.$y, 4, "0");
                case "M":
                  return z + 1;
                case "MM":
                  return M.s(z + 1, 2, "0");
                case "MMM":
                  return Se(C.monthsShort, z, re, 3);
                case "MMMM":
                  return Se(re, z);
                case "D":
                  return w.$D;
                case "DD":
                  return M.s(w.$D, 2, "0");
                case "d":
                  return String(w.$W);
                case "dd":
                  return Se(C.weekdaysMin, w.$W, K, 2);
                case "ddd":
                  return Se(C.weekdaysShort, w.$W, K, 3);
                case "dddd":
                  return K[w.$W];
                case "H":
                  return String(L);
                case "HH":
                  return M.s(L, 2, "0");
                case "h":
                  return $r(1);
                case "hh":
                  return $r(2);
                case "a":
                  return je(L, H, !0);
                case "A":
                  return je(L, H, !1);
                case "m":
                  return String(H);
                case "mm":
                  return M.s(H, 2, "0");
                case "s":
                  return String(w.$s);
                case "ss":
                  return M.s(w.$s, 2, "0");
                case "SSS":
                  return M.s(w.$ms, 3, "0");
                case "Z":
                  return j;
              }
              return null;
            }(x) || j.replace(":", "");
          });
        }, I.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, I.diff = function(O, w, C) {
          var v, j = this, L = M.p(w), H = D(O), z = (H.utcOffset() - this.utcOffset()) * n, K = this - H, re = function() {
            return M.m(j, H);
          };
          switch (L) {
            case l:
              v = re() / 12;
              break;
            case a:
              v = re();
              break;
            case o:
              v = re() / 3;
              break;
            case r:
              v = (K - z) / 6048e5;
              break;
            case t:
              v = (K - z) / 864e5;
              break;
            case s:
              v = K / f;
              break;
            case i:
              v = K / n;
              break;
            case u:
              v = K / _;
              break;
            default:
              v = K;
          }
          return C ? v : M.a(v);
        }, I.daysInMonth = function() {
          return this.endOf(a).$D;
        }, I.$locale = function() {
          return p[this.$L];
        }, I.locale = function(O, w) {
          if (!O) return this.$L;
          var C = this.clone(), v = b(O, w, !0);
          return v && (C.$L = v), C;
        }, I.clone = function() {
          return M.w(this.$d, this);
        }, I.toDate = function() {
          return new Date(this.valueOf());
        }, I.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, I.toISOString = function() {
          return this.$d.toISOString();
        }, I.toString = function() {
          return this.$d.toUTCString();
        }, U;
      }(), q = S.prototype;
      return D.prototype = q, [["$ms", m], ["$s", u], ["$m", i], ["$H", s], ["$W", t], ["$M", a], ["$y", l], ["$D", c]].forEach(function(U) {
        q[U[1]] = function(I) {
          return this.$g(I, U[0], U[1]);
        };
      }), D.extend = function(U, I) {
        return U.$i || (U(I, S, D), U.$i = !0), D;
      }, D.locale = b, D.isDayjs = N, D.unix = function(U) {
        return D(1e3 * U);
      }, D.en = p[E], D.Ls = p, D.p = {}, D;
    });
  }(Mn)), Mn.exports;
}
var V = {}, Cn = {}, Zn;
function B() {
  return Zn || (Zn = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Month = e.Weekday = e.Meridiem = void 0, function(d) {
      d[d.AM = 0] = "AM", d[d.PM = 1] = "PM";
    }(e.Meridiem || (e.Meridiem = {})), function(d) {
      d[d.SUNDAY = 0] = "SUNDAY", d[d.MONDAY = 1] = "MONDAY", d[d.TUESDAY = 2] = "TUESDAY", d[d.WEDNESDAY = 3] = "WEDNESDAY", d[d.THURSDAY = 4] = "THURSDAY", d[d.FRIDAY = 5] = "FRIDAY", d[d.SATURDAY = 6] = "SATURDAY";
    }(e.Weekday || (e.Weekday = {})), function(d) {
      d[d.JANUARY = 1] = "JANUARY", d[d.FEBRUARY = 2] = "FEBRUARY", d[d.MARCH = 3] = "MARCH", d[d.APRIL = 4] = "APRIL", d[d.MAY = 5] = "MAY", d[d.JUNE = 6] = "JUNE", d[d.JULY = 7] = "JULY", d[d.AUGUST = 8] = "AUGUST", d[d.SEPTEMBER = 9] = "SEPTEMBER", d[d.OCTOBER = 10] = "OCTOBER", d[d.NOVEMBER = 11] = "NOVEMBER", d[d.DECEMBER = 12] = "DECEMBER";
    }(e.Month || (e.Month = {}));
  }(Cn)), Cn;
}
var Kn;
function Q() {
  if (Kn) return V;
  Kn = 1, Object.defineProperty(V, "__esModule", { value: !0 }), V.implySimilarTime = V.implySimilarDate = V.assignSimilarTime = V.assignSimilarDate = V.implyTheNextDay = V.assignTheNextDay = void 0;
  const e = /* @__PURE__ */ B();
  function d(i, s) {
    s = s.add(1, "day"), n(i, s), u(i, s);
  }
  V.assignTheNextDay = d;
  function _(i, s) {
    s = s.add(1, "day"), m(i, s), u(i, s);
  }
  V.implyTheNextDay = _;
  function n(i, s) {
    i.assign("day", s.date()), i.assign("month", s.month() + 1), i.assign("year", s.year());
  }
  V.assignSimilarDate = n;
  function f(i, s) {
    i.assign("hour", s.hour()), i.assign("minute", s.minute()), i.assign("second", s.second()), i.assign("millisecond", s.millisecond()), i.get("hour") < 12 ? i.assign("meridiem", e.Meridiem.AM) : i.assign("meridiem", e.Meridiem.PM);
  }
  V.assignSimilarTime = f;
  function m(i, s) {
    i.imply("day", s.date()), i.imply("month", s.month() + 1), i.imply("year", s.year());
  }
  V.implySimilarDate = m;
  function u(i, s) {
    i.imply("hour", s.hour()), i.imply("minute", s.minute()), i.imply("second", s.second()), i.imply("millisecond", s.millisecond());
  }
  return V.implySimilarTime = u, V;
}
var Lr = {}, Vn;
function tu() {
  return Vn || (Vn = 1, function(e) {
    var d = Lr && Lr.__importDefault || function(i) {
      return i && i.__esModule ? i : { default: i };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.toTimezoneOffset = e.getLastWeekdayOfMonth = e.getNthWeekdayOfMonth = e.TIMEZONE_ABBR_MAP = void 0;
    const _ = d(k()), n = /* @__PURE__ */ B();
    e.TIMEZONE_ABBR_MAP = {
      ACDT: 630,
      ACST: 570,
      ADT: -180,
      AEDT: 660,
      AEST: 600,
      AFT: 270,
      AKDT: -480,
      AKST: -540,
      ALMT: 360,
      AMST: -180,
      AMT: -240,
      ANAST: 720,
      ANAT: 720,
      AQTT: 300,
      ART: -180,
      AST: -240,
      AWDT: 540,
      AWST: 480,
      AZOST: 0,
      AZOT: -60,
      AZST: 300,
      AZT: 240,
      BNT: 480,
      BOT: -240,
      BRST: -120,
      BRT: -180,
      BST: 60,
      BTT: 360,
      CAST: 480,
      CAT: 120,
      CCT: 390,
      CDT: -300,
      CEST: 120,
      CET: {
        timezoneOffsetDuringDst: 2 * 60,
        timezoneOffsetNonDst: 60,
        dstStart: (i) => m(i, n.Month.MARCH, n.Weekday.SUNDAY, 2),
        dstEnd: (i) => m(i, n.Month.OCTOBER, n.Weekday.SUNDAY, 3)
      },
      CHADT: 825,
      CHAST: 765,
      CKT: -600,
      CLST: -180,
      CLT: -240,
      COT: -300,
      CST: -360,
      CT: {
        timezoneOffsetDuringDst: -5 * 60,
        timezoneOffsetNonDst: -6 * 60,
        dstStart: (i) => f(i, n.Month.MARCH, n.Weekday.SUNDAY, 2, 2),
        dstEnd: (i) => f(i, n.Month.NOVEMBER, n.Weekday.SUNDAY, 1, 2)
      },
      CVT: -60,
      CXT: 420,
      ChST: 600,
      DAVT: 420,
      EASST: -300,
      EAST: -360,
      EAT: 180,
      ECT: -300,
      EDT: -240,
      EEST: 180,
      EET: 120,
      EGST: 0,
      EGT: -60,
      EST: -300,
      ET: {
        timezoneOffsetDuringDst: -4 * 60,
        timezoneOffsetNonDst: -5 * 60,
        dstStart: (i) => f(i, n.Month.MARCH, n.Weekday.SUNDAY, 2, 2),
        dstEnd: (i) => f(i, n.Month.NOVEMBER, n.Weekday.SUNDAY, 1, 2)
      },
      FJST: 780,
      FJT: 720,
      FKST: -180,
      FKT: -240,
      FNT: -120,
      GALT: -360,
      GAMT: -540,
      GET: 240,
      GFT: -180,
      GILT: 720,
      GMT: 0,
      GST: 240,
      GYT: -240,
      HAA: -180,
      HAC: -300,
      HADT: -540,
      HAE: -240,
      HAP: -420,
      HAR: -360,
      HAST: -600,
      HAT: -90,
      HAY: -480,
      HKT: 480,
      HLV: -210,
      HNA: -240,
      HNC: -360,
      HNE: -300,
      HNP: -480,
      HNR: -420,
      HNT: -150,
      HNY: -540,
      HOVT: 420,
      ICT: 420,
      IDT: 180,
      IOT: 360,
      IRDT: 270,
      IRKST: 540,
      IRKT: 540,
      IRST: 210,
      IST: 330,
      JST: 540,
      KGT: 360,
      KRAST: 480,
      KRAT: 480,
      KST: 540,
      KUYT: 240,
      LHDT: 660,
      LHST: 630,
      LINT: 840,
      MAGST: 720,
      MAGT: 720,
      MART: -510,
      MAWT: 300,
      MDT: -360,
      MESZ: 120,
      MEZ: 60,
      MHT: 720,
      MMT: 390,
      MSD: 240,
      MSK: 180,
      MST: -420,
      MT: {
        timezoneOffsetDuringDst: -6 * 60,
        timezoneOffsetNonDst: -7 * 60,
        dstStart: (i) => f(i, n.Month.MARCH, n.Weekday.SUNDAY, 2, 2),
        dstEnd: (i) => f(i, n.Month.NOVEMBER, n.Weekday.SUNDAY, 1, 2)
      },
      MUT: 240,
      MVT: 300,
      MYT: 480,
      NCT: 660,
      NDT: -90,
      NFT: 690,
      NOVST: 420,
      NOVT: 360,
      NPT: 345,
      NST: -150,
      NUT: -660,
      NZDT: 780,
      NZST: 720,
      OMSST: 420,
      OMST: 420,
      PDT: -420,
      PET: -300,
      PETST: 720,
      PETT: 720,
      PGT: 600,
      PHOT: 780,
      PHT: 480,
      PKT: 300,
      PMDT: -120,
      PMST: -180,
      PONT: 660,
      PST: -480,
      PT: {
        timezoneOffsetDuringDst: -7 * 60,
        timezoneOffsetNonDst: -8 * 60,
        dstStart: (i) => f(i, n.Month.MARCH, n.Weekday.SUNDAY, 2, 2),
        dstEnd: (i) => f(i, n.Month.NOVEMBER, n.Weekday.SUNDAY, 1, 2)
      },
      PWT: 540,
      PYST: -180,
      PYT: -240,
      RET: 240,
      SAMT: 240,
      SAST: 120,
      SBT: 660,
      SCT: 240,
      SGT: 480,
      SRT: -180,
      SST: -660,
      TAHT: -600,
      TFT: 300,
      TJT: 300,
      TKT: 780,
      TLT: 540,
      TMT: 300,
      TVT: 720,
      ULAT: 480,
      UTC: 0,
      UYST: -120,
      UYT: -180,
      UZT: 300,
      VET: -210,
      VLAST: 660,
      VLAT: 660,
      VUT: 660,
      WAST: 120,
      WAT: 60,
      WEST: 60,
      WESZ: 60,
      WET: 0,
      WEZ: 0,
      WFT: 720,
      WGST: -120,
      WGT: -180,
      WIB: 420,
      WIT: 540,
      WITA: 480,
      WST: 780,
      WT: 0,
      YAKST: 600,
      YAKT: 600,
      YAPT: 600,
      YEKST: 360,
      YEKT: 360
    };
    function f(i, s, t, r, a = 0) {
      let o = 0, l = 0;
      for (; l < r; )
        o++, new Date(i, s - 1, o).getDay() === t && l++;
      return new Date(i, s - 1, o, a);
    }
    e.getNthWeekdayOfMonth = f;
    function m(i, s, t, r = 0) {
      const a = t === 0 ? 7 : t, o = new Date(i, s - 1 + 1, 1, 12), l = o.getDay() === 0 ? 7 : o.getDay();
      let c;
      return l === a ? c = 7 : l < a ? c = 7 + l - a : c = l - a, o.setDate(o.getDate() - c), new Date(i, s - 1, o.getDate(), r);
    }
    e.getLastWeekdayOfMonth = m;
    function u(i, s, t = {}) {
      var r;
      if (i == null)
        return null;
      if (typeof i == "number")
        return i;
      const a = (r = t[i]) !== null && r !== void 0 ? r : e.TIMEZONE_ABBR_MAP[i];
      return a == null ? null : typeof a == "number" ? a : s == null ? null : _.default(s).isAfter(a.dstStart(s.getFullYear())) && !_.default(s).isAfter(a.dstEnd(s.getFullYear())) ? a.timezoneOffsetDuringDst : a.timezoneOffsetNonDst;
    }
    e.toTimezoneOffset = u;
  }(Lr)), Lr;
}
var Xn;
function $() {
  if (Xn) return me;
  Xn = 1;
  var e = me && me.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(me, "__esModule", { value: !0 }), me.ParsingResult = me.ParsingComponents = me.ReferenceWithTimezone = void 0;
  const d = e(Du()), _ = e(k()), n = /* @__PURE__ */ Q(), f = /* @__PURE__ */ tu();
  _.default.extend(d.default);
  class m {
    constructor(t) {
      var r;
      t = t ?? /* @__PURE__ */ new Date(), t instanceof Date ? (this.instant = t, this.timezoneOffset = null) : (this.instant = (r = t.instant) !== null && r !== void 0 ? r : /* @__PURE__ */ new Date(), this.timezoneOffset = f.toTimezoneOffset(t.timezone, this.instant));
    }
    getDateWithAdjustedTimezone() {
      const t = new Date(this.instant);
      return this.timezoneOffset !== null && t.setMinutes(t.getMinutes() - this.getSystemTimezoneAdjustmentMinute(this.instant)), t;
    }
    getSystemTimezoneAdjustmentMinute(t, r) {
      var a;
      (!t || t.getTime() < 0) && (t = /* @__PURE__ */ new Date());
      const o = -t.getTimezoneOffset(), l = (a = r ?? this.timezoneOffset) !== null && a !== void 0 ? a : o;
      return o - l;
    }
    getTimezoneOffset() {
      var t;
      return (t = this.timezoneOffset) !== null && t !== void 0 ? t : -this.instant.getTimezoneOffset();
    }
  }
  me.ReferenceWithTimezone = m;
  class u {
    constructor(t, r) {
      if (this._tags = /* @__PURE__ */ new Set(), this.reference = t, this.knownValues = {}, this.impliedValues = {}, r)
        for (const o in r)
          this.knownValues[o] = r[o];
      const a = t.getDateWithAdjustedTimezone();
      this.imply("day", a.getDate()), this.imply("month", a.getMonth() + 1), this.imply("year", a.getFullYear()), this.imply("hour", 12), this.imply("minute", 0), this.imply("second", 0), this.imply("millisecond", 0);
    }
    get(t) {
      return t in this.knownValues ? this.knownValues[t] : t in this.impliedValues ? this.impliedValues[t] : null;
    }
    isCertain(t) {
      return t in this.knownValues;
    }
    getCertainComponents() {
      return Object.keys(this.knownValues);
    }
    imply(t, r) {
      return t in this.knownValues ? this : (this.impliedValues[t] = r, this);
    }
    assign(t, r) {
      return this.knownValues[t] = r, delete this.impliedValues[t], this;
    }
    delete(t) {
      delete this.knownValues[t], delete this.impliedValues[t];
    }
    clone() {
      const t = new u(this.reference);
      t.knownValues = {}, t.impliedValues = {};
      for (const r in this.knownValues)
        t.knownValues[r] = this.knownValues[r];
      for (const r in this.impliedValues)
        t.impliedValues[r] = this.impliedValues[r];
      return t;
    }
    isOnlyDate() {
      return !this.isCertain("hour") && !this.isCertain("minute") && !this.isCertain("second");
    }
    isOnlyTime() {
      return !this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month") && !this.isCertain("year");
    }
    isOnlyWeekdayComponent() {
      return this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
    }
    isDateWithUnknownYear() {
      return this.isCertain("month") && !this.isCertain("year");
    }
    isValidDate() {
      const t = this.dateWithoutTimezoneAdjustment();
      return !(t.getFullYear() !== this.get("year") || t.getMonth() !== this.get("month") - 1 || t.getDate() !== this.get("day") || this.get("hour") != null && t.getHours() != this.get("hour") || this.get("minute") != null && t.getMinutes() != this.get("minute"));
    }
    toString() {
      return `[ParsingComponents {
            tags: ${JSON.stringify(Array.from(this._tags).sort())}, 
            knownValues: ${JSON.stringify(this.knownValues)}, 
            impliedValues: ${JSON.stringify(this.impliedValues)}}, 
            reference: ${JSON.stringify(this.reference)}]`;
    }
    dayjs() {
      return _.default(this.dateWithoutTimezoneAdjustment());
    }
    date() {
      const t = this.dateWithoutTimezoneAdjustment(), r = this.reference.getSystemTimezoneAdjustmentMinute(t, this.get("timezoneOffset"));
      return new Date(t.getTime() + r * 6e4);
    }
    addTag(t) {
      return this._tags.add(t), this;
    }
    addTags(t) {
      for (const r of t)
        this._tags.add(r);
      return this;
    }
    tags() {
      return new Set(this._tags);
    }
    dateWithoutTimezoneAdjustment() {
      const t = new Date(this.get("year"), this.get("month") - 1, this.get("day"), this.get("hour"), this.get("minute"), this.get("second"), this.get("millisecond"));
      return t.setFullYear(this.get("year")), t;
    }
    static createRelativeFromReference(t, r) {
      let a = _.default(t.getDateWithAdjustedTimezone());
      for (const l in r)
        a = a.add(r[l], l);
      const o = new u(t);
      return o.addTag("result/relativeDate"), r.hour || r.minute || r.second ? (o.addTag("result/relativeDateAndTime"), n.assignSimilarTime(o, a), n.assignSimilarDate(o, a), o.assign("timezoneOffset", t.getTimezoneOffset())) : (n.implySimilarTime(o, a), o.imply("timezoneOffset", t.getTimezoneOffset()), r.d ? (o.assign("day", a.date()), o.assign("month", a.month() + 1), o.assign("year", a.year())) : r.week ? (o.assign("day", a.date()), o.assign("month", a.month() + 1), o.assign("year", a.year()), o.imply("weekday", a.day())) : (o.imply("day", a.date()), r.month ? (o.assign("month", a.month() + 1), o.assign("year", a.year())) : (o.imply("month", a.month() + 1), r.year ? o.assign("year", a.year()) : o.imply("year", a.year())))), o;
    }
  }
  me.ParsingComponents = u;
  class i {
    constructor(t, r, a, o, l) {
      this.reference = t, this.refDate = t.instant, this.index = r, this.text = a, this.start = o || new u(t), this.end = l;
    }
    clone() {
      const t = new i(this.reference, this.index, this.text);
      return t.start = this.start ? this.start.clone() : null, t.end = this.end ? this.end.clone() : null, t;
    }
    date() {
      return this.start.date();
    }
    addTag(t) {
      return this.start.addTag(t), this.end && this.end.addTag(t), this;
    }
    addTags(t) {
      return this.start.addTags(t), this.end && this.end.addTags(t), this;
    }
    tags() {
      const t = new Set(this.start.tags());
      if (this.end)
        for (const r of this.end.tags())
          t.add(r);
      return t;
    }
    toString() {
      const t = Array.from(this.tags()).sort();
      return `[ParsingResult {index: ${this.index}, text: '${this.text}', tags: ${JSON.stringify(t)} ...}]`;
    }
  }
  return me.ParsingResult = i, me;
}
var Ze = {}, st = {}, bn = {}, Oe = {}, xn;
function F() {
  if (xn) return Oe;
  xn = 1, Object.defineProperty(Oe, "__esModule", { value: !0 }), Oe.matchAnyPattern = Oe.extractTerms = Oe.repeatedTimeunitPattern = void 0;
  function e(n, f, m = "\\s{0,5},?\\s{0,5}") {
    const u = f.replace(/\((?!\?)/g, "(?:");
    return `${n}${u}(?:${m}${u}){0,10}`;
  }
  Oe.repeatedTimeunitPattern = e;
  function d(n) {
    let f;
    return n instanceof Array ? f = [...n] : n instanceof Map ? f = Array.from(n.keys()) : f = Object.keys(n), f;
  }
  Oe.extractTerms = d;
  function _(n) {
    return `(?:${d(n).sort((m, u) => u.length - m.length).join("|").replace(/\./g, "\\.")})`;
  }
  return Oe.matchAnyPattern = _, Oe;
}
var Ce = {}, Jn;
function G() {
  if (Jn) return Ce;
  Jn = 1;
  var e = Ce && Ce.__importDefault || function(f) {
    return f && f.__esModule ? f : { default: f };
  };
  Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.findYearClosestToRef = Ce.findMostLikelyADYear = void 0;
  const d = e(k());
  function _(f) {
    return f < 100 && (f > 50 ? f = f + 1900 : f = f + 2e3), f;
  }
  Ce.findMostLikelyADYear = _;
  function n(f, m, u) {
    const i = d.default(f);
    let s = i;
    s = s.month(u - 1), s = s.date(m), s = s.year(i.year());
    const t = s.add(1, "y"), r = s.add(-1, "y");
    return Math.abs(t.diff(i)) < Math.abs(s.diff(i)) ? s = t : Math.abs(r.diff(i)) < Math.abs(s.diff(i)) && (s = r), s.year();
  }
  return Ce.findYearClosestToRef = n, Ce;
}
var Qn;
function Z() {
  return Qn || (Qn = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTimeUnits = e.TIME_UNITS_NO_ABBR_PATTERN = e.TIME_UNITS_PATTERN = e.parseYear = e.YEAR_PATTERN = e.parseOrdinalNumberPattern = e.ORDINAL_NUMBER_PATTERN = e.parseNumberPattern = e.NUMBER_PATTERN = e.TIME_UNIT_DICTIONARY = e.TIME_UNIT_DICTIONARY_NO_ABBR = e.ORDINAL_WORD_DICTIONARY = e.INTEGER_WORD_DICTIONARY = e.MONTH_DICTIONARY = e.FULL_MONTH_NAME_DICTIONARY = e.WEEKDAY_DICTIONARY = void 0;
    const d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ G();
    e.WEEKDAY_DICTIONARY = {
      sunday: 0,
      sun: 0,
      "sun.": 0,
      monday: 1,
      mon: 1,
      "mon.": 1,
      tuesday: 2,
      tue: 2,
      "tue.": 2,
      wednesday: 3,
      wed: 3,
      "wed.": 3,
      thursday: 4,
      thurs: 4,
      "thurs.": 4,
      thur: 4,
      "thur.": 4,
      thu: 4,
      "thu.": 4,
      friday: 5,
      fri: 5,
      "fri.": 5,
      saturday: 6,
      sat: 6,
      "sat.": 6
    }, e.FULL_MONTH_NAME_DICTIONARY = {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12
    }, e.MONTH_DICTIONARY = Object.assign(Object.assign({}, e.FULL_MONTH_NAME_DICTIONARY), { jan: 1, "jan.": 1, feb: 2, "feb.": 2, mar: 3, "mar.": 3, apr: 4, "apr.": 4, jun: 6, "jun.": 6, jul: 7, "jul.": 7, aug: 8, "aug.": 8, sep: 9, "sep.": 9, sept: 9, "sept.": 9, oct: 10, "oct.": 10, nov: 11, "nov.": 11, dec: 12, "dec.": 12 }), e.INTEGER_WORD_DICTIONARY = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12
    }, e.ORDINAL_WORD_DICTIONARY = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      sixth: 6,
      seventh: 7,
      eighth: 8,
      ninth: 9,
      tenth: 10,
      eleventh: 11,
      twelfth: 12,
      thirteenth: 13,
      fourteenth: 14,
      fifteenth: 15,
      sixteenth: 16,
      seventeenth: 17,
      eighteenth: 18,
      nineteenth: 19,
      twentieth: 20,
      "twenty first": 21,
      "twenty-first": 21,
      "twenty second": 22,
      "twenty-second": 22,
      "twenty third": 23,
      "twenty-third": 23,
      "twenty fourth": 24,
      "twenty-fourth": 24,
      "twenty fifth": 25,
      "twenty-fifth": 25,
      "twenty sixth": 26,
      "twenty-sixth": 26,
      "twenty seventh": 27,
      "twenty-seventh": 27,
      "twenty eighth": 28,
      "twenty-eighth": 28,
      "twenty ninth": 29,
      "twenty-ninth": 29,
      thirtieth: 30,
      "thirty first": 31,
      "thirty-first": 31
    }, e.TIME_UNIT_DICTIONARY_NO_ABBR = {
      second: "second",
      seconds: "second",
      minute: "minute",
      minutes: "minute",
      hour: "hour",
      hours: "hour",
      day: "d",
      days: "d",
      week: "week",
      weeks: "week",
      month: "month",
      months: "month",
      quarter: "quarter",
      quarters: "quarter",
      year: "year",
      years: "year"
    }, e.TIME_UNIT_DICTIONARY = Object.assign({ s: "second", sec: "second", second: "second", seconds: "second", m: "minute", min: "minute", mins: "minute", minute: "minute", minutes: "minute", h: "hour", hr: "hour", hrs: "hour", hour: "hour", hours: "hour", d: "d", day: "d", days: "d", w: "w", week: "week", weeks: "week", mo: "month", mon: "month", mos: "month", month: "month", months: "month", qtr: "quarter", quarter: "quarter", quarters: "quarter", y: "year", yr: "year", year: "year", years: "year" }, e.TIME_UNIT_DICTIONARY_NO_ABBR), e.NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;
    function n(o) {
      const l = o.toLowerCase();
      return e.INTEGER_WORD_DICTIONARY[l] !== void 0 ? e.INTEGER_WORD_DICTIONARY[l] : l === "a" || l === "an" || l == "the" ? 1 : l.match(/few/) ? 3 : l.match(/half/) ? 0.5 : l.match(/couple/) ? 2 : l.match(/several/) ? 7 : parseFloat(l);
    }
    e.parseNumberPattern = n, e.ORDINAL_NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
    function f(o) {
      let l = o.toLowerCase();
      return e.ORDINAL_WORD_DICTIONARY[l] !== void 0 ? e.ORDINAL_WORD_DICTIONARY[l] : (l = l.replace(/(?:st|nd|rd|th)$/i, ""), parseInt(l));
    }
    e.parseOrdinalNumberPattern = f, e.YEAR_PATTERN = "(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-2][0-9]{3}|[5-9][0-9]|2[0-5])";
    function m(o) {
      if (/BE/i.test(o))
        return o = o.replace(/BE/i, ""), parseInt(o) - 543;
      if (/BCE?/i.test(o))
        return o = o.replace(/BCE?/i, ""), -parseInt(o);
      if (/(AD|CE)/i.test(o))
        return o = o.replace(/(AD|CE)/i, ""), parseInt(o);
      const l = parseInt(o);
      return _.findMostLikelyADYear(l);
    }
    e.parseYear = m;
    const u = `(${e.NUMBER_PATTERN})\\s{0,3}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})`, i = new RegExp(u, "i"), s = `(${e.NUMBER_PATTERN})\\s{0,3}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY_NO_ABBR)})`, t = "\\s{0,5},?(?:\\s*and)?\\s{0,5}";
    e.TIME_UNITS_PATTERN = d.repeatedTimeunitPattern("(?:(?:about|around)\\s{0,3})?", u, t), e.TIME_UNITS_NO_ABBR_PATTERN = d.repeatedTimeunitPattern("(?:(?:about|around)\\s{0,3})?", s, t);
    function r(o) {
      const l = {};
      let c = o, g = i.exec(c);
      for (; g; )
        a(l, g), c = c.substring(g[0].length).trim(), g = i.exec(c);
      return Object.keys(l).length == 0 ? null : l;
    }
    e.parseTimeUnits = r;
    function a(o, l) {
      if (l[0].match(/^[a-zA-Z]+$/))
        return;
      const c = n(l[1]), g = e.TIME_UNIT_DICTIONARY[l[2].toLowerCase()];
      o[g] = c;
    }
  }(bn)), bn;
}
var qr = {}, ea;
function W() {
  if (ea) return qr;
  ea = 1, Object.defineProperty(qr, "__esModule", { value: !0 }), qr.AbstractParserWithWordBoundaryChecking = void 0;
  class e {
    constructor() {
      this.cachedInnerPattern = null, this.cachedPattern = null;
    }
    innerPatternHasChange(_, n) {
      return this.innerPattern(_) !== n;
    }
    patternLeftBoundary() {
      return "(\\W|^)";
    }
    pattern(_) {
      return this.cachedInnerPattern && !this.innerPatternHasChange(_, this.cachedInnerPattern) ? this.cachedPattern : (this.cachedInnerPattern = this.innerPattern(_), this.cachedPattern = new RegExp(`${this.patternLeftBoundary()}${this.cachedInnerPattern.source}`, this.cachedInnerPattern.flags), this.cachedPattern);
    }
    extract(_, n) {
      var f;
      const m = (f = n[1]) !== null && f !== void 0 ? f : "";
      n.index = n.index + m.length, n[0] = n[0].substring(m.length);
      for (let u = 2; u < n.length; u++)
        n[u - 1] = n[u];
      return this.innerExtract(_, n);
    }
  }
  return qr.AbstractParserWithWordBoundaryChecking = e, qr;
}
var ra;
function Ou() {
  if (ra) return st;
  ra = 1, Object.defineProperty(st, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = new RegExp(`(?:(?:within|in|for)\\s*)?(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${e.TIME_UNITS_PATTERN})(?=\\W|$)`, "i"), f = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${e.TIME_UNITS_PATTERN})(?=\\W|$)`, "i"), m = new RegExp(`(?:within|in|for)\\s*(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${e.TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`, "i");
  let u = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor(s) {
      super(), this.strictMode = s;
    }
    innerPattern(s) {
      return this.strictMode ? m : s.option.forwardDate ? n : f;
    }
    innerExtract(s, t) {
      if (t[0].match(/^for\s*the\s*\w+/))
        return null;
      const r = e.parseTimeUnits(t[1]);
      return r ? d.ParsingComponents.createRelativeFromReference(s.reference, r) : null;
    }
  };
  return st.default = u, st;
}
var ut = {}, ta;
function Cu() {
  if (ta) return ut;
  ta = 1, Object.defineProperty(ut, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ Z(), _ = /* @__PURE__ */ Z(), n = /* @__PURE__ */ Z(), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ W(), u = new RegExp(`(?:on\\s{0,3})?(${n.ORDINAL_NUMBER_PATTERN})(?:\\s{0,3}(?:to|\\-|\\–|until|through|till)?\\s{0,3}(${n.ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s{0,3}(?:of)?\\s{0,3})(${f.matchAnyPattern(d.MONTH_DICTIONARY)})(?:(?:-|/|,?\\s{0,3})(${_.YEAR_PATTERN}(?!\\w)))?(?=\\W|$)`, "i"), i = 1, s = 2, t = 3, r = 4;
  let a = class extends m.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return u;
    }
    innerExtract(l, c) {
      const g = l.createParsingResult(c.index, c[0]), P = d.MONTH_DICTIONARY[c[t].toLowerCase()], y = n.parseOrdinalNumberPattern(c[i]);
      if (y > 31)
        return c.index = c.index + c[i].length, null;
      if (g.start.assign("month", P), g.start.assign("day", y), c[r]) {
        const T = _.parseYear(c[r]);
        g.start.assign("year", T);
      } else {
        const T = e.findYearClosestToRef(l.refDate, y, P);
        g.start.imply("year", T);
      }
      if (c[s]) {
        const T = n.parseOrdinalNumberPattern(c[s]);
        g.end = g.start.clone(), g.end.assign("day", T);
      }
      return g;
    }
  };
  return ut.default = a, ut;
}
var ot = {}, na;
function bu() {
  if (na) return ot;
  na = 1, Object.defineProperty(ot, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ Z(), _ = /* @__PURE__ */ Z(), n = /* @__PURE__ */ Z(), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ W(), u = new RegExp(`(${f.matchAnyPattern(d.MONTH_DICTIONARY)})(?:-|/|\\s*,?\\s*)(${_.ORDINAL_NUMBER_PATTERN})(?!\\s*(?:am|pm))\\s*(?:(?:to|\\-)\\s*(${_.ORDINAL_NUMBER_PATTERN})\\s*)?(?:(?:-|/|\\s*,\\s*|\\s+)(${n.YEAR_PATTERN}))?(?=\\W|$)(?!\\:\\d)`, "i"), i = 1, s = 2, t = 3, r = 4;
  let a = class extends m.AbstractParserWithWordBoundaryChecking {
    constructor(l) {
      super(), this.shouldSkipYearLikeDate = l;
    }
    innerPattern() {
      return u;
    }
    innerExtract(l, c) {
      const g = d.MONTH_DICTIONARY[c[i].toLowerCase()], P = _.parseOrdinalNumberPattern(c[s]);
      if (P > 31 || this.shouldSkipYearLikeDate && !c[t] && !c[r] && c[s].match(/^2[0-5]$/))
        return null;
      const y = l.createParsingComponents({
        day: P,
        month: g
      }).addTag("parser/ENMonthNameMiddleEndianParser");
      if (c[r]) {
        const R = n.parseYear(c[r]);
        y.assign("year", R);
      } else {
        const R = e.findYearClosestToRef(l.refDate, P, g);
        y.imply("year", R);
      }
      if (!c[t])
        return y;
      const T = _.parseOrdinalNumberPattern(c[t]), h = l.createParsingResult(c.index, c[0]);
      return h.start = y, h.end = y.clone(), h.end.assign("day", T), h;
    }
  };
  return ot.default = a, ot;
}
var dt = {}, aa;
function vu() {
  if (aa) return dt;
  aa = 1, Object.defineProperty(dt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = /* @__PURE__ */ G(), _ = /* @__PURE__ */ F(), n = /* @__PURE__ */ Z(), f = /* @__PURE__ */ W(), m = new RegExp(`((?:in)\\s*)?(${_.matchAnyPattern(e.MONTH_DICTIONARY)})\\s*(?:(?:,|-|of)?\\s*(${n.YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i"), u = 1, i = 2, s = 3;
  let t = class extends f.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return m;
    }
    innerExtract(a, o) {
      const l = o[i].toLowerCase();
      if (o[0].length <= 3 && !e.FULL_MONTH_NAME_DICTIONARY[l])
        return null;
      const c = a.createParsingResult(o.index + (o[u] || "").length, o.index + o[0].length);
      c.start.imply("day", 1), c.start.addTag("parser/ENMonthNameParser");
      const g = e.MONTH_DICTIONARY[l];
      if (c.start.assign("month", g), o[s]) {
        const P = n.parseYear(o[s]);
        c.start.assign("year", P);
      } else {
        const P = d.findYearClosestToRef(a.refDate, 1, g);
        c.start.imply("year", P);
      }
      return c;
    }
  };
  return dt.default = t, dt;
}
var lt = {}, ia;
function Iu() {
  if (ia) return lt;
  ia = 1, Object.defineProperty(lt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = new RegExp(`([0-9]{4})[-\\.\\/\\s](?:(${d.matchAnyPattern(e.MONTH_DICTIONARY)})|([0-9]{1,2}))[-\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i"), f = 1, m = 2, u = 3, i = 4;
  let s = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor(r) {
      super(), this.strictMonthDateOrder = r;
    }
    innerPattern() {
      return n;
    }
    innerExtract(r, a) {
      const o = parseInt(a[f]);
      let l = parseInt(a[i]), c = a[u] ? parseInt(a[u]) : e.MONTH_DICTIONARY[a[m].toLowerCase()];
      if (c < 1 || c > 12) {
        if (this.strictMonthDateOrder)
          return null;
        l >= 1 && l <= 12 && ([c, l] = [l, c]);
      }
      return l < 1 || l > 31 ? null : {
        day: l,
        month: c,
        year: o
      };
    }
  };
  return lt.default = s, lt;
}
var ft = {}, sa;
function Wu() {
  if (sa) return ft;
  sa = 1, Object.defineProperty(ft, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ W(), d = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i"), _ = 1, n = 2;
  let f = class extends e.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return d;
    }
    innerExtract(u, i) {
      const s = parseInt(i[n]), t = parseInt(i[_]);
      return u.createParsingComponents().imply("day", 1).assign("month", t).assign("year", s);
    }
  };
  return ft.default = f, ft;
}
var ct = {}, Hr = {}, ua;
function ve() {
  if (ua) return Hr;
  ua = 1, Object.defineProperty(Hr, "__esModule", { value: !0 }), Hr.AbstractTimeExpressionParser = void 0;
  const e = /* @__PURE__ */ B();
  function d(t, r, a, o) {
    return new RegExp(`${t}${r}(\\d{1,4})(?:(?:\\.|:|：)(\\d{1,2})(?:(?::|：)(\\d{2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${a}`, o);
  }
  function _(t, r) {
    return new RegExp(`^(${t})(\\d{1,4})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?)?)?(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?${r}`, "i");
  }
  const n = 2, f = 3, m = 4, u = 5, i = 6;
  let s = class {
    constructor(r = !1) {
      this.cachedPrimaryPrefix = null, this.cachedPrimarySuffix = null, this.cachedPrimaryTimePattern = null, this.cachedFollowingPhase = null, this.cachedFollowingSuffix = null, this.cachedFollowingTimePatten = null, this.strictMode = r;
    }
    patternFlags() {
      return "i";
    }
    primaryPatternLeftBoundary() {
      return "(^|\\s|T|\\b)";
    }
    primarySuffix() {
      return "(?!/)(?=\\W|$)";
    }
    followingSuffix() {
      return "(?!/)(?=\\W|$)";
    }
    pattern(r) {
      return this.getPrimaryTimePatternThroughCache();
    }
    extract(r, a) {
      const o = this.extractPrimaryTimeComponents(r, a);
      if (!o)
        return a[0].match(/^\d{4}/) ? (a.index += 4, null) : (a.index += a[0].length, null);
      const l = a.index + a[1].length, c = a[0].substring(a[1].length), g = r.createParsingResult(l, c, o);
      a.index += a[0].length;
      const P = r.text.substring(a.index), T = this.getFollowingTimePatternThroughCache().exec(P);
      return c.match(/^\d{3,4}/) && T && (T[0].match(/^\s*([+-])\s*\d{2,4}$/) || T[0].match(/^\s*([+-])\s*\d{2}\W\d{2}/)) ? null : !T || T[0].match(/^\s*([+-])\s*\d{3,4}$/) ? this.checkAndReturnWithoutFollowingPattern(g) : (g.end = this.extractFollowingTimeComponents(r, T, g), g.end && (g.text += T[0]), this.checkAndReturnWithFollowingPattern(g));
    }
    extractPrimaryTimeComponents(r, a, o = !1) {
      const l = r.createParsingComponents();
      let c = 0, g = null, P = parseInt(a[n]);
      if (P > 100) {
        if (this.strictMode || a[f] != null)
          return null;
        c = P % 100, P = Math.floor(P / 100);
      }
      if (P > 24)
        return null;
      if (a[f] != null) {
        if (a[f].length == 1 && !a[i])
          return null;
        c = parseInt(a[f]);
      }
      if (c >= 60)
        return null;
      if (P > 12 && (g = e.Meridiem.PM), a[i] != null) {
        if (P > 12)
          return null;
        const y = a[i][0].toLowerCase();
        y == "a" && (g = e.Meridiem.AM, P == 12 && (P = 0)), y == "p" && (g = e.Meridiem.PM, P != 12 && (P += 12));
      }
      if (l.assign("hour", P), l.assign("minute", c), g !== null ? l.assign("meridiem", g) : P < 12 ? l.imply("meridiem", e.Meridiem.AM) : l.imply("meridiem", e.Meridiem.PM), a[u] != null) {
        const y = parseInt(a[u].substring(0, 3));
        if (y >= 1e3)
          return null;
        l.assign("millisecond", y);
      }
      if (a[m] != null) {
        const y = parseInt(a[m]);
        if (y >= 60)
          return null;
        l.assign("second", y);
      }
      return l;
    }
    extractFollowingTimeComponents(r, a, o) {
      const l = r.createParsingComponents();
      if (a[u] != null) {
        const y = parseInt(a[u].substring(0, 3));
        if (y >= 1e3)
          return null;
        l.assign("millisecond", y);
      }
      if (a[m] != null) {
        const y = parseInt(a[m]);
        if (y >= 60)
          return null;
        l.assign("second", y);
      }
      let c = parseInt(a[n]), g = 0, P = -1;
      if (a[f] != null ? g = parseInt(a[f]) : c > 100 && (g = c % 100, c = Math.floor(c / 100)), g >= 60 || c > 24)
        return null;
      if (c >= 12 && (P = e.Meridiem.PM), a[i] != null) {
        if (c > 12)
          return null;
        const y = a[i][0].toLowerCase();
        y == "a" && (P = e.Meridiem.AM, c == 12 && (c = 0, l.isCertain("day") || l.imply("day", l.get("day") + 1))), y == "p" && (P = e.Meridiem.PM, c != 12 && (c += 12)), o.start.isCertain("meridiem") || (P == e.Meridiem.AM ? (o.start.imply("meridiem", e.Meridiem.AM), o.start.get("hour") == 12 && o.start.assign("hour", 0)) : (o.start.imply("meridiem", e.Meridiem.PM), o.start.get("hour") != 12 && o.start.assign("hour", o.start.get("hour") + 12)));
      }
      return l.assign("hour", c), l.assign("minute", g), P >= 0 ? l.assign("meridiem", P) : o.start.isCertain("meridiem") && o.start.get("hour") > 12 ? o.start.get("hour") - 12 > c ? l.imply("meridiem", e.Meridiem.AM) : c <= 12 && (l.assign("hour", c + 12), l.assign("meridiem", e.Meridiem.PM)) : c > 12 ? l.imply("meridiem", e.Meridiem.PM) : c <= 12 && l.imply("meridiem", e.Meridiem.AM), l.date().getTime() < o.start.date().getTime() && l.imply("day", l.get("day") + 1), l;
    }
    checkAndReturnWithoutFollowingPattern(r) {
      if (r.text.match(/^\d$/) || r.text.match(/^\d\d\d+$/) || r.text.match(/\d[apAP]$/))
        return null;
      const a = r.text.match(/[^\d:.](\d[\d.]+)$/);
      if (a) {
        const o = a[1];
        if (this.strictMode || o.includes(".") && !o.match(/\d(\.\d{2})+$/) || parseInt(o) > 24)
          return null;
      }
      return r;
    }
    checkAndReturnWithFollowingPattern(r) {
      if (r.text.match(/^\d+-\d+$/))
        return null;
      const a = r.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);
      if (a) {
        if (this.strictMode)
          return null;
        const o = a[1], l = a[2];
        if (l.includes(".") && !l.match(/\d(\.\d{2})+$/))
          return null;
        const c = parseInt(l), g = parseInt(o);
        if (c > 24 || g > 24)
          return null;
      }
      return r;
    }
    getPrimaryTimePatternThroughCache() {
      const r = this.primaryPrefix(), a = this.primarySuffix();
      return this.cachedPrimaryPrefix === r && this.cachedPrimarySuffix === a ? this.cachedPrimaryTimePattern : (this.cachedPrimaryTimePattern = d(this.primaryPatternLeftBoundary(), r, a, this.patternFlags()), this.cachedPrimaryPrefix = r, this.cachedPrimarySuffix = a, this.cachedPrimaryTimePattern);
    }
    getFollowingTimePatternThroughCache() {
      const r = this.followingPhase(), a = this.followingSuffix();
      return this.cachedFollowingPhase === r && this.cachedFollowingSuffix === a ? this.cachedFollowingTimePatten : (this.cachedFollowingTimePatten = _(r, a), this.cachedFollowingPhase = r, this.cachedFollowingSuffix = a, this.cachedFollowingTimePatten);
    }
  };
  return Hr.AbstractTimeExpressionParser = s, Hr;
}
var oa;
function Uu() {
  if (oa) return ct;
  oa = 1, Object.defineProperty(ct, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ B(), d = /* @__PURE__ */ ve();
  let _ = class extends d.AbstractTimeExpressionParser {
    constructor(f) {
      super(f);
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|to|until|through|till|\\?)\\s*";
    }
    primaryPrefix() {
      return "(?:(?:at|from)\\s*)??";
    }
    primarySuffix() {
      return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)";
    }
    extractPrimaryTimeComponents(f, m) {
      const u = super.extractPrimaryTimeComponents(f, m);
      if (!u)
        return u;
      if (m[0].endsWith("night")) {
        const i = u.get("hour");
        i >= 6 && i < 12 ? (u.assign("hour", u.get("hour") + 12), u.assign("meridiem", e.Meridiem.PM)) : i < 6 && u.assign("meridiem", e.Meridiem.AM);
      }
      if (m[0].endsWith("afternoon")) {
        u.assign("meridiem", e.Meridiem.PM);
        const i = u.get("hour");
        i >= 0 && i <= 6 && u.assign("hour", u.get("hour") + 12);
      }
      return m[0].endsWith("morning") && (u.assign("meridiem", e.Meridiem.AM), u.get("hour") < 12 && u.assign("hour", u.get("hour"))), u.addTag("parser/ENTimeExpressionParser");
    }
    extractFollowingTimeComponents(f, m, u) {
      const i = super.extractFollowingTimeComponents(f, m, u);
      return i && i.addTag("parser/ENTimeExpressionParser"), i;
    }
  };
  return ct.default = _, ct;
}
var mt = {}, $e = {}, da;
function X() {
  if (da) return $e;
  da = 1, Object.defineProperty($e, "__esModule", { value: !0 }), $e.addImpliedTimeUnits = $e.reverseTimeUnits = void 0;
  function e(_) {
    const n = {};
    for (const f in _)
      n[f] = -_[f];
    return n;
  }
  $e.reverseTimeUnits = e;
  function d(_, n) {
    const f = _.clone();
    let m = _.dayjs();
    for (const u in n)
      m = m.add(n[u], u);
    return ("day" in n || "d" in n || "week" in n || "month" in n || "year" in n) && (f.imply("day", m.date()), f.imply("month", m.month() + 1), f.imply("year", m.year())), ("second" in n || "minute" in n || "hour" in n) && (f.imply("second", m.second()), f.imply("minute", m.minute()), f.imply("hour", m.hour())), f;
  }
  return $e.addImpliedTimeUnits = d, $e;
}
var la;
function wu() {
  if (la) return mt;
  la = 1, Object.defineProperty(mt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ X(), f = new RegExp(`(${e.TIME_UNITS_PATTERN})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i"), m = new RegExp(`(${e.TIME_UNITS_NO_ABBR_PATTERN})\\s{0,5}(?:ago|before|earlier)(?=\\W|$)`, "i");
  let u = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor(s) {
      super(), this.strictMode = s;
    }
    innerPattern() {
      return this.strictMode ? m : f;
    }
    innerExtract(s, t) {
      const r = e.parseTimeUnits(t[1]);
      if (!r)
        return null;
      const a = n.reverseTimeUnits(r);
      return d.ParsingComponents.createRelativeFromReference(s.reference, a);
    }
  };
  return mt.default = u, mt;
}
var _t = {}, fa;
function Su() {
  if (fa) return _t;
  fa = 1, Object.defineProperty(_t, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = new RegExp(`(${e.TIME_UNITS_PATTERN})\\s{0,5}(?:later|after|from now|henceforth|forward|out)(?=(?:\\W|$))`, "i"), f = new RegExp(`(${e.TIME_UNITS_NO_ABBR_PATTERN})\\s{0,5}(later|after|from now)(?=\\W|$)`, "i"), m = 1;
  let u = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor(s) {
      super(), this.strictMode = s;
    }
    innerPattern() {
      return this.strictMode ? f : n;
    }
    innerExtract(s, t) {
      const r = e.parseTimeUnits(t[m]);
      return r ? d.ParsingComponents.createRelativeFromReference(s.reference, r) : null;
    }
  };
  return _t.default = u, _t;
}
var Ke = {}, Pt = {}, Fe = {}, ca;
function Ge() {
  if (ca) return Fe;
  ca = 1, Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.MergingRefiner = Fe.Filter = void 0;
  class e {
    refine(n, f) {
      return f.filter((m) => this.isValid(n, m));
    }
  }
  Fe.Filter = e;
  class d {
    refine(n, f) {
      if (f.length < 2)
        return f;
      const m = [];
      let u = f[0], i = null;
      for (let s = 1; s < f.length; s++) {
        i = f[s];
        const t = n.text.substring(u.index + u.text.length, i.index);
        if (!this.shouldMergeResults(t, u, i, n))
          m.push(u), u = i;
        else {
          const r = u, a = i, o = this.mergeResults(t, r, a, n);
          n.debug(() => {
            console.log(`${this.constructor.name} merged ${r} and ${a} into ${o}`);
          }), u = o;
        }
      }
      return u != null && m.push(u), m;
    }
  }
  return Fe.MergingRefiner = d, Fe;
}
var ma;
function ge() {
  if (ma) return Pt;
  ma = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ge();
  let d = class extends e.MergingRefiner {
    shouldMergeResults(n, f, m) {
      return !f.end && !m.end && n.match(this.patternBetween()) != null;
    }
    mergeResults(n, f, m) {
      if (!f.start.isOnlyWeekdayComponent() && !m.start.isOnlyWeekdayComponent() && (m.start.getCertainComponents().forEach((i) => {
        f.start.isCertain(i) || f.start.imply(i, m.start.get(i));
      }), f.start.getCertainComponents().forEach((i) => {
        m.start.isCertain(i) || m.start.imply(i, f.start.get(i));
      })), f.start.date().getTime() > m.start.date().getTime()) {
        let i = f.start.dayjs(), s = m.start.dayjs();
        m.start.isOnlyWeekdayComponent() && s.add(7, "days").isAfter(i) ? (s = s.add(7, "days"), m.start.imply("day", s.date()), m.start.imply("month", s.month() + 1), m.start.imply("year", s.year())) : f.start.isOnlyWeekdayComponent() && i.add(-7, "days").isBefore(s) ? (i = i.add(-7, "days"), f.start.imply("day", i.date()), f.start.imply("month", i.month() + 1), f.start.imply("year", i.year())) : m.start.isDateWithUnknownYear() && s.add(1, "years").isAfter(i) ? (s = s.add(1, "years"), m.start.imply("year", s.year())) : f.start.isDateWithUnknownYear() && i.add(-1, "years").isBefore(s) ? (i = i.add(-1, "years"), f.start.imply("year", i.year())) : [m, f] = [f, m];
      }
      const u = f.clone();
      return u.start = f.start, u.end = m.start, u.index = Math.min(f.index, m.index), f.index < m.index ? u.text = f.text + n + m.text : u.text = m.text + n + f.text, u;
    }
  };
  return Pt.default = d, Pt;
}
var _a;
function ju() {
  if (_a) return Ke;
  _a = 1;
  var e = Ke && Ke.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Ke, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(to|-|–|until|through|till)\s*$/i;
    }
  };
  return Ke.default = _, Ke;
}
var Ve = {}, gt = {}, Ye = {}, Pa;
function $u() {
  if (Pa) return Ye;
  Pa = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.mergeDateTimeComponent = Ye.mergeDateTimeResult = void 0;
  const e = /* @__PURE__ */ B(), d = /* @__PURE__ */ Q();
  function _(f, m) {
    const u = f.clone(), i = f.start, s = m.start;
    if (u.start = n(i, s), f.end != null || m.end != null) {
      const t = f.end == null ? f.start : f.end, r = m.end == null ? m.start : m.end, a = n(t, r);
      if (f.end == null && a.date().getTime() < u.start.date().getTime()) {
        const o = a.dayjs().add(1, "day");
        a.isCertain("day") ? d.assignSimilarDate(a, o) : d.implySimilarDate(a, o);
      }
      u.end = a;
    }
    return u;
  }
  Ye.mergeDateTimeResult = _;
  function n(f, m) {
    const u = f.clone();
    return m.isCertain("hour") ? (u.assign("hour", m.get("hour")), u.assign("minute", m.get("minute")), m.isCertain("second") ? (u.assign("second", m.get("second")), m.isCertain("millisecond") ? u.assign("millisecond", m.get("millisecond")) : u.imply("millisecond", m.get("millisecond"))) : (u.imply("second", m.get("second")), u.imply("millisecond", m.get("millisecond")))) : (u.imply("hour", m.get("hour")), u.imply("minute", m.get("minute")), u.imply("second", m.get("second")), u.imply("millisecond", m.get("millisecond"))), m.isCertain("timezoneOffset") && u.assign("timezoneOffset", m.get("timezoneOffset")), m.isCertain("meridiem") ? u.assign("meridiem", m.get("meridiem")) : m.get("meridiem") != null && u.get("meridiem") == null && u.imply("meridiem", m.get("meridiem")), u.get("meridiem") == e.Meridiem.PM && u.get("hour") < 12 && (m.isCertain("hour") ? u.assign("hour", u.get("hour") + 12) : u.imply("hour", u.get("hour") + 12)), u.addTags(f.tags()), u.addTags(m.tags()), u;
  }
  return Ye.mergeDateTimeComponent = n, Ye;
}
var ga;
function Ne() {
  if (ga) return gt;
  ga = 1, Object.defineProperty(gt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ge(), d = /* @__PURE__ */ $u();
  let _ = class extends e.MergingRefiner {
    shouldMergeResults(f, m, u) {
      return (m.start.isOnlyDate() && u.start.isOnlyTime() || u.start.isOnlyDate() && m.start.isOnlyTime()) && f.match(this.patternBetween()) != null;
    }
    mergeResults(f, m, u) {
      const i = m.start.isOnlyDate() ? d.mergeDateTimeResult(m, u) : d.mergeDateTimeResult(u, m);
      return i.index = m.index, i.text = m.text + f + u.text, i;
    }
  };
  return gt.default = _, gt;
}
var ya;
function Fu() {
  if (ya) return Ve;
  ya = 1;
  var e = Ve && Ve.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Ve, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(T|at|after|before|on|of|,|-|\\.|∙|:)?\\s*$");
    }
  };
  return Ve.default = _, Ve;
}
var ke = {}, yt = {}, Ta;
function Yu() {
  if (Ta) return yt;
  Ta = 1, Object.defineProperty(yt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ tu(), d = new RegExp("^\\s*,?\\s*\\(?([A-Z]{2,4})\\)?(?=\\W|$)", "i");
  let _ = class {
    constructor(f) {
      this.timezoneOverrides = f;
    }
    refine(f, m) {
      var u;
      const i = (u = f.option.timezones) !== null && u !== void 0 ? u : {};
      return m.forEach((s) => {
        var t, r;
        const a = f.text.substring(s.index + s.text.length), o = d.exec(a);
        if (!o)
          return;
        const l = o[1].toUpperCase(), c = (r = (t = s.start.date()) !== null && t !== void 0 ? t : s.refDate) !== null && r !== void 0 ? r : /* @__PURE__ */ new Date(), g = Object.assign(Object.assign({}, this.timezoneOverrides), i), P = e.toTimezoneOffset(l, c, g);
        if (P == null)
          return;
        f.debug(() => {
          console.log(`Extracting timezone: '${l}' into: ${P} for: ${s.start}`);
        });
        const y = s.start.get("timezoneOffset");
        y !== null && P != y && (s.start.isCertain("timezoneOffset") || l != o[1]) || s.start.isOnlyDate() && l != o[1] || (s.text += o[0], s.start.isCertain("timezoneOffset") || s.start.assign("timezoneOffset", P), s.end != null && !s.end.isCertain("timezoneOffset") && s.end.assign("timezoneOffset", P));
      }), m;
    }
  };
  return yt.default = _, yt;
}
var Tt = {}, Ra;
function An() {
  if (Ra) return Tt;
  Ra = 1, Object.defineProperty(Tt, "__esModule", { value: !0 });
  const e = new RegExp("^\\s*(?:\\(?(?:GMT|UTC)\\s?)?([+-])(\\d{1,2})(?::?(\\d{2}))?\\)?", "i"), d = 1, _ = 2, n = 3;
  let f = class {
    refine(u, i) {
      return i.forEach(function(s) {
        if (s.start.isCertain("timezoneOffset"))
          return;
        const t = u.text.substring(s.index + s.text.length), r = e.exec(t);
        if (!r)
          return;
        u.debug(() => {
          console.log(`Extracting timezone: '${r[0]}' into : ${s}`);
        });
        const a = parseInt(r[_]), o = parseInt(r[n] || "0");
        let l = a * 60 + o;
        l > 14 * 60 || (r[d] === "-" && (l = -l), s.end != null && s.end.assign("timezoneOffset", l), s.start.assign("timezoneOffset", l), s.text += r[0]);
      }), i;
    }
  };
  return Tt.default = f, Tt;
}
var Rt = {}, ha;
function nu() {
  if (ha) return Rt;
  ha = 1, Object.defineProperty(Rt, "__esModule", { value: !0 });
  let e = class {
    refine(_, n) {
      if (n.length < 2)
        return n;
      const f = [];
      let m = n[0];
      for (let u = 1; u < n.length; u++) {
        const i = n[u];
        if (i.index >= m.index + m.text.length) {
          f.push(m), m = i;
          continue;
        }
        let s = null, t = null;
        i.text.length > m.text.length ? (s = i, t = m) : (s = m, t = i), _.debug(() => {
          console.log(`${this.constructor.name} remove ${t} by ${s}`);
        }), m = s;
      }
      return m != null && f.push(m), f;
    }
  };
  return Rt.default = e, Rt;
}
var te = {}, Be = {}, Ea;
function ku() {
  if (Ea) return Be;
  Ea = 1, Object.defineProperty(Be, "__esModule", { value: !0 }), Be.implySimilarTime = Be.implySimilarDate = void 0;
  function e(_, n) {
    _.imply("day", n.getDate()), _.imply("month", n.getMonth() + 1), _.imply("year", n.getFullYear());
  }
  Be.implySimilarDate = e;
  function d(_, n) {
    _.imply("hour", n.getHours()), _.imply("minute", n.getMinutes()), _.imply("second", n.getSeconds()), _.imply("millisecond", n.getMilliseconds());
  }
  return Be.implySimilarTime = d, Be;
}
var pa;
function Bu() {
  if (pa) return te;
  pa = 1;
  var e = te && te.__createBinding || (Object.create ? function(i, s, t, r) {
    r === void 0 && (r = t), Object.defineProperty(i, r, { enumerable: !0, get: function() {
      return s[t];
    } });
  } : function(i, s, t, r) {
    r === void 0 && (r = t), i[r] = s[t];
  }), d = te && te.__setModuleDefault || (Object.create ? function(i, s) {
    Object.defineProperty(i, "default", { enumerable: !0, value: s });
  } : function(i, s) {
    i.default = s;
  }), _ = te && te.__importStar || function(i) {
    if (i && i.__esModule) return i;
    var s = {};
    if (i != null) for (var t in i) t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && e(s, i, t);
    return d(s, i), s;
  }, n = te && te.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(te, "__esModule", { value: !0 });
  const f = n(k()), m = _(/* @__PURE__ */ ku());
  let u = class {
    refine(s, t) {
      return s.option.forwardDate && t.forEach((r) => {
        let a = f.default(s.reference.getDateWithAdjustedTimezone());
        if (r.start.isOnlyTime() && s.reference.instant > r.start.date()) {
          const o = s.reference.getDateWithAdjustedTimezone(), l = new Date(o);
          l.setDate(l.getDate() + 1), m.implySimilarDate(r.start, l), s.debug(() => {
            console.log(`${this.constructor.name} adjusted ${r} time from the ref date (${o}) to the following day (${l})`);
          }), r.end && r.end.isOnlyTime() && (m.implySimilarDate(r.end, l), r.start.date() > r.end.date() && (l.setDate(l.getDate() + 1), m.implySimilarDate(r.end, l)));
        }
        if (r.start.isOnlyWeekdayComponent() && a.isAfter(r.start.dayjs()) && (a.day() >= r.start.get("weekday") ? a = a.day(r.start.get("weekday") + 7) : a = a.day(r.start.get("weekday")), r.start.imply("day", a.date()), r.start.imply("month", a.month() + 1), r.start.imply("year", a.year()), s.debug(() => {
          console.log(`${this.constructor.name} adjusted ${r} weekday (${r.start})`);
        }), r.end && r.end.isOnlyWeekdayComponent() && (a.day() > r.end.get("weekday") ? a = a.day(r.end.get("weekday") + 7) : a = a.day(r.end.get("weekday")), r.end.imply("day", a.date()), r.end.imply("month", a.month() + 1), r.end.imply("year", a.year()), s.debug(() => {
          console.log(`${this.constructor.name} adjusted ${r} weekday (${r.end})`);
        }))), r.start.isDateWithUnknownYear() && a.isAfter(r.start.dayjs()))
          for (let o = 0; o < 3 && a.isAfter(r.start.dayjs()); o++)
            r.start.imply("year", r.start.get("year") + 1), s.debug(() => {
              console.log(`${this.constructor.name} adjusted ${r} year (${r.start})`);
            }), r.end && !r.end.isCertain("year") && (r.end.imply("year", r.end.get("year") + 1), s.debug(() => {
              console.log(`${this.constructor.name} adjusted ${r} month (${r.start})`);
            }));
      }), t;
    }
  };
  return te.default = u, te;
}
var ht = {}, Ma;
function Lu() {
  if (Ma) return ht;
  Ma = 1, Object.defineProperty(ht, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ge();
  let d = class extends e.Filter {
    constructor(n) {
      super(), this.strictMode = n;
    }
    isValid(n, f) {
      return f.text.replace(" ", "").match(/^\d*(\.\d*)?$/) ? (n.debug(() => {
        console.log(`Removing unlikely result '${f.text}'`);
      }), !1) : f.start.isValidDate() ? f.end && !f.end.isValidDate() ? (n.debug(() => {
        console.log(`Removing invalid result: ${f} (${f.end})`);
      }), !1) : this.strictMode ? this.isStrictModeValid(n, f) : !0 : (n.debug(() => {
        console.log(`Removing invalid result: ${f} (${f.start})`);
      }), !1);
    }
    isStrictModeValid(n, f) {
      return f.start.isOnlyWeekdayComponent() ? (n.debug(() => {
        console.log(`(Strict) Removing weekday only component: ${f} (${f.end})`);
      }), !1) : f.start.isOnlyTime() && (!f.start.isCertain("hour") || !f.start.isCertain("minute")) ? (n.debug(() => {
        console.log(`(Strict) Removing uncertain time component: ${f} (${f.end})`);
      }), !1) : !0;
    }
  };
  return ht.default = d, ht;
}
var Et = {}, Na;
function Hn() {
  if (Na) return Et;
  Na = 1, Object.defineProperty(Et, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ W(), d = new RegExp("([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)", "i"), _ = 1, n = 2, f = 3, m = 4, u = 5, i = 6, s = 7, t = 8, r = 9, a = 10;
  let o = class extends e.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return d;
    }
    innerExtract(c, g) {
      const P = c.createParsingComponents({
        year: parseInt(g[_]),
        month: parseInt(g[n]),
        day: parseInt(g[f])
      });
      if (g[m] != null && (P.assign("hour", parseInt(g[m])), P.assign("minute", parseInt(g[u])), g[i] != null && P.assign("second", parseInt(g[i])), g[s] != null && P.assign("millisecond", parseInt(g[s])), g[t] != null)) {
        let y = 0;
        if (g[r]) {
          const T = parseInt(g[r]);
          let h = 0;
          g[a] != null && (h = parseInt(g[a])), y = T * 60, y < 0 ? y -= h : y += h;
        }
        P.assign("timezoneOffset", y);
      }
      return P.addTag("parser/ISOFormatParser");
    }
  };
  return Et.default = o, Et;
}
var pt = {}, Da;
function qu() {
  if (Da) return pt;
  Da = 1, Object.defineProperty(pt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ge();
  let d = class extends e.MergingRefiner {
    mergeResults(n, f, m) {
      const u = m.clone();
      return u.index = f.index, u.text = f.text + n + u.text, u.start.assign("weekday", f.start.get("weekday")), u.end && u.end.assign("weekday", f.start.get("weekday")), u;
    }
    shouldMergeResults(n, f, m) {
      return f.start.isOnlyWeekdayComponent() && !f.start.isCertain("hour") && m.start.isCertain("day") && n.match(/^,?\s*$/) != null;
    }
  };
  return pt.default = d, pt;
}
var Aa;
function ye() {
  if (Aa) return ke;
  Aa = 1;
  var e = ke && ke.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(ke, "__esModule", { value: !0 }), ke.includeCommonConfiguration = void 0;
  const d = e(/* @__PURE__ */ Yu()), _ = e(/* @__PURE__ */ An()), n = e(/* @__PURE__ */ nu()), f = e(/* @__PURE__ */ Bu()), m = e(/* @__PURE__ */ Lu()), u = e(/* @__PURE__ */ Hn()), i = e(/* @__PURE__ */ qu());
  function s(t, r = !1) {
    return t.parsers.unshift(new u.default()), t.refiners.unshift(new i.default()), t.refiners.unshift(new _.default()), t.refiners.unshift(new n.default()), t.refiners.push(new d.default()), t.refiners.push(new n.default()), t.refiners.push(new f.default()), t.refiners.push(new m.default(r)), t;
  }
  return ke.includeCommonConfiguration = s, ke;
}
var ne = {}, Y = {}, Oa;
function ce() {
  if (Oa) return Y;
  Oa = 1;
  var e = Y && Y.__importDefault || function(h) {
    return h && h.__esModule ? h : { default: h };
  };
  Object.defineProperty(Y, "__esModule", { value: !0 }), Y.noon = Y.afternoon = Y.morning = Y.midnight = Y.yesterdayEvening = Y.evening = Y.lastNight = Y.tonight = Y.theDayAfter = Y.tomorrow = Y.theDayBefore = Y.yesterday = Y.today = Y.now = void 0;
  const d = /* @__PURE__ */ $(), _ = e(k()), n = /* @__PURE__ */ Q(), f = /* @__PURE__ */ B();
  function m(h) {
    const R = _.default(h.getDateWithAdjustedTimezone()), E = new d.ParsingComponents(h, {});
    return n.assignSimilarDate(E, R), n.assignSimilarTime(E, R), E.assign("timezoneOffset", h.getTimezoneOffset()), E.addTag("casualReference/now"), E;
  }
  Y.now = m;
  function u(h) {
    const R = _.default(h.getDateWithAdjustedTimezone()), E = new d.ParsingComponents(h, {});
    return n.assignSimilarDate(E, R), n.implySimilarTime(E, R), E.addTag("casualReference/today"), E;
  }
  Y.today = u;
  function i(h) {
    return s(h, 1).addTag("casualReference/yesterday");
  }
  Y.yesterday = i;
  function s(h, R) {
    return r(h, -R);
  }
  Y.theDayBefore = s;
  function t(h) {
    return r(h, 1).addTag("casualReference/tomorrow");
  }
  Y.tomorrow = t;
  function r(h, R) {
    let E = _.default(h.getDateWithAdjustedTimezone());
    const p = new d.ParsingComponents(h, {});
    return E = E.add(R, "day"), n.assignSimilarDate(p, E), n.implySimilarTime(p, E), p;
  }
  Y.theDayAfter = r;
  function a(h, R = 22) {
    const E = _.default(h.getDateWithAdjustedTimezone()), p = new d.ParsingComponents(h, {});
    return n.assignSimilarDate(p, E), p.imply("hour", R), p.imply("meridiem", f.Meridiem.PM), p.addTag("casualReference/tonight"), p;
  }
  Y.tonight = a;
  function o(h, R = 0) {
    let E = _.default(h.getDateWithAdjustedTimezone());
    const p = new d.ParsingComponents(h, {});
    return E.hour() < 6 && (E = E.add(-1, "day")), n.assignSimilarDate(p, E), p.imply("hour", R), p;
  }
  Y.lastNight = o;
  function l(h, R = 20) {
    const E = new d.ParsingComponents(h, {});
    return E.imply("meridiem", f.Meridiem.PM), E.imply("hour", R), E.addTag("casualReference/evening"), E;
  }
  Y.evening = l;
  function c(h, R = 20) {
    let E = _.default(h.getDateWithAdjustedTimezone());
    const p = new d.ParsingComponents(h, {});
    return E = E.add(-1, "day"), n.assignSimilarDate(p, E), p.imply("hour", R), p.imply("meridiem", f.Meridiem.PM), p.addTag("casualReference/yesterday"), p.addTag("casualReference/evening"), p;
  }
  Y.yesterdayEvening = c;
  function g(h) {
    const R = new d.ParsingComponents(h, {}), E = _.default(h.getDateWithAdjustedTimezone());
    return E.hour() > 2 && n.implyTheNextDay(R, E), R.assign("hour", 0), R.imply("minute", 0), R.imply("second", 0), R.imply("millisecond", 0), R.addTag("casualReference/midnight"), R;
  }
  Y.midnight = g;
  function P(h, R = 6) {
    const E = new d.ParsingComponents(h, {});
    return E.imply("meridiem", f.Meridiem.AM), E.imply("hour", R), E.imply("minute", 0), E.imply("second", 0), E.imply("millisecond", 0), E.addTag("casualReference/morning"), E;
  }
  Y.morning = P;
  function y(h, R = 15) {
    const E = new d.ParsingComponents(h, {});
    return E.imply("meridiem", f.Meridiem.PM), E.imply("hour", R), E.imply("minute", 0), E.imply("second", 0), E.imply("millisecond", 0), E.addTag("casualReference/afternoon"), E;
  }
  Y.afternoon = y;
  function T(h) {
    const R = new d.ParsingComponents(h, {});
    return R.imply("meridiem", f.Meridiem.AM), R.imply("hour", 12), R.imply("minute", 0), R.imply("second", 0), R.imply("millisecond", 0), R.addTag("casualReference/noon"), R;
  }
  return Y.noon = T, Y;
}
var Ca;
function Hu() {
  if (Ca) return ne;
  Ca = 1;
  var e = ne && ne.__createBinding || (Object.create ? function(r, a, o, l) {
    l === void 0 && (l = o), Object.defineProperty(r, l, { enumerable: !0, get: function() {
      return a[o];
    } });
  } : function(r, a, o, l) {
    l === void 0 && (l = o), r[l] = a[o];
  }), d = ne && ne.__setModuleDefault || (Object.create ? function(r, a) {
    Object.defineProperty(r, "default", { enumerable: !0, value: a });
  } : function(r, a) {
    r.default = a;
  }), _ = ne && ne.__importStar || function(r) {
    if (r && r.__esModule) return r;
    var a = {};
    if (r != null) for (var o in r) o !== "default" && Object.prototype.hasOwnProperty.call(r, o) && e(a, r, o);
    return d(a, r), a;
  }, n = ne && ne.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(ne, "__esModule", { value: !0 });
  const f = n(k()), m = /* @__PURE__ */ W(), u = /* @__PURE__ */ Q(), i = _(/* @__PURE__ */ ce()), s = /(now|today|tonight|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;
  let t = class extends m.AbstractParserWithWordBoundaryChecking {
    innerPattern(a) {
      return s;
    }
    innerExtract(a, o) {
      let l = f.default(a.refDate);
      const c = o[0].toLowerCase();
      let g = a.createParsingComponents();
      switch (c) {
        case "now":
          g = i.now(a.reference);
          break;
        case "today":
          g = i.today(a.reference);
          break;
        case "yesterday":
          g = i.yesterday(a.reference);
          break;
        case "tomorrow":
        case "tmr":
        case "tmrw":
          g = i.tomorrow(a.reference);
          break;
        case "tonight":
          g = i.tonight(a.reference);
          break;
        case "overmorrow":
          g = i.theDayAfter(a.reference, 2);
          break;
        default:
          c.match(/last\s*night/) && (l.hour() > 6 && (l = l.add(-1, "day")), u.assignSimilarDate(g, l), g.imply("hour", 0));
          break;
      }
      return g.addTag("parser/ENCasualDateParser"), g;
    }
  };
  return ne.default = t, ne;
}
var Te = {}, ba;
function Gu() {
  if (ba) return Te;
  ba = 1;
  var e = Te && Te.__createBinding || (Object.create ? function(i, s, t, r) {
    r === void 0 && (r = t), Object.defineProperty(i, r, { enumerable: !0, get: function() {
      return s[t];
    } });
  } : function(i, s, t, r) {
    r === void 0 && (r = t), i[r] = s[t];
  }), d = Te && Te.__setModuleDefault || (Object.create ? function(i, s) {
    Object.defineProperty(i, "default", { enumerable: !0, value: s });
  } : function(i, s) {
    i.default = s;
  }), _ = Te && Te.__importStar || function(i) {
    if (i && i.__esModule) return i;
    var s = {};
    if (i != null) for (var t in i) t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && e(s, i, t);
    return d(s, i), s;
  };
  Object.defineProperty(Te, "__esModule", { value: !0 });
  const n = /* @__PURE__ */ W(), f = _(/* @__PURE__ */ ce()), m = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;
  let u = class extends n.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return m;
    }
    innerExtract(s, t) {
      let r = null;
      switch (t[1].toLowerCase()) {
        case "afternoon":
          r = f.afternoon(s.reference);
          break;
        case "evening":
        case "night":
          r = f.evening(s.reference);
          break;
        case "midnight":
          r = f.midnight(s.reference);
          break;
        case "morning":
          r = f.morning(s.reference);
          break;
        case "noon":
        case "midday":
          r = f.noon(s.reference);
          break;
      }
      return r && r.addTag("parser/ENCasualTimeParser"), r;
    }
  };
  return Te.default = u, Te;
}
var Mt = {}, J = {}, va;
function Ie() {
  if (va) return J;
  va = 1, Object.defineProperty(J, "__esModule", { value: !0 }), J.getBackwardDaysToWeekday = J.getDaysForwardToWeekday = J.getDaysToWeekdayClosest = J.getDaysToWeekday = J.createParsingComponentsAtWeekday = void 0;
  const e = /* @__PURE__ */ B(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ X();
  function n(s, t, r) {
    const a = s.getDateWithAdjustedTimezone(), o = f(a, t, r);
    let l = new d.ParsingComponents(s);
    return l = _.addImpliedTimeUnits(l, { day: o }), l.assign("weekday", t), l;
  }
  J.createParsingComponentsAtWeekday = n;
  function f(s, t, r) {
    const a = s.getDay();
    switch (r) {
      case "this":
        return u(s, t);
      case "last":
        return i(s, t);
      case "next":
        return a == e.Weekday.SUNDAY ? t == e.Weekday.SUNDAY ? 7 : t : a == e.Weekday.SATURDAY ? t == e.Weekday.SATURDAY ? 7 : t == e.Weekday.SUNDAY ? 8 : 1 + t : t < a && t != e.Weekday.SUNDAY ? u(s, t) : u(s, t) + 7;
    }
    return m(s, t);
  }
  J.getDaysToWeekday = f;
  function m(s, t) {
    const r = i(s, t), a = u(s, t);
    return a < -r ? a : r;
  }
  J.getDaysToWeekdayClosest = m;
  function u(s, t) {
    const r = s.getDay();
    let a = t - r;
    return a < 0 && (a += 7), a;
  }
  J.getDaysForwardToWeekday = u;
  function i(s, t) {
    const r = s.getDay();
    let a = t - r;
    return a >= 0 && (a -= 7), a;
  }
  return J.getBackwardDaysToWeekday = i, J;
}
var Ia;
function zu() {
  if (Ia) return Mt;
  Ia = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Ie(), f = /* @__PURE__ */ B(), m = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:on\\s*?)?(?:(this|last|past|next)\\s*)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)}|weekend|weekday)(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(this|last|past|next)\\s*week)?(?=\\W|$)`, "i"), u = 1, i = 2, s = 3;
  let t = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return m;
    }
    innerExtract(a, o) {
      const l = o[u], c = o[s];
      let g = l || c;
      g = g || "", g = g.toLowerCase();
      let P = null;
      g == "last" || g == "past" ? P = "last" : g == "next" ? P = "next" : g == "this" && (P = "this");
      const y = o[i].toLowerCase();
      let T;
      if (e.WEEKDAY_DICTIONARY[y] !== void 0)
        T = e.WEEKDAY_DICTIONARY[y];
      else if (y == "weekend")
        T = P == "last" ? f.Weekday.SUNDAY : f.Weekday.SATURDAY;
      else if (y == "weekday") {
        const h = a.reference.getDateWithAdjustedTimezone().getDay();
        h == f.Weekday.SUNDAY || h == f.Weekday.SATURDAY ? T = P == "last" ? f.Weekday.FRIDAY : f.Weekday.MONDAY : (T = h - 1, T = P == "last" ? T - 1 : T + 1, T = T % 5 + 1);
      } else
        return null;
      return n.createParsingComponentsAtWeekday(a.reference, T, P);
    }
  };
  return Mt.default = t, Mt;
}
var Xe = {}, Wa;
function Zu() {
  if (Wa) return Xe;
  Wa = 1;
  var e = Xe && Xe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Xe, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ Z(), _ = /* @__PURE__ */ $(), n = e(k()), f = /* @__PURE__ */ W(), m = /* @__PURE__ */ F(), u = new RegExp(`(this|last|past|next|after\\s*this)\\s*(${m.matchAnyPattern(d.TIME_UNIT_DICTIONARY)})(?=\\s*)(?=\\W|$)`, "i"), i = 1, s = 2;
  let t = class extends f.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return u;
    }
    innerExtract(a, o) {
      const l = o[i].toLowerCase(), c = o[s].toLowerCase(), g = d.TIME_UNIT_DICTIONARY[c];
      if (l == "next" || l.startsWith("after")) {
        const T = {};
        return T[g] = 1, _.ParsingComponents.createRelativeFromReference(a.reference, T);
      }
      if (l == "last" || l == "past") {
        const T = {};
        return T[g] = -1, _.ParsingComponents.createRelativeFromReference(a.reference, T);
      }
      const P = a.createParsingComponents();
      let y = n.default(a.reference.instant);
      return c.match(/week/i) ? (y = y.add(-y.get("d"), "d"), P.imply("day", y.date()), P.imply("month", y.month() + 1), P.imply("year", y.year())) : c.match(/month/i) ? (y = y.add(-y.date() + 1, "d"), P.imply("day", y.date()), P.assign("year", y.year()), P.assign("month", y.month() + 1)) : c.match(/year/i) && (y = y.add(-y.date() + 1, "d"), y = y.add(-y.month(), "month"), P.imply("day", y.date()), P.imply("month", y.month() + 1), P.assign("year", y.year())), P;
    }
  };
  return Xe.default = t, Xe;
}
var Nt = {}, Ua;
function We() {
  if (Ua) return Nt;
  Ua = 1, Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = new RegExp("([^\\d]|^)([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?(\\W|$)", "i"), _ = 1, n = 5, f = 2, m = 3, u = 4;
  let i = class {
    constructor(t) {
      this.groupNumberMonth = t ? m : f, this.groupNumberDay = t ? f : m;
    }
    pattern() {
      return d;
    }
    extract(t, r) {
      const a = r.index + r[_].length, o = r.index + r[0].length - r[n].length;
      if (a > 0 && t.text.substring(0, a).match("\\d/?$") || o < t.text.length && t.text.substring(o).match("^/?\\d"))
        return;
      const l = t.text.substring(a, o);
      if (l.match(/^\d\.\d$/) || l.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/) || !r[u] && l.indexOf("/") < 0)
        return;
      const c = t.createParsingResult(a, l);
      let g = parseInt(r[this.groupNumberMonth]), P = parseInt(r[this.groupNumberDay]);
      if ((g < 1 || g > 12) && g > 12)
        if (P >= 1 && P <= 12 && g <= 31)
          [P, g] = [g, P];
        else
          return null;
      if (P < 1 || P > 31)
        return null;
      if (c.start.assign("day", P), c.start.assign("month", g), r[u]) {
        const y = parseInt(r[u]), T = e.findMostLikelyADYear(y);
        c.start.assign("year", T);
      } else {
        const y = e.findYearClosestToRef(t.refDate, P, g);
        c.start.imply("year", y);
      }
      return c.addTag("parser/SlashDateFormatParser");
    }
  };
  return Nt.default = i, Nt;
}
var Dt = {}, wa;
function Ku() {
  if (wa) return Dt;
  wa = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ X(), f = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${e.TIME_UNITS_PATTERN})(?=\\W|$)`, "i"), m = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${e.TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`, "i");
  let u = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor(s = !0) {
      super(), this.allowAbbreviations = s;
    }
    innerPattern() {
      return this.allowAbbreviations ? f : m;
    }
    innerExtract(s, t) {
      const r = t[1].toLowerCase();
      let a = e.parseTimeUnits(t[2]);
      if (!a)
        return null;
      switch (r) {
        case "last":
        case "past":
        case "-":
          a = n.reverseTimeUnits(a);
          break;
      }
      return d.ParsingComponents.createRelativeFromReference(s.reference, a);
    }
  };
  return Dt.default = u, Dt;
}
var At = {}, Sa;
function Vu() {
  if (Sa) return At;
  Sa = 1, Object.defineProperty(At, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ge(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ Z(), n = /* @__PURE__ */ X();
  function f(i) {
    return i.text.match(/^[+-]/i) != null;
  }
  function m(i) {
    return i.text.match(/^-/i) != null;
  }
  let u = class extends e.MergingRefiner {
    shouldMergeResults(s, t, r) {
      return s.match(/^\s*$/i) ? f(r) || m(r) : !1;
    }
    mergeResults(s, t, r, a) {
      let o = _.parseTimeUnits(r.text);
      m(r) && (o = n.reverseTimeUnits(o));
      const l = d.ParsingComponents.createRelativeFromReference(new d.ReferenceWithTimezone(t.start.date()), o);
      return new d.ParsingResult(t.reference, t.index, `${t.text}${s}${r.text}`, l);
    }
  };
  return At.default = u, At;
}
var Ot = {}, ja;
function Xu() {
  if (ja) return Ot;
  ja = 1, Object.defineProperty(Ot, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ge(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ Z(), n = /* @__PURE__ */ X();
  function f(i) {
    return i.text.match(/\s+(before|from)$/i) != null;
  }
  function m(i) {
    return i.text.match(/\s+(after|since)$/i) != null;
  }
  let u = class extends e.MergingRefiner {
    patternBetween() {
      return /^\s*$/i;
    }
    shouldMergeResults(s, t, r) {
      return !s.match(this.patternBetween()) || !f(t) && !m(t) ? !1 : !!r.start.get("day") && !!r.start.get("month") && !!r.start.get("year");
    }
    mergeResults(s, t, r) {
      let a = _.parseTimeUnits(t.text);
      f(t) && (a = n.reverseTimeUnits(a));
      const o = d.ParsingComponents.createRelativeFromReference(new d.ReferenceWithTimezone(r.start.date()), a);
      return new d.ParsingResult(r.reference, t.index, `${t.text}${s}${r.text}`, o);
    }
  };
  return Ot.default = u, Ot;
}
var Ct = {}, $a;
function xu() {
  if ($a) return Ct;
  $a = 1, Object.defineProperty(Ct, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Z(), d = new RegExp(`^\\s*(${e.YEAR_PATTERN})`, "i"), _ = 1;
  let n = class {
    refine(m, u) {
      return u.forEach(function(i) {
        if (!i.start.isDateWithUnknownYear())
          return;
        const s = m.text.substring(i.index + i.text.length), t = d.exec(s);
        if (!t)
          return;
        m.debug(() => {
          console.log(`Extracting year: '${t[0]}' into : ${i}`);
        });
        const r = e.parseYear(t[_]);
        i.end != null && i.end.assign("year", r), i.start.assign("year", r), i.text += t[0];
      }), u;
    }
  };
  return Ct.default = n, Ct;
}
var bt = {}, Fa;
function Ju() {
  if (Fa) return bt;
  Fa = 1, Object.defineProperty(bt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ge();
  let d = class extends e.Filter {
    constructor() {
      super();
    }
    isValid(n, f) {
      const m = f.text.trim();
      return m === n.text.trim() ? !0 : m.toLowerCase() === "may" && !n.text.substring(0, f.index).trim().match(/\b(in)$/i) ? (n.debug(() => {
        console.log(`Removing unlikely result: ${f}`);
      }), !1) : m.toLowerCase().endsWith("the second") ? (n.text.substring(f.index + f.text.length).trim().length > 0 && n.debug(() => {
        console.log(`Removing unlikely result: ${f}`);
      }), !1) : !0;
    }
  };
  return bt.default = d, bt;
}
var Ya;
function au() {
  if (Ya) return Ze;
  Ya = 1;
  var e = Ze && Ze.__importDefault || function(b) {
    return b && b.__esModule ? b : { default: b };
  };
  Object.defineProperty(Ze, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ou()), _ = e(/* @__PURE__ */ Cu()), n = e(/* @__PURE__ */ bu()), f = e(/* @__PURE__ */ vu()), m = e(/* @__PURE__ */ Iu()), u = e(/* @__PURE__ */ Wu()), i = e(/* @__PURE__ */ Uu()), s = e(/* @__PURE__ */ wu()), t = e(/* @__PURE__ */ Su()), r = e(/* @__PURE__ */ ju()), a = e(/* @__PURE__ */ Fu()), o = /* @__PURE__ */ ye(), l = e(/* @__PURE__ */ Hu()), c = e(/* @__PURE__ */ Gu()), g = e(/* @__PURE__ */ zu()), P = e(/* @__PURE__ */ Zu()), y = e(/* @__PURE__ */ We()), T = e(/* @__PURE__ */ Ku()), h = e(/* @__PURE__ */ Vu()), R = e(/* @__PURE__ */ Xu()), E = e(/* @__PURE__ */ nu()), p = e(/* @__PURE__ */ xu()), A = e(/* @__PURE__ */ Ju());
  class N {
    createCasualConfiguration(D = !1) {
      const M = this.createConfiguration(!1, D);
      return M.parsers.push(new l.default()), M.parsers.push(new c.default()), M.parsers.push(new f.default()), M.parsers.push(new P.default()), M.parsers.push(new T.default()), M.refiners.push(new A.default()), M;
    }
    createConfiguration(D = !0, M = !1) {
      const S = o.includeCommonConfiguration({
        parsers: [
          new y.default(M),
          new d.default(D),
          new _.default(),
          new n.default(M),
          new g.default(),
          new u.default(),
          new i.default(D),
          new s.default(D),
          new t.default(D)
        ],
        refiners: [new a.default()]
      }, D);
      return S.parsers.unshift(new m.default(D)), S.refiners.unshift(new R.default()), S.refiners.unshift(new h.default()), S.refiners.unshift(new E.default()), S.refiners.push(new a.default()), S.refiners.push(new p.default()), S.refiners.push(new r.default()), S;
    }
  }
  return Ze.default = N, Ze;
}
var ka;
function ee() {
  if (ka) return Ae;
  ka = 1;
  var e = Ae && Ae.__importDefault || function(m) {
    return m && m.__esModule ? m : { default: m };
  };
  Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.ParsingContext = Ae.Chrono = void 0;
  const d = /* @__PURE__ */ $(), _ = e(/* @__PURE__ */ au());
  class n {
    constructor(u) {
      this.defaultConfig = new _.default(), u = u || this.defaultConfig.createCasualConfiguration(), this.parsers = [...u.parsers], this.refiners = [...u.refiners];
    }
    clone() {
      return new n({
        parsers: [...this.parsers],
        refiners: [...this.refiners]
      });
    }
    parseDate(u, i, s) {
      const t = this.parse(u, i, s);
      return t.length > 0 ? t[0].start.date() : null;
    }
    parse(u, i, s) {
      const t = new f(u, i, s);
      let r = [];
      return this.parsers.forEach((a) => {
        const o = n.executeParser(t, a);
        r = r.concat(o);
      }), r.sort((a, o) => a.index - o.index), this.refiners.forEach(function(a) {
        r = a.refine(t, r);
      }), r;
    }
    static executeParser(u, i) {
      const s = [], t = i.pattern(u), r = u.text;
      let a = u.text, o = t.exec(a);
      for (; o; ) {
        const l = o.index + r.length - a.length;
        o.index = l;
        const c = i.extract(u, o);
        if (!c) {
          a = r.substring(o.index + 1), o = t.exec(a);
          continue;
        }
        let g = null;
        c instanceof d.ParsingResult ? g = c : c instanceof d.ParsingComponents ? (g = u.createParsingResult(o.index, o[0]), g.start = c) : g = u.createParsingResult(o.index, o[0], c);
        const P = g.index, y = g.text;
        u.debug(() => console.log(`${i.constructor.name} extracted (at index=${P}) '${y}'`)), s.push(g), a = r.substring(P + y.length), o = t.exec(a);
      }
      return s;
    }
  }
  Ae.Chrono = n;
  class f {
    constructor(u, i, s) {
      this.text = u, this.reference = new d.ReferenceWithTimezone(i), this.option = s ?? {}, this.refDate = this.reference.instant;
    }
    createParsingComponents(u) {
      return u instanceof d.ParsingComponents ? u : new d.ParsingComponents(this.reference, u);
    }
    createParsingResult(u, i, s, t) {
      const r = typeof i == "string" ? i : this.text.substring(u, i), a = s ? this.createParsingComponents(s) : null, o = t ? this.createParsingComponents(t) : null;
      return new d.ParsingResult(this.reference, u, r, a, o);
    }
    debug(u) {
      this.option.debug && (this.option.debug instanceof Function ? this.option.debug(u) : this.option.debug.debug(u));
    }
  }
  return Ae.ParsingContext = f, Ae;
}
var Ba;
function Qu() {
  return Ba || (Ba = 1, function(e) {
    var d = Br && Br.__importDefault || function(s) {
      return s && s.__esModule ? s : { default: s };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseDate = e.parse = e.GB = e.strict = e.casual = e.configuration = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return _.Chrono;
    } });
    const n = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return n.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return n.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return n.ReferenceWithTimezone;
    } });
    const f = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return f.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return f.Weekday;
    } });
    const m = d(/* @__PURE__ */ au());
    e.configuration = new m.default(), e.casual = new _.Chrono(e.configuration.createCasualConfiguration(!1)), e.strict = new _.Chrono(e.configuration.createConfiguration(!0, !1)), e.GB = new _.Chrono(e.configuration.createCasualConfiguration(!0));
    function u(s, t, r) {
      return e.casual.parse(s, t, r);
    }
    e.parse = u;
    function i(s, t, r) {
      return e.casual.parseDate(s, t, r);
    }
    e.parseDate = i;
  }(Br)), Br;
}
var Gr = {}, vt = {}, La;
function eo() {
  if (La) return vt;
  La = 1, Object.defineProperty(vt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ve();
  let d = class extends e.AbstractTimeExpressionParser {
    primaryPrefix() {
      return "(?:(?:um|von)\\s*)?";
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|bis)\\s*";
    }
    extractPrimaryTimeComponents(n, f) {
      return f[0].match(/^\s*\d{4}\s*$/) ? null : super.extractPrimaryTimeComponents(n, f);
    }
  };
  return vt.default = d, vt;
}
var It = {}, vn = {}, qa;
function tt() {
  return qa || (qa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTimeUnits = e.TIME_UNITS_PATTERN = e.parseYear = e.YEAR_PATTERN = e.parseNumberPattern = e.NUMBER_PATTERN = e.TIME_UNIT_DICTIONARY = e.INTEGER_WORD_DICTIONARY = e.MONTH_DICTIONARY = e.WEEKDAY_DICTIONARY = void 0;
    const d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ G();
    e.WEEKDAY_DICTIONARY = {
      sonntag: 0,
      so: 0,
      montag: 1,
      mo: 1,
      dienstag: 2,
      di: 2,
      mittwoch: 3,
      mi: 3,
      donnerstag: 4,
      do: 4,
      freitag: 5,
      fr: 5,
      samstag: 6,
      sa: 6
    }, e.MONTH_DICTIONARY = {
      januar: 1,
      jänner: 1,
      janner: 1,
      jan: 1,
      "jan.": 1,
      februar: 2,
      feber: 2,
      feb: 2,
      "feb.": 2,
      märz: 3,
      maerz: 3,
      mär: 3,
      "mär.": 3,
      mrz: 3,
      "mrz.": 3,
      april: 4,
      apr: 4,
      "apr.": 4,
      mai: 5,
      juni: 6,
      jun: 6,
      "jun.": 6,
      juli: 7,
      jul: 7,
      "jul.": 7,
      august: 8,
      aug: 8,
      "aug.": 8,
      september: 9,
      sep: 9,
      "sep.": 9,
      sept: 9,
      "sept.": 9,
      oktober: 10,
      okt: 10,
      "okt.": 10,
      november: 11,
      nov: 11,
      "nov.": 11,
      dezember: 12,
      dez: 12,
      "dez.": 12
    }, e.INTEGER_WORD_DICTIONARY = {
      eins: 1,
      eine: 1,
      einem: 1,
      einen: 1,
      einer: 1,
      zwei: 2,
      drei: 3,
      vier: 4,
      fünf: 5,
      fuenf: 5,
      sechs: 6,
      sieben: 7,
      acht: 8,
      neun: 9,
      zehn: 10,
      elf: 11,
      zwölf: 12,
      zwoelf: 12
    }, e.TIME_UNIT_DICTIONARY = {
      sek: "second",
      sekunde: "second",
      sekunden: "second",
      min: "minute",
      minute: "minute",
      minuten: "minute",
      h: "hour",
      std: "hour",
      stunde: "hour",
      stunden: "hour",
      tag: "d",
      tage: "d",
      tagen: "d",
      woche: "week",
      wochen: "week",
      monat: "month",
      monate: "month",
      monaten: "month",
      monats: "month",
      quartal: "quarter",
      quartals: "quarter",
      quartale: "quarter",
      quartalen: "quarter",
      a: "year",
      j: "year",
      jr: "year",
      jahr: "year",
      jahre: "year",
      jahren: "year",
      jahres: "year"
    }, e.NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|halb?|halbe?|einigen?|wenigen?|mehreren?)`;
    function n(t) {
      const r = t.toLowerCase();
      return e.INTEGER_WORD_DICTIONARY[r] !== void 0 ? e.INTEGER_WORD_DICTIONARY[r] : r === "ein" || r === "einer" || r === "einem" || r === "einen" || r === "eine" ? 1 : r.match(/wenigen/) ? 2 : r.match(/halb/) || r.match(/halben/) ? 0.5 : r.match(/einigen/) ? 3 : r.match(/mehreren/) ? 7 : parseFloat(r);
    }
    e.parseNumberPattern = n, e.YEAR_PATTERN = "(?:[0-9]{1,4}(?:\\s*[vn]\\.?\\s*(?:C(?:hr)?|(?:u\\.?|d\\.?(?:\\s*g\\.?)?)?\\s*Z)\\.?|\\s*(?:u\\.?|d\\.?(?:\\s*g\\.)?)\\s*Z\\.?)?)";
    function f(t) {
      if (/v/i.test(t))
        return -parseInt(t.replace(/[^0-9]+/gi, ""));
      if (/n/i.test(t))
        return parseInt(t.replace(/[^0-9]+/gi, ""));
      if (/z/i.test(t))
        return parseInt(t.replace(/[^0-9]+/gi, ""));
      const r = parseInt(t);
      return _.findMostLikelyADYear(r);
    }
    e.parseYear = f;
    const m = `(${e.NUMBER_PATTERN})\\s{0,5}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})\\s{0,5}`, u = new RegExp(m, "i");
    e.TIME_UNITS_PATTERN = d.repeatedTimeunitPattern("", m);
    function i(t) {
      const r = {};
      let a = t, o = u.exec(a);
      for (; o; )
        s(r, o), a = a.substring(o[0].length), o = u.exec(a);
      return r;
    }
    e.parseTimeUnits = i;
    function s(t, r) {
      const a = n(r[1]), o = e.TIME_UNIT_DICTIONARY[r[2].toLowerCase()];
      t[o] = a;
    }
  }(vn)), vn;
}
var Ha;
function ro() {
  if (Ha) return It;
  Ha = 1, Object.defineProperty(It, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ tt(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Ie(), f = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:a[mn]\\s*?)?(?:(diese[mn]|letzte[mn]|n(?:ä|ae)chste[mn])\\s*)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(diese|letzte|n(?:ä|ae)chste)\\s*woche)?(?=\\W|$)`, "i"), m = 1, u = 3, i = 2;
  let s = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(r, a) {
      const o = a[i].toLowerCase(), l = e.WEEKDAY_DICTIONARY[o], c = a[m], g = a[u];
      let P = c || g;
      P = P || "", P = P.toLowerCase();
      let y = null;
      return P.match(/letzte/) ? y = "last" : P.match(/chste/) ? y = "next" : P.match(/diese/) && (y = "this"), n.createParsingComponentsAtWeekday(r.reference, l, y);
    }
  };
  return It.default = s, It;
}
var Wt = {}, Ga;
function to() {
  if (Ga) return Wt;
  Ga = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ B(), d = new RegExp("(^|\\s|T)(?:(?:um|von)\\s*)?(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s)?)?(?:\\s*Uhr)?(?:\\s*(morgens|vormittags|nachmittags|abends|nachts|am\\s+(?:Morgen|Vormittag|Nachmittag|Abend)|in\\s+der\\s+Nacht))?(?=\\W|$)", "i"), _ = new RegExp("^\\s*(\\-|\\–|\\~|\\〜|bis(?:\\s+um)?|\\?)\\s*(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s)?)?(?:\\s*Uhr)?(?:\\s*(morgens|vormittags|nachmittags|abends|nachts|am\\s+(?:Morgen|Vormittag|Nachmittag|Abend)|in\\s+der\\s+Nacht))?(?=\\W|$)", "i"), n = 2, f = 3, m = 4, u = 5;
  let i = class Bn {
    pattern(t) {
      return d;
    }
    extract(t, r) {
      const a = t.createParsingResult(r.index + r[1].length, r[0].substring(r[1].length));
      if (a.text.match(/^\d{4}$/) || (a.start = Bn.extractTimeComponent(a.start.clone(), r), !a.start))
        return r.index += r[0].length, null;
      const o = t.text.substring(r.index + r[0].length), l = _.exec(o);
      return l && (a.end = Bn.extractTimeComponent(a.start.clone(), l), a.end && (a.text += l[0])), a;
    }
    static extractTimeComponent(t, r) {
      let a = 0, o = 0, l = null;
      if (a = parseInt(r[n]), r[f] != null && (o = parseInt(r[f])), o >= 60 || a > 24)
        return null;
      if (a >= 12 && (l = e.Meridiem.PM), r[u] != null) {
        if (a > 12)
          return null;
        const c = r[u].toLowerCase();
        c.match(/morgen|vormittag/) && (l = e.Meridiem.AM, a == 12 && (a = 0)), c.match(/nachmittag|abend/) && (l = e.Meridiem.PM, a != 12 && (a += 12)), c.match(/nacht/) && (a == 12 ? (l = e.Meridiem.AM, a = 0) : a < 6 ? l = e.Meridiem.AM : (l = e.Meridiem.PM, a += 12));
      }
      if (t.assign("hour", a), t.assign("minute", o), l !== null ? t.assign("meridiem", l) : a < 12 ? t.imply("meridiem", e.Meridiem.AM) : t.imply("meridiem", e.Meridiem.PM), r[m] != null) {
        const c = parseInt(r[m]);
        if (c >= 60)
          return null;
        t.assign("second", c);
      }
      return t;
    }
  };
  return Wt.default = i, Wt;
}
var xe = {}, za;
function no() {
  if (za) return xe;
  za = 1;
  var e = xe && xe.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(xe, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(bis(?:\s*(?:am|zum))?|-)\s*$/i;
    }
  };
  return xe.default = _, xe;
}
var Je = {}, Za;
function ao() {
  if (Za) return Je;
  Za = 1;
  var e = Je && Je.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Je, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(T|um|am|,|-)?\\s*$");
    }
  };
  return Je.default = _, Je;
}
var ae = {}, Qe = {}, Ka;
function su() {
  if (Ka) return Qe;
  Ka = 1;
  var e = Qe && Qe.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(Qe, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ B(), n = /* @__PURE__ */ W(), f = /* @__PURE__ */ Q(), m = /* @__PURE__ */ X();
  let u = class iu extends n.AbstractParserWithWordBoundaryChecking {
    innerPattern(s) {
      return /(diesen)?\s*(morgen|vormittag|mittags?|nachmittag|abend|nacht|mitternacht)(?=\W|$)/i;
    }
    innerExtract(s, t) {
      const r = d.default(s.refDate), a = t[2].toLowerCase(), o = s.createParsingComponents();
      return f.implySimilarTime(o, r), iu.extractTimeComponents(o, a);
    }
    static extractTimeComponents(s, t) {
      switch (t) {
        case "morgen":
          s.imply("hour", 6), s.imply("minute", 0), s.imply("second", 0), s.imply("meridiem", _.Meridiem.AM);
          break;
        case "vormittag":
          s.imply("hour", 9), s.imply("minute", 0), s.imply("second", 0), s.imply("meridiem", _.Meridiem.AM);
          break;
        case "mittag":
        case "mittags":
          s.imply("hour", 12), s.imply("minute", 0), s.imply("second", 0), s.imply("meridiem", _.Meridiem.AM);
          break;
        case "nachmittag":
          s.imply("hour", 15), s.imply("minute", 0), s.imply("second", 0), s.imply("meridiem", _.Meridiem.PM);
          break;
        case "abend":
          s.imply("hour", 18), s.imply("minute", 0), s.imply("second", 0), s.imply("meridiem", _.Meridiem.PM);
          break;
        case "nacht":
          s.imply("hour", 22), s.imply("minute", 0), s.imply("second", 0), s.imply("meridiem", _.Meridiem.PM);
          break;
        case "mitternacht":
          s.get("hour") > 1 && (s = m.addImpliedTimeUnits(s, { day: 1 })), s.imply("hour", 0), s.imply("minute", 0), s.imply("second", 0), s.imply("meridiem", _.Meridiem.AM);
          break;
      }
      return s;
    }
  };
  return Qe.default = u, Qe;
}
var Va;
function io() {
  if (Va) return ae;
  Va = 1;
  var e = ae && ae.__createBinding || (Object.create ? function(l, c, g, P) {
    P === void 0 && (P = g), Object.defineProperty(l, P, { enumerable: !0, get: function() {
      return c[g];
    } });
  } : function(l, c, g, P) {
    P === void 0 && (P = g), l[P] = c[g];
  }), d = ae && ae.__setModuleDefault || (Object.create ? function(l, c) {
    Object.defineProperty(l, "default", { enumerable: !0, value: c });
  } : function(l, c) {
    l.default = c;
  }), _ = ae && ae.__importStar || function(l) {
    if (l && l.__esModule) return l;
    var c = {};
    if (l != null) for (var g in l) g !== "default" && Object.prototype.hasOwnProperty.call(l, g) && e(c, l, g);
    return d(c, l), c;
  }, n = ae && ae.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(ae, "__esModule", { value: !0 });
  const f = n(k()), m = /* @__PURE__ */ W(), u = /* @__PURE__ */ Q(), i = n(/* @__PURE__ */ su()), s = _(/* @__PURE__ */ ce()), t = new RegExp("(jetzt|heute|morgen|übermorgen|uebermorgen|gestern|vorgestern|letzte\\s*nacht)(?:\\s*(morgen|vormittag|mittags?|nachmittag|abend|nacht|mitternacht))?(?=\\W|$)", "i"), r = 1, a = 2;
  let o = class extends m.AbstractParserWithWordBoundaryChecking {
    innerPattern(c) {
      return t;
    }
    innerExtract(c, g) {
      let P = f.default(c.refDate);
      const y = (g[r] || "").toLowerCase(), T = (g[a] || "").toLowerCase();
      let h = c.createParsingComponents();
      switch (y) {
        case "jetzt":
          h = s.now(c.reference);
          break;
        case "heute":
          h = s.today(c.reference);
          break;
        case "morgen":
          u.assignTheNextDay(h, P);
          break;
        case "übermorgen":
        case "uebermorgen":
          P = P.add(1, "day"), u.assignTheNextDay(h, P);
          break;
        case "gestern":
          P = P.add(-1, "day"), u.assignSimilarDate(h, P), u.implySimilarTime(h, P);
          break;
        case "vorgestern":
          P = P.add(-2, "day"), u.assignSimilarDate(h, P), u.implySimilarTime(h, P);
          break;
        default:
          y.match(/letzte\s*nacht/) && (P.hour() > 6 && (P = P.add(-1, "day")), u.assignSimilarDate(h, P), h.imply("hour", 0));
          break;
      }
      return T && (h = i.default.extractTimeComponents(h, T)), h;
    }
  };
  return ae.default = o, ae;
}
var Ut = {}, Xa;
function so() {
  if (Xa) return Ut;
  Xa = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ tt(), _ = /* @__PURE__ */ tt(), n = /* @__PURE__ */ F(), f = /* @__PURE__ */ W(), m = new RegExp(`(?:am\\s*?)?(?:den\\s*?)?([0-9]{1,2})\\.(?:\\s*(?:bis(?:\\s*(?:am|zum))?|\\-|\\–|\\s)\\s*([0-9]{1,2})\\.?)?\\s*(${n.matchAnyPattern(d.MONTH_DICTIONARY)})(?:(?:-|/|,?\\s*)(${_.YEAR_PATTERN}(?![^\\s]\\d)))?(?=\\W|$)`, "i"), u = 1, i = 2, s = 3, t = 4;
  let r = class extends f.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return m;
    }
    innerExtract(o, l) {
      const c = o.createParsingResult(l.index, l[0]), g = d.MONTH_DICTIONARY[l[s].toLowerCase()], P = parseInt(l[u]);
      if (P > 31)
        return l.index = l.index + l[u].length, null;
      if (c.start.assign("month", g), c.start.assign("day", P), l[t]) {
        const y = _.parseYear(l[t]);
        c.start.assign("year", y);
      } else {
        const y = e.findYearClosestToRef(o.refDate, P, g);
        c.start.imply("year", y);
      }
      if (l[i]) {
        const y = parseInt(l[i]);
        c.end = c.start.clone(), c.end.assign("day", y);
      }
      return c;
    }
  };
  return Ut.default = r, Ut;
}
var wt = {}, xa;
function uo() {
  if (xa) return wt;
  xa = 1, Object.defineProperty(wt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ tt(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ X(), f = /* @__PURE__ */ F();
  class m extends _.AbstractParserWithWordBoundaryChecking {
    constructor() {
      super();
    }
    innerPattern() {
      return new RegExp(`(?:\\s*((?:nächste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?|vor|in)\\s*)?(${e.NUMBER_PATTERN})?(?:\\s*(nächste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?)?\\s*(${f.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})`, "i");
    }
    innerExtract(i, s) {
      const t = s[2] ? e.parseNumberPattern(s[2]) : 1, r = e.TIME_UNIT_DICTIONARY[s[4].toLowerCase()];
      let a = {};
      a[r] = t;
      let o = s[1] || s[3] || "";
      if (o = o.toLowerCase(), !!o)
        return (/vor/.test(o) || /letzte/.test(o) || /vergangen/.test(o)) && (a = n.reverseTimeUnits(a)), d.ParsingComponents.createRelativeFromReference(i.reference, a);
    }
  }
  return wt.default = m, wt;
}
var St = {}, Ja;
function oo() {
  if (Ja) return St;
  Ja = 1, Object.defineProperty(St, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ tt(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W();
  let n = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return new RegExp(`(?:in|für|während)\\s*(${e.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    }
    innerExtract(m, u) {
      const i = e.parseTimeUnits(u[1]);
      return d.ParsingComponents.createRelativeFromReference(m.reference, i);
    }
  };
  return St.default = n, St;
}
var Qa;
function lo() {
  return Qa || (Qa = 1, function(e) {
    var d = Gr && Gr.__importDefault || function(p) {
      return p && p.__esModule ? p : { default: p };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = /* @__PURE__ */ ye(), n = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return n.Chrono;
    } });
    const f = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return f.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return f.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return f.ReferenceWithTimezone;
    } });
    const m = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return m.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return m.Weekday;
    } });
    const u = d(/* @__PURE__ */ We()), i = d(/* @__PURE__ */ Hn()), s = d(/* @__PURE__ */ eo()), t = d(/* @__PURE__ */ ro()), r = d(/* @__PURE__ */ to()), a = d(/* @__PURE__ */ no()), o = d(/* @__PURE__ */ ao()), l = d(/* @__PURE__ */ io()), c = d(/* @__PURE__ */ su()), g = d(/* @__PURE__ */ so()), P = d(/* @__PURE__ */ uo()), y = d(/* @__PURE__ */ oo());
    e.casual = new n.Chrono(R()), e.strict = new n.Chrono(E(!0));
    function T(p, A, N) {
      return e.casual.parse(p, A, N);
    }
    e.parse = T;
    function h(p, A, N) {
      return e.casual.parseDate(p, A, N);
    }
    e.parseDate = h;
    function R(p = !0) {
      const A = E(!1, p);
      return A.parsers.unshift(new c.default()), A.parsers.unshift(new l.default()), A.parsers.unshift(new P.default()), A;
    }
    e.createCasualConfiguration = R;
    function E(p = !0, A = !0) {
      return _.includeCommonConfiguration({
        parsers: [
          new i.default(),
          new u.default(A),
          new s.default(),
          new r.default(),
          new g.default(),
          new t.default(),
          new y.default()
        ],
        refiners: [new a.default(), new o.default()]
      }, p);
    }
    e.createConfiguration = E;
  }(Gr)), Gr;
}
var zr = {}, ie = {}, ei;
function fo() {
  if (ei) return ie;
  ei = 1;
  var e = ie && ie.__createBinding || (Object.create ? function(r, a, o, l) {
    l === void 0 && (l = o), Object.defineProperty(r, l, { enumerable: !0, get: function() {
      return a[o];
    } });
  } : function(r, a, o, l) {
    l === void 0 && (l = o), r[l] = a[o];
  }), d = ie && ie.__setModuleDefault || (Object.create ? function(r, a) {
    Object.defineProperty(r, "default", { enumerable: !0, value: a });
  } : function(r, a) {
    r.default = a;
  }), _ = ie && ie.__importStar || function(r) {
    if (r && r.__esModule) return r;
    var a = {};
    if (r != null) for (var o in r) o !== "default" && Object.prototype.hasOwnProperty.call(r, o) && e(a, r, o);
    return d(a, r), a;
  }, n = ie && ie.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(ie, "__esModule", { value: !0 });
  const f = n(k()), m = /* @__PURE__ */ B(), u = /* @__PURE__ */ W(), i = /* @__PURE__ */ Q(), s = _(/* @__PURE__ */ ce());
  let t = class extends u.AbstractParserWithWordBoundaryChecking {
    innerPattern(a) {
      return /(maintenant|aujourd'hui|demain|hier|cette\s*nuit|la\s*veille)(?=\W|$)/i;
    }
    innerExtract(a, o) {
      let l = f.default(a.refDate);
      const c = o[0].toLowerCase(), g = a.createParsingComponents();
      switch (c) {
        case "maintenant":
          return s.now(a.reference);
        case "aujourd'hui":
          return s.today(a.reference);
        case "hier":
          return s.yesterday(a.reference);
        case "demain":
          return s.tomorrow(a.reference);
        default:
          c.match(/cette\s*nuit/) ? (i.assignSimilarDate(g, l), g.imply("hour", 22), g.imply("meridiem", m.Meridiem.PM)) : c.match(/la\s*veille/) && (l = l.add(-1, "day"), i.assignSimilarDate(g, l), g.imply("hour", 0));
      }
      return g;
    }
  };
  return ie.default = t, ie;
}
var jt = {}, ri;
function co() {
  if (ri) return jt;
  ri = 1, Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ B(), d = /* @__PURE__ */ W();
  let _ = class extends d.AbstractParserWithWordBoundaryChecking {
    innerPattern(f) {
      return /(cet?)?\s*(matin|soir|après-midi|aprem|a midi|à minuit)(?=\W|$)/i;
    }
    innerExtract(f, m) {
      const u = m[2].toLowerCase(), i = f.createParsingComponents();
      switch (u) {
        case "après-midi":
        case "aprem":
          i.imply("hour", 14), i.imply("minute", 0), i.imply("meridiem", e.Meridiem.PM);
          break;
        case "soir":
          i.imply("hour", 18), i.imply("minute", 0), i.imply("meridiem", e.Meridiem.PM);
          break;
        case "matin":
          i.imply("hour", 8), i.imply("minute", 0), i.imply("meridiem", e.Meridiem.AM);
          break;
        case "a midi":
          i.imply("hour", 12), i.imply("minute", 0), i.imply("meridiem", e.Meridiem.AM);
          break;
        case "à minuit":
          i.imply("hour", 0), i.imply("meridiem", e.Meridiem.AM);
          break;
      }
      return i;
    }
  };
  return jt.default = _, jt;
}
var $t = {}, ti;
function mo() {
  if (ti) return $t;
  ti = 1, Object.defineProperty($t, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ve();
  let d = class extends e.AbstractTimeExpressionParser {
    primaryPrefix() {
      return "(?:(?:[àa])\\s*)?";
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*";
    }
    extractPrimaryTimeComponents(n, f) {
      return f[0].match(/^\s*\d{4}\s*$/) ? null : super.extractPrimaryTimeComponents(n, f);
    }
  };
  return $t.default = d, $t;
}
var er = {}, ni;
function _o() {
  if (ni) return er;
  ni = 1;
  var e = er && er.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(er, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(T|à|a|au|vers|de|,|-)?\\s*$");
    }
  };
  return er.default = _, er;
}
var rr = {}, ai;
function Po() {
  if (ai) return rr;
  ai = 1;
  var e = rr && rr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(rr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(à|a|au|-)\s*$/i;
    }
  };
  return rr.default = _, rr;
}
var Ft = {}, In = {}, ii;
function He() {
  return ii || (ii = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTimeUnits = e.TIME_UNITS_PATTERN = e.parseYear = e.YEAR_PATTERN = e.parseOrdinalNumberPattern = e.ORDINAL_NUMBER_PATTERN = e.parseNumberPattern = e.NUMBER_PATTERN = e.TIME_UNIT_DICTIONARY = e.INTEGER_WORD_DICTIONARY = e.MONTH_DICTIONARY = e.WEEKDAY_DICTIONARY = void 0;
    const d = /* @__PURE__ */ F();
    e.WEEKDAY_DICTIONARY = {
      dimanche: 0,
      dim: 0,
      lundi: 1,
      lun: 1,
      mardi: 2,
      mar: 2,
      mercredi: 3,
      mer: 3,
      jeudi: 4,
      jeu: 4,
      vendredi: 5,
      ven: 5,
      samedi: 6,
      sam: 6
    }, e.MONTH_DICTIONARY = {
      janvier: 1,
      jan: 1,
      "jan.": 1,
      février: 2,
      fév: 2,
      "fév.": 2,
      fevrier: 2,
      fev: 2,
      "fev.": 2,
      mars: 3,
      mar: 3,
      "mar.": 3,
      avril: 4,
      avr: 4,
      "avr.": 4,
      mai: 5,
      juin: 6,
      jun: 6,
      juillet: 7,
      juil: 7,
      jul: 7,
      "jul.": 7,
      août: 8,
      aout: 8,
      septembre: 9,
      sep: 9,
      "sep.": 9,
      sept: 9,
      "sept.": 9,
      octobre: 10,
      oct: 10,
      "oct.": 10,
      novembre: 11,
      nov: 11,
      "nov.": 11,
      décembre: 12,
      decembre: 12,
      dec: 12,
      "dec.": 12
    }, e.INTEGER_WORD_DICTIONARY = {
      un: 1,
      deux: 2,
      trois: 3,
      quatre: 4,
      cinq: 5,
      six: 6,
      sept: 7,
      huit: 8,
      neuf: 9,
      dix: 10,
      onze: 11,
      douze: 12,
      treize: 13
    }, e.TIME_UNIT_DICTIONARY = {
      sec: "second",
      seconde: "second",
      secondes: "second",
      min: "minute",
      mins: "minute",
      minute: "minute",
      minutes: "minute",
      h: "hour",
      hr: "hour",
      hrs: "hour",
      heure: "hour",
      heures: "hour",
      jour: "d",
      jours: "d",
      semaine: "week",
      semaines: "week",
      mois: "month",
      trimestre: "quarter",
      trimestres: "quarter",
      ans: "year",
      année: "year",
      années: "year"
    }, e.NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|une?\\b|quelques?|demi-?)`;
    function _(t) {
      const r = t.toLowerCase();
      return e.INTEGER_WORD_DICTIONARY[r] !== void 0 ? e.INTEGER_WORD_DICTIONARY[r] : r === "une" || r === "un" ? 1 : r.match(/quelques?/) ? 3 : r.match(/demi-?/) ? 0.5 : parseFloat(r);
    }
    e.parseNumberPattern = _, e.ORDINAL_NUMBER_PATTERN = "(?:[0-9]{1,2}(?:er)?)";
    function n(t) {
      let r = t.toLowerCase();
      return r = r.replace(/(?:er)$/i, ""), parseInt(r);
    }
    e.parseOrdinalNumberPattern = n, e.YEAR_PATTERN = "(?:[1-9][0-9]{0,3}\\s*(?:AC|AD|p\\.\\s*C(?:hr?)?\\.\\s*n\\.)|[1-2][0-9]{3}|[5-9][0-9])";
    function f(t) {
      if (/AC/i.test(t))
        return t = t.replace(/BC/i, ""), -parseInt(t);
      if (/AD/i.test(t) || /C/i.test(t))
        return t = t.replace(/[^\d]+/i, ""), parseInt(t);
      let r = parseInt(t);
      return r < 100 && (r > 50 ? r = r + 1900 : r = r + 2e3), r;
    }
    e.parseYear = f;
    const m = `(${e.NUMBER_PATTERN})\\s{0,5}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})\\s{0,5}`, u = new RegExp(m, "i");
    e.TIME_UNITS_PATTERN = d.repeatedTimeunitPattern("", m);
    function i(t) {
      const r = {};
      let a = t, o = u.exec(a);
      for (; o; )
        s(r, o), a = a.substring(o[0].length), o = u.exec(a);
      return r;
    }
    e.parseTimeUnits = i;
    function s(t, r) {
      const a = _(r[1]), o = e.TIME_UNIT_DICTIONARY[r[2].toLowerCase()];
      t[o] = a;
    }
  }(In)), In;
}
var si;
function go() {
  if (si) return Ft;
  si = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ He(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Ie(), f = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:(?:ce)\\s*)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(dernier|prochain)\\s*)?(?=\\W|\\d|$)`, "i"), m = 1, u = 2;
  let i = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(t, r) {
      const a = r[m].toLowerCase(), o = e.WEEKDAY_DICTIONARY[a];
      if (o === void 0)
        return null;
      let l = r[u];
      l = l || "", l = l.toLowerCase();
      let c = null;
      return l == "dernier" ? c = "last" : l == "prochain" && (c = "next"), n.createParsingComponentsAtWeekday(t.reference, o, c);
    }
  };
  return Ft.default = i, Ft;
}
var Yt = {}, ui;
function yo() {
  if (ui) return Yt;
  ui = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ B(), d = new RegExp("(^|\\s|T)(?:(?:[àa])\\s*)?(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s|:)?)?(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?(?=\\W|$)", "i"), _ = new RegExp("^\\s*(\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*(\\d{1,2})(?:h|:)?(?:(\\d{1,2})(?:m|:)?)?(?:(\\d{1,2})(?:s|:)?)?(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?(?=\\W|$)", "i"), n = 2, f = 3, m = 4, u = 5;
  let i = class Ln {
    pattern(t) {
      return d;
    }
    extract(t, r) {
      const a = t.createParsingResult(r.index + r[1].length, r[0].substring(r[1].length));
      if (a.text.match(/^\d{4}$/) || (a.start = Ln.extractTimeComponent(a.start.clone(), r), !a.start))
        return r.index += r[0].length, null;
      const o = t.text.substring(r.index + r[0].length), l = _.exec(o);
      return l && (a.end = Ln.extractTimeComponent(a.start.clone(), l), a.end && (a.text += l[0])), a;
    }
    static extractTimeComponent(t, r) {
      let a = 0, o = 0, l = null;
      if (a = parseInt(r[n]), r[f] != null && (o = parseInt(r[f])), o >= 60 || a > 24)
        return null;
      if (a >= 12 && (l = e.Meridiem.PM), r[u] != null) {
        if (a > 12)
          return null;
        const c = r[u][0].toLowerCase();
        c == "a" && (l = e.Meridiem.AM, a == 12 && (a = 0)), c == "p" && (l = e.Meridiem.PM, a != 12 && (a += 12));
      }
      if (t.assign("hour", a), t.assign("minute", o), l !== null ? t.assign("meridiem", l) : a < 12 ? t.imply("meridiem", e.Meridiem.AM) : t.imply("meridiem", e.Meridiem.PM), r[m] != null) {
        const c = parseInt(r[m]);
        if (c >= 60)
          return null;
        t.assign("second", c);
      }
      return t;
    }
  };
  return Yt.default = i, Yt;
}
var kt = {}, oi;
function To() {
  if (oi) return kt;
  oi = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ He(), _ = /* @__PURE__ */ He(), n = /* @__PURE__ */ He(), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ W(), u = new RegExp(`(?:on\\s*?)?(${n.ORDINAL_NUMBER_PATTERN})(?:\\s*(?:au|\\-|\\–|jusqu'au?|\\s)\\s*(${n.ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s*(?:de)?\\s*)(${f.matchAnyPattern(d.MONTH_DICTIONARY)})(?:(?:-|/|,?\\s*)(${_.YEAR_PATTERN}(?![^\\s]\\d)))?(?=\\W|$)`, "i"), i = 1, s = 2, t = 3, r = 4;
  let a = class extends m.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return u;
    }
    innerExtract(l, c) {
      const g = l.createParsingResult(c.index, c[0]), P = d.MONTH_DICTIONARY[c[t].toLowerCase()], y = n.parseOrdinalNumberPattern(c[i]);
      if (y > 31)
        return c.index = c.index + c[i].length, null;
      if (g.start.assign("month", P), g.start.assign("day", y), c[r]) {
        const T = _.parseYear(c[r]);
        g.start.assign("year", T);
      } else {
        const T = e.findYearClosestToRef(l.refDate, y, P);
        g.start.imply("year", T);
      }
      if (c[s]) {
        const T = n.parseOrdinalNumberPattern(c[s]);
        g.end = g.start.clone(), g.end.assign("day", T);
      }
      return g;
    }
  };
  return kt.default = a, kt;
}
var Bt = {}, di;
function Ro() {
  if (di) return Bt;
  di = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ He(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ X();
  let f = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor() {
      super();
    }
    innerPattern() {
      return new RegExp(`il y a\\s*(${e.TIME_UNITS_PATTERN})(?=(?:\\W|$))`, "i");
    }
    innerExtract(u, i) {
      const s = e.parseTimeUnits(i[1]), t = n.reverseTimeUnits(s);
      return d.ParsingComponents.createRelativeFromReference(u.reference, t);
    }
  };
  return Bt.default = f, Bt;
}
var Lt = {}, li;
function ho() {
  if (li) return Lt;
  li = 1, Object.defineProperty(Lt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ He(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W();
  let n = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return new RegExp(`(?:dans|en|pour|pendant|de)\\s*(${e.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    }
    innerExtract(m, u) {
      const i = e.parseTimeUnits(u[1]);
      return d.ParsingComponents.createRelativeFromReference(m.reference, i);
    }
  };
  return Lt.default = n, Lt;
}
var qt = {}, fi;
function Eo() {
  if (fi) return qt;
  fi = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ He(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ X(), f = /* @__PURE__ */ F();
  class m extends _.AbstractParserWithWordBoundaryChecking {
    constructor() {
      super();
    }
    innerPattern() {
      return new RegExp(`(?:les?|la|l'|du|des?)\\s*(${e.NUMBER_PATTERN})?(?:\\s*(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?))?\\s*(${f.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})(?:\\s*(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?))?`, "i");
    }
    innerExtract(i, s) {
      const t = s[1] ? e.parseNumberPattern(s[1]) : 1, r = e.TIME_UNIT_DICTIONARY[s[3].toLowerCase()];
      let a = {};
      a[r] = t;
      let o = s[2] || s[4] || "";
      if (o = o.toLowerCase(), !!o)
        return (/derni[eè]re?s?/.test(o) || /pass[ée]e?s?/.test(o) || /pr[ée]c[ée]dents?/.test(o)) && (a = n.reverseTimeUnits(a)), d.ParsingComponents.createRelativeFromReference(i.reference, a);
    }
  }
  return qt.default = m, qt;
}
var ci;
function po() {
  return ci || (ci = 1, function(e) {
    var d = zr && zr.__importDefault || function(p) {
      return p && p.__esModule ? p : { default: p };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = /* @__PURE__ */ ye(), n = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return n.Chrono;
    } });
    const f = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return f.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return f.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return f.ReferenceWithTimezone;
    } });
    const m = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return m.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return m.Weekday;
    } });
    const u = d(/* @__PURE__ */ fo()), i = d(/* @__PURE__ */ co()), s = d(/* @__PURE__ */ We()), t = d(/* @__PURE__ */ mo()), r = d(/* @__PURE__ */ _o()), a = d(/* @__PURE__ */ Po()), o = d(/* @__PURE__ */ go()), l = d(/* @__PURE__ */ yo()), c = d(/* @__PURE__ */ To()), g = d(/* @__PURE__ */ Ro()), P = d(/* @__PURE__ */ ho()), y = d(/* @__PURE__ */ Eo());
    e.casual = new n.Chrono(R()), e.strict = new n.Chrono(E(!0));
    function T(p, A, N) {
      return e.casual.parse(p, A, N);
    }
    e.parse = T;
    function h(p, A, N) {
      return e.casual.parseDate(p, A, N);
    }
    e.parseDate = h;
    function R(p = !0) {
      const A = E(!1, p);
      return A.parsers.unshift(new u.default()), A.parsers.unshift(new i.default()), A.parsers.unshift(new y.default()), A;
    }
    e.createCasualConfiguration = R;
    function E(p = !0, A = !0) {
      return _.includeCommonConfiguration({
        parsers: [
          new s.default(A),
          new c.default(),
          new t.default(),
          new l.default(),
          new g.default(),
          new P.default(),
          new o.default()
        ],
        refiners: [new r.default(), new a.default()]
      }, p);
    }
    e.createConfiguration = E;
  }(zr)), zr;
}
var Zr = {}, tr = {}, Kr = {}, mi;
function Mo() {
  if (mi) return Kr;
  mi = 1, Object.defineProperty(Kr, "__esModule", { value: !0 }), Kr.toHankaku = void 0;
  function e(_) {
    return String(_).replace(/\u2019/g, "'").replace(/\u201D/g, '"').replace(/\u3000/g, " ").replace(/\uFFE5/g, "¥").replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, d);
  }
  Kr.toHankaku = e;
  function d(_) {
    return String.fromCharCode(_.charCodeAt(0) - 65248);
  }
  return Kr;
}
var _i;
function No() {
  if (_i) return tr;
  _i = 1;
  var e = tr && tr.__importDefault || function(o) {
    return o && o.__esModule ? o : { default: o };
  };
  Object.defineProperty(tr, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ Mo(), _ = /* @__PURE__ */ G(), n = e(k()), f = /(?:(?:([同今本])|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i, m = 1, u = 2, i = 3, s = 4, t = 5, r = 6;
  let a = class {
    pattern() {
      return f;
    }
    extract(l, c) {
      const g = parseInt(d.toHankaku(c[t])), P = parseInt(d.toHankaku(c[r])), y = l.createParsingComponents({
        day: P,
        month: g
      });
      if (c[m] && c[m].match("同|今|本")) {
        const T = n.default(l.refDate);
        y.assign("year", T.year());
      }
      if (c[u]) {
        const T = c[s];
        let h = T == "元" ? 1 : parseInt(d.toHankaku(T));
        c[i] == "令和" ? h += 2018 : c[i] == "平成" ? h += 1988 : c[i] == "昭和" && (h += 1925), y.assign("year", h);
      } else {
        const T = _.findYearClosestToRef(l.refDate, P, g);
        y.imply("year", T);
      }
      return y;
    }
  };
  return tr.default = a, tr;
}
var nr = {}, Pi;
function Do() {
  if (Pi) return nr;
  Pi = 1;
  var e = nr && nr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(nr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(から|ー|-|～|~)\s*$/i;
    }
  };
  return nr.default = _, nr;
}
var se = {}, gi;
function Ao() {
  if (gi) return se;
  gi = 1;
  var e = se && se.__createBinding || (Object.create ? function(r, a, o, l) {
    l === void 0 && (l = o), Object.defineProperty(r, l, { enumerable: !0, get: function() {
      return a[o];
    } });
  } : function(r, a, o, l) {
    l === void 0 && (l = o), r[l] = a[o];
  }), d = se && se.__setModuleDefault || (Object.create ? function(r, a) {
    Object.defineProperty(r, "default", { enumerable: !0, value: a });
  } : function(r, a) {
    r.default = a;
  }), _ = se && se.__importStar || function(r) {
    if (r && r.__esModule) return r;
    var a = {};
    if (r != null) for (var o in r) o !== "default" && Object.prototype.hasOwnProperty.call(r, o) && e(a, r, o);
    return d(a, r), a;
  }, n = se && se.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(se, "__esModule", { value: !0 });
  const f = n(k()), m = /* @__PURE__ */ B(), u = _(/* @__PURE__ */ ce()), i = /今日|きょう|本日|ほんじつ|昨日|きのう|明日|あした|今夜|こんや|今夕|こんゆう|今晩|こんばん|今朝|けさ/i;
  function s(r) {
    switch (r) {
      case "きょう":
        return "今日";
      case "ほんじつ":
        return "本日";
      case "きのう":
        return "昨日";
      case "あした":
        return "明日";
      case "こんや":
        return "今夜";
      case "こんゆう":
        return "今夕";
      case "こんばん":
        return "今晩";
      case "けさ":
        return "今朝";
      default:
        return r;
    }
  }
  let t = class {
    pattern() {
      return i;
    }
    extract(a, o) {
      const l = s(o[0]), c = f.default(a.refDate), g = a.createParsingComponents();
      switch (l) {
        case "昨日":
          return u.yesterday(a.reference);
        case "明日":
          return u.tomorrow(a.reference);
        case "本日":
        case "今日":
          return u.today(a.reference);
      }
      return l == "今夜" || l == "今夕" || l == "今晩" ? (g.imply("hour", 22), g.assign("meridiem", m.Meridiem.PM)) : l.match("今朝") && (g.imply("hour", 6), g.assign("meridiem", m.Meridiem.AM)), g.assign("day", c.date()), g.assign("month", c.month() + 1), g.assign("year", c.year()), g;
    }
  };
  return se.default = t, se;
}
var yi;
function Oo() {
  return yi || (yi = 1, function(e) {
    var d = Zr && Zr.__importDefault || function(o) {
      return o && o.__esModule ? o : { default: o };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = d(/* @__PURE__ */ No()), n = d(/* @__PURE__ */ Do()), f = d(/* @__PURE__ */ Ao()), m = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return m.Chrono;
    } });
    const u = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return u.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return u.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return u.ReferenceWithTimezone;
    } });
    const i = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return i.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return i.Weekday;
    } }), e.casual = new m.Chrono(r()), e.strict = new m.Chrono(a());
    function s(o, l, c) {
      return e.casual.parse(o, l, c);
    }
    e.parse = s;
    function t(o, l, c) {
      return e.casual.parseDate(o, l, c);
    }
    e.parseDate = t;
    function r() {
      const o = a();
      return o.parsers.unshift(new f.default()), o;
    }
    e.createCasualConfiguration = r;
    function a() {
      return {
        parsers: [new _.default()],
        refiners: [new n.default()]
      };
    }
    e.createConfiguration = a;
  }(Zr)), Zr;
}
var Vr = {}, Ht = {}, _e = {}, Ti;
function qn() {
  if (Ti) return _e;
  Ti = 1, Object.defineProperty(_e, "__esModule", { value: !0 }), _e.parseYear = _e.YEAR_PATTERN = _e.MONTH_DICTIONARY = _e.WEEKDAY_DICTIONARY = void 0, _e.WEEKDAY_DICTIONARY = {
    domingo: 0,
    dom: 0,
    segunda: 1,
    "segunda-feira": 1,
    seg: 1,
    terça: 2,
    "terça-feira": 2,
    ter: 2,
    quarta: 3,
    "quarta-feira": 3,
    qua: 3,
    quinta: 4,
    "quinta-feira": 4,
    qui: 4,
    sexta: 5,
    "sexta-feira": 5,
    sex: 5,
    sábado: 6,
    sabado: 6,
    sab: 6
  }, _e.MONTH_DICTIONARY = {
    janeiro: 1,
    jan: 1,
    "jan.": 1,
    fevereiro: 2,
    fev: 2,
    "fev.": 2,
    março: 3,
    mar: 3,
    "mar.": 3,
    abril: 4,
    abr: 4,
    "abr.": 4,
    maio: 5,
    mai: 5,
    "mai.": 5,
    junho: 6,
    jun: 6,
    "jun.": 6,
    julho: 7,
    jul: 7,
    "jul.": 7,
    agosto: 8,
    ago: 8,
    "ago.": 8,
    setembro: 9,
    set: 9,
    "set.": 9,
    outubro: 10,
    out: 10,
    "out.": 10,
    novembro: 11,
    nov: 11,
    "nov.": 11,
    dezembro: 12,
    dez: 12,
    "dez.": 12
  }, _e.YEAR_PATTERN = "[0-9]{1,4}(?![^\\s]\\d)(?:\\s*[a|d]\\.?\\s*c\\.?|\\s*a\\.?\\s*d\\.?)?";
  function e(d) {
    if (d.match(/^[0-9]{1,4}$/)) {
      let _ = parseInt(d);
      return _ < 100 && (_ > 50 ? _ = _ + 1900 : _ = _ + 2e3), _;
    }
    return d.match(/a\.?\s*c\.?/i) ? (d = d.replace(/a\.?\s*c\.?/i, ""), -parseInt(d)) : parseInt(d);
  }
  return _e.parseYear = e, _e;
}
var Ri;
function Co() {
  if (Ri) return Ht;
  Ri = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ qn(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Ie(), f = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:(este|esta|passado|pr[oó]ximo)\\s*)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(este|esta|passado|pr[óo]ximo)\\s*semana)?(?=\\W|\\d|$)`, "i"), m = 1, u = 2, i = 3;
  let s = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(r, a) {
      const o = a[u].toLowerCase(), l = e.WEEKDAY_DICTIONARY[o];
      if (l === void 0)
        return null;
      const c = a[m], g = a[i];
      let P = c || g || "";
      P = P.toLowerCase();
      let y = null;
      return P == "passado" ? y = "this" : P == "próximo" || P == "proximo" ? y = "next" : P == "este" && (y = "this"), n.createParsingComponentsAtWeekday(r.reference, l, y);
    }
  };
  return Ht.default = s, Ht;
}
var Gt = {}, hi;
function bo() {
  if (hi) return Gt;
  hi = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ve();
  let d = class extends e.AbstractTimeExpressionParser {
    primaryPrefix() {
      return "(?:(?:ao?|às?|das|da|de|do)\\s*)?";
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|a(?:o)?|\\?)\\s*";
    }
  };
  return Gt.default = d, Gt;
}
var ar = {}, Ei;
function vo() {
  if (Ei) return ar;
  Ei = 1;
  var e = ar && ar.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(ar, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(?:,|à)?\\s*$");
    }
  };
  return ar.default = _, ar;
}
var ir = {}, pi;
function Io() {
  if (pi) return ir;
  pi = 1;
  var e = ir && ir.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(ir, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(?:-)\s*$/i;
    }
  };
  return ir.default = _, ir;
}
var zt = {}, Mi;
function Wo() {
  if (Mi) return zt;
  Mi = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ qn(), _ = /* @__PURE__ */ qn(), n = /* @__PURE__ */ F(), f = /* @__PURE__ */ W(), m = new RegExp(`([0-9]{1,2})(?:º|ª|°)?(?:\\s*(?:desde|de|\\-|\\–|ao?|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*(?:-|/|\\s*(?:de|,)?\\s*)(${n.matchAnyPattern(d.MONTH_DICTIONARY)})(?:\\s*(?:de|,)?\\s*(${_.YEAR_PATTERN}))?(?=\\W|$)`, "i"), u = 1, i = 2, s = 3, t = 4;
  let r = class extends f.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return m;
    }
    innerExtract(o, l) {
      const c = o.createParsingResult(l.index, l[0]), g = d.MONTH_DICTIONARY[l[s].toLowerCase()], P = parseInt(l[u]);
      if (P > 31)
        return l.index = l.index + l[u].length, null;
      if (c.start.assign("month", g), c.start.assign("day", P), l[t]) {
        const y = _.parseYear(l[t]);
        c.start.assign("year", y);
      } else {
        const y = e.findYearClosestToRef(o.refDate, P, g);
        c.start.imply("year", y);
      }
      if (l[i]) {
        const y = parseInt(l[i]);
        c.end = c.start.clone(), c.end.assign("day", y);
      }
      return c;
    }
  };
  return zt.default = r, zt;
}
var Re = {}, Ni;
function Uo() {
  if (Ni) return Re;
  Ni = 1;
  var e = Re && Re.__createBinding || (Object.create ? function(u, i, s, t) {
    t === void 0 && (t = s), Object.defineProperty(u, t, { enumerable: !0, get: function() {
      return i[s];
    } });
  } : function(u, i, s, t) {
    t === void 0 && (t = s), u[t] = i[s];
  }), d = Re && Re.__setModuleDefault || (Object.create ? function(u, i) {
    Object.defineProperty(u, "default", { enumerable: !0, value: i });
  } : function(u, i) {
    u.default = i;
  }), _ = Re && Re.__importStar || function(u) {
    if (u && u.__esModule) return u;
    var i = {};
    if (u != null) for (var s in u) s !== "default" && Object.prototype.hasOwnProperty.call(u, s) && e(i, u, s);
    return d(i, u), i;
  };
  Object.defineProperty(Re, "__esModule", { value: !0 });
  const n = /* @__PURE__ */ W(), f = _(/* @__PURE__ */ ce());
  let m = class extends n.AbstractParserWithWordBoundaryChecking {
    innerPattern(i) {
      return /(agora|hoje|amanha|amanhã|ontem)(?=\W|$)/i;
    }
    innerExtract(i, s) {
      const t = s[0].toLowerCase(), r = i.createParsingComponents();
      switch (t) {
        case "agora":
          return f.now(i.reference);
        case "hoje":
          return f.today(i.reference);
        case "amanha":
        case "amanhã":
          return f.tomorrow(i.reference);
        case "ontem":
          return f.yesterday(i.reference);
      }
      return r;
    }
  };
  return Re.default = m, Re;
}
var sr = {}, Di;
function wo() {
  if (Di) return sr;
  Di = 1;
  var e = sr && sr.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(sr, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ B(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Q(), f = e(k());
  let m = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return /(?:esta\s*)?(manha|manhã|tarde|meia-noite|meio-dia|noite)(?=\W|$)/i;
    }
    innerExtract(i, s) {
      const t = f.default(i.refDate), r = i.createParsingComponents();
      switch (s[1].toLowerCase()) {
        case "tarde":
          r.imply("meridiem", d.Meridiem.PM), r.imply("hour", 15);
          break;
        case "noite":
          r.imply("meridiem", d.Meridiem.PM), r.imply("hour", 22);
          break;
        case "manha":
        case "manhã":
          r.imply("meridiem", d.Meridiem.AM), r.imply("hour", 6);
          break;
        case "meia-noite":
          n.assignTheNextDay(r, t), r.imply("hour", 0), r.imply("minute", 0), r.imply("second", 0);
          break;
        case "meio-dia":
          r.imply("meridiem", d.Meridiem.AM), r.imply("hour", 12);
          break;
      }
      return r;
    }
  };
  return sr.default = m, sr;
}
var Ai;
function So() {
  return Ai || (Ai = 1, function(e) {
    var d = Vr && Vr.__importDefault || function(T) {
      return T && T.__esModule ? T : { default: T };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = /* @__PURE__ */ ye(), n = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return n.Chrono;
    } });
    const f = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return f.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return f.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return f.ReferenceWithTimezone;
    } });
    const m = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return m.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return m.Weekday;
    } });
    const u = d(/* @__PURE__ */ We()), i = d(/* @__PURE__ */ Co()), s = d(/* @__PURE__ */ bo()), t = d(/* @__PURE__ */ vo()), r = d(/* @__PURE__ */ Io()), a = d(/* @__PURE__ */ Wo()), o = d(/* @__PURE__ */ Uo()), l = d(/* @__PURE__ */ wo());
    e.casual = new n.Chrono(P()), e.strict = new n.Chrono(y(!0));
    function c(T, h, R) {
      return e.casual.parse(T, h, R);
    }
    e.parse = c;
    function g(T, h, R) {
      return e.casual.parseDate(T, h, R);
    }
    e.parseDate = g;
    function P(T = !0) {
      const h = y(!1, T);
      return h.parsers.push(new o.default()), h.parsers.push(new l.default()), h;
    }
    e.createCasualConfiguration = P;
    function y(T = !0, h = !0) {
      return _.includeCommonConfiguration({
        parsers: [
          new u.default(h),
          new i.default(),
          new s.default(),
          new a.default()
        ],
        refiners: [new t.default(), new r.default()]
      }, T);
    }
    e.createConfiguration = y;
  }(Vr)), Vr;
}
var Xr = {}, ur = {}, Oi;
function jo() {
  if (Oi) return ur;
  Oi = 1;
  var e = ur && ur.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(ur, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(tot|-)\s*$/i;
    }
  };
  return ur.default = _, ur;
}
var or = {}, Ci;
function $o() {
  if (Ci) return or;
  Ci = 1;
  var e = or && or.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(or, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(om|na|voor|in de|,|-)?\\s*$");
    }
  };
  return or.default = _, or;
}
var he = {}, bi;
function Fo() {
  if (bi) return he;
  bi = 1;
  var e = he && he.__createBinding || (Object.create ? function(u, i, s, t) {
    t === void 0 && (t = s), Object.defineProperty(u, t, { enumerable: !0, get: function() {
      return i[s];
    } });
  } : function(u, i, s, t) {
    t === void 0 && (t = s), u[t] = i[s];
  }), d = he && he.__setModuleDefault || (Object.create ? function(u, i) {
    Object.defineProperty(u, "default", { enumerable: !0, value: i });
  } : function(u, i) {
    u.default = i;
  }), _ = he && he.__importStar || function(u) {
    if (u && u.__esModule) return u;
    var i = {};
    if (u != null) for (var s in u) s !== "default" && Object.prototype.hasOwnProperty.call(u, s) && e(i, u, s);
    return d(i, u), i;
  };
  Object.defineProperty(he, "__esModule", { value: !0 });
  const n = /* @__PURE__ */ W(), f = _(/* @__PURE__ */ ce());
  let m = class extends n.AbstractParserWithWordBoundaryChecking {
    innerPattern(i) {
      return /(nu|vandaag|morgen|morgend|gisteren)(?=\W|$)/i;
    }
    innerExtract(i, s) {
      const t = s[0].toLowerCase(), r = i.createParsingComponents();
      switch (t) {
        case "nu":
          return f.now(i.reference);
        case "vandaag":
          return f.today(i.reference);
        case "morgen":
        case "morgend":
          return f.tomorrow(i.reference);
        case "gisteren":
          return f.yesterday(i.reference);
      }
      return r;
    }
  };
  return he.default = m, he;
}
var dr = {}, vi;
function Yo() {
  if (vi) return dr;
  vi = 1;
  var e = dr && dr.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(dr, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ B(), _ = /* @__PURE__ */ W(), n = e(k()), f = /* @__PURE__ */ Q(), m = 1, u = 2;
  let i = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return /(deze)?\s*(namiddag|avond|middernacht|ochtend|middag|'s middags|'s avonds|'s ochtends)(?=\W|$)/i;
    }
    innerExtract(t, r) {
      const a = n.default(t.refDate), o = t.createParsingComponents();
      switch (r[m] === "deze" && (o.assign("day", t.refDate.getDate()), o.assign("month", t.refDate.getMonth() + 1), o.assign("year", t.refDate.getFullYear())), r[u].toLowerCase()) {
        case "namiddag":
        case "'s namiddags":
          o.imply("meridiem", d.Meridiem.PM), o.imply("hour", 15);
          break;
        case "avond":
        case "'s avonds'":
          o.imply("meridiem", d.Meridiem.PM), o.imply("hour", 20);
          break;
        case "middernacht":
          f.assignTheNextDay(o, a), o.imply("hour", 0), o.imply("minute", 0), o.imply("second", 0);
          break;
        case "ochtend":
        case "'s ochtends":
          o.imply("meridiem", d.Meridiem.AM), o.imply("hour", 6);
          break;
        case "middag":
        case "'s middags":
          o.imply("meridiem", d.Meridiem.AM), o.imply("hour", 12);
          break;
      }
      return o;
    }
  };
  return dr.default = i, dr;
}
var Zt = {}, Wn = {}, Ii;
function de() {
  return Ii || (Ii = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTimeUnits = e.TIME_UNITS_PATTERN = e.parseYear = e.YEAR_PATTERN = e.parseOrdinalNumberPattern = e.ORDINAL_NUMBER_PATTERN = e.parseNumberPattern = e.NUMBER_PATTERN = e.TIME_UNIT_DICTIONARY = e.ORDINAL_WORD_DICTIONARY = e.INTEGER_WORD_DICTIONARY = e.MONTH_DICTIONARY = e.WEEKDAY_DICTIONARY = void 0;
    const d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ G();
    e.WEEKDAY_DICTIONARY = {
      zondag: 0,
      zon: 0,
      "zon.": 0,
      zo: 0,
      "zo.": 0,
      maandag: 1,
      ma: 1,
      "ma.": 1,
      dinsdag: 2,
      din: 2,
      "din.": 2,
      di: 2,
      "di.": 2,
      woensdag: 3,
      woe: 3,
      "woe.": 3,
      wo: 3,
      "wo.": 3,
      donderdag: 4,
      dond: 4,
      "dond.": 4,
      do: 4,
      "do.": 4,
      vrijdag: 5,
      vrij: 5,
      "vrij.": 5,
      vr: 5,
      "vr.": 5,
      zaterdag: 6,
      zat: 6,
      "zat.": 6,
      za: 6,
      "za.": 6
    }, e.MONTH_DICTIONARY = {
      januari: 1,
      jan: 1,
      "jan.": 1,
      februari: 2,
      feb: 2,
      "feb.": 2,
      maart: 3,
      mar: 3,
      "mar.": 3,
      mrt: 3,
      "mrt.": 3,
      april: 4,
      apr: 4,
      "apr.": 4,
      mei: 5,
      juni: 6,
      jun: 6,
      "jun.": 6,
      juli: 7,
      jul: 7,
      "jul.": 7,
      augustus: 8,
      aug: 8,
      "aug.": 8,
      september: 9,
      sep: 9,
      "sep.": 9,
      sept: 9,
      "sept.": 9,
      oktober: 10,
      okt: 10,
      "okt.": 10,
      november: 11,
      nov: 11,
      "nov.": 11,
      december: 12,
      dec: 12,
      "dec.": 12
    }, e.INTEGER_WORD_DICTIONARY = {
      een: 1,
      twee: 2,
      drie: 3,
      vier: 4,
      vijf: 5,
      zes: 6,
      zeven: 7,
      acht: 8,
      negen: 9,
      tien: 10,
      elf: 11,
      twaalf: 12
    }, e.ORDINAL_WORD_DICTIONARY = {
      eerste: 1,
      tweede: 2,
      derde: 3,
      vierde: 4,
      vijfde: 5,
      zesde: 6,
      zevende: 7,
      achtste: 8,
      negende: 9,
      tiende: 10,
      elfde: 11,
      twaalfde: 12,
      dertiende: 13,
      veertiende: 14,
      vijftiende: 15,
      zestiende: 16,
      zeventiende: 17,
      achttiende: 18,
      negentiende: 19,
      twintigste: 20,
      eenentwintigste: 21,
      tweeëntwintigste: 22,
      drieentwintigste: 23,
      vierentwintigste: 24,
      vijfentwintigste: 25,
      zesentwintigste: 26,
      zevenentwintigste: 27,
      achtentwintig: 28,
      negenentwintig: 29,
      dertigste: 30,
      eenendertigste: 31
    }, e.TIME_UNIT_DICTIONARY = {
      sec: "second",
      second: "second",
      seconden: "second",
      min: "minute",
      mins: "minute",
      minute: "minute",
      minuut: "minute",
      minuten: "minute",
      minuutje: "minute",
      h: "hour",
      hr: "hour",
      hrs: "hour",
      uur: "hour",
      u: "hour",
      uren: "hour",
      dag: "d",
      dagen: "d",
      week: "week",
      weken: "week",
      maand: "month",
      maanden: "month",
      jaar: "year",
      jr: "year",
      jaren: "year"
    }, e.NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+[\\.,][0-9]+|halve?|half|paar)`;
    function n(r) {
      const a = r.toLowerCase();
      return e.INTEGER_WORD_DICTIONARY[a] !== void 0 ? e.INTEGER_WORD_DICTIONARY[a] : a === "paar" ? 2 : a === "half" || a.match(/halve?/) ? 0.5 : parseFloat(a.replace(",", "."));
    }
    e.parseNumberPattern = n, e.ORDINAL_NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:ste|de)?)`;
    function f(r) {
      let a = r.toLowerCase();
      return e.ORDINAL_WORD_DICTIONARY[a] !== void 0 ? e.ORDINAL_WORD_DICTIONARY[a] : (a = a.replace(/(?:ste|de)$/i, ""), parseInt(a));
    }
    e.parseOrdinalNumberPattern = f, e.YEAR_PATTERN = "(?:[1-9][0-9]{0,3}\\s*(?:voor Christus|na Christus)|[1-2][0-9]{3}|[5-9][0-9])";
    function m(r) {
      if (/voor Christus/i.test(r))
        return r = r.replace(/voor Christus/i, ""), -parseInt(r);
      if (/na Christus/i.test(r))
        return r = r.replace(/na Christus/i, ""), parseInt(r);
      const a = parseInt(r);
      return _.findMostLikelyADYear(a);
    }
    e.parseYear = m;
    const u = `(${e.NUMBER_PATTERN})\\s{0,5}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})\\s{0,5}`, i = new RegExp(u, "i");
    e.TIME_UNITS_PATTERN = d.repeatedTimeunitPattern("(?:(?:binnen|in)\\s*)?", u);
    function s(r) {
      const a = {};
      let o = r, l = i.exec(o);
      for (; l; )
        t(a, l), o = o.substring(l[0].length), l = i.exec(o);
      return a;
    }
    e.parseTimeUnits = s;
    function t(r, a) {
      const o = n(a[1]), l = e.TIME_UNIT_DICTIONARY[a[2].toLowerCase()];
      r[l] = o;
    }
  }(Wn)), Wn;
}
var Wi;
function ko() {
  if (Wi) return Zt;
  Wi = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ de(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W();
  let n = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return new RegExp("(?:binnen|in|binnen de|voor)\\s*(" + e.TIME_UNITS_PATTERN + ")(?=\\W|$)", "i");
    }
    innerExtract(m, u) {
      const i = e.parseTimeUnits(u[1]);
      return d.ParsingComponents.createRelativeFromReference(m.reference, i);
    }
  };
  return Zt.default = n, Zt;
}
var Kt = {}, Ui;
function Bo() {
  if (Ui) return Kt;
  Ui = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ de(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Ie(), f = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:op\\s*?)?(?:(deze|vorige|volgende)\\s*(?:week\\s*)?)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)})(?=\\W|$)`, "i"), m = 1, u = 2, i = 3;
  let s = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(r, a) {
      const o = a[u].toLowerCase(), l = e.WEEKDAY_DICTIONARY[o], c = a[m], g = a[i];
      let P = c || g;
      P = P || "", P = P.toLowerCase();
      let y = null;
      return P == "vorige" ? y = "last" : P == "volgende" ? y = "next" : P == "deze" && (y = "this"), n.createParsingComponentsAtWeekday(r.reference, l, y);
    }
  };
  return Kt.default = s, Kt;
}
var Vt = {}, wi;
function Lo() {
  if (wi) return Vt;
  wi = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ de(), _ = /* @__PURE__ */ de(), n = /* @__PURE__ */ de(), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ W(), u = new RegExp(`(?:on\\s*?)?(${_.ORDINAL_NUMBER_PATTERN})(?:\\s*(?:tot|\\-|\\–|until|through|till|\\s)\\s*(${_.ORDINAL_NUMBER_PATTERN}))?(?:-|/|\\s*(?:of)?\\s*)(` + f.matchAnyPattern(d.MONTH_DICTIONARY) + `)(?:(?:-|/|,?\\s*)(${n.YEAR_PATTERN}(?![^\\s]\\d)))?(?=\\W|$)`, "i"), i = 3, s = 1, t = 2, r = 4;
  let a = class extends m.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return u;
    }
    innerExtract(l, c) {
      const g = d.MONTH_DICTIONARY[c[i].toLowerCase()], P = _.parseOrdinalNumberPattern(c[s]);
      if (P > 31)
        return c.index = c.index + c[s].length, null;
      const y = l.createParsingComponents({
        day: P,
        month: g
      });
      if (c[r]) {
        const R = n.parseYear(c[r]);
        y.assign("year", R);
      } else {
        const R = e.findYearClosestToRef(l.refDate, P, g);
        y.imply("year", R);
      }
      if (!c[t])
        return y;
      const T = _.parseOrdinalNumberPattern(c[t]), h = l.createParsingResult(c.index, c[0]);
      return h.start = y, h.end = y.clone(), h.end.assign("day", T), h;
    }
  };
  return Vt.default = a, Vt;
}
var Xt = {}, Si;
function qo() {
  if (Si) return Xt;
  Si = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ de(), d = /* @__PURE__ */ G(), _ = /* @__PURE__ */ F(), n = /* @__PURE__ */ de(), f = /* @__PURE__ */ W(), m = new RegExp(`(${_.matchAnyPattern(e.MONTH_DICTIONARY)})\\s*(?:[,-]?\\s*(${n.YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`, "i"), u = 1, i = 2;
  let s = class extends f.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return m;
    }
    innerExtract(r, a) {
      const o = r.createParsingComponents();
      o.imply("day", 1);
      const l = a[u], c = e.MONTH_DICTIONARY[l.toLowerCase()];
      if (o.assign("month", c), a[i]) {
        const g = n.parseYear(a[i]);
        o.assign("year", g);
      } else {
        const g = d.findYearClosestToRef(r.refDate, 1, c);
        o.imply("year", g);
      }
      return o;
    }
  };
  return Xt.default = s, Xt;
}
var xt = {}, ji;
function Ho() {
  if (ji) return xt;
  ji = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ W(), d = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})", "i"), _ = 1, n = 2;
  let f = class extends e.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return d;
    }
    innerExtract(u, i) {
      const s = parseInt(i[n]), t = parseInt(i[_]);
      return u.createParsingComponents().imply("day", 1).assign("month", t).assign("year", s);
    }
  };
  return xt.default = f, xt;
}
var Jt = {}, $i;
function Go() {
  if ($i) return Jt;
  $i = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ve();
  let d = class extends e.AbstractTimeExpressionParser {
    primaryPrefix() {
      return "(?:(?:om)\\s*)?";
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|om|\\?)\\s*";
    }
    primarySuffix() {
      return "(?:\\s*(?:uur))?(?!/)(?=\\W|$)";
    }
    extractPrimaryTimeComponents(n, f) {
      return f[0].match(/^\s*\d{4}\s*$/) ? null : super.extractPrimaryTimeComponents(n, f);
    }
  };
  return Jt.default = d, Jt;
}
var Qt = {}, Fi;
function zo() {
  if (Fi) return Qt;
  Fi = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ de(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = new RegExp(`([0-9]{4})[\\.\\/\\s](?:(${d.matchAnyPattern(e.MONTH_DICTIONARY)})|([0-9]{1,2}))[\\.\\/\\s]([0-9]{1,2})(?=\\W|$)`, "i"), f = 1, m = 2, u = 3, i = 4;
  let s = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return n;
    }
    innerExtract(r, a) {
      const o = a[u] ? parseInt(a[u]) : e.MONTH_DICTIONARY[a[m].toLowerCase()];
      if (o < 1 || o > 12)
        return null;
      const l = parseInt(a[f]);
      return {
        day: parseInt(a[i]),
        month: o,
        year: l
      };
    }
  };
  return Qt.default = s, Qt;
}
var lr = {}, Yi;
function Zo() {
  if (Yi) return lr;
  Yi = 1;
  var e = lr && lr.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(lr, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ W(), _ = /* @__PURE__ */ B(), n = /* @__PURE__ */ Q(), f = e(k()), m = 1, u = 2;
  let i = class extends d.AbstractParserWithWordBoundaryChecking {
    innerPattern(t) {
      return /(gisteren|morgen|van)(ochtend|middag|namiddag|avond|nacht)(?=\W|$)/i;
    }
    innerExtract(t, r) {
      const a = r[m].toLowerCase(), o = r[u].toLowerCase(), l = t.createParsingComponents(), c = f.default(t.refDate);
      switch (a) {
        case "gisteren":
          n.assignSimilarDate(l, c.add(-1, "day"));
          break;
        case "van":
          n.assignSimilarDate(l, c);
          break;
        case "morgen":
          n.assignTheNextDay(l, c);
          break;
      }
      switch (o) {
        case "ochtend":
          l.imply("meridiem", _.Meridiem.AM), l.imply("hour", 6);
          break;
        case "middag":
          l.imply("meridiem", _.Meridiem.AM), l.imply("hour", 12);
          break;
        case "namiddag":
          l.imply("meridiem", _.Meridiem.PM), l.imply("hour", 15);
          break;
        case "avond":
          l.imply("meridiem", _.Meridiem.PM), l.imply("hour", 20);
          break;
      }
      return l;
    }
  };
  return lr.default = i, lr;
}
var en = {}, ki;
function Ko() {
  if (ki) return en;
  ki = 1, Object.defineProperty(en, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ de(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ X(), f = new RegExp(`(dit|deze|vorig|afgelopen|(?:aan)?komend|over|\\+|-)e?\\s*(${e.TIME_UNITS_PATTERN})(?=\\W|$)`, "i"), m = 1, u = 2;
  let i = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(t, r) {
      const a = r[m].toLowerCase();
      let o = e.parseTimeUnits(r[u]);
      switch (a) {
        case "vorig":
        case "afgelopen":
        case "-":
          o = n.reverseTimeUnits(o);
          break;
      }
      return d.ParsingComponents.createRelativeFromReference(t.reference, o);
    }
  };
  return en.default = i, en;
}
var fr = {}, Bi;
function Vo() {
  if (Bi) return fr;
  Bi = 1;
  var e = fr && fr.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(fr, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ de(), _ = /* @__PURE__ */ $(), n = e(k()), f = /* @__PURE__ */ W(), m = /* @__PURE__ */ F(), u = new RegExp(`(dit|deze|(?:aan)?komend|volgend|afgelopen|vorig)e?\\s*(${m.matchAnyPattern(d.TIME_UNIT_DICTIONARY)})(?=\\s*)(?=\\W|$)`, "i"), i = 1, s = 2;
  let t = class extends f.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return u;
    }
    innerExtract(a, o) {
      const l = o[i].toLowerCase(), c = o[s].toLowerCase(), g = d.TIME_UNIT_DICTIONARY[c];
      if (l == "volgend" || l == "komend" || l == "aankomend") {
        const T = {};
        return T[g] = 1, _.ParsingComponents.createRelativeFromReference(a.reference, T);
      }
      if (l == "afgelopen" || l == "vorig") {
        const T = {};
        return T[g] = -1, _.ParsingComponents.createRelativeFromReference(a.reference, T);
      }
      const P = a.createParsingComponents();
      let y = n.default(a.reference.instant);
      return c.match(/week/i) ? (y = y.add(-y.get("d"), "d"), P.imply("day", y.date()), P.imply("month", y.month() + 1), P.imply("year", y.year())) : c.match(/maand/i) ? (y = y.add(-y.date() + 1, "d"), P.imply("day", y.date()), P.assign("year", y.year()), P.assign("month", y.month() + 1)) : c.match(/jaar/i) && (y = y.add(-y.date() + 1, "d"), y = y.add(-y.month(), "month"), P.imply("day", y.date()), P.imply("month", y.month() + 1), P.assign("year", y.year())), P;
    }
  };
  return fr.default = t, fr;
}
var rn = {}, Li;
function Xo() {
  if (Li) return rn;
  Li = 1, Object.defineProperty(rn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ de(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ X(), f = new RegExp("(" + e.TIME_UNITS_PATTERN + ")(?:geleden|voor|eerder)(?=(?:\\W|$))", "i"), m = new RegExp("(" + e.TIME_UNITS_PATTERN + ")geleden(?=(?:\\W|$))", "i");
  let u = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor(s) {
      super(), this.strictMode = s;
    }
    innerPattern() {
      return this.strictMode ? m : f;
    }
    innerExtract(s, t) {
      const r = e.parseTimeUnits(t[1]), a = n.reverseTimeUnits(r);
      return d.ParsingComponents.createRelativeFromReference(s.reference, a);
    }
  };
  return rn.default = u, rn;
}
var tn = {}, qi;
function xo() {
  if (qi) return tn;
  qi = 1, Object.defineProperty(tn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ de(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = new RegExp("(" + e.TIME_UNITS_PATTERN + ")(later|na|vanaf nu|voortaan|vooruit|uit)(?=(?:\\W|$))", "i"), f = new RegExp("(" + e.TIME_UNITS_PATTERN + ")(later|vanaf nu)(?=(?:\\W|$))", "i"), m = 1;
  let u = class extends _.AbstractParserWithWordBoundaryChecking {
    constructor(s) {
      super(), this.strictMode = s;
    }
    innerPattern() {
      return this.strictMode ? f : n;
    }
    innerExtract(s, t) {
      const r = e.parseTimeUnits(t[m]);
      return d.ParsingComponents.createRelativeFromReference(s.reference, r);
    }
  };
  return tn.default = u, tn;
}
var Hi;
function Jo() {
  return Hi || (Hi = 1, function(e) {
    var d = Xr && Xr.__importDefault || function(M) {
      return M && M.__esModule ? M : { default: M };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = /* @__PURE__ */ ye(), n = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return n.Chrono;
    } });
    const f = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return f.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return f.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return f.ReferenceWithTimezone;
    } });
    const m = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return m.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return m.Weekday;
    } });
    const u = d(/* @__PURE__ */ jo()), i = d(/* @__PURE__ */ $o()), s = d(/* @__PURE__ */ Fo()), t = d(/* @__PURE__ */ Yo()), r = d(/* @__PURE__ */ We()), a = d(/* @__PURE__ */ ko()), o = d(/* @__PURE__ */ Bo()), l = d(/* @__PURE__ */ Lo()), c = d(/* @__PURE__ */ qo()), g = d(/* @__PURE__ */ Ho()), P = d(/* @__PURE__ */ Go()), y = d(/* @__PURE__ */ zo()), T = d(/* @__PURE__ */ Zo()), h = d(/* @__PURE__ */ Ko()), R = d(/* @__PURE__ */ Vo()), E = d(/* @__PURE__ */ Xo()), p = d(/* @__PURE__ */ xo());
    e.casual = new n.Chrono(b()), e.strict = new n.Chrono(D(!0));
    function A(M, S, q) {
      return e.casual.parse(M, S, q);
    }
    e.parse = A;
    function N(M, S, q) {
      return e.casual.parseDate(M, S, q);
    }
    e.parseDate = N;
    function b(M = !0) {
      const S = D(!1, M);
      return S.parsers.unshift(new s.default()), S.parsers.unshift(new t.default()), S.parsers.unshift(new T.default()), S.parsers.unshift(new c.default()), S.parsers.unshift(new R.default()), S.parsers.unshift(new h.default()), S;
    }
    e.createCasualConfiguration = b;
    function D(M = !0, S = !0) {
      return _.includeCommonConfiguration({
        parsers: [
          new r.default(S),
          new a.default(),
          new l.default(),
          new c.default(),
          new o.default(),
          new y.default(),
          new g.default(),
          new P.default(M),
          new E.default(M),
          new p.default(M)
        ],
        refiners: [new i.default(), new u.default()]
      }, M);
    }
    e.createConfiguration = D;
  }(Xr)), Xr;
}
var Pe = {}, cr = {}, Un = {}, Gi;
function nt() {
  return Gi || (Gi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.zhStringToYear = e.zhStringToNumber = e.WEEKDAY_OFFSET = e.NUMBER = void 0, e.NUMBER = {
      零: 0,
      "〇": 0,
      一: 1,
      二: 2,
      两: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      十: 10
    }, e.WEEKDAY_OFFSET = {
      天: 0,
      日: 0,
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6
    };
    function d(n) {
      let f = 0;
      for (let m = 0; m < n.length; m++) {
        const u = n[m];
        u === "十" ? f = f === 0 ? e.NUMBER[u] : f * e.NUMBER[u] : f += e.NUMBER[u];
      }
      return f;
    }
    e.zhStringToNumber = d;
    function _(n) {
      let f = "";
      for (let m = 0; m < n.length; m++) {
        const u = n[m];
        f = f + e.NUMBER[u];
      }
      return parseInt(f);
    }
    e.zhStringToYear = _;
  }(Un)), Un;
}
var zi;
function uu() {
  if (zi) return cr;
  zi = 1;
  var e = cr && cr.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(cr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ nt(), f = 1, m = 2, u = 3;
  let i = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return new RegExp("(\\d{2,4}|[" + Object.keys(n.NUMBER).join("") + "]{4}|[" + Object.keys(n.NUMBER).join("") + "]{2})?(?:\\s*)(?:年)?(?:[\\s|,|，]*)(\\d{1,2}|[" + Object.keys(n.NUMBER).join("") + "]{1,3})(?:\\s*)(?:月)(?:\\s*)(\\d{1,2}|[" + Object.keys(n.NUMBER).join("") + "]{1,3})?(?:\\s*)(?:日|号)?");
    }
    innerExtract(t, r) {
      const a = d.default(t.refDate), o = t.createParsingResult(r.index, r[0]);
      let l = parseInt(r[m]);
      if (isNaN(l) && (l = n.zhStringToNumber(r[m])), o.start.assign("month", l), r[u]) {
        let c = parseInt(r[u]);
        isNaN(c) && (c = n.zhStringToNumber(r[u])), o.start.assign("day", c);
      } else
        o.start.imply("day", a.date());
      if (r[f]) {
        let c = parseInt(r[f]);
        isNaN(c) && (c = n.zhStringToYear(r[f])), o.start.assign("year", c);
      } else
        o.start.imply("year", a.year());
      return o;
    }
  };
  return cr.default = i, cr;
}
var mr = {}, Zi;
function ou() {
  if (Zi) return mr;
  Zi = 1;
  var e = mr && mr.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(mr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ nt(), f = new RegExp("(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+|半|几)(?:\\s*)(?:个)?(秒(?:钟)?|分钟|小时|钟|日|天|星期|礼拜|月|年)(?:(?:之|过)?后|(?:之)?内)", "i"), m = 1, u = 2;
  let i = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(t, r) {
      const a = t.createParsingResult(r.index, r[0]);
      let o = parseInt(r[m]);
      if (isNaN(o) && (o = n.zhStringToNumber(r[m])), isNaN(o)) {
        const P = r[m];
        if (P === "几")
          o = 3;
        else if (P === "半")
          o = 0.5;
        else
          return null;
      }
      let l = d.default(t.refDate);
      const g = r[u][0];
      return g.match(/[日天星礼月年]/) ? (g == "日" || g == "天" ? l = l.add(o, "d") : g == "星" || g == "礼" ? l = l.add(o * 7, "d") : g == "月" ? l = l.add(o, "month") : g == "年" && (l = l.add(o, "year")), a.start.assign("year", l.year()), a.start.assign("month", l.month() + 1), a.start.assign("day", l.date()), a) : (g == "秒" ? l = l.add(o, "second") : g == "分" ? l = l.add(o, "minute") : (g == "小" || g == "钟") && (l = l.add(o, "hour")), a.start.imply("year", l.year()), a.start.imply("month", l.month() + 1), a.start.imply("day", l.date()), a.start.assign("hour", l.hour()), a.start.assign("minute", l.minute()), a.start.assign("second", l.second()), a);
    }
  };
  return mr.default = i, mr;
}
var _r = {}, Ki;
function du() {
  if (Ki) return _r;
  Ki = 1;
  var e = _r && _r.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(_r, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ nt(), f = new RegExp("(?<prefix>上|下|这)(?:个)?(?:星期|礼拜|周)(?<weekday>" + Object.keys(n.WEEKDAY_OFFSET).join("|") + ")");
  let m = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(i, s) {
      const t = i.createParsingResult(s.index, s[0]), r = s.groups.weekday, a = n.WEEKDAY_OFFSET[r];
      if (a === void 0)
        return null;
      let o = null;
      const l = s.groups.prefix;
      l == "上" ? o = "last" : l == "下" ? o = "next" : l == "这" && (o = "this");
      let c = d.default(i.refDate), g = !1;
      const P = c.day();
      return o == "last" || o == "past" ? (c = c.day(a - 7), g = !0) : o == "next" ? (c = c.day(a + 7), g = !0) : o == "this" ? c = c.day(a) : Math.abs(a - 7 - P) < Math.abs(a - P) ? c = c.day(a - 7) : Math.abs(a + 7 - P) < Math.abs(a - P) ? c = c.day(a + 7) : c = c.day(a), t.start.assign("weekday", a), g ? (t.start.assign("day", c.date()), t.start.assign("month", c.month() + 1), t.start.assign("year", c.year())) : (t.start.imply("day", c.date()), t.start.imply("month", c.month() + 1), t.start.imply("year", c.year())), t;
    }
  };
  return _r.default = m, _r;
}
var Pr = {}, Vi;
function lu() {
  if (Vi) return Pr;
  Vi = 1;
  var e = Pr && Pr.__importDefault || function(P) {
    return P && P.__esModule ? P : { default: P };
  };
  Object.defineProperty(Pr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ nt(), f = new RegExp("(?:从|自)?(?:(今|明|前|大前|后|大后|昨)(早|朝|晚)|(上(?:午)|早(?:上)|下(?:午)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|(今|明|前|大前|后|大后|昨)(?:日|天)(?:[\\s,，]*)(?:(上(?:午)|早(?:上)|下(?:午)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?)?(?:[\\s,，]*)(?:(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)(?:\\s*)(?:点|时|:|：)(?:\\s*)(\\d+|半|正|整|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?(?:\\s*)(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i"), m = new RegExp("(?:^\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)(?:(今|明|前|大前|后|大后|昨)(早|朝|晚)|(上(?:午)|早(?:上)|下(?:午)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|(今|明|前|大前|后|大后|昨)(?:日|天)(?:[\\s,，]*)(?:(上(?:午)|早(?:上)|下(?:午)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?)?(?:[\\s,，]*)(?:(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)(?:\\s*)(?:点|时|:|：)(?:\\s*)(\\d+|半|正|整|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?(?:\\s*)(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i"), u = 1, i = 2, s = 3, t = 4, r = 5, a = 6, o = 7, l = 8, c = 9;
  let g = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(y, T) {
      if (T.index > 0 && y.text[T.index - 1].match(/\w/))
        return null;
      const h = d.default(y.refDate), R = y.createParsingResult(T.index, T[0]);
      let E = h.clone();
      if (T[u]) {
        const D = T[u];
        D == "明" ? h.hour() > 1 && (E = E.add(1, "day")) : D == "昨" ? E = E.add(-1, "day") : D == "前" ? E = E.add(-2, "day") : D == "大前" ? E = E.add(-3, "day") : D == "后" ? E = E.add(2, "day") : D == "大后" && (E = E.add(3, "day")), R.start.assign("day", E.date()), R.start.assign("month", E.month() + 1), R.start.assign("year", E.year());
      } else if (T[t]) {
        const D = T[t];
        D == "明" ? E = E.add(1, "day") : D == "昨" ? E = E.add(-1, "day") : D == "前" ? E = E.add(-2, "day") : D == "大前" ? E = E.add(-3, "day") : D == "后" ? E = E.add(2, "day") : D == "大后" && (E = E.add(3, "day")), R.start.assign("day", E.date()), R.start.assign("month", E.month() + 1), R.start.assign("year", E.year());
      } else
        R.start.imply("day", E.date()), R.start.imply("month", E.month() + 1), R.start.imply("year", E.year());
      let p = 0, A = 0, N = -1;
      if (T[l]) {
        let D = parseInt(T[l]);
        if (isNaN(D) && (D = n.zhStringToNumber(T[l])), D >= 60)
          return null;
        R.start.assign("second", D);
      }
      if (p = parseInt(T[a]), isNaN(p) && (p = n.zhStringToNumber(T[a])), T[o] ? T[o] == "半" ? A = 30 : T[o] == "正" || T[o] == "整" ? A = 0 : (A = parseInt(T[o]), isNaN(A) && (A = n.zhStringToNumber(T[o]))) : p > 100 && (A = p % 100, p = Math.floor(p / 100)), A >= 60 || p > 24)
        return null;
      if (p >= 12 && (N = 1), T[c]) {
        if (p > 12)
          return null;
        const D = T[c][0].toLowerCase();
        D == "a" && (N = 0, p == 12 && (p = 0)), D == "p" && (N = 1, p != 12 && (p += 12));
      } else if (T[i]) {
        const M = T[i][0];
        M == "早" ? (N = 0, p == 12 && (p = 0)) : M == "晚" && (N = 1, p != 12 && (p += 12));
      } else if (T[s]) {
        const M = T[s][0];
        M == "上" || M == "早" || M == "凌" ? (N = 0, p == 12 && (p = 0)) : (M == "下" || M == "晚") && (N = 1, p != 12 && (p += 12));
      } else if (T[r]) {
        const M = T[r][0];
        M == "上" || M == "早" || M == "凌" ? (N = 0, p == 12 && (p = 0)) : (M == "下" || M == "晚") && (N = 1, p != 12 && (p += 12));
      }
      if (R.start.assign("hour", p), R.start.assign("minute", A), N >= 0 ? R.start.assign("meridiem", N) : p < 12 ? R.start.imply("meridiem", 0) : R.start.imply("meridiem", 1), T = m.exec(y.text.substring(R.index + R.text.length)), !T)
        return R.text.match(/^\d+$/) ? null : R;
      let b = E.clone();
      if (R.end = y.createParsingComponents(), T[u]) {
        const D = T[u];
        D == "明" ? h.hour() > 1 && (b = b.add(1, "day")) : D == "昨" ? b = b.add(-1, "day") : D == "前" ? b = b.add(-2, "day") : D == "大前" ? b = b.add(-3, "day") : D == "后" ? b = b.add(2, "day") : D == "大后" && (b = b.add(3, "day")), R.end.assign("day", b.date()), R.end.assign("month", b.month() + 1), R.end.assign("year", b.year());
      } else if (T[t]) {
        const D = T[t];
        D == "明" ? b = b.add(1, "day") : D == "昨" ? b = b.add(-1, "day") : D == "前" ? b = b.add(-2, "day") : D == "大前" ? b = b.add(-3, "day") : D == "后" ? b = b.add(2, "day") : D == "大后" && (b = b.add(3, "day")), R.end.assign("day", b.date()), R.end.assign("month", b.month() + 1), R.end.assign("year", b.year());
      } else
        R.end.imply("day", b.date()), R.end.imply("month", b.month() + 1), R.end.imply("year", b.year());
      if (p = 0, A = 0, N = -1, T[l]) {
        let D = parseInt(T[l]);
        if (isNaN(D) && (D = n.zhStringToNumber(T[l])), D >= 60)
          return null;
        R.end.assign("second", D);
      }
      if (p = parseInt(T[a]), isNaN(p) && (p = n.zhStringToNumber(T[a])), T[o] ? T[o] == "半" ? A = 30 : T[o] == "正" || T[o] == "整" ? A = 0 : (A = parseInt(T[o]), isNaN(A) && (A = n.zhStringToNumber(T[o]))) : p > 100 && (A = p % 100, p = Math.floor(p / 100)), A >= 60 || p > 24)
        return null;
      if (p >= 12 && (N = 1), T[c]) {
        if (p > 12)
          return null;
        const D = T[c][0].toLowerCase();
        D == "a" && (N = 0, p == 12 && (p = 0)), D == "p" && (N = 1, p != 12 && (p += 12)), R.start.isCertain("meridiem") || (N == 0 ? (R.start.imply("meridiem", 0), R.start.get("hour") == 12 && R.start.assign("hour", 0)) : (R.start.imply("meridiem", 1), R.start.get("hour") != 12 && R.start.assign("hour", R.start.get("hour") + 12)));
      } else if (T[i]) {
        const M = T[i][0];
        M == "早" ? (N = 0, p == 12 && (p = 0)) : M == "晚" && (N = 1, p != 12 && (p += 12));
      } else if (T[s]) {
        const M = T[s][0];
        M == "上" || M == "早" || M == "凌" ? (N = 0, p == 12 && (p = 0)) : (M == "下" || M == "晚") && (N = 1, p != 12 && (p += 12));
      } else if (T[r]) {
        const M = T[r][0];
        M == "上" || M == "早" || M == "凌" ? (N = 0, p == 12 && (p = 0)) : (M == "下" || M == "晚") && (N = 1, p != 12 && (p += 12));
      }
      return R.text = R.text + T[0], R.end.assign("hour", p), R.end.assign("minute", A), N >= 0 ? R.end.assign("meridiem", N) : R.start.isCertain("meridiem") && R.start.get("meridiem") == 1 && R.start.get("hour") > p ? R.end.imply("meridiem", 0) : p > 12 && R.end.imply("meridiem", 1), R.end.date().getTime() < R.start.date().getTime() && R.end.imply("day", R.end.get("day") + 1), R;
    }
  };
  return Pr.default = g, Pr;
}
var gr = {}, Xi;
function fu() {
  if (Xi) return gr;
  Xi = 1;
  var e = gr && gr.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(gr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ nt(), f = new RegExp("(?:星期|礼拜|周)(?<weekday>" + Object.keys(n.WEEKDAY_OFFSET).join("|") + ")");
  let m = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(i, s) {
      const t = i.createParsingResult(s.index, s[0]), r = s.groups.weekday, a = n.WEEKDAY_OFFSET[r];
      if (a === void 0)
        return null;
      let o = d.default(i.refDate);
      const l = o.day();
      return Math.abs(a - 7 - l) < Math.abs(a - l) ? o = o.day(a - 7) : Math.abs(a + 7 - l) < Math.abs(a - l) ? o = o.day(a + 7) : o = o.day(a), t.start.assign("weekday", a), t.start.imply("day", o.date()), t.start.imply("month", o.month() + 1), t.start.imply("year", o.year()), t;
    }
  };
  return gr.default = m, gr;
}
var yr = {}, xi;
function cu() {
  if (xi) return yr;
  xi = 1;
  var e = yr && yr.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(yr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = 1, f = 2, m = 3, u = 4, i = 5, s = 6;
  let t = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern(a) {
      return new RegExp("(而家|立(?:刻|即)|即刻)|(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)(?:[\\s|,|，]*)(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?", "i");
    }
    innerExtract(a, o) {
      const l = o.index, c = a.createParsingResult(l, o[0]), g = d.default(a.refDate);
      let P = g;
      if (o[n])
        c.start.imply("hour", g.hour()), c.start.imply("minute", g.minute()), c.start.imply("second", g.second()), c.start.imply("millisecond", g.millisecond());
      else if (o[f]) {
        const y = o[f], T = o[m];
        y == "明" || y == "聽" ? g.hour() > 1 && (P = P.add(1, "day")) : y == "昨" || y == "尋" || y == "琴" ? P = P.add(-1, "day") : y == "前" ? P = P.add(-2, "day") : y == "大前" ? P = P.add(-3, "day") : y == "後" ? P = P.add(2, "day") : y == "大後" && (P = P.add(3, "day")), T == "早" || T == "朝" ? c.start.imply("hour", 6) : T == "晚" && (c.start.imply("hour", 22), c.start.imply("meridiem", 1));
      } else if (o[u]) {
        const T = o[u][0];
        T == "早" || T == "朝" || T == "上" ? c.start.imply("hour", 6) : T == "下" || T == "晏" ? (c.start.imply("hour", 15), c.start.imply("meridiem", 1)) : T == "中" ? (c.start.imply("hour", 12), c.start.imply("meridiem", 1)) : T == "夜" || T == "晚" ? (c.start.imply("hour", 22), c.start.imply("meridiem", 1)) : T == "凌" && c.start.imply("hour", 0);
      } else if (o[i]) {
        const y = o[i];
        y == "明" || y == "聽" ? g.hour() > 1 && (P = P.add(1, "day")) : y == "昨" || y == "尋" || y == "琴" ? P = P.add(-1, "day") : y == "前" ? P = P.add(-2, "day") : y == "大前" ? P = P.add(-3, "day") : y == "後" ? P = P.add(2, "day") : y == "大後" && (P = P.add(3, "day"));
        const T = o[s];
        if (T) {
          const h = T[0];
          h == "早" || h == "朝" || h == "上" ? c.start.imply("hour", 6) : h == "下" || h == "晏" ? (c.start.imply("hour", 15), c.start.imply("meridiem", 1)) : h == "中" ? (c.start.imply("hour", 12), c.start.imply("meridiem", 1)) : h == "夜" || h == "晚" ? (c.start.imply("hour", 22), c.start.imply("meridiem", 1)) : h == "凌" && c.start.imply("hour", 0);
        }
      }
      return c.start.assign("day", P.date()), c.start.assign("month", P.month() + 1), c.start.assign("year", P.year()), c;
    }
  };
  return yr.default = t, yr;
}
var Tr = {}, wn = {}, Ji;
function at() {
  return Ji || (Ji = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.zhStringToYear = e.zhStringToNumber = e.WEEKDAY_OFFSET = e.NUMBER = void 0, e.NUMBER = {
      零: 0,
      一: 1,
      二: 2,
      兩: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      十: 10,
      廿: 20,
      卅: 30
    }, e.WEEKDAY_OFFSET = {
      天: 0,
      日: 0,
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6
    };
    function d(n) {
      let f = 0;
      for (let m = 0; m < n.length; m++) {
        const u = n[m];
        u === "十" ? f = f === 0 ? e.NUMBER[u] : f * e.NUMBER[u] : f += e.NUMBER[u];
      }
      return f;
    }
    e.zhStringToNumber = d;
    function _(n) {
      let f = "";
      for (let m = 0; m < n.length; m++) {
        const u = n[m];
        f = f + e.NUMBER[u];
      }
      return parseInt(f);
    }
    e.zhStringToYear = _;
  }(wn)), wn;
}
var Qi;
function mu() {
  if (Qi) return Tr;
  Qi = 1;
  var e = Tr && Tr.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(Tr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ at(), f = 1, m = 2, u = 3;
  let i = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return new RegExp("(\\d{2,4}|[" + Object.keys(n.NUMBER).join("") + "]{4}|[" + Object.keys(n.NUMBER).join("") + "]{2})?(?:\\s*)(?:年)?(?:[\\s|,|，]*)(\\d{1,2}|[" + Object.keys(n.NUMBER).join("") + "]{1,2})(?:\\s*)(?:月)(?:\\s*)(\\d{1,2}|[" + Object.keys(n.NUMBER).join("") + "]{1,2})?(?:\\s*)(?:日|號)?");
    }
    innerExtract(t, r) {
      const a = d.default(t.refDate), o = t.createParsingResult(r.index, r[0]);
      let l = parseInt(r[m]);
      if (isNaN(l) && (l = n.zhStringToNumber(r[m])), o.start.assign("month", l), r[u]) {
        let c = parseInt(r[u]);
        isNaN(c) && (c = n.zhStringToNumber(r[u])), o.start.assign("day", c);
      } else
        o.start.imply("day", a.date());
      if (r[f]) {
        let c = parseInt(r[f]);
        isNaN(c) && (c = n.zhStringToYear(r[f])), o.start.assign("year", c);
      } else
        o.start.imply("year", a.year());
      return o;
    }
  };
  return Tr.default = i, Tr;
}
var Rr = {}, es;
function _u() {
  if (es) return Rr;
  es = 1;
  var e = Rr && Rr.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(Rr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ at(), f = new RegExp("(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+|半|幾)(?:\\s*)(?:個)?(秒(?:鐘)?|分鐘|小時|鐘|日|天|星期|禮拜|月|年)(?:(?:之|過)?後|(?:之)?內)", "i"), m = 1, u = 2;
  let i = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(t, r) {
      const a = t.createParsingResult(r.index, r[0]);
      let o = parseInt(r[m]);
      if (isNaN(o) && (o = n.zhStringToNumber(r[m])), isNaN(o)) {
        const P = r[m];
        if (P === "幾")
          o = 3;
        else if (P === "半")
          o = 0.5;
        else
          return null;
      }
      let l = d.default(t.refDate);
      const g = r[u][0];
      return g.match(/[日天星禮月年]/) ? (g == "日" || g == "天" ? l = l.add(o, "d") : g == "星" || g == "禮" ? l = l.add(o * 7, "d") : g == "月" ? l = l.add(o, "month") : g == "年" && (l = l.add(o, "year")), a.start.assign("year", l.year()), a.start.assign("month", l.month() + 1), a.start.assign("day", l.date()), a) : (g == "秒" ? l = l.add(o, "second") : g == "分" ? l = l.add(o, "minute") : (g == "小" || g == "鐘") && (l = l.add(o, "hour")), a.start.imply("year", l.year()), a.start.imply("month", l.month() + 1), a.start.imply("day", l.date()), a.start.assign("hour", l.hour()), a.start.assign("minute", l.minute()), a.start.assign("second", l.second()), a);
    }
  };
  return Rr.default = i, Rr;
}
var hr = {}, rs;
function Pu() {
  if (rs) return hr;
  rs = 1;
  var e = hr && hr.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(hr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ at(), f = new RegExp("(?<prefix>上|今|下|這|呢)(?:個)?(?:星期|禮拜|週)(?<weekday>" + Object.keys(n.WEEKDAY_OFFSET).join("|") + ")");
  let m = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(i, s) {
      const t = i.createParsingResult(s.index, s[0]), r = s.groups.weekday, a = n.WEEKDAY_OFFSET[r];
      if (a === void 0)
        return null;
      let o = null;
      const l = s.groups.prefix;
      l == "上" ? o = "last" : l == "下" ? o = "next" : (l == "今" || l == "這" || l == "呢") && (o = "this");
      let c = d.default(i.refDate), g = !1;
      const P = c.day();
      return o == "last" || o == "past" ? (c = c.day(a - 7), g = !0) : o == "next" ? (c = c.day(a + 7), g = !0) : o == "this" ? c = c.day(a) : Math.abs(a - 7 - P) < Math.abs(a - P) ? c = c.day(a - 7) : Math.abs(a + 7 - P) < Math.abs(a - P) ? c = c.day(a + 7) : c = c.day(a), t.start.assign("weekday", a), g ? (t.start.assign("day", c.date()), t.start.assign("month", c.month() + 1), t.start.assign("year", c.year())) : (t.start.imply("day", c.date()), t.start.imply("month", c.month() + 1), t.start.imply("year", c.year())), t;
    }
  };
  return hr.default = m, hr;
}
var Er = {}, ts;
function gu() {
  if (ts) return Er;
  ts = 1;
  var e = Er && Er.__importDefault || function(P) {
    return P && P.__esModule ? P : { default: P };
  };
  Object.defineProperty(Er, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ at(), f = new RegExp("(?:由|從|自)?(?:(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)(?:[\\s,，]*)(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?)?(?:[\\s,，]*)(?:(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)(?:\\s*)(?:點|時|:|：)(?:\\s*)(\\d+|半|正|整|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?(?:\\s*)(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i"), m = new RegExp("(?:^\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)(?:(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)(?:[\\s,，]*)(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?)?(?:[\\s,，]*)(?:(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)(?:\\s*)(?:點|時|:|：)(?:\\s*)(\\d+|半|正|整|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:分|:|：)?(?:\\s*)(\\d+|[" + Object.keys(n.NUMBER).join("") + "]+)?(?:\\s*)(?:秒)?)(?:\\s*(A.M.|P.M.|AM?|PM?))?", "i"), u = 1, i = 2, s = 3, t = 4, r = 5, a = 6, o = 7, l = 8, c = 9;
  let g = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(y, T) {
      if (T.index > 0 && y.text[T.index - 1].match(/\w/))
        return null;
      const h = d.default(y.refDate), R = y.createParsingResult(T.index, T[0]);
      let E = h.clone();
      if (T[u]) {
        var p = T[u];
        p == "明" || p == "聽" ? h.hour() > 1 && (E = E.add(1, "day")) : p == "昨" || p == "尋" || p == "琴" ? E = E.add(-1, "day") : p == "前" ? E = E.add(-2, "day") : p == "大前" ? E = E.add(-3, "day") : p == "後" ? E = E.add(2, "day") : p == "大後" && (E = E.add(3, "day")), R.start.assign("day", E.date()), R.start.assign("month", E.month() + 1), R.start.assign("year", E.year());
      } else if (T[t]) {
        var A = T[t];
        A == "明" || A == "聽" ? E = E.add(1, "day") : A == "昨" || A == "尋" || A == "琴" ? E = E.add(-1, "day") : A == "前" ? E = E.add(-2, "day") : A == "大前" ? E = E.add(-3, "day") : A == "後" ? E = E.add(2, "day") : A == "大後" && (E = E.add(3, "day")), R.start.assign("day", E.date()), R.start.assign("month", E.month() + 1), R.start.assign("year", E.year());
      } else
        R.start.imply("day", E.date()), R.start.imply("month", E.month() + 1), R.start.imply("year", E.year());
      let N = 0, b = 0, D = -1;
      if (T[l]) {
        var M = parseInt(T[l]);
        if (isNaN(M) && (M = n.zhStringToNumber(T[l])), M >= 60)
          return null;
        R.start.assign("second", M);
      }
      if (N = parseInt(T[a]), isNaN(N) && (N = n.zhStringToNumber(T[a])), T[o] ? T[o] == "半" ? b = 30 : T[o] == "正" || T[o] == "整" ? b = 0 : (b = parseInt(T[o]), isNaN(b) && (b = n.zhStringToNumber(T[o]))) : N > 100 && (b = N % 100, N = Math.floor(N / 100)), b >= 60 || N > 24)
        return null;
      if (N >= 12 && (D = 1), T[c]) {
        if (N > 12)
          return null;
        var S = T[c][0].toLowerCase();
        S == "a" && (D = 0, N == 12 && (N = 0)), S == "p" && (D = 1, N != 12 && (N += 12));
      } else if (T[i]) {
        var q = T[i], U = q[0];
        U == "朝" || U == "早" ? (D = 0, N == 12 && (N = 0)) : U == "晚" && (D = 1, N != 12 && (N += 12));
      } else if (T[s]) {
        var I = T[s], O = I[0];
        O == "上" || O == "朝" || O == "早" || O == "凌" ? (D = 0, N == 12 && (N = 0)) : (O == "下" || O == "晏" || O == "晚") && (D = 1, N != 12 && (N += 12));
      } else if (T[r]) {
        var w = T[r], C = w[0];
        C == "上" || C == "朝" || C == "早" || C == "凌" ? (D = 0, N == 12 && (N = 0)) : (C == "下" || C == "晏" || C == "晚") && (D = 1, N != 12 && (N += 12));
      }
      if (R.start.assign("hour", N), R.start.assign("minute", b), D >= 0 ? R.start.assign("meridiem", D) : N < 12 ? R.start.imply("meridiem", 0) : R.start.imply("meridiem", 1), T = m.exec(y.text.substring(R.index + R.text.length)), !T)
        return R.text.match(/^\d+$/) ? null : R;
      let v = E.clone();
      if (R.end = y.createParsingComponents(), T[u]) {
        var p = T[u];
        p == "明" || p == "聽" ? h.hour() > 1 && (v = v.add(1, "day")) : p == "昨" || p == "尋" || p == "琴" ? v = v.add(-1, "day") : p == "前" ? v = v.add(-2, "day") : p == "大前" ? v = v.add(-3, "day") : p == "後" ? v = v.add(2, "day") : p == "大後" && (v = v.add(3, "day")), R.end.assign("day", v.date()), R.end.assign("month", v.month() + 1), R.end.assign("year", v.year());
      } else if (T[t]) {
        var A = T[t];
        A == "明" || A == "聽" ? v = v.add(1, "day") : A == "昨" || A == "尋" || A == "琴" ? v = v.add(-1, "day") : A == "前" ? v = v.add(-2, "day") : A == "大前" ? v = v.add(-3, "day") : A == "後" ? v = v.add(2, "day") : A == "大後" && (v = v.add(3, "day")), R.end.assign("day", v.date()), R.end.assign("month", v.month() + 1), R.end.assign("year", v.year());
      } else
        R.end.imply("day", v.date()), R.end.imply("month", v.month() + 1), R.end.imply("year", v.year());
      if (N = 0, b = 0, D = -1, T[l]) {
        var M = parseInt(T[l]);
        if (isNaN(M) && (M = n.zhStringToNumber(T[l])), M >= 60)
          return null;
        R.end.assign("second", M);
      }
      if (N = parseInt(T[a]), isNaN(N) && (N = n.zhStringToNumber(T[a])), T[o] ? T[o] == "半" ? b = 30 : T[o] == "正" || T[o] == "整" ? b = 0 : (b = parseInt(T[o]), isNaN(b) && (b = n.zhStringToNumber(T[o]))) : N > 100 && (b = N % 100, N = Math.floor(N / 100)), b >= 60 || N > 24)
        return null;
      if (N >= 12 && (D = 1), T[c]) {
        if (N > 12)
          return null;
        var S = T[c][0].toLowerCase();
        S == "a" && (D = 0, N == 12 && (N = 0)), S == "p" && (D = 1, N != 12 && (N += 12)), R.start.isCertain("meridiem") || (D == 0 ? (R.start.imply("meridiem", 0), R.start.get("hour") == 12 && R.start.assign("hour", 0)) : (R.start.imply("meridiem", 1), R.start.get("hour") != 12 && R.start.assign("hour", R.start.get("hour") + 12)));
      } else if (T[i]) {
        var q = T[i], U = q[0];
        U == "朝" || U == "早" ? (D = 0, N == 12 && (N = 0)) : U == "晚" && (D = 1, N != 12 && (N += 12));
      } else if (T[s]) {
        var I = T[s], O = I[0];
        O == "上" || O == "朝" || O == "早" || O == "凌" ? (D = 0, N == 12 && (N = 0)) : (O == "下" || O == "晏" || O == "晚") && (D = 1, N != 12 && (N += 12));
      } else if (T[r]) {
        var w = T[r], C = w[0];
        C == "上" || C == "朝" || C == "早" || C == "凌" ? (D = 0, N == 12 && (N = 0)) : (C == "下" || C == "晏" || C == "晚") && (D = 1, N != 12 && (N += 12));
      }
      return R.text = R.text + T[0], R.end.assign("hour", N), R.end.assign("minute", b), D >= 0 ? R.end.assign("meridiem", D) : R.start.isCertain("meridiem") && R.start.get("meridiem") == 1 && R.start.get("hour") > N ? R.end.imply("meridiem", 0) : N > 12 && R.end.imply("meridiem", 1), R.end.date().getTime() < R.start.date().getTime() && R.end.imply("day", R.end.get("day") + 1), R;
    }
  };
  return Er.default = g, Er;
}
var pr = {}, ns;
function yu() {
  if (ns) return pr;
  ns = 1;
  var e = pr && pr.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(pr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ at(), f = new RegExp("(?:星期|禮拜|週)(?<weekday>" + Object.keys(n.WEEKDAY_OFFSET).join("|") + ")");
  let m = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(i, s) {
      const t = i.createParsingResult(s.index, s[0]), r = s.groups.weekday, a = n.WEEKDAY_OFFSET[r];
      if (a === void 0)
        return null;
      let o = d.default(i.refDate);
      const l = o.day();
      return Math.abs(a - 7 - l) < Math.abs(a - l) ? o = o.day(a - 7) : Math.abs(a + 7 - l) < Math.abs(a - l) ? o = o.day(a + 7) : o = o.day(a), t.start.assign("weekday", a), t.start.imply("day", o.date()), t.start.imply("month", o.month() + 1), t.start.imply("year", o.year()), t;
    }
  };
  return pr.default = m, pr;
}
var Mr = {}, as;
function Tu() {
  if (as) return Mr;
  as = 1;
  var e = Mr && Mr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Mr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(至|到|\-|\~|～|－|ー)\s*$/i;
    }
  };
  return Mr.default = _, Mr;
}
var Nr = {}, is;
function Ru() {
  if (is) return Nr;
  is = 1;
  var e = Nr && Nr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Nr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*$/i;
    }
  };
  return Nr.default = _, Nr;
}
var xr = {}, ss;
function Qo() {
  return ss || (ss = 1, function(e) {
    var d = xr && xr.__importDefault || function(h) {
      return h && h.__esModule ? h : { default: h };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.hant = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = d(/* @__PURE__ */ An()), n = /* @__PURE__ */ ye(), f = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return f.Chrono;
    } });
    const m = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return m.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return m.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return m.ReferenceWithTimezone;
    } });
    const u = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return u.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return u.Weekday;
    } });
    const i = d(/* @__PURE__ */ cu()), s = d(/* @__PURE__ */ mu()), t = d(/* @__PURE__ */ _u()), r = d(/* @__PURE__ */ Pu()), a = d(/* @__PURE__ */ gu()), o = d(/* @__PURE__ */ yu()), l = d(/* @__PURE__ */ Tu()), c = d(/* @__PURE__ */ Ru());
    e.hant = new f.Chrono(y()), e.casual = new f.Chrono(y()), e.strict = new f.Chrono(T());
    function g(h, R, E) {
      return e.casual.parse(h, R, E);
    }
    e.parse = g;
    function P(h, R, E) {
      return e.casual.parseDate(h, R, E);
    }
    e.parseDate = P;
    function y() {
      const h = T();
      return h.parsers.unshift(new i.default()), h;
    }
    e.createCasualConfiguration = y;
    function T() {
      const h = n.includeCommonConfiguration({
        parsers: [
          new s.default(),
          new r.default(),
          new o.default(),
          new a.default(),
          new t.default()
        ],
        refiners: [new l.default(), new c.default()]
      });
      return h.refiners = h.refiners.filter((R) => !(R instanceof _.default)), h;
    }
    e.createConfiguration = T;
  }(xr)), xr;
}
var Jr = {}, Dr = {}, us;
function ed() {
  if (us) return Dr;
  us = 1;
  var e = Dr && Dr.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Dr, "__esModule", { value: !0 });
  const d = e(k()), _ = /* @__PURE__ */ W(), n = 1, f = 2, m = 3, u = 4, i = 5, s = 6;
  let t = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern(a) {
      return new RegExp("(现在|立(?:刻|即)|即刻)|(今|明|前|大前|后|大后|昨)(早|晚)|(上(?:午)|早(?:上)|下(?:午)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|(今|明|前|大前|后|大后|昨)(?:日|天)(?:[\\s|,|，]*)(?:(上(?:午)|早(?:上)|下(?:午)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?", "i");
    }
    innerExtract(a, o) {
      const l = o.index, c = a.createParsingResult(l, o[0]), g = d.default(a.refDate);
      let P = g;
      if (o[n])
        c.start.imply("hour", g.hour()), c.start.imply("minute", g.minute()), c.start.imply("second", g.second()), c.start.imply("millisecond", g.millisecond());
      else if (o[f]) {
        const y = o[f], T = o[m];
        y == "明" ? g.hour() > 1 && (P = P.add(1, "day")) : y == "昨" ? P = P.add(-1, "day") : y == "前" ? P = P.add(-2, "day") : y == "大前" ? P = P.add(-3, "day") : y == "后" ? P = P.add(2, "day") : y == "大后" && (P = P.add(3, "day")), T == "早" ? c.start.imply("hour", 6) : T == "晚" && (c.start.imply("hour", 22), c.start.imply("meridiem", 1));
      } else if (o[u]) {
        const T = o[u][0];
        T == "早" || T == "上" ? c.start.imply("hour", 6) : T == "下" ? (c.start.imply("hour", 15), c.start.imply("meridiem", 1)) : T == "中" ? (c.start.imply("hour", 12), c.start.imply("meridiem", 1)) : T == "夜" || T == "晚" ? (c.start.imply("hour", 22), c.start.imply("meridiem", 1)) : T == "凌" && c.start.imply("hour", 0);
      } else if (o[i]) {
        const y = o[i];
        y == "明" ? g.hour() > 1 && (P = P.add(1, "day")) : y == "昨" ? P = P.add(-1, "day") : y == "前" ? P = P.add(-2, "day") : y == "大前" ? P = P.add(-3, "day") : y == "后" ? P = P.add(2, "day") : y == "大后" && (P = P.add(3, "day"));
        const T = o[s];
        if (T) {
          const h = T[0];
          h == "早" || h == "上" ? c.start.imply("hour", 6) : h == "下" ? (c.start.imply("hour", 15), c.start.imply("meridiem", 1)) : h == "中" ? (c.start.imply("hour", 12), c.start.imply("meridiem", 1)) : h == "夜" || h == "晚" ? (c.start.imply("hour", 22), c.start.imply("meridiem", 1)) : h == "凌" && c.start.imply("hour", 0);
        }
      }
      return c.start.assign("day", P.date()), c.start.assign("month", P.month() + 1), c.start.assign("year", P.year()), c;
    }
  };
  return Dr.default = t, Dr;
}
var Ar = {}, os;
function rd() {
  if (os) return Ar;
  os = 1;
  var e = Ar && Ar.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Ar, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(至|到|-|~|～|－|ー)\s*$/i;
    }
  };
  return Ar.default = _, Ar;
}
var Or = {}, ds;
function td() {
  if (ds) return Or;
  ds = 1;
  var e = Or && Or.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Or, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*$/i;
    }
  };
  return Or.default = _, Or;
}
var ls;
function nd() {
  return ls || (ls = 1, function(e) {
    var d = Jr && Jr.__importDefault || function(h) {
      return h && h.__esModule ? h : { default: h };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.hans = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = d(/* @__PURE__ */ An()), n = /* @__PURE__ */ ye(), f = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return f.Chrono;
    } });
    const m = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return m.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return m.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return m.ReferenceWithTimezone;
    } });
    const u = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return u.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return u.Weekday;
    } });
    const i = d(/* @__PURE__ */ ed()), s = d(/* @__PURE__ */ uu()), t = d(/* @__PURE__ */ ou()), r = d(/* @__PURE__ */ du()), a = d(/* @__PURE__ */ lu()), o = d(/* @__PURE__ */ fu()), l = d(/* @__PURE__ */ rd()), c = d(/* @__PURE__ */ td());
    e.hans = new f.Chrono(y()), e.casual = new f.Chrono(y()), e.strict = new f.Chrono(T());
    function g(h, R, E) {
      return e.casual.parse(h, R, E);
    }
    e.parse = g;
    function P(h, R, E) {
      return e.casual.parseDate(h, R, E);
    }
    e.parseDate = P;
    function y() {
      const h = T();
      return h.parsers.unshift(new i.default()), h;
    }
    e.createCasualConfiguration = y;
    function T() {
      const h = n.includeCommonConfiguration({
        parsers: [
          new s.default(),
          new r.default(),
          new o.default(),
          new a.default(),
          new t.default()
        ],
        refiners: [new l.default(), new c.default()]
      });
      return h.refiners = h.refiners.filter((R) => !(R instanceof _.default)), h;
    }
    e.createConfiguration = T;
  }(Jr)), Jr;
}
var fs;
function ad() {
  return fs || (fs = 1, function(e) {
    var d = Pe && Pe.__createBinding || (Object.create ? function(M, S, q, U) {
      U === void 0 && (U = q), Object.defineProperty(M, U, { enumerable: !0, get: function() {
        return S[q];
      } });
    } : function(M, S, q, U) {
      U === void 0 && (U = q), M[U] = S[q];
    }), _ = Pe && Pe.__setModuleDefault || (Object.create ? function(M, S) {
      Object.defineProperty(M, "default", { enumerable: !0, value: S });
    } : function(M, S) {
      M.default = S;
    }), n = Pe && Pe.__importStar || function(M) {
      if (M && M.__esModule) return M;
      var S = {};
      if (M != null) for (var q in M) q !== "default" && Object.prototype.hasOwnProperty.call(M, q) && d(S, M, q);
      return _(S, M), S;
    }, f = Pe && Pe.__importDefault || function(M) {
      return M && M.__esModule ? M : { default: M };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = e.hans = e.hant = void 0;
    const m = /* @__PURE__ */ ye(), u = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return u.Chrono;
    } });
    const i = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return i.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return i.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return i.ReferenceWithTimezone;
    } });
    const s = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return s.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return s.Weekday;
    } });
    const t = f(/* @__PURE__ */ An()), r = f(/* @__PURE__ */ uu()), a = f(/* @__PURE__ */ ou()), o = f(/* @__PURE__ */ du()), l = f(/* @__PURE__ */ lu()), c = f(/* @__PURE__ */ fu()), g = f(/* @__PURE__ */ cu()), P = f(/* @__PURE__ */ mu()), y = f(/* @__PURE__ */ _u()), T = f(/* @__PURE__ */ Pu()), h = f(/* @__PURE__ */ gu()), R = f(/* @__PURE__ */ yu()), E = f(/* @__PURE__ */ Tu()), p = f(/* @__PURE__ */ Ru());
    e.hant = n(/* @__PURE__ */ Qo()), e.hans = n(/* @__PURE__ */ nd()), e.casual = new u.Chrono(b()), e.strict = new u.Chrono(D());
    function A(M, S, q) {
      return e.casual.parse(M, S, q);
    }
    e.parse = A;
    function N(M, S, q) {
      return e.casual.parseDate(M, S, q);
    }
    e.parseDate = N;
    function b() {
      const M = D();
      return M.parsers.unshift(new g.default()), M;
    }
    e.createCasualConfiguration = b;
    function D() {
      const M = m.includeCommonConfiguration({
        parsers: [
          new P.default(),
          new r.default(),
          new T.default(),
          new o.default(),
          new R.default(),
          new c.default(),
          new h.default(),
          new l.default(),
          new y.default(),
          new a.default()
        ],
        refiners: [new E.default(), new p.default()]
      });
      return M.refiners = M.refiners.filter((S) => !(S instanceof t.default)), M;
    }
    e.createConfiguration = D;
  }(Pe)), Pe;
}
var Qr = {}, nn = {}, Sn = {}, cs;
function le() {
  return cs || (cs = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTimeUnits = e.TIME_UNITS_PATTERN = e.parseYear = e.YEAR_PATTERN = e.parseOrdinalNumberPattern = e.ORDINAL_NUMBER_PATTERN = e.parseNumberPattern = e.NUMBER_PATTERN = e.TIME_UNIT_DICTIONARY = e.ORDINAL_WORD_DICTIONARY = e.INTEGER_WORD_DICTIONARY = e.MONTH_DICTIONARY = e.FULL_MONTH_NAME_DICTIONARY = e.WEEKDAY_DICTIONARY = e.REGEX_PARTS = void 0;
    const d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ G();
    e.REGEX_PARTS = {
      leftBoundary: "([^\\p{L}\\p{N}_]|^)",
      rightBoundary: "(?=[^\\p{L}\\p{N}_]|$)",
      flags: "iu"
    }, e.WEEKDAY_DICTIONARY = {
      воскресенье: 0,
      воскресенья: 0,
      вск: 0,
      "вск.": 0,
      понедельник: 1,
      понедельника: 1,
      пн: 1,
      "пн.": 1,
      вторник: 2,
      вторника: 2,
      вт: 2,
      "вт.": 2,
      среда: 3,
      среды: 3,
      среду: 3,
      ср: 3,
      "ср.": 3,
      четверг: 4,
      четверга: 4,
      чт: 4,
      "чт.": 4,
      пятница: 5,
      пятницу: 5,
      пятницы: 5,
      пт: 5,
      "пт.": 5,
      суббота: 6,
      субботу: 6,
      субботы: 6,
      сб: 6,
      "сб.": 6
    }, e.FULL_MONTH_NAME_DICTIONARY = {
      январь: 1,
      января: 1,
      январе: 1,
      февраль: 2,
      февраля: 2,
      феврале: 2,
      март: 3,
      марта: 3,
      марте: 3,
      апрель: 4,
      апреля: 4,
      апреле: 4,
      май: 5,
      мая: 5,
      мае: 5,
      июнь: 6,
      июня: 6,
      июне: 6,
      июль: 7,
      июля: 7,
      июле: 7,
      август: 8,
      августа: 8,
      августе: 8,
      сентябрь: 9,
      сентября: 9,
      сентябре: 9,
      октябрь: 10,
      октября: 10,
      октябре: 10,
      ноябрь: 11,
      ноября: 11,
      ноябре: 11,
      декабрь: 12,
      декабря: 12,
      декабре: 12
    }, e.MONTH_DICTIONARY = Object.assign(Object.assign({}, e.FULL_MONTH_NAME_DICTIONARY), { янв: 1, "янв.": 1, фев: 2, "фев.": 2, мар: 3, "мар.": 3, апр: 4, "апр.": 4, авг: 8, "авг.": 8, сен: 9, "сен.": 9, окт: 10, "окт.": 10, ноя: 11, "ноя.": 11, дек: 12, "дек.": 12 }), e.INTEGER_WORD_DICTIONARY = {
      один: 1,
      одна: 1,
      одной: 1,
      одну: 1,
      две: 2,
      два: 2,
      двух: 2,
      три: 3,
      трех: 3,
      трёх: 3,
      четыре: 4,
      четырех: 4,
      четырёх: 4,
      пять: 5,
      пяти: 5,
      шесть: 6,
      шести: 6,
      семь: 7,
      семи: 7,
      восемь: 8,
      восьми: 8,
      девять: 9,
      девяти: 9,
      десять: 10,
      десяти: 10,
      одиннадцать: 11,
      одиннадцати: 11,
      двенадцать: 12,
      двенадцати: 12
    }, e.ORDINAL_WORD_DICTIONARY = {
      первое: 1,
      первого: 1,
      второе: 2,
      второго: 2,
      третье: 3,
      третьего: 3,
      четвертое: 4,
      четвертого: 4,
      пятое: 5,
      пятого: 5,
      шестое: 6,
      шестого: 6,
      седьмое: 7,
      седьмого: 7,
      восьмое: 8,
      восьмого: 8,
      девятое: 9,
      девятого: 9,
      десятое: 10,
      десятого: 10,
      одиннадцатое: 11,
      одиннадцатого: 11,
      двенадцатое: 12,
      двенадцатого: 12,
      тринадцатое: 13,
      тринадцатого: 13,
      четырнадцатое: 14,
      четырнадцатого: 14,
      пятнадцатое: 15,
      пятнадцатого: 15,
      шестнадцатое: 16,
      шестнадцатого: 16,
      семнадцатое: 17,
      семнадцатого: 17,
      восемнадцатое: 18,
      восемнадцатого: 18,
      девятнадцатое: 19,
      девятнадцатого: 19,
      двадцатое: 20,
      двадцатого: 20,
      "двадцать первое": 21,
      "двадцать первого": 21,
      "двадцать второе": 22,
      "двадцать второго": 22,
      "двадцать третье": 23,
      "двадцать третьего": 23,
      "двадцать четвертое": 24,
      "двадцать четвертого": 24,
      "двадцать пятое": 25,
      "двадцать пятого": 25,
      "двадцать шестое": 26,
      "двадцать шестого": 26,
      "двадцать седьмое": 27,
      "двадцать седьмого": 27,
      "двадцать восьмое": 28,
      "двадцать восьмого": 28,
      "двадцать девятое": 29,
      "двадцать девятого": 29,
      тридцатое: 30,
      тридцатого: 30,
      "тридцать первое": 31,
      "тридцать первого": 31
    }, e.TIME_UNIT_DICTIONARY = {
      сек: "second",
      секунда: "second",
      секунд: "second",
      секунды: "second",
      секунду: "second",
      секундочка: "second",
      секундочки: "second",
      секундочек: "second",
      секундочку: "second",
      мин: "minute",
      минута: "minute",
      минут: "minute",
      минуты: "minute",
      минуту: "minute",
      минуток: "minute",
      минутки: "minute",
      минутку: "minute",
      минуточек: "minute",
      минуточки: "minute",
      минуточку: "minute",
      час: "hour",
      часов: "hour",
      часа: "hour",
      часу: "hour",
      часиков: "hour",
      часика: "hour",
      часике: "hour",
      часик: "hour",
      день: "d",
      дня: "d",
      дней: "d",
      суток: "d",
      сутки: "d",
      неделя: "week",
      неделе: "week",
      недели: "week",
      неделю: "week",
      недель: "week",
      недельке: "week",
      недельки: "week",
      неделек: "week",
      месяц: "month",
      месяце: "month",
      месяцев: "month",
      месяца: "month",
      квартал: "quarter",
      квартале: "quarter",
      кварталов: "quarter",
      год: "year",
      года: "year",
      году: "year",
      годов: "year",
      лет: "year",
      годик: "year",
      годика: "year",
      годиков: "year"
    }, e.NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|пол|несколько|пар(?:ы|у)|\\s{0,3})`;
    function n(a) {
      const o = a.toLowerCase();
      return e.INTEGER_WORD_DICTIONARY[o] !== void 0 ? e.INTEGER_WORD_DICTIONARY[o] : o.match(/несколько/) ? 3 : o.match(/пол/) ? 0.5 : o.match(/пар/) ? 2 : o === "" ? 1 : parseFloat(o);
    }
    e.parseNumberPattern = n, e.ORDINAL_NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:го|ого|е|ое)?)`;
    function f(a) {
      const o = a.toLowerCase();
      return e.ORDINAL_WORD_DICTIONARY[o] !== void 0 ? e.ORDINAL_WORD_DICTIONARY[o] : parseInt(o);
    }
    e.parseOrdinalNumberPattern = f;
    const m = "(?:\\s+(?:году|года|год|г|г.))?";
    e.YEAR_PATTERN = `(?:[1-9][0-9]{0,3}${m}\\s*(?:н.э.|до н.э.|н. э.|до н. э.)|[1-2][0-9]{3}${m}|[5-9][0-9]${m})`;
    function u(a) {
      if (/(год|года|г|г.)/i.test(a) && (a = a.replace(/(год|года|г|г.)/i, "")), /(до н.э.|до н. э.)/i.test(a))
        return a = a.replace(/(до н.э.|до н. э.)/i, ""), -parseInt(a);
      if (/(н. э.|н.э.)/i.test(a))
        return a = a.replace(/(н. э.|н.э.)/i, ""), parseInt(a);
      const o = parseInt(a);
      return _.findMostLikelyADYear(o);
    }
    e.parseYear = u;
    const i = `(${e.NUMBER_PATTERN})\\s{0,3}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})`, s = new RegExp(i, "i");
    e.TIME_UNITS_PATTERN = d.repeatedTimeunitPattern("(?:(?:около|примерно)\\s{0,3})?", i);
    function t(a) {
      const o = {};
      let l = a, c = s.exec(l);
      for (; c; )
        r(o, c), l = l.substring(c[0].length).trim(), c = s.exec(l);
      return o;
    }
    e.parseTimeUnits = t;
    function r(a, o) {
      const l = n(o[1]), c = e.TIME_UNIT_DICTIONARY[o[2].toLowerCase()];
      a[c] = l;
    }
  }(Sn)), Sn;
}
var ms;
function id() {
  if (ms) return nn;
  ms = 1, Object.defineProperty(nn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ le(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = `(?:(?:около|примерно)\\s*(?:~\\s*)?)?(${e.TIME_UNITS_PATTERN})${e.REGEX_PARTS.rightBoundary}`;
  let f = class extends _.AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary() {
      return e.REGEX_PARTS.leftBoundary;
    }
    innerPattern(u) {
      return u.option.forwardDate ? new RegExp(n, e.REGEX_PARTS.flags) : new RegExp(`(?:в течение|в течении)\\s*${n}`, e.REGEX_PARTS.flags);
    }
    innerExtract(u, i) {
      const s = e.parseTimeUnits(i[1]);
      return d.ParsingComponents.createRelativeFromReference(u.reference, s);
    }
  };
  return nn.default = f, nn;
}
var an = {}, Le = {}, _s;
function Ue() {
  if (_s) return Le;
  _s = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.AbstractParserWithLeftRightBoundaryChecking = Le.AbstractParserWithLeftBoundaryChecking = void 0;
  const e = /* @__PURE__ */ W(), d = /* @__PURE__ */ le();
  class _ extends e.AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary() {
      return d.REGEX_PARTS.leftBoundary;
    }
    innerPattern(m) {
      return new RegExp(this.innerPatternString(m), d.REGEX_PARTS.flags);
    }
    innerPatternHasChange(m, u) {
      return !1;
    }
  }
  Le.AbstractParserWithLeftBoundaryChecking = _;
  class n extends _ {
    innerPattern(m) {
      return new RegExp(`${this.innerPatternString(m)}${d.REGEX_PARTS.rightBoundary}`, d.REGEX_PARTS.flags);
    }
  }
  return Le.AbstractParserWithLeftRightBoundaryChecking = n, Le;
}
var Ps;
function sd() {
  if (Ps) return an;
  Ps = 1, Object.defineProperty(an, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ le(), _ = /* @__PURE__ */ le(), n = /* @__PURE__ */ le(), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ Ue(), u = 1, i = 2, s = 3, t = 4;
  let r = class extends m.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(o) {
      return `(?:с)?\\s*(${n.ORDINAL_NUMBER_PATTERN})(?:\\s{0,3}(?:по|-|–|до)?\\s{0,3}(${n.ORDINAL_NUMBER_PATTERN}))?(?:-|\\/|\\s{0,3}(?:of)?\\s{0,3})(${f.matchAnyPattern(d.MONTH_DICTIONARY)})(?:(?:-|\\/|,?\\s{0,3})(${_.YEAR_PATTERN}(?![^\\s]\\d)))?`;
    }
    innerExtract(o, l) {
      const c = o.createParsingResult(l.index, l[0]), g = d.MONTH_DICTIONARY[l[s].toLowerCase()], P = n.parseOrdinalNumberPattern(l[u]);
      if (P > 31)
        return l.index = l.index + l[u].length, null;
      if (c.start.assign("month", g), c.start.assign("day", P), l[t]) {
        const y = _.parseYear(l[t]);
        c.start.assign("year", y);
      } else {
        const y = e.findYearClosestToRef(o.refDate, P, g);
        c.start.imply("year", y);
      }
      if (l[i]) {
        const y = n.parseOrdinalNumberPattern(l[i]);
        c.end = c.start.clone(), c.end.assign("day", y);
      }
      return c;
    }
  };
  return an.default = r, an;
}
var sn = {}, gs;
function ud() {
  if (gs) return sn;
  gs = 1, Object.defineProperty(sn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ le(), d = /* @__PURE__ */ G(), _ = /* @__PURE__ */ F(), n = /* @__PURE__ */ le(), f = /* @__PURE__ */ Ue(), m = 2, u = 3;
  let i = class extends f.AbstractParserWithLeftBoundaryChecking {
    innerPatternString(t) {
      return `((?:в)\\s*)?(${_.matchAnyPattern(e.MONTH_DICTIONARY)})\\s*(?:[,-]?\\s*(${n.YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`;
    }
    innerExtract(t, r) {
      const a = r[m].toLowerCase();
      if (r[0].length <= 3 && !e.FULL_MONTH_NAME_DICTIONARY[a])
        return null;
      const o = t.createParsingResult(r.index, r.index + r[0].length);
      o.start.imply("day", 1);
      const l = e.MONTH_DICTIONARY[a];
      if (o.start.assign("month", l), r[u]) {
        const c = n.parseYear(r[u]);
        o.start.assign("year", c);
      } else {
        const c = d.findYearClosestToRef(t.refDate, 1, l);
        o.start.imply("year", c);
      }
      return o;
    }
  };
  return sn.default = i, sn;
}
var un = {}, ys;
function od() {
  if (ys) return un;
  ys = 1, Object.defineProperty(un, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ B(), d = /* @__PURE__ */ ve(), _ = /* @__PURE__ */ le();
  let n = class extends d.AbstractTimeExpressionParser {
    constructor(m) {
      super(m);
    }
    patternFlags() {
      return _.REGEX_PARTS.flags;
    }
    primaryPatternLeftBoundary() {
      return "(^|\\s|T|(?:[^\\p{L}\\p{N}_]))";
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|до|и|по|\\?)\\s*";
    }
    primaryPrefix() {
      return "(?:(?:в|с)\\s*)??";
    }
    primarySuffix() {
      return `(?:\\s*(?:утра|вечера|после полудня))?(?!\\/)${_.REGEX_PARTS.rightBoundary}`;
    }
    extractPrimaryTimeComponents(m, u) {
      const i = super.extractPrimaryTimeComponents(m, u);
      if (i) {
        if (u[0].endsWith("вечера")) {
          const s = i.get("hour");
          s >= 6 && s < 12 ? (i.assign("hour", i.get("hour") + 12), i.assign("meridiem", e.Meridiem.PM)) : s < 6 && i.assign("meridiem", e.Meridiem.AM);
        }
        if (u[0].endsWith("после полудня")) {
          i.assign("meridiem", e.Meridiem.PM);
          const s = i.get("hour");
          s >= 0 && s <= 6 && i.assign("hour", i.get("hour") + 12);
        }
        u[0].endsWith("утра") && (i.assign("meridiem", e.Meridiem.AM), i.get("hour") < 12 && i.assign("hour", i.get("hour")));
      }
      return i;
    }
  };
  return un.default = n, un;
}
var on = {}, Ts;
function dd() {
  if (Ts) return on;
  Ts = 1, Object.defineProperty(on, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ le(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ X(), n = /* @__PURE__ */ Ue();
  let f = class extends n.AbstractParserWithLeftBoundaryChecking {
    innerPatternString(u) {
      return `(${e.TIME_UNITS_PATTERN})\\s{0,5}назад(?=(?:\\W|$))`;
    }
    innerExtract(u, i) {
      const s = e.parseTimeUnits(i[1]), t = _.reverseTimeUnits(s);
      return d.ParsingComponents.createRelativeFromReference(u.reference, t);
    }
  };
  return on.default = f, on;
}
var Cr = {}, Rs;
function ld() {
  if (Rs) return Cr;
  Rs = 1;
  var e = Cr && Cr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Cr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(и до|и по|до|по|-)\s*$/i;
    }
  };
  return Cr.default = _, Cr;
}
var br = {}, hs;
function fd() {
  if (hs) return br;
  hs = 1;
  var e = br && br.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(br, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(T|в|,|-)?\\s*$");
    }
  };
  return br.default = _, br;
}
var Ee = {}, Es;
function cd() {
  if (Es) return Ee;
  Es = 1;
  var e = Ee && Ee.__createBinding || (Object.create ? function(u, i, s, t) {
    t === void 0 && (t = s), Object.defineProperty(u, t, { enumerable: !0, get: function() {
      return i[s];
    } });
  } : function(u, i, s, t) {
    t === void 0 && (t = s), u[t] = i[s];
  }), d = Ee && Ee.__setModuleDefault || (Object.create ? function(u, i) {
    Object.defineProperty(u, "default", { enumerable: !0, value: i });
  } : function(u, i) {
    u.default = i;
  }), _ = Ee && Ee.__importStar || function(u) {
    if (u && u.__esModule) return u;
    var i = {};
    if (u != null) for (var s in u) s !== "default" && Object.prototype.hasOwnProperty.call(u, s) && e(i, u, s);
    return d(i, u), i;
  };
  Object.defineProperty(Ee, "__esModule", { value: !0 });
  const n = _(/* @__PURE__ */ ce()), f = /* @__PURE__ */ Ue();
  let m = class extends f.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(i) {
      return "(?:с|со)?\\s*(сегодня|вчера|завтра|послезавтра|послепослезавтра|позапозавчера|позавчера)";
    }
    innerExtract(i, s) {
      const t = s[1].toLowerCase(), r = i.createParsingComponents();
      switch (t) {
        case "сегодня":
          return n.today(i.reference);
        case "вчера":
          return n.yesterday(i.reference);
        case "завтра":
          return n.tomorrow(i.reference);
        case "послезавтра":
          return n.theDayAfter(i.reference, 2);
        case "послепослезавтра":
          return n.theDayAfter(i.reference, 3);
        case "позавчера":
          return n.theDayBefore(i.reference, 2);
        case "позапозавчера":
          return n.theDayBefore(i.reference, 3);
      }
      return r;
    }
  };
  return Ee.default = m, Ee;
}
var ue = {}, ps;
function md() {
  if (ps) return ue;
  ps = 1;
  var e = ue && ue.__createBinding || (Object.create ? function(t, r, a, o) {
    o === void 0 && (o = a), Object.defineProperty(t, o, { enumerable: !0, get: function() {
      return r[a];
    } });
  } : function(t, r, a, o) {
    o === void 0 && (o = a), t[o] = r[a];
  }), d = ue && ue.__setModuleDefault || (Object.create ? function(t, r) {
    Object.defineProperty(t, "default", { enumerable: !0, value: r });
  } : function(t, r) {
    t.default = r;
  }), _ = ue && ue.__importStar || function(t) {
    if (t && t.__esModule) return t;
    var r = {};
    if (t != null) for (var a in t) a !== "default" && Object.prototype.hasOwnProperty.call(t, a) && e(r, t, a);
    return d(r, t), r;
  }, n = ue && ue.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(ue, "__esModule", { value: !0 });
  const f = _(/* @__PURE__ */ ce()), m = /* @__PURE__ */ Q(), u = n(k()), i = /* @__PURE__ */ Ue();
  let s = class extends i.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(r) {
      return "(сейчас|прошлым\\s*вечером|прошлой\\s*ночью|следующей\\s*ночью|сегодня\\s*ночью|этой\\s*ночью|ночью|этим утром|утром|утра|в\\s*полдень|вечером|вечера|в\\s*полночь)";
    }
    innerExtract(r, a) {
      let o = u.default(r.refDate);
      const l = a[0].toLowerCase(), c = r.createParsingComponents();
      if (l === "сейчас")
        return f.now(r.reference);
      if (l === "вечером" || l === "вечера")
        return f.evening(r.reference);
      if (l.endsWith("утром") || l.endsWith("утра"))
        return f.morning(r.reference);
      if (l.match(/в\s*полдень/))
        return f.noon(r.reference);
      if (l.match(/прошлой\s*ночью/))
        return f.lastNight(r.reference);
      if (l.match(/прошлым\s*вечером/))
        return f.yesterdayEvening(r.reference);
      if (l.match(/следующей\s*ночью/)) {
        const g = o.hour() < 22 ? 1 : 2;
        o = o.add(g, "day"), m.assignSimilarDate(c, o), c.imply("hour", 0);
      }
      return l.match(/в\s*полночь/) || l.endsWith("ночью") ? f.midnight(r.reference) : c;
    }
  };
  return ue.default = s, ue;
}
var dn = {}, Ms;
function _d() {
  if (Ms) return dn;
  Ms = 1, Object.defineProperty(dn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ le(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ Ie(), n = /* @__PURE__ */ Ue(), f = 1, m = 2, u = 3;
  let i = class extends n.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(t) {
      return `(?:(?:,|\\(|（)\\s*)?(?:в\\s*?)?(?:(эту|этот|прошлый|прошлую|следующий|следующую|следующего)\\s*)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)})(?:\\s*(?:,|\\)|）))?(?:\\s*на\\s*(этой|прошлой|следующей)\\s*неделе)?`;
    }
    innerExtract(t, r) {
      const a = r[m].toLowerCase(), o = e.WEEKDAY_DICTIONARY[a], l = r[f], c = r[u];
      let g = l || c;
      g = g || "", g = g.toLowerCase();
      let P = null;
      return g == "прошлый" || g == "прошлую" || g == "прошлой" ? P = "last" : g == "следующий" || g == "следующую" || g == "следующей" || g == "следующего" ? P = "next" : (g == "этот" || g == "эту" || g == "этой") && (P = "this"), _.createParsingComponentsAtWeekday(t.reference, o, P);
    }
  };
  return dn.default = i, dn;
}
var vr = {}, Ns;
function Pd() {
  if (Ns) return vr;
  Ns = 1;
  var e = vr && vr.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(vr, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ le(), _ = /* @__PURE__ */ $(), n = e(k()), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ Ue(), u = 1, i = 2;
  let s = class extends m.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(r) {
      return `(в прошлом|на прошлой|на следующей|в следующем|на этой|в этом)\\s*(${f.matchAnyPattern(d.TIME_UNIT_DICTIONARY)})`;
    }
    innerExtract(r, a) {
      const o = a[u].toLowerCase(), l = a[i].toLowerCase(), c = d.TIME_UNIT_DICTIONARY[l];
      if (o == "на следующей" || o == "в следующем") {
        const y = {};
        return y[c] = 1, _.ParsingComponents.createRelativeFromReference(r.reference, y);
      }
      if (o == "в прошлом" || o == "на прошлой") {
        const y = {};
        return y[c] = -1, _.ParsingComponents.createRelativeFromReference(r.reference, y);
      }
      const g = r.createParsingComponents();
      let P = n.default(r.reference.instant);
      return c.match(/week/i) ? (P = P.add(-P.get("d"), "d"), g.imply("day", P.date()), g.imply("month", P.month() + 1), g.imply("year", P.year())) : c.match(/month/i) ? (P = P.add(-P.date() + 1, "d"), g.imply("day", P.date()), g.assign("year", P.year()), g.assign("month", P.month() + 1)) : c.match(/year/i) && (P = P.add(-P.date() + 1, "d"), P = P.add(-P.month(), "month"), g.imply("day", P.date()), g.imply("month", P.month() + 1), g.assign("year", P.year())), g;
    }
  };
  return vr.default = s, vr;
}
var ln = {}, Ds;
function gd() {
  if (Ds) return ln;
  Ds = 1, Object.defineProperty(ln, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ le(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ X(), n = /* @__PURE__ */ Ue();
  let f = class extends n.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(u) {
      return `(эти|последние|прошлые|следующие|после|спустя|через|\\+|-)\\s*(${e.TIME_UNITS_PATTERN})`;
    }
    innerExtract(u, i) {
      const s = i[1].toLowerCase();
      let t = e.parseTimeUnits(i[2]);
      switch (s) {
        case "последние":
        case "прошлые":
        case "-":
          t = _.reverseTimeUnits(t);
          break;
      }
      return d.ParsingComponents.createRelativeFromReference(u.reference, t);
    }
  };
  return ln.default = f, ln;
}
var As;
function yd() {
  return As || (As = 1, function(e) {
    var d = Qr && Qr.__importDefault || function(A) {
      return A && A.__esModule ? A : { default: A };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = d(/* @__PURE__ */ id()), n = d(/* @__PURE__ */ sd()), f = d(/* @__PURE__ */ ud()), m = d(/* @__PURE__ */ od()), u = d(/* @__PURE__ */ dd()), i = d(/* @__PURE__ */ ld()), s = d(/* @__PURE__ */ fd()), t = /* @__PURE__ */ ye(), r = d(/* @__PURE__ */ cd()), a = d(/* @__PURE__ */ md()), o = d(/* @__PURE__ */ _d()), l = d(/* @__PURE__ */ Pd()), c = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return c.Chrono;
    } });
    const g = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return g.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return g.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return g.ReferenceWithTimezone;
    } });
    const P = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return P.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return P.Weekday;
    } });
    const y = d(/* @__PURE__ */ We()), T = d(/* @__PURE__ */ gd());
    e.casual = new c.Chrono(E()), e.strict = new c.Chrono(p(!0));
    function h(A, N, b) {
      return e.casual.parse(A, N, b);
    }
    e.parse = h;
    function R(A, N, b) {
      return e.casual.parseDate(A, N, b);
    }
    e.parseDate = R;
    function E() {
      const A = p(!1);
      return A.parsers.unshift(new r.default()), A.parsers.unshift(new a.default()), A.parsers.unshift(new f.default()), A.parsers.unshift(new l.default()), A.parsers.unshift(new T.default()), A;
    }
    e.createCasualConfiguration = E;
    function p(A = !0) {
      return t.includeCommonConfiguration({
        parsers: [
          new y.default(!0),
          new _.default(),
          new n.default(),
          new o.default(),
          new m.default(A),
          new u.default()
        ],
        refiners: [new s.default(), new i.default()]
      }, A);
    }
    e.createConfiguration = p;
  }(Qr)), Qr;
}
var et = {}, fn = {}, jn = {}, Os;
function Nn() {
  return Os || (Os = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTimeUnits = e.TIME_UNITS_PATTERN = e.parseYear = e.YEAR_PATTERN = e.parseNumberPattern = e.NUMBER_PATTERN = e.TIME_UNIT_DICTIONARY = e.INTEGER_WORD_DICTIONARY = e.MONTH_DICTIONARY = e.WEEKDAY_DICTIONARY = void 0;
    const d = /* @__PURE__ */ F();
    e.WEEKDAY_DICTIONARY = {
      domingo: 0,
      dom: 0,
      lunes: 1,
      lun: 1,
      martes: 2,
      mar: 2,
      miércoles: 3,
      miercoles: 3,
      mié: 3,
      mie: 3,
      jueves: 4,
      jue: 4,
      viernes: 5,
      vie: 5,
      sábado: 6,
      sabado: 6,
      sáb: 6,
      sab: 6
    }, e.MONTH_DICTIONARY = {
      enero: 1,
      ene: 1,
      "ene.": 1,
      febrero: 2,
      feb: 2,
      "feb.": 2,
      marzo: 3,
      mar: 3,
      "mar.": 3,
      abril: 4,
      abr: 4,
      "abr.": 4,
      mayo: 5,
      may: 5,
      "may.": 5,
      junio: 6,
      jun: 6,
      "jun.": 6,
      julio: 7,
      jul: 7,
      "jul.": 7,
      agosto: 8,
      ago: 8,
      "ago.": 8,
      septiembre: 9,
      setiembre: 9,
      sep: 9,
      "sep.": 9,
      octubre: 10,
      oct: 10,
      "oct.": 10,
      noviembre: 11,
      nov: 11,
      "nov.": 11,
      diciembre: 12,
      dic: 12,
      "dic.": 12
    }, e.INTEGER_WORD_DICTIONARY = {
      uno: 1,
      dos: 2,
      tres: 3,
      cuatro: 4,
      cinco: 5,
      seis: 6,
      siete: 7,
      ocho: 8,
      nueve: 9,
      diez: 10,
      once: 11,
      doce: 12,
      trece: 13
    }, e.TIME_UNIT_DICTIONARY = {
      sec: "second",
      segundo: "second",
      segundos: "second",
      min: "minute",
      mins: "minute",
      minuto: "minute",
      minutos: "minute",
      h: "hour",
      hr: "hour",
      hrs: "hour",
      hora: "hour",
      horas: "hour",
      día: "d",
      días: "d",
      semana: "week",
      semanas: "week",
      mes: "month",
      meses: "month",
      cuarto: "quarter",
      cuartos: "quarter",
      año: "year",
      años: "year"
    }, e.NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|un?|uno?|una?|algunos?|unos?|demi-?)`;
    function _(s) {
      const t = s.toLowerCase();
      return e.INTEGER_WORD_DICTIONARY[t] !== void 0 ? e.INTEGER_WORD_DICTIONARY[t] : t === "un" || t === "una" || t === "uno" ? 1 : t.match(/algunos?/) || t.match(/unos?/) ? 3 : t.match(/media?/) ? 0.5 : parseFloat(t);
    }
    e.parseNumberPattern = _, e.YEAR_PATTERN = "[0-9]{1,4}(?![^\\s]\\d)(?:\\s*[a|d]\\.?\\s*c\\.?|\\s*a\\.?\\s*d\\.?)?";
    function n(s) {
      if (s.match(/^[0-9]{1,4}$/)) {
        let t = parseInt(s);
        return t < 100 && (t > 50 ? t = t + 1900 : t = t + 2e3), t;
      }
      return s.match(/a\.?\s*c\.?/i) ? (s = s.replace(/a\.?\s*c\.?/i, ""), -parseInt(s)) : parseInt(s);
    }
    e.parseYear = n;
    const f = `(${e.NUMBER_PATTERN})\\s{0,5}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})\\s{0,5}`, m = new RegExp(f, "i");
    e.TIME_UNITS_PATTERN = d.repeatedTimeunitPattern("", f);
    function u(s) {
      const t = {};
      let r = s, a = m.exec(r);
      for (; a; )
        i(t, a), r = r.substring(a[0].length), a = m.exec(r);
      return t;
    }
    e.parseTimeUnits = u;
    function i(s, t) {
      const r = _(t[1]), a = e.TIME_UNIT_DICTIONARY[t[2].toLowerCase()];
      s[a] = r;
    }
  }(jn)), jn;
}
var Cs;
function Td() {
  if (Cs) return fn;
  Cs = 1, Object.defineProperty(fn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Nn(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Ie(), f = new RegExp(`(?:(?:\\,|\\(|\\（)\\s*)?(?:(este|esta|pasado|pr[oó]ximo)\\s*)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)})(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(este|esta|pasado|pr[óo]ximo)\\s*semana)?(?=\\W|\\d|$)`, "i"), m = 1, u = 2, i = 3;
  let s = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return f;
    }
    innerExtract(r, a) {
      const o = a[u].toLowerCase(), l = e.WEEKDAY_DICTIONARY[o];
      if (l === void 0)
        return null;
      const c = a[m], g = a[i];
      let P = c || g || "";
      P = P.toLowerCase();
      let y = null;
      return P == "pasado" ? y = "this" : P == "próximo" || P == "proximo" ? y = "next" : P == "este" && (y = "this"), n.createParsingComponentsAtWeekday(r.reference, l, y);
    }
  };
  return fn.default = s, fn;
}
var cn = {}, bs;
function Rd() {
  if (bs) return cn;
  bs = 1, Object.defineProperty(cn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ve();
  let d = class extends e.AbstractTimeExpressionParser {
    primaryPrefix() {
      return "(?:(?:aslas|deslas|las?|al?|de|del)\\s*)?";
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|a(?:l)?|\\?)\\s*";
    }
  };
  return cn.default = d, cn;
}
var Ir = {}, vs;
function hd() {
  if (vs) return Ir;
  vs = 1;
  var e = Ir && Ir.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Ir, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(?:,|de|aslas|a)?\\s*$");
    }
  };
  return Ir.default = _, Ir;
}
var Wr = {}, Is;
function Ed() {
  if (Is) return Wr;
  Is = 1;
  var e = Wr && Wr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Wr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(?:-)\s*$/i;
    }
  };
  return Wr.default = _, Wr;
}
var mn = {}, Ws;
function pd() {
  if (Ws) return mn;
  Ws = 1, Object.defineProperty(mn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ Nn(), _ = /* @__PURE__ */ Nn(), n = /* @__PURE__ */ F(), f = /* @__PURE__ */ W(), m = new RegExp(`([0-9]{1,2})(?:º|ª|°)?(?:\\s*(?:desde|de|\\-|\\–|ao?|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*(?:-|/|\\s*(?:de|,)?\\s*)(${n.matchAnyPattern(d.MONTH_DICTIONARY)})(?:\\s*(?:de|,)?\\s*(${_.YEAR_PATTERN}))?(?=\\W|$)`, "i"), u = 1, i = 2, s = 3, t = 4;
  let r = class extends f.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return m;
    }
    innerExtract(o, l) {
      const c = o.createParsingResult(l.index, l[0]), g = d.MONTH_DICTIONARY[l[s].toLowerCase()], P = parseInt(l[u]);
      if (P > 31)
        return l.index = l.index + l[u].length, null;
      if (c.start.assign("month", g), c.start.assign("day", P), l[t]) {
        const y = _.parseYear(l[t]);
        c.start.assign("year", y);
      } else {
        const y = e.findYearClosestToRef(o.refDate, P, g);
        c.start.imply("year", y);
      }
      if (l[i]) {
        const y = parseInt(l[i]);
        c.end = c.start.clone(), c.end.assign("day", y);
      }
      return c;
    }
  };
  return mn.default = r, mn;
}
var pe = {}, Us;
function Md() {
  if (Us) return pe;
  Us = 1;
  var e = pe && pe.__createBinding || (Object.create ? function(u, i, s, t) {
    t === void 0 && (t = s), Object.defineProperty(u, t, { enumerable: !0, get: function() {
      return i[s];
    } });
  } : function(u, i, s, t) {
    t === void 0 && (t = s), u[t] = i[s];
  }), d = pe && pe.__setModuleDefault || (Object.create ? function(u, i) {
    Object.defineProperty(u, "default", { enumerable: !0, value: i });
  } : function(u, i) {
    u.default = i;
  }), _ = pe && pe.__importStar || function(u) {
    if (u && u.__esModule) return u;
    var i = {};
    if (u != null) for (var s in u) s !== "default" && Object.prototype.hasOwnProperty.call(u, s) && e(i, u, s);
    return d(i, u), i;
  };
  Object.defineProperty(pe, "__esModule", { value: !0 });
  const n = /* @__PURE__ */ W(), f = _(/* @__PURE__ */ ce());
  let m = class extends n.AbstractParserWithWordBoundaryChecking {
    innerPattern(i) {
      return /(ahora|hoy|mañana|ayer)(?=\W|$)/i;
    }
    innerExtract(i, s) {
      const t = s[0].toLowerCase(), r = i.createParsingComponents();
      switch (t) {
        case "ahora":
          return f.now(i.reference);
        case "hoy":
          return f.today(i.reference);
        case "mañana":
          return f.tomorrow(i.reference);
        case "ayer":
          return f.yesterday(i.reference);
      }
      return r;
    }
  };
  return pe.default = m, pe;
}
var Ur = {}, ws;
function Nd() {
  if (ws) return Ur;
  ws = 1;
  var e = Ur && Ur.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(Ur, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ B(), _ = /* @__PURE__ */ W(), n = /* @__PURE__ */ Q(), f = e(k());
  let m = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return /(?:esta\s*)?(mañana|tarde|medianoche|mediodia|mediodía|noche)(?=\W|$)/i;
    }
    innerExtract(i, s) {
      const t = f.default(i.refDate), r = i.createParsingComponents();
      switch (s[1].toLowerCase()) {
        case "tarde":
          r.imply("meridiem", d.Meridiem.PM), r.imply("hour", 15);
          break;
        case "noche":
          r.imply("meridiem", d.Meridiem.PM), r.imply("hour", 22);
          break;
        case "mañana":
          r.imply("meridiem", d.Meridiem.AM), r.imply("hour", 6);
          break;
        case "medianoche":
          n.assignTheNextDay(r, t), r.imply("hour", 0), r.imply("minute", 0), r.imply("second", 0);
          break;
        case "mediodia":
        case "mediodía":
          r.imply("meridiem", d.Meridiem.AM), r.imply("hour", 12);
          break;
      }
      return r;
    }
  };
  return Ur.default = m, Ur;
}
var _n = {}, Ss;
function Dd() {
  if (Ss) return _n;
  Ss = 1, Object.defineProperty(_n, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Nn(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W();
  let n = class extends _.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
      return new RegExp(`(?:en|por|durante|de|dentro de)\\s*(${e.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    }
    innerExtract(m, u) {
      const i = e.parseTimeUnits(u[1]);
      return d.ParsingComponents.createRelativeFromReference(m.reference, i);
    }
  };
  return _n.default = n, _n;
}
var js;
function Ad() {
  return js || (js = 1, function(e) {
    var d = et && et.__importDefault || function(h) {
      return h && h.__esModule ? h : { default: h };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createConfiguration = e.createCasualConfiguration = e.parseDate = e.parse = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = /* @__PURE__ */ ye(), n = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return n.Chrono;
    } });
    const f = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return f.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return f.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return f.ReferenceWithTimezone;
    } });
    const m = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return m.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return m.Weekday;
    } });
    const u = d(/* @__PURE__ */ We()), i = d(/* @__PURE__ */ Td()), s = d(/* @__PURE__ */ Rd()), t = d(/* @__PURE__ */ hd()), r = d(/* @__PURE__ */ Ed()), a = d(/* @__PURE__ */ pd()), o = d(/* @__PURE__ */ Md()), l = d(/* @__PURE__ */ Nd()), c = d(/* @__PURE__ */ Dd());
    e.casual = new n.Chrono(y()), e.strict = new n.Chrono(T(!0));
    function g(h, R, E) {
      return e.casual.parse(h, R, E);
    }
    e.parse = g;
    function P(h, R, E) {
      return e.casual.parseDate(h, R, E);
    }
    e.parseDate = P;
    function y(h = !0) {
      const R = T(!1, h);
      return R.parsers.push(new o.default()), R.parsers.push(new l.default()), R;
    }
    e.createCasualConfiguration = y;
    function T(h = !0, R = !0) {
      return _.includeCommonConfiguration({
        parsers: [
          new u.default(R),
          new i.default(),
          new s.default(),
          new a.default(),
          new c.default()
        ],
        refiners: [new t.default(), new r.default()]
      }, h);
    }
    e.createConfiguration = T;
  }(et)), et;
}
var rt = {}, Pn = {}, $n = {}, $s;
function fe() {
  return $s || ($s = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTimeUnits = e.TIME_UNITS_PATTERN = e.parseYearPattern = e.YEAR_PATTERN = e.parseOrdinalNumberPattern = e.ORDINAL_NUMBER_PATTERN = e.parseNumberPattern = e.NUMBER_PATTERN = e.TIME_UNIT_DICTIONARY = e.ORDINAL_WORD_DICTIONARY = e.INTEGER_WORD_DICTIONARY = e.MONTH_DICTIONARY = e.FULL_MONTH_NAME_DICTIONARY = e.WEEKDAY_DICTIONARY = e.REGEX_PARTS = void 0;
    const d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ G();
    e.REGEX_PARTS = {
      leftBoundary: "([^\\p{L}\\p{N}_]|^)",
      rightBoundary: "(?=[^\\p{L}\\p{N}_]|$)",
      flags: "iu"
    }, e.WEEKDAY_DICTIONARY = {
      неділя: 0,
      неділі: 0,
      неділю: 0,
      нд: 0,
      "нд.": 0,
      понеділок: 1,
      понеділка: 1,
      пн: 1,
      "пн.": 1,
      вівторок: 2,
      вівторка: 2,
      вт: 2,
      "вт.": 2,
      середа: 3,
      середи: 3,
      середу: 3,
      ср: 3,
      "ср.": 3,
      четвер: 4,
      четверга: 4,
      четвергу: 4,
      чт: 4,
      "чт.": 4,
      "п'ятниця": 5,
      "п'ятниці": 5,
      "п'ятницю": 5,
      пт: 5,
      "пт.": 5,
      субота: 6,
      суботи: 6,
      суботу: 6,
      сб: 6,
      "сб.": 6
    }, e.FULL_MONTH_NAME_DICTIONARY = {
      січень: 1,
      січня: 1,
      січні: 1,
      лютий: 2,
      лютого: 2,
      лютому: 2,
      березень: 3,
      березня: 3,
      березні: 3,
      квітень: 4,
      квітня: 4,
      квітні: 4,
      травень: 5,
      травня: 5,
      травні: 5,
      червень: 6,
      червня: 6,
      червні: 6,
      липень: 7,
      липня: 7,
      липні: 7,
      серпень: 8,
      серпня: 8,
      серпні: 8,
      вересень: 9,
      вересня: 9,
      вересні: 9,
      жовтень: 10,
      жовтня: 10,
      жовтні: 10,
      листопад: 11,
      листопада: 11,
      листопаду: 11,
      грудень: 12,
      грудня: 12,
      грудні: 12
    }, e.MONTH_DICTIONARY = Object.assign(Object.assign({}, e.FULL_MONTH_NAME_DICTIONARY), { січ: 1, "січ.": 1, лют: 2, "лют.": 2, бер: 3, "бер.": 3, квіт: 4, "квіт.": 4, трав: 5, "трав.": 5, черв: 6, "черв.": 6, лип: 7, "лип.": 7, серп: 8, "серп.": 8, сер: 8, "cер.": 8, вер: 9, "вер.": 9, верес: 9, "верес.": 9, жовт: 10, "жовт.": 10, листоп: 11, "листоп.": 11, груд: 12, "груд.": 12 }), e.INTEGER_WORD_DICTIONARY = {
      один: 1,
      одна: 1,
      одної: 1,
      одну: 1,
      дві: 2,
      два: 2,
      двох: 2,
      три: 3,
      трьох: 3,
      чотири: 4,
      чотирьох: 4,
      "п'ять": 5,
      "п'яти": 5,
      шість: 6,
      шести: 6,
      сім: 7,
      семи: 7,
      вісім: 8,
      восьми: 8,
      "дев'ять": 9,
      "дев'яти": 9,
      десять: 10,
      десяти: 10,
      одинадцять: 11,
      одинадцяти: 11,
      дванадцять: 12,
      дванадцяти: 12
    }, e.ORDINAL_WORD_DICTIONARY = {
      перше: 1,
      першого: 1,
      друге: 2,
      другого: 2,
      третє: 3,
      третього: 3,
      четверте: 4,
      четвертого: 4,
      "п'яте": 5,
      "п'ятого": 5,
      шосте: 6,
      шостого: 6,
      сьоме: 7,
      сьомого: 7,
      восьме: 8,
      восьмого: 8,
      "дев'яте": 9,
      "дев'ятого": 9,
      десяте: 10,
      десятого: 10,
      одинадцяте: 11,
      одинадцятого: 11,
      дванадцяте: 12,
      дванадцятого: 12,
      тринадцяте: 13,
      тринадцятого: 13,
      чотирнадцяте: 14,
      чотинрнадцятого: 14,
      "п'ятнадцяте": 15,
      "п'ятнадцятого": 15,
      шістнадцяте: 16,
      шістнадцятого: 16,
      сімнадцяте: 17,
      сімнадцятого: 17,
      вісімнадцяте: 18,
      вісімнадцятого: 18,
      "дев'ятнадцяте": 19,
      "дев'ятнадцятого": 19,
      двадцяте: 20,
      двадцятого: 20,
      "двадцять перше": 21,
      "двадцять першого": 21,
      "двадцять друге": 22,
      "двадцять другого": 22,
      "двадцять третє": 23,
      "двадцять третього": 23,
      "двадцять четверте": 24,
      "двадцять четвертого": 24,
      "двадцять п'яте": 25,
      "двадцять п'ятого": 25,
      "двадцять шосте": 26,
      "двадцять шостого": 26,
      "двадцять сьоме": 27,
      "двадцять сьомого": 27,
      "двадцять восьме": 28,
      "двадцять восьмого": 28,
      "двадцять дев'яте": 29,
      "двадцять дев'ятого": 29,
      тридцяте: 30,
      тридцятого: 30,
      "тридцять перше": 31,
      "тридцять першого": 31
    }, e.TIME_UNIT_DICTIONARY = {
      сек: "second",
      секунда: "second",
      секунд: "second",
      секунди: "second",
      секунду: "second",
      секундочок: "second",
      секундочки: "second",
      секундочку: "second",
      хв: "minute",
      хвилина: "minute",
      хвилин: "minute",
      хвилини: "minute",
      хвилину: "minute",
      хвилинок: "minute",
      хвилинки: "minute",
      хвилинку: "minute",
      хвилиночок: "minute",
      хвилиночки: "minute",
      хвилиночку: "minute",
      год: "hour",
      година: "hour",
      годин: "hour",
      години: "hour",
      годину: "hour",
      годинка: "hour",
      годинок: "hour",
      годинки: "hour",
      годинку: "hour",
      день: "d",
      дня: "d",
      днів: "d",
      дні: "d",
      доба: "d",
      добу: "d",
      тиждень: "week",
      тижню: "week",
      тижня: "week",
      тижні: "week",
      тижнів: "week",
      місяць: "month",
      місяців: "month",
      місяці: "month",
      місяця: "month",
      квартал: "quarter",
      кварталу: "quarter",
      квартала: "quarter",
      кварталів: "quarter",
      кварталі: "quarter",
      рік: "year",
      року: "year",
      році: "year",
      років: "year",
      роки: "year"
    }, e.NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|пів|декілька|пар(?:у)|\\s{0,3})`;
    function n(a) {
      const o = a.toLowerCase();
      return e.INTEGER_WORD_DICTIONARY[o] !== void 0 ? e.INTEGER_WORD_DICTIONARY[o] : o.match(/декілька/) ? 2 : o.match(/пів/) ? 0.5 : o.match(/пар/) ? 2 : o === "" ? 1 : parseFloat(o);
    }
    e.parseNumberPattern = n, e.ORDINAL_NUMBER_PATTERN = `(?:${d.matchAnyPattern(e.ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:го|ого|е)?)`;
    function f(a) {
      const o = a.toLowerCase();
      return e.ORDINAL_WORD_DICTIONARY[o] !== void 0 ? e.ORDINAL_WORD_DICTIONARY[o] : parseInt(o);
    }
    e.parseOrdinalNumberPattern = f;
    const m = "(?:\\s+(?:року|рік|р|р.))?";
    e.YEAR_PATTERN = `(?:[1-9][0-9]{0,3}${m}\\s*(?:н.е.|до н.е.|н. е.|до н. е.)|[1-2][0-9]{3}${m}|[5-9][0-9]${m})`;
    function u(a) {
      if (/(рік|року|р|р.)/i.test(a) && (a = a.replace(/(рік|року|р|р.)/i, "")), /(до н.е.|до н. е.)/i.test(a))
        return a = a.replace(/(до н.е.|до н. е.)/i, ""), -parseInt(a);
      if (/(н. е.|н.е.)/i.test(a))
        return a = a.replace(/(н. е.|н.е.)/i, ""), parseInt(a);
      const o = parseInt(a);
      return _.findMostLikelyADYear(o);
    }
    e.parseYearPattern = u;
    const i = `(${e.NUMBER_PATTERN})\\s{0,3}(${d.matchAnyPattern(e.TIME_UNIT_DICTIONARY)})`, s = new RegExp(i, "i");
    e.TIME_UNITS_PATTERN = d.repeatedTimeunitPattern("(?:(?:близько|приблизно)\\s{0,3})?", i);
    function t(a) {
      const o = {};
      let l = a, c = s.exec(l);
      for (; c; )
        r(o, c), l = l.substring(c[0].length).trim(), c = s.exec(l);
      return o;
    }
    e.parseTimeUnits = t;
    function r(a, o) {
      const l = n(o[1]), c = e.TIME_UNIT_DICTIONARY[o[2].toLowerCase()];
      a[c] = l;
    }
  }($n)), $n;
}
var Fs;
function Od() {
  if (Fs) return Pn;
  Fs = 1, Object.defineProperty(Pn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ fe(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ W(), n = `(?:(?:приблизно|орієнтовно)\\s*(?:~\\s*)?)?(${e.TIME_UNITS_PATTERN})${e.REGEX_PARTS.rightBoundary}`;
  let f = class extends _.AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary() {
      return e.REGEX_PARTS.leftBoundary;
    }
    innerPattern(u) {
      return u.option.forwardDate ? new RegExp(n, "i") : new RegExp(`(?:протягом|на протязі|протягом|упродовж|впродовж)\\s*${n}`, e.REGEX_PARTS.flags);
    }
    innerExtract(u, i) {
      const s = e.parseTimeUnits(i[1]);
      return d.ParsingComponents.createRelativeFromReference(u.reference, s);
    }
  };
  return Pn.default = f, Pn;
}
var gn = {}, qe = {}, Ys;
function we() {
  if (Ys) return qe;
  Ys = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.AbstractParserWithLeftRightBoundaryChecking = qe.AbstractParserWithLeftBoundaryChecking = void 0;
  const e = /* @__PURE__ */ W(), d = /* @__PURE__ */ fe();
  class _ extends e.AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary() {
      return d.REGEX_PARTS.leftBoundary;
    }
    innerPattern(m) {
      return new RegExp(this.innerPatternString(m), d.REGEX_PARTS.flags);
    }
    innerPatternHasChange(m, u) {
      return !1;
    }
  }
  qe.AbstractParserWithLeftBoundaryChecking = _;
  class n extends _ {
    innerPattern(m) {
      return new RegExp(`${this.innerPatternString(m)}${d.REGEX_PARTS.rightBoundary}`, d.REGEX_PARTS.flags);
    }
  }
  return qe.AbstractParserWithLeftRightBoundaryChecking = n, qe;
}
var ks;
function Cd() {
  if (ks) return gn;
  ks = 1, Object.defineProperty(gn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ G(), d = /* @__PURE__ */ fe(), _ = /* @__PURE__ */ fe(), n = /* @__PURE__ */ fe(), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ we(), u = 1, i = 2, s = 3, t = 4;
  let r = class extends m.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(o) {
      return `(?:з|із)?\\s*(${n.ORDINAL_NUMBER_PATTERN})(?:\\s{0,3}(?:по|-|–|до)?\\s{0,3}(${n.ORDINAL_NUMBER_PATTERN}))?(?:-|\\/|\\s{0,3}(?:of)?\\s{0,3})(${f.matchAnyPattern(d.MONTH_DICTIONARY)})(?:(?:-|\\/|,?\\s{0,3})(${_.YEAR_PATTERN}(?![^\\s]\\d)))?`;
    }
    innerExtract(o, l) {
      const c = o.createParsingResult(l.index, l[0]), g = d.MONTH_DICTIONARY[l[s].toLowerCase()], P = n.parseOrdinalNumberPattern(l[u]);
      if (P > 31)
        return l.index = l.index + l[u].length, null;
      if (c.start.assign("month", g), c.start.assign("day", P), l[t]) {
        const y = _.parseYearPattern(l[t]);
        c.start.assign("year", y);
      } else {
        const y = e.findYearClosestToRef(o.reference.instant, P, g);
        c.start.imply("year", y);
      }
      if (l[i]) {
        const y = n.parseOrdinalNumberPattern(l[i]);
        c.end = c.start.clone(), c.end.assign("day", y);
      }
      return c;
    }
  };
  return gn.default = r, gn;
}
var yn = {}, Bs;
function bd() {
  if (Bs) return yn;
  Bs = 1, Object.defineProperty(yn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ fe(), d = /* @__PURE__ */ G(), _ = /* @__PURE__ */ F(), n = /* @__PURE__ */ fe(), f = /* @__PURE__ */ we(), m = 2, u = 3;
  class i extends f.AbstractParserWithLeftBoundaryChecking {
    innerPatternString(t) {
      return `((?:в|у)\\s*)?(${_.matchAnyPattern(e.MONTH_DICTIONARY)})\\s*(?:[,-]?\\s*(${n.YEAR_PATTERN})?)?(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`;
    }
    innerExtract(t, r) {
      const a = r[m].toLowerCase();
      if (r[0].length <= 3 && !e.FULL_MONTH_NAME_DICTIONARY[a])
        return null;
      const o = t.createParsingResult(r.index, r.index + r[0].length);
      o.start.imply("day", 1);
      const l = e.MONTH_DICTIONARY[a];
      if (o.start.assign("month", l), r[u]) {
        const c = n.parseYearPattern(r[u]);
        o.start.assign("year", c);
      } else {
        const c = d.findYearClosestToRef(t.reference.instant, 1, l);
        o.start.imply("year", c);
      }
      return o;
    }
  }
  return yn.default = i, yn;
}
var Tn = {}, Ls;
function vd() {
  if (Ls) return Tn;
  Ls = 1, Object.defineProperty(Tn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ B(), d = /* @__PURE__ */ ve(), _ = /* @__PURE__ */ fe();
  let n = class extends d.AbstractTimeExpressionParser {
    constructor(m) {
      super(m);
    }
    patternFlags() {
      return _.REGEX_PARTS.flags;
    }
    primaryPatternLeftBoundary() {
      return "(^|\\s|T|(?:[^\\p{L}\\p{N}_]))";
    }
    followingPhase() {
      return "\\s*(?:\\-|\\–|\\~|\\〜|до|і|по|\\?)\\s*";
    }
    primaryPrefix() {
      return "(?:(?:в|у|о|об|з|із|від)\\s*)??";
    }
    primarySuffix() {
      return `(?:\\s*(?:ранку|вечора|по обіді|після обіду))?(?!\\/)${_.REGEX_PARTS.rightBoundary}`;
    }
    extractPrimaryTimeComponents(m, u) {
      const i = super.extractPrimaryTimeComponents(m, u);
      if (i) {
        if (u[0].endsWith("вечора")) {
          const s = i.get("hour");
          s >= 6 && s < 12 ? (i.assign("hour", i.get("hour") + 12), i.assign("meridiem", e.Meridiem.PM)) : s < 6 && i.assign("meridiem", e.Meridiem.AM);
        }
        if (u[0].endsWith("по обіді") || u[0].endsWith("після обіду")) {
          i.assign("meridiem", e.Meridiem.PM);
          const s = i.get("hour");
          s >= 0 && s <= 6 && i.assign("hour", i.get("hour") + 12);
        }
        u[0].endsWith("ранку") && (i.assign("meridiem", e.Meridiem.AM), i.get("hour") < 12 && i.assign("hour", i.get("hour")));
      }
      return i;
    }
  };
  return Tn.default = n, Tn;
}
var Rn = {}, qs;
function Id() {
  if (qs) return Rn;
  qs = 1, Object.defineProperty(Rn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ fe(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ X(), n = /* @__PURE__ */ we();
  let f = class extends n.AbstractParserWithLeftBoundaryChecking {
    innerPatternString(u) {
      return `(${e.TIME_UNITS_PATTERN})\\s{0,5}тому(?=(?:\\W|$))`;
    }
    innerExtract(u, i) {
      const s = e.parseTimeUnits(i[1]), t = _.reverseTimeUnits(s);
      return d.ParsingComponents.createRelativeFromReference(u.reference, t);
    }
  };
  return Rn.default = f, Rn;
}
var wr = {}, Hs;
function Wd() {
  if (Hs) return wr;
  Hs = 1;
  var e = wr && wr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(wr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ ge());
  let _ = class extends d.default {
    patternBetween() {
      return /^\s*(і до|і по|до|по|-)\s*$/i;
    }
  };
  return wr.default = _, wr;
}
var Sr = {}, Gs;
function Ud() {
  if (Gs) return Sr;
  Gs = 1;
  var e = Sr && Sr.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Sr, "__esModule", { value: !0 });
  const d = e(/* @__PURE__ */ Ne());
  let _ = class extends d.default {
    patternBetween() {
      return new RegExp("^\\s*(T|в|у|о|,|-)?\\s*$");
    }
  };
  return Sr.default = _, Sr;
}
var Me = {}, zs;
function wd() {
  if (zs) return Me;
  zs = 1;
  var e = Me && Me.__createBinding || (Object.create ? function(u, i, s, t) {
    t === void 0 && (t = s), Object.defineProperty(u, t, { enumerable: !0, get: function() {
      return i[s];
    } });
  } : function(u, i, s, t) {
    t === void 0 && (t = s), u[t] = i[s];
  }), d = Me && Me.__setModuleDefault || (Object.create ? function(u, i) {
    Object.defineProperty(u, "default", { enumerable: !0, value: i });
  } : function(u, i) {
    u.default = i;
  }), _ = Me && Me.__importStar || function(u) {
    if (u && u.__esModule) return u;
    var i = {};
    if (u != null) for (var s in u) s !== "default" && Object.prototype.hasOwnProperty.call(u, s) && e(i, u, s);
    return d(i, u), i;
  };
  Object.defineProperty(Me, "__esModule", { value: !0 });
  const n = _(/* @__PURE__ */ ce()), f = /* @__PURE__ */ we();
  let m = class extends f.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(i) {
      return "(?:з|із|від)?\\s*(сьогодні|вчора|завтра|післязавтра|післяпіслязавтра|позапозавчора|позавчора)";
    }
    innerExtract(i, s) {
      const t = s[1].toLowerCase(), r = i.createParsingComponents();
      switch (t) {
        case "сьогодні":
          return n.today(i.reference);
        case "вчора":
          return n.yesterday(i.reference);
        case "завтра":
          return n.tomorrow(i.reference);
        case "післязавтра":
          return n.theDayAfter(i.reference, 2);
        case "післяпіслязавтра":
          return n.theDayAfter(i.reference, 3);
        case "позавчора":
          return n.theDayBefore(i.reference, 2);
        case "позапозавчора":
          return n.theDayBefore(i.reference, 3);
      }
      return r;
    }
  };
  return Me.default = m, Me;
}
var oe = {}, Zs;
function Sd() {
  if (Zs) return oe;
  Zs = 1;
  var e = oe && oe.__createBinding || (Object.create ? function(t, r, a, o) {
    o === void 0 && (o = a), Object.defineProperty(t, o, { enumerable: !0, get: function() {
      return r[a];
    } });
  } : function(t, r, a, o) {
    o === void 0 && (o = a), t[o] = r[a];
  }), d = oe && oe.__setModuleDefault || (Object.create ? function(t, r) {
    Object.defineProperty(t, "default", { enumerable: !0, value: r });
  } : function(t, r) {
    t.default = r;
  }), _ = oe && oe.__importStar || function(t) {
    if (t && t.__esModule) return t;
    var r = {};
    if (t != null) for (var a in t) a !== "default" && Object.prototype.hasOwnProperty.call(t, a) && e(r, t, a);
    return d(r, t), r;
  }, n = oe && oe.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(oe, "__esModule", { value: !0 });
  const f = _(/* @__PURE__ */ ce()), m = /* @__PURE__ */ Q(), u = n(k()), i = /* @__PURE__ */ we();
  let s = class extends i.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(r) {
      return "(зараз|минулого\\s*вечора|минулої\\s*ночі|наступної\\s*ночі|сьогодні\\s*вночі|цієї\\s*ночі|цього ранку|вранці|ранку|зранку|опівдні|ввечері|вечора|опівночі|вночі)";
    }
    innerExtract(r, a) {
      let o = u.default(r.reference.instant);
      const l = a[0].toLowerCase(), c = r.createParsingComponents();
      if (l === "зараз")
        return f.now(r.reference);
      if (l === "ввечері" || l === "вечора")
        return f.evening(r.reference);
      if (l.endsWith("вранці") || l.endsWith("ранку") || l.endsWith("зранку"))
        return f.morning(r.reference);
      if (l.endsWith("опівдні"))
        return f.noon(r.reference);
      if (l.match(/минулої\s*ночі/))
        return f.lastNight(r.reference);
      if (l.match(/минулого\s*вечора/))
        return f.yesterdayEvening(r.reference);
      if (l.match(/наступної\s*ночі/)) {
        const g = o.hour() < 22 ? 1 : 2;
        o = o.add(g, "day"), m.assignSimilarDate(c, o), c.imply("hour", 1);
      }
      return l.match(/цієї\s*ночі/) || l.endsWith("опівночі") || l.endsWith("вночі") ? f.midnight(r.reference) : c;
    }
  };
  return oe.default = s, oe;
}
var hn = {}, Ks;
function jd() {
  if (Ks) return hn;
  Ks = 1, Object.defineProperty(hn, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ fe(), d = /* @__PURE__ */ F(), _ = /* @__PURE__ */ Ie(), n = /* @__PURE__ */ we(), f = 1, m = 2, u = 3;
  let i = class extends n.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(t) {
      return `(?:(?:,|\\(|（)\\s*)?(?:в\\s*?)?(?:у\\s*?)?(?:(цей|минулого|минулий|попередній|попереднього|наступного|наступний|наступному)\\s*)?(${d.matchAnyPattern(e.WEEKDAY_DICTIONARY)})(?:\\s*(?:,|\\)|）))?(?:\\s*(на|у|в)\\s*(цьому|минулому|наступному)\\s*тижні)?`;
    }
    innerExtract(t, r) {
      const a = r[m].toLocaleLowerCase(), o = e.WEEKDAY_DICTIONARY[a], l = r[f], c = r[u];
      let g = l || c;
      g = g || "", g = g.toLocaleLowerCase();
      let P = null;
      return g == "минулого" || g == "минулий" || g == "попередній" || g == "попереднього" ? P = "last" : g == "наступного" || g == "наступний" ? P = "next" : (g == "цей" || g == "цього" || g == "цьому") && (P = "this"), _.createParsingComponentsAtWeekday(t.reference, o, P);
    }
  };
  return hn.default = i, hn;
}
var jr = {}, Vs;
function $d() {
  if (Vs) return jr;
  Vs = 1;
  var e = jr && jr.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(jr, "__esModule", { value: !0 });
  const d = /* @__PURE__ */ fe(), _ = /* @__PURE__ */ $(), n = e(k()), f = /* @__PURE__ */ F(), m = /* @__PURE__ */ we(), u = 1, i = 2;
  let s = class extends m.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(r) {
      return `(в минулому|у минулому|на минулому|минулого|на наступному|в наступному|у наступному|наступного|на цьому|в цьому|у цьому|цього)\\s*(${f.matchAnyPattern(d.TIME_UNIT_DICTIONARY)})(?=\\s*)`;
    }
    innerExtract(r, a) {
      const o = a[u].toLowerCase(), l = a[i].toLowerCase(), c = d.TIME_UNIT_DICTIONARY[l];
      if (o == "на наступному" || o == "в наступному" || o == "у наступному" || o == "наступного") {
        const y = {};
        return y[c] = 1, _.ParsingComponents.createRelativeFromReference(r.reference, y);
      }
      if (o == "на минулому" || o == "в минулому" || o == "у минулому" || o == "минулого") {
        const y = {};
        return y[c] = -1, _.ParsingComponents.createRelativeFromReference(r.reference, y);
      }
      const g = r.createParsingComponents();
      let P = n.default(r.reference.instant);
      return c.match(/week/i) ? (P = P.add(-P.get("d"), "d"), g.imply("day", P.date()), g.imply("month", P.month() + 1), g.imply("year", P.year())) : c.match(/month/i) ? (P = P.add(-P.date() + 1, "d"), g.imply("day", P.date()), g.assign("year", P.year()), g.assign("month", P.month() + 1)) : c.match(/year/i) && (P = P.add(-P.date() + 1, "d"), P = P.add(-P.month(), "month"), g.imply("day", P.date()), g.imply("month", P.month() + 1), g.assign("year", P.year())), g;
    }
  };
  return jr.default = s, jr;
}
var En = {}, Xs;
function Fd() {
  if (Xs) return En;
  Xs = 1, Object.defineProperty(En, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ fe(), d = /* @__PURE__ */ $(), _ = /* @__PURE__ */ X(), n = /* @__PURE__ */ we();
  let f = class extends n.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(u) {
      return `(ці|останні|минулі|майбутні|наступні|після|через|\\+|-)\\s*(${e.TIME_UNITS_PATTERN})`;
    }
    innerExtract(u, i) {
      const s = i[1].toLowerCase();
      let t = e.parseTimeUnits(i[3]);
      switch (s) {
        case "останні":
        case "минулі":
        case "-":
          t = _.reverseTimeUnits(t);
          break;
      }
      return d.ParsingComponents.createRelativeFromReference(u.reference, t);
    }
  };
  return En.default = f, En;
}
var xs;
function Yd() {
  return xs || (xs = 1, function(e) {
    var d = rt && rt.__importDefault || function(N) {
      return N && N.__esModule ? N : { default: N };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseDate = e.parse = e.createConfiguration = e.createCasualConfiguration = e.strict = e.casual = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = void 0;
    const _ = d(/* @__PURE__ */ Od()), n = d(/* @__PURE__ */ Cd()), f = d(/* @__PURE__ */ bd()), m = d(/* @__PURE__ */ vd()), u = d(/* @__PURE__ */ Id()), i = d(/* @__PURE__ */ Wd()), s = d(/* @__PURE__ */ Ud()), t = /* @__PURE__ */ ye(), r = d(/* @__PURE__ */ wd()), a = d(/* @__PURE__ */ Sd()), o = d(/* @__PURE__ */ jd()), l = d(/* @__PURE__ */ $d()), c = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return c.Chrono;
    } });
    const g = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return g.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return g.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return g.ReferenceWithTimezone;
    } });
    const P = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return P.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return P.Weekday;
    } });
    const y = d(/* @__PURE__ */ We()), T = d(/* @__PURE__ */ Fd()), h = d(/* @__PURE__ */ Hn());
    e.casual = new c.Chrono(R()), e.strict = new c.Chrono(E(!0));
    function R() {
      const N = E(!1);
      return N.parsers.unshift(new r.default()), N.parsers.unshift(new a.default()), N.parsers.unshift(new f.default()), N.parsers.unshift(new l.default()), N.parsers.unshift(new T.default()), N;
    }
    e.createCasualConfiguration = R;
    function E(N) {
      return t.includeCommonConfiguration({
        parsers: [
          new h.default(),
          new y.default(!0),
          new _.default(),
          new n.default(),
          new o.default(),
          new m.default(N),
          new u.default()
        ],
        refiners: [new s.default(), new i.default()]
      }, N);
    }
    e.createConfiguration = E;
    function p(N, b, D) {
      return e.casual.parse(N, b, D);
    }
    e.parse = p;
    function A(N, b, D) {
      return e.casual.parseDate(N, b, D);
    }
    e.parseDate = A;
  }(rt)), rt;
}
var Js;
function kd() {
  return Js || (Js = 1, function(e) {
    var d = De && De.__createBinding || (Object.create ? function(h, R, E, p) {
      p === void 0 && (p = E), Object.defineProperty(h, p, { enumerable: !0, get: function() {
        return R[E];
      } });
    } : function(h, R, E, p) {
      p === void 0 && (p = E), h[p] = R[E];
    }), _ = De && De.__setModuleDefault || (Object.create ? function(h, R) {
      Object.defineProperty(h, "default", { enumerable: !0, value: R });
    } : function(h, R) {
      h.default = R;
    }), n = De && De.__importStar || function(h) {
      if (h && h.__esModule) return h;
      var R = {};
      if (h != null) for (var E in h) E !== "default" && Object.prototype.hasOwnProperty.call(h, E) && d(R, h, E);
      return _(R, h), R;
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseDate = e.parse = e.casual = e.strict = e.uk = e.es = e.ru = e.zh = e.nl = e.pt = e.ja = e.fr = e.de = e.Weekday = e.Meridiem = e.ReferenceWithTimezone = e.ParsingComponents = e.ParsingResult = e.Chrono = e.en = void 0;
    const f = n(/* @__PURE__ */ Qu());
    e.en = f;
    const m = /* @__PURE__ */ ee();
    Object.defineProperty(e, "Chrono", { enumerable: !0, get: function() {
      return m.Chrono;
    } });
    const u = /* @__PURE__ */ $();
    Object.defineProperty(e, "ParsingResult", { enumerable: !0, get: function() {
      return u.ParsingResult;
    } }), Object.defineProperty(e, "ParsingComponents", { enumerable: !0, get: function() {
      return u.ParsingComponents;
    } }), Object.defineProperty(e, "ReferenceWithTimezone", { enumerable: !0, get: function() {
      return u.ReferenceWithTimezone;
    } });
    const i = /* @__PURE__ */ B();
    Object.defineProperty(e, "Meridiem", { enumerable: !0, get: function() {
      return i.Meridiem;
    } }), Object.defineProperty(e, "Weekday", { enumerable: !0, get: function() {
      return i.Weekday;
    } });
    const s = n(/* @__PURE__ */ lo());
    e.de = s;
    const t = n(/* @__PURE__ */ po());
    e.fr = t;
    const r = n(/* @__PURE__ */ Oo());
    e.ja = r;
    const a = n(/* @__PURE__ */ So());
    e.pt = a;
    const o = n(/* @__PURE__ */ Jo());
    e.nl = o;
    const l = n(/* @__PURE__ */ ad());
    e.zh = l;
    const c = n(/* @__PURE__ */ yd());
    e.ru = c;
    const g = n(/* @__PURE__ */ Ad());
    e.es = g;
    const P = n(/* @__PURE__ */ Yd());
    e.uk = P, e.strict = f.strict, e.casual = f.casual;
    function y(h, R, E) {
      return e.casual.parse(h, R, E);
    }
    e.parse = y;
    function T(h, R, E) {
      return e.casual.parseDate(h, R, E);
    }
    e.parseDate = T;
  }(De)), De;
}
var Fn, Qs;
function Bd() {
  return Qs || (Qs = 1, Fn = {
    refine(e, d) {
      return e.option.startOfDay && d.forEach((_) => {
        !_.start.isCertain("hour") && !_.start.tags().has("casualReference/noon") && (_.start.imply("hour", e.option.startOfDay), _.start.imply("minute", 0), _.start.imply("second", 0), _.tags.StartOfWorkDayRefiner = !0);
      }), d;
    }
  }), Fn;
}
var Yn, eu;
function Ld() {
  if (eu) return Yn;
  eu = 1;
  const e = /* @__PURE__ */ kd(), d = /^remind @?([^\s]+)(?: to )?([\s\S]*)$/, _ = new e.Chrono();
  _.refiners.push(Bd());
  const n = {
    forwardDate: !0,
    startOfDay: 9
  };
  return Yn = (f, m) => {
    const u = f.match(d);
    if (!u)
      return null;
    let [, i, s] = u;
    const t = _.parse(s, m, n);
    return t.length < 1 ? null : (t.forEach((r) => {
      s = s.replace(r.text, "");
    }), s = s.trim(), s = s.replace(/^(to|that) /, "").replace(/ on$/, ""), { who: i, what: s, when: t[0].start.date() });
  }, Yn;
}
var qd = Ld();
const Hd = /* @__PURE__ */ Mu(qd);
function Gd(e, d) {
  const _ = e.comment.body;
  let n = null, f = !1;
  const m = _.split(`
`);
  for (let i = 0; i < m.length; i++) {
    const s = m[i].trim();
    if (s.startsWith("```")) {
      f = !f;
      continue;
    }
    if (!f && s.startsWith("/remind ")) {
      n = s;
      break;
    }
  }
  if (n === null)
    return null;
  const u = Hd(n.slice(1), d);
  if (!u)
    throw new Error(`Unable to parse reminder: remind ${_}`);
  return u.who === "me" && (u.who = e.sender.login), u;
}
function zd(e, d) {
  const _ = /\r?\n\r?\n<!-- bot: (?<reminder>{"reminders":.*) -->/;
  e || (e = "");
  const n = e.match(_), f = n ? JSON.parse(n.groups?.reminder || '{"reminders":[]}').reminders : [];
  let m = 1;
  f.length > 0 && (m = f[f.length - 1].id + 1), f.push({
    id: m,
    ...d
  });
  const u = `

<!-- bot: ${JSON.stringify({ reminders: f })} -->`;
  return n ? e.replace(_, u) : `${e}${u}`;
}
const Zd = "reminder";
function Dn(e) {
  const d = kn("repositoryOwner"), _ = kn("repository"), n = _ ? _.split("/")[1] : e.repository.name;
  return {
    owner: d ?? e.repository.owner.login,
    repo: n,
    issue_number: e.issue.number
  };
}
function ru(e, d, _) {
  return e.rest.issues.createComment({
    ...Dn(d),
    body: _
  });
}
function Kd(e, d, _) {
  const n = zd(d.issue.body || null, _);
  return e.rest.issues.update({
    ...Dn(d),
    body: n
  });
}
async function Vd() {
  const e = Eu.payload, d = pu(kn("repoToken", { required: !0 }));
  let _ = null;
  try {
    if (Yr("parsing reminder"), _ = Gd(e), On(JSON.stringify(_, null, 1)), !_) {
      On("no reminder found");
      return;
    }
    kr();
  } catch (n) {
    Yr("create error comment"), await ru(
      d,
      e,
      `@${e.sender.login} we had trouble parsing your reminder. Try:

\`/remind me [what] [when]\``
    ), kr(), hu(n instanceof Error ? n.message : String(n));
    return;
  }
  Yr("add label"), On(JSON.stringify(Dn(e), null, 1)), await d.rest.issues.addLabels({
    ...Dn(e),
    labels: [Zd]
  }), kr(), Yr("update issue"), await Kd(d, e, _), kr(), Yr("add reminder comment"), await ru(
    d,
    e,
    `@${e.sender.login} set a reminder for **${_.when.toISOString().split("T")[0]}**`
  ), kr();
}
Vd();
//# sourceMappingURL=index.js.map
