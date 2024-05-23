import { IconArchive } from "@/components/icons";

interface Props {
  name: string;
  property: string;
  showNameProperty: boolean;
}

export const CardFile = ({ name, property, showNameProperty }: Props) => {
  return name && (
    
    <div className="flex gap-2 max-w-[95%]">
      <p className="text-p14  truncate  dark:text-white whitespace-nowrap text-[#797979]">
        {showNameProperty && `${property}:`} {name ? name : "Não descrito!"}
      </p>
      <div className="w-3 aspect-square">
        <IconArchive></IconArchive>
      </div>
    </div>
  );
};
