
// TUPLE FUNCTIONS

function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};

// LIST FUNCTIONS

var _List_Nil = { $: '[]' };
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }
var _List_cons = F2(_List_Cons);

var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
    });

    var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
    });
var elm$core$List$cons = _List_cons;
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
// BASICS

function F(arity, fun, wrapper) {
    wrapper.a = arity;
    wrapper.f = fun;
    return wrapper;
  }

function F2(fun) {
return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
    return F(3, fun, function(a) {
        return function(b) { return function(c) { return fun(a, b, c); }; };
    });
}
function F4(fun) {
    return F(4, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return fun(a, b, c, d); }; }; };
});
}
function F5(fun) {
    return F(5, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
});
}
function F6(fun) {
return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
});
}
function F7(fun) {
return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
});
}
function F8(fun) {
return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
});
}
function F9(fun) {
return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
});
}

function A2(fun, a, b) {
return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//---  RESULT FUNCTIONS

var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};

var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};

exports.choices = function (_n0) {
	var _n1 = _n0.c;
	var _n2 = _n1.b;
	var x = _n2.a;
	var _n3 = _n1.c;
	var y = _n3.a;
	return [x, y];
};

var estimateBestCase = function (_n0) {
	var merged = _n0.a;
	var unmerged = _n0.b;
	var _n1 = _n0.c;
	var stack = _n1.a;
	var _n2 = _n1.b;
	var l = _n2.a;
	var ls = _n2.b;
	var _n3 = _n1.c;
	var r = _n3.a;
	var rs = _n3.b;
	var recurse = F2(
		function (ts, xs) {
			recurse:
			while (true) {
				var _n4 = _Utils_Tuple2(ts, xs);
				if (_n4.b.b) {
					if (_n4.b.b.b) {
						var _n5 = _n4.b;
						var x = _n5.a;
						var _n6 = _n5.b;
						var y = _n6.a;
						var ys = _n6.b;
						return A2(
							recurse,
							A2(elm$core$List$cons, x + y, ts),
							ys) + A2(elm$core$Basics$min, x, y);
					} else {
						var _n7 = _n4.b;
						var x = _n7.a;
						var $temp$ts = A2(elm$core$List$cons, x, ts),
							$temp$xs = _List_Nil;
						ts = $temp$ts;
						xs = $temp$xs;
						continue recurse;
					}
				} else {
					if (_n4.a.b && _n4.a.b.b) {
						var _n8 = _n4.a;
						var _n9 = _n8.b;
						var $temp$ts = _List_Nil,
							$temp$xs = ts;
						ts = $temp$ts;
						xs = $temp$xs;
						continue recurse;
					} else {
						return 0;
					}
				}
			}
		});
	var mergingLength = (elm$core$List$length(ls) + elm$core$List$length(rs)) + 2;
	var lengths = elm$core$List$map(
		function (_n10) {
			var z = _n10.a;
			var zs = _n10.b;
			return 1 + elm$core$List$length(zs);
		});
	return (A2(
		recurse,
		A2(
			elm$core$List$cons,
			mergingLength + elm$core$List$length(stack),
			lengths(merged)),
		lengths(unmerged)) + A2(
		elm$core$Basics$min,
		elm$core$List$length(rs),
		elm$core$List$length(ls))) + 1;
};

var estimateWorstCase = function (_n0) {
	var merged = _n0.a;
	var unmerged = _n0.b;
	var _n1 = _n0.c;
	var stack = _n1.a;
	var _n2 = _n1.b;
	var l = _n2.a;
	var ls = _n2.b;
	var _n3 = _n1.c;
	var r = _n3.a;
	var rs = _n3.b;
	var recurse = F2(
		function (ts, xs) {
			recurse:
			while (true) {
				var _n4 = _Utils_Tuple2(ts, xs);
				if (_n4.b.b) {
					if (_n4.b.b.b) {
						var _n5 = _n4.b;
						var x = _n5.a;
						var _n6 = _n5.b;
						var y = _n6.a;
						var ys = _n6.b;
						return ((A2(
							recurse,
							A2(elm$core$List$cons, x + y, ts),
							ys) + x) + y) - 1;
					} else {
						var _n7 = _n4.b;
						var x = _n7.a;
						var $temp$ts = A2(elm$core$List$cons, x, ts),
							$temp$xs = _List_Nil;
						ts = $temp$ts;
						xs = $temp$xs;
						continue recurse;
					}
				} else {
					if (_n4.a.b && _n4.a.b.b) {
						var _n8 = _n4.a;
						var _n9 = _n8.b;
						var $temp$ts = _List_Nil,
							$temp$xs = ts;
						ts = $temp$ts;
						xs = $temp$xs;
						continue recurse;
					} else {
						return 0;
					}
				}
			}
		});
	var mergingLength = (elm$core$List$length(ls) + elm$core$List$length(rs)) + 2;
	var lengths = elm$core$List$map(
		function (_n10) {
			var z = _n10.a;
			var zs = _n10.b;
			return 1 + elm$core$List$length(zs);
		});
	return (A2(
		recurse,
		A2(
			elm$core$List$cons,
			mergingLength + elm$core$List$length(stack),
			lengths(merged)),
		lengths(unmerged)) + mergingLength) - 1;
};
var author$project$MergeSort$Merging = F3(
	function (a, b, c) {
		return {$: 'Merging', a: a, b: b, c: c};
	});
var author$project$MergeSort$Sorting = F3(
	function (a, b, c) {
		return {$: 'Sorting', a: a, b: b, c: c};
    });

exports.initMergeSort = function (xs) {
    xs = toElmList(xs)
	if (xs.b && xs.b.b) {
		var x = xs.a;
		var _n1 = xs.b;
		var y = _n1.a;
		var ys = _n1.b;
		return elm$core$Result$Ok(
			A3(
				author$project$MergeSort$Sorting,
				_List_Nil,
				A2(
					elm$core$List$map,
					function (z) {
						return _Utils_Tuple2(z, _List_Nil);
					},
					ys),
				A3(
					author$project$MergeSort$Merging,
					_List_Nil,
					_Utils_Tuple2(x, _List_Nil),
					_Utils_Tuple2(y, _List_Nil))));
	} else {
		return elm$core$Result$Err(fromElmList(xs));
	}
};
var author$project$MergeSort$consNonempty = F2(
	function (x, _n0) {
		var y = _n0.a;
		var ys = _n0.b;
		return _Utils_Tuple2(
			x,
			A2(elm$core$List$cons, y, ys));
    });
var author$project$MergeSort$mergeStep = F2(
	function (ord, merging) {
		mergeStep:
		while (true) {
			var stack = merging.a;
			var left = merging.b;
			var right = merging.c;
			var _n0 = _Utils_Tuple2(ord, merging);
			switch (_n0.a.$) {
				case 'EQ':
					var _n1 = _n0.a;
					var $temp$ord = elm$core$Basics$GT,
						$temp$merging = merging;
					ord = $temp$ord;
					merging = $temp$merging;
					continue mergeStep;
				case 'GT':
					if (_n0.b.b.b.b) {
						var _n2 = _n0.a;
						var _n3 = _n0.b;
						var _n4 = _n3.b;
						var l = _n4.a;
						var _n5 = _n4.b;
						var x = _n5.a;
						var xs = _n5.b;
						return elm$core$Result$Ok(
							A3(
								author$project$MergeSort$Merging,
								A2(elm$core$List$cons, l, stack),
								_Utils_Tuple2(x, xs),
								right));
					} else {
						var _n10 = _n0.a;
						var _n11 = _n0.b;
						var _n12 = _n11.b;
						var l = _n12.a;
						var _n13 = _n11.c;
						var r = _n13.a;
						var rs = _n13.b;
						return elm$core$Result$Err(
							A3(
								elm$core$List$foldl,
								author$project$MergeSort$consNonempty,
								_Utils_Tuple2(
									l,
									A2(elm$core$List$cons, r, rs)),
								stack));
					}
				default:
					if (_n0.b.c.b.b) {
						var _n6 = _n0.a;
						var _n7 = _n0.b;
						var _n8 = _n7.c;
						var r = _n8.a;
						var _n9 = _n8.b;
						var x = _n9.a;
						var xs = _n9.b;
						return elm$core$Result$Ok(
							A3(
								author$project$MergeSort$Merging,
								A2(elm$core$List$cons, r, stack),
								left,
								_Utils_Tuple2(x, xs)));
					} else {
						var _n14 = _n0.a;
						var _n15 = _n0.b;
						var _n16 = _n15.b;
						var l = _n16.a;
						var ls = _n16.b;
						var _n17 = _n15.c;
						var r = _n17.a;
						return elm$core$Result$Err(
							A3(
								elm$core$List$foldl,
								author$project$MergeSort$consNonempty,
								_Utils_Tuple2(
									r,
									A2(elm$core$List$cons, l, ls)),
								stack));
					}
			}
		}
    });
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$LT = {$: 'LT'};
exports.LT = elm$core$Basics$LT;
exports.EQ = elm$core$Basics$EQ;
exports.GT = {$ : 'GT'};
var mergeSortStep = F2(
	function (ord, sorting) {
		var merged = sorting.a;
		var unmerged = sorting.b;
		var merging = sorting.c;
		var _n0 = _Utils_Tuple3(
			A2(author$project$MergeSort$mergeStep, ord, merging),
			merged,
			unmerged);
		if (_n0.a.$ === 'Ok') {
			var out = _n0.a.a;
			return elm$core$Result$Ok(
				A3(author$project$MergeSort$Sorting, merged, unmerged, out));
		} else {
			if (_n0.c.b) {
				if (_n0.c.b.b) {
					var out = _n0.a.a;
					var _n1 = _n0.c;
					var x = _n1.a;
					var _n2 = _n1.b;
					var y = _n2.a;
					var ys = _n2.b;
					return elm$core$Result$Ok(
						A3(
							author$project$MergeSort$Sorting,
							A2(elm$core$List$cons, out, merged),
							ys,
							A3(author$project$MergeSort$Merging, _List_Nil, x, y)));
				} else {
					var out = _n0.a.a;
					var _n3 = _n0.c;
					var x = _n3.a;
					return elm$core$Result$Ok(
						A3(
							author$project$MergeSort$Sorting,
							merged,
							_List_Nil,
							A3(author$project$MergeSort$Merging, _List_Nil, x, out)));
				}
			} else {
				if (_n0.b.b) {
					var out = _n0.a.a;
					var _n4 = _n0.b;
					var x = _n4.a;
					var xs = _n4.b;
					return elm$core$Result$Ok(
						A3(
							author$project$MergeSort$Sorting,
							_List_Nil,
							xs,
							A3(author$project$MergeSort$Merging, _List_Nil, out, x)));
				} else {
					var out = _n0.a.a;
					return [out.a, ...fromElmList(out.b)];
				}
			}
		}
    });
exports.mergeSortStep = A2.bind(null, mergeSortStep);

var author$project$MergeSort$consNonempty = F2(
    function (x, _n0) {
        var y = _n0.a;
        var ys = _n0.b;
        return _Utils_Tuple2(
            x,
            A2(elm$core$List$cons, y, ys));
    });
var author$project$MergeSort$mergeStep = F2(
    function (ord, merging) {
        mergeStep:
        while (true) {
            var stack = merging.a;
            var left = merging.b;
            var right = merging.c;
            var _n0 = _Utils_Tuple2(ord, merging);
            switch (_n0.a.$) {
                case 'EQ':
                    var _n1 = _n0.a;
                    var $temp$ord = elm$core$Basics$GT,
                        $temp$merging = merging;
                    ord = $temp$ord;
                    merging = $temp$merging;
                    continue mergeStep;
                case 'GT':
                    if (_n0.b.b.b.b) {
                        var _n2 = _n0.a;
                        var _n3 = _n0.b;
                        var _n4 = _n3.b;
                        var l = _n4.a;
                        var _n5 = _n4.b;
                        var x = _n5.a;
                        var xs = _n5.b;
                        return elm$core$Result$Ok(
                            A3(
                                author$project$MergeSort$Merging,
                                A2(elm$core$List$cons, l, stack),
                                _Utils_Tuple2(x, xs),
                                right));
                    } else {
                        var _n10 = _n0.a;
                        var _n11 = _n0.b;
                        var _n12 = _n11.b;
                        var l = _n12.a;
                        var _n13 = _n11.c;
                        var r = _n13.a;
                        var rs = _n13.b;
                        return elm$core$Result$Err(
                            A3(
                                elm$core$List$foldl,
                                author$project$MergeSort$consNonempty,
                                _Utils_Tuple2(
                                    l,
                                    A2(elm$core$List$cons, r, rs)),
                                stack));
                    }
                default:
                    if (_n0.b.c.b.b) {
                        var _n6 = _n0.a;
                        var _n7 = _n0.b;
                        var _n8 = _n7.c;
                        var r = _n8.a;
                        var _n9 = _n8.b;
                        var x = _n9.a;
                        var xs = _n9.b;
                        return elm$core$Result$Ok(
                            A3(
                                author$project$MergeSort$Merging,
                                A2(elm$core$List$cons, r, stack),
                                left,
                                _Utils_Tuple2(x, xs)));
                    } else {
                        var _n14 = _n0.a;
                        var _n15 = _n0.b;
                        var _n16 = _n15.b;
                        var l = _n16.a;
                        var ls = _n16.b;
                        var _n17 = _n15.c;
                        var r = _n17.a;
                        return elm$core$Result$Err(
                            A3(
                                elm$core$List$foldl,
                                author$project$MergeSort$consNonempty,
                                _Utils_Tuple2(
                                    r,
                                    A2(elm$core$List$cons, l, ls)),
                                stack));
                    }
            }
        }
    });


// JAVASCRIPT INTEROP

function fromElmList(elmList) {
    var recurse = elmList;
    var output = [];
    while (recurse.$ === '::') {
        output.push(recurse.a);
        recurse = recurse.b;
    }
    return output;
}

function toElmList(input) {
    elmList = {}
    recurse = elmList
    for (let i = 0; i < input.length; i++) {
        recurse.$ = '::';
        recurse.a = input[i];
        recurse.b = {}
        recurse = recurse.b;
    }
    recurse.$ = '[]';
    return elmList;
}
