class End extends Phaser.Scene
{
    constructor()
    {
        super("endScene");
    }

    create()
    {
        this.add.text(20,20,"GAME OVER");

        this.add.text(20,40,"Press SPACE to restart");
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.scene.start('playScene');
        }
    }
}