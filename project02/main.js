import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222',
    physics: { 
        default: 'arcade', 
        arcade: { debug: false } 
    },
    scene: [MainMenu, GameScene, GameOver]
};

new Phaser.Game(config);
