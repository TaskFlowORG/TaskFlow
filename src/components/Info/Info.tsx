import { useState } from "react";
import { LocalModal } from "../Modal";

export const Info = ({text, title, right}: {text:string, title:string, right?:boolean}) => {

    const [show, setShow] = useState(false)
    return (
        <span className="w-min text-modal-grey dark:text-white h-min">
            <div className="w-6 h-6 flex justify-center items-center rounded-full 
            p-1 text-[100%] bg-white  font-alata
             dark:bg-modal-grey border-2 border-modal-grey dark:border-white opacity-25 cursor-default"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
             >
                ?
            </div>
            <LocalModal condition={show} setCondition={setShow}  right={right}>
                <div className="w-32 h-min bg-white rounded-md dark:bg-modal-grey flex flex-col p-2 ">
                    <span className="w-full font-alata whitespace-pre-wrap text-[14px] text-center">{title}</span>
                    <span className="w-full font-montserrat whitespace-pre-wrap text-[12px]">{text}</span>
                </div>
            </LocalModal>
        </span>
    );
}