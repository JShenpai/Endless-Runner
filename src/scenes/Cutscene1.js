class Cutscene1 extends Phaser.Scene
{
    constructor()
    {
        super("cut1Scene");
    }

    preload()
    {
        this.load.audio('sfx_select','./assets/select.wav');
        this.load.image('intro1','./assets/intro1.jpg');
    }

    create()
    {

        this.add.tileSprite(0,0,640,480,'intro1').setOrigin(0,0);
        this.add.text(20,20,"It's getting late,");
        this.add.text(20,40,"and you seem");
        this.add.text(20,60,"hungry...");
        this.add.text(20,100,"Press SPACE to");
        this.add.text(20,120,"continue");
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.sound.play('sfx_select');
            this.scene.start('cut2Scene');
        }
    }
}