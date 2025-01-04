import type Phaser from 'phaser';

import config from '../config';

export class Time {
  private time: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.time = scene.add.text(config.width - 1260, config.height - 700, '', {
      fontSize: '20px',
      color: '#fff',
      fontFamily: 'PT Serif',
    });

    this.callbackTime();

    scene.time.addEvent({
      delay: 1000,
      callback: this.callbackTime,
      loop: true,
    });
  }

  private callbackTime = () => {
    this.time.setText(getTime());
  };
}

function getTime() {
  const date = new Date();
  return [
    formatTime(date.getHours()),
    formatTime(date.getMinutes()),
    formatTime(date.getSeconds()),
  ].join(':');
}

function formatTime(time: number) {
  return time.toString().padStart(2, '0');
}
