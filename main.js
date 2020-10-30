//(function() {
    let assets =
        [
            "resources/background.png",
            "resources/paddle.png",
            "resources/ball.png",
            "resources/0.png",
            "resources/1.png",
            "resources/2.png",
            "resources/3.png",
            "resources/4.png",
            "resources/5.png",
            "resources/6.png",
            "resources/7.png",
            "resources/8.png",
            "resources/9.png",
            "resources/paddle-hit.wav",
            "resources/wall-hit.wav",
            "resources/point.wav",
        ];

    let game = hexi(800, 600, setup, assets, load);
    game.fps = 60;
    game.scaleToWindow();

    let gameScene, background, message, player, AI, ball, playerScore, AIScore, playerScoreSprites, AIScoreSprites,
        paddleHitSound, wallHitSound, pointSound;

    let debug, dBallV, dPlayerV, dAIV, dBallVector;

    let playingArea = {
        x: 32,
        y: 88,
        width: 768,
        height: 576
    };

    function load() {

        game.loadingBar();

    }

    function setup() {

        debug = true;

        playerScore = 0;
        AIScore = 0;

        paddleHitSound = game.sound("resources/paddle-hit.wav");
        wallHitSound = game.sound("resources/wall-hit.wav");
        pointSound = game.sound("resources/point.wav");

        gameScene = game.group();

        background = game.sprite("resources/background.png");

        gameScene.addChild(background);

        gameScene.addChild(game.line("white", 1, 32, 88, 32, 576));
        gameScene.addChild(game.line("white", 1, 32, 88, 768, 88));
        gameScene.addChild(game.line("white", 1, 32, 576, 768, 576));
        gameScene.addChild(game.line("white", 1, 768, 88, 768, 576));

        player = game.sprite("resources/paddle.png");
        player.x = 60;
        player.y = 309;

        gameScene.addChild(player);

        AI = game.sprite("resources/paddle.png");
        AI.x = 732;
        AI.y = 309;

        gameScene.addChild(AI);

        ball = game.sprite("resources/ball.png");
        ball.x = 396;
        ball.y = 320;

        gameScene.addChild(ball);

        playerScoreSprites = [];
        AIScoreSprites = [];

        for (let i = 0; i < 3; i++) {

            playerScoreSprites[i] = [];
            AIScoreSprites[i] = [];

            for (let y = 0; y < 10; y++) {

                let playerNumber = game.sprite("resources/" + y + ".png");
                playerNumber.x = 232 - (i * 48);
                playerNumber.y = 12;
                playerNumber.visible = y === 0;

                let AINumber = game.sprite("resources/" + y + ".png");
                AINumber.x = 632 - (i * 48);
                AINumber.y = 12;
                AINumber.visible = y === 0;

                playerScoreSprites[i].push(playerNumber);
                AIScoreSprites[i].push(AINumber);

                gameScene.addChild(playerNumber);
                gameScene.addChild(AINumber);

            }

        }

        game.keyboard(13).press = () => {

            if (game.state !== play) {

                game.state = play;
                message.visible = false;

            }

        };

        let upArrow = game.keyboard(40),
            downArrow = game.keyboard(38);

        upArrow.press = () => {

            player.vy = 5;

        };
        upArrow.release = () => {

            if (!downArrow.isDown) {

                player.vy = 0;

            }

        };

        downArrow.press = () => {

            player.vy = -5;

        };
        downArrow.release = () => {

            if (!upArrow.isDown) {

                player.vy = 0;

            }

        };

        ball.vy = (game.randomInt(0,1) === 0 ? -1 : 1) * game.randomInt(1,3);
        ball.vx = (game.randomInt(0,1) === 0 ? -1 : 1) * game.randomInt(2,4);

        message = game.text("Press Enter to play", "14px Courier New", "white");
        message.pivotX = 0.5;
        message.pivotY = 0.5;
        message.x = 400;
        message.y = 44;
        gameScene.addChild(message);


        dBallV = game.text(ball.vx + ", " +  ball.vy, "14px Courier New", "white");
        dBallV.x = 10;
        dBallV.y = 10;
        dBallV.visible = debug;
        gameScene.addChild(dBallV);

        dBallVector = game.line("white", 1, ball.x + ball.halfWidth, ball.y + ball.halfHeight, ball.x + ball.halfWidth + ball.vx * 3, ball.y + ball.halfHeight + ball.vy * 3);
        dBallVector.visible = debug;
        gameScene.addChild(dBallVector);

        dPlayerV = game.text(player.vx + ", " +  player.vy, "14px Courier New", "white");
        dPlayerV.x = 10;
        dPlayerV.y = 30;
        dPlayerV.visible = debug;
        gameScene.addChild(dPlayerV);

        dAIV = game.text(AI.vx + ", " +  AI.vy, "14px Courier New", "white");
        dAIV.x = 10;
        dAIV.y = 50;
        dAIV.visible = debug;
        gameScene.addChild(dBallV);

    }

    function play() {

        game.move(player);

        game.contain(player, playingArea);

        game.move(AI);

        if (ball.vy > 0 && ball.y > (AI.y + AI.halfHeight)) {

            AI.vy = ball.vy < 5 ? ball.vy : 5;

        } else if (ball.vy < 0 && ball.y < (AI.y + AI.halfHeight)) {

            AI.vy = ball.vy > -5 ? ball.vy : -5;

        } else {

            AI.vy = 0;
        }

        game.contain(AI, playingArea);

        game.move(ball);

        if ((game.hitTestRectangle(player, ball) && ball.vx < 0) || (game.hitTestRectangle(AI, ball) && ball.vx > 0)) {

            paddleHitSound.play();

            if ((game.hitTestRectangle(player, ball) && player.vy !== 0) || (game.hitTestRectangle(AI, ball) && AI.vy !== 0)){

                ball.vy += ((ball.vy < 0) ? -1 : 1);
                ball.vx += ((ball.vx < 0) ? -1 : 1);

            }

            ball.vx *= -1;

        }

        let ballHitsEdges = game.contain(ball, playingArea, true);
        let scoreChanged = false;

        if (ballHitsEdges) {

            if (ballHitsEdges.has('right') || ballHitsEdges.has('left')) {

                pointSound.play();

                scoreChanged = true;

                if (ballHitsEdges.has('right')) {

                    playerScore++;

                } else if (ballHitsEdges.has('left')) {

                    AIScore++;

                }

                ball.x = 396;
                ball.y = game.randomInt(220,420);

                ball.vy = (game.randomInt(0,1) === 0 ? -1 : 1) * game.randomInt(1,3);
                ball.vx = (game.randomInt(0,1) === 0 ? -1 : 1) * game.randomInt(1,3);

            } else {

                wallHitSound.play();

            }

        }

        if (scoreChanged) {

            playerScoreSprites.forEach(a => {

                a.forEach(e => {

                    e.visible = false;

                });

            });

            playerScoreSprites[0][playerScore % 10].visible = true;
            playerScoreSprites[1][Math.floor((playerScore % 100) / 10)].visible = true;
            playerScoreSprites[2][Math.floor((playerScore % 1000) / 100)].visible = true;

            AIScoreSprites.forEach(a => {

                a.forEach(e => {

                    e.visible = false;

                });

            });

            AIScoreSprites[0][AIScore % 10].visible = true;
            AIScoreSprites[1][Math.floor((AIScore % 100) / 10)].visible = true;
            AIScoreSprites[2][Math.floor((AIScore % 1000) / 100)].visible = true;

            if (Math.abs(playerScore - AIScore) === 5) {

                message.content = playerScore > AIScore ? "You win !" : "You lose !";
                message.visible = true;

                game.state = reset;

            }

        }

        dBallVector.ax = ball.x + ball.halfWidth;
        dBallVector.ay = ball.y + ball.halfHeight;
        dBallVector.bx = ball.x + ball.halfWidth + ball.vx * 3;
        dBallVector.by = ball.y + ball.halfHeight + ball.vy * 3;


        dBallV.content = ball.vx + ", " +  ball.vy;

        dPlayerV.content = player.vx + ", " +  player.vy;

        dAIV.content = AI.vx + ", " +  AI.vy;

    }


    function reset() {

        playerScore = 0;
        AIScore = 0;

        player.x = 60;
        player.y = 309;

        AI.x = 732;
        AI.y = 309;

        ball.x = 396;
        ball.y = 320;

        ball.vy = (game.randomInt(0,1) === 0 ? -1 : 1) * game.randomInt(1,3);
        ball.vx = (game.randomInt(0,1) === 0 ? -1 : 1) * game.randomInt(2,4);

        playerScoreSprites.forEach(a => {

            a.forEach(e => {

                e.visible = false;

            });

        });

        playerScoreSprites[0][0].visible = true;
        playerScoreSprites[1][0].visible = true;
        playerScoreSprites[2][0].visible = true;

        AIScoreSprites.forEach(a => {

            a.forEach(e => {

                e.visible = false;

            });

        });

        AIScoreSprites[0][0].visible = true;
        AIScoreSprites[1][0].visible = true;
        AIScoreSprites[2][0].visible = true;

    }

    game.start();

//})();