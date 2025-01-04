import type Phaser from 'phaser';

import config from '../config';
import options from '../options';
import type { Game } from '../scenes';
import { Sprite, Tween } from '.';

export class AutoSpin {
  buttonAuto: Sprite;

  private auto!: Sprite;
  private bgAuto!: Sprite;
  private btnExit!: Sprite;
  private btnMinus!: Sprite;
  private btnPlay!: Sprite;
  private btnPlus!: Sprite;
  private scene;
  private timer!: Phaser.Time.TimerEvent;
  private tweens!: Tween;
  private txtAuto!: Phaser.GameObjects.Text;
  private txtAutoSpin;
  private txtSpeed!: Phaser.GameObjects.DynamicBitmapText;

  constructor(scene: Game) {
    this.scene = scene;

    this.buttonAuto = new Sprite(
      this.scene,
      config.width - 110,
      config.height - 50,
      'bgButtons',
      'btn-info.png',
    );

    this.txtAutoSpin = this.scene.add.dynamicBitmapText(
      config.width - 155,
      config.height - 70,
      'txt_bitmap',
      options.txtAutoSpin,
      38,
    );

    this.txtAutoSpin.setDisplayCallback(this.scene.textCallback);

    this.buttonAuto.on('pointerdown', () => {
      if (!options.checkClick) {
        this.buttonAuto.setScale(0.9);
        this.playSpeedAuto();
      }
    });

    this.buttonAuto.on('pointerup', () => this.buttonAuto.setScale(1));
  }

  private playSpeedAuto() {
    if (options.txtAutoSpin === 'STOP') {
      options.txtAutoSpin = 'AUTO';
      this.txtAutoSpin.setText(options.txtAutoSpin);

      if (this.txtSpeed && this.timer) {
        this.txtSpeed.destroy();
        this.timer.remove();
      }
    } else {
      options.txtAutoSpin = 'STOP';
      this.txtAutoSpin.setText(options.txtAutoSpin);
      this.scene.audioPlayButton();

      this.bgAuto = new Sprite(
        this.scene,
        config.width / 2,
        config.height / 2,
        'autoSpin',
        'bg_auto.png',
      );

      this.auto = new Sprite(
        this.scene,
        config.width / 2,
        config.height / 2 - 100,
        'bgButtons',
        'btn-spin.png',
      );

      this.txtAuto = this.scene.add.text(
        config.width / 2 - 5,
        config.height / 2 - 115,
        String(options.txtAuto),
        { fontSize: '35px', color: '#fff', fontFamily: 'PT Serif' },
      );

      this.setXAuto();
      this.plus();
      this.minus();
      this.play();
      this.exit();
    }
  }

  private plus() {
    this.btnPlus = new Sprite(
      this.scene,
      config.width / 2 - 100,
      config.height / 2 - 100,
      'autoSpin',
      'btn_plus_bet.png',
    );

    this.btnPlus.on('pointerdown', () => {
      this.scene.audioPlayButton();

      if (options.txtAuto < 100) {
        this.btnMinus.clearTint();
        this.btnPlus.setScale(0.9);
        options.txtAuto += 5;

        if (options.txtAuto < 100) {
          this.txtAuto.x = 620;
        } else {
          this.txtAuto.x = 610;
        }

        this.txtAuto.setText(String(options.txtAuto));
      }

      if (options.txtAuto === 100) {
        this.btnPlus.setTint(0xa09d9d);
      }
    });

    this.btnPlus.on('pointerup', () => this.btnPlus.setScale(1));
  }

  private minus() {
    this.btnMinus = new Sprite(
      this.scene,
      config.width / 2 + 100,
      config.height / 2 - 100,
      'autoSpin',
      'btn_minus_bet.png',
    );

    this.btnMinus.on('pointerdown', () => {
      this.scene.audioPlayButton();

      if (options.txtAuto > 5) {
        this.btnPlus.clearTint();
        this.btnMinus.setScale(0.9);
        options.txtAuto -= 5;
        this.setXAuto();
        this.txtAuto.setText(String(options.txtAuto));
      }

      if (options.txtAuto === 5) {
        this.btnMinus.setTint(0xa09d9d);
      }
    });

    this.btnMinus.on('pointerup', () => this.btnMinus.setScale(1));
  }

  private play() {
    this.btnPlay = new Sprite(
      this.scene,
      config.width / 2,
      config.height / 2 + 100,
      'bgButtons',
      'btn_play.png',
    ).setScale(0.9);

    this.btnPlay.on('pointerdown', () => {
      this.scene.audioPlayButton();
      this.removeImgAuto();

      if (this.scene.valueMoney >= options.coin * options.line) {
        this.speedPlay(options.txtAuto);
      } else {
        this.setTextAuto();
      }
    });
  }

  private exit() {
    this.btnExit = new Sprite(
      this.scene,
      config.width - 30,
      config.height - 635,
      'bgButtons',
      'btn_exit.png',
    ).setScale(0.9);

    this.btnExit.on('pointerdown', () => {
      this.scene.audioPlayButton();
      this.removeImgAuto();
      this.setTextAuto();
    });
  }

  /**
   * Set text speed.
   */
  private speedPlay(speed: number) {
    const width = speed > 5 ? config.width - 150 : config.width - 130;

    this.txtSpeed = this.scene.add.dynamicBitmapText(
      width,
      config.height / 2 - 350,
      'txt_bitmap',
      String(speed),
      80,
    );

    this.txtSpeed.setDisplayCallback(this.scene.textCallback);

    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        // @ts-expect-error Cannot assign to 'delay' because it is a read-only property.
        this.timer.delay = 4500;

        if (speed > 0 && this.scene.valueMoney >= options.coin * options.line) {
          this.scene.baseSpin.setColor();
          options.checkClick = true;
          this.scene.baseSpin.destroyLineArr();
          this.scene.baseSpin.removeTextWin();
          this.scene.baseSpin.saveLocalStorage();
          this.tweens = new Tween(this.scene);
          speed--;
          this.txtSpeed.setText(String(speed));
        } else {
          options.checkClick = false;
          this.timer.remove(false);
          this.txtSpeed.destroy();
          this.setTextAuto();
        }
      },
      loop: true,
    });
  }

  private setTextAuto() {
    options.txtAutoSpin = 'AUTO';
    this.txtAutoSpin.setText(options.txtAutoSpin);
  }

  private setXAuto() {
    switch (true) {
      case options.txtAuto >= 100:
        this.txtAuto.x = 610;
        break;

      case options.txtAuto >= 10:
        this.txtAuto.x = 620;
        break;

      default:
        this.txtAuto.x = 635;
        break;
    }
  }

  private removeImgAuto() {
    this.bgAuto.destroy();
    this.btnPlus.destroy();
    this.btnMinus.destroy();
    this.auto.destroy();
    this.txtAuto.destroy();
    this.btnPlay.destroy();
    this.btnExit.destroy();
  }
}
