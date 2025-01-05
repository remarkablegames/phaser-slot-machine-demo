import type Phaser from 'phaser';
import { render, Text } from 'phaser-jsx';

import config from '../config';

export class Time {
  private time!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    render(
      <Text
        x={config.width - 1260}
        y={config.height - 700}
        style={{
          fontSize: '20px',
          color: '#fff',
          fontFamily: 'PT Serif',
        }}
        ref={(gameObject) => (this.time = gameObject)}
      />,
      scene,
    );

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
