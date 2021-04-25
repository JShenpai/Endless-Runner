class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image('bg','./assets/ROUGHbg.png');
    }

    create()
    {
        //place tile sprite
        this.bg = this.add.tileSprite(0,0,640,480,'bg').setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);
    }

    update()
    {
        this.bg.tilePositionX += 4;
    }
}