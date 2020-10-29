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

    let gameScene, background, playingGround, player, AI;

    function load() {

        game.loadingBar();

    }

    function setup() {

        gameScene = game.group();

        background = game.sprite("resources/background.png");

        gameScene.addChild(background);

        playingGround = game.group(
            game.line("white", 1, 32, 72, 32, 576),
            game.line("white", 1, 32, 72, 768, 72),
            game.line("white", 1, 32, 576, 768, 576),
            game.line("white", 1, 768, 72, 768, 576)
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

    }

    function play() { }

    function reset() { }

    game.start();

})();