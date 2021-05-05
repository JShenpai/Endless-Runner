class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.audio('sfx_dash','./assets/dash.wav');
        this.load.audio('sfx_eat','./assets/eat.wav');
        this.load.audio('sfx_hit','./assets/hit.wav');
        this.load.audio('sfx_jump','./assets/jump.wav');
        this.load.audio('sfx_select','./assets/select.wav');
        this.load.audio('sfx_superDash','./assets/superDash.wav');
        this.load.audio('music','./assets/Music.wav');
        this.load.image('mainMenu','./assets/mainMenu.jpg');
    }

    create()
    {

        this.add.tileSprite(0,0,640,480,'mainMenu').setOrigin(0,0);

        this.add.text(20,game.config.height - 95,"CONTROLS:");
        this.add.text(20,game.config.height - 65,"Press SPACE to jump,");
        this.add.text(20,game.config.height - 45,"and again in midair");
        this.add.text(20,game.config.height - 25,"to double jump");
        this.add.text(50,game.config.height / 2,"Escape the food avalanche!");

        this.add.text(game.config.width - 225,game.config.height - 95,"CONTROLS:");
        this.add.text(game.config.width - 225,game.config.height - 65,"Press D to dash, gain");
        this.add.text(game.config.width - 225,game.config.height - 45,"dashes by collecting");
        this.add.text(game.config.width - 225,game.config.height - 25,"sandwiches");
        this.add.text(game.config.width - 250,game.config.height * (13/20),"Avoid the cone spikes!");

        this.add.text(game.config.width / 4 + 15,120,"Press D to see cutscenes again", { backgroundColor: '#8cb8ff', color: '#570909' });
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // play music
        let musicConfig = {
            loop: true,
            volume: 0.5
        }
        game.sound.stopAll();
        this.gameMusic = this.sound.add('music', musicConfig);
        if (!this.gameMusic.isPlaying) {
            this.gameMusic.play();
        }
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyD))
        {
            this.sound.play('sfx_select');
            this.scene.start('cut1Scene');
        }
    }
}