import { store } from '../store.js';
import { saveBestRun } from '../api/jsonbin.js';

export default class GameOver extends Phaser.Scene {
    constructor() { super('GameOver'); }

    async create() {
        this.add.text(400, 200, 'Game Over', { fontSize: '48px', color: '#f00' }).setOrigin(0.5);

        const run = { kills: store.kills, fireballsUsed: store.fireballsUsed, time: store.time, timestamp: new Date().toISOString() };
        localStorage.setItem('lastRun', JSON.stringify(run));

        const best = JSON.parse(localStorage.getItem('bestRun'));
        if (!best || run.kills > best.kills) {
            localStorage.setItem('bestRun', JSON.stringify(run));
            await saveBestRun(run);
        }

        this.add.text(400, 350, 'Click to return to menu', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        this.input.once('pointerdown', () => this.scene.start('MainMenu'));
    }
}
