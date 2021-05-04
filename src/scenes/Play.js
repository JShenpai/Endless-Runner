let gameSettings = 
{
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 1500,
    jumpForce: 500,
    playerStartPosition: 200,
    jumps: 2
}



class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image('bg1','./assets/bg_1.png');
        this.load.image('bg2','./assets/bg_2.png');
        this.load.image('bg3','./assets/bg_3.png');
        this.load.image('bg4','./assets/bg_4.png');
        this.load.image('avalanche','./assets/avalanche.png');
        this.load.image('platformstart','./assets/pancake_platform.png');
        this.load.image('spike','./assets/cone_spike.png');
        this.load.image('sandwich','./assets/sam.png');
        this.load.image('platform1','./assets/platform_1.png');
        this.load.image('platform2','./assets/platform_2.png');
        this.load.image('platform3','./assets/platform_3.png');

        this.load.spritesheet('player1','./assets/pajama_maniac.png',{frameWidth: 40, frameHeight: 40, startFrame: 0, endFrame: 7});
    }

    create()
    {
        let scene = this;
        //place tile sprites
        this.bg1 = this.add.tileSprite(0,0,640,480,'bg1').setOrigin(0,0);
        this.bg2 = this.add.tileSprite(0,0,640,480,'bg2').setOrigin(0,0);
        this.bg3 = this.add.tileSprite(0,0,640,480,'bg3').setOrigin(0,0);
        this.bg4 = this.add.tileSprite(0,0,640,480,'bg4').setOrigin(0,0);

        //add starting platform
        this.startPlat = this.physics.add.sprite(0,game.config.height/3*2+8,'platformstart').setOrigin(0,0);
        this.startPlat.setImmovable(true);

        let arr = ['platform1', 'platform2', 'platform3'];
        
        this.platform1 = new Platform(this, game.config.width + 100, Phaser.Math.Between(300,350), Phaser.Utils.Array.GetRandom(arr)).setOrigin(0,0);
        this.platform2 = new Platform(this, game.config.width + 300, Phaser.Math.Between(300,350), Phaser.Utils.Array.GetRandom(arr)).setOrigin(0,0);
        this.platform3 = new Platform(this, game.config.width + 600, Phaser.Math.Between(300,350), Phaser.Utils.Array.GetRandom(arr)).setOrigin(0,0);
        
        //cone booleans
        this.isCone1 = false;
        this.isCone2 = false;
        this.isCone3 = false;

        //sandwich booleans
        this.isSam1 = false;
        this.isSam2 = false;
        this.isSam3 = false;

        //add avalanche
        this.avalanche = this.add.tileSprite(-560,0,640,480,'avalanche').setOrigin(0,0);

        //add player
        this.player = this.physics.add.sprite(game.config.width/3, game.config.height/3*2-32,'player1').setOrigin(0,0);
        this.player.setGravityY(gameSettings.playerGravity);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);

        //sams group
        this.sams = this.physics.add.group();

        //collider
        this.physics.add.collider(this.player, this.startPlat);
        this.physics.add.collider(this.player, this.platform1);
        this.physics.add.collider(this.player, this.platform2);
        this.physics.add.collider(this.player, this.platform3);

        //overlap
        this.physics.add.overlap(this.player, this.sams, this.collectSam, null, this);


        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.anims.create(
            {
                key: 'walk',
                frames: this.anims.generateFrameNumbers('player1', {start: 0, end: 7, first: 0}),
                frameRate: 20
            }
        );

        this.playerJumps = 0;
    }


    update()
    {
        if(this.player.body.touching.down)
        {
            this.playerJumps = 0;
            this.player.anims.play('walk', true);
            if(Phaser.Input.Keyboard.JustDown(keySPACE))
            {
                this.sound.play('sfx_jump');
                this.player.setVelocityY(gameSettings.jumpForce*-1);
                ++this.playerJumps;
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)&&!this.player.body.touching.down)
        {
            if(this.playerJumps > 0 && this.playerJumps < gameSettings.jumps)
            {
                this.sound.play('sfx_jump');
                this.player.setVelocityY(gameSettings.jumpForce*-1);
                ++this.playerJumps;
            }
        }

        if(this.player.y >= 580)
        {
            this.scene.start('endScene');
        }
        this.bg2.tilePositionX += 2;
        this.bg3.tilePositionX += 4;
        this.bg4.tilePositionX += 6;
        this.startPlat.x -= 5;
        if (this.isCone1) {
            this.cone1.x -= 5;
        }
        if (this.isCone2) {
            this.cone2.x -= 5;
        }
        if (this.isCone3) {
            this.cone3.x -= 5;
        }
        if (this.isSam1) {
            this.sam1.x -= 5;
        }
        if (this.isSam2) {
            this.sam2.x -= 5;
        }
        if (this.isSam3) {
            this.sam3.x -= 5;
        }
        this.platform1.update();
        this.platform2.update();
        this.platform3.update();

        //chance for sandwich to spawn
        if(this.platform1.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,2);
            if(chance == 0)
            {
                this.sam1 = this.physics.add.sprite(this.platform1.x + Phaser.Math.Between(0, this.platform1.width - 40), this.platform1.y - 40, 'sandwich').setOrigin(0,0);
                this.sams.add(this.sam1);
                this.isSam1 = true;
            }
        }
        if(this.platform2.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,2);
            if(chance == 0)
            {
                this.sam2 = this.physics.add.sprite(this.platform2.x + Phaser.Math.Between(0, this.platform2.width - 40), this.platform2.y - 40, 'sandwich').setOrigin(0,0);
                this.sams.add(this.sam2);
                this.isSam2 = true;
            }
        }
        if(this.platform3.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,2);
            if(chance == 0)
            {
                this.sam3 = this.physics.add.sprite(this.platform3.x + Phaser.Math.Between(0, this.platform3.width - 40), this.platform3.y - 40, 'sandwich').setOrigin(0,0);
                this.sams.add(this.sam3);
                this.isSam3 = true;
            }
        }

        //chance for spike to spawn
        if(this.platform1.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,4);
            if(chance == 0)
            {
                this.cone1 = this.physics.add.sprite(this.platform1.x + Phaser.Math.Between(0, this.platform1.width - 40), this.platform1.y - 40, 'spike').setOrigin(0,0);
                this.isCone1 = true;
            }
        }
        if(this.platform2.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,4);
            if(chance == 0)
            {
                this.cone2 = this.physics.add.sprite(this.platform2.x + Phaser.Math.Between(0, this.platform2.width - 40), this.platform2.y - 40, 'spike').setOrigin(0,0);
                this.isCone2 = true;
            }
        }
        if(this.platform3.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,4);
            if(chance == 0)
            {
                this.cone3 = this.physics.add.sprite(this.platform3.x + Phaser.Math.Between(0, this.platform3.width - 40), this.platform3.y - 40, 'spike').setOrigin(0,0);
                this.isCone3 = true;
            }
        }
    }
    collectSam(player, sam)
    {
        sam.disableBody(true, true);
        this.sound.play('sfx_eat');
    }
}