 export function convertColor(color3:string, invert?:boolean) {

    const rgb3 = hexToRGB(color3);

   const result = invert ? calcsInverse(rgb3):calcs(rgb3) ;

    // Converter os novos valores RGB de volta para hexadecimal
    const newColor = RGBToHex(result.newRed, result.newGreen, result.newBlue);
    return newColor;
  }
  

  function hexToRGB(hex:string) {
    // Converter código hexadecimal para valores de vermelho, verde e azul
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  }

  function RGBToHex(r: number, g:number, b:number) {
    // Converter valores de vermelho, verde e azul para código hexadecimal
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }

  function calcs(rgb3:{r:number, g:number, b:number}){
    let newRed;
    let newGreen;
    let newBlue;

    // Adicionar a diferença a cada componente da cor original
    if (rgb3.r > rgb3.g && rgb3.r > rgb3.b) {
      newRed = rgb3.r + 30;
      newGreen = rgb3.g + 100;
      newBlue = rgb3.b - 60;
    } else if (rgb3.g > rgb3.r && rgb3.g > rgb3.b) {
      newRed = rgb3.r + 160;
      newGreen = rgb3.g - 100;
      newBlue = rgb3.b + 160;
    } else if (rgb3.b > rgb3.r && rgb3.b > rgb3.g) {
      newRed = rgb3.r - 60;
      newGreen = rgb3.g + 100;
      newBlue = rgb3.b - 30;
    } else {
      newRed = rgb3.r + 10;
      newGreen = rgb3.g + 30;
      newBlue = rgb3.b - 60;
    }

    newRed = newRed > 255 ? 255 : newRed;
    newGreen = newGreen > 255 ? 255 : newGreen;
    newBlue = newBlue > 255 ? 255 : newBlue;

    newRed = newRed < 0 ? 0 : newRed;
    newGreen = newGreen < 0 ? 0 : newGreen;
    newBlue = newBlue < 0 ? 0 : newBlue; 
    return {newRed, newGreen, newBlue}
  }

  function calcsInverse(rgb3: { r: number; g: number; b: number }) {
    let newRed;
    let newGreen;
    let newBlue;

    // Adicionar a diferença a cada componente da cor original
    if (rgb3.r > rgb3.g && rgb3.r > rgb3.b) {
        newRed = rgb3.r - 30;
        newGreen = rgb3.g + 100;
        newBlue = rgb3.b - 60;
    } else if (rgb3.g > rgb3.r && rgb3.g > rgb3.b) {
        newRed = rgb3.r + 100;
        newGreen = rgb3.g - 30;
        newBlue = rgb3.b + 60;
    } else if (rgb3.b > rgb3.r && rgb3.b > rgb3.g) {
        newRed = rgb3.r - 60;
        newGreen = rgb3.g + 100;
        newBlue = rgb3.b - 30;
    } else {
        newRed = rgb3.r + 10;
        newGreen = rgb3.g + 30;
        newBlue = rgb3.b - 60;
    }

    // Garantir que os valores estejam dentro do intervalo válido (0-255)
    newRed = Math.max(0, Math.min(255, newRed));
    newGreen = Math.max(0, Math.min(255, newGreen));
    newBlue = Math.max(0, Math.min(255, newBlue));

    return { newRed, newGreen, newBlue };
}
