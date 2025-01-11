import Phaser from 'phaser';
import { DynamicBitmapText, Sprite, Text, useScene } from 'phaser-jsx';

import config from '../config';
import options from '../options';
import type { Game } from '../scenes';

interface Props {
  maxBetRef: (gameObject: Phaser.GameObjects.Sprite) => void;
  maxBetTextRef: (gameObject: Phaser.GameObjects.Text) => void;
}

export function Maxbet(props: Props) {
  const scene = useScene<Game>();
  let maxBet!: Phaser.GameObjects.Sprite;
  let maxBetText!: Phaser.GameObjects.Text;

  function onMaxbet() {
    if (
      !options.checkClick &&
      options.line * options.coin < 1000 &&
      options.txtAutoSpin === 'AUTO'
    ) {
      maxBet.setScale(0.9);
      scene.audioPlayButton();
      options.line = 20;
      scene.lineText.setText(String(options.line));
      options.coin = 50;
      scene.coinText.setText(String(options.coin));
      maxBetText.setText(`BET: ${options.line * options.coin}`);
    }
  }

  return (
    <>
      <Sprite
        x={config.width - 477}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-maxbet.png"
        ref={(gameObject) => {
          maxBet = gameObject;
          props.maxBetRef(gameObject);
        }}
        onPointerDown={onMaxbet}
        onPointerUp={() => maxBet.setScale(1)}
      />

      <DynamicBitmapText
        x={config.width - 550}
        y={config.height - 70}
        font="txt_bitmap"
        text={options.txtMaxBet}
        fontSize={38}
        ref={(gameObject) => gameObject.setDisplayCallback(scene.textCallback)}
      />

      <Text
        x={config.width - 555}
        y={config.height - 140}
        text={`BET: ${options.coin * options.line}`}
        style={{
          color: '#fff',
          font: '35px "PT Serif"',
        }}
        ref={(gameObject) => {
          maxBetText = gameObject;
          props.maxBetTextRef(gameObject);
        }}
      />
    </>
  );
}
