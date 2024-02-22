import {useState, useEffect} from "react"

type DateProps = {
  value:string
}

export const DateFilter = ({value}:DateProps) => {
  const [valued, setValued] = useState();

  useEffect(() => {
    setValued(value ?? "");
  }, [value]);



  return (
    <div>
      <p>Luka coringando com data</p>
      <input type="date" value={valued} name="" id="" />
    </div>
  )
}