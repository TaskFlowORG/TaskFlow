import { IconNumber } from "@/components/icons";

interface Props {
  number: string | number;
  property: string;
  showNameProperty: boolean;
}

export const CardNumber = ({ number, property, showNameProperty }: Props) => {
  return (
    <div className="flex gap-2 items-center w-max">
      {showNameProperty && (
        <p className="text-p14 text-[#797979] dark:text-white ">{property}:</p>
      )}

      <p className=" mn text-[#797979] dark:text-white mt-0.5 ">{number}</p>
      <div className="w-4 aspect-square">
        <IconNumber></IconNumber>
      </div>
    </div>
  );
};
