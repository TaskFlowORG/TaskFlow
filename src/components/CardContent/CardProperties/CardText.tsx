interface Props {
  text: string;
  property: string;
}

export const CardText = ({ text, property }: Props) => {
  return (
    <p className="text-[14px] w-full dark:text-white text-[#797979]">
      {property}: {text ? text : "Não descrito!"}
    </p>
  );
};
