import { Button } from "@/components/Button";
import { LocalModal } from "@/components/Modal";
import { SearchIcon } from "@/components/SearchBar";
import { OtherUser } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

interface ComboBoxProps {
  options: OtherUser[];
  value: OtherUser[];
  isRemoving?: boolean;
  id: number;
  condition: boolean;
  setCondition: (value: boolean) => void;
}

export const Combobox = ({
  options,
  value,
  isRemoving = false,
  id,
  ...props
}: ComboBoxProps) => {
  const [selectedOption, setSelectedOption] = useState<OtherUser | null>(null);
  const [input, setInput] = useState("");
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const [optionsMarked, setOptionsMarked] = useState<OtherUser[]>([]);
  const inputRef = useRef<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, [value]);

  useEffect(() => {
    setOptionsMarked(value ?? []);
  }, [setFilterProp, value, filterProp]);

  const handleConfirm = (user?: OtherUser) => {
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty && selectedOption != null) {
      if (thisProperty.value.includes(selectedOption.username)) {
        thisProperty.value.splice(
          thisProperty.value.indexOf(selectedOption.username),
          1
        );
      } else {
        thisProperty.value.push(selectedOption.username);
      }
      setFilterProp!([...filterProp!]);
    } else if (selectedOption != null) {
      let newValue = value.map((value) => value.username);
      if (isRemoving) {
        newValue.splice(newValue.indexOf(selectedOption.username), 1);
      } else {
        newValue.push(selectedOption.username);
      }
      setFilterProp!([...filterProp!, { id: id, value: [...newValue] }]);
    }
    setSelectedOption(null);
  };

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
    <LocalModal right {...props}>
      <div
        style={{ right: isRemoving ? -72 : -32 }}
        className="flex flex-col gap-2 absolute p-4 bg-white dark:bg-modal-grey rounded-2xl shadowww top-10  z-[50] "
      >
        <div className="flex-1 flex w-full items-center justify-between gap-4 py-2   px-3 text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg text-sm">
          <p className="flex-1 w-full truncate">
            {selectedOption
              ? selectedOption.name + " " + selectedOption.surname
              : t("select-user")}
          </p>
          <div className="flex flex-col   gap-0">
            <p>{">"}</p>
          </div>
        </div>

        <div
          className="flex flex-col gap-0"
          onKeyUp={(e) => {
            if (e.key === "Enter" && selectedOption) {
              handleConfirm();
            }
          }}
        >
          <div className="flex-1 flex gap-2 py-2 px-3 text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-t-lg text-sm  ">
            <Image  src="/searchIcons/search.svg" alt="search" width={20} height={20} />
            <input
              ref={inputRef}
              value={input}
              className="w-full outline-none bg-transparent"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              disabled={
                isRemoving
                  ? value.length > 0
                    ? false
                    : true
                  : value.length == options.length
                  ? true
                  : false
              }
              placeholder={
                isRemoving
                  ? value.length > 0
                    ? t("remove-user")
                    : t("no-users-task")
                  : value.length == options.length
                  ? t("all-users-task")
                  : t("find-user")
              }
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
              if (
                (name.includes(lowerInput) &&
                  !value.includes(option) &&
                  option != selectedOption) ||
                (isRemoving &&
                  name.includes(lowerInput) &&
                  value.includes(option) &&
                  option != selectedOption)
              ) {
                return (
                  <div
                    onClick={() => handleClickChange(option)}
                    key={index}
                    className="flex-1 p-1 py-1 text-black options  dark:text-white border-2 border-t-0 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600  text-sm"
                  >
                    <p className="hover:bg-gray-200 dark:hover:bg-zinc-800 w-full p-2 truncate rounded-md text-[14px]">
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
          secondary={isRemoving}
          paddingY="py-1"
          width="w-full"
          textSize="text-[14px]"
          text={isRemoving ? t("remove-user") : t("add-user")}
          fnButton={handleConfirm}
        ></Button>
      </div>
    </LocalModal>
  );
};
