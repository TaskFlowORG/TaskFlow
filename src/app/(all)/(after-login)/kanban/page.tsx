"use client";

import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar";
import { useEffect } from "react";
import { getData, getListData } from "@/services/http/api";
import { useState } from "react";
import { Page } from "@/model/pages/Page";
import { RegisterTaskModal } from "@/components/RegisterTaskModal";
import { Property } from "@/model/Properties/Property";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { Project } from "@/model/Project";
import { User } from "@/model/User";
import { Option } from "@/model/Properties/Option";


const property1 = new Property(1, "Propriedade1", true, false, TypeOfProperty.TEXT, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
const property2 = new Property(2, "Propriedade2", false, true, TypeOfProperty.NUMBER, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
//const property3 = new Property(3, "Propriedade3", true, true, TypeOfProperty.RADIO, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
const property4 = new Property(4, "Propriedade4", true, true, TypeOfProperty.DATE, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));
const property5 = new Property(5, "Propriedade5", true, true, TypeOfProperty.PROGRESS, [], new Project(1,"a","asas",new Date(),new Date,"a",null,null,null,null));

const list : Array<Property> = [];

list.push(property1,property2,property4, property5);


export default function Kanban() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<any[]>([]);
  const [paged, setPage] = useState<Page | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const pg: any = await getData("page", 1);
      setTasks(pg.tasks);
      setOptions(pg.propertyOrdering.options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();

  }, [id]);



  return (
    <>
      <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
        <RegisterTaskModal open={modal} close={() => setModal(false)} listInputs={list} />
        <div className="flex gap-5 items-end pb-16 justify-center    h-max">
          <h1
            className="h1 text-primary whitespace-nowrap dark:text-white"
            onClick={() => console.log(paged)}
          >
            {paged?.name}
          </h1>
          <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 cursor-pointer " onClick={() => setModal(true)}>
            <p className="p text-primary text-4xl h-min w-min">+</p>
          </div>
          <SearchBar
            order={() => console.log("Ordering")}
            filter={() => console.log("Filtering")}
            search={() => console.log("Searching")}
          />
        </div>
        <div className="flex gap-8 justify-center w-full">
          {options.map((option) => {
            console.log(option)
            return (
              <ColumnKanban
                key={option.id}
                tasks={tasks}
                propertyId={id}
                color={option.color}
                option={option.name}
                verify={true}
              />
            );
          })}

          {
            <ColumnKanban
              key={0}
              tasks={defaultTasks}
              propertyId={id}
              color="#767867"
              option={"Não marcadas"}
            />
          }
        </div>
      </div>
    </>
  );
}
