var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameover,gameoverImg;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg =                                  loadAnimation("runner1.png","runner1.png","runner1.png","runner1.png","runner2.png","runner2.png","runner2.png","runner2.png","runner2.png");
  
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  gameoverImg=loadImage("gameOver.png");
  
}

function setup(){
  
  createCanvas(400,400);
// Moving background
   path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
gameover=createSprite(200,200,1,1);
boy = createSprite(70,330,20,20);
    boy.addAnimation("SahilRunning",boyImg);
    boy.scale=0.08;
  
  
cashGroup=new Group();
diamondsGroup=new Group();
jwelleryGroup=new Group();
swordGroup=new Group();

}

function draw() {

   
  background(0);
  if(gameState === PLAY){
      

    
  boy.setCollider("rectangle");
  boy.debug = false
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashGroup.isTouching(boy)) {
      cashGroup.destroyEach();
      treasureCollection++
    }
    else if (diamondsGroup.isTouching(boy)) {
      diamondsGroup.destroyEach();
      treasureCollection++
      
    }else if(jwelleryGroup.isTouching(boy)) {
      jwelleryGroup.destroyEach();
      treasureCollection++
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
        
    }

  }
  }
   else if (gameState === END){
    cashGroup.setVelocityYEach(0);
   diamondsGroup.setVelocityYEach(0);
     jwelleryGroup.setVelocityYEach(0);
    swordGroup.setVelocityEach(0); 
      //i have done the destroy part only because it said 
     //to do so for additional mark
     //if you only want the sprites to stop remove the part
     //bellow
     jwelleryGroup.destroyEach();
     swordGroup.destroyEach();
     diamondsGroup.destroyEach();
     cashGroup.destroyEach();
     path.velocityY=0;
   gameover.addImage("gameOver.png",gameoverImg)
     gameover.scale=0.75
     
}
    if(path.y > 400 ){
    path.y = height/2;
  }
  drawSprites();

  textSize(20);
  fill(255);
  text("Treasure: "+treasureCollection,150,30);
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = -150;
  cashGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = -150;
  diamondsGroup.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = -1;
  jwelleryGroup.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = -150;
  swordGroup.add(sword);
  }
}