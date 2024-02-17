interface Props {
  id: number,
  name:string
}

export const NumberFilter = ({ id, name }: Props) => {
  return (
    <div className="text-black dark:text-white">
      <p>{name}</p>
      <input type="number" name="" id={`prop${id}`} />
    </div>
  );
};
