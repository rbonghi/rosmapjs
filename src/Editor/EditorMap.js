/**
 * @author Raffaello Bonghi raffaello.bonghi@officinerobotiche.it
 */

/**
 *
 */
ROSMAP.EditorMap = function(options) {
	options = options || {};
	var rootObject = options.rootObject;
	var currentGrid = options.currentGrid;

	// internal drawing canvas
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');

  if (typeof currentGrid.width !== 'undefined') {
		this.width = currentGrid.width/currentGrid.scaleX;
		this.height = currentGrid.height/currentGrid.scaleY;
	} else {
		this.width = rootObject.canvas.width;
		this.height = rootObject.canvas.height;
	}
	this.canvas.width = this.width;
	this.canvas.height = this.height;

  //TODO improve with use Stage
  //this.stage = new createjs.Stage(canvas);
	// create the bitmap
	createjs.Bitmap.call(this, this.canvas);
	// change Y direction
	this.y = -this.height * currentGrid.scaleX;

	this.scaleX = currentGrid.scaleX;
	this.scaleY = currentGrid.scaleY;

	this.width *= this.scaleX;
	this.height *= this.scaleY;
  if (typeof currentGrid.width !== 'undefined') {
		this.x += currentGrid.pose.position.x;
		this.y -= currentGrid.pose.position.y;
	}
};
ROSMAP.EditorMap.prototype.__proto__ = createjs.Bitmap.prototype;

/**
 *
 *
 */
ROSMAP.EditorMap.prototype.updateSize = function(currentGrid) {
  var that = this;
  var canvasPic = new Image();
  canvasPic.src = this.canvas.toDataURL();

  this.width = currentGrid.width/currentGrid.scaleX;
  this.height = currentGrid.height/currentGrid.scaleY;
  this.canvas.width = that.width;
  this.canvas.height = that.height;

  this.y = -this.height * currentGrid.scaleX;

  this.scaleX = currentGrid.scaleX;
  this.scaleY = currentGrid.scaleY;

  this.width *= this.scaleX;
  this.height *= this.scaleY;

  this.x = currentGrid.pose.position.x;
  this.y -= currentGrid.pose.position.y;

  canvasPic.onload = function () {
    that.context.drawImage(canvasPic, 0, 0);
  };
};

/**
 *
 */
ROSMAP.EditorMap.prototype.getMatrix = function() {
	var widthPX = this.width/this.scaleX;
	var heightPX = this.height/this.scaleY;
	// Get image matrix
	var imageData = this.context.getImageData(0, 0, widthPX, heightPX);
	//TODO use this function if you use Stage
	//var imageData = this.stage.canvas.getContext('2d').getImageData(0, 0, widthPX, heightPX);
	var data = [];
	// Flip map matrix on y axis
	for (var y = heightPX; y > 0; y--) {
		for (var x = 0; x < widthPX; x++) {
			var i = (widthPX*y + x) * 4;
			// Check if alpha value is zero
			if(imageData.data[i + 3] === 0) {
				data.push(ROSMAP.VALUE_UNWRITTEN);
			} else {
				switch(imageData.data[i]) {
					// Obstacle
					case 0:
						data.push(ROSMAP.VALUE_OBSTACLE);
						break;
					// Free space
					case 255:
						data.push(ROSMAP.VALUE_FREE_SPACE);
						break;
					// Unknown
					default:
						data.push(ROSMAP.VALUE_UNKNOWN);
						break;
				}
			}
		}
	}
	return data;
};

/**
 *
 */
ROSMAP.EditorMap.prototype.clearMap = function() {
	this.context.clearRect(0, 0, this.width/this.scaleX, this.height/this.scaleY);
};
