import Phaser from 'phaser';
import { createRef, Sprite, useScene } from 'phaser-jsx';

import config from '../config';
import type { Game } from '../scenes';

export function Credit() {
  const scene = useScene<Game>();
  const exitRef = createRef<Phaser.GameObjects.Sprite>();
  const paylinesRef = createRef<Phaser.GameObjects.Sprite>();

  function toggleVisible() {
    const visible = !paylinesRef.current?.visible;
    scene.audioPlayButton();
    paylinesRef.current?.setToTop().setVisible(visible);
    exitRef.current?.setToTop().setVisible(visible);
  }

  return (
    <>
      <Sprite
        frame="btn-credits.png"
        onPointerDown={toggleVisible}
        scale={0.7}
        texture="about"
        x={config.width - 235}
        y={config.height - 680}
      />

      <Sprite
        frame="paylines.png"
        ref={paylinesRef}
        texture="about"
        visible={false}
        x={config.width / 2}
        y={config.height / 2}
      />

      <Sprite
        frame="btn_exit.png"
        onPointerDown={toggleVisible}
        ref={exitRef}
        scale={0.9}
        texture="bgButtons"
        visible={false}
        x={config.width - 30}
        y={config.height - 635}
      />
    </>
  );
}
