import { Input } from "@/components/Input"
import { Property } from "@/model/Properties/Property"
import style from './InputText.module.css'


type InputTextProps = {
    property: Property
}
export const InputText = ({property}:InputTextProps) =>{
    return (
        <Input register={property.name} placeholder={property.name} className='h-[10%]' classNameInput={style.text}></Input>
    )

}

