class End extends Phaser.Scene
{
    constructor()
    {
        super("endScene");
    }

    preload()
    {
        this.load.image('gameOver','./assets/gameOver.jpg');
    }

    init(data)
    {
        this.score = data.score;
    }
    create()
    {
        this.add.tileSprite(0,0,640,480,'gameOver').setOrigin(0,0);
        this.add.text(20,20,"GAME OVER");

        this.add.text(20,80,"Press SPACE to restart");

        this.add.text(20,40,"You resisted temptation for " + Math.round(this.score) + " seconds!");
        
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