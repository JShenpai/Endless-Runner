let config =
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    physics:
    {
        default: 'arcade',
        arcade:
        {
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height/50;