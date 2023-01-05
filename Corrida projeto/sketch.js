var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOverImg,jumpSound,collidedSound;
var loopSound;

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
  jumpSound = loadSound("jump.wav");
  collidedSound = loadSound("collided.wav");
  loopSound = loadSound("loop.mp3");
}

function setup(){
  
  createCanvas(400,600);
  loopSound.loop();

// Movendo plano de fundo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//criar menino correndo 
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

  
gameOver = createSprite(200,200,50,50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;


cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  background(0);
  //if(gameState===PLAY){
  console.log(gameState);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir plano de fundo
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      //aumente a treasureCollection para 50
      treasureCollection=treasureCollection+50;
      jumpSound.play( );
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
            //aumente a treasureCollection para 100
            treasureCollection=treasureCollection+100;
            jumpSound.play( );
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
            //aumente a treasureCollection para 150
            treasureCollection=treasureCollection+150;
            jumpSound.play( );
    }
    else{
      
      if(swordGroup.isTouching(boy)) {
        collidedSound.play()
        
        gameState = END;
      }
    }    
    //Mude o gameState (estado do jogo) para End
  //} 
   if(gameState === END);{
    //destrua todos os grupos
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    cashG.destroyEach();
    swordGroup.destroyEach();

   // defina setvelocityEach como 0 para todos os grupos

    diamondsG.setVelocityEach(0);
    jwelleryG.setVelocityEach(0);
    cashG.setVelocityEach(0);
    swordGroup.setVelocityEach(0);
    gameOver.visible = true;

    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []


      
    }
  
    
  
  }
    
    drawSprites();
    textSize(20);
    fill(255);
    text("Tesouro: "+ treasureCollection,150,30);
    

  

  
    
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  
  swordGroud.destroyEach();
  diamondsG.destroyEach();
  cashG.destroyEach();
  jwelleryG.destroyEach();

  boy.changeAnimation("SahilRunning",boyImg);
  
  score = 0;
  
}