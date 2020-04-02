var c1, c2;
var m, n;
var num;
var i, s;
var range;
var flag;

function setup() 
{
  noStroke();
  s = (window.innerWidth > 500) ? 500 : window.innerWidth;
  var myCanvas = createCanvas(s, s);
  myCanvas.parent('theCanvas');
  c1 = color(255, 190, 200);
  c2 = color(30, 190, 255);
  m = 1;
  n = 1;
  num = 2;
  i = 1;
  range = 90;
  flag = 0;
}

function draw() {
  if (range <= 5) {
   if (range == 0) {
      background(255);
      textSize(26);
      textAlign(CENTER, CENTER);
      text("fail | refresh to try again", width/2, height/2);
      text("level "+(num-1), width/2, height/2+40);
    flag = 1;
   } else {
     background(255);
     textSize(26);
      textAlign(CENTER, CENTER);
      text("end | you did an excellent job!", width/2, height/2);
      text("level "+(num-1), width/2, height/2 +50);
    flag = 1;
    //remove();
   }
  } else blocks();
}

function mouseClicked() {
  if (flag == 0) {
   if ((mouseX > 1 + m * s / num && mouseX < 1 + m * s / num + s /num - 2) && (mouseY > 1 + n * s / num && mouseY < 1 + n * s / num + s /num - 2)) {
     background(255);
     num++;
     m = (int)(random(1) * num);
     n = (int)(random(1) * num); 
/*     float redv = red(c2) + 20 * i;
     float bluev = blue(c2) - 3.8 * i;
     c2 = color(redv, 150, bluev);
*/
     let redv = (random(1) * 255);
     let grev = (random(1) * 255);
     let bluv = (random(1) * 255);
     c1 = color(redv, grev, bluv);
     redv = red(c1) + range * i;
     grev = green(c1) + range * i;
     bluv = blue(c1) + range * i;
     c2 = color(redv, grev, bluv);
     fill(c2);
     rect(1 + m * s / num, 1 + n * s / num, s /num - 2, s / num - 2);
     if (random(1) > 0.5) i = 1;
     else i = -1;
     range -= 5;
  } else range = 0; 
  }
}

function blocks () {
   for (let i = 0; i < num; i++) {
     for (let j = 0; j < num; j++) {
        fill(c1);
        rect(1 + i * s / num, 1 + j * s / num, s /num - 2, s / num - 2);
     }
   }
   fill(c2);
   rect(1 + m * s / num, 1 + n * s / num, s /num - 2, s / num - 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
