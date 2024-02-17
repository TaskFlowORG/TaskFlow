import { Input } from "@/components/Input"
import { Property } from "@/model/Properties/Property"


type InputTextProps = {
    property: Property
}

export const InputProgress = ({ property }: InputTextProps) => {
    return (
        <div className="h-[10%] flex justify-center items-center">
            <div className=" h-full w-[70%] flex justify-between items-center ">
                <p className="h5">{property.name}</p>
                <Input register={undefined} type={"number"} className="h-full" classNameInput={"appearance-none h-full bg-input-grey text-center outline-none rounded-md focus:outline-primary"} />
            </div>
        </div>
    )
}