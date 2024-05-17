import { Option } from "@/models";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";

interface Props {
  options: Option[];
  name: string;
  id: number;
  value: string;
}

export const SelectFilter = ({ options, name, id, value }: Props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedOption(value ?? "");
  }, [value]);

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
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
        <option value="">{t("select")}...</option>
        {options.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <p>
        {t("selected-option")}: {selectedOption}
      </p>
    </div>
  );
};
