function powerBig(x, y) {
    x = BigInt(x);
    y = BigInt(y);
	var res = 1n;
	while (y > 0) {
		if (y % 2n == 0) {
			x = x * x
			y >>= 1n
		} else {
			res = res * x
			y -= 1n
		}
	}
	return res
}

function power(x, y) {
	var res = 1;
	while (y > 0) {
		if (y % 2 == 0) {
			x = x * x
			y >>= 1
		} else {
			res = res * x
			y -= 1
		}
	}
	return res
}

function isSmaller(a, b) {
    if (a.length != b.length) {
        return a.length < b.length;
    }
    for (var i = 0; i < a.length; ++i) {
        if (a[i] != b[i]) {
            return a[i] < b[i];
        }
    }
    return false;
}

function cmpArrays(a, b) {
    if (isSmaller(a, b)) {
        return -1;
    } else if (isSmaller(b, a)) {
        return 1;
    }
    return 0;
}

function getSmallestP(a, use_reflections) {
    var res = a.slice(0);
    for (var i = 0; i < n; ++i) {
        var cur = [];
        for (var j = 0; j < n; ++j) {
            cur.push(a[(i + j) % n]);
        }
        if (isSmaller(cur, res)) {
            res = cur;
        }
    }
    if (use_reflections) {
        for (var i = 0; i < n; ++i) {
            var cur = [];
            for (var j = 0; j < n; ++j) {
                cur.push(a[(i + n - 1 - j) % n]);
            }
            if (isSmaller(cur, res)) {
                res = cur;
            }
        }
    }
    return res;
}

function getColoringsData(n, c, use_reflections) {
    var to = power(c, n);
    var res = [];
    for (var mask = 0; mask < to; ++mask) {
        var cur = [], x = mask;
        for (var i = 0; i < n; ++i) {
            cur.push(x % c);
            x = (x / c) >> 0;
        }
        cur.reverse();
        if (cmpArrays(cur, getSmallestP(cur, use_reflections)) == 0) {
            res.push(cur);
        }
    }
    console.log(res);
    return res;
}

function getData(task, n, c, use_reflections) {
    if (task == 'Colorings') {
        var res = getColoringsData(n, c, use_reflections);
        writeLog('vertices = {0}, colors = {1}: found {2} different colorings'.format(n, c, res.length));
        return res;
    }
}