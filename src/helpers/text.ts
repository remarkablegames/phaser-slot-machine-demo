import options from '../options';
import type { Game } from '../scenes';

export function removeTextWin(scene: Game) {
  scene.audioPlayButton();

  if (scene.audioMusicName === 'btn_music.png') {
    scene.audio.audioWin.stop();
    scene.audio.audioReels.play();
  }

  scene.valueMoney -= options.coin * options.line;
  scene.txtMoney.setText(`$${scene.valueMoney.toLocaleString()}`);

  if (scene.txtWin) {
    scene.txtWin.destroy();
  }
}
