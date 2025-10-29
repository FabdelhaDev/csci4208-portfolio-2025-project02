import { loadBestRun } from '../api/jsonbin.js';
import { store } from '../store.js';

export default class MainMenu extends Phaser.Scene {
    constructor() { super('MainMenu'); }

    preload() {
        this.load.image('TitleScreen', 'assets/Screens/TitleScreen.png');
    }

    async create() {
        const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'TitleScreen');
        bg.setOrigin(0.5);
        bg.setDisplaySize(this.scale.width, this.scale.height); 

        this.add.text(this.scale.width / 2, 180, 'Phaser Roguelike Game', {
            fontSize: '40px',
            color: '#fff'
        }).setOrigin(0.5);

        const start = this.add.text(this.scale.width / 2, 300, 'Click to Start', {
            fontSize: '28px',
            color: '#0f0'
        }).setOrigin(0.5);

        const best = await loadBestRun();
        if (best) {
            store.bestRun = best;
            this.add.text(this.scale.width / 2, 400, `Best Run: ${best.kills} kills, ${best.time}s`, {
                fontSize: '20px',
                color: '#ccc'
            }).setOrigin(0.5);
        }

        this.input.once('pointerdown', () => this.scene.start('GameScene'));
    }
}
