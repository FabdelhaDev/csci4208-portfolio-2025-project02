import { store } from '../store.js';
import { saveBestRun } from '../api/jsonbin.js';

export default class GameOver extends Phaser.Scene {
    constructor() { super('GameOver'); }

    preload() {
        this.load.image('GameOver', 'assets/Screens/GameOver.png');
    }

    async create() {
        const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'GameOver');
        bg.setOrigin(0.5);
        bg.setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(this.scale.width / 2, 200, 'Game Over', {
            fontSize: '48px',
            color: '#f00'
        }).setOrigin(0.5);

        const run = { kills: store.kills, fireballsUsed: store.fireballsUsed, time: store.time, timestamp: new Date().toISOString() };
        localStorage.setItem('lastRun', JSON.stringify(run));

        const best = JSON.parse(localStorage.getItem('bestRun'));
        if (!best || run.kills > best.kills) {
            localStorage.setItem('bestRun', JSON.stringify(run));
            await saveBestRun(run);
        }

        this.add.text(this.scale.width / 2, 350, 'Click to return to menu', {
            fontSize: '24px',
            color: '#fff'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => this.scene.start('MainMenu'));
    }
}
