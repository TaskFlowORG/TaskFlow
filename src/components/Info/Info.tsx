import { useState } from "react";
import { LocalModal } from "../Modal";
import { useTranslation } from "react-i18next";

export const Info = ({text, title, right}: {text:string, title:string, right?:boolean}) => {

    const {t} = useTranslation();
    const [show, setShow] = useState(false)
    return (
        <span className="w-min text-modal-grey dark:text-white h-min relative"
        onMouseEnter={() => setShow(prev => !prev)}
                onMouseLeave={() => setShow(prev => !prev)}>
            <div className="w-4 h-4 flex justify-center items-center rounded-full 
            p-1 text-[12px] bg-white  font-alata
             dark:bg-modal-grey border-2 border-modal-grey dark:border-white opacity-25 cursor-default"
             >
                ?
            </div>
            <LocalModal condition={show} setCondition={setShow}  right={right}  classesShadow="shadow-[0_0_2px_1px_rgba(0,0,0,0.1)]  dark:border-[1px] dark:border-zinc-600 ">
                <div className="w-48 h-min bg-white rounded-md dark:bg-modal-grey  flex flex-col p-2 ">
                    <span className="w-full font-alata whitespace-pre-wrap text-p14 text-center">{t(title)}</span>
                    <span className="w-full font-montserrat whitespace-pre-wrap text-mn">{t(text)}</span>
                </div>
            </LocalModal>
        </span>
    );
}