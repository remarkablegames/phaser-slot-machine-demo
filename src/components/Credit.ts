import config from '../config';
import type { Game } from '../scenes';
import { Sprite } from '.';

export class Credit {
  private btnExit!: Sprite;
  private credits;
  private paylines!: Sprite;
  private scene;

  constructor(scene: Game) {
    this.scene = scene;

    this.credits = new Sprite(
      this.scene,
      config.width - 235,
      config.height - 680,
      'about',
      'btn-credits.png',
    ).setScale(0.7);

    this.credits.on('pointerdown', () => {
      this.scene.audioPlayButton();

      this.paylines = new Sprite(
        this.scene,
        config.width / 2,
        config.height / 2,
        'about',
        'palines.png',
      ).setDepth(1);

      this.btnExit = new Sprite(
        this.scene,
        config.width - 30,
        config.height - 635,
        'bgButtons',
        'btn_exit.png',
      )
        .setScale(0.9)
        .setDepth(1);

      this.btnExit.on('pointerdown', this.deleteCredit);
    });
  }

  deleteCredit = () => {
    this.scene.audioPlayButton();
    this.btnExit.destroy();
    this.paylines.destroy();
  };
}
