import { Option } from "@/models";
import { useState, useEffect } from "react";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value:string
}

export const SelectFilter = ({ options, name, id, value }: Props) => {

  const option =  options.find((option)=> option.name == value)
  const [selectedOption, setSelectedOption] = useState("");


  useEffect(() => {
    setSelectedOption(value ?? "");
  }, [value]);

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    // const select = document.querySelector(`#prop${id}`)
    // // // console.log(select.value)
  };

  return (
    <div className="text-black dark:text-white">
      <p>{name}</p>
      <select
        className="bg-white dark:bg-modal-grey"
        value={selectedOption}
        id={"prop" + id.toString()}
        onChange={handleOptionChange}
      >
        <option value="">Selecione...</option>
        {options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <p>Opção selecionada: {selectedOption}</p>
    </div>
  );
};
