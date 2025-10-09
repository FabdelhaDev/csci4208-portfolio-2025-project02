import Player from '../objects/Player.js';
import Fireball from '../objects/Fireball.js';
import Enemy from '../objects/Enemy.js';
import { store } from '../store.js';
import { rollDamage } from '../api/rolz.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    preload() {
        this.load.image('player', '../assets/player.png');
        this.load.image('fireball', '../assets/projectile.png');
        this.load.image('enemy', '../assets/enemy-0.png');
    }

    create() {
        store.kills = 0;
        store.fireballsUsed = 0;
        store.startTime = Date.now();

        this.fireballs = this.physics.add.group();
        this.player = new Player(this, 400, 300);
        this.enemies = this.physics.add.group();
        const enemy = new Enemy(this, 100, 100);
        this.enemies.add(enemy);
        const enemy2 = new Enemy(this, 200, 100);
        this.enemies.add(enemy2);
        const enemy3 = new Enemy(this, 300, 100);
        this.enemies.add(enemy3);
        

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.shoot, this);

        this.physics.add.overlap(this.fireballs, this.enemies, this.hitEnemy, null, this);
    }

    async shoot() {
        const dir = new Phaser.Math.Vector2(0, -1);

        const damage = await rollDamage();
        console.log(`Rolled ${damage} damage for fireball!`);

        const fireball = new Fireball(this, this.player.x, this.player.y - 20, dir, damage);
        this.fireballs.add(fireball);
        store.fireballsUsed++;
    }

    hitEnemy(fireball, enemy) {
        fireball.destroy();
        enemy.destroy();
        store.kills++;

        if (this.enemies && this.enemies.countActive) {
            if (this.enemies.countActive(true) === 0) {
                this.endGame();
            }
        }
    }
    
    endGame(){
        store.time = Math.floor((Date.now() - store.startTime) / 1000);
        this.scene.start('GameOver');
    }

    update() {
        this.player.move(this.cursors);
        
        if (this.enemies && this.enemies.children) {
            this.enemies.children.iterate(enemy => {
                if (enemy && enemy.active) enemy.update(this.player);
        })};

        store.time = Math.floor((Date.now() - store.startTime) / 1000);

    }
}
