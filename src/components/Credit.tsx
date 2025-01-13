import Phaser from 'phaser';
import { Container, Sprite, useRef, useScene } from 'phaser-jsx';

import config from '../config';
import type { Game } from '../scenes';

export function Credit() {
  const scene = useScene<Game>();
  const closeRef = useRef<Phaser.GameObjects.Sprite>();
  const containerRef = useRef<Phaser.GameObjects.Container>();

  function toggleModal() {
    scene.audioPlayButton();
    containerRef.current?.setToTop().setVisible(!containerRef.current?.visible);
  }

  return (
    <>
      <Sprite
        frame="btn-credits.png"
        onPointerDown={toggleModal}
        scale={0.7}
        texture="about"
        x={config.width - 235}
        y={config.height - 680}
      />

      <Container visible={false} ref={containerRef}>
        <Sprite
          frame="paylines.png"
          texture="about"
          x={config.width / 2}
          y={config.height / 2}
        />

        <Sprite
          frame="btn_exit.png"
          onPointerDown={toggleModal}
          ref={closeRef}
          scale={0.9}
          texture="bgButtons"
          x={config.width - 30}
          y={config.height - 635}
        />
      </Container>
    </>
  );
}
