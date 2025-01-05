import Phaser from 'phaser';

import options from '../options';
import type { Game } from '../scenes';
import { Spin } from '.';

export class Tween {
  columnTween1;
  columnTween2;
  columnTween3;
  columnTween4;
  columnTween5;

  constructor(scene: Game) {
    this.columnTween1 = scene.tweens.add({
      targets: scene.container,
      props: {
        y: {
          value: `+=${options.symbolHeight}`,
          duration: options.duration,
        },
      },
      repeat: options.repeat[0],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + options.symbolHeight, true);
        target.first.y = target.last.y - options.symbolHeight;
        const symbols = target.first
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${options.symbolHeight}`,
              duration: options.duration * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - options.symbolHeight, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + options.symbolHeight;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            if (targets[0].scene.audioMusicName === 'btn_music.png') {
              targets[0].scene.audioObject.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween2 = scene.tweens.add({
      targets: scene.container2,
      props: {
        y: {
          value: '+=' + options.symbolHeight,
          duration: options.duration,
        },
      },
      repeat: options.repeat[1],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + options.symbolHeight, true);
        target.first.y = target.last.y - options.symbolHeight;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: '-=' + options.symbolHeight,
              duration: options.duration * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - options.symbolHeight, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + options.symbolHeight;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            if (targets[0].scene.audioMusicName === 'btn_music.png') {
              targets[0].scene.audioObject.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween3 = scene.tweens.add({
      targets: scene.container3,
      props: {
        y: {
          value: `+=${options.symbolHeight}`,
          duration: options.duration,
        },
      },
      repeat: options.repeat[2],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + options.symbolHeight, true);
        target.first.y = target.last.y - options.symbolHeight;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${options.symbolHeight}`,
              duration: options.duration * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - options.symbolHeight, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + options.symbolHeight;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            if (targets[0].scene.audioMusicName === 'btn_music.png') {
              targets[0].scene.audioObject.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween4 = scene.tweens.add({
      targets: scene.container4,
      props: {
        y: {
          value: `+=${options.symbolHeight}`,
          duration: options.duration,
        },
      },
      repeat: options.repeat[3],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + options.symbolHeight, true);
        target.first.y = target.last.y - options.symbolHeight;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${options.symbolHeight}`,
              duration: options.duration * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - options.symbolHeight, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + options.symbolHeight;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            if (targets[0].scene.audioMusicName === 'btn_music.png') {
              targets[0].scene.audioObject.audioReelStop.play();
            }
          },
        });
      },
    });

    this.columnTween5 = scene.tweens.add({
      targets: scene.container5,
      props: {
        y: {
          value: `+=${options.symbolHeight}`,
          duration: options.duration,
        },
      },
      repeat: options.repeat[4],

      onRepeat: (tween, target) => {
        tween.updateTo('y', target.y + options.symbolHeight, true);
        target.first.y = target.last.y - options.symbolHeight;
        const symbols = target.first;
        symbols
          .setVisible(true)
          .setTexture(
            'symbols_blur',
            `symbols_${Phaser.Math.RND.between(0, 9)}.png`,
          );
        target.moveTo(symbols, 4);
      },

      onComplete: (tween, targets) => {
        targets[0].scene.tweens.add({
          targets: targets[0],
          props: {
            y: {
              value: `-=${options.symbolHeight}`,
              duration: options.duration * 2,
            },
          },
          repeat: 1,

          onRepeat: (tween: Phaser.Tweens.Tween, target: { y: number }) => {
            tween.updateTo('y', target.y - options.symbolHeight, true);
          },

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onComplete: (tween: Phaser.Tweens.Tween, targets: any[]) => {
            targets[0].last.y = targets[0].first.y + options.symbolHeight;
            const symbols = targets[0].last;
            targets[0].moveTo(symbols, 0);
            for (let i = 0; i < 5; i++) {
              const symbolsName = targets[0].list[i].frame.name;
              targets[0].list[i].setTexture('symbols', symbolsName);
            }
            if (targets[0].scene.audioMusicName === 'btn_music.png') {
              targets[0].scene.audioObject.audioReelStop.play();
              targets[0].scene.audioObject.audioReels.stop();
            }
            new Spin(targets[0].scene);
            options.checkClick = false;
          },
        });
      },
    });
  }
}
