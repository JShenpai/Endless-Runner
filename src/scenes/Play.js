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
        this.load.image('dashicon','./assets/dashicon.png');
        this.load.image('healthicon','./assets/healthicon.png');
        this.load.image('timeicon','./assets/timeicon.png');

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

        //add player
        this.player = this.physics.add.sprite(game.config.width/3, game.config.height/3*2-32,'player1').setOrigin(0,0);
        this.player.setGravityY(gameSettings.playerGravity);

        // indicator bar
        this.add.rectangle(0, game.config.height - 50, game.config.width, 50, 0x002B48).setOrigin(0, 0);

        //add avalanche
        this.avalanche = this.add.tileSprite(-560,0,640,480,'avalanche').setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000).setOrigin(0, 0);

        //physics groups
        this.sams = this.physics.add.group();
        this.cones = this.physics.add.group();

        //collider
        this.physics.add.collider(this.player, this.startPlat);
        this.physics.add.collider(this.player, this.platform1);
        this.physics.add.collider(this.player, this.platform2);
        this.physics.add.collider(this.player, this.platform3);

        //overlap
        this.physics.add.overlap(this.player, this.sams, this.collectSam, null, this);

        this.physics.add.overlap(this.player, this.cones, this.hurtPlayer, null, this);


        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.anims.create(
            {
                key: 'walk',
                frames: this.anims.generateFrameNumbers('player1', {start: 0, end: 7, first: 0}),
                frameRate: 20
            }
        );

        //keep track of player jump count
        this.playerJumps = 0;

        //keep track of player dashes
        this.playerDashes = 2;

        this.totalSams = 0;

        //keep track of dash status
        this.isDashing = false;

        this.playerHealth = 3;

        this.score = 0;

        this.timer = this.time.addEvent({ delay: 1000, callback: this.increaseScore, callbackScope: this, loop: true });

        // display dashes
        let indicateConfig = {
            fontSize: '24px'
        }
        this.dashIndicate = this.add.tileSprite(game.config.width / 6 + 50,game.config.height - 45,30,30,'dashicon').setOrigin(0,0);
        this.dashValue = this.add.text(game.config.width / 6 + 85, game.config.height - 35, this.playerDashes, indicateConfig);

        // display health
        this.healthIndicate = this.add.tileSprite(game.config.width / 6 + 200,game.config.height - 45,30,30,'healthicon').setOrigin(0,0);
        this.healthValue = this.add.text(game.config.width / 6 + 235, game.config.height - 35, this.playerHealth, indicateConfig);

        // display score
        this.timeIndicate = this.add.tileSprite(game.config.width / 6 + 350,game.config.height - 45,30,30,'timeicon').setOrigin(0,0);
        this.timeValue = this.add.text(game.config.width / 6 + 385, game.config.height - 35, this.score, indicateConfig);
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

        if(Phaser.Input.Keyboard.JustDown(keyD) && this.playerDashes > 0 && this.isDashing == false)
        {
            this.isDashing = true;
            this.sound.play('sfx_dash');
            this.player.setVelocityX(1000);
            this.dashDuration = this.time.delayedCall(100, () =>
            {
                this.player.setVelocityX(-50)
            },null, this);
            this.positionRest = this.time.delayedCall(1775, () =>
            {
                this.player.setVelocityX(0);
                this.isDashing = false;
                console.log(this.player.x);
            },null, this);
            --this.playerDashes;
            this.dashValue.text = this.playerDashes;
        }

        if(this.player.y >= 580 || this.playerHealth == 0)
        {
            console.log(this.score);
            this.scene.start('endScene', {score: this.score, totalSams: this.totalSams});
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
                this.cone1 = this.physics.add.sprite(this.platform1.x + Phaser.Math.Between(0, this.platform1.width - 20), this.platform1.y - 20, 'spike').setOrigin(0,0);
                this.cones.add(this.cone1);
                this.isCone1 = true;
            }
        }
        if(this.platform2.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,4);
            if(chance == 0)
            {
                this.cone2 = this.physics.add.sprite(this.platform2.x + Phaser.Math.Between(0, this.platform2.width - 20), this.platform2.y - 20, 'spike').setOrigin(0,0);
                this.cones.add(this.cone2);
                this.isCone2 = true;
            }
        }
        if(this.platform3.x == game.config.width)
        {
            var chance = Phaser.Math.Between(0,4);
            if(chance == 0)
            {
                this.cone3 = this.physics.add.sprite(this.platform3.x + Phaser.Math.Between(0, this.platform3.width - 20), this.platform3.y - 20, 'spike').setOrigin(0,0);
                this.cones.add(this.cone3);
                this.isCone3 = true;
            }
        }
        /*
        this.score = this.time.now/1000;
        */
    }
    collectSam(player, sam)
    {
        sam.disableBody(true, true);
        this.sound.play('sfx_eat');
        this.playerDashes++;
        this.dashValue.text = this.playerDashes;
        this.totalSams++;
    }

    hurtPlayer(player, cone)
    {
        this.sound.play('sfx_hit');
        this.playerHealth--;
        cone.disableBody(true, true);
        console.log(this.playerHealth);
        this.healthValue.text = this.playerHealth;
        this.avalanche.x += 25;
    }

    increaseScore()
    {
        this.score++; 
        this.timeValue.text = this.score;
    }
}