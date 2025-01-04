import Phaser from 'phaser';

import { Audio, Sprite } from '../components';
import config from '../config';

export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  create() {
    const scaleObject = {
      default: 1.2,
      scale: 1.1,
      scale2: 1,
      scale3: 0.9,
    };

    const audio = new Audio(this);
    audio.musicBackgroundDefault.play();

    new Sprite(
      this,
      config.width / 2,
      config.height / 2,
      'bgPreload',
      'bg_menu.png',
    );

    const title = new Sprite(
      this,
      config.width / 2,
      config.height - 500,
      'logo',
      'logo_game.png',
    ).setScale(scaleObject.default);

    const timer = this.time.addEvent({
      delay: 150,
      callback: () => {
        if (title.scale === scaleObject.default)
          title.setScale(scaleObject.scale);
        else if (title.scale === scaleObject.scale)
          title.setScale(scaleObject.scale2);
        else if (title.scale === scaleObject.scale2)
          title.setScale(scaleObject.scale3);
        else title.setScale(scaleObject.default);
      },
      callbackScope: this,
      loop: true,
    });

    const button = new Sprite(
      this,
      config.width / 2,
      config.height - 150,
      'bgButtons',
      'btn_play.png',
    ).setScale(0.9);

    button.on('pointerdown', () => {
      audio.musicBackgroundDefault.stop();
      timer.remove();
      audio.audioButton.play();
      this.scene.start('Game');
    });
  }
}
