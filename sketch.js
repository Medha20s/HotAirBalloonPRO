var Balloon;
var database;
var position;

function preload(){
    balloon=loadImage("balloon.png")
    bg=loadImage("scenery.jpg")
}

function setup(){
    createCanvas(1000,500);
    Balloon = createSprite(250,250,20,20);
    Balloon.addImage(balloon);

}

function draw(){
    database = firebase.database();

    var BalloonPosition = database.ref('balloon/position');

    BalloonPosition.on("value", readPosition)

    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}



function writePosition(x,y){
 database.ref('balloon/position').set({ 
    'x': position.x + x , 'y': position.y + y 
}) 
}

function readPosition(data){
    position=data.val();
    Balloon.x=position.x;
    Balloon.y=position.y;
}


