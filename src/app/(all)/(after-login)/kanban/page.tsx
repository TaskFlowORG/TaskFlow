"use client";

import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar";
import { useEffect } from "react";
import { getData, getListData } from "@/services/http/api";
import { useState } from "react";

export default function Kanban() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<any[]>([]);

  const page: any = {
    id: 1,
    name: "Page 1",
    type: "KANBAN",
    project: {
      id: 2,
      name: "Project 1",
      description: "First Project Test in API",
      date: null,
      picture: null,
      groups: [],
    },
    properties: [],
    tasks: [
      {
        id: 1002,
        name: "Limpar a casa",
        multiProperties: [],
        uniProperties: [
          {
            taskId: 1002,
            propertyId: 1,
            value: "To-do",

            property: {
              id: 1,
              name: "Stats",
              visible: true,
              obligatory: false,
              type: "SELECT",
              options: [
                {
                  id: 1,
                  name: "To-do",
                  color: "#FF7A00",
                },
                {
                  id: 2,
                  name: "Doing",
                  color: "#F7624B",
                },
                {
                  id: 3,
                  name: "Done",
                  color: "#F04A94",
                },
              ],
            },
          },
          {
            taskId: 1002,
            propertyId: 2,
            value:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi temporibus hic unde!",
            property: {
              id: 2,
              name: "Description",
              visible: true,
              obligatory: false,
              type: "TEXT",
            },
          },
        ],
      },
      {
        id: 1003,
        name: "Varrer a casa",
        multiProperties: [],
        uniProperties: [
          {
            taskId: 1002,
            propertyId: 1,
            value: "To-do",

            property: {
              id: 1,
              name: "Stats",
              visible: true,
              obligatory: false,
              type: "SELECT",
              options: [
                {
                  id: 1,
                  name: "To-do",
                  color: "#FF7A00",
                },
                {
                  id: 2,
                  name: "Done",
                  color: "#F04A94",
                },
                {
                  id: 3,
                  name: "Doing",
                  color: "#F7624B",
                },
              ],
            },
          },
          {
            taskId: 1002,
            propertyId: 2,
            value:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi temporibus hic unde!",

            property: {
              id: 2,
              name: "Description",
              visible: true,
              obligatory: false,
              type: "TEXT",
            },
          },
          {
            taskId: 1002,
            propertyId: 3,
            value: "11/05/2023",

            property: {
              id: 3,
              name: "Final date",
              visible: true,
              obligatory: false,
              type: "DATE",
            },
          },
        ],
      },
    ],

    userProperties: [],
    propertyOrdering: {
      id: 1,
      name: "Stats",
      visible: true,
      obligatory: false,
      type: "SELECT",
      options: [
        {
          id: 1,
          name: "To-do",
          color: "#FF7A00",
        },
        {
          id: 2,
          name: "Done",
          color: "#F04A94",
        },
        {
          id: 3,
          name: "Doing",
          color: "#F7624B",
        },
      ],
    },
  };

  useEffect(() => {
    (async () => {
      console.log(await getListData("project"));
    })();

    setOptions(page.propertyOrdering.options);
    setTasks(page.tasks);
    setId(page.propertyOrdering.id);

    // const getPage = async () => {
    //     const page = await getData("page", 1)
    //     const tasks = page.tasks.map((taskPage) => {
    //         return taskPage.task
    //     })

    //     const propertyOrdering = page.propertyOrdering;

    //     console.log(page, tasks, propertyOrdering)
    // }

    // getPage()

    // const getList = async () => {
    //     const fetchedTasks = await getListData("task");

    //     await fetchedTasks.map((task) => {
    //         task.properties.map((property) => {
    //             if (property.property.type == "select") {
    //                 setOptions(property.property.options);
    //                 let id2 = property.propertyId
    //                 setId(id2);
    //             }
    //         });
    //     });

    //     const tasksPadrao = []

    //     fetchedTasks.map((task) => {

    //         let property = task.properties.find((property) => property.propertyId == id && property.value == "vazio");

    //         if (property != null) {
    //             tasksPadrao.push(task)
    //         }
    //     });
    //     setTasks(fetchedTasks)
    //     setDefaultTasks(tasksPadrao)
    // };
    // getList();
  }, [id]);

  return (
    <>
      <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
        <div className="flex gap-5 items-end pb-16 justify-center    h-max">
          <h1 className="h1 text-primary whitespace-nowrap dark:text-white">
            {page.name}
          </h1>
          <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 ">
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
