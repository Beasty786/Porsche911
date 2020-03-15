

var canvas;   // The canvas that is used as the drawing surface
var graphics; // The 2D graphics context for drawing on the canvas.

var X_LEFT = -4;    // The xy limits for the coordinate system.
var X_RIGHT = 4;
var Y_BOTTOM = -3;
var Y_TOP = 3;

var BACKGROUND = "white";  // The display is filled with this color before the scene is drawn.

var pixelSize;  // The size of one pixel, in the transformed coordinates.

var frameNumber = 0;  // Current frame number. goes up by one in each frame.

// TODO:  Define any other necessary state variables.

/**
 *  Responsible for drawing the entire scene.  The display is filled with the background
 *  color before this function is called.
 */
function drawWorld() {

    // TODO: Draw the content of the scene.
   // rotatingRect();  // (DELETE THIS EXAMPLE)
    car();
    //carName();

}

function carName() {
    graphics.save();

    graphics.scale(0.02 , 0.02);
    graphics.transform(.02,1,1,.02,0,0);
    graphics.rotate(Math.PI/2);
    graphics.font = " 12px Brush Script MT";
    graphics.fillStyle = "rgb(240, 192, 60)";
    graphics.fillText("Porsche 911",-50,0);

    graphics.restore();

}

/**
 * This method is called just before each frame is drawn.  It updates the modeling
 * transformations of the objects in the scene that are animated.
 */
function updateFrame() {
    frameNumber++;
    // TODO: If other updates are needed for the next frame, do them here.
}


// TODO: Define methods for drawing the objects in the scene.

function rotatingRect() { // (DELETE THIS EXAMPLE)
    graphics.save();  // (It might be necessary to save/restore transform and color)
    graphics.fillStyle = "red";
    graphics.rotate( (frameNumber*0.75) * Math.PI/180 );
    graphics.scale( 2, 2 );
    filledRect();
    graphics.restore();
}


//------------------- Some methods for drawing basic shapes. ----------------

function line() { // Draws a line from (-0.5,0) to (0.5,0)
    graphics.beginPath();
    graphics.moveTo(-0.5,0);
    graphics.lineTo(0.5,0);
    graphics.stroke();
}

function rect() { // Strokes a square, size = 1, center = (0,0)
    graphics.strokeRect(-0.5,-0.5,1,1);
}

function filledRect() { // Fills a square, size = 1, center = (0,0)
    graphics.fillRect(-0.5,-0.5,1,1);
}

function circle() { // Strokes a circle, diameter = 1, center = (0,0)
    graphics.beginPath();
    graphics.arc(0,0,0.5,0,2*Math.PI);
    graphics.stroke();
}

function filledCircle() { // Fills a circle, diameter = 1, center = (0,0)
    graphics.save();
    graphics.beginPath();
    graphics.arc(0,0,0.5,0,2*Math.PI);
    graphics.fill();
    graphics.restore();
}
function filledCircleI() { // Fills a circle, diameter = 1, center = (0,0)
    graphics.beginPath();
    graphics.arc(0,0,0.333,0,2*Math.PI);
    graphics.fill();
}

function filledTriangle(g2) {// Filled Triangle, width 1, height 1, center of base at (0,0)
    g2.beginPath();
    g2.moveTo(-0.5,0);
    g2.lineTo(0.5,0);
    g2.lineTo(0,1);
    g2.closePath();
    g2.fill();
}




// ------------------------------- graphics support functions --------------------------

/**
 * Draw one frame of the animation.  Probably doesn't need to be changed,
 * except maybe to change the setting of preserveAspect in applyLimits().
 */
function draw() {
    graphics.save();  // to make sure changes don't carry over from one call to the next
    graphics.fillStyle = BACKGROUND;  // background color
    graphics.fillRect(0,0,canvas.width,canvas.height);
    graphics.fillStyle = "black";
    applyLimits(graphics,X_LEFT,X_RIGHT,Y_TOP,Y_BOTTOM,false);
    graphics.lineWidth = pixelSize;  // Use 1 pixel as the default line width
    drawWorld();
    graphics.restore();
}

/**
 * Applies a coordinate transformation to the graphics context, to map
 * xleft,xright,ytop,ybottom to the edges of the canvas.  This is called
 * by draw().  This does not need to be changed.
 */
function applyLimits(g, xleft, xright, ytop, ybottom, preserveAspect) {
    var width = canvas.width;   // The width of this drawing area, in pixels.
    var height = canvas.height; // The height of this drawing area, in pixels.
    if (preserveAspect) {
        // Adjust the limits to match the aspect ratio of the drawing area.
        var displayAspect = Math.abs(height / width);
        var requestedAspect = Math.abs(( ybottom-ytop ) / ( xright-xleft ));
        var excess;
        if (displayAspect > requestedAspect) {
            excess = (ybottom-ytop) * (displayAspect/requestedAspect - 1);
            ybottom += excess/2;
            ytop -= excess/2;
        }
        else if (displayAspect < requestedAspect) {
            excess = (xright-xleft) * (requestedAspect/displayAspect - 1);
            xright += excess/2;
            xleft -= excess/2;
        }
    }
    var pixelWidth = Math.abs(( xright - xleft ) / width);
    var pixelHeight = Math.abs(( ybottom - ytop ) / height);
    pixelSize = Math.min(pixelWidth,pixelHeight);
    g.scale( width / (xright-xleft), height / (ybottom-ytop) );
    g.translate( -xleft, -ytop );
}


//------------------ Animation framework ------------------------------

var running = false;  // This is set to true when animation is running

function frame() {
    if (running) {
        // Draw one frame of the animation, and schedule the next frame.
        updateFrame();
        draw();
        requestAnimationFrame(frame);
    }
}

function doAnimationCheckbox() {
    var shouldRun = document.getElementById("animateCheck").checked;
    if ( shouldRun != running ) {
        running = shouldRun;
        if (running)
            requestAnimationFrame(frame);
    }
}

//----------------------- initialization -------------------------------

function init() {
    canvas = document.getElementById("thecanvas");
    if (!canvas.getContext) {
        document.getElementById("message").innerHTML = "ERROR: Canvas not supported";
        return;
    }
    graphics = canvas.getContext("2d");
    document.getElementById("animateCheck").checked = false;
    document.getElementById("animateCheck").onchange = doAnimationCheckbox;
    draw();
}


function theWheelI() {
    var innerRadius = 0.3333;


    graphics.save();
    graphics.rotate( (frameNumber*0.75) * Math.PI/45 );
    graphics.lineWidth = .03;
    graphics.strokeStyle = "red";
    graphics.fillStyle = "grey";
    graphics.beginPath();

    graphics.save();

    for(var i = 0 ; i < 3 ; i++){
        graphics.rotate(Math.PI/3);
        graphics.moveTo(-.3333,0);
        graphics.lineTo(.3333 , 0);
    }
    graphics.restore();


    graphics.arc(0,0,innerRadius , 0 ,2*Math.PI);
    graphics.closePath();
    graphics.fill();
    graphics.stroke();
    graphics.restore();



}

function theWheelO() {

    var outerRadius = .5;
    graphics.save();
    graphics.rotate( (frameNumber*0.75) * Math.PI/90 );
    graphics.fillStyle = "black";
    filledCircle();
    graphics.fill();
    graphics.restore();
}
function drawWheel() {

    graphics.save();

    graphics.save();
    graphics.translate(2,-1);
    theWheelO();
    theWheelI();
    graphics.restore();

    graphics.save();
    graphics.translate(-2,-1);
    theWheelO();
    theWheelI();
    graphics.restore();

    graphics.restore();
}

function car(x, y) {
    graphics.save();
    graphics.translate(6,0);

    graphics.translate((-frameNumber*0.015)%13,0);
    graphics.scale(0.5,.5);
    graphics.save();
    graphics.translate(0.3,-.8);

    carName();
    graphics.restore();

    graphics.save();

    graphics.lineWidth = .03;
    graphics.strokeWidth = 3;
    graphics.strokeStyle = "rgb(6, 106, 153)";
    graphics.beginPath();
    graphics.moveTo(2.415 , -1.2);
    graphics.lineTo(3 , -1.2);
    graphics.lineTo(3.17, -1.17);
    graphics.lineTo(3.5 , -1);
    graphics.lineTo(3.5 , -.83);
    graphics.lineTo(3.33 , -0.83);
    graphics.lineTo(3.33 , -.72);
    graphics.lineTo(3.85 , -0.67);
    graphics.lineTo(3.85, -.5);
    graphics.lineTo(3 , -.5);
    graphics.moveTo(3.67 , -.5);
    graphics.lineTo(3.67 , -.364);
    graphics.lineTo(3.5 , -.364);
    graphics.lineTo(3.5 , -.1);
    graphics.lineTo(3.67, -.1);
    graphics.lineTo(3.64 , -0.364);
    graphics.moveTo(3.67, -.1);
    graphics.lineTo(3.72 , 0);
    graphics.lineTo( 3.64 , 0.204);
    graphics.moveTo(3.33 , .4);
    graphics.lineTo(3 , .67);
    graphics.lineTo(2.33 , 1);
    graphics.lineTo(2 , 1.17);
    graphics.lineTo(1.5 , 1.28);
    graphics.lineTo(1 , 1.33);
    graphics.lineTo(.35 , 1.3);
    graphics.lineTo(0.32, 1.28);
    graphics.lineTo(-1.1 , .35);
    graphics.lineTo(-2 , .3);
    graphics.lineTo(-2.5 , .25);
    graphics.lineTo(-3,0.17);
    graphics.lineTo(-3.4 , 0);
    graphics.lineTo(-3.67 , -.33);
    graphics.lineTo(-3.67 , -.67);
    graphics.lineTo(-3.585 , -.9);
    graphics.lineTo(-3.385 , -.9);
    graphics.lineTo(-3.4 , -1);
    graphics.lineTo(-3.5 , -1);
    graphics.lineTo(-3.3 , -1.2);
    graphics.lineTo(-2.415,-1.2);
    graphics.moveTo(3.7 , 0);
    graphics.lineTo(-3.4 , 0);
    graphics.moveTo(3.64 , 0.204);
    graphics.lineTo(3.83 , .34);
    graphics.lineTo(3.83 , .4);
    graphics.lineTo(3.33 , .4);
    graphics.lineTo(2.296 , .4);
    graphics.lineTo(2 , .966);
    graphics.moveTo(2.296 , .4);
    graphics.lineTo(2.347 , .34);
    graphics.lineTo(3.83 , .34);
    graphics.moveTo(2.347 , .34);
    graphics.lineTo(2.4 , .33);
    graphics.lineTo(2.67 , .289);
    graphics.lineTo(3 , .238);
    graphics.lineTo(3.64 , .204);
    graphics.moveTo(2 , .966);
    graphics.lineTo( 1.9575, 1.17);


    // drawing front light
    graphics.moveTo(-3 ,0 );
    graphics.lineTo(-3.27 , -.33);
    graphics.lineTo(-3.67 , -.33)

    //Drawing the inside window
    graphics.moveTo(.35 , 1.228);
    graphics.lineTo(1 , 1.228);
    graphics.lineTo(1.4 , 1.178);
    graphics.lineTo(1.4 , .204);
    graphics.lineTo(.347 , .153 );
    graphics.lineTo(.306 , .17);
    graphics.lineTo(-.272 , .204);
    graphics.lineTo(-.98 , .33);
    graphics.lineTo(.35,1.228);
    graphics.moveTo(1.4 , 1.178);
    graphics.lineTo(1.796,1.051);
    graphics.lineTo(1.932 , .551);
    graphics.lineTo(1.83 , .4);
    graphics.lineTo(1.4 , .204);

    // Drawing the inside seat
    graphics.moveTo(.847 , .165);
    graphics.lineTo(1.238 , .67);
    graphics.lineTo(1.137 , .772);
    graphics.lineTo(1.017 , .721);
    graphics.lineTo(.785, .3572);
    graphics.lineTo(.847 , .323);
    graphics.lineTo(.728 , .164);

    // Drawing the steering wheel
    graphics.moveTo(-.272 , .204);
    graphics.lineTo(-.42, .398);
    graphics.lineTo(-.403 ,0.415);
    graphics.lineTo( -.24, .204);


    //drawing the Door
    graphics.moveTo(1.4 , .204);
    graphics.lineTo(1.432 , 0);
    graphics.lineTo(1.432 , -.5);
    graphics.lineTo(1.204 , -.966);
    graphics.lineTo(-1.102 , -.966);
    graphics.lineTo(-1.187 , -.5);
    graphics.lineTo(-1.102 , 0);
    graphics.lineTo(-.98 , .33);
    graphics.moveTo(-1.187, -.5);
    graphics.lineTo(-1, -.55);
    graphics.lineTo(1.232 , -.55);
    graphics.lineTo(1.432 , -.5);

    // Draw door handle
    graphics.moveTo(1 , -.17);
    graphics.lineTo(1.22 , -.15);
    graphics.lineTo(1.22 , -.17);
    graphics.lineTo(1 , -.19);
    graphics.lineTo(1, -.17);

    //One Missing line
    graphics.moveTo(-1.5, -1.1);
    graphics.lineTo(1.5 , -1.1);

    graphics.stroke();
    graphics.closePath();
    graphics.restore();
    drawWheel();
    graphics.restore();
}

