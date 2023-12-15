"use client";

import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar";
import { useEffect } from "react";
import { getData, getListData, getPage } from "@/services/http/api";
import { useState } from "react";
import { Page } from "@/model/pages/Page";
import {RegisterTaskModal} from "@/components/RegisterTaskModal";
import { CommonPage } from "@/model/pages/CommonPage";
import { Select } from "@/model/Properties/Select";
import { Option } from "@/model/Properties/Option";


export default function Kanban() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [paged, setPage] = useState<Page | null>(null);
  const [modal, setModal] = useState<boolean>(false);



  useEffect(() => {
    (async () => {
      const pg: CommonPage = await getPage("page", 1);
      console.log(pg)
      setTasks(pg.tasks);
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();

  }, [id]);



  return (
    <>
      <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
        <RegisterTaskModal open={modal}  close={() => setModal(false)}listInputs={[]} />
        <div className="flex gap-5 items-end pb-16 justify-center    h-max">
          <h1
            className="h1 text-primary whitespace-nowrap dark:text-white"
            onClick={() => console.log(paged)}
          >
            {paged?.name}
          </h1>
          <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 cursor-pointer " onClick={ () => setModal(true)}>
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
            console.log(option);
            return (
              <ColumnKanban
                key={option.id.tostring()}
                tasks={tasks}
                propertyId={id}
                color={option.color}
                option={option}
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
              option={new Option(0, "Não Marcadas", "#F04A94")}
            />
          }
        </div>
      </div>
    </>
  );
}
