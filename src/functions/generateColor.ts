export function convertColor(color: string, invert?: boolean) {
  // Converter a cor hexadecimal em valores RGB
  const rgb = hexToRGB(color);

  // Aplicar as transformações de cor com base na opção "invert"
  const result = invert ? calcsInverse(rgb) : calcs(rgb);

  // Converter os novos valores RGB de volta para hexadecimal
  const newColor = RGBToHex(result.newRed, result.newGreen, result.newBlue);
  return newColor;
}

function hexToRGB(hex: string) {
  // Converter código hexadecimal para valores de vermelho, verde e azul
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

function RGBToHex(r: number, g: number, b: number) {
  // Converter valores de vermelho, verde e azul para código hexadecimal
  const red = Math.min(Math.max(r, 0), 255).toString(16).padStart(2, '0');
  const green = Math.min(Math.max(g, 0), 255).toString(16).padStart(2, '0');
  const blue = Math.min(Math.max(b, 0), 255).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

function calcs(rgb: { r: number, g: number, b: number }) {
  // Realizar cálculos para gerar uma nova cor
  const newRed = (rgb.r + 7 ) % 256;
  const newGreen = (rgb.g + 30) % 256;
  const newBlue = (rgb.b - 60) % 256;
  return { newRed, newGreen, newBlue };
}

function calcsInverse(rgb: { r: number, g: number, b: number }) {
  // Realizar cálculos para gerar uma nova cor invertida
  const newRed = (rgb.r - 7) % 256;
  const newGreen = (rgb.g - 30) % 256;
  const newBlue = (rgb.b + 60) % 256;
  return { newRed, newGreen, newBlue };
}
