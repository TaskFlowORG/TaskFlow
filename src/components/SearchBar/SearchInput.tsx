import { FilterContext } from "@/utils/FilterlistContext";
import { useContext, useRef } from "react";
import { useClickAway } from "react-use";
// type Props = {
//   setIsModalOpen:(boolean:boolean)=>void
// }

export const SearchInput = () => {

  // const ref = useRef(null);
  // useClickAway(ref, () => setIsModalOpen(false));
  const {setInput} = useContext(FilterContext);
  return (
    <div className="w-full h-full flex-1 flex justify-between dark:bg-modal-grey bg-white rounded-xl border-primary dark:border-secondary border-b-[1px] px-4">
      <div className="gap-4 flex  ">
        <img
          src="/search.svg"
          alt=""
          className="w-6 h-6 self-center "
        />
        <p>|</p>
      </div>
      <input
        type="text"
        id="textSearch"
        className="w-full h-full outline-none dark:bg-modal-grey bg-white text-modal-grey dark:text-white"  
        onChange={(e) => {
          setInput!(e.target.value)
        }}
      />
      <div className="gap-3 flex">
        <img src="/keyboard.svg" className="w-6 h-6 self-center " alt="" />
        <img src="/voice.svg" className="w-6 h-6 self-center " alt="" />
      </div>
    </div>
  );
};
