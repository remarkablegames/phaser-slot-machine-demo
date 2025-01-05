import config from '../config';
import options from '../options';
import type { Game } from '../scenes';
import { Sprite } from '.';

export class Spin {
  private scene;

  constructor(scene: Game) {
    this.scene = scene;
    this.printResult();
    this.clearColor();
  }

  clearColor() {
    this.scene.baseSpin.bgSpin.clearTint();
    this.scene.autoSpin.buttonAuto.clearTint();
    this.scene.maxBet.maxBet.clearTint();
    this.scene.coin.coin.clearTint();
    this.scene.btnLine.btnLine.clearTint();
    this.scene.btnMusic.clearTint();
    this.scene.btnSound.clearTint();
  }

  printResult() {
    interface Target {
      list: {
        frame: {
          name: string;
        };
      }[];
    }

    let s1: Target;
    let s2: Target;
    let s3: Target;
    let s4: Target;
    let s5: Target;
    const autoSpin = this.scene.autoSpin.tweens;
    const baseSpin = this.scene.baseSpin.tweens;

    if (autoSpin) {
      s1 = autoSpin.columnTween1.targets[0] as Target;
      s2 = autoSpin.columnTween2.targets[0] as Target;
      s3 = autoSpin.columnTween3.targets[0] as Target;
      s4 = autoSpin.columnTween4.targets[0] as Target;
      s5 = autoSpin.columnTween5.targets[0] as Target;
    } else {
      s1 = baseSpin.columnTween1.targets[0] as Target;
      s2 = baseSpin.columnTween2.targets[0] as Target;
      s3 = baseSpin.columnTween3.targets[0] as Target;
      s4 = baseSpin.columnTween4.targets[0] as Target;
      s5 = baseSpin.columnTween5.targets[0] as Target;
    }

    options.result.push(
      [s1.list[3].frame.name, s1.list[2].frame.name, s1.list[1].frame.name],
      [s2.list[3].frame.name, s2.list[2].frame.name, s2.list[1].frame.name],
      [s3.list[3].frame.name, s3.list[2].frame.name, s3.list[1].frame.name],
      [s4.list[3].frame.name, s4.list[2].frame.name, s4.list[1].frame.name],
      [s5.list[3].frame.name, s5.list[2].frame.name, s5.list[1].frame.name],
    );

    this.getWinningLines();
  }

  getWinningLines() {
    for (let lineIndex = 0; lineIndex < options.line; lineIndex++) {
      let streak = 0;
      let currentkind = '';

      for (
        let coordIndex = 0;
        coordIndex < options.payLines[lineIndex].length;
        coordIndex++
      ) {
        const coords = options.payLines[lineIndex][coordIndex];
        const symbolAtCoords = options.result[coords[0]][coords[1]];

        if (coordIndex === 0) {
          currentkind = symbolAtCoords;
          streak = 1;
        } else {
          if (symbolAtCoords != currentkind) {
            break;
          }

          streak++;
        }
      }

      if (streak >= 3) {
        lineIndex++;
        options.winningLines.push(lineIndex);
        this.audioPlayWin();
        this.mathMoney(currentkind, streak);
      }

      this.audioPlayLose();
    }

    this.getLineArray(options.winningLines);
    this.resetOptions();
  }

  getLineArray(lineArr: number[]) {
    if (!lineArr.length) {
      return;
    }

    for (let i = 0; i < lineArr.length; i++) {
      options.lineArray.push(
        new Sprite(
          this.scene,
          config.width / 2,
          config.height / 2,
          'line',
          `payline_${lineArr[i]}.png`,
        ),
      );
    }
  }

  mathMoney(symbolName: string, streak: number) {
    const index = streak - 3;

    switch (streak) {
      case 3:
        this.symbolValue(symbolName, index);
        break;

      case 4:
        this.symbolValue(symbolName, index);
        break;

      default:
        this.symbolValue(symbolName, index);
        break;
    }
  }

  resetOptions() {
    options.win = 0;
    options.moneyWin = 0;
    options.result = [];
    options.winningLines = [];
  }

  symbolValue(symbolName: string, index: number) {
    switch (symbolName) {
      case 'symbols_0.png':
        this.getMoney(options.payvalues[0][index]);
        break;

      case 'symbols_1.png':
        this.getMoney(options.payvalues[1][index]);
        break;

      case 'symbols_2.png':
        this.getMoney(options.payvalues[2][index]);
        break;

      case 'symbols_3.png':
        this.getMoney(options.payvalues[3][index]);
        break;

      case 'symbols_4.png':
        this.getMoney(options.payvalues[4][index]);
        break;

      case 'symbols_5.png':
        this.getMoney(options.payvalues[5][index]);
        break;

      case 'symbols_6.png':
        this.getMoney(options.payvalues[6][index]);
        break;

      case 'symbols_7.png':
        this.getMoney(options.payvalues[7][index]);
        break;

      case 'symbols_8.png':
        this.getMoney(options.payvalues[8][index]);
        break;

      default:
        this.getMoney(options.payvalues[9][index]);
        break;
    }
  }

  audioPlayWin() {
    if (this.scene.audioMusicName === 'btn_music.png') {
      this.scene.audioObject.audioWin.play();
    }
  }

  audioPlayLose() {
    if (this.scene.audioMusicName === 'btn_music.png') {
      this.scene.audioObject.audioLose.play();
    }
  }

  getMoney(money: number) {
    const maxBet = options.line * options.coin;
    const payValue = money / options.line;
    options.win += payValue * maxBet;
    this.setTextureWin(options.win);
  }

  setTextureWin(value: number) {
    options.moneyWin = value;
    this.scene.valueMoney += options.moneyWin;
    const width = this.setTextWidthWin();

    if (!this.scene.txtWin) {
      this.scene.txtWin = this.scene.add.text(
        width,
        config.height - 130,
        `WIN: ${options.moneyWin.toLocaleString()}`,
        {
          fontSize: '20px',
          color: '#25a028',
          fontFamily: 'PT Serif',
        },
      );
    } else {
      this.scene.txtWin.destroy();

      this.scene.txtWin = this.scene.add.text(
        width,
        config.height - 130,
        `WIN: ${options.moneyWin.toLocaleString()}`,
        {
          fontSize: '20px',
          color: '#25a028',
          fontFamily: 'PT Serif',
        },
      );
    }

    this.scene.baseSpin.saveLocalStorage();
  }

  setTextWidthWin() {
    switch (true) {
      case options.moneyWin >= 100000:
        return config.width - 340;

      case options.moneyWin >= 10000:
        return config.width - 335;

      case options.moneyWin >= 1000:
        return config.width - 330;

      case options.moneyWin >= 100:
        return config.width - 322;

      default:
        return config.width - 340;
    }
  }
}
