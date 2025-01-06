import type Phaser from 'phaser';
import { Graphics, Text, useScene } from 'phaser-jsx';

import config from '../config';

export function Progress() {
  const scene = useScene();
  let loadingText!: Phaser.GameObjects.Text;
  let progressBar!: Phaser.GameObjects.Graphics;
  let progressBox!: Phaser.GameObjects.Graphics;

  scene.load.on('progress', (value: number) => {
    progressBar.clear();
    progressBar.fillStyle(0xff00ff, 1);

    progressBar.fillRect(
      config.width / 2 - 450,
      config.height / 2 - 80,
      880 * value,
      30,
    );

    loadingText.setText(`${Math.floor(value * 100)}%`);
  });

  scene.load.on('complete', () => {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
  });

  return (
    <>
      <Graphics ref={(gameObject) => (progressBar = gameObject)} />

      <Graphics
        ref={(gameObject) => {
          progressBox = gameObject;
          progressBox.fillStyle(0x222222, 0.8);
          progressBox.fillRect(
            config.width / 2 - 460,
            config.height / 2 - 90,
            900,
            50,
          );
        }}
      />

      <Text
        x={config.width / 2}
        y={config.height / 2 - 5}
        text="0%"
        originX={0.5}
        originY={0.5}
        style={{
          color: '#fff',
          font: '30px "PT Serif"',
        }}
        ref={(gameObject) => (loadingText = gameObject)}
      />
    </>
  );
}
