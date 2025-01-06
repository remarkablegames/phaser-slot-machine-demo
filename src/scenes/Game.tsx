import Phaser from 'phaser';
import { render, Sprite as PhaserSprite, Text } from 'phaser-jsx';

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
  Sprite,
  Time,
} from '../components';
import config from '../config';
import options from '../options';

export class Game extends Phaser.Scene {
  audioMusicName = '';
  audioObject!: Audio;
  audioSoundName = '';
  autoSpin!: AutoSpin;
  baseSpin!: BaseSpin;
  btnLine!: Line;
  btnMusic!: Sprite;
  btnSound!: Sprite;
  coin!: Coin;
  container!: Phaser.GameObjects.Container;
  container2!: Phaser.GameObjects.Container;
  container3!: Phaser.GameObjects.Container;
  container4!: Phaser.GameObjects.Container;
  container5!: Phaser.GameObjects.Container;
  credits!: Credit;
  info!: Info;
  maxBet!: Maxbet;
  txtMoney!: Phaser.GameObjects.Text;
  txtWin!: Phaser.GameObjects.Text;
  valueMoney!: number;

  constructor() {
    super({ key: 'Game' });
  }

  create() {
    this.audioObject = new Audio(this);

    // bitmap text
    options.hsv = Phaser.Display.Color.HSVColorWheel();

    this.valueMoney = Number(
      localStorage.getItem('money')
        ? localStorage.getItem('money')
        : options.money,
    );

    render(
      <>
        <PhaserSprite
          x={config.width / 2}
          y={config.height / 2}
          texture="background"
          frame="bg.jpg"
        />

        <Container
          x={config.width - 940}
          y={config.height - 90}
          ref={(gameObject) => (this.container = gameObject)}
        />

        <Container
          x={config.width - 790}
          y={config.height - 90}
          ref={(gameObject) => (this.container2 = gameObject)}
        />

        <Container
          x={config.width - 640}
          y={config.height - 90}
          ref={(gameObject) => (this.container3 = gameObject)}
        />

        <Container
          x={config.width - 490}
          y={config.height - 90}
          ref={(gameObject) => (this.container4 = gameObject)}
        />

        <Container
          x={config.width - 340}
          y={config.height - 90}
          ref={(gameObject) => (this.container5 = gameObject)}
        />

        <PhaserSprite
          x={config.width / 2}
          y={config.height / 2}
          texture="background"
          frame="machine.jpg"
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
      </>,
      this,
    );

    this.credits = new Credit(this);

    const musicName = localStorage.getItem('music') ?? 'btn_music_off.png';
    const soundName = localStorage.getItem('sound') ?? 'btn_sound_off.png';

    this.btnMusic = new Sprite(
      this,
      config.width - 310,
      config.height - 675,
      'sound',
      musicName,
    ).setScale(0.6);

    this.btnSound = new Sprite(
      this,
      config.width - 390,
      config.height - 675,
      'sound',
      soundName,
    ).setScale(0.6);

    this.audioMusicName = this.btnMusic.frame.name;
    this.audioSoundName = this.btnSound.frame.name;
    this.btnMusic.on('pointerdown', this.onMusic, this);
    this.btnSound.on('pointerdown', this.onSound, this);

    if (this.audioMusicName === 'btn_music.png') {
      this.audioObject.musicDefault.play();
    }

    this.coin = new Coin(this);
    this.btnLine = new Line(this);
    this.maxBet = new Maxbet(this);
    this.info = new Info(this);
    this.autoSpin = new AutoSpin(this);
    this.baseSpin = new BaseSpin(this);
  }

  onMusic() {
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

  onSound() {
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
