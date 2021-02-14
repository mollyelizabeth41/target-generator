let scribble;
var distance;
var margin;

function setup() {
    createCanvas(windowWidth, windowHeight, SVG);

    d = select('.div-block');
   // e = select('.div-block-3');
    f = select('#my-gui-container');
    d.position(0, 0);
    rectMode(CENTER);
    guiSetup();
    noFill();
    scribble = new Scribble();
}

function draw() {
    background(gui.bColor);
    
        for (let i = windowWidth * gui.margin; i <= windowWidth * (1 - gui.margin); i += windowWidth * gui.xspacing) {
        for (let y = windowHeight * gui.ymargin; y <= windowHeight * (1 - gui.ymargin); y += windowHeight * gui.yspacing) {
            if (gui.randomScale) {
                distance = random(gui.Scale);
            } else {
                distance = gui.Scale;
            }
            target(i, y, distance, gui.Circles);
        }
    }
    noLoop();
}

//create function with 4 arguments/variables to use later
function target(xPos, yPos, steps, num) {
    //pass in variables 
    strokeWeight(gui.strokeWeight);
    stroke(gui.color);
    for (var i = 0; i <= num; i++) {
        scribble.scribbleEllipse(xPos, yPos, steps * i, steps * i);
    }
}

function update() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    redraw();
}

function guiSetup() {
    gui = new Gui();
    let gui_setup = new dat.GUI();

    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui_setup.domElement);

    gui_setup.add(gui, 'Circles', 0, 15).step(1).onChange(update);
    gui_setup.add(gui, 'Scale', 10, 75).step(1).onChange(update);
    gui_setup.add(gui, 'strokeWeight', 1, 10).step(1).onChange(update);
    gui_setup.add(gui, 'randomScale');
    gui_setup.add(gui, 'margin', 0, .5).step(.125).onChange(update);
    gui_setup.add(gui, 'ymargin', 0, .5).step(.125).onChange(update);
    gui_setup.add(gui, 'xspacing', .125, .25).step(.125).onChange(update);
    gui_setup.add(gui, 'yspacing', .125, .25).step(.125).onChange(update);
    gui_setup.addColor(gui, 'color').onChange(update);;
    gui_setup.addColor(gui, 'bColor').onChange(update);
    //let gui_d = gui_setup.addFolder('Description');
    //gui_setup.add(gui, 'dbWidth', 0, 20).step(1).onChange(description);
    gui_setup.add(gui, 'description').onChange(description);

    gui_setup.addColor(gui, 'dColor').onChange(description);
    gui_setup.open();

    var obj = {
        Download_SVG: function () {
            save("mySVG.svg"); // give file name
            print("saved svg");
            noLoop(); // we just want to export once
        }
    };

    gui_setup.add(obj, 'Download_SVG');
    //gui_setup.closed = true;
}

function description() {

    f.style('color', gui.dColor);

    if (gui.description) {

        d.style('color', gui.dColor);
        //d.style('border', gui.dbWidth + 'px' + ' solid');
        //e.style('border-bottom', gui.dbWidth + 'px' + ' solid');
        d.show();

    } else {
        d.style('display', 'none');
    }
}

function Gui() {
    this.Circles = 2;
    this.Scale = 30;
    this.strokeWeight = 2;
    this.margin = .125;
    this.ymargin = .125;
    this.xspacing = .125;
    this.yspacing = .125;
    this.randomScale = true;
    this.color = [221, 255, 195];
    this.description = true;
    this.bColor = '#e49f00';
    //this.dbWidth = 0;
    this.dColor = '#000000';

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
