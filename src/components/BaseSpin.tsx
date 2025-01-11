import Phaser from 'phaser';
import { DynamicBitmapText, Sprite, useScene } from 'phaser-jsx';

import { Tween } from '../components';
import config from '../config';
import {
  destroyLineArr,
  removeTextWin,
  saveLocalStorage,
  setColor,
} from '../helpers';
import options from '../options';
import type { Game } from '../scenes';

interface Props {
  baseSpinRef: (gameObject: Phaser.GameObjects.Sprite) => void;
}

export function BaseSpin(props: Props) {
  const scene = useScene<Game>();
  let baseSpin!: Phaser.GameObjects.Sprite;

  function playTweens() {
    if (
      !options.checkClick &&
      scene.valueMoney >= options.coin * options.line &&
      options.txtAutoSpin === 'AUTO'
    ) {
      destroyLineArr();
      setColor(scene);
      options.checkClick = true;
      baseSpin.setScale(0.9);
      removeTextWin(scene);
      saveLocalStorage(scene);
      scene.baseSpinTweens = new Tween(scene);
    }
  }

  return (
    <>
      <Sprite
        x={config.width - 275}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-spin.png"
        onPointerDown={playTweens}
        onPointerUp={() => baseSpin.setScale(1)}
        ref={(gameObject) => {
          baseSpin = gameObject;
          props.baseSpinRef(gameObject);
        }}
      />

      <DynamicBitmapText
        x={config.width - 315}
        y={config.height - 70}
        font="txt_bitmap"
        text={options.txtSpin}
        fontSize={38}
        ref={(gameObject) => gameObject.setDisplayCallback(scene.textCallback)}
      />
    </>
  );
}
