import { FilterContext } from "@/utils/FilterlistContext";
import { useContext, useEffect, useState } from "react";

type Props = {
  isInModal?: boolean;
  id: number;
  name: string;
  value: number;
};

export const ProgressFilter = ({
  isInModal = false,
  id,
  name,
  value,
}: Props) => {
  const [list, setList] = useState<number[]>([]);
  const [valued, setValued] = useState<number>();
  const [drag, setDrag] = useState<boolean>();
  const { filterProp, setFilterProp } = useContext(FilterContext);
  useEffect(() => {
    const lista = [];
    for (let i = 0; i <= 100; i++) {
      lista.push(i);
    }
    setList(lista);
    window.addEventListener("mouseup", () => setDrag(false));
    const prop = filterProp.find((bah) => id == bah.id);
    if (prop) {
      setValued(prop.value ?? "");
    } else {
      setValued(value ?? "");
    }
  }, [value, filterProp, setFilterProp]);

  function change(valueInput: number) {
    const thisProperty = filterProp?.find((item) => item.id == id);
    if (thisProperty) {
      if (valueInput) {
        filterProp.splice(filterProp.indexOf(thisProperty), 1);
        setFilterProp!(filterProp);
      } else {
        thisProperty.value = valueInput;
      }
    } else {
      if (valueInput) {
        setFilterProp!([...filterProp, { id: id, value: valueInput }]);
      }
    }
  }

  return (
    <div>
      {!isInModal && (
        <p className=" text-black dark:text-white whitespace-nowrap">{name}:</p>
      )}
      <div className="flex flex-col gap-1">
        <input
          type="number"
          step={0.01}
          name=""
          className="p-1 pb-0 text-end input-number outline-none cursor-pointer"
          value={valued}
          id=""
          onChange={(e) => {
            setValued(parseFloat(e.target.value));
            change(parseFloat(e.target.value));
          }}
        />
        <div
          className="h-2 w-full flex select-none drag rounded-full overflow-clip"
          onMouseDown={() => setDrag(true)}

          // onMouseMove={()=>   }
          // onMouseLeave={() => setDrag(false)}
        >
          {list.map((item) => {
            // console.log(list);
            return (
              <div
                key={item}
                className="h-2 "
                style={{
                  width: `1%`,

                  backgroundColor:
                    item < valued! ? "#f04a94" : "#BABABA",
                }}
                onMouseOver={() => {
                  if (drag) {
                    setValued(item);
                    change(item);
                  }
                }}
                onClick={() => {
                  setValued(item);
                  change(item);
                }}
              ></div>
            );
          })}
          {/* <div
            className="absolute h-2 w-7 bg-pink-600 left-0 rounded-l-full"
            style={{ width: percent + "%" }}
          ></div> */}
        </div>
      </div>
    </div>
  );
};
