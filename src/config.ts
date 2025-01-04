import type Phaser from 'phaser';

import { Boot, Game, Preload } from './scenes';

const config: Phaser.Types.Core.GameConfig = {
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  fps: {
    min: 30,
    target: 60,
  },
  scene: [Preload, Boot, Game],
};

export default config;
