export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 100;
    }

    update(player) {
        if (!player || !this.active) return;

        const direction = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y).normalize();
        this.body.setVelocity(direction.x * this.speed, direction.y * this.speed);
    }
}
