class Cutscene2 extends Phaser.Scene
{
    constructor()
    {
        super("cut2Scene");
    }

    preload()
    {
        this.load.audio('sfx_select','./assets/select.wav');
        this.load.image('intro2','./assets/intro2.jpg');
    }

    create()
    {

        this.add.tileSprite(0,0,640,480,'intro2').setOrigin(0,0);
        this.add.text(20,20,"...but can you resist");
        this.add.text(20,40,"the temptation?");
        this.add.text(20,80,"Press SPACE to continue");
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.sound.play('sfx_select');
            this.scene.start('menuScene');
        }
    }
}