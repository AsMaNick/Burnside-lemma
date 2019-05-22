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

function get_field(name) {
	var elem = document.getElementsByName(name)[0];
	var txt = elem.value;
	return txt;
}
	
function get_int_field(name) {
	if (get_field(name) == '') {
		return 0;
	}
	return parseInt(get_field(name));
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

function randInt(l, r) {
	return parseInt(d3.randomUniform(l, r)());
}

function getTask() {
	return document.getElementById('task').value;
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