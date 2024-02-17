import { Property } from "@/model/Properties/Property"
import { Select } from "@/model/Properties/Select"
import { Input } from "../../../components/Input"
type InputRadioType = {
    property: Property
}

export const InputRadio = ({ property }: InputRadioType) => {


    return (

        <>
            <div className="h-[10%] flex items-center justify-center">
                <div className="w-[70%] h-full flex flex-row items-center justify-between">
                    <p className="h5 text-center">{property.name}</p>
                    {(property as Select).options.map((option) =>
                        <Input register={option.name} className='h-full' type="radio" classNameInput={""}></Input>
                        )
                    }
                </div>
            </div >
        </>
    )

}