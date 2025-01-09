import Phaser from 'phaser';
import { createRef, DynamicBitmapText, Sprite, useScene } from 'phaser-jsx';

import config from '../config';
import options from '../options';
import type { Game } from '../scenes';

export function Info() {
  const scene = useScene<Game>();
  let click = false;
  const closeRef = createRef<Phaser.GameObjects.Sprite>();
  let payValues!: Phaser.GameObjects.Text[];
  const paytableRef = createRef<Phaser.GameObjects.Sprite>();

  function showPayTable() {
    if (!click) {
      click = true;
      scene.audioPlayButton();
      showTable();
    }
  }

  function showTable() {
    payValues = [];
    paytableRef.current?.setToTop().setVisible(true);
    closeRef.current?.setToTop().setVisible(true);

    let width = 190;
    let width2 = width;
    let height = 25;
    let height2 = 245;

    for (let i = 0; i < options.payvalues.length; i++) {
      if (i >= 5) {
        for (let j = 0; j < options.payvalues[i].length; j++) {
          height2 -= 30;

          payValues.push(
            scene.add.text(
              width2,
              config.height / 2 + height2,
              String(options.payvalues[i][j]),
              {
                color: '#630066',
                font: '30px "PT Serif"',
              },
            ),
          );
        }

        width2 += 225;
        height2 = 245;
      } else {
        for (let j = 0; j < options.payvalues[i].length; j++) {
          height += 30;

          payValues.push(
            scene.add.text(
              width,
              config.height / 2 - height,
              String(options.payvalues[i][j]),
              {
                color: '#630066',
                font: '30px "PT Serif"',
              },
            ),
          );
        }

        width += 225;
        height = 25;
      }
    }
  }

  function hideTable() {
    click = false;
    scene.audioPlayButton();
    paytableRef.current?.setVisible(false);
    closeRef.current?.setVisible(false);

    if (payValues.length > 0) {
      for (let i = 0; i < payValues.length; i++) {
        payValues[i].destroy();
      }
    }
  }

  return (
    <>
      <Sprite
        x={config.width - 1020}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-info.png"
        onPointerDown={showPayTable}
      />

      <DynamicBitmapText
        x={config.width - 1060}
        y={config.height - 70}
        font="txt_bitmap"
        text={options.txtInfo}
        fontSize={38}
        ref={(gameObject) => gameObject.setDisplayCallback(scene.textCallback)}
      />

      <Sprite
        x={config.width / 2}
        y={config.height / 2}
        texture="about"
        frame="paytable.png"
        visible={false}
        ref={paytableRef}
      />

      <Sprite
        x={config.width - 30}
        y={config.height - 635}
        texture="bgButtons"
        frame="btn_exit.png"
        visible={false}
        scale={0.9}
        ref={closeRef}
        onPointerDown={hideTable}
      />
    </>
  );
}
