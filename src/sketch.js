let canvas;
let crayon;
const timeLimit = 14;
let lastTime = 0;
let looping = true;

const BGCOLORS = [
    { name: 'black', hex: '#000' },
    { name: 'white', hex: '#FFF' },
    { name: 'pink', hex: '#FFC0CB' },
];

const FGCOLORS = [
    { name: 'red', hex: '#f44336' },
    { name: 'pink', hex: '#E91E63' },
    { name: 'purple', hex: '#9C27B0' },
    { name: 'deeppurple', hex: '#673AB7' },
    { name: 'indigo', hex: '#3F51B5' },
    { name: 'blue', hex: '#2196F3' },
    { name: 'lightblue', hex: '#03A9F4' },
    { name: 'cyan', hex: '#00BCD4' },
    { name: 'teal', hex: '#009688' },
    { name: 'green', hex: '#4CAF50' },
    { name: 'lightgreen', hex: '#8BC34A' },
    { name: 'lime', hex: '#CDDC39' },
    { name: 'yellow', hex: '#FFEB3B' },
    { name: 'amber', hex: '#FFC107' },
    { name: 'orange', hex: '#FF9800' },
    { name: 'deeporange', hex: '#FF5722' },
    { name: 'brown', hex: '#795548' },
    { name: 'grey', hex: '#9E9E9E' },
];

const CRAYONSIZES = [
    { name: 'SM', size: 30 },
    { name: 'MD', size: 40 },
    { name: 'LG', size: 50 },
];

// Set the canvas size based on size window and header size
const setCanvasSize = () => {
    const topBar = document.querySelector('header');
    const canvasHeight = window.innerHeight - document.querySelector('header').offsetHeight;

    const canvasSize = {
        width: window.innerWidth,
        height: canvasHeight,
    };

    return canvasSize;
};

// Draw the color palette & size option bars
const renderColorPalette = () => {
    const divSize = '32px';

    for (let i = 0; i < FGCOLORS.length; i++) {
        let box = document.createElement('div');
        box.style.backgroundColor = FGCOLORS[i].hex;
        box.style.width = box.style.height = divSize;
        box.classList.add('fg', 'tile');
        document.querySelector('.fg-colors').appendChild(box);
    }

    for (let i = 0; i < BGCOLORS.length; i++) {
        let box = document.createElement('div');
        box.style.backgroundColor = BGCOLORS[i].hex;
        box.style.width = box.style.height = divSize;
        box.classList.add('bg', 'tile');
        document.querySelector('.bg-colors').appendChild(box);
    }

    for (let i = 0; i < CRAYONSIZES.length; i++) {
        let box = document.createElement('div');
        box.classList.add('size', 'tile');
        box.style.width = box.style.height = divSize;
        box.innerHTML = CRAYONSIZES[i].name;
        document.querySelector('.crayon-sizes').appendChild(box);
    }
};

// Update the active colors
const updateColorPalette = (bg, fg, size) => {
    // Reset all actve divs
    let current = document.querySelectorAll('.active');
    for (let i = 0; i < current.length; i++) {
        current[i].classList.remove('active');
    }

    // Set BG color
    document.querySelector('#canvas-container').style.backgroundColor = BGCOLORS[bg].hex;
    let bgOptions = document.querySelectorAll('.bg');
    bgOptions[bg].classList.add('active');

    // Set FG color
    let fgOptions = document.querySelectorAll('.fg');
    fgOptions[fg].classList.add('active');

    // Set Size
    let sizeOptions = document.querySelectorAll('.size');
    sizeOptions[size].classList.add('active');
};

// Set canvas and crayzon colors and size
function resetCanvas() {
    clear();

    // Change background and foreground color
    let bgColorId = floor(random(0, BGCOLORS.length));
    let fgColorId = floor(random(0, FGCOLORS.length));
    let sizeId = floor(random(0, CRAYONSIZES.length));
    updateColorPalette(bgColorId, fgColorId, sizeId);
    crayon.setColorAndSize(fgColorId, sizeId);
}

function setup() {
    // Get canvas dimensions
    const { width, height } = setCanvasSize();
    noStroke();

    // Create toolbar divs for each bg & fg color
    renderColorPalette();

    // Create canvas
    canvas = createCanvas(width, height);
    canvas.parent('canvas-container');

    crayon = new Crayon(mouseX, mouseY);
    resetCanvas();
}

// Main p5 draw loop
function draw() {
    crayon.draw();
    crayon.update();

    // Set timer
    let timeSpent = millis();

    // Time check
    if (timeSpent < lastTime + timeLimit * 1000) {
        let e = timeSpent / 1000;
        let arcEnd = radians((360 / timeLimit) * e - 90); // calculate the end of the arc based on time
        fill(crayon.color);
        arc(width - 40, height - 40, 40, 40, PI + HALF_PI, arcEnd); // draw the timer arc
    } else {
        lastTime = millis();
        resetCanvas();
    }
}

function Crayon(x, y) {
    this.x = x;
    this.y = y;
    this.color;
    this.size;

    this.draw = function () {
        fill(this.color);

        if (!mouseIsPressed) {
            ellipseMode(CENTER);
            ellipse(this.x, this.y, this.size, this.size); // ellipse at the mouse position with random diameter
        }
    };

    this.update = function () {
        this.x = mouseX;
        this.y = mouseY;
    };

    this.setColorAndSize = function (color, size) {
        this.color = FGCOLORS[color].hex;
        this.size = CRAYONSIZES[size].size;
    };
}

function windowResized() {
    const { width, height } = setCanvasSize();
    resizeCanvas(width, height);
}

// Pause the sketch with space bar
function keyPressed() {
    if (key == ' ') {
        togglePlaying();
    }
}

// Handle looping toggle
function togglePlaying() {
    if (looping == true) {
        noLoop();
        looping = false;
    } else {
        loop();
        looping = true;
    }
}
