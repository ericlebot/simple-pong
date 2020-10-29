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

    function load() {

        game.loadingBar();

    }

    function setup() {

    }

    function play() { }

    function reset() { }

    game.start();

})();