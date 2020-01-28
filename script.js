/*editing the image*/

const inputs = document.querySelectorAll('.controls input');
function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

    console.log(`--${this.name}`);
}
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


/*uploading a pic! in a canvas*/

function el(id){return document.getElementById(id);} // Get elem by ID

var canvas  = el("canvas");
var context = canvas.getContext("2d");

var height;
var width;
var canvasPosition;
var canvasPositionX;
var canvasPositionY;

function readImage() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function(e) {
            var img = new Image();
            img.onload = function(){
                height = img.height;
                width = img.width;

                /*updates canvas size*/
                canvas.height = height;
                canvas.width = width;

                canvasPosition = canvas.getBoundingClientRect();
                console.log(canvasPosition);

                canvasPositionX = canvasPosition.x;
                canvasPositionY = canvasPosition.top;

                setupCanvasDraw();
            }
            img.addEventListener("load", function() {
                context.drawImage(img, 0, 0);
            });
            img.src = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
    }
}

el("fileUpload").addEventListener("change", readImage, false);

var mousedown = false;
var oldx = null;
var oldy = null;



//futurely implement a var dataURL = canvas.toDataURL(); way to screenshotar this

function setupCanvasDraw () {
    console.log(context);
    context.lineWidth = 10;
    context.lineCap = 'round';
    //futurely make these colors change
    context.strokeStyle = 'red';
}

function onMouseDown (e) {
    mousedown = true;
    e.preventDefault();
}

function onMouseUp (e) {
    mousedown = false;
    e.preventDefault();
}

function onMouseMove (e) {
    var x = e.pageX - canvasPositionX;
    var y = e.pageY - canvasPositionY;
    if (mousedown) {
        paint(x, y);
    }
}

function paint (x, y) {
    context.beginPath();
    console.log('x ' + x);
    console.log('y ' + y);
    if (oldx > 0 && oldy > 0) {
        context.moveTo(oldx, oldy);
    }

    context.lineTo(x, y);
    context.stroke();
    context.closePath();
    oldx = x;
    oldy = y;
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);



