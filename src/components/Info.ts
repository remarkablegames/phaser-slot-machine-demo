import config from '../config';
import options from '../options';
import type { Game } from '../scenes';
import { Sprite } from '.';

export class Info {
  private btnExit!: Sprite;
  private click = false;
  private info;
  private payValues!: Phaser.GameObjects.Text[];
  private paytable!: Sprite;
  private scene;

  constructor(scene: Game) {
    this.scene = scene;

    this.info = new Sprite(
      this.scene,
      config.width - 1020,
      config.height - 50,
      'bgButtons',
      'btn-info.png',
    );

    const txtInfo = this.scene.add.dynamicBitmapText(
      config.width - 1060,
      config.height - 70,
      'txt_bitmap',
      options.txtInfo,
      38,
    );

    txtInfo.setDisplayCallback(this.scene.textCallback);

    this.info.on('pointerdown', this.showPayTable);
  }

  private showPayTable = () => {
    if (!this.click) {
      this.click = true;
      this.scene.audioPlayButton();
      this.showTable();

      this.btnExit = new Sprite(
        this.scene,
        config.width - 30,
        config.height - 635,
        'bgButtons',
        'btn_exit.png',
      )
        .setScale(0.9)
        .setDepth(1);

      this.btnExit.on('pointerdown', this.deleteTable);
    }
  };

  private showTable() {
    this.payValues = [];

    this.paytable = new Sprite(
      this.scene,
      config.width / 2,
      config.height / 2,
      'about',
      'paytable.png',
    ).setDepth(1);

    let width = 190;
    let width2 = width;
    let height = 25;
    let height2 = 245;

    for (let i = 0; i < options.payvalues.length; i++) {
      if (i >= 5) {
        for (let j = 0; j < options.payvalues[i].length; j++) {
          height2 -= 30;

          this.payValues.push(
            this.scene.add
              .text(
                width2,
                config.height / 2 + height2,
                String(options.payvalues[i][j]),
                {
                  fontSize: '30px',
                  color: '#630066',
                  fontFamily: 'PT Serif',
                },
              )
              .setDepth(1),
          );
        }

        width2 += 225;
        height2 = 245;
      } else {
        for (let j = 0; j < options.payvalues[i].length; j++) {
          height += 30;

          this.payValues.push(
            this.scene.add
              .text(
                width,
                config.height / 2 - height,
                String(options.payvalues[i][j]),
                {
                  fontSize: '30px',
                  color: '#630066',
                  fontFamily: 'PT Serif',
                },
              )
              .setDepth(1),
          );
        }

        width += 225;
        height = 25;
      }
    }
  }

  private deleteTable = () => {
    this.click = false;
    this.scene.audioPlayButton();
    this.paytable.destroy();
    this.btnExit.destroy();

    if (this.payValues.length > 0) {
      for (let i = 0; i < this.payValues.length; i++) {
        this.payValues[i].destroy();
      }
    }
  };
}
