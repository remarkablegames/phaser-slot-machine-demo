import type Phaser from 'phaser';

import Boot from './base_scenes/Boot';
import Game from './base_scenes/Game';
import Preload from './base_scenes/Preload';

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
