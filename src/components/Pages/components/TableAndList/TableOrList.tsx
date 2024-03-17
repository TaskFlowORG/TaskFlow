import React from "react";

interface Props {
    name?: string;
    isList?:boolean;
    children: React.ReactNode;
}


export const TableOrList = ({name, children, isList}:Props) => {
    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
        <div className="h-full flex flex-col w-screen px-8 md:px-16 lg:px-40 xl:px-52 2xl:px-72 gap-14">
            <div className="h-min w-full flex items-center justify-between">
                <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary">
                    {name ?? "Sem Nome"}
                </div>
                <div className="w-min flex">
                    <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                    <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                </div>
            </div>
            <div className="w-full h-4/5 p-2 overflow-x-scroll" >
                <div className={"h-full flex gap-1  relative " + (isList ? "w-min" : "")} >
                    {children}
                </div>
            </div>
        </div>
    </div>
    )
}