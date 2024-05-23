import { useState } from "react";
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

  return (
    <div className="w-8 h-full relative hidden sm:flex justify-center items-center">
      <Image src="/keyboard.svg" height={24} width={24} className="cursor-pointer" onClick={() => setOpen(!open)} alt="" />
      <LocalModal condition={open} bottom={bottom} setCondition={setOpen} right>
        <KeyboardReact
          layoutName={layoutName}
          onChange={onChange}
          onKeyPress={onKeyPress}
          buttonTheme={[]}
        />
      </LocalModal>
    </div>
  );
};
