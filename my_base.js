function toByteStr(n) {
	var str = n.toString(16);
	if (str.length == 1) {
		str = "0" + str;
	}
	return str;
}
function b2hStr(str) {
	var n = str.length;
	var A = "";
	for (var i = 0; i < n; i++) {
		A += toByteStr(str.charCodeAt(i));
	}
	return A;
}
function bS2Arr(str) {
	var i, X = [];
	for (i = 0; i < str.length; i += 2) {
		X.push(parseInt(str.substr(i, 2), 16));
	}
	return X;
}