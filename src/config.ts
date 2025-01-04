import type Phaser from 'phaser';

import { Boot, Game, Preload } from './scenes';

type Config = Phaser.Types.Core.GameConfig & { width: number; height: number };

const config: Config = {
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
