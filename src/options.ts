import Phaser from 'phaser';

import type { Sprite } from './components';

export default {
  money: 100000,
  txtSpin: 'SPIN',
  txtAutoSpin: 'AUTO',
  txtAuto: 5,
  moneyWin: 0,
  txtMaxBet: 'MAXBET',
  coin: 10,
  txtCoin: 'COIN',
  line: 1,
  txtLine: 'LINES',
  txtInfo: 'INFO',
  win: 0,
  lineArray: [] as Sprite[],
  result: [] as string[][],
  winningLines: [] as number[],
  i: 0,
  hsv: Phaser.Display.Color.HSVColorWheel(),

  // values symbols0 ==> symbols9
  payvalues: [
    [100, 150, 200],
    [50, 100, 150],
    [25, 50, 100],
    [25, 50, 100],
    [15, 25, 50],
    [10, 20, 35],
    [10, 15, 25],
    [10, 15, 20],
    [5, 10, 20],
    [3, 8, 18],
  ],

  // max payline 20
  payLines: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ], // line 1
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ], // line 2
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
    ], // line 3
    [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 0],
    ], // line 4
    [
      [0, 2],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 2],
    ], // line 5
    [
      [0, 1],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 1],
    ], // line 6
    [
      [0, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 1],
    ], // line 7
    [
      [0, 0],
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 2],
    ], // line 8
    [
      [0, 2],
      [1, 2],
      [2, 1],
      [3, 0],
      [4, 0],
    ], // line 9
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [3, 0],
      [4, 1],
    ], // line 10
    [
      [0, 1],
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 1],
    ], // line 11
    [
      [0, 0],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 0],
    ], // line 12
    [
      [0, 2],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 2],
    ], // line 13
    [
      [0, 0],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 0],
    ], // line 14
    [
      [0, 2],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 2],
    ], // line 15
    [
      [0, 1],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 1],
    ], // line 16
    [
      [0, 1],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 1],
    ], // line 17
    [
      [0, 0],
      [1, 0],
      [2, 2],
      [3, 0],
      [4, 0],
    ], // line 18
    [
      [0, 2],
      [1, 2],
      [2, 0],
      [3, 2],
      [4, 2],
    ], // line 19
    [
      [0, 0],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 0],
    ], // line 20
  ],

  checkClick: false,
  symbolHeight: 150,
  duration: 100,
  repeat: [5, 10, 15, 20, 25],
};
