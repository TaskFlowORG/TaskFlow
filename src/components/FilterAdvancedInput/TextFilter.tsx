import { useState, useEffect, useContext } from "react";
import { Input } from "../Input";
import { FilterContext } from "@/utils/FilterlistContext";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "next-i18next";
import { useHasPermission } from "@/hooks/useHasPermission";

interface Props {
  id: number;
  name: string;
  value: string;
  isInModal?: boolean;
}

export const TextFilter = ({ id, name, value, isInModal = false }: Props) => {
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const [valued, setValued] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const prop = filterProp!.find((bah) => id == bah.id);
    if (prop) {
      setValued(prop.value);
    } else {
      setValued(value ?? "");
    }
  }, [value, setFilterProp, filterProp]);

  const hasPermission = useHasPermission('update')

  const style = twMerge(
    "flex gap-4 w-full items-center border-b-[1px]  pb-2",
    isInModal ? " p-0  border-none w-full 2xl:w-[200px]" : " "
  );

  return (
    <div className={style}>
      {!isInModal && <p className=" text-black dark:text-white text-p14">{name}:</p>}

      <input
        className="flex-1 py-1 px-3  text-black dark:text-white border-2 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 rounded-lg text-sm"
        placeholder={t("insert-expected-value")}
        disabled={ !isInModal ? false : !hasPermission}
        value={valued}
        onChange={(e) => {
          setValued(e.target.value);
          const thisProperty = filterProp?.find((item) => item.id == id);
          if (thisProperty) {
            if (!e.target.value) {
              filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
              setFilterProp!([...filterProp!]);
              thisProperty.value = e.target.value;
            } else {
              thisProperty.value = e.target.value;
              setFilterProp!([...filterProp!]);
            }
          } else {
            if (e.target.value) {
              setFilterProp!([
                ...filterProp!,
                { id: id, value: e.target.value },
              ]);
            }
          }
        }}
        type="text"
        id={`prop${id}`}
      />
    </div>
  );
};
