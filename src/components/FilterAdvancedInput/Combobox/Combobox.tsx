import { Button } from "@/components/Button";
import { SearchIcon } from "@/components/SearchBar";
import { OtherUser } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { useContext, useEffect, useState } from "react";

interface ComboBoxProps {
  options: OtherUser[];

  id: number;
}

export const Combobox = ({ options, id }: ComboBoxProps) => {
  const [selectedOption, setSelectedOption] = useState<OtherUser | null>(null);
  const [input, setInput] = useState("");
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const [optionsMarked, setOptionsMarked] = useState<OtherUser[]>([])

  useEffect(()=>{
setOptionsMarked([])
  },[])

  const handleConfirm = () => {
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty && selectedOption!=null) {
      setOptionsMarked([...optionsMarked, selectedOption])
      thisProperty.value = [...thisProperty.value, selectedOption.username];
      setFilterProp!([...filterProp]);
    } else if(selectedOption!=null) {
      setOptionsMarked([...optionsMarked, selectedOption])
      setFilterProp!([...filterProp, { id: id, value: [selectedOption.username]}]);
    }
    setSelectedOption(null)
  }
  const handleClickChange = (user: OtherUser) => {
    setSelectedOption(user);
    
  };

  const handleInputChange = () => {
    options.find((user) => {
      let name = (user.name + " " + user.surname).toLowerCase();
      let lowerInput = input.toLowerCase();
      if (name.includes(lowerInput)) {
        handleClickChange(user);
        setInput("");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 absolute p-4 bg-white rounded-2xl shadowww top-10 right-0 z-[50] ">
      <div className="flex-1 flex w-full items-center justify-between gap-4 py-2   px-3 text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg text-sm">
        <p className="flex-1 w-full truncate">
          {selectedOption
            ? selectedOption.name + " " + selectedOption.surname
            : "Selecione um usuário!"}
        </p>
        <div className="flex flex-col   gap-0">
          <p>{">"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        <div className="flex-1 flex gap-2 py-2 px-3 text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-t-lg text-sm  ">
          <img src="/searchIcons/search.svg" alt="" />
          <input
            value={input}
            className="w-full outline-none"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Encontre um usuário!"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputChange();
              }
            }}
          />
        </div>
        <div className="flex flex-col overflow-auto none-scrollbar max-h-[170px]">
          {options.map((option, index) => {
            let name = (option.name + " " + option.surname).toLowerCase();
            let lowerInput = input.toLowerCase();
            if ((name.includes(lowerInput)) && !optionsMarked.includes(option)) {
              return (
                <div
                  onClick={() => handleClickChange(option)}
                  key={index}
                  className="flex-1 p-1 py-1 text-black options  dark:text-white border-2 border-t-0 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600  text-sm"
                >
                  <p className="hover:bg-gray-200 w-full p-2 truncate rounded-md text-[14px]">
                    {" "}
                    {option.name + " " + option.surname}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Button
        paddingY="py-1"
        width="w-full"
        textSize="text-[14px]"
        text="Adicionar usuário"
        fnButton={handleConfirm}
      ></Button>
    </div>
  );
};
