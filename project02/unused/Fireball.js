export default class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, dir, damage = 5) {
        super(scene, x, y, 'fireball');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = damage;
        this.speed = 400;

        // Move in the direction of the cursor
        this.body.setVelocity(dir.x * this.speed, dir.y * this.speed);

        // Rotate to face travel direction
        this.setRotation(Phaser.Math.Angle.Between(0, 0, dir.x, dir.y));

        // Automatically destroy after 2 seconds to clean up
        scene.time.delayedCall(2000, () => this.destroy());
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        // Destroy if it goes offscreen
        if (
            this.x < -50 || this.x > this.scene.sys.canvas.width + 50 ||
            this.y < -50 || this.y > this.scene.sys.canvas.height + 50
        ) {
            this.destroy();
        }
    }
}
