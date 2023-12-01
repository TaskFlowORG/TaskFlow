interface Props{
  property:any,
  value:string
}

export const CardSelect = ({ property, value }:Props) => {
  return (
    <div className="flex gap-2 w-max items-center">
      <p className="p w-max text-[#797979]">{property}:</p>
      <div className="flex gap-2">
        <p className="p w-max text-primary">{value}</p>
        <img src="cardContentIcons/select.svg" alt="" />
      </div>
    </div>
  );
};
