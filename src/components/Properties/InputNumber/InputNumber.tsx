import { Input } from "@/components/Input"
import style from './InputNumber.module.css'
import { Property } from "@/models"

type InputTextProps = {
    property: Property
}

export const InputNumber = ({ property }: InputTextProps) => {
    return (
        <div className="h-[10%] flex items-center justify-center">
            <div className="w-[70%] h-full flex flex-row items-center justify-between">
                <p className="h5 text-center">{property.name}</p>
                <Input register={property.name} className='h-full' type="number" classNameInput={style.number}></Input>
            </div>
        </div >
    )

}