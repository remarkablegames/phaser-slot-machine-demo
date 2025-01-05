import config from '../config';
import options from '../options';
import type { Game } from '../scenes';
import { Sprite } from '.';

export class Line {
  btnLine;
  txtCountLine;

  private scene;
  private txtLine;

  constructor(scene: Game) {
    this.scene = scene;

    this.btnLine = new Sprite(
      this.scene,
      config.width - 865,
      config.height - 50,
      'bgButtons',
      'btn-line.png',
    );

    this.txtLine = this.scene.add.dynamicBitmapText(
      config.width - 915,
      config.height - 70,
      'txt_bitmap',
      options.txtLine,
      38,
    );

    this.txtLine.setDisplayCallback(this.scene.textCallback);

    this.txtCountLine = this.scene.add.text(
      config.width - 880,
      config.height - 140,
      String(options.line),
      {
        fontSize: '35px',
        color: '#fff',
        fontFamily: 'PT Serif',
      },
    );

    this.btnLine.on('pointerdown', () => {
      if (!options.checkClick && options.txtAutoSpin === 'AUTO') {
        this.btnLine.setScale(0.9);
        this.scene.audioPlayButton();

        if (options.line < 20) {
          options.line++;
          this.txtCountLine.setText(String(options.line));
          this.scene.maxBet.txtCountMaxBet.setText(
            `BET: ${options.line * options.coin}`,
          );
        } else {
          options.line = 1;
          this.txtCountLine.setText(String(options.line));
          this.scene.maxBet.txtCountMaxBet.setText(
            `BET: ${options.line * options.coin}`,
          );
        }
      }
    });

    this.btnLine.on('pointerup', () => this.btnLine.setScale(1));
  }
}
