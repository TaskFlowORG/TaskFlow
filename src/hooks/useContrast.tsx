import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useContrast(): { contrastColor: string } {
  const { theme } = useTheme();
  const [contrastColor, setContrastColor] = useState("#3c3c3c");

  useEffect(() => {
    let color;
    if (theme == "dark") {
      color = getComputedStyle(document.documentElement).getPropertyValue(
        "--secondary-color"
      );
    } else {
      color = getComputedStyle(document.documentElement).getPropertyValue(
        "--primary-color"
      );
    }
      color = color.replace(/^#/, '');
  
      const bigint = parseInt(color, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
  
      const luminance = 0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255;
  
      setContrastColor(luminance > 0.6 ? '#3c3c3c' : '#fcfcfc')

  }, [theme]);

  return { contrastColor };
}
