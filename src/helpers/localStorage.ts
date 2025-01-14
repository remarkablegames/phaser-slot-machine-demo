import { LocalStorageKey } from '../constants';
import type { Game } from '../scenes';

export function saveLocalStorage(scene: Game) {
  if (localStorage.getItem(LocalStorageKey.Money)) {
    localStorage.setItem(LocalStorageKey.Money, String(scene.valueMoney));
  }

  localStorage.setItem(LocalStorageKey.Money, String(scene.valueMoney));
  scene.setTextX(scene.valueMoney);
  scene.txtMoney.setText(scene.valueMoney.toLocaleString());
}
