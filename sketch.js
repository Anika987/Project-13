var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var ob1,ob2,ob3,ob4,ob5,ob6,obI1,obI2,obI3,obI4,obI5,obI6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 cloudImage = loadImage("cloud.png");

  obI1 = loadImage("obstacle1.png");
  obI2 = loadImage("obstacle2.png");
  obI3 = loadImage("obstacle3.png");
  obI4 = loadImage("obstacle4.png");
  obI5 = loadImage("obstacle5.png");
  obI6 = loadImage("obstacle6.png");
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  score = 0;
  
  
}

function draw() {
  //set background color
  background("grey");
  
  textSize(20)
  text("SCORE: "+score,300,100);
  score = score+Math.round(frameCount/60);
  
  
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  spawnClouds();
  spawnObstacle();
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 if(frameCount %60 === 0){
   cloud = createSprite(600,100,40,10);
   cloud.addImage(cloudImage);
   cloud.y = Math.round(random(10,60));
   cloud.scale = 0.4;
   cloud.velocityX = -3;

   cloud.lifetime = 610;

   cloud.depth = trex.depth;
   trex.depth = trex.depth + 1
 }
}

function spawnObstacle(){
if(frameCount %80 === 0){
  obstacle = createSprite(600,165,10,40);
  obstacle.velocityX = -6;

  var r = Math.round(random(1,6));
  switch(r){
    case 1:
      obstacle.addImage(obI1);
      break;

   case 2:
    obstacle.addImage(obI2);
    break;
        
   case 3:
    obstacle.addImage(obI3);
    break;

  case 4:
   obstacle.addImage(obI4);
    break;

  case 5:
   obstacle.addImage(obI5);
    break;

  case 6:
    obstacle.addImage(obI6);
    break;
  }

  obstacle.scale = 0.5;
  obstacle.lifetime = 400;
}
}

