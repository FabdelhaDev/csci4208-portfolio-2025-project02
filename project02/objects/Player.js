export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.speed = 200;

        this.maxHealth = 50;
        this.currentHealth = this.maxHealth;

        this.healthText = scene.add.text(this.x, this.y - 40, `HP: ${this.currentHealth}`, {
            fontSize: '14px',
            color: '#0f0'
        }).setOrigin(0.5);

        this.canAttack = true;
        
    }

    move(cursors, shiftKey) {
        let speed = this.speed;
        let animKey = 'playerIdle';

        if (shiftKey && shiftKey.isDown) {
            speed *= 1.8;
            animKey = 'playerSprint';
        } else if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
            animKey = 'playerWalk';
        }

        this.setVelocity(0);

        if (cursors.left.isDown) {
            this.setVelocityX(-speed);
            this.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(speed);
            this.setFlipX(false);
        }

        if (cursors.up.isDown) this.setVelocityY(-speed);
        else if (cursors.down.isDown) this.setVelocityY(speed);

        this.anims.play(animKey, true);
    }
    
    takeDamage(amount) {
        if (this.invulnerable) return;

        this.currentHealth -= amount;
        this.healthText.setText(`HP: ${this.currentHealth}`);
        this.setTint(0xff5555);
        this.scene.time.delayedCall(150, () => this.clearTint());

        if (this.currentHealth <= 0) {
            this.setTint(0xff0000);
            this.scene.endGame();
        } else {
            this.invulnerable = true;
            this.canAttack = false;

            this.scene.time.delayedCall(250, () => this.canAttack = true);

            this.scene.time.delayedCall(1000, () => {
                this.invulnerable = false;
            });
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.healthText.setPosition(this.x, this.y - 40);
    }
}
