window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    snake = [];
    positionX = 10;
    positionY = 10;
    foodX = 15;
    foodY = 15;
    velX = 0;
    velY = 0;
    grid = 20;
    tamanho = 3;

    // Chama o jogo a cada 100 milisegundos
    setInterval(jogo, 100);

    // Adiciona tabindex para garantir o foco no canvas
    canvas.setAttribute('tabindex', 0);

    canvas.addEventListener("keydown", function (e) {
        switch (e.key) {
            case "ArrowRight":
                velX = 1;
                velY = 0;
                break;

            case "ArrowLeft":
                velX = -1;
                velY = 0;
                break;

            case "ArrowUp":
                velY = -1;
                velX = 0;
                break;

            case "ArrowDown":
                velY = 1;
                velX = 0;
                break;
        }
    });
};

function jogo() {
    ctx.fillStyle = "#2980B9";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //espelhamento
    if (positionX < 0) {
        positionX = grid
    }

    if (positionX > grid) {
        positionX = 0
    }

    if (positionY < 0) {
        positionY = grid
    }

    if (positionY > grid) {
        positionY = 0
    }

    ctx.fillStyle = "#00f102";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1);
        if (snake[i].x == positionX && snake[i].y == positionY) {
            tamanho = 3
        }
    }
    
    snake.push({ x: positionX, y: positionY });


    // Atualiza a posição da cabeça da cobrinha com base na velocidade
    positionX += velX;
    positionY += velY;

    while (snake.length > tamanho) {
        snake.shift();
    }

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodX * grid, foodY * grid, grid - 1, grid - 1)

    if (positionX == foodX && positionY == foodY) {
        tamanho++
        foodX = Math.floor(Math.random() * grid)
        foodY = Math.floor(Math.random() * grid)

    }

}
