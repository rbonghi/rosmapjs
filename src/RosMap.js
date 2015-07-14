/**
 * @author Raffaello Bonghi raffaello.bonghi@officinerobotiche.it
 */

var ROSMAP = ROSMAP || {
  REVISION: '0.0.2'
};

ROSMAP.VALUE_OBSTACLE = 100;
ROSMAP.VALUE_FREE_SPACE = 0;
ROSMAP.VALUE_UNKNOWN = -1;
ROSMAP.VALUE_UNWRITTEN = 120;

/**
 *
 */
 Array.prototype.repeat = function(what, L){
  while(L) {
    this[--L]= what;
  }
  return this;
 };

/**
 *
 */
ROSMAP.square = function(options) {
	options = options || {};
	var map = options.EditorMap;
	var color = options.color || 'red';
	var lineWidth = options.lineWidth;

	var width = map.width/map.scaleX;
	var height = map.height/map.scaleY;
	map.context.beginPath();
	map.context.lineWidth = lineWidth;
	map.context.rect(map.context.lineWidth/2, map.context.lineWidth/2,
	width-map.context.lineWidth, height-map.context.lineWidth);
	map.context.strokeStyle = color;
	map.context.stroke();
};
