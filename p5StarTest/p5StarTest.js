let stars = [];
let c1, c2, c3, c0;
let flag1;
let s;
let button_up, button_right, button_left;
let button_s, button_p, button_clear;
let scale_v;

function setup() {
  c1 = color(243, 244, 129);
  c2 = color(127, 221, 234);
  c3 = color(239, 204, 210);
  c0 = color(255);
  flag1 = 0;

  cursor(CROSS);
  s = (window.innerWidth < 730) ? window.innerWidth - 32 : window.innerWidth * 0.75 - 30;  
  let myCanvas = createCanvas(s, s * 5 / 7);
  myCanvas.parent('theCanvas');
  stroke(255);
  background(249, 242, 228);
  
  let scale = (window.innerWidth < 730) ? ((window,innerWidth - 30) / 280) : 2.5;
  scale_v = (window.innerWidth - 30) / 225;
  
  for (let i = 0; i < 20; i++) {
     stars[i] = new Star(c1, random(30, width - 30), random(30, height - 30), 5, (window.innerWidth - 30) / 75 + scale * i);  
  }
  
  button_s = createButton('save (tif)');
  button_s.mousePressed(shot_s);
  button_s.parent("theButtons");
  button_p = createButton('save (png)');
  button_p.mousePressed(shot_p);
  button_p.parent("theButtons");
  
  button_up = createButton('no rotation');
  button_up.mousePressed(noRot);
  button_up.parent("theButtons");
  
  button_right = createButton('rotation 1');
  button_right.mousePressed(rot1);
  button_right.parent("theButtons");
  
  button_left = createButton('rotation 2');
  button_left.mousePressed(rot2);
  button_left.parent("theButtons");
  
  button_clear = createButton('clear canvas');
  button_clear.mousePressed(cclear);
  button_clear.parent("theButtons");
}

function draw() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].moving();
    if (keyIsPressed) {
      if (keyCode == RIGHT_ARROW) flag1 = 1;
      if (keyCode == LEFT_ARROW) flag1 = 2;
      if (keyCode == UP_ARROW || keyCode == DOWN_ARROW) flag1 = 0;
      if (key == ' ') background(249, 242, 228);
    }
    switch(flag1) {
      case 1: stars[i].rot1(); break;
      case 2: stars[i].rot2(); break;
      default: stars[i].display();
    }
    if (mouseIsPressed) {
      if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height) {
        stars[i].easing();
        stars[i].cchange();
      }
    }
  }
}
function keyPressed() {
 if (keyIsDown(83)) shot_s();
 if (keyIsDown(80)) shot_p();
}

function shot_s() {
  let s = "by Célia >> celia1414@github";
  textAlign(RIGHT, BOTTOM);
  textSize(17);
  textFont("monospace");
  text(s, width-5, height-5);
  save('shot.tif');  // 's' typed 
}

function shot_p() {
  let s = "by Célia >> celia1414@github";
  textAlign(RIGHT, BOTTOM);
  textSize(17);
  textFont("monospace");
  text(s, width-5, height-5);
  save('shot.png');  // 'p' typed 
}

function noRot() { flag1 = 0; }
function rot1() { flag1 = 1; }
function rot2() { flag1 = 2; }
function cclear() { background(249, 242, 228); }

function mouseReleased() {
  if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height)
    for (let i = 0 ; i < stars.length; i++) stars[i].c = color(255);
}

function star(x, y, n, r) {
   let i; 
   let angle = 2* PI / (n * 2);
   let dx, dy;
   
   beginShape();
  {
    for (i = 0; i < 2 * n; i++) {
      if (i % 2 == 0) {                      // even points
        dx = r * sin(angle * i);
        dy = r * (1 - cos(angle * i));
        vertex(x + dx, y - r + dy);
      } else {                               // odd points
        dx = r / 2 * sin(angle * i);
        dy = r / 2 * (1 - cos(angle * i));
        vertex(x + dx, y - r /2 + dy);
      }
    }
  }
  endShape(CLOSE);
}

class Star {
  constructor(c, x, y, n, r) {
    this.acceleration = createVector(random(-0.01, 0.02), random(-0.012, 0.01));
    this.velocity = createVector(random(-0.01, 0.02), random(-0.012, 0.01));
    this.position = createVector(x, y);
    this.i = 1;       // flip-flop (stroke color toggling)
    this.j = 0.01;    // rotate radian 1
    this.k = -0.02;   // rotate radian 2
    this.c = c;
    this.n = n;
    this.r = r;
  }
  
  display() {
    fill(this.c);
    star(this.position.x, this.position.y, this.n, this.r);
  }
  
  easing() {
    let targetX = mouseX;
    let targetY = mouseY;
    let dx = targetX - this.position.x;
    let dy = targetY - this.position.y;
    
    this.position.x += dx * 0.06;
    this.position.y += dy * 0.06;
  }
  
  moving() {
    if (this.velocity.x > scale_v) this.velocity.x = 1;
    if (this.velocity.y > scale_v) this.velocity.y = 1;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (this.position.x < this.r || this.position.x > width - this.r) this.velocity.x *= random(-1.2, -0.8);
    if (this.position.y < this.r || this.position.y > height - this.r) this.velocity.y *= random(-1.2, -0.8);   
  }
  
  cchange() {
    stroke(color(random(60, 100), random(200, 255), random(200, 255)));
    this.c = (this.i > 0) ? c1 : c0;
    this.i *= -1;
  }
  rot1() {
    push();
      translate(this.position.x, this.position.y);
      this.j += random(0.03);
      rotate(this.j);
      fill(this.c);
      star(0, 0, this.n, this.r);
    pop();
  }
  rot2() {
    push();
      translate(this.position.x, this.position.y);
      this.k -= random(0.01, 0.025);
      rotate(this.k);
      fill(this.c);
      star(0, 0, this.n, this.r);
    pop();
  }
}

function windowResized() {
  let s = (window.innerWidth < 730) ? window.innerWidth - 32 : window.innerWidth * 0.75 - 30;   
  resizeCanvas(s, s * 5 / 7);
  background(249, 242, 228);
}
