import { Option } from "@/models";
import { useState } from "react";

interface Props {
  options: Option[];
  name: string;
  id: number;
}

export const CheckboxFilter = ({ options, name, id }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionName = event.target.value;
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter(option => option !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };

  return (
    <div className="text-black dark:text-white">
      <p>{name}</p>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`prop${id}_${index}`}
            value={option.name}
            checked={selectedOptions.includes(option.name)}
            onChange={handleOptionChange}
          />
          <label htmlFor={`prop${id}_${index}`}>{option.name}</label>
        </div>
      ))}
      <p>Opções selecionadas: {selectedOptions.join(", ")}</p>
    </div>
  );
};