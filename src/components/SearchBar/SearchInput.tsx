import { FilterContext } from "@/utils/FilterlistContext";
import { useContext, useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import { Keyboard } from "../Keyboard";
import { Dictophone } from "../Dictophone";
import Image from "next/image";
type Props = {
  setIsModalOpen:(a: boolean) => void;
}

export const SearchInput = ({setIsModalOpen}:Props) => {
  const inputRef = useRef<any>(null);
  // useClickAway(ref, () => setIsModalOpen(false));
  const { setInput, input } = useContext(FilterContext);
  const ref = useRef(null);
  useClickAway(ref, () => {
  if (!input){
    setIsModalOpen(false)
  }

  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div ref={ref} className="w-full   max-w-[600px] h-12 shadow-[0_0_2px_1px_rgba(0,0,0,0.1)] flex-1 flex justify-between dark:bg-modal-grey bg-white rounded-xl border-primary dark:border-secondary border-b-[1px] px-4">
      <div className="gap-4 flex  ">
        <Image width={24} height={24} src="/search.svg" alt="search" className="self-center " />
        <p>|</p>
      </div>
      <input
        type="text"
        id="textSearch"
        ref={inputRef}
        onKeyDown={(e)=> {if(e.key ==="Escape"){
          setInput!(""); setIsModalOpen(false)
        }} }
        className="w-full text-p h-13  font-montserrat outline-none dark:bg-modal-grey bg-white text-modal-grey dark:text-white"
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
