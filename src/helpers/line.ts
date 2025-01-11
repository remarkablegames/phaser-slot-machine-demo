import options from '../options';

export function destroyLineArr() {
  if (options.lineArray.length > 0) {
    for (let i = 0; i < options.lineArray.length; i++) {
      options.lineArray[i].destroy();
    }
    options.lineArray = [];
  }
}
