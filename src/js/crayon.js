const Crayon = (x, y) => {
	this.x = x;	// x-position of crayon shape
	this.y = y;	// y-position of crayon shape
	this.h = round(random(360));	// hue of crayon
	this.d = round(random(20, 40));	// diameter of crayon shape

	const draw = () => {
		// determine the color or erase mode
		if (mouseIsPressed) {
			fill(bgColor);
		} else {
	    drawColor = color(this.h, 100, 100);
			fill(drawColor);
		}
			ellipseMode(CENTER);  // draw ellipse from the center
			ellipse(this.x, this.y, this.d, this.d);	// ellipse at the mouse position with random diameter
	}

	const update = () => {
		this.x = mouseX;
		this.y = mouseY;
	}
}

export default Crayon
