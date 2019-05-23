function nonce(dt, df) {    // DaTa, DiFficulty
	var n = 0, h = "";
	while (h.substr(0, df) != new Array(df + 1).join("0")) {
		h = sha256(b2hStr(dt) + h);
		++n;
	}
	console.log(h);
	return n;
}
// console.log(nonce("Hello, World!", 4));