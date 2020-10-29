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

    let background, playingGround;

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

    }

    function play() { }

    function reset() { }

    game.start();

})();