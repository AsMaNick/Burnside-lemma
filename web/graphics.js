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
                var col = data[num][k] % COLORS.length;
                var ang = k * 2 * PI / data[num].length;
                var x = Math.cos(ang) * BIG_RADIUS;
                var y = -Math.sin(ang) * BIG_RADIUS;
                var small_circle = g.append('circle')
                    .attr('cx', cx + x)
                    .attr('cy', cy + y)
                    .attr('r', SMALL_RADIUS)
                    .attr('fill', COLORS[col])
                    .attr('stroke', 'black');
                    
                if (showColorNumbers()) {
                    var text = g.append('text')
                        .attr('x', cx + x)
                        .attr('y', cy + y + TEXT_DY)
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'black')
                        .style('font-weight', 'bold')
                        .style('font-size', FONT_SIZE)
                        .text('{0}'.format(col + 1));
                }
            }            
            ++num;
            cx += MARGIN + 2 * BIG_RADIUS;
        }
        cy += MARGIN + 2 * BIG_RADIUS;
    }
}

function redraw_partitions(rows, columns, data) {
    last_type = 'partitions';
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
            var arc = d3.arc()
                .innerRadius(BIG_RADIUS - 3 * SMALL_RADIUS)
                .outerRadius(BIG_RADIUS);
                
            var pie = d3.pie()
                .startAngle(PI / 2)
                .endAngle(PI / 2 - 2 * PI)
                .value(function(d) { return d; })
                .sort(null);
                
            var g2 = g.append('g').attr('transform', 'translate({0}, {1})'.format(cx, cy));
            
            var arcs = g2.selectAll('.arc')
                .data(pie(data[num]))
                .enter()
                .append('g')
                .attr('class', 'arc')
              
            arcs.append('path')
                .attr('d', arc)
                .attr('fill', function(d) { return COLORS[d.index % COLORS.length] } );
                
                    
            if (showColorNumbers()) {
                arcs.append('text')
                    .attr('transform', function(d) { var center = arc.centroid(d); return 'translate({0},{1})'.format(center[0], center[1] + 3); } )
                    .attr('text-anchor', 'middle')
                    .style('font-size', FONT_SIZE)
                    .style('font-weight', 'bold')
                    .text(function(d) { return d.data; });
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
    } else {
        redraw_partitions(last_rows, last_columns, last_data);
    }
}