"use client";

import { List } from "@/components/List";
import {  useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Page, Project, Property, TaskOrdered } from "@/models";
import { Table } from "./components/Table";

interface Props{
    page:Page,
    project:Project
}

export const TablePage = ({ page, project}:Props) => {

    return (
        <div className="w-screen h-full pt-20 flex flex-col justify-start items-center">
            <div className="h-full flex flex-col w-screen px-8 md:px-16 lg:px-40 xl:px-52 2xl:px-72 gap-14">
                <div className="h-min w-full flex items-center justify-between">
                    <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary" style={page.name ? {opacity:0.7} : {}}>
                        {page.name || "Sem Nome"}
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="w-full h-4/5 p-2" >
                    <div className="h-full flex gap-1 shadow-blur-10 w-full relative overflow-x-scroll" >
                        <Table page={page} updateIndex={()=> console.log("Update Indexes")} />
                    </div>
                </div>
            </div>
        </div>
        )
}
