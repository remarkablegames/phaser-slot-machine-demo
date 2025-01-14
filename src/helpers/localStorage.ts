import type { Game } from '../scenes';

export function saveLocalStorage(scene: Game) {
  if (localStorage.getItem('money')) {
    localStorage.removeItem('money');
    localStorage.setItem('money', String(scene.valueMoney));
  }

  localStorage.setItem('money', String(scene.valueMoney));
  scene.setTextX(scene.valueMoney);
  scene.txtMoney.setText(scene.valueMoney.toLocaleString());
}
