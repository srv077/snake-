function changedisplay(){
    clearBoard();
    document.getElementById("front").style.display="none";
    document.getElementById("full").style.display="flex";
}
function stopgame(){
    document.querySelector("#reset").innerHTML="Start";
    score=0;
    scoreboard.textContent=score;
    displayGameOver();
    clearBoard();
    document.getElementById("front").style.display="grid";
    document.getElementById("full").style.display="none";
}
const gameboard =document.querySelector("#game");
const ctx = gameboard.getContext("2d");
const reset=document.querySelector("#reset");
const pause =document.querySelector("#pause");
const scoreboard=document.querySelector("#scoreboard");
const boardwidth = gameboard.width;
const boardheight = gameboard.height;
const boardbackground = "black";
const snakecolor = "#95D600"; 
const snakeboarder ="black";
const foodcolor = "red";
const unitsize = 25;
running = false;
let xvelocity = unitsize;
let yvelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake =[
    {x:unitsize*2,y:0},
    {x:unitsize*1,y:0},
    {x:0,y:0}
];
window.addEventListener('keydown',changeDirection);
reset.addEventListener('click', resetGame);
function gameStart() {
    running = true;
    scoreboard.textContent=score;
    createFood();
    nextTick();
}
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            showFood();
            moveSnake();
            showSnake();
            checkGameOver();
            nextTick();
        },200)    
    }else{
        displayGameOver();
    }
}
function clearBoard(){
    ctx.fillStyle=boardbackground;
    ctx.fillRect(0,0,boardwidth,boardheight);
}
function createFood(){
    function randomFood(min,max){
        const random=Math.round((Math.random()*max)/unitsize)*unitsize;
        return random;
    }
    foodX = randomFood(0,boardwidth-unitsize);
    foodY = randomFood(0,boardheight-unitsize);
}
function showFood(){
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodX,foodY,unitsize,unitsize);
}
function moveSnake(){
    const head={x:snake[0].x + xvelocity, y:snake[0].y + yvelocity};
    snake.unshift(head);
    //if food eaten
    if(snake[0].x==foodX && snake[0].y==foodY){
       score++;
       scoreboard.textContent = score;
       createFood();
    }else{
       snake.pop();
    }
}
function showSnake(){
    ctx.fillStyle=snakecolor;
    ctx.strokeStyle=snakeboarder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitsize,unitsize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitsize,unitsize);
    })
}
function resetGame() {

    document.querySelector("#reset").innerHTML="Reset";
    snake =[
        {x:unitsize*2,y:0},
        {x:unitsize*1,y:0},
        {x:0,y:0}
    ];
    xvelocity = unitsize;
    yvelocity = 0;
    score = 0;
    gameStart();
}

function changeDirection(event){
    const direction = event.keyCode;
    const LEFT =37;
    const RIGHT =39;
    const UP =40;
    const DOWN =38;

    const goingUp=( yvelocity == unitsize); 
    const goingDown=(yvelocity == -unitsize); 
    const goingRight=(xvelocity == unitsize); 
    const goingLeft=(xvelocity == -unitsize); 

    switch(true){
        case (direction == LEFT && !goingRight):
            xvelocity = -unitsize;
            yvelocity = 0;
            break;
        case (direction == RIGHT && !goingLeft):
            xvelocity = unitsize;
            yvelocity = 0;
            break;
        case (direction == UP && !goingDown):
            xvelocity = 0;
            yvelocity = unitsize;
            break;
        case (direction == DOWN && !goingUp):
            xvelocity = 0;
            yvelocity = -unitsize;
            break;
        default:
            xvelocity=xvelocity;
            yvelocity=yvelocity;
            break;
    }
}   
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        running = false;
        break;
        case(snake[0].y<0):
        running = false;
        break;
        case(snake[0].x>boardwidth):
        running = false;
        break;
        case(snake[0].y>boardheight):
        running = false;
        break;
    }
    for(let i=1;i<snake.length;i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            running =false;
        }  
    }
}
function displayGameOver(){
    
    ctx.font ="90px Arial";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over",boardwidth/2,boardheight/2);
    ctx.strokeText("Game Over",boardwidth/2,boardheight/2);
    running = false;
}
