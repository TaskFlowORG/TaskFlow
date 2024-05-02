import { ReactNode } from "react"

export const InputCalendar = ({value, setValue, icon}:{value:string, setValue:(value:string) => void, icon:ReactNode}) => {
    return(
        <div className="flex items-center h-full w-full justify-center relative">
            <input
                className="px-2 bg-transparent relative text-p font-alata"
                type="date"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                
            />
            <span className="w-4 h-4 absolute top-1/2 -translate-y-1/2  right-[8%] z-10"> 
                {icon}
            </span>
        </div>
    )
}