
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban"

export default function Home() {
  return (
    <body className="w-screen h-screen">
      <header className="bg-black w-full h-[55px]">

      </header>
      <div className="w-full h-full mt-[5em] flex flex-col">
        <div className="flex gap-5 items-end">
          <h1 className="text-pink">Page Name</h1>
          <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 "><p className="text-pink text-4xl">+</p></div>
        </div>
        <div className="flex gap-8 justify-center w-full">
          <ColumnKanban color={"#FF0000"} />
          <ColumnKanban color={"#FFC700"} />
          <ColumnKanban color={"#00B51D"} />
        </div>


      </div>

    </body>
  )
}