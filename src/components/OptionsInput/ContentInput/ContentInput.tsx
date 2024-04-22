import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {Option} from "@/models";

type ContentInputProps = {
    index: number;
    option:Option;
}

export const ContentInput = ({index, option}: ContentInputProps) => {
    const [color, setColor] = useState<string>(option.color);
    const [name , setName] = useState<string>(option.name);

    useEffect(() => {
        option.name = name;
        option.color = color;
    }, [ name, color]);      
    return (
        <div className="w-full h-7 flex items-center gap-[0.6rem]">

       <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-[70%] h-min bg-input-grey-opacity  rounded-sm bg-transparent"
       placeholder={`Opção ${index+1}`}
       />


        <span className="h-4 w-4 rounded-full shadow-blur-10 dark:shadow-blur-20 " style={{backgroundColor: color}}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-full w-full opacity-0"
          />
        </span>
      </div>
    );
}