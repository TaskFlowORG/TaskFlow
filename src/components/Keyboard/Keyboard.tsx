import { useEffect, useRef, useState } from "react";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { If } from "../If";
import { LocalModal } from "../Modal";
import Image from "next/image";

export const Keyboard = ({
  setValue,
  bottom,
}: {
  setValue: (value: string) => void;
  bottom?: boolean;
}) => {
  const [layoutName, setLayoutName] = useState("default");
  const [open, setOpen] = useState(false);
  const onChange = (input: string) => {
    setValue(input);
  };

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    
    setX((window.innerWidth /2)-210)
    setY((window.innerHeight /2)-115)

  }, [])

  const [isDragging, setIsDragging] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  const mousemove = (e:MouseEvent) => {
    if(!isDragging)return;
    console.log(e.clientX, "X")
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    window.addEventListener("mousemove", mousemove)
    window.addEventListener("mouseup", () => setIsDragging(false)) 
    return () => {
      window.removeEventListener("mousemove", mousemove)
      window.removeEventListener("mouseup", () => setIsDragging(false)) 
    }
  }, [ isDragging])

  return (
    <div className="w-8 h-full relative hidden sm:flex justify-center items-center select-none">
      <Image src="/keyboard.svg" height={24} width={24} className="cursor-pointer" onClick={(e) => {setOpen(!open)}} alt="" />
      <LocalModal condition={open} bottom={bottom} setCondition={setOpen}  x={x+14} y={y-20}>
        <>
        <div onMouseDown={() => setIsDragging(true)}
        className="bg-input-grey shadow-blur-10 h-12 w-6 absolute dark:bg-modal-grey [&_>_*]:w-1 [&_>_*]:h-1 [&_>_*]:rounded-full
         rounded-md [&_>_*]:bg-zinc-500 -left-8 flex flex-col justify-center items-center gap-1 cursor-grab"><div/><div/><div/></div>
        <KeyboardReact
          layoutName={layoutName}
          onChange={onChange}
          onKeyPress={onKeyPress}
          ref={ref}
          buttonTheme={[]}
        />
        </>
      </LocalModal>
    </div>
  );
};
