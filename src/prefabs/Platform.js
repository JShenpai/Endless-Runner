//Platform
class Platform extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();
        this.moveSpeed = 4;
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
    }

    //position reset
    reset()
    {
        this.x = game.config.width;
    }
}