function b_and (x, y) {
	return (x == "0" || y == "0") ? "0" : "1";
}
function b_or (x, y) {
	return (x == "1" || y == "1") ? "1" : "0";
}
function b_not (x) {
	return (x == "0") ? "1" : "0";
}
function b_xor (x, y) {
	return (x == y) ? "0" : "1";
}
function b_leftShift (x, n) {
	for (var i = 0; i < n; i++) {
		x += "0";
	}
	return x;
}
function b_rightShift (x, n) {
	return x.slice(0, -n);
}

function b_add (c, x, y) {
	var z = b_xor(x, y);
	var s = b_or(b_and(z, c), b_and(x, y)) + b_xor(c, z);
	return s;
}
function b_sub (b, x, y) {
	var z = b_xor(x, y);
	var d = b_or(b_and(b_not(z), b), b_and(b_not(x), y)) + b_xor(b, z);
	return d;
}

function s_pad (s, n) {
	for (var i = 0; i < n; i++) {
		s = "0" + s;
	}
	return s;
}
function s_removeLeadingZeros(ns) {
	var i, n = 0;
	for (i = 0; i < ns.length; i++) {
		if(ns.charAt(i) == "0") {
			++n;
		} else {
			break;
		}
	}
	ns = ns.slice(n, ns.length);
	if(ns == "") {
		ns = "0";
	}
	return ns;
}
function s_compareNumbers(ns1, ns2) {
	var c = 0;
	ns1 = s_removeLeadingZeros(ns1);
	ns2 = s_removeLeadingZeros(ns2);
	if (ns1.length > ns2.length) {
		c = 1;
	} else if (ns1.length < ns2.length) {
		c = -1;
	} else {
		for (var i = 0; i < ns1.length; i++) {
			if (ns1.charAt(i) != ns2.charAt(i)) {
				if (ns1.charAt(i) == "1") {
					c = -1;
				} else {
					c = 1;
				}
				break;
			}
		}
	}
	console.log(ns1, ns2);
	return c;
}

function s_add(ns1, ns2) {
	var i, c = "0", s = "", r = "";
	ns1 = s_removeLeadingZeros(ns1);
	ns2 = s_removeLeadingZeros(ns2);
	var n = Math.abs(ns1.length - ns2.length);
	if (ns1.length < ns2.length) {
		ns1 = s_pad(ns1, n);
	} else {
		ns2 = s_pad(ns2, n);
	}
	n = ns1.length;
	for (i = 0; i < n; i++) {
		s = b_add(c, ns1.charAt(n - i - 1), ns2.charAt(n - i - 1));
		c = s.charAt(0);
		r = s.charAt(1) + r;
	}
	r = s.charAt(0) + r;
	return s_removeLeadingZeros(r);
}
function s_sub(ns1, ns2) {
	var i, b = "0", d = "", r = "";
	ns1 = s_removeLeadingZeros(ns1);
	ns2 = s_removeLeadingZeros(ns2);
	var n = Math.abs(ns1.length - ns2.length);
	if (ns1.length < ns2.length) {
		ns1 = s_pad(ns1, n);
	} else {
		ns2 = s_pad(ns2, n);
	}
	n = ns1.length;
	for (i = 0; i < n; i++) {
		d = b_sub(b, ns1.charAt(n - i - 1), ns2.charAt(n - i - 1));
		b = d.charAt(0);
		r = d.charAt(1) + r;
	}
	r = d.charAt(0) + r;
	return s_removeLeadingZeros(r);
}
function s_mul(ns1, ns2) {
	/*
		multiplicant: big(ns1, ns2)
		multiplier: small(ns1, ns2)
		product: p
		RETURN: p
	*/
	ns1 = s_removeLeadingZeros(ns1);
	ns2 = s_removeLeadingZeros(ns2);
	var a, b;
	if (ns1.length < ns2.length) {
		a = ns2, b = ns1;
	} else {
		a = ns1, b = ns2;
	}
	var i, j;
	var r = "0", m;
	for (i = 0; i < b.length; i++) {
		if (b.charAt(b.length - i - 1) == "1") {
			m = a;
			for (j = 0; j < i; j++) {
				m += "0";
			}
			r = s_add(r, m);
		}
	}
	return r;
}
function s_div(ns1, ns2) {
	/*
		dividend: ns1
		divisor: ns2
		quotient: q
		reminder: r
		RETURNS: [q, r]
	*/
	ns1 = s_removeLeadingZeros(ns1);
	ns2 = s_removeLeadingZeros(ns2);
	var q = "", r = "";
	if (ns2 == "0") {
		q = "", r = "";
	} else if (ns1 == "0" || ns1.length < ns2.length) {
		q = "0", r = "";
	} else {
		var rem = "";
		for (var i = 0; i < ns1.length; i++) {
			rem += ns1.charAt(i);
			if (s_compareNumbers(rem, ns2) == -1) {
				q += "0";
			} else {
				q += "1";
				r = s_sub(r, ns2);
			}
		}
	}
	return [q, r];
}

var a = "00011011", b = "100011", c ="101", d = "110";
console.log(a, b, s_div(a, b));