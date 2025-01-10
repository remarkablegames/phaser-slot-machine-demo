import config from '../config';
import options from '../options';
import type { Game } from '../scenes';
import { Sprite } from '.';

export class Maxbet {
  maxBet;
  txtCountMaxBet;

  private scene;
  private txtMaxBet;

  constructor(scene: Game) {
    this.scene = scene;

    this.maxBet = new Sprite(
      this.scene,
      config.width - 477,
      config.height - 50,
      'bgButtons',
      'btn-maxbet.png',
    );

    this.txtMaxBet = this.scene.add.dynamicBitmapText(
      config.width - 550,
      config.height - 70,
      'txt_bitmap',
      options.txtMaxBet,
      38,
    );

    this.txtMaxBet.setDisplayCallback(this.scene.textCallback);

    this.txtCountMaxBet = this.scene.add.text(
      config.width - 555,
      config.height - 140,
      `BET: ${options.coin * options.line}`,
      {
        fontSize: '35px',
        color: '#fff',
        fontFamily: 'PT Serif',
      },
    );

    this.maxBet.on('pointerdown', this.onMaxbet);
    this.maxBet.on('pointerup', () => this.maxBet.setScale(1));
  }

  onMaxbet = () => {
    if (
      !options.checkClick &&
      options.line * options.coin < 1000 &&
      options.txtAutoSpin === 'AUTO'
    ) {
      this.maxBet.setScale(0.9);
      this.scene.audioPlayButton();
      options.line = 20;
      this.scene.lineText.setText(String(options.line));
      options.coin = 50;
      this.scene.coinText.setText(String(options.coin));
      this.txtCountMaxBet.setText(`BET: ${options.line * options.coin}`);
    }
  };
}
