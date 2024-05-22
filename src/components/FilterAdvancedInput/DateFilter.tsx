import { useIsDisabled } from "@/functions/modalTaskFunctions/isDisabled";
import { useHasPermission } from "@/hooks/useHasPermission";
import { Date as DateP, Property } from "@/models";
import { FilterContext } from "@/utils/FilterlistContext";
import { useTranslation } from "next-i18next";
import { useState, useEffect, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface DateProps {
  id: number;
  name: string;
  value: string;
  isInModal?: boolean;
  property: Property;
}

export const DateFilter = ({
  name,
  value,
  id,
  property,
  isInModal = false,
}: DateProps) => {
  const [valued, setValued] = useState("");
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const isDisabled = useIsDisabled(isInModal, "update");
  const { t } = useTranslation();

  const style = twMerge(
    "flex gap-4 w-full items-center border-b-[1px]  pb-2",
    isInModal
      ? (property as DateP).includesHours
        ? "p-0 border-none w-[200px]"
        : " p-0 border-none w-[120px]"
      : " "
  );
  const hasPermission = useHasPermission("update");

  const formatDateTime = (date: Date) => {
    return (
      String(date.getFullYear()).padStart(4, "0") +
      "-" +
      String((date.getMonth() + 1)).padStart(2, "0")  +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      "T" +
      String(date.getHours()).padStart(2, "0")  +
      ":" +
      String(date.getMinutes()).padStart(2, "0")  +
      ":" +
      String(date.getSeconds()).padStart(2, "0") 
    );
  };

  useEffect(() => {
    // const splitTimestamp: string[] = value?.split("T");
    const prop = filterProp!.find((bah) => id == bah.id);
    if (prop && isInModal) {
      // const splitTimestamp: string[] = prop.value?.split("T");
      setValued((property as DateP).includesHours ? formatDateTime(new Date(prop.value)) :prop.value);
    } else {
      setValued((property as DateP).includesHours ? formatDateTime(new Date(value)):value);
    }
    // } else if (value) {
    //   // const datePart: string = splitTimestamp[0];
    //   setValued(value ?? "");
    // }
  }, [value, setFilterProp, filterProp]);

  useEffect(() => {
    console.log(valued);
  }, [valued]);


  return (
    <div className={style}>
      {!isInModal && (
        <p className=" text-black dark:text-white text-p14">{name}:</p>
      )}
      <input
        step="1"
        disabled={isDisabled}
        className="flex-1 py-1 px-3 relative text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg  text-sm"
        type={(property as DateP).includesHours ? "datetime-local" : "date"}
        value={
          (property as DateP).includesHours ? valued : valued.split("T")[0]
        }
        placeholder={t("insert-expected-value")}
        onChange={(e) => {
          setValued((property as DateP).includesHours ? formatDateTime(new Date(e.target.value)) :e.target.value);
          const thisProperty = filterProp?.find((item) => item.id == id);
          if (thisProperty) {
            if (!e.target.value) {
              filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
              setFilterProp!([...filterProp!]);
            } else {
              thisProperty.value = (property as DateP).includesHours
                ? formatDateTime(new Date(e.target.value))
                : e.target.value + "T00:00:00";
              setFilterProp!([...filterProp!]);
            }
          } else {
            if (e.target.value) {
              setFilterProp!([
                ...filterProp!,
                {
                  id: id,
                  value: (property as DateP).includesHours
                    ? formatDateTime(new Date(e.target.value))
                    : e.target.value + "T00:00:00",
                },
              ]);
            }
          }
        }}
        name=""
        id={`prop${id}`}
      />
    </div>
  );
};
