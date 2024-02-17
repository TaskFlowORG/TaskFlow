import { generateContrast } from "@/functions";
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
      
  
      setContrastColor(generateContrast(color));

  }, [theme]);

  return { contrastColor };
}
