import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import GameOver from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [MainMenu, GameScene, GameOver],
    physics: { default: 'arcade', arcade: { debug: false } },
    backgroundColor: '#222',
    scale: {
        mode: Phaser.Scale.RESIZE,  
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

new Phaser.Game(config);
