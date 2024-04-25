import { FilterContext } from "@/utils/FilterlistContext";
import { useTranslation } from "next-i18next";
import { useState, useEffect, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface DateProps {
  id: number;
  name: string;
  value: string;
  isInModal?: boolean;
}

export const DateFilter = ({
  name,
  value,
  id,
  isInModal = false,
}: DateProps) => {
  const [valued, setValued] = useState("");
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const {t} = useTranslation()

  const style = twMerge(
    "flex gap-4 w-full items-center border-b-[1px]  pb-2",
    isInModal ? " p-0 border-none pl-[160px]" : " "
  );

  useEffect(() => {
    const splitTimestamp: string[] = value?.split("T");
    const prop = filterProp.find((bah) => id == bah.id);
    if (prop && isInModal) {
      const splitTimestamp: string[] = prop.value?.split("T");
      setValued(splitTimestamp[0] ?? "");
    } else if (splitTimestamp) {
      const datePart: string = splitTimestamp[0];
      setValued(datePart ?? "");
    }
  }, [value, setFilterProp, filterProp]);

  return (
    <div className={style}>
      {!isInModal && <p className=" text-black dark:text-white">{name}:</p>}
      <input
        className="flex-1 py-1 px-3 relative text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg text-sm"
        type="date"
        value={valued}
        placeholder={t('insert-expected-value')}
        onChange={(e) => {
          setValued(e.target.value);
          const thisProperty = filterProp?.find((item) => item.id == id);
          if (thisProperty) {
            if (!e.target.value) {
              filterProp.splice(filterProp.indexOf(thisProperty), 1);
              setFilterProp!([...filterProp])
            } else {
              thisProperty.value = e.target.value;
              setFilterProp!([...filterProp])
            }
          } else {
            if (e.target.value) {
              setFilterProp!([
                ...filterProp,
                { id: id, value: e.target.value },
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
