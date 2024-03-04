document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const grid = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 1;
    let dy = 0;
    let tamanho = 1;

    setInterval(jogo, 100);

    document.addEventListener("keydown", function (e) {
        switch (e.key) {
            case "ArrowRight":
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;

            case "ArrowLeft":
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;

            case "ArrowUp":
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;

            case "ArrowDown":
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
        }
    });

    function jogo() {
        // Preenche o canvas com a cor de fundo
        ctx.fillStyle = "#2980B9";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Movimenta a cobrinha
        const cabeca = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(cabeca);

        // Verifica se a cobrinha comeu a comida
        if (cabeca.x === food.x && cabeca.y === food.y) {
            tamanho++;
            gerarComida();
        } else {
            snake.pop();
        }

        // Desenha a comida
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * grid, food.y * grid, grid, grid);

        // Desenha a cobrinha
        ctx.fillStyle = "green";
        snake.forEach(function (segmento) {
            ctx.fillRect(segmento.x * grid, segmento.y * grid, grid, grid);
        });

        // Verifica colisão com a parede
        if (
            cabeca.x < 0 ||
            cabeca.x >= canvas.width / grid ||
            cabeca.y < 0 ||
            cabeca.y >= canvas.height / grid
        ) {
            gameOver();
        }

        // Verifica colisão da cabeça com o corpo
        for (let i = 1; i < snake.length; i++) {
            if (cabeca.x === snake[i].x && cabeca.y === snake[i].y) {
                gameOver();
            }
        }
    }

    function gerarComida() {
        food.x = Math.floor(Math.random() * (canvas.width / grid));
        food.y = Math.floor(Math.random() * (canvas.height / grid));
    }

    function gameOver() {
        alert("Game Over!");
        snake = [{ x: 10, y: 10 }];
        tamanho = 1;
        dx = 1;
        dy = 0;
        gerarComida();
    }
});
