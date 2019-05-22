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