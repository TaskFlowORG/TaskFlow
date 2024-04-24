import { FilterContext } from "@/utils/FilterlistContext";
import { useContext, useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import { Keyboard } from "../Keyboard";
import { Dictophone } from "../Dictophone";
type Props = {
  setIsModalOpen:(a: boolean) => void;
}

export const SearchInput = ({setIsModalOpen}:Props) => {
  const inputRef = useRef<any>(null);
  // useClickAway(ref, () => setIsModalOpen(false));
  const { setInput, input } = useContext(FilterContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="w-full h-full flex-1 flex justify-between dark:bg-modal-grey bg-white rounded-xl border-primary dark:border-secondary border-b-[1px] px-4">
      <div className="gap-4 flex  ">
        <img src="/search.svg" alt="" className="w-6 h-6 self-center " />
        <p>|</p>
      </div>
      <input
        type="text"
        id="textSearch"
        ref={inputRef}
        onKeyDown={(e)=> {if(e.key ==="Escape"){
          setInput!(""); setIsModalOpen(false)
        }} }
        className="w-full h-full outline-none dark:bg-modal-grey bg-white text-modal-grey dark:text-white"
        onChange={(e) => {
          setInput!(e.target.value);
        }}
        value={input}
      />
      <div className="gap-3 flex">
        <Keyboard  setValue={(value:string) => setInput!(value)} />
        <Dictophone  setText={setInput!}/>
      </div>
    </div>
  );
};
