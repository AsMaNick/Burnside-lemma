function reset_svg(rows, columns) {
    d3.select('body').select('svg').remove();
    d3.select('body').select('#canvas').append('svg')
        .attr('width', (MARGIN + columns * (MARGIN + 2 * BIG_RADIUS)) * getScale())
        .attr('height', (MARGIN + rows * (MARGIN + 2 * BIG_RADIUS)) * getScale());
}

var last_rows, last_columns, last_data, last_type = 'none';

function redraw_colorings(rows, columns, data) {
    last_type = 'colorings';
    last_rows = rows;
    last_columns = columns;
    last_data = data;
    
    reset_svg(rows, columns);
    var g = d3.select('body').select('svg').append('g').attr('transform', 'scale({0})'.format(getScale()));
    var num = 0;
    var cy = BIG_RADIUS + MARGIN;
    for (var i = 0; i < rows; ++i) {
        var cx = BIG_RADIUS + MARGIN;
        for (var j = 0; j < columns; ++j) {
            if (num >= data.length) {
                continue;
            }
            var big_circle = g.append('circle')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', BIG_RADIUS)
                .attr('fill', 'none')
                .attr('stroke', 'black');
                
            for (var k = 0; k < data[num].length; ++k) {
                var col = COLORS[data[num][k] % COLORS.length];
                var ang = k * 2 * PI / data[num].length;
                var x = Math.cos(ang) * BIG_RADIUS;
                var y = -Math.sin(ang) * BIG_RADIUS;
                var small_circle = g.append('circle')
                    .attr('cx', cx + x)
                    .attr('cy', cy + y)
                    .attr('r', SMALL_RADIUS)
                    .attr('fill', col)
                    .attr('stroke', 'black');
            }            
            ++num;
            cx += MARGIN + 2 * BIG_RADIUS;
        }
        cy += MARGIN + 2 * BIG_RADIUS;
    }
}

function redraw() {
    if (last_type == 'colorings') {
        redraw_colorings(last_rows, last_columns, last_data);
    }
}

redraw_colorings(2, 3, [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], [1], [3], [2, 5]]);