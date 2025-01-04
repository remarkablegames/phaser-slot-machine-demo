import Phaser from 'phaser';

import config from './config';

export default class Game {
  constructor() {
    new Phaser.Game(config);
  }

  resize() {
    const canvas = document.querySelector('canvas')!;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = Number(config.width) / Number(config.height);

    if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + 'px';
      canvas.style.height = windowWidth / gameRatio + 'px';
    } else {
      canvas.style.width = windowHeight * gameRatio + 'px';
      canvas.style.height = windowHeight + 'px';
    }
  }
}

const game = new Game();
game.resize();
window.addEventListener('resize', game.resize, false);
