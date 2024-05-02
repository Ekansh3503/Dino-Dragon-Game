score = 0;
cross = true;
// dino = document.querySelector('.dino');
// obstacle = document.querySelector('.obstacle');
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

// initiating animations for dino using keycodes
// keycodes are the code/id for the keys in your keyboard, for left=37, right=39, up=38
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) { // for up key
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) { // for right key
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {  //for left key
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    // condition for gameover 
    if (offsetX < 63 && offsetY < 42) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    // condition for score update
    else if (offsetX < 100 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.05; // initially aniDur=2s
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration of obs: ', newDur)

            dinoDur = parseFloat(window.getComputedStyle(dino, null).getPropertyValue('animation-duration'));
            newDurdino = dinoDur - 0.1; // initially dinoDur=3s
            dino.style.animationDuration = newDurdino + 's';
            console.log('New animation duration of dino: ', newDurdino)
        }, 90);
    }

    // else if (document.getElementById("restartButton").onclick = restartGame) {
    //     newDur = aniDur - 0.05; // initially aniDur=2s
    //     obstacle.style.animationDuration = newDur + 's';
    //     console.log('New animation duration of obs: ', newDur)

    //     newDurdino = dinoDur - 0.1; // initially dinoDur=3s
    //     dino.style.animationDuration = newDurdino + 's';
    //     console.log('New animation duration of dino: ', newDurdino)
    // }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}

// added feature of refreshing the page(or reloading the game) using spacebar
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) { // Spacebar keycode
        window.location.reload();
    }
});

function restartGame() {
    console.log("button is clicked")
    // Reset the score.
    score = 0;
    updateScore(score);

    var dino = document.querySelector('.dino');
    var obstacle = document.querySelector('.obstacle');
    // Reset the position of the obstacles.
    obstacle.classList.add('obstacleAni')
    aniDur = 2
    console.log('New animation duration of obs: ', aniDur)

    // Reset the position of the dinosaur.
    dino.style.left = "52px";
    dinoDur = 3
    console.log('New animation duration of dino: ', dinoDur)
}
document.getElementById("restartButton").onclick = restartGame;
