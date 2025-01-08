import config from '../config';
import options from '../options';
import type { Game } from '../scenes';
import { Sprite } from '.';

export class Coin {
  coin;
  txtCountCoin;

  private scene;
  private txtCoin;

  constructor(scene: Game) {
    this.scene = scene;

    this.coin = new Sprite(
      this.scene,
      config.width - 678,
      config.height - 50,
      'bgButtons',
      'btn-coin.png',
    );
    this.txtCoin = this.scene.add.dynamicBitmapText(
      config.width - 720,
      config.height - 70,
      'txt_bitmap',
      options.txtCoin,
      38,
    );

    this.txtCoin.setDisplayCallback(this.scene.textCallback);

    this.txtCountCoin = this.scene.add.text(
      config.width - 700,
      config.height - 140,
      String(options.coin),
      {
        fontSize: '35px',
        color: '#fff',
        fontFamily: 'PT Serif',
      },
    );

    this.coin.on('pointerdown', this.onCoin);
    this.coin.on('pointerup', () => this.coin.setScale(1));
  }

  private onCoin = () => {
    if (!options.checkClick && options.txtAutoSpin === 'AUTO') {
      this.coin.setScale(0.9);
      this.scene.audioPlayButton();

      if (options.coin < 50) {
        options.coin += 10;
        this.txtCountCoin.setText(String(options.coin));
        this.scene.maxBet.txtCountMaxBet.setText(
          `BET: ${options.coin * options.line}`,
        );
      } else {
        options.coin = 10;
        this.txtCountCoin.setText(String(options.coin));
        this.scene.maxBet.txtCountMaxBet.setText(
          `BET: ${options.coin * options.line}`,
        );
      }
    }
  };
}
