let gameSettings = 
{
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 1200,
    jumpForce: 400,
    playerStartPosition: 200,
}

class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image('bg','./assets/ROUGHbg.png');
        this.load.image('player','./assets/placeholderPlayer.png');
        this.load.image('platform','./assets/placeholderPlatform.png');
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

        //add player
        this.player = this.physics.add.sprite(game.config.width/3, game.config.height/3*2,'player').setOrigin(0,0);
        this.player.setGravityY(gameSettings.playerGravity);

        //add starting platform
        this.startPlat = this.physics.add.sprite(0,game.config.height/3*2+8,'platform').setOrigin(0,0);
        this.startPlat.setImmovable(true);

        //collider
        this.physics.add.collider(this.player, this.startPlat);
    }

    update()
    {
        this.bg.tilePositionX += 4;
        this.startPlat.x -= 1;
    }
}