export const Button = ({ padding, paddingY, width, rounded, background, textColor, textSize, font, text, other }) => {
    return (
        <>
            <button className={` ${padding ? padding : "p-12"}
             ${paddingY ? paddingY : "py-2"} 
             ${width ? width : "w-max"}
              ${rounded ? rounded : "rounded-lg"}
               ${background ? background : "bg-primary"} 
               ${textSize ? textSize : "text-[20px]"} 
               ${textColor ? textColor : "text-white"} 
               ${other ? other : " "}
               ${font ? font : "font-alata"}`}>{text ?  text : "Confirmar"}</button>
        </>
    )
}