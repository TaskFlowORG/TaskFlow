import {useState, useEffect} from "react"

interface Props {
  id: number;
  name: string;
  value: string;
}

export const TextFilter = ({ id, name, value }: Props) => {
  const [valued, setValued] = useState();

  useEffect(() => {
    setValued(value ?? "");
  }, [value]);
  return (
    <div className="flex gap-4 w-full">
      <p>{name}</p>
      <input className="flex-1" value={valued} onChange={(e)=> setValued(e.target.value)} type="text" id={`prop${id}`} />
    </div>
  );
};
