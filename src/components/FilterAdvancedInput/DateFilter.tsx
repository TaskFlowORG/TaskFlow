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
  const isDisabled = useIsDisabled(isInModal, 'update');
  const { t } = useTranslation();

  const style = twMerge(
    "flex gap-4 w-full items-center border-b-[1px]  pb-2",
    isInModal ? ((property as DateP).includesHours ? "p-0 border-none w-[200px]" : " p-0 border-none w-[120px]") : " "
  );
  const hasPermission = useHasPermission("update");

  useEffect(() => {
    // const splitTimestamp: string[] = value?.split("T");
    const prop = filterProp!.find((bah) => id == bah.id);
    if (prop && isInModal) {
      // const splitTimestamp: string[] = prop.value?.split("T");
      setValued(prop.value);
    } else {
      setValued(value);
    }
    // } else if (value) {
    //   // const datePart: string = splitTimestamp[0];
    //   setValued(value ?? "");
    // }
  }, [value, setFilterProp, filterProp]);

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
          (property as DateP).includesHours
            ? valued?.split("T")[0] +
              "T" +
              new Date(valued).toLocaleTimeString()
            : valued?.split("T")[0]
        }
        placeholder={t("insert-expected-value")}
        onChange={(e) => {

          setValued(e.target.value);
          const thisProperty = filterProp?.find((item) => item.id == id);
          if (thisProperty) {
            if (!e.target.value) {
              filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
              setFilterProp!([...filterProp!]);
            } else {
              thisProperty.value = new Date(e.target.value).toISOString();
              setFilterProp!([...filterProp!]);
            }
          } else {
            if (e.target.value) {
              setFilterProp!([
                ...filterProp!,
                { id: id, value: new Date(e.target.value).toISOString() },
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
