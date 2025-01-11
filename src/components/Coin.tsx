import Phaser from 'phaser';
import { DynamicBitmapText, Sprite, Text, useScene } from 'phaser-jsx';

import config from '../config';
import options from '../options';
import type { Game } from '../scenes';

interface Props {
  coinRef: (gameObject: Phaser.GameObjects.Sprite) => void;
  coinTextRef: (gameObject: Phaser.GameObjects.Text) => void;
}

export function Coin(props: Props) {
  const scene = useScene<Game>();
  let coin!: Phaser.GameObjects.Sprite;
  let coinText!: Phaser.GameObjects.Text;

  function onCoin() {
    if (!options.checkClick && options.txtAutoSpin === 'AUTO') {
      coin.setScale(0.9);
      scene.audioPlayButton();

      if (options.coin < 50) {
        options.coin += 10;
        coinText.setText(String(options.coin));
        scene.maxBetText.setText(`BET: ${options.coin * options.line}`);
      } else {
        options.coin = 10;
        coinText.setText(String(options.coin));
        scene.maxBetText.setText(`BET: ${options.coin * options.line}`);
      }
    }
  }

  return (
    <>
      <Sprite
        x={config.width - 678}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-coin.png"
        onPointerDown={onCoin}
        onPointerUp={() => coin.setScale(1)}
        ref={(gameObject) => {
          coin = gameObject;
          props.coinRef(gameObject);
        }}
      />

      <DynamicBitmapText
        x={config.width - 720}
        y={config.height - 70}
        font="txt_bitmap"
        text={options.txtCoin}
        fontSize={38}
        ref={(gameObject) => gameObject.setDisplayCallback(scene.textCallback)}
      />

      <Text
        x={config.width - 700}
        y={config.height - 140}
        text={String(options.coin)}
        style={{
          color: '#fff',
          font: '35px "PT Serif"',
        }}
        ref={(gameObject) => {
          coinText = gameObject;
          props.coinTextRef(gameObject);
        }}
      />
    </>
  );
}
