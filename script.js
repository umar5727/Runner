let object = document.querySelector('.object');
let footer = document.querySelector('.footer');
let displayscore =  document.querySelector('#score');



let objectWidth = parseInt(window.getComputedStyle(object).getPropertyValue('width'));
let objectRight = parseInt(window.getComputedStyle(object).getPropertyValue('right'));
let objectBottom = parseInt(window.getComputedStyle(object).getPropertyValue('bottom'));

let footerHeight = parseInt(window.getComputedStyle(footer).getPropertyValue('height'));
let footerBottom = parseInt(window.getComputedStyle(footer).getPropertyValue('bottom'));



let upTime;
let downTime;
let isJumping = false;
function jump() {
    if (isJumping) return;
    upTime = setInterval(() => {
        if (objectBottom > footerHeight + 200) {
            clearInterval(upTime);
            downTime = setInterval(() => {
                if (objectBottom <= footerHeight + 10) {
                    clearInterval(downTime)
                    isJumping = false;
                }
                objectBottom -= 10;
                object.style.bottom = objectBottom + 'px';
            }, 20)
        }
        objectBottom += 10;
        object.style.bottom = objectBottom + 'px';
        isJumping = true;
    }, 20)
}
createObstacles();
function control(e) {
    if (e.key == 'ArrowUp' || e.key == ' ') {
        jump();
    }
}
document.addEventListener('keydown', control)

function createObstacles() {
    let obstacles = document.querySelector('.obstacles');

    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    // obstacle.style.backgroundColor ='blue';
    obstacles.appendChild(obstacle)

    let randomTimeOut = Math.floor(Math.random()*1500)+1100; 
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;
    let obstacleRight = -30;
    let obstacleBottom = 100;

    function moveObstacles() {
        obstacleRight += 5;
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.right = obstacleRight + 'px';
        obstacle.style.height = obstacleHeight + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        

        if (objectRight >= obstacleRight - objectWidth && objectRight <= obstacleRight + obstacleWidth && objectBottom <= obstacleBottom + obstacleHeight) {
            alert("Game over")
            clearInterval(obstacleInterval)
            clearTimeout(obstacleTimeout)
            location.reload();
        }
        if (objectRight < obstacleRight) {
            showScore();
        }
    }
    let obstacleInterval = setInterval(moveObstacles, 20)
    let obstacleTimeout = setTimeout(createObstacles, randomTimeOut)
}
let score = 0;
let showScore = ()=>{
    score++;
    displayscore.innerText=score;

}