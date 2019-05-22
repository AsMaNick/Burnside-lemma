var BIG_RADIUS = 100;
var SMALL_RADIUS = 8;
var MARGIN = 20;
var PI = 3.14159265358979323846;
var TEXT_DY = 4;
var FONT_SIZE = 11;

var MAX_CNT = 2000;
var MAX_VERTICES = 100;
var MAX_COLORS = 100;
var MAX_ROWS = 10;
var MAX_COLUMNS = 10;

var COLORS = ['#FFC000', '#9966CC', '#FBCEB1', '#7FFFD4', '#F5F5DC', '#DE5D83', '#CD7F32', '#800020', '#DE3163', '#7FFF00', '#F7E7CE', '#FF7F50', '#00FFFF', '#00FF3F', '#FFD700', '#4B0082', '#808080', '#B57EDC', '#BFFF00', '#FF4500', '#DA70D6', '#CCCCFF', '#FF0000', '#D2B48C'];

var scales = [0.25, 0.35, 0.5, 0.75, 0.9, 1, 1.2, 1.5, 2, 2.8];
var current_scale = scales.indexOf(1);
var MAX_CNT_LOGS = 200;