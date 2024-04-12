import { FilterContext } from "@/utils/FilterlistContext";
import { useState, useEffect, useContext } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  id: number;
  name: string;
  value: string;
  isInModal?: boolean;
}

export const NumberFilter = ({ id, value, name, isInModal = false }: Props) => {
  const [valued, setValued] = useState<string>();
  const { filterProp, setFilterProp } = useContext(FilterContext);
  useEffect(() => {
    const prop = filterProp.find((bah) => id == bah.id);
    if (prop) {
      setValued(prop.value ?? "");
    } else  {
      setValued(value ?? "");
    }
  }, [value]);
  const styleWithBorder = twMerge(
    "flex gap-4 w-full h-min justify-between  items-center ",
    !isInModal ? "border-b-[1px]" : "justify-end w-max"
  );

  function change(valueInput: string) {
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (valueInput) {
        filterProp.splice(filterProp.indexOf(thisProperty), 1);
        setFilterProp!([...filterProp])
      } else {
        thisProperty.value = valueInput;
        setFilterProp!([...filterProp])
      }
    } else {
      if (valueInput) {
        setFilterProp!([...filterProp, { id: id, value: valueInput }]);
      }
    }
  }

  return (
    <div className={styleWithBorder}>
      {!isInModal && <p className=" text-black dark:text-white">{name}:</p>}
      <div className="flex py-2">
        <input
          className=" input-number  max-w-[100px] text-center py-1 px-3 text-black dark:text-white border-y-2  focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600 text-sm"
          placeholder="Insira o número esperado"
          type="number"
          name=""
          value={valued}
          onChange={(e) => {
            setValued(e.target.value);
            const thisProperty = filterProp?.find((item) => item.id == id);
            if (thisProperty) {
              if (!e.target.value) {
                filterProp.splice(filterProp.indexOf(thisProperty), 1);
                setFilterProp!([...filterProp])
                thisProperty.value = e.target.value;
              } else {
                thisProperty.value = e.target.value;
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
          id={`prop${id}`}
        />
        <span
          onClick={() => {
            setValued(valued ? (parseInt(valued) - 1).toString() : "-1");
            const thisProperty = filterProp?.find((item) => item.id == id);
            if (thisProperty) {

                thisProperty.value = valued ? (parseInt(valued) - 1).toString() : "-1";
                setFilterProp!([...filterProp])
              
            } else {
                setFilterProp!([
                  ...filterProp,
                  { id: id, value: valued ? (parseInt(valued) - 1).toString() : "-1" },
                ]);
            
            }
          }}
          className="bg-primary dark:bg-secondary bah rounded-l-lg w-6 relative -order-1"
        >
          <p className="absolute  text-white left-1/2 top-[6px] leading-none -translate-x-1/2">
            -
          </p>
        </span>

        <span
          onClick={() => {
            setValued(valued ? (parseInt(valued) + 1).toString() : "1");
            const thisProperty = filterProp?.find((item) => item.id == id);
            if (thisProperty) {

                thisProperty.value = valued ? (parseInt(valued) + 1).toString() : "1";
                setFilterProp!([...filterProp])
            } else {
                setFilterProp!([
                  ...filterProp,
                  { id: id, value: valued ? (parseInt(valued) + 1).toString() : "1" },
                ]);
            
            }
          }}
          className="bg-primary dark:bg-secondary bah rounded-r-lg w-6 relative right"
        >
          <p className="absolute  text-white leading-none left-1/2 top-[6px] -translate-x-1/2">
            +
          </p>
        </span>
      </div>
    </div>
  );
};
