import { ReactNode, useEffect, useRef, useState } from "react";
import { If } from "../If";

interface Props {
    list: { value: string, image: ReactNode }[];
    onChange: (value: string) => void;
    selected: string;
}


export const SelectWithImage = ({ list, onChange, selected }: Props) => {

    const [show, setShow] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener("click", e =>{
            if(!ref.current?.contains(e.target as Node)){
                setShow(false)
            }
        })
        return () => window.removeEventListener("click", close)
    }, [])

    return (
        <div ref={ref} className={" rounded-sm relative gap-2 flex w-8 flex-col items-center overflow-clip pt-2 duration-200 cursor-pointer " + 
        (show ? "shadow-blur-10 h-[10.7rem] bg-white dark:bg-back-grey":"  h-full")}>
            <div onClick={() => setShow(!show)} >
                {list.filter(item => item.value === selected)[0].image}
            </div>
            <If condition={show}>
                <div className="w-8 h-min border-t-2 border-input-grey z-20 dark:border-modal-grey flex-col absolute flex top-10 items-center">
                    {
                        list.map((item, index) => (
                            <div key={index} className="hover:bg-zinc-200 hover:dark:bg-zinc-600 px-2 py-1 bg-white dark:bg-back-grey  " 
                            onClick={() => {onChange(item.value); setShow(false)}}>
                                {item.image}
                            </div>
                        ))
                    }
                </div>
            </If>
        </div>

    )

}