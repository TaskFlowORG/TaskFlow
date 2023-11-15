'use client';

import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import { useEffect } from "react";
import { getListData } from "@/services/http/api";
import { useState } from "react";
export default function Home() {

  let tasks = []
  const [options, setOptions] = useState([])

  useEffect(() => {
    const getList = async () => {
      tasks = await getListData("task")
      console.log(tasks)


      tasks.map((task) => {
        console.log(task)
        task.properties.map((property) => {
          console.log(property)
          console.log(property.type)
          console.log(property.property.type == 'select')
          if (property.property.type == 'select') {
            console.log(property.property.options)
            setOptions(property.property.options)
            console.log(options)
          }

        })
      })

    }


    getList()


  }, [options])



  return (
    <>
      <header className="bg-black w-full h-[55px]">

      </header>
      <div className="w-full h-full mt-[5em] flex flex-col ">

        <div className="flex gap-5 items-end pb-16 justify-center    h-max">
          <h1 className="text-pink whitespace-nowrap">Page Name</h1>
          <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 "><p className="text-pink text-4xl h-min w-min">+</p></div>
          <SearchBar hasOrder hasFilter hasSearch />
        </div>
        <div className="flex gap-8 justify-center w-full">
          {
options.map((option)=>{
  console.log(option)
  return <ColumnKanban color="#FF0000" option={option.name} columnName={"To Do"} />
})
          }

          {/* <ColumnKanban color="#FF0000" columnName={"To Do"} />
          <ColumnKanban color="#FFC700" columnName={"Doing"} />
          <ColumnKanban color="#00B51D" columnName={"Done"} /> */}
        </div>


      </div>
    </>



  )
}