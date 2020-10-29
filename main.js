(function() {
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

    function load() {

        game.loadingBar();

    }

    function setup() {

        gameScene = game.group();

        background = game.sprite("resources/background.png");

        gameScene.addChild(background);

        playingGround = game.group(
            game.line("white", 1, 32, 88, 32, 576),
            game.line("white", 1, 32, 88, 768, 88),
            game.line("white", 1, 32, 576, 768, 576),
            game.line("white", 1, 768, 88, 768, 576)
        );

        gameScene.addChild(playingGround);

        player = game.sprite("resources/paddle.png");
        player.pivotX = 0.5;
        player.pivotY = 0.5;
        player.x = 64;
        player.y = 324;

        gameScene.addChild(player);

        AI = game.sprite("resources/paddle.png");
        AI.pivotX = 0.5;
        AI.pivotY = 0.5;
        AI.x = 736;
        AI.y = 324;

        gameScene.addChild(AI);

        ball = game.sprite("resources/ball.png");
        ball.pivotX = 0.5;
        ball.pivotY = 0.5;
        ball.x = 400;
        ball.y = 324;

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



    }

    function play() { }

    function reset() { }

    game.start();

})();