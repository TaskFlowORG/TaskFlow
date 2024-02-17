import { Input } from "@/components/Input"
import { Property } from "@/model/Properties/Property"
type InputDateProps = {
    property: Property
}
export const InputDate = ({ property }: InputDateProps) => {
    return (
        <div className="h-[10%] flex items-center justify-center">
            <div className="w-[70%] h-full flex flex-row items-center justify-between  ">
                <p className="h5">{property.name}</p>
                <Input register={undefined}
                    type="date"
                    className="h-full "
                    classNameInput={'h-full w-full outline-none bg-input-grey text-center rounded-md p-2'} />
            </div>
        </div>
    )

} 