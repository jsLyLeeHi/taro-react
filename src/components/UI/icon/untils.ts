
export function fixColor(color: string | string[]) {
  if (typeof color === 'string') {
    return color.indexOf('#') === 0 ? hex2rgb(color) : color;
  }
  return color.map(function (item) {
    return item.indexOf('#') === 0 ? hex2rgb(item) : item;
  });
}
export function hex2rgb(hex: any) {
  var rgb: number[] = [];
  hex = hex.substr(1);
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  hex.replace(/../g, function (color) {
    rgb.push(parseInt(color, 0x10));
    return color;
  });
  return 'rgb(' + rgb.join(',') + ')';
}
  