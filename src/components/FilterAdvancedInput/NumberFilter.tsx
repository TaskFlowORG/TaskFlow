import {useState, useEffect} from "react"

interface Props {
  id: number,
  name:string,
  value:string
}

export const NumberFilter = ({ id,value, name }: Props) => {


  const [valued, setValued] = useState();

  useEffect(() => {
    setValued(value ?? "");
  }, [value]);


  return (
    <div className="text-black dark:text-white">
      <p>{name}</p>
      <input type="number" name="" value={valued} onChange={(e)=> e.target.value} id={`prop${id}`} />
    </div>
  );
};
