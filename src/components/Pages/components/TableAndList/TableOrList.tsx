import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";

interface Props {
    name?: string;
    children: React.ReactNode;
}


export const TableOrList = ({name, children}:Props) => {
    const {t} = useTranslation();


    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
        <div className="h-full flex flex-col w-full gap-14">
            <div className="w-full h-4/5 py-2  flex " >
                <div className="relative w-full h-full overflow-x-auto p-2 flex gap-4" >
                    {children}
                </div>
            </div>
        </div>
    </div>
    )
}