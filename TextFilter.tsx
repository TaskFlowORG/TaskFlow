interface Props {
  id:number,
  name:string
}

export const TextFilter = ({id, name}:Props) => {
  return (
    <div className="flex gap-4 w-full">
      <p>{name}</p>
      <input className="flex-1" type="text" id={`prop${id}`}/>
    </div>
  )
}