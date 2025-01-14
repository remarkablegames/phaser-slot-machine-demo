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
import {
  destroyLineArr,
  removeTextWin,
  saveLocalStorage,
  setColor,
} from '../helpers';
import options from '../options';
import type { Game } from '../scenes';
import { Tween } from '.';

interface Props {
  autoSpinRef: (gameObject: Phaser.GameObjects.Sprite) => void;
}

export function AutoSpin(props: Props) {
  const scene = useScene<Game>();
  const containerRef = useRef<Phaser.GameObjects.Container>();

  let buttonAuto: Phaser.GameObjects.Sprite;
  let txtAutoSpin: Phaser.GameObjects.DynamicBitmapText;
  let btnMinus: Phaser.GameObjects.Sprite;
  let btnPlus: Phaser.GameObjects.Sprite;
  let timer: Phaser.Time.TimerEvent;
  let txtAuto: Phaser.GameObjects.Text;
  let txtSpeed: Phaser.GameObjects.DynamicBitmapText;

  function toggleModal() {
    const container = containerRef.current!;
    container.setToTop().setVisible(!container.visible);
  }

  function playSpeedAuto() {
    if (options.txtAutoSpin === 'STOP') {
      options.txtAutoSpin = 'AUTO';
      txtAutoSpin.setText(options.txtAutoSpin);

      if (txtSpeed && timer) {
        txtSpeed.destroy();
        timer.remove();
      }
    } else {
      options.txtAutoSpin = 'STOP';
      txtAutoSpin.setText(options.txtAutoSpin);
      scene.audioPlayButton();

      setXAuto();
      toggleModal();
    }
  }

  /**
   * Set text speed.
   */
  function speedPlay(speed: number) {
    const width = speed > 5 ? config.width - 150 : config.width - 130;

    txtSpeed = scene.add.dynamicBitmapText(
      width,
      config.height / 2 - 350,
      'txt_bitmap',
      String(speed),
      80,
    );

    txtSpeed.setDisplayCallback(scene.textCallback);

    timer = scene.time.addEvent({
      delay: 500,
      loop: true,

      callback: () => {
        // @ts-expect-error Cannot assign to 'delay' because it is a read-only property.
        timer.delay = 4500;

        if (speed > 0 && scene.valueMoney >= options.coin * options.line) {
          setColor(scene);
          options.checkClick = true;
          destroyLineArr();
          removeTextWin(scene);
          saveLocalStorage(scene);
          scene.autoSpinTweens = new Tween(scene);
          speed--;
          txtSpeed.setText(String(speed));
        } else {
          options.checkClick = false;
          timer.remove(false);
          txtSpeed.destroy();
          setTextAuto();
        }
      },
    });
  }

  function setTextAuto() {
    options.txtAutoSpin = 'AUTO';
    txtAutoSpin.setText(options.txtAutoSpin);
  }

  function setXAuto() {
    switch (true) {
      case options.txtAuto >= 100:
        txtAuto.x = 610;
        break;

      case options.txtAuto >= 10:
        txtAuto.x = 620;
        break;

      default:
        txtAuto.x = 635;
        break;
    }
  }

  return (
    <>
      <Sprite
        x={config.width - 110}
        y={config.height - 50}
        texture="bgButtons"
        frame="btn-info.png"
        onPointerDown={() => {
          if (!options.checkClick) {
            buttonAuto.setScale(0.9);
            playSpeedAuto();
          }
        }}
        onPointerUp={() => buttonAuto.setScale(1)}
        ref={(gameObject) => {
          props.autoSpinRef(gameObject);
          buttonAuto = gameObject;
        }}
      />

      <DynamicBitmapText
        x={config.width - 155}
        y={config.height - 70}
        font="txt_bitmap"
        text={options.txtAutoSpin}
        fontSize={38}
        ref={(gameObject) => {
          txtAutoSpin = gameObject;
          gameObject.setDisplayCallback(scene.textCallback);
        }}
      />

      <Container visible={false} ref={containerRef}>
        <Sprite
          x={config.width / 2}
          y={config.height / 2}
          texture="autoSpin"
          frame="bg_auto.png"
        />

        <Sprite
          x={config.width / 2 - 100}
          y={config.height / 2 - 100}
          texture="autoSpin"
          frame="btn_plus_bet.png"
          ref={(gameObject) => (btnPlus = gameObject)}
          onPointerDown={() => {
            scene.audioPlayButton();

            if (options.txtAuto < 100) {
              btnMinus.clearTint();
              btnPlus.setScale(0.9);
              options.txtAuto += 5;

              if (options.txtAuto < 100) {
                txtAuto.x = 620;
              } else {
                txtAuto.x = 610;
              }

              txtAuto.setText(String(options.txtAuto));
            }

            if (options.txtAuto === 100) {
              btnPlus.setTint(0xa09d9d);
            }
          }}
          onPointerUp={() => btnPlus.setScale(1)}
        />

        <Sprite
          x={config.width / 2 + 100}
          y={config.height / 2 - 100}
          texture="autoSpin"
          frame="btn_minus_bet.png"
          ref={(gameObject) => (btnMinus = gameObject)}
          onPointerDown={() => {
            scene.audioPlayButton();

            if (options.txtAuto > 5) {
              btnPlus.clearTint();
              btnMinus.setScale(0.9);
              options.txtAuto -= 5;
              setXAuto();
              txtAuto.setText(String(options.txtAuto));
            }

            if (options.txtAuto === 5) {
              btnMinus.setTint(0xa09d9d);
            }
          }}
          onPointerUp={() => btnMinus.setScale(1)}
        />

        <Sprite
          x={config.width / 2}
          y={config.height / 2 + 100}
          texture="bgButtons"
          frame="btn_play.png"
          scale={0.9}
          onPointerDown={() => {
            scene.audioPlayButton();
            toggleModal();

            if (scene.valueMoney >= options.coin * options.line) {
              speedPlay(options.txtAuto);
            } else {
              setTextAuto();
            }
          }}
        />

        <Sprite
          x={config.width - 30}
          y={config.height - 635}
          texture="bgButtons"
          frame="btn_exit.png"
          scale={0.9}
          onPointerDown={() => {
            scene.audioPlayButton();
            toggleModal();
            setTextAuto();
          }}
        />

        <Sprite
          x={config.width / 2}
          y={config.height / 2 - 100}
          texture="bgButtons"
          frame="btn-spin.png"
        />

        <Text
          x={config.width / 2 - 5}
          y={config.height / 2 - 115}
          text={String(options.txtAuto)}
          style={{ fontSize: '35px', color: '#fff', fontFamily: 'PT Serif' }}
          ref={(gameObject) => (txtAuto = gameObject)}
        />
      </Container>
    </>
  );
}
