//<code/>
//Create variables here
var dog1,happyDog;
var foodS,foodStock;
var database;
var name="Sheru";
var foodObj;
var lastFed;
var bedImg,wImg,garImg,playImg;
var readState,changeState;
var gameState;
var currentTime;



function preload()
{
	//load images here
  dog1=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
  //loading images of the background for bed,garden etc...
  bedImg=loadImage("Bed Room.png");
  wImg=loadImage("Wash Room.png");
  garImg=loadImage("Garden.png"); 
  playImg=loadImage("Living Room.png")
}

async function setup() {
  database=firebase.database();
  //console.log(database);

	createCanvas(600,700);

  dog=createSprite(500,300)
  dog.addImage(dog1);
  dog.scale=0.2

  feed=createButton("Feed "+name);
  feed.position(500,325);
  //feed.mousePressed(feedDog);
  if(feed.mousePressed(function(){
    feedDog();
    dog.addImage(happyDog)
  }))

  add=createButton("Add Food");
  add.position(600,325);
  add.mousePressed(addFood);

  var bath=createButton("I Want To Take Bath")
  bath.position(550,75)
  if(bath.mousePressed(function(){
     gameState=3;
     database.ref('/').update({
       'gameState':gameState
     })
  }))

  var ftd=createButton("I Am Hungry")
  ftd.position(450,75)
  if(ftd.mousePressed(function(){
    dog.addImage(dog1);
    gameState="Hungry"
    database.ref('/').update({
      'gameState':gameState
    })
  }))

  var sleep=createButton("I Want To Sleep")
  sleep.position(700,75)
  if(sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({
      'gameState':gameState
    })
  }))

  var lplay=createButton("Lets Play!");
  lplay.position(525,120);
  if(lplay.mousePressed(function(){
    gameState=5;
    database.ref('/').update({
      'gameState':gameState
    })
  }))

  var gardenb=createButton("Let's Play In The Park")
  gardenb.position(625,120);
  if(gardenb.mousePressed(function(){
    gameState=6
    database.ref('/').update({
      'gameState':gameState
    })
  }))

//if(gameState===3){
//foodObj.washroom();

//}


  foodObj=new Food();




 foodStockRef=database.ref('food')

  await foodStockRef.on("value",function(data){
    foodS=data.val();
  });

  await database.ref('fedTime').on("value",function(data){
    lastFed=data.val();
  })

  // read state from the database
  readState=database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val();

  });
//console.log(lastFed);
//name="Sheru";

}


function draw() {  
background(46,139,87);

foodObj.display();
//writeStock(foodS);
foodObj.updateFoodStock(foodS);


//text commands
textSize(15);
fill("white");
//text("Note:Press The Button To Feed Sheru",5,125)
text("Food Left For Sheru: "+foodS,20,150);
//text("Last Fed Sheru at:"+lastFed,20,140)
text("Name Of The Dog:" +name,20,230); 

if(lastFed>12){
  text("Last Fed Sheru at:" +lastFed%12 +" PM",20,190)
}
else if(lastFed===0){
  text("Last Fed Sheru at:12AM",20,190)
}
else if(lastFed===12){
  text("Last Fed Sheru at:12" +" PM",20,190)
}
else{
  text("Last Fed Sheru at:"+lastFed +" AM",20,190)
}


// gameState checking
if(gameState!="Hungry"){
  feed.hide();
  add.hide();
 // dog.visible=false;
}
else{
  feed.show();
  add.show();
  dog.visible=true;
  //dog.addImage(dog1);
  dog.scale=0.2
  dog.x=500
 foodObj.display()

}
//bathing state
if(gameState===3){
  //foodObj.washroom();
  //background(wImg)
  dog.addImage(wImg);
  dog.scale=1.2
  foodObj.visible=false;
  dog.x=295
  }

  if(gameState===4){
    dog.addImage(bedImg);
    dog.scale=1.2
  foodObj.visible=false;
  dog.x=295
  }
if(gameState===5){
  dog.addImage(playImg);
  dog.scale=1.2
  foodObj.visible=false;
  dog.x=295
}
if(gameState===6){
  dog.addImage(garImg)
  dog.scale=1.2
  foodObj.visible=false;
  dog.x=295
}

/*currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing")
  foodObj.garden();

}
else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom()
}
else if(currentTime>(lastFed+2) && currentTime<(lastFed+4)){
  update("Bathing")
  foodObj.washroom();
}
else{
  update("Hungry")
  foodObj.display();
}*/



drawSprites();
}

function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{
  dog.addImage(happyDog);
  dog.addImage(happyDog);
  //console.log(foodObj.getFoodStock())

  if(foodObj.getFoodStock()<=0)
  {
     foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else
  {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  }

  database.ref("/").update(
    {
      food: foodObj.getFoodStock(),
      fedTime: hour()
    }
  )
}



/*function writeStock(x)
{
  
  
}*/



function addFood(){
  foodS++;
  dog.addImage(dog1)
  database.ref("/").update({
  food: foodS,

})
}



function update(state){
  database.ref('/').update({
    gameState:state
  })
}