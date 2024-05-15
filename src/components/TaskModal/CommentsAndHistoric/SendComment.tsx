import { ComponentProps } from "react";
import { InputComments } from "./Input";
import Image from "next/image";
import { IconSend } from "@/components/icons/GeneralIcons/IconSend";

type Props = {
  input: string;
  setInput: (text: string) => void;
  sendComment: () => void;
};

export const SendComment = ({ input, sendComment, setInput }: Props) => {
  return (
    <div className="flex gap-6 " >
      <InputComments value={input} onChange={(e) => setInput(e.target.value)} />
      <div
        className="w-12 items-center flex justify-center aspect-square rounded-lg bg-primary dark:bg-secondary"
        onClick={sendComment}
      >
        <div className="w-[12px] h-[14px] md:w-[16px] md:h-[18px] relative">
          <IconSend />
        </div>
      </div>
    </div>
  );
};
