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
        !validateRange(2, MAX_COLORS, c, 'sp2') ||
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
    if (task == 'Colorings') {
        redraw_colorings(rows, columns, data);
    } else {
        redraw_partitions(rows, columns, data);
    }
}

function reflectionsOnchange() {
    change_params = true;
    document.getElementById('startFrom').value = '1';
}

function verticesOnchange() {
    change_params = true;
    document.getElementById('startFrom').value = '1';
}

function colorsOnchange() {
    change_params = true;
    document.getElementById('startFrom').value = '1';
}

function showColorNumbersOnchange() {
    redraw();
}

function nextPageOnclick() {
    if (!change_params) {
        rows = getIntField('rowsPerPage');
        columns = getIntField('columnsPerPage');
        
        if (!validateRange(2, MAX_VERTICES, n, 'sp1') ||
            !validateRange(2, MAX_COLORS, c, 'sp2') ||
            !validateRange(1, MAX_ROWS, rows, 'sp3') ||
            !validateRange(1, MAX_COLUMNS, columns, 'sp4')) {
        
            return;
        }
        
        var cnt = rows * columns;
        var start = getIntField('startFrom');
        if (start + cnt <= last_generated_data.length) {
            start += cnt;
            document.getElementById('startFrom').value = start.toString();
            showOnclick();
        } else {
            showError('sp7', 'This is the last page');
        }
    } else {
        showError('sp7', 'Click "Show" button first');
    }
}

function prevPageOnclick() {
    if (!change_params) {
        rows = getIntField('rowsPerPage');
        columns = getIntField('columnsPerPage');
        
        if (!validateRange(1, MAX_ROWS, rows, 'sp3') ||
            !validateRange(1, MAX_COLUMNS, columns, 'sp4')) {
        
            return;
        }
        
        var cnt = rows * columns;
        var start = getIntField('startFrom');
        if (start > 1) {
            start = Math.max(1, start - cnt);
            document.getElementById('startFrom').value = start.toString();
            showOnclick();
        } else {
            showError('sp7', 'This is the first page');
        }
    } else {
        showError('sp7', 'Click "Show" button first');
    }
}

function taskOnchange() {
    change_params = true;
    document.getElementById('startFrom').value = '1';
    task = getField('task');
    if (task == 'Colorings') {
        document.getElementById('verticesLabel').innerHTML = 'vertices:';
        document.getElementById('colorsLabel').innerHTML = 'colors:';
        document.getElementById('showColorNumbersLabel').innerHTML = 'Show color numbers';
        document.getElementById('vertices').style.width = '175px';
        document.getElementById('colors').style.width = '186px';
        document.getElementById('vertices').value = '4';
        document.getElementById('colors').value = '3';
    } else {
        document.getElementById('verticesLabel').innerHTML = 'arcs:';
        document.getElementById('colorsLabel').innerHTML = 'total length:';
        document.getElementById('showColorNumbersLabel').innerHTML = 'Show length of arcs';
        document.getElementById('vertices').style.width = '201px';
        document.getElementById('colors').style.width = '151px';
        document.getElementById('vertices').value = '3';
        document.getElementById('colors').value = '7';
    }
}