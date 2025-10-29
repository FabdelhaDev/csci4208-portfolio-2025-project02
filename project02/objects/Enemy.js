export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, health = 50) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 150;

        this.maxHealth = health;
        this.currentHealth = this.maxHealth;

        this.healthText = scene.add.text(this.x, this.y - 30, `HP: ${this.currentHealth}`, {
            fontSize: '14px',
            color: '#f00'
        }).setOrigin(0.5);
    }

    update(player) {
        if (!player || !this.active) return;

        const dir = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y).normalize();
        this.body.setVelocity(dir.x * this.speed, dir.y * this.speed);

        this.setFlipX(dir.x < 0);  
        this.anims.play('enemyDemonAggro', true);
    }


    takeDamage(amount) {
        this.currentHealth -= amount;
        if (this.currentHealth < 0) this.currentHealth = 0;
        this.healthText.setText(`HP: ${this.currentHealth}`);
        if (this.currentHealth === 0) {
            this.healthText.destroy();
            this.destroy();
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.healthText.setPosition(this.x, this.y - 30);
    }

}
