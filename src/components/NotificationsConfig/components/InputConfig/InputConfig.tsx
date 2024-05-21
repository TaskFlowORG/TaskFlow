import { ChangeEventHandler } from "react";


export const InputConfig = ({ id, type, title, description, onChange, checked, notifications }: { id: string, type: string, title: string, description: string, onChange: ChangeEventHandler<HTMLInputElement>, checked?: boolean, notifications?:boolean }) => (

    <div className={` ${notifications ? "opacity-100" : "opacity-50"}`}>
        <div className="w-full flex items-center justify-between row-start-3 ">
            <div>
                <h4 className="text-h4 font-alata text-modal-grey dark:text-white">{title}</h4>
            </div>
            <div className="flex items-center py-4 font-bold ">
                <label className="relative w-16 h-8 ">
                    <input id={id} type={type} onChange={onChange} className="hidden toggle-input" disabled={!notifications} checked={checked} />
                    <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                </label>
            </div>
        </div>
        <div>
            <p className="text-p font-montserrat">{description}</p>
        </div>
    </div>
);