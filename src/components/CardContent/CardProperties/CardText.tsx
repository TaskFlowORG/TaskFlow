interface Props {
  text: string;
  property: string;
  showNameProperty:boolean
}

export const CardText = ({ text, property, showNameProperty }: Props) => {
  return (text!=null && text!='null') && (
    <p className="text-p14 w-max self-center  dark:text-white text-[#797979]">
      {showNameProperty && `${property}:`}  {text ? text : "Não descrito!"}
    </p>
  );
};
