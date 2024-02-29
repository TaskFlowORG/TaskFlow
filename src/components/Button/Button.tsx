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
  return (
    <>
      <button onClick={() => fnButton && fnButton()}
        className={` ${padding ? padding : "p-12"} 
             ${paddingY ? paddingY : "py-2"} 
             ${width ? width : "w-max"} 
              ${rounded ? rounded : "rounded-lg"} 
               ${background ? background : !secondary ? "bg-primary dark:bg-secondary" : "bg-transparent dark:bg-transparent"} 
               ${textSize ? textSize : "text-[20px]"} 
               ${textColor ? textColor : !secondary ? "text-white" : "text-secondary"} 
               ${other ? other : " "} 
               ${font ? font : "font-alata"} whitespace-nowrap 
               ${hover ? hover: !secondary ? "hover:brightness-110":"hover:bg-secondary text-secondary hover:text-white hover:border-white"} 
               ${border ? border: !secondary ? "border-none": "border-secondary border-2"}`}
      >
        {text ? text : "Confirmar"}
        
      </button>
    </>
  );
};
