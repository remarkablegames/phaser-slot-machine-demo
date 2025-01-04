import config from '../config';
import options from '../options';
import type { Game } from '../scenes';
import { Sprite, Tween } from '.';

export class BaseSpin {
  private bgSpin;
  private buttonAuto!: Sprite;
  private scene;
  private tweens!: Tween;
  private txtSpin;

  constructor(scene: Game) {
    this.scene = scene;

    this.bgSpin = new Sprite(
      this.scene,
      config.width - 275,
      config.height - 50,
      'bgButtons',
      'btn-spin.png',
    );

    this.txtSpin = this.scene.add.dynamicBitmapText(
      config.width - 315,
      config.height - 70,
      'txt_bitmap',
      options.txtSpin,
      38,
    );
    this.txtSpin.setDisplayCallback(this.scene.textCallback);
    this.bgSpin.on('pointerdown', this.playTweens, this);
    this.bgSpin.on('pointerup', () => this.bgSpin.setScale(1));
  }

  playTweens() {
    if (
      !options.checkClick &&
      this.scene.valueMoney >= options.coin * options.line &&
      options.txtAutoSpin === 'AUTO'
    ) {
      this.destroyLineArr();
      this.setColor();
      options.checkClick = true;
      this.bgSpin.setScale(0.9);
      this.removeTextWin();
      this.saveLocalStorage();
      this.tweens = new Tween(this.scene);
    }
  }

  destroyLineArr() {
    if (options.lineArray.length > 0) {
      for (let i = 0; i < options.lineArray.length; i++) {
        options.lineArray[i].destroy();
      }
      options.lineArray = [];
    }
  }

  removeTextWin() {
    this.scene.audioPlayButton();

    if (this.scene.audioMusicName === 'btn_music.png') {
      this.scene.audioObject.audioWin.stop();
      this.scene.audioObject.audioReels.play();
    }

    // set money
    this.scene.valueMoney -= options.coin * options.line;
    this.scene.txtMoney.setText(this.scene.valueMoney + '$');

    if (this.scene.txtWin) {
      this.scene.txtWin.destroy();
    }
  }

  setColor() {
    this.bgSpin.setTint(0xa09d9d);
    this.scene.autoSpin.buttonAuto.setTint(0xa09d9d);
    this.scene.maxBet.maxBet.setTint(0xa09d9d);
    // @ts-expect-error TODO
    this.scene.coin.coin.setTint(0xa09d9d);
    // @ts-expect-error TODO
    this.scene.btnLine.btnLine.setTint(0xa09d9d);
    this.scene.btnMusic.setTint(0xa09d9d);
    this.scene.btnSound.setTint(0xa09d9d);
  }

  saveLocalStorage() {
    if (localStorage.getItem('money')) {
      localStorage.removeItem('money');
      localStorage.setItem('money', String(this.scene.valueMoney));
    }

    localStorage.setItem('money', String(this.scene.valueMoney));
    this.scene.setTextX(this.scene.valueMoney);
    this.scene.txtMoney.setText(this.scene.valueMoney.toLocaleString());
  }
}
