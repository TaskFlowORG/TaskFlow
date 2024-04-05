import { ChangeEventHandler } from "react";

export const InputFieldConfig = ({ id, type, label, value, onChange, checked }: { id: string, type: string, label: string, value: string, onChange: ChangeEventHandler<HTMLInputElement>, checked: boolean }) => (
    <>
        <div className='flex justify-between'>
            <p className="h4">{label}</p>
            <div className="flex items-center font-bold">
                <label className="relative w-16 h-8 ml-4 mr-2" >
                    <input id={id} type={type} className="opacity-0 w-0 h-0 toggle-input" onChange={onChange} checked={checked} />
                    <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider">
                    </span>
                </label>
            </div>
        </div>
        <div className=' pt-3 pb-10'>
            <p className='p'>{value}</p>
        </div>
    </>
);