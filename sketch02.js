var playerSprite;
var birds;
var poops;
var hit = false;
var poopHit = 0;

var birdTimer;

function setup() {
  createCanvas(1500, 500);

  playerSprite = createSprite(width / 2, height - 60, 50, 100);
  playerSprite.addAnimation("running", "assets/runner0001.png", "assets/runner0006.png");
  playerSprite.setCollider("rectangle", 0,0, 30, 95);


  birds = new Group();
  poops = new Group();


  camera.position.y = height / 2;
  birdTimer = random(4, 5);
}

function draw() {
  background(0);
  textAlign(CENTER);
  fill(255);
  text("Controls: Arrow key LEFT and RIGHT to move", playerSprite.position.x, 20);
  text("Number of Times Pooped On:" + poopHit, playerSprite.position.x, 60);
  text("Avoid the Poop!!!", playerSprite.position.x, 40);

  // subtract time since last frame in birdTimer
  // let's assume 60 fps for ease
  birdTimer -= .09;

  if (birdTimer <= 0) {
    var bird = createSprite(playerSprite.position.x + width, random(75, 150), 20, 20);
    //bird.addImage(birdImg);
    birds.add(bird);
    bird.velocity.x = random(-2, -4);

    birdTimer = random(4, 5);
  }

  for (var i = 0; i < birds.length; i++) {
    if (birds[i].position.x < playerSprite.position.x - width / 4) {
      var bird = birds[i];
        bird.remove();
    }
  }

  for (var p = 0; p < birds.length; p++) {
    var birdPlayerDistance = abs(birds[p].position.x - playerSprite.position.x);
    if (birdPlayerDistance <  50) {
      var poop = createSprite(birds[p].position.x, birds[p].position.y, 5, 5);
      //img
      poops.add(poop);
      poop.velocity.y = 15;
      //print("attempted to poop\n");
    }
    
  }
 

  for (var h = 0; h < poops.length; h++) {
    // check if poop hit player
    if (poops[h].collide(playerSprite)) {
      hit = true;
      poopedOn();
    } else {
      hit = false;
    }
    
    // check if poop is alive
    if(poops[h].position.y > playerSprite.position.y + height/2) {
      var poop = poops[h];
     poop.remove();
    }
  }

  //for loop iterates through bird group checking bird.position.x against player.position.x
  //if x position == player or within some range
  //draw poop sprite addveocity.y negative value;
  //add collider to player + poop
  //do something when player.collide(poop);
  //when poop goes below height it disappears;


  playerSprite.debug = mouseIsPressed;

playerMovement();
  camera.position.x = playerSprite.position.x + width / 4;

  

if (frameCount % 60 === 0) {
  print("Sprites in scene: " + allSprites.length);
}
  drawSprites();
}

function playerMovement() {
  if (keyDown(RIGHT)) {
    playerSprite.position.x += 5;
    playerSprite.changeAnimation("running");
    playerSprite.mirrorX(1);
  } 
  else if (keyDown(LEFT)) {
    playerSprite.position.x -= 5;
    playerSprite.changeAnimation("running");
    playerSprite.mirrorX(-1);
}
}

function poopedOn() {
  hit = true;
  poopHit += 1;
}