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
        this.load.image('avalanche','./assets/avalanche.png');
        this.load.image('platform','./assets/pancake_platform.png');

        this.load.spritesheet('player1','./assets/pajama_maniac.png',{frameWidth: 40, frameHeight: 40, startFrame: 0, endFrame: 7});
    }

    create()
    {
        //place tile sprite
        this.bg = this.add.tileSprite(0,0,640,480,'bg').setOrigin(0,0);

        //add starting platform
        this.startPlat = this.physics.add.sprite(0,game.config.height/3*2+8,'platform').setOrigin(0,0);
        this.startPlat.setImmovable(true);

        //add platform
        this.platform1 = new Platform(this, game.config.width + 720, Phaser.Math.Between(200,400), 'platform').setOrigin(0,0);
        this.platform2 = new Platform(this, game.config.width + 2560, Phaser.Math.Between(200,400), 'platform').setOrigin(0,0);

        //add avalanche
        this.avalanche = this.add.tileSprite(-580,0,640,480,'avalanche').setOrigin(0,0);

        //add player
        this.player = this.physics.add.sprite(game.config.width/3, game.config.height/3*2-32,'player1').setOrigin(0,0);
        this.player.setGravityY(gameSettings.playerGravity);

        

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);

        //collider
        this.physics.add.collider(this.player, this.startPlat);
        this.physics.add.collider(this.player, this.platform1);
        this.physics.add.collider(this.player, this.platform2);

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.anims.create(
            {
                key: 'walk',
                frames: this.anims.generateFrameNumbers('player1', {start: 0, end: 7, first: 0}),
                frameRate: 20
            }
        );
    }
    

    update()
    {
        if(this.player.body.touching.down)
        {
            this.player.anims.play('walk', true);
            if(Phaser.Input.Keyboard.JustDown(keySPACE))
            {
                this.player.setVelocityY(gameSettings.jumpForce*-1);
            }
        }

        if(this.player.y >= 580)
        {
            this.scene.start('endScene');
        }
        this.bg.tilePositionX += 4;
        this.startPlat.x -= 2;
        this.platform1.update();
        this.platform2.update();
    }
}