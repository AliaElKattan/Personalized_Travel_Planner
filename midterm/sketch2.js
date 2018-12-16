//vars
var click =  false;
var state = 0;
var egyptvisa, usvisa, egypt, us, substate, substate2, usflag, visa, moneysound, lose_sound, clock;
var stateswitch = 0;
var selected = 0;
var progress = 1;
var box = [];
var boxy = 170;
var paperindex=0;
var env1=55;
var env2=70;
var stamped = false;
var maily = 180;
var appstep = 1;
var randresult;
var docsrequiredy = 55;
var loadingx = 55;
var loadingdot = 250;

var visadoctext_y = 268;
var shippingtext_y = 278;
var label_y = 270;
var stamp_y = 275;
var papersy=73.5;
var check_count = 0;
var played1 = false;
var played2 = false;
var direction = 0;
var carx = 110;
var cary = 350;
var lose_played = false;


function preload() {
  egyptvisa = loadImage("egyptvisa.jpg");
  usvisa = loadImage("usvisa.jpg");
  egypt = loadImage("egyptpassport.jpg");
  us = loadImage("uspassport.jpg");
  egyflag = loadImage("egyptflag.png");
  usflag = loadImage("usaflag.png");
  cnflag = loadImage("canada.png");
  visa = loadImage("visa.png");
  ukflag = loadImage("ukflag.png");
  visafree = loadImage("visafree.png");
  wood = loadImage("wood.jpg");
  check = loadImage("check.png");
  stamp = loadImage("usa.png");
  pay = loadImage("pay.png");
  paybutton = loadImage("paybutton.png");
  paybutton2= loadImage("paybutton2.png");
  clouds = loadImage("clouds.jpg");
  clouds2 = loadImage("clouds2.jpg");
  plane = loadImage("planecursor.png");
  moneysound = loadSound("moneysound.wav");
  road = loadImage("road.png");
  car = loadImage("red_car.jpg");
  car2 = loadImage("red_car2.jpg");
  car3 = loadImage("red_car3.jpg");
  carside = loadImage("carside.png");
  denied = loadImage("denied.png");
  lose_sound = loadSound("lose.wav");
  clock = loadImage('clock.gif');
  canadapic = loadImage("toronto.jpg")
  ukpic = loadImage("london.jpg");
}

function setup() {

//  randresult = Math.round(random(0,2));
  randresult = 2;
  console.log(randresult); //I think its ironically poetic that the random var that determines the visa outcome is actually decided before you go through the process


    cnv = createCanvas(400,400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x,y);
    rectMode(CENTER);
    fill(100);
    imageMode(CENTER);

for (i = 0; i<7;i++) {
    box[i] = new Checklist(170+(20*i));
}

}

class Checklist {
  constructor(y) {
    this.y =  y;
    this.pressed=false;
    this.area = false;
    this.ytop = this.y+5;
    this.ybottom = this.y-5;
    this.draw = false;
  }

  drawBox() {
    rect(105,this.y,9,9);
  }

  drawCheck() {
    image(check,105,this.y,7,7);
  }

  collCheck() {
      if (this.pressed==false && mouseX>100 && mouseX < 110 && mouseY > this.ybottom && mouseY < this.ytop)
      this.area = true;
  }
}



function mouseClicked() {
  click = true;

  if (state == 0) {
    if (mouseX>160 && mouseX<240 && mouseY>245 && mouseY<290)
      state = 1;
    //  click = false;
  }

  if (state == 1) {

    //Egyptian passport
      if (mouseX>75 && mouseX<175 && mouseY >175 && mouseY<305) {
        state =2;
        substate = 0;
      }
    //American passport
      if (mouseX>225 && mouseX<315 && mouseY >175 && mouseY<305) {
        state = 2;
        substate = 1;
      }
  } //end of state 1

if (state == 2) {


if (substate == 0) { //Egyptian passport
  if (mouseX>310 && mouseX < 370 && mouseY >15 && mouseY < 65) {
    substate = 1; //clicked on flag on top right
}

if (mouseX>65 && mouseX<135 && mouseY>210 && mouseY<270) {
  selected = 1; //selected canada
}

if (mouseX>205 && mouseX<315 && mouseY>210 && mouseY<270) {
  selected = 2; //selected UK
}
} //end of substate 0 (egypt)

if (substate == 1) {
  if (mouseX>310 && mouseX < 370 && mouseY >15 && mouseY < 65) {
    substate = 0; //clicked on flag on top right - this can be written  better if reordered
  }

  if (mouseX>65 && mouseX<135 && mouseY>210 && mouseY<270) { //canada
    selected = 1;
  }

  if (mouseX>205 && mouseX<315 && mouseY>210 && mouseY<270) { //uk
    selected = 2;
  }
} //end of substate 1 (usa)


} //end of state 2

if (state == 3) {
  if (mouseX > 290.5 && mouseX < 339.5 && mouseY > 240.5 && mouseY<253.5) {
      progress++;
      appstep++;
    console.log(progress);
  }
} //end of state 3

if (state==4) {
  for (x=0;x<7;x++) {
  box[x].collCheck();
    if (box[x].area == true) {


      check_count++;
      box[x].pressed = true;
      box[x].draw = true;
      box[x].area = false;
      console.log(true);
    }
  }
} //end of state 4

if (state == 5) {
  if (mouseX>295 && mouseX < 375 && mouseY > 187 && mouseY < 237) {
    stamped = true;
  }
}

if (state > 0 && mouseX > 15 && mouseX<75 && mouseY > 15 && mouseY<35) {
   state = state-1; //back button
}


if (state > 1  && mouseX > 325 && mouseX < 405 && mouseY > 365 && mouseY<385) {
  if (substate != 1)
   state++; //next button
   else {
     state = 11; //change this later.
   }
}

if (state == 11) {

  if (mouseX > 155 && mouseX < 245 && mouseY >290 && mouseY < 350) {
    state = 1;
  }
}

} //end of mouseclicked function


function draw() {
  cursor(HAND);
background(0,0,90);
fill(220,220,240); //light blue
rect(199.5,199.5,385,385);
textAlign(CENTER);
//start screen
if (state == 0) {

  noCursor();
image(clouds,200,200,385,385);

fill(200,0,0);
textStyle(ITALIC);
textSize(17);
text("[the real]",200,100);
textSize(40);
fill(0,0,90);
textStyle(BOLD);
text('Personalized Travel Planner',210,215,290,180);
rect(200,270,80,30);
textSize(20);
fill(220,220,240);
text("BEGIN",201,278);

if (mouseX>160 && mouseX<240 && mouseY>245 && mouseY<290) {
  noStroke();
  fill(200);
  rect(200,270,80,30);
  textSize(20);
  fill(0,0,90);
  text("BEGIN",201,278);
}

image(plane,mouseX,mouseY,25,25);

} //end of state 0

//screen #1

if (state == 1) {
image(clouds,200,200,385,385);
fill(0,0,90);
textSize(30);
textStyle(BOLD);
text("#1",30,380);
textSize(23);
text("What passport do you have?",200,110);
textSize(8);
text("[our system currently only supports citizens of Egypt and the USA.]",200,130);
textSize(10);
fill(200,100,100);
text("'To travel is to live' - Hans Christian Anderson", 335, 380,95,60);
fill(0,0,90);
image(egypt,125,240,100,130); //passport 1
image(us, 275,240,100,130); //passport 2

if (mouseX>75 && mouseX<175 && mouseY >175 && mouseY<305) {

image(egyptvisa,125,240,200,170);
textSize(10);
text("visa-free map",125,340);
}

if (mouseX>225 && mouseX<315 && mouseY >175 && mouseY<305) {
image(usvisa,275,240,200,170);
textSize(10);
text("visa-free map",275,340);
}

}

//screen #2
if (state == 2) {

  if (substate == 0) {


    // stateswitch = 0;
    fill(200);
  rect(199.5,199.5,385,385);
      fill(0,0,90);
    textStyle(BOLD);
    textSize(30);
    stroke(0);
    text("#2",30,380);
    textSize(20);
noStroke();
    //hover to switch countries

    fill(0);
    textSize(7);
    textStyle(NORMAL);
    text("Hover to switch", 340,75);
    textSize(20);
    textStyle(BOLD);
    //

    //console.log(substate);
    image(egyflag,340,40,75,45);
    text("Passport: ",90,100);
    fill(100,0,0);
    text("Egyptian",180,100);
    fill(0);
    textStyle(ITALIC);
    textSize(9);
    fill(100,0,0);
    text("(sorry)",250,98);
    fill(0);
    textStyle(BOLD);
    textSize(20);
    text("Visa-free countries:", 135,130);
    fill(100,0,0);
    text("40",250,130);
    fill(0);
        textStyle(NORMAL);
    text("Choose a destination: ", 140, 180);

    if (mouseX>310 && mouseX < 370 && mouseY >15 && mouseY < 65) {
      substate = 1;
  }


    if (stateswitch == 1) {
      substate = 1;
      console.log("state switched");
    }

    image(cnflag,100,240,110,60);
    image(ukflag,260,240,110,60);


    if (mouseX>65 && mouseX<135 && mouseY>210 && mouseY<270) {
    image(visa,100,240,110,60);

    // if (click == true) {
    //   selected = 1;
    //   click = false;
    // }

    }


    if (mouseX>205 && mouseX<315 && mouseY>210 && mouseY<270) {
    image(visa,260,240,110,60);


    // if (click == true) {
    //   selected = 2;
    //   click = false;
    // }

    }

    if (selected == 1) {
    //  fill(220,220,240);
    //  rect(275,181,50,10);
      fill(180,0,0);
      text("Canada",275,181);
      fill(0,0,90);
    }


    if (selected == 2) {
      click = false;
  //    fill(220,220,240);
  //    rect(275,181,50,10);
      fill(180,0,0);
      text("United Kingdom",308,181);
      fill(0,0,90);
    }


  }

  if (substate == 1) {



  //  stateswitch = 0;
    fill(220,220,240);
    rect(199.5,199.5,385,385);
      fill(0,0,90);
    textStyle(BOLD);
    textSize(30);

    text("#2",30,380);
    //hover to switch countries

    fill(0);
    textSize(7);
    textStyle(NORMAL);
    text("Hover to switch", 340,75);
    textSize(20);
    textStyle(BOLD);
    //

    textSize(20);
    image(usflag,340,40,75,45);
    text("Passport:",89.5,100);
    fill(100,0,0);
    text("U.S. American",215,100);
    fill(0);
    text("Visa-free countries:", 135.5,130);
    fill(100,0,0);
    text("164",245,130);
    fill(0);
    textStyle(NORMAL);
    text("Choose a destination: ", 140, 180);


    if (mouseX>310 && mouseX < 370 && mouseY >15 && mouseY < 65) {
       substate = 0;
     }

if (mouseX < 310 || mouseX > 370 || mouseY < 15 || mouseY > 65) {
  substate = 1;
}
    if (stateswitch == 1) {
      substate =0;
    }



    image(cnflag,100,240,110,60);
    image(ukflag,260,240,110,60);


    if (mouseX>65 && mouseX<135 && mouseY>210 && mouseY<270) { //canada
    image(visafree,100,240,110,60);

     }


    if (mouseX>205 && mouseX<315 && mouseY>210 && mouseY<270) { //uk
    image(visafree,260,240,110,60);

    }

    if (selected == 1) {

      fill(220,220,240);
      rect(275,181,50,10);
      fill(180,0,0);
      text("Canada",275,181);
      fill(0,0,90);
      click = false;
    }


    if (selected == 2) {
      fill(220,220,240);
      rect(275,181,50,10);
      fill(180,0,0);
      text("United Kingdom",308,181);
      fill(0,0,90);
      click = false;
    }
  }


if (selected == 1 || selected == 2) {

fill(0,0,90);
rect(355,375,60,20);
fill(220,220,240);
textSize(15);
textStyle(BOLD);
text("Next >", 352, 379);


if (mouseX > 325 && mouseX < 405 && mouseY > 365 && mouseY<385) {
  fill(200);
  rect(355,375,60,20);
  fill(0,0,90);
  text("Next >", 352, 379);
}
textSize(20);
}

}


if (state == 3) {

  stroke(0);
fill(200);
rect(199.5,199.5,385,385);
fill(0,0,90);

textSize(30);
text("#3",30,380);
fill(0);
rect(200,170,330,215);
fill(255);
rect(200,163,320,190);

fill(50);
beginShape();
vertex(35,277.5);
vertex(10,347.5);
vertex(390,347.5);
vertex(365,277.5);
endShape();

fill(0);
rect(199.5,348,379.5,7);
noStroke();

fill(50,50,200);
rect(200.5,73.5,319,9);

fill(0);
textSize(18);
text("Visa Application", 130, 103);


stroke(0);
fill(200,200,240);
rect(170,150,220,70);

textSize(13);
fill(0,0,90);
noStroke();
if (appstep <10) {
text("Part " + appstep,85,132);}
fill(200,200,240);
stroke(0);
rect(170,215,220,40); //bottom rect
rect(315,175,50,120); //right panel

fill(255,0,0);
rect(315,247,49,13); //next button

fill(255);
textSize(12);
text("NEXT >", 315,252);

if (mouseX > 290.5 && mouseX < 339.5 && mouseY > 240.5 && mouseY<253.5) {
  fill(0);
  rect(315,247,49,13); //next button

  fill(0,255,0);
  textSize(12);
  text("NEXT >", 315,252);
}
//}



//there 100% has to be a more efficient way to do this.. use classes to draw

//red ellipses
fill(200,0,0);

for (i = 0; i<10;i++) {
  for (t=0;t<i;t++) {
ellipse(120+(15*t),250,10,10); }}


//green ellipses

for (p=0;p<progress;p++) {
  for (t=0;t<p;t++) {
  fill(0,200,0);
  ellipse(120+(15*t),250,10,10);
}
}


if (progress == 10) {
if (played1 == false) {
moneysound.play();
}
fill(0,255,0,90);
rect(190,175,100,100);
noStroke();
fill(0);
textSize(9);
text("Application Complete", 190,145);
text("AMOUNT DUE:",190,170);
textSize(15);
stroke(0);
fill(255,0,0);
text("120 USD",190,195);
played1 = true;
}

if (progress == 11) {
  state = 4;
}

} //end of state 3



if (state == 4) {
  image(wood,199.5,199.5,385,385);

  stroke(0);
  fill(0,0,90);

  textSize(30);
  text("#4",30,380);

  fill(255);


for (m = 0; m<7;m++) {
  if (box[m].draw == true) {
    for (n=m;n>=0;n--) {
      rect(205+(5*n),205-(5*n),240,300); //so that they show in the right reverse order under each other
    }
  }
}

  stroke(0);
 fill(255);

rect(200,210,240,300);
for (j = 0; j<7; j++) {
  box[j].drawBox();


if (box[j].draw == true) {
  box[j].drawCheck();
}

//add code for papers later
}

fill(0);
textSize(20);
text("Documents Required",200,120);

  fill(0);

  textSize(15);
  noStroke();
  //text("Checklist",120,130);
  text("Checklist",133,150);
  textStyle(NORMAL);
  textSize(12);
  text("Bank statement",155,174);
  text("Proof of accommodation",178,194);
  text("Booked return flight",165,214);
  text("Proof of return",152,234);
  text("Proof of employment",169,254);
  text("Invitation letter",153,274);
  text("Proof of legal status",166,294);

  //turn text green and check tick box when pressed and show paper wara

  if (check_count == 7) {
    fill(0,0,90);
    rect(355,375,60,20);
    fill(220,220,240);
    textSize(15);
    textStyle(BOLD);
    text("Next >", 352, 379);
    //pointer

    if (mouseX > 325 && mouseX < 405 && mouseY > 365 && mouseY<385) {
      fill(200);
      rect(355,375,60,20);
      fill(0,0,90);
      text("Next >", 352, 379);
    }
  }

}

if (state == 5) {
  stroke(0);
  fill(0,0,90);

  textSize(30);
  text("#5",365,40);

  fill(0);

textSize(20);
textAlign(LEFT);
text("Next step:",250,100);
textSize(12);
textStyle(NORMAL);
noStroke();
text("Mail your documents",250,120);
text("to the embassy.",250,135);

textStyle(BOLD);
text("Courier payment:", 250,160);
fill(255,0,0);
textSize(15);
stroke(0);
text("$50",355,161);

image(pay,265,200,37,35);
image(paybutton,335,212,80,50);

if (mouseX>295 && mouseX < 375 && mouseY > 187 && mouseY < 237) {
  image(paybutton2,335,212,80,50);
}
fill(200);
//open envelope

stroke(0);
beginShape();
vertex(20,370);
vertex(45,340);
vertex(240,340);
vertex(265,370);
vertex(20,370);
endShape();



stroke(0);
if (stamped == false) {
  stroke(0);
  rect(142,355,170,2); //open slit
  stroke(0);

fill(91,57,20); //brown

fill(255);


  rect(140,73.5,156,80);//papers. start at 73.5
  rect(140,74,156,80);
  rect(140,75.5,156,80);
  rect(140,77,156,80);
  textSize(10);
  fill(0);
  noStroke();
  text("Documents Required",88,55);
  stroke(0);

  fill(252,232,201);
    rect(140,maily,160,220); //envelope

    textSize(7);
    fill(255);
    rect(185,270,60,30);
    fill(0);
    noStroke();
    text("Visa Documents",158,268);
    fill(255,0,0);
    text("Priority shipping",157.5,278);
    stroke(0);
    image(stamp,75,275,20,20);
}


if (stamped == true) {


  if (played2 == false) {
  moneysound.play();
  }

  if (papersy <=110 ) {
    stroke(0);
    fill(91,57,20);
    beginShape();
    vertex(61,70);
    vertex(75,55)
    vertex(205,55)
    vertex(220,70);
    vertex(61,70);
    endShape();
    papersy+=.1; //first, put the papers inside
    docsrequiredy+=.1;
  }

  if (env1 < 90 && papersy > 110) {
      stroke(0);
      fill(91,57,20);
    beginShape();
    vertex(61,70);
    vertex(75,env1)
    vertex(205,env1)
    vertex(220,70);
    vertex(61,70);
    endShape();
    env1+=.5;
    }

  stroke(0);
fill(255);
    rect(140,papersy,156,80);//papers. start at 73.5
    rect(140,(papersy+1.5),156,80);
    rect(140,(papersy+3),156,80);
    rect(140,(papersy+4.5),156,80);
    textSize(10);
    fill(0);
    noStroke();
    text("Documents Required",88,docsrequiredy);
  stroke(0);
  fill(200);
  rect(142,355,170,2); //open slit
  fill(252,232,201);
  rect(140,maily,160,220); //envelope
  textSize(7);
  fill(255);
  rect(185,label_y,60,30); //label
  fill(0);
  noStroke();
  text("Visa Documents",158,visadoctext_y);
  fill(255,0,0);
  text("Priority shipping",157.5,shippingtext_y);


    stroke(0);
    image(stamp,75,stamp_y,20,20);


  if (env1 >= 90) {
    stroke(0);
    fill(91,57,20);
    beginShape();
    vertex(61,env2);
    vertex(75,env1);
    vertex(205,env1);
    vertex(220,env2);
    vertex(61,env2);
    endShape();
    maily+=.5;
    env2+=.5;
    visadoctext_y+=.5;
    shippingtext_y+=.5;
    stamp_y+=.5;
    label_y+=.5;
    papersy+=.5;
    env1+=.5;
    docsrequiredy+=.5;

    //would be cleaner to have the entire envelope in a class and have each element's y position relative to a central y point that increments - but implementing that now will take time (later)
  }


  played2 = true;

}
textAlign(CENTER);

fill(200);
rect(142,380.5,245,22);//bottom part of mailbox
noStroke(); //to hide paper going in to the box
rect(142,363,180,13);
fill(0,0,90);
rect(142,397,180,10);

if (maily>400) {
  fill(0,0,90);
  rect(355,375,60,20);
  fill(220,220,240);
  textSize(15);
  textStyle(BOLD);
  text("Next >", 352, 379);
  //pointer

  if (mouseX > 325 && mouseX < 405 && mouseY > 365 && mouseY<385) {
    fill(200);
    rect(355,375,60,20);
    fill(0,0,90);
    text("Next >", 352, 379);
  }
}


} //end of state 5

if (state == 6) {

  image(road,200,200,385,385);
  stroke(0);
  fill(0,0,90);
  textStyle(BOLD);
  textSize(30);
  text("#6",30,380);

  textSize(15);
  textAlign(LEFT);
  text("Next Steps:",200,300);
  textStyle(NORMAL);
  noStroke();
  textSize(13);
  text("Head to the immigration center for your appointment.",300,340,200,60);
  fill(0);
  textSize(8);
  text("Use arrow keys/WASD to navigate.",200,360);
  stroke(0);
  textAlign(CENTER);

  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    direction = 1;
    carx++;
  }

  if(keyIsDown(LEFT_ARROW)) {

    direction = 2;
    carx--;
  }

  if (keyIsDown(UP_ARROW)) {
    direction = 0;
    cary--;
  }

  if (direction == 0) {
  image(car,carx,cary,30,55);
  }

  if (direction == 1) {
  image(car2,carx,cary,55,30);
  }

  if (direction == 2) { //left
  image(car3,carx,cary,55,30);
  }

  if (cary<20 && carx<370 && carx>300) {
  state = 7;
  }

}

if (state == 7) {

  fill(0,0,90);
  rect(355,375,60,20);
  fill(220,220,240);
  textSize(15);
  textStyle(BOLD);
  text("Next >", 352, 379);


  if (mouseX > 325 && mouseX < 405 && mouseY > 365 && mouseY<385) {
    fill(200);
    rect(355,375,60,20);
    fill(0,0,90);
    text("Next >", 352, 379);
  }

  stroke(0);
  fill(0,0,90);
  textStyle(BOLD);
  textSize(30);
  text("#7",30,380);

  fill(100);
  rect(250,200,200,250);
  beginShape();
  vertex(150,75);
  vertex(350,75);
  vertex(335,65);
  vertex(165,65);
  vertex(150,75);
  endShape();

  fill(56);
  beginShape();
  vertex(210,392);
  vertex(220,326);
  vertex(290,326);
  vertex(300,392);
  endShape();


  fill(255,255,0);
  rect(255,345,5,20);
  rect(255,375,5,20);

  fill(255);
  rect(255,289,40,70);//door
  fill(56);
  rect(245,290,7,3);

  textAlign(LEFT);
  noStroke(0);
  fill(0,0,90);
  textSize(15);
  text("Reminders:",20,100);
  textSize(10);
  textStyle(NORMAL);
  text("- Arrive early",20,120);
  text("- No cellphone use in the building",90,155,140,30);
  text("- Bring a book. You'll be waiting",90,195,140,30);
  text("- Make sure you have all your papers. Then double check.",85,270,130,100);


  textAlign(CENTER);
  image(carside, 190,320,70,35);

} //end of state 7

if (state == 8) {

  stroke(0);
  fill(0,0,90);
  textStyle(BOLD);
  textSize(30);
  text("#8",30,380);


  fill(100,0,0);
  textSize(25);
text("Congratulations!", 200,80);
  fill(0,0,90);
  fill(0,0,90,40);
  rect(200,200,300,200);
  fill(0,0,90);
  textSize(15);//
  text("Your application is complete.",200,130);
  noStroke();
  textSize(13);
  textAlign(LEFT);
  text("Total cost: $170",97,160);
  text("Total time: 1.5 months", 97,180);

  text("Waiting time:", 97, 240);
  fill(100,0,0);
  stroke(0);
  text("UNDECIDED", 180, 240);

  if (mouseX>180 && mouseX < 250 && mouseY > 220 && mouseY < 260) {
    noStroke();
    fill(220,220,240);
    rect(225,237,90,30);
    fill(0,0,90,40);
  rect(225,237,90,30);

    fill(0,0,90);
    textSize(13);
    text("Somewhere between 3 days and 3 months", 262,250,150,60);
    stroke(0);
  }


textAlign(CENTER);

  fill(0,0,90);
  rect(355,375,60,20);
  fill(220,220,240);
  textSize(15);
  textStyle(BOLD);
  text("Next >", 352, 379);


  if (mouseX > 325 && mouseX < 405 && mouseY > 365 && mouseY<385) {
    fill(200);
    rect(355,375,60,20);
    fill(0,0,90);
    text("Next >", 352, 379);
  }

}

if (state == 9) {
  fill(0);
  rect(200,200,385,385);

  fill(255,255,255,80);
  rect(200,200,350,15);

  fill(255);
  textSize(20);
  text("Processing", 200,170);

fill(170,0,0);
   if (loadingx < 370) {
    loadingx+=.35;
    rect(loadingx,200,20,15);
  }

  if (loadingx > 360) {
    state = 10;
    console.log("done" + state);
  }
}


if (state == 10) {
  stroke(0);
  fill(0,0,90);
textStyle(BOLD);
  textSize(30);
  text("#10",30,380);

textSize(20);
fill(0);

  if ( randresult == 0) {
    if (lose_sound == false) {
      lose_sound.play();
    }
    fill(0);
    rect(200,200,385,385);
    fill(220);
    image(denied,200,100,200,130);
    text("Sorry, your visa has been denied.",200,200);
    textSize(15);
    text("We do not provide explanations.",200,250);
    lose_sound = true;
  }

  if (randresult  == 1) {
    if (lose_sound == false) {
      lose_sound.play();
    }
    fill(255);
      rect(200,200,385,385);
    image(clock,200,120,150,150);
    textSize(20);
    fill(0);
    text("Your visa is still processing. Time remaining TBD.",200,320,200,200);
    lose_sound = true;
  }

  if (randresult == 2) {

    fill(255);
      rect(200,200,385,385);

fill(0);
      text("Your visa has been approved.",200,170);

    fill(170,0,0,70);
    rect(200,280,230,100);
    fill(100);
    textSize(17);
    stroke(0);
    text("REMINDER:",200,260);
    text("A VISA DOES NOT GUARANTEE ENTRY.",200,330,250,100);

  }
}

  if (state == 11)
  {
    textStyle(BOLD);
    fill(0);
    textSize(25);
    stroke(255);
    text("Nevermind, you're good to go.",200,100);
    noStroke();
textStyle(NORMAL);
textSize(18);
    text("Next steps: Book a flight & hotel!",200,170);

textSize(15);
    text("How different would it have been with a different passport?",200,320,250,200);
    textSize(10);
    text("click to try",200,364);
    image(egyflag,200,320,90,60);

  }


if (state > 0 && state <10) {
textSize(15);
fill(0,0,90);
rect(45,25,60,20);
fill(220,220,240);
textStyle(BOLD);
text("< Back",43,30);

if (mouseX > 15 && mouseX<75 && mouseY > 15 && mouseY<35) {

console.log(click);
  fill(200);
  rect(45,25,60,20);
  fill(0,0,90);
  text("< Back",43,30);
}


}
}
