import Phaser from 'phaser';
import { render } from 'phaser-jsx';

import { Audio, Title } from '../components';

export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  create() {
    const audio = new Audio(this);
    audio.musicBackgroundDefault.play();
    render(<Title audio={audio} />, this);
  }
}
