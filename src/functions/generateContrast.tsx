export const generateContrast= (color:string = "#000000"):string => {
    color = color.replace(/^#/, '');
  
    const bigint = parseInt(color, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    const luminance = 0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255;
    return luminance > 0.6 ? '#3c3c3c' : '#fcfcfc'

}