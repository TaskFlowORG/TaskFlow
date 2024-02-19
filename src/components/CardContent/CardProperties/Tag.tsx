interface Props {
    value:string,
    color:string
}

export const Tag = ({value, color}:Props) => {
    return (
    <>
    <p style={{backgroundColor:color ? color : "#f04a94"}} className="p py-1 rounded-sm px-2  text-white">{value}</p>
    </>
    )

}