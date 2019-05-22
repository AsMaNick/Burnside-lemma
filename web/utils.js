if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function getField(id) {
	var elem = document.getElementById(id);
	return elem.value;
}
	
function getIntField(id) {
	if (getField(id) == '') {
		return 0;
	}
	return parseInt(getField(id));
}

function getBigIntField(id) {
	if (getField(id) == '') {
		return BigInt(0);
	}
	return BigInt(getField(id));
}

function getScale() {
	return scales[current_scale];
}

function showError(id, error) {
	document.getElementById(id).innerHTML = error;
}

function clearErrors() {
	showError('sp1', '');
	showError('sp2', '');
	showError('sp3', '');
	showError('sp4', '');
	showError('sp5', '');
	showError('sp6', '');
	showError('sp7', '');
}

function inRange(l, r, x) {
	return l <= x && x <= r;
}

function validateRange(l, r, x, error_id) {
    if (!inRange(l, r, x)) {
        showError(error_id, 'Should be integer from {0} to {1}'.format(l, r));
        return false;
    }
    return true;
}

function randInt(l, r) {
	return parseInt(d3.randomUniform(l, r)());
}

function getTask() {
	return document.getElementById('task').value;
}

function showColorNumbers() {
    return document.getElementById('showColorNumbers').checked;
}

function splitBigNumber(x, digits) {
    a = x.toString().split('');
    var res = '';
    for (var i = a.length - 1; i >= 0; i -= digits) {
        var s = '';
        for (var j = Math.max(0, i - digits + 1); j <= i; ++j) {
            s += a[j];
        }
        if (res != '') {
            s += ' ';
        }
        res = s + res;
    }
    return res;
}

var cnt_logs = 0;

function writeLog(message) {
	var output = document.getElementsByClassName('log')[0];
	++cnt_logs;
	output.innerHTML = '<span> {0} </span> <br>'.format(message) + output.innerHTML;
	while (cnt_logs > MAX_CNT_LOGS) {
		output.innerHTML = output.innerHTML.slice(0, output.innerHTML.lastIndexOf("<span>") - output.innerHTML.length);
		cnt_logs -= 1;
	}
}