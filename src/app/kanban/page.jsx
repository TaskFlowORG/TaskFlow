'use client';

import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { useEffect } from "react";
import { getData, getListData } from "@/services/http/api";
import { useState } from "react";
export default function Home() {
    const [tasks, setTasks] = useState([])
    const [defaultTasks, setDefaultTasks] = useState([])
    const [id, setId] = useState(0);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getList = async () => {
            const fetchedTasks = await getListData("task");


            await fetchedTasks.map((task) => {
                task.properties.map((property) => {
                    if (property.property.type == "select") {
                        setOptions(property.property.options);
                        let id2 = property.propertyId
                        setId(id2);

                    }
                });
            });

            const defaultPacaralho = []

            fetchedTasks.map((task) => {

                let property = task.properties.find((property) => property.propertyId == id && property.value == "vazio");

                if (property != null) {
                    defaultPacaralho.push(task)
                }





            });
            setTasks(fetchedTasks)
            setDefaultTasks(defaultPacaralho)
        };
        getList();
    }, [id]);


    return (
        <>
            <header className="bg-black w-full h-[55px]"></header>
            <div className="w-full h-full mt-[5em] flex flex-col ">
                <div className="flex gap-5 items-end pb-16 justify-center    h-max">
                    <h1 className="text-pink whitespace-nowrap">Page Name</h1>
                    <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 ">
                        <p className="text-pink text-4xl h-min w-min">+</p>
                    </div>
                    <SearchBar hasOrder hasFilter hasSearch />
                </div>
                <div className="flex gap-8 justify-center w-full">
                    {options.map((option) => {

                        return (
                            <ColumnKanban
                                key={option.id}
                                tasks={tasks}
                                propertyId={id}
                                color="#FF0000"
                                id={option.id}
                                option={option.name}
                                columnName={"To Do"}
                                verify={true}
                            />
                        );
                    })}
                    {
                        <ColumnKanban
                            key={0}
                            tasks={defaultTasks}
                            propertyId={id}
                            color="#FF0000"

                            option={"Não marcadas"}
                            columnName={"To Do"} />
                    }


                </div>
            </div>
        </>
    );
}
