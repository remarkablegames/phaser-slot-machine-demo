import { Text, useScene } from 'phaser-jsx';

import config from '../config';

export function Time() {
  const scene = useScene();

  return (
    <Text
      x={config.width - 1260}
      y={config.height - 700}
      style={{
        color: '#fff',
        font: '20px "PT Serif"',
      }}
      ref={(gameObject) => {
        scene.time.addEvent({
          callback: () => gameObject.setText(getTime()),
          delay: 1000,
          loop: true,
          startAt: 999,
        });
      }}
    />
  );
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
