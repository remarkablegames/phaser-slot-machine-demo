import Phaser from 'phaser';

export class Sprite extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string,
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.setInteractive();
  }
}
