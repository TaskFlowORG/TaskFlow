import { useEffect, useState } from "react";

type Props = {
  isInModal?: boolean;
  id: number;
  name: string;
  value: string;
  percent: number;
};

export const ProgressFilter = ({
  isInModal = false,
  id,
  name,
  value,
  percent,
}: Props) => {
  const [list, setList] = useState<number[]>([]);
  const [drag, setDrag] = useState<boolean>();
  useEffect(() => {
    const lista = [];
    for (let i = 0; i <= 100; i++) {
      lista.push(i);
    }
    setList(lista);
    window.addEventListener("mouseup", () => setDrag(false));
  }, [percent]);

  const [localPercent, setLocalPercent] = useState<number>(+value);

  function changePercent(number: number) {
    console.log(number, percent);
    setLocalPercent(number);
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
          value={localPercent + ""}
          id=""
          onChange={(e) => setLocalPercent(parseFloat(e.target.value))}
        />
        <div
          className="h-2 w-full flex select-none drag rounded-full overflow-clip"
          onMouseDown={() => setDrag(true)}

          // onMouseMove={()=>   }
          // onMouseLeave={() => setDrag(false)}
        >
          {list.map((item) => {
            console.log(list);
            return (
              <div
                key={item}
                className="h-2 "
                style={{
                  width: `1%`,

                  backgroundColor: item < localPercent ? "#f04a94" : "#BABABA",
                }}
                onMouseOver={() => {
                  if (drag) {
                    setLocalPercent(item);
                  }
                }}
                onClick={() => changePercent(item)}
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
