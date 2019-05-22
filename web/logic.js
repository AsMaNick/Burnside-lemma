function factorial(n) {
    var res = 1n;
    for (var i = 1; i <= n; ++i) {
        res = res * BigInt(i);
    }
    return res;
}

function getC(n, k) {
    return factorial(n) / factorial(k) / factorial(n - k);
}

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
    return res;
}

function getPartitionsDataRecursive(cur, n, len, use_reflection, res) {
    if (len == 0 && cur.length == n) {
        if (cmpArrays(cur, getSmallestP(cur, use_reflections)) == 0) {
            res.push(cur);
        }
        return;
    }
    if (len == 0 || cur.length == n) {
        return;
    }
    var st = 1;
    if (cur.length > 0) {
        st = cur[0];
    }
    for (var x = st; x + (n - cur.length - 1) * st <= len; ++x) {
        var to = cur.slice(0);
        to.push(x);
        getPartitionsDataRecursive(to, n, len - x, use_reflection, res);
    }
}

function getPartitionsData(n, len, use_reflections) {
    var to = power(c, n);
    var res = [];
    getPartitionsDataRecursive([], n, len, use_reflections, res);
    return res;
}

function get_all_p(n, use_reflections) {
    var res = [];
    for (var i = 0; i < n; ++i) {
        var p = [];
        for (var j = 0; j < n; ++j) {
            p.push((i + j) % n);
        }
        res.push(p);
    }
    if (use_reflections) {
        for (var i = 0; i < n; ++i) {
            var p = [];
            for (var j = 0; j < n; ++j) {
                p.push((i + n - j - 1) % n);
            }
            res.push(p);
        }
    }
    return res;
}

function get_comp(p) {
    var comp = [];
    for (var i = 0; i < p.length; ++i) {
        comp[i] = -1;
    }
    var num = 0;
    for (var i = 0; i < p.length; ++i) {
        if (comp[i] == -1) {
            var cur = i;
            while (comp[cur] == -1) {
                comp[cur] = num;
                cur = p[cur];
            }
            ++num;
        }
    }
    return comp;
}

function get_all_comp(all_p) {
    var res = [];
    for (var i = 0; i < all_p.length; ++i) {
        res.push(get_comp(all_p[i]));
    }
    return res;
}

function countColorings(n, c, use_reflections) {
    res = 0n;
    var all_p = get_all_p(n, use_reflections);
    var all_comp = get_all_comp(all_p);
    for (var comp of all_comp) {
        var cnt = 0;
        for (var x of comp) {
            cnt = Math.max(cnt, x + 1);
        }
        res += powerBig(c, cnt);
    }
    return res / BigInt(all_p.length);
}

function countColorings(n, c, use_reflections) {
    res = 0n;
    var all_p = get_all_p(n, use_reflections);
    var all_comp = get_all_comp(all_p);
    for (var comp of all_comp) {
        var cnt = 0;
        for (var x of comp) {
            cnt = Math.max(cnt, x + 1);
        }
        res += powerBig(c, cnt);
    }
    return res / BigInt(all_p.length);
}

function getCyclesLengthDistribution(comp) {
    var len = {};
    for (var x of comp) {
        if (!len[x]) {
            len[x] = 0;
        }
        ++len[x];
    }
    //console.log(len);
    var cnt = {};
    for (var x in len) {
        if (!cnt[len[x]]) {
            cnt[len[x]] = 0;
        }
        ++cnt[len[x]];
    }
    return cnt;
}

function countPartitions(n, c, use_reflections) {
    if (n > c) {
        return 0;
    }
    c -= n;
    res = 0n;
    var all_p = get_all_p(n, use_reflections);
    var all_comp = get_all_comp(all_p);
    for (var comp of all_comp) {
        var cnt = getCyclesLengthDistribution(comp);
        keys = Object.keys(cnt);
        if (keys.length == 1) {
            if (c % keys[0] == 0) {
                var total_length = (c / keys[0]) >> 0;
                var diff_cycles = (n / keys[0]) >> 0;
                res += getC(total_length + diff_cycles - 1, diff_cycles - 1);
            }
        } else if (keys.length == 2) {
            if (keys[0] != 1) {
                return 228228;
            }
            if (cnt[keys[0]] > 2) {
                return 228228;
            }
            if (cnt[keys[0]] == 1) {
                for (var x = 0; x <= c; ++x) {
                    if ((c - x) % keys[1] == 0) {
                        var total_length = ((c - x) / keys[1]) >> 0;
                        var diff_cycles = ((n - 1) / keys[1]) >> 0;
                        res += getC(total_length + diff_cycles - 1, diff_cycles - 1);
                    }
                }
            } else {
                for (var x = 0; x <= c; ++x) {
                    for (var y = 0; x + y <= c; ++y) {
                        if ((c - x - y) % keys[1] == 0) {
                            var total_length = ((c - x - y) / keys[1]) >> 0;
                            var diff_cycles = ((n - 2) / keys[1]) >> 0;
                            res += getC(total_length + diff_cycles - 1, diff_cycles - 1);
                        }
                    }
                }
            }
        }
    }
    return res / BigInt(all_p.length);
}

function getData(task, n, c, use_reflections) {
    if (task == 'Colorings') {
        var cnt = countColorings(n, c, use_reflections);
        writeLog('Vertices = {0}, colors = {1}. By Burnside lemma counted {2} different colorings.'.format(n, c, splitBigNumber(cnt, 9)));
        if (cnt > MAX_CNT) {
            showError('sp6', 'Too many different colorings');
            writeLog('Too many for visualization.');
            return [];
        }
        var res = getColoringsData(n, c, use_reflections);
        writeLog('Found {0} different colorings.'.format(res.length));
        if (res.length != cnt) {
            writeLog('FAIL');
        }
        return res;
    } else {
        var cnt = countPartitions(n, c, use_reflections);
        writeLog('Arcs = {0}, total length = {1}. By Burnside lemma counted {2} different partitions.'.format(n, c, splitBigNumber(cnt, 9)));
        if (cnt > MAX_CNT) {
            showError('sp6', 'Too many different partitions');
            writeLog('Too many for visualization.');
            return [];
        }
        var res = getPartitionsData(n, c, use_reflections);
        writeLog('Found {0} different partitions.'.format(res.length));
        if (res.length != cnt) {
            writeLog('FAIL');
        }
        return res;
    }
}