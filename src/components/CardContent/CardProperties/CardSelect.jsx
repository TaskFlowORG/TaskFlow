export const CardSelect = ({ property, value }) => {
  return (
    <div className="flex gap-2 w-max items-center">
      <p className="p w-max text-[#797979]">{property}:</p>
      <div className="flex gap-2">
        <p className="p w-max text-pink">{value}</p>
        <img src="cardContentIcons/select.svg" alt="" />
      </div>
    </div>
  );
};
