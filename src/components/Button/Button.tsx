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
  fnButton
}: Props) => {
  return (
    <>
      <button onClick={() => fnButton && fnButton()}
        className={` ${padding ? padding : "p-12"} 
             ${paddingY ? paddingY : "py-2"} 
             ${width ? width : "w-max"} 
              ${rounded ? rounded : "rounded-lg"} 
               ${background ? background : "bg-primary dark:bg-secondary"} 
               ${textSize ? textSize : "text-[20px]"} 
               ${textColor ? textColor : "text-white"} 
               ${other ? other : " "} 
               ${font ? font : "font-alata"} whitespace-nowrap 
               ${hover ? hover: "hover:brightness-110"} 
               ${border ? border: "border-none"}`}
      >
        {text ? text : "Confirmar"}
        
      </button>
    </>
  );
};
