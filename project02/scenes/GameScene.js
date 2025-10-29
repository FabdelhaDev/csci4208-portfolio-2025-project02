import Player from '../objects/Player.js';
import Fireball from '../unused/Fireball.js';
import Enemy from '../objects/Enemy.js';
import { store } from '../store.js';
import { rollDamage } from '../api/rolz.js';

export default class GameScene extends Phaser.Scene {
    constructor() { 
        super('GameScene'); 
        this.level = 1;
        this.enemyMinSpawn = 3;
        this.enemyMaxSpawn = 7;
        this.enemyHealth = 5;
    }

    preload() {
       const loadFrames = (folder, key, frameCount) => {
            for (let i = 1; i <= frameCount; i++) {
                this.load.image(`${key}${i}`, `${folder}/${key}${i}.png`);
            }
        };

        loadFrames('assets/PlayerIdle/PlayerIdle', 'playerIdle', 12);
        loadFrames('assets/PlayerWalk/PlayerWalk', 'playerWalk', 12);
        loadFrames('assets/PlayerSprint/PlayerSprint', 'playerSprint', 12);
        loadFrames('assets/PlayerAttack1/PlayerAttack1', 'playerAttack', 12);

        loadFrames('assets/EnemyDemonIdle/EnemyDemonIdle', 'enemyDemonIdle', 12);
        loadFrames('assets/EnemyDemonAggro/EnemyDemonAggro', 'enemyDemonAggro', 12);

        this.load.image('fireball', 'assets/Attack1FireBall.png');
        this.load.audio('bgMusic', 'assets/Sound/music.wav');

        this.load.image('floorTile', 'assets/Tile/Floor.png')
    }

    create() {

        this.floor = this.add.tileSprite(
            0, 0,             
            this.scale.width, 
            this.scale.height,
            'floorTile'       
        ).setOrigin(0, 0);

        const createAnim = (key, frameCount, frameRate = 12) => {
            const frames = [];
            for (let i = 1; i <= frameCount; i++) {
                frames.push({ key: `${key}${i}` });
            }
            this.anims.create({ key, frames, frameRate, repeat: -1 });
        };

        createAnim('playerIdle', 12, 6);
        createAnim('playerWalk', 12, 12);
        createAnim('playerSprint', 12, 14);
        createAnim('playerAttack', 12, 10);

        createAnim('enemyDemonIdle', 12, 6);
        createAnim('enemyDemonAggro', 12, 10);


        this.music = this.sound.add('bgMusic', { volume: 0.5, loop: true });
        this.music.play();

        console.log('Created 10280');


        store.kills = 0;
        store.fireballsUsed = 0;
        store.startTime = Date.now();

        this.fireballs = this.physics.add.group();
        this.player = new Player(this, 400, 300);
        this.enemies = this.physics.add.group();
    
        this.spawnEnemies(2, 4);
        

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.shoot, this);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.physics.add.overlap(this.enemies, this.player, this.enemyTouchPlayer, null, this);
        this.physics.add.overlap(this.fireballs, this.enemies, this.hitEnemy, null, this);
    }

    spawnEnemies(minCount = this.enemyMinSpawn, maxCount = this.enemyMaxSpawn) {
        const count = Phaser.Math.Between(minCount, maxCount);

        for (let i = 0; i < count; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 550);

            const distance = Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y);
            if (distance < 100) continue;

            const enemy = new Enemy(this, x, y, this.enemyHealth);
            this.enemies.add(enemy);
        }
        console.log(`Spawned ${this.enemies.getChildren().length} enemies`);
    }

    async shoot() {
        if (!this.player.canAttack) return;

        const pointer = this.input.activePointer;

        const dir = new Phaser.Math.Vector2(
            pointer.worldX - this.player.x,
            pointer.worldY - this.player.y
        ).normalize();

        const damage = await rollDamage();
        console.log(`Rolled ${damage} damage for fireball!`);

        const fireball = this.fireballs.create(this.player.x, this.player.y - 20, 'fireball');
        fireball.setRotation(dir.angle()); 

        this.fireballs.add(fireball);
        fireball.damage = damage;
        fireball.speed = 400;

        fireball.body.setVelocity(dir.x * fireball.speed, dir.y * fireball.speed);

        fireball.setRotation(Phaser.Math.Angle.Between(0, 0, dir.x, dir.y));

        this.time.delayedCall(2000, () => fireball.destroy());
    
        store.fireballsUsed++;
              
    }

    async enemyTouchPlayer(player, enemy) {
        if (enemy.isAttacking) return;
        enemy.isAttacking = true;

        try {
            const damage = await rollDamage();
            player.takeDamage(damage);
        } finally {
            this.time.delayedCall(1000, () => { enemy.isAttacking = false; });
        }      
    }

    hitEnemy(fireball, enemy) {
        if (!enemy.active) return;

        enemy.takeDamage(fireball.damage);
        fireball.destroy();

        if (!enemy.active) {
            store.kills++;
            if (this.enemies.countActive(true) === 0) {
                this.levelComplete();
            }
        }
    }
    
    endGame() {
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }
        store.time = Math.floor((Date.now() - store.startTime) / 1000);
        this.scene.start('GameOver');
    }

    update() {
        this.player.move(this.cursors, this.shiftKey);
        
        if (this.enemies && this.enemies.children) {
            this.enemies.children.iterate(enemy => {
                if (enemy && enemy.active) enemy.update(this.player);
        })};

        store.time = Math.floor((Date.now() - store.startTime) / 1000);

    }

    levelComplete() {
        this.physics.pause(); 

        const next = confirm(`Level ${this.level} cleared! Proceed to level ${this.level + 1}?`);
        if (next) {
            this.level++;
            this.enemyMinSpawn++;      
            this.enemyMaxSpawn++;      
            this.enemyHealth += 2;     

            this.enemies.clear(true, true); 
            this.spawnEnemies();            
            this.physics.resume();
        } else {
            this.endGame(); 
        }
    }
}
