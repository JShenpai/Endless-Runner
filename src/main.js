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
            debug: false
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keySPACE, keyD;

//set UI sizes
let borderUISize = game.config.height/50;