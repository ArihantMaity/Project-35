var balloon,bgimg,balloonimg,balloonimg2;
var database,position

function preload(){
bgimg = loadImage("images/bg.png");
balloonimg = loadImage("images/balloon.png")
balloonimg2 = loadAnimation("images/balloon.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1000,500);


 balloon =  createSprite(400, 200, 50, 50);
 balloon.scale = 0.5
 balloon.addImage(balloonimg);

  var reading = database.ref("balloon/position");
 reading.on("value",readPosition,showError);
}

function draw() {
  background(bgimg);  
  
if(keyDown(LEFT_ARROW)){
changePosition(-1,0)
balloon.addAnimation("balloon",balloonimg2);
}

else if(keyDown(RIGHT_ARROW)){
changePosition(+1,0)
balloon.addAnimation("balloon",balloonimg2);
}

else if(keyDown(UP_ARROW)){
changePosition(0,-1)
balloon.addAnimation("balloon",balloonimg2);
balloon.scale = balloon.scale -0.001
}

else if(keyDown(DOWN_ARROW)){
changePosition(0,+1);
balloon.addAnimation("balloon",balloonimg2);
balloon.scale = balloon.scale +0.001
}
drawSprites();

textSize(15);
fill("brown");
text("Use arrows to play",50,50);

 
}

function readPosition(data){
  position = data.val()
  balloon.x = position.x
  balloon.y = position.y
  }
  

function changePosition(x,y){
  database.ref("balloon/position").set({
    x:position.x+x,
    y:position.y+y
  })
  }




function showError(){
  console.log("Error in writing database");
}