import Phaser from 'phaser';
import { render, Sprite, Text } from 'phaser-jsx';

import {
  Audio,
  AutoSpin,
  BaseSpin,
  Coin,
  Container,
  Credit,
  Info,
  Line,
  Maxbet,
  Time,
} from '../components';
import config from '../config';
import options from '../options';

const CONTAINERS_COUNT = 5;

export class Game extends Phaser.Scene {
  audioMusicName = '';
  audioObject!: Audio;
  audioSoundName = '';
  autoSpin!: AutoSpin;
  baseSpin!: BaseSpin;
  btnMusic!: Phaser.GameObjects.Sprite;
  btnSound!: Phaser.GameObjects.Sprite;
  coin!: Phaser.GameObjects.Sprite;
  coinText!: Phaser.GameObjects.Text;
  container1!: Phaser.GameObjects.Container;
  container2!: Phaser.GameObjects.Container;
  container3!: Phaser.GameObjects.Container;
  container4!: Phaser.GameObjects.Container;
  container5!: Phaser.GameObjects.Container;
  line!: Phaser.GameObjects.Sprite;
  lineText!: Phaser.GameObjects.Text;
  maxBet!: Phaser.GameObjects.Sprite;
  maxBetText!: Phaser.GameObjects.Text;
  txtMoney!: Phaser.GameObjects.Text;
  txtWin!: Phaser.GameObjects.Text;
  valueMoney = Number(localStorage.getItem('money') ?? options.money);

  constructor() {
    super({ key: 'Game' });
  }

  create() {
    this.audioObject = new Audio(this);
    const musicName = localStorage.getItem('music') ?? 'btn_music_off.png';
    const soundName = localStorage.getItem('sound') ?? 'btn_sound_off.png';

    render(
      <>
        <Sprite
          x={config.width / 2}
          y={config.height / 2}
          texture="background"
          frame="bg.jpg"
        />

        {Array(CONTAINERS_COUNT)
          .fill(null)
          .map((_, index) => (
            <Container
              x={config.width - 940 + index * 150}
              y={config.height - 90}
              ref={(gameObject) =>
                // @ts-expect-error element implicitly has 'any' type
                (this[`container${index + 1}`] = gameObject)
              }
            />
          ))}

        <Sprite
          x={config.width / 2}
          y={config.height / 2}
          texture="background"
          frame="machine.png"
        />

        <Text
          x={config.width - 1050}
          y={config.height - 695}
          text={this.valueMoney.toLocaleString()}
          style={{
            color: '#fff',
            font: '30px "PT Serif"',
          }}
          ref={(gameObject) => {
            this.txtMoney = gameObject;
            this.setTextX(this.valueMoney);
          }}
        />

        <Time />
        <Credit />

        <Sprite
          x={config.width - 310}
          y={config.height - 675}
          texture="sound"
          frame={musicName}
          scale={0.6}
          ref={(gameObject) => {
            this.btnMusic = gameObject;
            this.audioMusicName = gameObject.frame.name;
            if (this.audioMusicName === 'btn_music.png') {
              this.audioObject.musicDefault.play();
            }
          }}
          onPointerDown={this.onMusic}
        />

        <Sprite
          x={config.width - 390}
          y={config.height - 675}
          texture="sound"
          frame={soundName}
          scale={0.6}
          ref={(gameObject) => {
            this.btnSound = gameObject;
            this.audioSoundName = gameObject.frame.name;
          }}
          onPointerDown={this.onSound}
        />

        <Info />

        <Coin
          coinRef={(gameObject) => (this.coin = gameObject)}
          coinTextRef={(gameObject) => (this.coinText = gameObject)}
        />

        <Line
          lineRef={(gameObject) => (this.line = gameObject)}
          lineTextRef={(gameObject) => (this.lineText = gameObject)}
        />

        <Maxbet
          maxBetRef={(gameObject) => (this.maxBet = gameObject)}
          maxBetTextRef={(gameObject) => (this.maxBetText = gameObject)}
        />
      </>,
      this,
    );

    this.baseSpin = new BaseSpin(this);
    this.autoSpin = new AutoSpin(this);
  }

  private onMusic() {
    if (!options.checkClick) {
      if (this.audioMusicName === 'btn_music.png') {
        this.audioMusicName = 'btn_music_off.png';
        this.audioObject.musicDefault.stop();
        this.audioObject.audioWin.stop();
      } else {
        this.audioMusicName = 'btn_music.png';
        this.audioPlayButton();
        this.audioObject.musicDefault.play();
      }

      if (localStorage.getItem('musics')) {
        localStorage.removeItem('musics');
        localStorage.setItem('music', this.audioMusicName);
      } else {
        localStorage.setItem('music', this.audioMusicName);
      }

      this.btnMusic.setTexture('sound', this.audioMusicName);
    }
  }

  private onSound() {
    if (!options.checkClick) {
      if (this.audioSoundName === 'btn_sound.png') {
        this.audioSoundName = 'btn_sound_off.png';
      } else {
        this.audioSoundName = 'btn_sound.png';
        this.audioObject.audioButton.play();
      }

      if (localStorage.getItem('sounds')) {
        localStorage.removeItem('sounds');
        localStorage.setItem('sound', this.audioSoundName);
      } else {
        localStorage.setItem('sound', this.audioSoundName);
      }

      this.btnSound.setTexture('sound', this.audioSoundName);
    }
  }

  audioPlayButton() {
    if (this.audioSoundName === 'btn_sound.png') {
      this.audioObject.audioButton.play();
    }
  }

  setTextX(value: number) {
    switch (true) {
      case value >= 100000000:
        this.txtMoney.x = 217;
        break;

      case value >= 10000000:
        this.txtMoney.x = 220;
        break;

      case value >= 1000000:
        this.txtMoney.x = 230;
        break;

      case value >= 100000:
        this.txtMoney.x = 240;
        break;

      case value >= 10000:
        this.txtMoney.x = 240;
        break;

      case value >= 1000:
        this.txtMoney.x = 250;
        break;

      case value >= 100:
        this.txtMoney.x = 260;
        break;

      case value >= 10:
        this.txtMoney.x = 270;
        break;

      default:
        this.txtMoney.x = 280;
        break;
    }
  }

  textCallback(
    display: Phaser.Types.GameObjects.BitmapText.DisplayCallbackConfig,
  ) {
    display.tint.topLeft = options.hsv[Math.floor(options.i)].color;
    display.tint.topRight = options.hsv[359 - Math.floor(options.i)].color;
    display.tint.bottomLeft = options.hsv[359 - Math.floor(options.i)].color;
    display.tint.bottomRight = options.hsv[Math.floor(options.i)].color;

    options.i += 0.05;

    if (options.i >= options.hsv.length) {
      options.i = 0;
    }

    return display;
  }
}
