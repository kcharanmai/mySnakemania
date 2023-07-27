function startgame(){
   start();
}
function start(){
    this.toggleScreen('start-screen',false);
    this.toggleScreen('snakeg',true);
    main();
}
function toggleScreen(id,toggle){
    let element = document.getElementById(id);
    let display = (toggle)?'block':'none';
    element.style.display = display;
}
let direction={x:0,y:0};
let foodsound= new Audio('food.mp3');
let gameoversound= new Audio('gameover.mp3');
let movesound= new Audio('move.mp3');
let speed=5;
let score=0;
let lastPainttime=0;
let snakeArr =[{x:13,y:15}];
let inputdir={x:0,y:0}
food={x:6,y:7};
let hiscoreval=0;
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPainttime)/1000<1/speed)
    {
        return;
    }
    lastPainttime=ctime;
    gameEngine();
}
function isCollide(){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
        return true;
    }
    return false;
}
function gameEngine(){
    if(isCollide(snakeArr)){
        gameoversound.play();
        inputdir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
    }
    if(snakeArr[0].y=== food.y && snakeArr[0].x===food.x)
    {
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Highs:" + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
      let a=2;
      let b=16;
      snakeArr.unshift({x:snakeArr[0].x+inputdir.x, y:snakeArr[0].y+inputdir.y})
      food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highs:" + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir={x:0,y:1}
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x= 0;
            inputdir.y= -1;
            break;
        case "ArrowDown":
                console.log("ArrowDown");
                inputdir.x=0 ;
                inputdir.y= 1;
                break;
        case "ArrowLeft":
                console.log("ArrowLeft");
                inputdir.x= -1;
                inputdir.y= 0;
                break;
        case "ArrowRight":
                console.log("ArrowRight");
                inputdir.x= 1;
                inputdir.y= 0;
                break;  
        default:
            break;     
    }
})
