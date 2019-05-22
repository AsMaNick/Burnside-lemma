function scaleUpOnclick() {
	if (current_scale + 1 < scales.length) {
		current_scale += 1;
		redraw();
	}
}

function scaleDownOnclick() {
	if (current_scale > 0) {
		current_scale -= 1;
		redraw();
	}
}

var last_generated_data, change_params = true;

function showOnclick() {
    clearErrors();
    
    task = getField('task');
    n = getIntField('vertices');
    c = getIntField('colors');
    use_reflections = document.getElementById('useReflections').checked;
    
    rows = getIntField('rowsPerPage');
    columns = getIntField('columnsPerPage');
    
    if (!validateRange(2, MAX_VERTICES, n, 'sp1') ||
        !validateRange(1, MAX_COLORS, c, 'sp2') ||
        !validateRange(1, MAX_ROWS, rows, 'sp3') ||
        !validateRange(1, MAX_COLUMNS, columns, 'sp4')) {
    
        return;
    }
    
    var start = getIntField('startFrom') - 1;
    if (start < 0) {
        showError('sp5', 'Should be integer from 1 to number of colorings');
        return;
    }
    
    if (change_params) {
        last_generated_data = getData(task, n, c, use_reflections);
        change_params = false;
    }
    var cnt = rows * columns;
    var data = [];
    for (var i = 0; i < cnt && start + i < last_generated_data.length; ++i) {
        data.push(last_generated_data[start + i]);
    }
    redraw_colorings(rows, columns, data);
}

function onchangeReflections() {
    change_params = true;
}

function onchangeVertices() {
    change_params = true;
}

function onchangeColors() {
    change_params = true;
}

function onchangeShowColorNumbers() {
    redraw();
}