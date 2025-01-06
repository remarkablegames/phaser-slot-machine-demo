import { Math } from 'phaser';
import { Container as PhaserContainer, Sprite } from 'phaser-jsx';
import type { ComponentProps } from 'react';

import options from '../options';

const SYMBOLS_ROWS = 5;

export function Container(props: ComponentProps<typeof PhaserContainer>) {
  return (
    <PhaserContainer {...props}>
      {Array(SYMBOLS_ROWS)
        .fill(null)
        .map((_, index) => (
          <Sprite
            x={0}
            y={-options.symbolHeight * index}
            texture="symbols"
            frame={`symbols_${random()}.png`}
          />
        ))}
    </PhaserContainer>
  );
}

function random() {
  return Math.Between(0, 9);
}
