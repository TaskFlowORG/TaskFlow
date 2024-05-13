import { Obj } from "@/components/Obj";
import { OtherUser } from "@/models";

type CardProps = {
  users: OtherUser[];
};

export const CardUser = ({ users }: CardProps) => {
  return (
    <div className="  flex items-center w-12  relative">
      <Obj
      resposiveClasses=""
        objs={users}
        mawWidth="w-full"
        max={3}
        functionObj={() => console.log("")}
        isOtherUser
      />
      {/* <span className="w-7 h-7 rounded-full bg-primary absolute shadowww  right-8"></span>
      <span className="w-7 h-7 rounded-full bg-[#EA35BE] shadowww absolute right-4"></span>
      <span className="w-7 h-7 rounded-full bg-[#E41CEF] shadowww absolute right-0"></span> */}
    </div>
  );
};
