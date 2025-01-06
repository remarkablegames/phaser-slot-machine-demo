import Phaser from 'phaser';
import { render } from 'phaser-jsx';

import { Progress } from '../components';

export class Preload extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'Preload' });
  }

  preload() {
    render(<Progress />, this);

    this.load.atlas('logo', 'images/logo/logo.png', 'images/logo/logo.json');

    this.load.atlas(
      'about',
      'images/about/about.png',
      'images/about/about.json',
    );

    this.load.atlas('background', 'images/bg/bg.png', 'images/bg/bg.json');

    this.load.atlas(
      'bgPreload',
      'images/bg/bgmenu.png',
      'images/bg/bgmenu.json',
    );

    this.load.atlas(
      'bgButtons',
      'images/buttons/button.png',
      'images/buttons/button.json',
    );

    this.load.atlas(
      'symbols',
      'images/symbols/symbols.png',
      'images/symbols/symbols.json',
    );

    this.load.atlas(
      'symbols_blur',
      'images/symbols/symbols_blur.png',
      'images/symbols/symbols_blur.json',
    );

    this.load.atlas('line', 'images/lines/line.png', 'images/lines/line.json');

    this.load.atlas(
      'sound',
      'images/sound/sound.png',
      'images/sound/sound.json',
    );

    this.load.atlas(
      'autoSpin',
      'images/autoSpin/auto.png',
      'images/autoSpin/auto.json',
    );

    this.load.bitmapFont(
      'txt_bitmap',
      'fonts/bitmap/text_slot_machine.png',
      'fonts/bitmap/text_slot_machine.xml',
    );

    this.load.audio('backgroundDefault', 'audio/background-default.mp3');
    this.load.audio('reels', 'audio/reels.mp3');
    this.load.audio('reelStop', 'audio/reel_stop.mp3');
    this.load.audio('win', 'audio/win.mp3');
    this.load.audio('button', 'audio/button.mp3');
    this.load.audio('lose', 'audio/lose.mp3');
    this.load.audio('musicDefault', 'audio/music_default.mp3');
  }

  create() {
    this.scene.start('Boot');
  }
}
