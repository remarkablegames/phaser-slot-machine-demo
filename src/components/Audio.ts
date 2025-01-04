import type Phaser from 'phaser';

export class Audio {
  audioButton: Phaser.Sound.BaseSound;
  audioLose: Phaser.Sound.BaseSound;
  audioReelStop: Phaser.Sound.BaseSound;
  audioReels: Phaser.Sound.BaseSound;
  audioWin: Phaser.Sound.BaseSound;
  musicBackgroundDefault: Phaser.Sound.BaseSound;
  musicDefault: Phaser.Sound.BaseSound;

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
