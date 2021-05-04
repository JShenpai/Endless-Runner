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
        this.load.image('mainMenu','./assets/mainMenu.jpg');
    }

    create()
    {
        this.add.text(20,20,"Endless Runner Menu");

        this.add.text(20,40,"Press SPACE to start");

        this.add.tileSprite(0,0,640,480,'mainMenu').setOrigin(0,0);
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}