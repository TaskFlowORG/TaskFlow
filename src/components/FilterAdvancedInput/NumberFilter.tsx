interface Props {
  id: number,
  name:string
}

export const NumberFilter = ({ id, name }: Props) => {
  return (
    <div>
      <p>{name}</p>
      <input type="number" name="" id={`prop${id}`} />
    </div>
  );
};
