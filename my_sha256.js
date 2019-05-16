var _H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
const _K = [
0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
var _W = [];

function ROT_L(a, b) {
	return (a << b) | (a >>> (32 - b));
}
function ROT_R(a, b) {
	return (a >>> b) | (a << (32 - b));
}
function CH(x, y, z) {
	return (x & y) ^ (~x & z);
}
function MAJ(x, y, z) {
	return (x & y) ^ (y & z) ^ (z & x);
}
function EP0(x) {
	return ROT_R(x, 2) ^ ROT_R(x, 13) ^ ROT_R(x, 22);
}
function EP1(x) {
	return ROT_R(x, 6) ^ ROT_R(x, 11) ^ ROT_R(x, 25);
}
function BIT32(x) {
	return (x & 0x00000000ffffffff) >>> 0;
}

function num2str(n, l) {
	var s = n.toString(16);
	var l = l - s.length;
	if (l < 0) {
		s = "";
	}
	for (var i = 0; i < l; i++) {
		s = "0" + s;
	}
	return s;
}

function sha256(m) {
	var i, j;
	var X = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var s = "";

	ml = m.length;
	var nR = ml % 128;
	var nB = Math.floor(ml / 128);
	
	if(nR < 112) {
		n = 112 - nR;
		nB += 1;
	} else {
		n = (128 - nR) + 112;
		nB += 2;
	}
	// console.log(nR, nB, n);
	for(i = 0; i < n; i++) {
		m += "0";
	}
	m += "80";
	m += num2str(ml, 14);
	
	for(i = 0; i < nB; i++) {
		s = m.substr(128 * i, 128);
		for (j = 0; j < 16; j++) {
			X[j] = parseInt(s.substr(8 * j, 8), 16);
		}
		hash(X);
	}
	var s = "";
	for(i = 0; i < 8; i++) {
		s += num2str(_H[i], 8);
	}
	// console.log(s);
	return s;
}
function hash(X) {
	var i;
	_W = [];
	for(i = 0; i < 16; i++) {
		_W.push(X[i]);
	}
	var s0, s1;
	for(i = 16; i < 64; i++) {
		s0 = ROT_R(_W[i - 15], 7) ^ ROT_R(_W[i - 15], 18) ^ (_W[i - 15] >> 3);
		s1 = ROT_R(_W[i - 2], 17) ^ ROT_R(_W[i - 2], 19) ^ (_W[i - 2] >> 10);
		_W[i] = BIT32(_W[i - 16] + s0 + _W[i - 7] + s1);
	}
	
	var a = _H[0];
	var b = _H[1];
	var c = _H[2];
	var d = _H[3];
	var e = _H[4];
	var f = _H[5];
	var g = _H[6];
	var h = _H[7];

	var t1, t2;
	for(i = 0; i < 64; i++) {
		t1 = BIT32(h + EP1(e) + CH(e, f, g) + _K[i] + _W[i]);
		t2 = BIT32(EP0(a) + MAJ(a, b, c));

		h = g;
		g = f;
		f = e;
		e = BIT32(d + t1);
		d = c;
		c = b;
		b = a;
		a = BIT32(t1 + t2);
	}

	_H[0] = BIT32(_H[0] + a);
	_H[1] = BIT32(_H[1] + b);
	_H[2] = BIT32(_H[2] + c);
	_H[3] = BIT32(_H[3] + d);
	_H[4] = BIT32(_H[4] + e);
	_H[5] = BIT32(_H[5] + f);
	_H[6] = BIT32(_H[6] + g);
	_H[7] = BIT32(_H[7] + h);
}
