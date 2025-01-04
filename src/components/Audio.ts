import type Phaser from 'phaser';

export class Audio {
  audioButton;
  audioLose;
  audioReelStop;
  audioReels;
  audioWin;
  musicBackgroundDefault;
  musicDefault;

  constructor(scene: Phaser.Scene) {
    this.musicBackgroundDefault = scene.sound.add('backgroundDefault', {
      loop: true,
      volume: 1.5,
    });

    this.audioReels = scene.sound.add('reels');
    this.audioReelStop = scene.sound.add('reelStop');
    this.audioWin = scene.sound.add('win', { loop: true });
    this.audioButton = scene.sound.add('button');
    this.audioLose = scene.sound.add('lose', { volume: 2.5 });

    this.musicDefault = scene.sound.add('musicDefault', {
      loop: true,
      volume: 2,
    });
  }
}
