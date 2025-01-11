import Phaser from 'phaser';
import { DynamicBitmapText, Sprite, Text, useScene } from 'phaser-jsx';

import config from '../config';
import options from '../options';
import type { Game } from '../scenes';

interface Props {
  lineRef: (gameObject: Phaser.GameObjects.Sprite) => void;
  lineTextRef: (gameObject: Phaser.GameObjects.Text) => void;
}

export function Line(props: Props) {
  const scene = useScene<Game>();
  let line!: Phaser.GameObjects.Sprite;
  let lineText!: Phaser.GameObjects.Text;

  return (
    <>
      <Sprite
        x={config.width - 865}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-line.png"
        ref={(gameObject) => {
          line = gameObject;
          props.lineRef(line);
        }}
        onPointerDown={() => {
          if (!options.checkClick && options.txtAutoSpin === 'AUTO') {
            line.setScale(0.9);
            scene.audioPlayButton();

            if (options.line < 20) {
              options.line++;
              lineText.setText(String(options.line));
              scene.maxBetText.setText(`BET: ${options.line * options.coin}`);
            } else {
              options.line = 1;
              lineText.setText(String(options.line));
              scene.maxBetText.setText(`BET: ${options.line * options.coin}`);
            }
          }
        }}
        onPointerUp={() => line.setScale(1)}
      />

      <DynamicBitmapText
        x={config.width - 915}
        y={config.height - 70}
        font="txt_bitmap"
        text={options.txtLine}
        fontSize={38}
        ref={(gameObject) => gameObject.setDisplayCallback(scene.textCallback)}
      />

      <Text
        x={config.width - 880}
        y={config.height - 140}
        text={String(options.line)}
        style={{
          color: '#fff',
          font: '35px "PT Serif"',
        }}
        ref={(gameObject) => {
          lineText = gameObject;
          props.lineTextRef(lineText);
        }}
      />
    </>
  );
}
