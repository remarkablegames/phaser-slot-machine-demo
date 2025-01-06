import type Phaser from 'phaser';
import { createRef, Sprite, useScene } from 'phaser-jsx';

import type { Audio } from '../components';
import config from '../config';

const scaleObject = {
  default: 1.2,
  scale: 1.1,
  scale2: 1,
  scale3: 0.9,
};

interface Props {
  audio: Audio;
}

export function Title(props: Props) {
  const buttonRef = createRef<Phaser.GameObjects.Sprite>();
  const titleRef = createRef<Phaser.GameObjects.Sprite>();
  const scene = useScene();

  const timer = scene.time.addEvent({
    delay: 150,
    loop: true,

    callback: () => {
      const title = titleRef.current!;

      switch (title.scale) {
        case scaleObject.default:
          title.setScale(scaleObject.scale);
          break;

        case scaleObject.scale:
          title.setScale(scaleObject.scale2);
          break;

        case scaleObject.scale2:
          title.setScale(scaleObject.scale3);
          break;

        default:
          title.setScale(scaleObject.default);
          break;
      }
    },
  });

  return (
    <>
      <Sprite
        x={config.width / 2}
        y={config.height / 2}
        texture="bgPreload"
        frame="bg_menu.png"
      />

      <Sprite
        x={config.width / 2}
        y={config.height - 500}
        texture="logo"
        frame="logo_game.png"
        scale={scaleObject.default}
        ref={titleRef}
      />

      <Sprite
        x={config.width / 2}
        y={config.height - 150}
        texture="bgButtons"
        frame="btn_play.png"
        scale={0.9}
        ref={buttonRef}
        onPointerDown={() => {
          props.audio.musicBackgroundDefault.stop();
          timer.remove();
          props.audio.audioButton.play();
          scene.scene.start('Game');
        }}
      />
    </>
  );
}
