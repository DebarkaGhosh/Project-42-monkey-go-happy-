var backImage, backGround;
var monkey, monkey_running;
var invisibleground, invisibleground_img;
var gameOver;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver_img;
var score = 0;
var gameState = 0;

function preload() {
  backImage=loadImage("jungle.jpg");
  monkey_running=
 loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");


   
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
   gameOver_img = loadImage("gameOver.png");
} 

function setup() {
  createCanvas(500, 400);

  backGround=createSprite(width/2,0,800,400);
  backGround.addImage(backImage);
  backGround.scale=1.5;
  backGround.x=backGround.width/2;
  backGround.velocityX=-4;

  monkey=createSprite(100, 340, 20, 50);
 monkey.addAnimation("Running", monkey_running); 
  monkey.scale = 0.1;

  


  invisibleground=createSprite(400, 350, 800, 10);
  invisibleground.velocityX=-4;
  invisibleground.x=invisibleground.width / 2;
  invisibleground.visible=false;

  FoodGroup=new Group();
 obstaclesGroup=new Group();
  
Score=0;

survivalTime=0;
}

function draw() {

  background(255);



  if (invisibleground.x < 0) {

    invisibleground.x = invisibleground.width / 2;
  }
  if (backGround.x < 100) {
    backGround.x = backGround.width / 2;
  }

  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 2;
    monkey.scale += +0.032 ;
    
  }
  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;

    default:
      break;
  }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleground);
  
  spawnFood();
  spawnObstacles();
  if (obstaclesGroup.isTouching(monkey)) {
    gameOver = createSprite(200,200);
  gameOver.addImage(gameOver_img);
 score=0;
 survivalTime=survivalTime+1;
  }
 

  
  drawSprites();

  stroke("blue");
  strokeWeight(4)
  textSize(20);
  fill("orange");
  text("Press SPACE key to play", 100, 20)


 
  
  stroke("red");
  strokeWeight(4)
  textSize(20);
  fill("white");
  text("Score: "+score, 400, 20)

  

}

function spawnFood(){
  if (frameCount%100===0) {
    var banana=createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.lifetime=300;
    monkey.depth=banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount%350===0) {
    var obstacle=createSprite(800, 350, 10, 40);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacle_img);

    obstacle.scale=0.2;
    obstacle.lifetime=300;

    obstaclesGroup.add(obstacle);
  }
}