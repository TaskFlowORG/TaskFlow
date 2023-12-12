interface Props {
    value:String
}

export const Tag = ({value}:Props) => {
    return (
    <>
    <p className="p py-1 rounded-sm px-2 bg-primary text-white">{value}</p>
    </>
    )

}