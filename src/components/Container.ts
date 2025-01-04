import Phaser from 'phaser';

import options from '../options';

export class Container extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    const symbols1 = scene.add.sprite(
      0,
      0,
      'symbols',
      `symbols_${this.randomBetween(0, 9)}.png`,
    );

    const symbols2 = scene.add.sprite(
      0,
      -options.symbolHeight,
      'symbols',
      `symbols_${this.randomBetween(0, 9)}.png`,
    );

    const symbols3 = scene.add.sprite(
      0,
      -options.symbolHeight * 2,
      'symbols',
      `symbols_${this.randomBetween(0, 9)}.png`,
    );

    const symbols4 = scene.add.sprite(
      0,
      -options.symbolHeight * 3,
      'symbols',
      `symbols_${this.randomBetween(0, 9)}.png`,
    );

    const symbols5 = scene.add.sprite(
      0,
      -options.symbolHeight * 4,
      'symbols',
      `symbols_${this.randomBetween(0, 9)}.png`,
    );

    this.add([symbols1, symbols2, symbols3, symbols4, symbols5]);
  }

  private randomBetween(min: number, max: number) {
    return Phaser.Math.Between(min, max);
  }
}
