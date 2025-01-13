import Phaser from 'phaser';
import {
  Container,
  DynamicBitmapText,
  Sprite,
  Text,
  useRef,
  useScene,
} from 'phaser-jsx';

import config from '../config';
import options from '../options';
import type { Game } from '../scenes';

export function Info() {
  const scene = useScene<Game>();
  const closeRef = useRef<Phaser.GameObjects.Sprite>();
  const containerRef = useRef<Phaser.GameObjects.Container>();

  function toggleModal() {
    scene.audioPlayButton();
    containerRef.current?.setToTop().setVisible(!containerRef.current?.visible);
  }

  function renderTable() {
    const payValues: Phaser.GameObjects.Text[] = [];
    let width = 190;
    let width2 = width;
    let height = 25;
    let height2 = 245;

    for (let i = 0; i < options.payvalues.length; i++) {
      if (i >= 5) {
        for (let j = 0; j < options.payvalues[i].length; j++) {
          height2 -= 30;

          payValues.push(
            <Text
              x={width2}
              y={config.height / 2 + height2}
              text={String(options.payvalues[i][j])}
              style={{
                color: '#630066',
                font: '30px "PT Serif"',
              }}
            />,
          );
        }

        width2 += 225;
        height2 = 245;
      } else {
        for (let j = 0; j < options.payvalues[i].length; j++) {
          height += 30;

          payValues.push(
            <Text
              x={width}
              y={config.height / 2 - height}
              text={String(options.payvalues[i][j])}
              style={{
                color: '#630066',
                font: '30px "PT Serif"',
              }}
            />,
          );
        }

        width += 225;
        height = 25;
      }
    }

    return payValues;
  }

  return (
    <>
      <Sprite
        x={config.width - 1020}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-info.png"
        onPointerDown={toggleModal}
      />

      <DynamicBitmapText
        x={config.width - 1060}
        y={config.height - 70}
        font="txt_bitmap"
        text={options.txtInfo}
        fontSize={38}
        ref={(gameObject) => gameObject.setDisplayCallback(scene.textCallback)}
      />

      <Container visible={false} ref={containerRef}>
        <Sprite
          x={config.width / 2}
          y={config.height / 2}
          texture="about"
          frame="paytable.png"
        />

        {renderTable()}

        <Sprite
          x={config.width - 30}
          y={config.height - 635}
          texture="bgButtons"
          frame="btn_exit.png"
          scale={0.9}
          ref={closeRef}
          onPointerDown={toggleModal}
        />
      </Container>
    </>
  );
}
