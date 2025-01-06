import { Math } from 'phaser';
import { Container as PhaserContainer, Sprite } from 'phaser-jsx';
import type { ComponentProps } from 'react';

import options from '../options';

export function Container(props: ComponentProps<typeof PhaserContainer>) {
  return (
    <PhaserContainer {...props}>
      <Sprite x={0} y={0} texture="symbols" frame={`symbols_${random()}.png`} />

      <Sprite
        x={0}
        y={-options.symbolHeight}
        texture="symbols"
        frame={`symbols_${random()}.png`}
      />

      <Sprite
        x={0}
        y={-options.symbolHeight * 2}
        texture="symbols"
        frame={`symbols_${random()}.png`}
      />

      <Sprite
        x={0}
        y={-options.symbolHeight * 3}
        texture="symbols"
        frame={`symbols_${random()}.png`}
      />

      <Sprite
        x={0}
        y={-options.symbolHeight * 4}
        texture="symbols"
        frame={`symbols_${random()}.png`}
      />
    </PhaserContainer>
  );
}

function random() {
  return Math.Between(0, 9);
}
