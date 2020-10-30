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
            "resources/9.png"
        ];

    let game = hexi(800, 600, setup, assets, load);
    game.fps = 60;
    game.scaleToWindow();

    let gameScene, background, playingGround, player, AI, ball, scoreScene;

    let playerScore = {
        first : 0,
        second : 0,
        third : 0
    };

    let AIScore = {
        first : 0,
        second : 0,
        third : 0
    };

    let playerScoreSprites = [];
    let AIScoreSprites = [];

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

        //let zone = game.rectangle(724, 476, "white", "white", 0, 38, 94);
        //gameScene.addChild(zone);

        game.keyboard(13).press = () => {

            if (game.state !== play) {

                game.state = play;

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

        ball.vy = (game.randomInt(0,1) === 0 ? -1 : 1) * 2;
        ball.vx = (game.randomInt(0,1) === 0 ? -1 : 1) * 2;

    }

    function play() {

        game.move(player);

        game.contain(player, playingArea);

        game.move(AI);

        if (ball.vy > 0 && ball.y > (AI.y + AI.halfHeight)) {

            AI.vy = 5;

        } else  if (ball.vy < 0 && ball.y < (AI.y + AI.halfHeight)) {

            AI.vy = -5;

        } else {

            AI.vy = 0;

        }

        game.contain(AI, playingArea);

        game.move(ball);

        if ((game.hitTestRectangle(player, ball) && ball.vx < 0) || (game.hitTestRectangle(AI, ball) && ball.vx > 0)) {

            ball.vx *= -1;
            ball.vy += ((ball.vy < 0) ? -1 : 1) * 0.5;
            ball.vx += ((ball.vx < 0) ? -1 : 1) * 0.5;

        }

        let ballHitsEdges = game.contain(ball, playingArea, true);

        if (ballHitsEdges) {

            if (ballHitsEdges.has('right') || ballHitsEdges.has('left')) {

                if (ballHitsEdges.has('right')) {

                    incrementScore(playerScore);

                } else if (ballHitsEdges.has('left')) {

                    incrementScore(AIScore);

                }

                ball.x = 400;
                ball.y = 324;

                ball.vy = (game.randomInt(0,1) === 0 ? -1 : 1) * 2;
                ball.vx = (game.randomInt(0,1) === 0 ? -1 : 1) * 2;

            }

        }

    }

    function incrementScore(score) {

        if (score.first < 9) {

            score.first++;

        } else if (score.second < 9) {

            score.second++;

        } else {

            score.third++;

        }

    }

    function reset() {



    }

    game.start();

//})();