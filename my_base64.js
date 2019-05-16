const X = [
	"A", "B", "C", "D", "E", "F", "G", "H",
	"I", "J", "K", "L", "M", "N", "O", "P",
	"Q", "R", "S", "T", "U", "V", "W", "X",
	"Y", "Z", "a", "b", "c", "d", "e", "f",
	"g", "h", "i", "j", "k", "l", "m", "n",
	"o", "p", "q", "r", "s", "t", "u", "v",
	"w", "x", "y", "z", "0", "1", "2", "3",
	"4", "5", "6", "7", "8", "9", "+", "/"
];

function isType_base64 (charStr) {
	var p = -1;
	for (i = 0; i < 64; i++) {
		if(X[i] == charStr) {
			p = i;
			break;
		}
	}
	return p;
}

// Convert Decimal Number To Binary String (number, number of bits)
function cN10ToS2(n10, nb) {
	var s2 = n10.toString(2);
	nb -= s2.length;
	for (var i = 0; i < nb; i++) {
		s2 = "0" + s2;
	}
	return s2;
}
// Convert Binary String to Hexadecimal String (binary string, number of bits)
function cS2ToS16(s2, nb) {
	if(s2 == "") {
		return s2;
	}
	var s16 = parseInt(s2, 2).toString(16);
	nb -= s16.length;
	for (var i = 0; i < nb; i++) {
		s16 = "0" + s16;
	}
	return s16;
}

function base64_deCode(s6) {
	var s8 = "";
	if(s6 == "") {
		return s6;
	}
	var i, j, c;
	for (i = s6.length - 1; i >= 0; i--) {
		c = s6.charAt(i);
		if (isType_base64(c) == -1 && c != "=") {
			break;
		}
	}
	s6 = s6.slice(i + 1, s6.length);
	var buff = "", a = "", b = "";
	for (i = 0; i < s6.length - 4; i += 4) {
		for (j = 0; j < 4; j++) {
			c = s6.charAt(i + j);
			buff += cN10ToS2(isType_base64(c), 6);
		}
		s8 += cS2ToS16(buff, 6);
		buff = "";
	}
	let z = 0;
	for(j = 3; j >= 0; j--) {
		if(s6.charAt(i + j) == "=") {
			++z;
		} else {
			break;
		}
	}
	z = 3 - z;
	for(j = 0; j < 4; j++) {
		c = s6.charAt(i + j);
		if(c == "=") {
			break;
		}
		buff += cN10ToS2(isType_base64(c), 6);
	}
	buff = buff.slice(0, z * 8);
	s8 += cS2ToS16(buff, z * 2);
	return s8;
}


function base64_enCode(s8) {
	var s6 = "";
	var i, j, x, n;
	for (i = 0; i < s8.length - 6; i += 6) {
		x = s8.substr(i, 6);
		x = parseInt(x, 16).toString(2);
		n = 24 - x.length;
		for (j = 0; j < n; j++) {
			x = "0" + x;
		}
		s6 += X[parseInt(x.substr(0, 6), 2)] + X[parseInt(x.substr(6, 6), 2)] + X[parseInt(x.substr(12, 6), 2)] + X[parseInt(x.substr(18, 6), 2)];
	}
	x = s8.substr(i, 6);
	n = 4 * x.length;
	x = parseInt(x, 16).toString(2);
	j = n - x.length;
	for (i = 0; i < j; i++) {
		x = "0" + x;
	}
	j = Math.floor(n / 6);
	if (n % 6 > 0) {
		j += 1;
	}
	for (i = 0; i < 6 * j - n; i++) {
		x += "0";
	}
	for (i = 0; i < x.length; i += 6) {
		s6 += X[parseInt(x.substr(i, 6), 2)];
	}
	for (i = 0; i < 4 - j; i++) {
		s6 += "=";
	}
	return s6;
}

/*
var str = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAEAAQADASIAAhEBA";
r = base64_deCode(str).substr(0, 256);
console.log(r.search(/ffd8/gi));
*/