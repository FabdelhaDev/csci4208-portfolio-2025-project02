export default class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, dir, damage = 5) {
        super(scene, x, y, 'fireball');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = damage;
        this.body.setVelocity(dir.x * 300, dir.y * 300); 
        this.body.setCollideWorldBounds(false);
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.y < -50 || this.y > this.scene.sys.canvas.height + 50 ||
            this.x < -50 || this.x > this.scene.sys.canvas.width + 50) {
            this.destroy();
        }
    }
}
