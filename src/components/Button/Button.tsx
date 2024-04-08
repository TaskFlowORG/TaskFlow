import { useTranslation } from "next-i18next";

interface Props {
  padding?: string;
  paddingY?: string;
  width?: string;
  rounded?: string;
  background?: string;
  textColor?: string;
  textSize?: string;
  font?: string;
  text?: string;
  other?: string;
  hover?: string;
  border?:string;
  secondary?: boolean;
  fnButton?: ()=> void
}

export const Button = ({
  padding,
  paddingY,
  width,
  rounded,
  background,
  textColor,
  textSize,
  font,
  text,
  hover, 
  other,
  border,
  fnButton,
  secondary = false
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <button onClick={() => fnButton && fnButton()}
        className={` ${padding ? padding : "p-12"} 
             ${paddingY ? paddingY : "py-2"} 
             ${width ? width : "w-max"} 
              ${rounded ? rounded : "rounded-lg"} 
               ${background ? background : !secondary ? "bg-primary dark:bg-secondary" : "bg-transparent "} 
               ${textSize ? textSize : "text-[20px]"} 
               ${textColor ? textColor : !secondary ? "text-white" : "text-secondary dark:text-primary"} 
               ${other ? other : " "} 
               ${font ? font : "font-alata"} whitespace-nowrap 
               ${hover ? hover: !secondary ? "hover:brightness-110":"hover:bg-secondary text-secondary hover:text-contrast hover:border-contrast  dark:hover:bg-primary dark:text-primary dark:hover:text-contrast"} 
               ${border ? border: !secondary ? "border-none": "border-secondary border-2 dark:border-primary"}`}

      >
        {text ? text :t("continue")}
        
      </button>
    </>
  );
};
