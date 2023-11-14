
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban"
import { SearchBar } from "@/components/SearchBar/SearchBar"
export default function Home() {





  return (
<>
<header className="bg-black w-full h-[55px]">

      </header>
      <div className="w-full h-full mt-[5em] flex flex-col ">
        
        <div className="flex gap-5 items-end pb-16 justify-center h-max">
          <h1 className="text-pink whitespace-nowrap">Page Name</h1>
          <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 "><p className="text-pink text-4xl h-min w-min">+</p></div>
          <SearchBar hasOrder hasFilter hasSearch />
        </div>
        <div className="flex gap-8 justify-center w-full">
          <ColumnKanban color="#FF0000" columnName={"To Do"} />
          <ColumnKanban color="#FFC700" columnName={"Doing"} />
          <ColumnKanban color="#00B51D" columnName={"Done"} />
        </div>


      </div>
</>
      


  )
}