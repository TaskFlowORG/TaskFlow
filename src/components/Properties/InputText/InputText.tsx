import { Input } from "@/components/Input"
import style from './InputText.module.css'
import { Property } from "@/models"


type InputTextProps = {
    property: Property
}
export const InputText = ({property}:InputTextProps) =>{
    return (
        <Input register={property.name} placeholder={property.name} className='h-[10%]' classNameInput={style.text}></Input>
    )

}

