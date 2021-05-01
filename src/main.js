let config =
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play, End],
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

//reserve keyboard vars
let keySPACE;

//set UI sizes
let borderUISize = game.config.height/50;