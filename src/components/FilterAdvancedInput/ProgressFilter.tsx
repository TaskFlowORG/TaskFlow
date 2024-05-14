import { useHasPermission } from "@/hooks/useHasPermission";
import { FilterContext } from "@/utils/FilterlistContext";
import { useTheme } from "next-themes";
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
  const {theme} = useTheme()
  const [valued, setValued] = useState<number>();
  const [drag, setDrag] = useState<boolean>();
  const hasPermission = useHasPermission('update')
  const { filterProp, setFilterProp } = useContext(FilterContext);
  useEffect(() => {
    const lista = [];
    for (let i = 0; i <= 100; i++) {
      lista.push(i);
    }
    setList(lista);
    window.addEventListener("mouseup", () => setDrag(false));
    const prop = filterProp!.find((bah) => id == bah.id);
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
        filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
        setFilterProp!([...filterProp!]);
      } else {
        thisProperty.value = valueInput;
        setFilterProp!([...filterProp!]);
      }
    } else {
      if (valueInput) {
        setFilterProp!([...filterProp!, { id: id, value: valueInput }]);
      }
    }
  }

  return (
    <div className="flex justify-between">
      {!isInModal && (
        <p className=" text-black h-full self-center text-p14 dark:text-white whitespace-nowrap">{name}:</p>
      )}
      <div className="flex flex-col gap-1 items-end ">
        <input
          type="number"
          disabled={ !isInModal ? false : !hasPermission}
          step={0.01}
          name=""
          className="p-1 pb-0 text-end w-8 input-number outline-none cursor-pointer bg-white dark:bg-modal-grey"
          value={valued}
          id=""
          placeholder="%"
          onChange={(e) => {
            setValued(parseFloat(e.target.value ?? ""));
            const thisProperty = filterProp?.find((item) => item.id == id);
            if (thisProperty) {
              if (!e.target.value) {
                filterProp!.splice(filterProp!.indexOf(thisProperty), 1);
                setFilterProp!([...filterProp!])
                thisProperty.value = e.target.value;
              } else {
                thisProperty.value = e.target.value;
                setFilterProp!([...filterProp!])
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
        />
        <div
          className="h-2 w-28 flex select-none drag rounded-full overflow-clip"
          onMouseDown={() => setDrag(true)}

          // onMouseMove={()=>   }
          // onMouseLeave={() => setDrag(false)}
        >
          {list.map((item) => {
            // console.log(list);
            return (
              <div
                key={item}
                className="h-2"
                style={{
                  width: `1%`,

                  backgroundColor:
                    item < valued! ?( theme == "light?" ? "var(--primary-color)" : "var(--secondary-color)") : "#BABABA",
                }}
                onMouseOver={() => {
                  if (drag && hasPermission) {
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
