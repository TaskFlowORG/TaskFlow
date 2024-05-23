import { Obj } from "@/components/Obj";

interface Props {
  title: string;
  description: string;
  functionBall: (value: Object) => void;
}

export const InputCoresConfig = ({
  title,
  description,
  functionBall,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-h4 font-alata">{title}</p>
        <span className="flex flex-col gap-2 items-end">
          <div className="relative h-8">
            <Obj
              objs={[
                "#f04a94",
                "#f76858",
                "#A763DD",
                "#72BF7E",
                "#7FAEF5",
                "+",
              ]}
              mawWidth="w-max"
              max={2}
              functionObj={(e) => functionBall(e)}
              resposiveClasses="hover:brightness-95"
              color
              isString
            />
          </div>
        </span>
      </div>
      <div>
        <p className="text-p font-montserrat">{description}</p>
      </div>
    </div>
  );
};