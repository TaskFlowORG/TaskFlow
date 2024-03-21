interface Props {
  text: string;
  property: string;
  showNameProperty:boolean
}

export const CardText = ({ text, property, showNameProperty }: Props) => {
  return (
    <p className="text-[14px] w-full dark:text-white text-[#797979]">
      {showNameProperty && `${property}:`}  {text ? text : "Não descrito!"}
    </p>
  );
};
