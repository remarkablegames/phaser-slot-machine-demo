import Phaser from 'phaser';

export class Sprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.setInteractive();
  }
}
