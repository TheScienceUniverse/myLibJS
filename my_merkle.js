function findMerkleRoot(H) {
	var i, n, t, X;
	while (H.length != 1) {
		X = [];
		console.log(H);
		if (H.length % 2 == 1) {
			n = H.length - 1;
			t = false;
		} else {
			n = H.length;
			t = true;
		}
		for(i = 0; i < n; i += 2) {
			X.push(sha256(H[i] + H[i + 1]));
		}
		if (t == false) {
			X.push(H[H.length - 1]);
		}
		H = X;
	}
	return H[0];
}

var H = [
	"933185555846f6a780ff89986b01c42c34b56652dc6233aa36de7996a6412598",	// sha256("00011011")
	"ec0b11cd06e33ec61d53e5c2d343fdccfc1d35fc78b952b16ca873d8516776c5",	// sha256(sha256("00011011"))
	"4b9df019ea7db7833760ffacc43642d7471cf7fc649decef44d68e78829b5153",	// sha256("11100100")
	"689d0c73de0fb6d53154a35fab6ee7f8d6bf87389d40bb5946baa72bb7d7b187"	// sha256(sha256("11100100"))
];

console.log(findMerkleRoot(H));