//Platform
class Platform extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();
        this.moveSpeed = 2;
        this.spike = false;
    }

    update()
    {
        //move platform left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width)
        {
            this.x = game.config.width;
            this.y = Phaser.Math.Between(300,350);
        }

        if(this.spike == true)
        {
            this.placeSpike();

        }
    }

    placeSpike()
    {
        this.cone = this.physics.add.Sprite(this.x, this.y,'spike').setOrigin(0,0);
    }

    //position reset
    reset()
    {
        var chance = Phaser.Math.Between(0,4);
        if(chance == 0)
        {
            this.spike = true;
        }
        else
        {
            this.spike = false;
        }
        this.x = game.config.width;
    }
}